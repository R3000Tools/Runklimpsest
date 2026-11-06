#!/usr/bin/env python3
"""Generates the Runklimpsest UI prototype as a Max for Live audio effect.

Outputs (next to this script):
  Runklimpsest.maxpat  - plain Max patch (fallback: paste into a new M4L device)
  Runklimpsest.amxd    - Max for Live audio effect (unfrozen, needs runklimpsest_ui.js beside it)

Parameter rule: every function exists exactly once as a live.* object with
Parameter Mode in the device patcher. In the device these objects are fully
transparent and lie on top of the jsui that draws the panel. The large view has
no parameters: its jsui "controls" sends "<name> <value>" -> [route] ->
[s ---<name>_c] -> original. Also writes the generated block (parameter specs,
layout, version) into runklimpsest_ui.js.
"""
import json
import struct
from pathlib import Path

VERSION = "0.1.10"
HERE = Path(__file__).resolve().parent
JS = "runklimpsest_ui.js"

# ------------------------------------------------------------------ colours

def hexc(h, a=1.0):
    h = h.lstrip("#")
    return [round(int(h[i:i + 2], 16) / 255, 4) for i in (0, 2, 4)] + [a]

CYAN, BLUE, ORANGE, RED = hexc("46e3ff"), hexc("5a9cff"), hexc("ff8a2a"), hexc("ff4a3d")
PURPLE, MAGENTA, TEXT, DIM = hexc("9b5cff"), hexc("ff4fd8"), hexc("f3f5f8"), hexc("8a909c")
TRACK, BTN, BTN_ON_TXT = hexc("262932"), hexc("23262e"), hexc("0a0a0d")
BG_TOP, BG_BOTTOM = hexc("23262e"), hexc("0a0a0d")
FONT, FONT_BOLD = "Ableton Sans Medium", "Ableton Sans Bold"

# ------------------------------------------------------------------ parameters
# label = parameter_longname (never rename: automation in projects would be lost)
# short = parameter_shortname (shown in Live), uppercase since 0.1.3
# fmt/colname feed the jsui drawing (generated block in runklimpsest_ui.js)
PARAMS = [
    dict(name="gravity", label="Gravity", kind="dial", lo=0.0, hi=1.0, init=0.62, style=9, units="%.2f g", fmt="g", colname="cyan"),
    dict(name="bounce", label="Bounce", kind="dial", lo=0.0, hi=100.0, init=80.0, style=5, fmt="pct", colname="cyan"),
    dict(name="swarm", label="Swarm", kind="dial", lo=1, hi=24, init=12, style=0, ptype=1, fmt="int", colname="cyan"),
    dict(name="erosion", label="Erosion", kind="dial", lo=0.0, hi=100.0, init=55.0, style=5, fmt="pct", colname="orange"),
    dict(name="mix", label="Mix", kind="dial", lo=0.0, hi=100.0, init=100.0, style=5, fmt="pct", colname="cyan"),
    dict(name="grain", label="Grain", kind="dial", lo=5.0, hi=500.0, init=80.0, style=2, exponent=2.0, fmt="ms", colname="cyan"),
    dict(name="heal", label="Heal", kind="dial", lo=0.5, hi=60.0, init=8.0, style=9, units="%.1f s", exponent=2.0, fmt="s", colname="orange"),
    dict(name="rate", label="Dose Rate", short="RATE", kind="dial", lo=1.0, hi=32.0, init=4.0, style=9, units="%.0f bars", fmt="bars", colname="magenta"),
    dict(name="recover", label="Dose Recover", short="RECOVER", kind="dial", lo=1.0, hi=64.0, init=12.0, style=9, units="%.0f bars", fmt="bars", colname="magenta"),
    dict(name="output", label="Output", kind="dial", lo=-24.0, hi=12.0, init=0.0, style=4, fmt="db", colname="cyan"),
    dict(name="freeze", label="Freeze", kind="toggle", text="FREEZE", init=0, colname="cyan"),
    dict(name="sync", label="Sync", kind="toggle", text="SYNC", init=1, colname="cyan"),
    dict(name="division", label="Division", kind="menu", items=["1/4", "1/8", "1/16", "1/32"], init=2, colname="cyan"),
    dict(name="weartype", label="Wear Type", short="WEAR TYPE", kind="tab", items=["SAT", "TAPE", "BIT"], init=0, colname="orange"),
    dict(name="target", label="Dose Target", short="DOSE TARGET", kind="tab", items=["ALL", "SWARM", "WEAR"], init=0, colname="magenta"),
    dict(name="resetdose", label="Dose Reset", short="DOSE RESET", kind="button", text="RESET DOSE", init=0, colname="magenta"),
]
for _p in PARAMS:
    _p.setdefault("short", _p["label"].upper())
P = {p["name"]: p for p in PARAMS}

# device (1x, 580 x 169, no title row - Live shows the device name in its title bar).
# The jsui "device" draws everything; live.* parameters sit transparent on top of
# these rects. Parameters without a rect live hidden in the device.
DEVICE_W, DEVICE_H = 580, 169   # drawn panel (jsui)

# Parameter banks for Push / controllers with device control (internal, no GUI).
BANKS = [
    ("Main", ["gravity", "bounce", "swarm", "erosion", "mix", "freeze", "sync", "division"]),
    ("Detail", ["grain", "heal", "rate", "recover", "output", "weartype", "target", "resetdose"]),
]
DEVICE_RECT = {
    "sync": [118, 3, 42, 13], "division": [163, 3, 43, 13],
    "freeze": [214, 92, 76, 22],
    "gravity": [376, 18, 54, 70], "bounce": [430, 18, 54, 70], "swarm": [484, 18, 54, 70],
    "erosion": [306, 92, 60, 70], "mix": [430, 92, 54, 70],
    "resetdose": [376, 92, 54, 72],
}
DEVICE_AREAS = {
    "chamber": [6, 18, 200, 145], "wave": [214, 18, 152, 66], "dose": [376, 92, 54, 72],
    "more": [488, 124, 46, 18], "meters": [546, 18, 28, 128],
}
# large view (960 x 620)
WIN_W, WIN_H = 960, 620

TRANSPARENT = [0.0, 0.0, 0.0, 0.01]


def js_generated_block():
    spec = {}
    for p in PARAMS:
        e = {"label": p["short"], "def": p["init"], "col": p["colname"], "kind": p["kind"]}
        if p["kind"] == "dial":
            e.update(lo=p["lo"], hi=p["hi"], exp=p.get("exponent", 1.0), fmt=p["fmt"])
            if p.get("ptype") == 1:
                e["integer"] = True
        if "items" in p:
            e["items"] = p["items"]
        spec[p["name"]] = e
    layout = dict(DEVICE_RECT)
    layout.update(DEVICE_AREAS)
    return ("// BEGIN GENERATED - written by build_device.py from its PARAMS / layout tables, do not edit\n"
            f"var VERSION = {json.dumps(VERSION)};\n"
            f"var SPEC = {json.dumps(spec)};\n"
            f"var LAYOUT = {json.dumps(layout)};\n"
            "// END GENERATED")


def inject_js():
    path = HERE / JS
    src = path.read_text(encoding="utf-8")
    a = src.index("// BEGIN GENERATED")
    b = src.index("// END GENERATED") + len("// END GENERATED")
    path.write_text(src[:a] + js_generated_block() + src[b:], encoding="utf-8")

# ------------------------------------------------------------------ patch builder

class Patch:
    def __init__(self, prefix):
        self.prefix = prefix
        self.boxes, self.lines, self.n = [], [], 0
        self.py = 20  # running y for patching layout

    def add(self, maxclass, rect=None, pres=None, **attrs):
        self.n += 1
        oid = f"{self.prefix}-{self.n}"
        if rect is None:
            rect = [20 + (self.n % 6) * 170, self.py, 150, 22]
            if self.n % 6 == 5:
                self.py += 34
        box = {"id": oid, "maxclass": maxclass, "patching_rect": rect}
        if pres is not None:
            box["presentation"] = 1
            box["presentation_rect"] = pres
        box.update(attrs)
        self.boxes.append({"box": box})
        return oid

    def obj(self, text, ins=1, outs=1, outtype=None, **kw):
        return self.add("newobj", text=text, numinlets=ins, numoutlets=outs,
                        outlettype=outtype if outtype is not None else [""] * outs, **kw)

    def msg(self, text):
        return self.add("message", text=text, numinlets=2, numoutlets=1, outlettype=[""])

    def connect(self, src, so, dst, di):
        self.lines.append({"patchline": {"source": [src, so], "destination": [dst, di]}})

    def comment(self, text, pres, col=DIM, size=9, bold=True, just=0):
        return self.add("comment", pres=pres, text=text, numinlets=1, numoutlets=0,
                        textcolor=col, fontsize=size, fontname=FONT_BOLD if bold else FONT,
                        textjustification=just)

    def jsui(self, mode, pres):
        return self.add("jsui", pres=pres, filename=JS, jsarguments=[mode], numinlets=1,
                        numoutlets=1, outlettype=[""], border=0)


def valueof(p):
    v = {"parameter_longname": p["label"], "parameter_shortname": p["short"],
         "parameter_initial_enable": 1, "parameter_initial": [p["init"]]}
    kind = p["kind"]
    if kind == "dial":
        v.update(parameter_type=p.get("ptype", 0), parameter_mmin=p["lo"], parameter_mmax=p["hi"],
                 parameter_unitstyle=p["style"])
        if "units" in p:
            v["parameter_units"] = p["units"]
        if "exponent" in p:
            v["parameter_exponent"] = p["exponent"]
    elif kind in ("toggle", "button"):
        v.update(parameter_type=2, parameter_enum=["off", "on"], parameter_mmax=1)
    else:
        v.update(parameter_type=2, parameter_enum=p["items"], parameter_mmax=len(p["items"]) - 1)
    return v


def control(patch, p, pres):
    """Creates the one live.* parameter object for p (hidden in the device: pres None).
    Automation and Push work with hidden parameters; the drawn panel / large view follow it.
    0.1.9 showed them in a visible mapping strip - removed again (user: no extra GUI area)."""
    common = dict(varname=p["name"], parameter_enable=1,
                  saved_attribute_attributes={"valueof": valueof(p)})
    if p["kind"] == "button":
        return patch.add("live.text", pres=pres, numinlets=1, numoutlets=2, outlettype=["", ""],
                         mode=0, text="RESET", texton="RESET",
                         bgcolor=BTN, activebgcolor=BTN, bgoncolor=MAGENTA, activebgoncolor=MAGENTA,
                         textcolor=TEXT, activetextcolor=TEXT, textoncolor=BTN_ON_TXT, activetextoncolor=BTN_ON_TXT,
                         bordercolor=hexc("ffffff", 0.15), fontsize=7.5, fontname=FONT_BOLD, rounded=3.0, **common)
    col = {"cyan": CYAN, "orange": ORANGE, "magenta": MAGENTA}[p["colname"]]
    return patch.add("live.numbox", pres=pres, numinlets=1, numoutlets=2, outlettype=["", "float"],
                     bgcolor=BTN, activebgcolor=BTN, textcolor=TEXT, activetextcolor=TEXT,
                     activeslidercolor=col, tricolor=col, bordercolor=hexc("ffffff", 0.12),
                     fontsize=8.0, fontname=FONT_BOLD, appearance=0, **common)


def background(patch, w, h):
    return patch.add("panel", pres=[0, 0, w, h], numinlets=1, numoutlets=0, background=1,
                     mode=1, grad1=BG_TOP, grad2=BG_BOTTOM, angle=270.0, bgcolor=BG_BOTTOM,
                     border=0, rounded=0)


def open_button(patch, text, pres, visible=True):
    T = TRANSPARENT
    cols = (dict(bgcolor=BTN, activebgcolor=BTN, textcolor=TEXT, activetextcolor=TEXT,
                 bordercolor=hexc("ffffff", 0.12), fontsize=8.0, fontname=FONT_BOLD, rounded=4.0)
            if visible else
            dict(bgcolor=T, activebgcolor=T, textcolor=T, activetextcolor=T, bordercolor=T, focusbordercolor=T))
    return patch.add("live.text", pres=pres, numinlets=1, numoutlets=2, outlettype=["", ""], mode=0,
                     text=text, texton=text, parameter_enable=0, varname="btn_" + text.lower(), **cols)

# ------------------------------------------------------------------ large view (subpatcher)

def build_window():
    w = Patch("win")
    background(w, WIN_W, WIN_H)
    w.add("jsui", pres=[16, 10, 230, 22], filename=JS, jsarguments=["title"], numinlets=1, numoutlets=1,
          outlettype=[""], border=0)
    w.comment("LARGE VIEW", [252, 14, 100, 14], DIM, 9)
    large = w.jsui("large", [16, 40, 928, 396])
    for name in ("rk_draw", "rk_uid"):
        r = w.obj(f"r ---{name}", ins=0, outs=1)
        w.connect(r, 0, large, 0)

    # Controls are drawn by a jsui (live.* mirrors without a parameter lose names,
    # units and item lists). Output "<name> <value>" -> [route] -> original parameter.
    controls = w.jsui("controls", [16, 444, 928, 170])
    for name in ("rk_draw", "rk_uid"):
        r = w.obj(f"r ---{name}", ins=0, outs=1)
        w.connect(r, 0, controls, 0)
    names = [p["name"] for p in PARAMS]
    route = w.obj("route " + " ".join(names), ins=1, outs=len(names) + 1,
                  outtype=[""] * (len(names) + 1))
    w.connect(controls, 0, route, 0)
    for i, name in enumerate(names):
        s = w.obj(f"s ---{name}_c", ins=1, outs=0, outtype=[])
        w.connect(route, i, s, 0)

    close = open_button(w, "CLOSE", [868, 12, 76, 20])
    # live.text in button mode may send a bang or 1/0 depending on version: accept anything
    tb = w.obj("t b", outs=1, outtype=["bang"])
    wc = w.msg("wclose")
    tp = w.obj("thispatcher", ins=1, outs=2, outtype=["", ""])
    w.connect(close, 0, tb, 0)
    w.connect(tb, 0, wc, 0)
    w.connect(wc, 0, tp, 0)
    # second opening path: the device sends ---rk_open, the window brings itself to front
    r_open = w.obj("r ---rk_open", ins=0, outs=1)
    front = w.msg("front")
    w.connect(r_open, 0, front, 0)
    w.connect(front, 0, tp, 0)
    lb = w.obj("loadbang", ins=1, outs=1, outtype=["bang"])
    title = w.msg("title Runklimpsest - Large View")
    w.connect(lb, 0, title, 0)
    w.connect(title, 0, tp, 0)
    inl = w.add("inlet", numinlets=0, numoutlets=1, outlettype=[""], comment="open")
    _ = inl
    return {
        "fileversion": 1,
        "appversion": {"major": 8, "minor": 6, "revision": 0, "architecture": "x64", "modernui": 1},
        "classnamespace": "box",
        "rect": [120.0, 120.0, float(WIN_W), float(WIN_H)],
        "openinpresentation": 1,
        "toolbarvisible": 0,
        "enablehscroll": 0,
        "enablevscroll": 0,
        "boxes": w.boxes,
        "lines": w.lines,
    }

# ------------------------------------------------------------------ device

def build_device():
    d = Patch("obj")
    # One jsui draws the whole panel, runs the engine and handles every click; it sends
    # "<name> <value>" to the hidden live.* parameters. No other object overlaps it except
    # the meters: overlapping objects (transparent live.* on top, widget jsuis on top) did
    # not work in Live 0.1.3-0.1.6. No panel object / background layer (0.1.4: invisible).
    panel = d.add("jsui", pres=[0, 0, DEVICE_W, DEVICE_H], filename=JS, jsarguments=["device"],
                  numinlets=1, numoutlets=1, outlettype=[""], border=0)

    # parameters (the only ones), hidden: automation lanes and Push banks work without GUI objects
    orig = {}
    for p in PARAMS:
        orig[p["name"]] = control(d, p, None)
    widget_route = d.obj("route " + " ".join(p["name"] for p in PARAMS), ins=1, outs=len(PARAMS) + 1,
                         outtype=[""] * (len(PARAMS) + 1))
    for i, p in enumerate(PARAMS):
        s_c = d.obj(f"s ---{p['name']}_c", ins=1, outs=0, outtype=[])
        d.connect(widget_route, i, s_c, 0)

    # parameters -> engine, -> large view (set), large view -> parameters
    rparam = d.obj("r ---rk_param", ins=0, outs=1)
    d.connect(rparam, 0, panel, 0)
    dbg = d.obj("print Runklimpsest-param", ins=1, outs=0, outtype=[])
    d.connect(rparam, 0, dbg, 0)
    refresh_r = d.obj("r ---rk_refresh", ins=0, outs=1)
    for p in PARAMS:
        o = orig[p["name"]]
        pre = d.obj(f"prepend {p['name']}")
        s_param = d.obj("s ---rk_param", ins=1, outs=0, outtype=[])
        r_ctl = d.obj(f"r ---{p['name']}_c", ins=0, outs=1)
        d.connect(o, 0, pre, 0)
        d.connect(pre, 0, s_param, 0)
        d.connect(r_ctl, 0, o, 0)
        if p["kind"] != "button":
            d.connect(refresh_r, 0, o, 0)

    # clocks
    thisdev = d.obj("live.thisdevice", ins=1, outs=3, outtype=["bang", "int", "int"])
    start = d.obj("t 1 b b", outs=3, outtype=["int", "bang", "bang"])
    s_refresh = d.obj("s ---rk_refresh", ins=1, outs=0, outtype=[])
    frame = d.obj("qmetro 33", ins=2, outs=1, outtype=["bang"])
    fan = d.obj("t b b", outs=2, outtype=["bang", "bang"])
    s_draw = d.obj("s ---rk_draw", ins=1, outs=0, outtype=[])
    tick_metro = d.obj("metro 16n", ins=2, outs=1, outtype=["bang"])
    tick_msg = d.msg("tick")
    d.connect(thisdev, 0, start, 0)
    d.connect(start, 2, s_refresh, 0)
    d.connect(start, 0, frame, 0)
    d.connect(start, 0, tick_metro, 0)
    d.connect(frame, 0, fan, 0)
    d.connect(fan, 1, panel, 0)       # engine step + device redraw first
    d.connect(fan, 0, s_draw, 0)      # then the large view
    d.connect(tick_metro, 0, tick_msg, 0)
    d.connect(tick_msg, 0, panel, 0)

    # song tempo and time signature (Live API)
    path_msg = d.msg("path live_set")
    lpath = d.obj("live.path", ins=1, outs=3, outtype=["", "", ""])
    d.connect(start, 1, path_msg, 0)
    d.connect(path_msg, 0, lpath, 0)
    for prop, sel in (("tempo", "tempo"), ("signature_numerator", "signum"), ("signature_denominator", "sigden")):
        obs = d.obj(f"live.observer @property {prop}", ins=2, outs=2, outtype=["", ""])
        pre = d.obj(f"prepend {sel}")
        d.connect(lpath, 0, obs, 1)
        d.connect(obs, 0, pre, 0)
        d.connect(pre, 0, panel, 0)

    # division -> metro interval
    sel = d.obj("sel 0 1 2 3", ins=2, outs=5, outtype=["bang"] * 4 + [""])
    d.connect(orig["division"], 0, sel, 0)
    for i, nv in enumerate(["4n", "8n", "16n", "32n"]):
        m = d.msg(f"interval {nv}")
        d.connect(sel, i, m, 0)
        d.connect(m, 0, tick_metro, 0)

    # uid distribution + window opening
    route = d.obj("route uid open", ins=1, outs=3, outtype=["", "", ""])
    pre_uid = d.obj("prepend uid")
    s_uid = d.obj("s ---rk_uid", ins=1, outs=0, outtype=[])
    d.connect(panel, 0, route, 0)
    d.connect(route, 0, pre_uid, 0)
    d.connect(pre_uid, 0, s_uid, 0)
    d.connect(route, 2, widget_route, 0)   # everything else from the panel: parameter changes

    open_msg = d.msg("open")
    pc = d.obj("pcontrol", ins=1, outs=1)
    win = d.add("newobj", text="p LargeView", numinlets=1, numoutlets=0, patcher=build_window())
    # live.text (button mode) output differs between versions (bang or 1/0): accept anything
    open_t = d.obj("t b b", outs=2, outtype=["bang", "bang"])
    s_open = d.obj("s ---rk_open", ins=1, outs=0, outtype=[])
    d.connect(route, 1, open_t, 0)
    d.connect(open_t, 1, open_msg, 0)   # path 1: pcontrol -> open subpatcher window
    d.connect(open_t, 0, s_open, 0)     # path 2: window's own thispatcher "front"
    d.connect(open_msg, 0, pc, 0)
    d.connect(pc, 0, win, 0)

    # audio: pass-through (no processing yet) + level for DOSE + meters
    pin = d.obj("plugin~", ins=2, outs=2, outtype=["signal", "signal"])
    pout = d.obj("plugout~", ins=2, outs=2, outtype=["signal", "signal"])
    add = d.obj("+~", ins=2, outs=1, outtype=["signal"])
    peak = d.obj("peakamp~ 33", ins=2, outs=1, outtype=["float"])
    pre_lvl = d.obj("prepend level")
    d.connect(pin, 0, pout, 0)
    d.connect(pin, 1, pout, 1)
    d.connect(pin, 0, add, 0)
    d.connect(pin, 1, add, 1)
    d.connect(add, 0, peak, 0)
    d.connect(peak, 0, pre_lvl, 0)
    d.connect(pre_lvl, 0, panel, 0)
    # meters are drawn by the panel jsui (live.meter~ on top of it was hidden in Live 0.1.6)
    pk = d.obj("pak f f", ins=2, outs=1)
    pre_m = d.obj("prepend meters")
    for ch in (0, 1):
        pa = d.obj("peakamp~ 33", ins=2, outs=1, outtype=["float"])
        d.connect(pin, ch, pa, 0)
        d.connect(pa, 0, pk, ch)
    d.connect(pk, 0, pre_m, 0)
    d.connect(pre_m, 0, panel, 0)

    params = {}
    for b in d.boxes:
        box = b["box"]
        if box.get("parameter_enable") == 1:
            v = box["saved_attribute_attributes"]["valueof"]
            params[box["id"]] = [v["parameter_longname"], v["parameter_shortname"], 0]

    return {"patcher": {
        "fileversion": 1,
        "appversion": {"major": 8, "minor": 6, "revision": 0, "architecture": "x64", "modernui": 1},
        "classnamespace": "box",
        "rect": [80.0, 80.0, 1200.0, 820.0],
        "openrect": [0.0, 0.0, float(DEVICE_W), float(DEVICE_H)],
        "openinpresentation": 1,
        "devicewidth": float(DEVICE_W),
        "description": "Runklimpsest UI prototype - granular particle memory (no audio processing yet)",
        "boxes": d.boxes,
        "lines": d.lines,
        "parameters": dict(params, inherited_shortname=1, parameterbanks={
            str(i): {"index": i, "name": bank, "parameters": [P[n]["label"] for n in names]}
            for i, (bank, names) in enumerate(BANKS)}),
        "dependency_cache": [{"name": JS, "bootpath": ".", "type": "TEXT", "implicit": 1}],
        "latency": 0,
        "is_mpe": 0,
        "oscreceiveudpport": 0,
        "minimum_live_version": "",
        "minimum_max_version": "",
        "platform_compatibility": 0,
        "autosave": 0,
    }}


def write_amxd(patch, path):
    """Unfrozen .amxd: 'ampf' header (audio effect) + 'meta' + 'ptch' chunk with the JSON."""
    body = json.dumps(patch, indent=1, ensure_ascii=False).encode("utf-8") + b"\n\x00"
    data = (b"ampf" + struct.pack("<I", 4) + b"aaaa"
            + b"meta" + struct.pack("<I", 4) + b"\x00\x00\x00\x00"
            + b"ptch" + struct.pack("<I", len(body)) + body)
    path.write_bytes(data)


if __name__ == "__main__":
    patch = build_device()
    (HERE / "Runklimpsest.maxpat").write_text(json.dumps(patch, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    write_amxd(patch, HERE / "Runklimpsest.amxd")
    inject_js()
    print("boxes:", len(patch["patcher"]["boxes"]), "lines:", len(patch["patcher"]["lines"]),
          "parameters:", sum(1 for k in patch["patcher"]["parameters"] if k.startswith("obj-")))

#!/usr/bin/env python3
"""Generates the Runklimpsest UI prototype as a Max for Live audio effect.

Outputs (next to this script):
  Runklimpsest.maxpat  - plain Max patch (fallback: paste into a new M4L device)
  Runklimpsest.amxd    - Max for Live audio effect (unfrozen, needs runklimpsest_ui.js beside it)

Parameter rule: every function exists exactly once as a live.* object with
Parameter Mode in the device patcher. Controls in the large view are mirrors
(parameter_enable 0) synced via [prepend set] -> [s ---<name>_v] and
[s ---<name>_c] -> original.
"""
import json
import struct
from pathlib import Path

VERSION = "0.1.2"
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
# name, label, kind, min, max, initial, unitstyle (0 int,1 float,2 ms,4 dB,5 %,9 custom), units, colour, extra
PARAMS = [
    dict(name="gravity", label="Gravity", kind="dial", lo=0.0, hi=1.0, init=0.62, style=9, units="%.2f g", col=CYAN, col0=BLUE),
    dict(name="bounce", label="Bounce", kind="dial", lo=0.0, hi=100.0, init=80.0, style=5, col=CYAN, col0=BLUE),
    dict(name="swarm", label="Swarm", kind="dial", lo=1, hi=24, init=12, style=0, ptype=1, col=CYAN, col0=BLUE),
    dict(name="erosion", label="Erosion", kind="dial", lo=0.0, hi=100.0, init=55.0, style=5, col=ORANGE, col0=RED),
    dict(name="mix", label="Mix", kind="dial", lo=0.0, hi=100.0, init=100.0, style=5, col=CYAN, col0=BLUE),
    dict(name="grain", label="Grain", kind="dial", lo=5.0, hi=500.0, init=80.0, style=2, exponent=2.0, col=CYAN, col0=BLUE),
    dict(name="heal", label="Heal", kind="dial", lo=0.5, hi=60.0, init=8.0, style=9, units="%.1f s", exponent=2.0, col=ORANGE, col0=RED),
    dict(name="rate", label="Dose Rate", short="Rate", kind="dial", lo=1.0, hi=32.0, init=4.0, style=9, units="%.0f bars", col=MAGENTA, col0=PURPLE),
    dict(name="recover", label="Dose Recover", short="Recover", kind="dial", lo=1.0, hi=64.0, init=12.0, style=9, units="%.0f bars", col=MAGENTA, col0=PURPLE),
    dict(name="output", label="Output", kind="dial", lo=-24.0, hi=12.0, init=0.0, style=4, col=CYAN, col0=BLUE),
    dict(name="freeze", label="Freeze", kind="toggle", text="FREEZE", init=0, col=CYAN),
    dict(name="sync", label="Sync", kind="toggle", text="SYNC", init=1, col=CYAN),
    dict(name="division", label="Division", kind="menu", items=["1/4", "1/8", "1/16", "1/32"], init=2, col=CYAN),
    dict(name="weartype", label="Wear Type", kind="tab", items=["SAT", "TAPE", "BIT"], init=0, col=ORANGE),
    dict(name="target", label="Dose Target", kind="tab", items=["ALL", "SWARM", "WEAR"], init=0, col=MAGENTA),
    dict(name="resetdose", label="Dose Reset", kind="button", text="RESET DOSE", init=0, col=MAGENTA),
]
P = {p["name"]: p for p in PARAMS}

# device presentation (1x, 580 x 169); None = parameter lives hidden in the device
DEVICE_RECT = {
    "gravity": [376, 34, 52, 62], "bounce": [430, 34, 52, 62], "swarm": [484, 34, 52, 62],
    "erosion": [306, 98, 56, 64], "mix": [430, 100, 52, 62],
    "freeze": [214, 106, 76, 20], "sync": [116, 22, 40, 13], "division": [160, 22, 46, 13],
}
# large view (960 x 620)
WIN_W, WIN_H = 960, 620
WINDOW_RECT = {
    "gravity": [112, 448, 56, 66], "bounce": [172, 448, 56, 66], "swarm": [232, 448, 56, 66],
    "erosion": [292, 448, 56, 66], "mix": [352, 448, 56, 66],
    "sync": [430, 454, 56, 20], "division": [490, 454, 40, 20], "freeze": [430, 482, 100, 20],
    "grain": [112, 534, 56, 66], "heal": [172, 534, 56, 66], "rate": [232, 534, 56, 66],
    "recover": [292, 534, 56, 66], "output": [352, 534, 56, 66],
    "weartype": [430, 556, 150, 20], "target": [600, 556, 170, 20], "resetdose": [800, 556, 100, 20],
}

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


def valueof(p, enabled=True):
    v = {"parameter_longname": p["label"], "parameter_shortname": p.get("short", p["label"]),
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
    if not enabled:
        v["parameter_invisible"] = 1
    return v


def control(patch, p, pres, mirror):
    """Creates a live.* control. mirror=True: no parameter of its own."""
    kind, col = p["kind"], p["col"]
    common = dict(varname=("m_" if mirror else "") + p["name"], parameter_enable=0 if mirror else 1,
                  saved_attribute_attributes={"valueof": valueof(p, not mirror)})
    if kind == "dial":
        oid = patch.add("live.dial", pres=pres, numinlets=1, numoutlets=2, outlettype=["", "float"],
                        activedialcolor=col, dialcolor=TRACK, activeneedlecolor=col, needlecolor=DIM,
                        textcolor=TEXT, fontsize=9.0, fontname=FONT_BOLD, showname=1, shownumber=1, **common)
    elif kind in ("toggle", "button"):
        oid = patch.add("live.text", pres=pres, numinlets=1, numoutlets=2, outlettype=["", ""],
                        mode=1 if kind == "toggle" else 0, text=p["text"], texton=p["text"],
                        bgcolor=BTN, activebgcolor=BTN, bgoncolor=col, activebgoncolor=col,
                        textcolor=DIM, activetextcolor=DIM, textoncolor=BTN_ON_TXT, activetextoncolor=BTN_ON_TXT,
                        bordercolor=hexc("ffffff", 0.12), focusbordercolor=col, fontsize=8.0, fontname=FONT_BOLD,
                        rounded=4.0, **common)
    elif kind == "menu":
        oid = patch.add("live.menu", pres=pres, numinlets=1, numoutlets=3, outlettype=["", "", "float"],
                        bgcolor=BTN, activebgcolor=BTN, textcolor=TEXT, activetextcolor=TEXT,
                        fontsize=8.0, fontname=FONT_BOLD, **common)
    else:  # tab
        oid = patch.add("live.tab", pres=pres, numinlets=1, numoutlets=3, outlettype=["", "", "float"],
                        num_lines_patching=1, num_lines_presentation=1,
                        bgcolor=BTN, activebgcolor=BTN, bgoncolor=col, activebgoncolor=col,
                        textcolor=DIM, activetextcolor=DIM, textoncolor=BTN_ON_TXT, activetextoncolor=BTN_ON_TXT,
                        fontsize=8.0, fontname=FONT_BOLD, rounded=4.0, **common)
    return oid


def background(patch, w, h):
    return patch.add("panel", pres=[0, 0, w, h], numinlets=1, numoutlets=0, background=1,
                     mode=1, grad1=BG_TOP, grad2=BG_BOTTOM, angle=270.0, bgcolor=BG_BOTTOM,
                     border=0, rounded=0)


def open_button(patch, text, pres):
    return patch.add("live.text", pres=pres, numinlets=1, numoutlets=2, outlettype=["", ""], mode=0,
                     text=text, texton=text, parameter_enable=0, varname="open_" + ("plus" if text == "+" else text.lower()),
                     bgcolor=BTN, activebgcolor=BTN, textcolor=TEXT, activetextcolor=TEXT,
                     bordercolor=hexc("ffffff", 0.12), fontsize=8.0, fontname=FONT_BOLD, rounded=4.0)

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
    background(d, 580, 169)
    d.add("jsui", pres=[8, 3, 200, 17], filename=JS, jsarguments=["title"], numinlets=1, numoutlets=1,
          outlettype=[""], border=0)
    memory = d.jsui("memory", [214, 22, 152, 74])
    chamber = d.jsui("chamber", [6, 37, 200, 124])
    dose = d.jsui("dose", [378, 98, 50, 66])
    d.comment(f"R3000 · v{VERSION}", [470, 5, 104, 12], DIM, 8, bold=False, just=2)
    d.comment("CHAMBER", [6, 21, 70, 14], CYAN, 9)
    d.comment("MEMORY", [214, 21, 70, 14], ORANGE, 9)
    d.comment("PHYSICS", [378, 21, 70, 14], BLUE, 9)
    d.comment("IN · OUT", [538, 151, 42, 12], DIM, 7, bold=False, just=1)

    more = open_button(d, "MORE", [486, 120, 46, 16])

    # parameters (originals)
    orig = {}
    for p in PARAMS:
        orig[p["name"]] = control(d, p, DEVICE_RECT.get(p["name"]), mirror=False)

    # engine messages, mirror sync
    rparam = d.obj("r ---rk_param", ins=0, outs=1)
    d.connect(rparam, 0, chamber, 0)
    refresh_r = d.obj("r ---rk_refresh", ins=0, outs=1)
    for p in PARAMS:
        o = orig[p["name"]]
        pre = d.obj(f"prepend {p['name']}")
        s_param = d.obj("s ---rk_param", ins=1, outs=0, outtype=[])
        pset = d.obj("prepend set")
        s_view = d.obj(f"s ---{p['name']}_v", ins=1, outs=0, outtype=[])
        r_ctl = d.obj(f"r ---{p['name']}_c", ins=0, outs=1)
        d.connect(o, 0, pre, 0)
        d.connect(pre, 0, s_param, 0)
        d.connect(o, 0, pset, 0)
        d.connect(pset, 0, s_view, 0)
        d.connect(r_ctl, 0, o, 0)
        if p["kind"] != "button":
            d.connect(refresh_r, 0, o, 0)

    # clocks
    thisdev = d.obj("live.thisdevice", ins=1, outs=3, outtype=["bang", "int", "int"])
    start = d.obj("t 1 b", outs=2, outtype=["int", "bang"])
    s_refresh = d.obj("s ---rk_refresh", ins=1, outs=0, outtype=[])
    frame = d.obj("qmetro 33", ins=2, outs=1, outtype=["bang"])
    fan = d.obj("t b b b b", outs=4, outtype=["bang"] * 4)
    s_draw = d.obj("s ---rk_draw", ins=1, outs=0, outtype=[])
    tick_metro = d.obj("metro 16n", ins=2, outs=1, outtype=["bang"])
    tick_msg = d.msg("tick")
    d.connect(thisdev, 0, start, 0)
    d.connect(start, 1, s_refresh, 0)
    d.connect(start, 0, frame, 0)
    d.connect(start, 0, tick_metro, 0)
    d.connect(frame, 0, fan, 0)
    d.connect(fan, 3, chamber, 0)
    d.connect(fan, 2, memory, 0)
    d.connect(fan, 1, dose, 0)
    d.connect(fan, 0, s_draw, 0)
    d.connect(tick_metro, 0, tick_msg, 0)
    d.connect(tick_msg, 0, chamber, 0)

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
    r_uid = d.obj("r ---rk_uid", ins=0, outs=1)
    d.connect(chamber, 0, route, 0)
    d.connect(route, 0, pre_uid, 0)
    d.connect(pre_uid, 0, s_uid, 0)
    d.connect(r_uid, 0, memory, 0)
    d.connect(r_uid, 0, dose, 0)

    open_msg = d.msg("open")
    pc = d.obj("pcontrol", ins=1, outs=1)
    win = d.add("newobj", text="p LargeView", numinlets=1, numoutlets=0, patcher=build_window())
    # live.text (button mode) output differs between versions (bang or 1/0): accept anything
    open_t = d.obj("t b b", outs=2, outtype=["bang", "bang"])
    s_open = d.obj("s ---rk_open", ins=1, outs=0, outtype=[])
    dbg = d.obj("print Runklimpsest-open", ins=1, outs=0, outtype=[])
    for b in (more,):
        d.connect(b, 0, open_t, 0)
        d.connect(b, 0, dbg, 0)
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
    d.connect(pre_lvl, 0, chamber, 0)
    for i, x in enumerate([546, 552, 562, 568]):
        m = d.add("live.meter~", pres=[x, 30, 5, 118], numinlets=1, numoutlets=1, outlettype=["list"],
                  coldcolor=hexc("3be08f"), warmcolor=hexc("ffd84a"), hotcolor=hexc("ff8a2a"),
                  overloadcolor=hexc("ff5a3d"), bgcolor=hexc("1d2027"), interval=33)
        d.connect(pin, i % 2, m, 0)

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
        "openrect": [0.0, 0.0, 580.0, 169.0],
        "openinpresentation": 1,
        "devicewidth": 580.0,
        "description": "Runklimpsest UI prototype - granular particle memory (no audio processing yet)",
        "boxes": d.boxes,
        "lines": d.lines,
        "parameters": dict(params, inherited_shortname=1),
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
    print("boxes:", len(patch["patcher"]["boxes"]), "lines:", len(patch["patcher"]["lines"]),
          "parameters:", len(patch["patcher"]["parameters"]) - 1)

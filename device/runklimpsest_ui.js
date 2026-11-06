// Runklimpsest - UI prototype (no audio processing)
// One file, jsui modes (first jsui argument):
//   device   : runs the particle engine and draws the whole device panel
//              (chamber, memory, knobs, buttons, dose ring). The real live.*
//              parameters sit on top of it, fully transparent, so dragging,
//              right-click, MIDI mapping and automation stay native to Live.
//   large    : draws chamber + memory + wear history (large view window)
//   controls : draws the large view controls; changes go out as "<name> <value>"
//   title    : draws the device name (large view)
// The engine state is shared through a Global keyed by a per-device id,
// which the device jsui announces via [s ---rk_uid].
// Max js/jsui runs an ES5 engine: no let/const/arrow functions.

autowatch = 1;
inlets = 1;
outlets = 1;

mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

var MODE = jsarguments.length > 1 ? String(jsarguments[1]) : "device";
if (MODE === "chamber") MODE = "device"; // 0.1.x name

// BEGIN GENERATED - written by build_device.py from its PARAMS / layout tables, do not edit
var VERSION = "0.1.3";
var SPEC = {"gravity": {"label": "GRAVITY", "def": 0.62, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 1.0, "exp": 1.0, "fmt": "g"}, "bounce": {"label": "BOUNCE", "def": 80.0, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "swarm": {"label": "SWARM", "def": 12, "col": "cyan", "kind": "dial", "lo": 1, "hi": 24, "exp": 1.0, "fmt": "int", "integer": true}, "erosion": {"label": "EROSION", "def": 55.0, "col": "orange", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "mix": {"label": "MIX", "def": 100.0, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "grain": {"label": "GRAIN", "def": 80.0, "col": "cyan", "kind": "dial", "lo": 5.0, "hi": 500.0, "exp": 2.0, "fmt": "ms"}, "heal": {"label": "HEAL", "def": 8.0, "col": "orange", "kind": "dial", "lo": 0.5, "hi": 60.0, "exp": 2.0, "fmt": "s"}, "rate": {"label": "RATE", "def": 4.0, "col": "magenta", "kind": "dial", "lo": 1.0, "hi": 32.0, "exp": 1.0, "fmt": "bars"}, "recover": {"label": "RECOVER", "def": 12.0, "col": "magenta", "kind": "dial", "lo": 1.0, "hi": 64.0, "exp": 1.0, "fmt": "bars"}, "output": {"label": "OUTPUT", "def": 0.0, "col": "cyan", "kind": "dial", "lo": -24.0, "hi": 12.0, "exp": 1.0, "fmt": "db"}, "freeze": {"label": "FREEZE", "def": 0, "col": "cyan", "kind": "toggle"}, "sync": {"label": "SYNC", "def": 1, "col": "cyan", "kind": "toggle"}, "division": {"label": "DIVISION", "def": 2, "col": "cyan", "kind": "menu", "items": ["1/4", "1/8", "1/16", "1/32"]}, "weartype": {"label": "WEAR TYPE", "def": 0, "col": "orange", "kind": "tab", "items": ["SAT", "TAPE", "BIT"]}, "target": {"label": "DOSE TARGET", "def": 0, "col": "magenta", "kind": "tab", "items": ["ALL", "SWARM", "WEAR"]}, "resetdose": {"label": "DOSE RESET", "def": 0, "col": "magenta", "kind": "button"}};
var LAYOUT = {"sync": [118, 3, 42, 13], "division": [163, 3, 43, 13], "freeze": [214, 92, 76, 22], "gravity": [376, 18, 54, 70], "bounce": [430, 18, 54, 70], "swarm": [484, 18, 54, 70], "erosion": [306, 92, 60, 70], "mix": [430, 92, 54, 70], "chamber": [6, 18, 200, 145], "wave": [214, 18, 152, 66], "dose": [376, 92, 54, 72], "more": [488, 124, 46, 18], "meters": [546, 18, 28, 128]};
// END GENERATED

// virtual chamber size used by the physics (rendering scales it)
var CW = 400, CH = 234, CELLS = 60, HIST_ROWS = 12, HIST_COLS = 30, MAXP = 32;
var FPS = 30;

var COL = {
    cyan: [0.275, 0.890, 1.0], blue: [0.353, 0.612, 1.0], orange: [1.0, 0.541, 0.165],
    red: [1.0, 0.290, 0.239], purple: [0.608, 0.361, 1.0], magenta: [1.0, 0.310, 0.847],
    text: [0.953, 0.961, 0.973], dim: [0.541, 0.565, 0.612], fresh: [0.812, 0.839, 0.871],
    box: [0.043, 0.047, 0.059], track: [0.149, 0.161, 0.196], beige: [0.780, 0.702, 0.604],
    btn: [0.137, 0.149, 0.18]
};

var P = {};
(function () {
    for (var k in SPEC) if (SPEC.hasOwnProperty(k)) P[k] = SPEC[k].def;
})();

var uidStr = null, G = null, S = null;
var frame = 0, lastTick = -100000, pendingTick = false, inLevel = 0;
var songTempo = 120, sigNum = 4, sigDen = 4;

function secPerBar() {
    return sigNum * (4 / Math.max(1, sigDen)) * 60 / Math.max(20, songTempo);
}

function makeState() {
    var s = { ps: [], wear: [], amp: [], hist: [], head: 0, step: 0, dose: 0, rising: false,
              n: 0, queued: 0, flashing: 0, resetReq: false, frozen: false, sync: true,
              tempo: 120, num: 4, den: 4 };
    var i, j;
    for (i = 0; i < MAXP; i++) {
        s.ps.push({ x: 20 + Math.random() * (CW - 40), y: 20 + Math.random() * (CH - 90),
                    vx: (Math.random() - 0.5) * 5, vy: Math.random() * 3, flash: 0, q: false, tr: [] });
    }
    for (i = 0; i < CELLS; i++) { s.wear.push(0); s.amp.push(0.05); }
    for (i = 0; i < HIST_ROWS; i++) {
        var row = [];
        for (j = 0; j < HIST_COLS; j++) row.push(0);
        s.hist.push(row);
    }
    return s;
}

if (MODE === "device") {
    uidStr = "rk" + Math.floor(Math.random() * 1000000000);
    G = new Global(uidStr);
    S = makeState();
    G.state = S;
    G.params = P; // current parameter values, read by the large view controls
}

// ---------------------------------------------------------------- messages

function bang() {
    if (MODE === "device" && S) {
        stepEngine();
        if (frame % 60 === 1) outlet(0, "uid", uidStr); // re-announce (robust against load order)
    }
    mgraphics.redraw();
}

function uid(v) {
    if (MODE === "device") return;
    uidStr = String(v);
    G = new Global(uidStr);
}

function tick() {
    pendingTick = true;
    lastTick = frame;
}

function level(v) { inLevel = v; }

// song tempo and time signature from [live.observer]
function tempo(v) { if (v > 0) songTempo = v; }
function signum(v) { if (v > 0) sigNum = v; }
function sigden(v) { if (v > 0) sigDen = v; }

function resetdose(v) {
    if (S && (arguments.length === 0 || v)) S.resetReq = true;
}

function anything() {
    if (P.hasOwnProperty(messagename) && arguments.length > 0) {
        P[messagename] = arguments[0];
    }
}

// ---------------------------------------------------------------- engine

function sharedState() {
    if (S) return S;
    if (G && G.state) return G.state;
    return null;
}

function params() {
    if (G && G.params) return G.params;
    return P;
}

function grain(p) {
    var flashLen = Math.round(4 + Math.min(1, P.grain / 300) * 10);
    p.flash = flashLen;
    p.flashLen = flashLen;
    p.q = false;
    var idx = Math.min(CELLS - 1, Math.max(0, Math.floor(p.x / CW * CELLS)));
    var inc = (0.02 + 0.15 * P.erosion / 100) * (P.target != 1 ? (1 + S.dose) : 1);
    S.wear[idx] = Math.min(1, S.wear[idx] + inc);
}

function stepEngine() {
    var dt = 1 / FPS, i, p, bar = secPerBar();
    frame++;
    S.tempo = songTempo; S.num = sigNum; S.den = sigDen;

    // DOSE: builds while signal is present, recovers in silence (times in bars of the song)
    var lin = inLevel * 0.5; // input is L+R
    var active = lin > 0.01; // about -40 dBFS
    if (S.resetReq) { S.dose = 0; S.resetReq = false; }
    if (active) S.dose = Math.min(1, S.dose + dt / (Math.max(1, P.rate) * bar));
    else S.dose = Math.max(0, S.dose - dt / (Math.max(1, P.recover) * bar));
    S.rising = active;

    var extra = (P.target != 2) ? Math.round(S.dose * 10) : 0;
    var n = Math.min(MAXP, Math.max(1, Math.round(P.swarm) + extra));
    S.n = n;
    S.sync = !!P.sync;
    S.frozen = !!P.freeze;

    var g = 0.15 + 0.7 * P.gravity;
    var rest = 0.45 + 0.5 * (P.bounce / 100);
    var kick = Math.sqrt(g / 0.55);

    // tempo ticks from [metro]; fallback when the transport is stopped
    var onTick = false;
    if (pendingTick) { onTick = true; pendingTick = false; }
    else if (P.sync && frame - lastTick > FPS) {
        var stepSec = bar / sigNum / [1, 2, 4, 8][Math.max(0, Math.min(3, P.division | 0))] * (sigDen / 4);
        var per = Math.max(1, Math.round(stepSec * FPS));
        if (frame % per === 0) onTick = true;
    }
    if (onTick) S.step = (S.step + 1) % 16;

    var queued = 0, flashing = 0;
    for (i = 0; i < n; i++) {
        p = S.ps[i];
        p.tr.unshift([p.x, p.y]);
        if (p.tr.length > 5) p.tr.pop();
        p.vy += g; p.x += p.vx; p.y += p.vy;
        if (p.x < 5) { p.x = 5; p.vx = -p.vx; }
        if (p.x > CW - 10) { p.x = CW - 10; p.vx = -p.vx; }
        if (p.y > CH - 18) {
            p.y = CH - 18;
            var impact = Math.abs(p.vy);
            p.vy = -impact * rest;
            if (impact > 1.5) {
                if (P.sync) p.q = true; else grain(p);
            }
            if (impact < 2.2) {
                p.vy = -(7 + Math.random() * 7) * kick;
                p.vx = (Math.random() - 0.5) * 6;
            }
        }
        if (p.flash > 0) p.flash--;
    }
    if (P.sync && onTick) {
        for (i = 0; i < n; i++) if (S.ps[i].q) grain(S.ps[i]);
    }
    for (i = 0; i < n; i++) {
        if (S.ps[i].q) queued++;
        if (S.ps[i].flash > 0) flashing++;
    }
    for (i = n; i < MAXP; i++) { S.ps[i].q = false; S.ps[i].tr = []; S.ps[i].flash = 0; }
    if (!P.sync) for (i = 0; i < MAXP; i++) S.ps[i].q = false;
    S.queued = queued;
    S.flashing = flashing;

    // HEAL: wear fades with this time constant
    var k = Math.exp(-dt / Math.max(0.1, P.heal));
    for (i = 0; i < CELLS; i++) S.wear[i] *= k;

    // write head: 2 bars of the song, overwrites with fresh input unless frozen
    if (!P.freeze) {
        S.head = (S.head + CELLS / (2 * bar * FPS)) % CELLS;
        var h = Math.floor(S.head);
        S.wear[h] = 0;
        S.amp[h] = Math.max(0.04, Math.min(1, lin * 1.4));
    }

    // wear history: one row every 0.5 s
    if (frame % 15 === 0) {
        var row = [];
        var per2 = CELLS / HIST_COLS;
        for (i = 0; i < HIST_COLS; i++) {
            var sum = 0, j;
            for (j = 0; j < per2; j++) sum += S.wear[i * per2 + j];
            row.push(sum / per2);
        }
        S.hist.unshift(row);
        S.hist.pop();
    }
}

// ---------------------------------------------------------------- formatting

function fmtValue(spec, v) {
    switch (spec.fmt) {
        case "g": return v.toFixed(2) + " g";
        case "pct": return Math.round(v) + " %";
        case "int": return String(Math.round(v));
        case "ms": return (v < 100 ? v.toFixed(1) : v.toFixed(0)) + " ms";
        case "s": return v.toFixed(1) + " s";
        case "bars": return v.toFixed(0) + " bars";
        case "db": return (v > 0 ? "+" : "") + v.toFixed(1) + " dB";
    }
    return String(v);
}

function toNorm(spec, v) {
    return Math.pow(Math.max(0, Math.min(1, (v - spec.lo) / (spec.hi - spec.lo))), 1 / (spec.exp || 1));
}

function fromNorm(spec, n) {
    var v = spec.lo + (spec.hi - spec.lo) * Math.pow(Math.max(0, Math.min(1, n)), spec.exp || 1);
    return spec.integer ? Math.round(v) : v;
}

// ---------------------------------------------------------------- drawing helpers

function rgba(c, a) { mgraphics.set_source_rgba(c[0], c[1], c[2], a === undefined ? 1 : a); }

function mixc(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function heat(w) {
    return w < 0.3 ? mixc([0.106, 0.118, 0.141], COL.fresh, w / 0.3) : mixc(COL.fresh, COL.orange, (w - 0.3) / 0.7);
}

function font(size, bold) {
    mgraphics.select_font_face(bold ? "Ableton Sans Bold" : "Ableton Sans Medium");
    mgraphics.set_font_size(size);
}

function text(str, x, y, align) {
    var m = mgraphics.text_measure(str);
    var tx = x;
    if (align === "right") tx = x - m[0];
    if (align === "center") tx = x - m[0] / 2;
    mgraphics.move_to(tx, y);
    mgraphics.show_text(str);
}

function roundBox(x, y, w, h, r, fill, border) {
    mgraphics.rectangle_rounded(x, y, w, h, r * 2, r * 2);
    rgba(fill, 1);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, border);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
}

function boxSize() {
    var r = this.box.rect;
    return [r[2] - r[0], r[3] - r[1]];
}

function background(w, h) {
    var pat = mgraphics.pattern_create_linear(0, 0, 0, h);
    pat.add_color_stop_rgba(0, 0.137, 0.149, 0.18, 1);
    pat.add_color_stop_rgba(1, 0.039, 0.039, 0.051, 1);
    mgraphics.set_source(pat);
    mgraphics.rectangle(0, 0, w, h);
    mgraphics.fill();
}

// one knob look for device and large view (Runkelizer FX style)
function drawKnobAt(spec, v, cx, cy, r, labelY, valueY, labelSize, valueSize) {
    var col = COL[spec.col] || COL.cyan, n = toNorm(spec, v), t;
    var a0 = Math.PI * 0.75, a1 = a0 + Math.PI * 1.5 * n, aEnd = Math.PI * 2.25;
    font(labelSize, true);
    rgba(col);
    text(spec.label, cx, labelY, "center");
    mgraphics.set_line_width(1);
    for (t = 0; t <= 10; t++) {
        var ta = a0 + Math.PI * 1.5 * t / 10, r1 = r + 3.5, r2 = r + (t % 5 === 0 ? 6.5 : 5);
        mgraphics.set_source_rgba(1, 1, 1, t % 5 === 0 ? 0.35 : 0.12);
        mgraphics.move_to(cx + Math.cos(ta) * r1, cy + Math.sin(ta) * r1);
        mgraphics.line_to(cx + Math.cos(ta) * r2, cy + Math.sin(ta) * r2);
        mgraphics.stroke();
    }
    var lw = Math.max(2.5, r * 0.23);
    mgraphics.set_line_width(lw);
    rgba(COL.track);
    mgraphics.arc(cx, cy, r, a0, aEnd);
    mgraphics.stroke();
    if (n > 0.002) {
        rgba(col, 0.18);
        mgraphics.set_line_width(lw * 2.3);
        mgraphics.arc(cx, cy, r, a0, a1);
        mgraphics.stroke();
        rgba(col);
        mgraphics.set_line_width(lw);
        mgraphics.arc(cx, cy, r, a0, a1);
        mgraphics.stroke();
    }
    var cr = r - lw - 1.5;
    mgraphics.set_source_rgba(0.12, 0.13, 0.15, 1);
    mgraphics.ellipse(cx - cr, cy - cr, cr * 2, cr * 2);
    mgraphics.fill();
    rgba(col);
    mgraphics.set_line_width(Math.max(1.8, r * 0.16));
    mgraphics.move_to(cx + Math.cos(a1) * cr * 0.25, cy + Math.sin(a1) * cr * 0.25);
    mgraphics.line_to(cx + Math.cos(a1) * cr * 0.85, cy + Math.sin(a1) * cr * 0.85);
    mgraphics.stroke();
    var hr = Math.max(2, r * 0.17);
    mgraphics.set_source_rgba(1, 1, 1, 0.25);
    mgraphics.ellipse(cx + Math.cos(a1) * r - hr * 1.6, cy + Math.sin(a1) * r - hr * 1.6, hr * 3.2, hr * 3.2);
    mgraphics.fill();
    mgraphics.set_source_rgba(1, 1, 1, 1);
    mgraphics.ellipse(cx + Math.cos(a1) * r - hr, cy + Math.sin(a1) * r - hr, hr * 2, hr * 2);
    mgraphics.fill();
    font(valueSize, false);
    rgba(COL.text);
    text(fmtValue(spec, v), cx, valueY, "center");
}

function drawLedButton(r, label, active, col, size) {
    mgraphics.rectangle_rounded(r[0], r[1], r[2], r[3], 6, 6);
    rgba(COL.btn);
    mgraphics.fill_preserve();
    if (active) rgba(col, 0.7); else mgraphics.set_source_rgba(1, 1, 1, 0.1);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
    var ly = r[1] + r[3] / 2, ls = Math.max(4, Math.min(6, r[3] * 0.32));
    if (active) {
        rgba(col, 0.3);
        mgraphics.ellipse(r[0] + 5, ly - ls, ls * 2 + 2, ls * 2);
        mgraphics.fill();
        rgba(col);
    } else mgraphics.set_source_rgba(0.18, 0.196, 0.231, 1);
    mgraphics.ellipse(r[0] + 6, ly - ls / 2, ls, ls);
    mgraphics.fill();
    font(size || 8, true);
    if (active) rgba(COL.text); else rgba(COL.dim);
    text(label, r[0] + r[2] / 2 + ls / 2 + 2, ly + (size || 8) * 0.36, "center");
}

function drawPlainButton(r, label, size) {
    mgraphics.rectangle_rounded(r[0], r[1], r[2], r[3], 6, 6);
    rgba(COL.btn);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, 0.14);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
    font(size || 8, true);
    rgba(COL.text);
    text(label, r[0] + r[2] / 2, r[1] + r[3] / 2 + (size || 8) * 0.36, "center");
}

function drawMenuBox(r, label, active) {
    mgraphics.rectangle_rounded(r[0], r[1], r[2], r[3], 6, 6);
    rgba(COL.btn);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, 0.1);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
    font(8, true);
    if (active) rgba(COL.text); else rgba(COL.dim);
    text(label, r[0] + 6, r[1] + r[3] / 2 + 3);
    var tx = r[0] + r[2] - 9, ty = r[1] + r[3] / 2 - 1.5;
    mgraphics.move_to(tx, ty);
    mgraphics.line_to(tx + 5, ty);
    mgraphics.line_to(tx + 2.5, ty + 3);
    mgraphics.close_path();
    rgba(COL.dim);
    mgraphics.fill();
}

function drawSeg(r, items, sel, col, label) {
    var sw = r[2] / items.length, i;
    if (label) {
        font(8, true);
        rgba(col);
        text(label, r[0], r[1] - 5);
    }
    for (i = 0; i < items.length; i++) {
        var on = i === sel, x = r[0] + i * sw;
        mgraphics.rectangle_rounded(x + 1, r[1], sw - 2, r[3], 6, 6);
        if (on) rgba(col); else rgba(COL.btn);
        mgraphics.fill_preserve();
        mgraphics.set_source_rgba(1, 1, 1, on ? 0 : 0.1);
        mgraphics.set_line_width(1);
        mgraphics.stroke();
        font(8, true);
        if (on) mgraphics.set_source_rgba(0.04, 0.04, 0.05, 1); else rgba(COL.dim);
        text(items[i], x + sw / 2, r[1] + r[3] / 2 + 3, "center");
    }
}

// ---------------------------------------------------------------- views

function drawChamber(x0, y0, w, h, st, big) {
    var sx = w / CW, sy = h / CH, i, p;
    roundBox(x0, y0, w, h, big ? 8 : 5, [0.051, 0.063, 0.078], 0.08);

    if (big) {
        mgraphics.set_line_width(1);
        for (i = 1; i < 8; i++) {
            mgraphics.set_source_rgba(1, 1, 1, 0.04);
            mgraphics.move_to(x0 + w * i / 8, y0 + 1);
            mgraphics.line_to(x0 + w * i / 8, y0 + h - 1);
            mgraphics.stroke();
        }
        var cw = (w - 16) / CELLS;
        for (i = 0; i < CELLS; i++) {
            rgba(heat(st.wear[i]), 0.85);
            mgraphics.rectangle(x0 + 8 + i * cw, y0 + h - 30, Math.max(1, cw - 1), 14);
            mgraphics.fill();
        }
        font(9, false);
        rgba(COL.dim);
        text("BUFFER START", x0 + 10, y0 + h - 4);
        text("BUFFER END", x0 + w - 10, y0 + h - 4, "right");
    }

    if (st.sync) {
        var gap = big ? 5 : 2, sw = (w - 16 - gap * 15) / 16;
        for (i = 0; i < 16; i++) {
            var cur = i === st.step;
            if (cur) rgba(COL.cyan); else if (i % 4 === 0) mgraphics.set_source_rgba(0.231, 0.247, 0.286, 1);
            else rgba(COL.track);
            mgraphics.rectangle_rounded(x0 + 8 + i * (sw + gap), y0 + (big ? 10 : 5), sw, big ? 4 : 2, 2, 2);
            mgraphics.fill();
        }
    }

    var floorY = y0 + h - (big ? 34 : 4);
    if (st.flashing > 0) rgba(COL.cyan, 0.9); else rgba(COL.track);
    mgraphics.rectangle(x0 + 6, floorY, w - 12, big ? 2 : 1.5);
    mgraphics.fill();

    var pr = big ? 5 : 2.6;
    var yScale = big ? (h - 40) / CH : sy;
    for (i = 0; i < st.n; i++) {
        p = st.ps[i];
        var px = x0 + p.x * sx + pr, py = y0 + p.y * yScale + pr;
        if (big) {
            for (var k = 1; k < p.tr.length; k++) {
                rgba(COL.cyan, 0.3 - k * 0.06);
                mgraphics.ellipse(x0 + p.tr[k][0] * sx + pr - 2, y0 + p.tr[k][1] * yScale + pr - 2, 4, 4);
                mgraphics.fill();
            }
        }
        if (p.flash > 0) {
            var fl = p.flashLen || 7;
            var rr = pr * 1.5 + (fl - p.flash) * (big ? 4 : 1.6);
            rgba(COL.cyan, 0.9 * p.flash / fl);
            mgraphics.set_line_width(big ? 2 : 1);
            mgraphics.ellipse(px - rr, py - rr, rr * 2, rr * 2);
            mgraphics.stroke();
        }
        if (p.q) {
            rgba(COL.box);
            mgraphics.ellipse(px - pr, py - pr, pr * 2, pr * 2);
            mgraphics.fill();
            rgba(COL.cyan, 0.9);
            mgraphics.set_line_width(big ? 2 : 1);
            mgraphics.ellipse(px - pr, py - pr, pr * 2, pr * 2);
            mgraphics.stroke();
        } else {
            rgba(COL.cyan, 0.25);
            mgraphics.ellipse(px - pr * 2, py - pr * 2, pr * 4, pr * 4);
            mgraphics.fill();
            mgraphics.set_source_rgba(1, 1, 1, 1);
            mgraphics.ellipse(px - pr, py - pr, pr * 2, pr * 2);
            mgraphics.fill();
        }
    }

    if (!big) {
        // count text top right, below the step bar (not covered by particles on the floor)
        font(7, false);
        rgba(COL.dim);
        text(st.n + " particles · " + (st.sync ? st.queued + " queued" : st.flashing + " grains"), x0 + w - 6, y0 + 15, "right");
    }
}

function drawWave(x0, y0, w, h, st) {
    roundBox(x0, y0, w, h, 5, COL.box, 0.08);
    var cw = (w - 8) / CELLS, i;
    for (i = 0; i < CELLS; i++) {
        var bh = Math.max(1, st.amp[i] * (1 - 0.5 * st.wear[i]) * (h - 8));
        rgba(mixc(COL.fresh, COL.orange, st.wear[i]));
        mgraphics.rectangle(x0 + 4 + i * cw, y0 + h / 2 - bh / 2, Math.max(1, cw - 0.6), bh);
        mgraphics.fill();
    }
    var hx = x0 + 4 + (st.head / CELLS) * (w - 8);
    if (st.frozen) mgraphics.set_source_rgba(0.231, 0.247, 0.286, 1); else rgba(COL.cyan);
    mgraphics.rectangle(hx, y0 + 3, 1.5, h - 6);
    mgraphics.fill();
}

function memStatus(st) { return st.frozen ? "FROZEN · decaying" : "REC · 2 BARS"; }

function tempoText(st) {
    return (st.tempo || 120).toFixed(1) + " BPM · " + (st.num || 4) + "/" + (st.den || 4);
}

function drawDose(x0, y0, w, h, st) {
    var cx = x0 + w / 2, r = Math.min(w, h - 26) / 2 - 4, cy = y0 + 12 + r + 3;
    font(8, true);
    rgba(COL.magenta);
    text("DOSE", cx, y0 + 9, "center");
    mgraphics.set_line_width(4);
    rgba(COL.track);
    mgraphics.arc(cx, cy, r, 0, Math.PI * 2);
    mgraphics.stroke();
    var a0 = -Math.PI / 2, a1 = a0 + Math.PI * 2 * Math.max(0.005, st.dose);
    rgba(COL.magenta, 0.18);
    mgraphics.set_line_width(8);
    mgraphics.arc(cx, cy, r, a0, a1);
    mgraphics.stroke();
    rgba(mixc(COL.purple, COL.magenta, st.dose));
    mgraphics.set_line_width(4);
    mgraphics.arc(cx, cy, r, a0, a1);
    mgraphics.stroke();
    font(9, true);
    rgba(COL.text);
    text(Math.round(st.dose * 100) + "%", cx, cy + 3, "center");
    font(7, false);
    if (st.rising) rgba(COL.magenta); else rgba(COL.dim);
    text(st.rising ? "BUILDING" : "RECOVERING", cx, y0 + h - 2, "center");
}

var DEVICE_KNOBS = ["gravity", "bounce", "swarm", "erosion", "mix"];

function drawDevice(w, h, st) {
    var L = LAYOUT, pv = P, i, r;
    background(w, h);

    font(9, true);
    rgba(COL.cyan); text("CHAMBER", L.chamber[0], 12);
    rgba(COL.orange); text("MEMORY", L.wave[0], 12);
    rgba(COL.blue); text("PHYSICS", L.gravity[0] + 2, 12);
    font(8, false);
    if (st.frozen) rgba(COL.cyan); else rgba(COL.dim);
    text(memStatus(st), L.wave[0] + L.wave[2], 12, "right");

    drawChamber(L.chamber[0], L.chamber[1], L.chamber[2], L.chamber[3], st, false);
    drawWave(L.wave[0], L.wave[1], L.wave[2], L.wave[3], st);

    drawLedButton(L.sync, "SYNC", !!pv.sync, COL.cyan, 7);
    var div = SPEC.division;
    drawMenuBox(L.division, div.items[Math.max(0, Math.min(div.items.length - 1, pv.division | 0))], !!pv.sync);
    drawLedButton(L.freeze, "FREEZE", !!pv.freeze, COL.cyan, 8);
    drawPlainButton(L.more, "MORE", 8);

    for (i = 0; i < DEVICE_KNOBS.length; i++) {
        r = L[DEVICE_KNOBS[i]];
        drawKnobAt(SPEC[DEVICE_KNOBS[i]], pv[DEVICE_KNOBS[i]], r[0] + r[2] / 2, r[1] + 34, 13,
                   r[1] + 8, r[1] + 63, 8, 9);
    }
    drawDose(L.dose[0], L.dose[1], L.dose[2], L.dose[3], st);

    // meter area (live.meter~ objects sit on top)
    r = L.meters;
    font(6.5, false);
    rgba(COL.dim);
    text("IN · OUT", r[0] + r[2] / 2, r[1] + r[3] + 9, "center");
    text("v" + VERSION, r[0] + r[2] / 2, h - 2, "center");
}

function drawLarge(w, h, st) {
    var leftW = Math.round(w * 0.66), gap = 16, rightX = leftW + gap, rightW = w - rightX, i, j;
    font(11, true);
    rgba(COL.cyan);
    text("CHAMBER", 2, 12);
    font(9, false);
    rgba(COL.dim);
    text("X = BUFFER POSITION · IMPACT = GRAIN", leftW, 12, "right");
    drawChamber(0, 20, leftW, h - 20, st, true);

    font(11, true);
    rgba(COL.orange);
    text("MEMORY", rightX, 12);
    font(9, false);
    if (st.frozen) rgba(COL.cyan); else rgba(COL.dim);
    text(memStatus(st) + " · " + tempoText(st), w, 12, "right");
    drawWave(rightX, 20, rightW, 120, st);

    font(9, true);
    rgba(COL.dim);
    text("WEAR HISTORY", rightX, 160);
    font(8, false);
    text("NEWEST ON TOP", w, 160, "right");
    var hy = 166, hh = 150;
    roundBox(rightX, hy, rightW, hh, 5, COL.box, 0.08);
    var cw = (rightW - 12) / HIST_COLS, rh = (hh - 12) / HIST_ROWS;
    for (i = 0; i < HIST_ROWS; i++) {
        for (j = 0; j < HIST_COLS; j++) {
            rgba(heat(st.hist[i][j]));
            mgraphics.rectangle(rightX + 6 + j * cw, hy + 6 + i * rh, Math.max(1, cw - 1), Math.max(1, rh - 1.5));
            mgraphics.fill();
        }
    }
    var ly = hy + hh + 12;
    font(8, false);
    rgba(COL.dim);
    text("FRESH", rightX, ly + 4);
    text("WORN", w, ly + 4, "right");
    for (i = 0; i < 40; i++) {
        rgba(heat(i / 39));
        mgraphics.rectangle(rightX + 40 + i * (rightW - 80) / 40, ly - 2, (rightW - 80) / 40 + 0.5, 5);
        mgraphics.fill();
    }
    var maxW = 0, maxI = 0, sum = 0;
    for (i = 0; i < CELLS; i++) { sum += st.wear[i]; if (st.wear[i] > maxW) { maxW = st.wear[i]; maxI = i; } }
    var sy = ly + 14, sw = (rightW - 8) / 2;
    roundBox(rightX, sy, sw, 38, 4, [0.07, 0.075, 0.09], 0.06);
    roundBox(rightX + sw + 8, sy, sw, 38, 4, [0.07, 0.075, 0.09], 0.06);
    font(8, true);
    rgba(COL.dim);
    text("MOST WORN", rightX + 8, sy + 13);
    text("AVG WEAR", rightX + sw + 16, sy + 13);
    font(12, true);
    rgba(COL.orange);
    text(Math.round(maxW * 100) + "% @ " + (maxI / CELLS * 2).toFixed(2) + " bars", rightX + 8, sy + 30);
    rgba(COL.text);
    text(Math.round(sum / CELLS * 100) + "%", rightX + sw + 16, sy + 30);
}

// ---------------------------------------------------------------- large view controls
// Drawn here (not as live.* mirrors): mirrors without their own parameter lose
// name, units and item lists. Every change is sent out as "<name> <value>" and
// reaches the one real parameter in the device via [route] -> [s ---<name>_c].

var KNOBS = [
    { name: "gravity", row: 0, i: 0 }, { name: "bounce", row: 0, i: 1 }, { name: "swarm", row: 0, i: 2 },
    { name: "erosion", row: 0, i: 3 }, { name: "mix", row: 0, i: 4 },
    { name: "grain", row: 1, i: 0 }, { name: "heal", row: 1, i: 1 }, { name: "rate", row: 1, i: 2 },
    { name: "recover", row: 1, i: 3 }, { name: "output", row: 1, i: 4 }
];
var ROW_Y = [0, 90], KNOB_X0 = 100, KNOB_DX = 62, KNOB_R = 15;
var BUTTONS = [
    { name: "sync", label: "SYNC", type: "toggle", rect: [420, 18, 60, 22], col: "cyan" },
    { name: "division", type: "seg", rect: [488, 18, 168, 22], col: "cyan" },
    { name: "freeze", label: "FREEZE", type: "toggle", rect: [420, 48, 236, 22], col: "cyan" },
    { name: "weartype", label: "WEAR TYPE", type: "seg", rect: [420, 112, 156, 22], col: "orange" },
    { name: "target", label: "DOSE TARGET", type: "seg", rect: [596, 112, 186, 22], col: "magenta" },
    { name: "resetdose", label: "RESET DOSE", type: "action", rect: [802, 112, 110, 22], col: "magenta" }
];
var drag = null, localVal = {};

function knobCenter(k) { return [KNOB_X0 + k.i * KNOB_DX + 28, ROW_Y[k.row] + 38]; }
function knobValue(k) {
    if (localVal.hasOwnProperty(k.name)) return localVal[k.name];
    var pv = params()[k.name];
    return (pv === undefined) ? SPEC[k.name].def : pv;
}
function sendParam(name, v) {
    localVal[name] = v;
    outlet(0, name, v);
    mgraphics.redraw();
}
function inRect(x, y, r) { return x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3]; }

function onclick(x, y, but, cmd, shift) {
    if (MODE === "device") {
        // only the dose ring is handled here; all other controls are live.* objects on top
        if (LAYOUT.dose && inRect(x, y, LAYOUT.dose) && S) { S.resetReq = true; mgraphics.redraw(); }
        return;
    }
    if (MODE !== "controls") return;
    var i;
    for (i = 0; i < KNOBS.length; i++) {
        var c = knobCenter(KNOBS[i]);
        if (Math.abs(x - c[0]) < 26 && Math.abs(y - c[1]) < 30) {
            drag = { k: KNOBS[i], y0: y, n0: toNorm(SPEC[KNOBS[i].name], knobValue(KNOBS[i])) };
            return;
        }
    }
    var pv = params();
    for (i = 0; i < BUTTONS.length; i++) {
        var b = BUTTONS[i], r = b.rect;
        if (!inRect(x, y, r)) continue;
        if (b.type === "toggle") sendParam(b.name, pv[b.name] ? 0 : 1);
        else if (b.type === "seg") {
            var items = SPEC[b.name].items;
            sendParam(b.name, Math.min(items.length - 1, Math.floor((x - r[0]) / (r[2] / items.length))));
        } else if (b.type === "action") {
            outlet(0, b.name, 1);
            var st2 = sharedState();
            if (st2) st2.resetReq = true;
        }
        return;
    }
}

function ondrag(x, y, but, cmd, shift) {
    if (MODE !== "controls" || !drag) return;
    if (!but) { delete localVal[drag.k.name]; drag = null; return; }
    var n = drag.n0 + (drag.y0 - y) / (shift ? 600 : 150);
    sendParam(drag.k.name, fromNorm(SPEC[drag.k.name], n));
}

function ondblclick(x, y) {
    if (MODE !== "controls") return;
    for (var i = 0; i < KNOBS.length; i++) {
        var c = knobCenter(KNOBS[i]);
        if (Math.abs(x - c[0]) < 26 && Math.abs(y - c[1]) < 30) {
            sendParam(KNOBS[i].name, SPEC[KNOBS[i].name].def);
            delete localVal[KNOBS[i].name];
            return;
        }
    }
}

function drawControls(w, h) {
    var pv = params(), i;
    font(10, true);
    rgba(COL.cyan);
    text("LINKED", 0, 22);
    rgba(COL.text);
    text("DETAIL", 0, ROW_Y[1] + 22);
    font(8, false);
    rgba(COL.dim);
    text("same controls", 0, 36);
    text("as on the device", 0, 47);
    text("only in this", 0, ROW_Y[1] + 36);
    text("window", 0, ROW_Y[1] + 47);
    mgraphics.rectangle_rounded(88, 0, w - 88, 80, 12, 12);
    mgraphics.set_source_rgba(0, 0, 0, 0.25);
    mgraphics.fill_preserve();
    rgba(COL.cyan, 0.2);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
    mgraphics.rectangle_rounded(88, ROW_Y[1], w - 88, 80, 12, 12);
    mgraphics.set_source_rgba(0, 0, 0, 0.25);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, 0.06);
    mgraphics.stroke();
    for (i = 0; i < KNOBS.length; i++) {
        var k = KNOBS[i], c = knobCenter(k);
        drawKnobAt(SPEC[k.name], knobValue(k), c[0], c[1], KNOB_R, ROW_Y[k.row] + 12, ROW_Y[k.row] + 72, 8, 9);
    }
    for (i = 0; i < BUTTONS.length; i++) {
        var b = BUTTONS[i], col = COL[b.col];
        if (b.type === "seg") drawSeg(b.rect, SPEC[b.name].items, pv[b.name] | 0, col, b.label);
        else drawLedButton(b.rect, b.label, b.type === "toggle" && !!pv[b.name], col, 8);
    }
    font(8, false);
    rgba(COL.dim);
    text("drag = change · shift = fine · double-click = default", w - 10, 72, "right");
}

function drawTitle(w, h) {
    var letters = "RUNKLIMPSEST", x = 0, i, size = Math.round(h * 0.62);
    font(size, false);
    for (i = 0; i < letters.length; i++) {
        var ch = letters.charAt(i);
        if (i === 0) rgba(COL.orange); else if (i === 1) rgba(COL.beige); else if (i === 2) rgba(COL.cyan); else rgba(COL.text);
        mgraphics.move_to(x, h * 0.78);
        mgraphics.show_text(ch);
        x += mgraphics.text_measure(ch)[0] + size * 0.45;
    }
}

function paint() {
    var sz = boxSize.call(this), w = sz[0], h = sz[1];
    if (MODE === "title") { drawTitle(w, h); return; }
    if (MODE === "controls") { drawControls(w, h); return; }
    var st = sharedState();
    if (!st) {
        font(8, false);
        rgba(COL.dim);
        text("waiting for engine…", 4, 12);
        return;
    }
    if (MODE === "device") drawDevice(w, h, st);
    else if (MODE === "large") drawLarge(w, h, st);
}

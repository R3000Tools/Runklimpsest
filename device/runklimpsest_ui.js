// Runklimpsest - UI prototype (no audio processing)
// One file, jsui modes (first jsui argument):
//   device   : runs the particle engine, draws the whole device panel and handles
//              all its clicks (knobs, SYNC, division, FREEZE, MORE, DOSE reset).
//              Values go out as "<name> <value>" to the hidden live.* parameters.
//              Overlapping objects did not work in Live (0.1.3-0.1.6), so the
//              device has no objects on top of this jsui except the meters.
//   large    : draws chamber + memory + wear history (large view window)
//   controls : draws the large view controls; changes go out as "<name> <value>"
//   knob     : one device knob (arg 2 = parameter name); takes drag/double-click itself
//   menu     : the device division selector; click = next, shift-click = previous
//   title    : draws the device name (large view)
// Device knobs and the division selector are jsuis that send "<name> <value>" to the
// hidden live.* parameter (transparent live.dial / live.menu overlays did not work in
// Live 0.1.5: dials took no clicks, the menu popup inherited the transparent text).
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
// knob / menu modes: second argument = parameter name (one small jsui per device control)
var NAME = jsarguments.length > 2 ? String(jsarguments[2]) : "";
if (MODE === "chamber") MODE = "device"; // 0.1.x name

// BEGIN GENERATED - written by build_device.py from its PARAMS / layout tables, do not edit
var VERSION = "0.2.3";
var NATIVE_MENU = false;
var SPEC = {"gravity": {"label": "GRAVITY", "def": 0.62, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 1.0, "exp": 1.0, "fmt": "g"}, "bounce": {"label": "BOUNCE", "def": 80.0, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "swarm": {"label": "SWARM", "def": 12, "col": "cyan", "kind": "dial", "lo": 1, "hi": 24, "exp": 1.0, "fmt": "int", "integer": true}, "erosion": {"label": "EROSION", "def": 55.0, "col": "orange", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "mix": {"label": "MIX", "def": 50.0, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "grain": {"label": "GRAIN", "def": 80.0, "col": "cyan", "kind": "dial", "lo": 5.0, "hi": 500.0, "exp": 2.0, "fmt": "ms"}, "heal": {"label": "HEAL", "def": 30.0, "col": "orange", "kind": "dial", "lo": 0.5, "hi": 60.0, "exp": 2.0, "fmt": "s"}, "rate": {"label": "RATE", "def": 4.0, "col": "magenta", "kind": "dial", "lo": 1.0, "hi": 32.0, "exp": 1.0, "fmt": "bars"}, "recover": {"label": "RECOVER", "def": 12.0, "col": "magenta", "kind": "dial", "lo": 1.0, "hi": 64.0, "exp": 1.0, "fmt": "bars"}, "output": {"label": "OUTPUT", "def": 0.0, "col": "cyan", "kind": "dial", "lo": -24.0, "hi": 12.0, "exp": 1.0, "fmt": "db"}, "freeze": {"label": "FREEZE", "def": 0, "col": "cyan", "kind": "toggle"}, "sync": {"label": "SYNC", "def": 1, "col": "cyan", "kind": "toggle"}, "division": {"label": "DIVISION", "def": 2, "col": "cyan", "kind": "menu", "items": ["1/4", "1/8", "1/16", "1/32"]}, "weartype": {"label": "WEAR TYPE", "def": 0, "col": "orange", "kind": "tab", "items": ["SAT", "TAPE", "BIT"]}, "target": {"label": "DOSE TARGET", "def": 0, "col": "magenta", "kind": "tab", "items": ["ALL", "SWARM", "WEAR"]}, "resetdose": {"label": "DOSE RESET", "def": 0, "col": "magenta", "kind": "button"}, "stereo": {"label": "STEREO", "def": 0, "col": "cyan", "kind": "tab", "items": ["STEREO", "MONO"]}};
var LAYOUT = {"gravity": [378, 18, 54, 60], "bounce": [432, 18, 54, 60], "swarm": [486, 18, 54, 60], "erosion": [378, 78, 54, 60], "mix": [486, 78, 54, 60], "sync": [8, 144, 98, 18], "division": [110, 144, 98, 18], "freeze": [218, 144, 150, 18], "chamber": [8, 18, 200, 120], "wave": [218, 18, 150, 120], "controls": [378, 18, 162, 120], "dose": [432, 78, 54, 60], "more": [378, 144, 162, 18], "meters": [548, 18, 24, 120]};
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
        // 0.2.2: every particle keeps its own launch strength and sideways speed (golden-ratio
        // spread) -> each bounces with its own period = interlocking polyrhythms instead of noise
        var launch = 7 + 7 * ((i * 0.6180339) % 1), side = (((i * 0.3819660) % 1) - 0.5) * 6;
        s.ps.push({ x: 20 + Math.random() * (CW - 40), y: 20 + Math.random() * (CH - 90),
                    vx: side, vy: Math.random() * 3, flash: 0, q: false, tr: [],
                    launch: launch, side: Math.abs(side) + 0.4 });
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

// SYNC grid tick from [metro] (transport-locked): queued grains fire right now, not at the
// next 30 fps frame (0.1.x released them up to 33 ms late)
function tick() {
    lastTick = frame;
    if (!S) return;
    syncTick();
}

// grid tick (DIVISION): particles that came to rest start their next throw on the grid
// (0.2.2: free bounces, anchored throws - SYNC off sounded random), SYNC also fires queued grains
function gridStepSec() {
    return secPerBar() / sigNum / [1, 2, 4, 8][Math.max(0, Math.min(3, P.division | 0))] * (sigDen / 4);
}

// throw speed so that the first impact lands exactly m grid steps after the throw:
// each particle has its own preferred flight time (0.3 .. 1.0 x, GRAVITY shortens it),
// rounded to whole grid steps -> main hits on the grid, bounce tails free
function throwSteps(p) {
    var target = (0.3 + 0.7 * (((p.launch || 10) - 7) / 7)) * (1.6 - P.gravity);
    return Math.max(1, Math.round(target / gridStepSec()));
}

function throwSpeed(p, m) {
    var g = 0.15 + 0.7 * P.gravity;
    var frames = m * gridStepSec() * FPS;
    return g * (frames + 1) / 2; // semi-implicit Euler: back on the floor after "frames" steps
}

// x position where a thrown particle will land (walls reflect), for the scheduled main hit
function landingX(p, frames) {
    var x = p.x, vx = p.vx, k;
    for (k = 0; k < Math.ceil(frames); k++) {
        x += vx;
        if (x < 5) { x = 5; vx = -vx; }
        if (x > CW - 10) { x = CW - 10; vx = -vx; }
    }
    return x;
}

function syncTick() {
    S.step = (S.step + 1) % 16;
    for (var i = 0; i < S.n; i++) {
        var p = S.ps[i];
        if (p.rest) {
            p.rest = false;
            var m = throwSteps(p), v = throwSpeed(p, m), frames = m * gridStepSec() * FPS;
            p.vy = -v;
            p.vx = (p.vx < 0 ? -1 : 1) * (p.side || 2);
            // main hit: scheduled now, sample-accurate, exactly m grid steps ahead (the frame-
            // based physics would land it up to one frame late); physics only draws it
            var lx = landingX(p, frames) / CW;
            emitGrain(Math.max(0, Math.min(1, lx)), impactAmp(v), Math.max(0, Math.min(1, lx)), m * gridStepSec() * 1000);
            p.skipHit = true;
        }
        if (P.sync && p.q) fireGrain(p, 0);
    }
}

function level(v) { inLevel = v; }

// peaks IN L/R, OUT L/R for the drawn meters
var meterL = 0, meterR = 0, meterOL = 0, meterOR = 0;
function meters(l, r, ol, or) {
    meterL = Math.max(l || 0, meterL * 0.85);
    meterR = Math.max(r || 0, meterR * 0.85);
    meterOL = Math.max(ol === undefined ? (l || 0) : ol, meterOL * 0.85);
    meterOR = Math.max(or === undefined ? (r || 0) : or, meterOR * 0.85);
}

// song tempo and time signature from [live.observer]
function tempo(v) { if (v > 0) songTempo = v; }
function signum(v) { if (v > 0) sigNum = v; }
function sigden(v) { if (v > 0) sigDen = v; }

// LARGE VIEW opened: place the window around the mouse position (screen coordinates from
// [mousestate]) so it opens on the monitor that shows Live, not always on the main monitor
var WIN_W = 960, WIN_H = 620;
function winpos(mx, my) {
    // the device sits at the bottom of Live: open fully above the mouse, centred horizontally
    var x1 = Math.round(mx - WIN_W / 2), y1 = Math.round(my - WIN_H - 40);
    outlet(0, "win", "window", "size", x1, y1, x1 + WIN_W, y1 + WIN_H);
    outlet(0, "win", "window", "exec");
}

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

// ---------------------------------------------------------------- grain events -> gen~
// Every grain is written into the event ring buffer~ ---rkev (slot k: pos, amp, pan x,
// delay ms at k*4 .. k*4+3) via [peek~], then the head index goes to gen~ (p_evhead).
var EV_SLOTS = 64, evCount = 0, sentDose = -1, sentBar = -1;

function emitGrain(pos, amp, x, delayMs) {
    evCount = (evCount + 1) % EV_SLOTS;
    var b = evCount * 4;
    outlet(0, "evw", b, pos);
    outlet(0, "evw", b + 1, amp);
    outlet(0, "evw", b + 2, x);
    outlet(0, "evw", b + 3, delayMs);
    outlet(0, "gen", "p_evhead", evCount);
}

// impact speed (px/frame, ~1.5 .. 20) -> grain level 0.25 .. 1 (bounce decay audible)
function impactAmp(imp) {
    var a = Math.max(0, Math.min(1, (imp - 1.5) / 12));
    return 0.25 + 0.75 * Math.sqrt(a);
}

function fireGrain(p, delayMs) {
    emitGrain(Math.max(0, Math.min(1, p.x / CW)), impactAmp(p.imp || 4), Math.max(0, Math.min(1, p.x / CW)),
              delayMs || 0);
    markGrain(p);
}

// display side of a grain: flash ring and wear model
function markGrain(p) {
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

    // parameters only the audio engine needs (sent when changed)
    if (Math.abs(S.dose - sentDose) > 0.004) { sentDose = S.dose; outlet(0, "gen", "p_dose", S.dose); }
    if (Math.abs(bar - sentBar) > 0.0005) { sentBar = bar; outlet(0, "gen", "p_barsec", bar); }

    // fallback grid when the transport is stopped (no [metro] ticks for 1 s)
    var fallbackTick = false;
    if (frame - lastTick > FPS) {
        var stepSec = bar / sigNum / [1, 2, 4, 8][Math.max(0, Math.min(3, P.division | 0))] * (sigDen / 4);
        var per = Math.max(1, Math.round(stepSec * FPS));
        if (frame % per === 0) fallbackTick = true;
    }

    var queued = 0, flashing = 0;
    for (i = 0; i < n; i++) {
        p = S.ps[i];
        p.tr.unshift([p.x, p.y]);
        if (p.tr.length > 5) p.tr.pop();
        if (p.rest) {
            // lying on the floor, waiting for the next grid tick
            if (p.flash > 0) p.flash--;
            continue;
        }
        var y0 = p.y;
        p.vy += g; p.x += p.vx; p.y += p.vy;
        if (p.x < 5) { p.x = 5; p.vx = -p.vx; }
        if (p.x > CW - 10) { p.x = CW - 10; p.vx = -p.vx; }
        if (p.y > CH - 18) {
            // fraction of this frame at which the floor was crossed -> sample-accurate timing
            var frac = (p.vy > 0) ? Math.max(0, Math.min(1, (CH - 18 - y0) / p.vy)) : 0;
            p.y = CH - 18;
            var impact = Math.abs(p.vy);
            p.vy = -impact * rest;
            if (impact > 1.5) {
                p.imp = impact;
                if (p.skipHit) {
                    // main hit was already scheduled at the throw: only flash and wear display
                    p.skipHit = false;
                    markGrain(p);
                } else if (P.sync) p.q = true; else fireGrain(p, frac * 1000 / FPS);
            }
            if (impact < 2.2) {
                // came to rest: wait for the next grid tick (syncTick) for the next throw
                p.vy = 0;
                p.rest = true;
            }
        }
        if (p.flash > 0) p.flash--;
    }
    if (fallbackTick) syncTick();
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

function drawMenuBox(r, label, active, boxOnly) {
    mgraphics.rectangle_rounded(r[0], r[1], r[2], r[3], 6, 6);
    rgba(COL.btn);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, 0.1);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
    if (boxOnly) return;
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

var resetFlashUntil = 0;
function flashReset() { resetFlashUntil = new Date().getTime() + 350; }
function resetFlashing() { return new Date().getTime() < resetFlashUntil; }

function drawDose(x0, y0, w, h, st) {
    var cx = x0 + w / 2, r = Math.min(w, h - 26) / 2 - 4, cy = y0 + 12 + r + 3;
    if (resetFlashing()) {
        rgba(COL.magenta, 0.35);
        mgraphics.ellipse(cx - r - 6, cy - r - 6, (r + 6) * 2, (r + 6) * 2);
        mgraphics.fill();
    }
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

// layout 0.1.13: 3 columns (CHAMBER | MEMORY | CONTROLS 3x2) + meters, one header row,
// one button row; knob cells 54 x 60
function drawDeviceKnob(name) {
    var r = LAYOUT[name];
    drawKnobAt(SPEC[name], valueOf(name), r[0] + r[2] / 2, r[1] + 31, 12, r[1] + 9, r[1] + 57, 8, 8.5);
}

function drawDevice(w, h, st) {
    var L = LAYOUT, pv = P, i, r;
    background(w, h);

    // header row
    font(9, true);
    rgba(COL.cyan); text("CHAMBER", L.chamber[0], 13);
    rgba(COL.orange); text("MEMORY", L.wave[0], 13);
    rgba(COL.dim); text("CONTROLS", L.controls[0], 13);
    font(7.5, false);
    rgba(COL.dim);
    text(st.n + " particles \u00b7 " + (st.sync ? st.queued + " queued" : st.flashing + " grains"),
         L.chamber[0] + L.chamber[2], 13, "right");
    if (st.frozen) rgba(COL.cyan); else rgba(COL.dim);
    text(memStatus(st), L.wave[0] + L.wave[2], 13, "right");

    drawChamber(L.chamber[0], L.chamber[1], L.chamber[2], L.chamber[3], st, false);
    drawWave(L.wave[0], L.wave[1], L.wave[2], L.wave[3], st);

    // controls block (3 x 2)
    r = L.controls;
    mgraphics.rectangle_rounded(r[0], r[1], r[2], r[3], 10, 10);
    mgraphics.set_source_rgba(0, 0, 0, 0.22);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, 0.05);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
    for (i = 0; i < DEVICE_KNOBS.length; i++) drawDeviceKnob(DEVICE_KNOBS[i]);
    drawDose(L.dose[0], L.dose[1], L.dose[2], L.dose[3], st);

    // button row
    var div = SPEC.division, dv = valueOf("division") | 0;
    drawLedButton(L.sync, "SYNC", !!pv.sync, COL.cyan, 8);
    drawMenuBox(L.division, div.items[Math.max(0, Math.min(div.items.length - 1, dv))], !!pv.sync);
    drawLedButton(L.freeze, "FREEZE", !!pv.freeze, COL.cyan, 8);
    drawPlainButton(L.more, "LARGE VIEW  \u203a", 8);

    // meters: IN L/R, OUT L/R
    r = L.meters;
    var mv = [meterL, meterR, meterOL, meterOR], mxs = [0, 6, 13, 19];
    for (i = 0; i < 4; i++) {
        var mx = r[0] + mxs[i], mh = r[3];
        mgraphics.set_source_rgba(0.114, 0.125, 0.153, 1);
        mgraphics.rectangle_rounded(mx, r[1], 5, mh, 3, 3);
        mgraphics.fill();
        var db = mv[i] > 0.00001 ? 20 * Math.log(mv[i]) / Math.LN10 : -90;
        var nrm = Math.max(0, Math.min(1, (db + 60) / 60)), fh = nrm * mh;
        if (fh > 0.5) {
            var pat = mgraphics.pattern_create_linear(0, r[1] + mh, 0, r[1]);
            pat.add_color_stop_rgba(0, 0.231, 0.878, 0.561, 1);
            pat.add_color_stop_rgba(0.75, 0.231, 0.878, 0.561, 1);
            pat.add_color_stop_rgba(0.9, 1.0, 0.847, 0.290, 1);
            pat.add_color_stop_rgba(1, 1.0, 0.353, 0.239, 1);
            mgraphics.set_source(pat);
            mgraphics.rectangle_rounded(mx, r[1] + mh - fh, 5, fh, 3, 3);
            mgraphics.fill();
        }
    }
    font(6.5, false);
    rgba(COL.dim);
    text("IN \u00b7 OUT", r[0] + r[2] / 2, 13, "center");
    text("v" + VERSION, r[0] + r[2] / 2, L.more[1] + L.more[3] - 4, "center");

    if (menuOpen) drawDivisionMenu(dv);
}

function drawDivisionMenu(cur) {
    var items = SPEC.division.items, first = menuItemRect(0), n = items.length, i;
    mgraphics.rectangle_rounded(first[0] - 1, first[1] - 1, first[2] + 2, n * MENU_ITEM_H + 2, 6, 6);
    mgraphics.set_source_rgba(0.09, 0.098, 0.118, 0.98);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, 0.16);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
    for (i = 0; i < n; i++) {
        var r = menuItemRect(i), on = i === cur;
        if (on) {
            rgba(COL.cyan, 0.18);
            mgraphics.rectangle_rounded(r[0] + 1, r[1] + 1, r[2] - 2, r[3] - 2, 4, 4);
            mgraphics.fill();
        }
        font(8, true);
        if (on) rgba(COL.cyan); else rgba(COL.text);
        text(items[i], r[0] + 7, r[1] + r[3] / 2 + 3);
    }
}

function drawLegendDot(x, y) {
    rgba(COL.cyan);
    mgraphics.ellipse(x - 2.5, y - 2.5, 5, 5);
    mgraphics.fill();
}

function drawLarge(w, h, st) {
    var leftW = 600, rightX = 616, rightW = w - rightX, i, j;
    // header: logo left, legend + tempo right
    drawTitleAt(0, 8, 22);
    font(8.5, false);
    rgba(COL.dim);
    var tt = tempoText(st);
    text(tt, w, 24, "right");
    var lx = w - mgraphics.text_measure(tt)[0] - 22;
    text("ALSO ON DEVICE", lx, 24, "right");
    drawLegendDot(lx - mgraphics.text_measure("ALSO ON DEVICE")[0] - 8, 21);

    font(10, true);
    rgba(COL.cyan);
    text("CHAMBER", 0, 58);
    font(8.5, false);
    rgba(COL.dim);
    text("X = BUFFER POSITION \u00b7 IMPACT = GRAIN", leftW, 58, "right");
    drawChamber(0, 66, leftW, h - 66, st, true);

    font(10, true);
    rgba(COL.orange);
    text("MEMORY", rightX, 58);
    font(8.5, false);
    if (st.frozen) rgba(COL.cyan); else rgba(COL.dim);
    text(memStatus(st), w, 58, "right");
    drawWave(rightX, 66, rightW, 120, st);

    font(8.5, true);
    rgba(COL.dim);
    text("WEAR HISTORY", rightX, 208);
    font(8, false);
    text("NEWEST ON TOP", w, 208, "right");
    var hy = 214, hh = 160;
    roundBox(rightX, hy, rightW, hh, 5, COL.box, 0.08);
    var cw = (rightW - 12) / HIST_COLS, rh = (hh - 12) / HIST_ROWS;
    for (i = 0; i < HIST_ROWS; i++) {
        for (j = 0; j < HIST_COLS; j++) {
            rgba(heat(st.hist[i][j]));
            mgraphics.rectangle(rightX + 6 + j * cw, hy + 6 + i * rh, Math.max(1, cw - 1), Math.max(1, rh - 1.5));
            mgraphics.fill();
        }
    }
    var maxW = 0, maxI = 0, sum = 0;
    for (i = 0; i < CELLS; i++) { sum += st.wear[i]; if (st.wear[i] > maxW) { maxW = st.wear[i]; maxI = i; } }
    var sy = 384, sw = (rightW - 8) / 2;
    roundBox(rightX, sy, sw, h - sy, 6, [0.07, 0.075, 0.09], 0.06);
    roundBox(rightX + sw + 8, sy, sw, h - sy, 6, [0.07, 0.075, 0.09], 0.06);
    font(7.5, true);
    rgba(COL.dim);
    text("MOST WORN", rightX + 10, sy + 14);
    text("AVG WEAR", rightX + sw + 18, sy + 14);
    font(12, true);
    rgba(COL.orange);
    text(Math.round(maxW * 100) + "% @ " + (maxI / CELLS * 2).toFixed(2) + " bars", rightX + 10, sy + 32);
    rgba(COL.text);
    text(Math.round(sum / CELLS * 100) + "%", rightX + sw + 18, sy + 32);
}

// ---------------------------------------------------------------- large view controls
// Drawn here (not as live.* mirrors): mirrors without their own parameter lose
// name, units and item lists. Every change is sent out as "<name> <value>" and
// reaches the one real parameter in the device via [route] -> [s ---<name>_c].

// layout 0.1.13: four cards by function, knobs row + buttons row, contents centred
var CARDS = [
    { label: "PHYSICS", col: "cyan", rect: [0, 0, 280, 160] },
    { label: "MEMORY", col: "orange", rect: [289, 0, 228, 160] },
    { label: "DOSE", col: "magenta", rect: [526, 0, 250, 160] },
    { label: "OUTPUT", col: "cyan", rect: [785, 0, 135, 160] }
];
var KNOB_CY = 64, KNOB_R = 15, KNOB_LABEL_Y = 36, KNOB_VALUE_Y = 99;
var KNOBS = [
    { name: "gravity", x: 10, dev: true }, { name: "bounce", x: 76, dev: true },
    { name: "swarm", x: 142, dev: true }, { name: "grain", x: 208 },
    { name: "erosion", x: 339, dev: true }, { name: "heal", x: 405 },
    { name: "rate", x: 620 }, { name: "recover", x: 686 },
    { name: "mix", x: 788, dev: true }, { name: "output", x: 854 }
];
var BUTTONS = [
    { name: "sync", label: "SYNC", type: "toggle", rect: [12, 118, 72, 26], col: "cyan", dev: true },
    { name: "division", type: "seg", rect: [90, 118, 182, 26], col: "cyan", dev: true },
    { name: "freeze", label: "FREEZE", type: "toggle", rect: [296, 118, 84, 26], col: "cyan", dev: true },
    { name: "weartype", type: "seg", rect: [386, 118, 124, 26], col: "orange" },
    { name: "target", type: "seg", rect: [536, 118, 160, 26], col: "magenta" },
    { name: "resetdose", label: "RESET", type: "action", rect: [702, 118, 64, 26], col: "magenta" },
    { name: "stereo", type: "seg", rect: [795, 118, 114, 26], col: "cyan" }
];
var DOSE_RECT = [554, 26, 62, 80];
var drag = null, localVal = {};

function knobCenter(k) { return [k.x + 31, KNOB_CY]; }
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

var single = null; // drag state for knob mode
var devDrag = null; // drag state for device knobs

function valueOf(name) {
    if (localVal.hasOwnProperty(name)) return localVal[name];
    var pv = params()[name];
    return (pv === undefined) ? SPEC[name].def : pv;
}

function deviceKnobAt(x, y) {
    for (var i = 0; i < DEVICE_KNOBS.length; i++) if (inRect(x, y, LAYOUT[DEVICE_KNOBS[i]])) return DEVICE_KNOBS[i];
    return null;
}

function doReset() {
    outlet(0, "resetdose", 1);
    var st = sharedState();
    if (st) st.resetReq = true;
    flashReset();
    mgraphics.redraw();
}

// division dropdown, drawn by the device jsui itself (no native popup possible here)
var menuOpen = false, MENU_ITEM_H = 14;
function menuItemRect(i) {
    // opens upward: the division field sits in the bottom button row
    var d = LAYOUT.division, n = SPEC.division.items.length;
    return [d[0], d[1] - 3 - (n - i) * MENU_ITEM_H, d[2], MENU_ITEM_H];
}

function deviceClick(x, y, shift) {
    var L = LAYOUT, k, i;
    if (menuOpen) {
        // any click closes the list; a click on an item selects it
        menuOpen = false;
        for (i = 0; i < SPEC.division.items.length; i++) {
            if (inRect(x, y, menuItemRect(i))) { sendParam("division", i); delete localVal.division; break; }
        }
        mgraphics.redraw();
        return;
    }
    k = deviceKnobAt(x, y);
    if (k) { devDrag = { name: k, y0: y, n0: toNorm(SPEC[k], valueOf(k)) }; return; }
    if (inRect(x, y, L.sync)) { sendParam("sync", P.sync ? 0 : 1); delete localVal.sync; return; }
    if (inRect(x, y, L.freeze)) { sendParam("freeze", P.freeze ? 0 : 1); delete localVal.freeze; return; }
    if (inRect(x, y, L.division)) { menuOpen = true; mgraphics.redraw(); return; }
    if (inRect(x, y, L.more)) { outlet(0, "open"); return; }
    if (inRect(x, y, L.dose)) { doReset(); return; }
}

function singleValue() {
    if (localVal.hasOwnProperty(NAME)) return localVal[NAME];
    var pv = params()[NAME];
    return (pv === undefined) ? SPEC[NAME].def : pv;
}

function onclick(x, y, but, cmd, shift) {
    if (MODE === "device") { deviceClick(x, y, shift); return; }
    if (MODE === "knob" && SPEC[NAME]) {
        single = { y0: y, n0: toNorm(SPEC[NAME], singleValue()) };
        return;
    }
    if (MODE === "menu" && SPEC[NAME]) {
        var cnt = SPEC[NAME].items.length, cur = singleValue() | 0;
        sendParam(NAME, (cur + (shift ? cnt - 1 : 1)) % cnt);
        delete localVal[NAME];
        return;
    }
    if (MODE === "controls" && inRect(x, y, DOSE_RECT)) { doReset(); return; }
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
            doReset();
        }
        return;
    }
}

function ondrag(x, y, but, cmd, shift) {
    if (MODE === "device" && devDrag) {
        if (!but) { delete localVal[devDrag.name]; devDrag = null; return; }
        sendParam(devDrag.name, fromNorm(SPEC[devDrag.name], devDrag.n0 + (devDrag.y0 - y) / (shift ? 600 : 150)));
        return;
    }
    if (MODE === "knob" && single) {
        if (!but) { delete localVal[NAME]; single = null; return; }
        sendParam(NAME, fromNorm(SPEC[NAME], single.n0 + (single.y0 - y) / (shift ? 600 : 150)));
        return;
    }
    if (MODE !== "controls" || !drag) return;
    if (!but) { delete localVal[drag.k.name]; drag = null; return; }
    var n = drag.n0 + (drag.y0 - y) / (shift ? 600 : 150);
    sendParam(drag.k.name, fromNorm(SPEC[drag.k.name], n));
}

function ondblclick(x, y) {
    if (MODE === "device") {
        var k = deviceKnobAt(x, y);
        if (k) { sendParam(k, SPEC[k].def); delete localVal[k]; }
        return;
    }
    if (MODE === "knob" && SPEC[NAME]) {
        sendParam(NAME, SPEC[NAME].def);
        delete localVal[NAME];
        return;
    }
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
    var pv = params(), i, r;
    for (i = 0; i < CARDS.length; i++) {
        r = CARDS[i].rect;
        mgraphics.rectangle_rounded(r[0], r[1], r[2], r[3], 12, 12);
        mgraphics.set_source_rgba(0, 0, 0, 0.25);
        mgraphics.fill_preserve();
        mgraphics.set_source_rgba(1, 1, 1, 0.06);
        mgraphics.set_line_width(1);
        mgraphics.stroke();
        font(9, true);
        rgba(COL[CARDS[i].col]);
        text(CARDS[i].label, r[0] + 12, r[1] + 17);
    }
    for (i = 0; i < KNOBS.length; i++) {
        var k = KNOBS[i], c = knobCenter(k), sp = SPEC[k.name];
        drawKnobAt(sp, knobValue(k), c[0], c[1], KNOB_R, KNOB_LABEL_Y, KNOB_VALUE_Y, 8, 9);
        if (k.dev) {
            font(8, true);
            drawLegendDot(c[0] - mgraphics.text_measure(sp.label)[0] / 2 - 6, KNOB_LABEL_Y - 3);
        }
    }
    var st = sharedState();
    if (st) {
        drawDose(DOSE_RECT[0], DOSE_RECT[1], DOSE_RECT[2], DOSE_RECT[3], st);
        font(8, true);
        drawLegendDot(DOSE_RECT[0] + DOSE_RECT[2] / 2 - mgraphics.text_measure("DOSE")[0] / 2 - 6, DOSE_RECT[1] + 6);
    }
    for (i = 0; i < BUTTONS.length; i++) {
        var b = BUTTONS[i], col = COL[b.col];
        if (b.type === "seg") drawSeg(b.rect, SPEC[b.name].items, pv[b.name] | 0, col, null);
        else drawLedButton(b.rect, b.label, (b.type === "toggle" && !!pv[b.name]) || (b.type === "action" && resetFlashing()), col, 8);
    }
}

function drawTitle(w, h) { drawTitleAt(0, 0, h); }

function drawTitleAt(x0, y0, h) {
    var letters = "RUNKLIMPSEST", x = x0, i, size = Math.round(h * 0.62);
    font(size, false);
    for (i = 0; i < letters.length; i++) {
        var ch = letters.charAt(i);
        if (i === 0) rgba(COL.orange); else if (i === 1) rgba(COL.beige); else if (i === 2) rgba(COL.cyan); else rgba(COL.text);
        mgraphics.move_to(x, y0 + h * 0.78);
        mgraphics.show_text(ch);
        x += mgraphics.text_measure(ch)[0] + size * 0.45;
    }
}

function paint() {
    var sz = boxSize.call(this), w = sz[0], h = sz[1];
    if (MODE === "title") { drawTitle(w, h); return; }
    if (MODE === "controls") { drawControls(w, h); return; }
    if (MODE === "knob" && SPEC[NAME]) {
        drawKnobAt(SPEC[NAME], singleValue(), w / 2, 34, 13, 8, 63, 8, 9);
        return;
    }
    if (MODE === "menu" && SPEC[NAME]) {
        var it = SPEC[NAME].items, pvm = params();
        drawMenuBox([0.5, 0.5, w - 1, h - 1], it[Math.max(0, Math.min(it.length - 1, singleValue() | 0))], !!pvm.sync);
        return;
    }
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

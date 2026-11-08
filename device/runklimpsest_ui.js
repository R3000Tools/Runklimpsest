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
var VERSION = "0.2.8";
var NATIVE_MENU = false;
var SPEC = {"gravity": {"label": "GRAVITY", "def": 0.0, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 1.0, "exp": 1.0, "fmt": "g"}, "bounce": {"label": "BOUNCE", "def": 50.0, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "swarm": {"label": "SWARM", "def": 4, "col": "cyan", "kind": "dial", "lo": 1, "hi": 24, "exp": 1.0, "fmt": "int", "integer": true}, "erosion": {"label": "EROSION", "def": 65.0, "col": "orange", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "mix": {"label": "MIX", "def": 50.0, "col": "cyan", "kind": "dial", "lo": 0.0, "hi": 100.0, "exp": 1.0, "fmt": "pct"}, "grain": {"label": "GRAIN", "def": 30.0, "col": "cyan", "kind": "dial", "lo": 5.0, "hi": 500.0, "exp": 2.0, "fmt": "ms"}, "heal": {"label": "HEAL", "def": 40.0, "col": "orange", "kind": "dial", "lo": 0.5, "hi": 60.0, "exp": 2.0, "fmt": "s"}, "rate": {"label": "RATE", "def": 8.0, "col": "magenta", "kind": "dial", "lo": 1.0, "hi": 32.0, "exp": 1.0, "fmt": "bars"}, "recover": {"label": "RECOVER", "def": 16.0, "col": "magenta", "kind": "dial", "lo": 1.0, "hi": 64.0, "exp": 1.0, "fmt": "bars"}, "output": {"label": "OUTPUT", "def": 0.0, "col": "cyan", "kind": "dial", "lo": -24.0, "hi": 12.0, "exp": 1.0, "fmt": "db"}, "freeze": {"label": "FREEZE", "def": 0, "col": "cyan", "kind": "toggle"}, "sync": {"label": "SYNC", "def": 1, "col": "cyan", "kind": "toggle"}, "division": {"label": "DIVISION", "def": 2, "col": "cyan", "kind": "menu", "items": ["1/4", "1/8", "1/16", "1/32"]}, "weartype": {"label": "WEAR TYPE", "def": 0, "col": "orange", "kind": "tab", "items": ["SAT", "TAPE", "BIT"]}, "target": {"label": "DOSE TARGET", "def": 2, "col": "magenta", "kind": "tab", "items": ["ALL", "SWARM", "WEAR"]}, "resetdose": {"label": "DOSE RESET", "def": 0, "col": "magenta", "kind": "button"}, "stereo": {"label": "STEREO", "def": 0, "col": "cyan", "kind": "tab", "items": ["STEREO", "MONO"]}};
var LAYOUT = {"gravity": [378, 18, 54, 60], "bounce": [432, 18, 54, 60], "swarm": [486, 18, 54, 60], "erosion": [378, 78, 54, 60], "mix": [486, 78, 54, 60], "sync": [8, 144, 98, 18], "division": [110, 144, 98, 18], "freeze": [218, 144, 150, 18], "chamber": [8, 18, 200, 120], "wave": [218, 18, 150, 120], "controls": [378, 18, 162, 120], "dose": [432, 78, 54, 60], "more": [378, 144, 162, 18], "meters": [548, 18, 24, 120]};
// END GENERATED

// virtual chamber size used by the physics (rendering scales it)
var CW = 400, CH = 234, CELLS = 60, MAXP = 32;
// buffer overview from gen~ (buffer~ ---rkov): OVN columns x 4 values + write head
var OVN = 256, TRAIL = 10;
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
    var s = { ps: [], wear: [], amp: [], head: 0, step: 0, dose: 0, rising: false,
              n: 0, queued: 0, flashing: 0, resetReq: false, frozen: false, sync: true,
              tempo: 120, num: 4, den: 4, target: 2, reads: [], meters: [0, 0, 0, 0],
              ov: { ok: false, fp: [], wp: [], wr: [], we: [], head: 0, gain: 1,
                    rfp: [], rwp: [], rwr: [], rwe: [], rhead: 0, rgain: 1 } };
    var i;
    for (i = 0; i < MAXP; i++) {
        // 0.2.2: every particle keeps its own launch strength and sideways speed (golden-ratio
        // spread) -> each bounces with its own period = interlocking polyrhythms instead of noise
        var launch = 7 + 7 * ((i * 0.6180339) % 1), side = (((i * 0.3819660) % 1) - 0.5) * 6;
        s.ps.push({ x: 20 + Math.random() * (CW - 40), y: 20 + Math.random() * (CH - 90),
                    vx: side, vy: Math.random() * 3, flash: 0, q: false, tr: [],
                    launch: launch, side: Math.abs(side) + 0.4 });
    }
    for (i = 0; i < CELLS; i++) { s.wear.push(0); s.amp.push(0.05); }
    for (i = 0; i < OVN; i++) {
        s.ov.fp.push(0); s.ov.wp.push(0); s.ov.wr.push(0); s.ov.we.push(0);
        s.ov.rfp.push(0); s.ov.rwp.push(0); s.ov.rwr.push(0); s.ov.rwe.push(0);
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
// 0.2.4: physics scale x3 -> same flight times, three times the height (throws used only the
// lower fifth of the chamber); impact thresholds are relative to the throw speed
var PHYS_SCALE = 3;
// gravity in px/frame^2 chosen so the longest throw (flight time (1.6 - GRAVITY) s) peaks at
// ~80 % of the chamber: GRAVITY sets flight times (tempo/density), the chamber is always used
function gravityPx() {
    var tmax = Math.max(0.3, 1.6 - P.gravity) * FPS;
    return 8 * 0.8 * (CH - 40) / (tmax * tmax);
}

function throwSteps(p) {
    var target = (0.3 + 0.7 * (((p.launch || 10) - 7) / 7)) * (1.6 - P.gravity);
    var step = gridStepSec(), m = Math.max(1, Math.round(target / step)), g = gravityPx();
    var maxH = CH - 40;
    // keep the throw inside the chamber: apex height = g * frames^2 / 8
    while (m > 1 && g * Math.pow(m * step * FPS, 2) / 8 > maxH) m--;
    return m;
}

function throwSpeed(p, m) {
    var frames = m * gridStepSec() * FPS;
    return gravityPx() * (frames + 1) / 2; // semi-implicit Euler: back on the floor after "frames" steps
}

// 0.2.8: own gravity per throw, so every main throw peaks at 55..90 % of the chamber (each
// particle its own height) - the flight time (grid timing) stays exactly as before. Short throws
// were flat (apex ~ time^2), bounces stayed below the middle (user test 0.2.7).
function throwGravity(p, m) {
    var frames = m * gridStepSec() * FPS, frac = 0.55 + 0.35 * Math.max(0, Math.min(1, ((p.launch || 10) - 7) / 7));
    return 8 * frac * (CH - 40) / Math.max(1, frames * frames);
}

// gravity of a particle now: its throw gravity, scaled when GRAVITY changes mid-flight
// (turning GRAVITY down fast lets particles shoot up, even out of the chamber - kept on purpose)
function particleG(p, gNow) {
    if (!p.g || !p.g0) return gNow;
    return p.g * gNow / p.g0;
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
            var m = throwSteps(p), frames = m * gridStepSec() * FPS, vn = throwSpeed(p, m);
            p.g = throwGravity(p, m);
            p.g0 = gravityPx();
            var v = p.g * (frames + 1) / 2;
            p.vy = -v;
            p.tv = v;
            p.tvn = vn; // nominal speed (global gravity): sets the loudness as before
            p.vx = (p.vx < 0 ? -1 : 1) * (p.side || 2);
            // main hit: scheduled now, sample-accurate, exactly m grid steps ahead (the frame-
            // based physics would land it up to one frame late); physics only draws it
            var lx = landingX(p, frames) / CW;
            emitGrain(Math.max(0, Math.min(1, lx)), impactAmp(v, v, vn), Math.max(0, Math.min(1, lx)), m * gridStepSec() * 1000);
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
    if (S) S.meters = [meterL, meterR, meterOL, meterOR];
}

// ---------------------------------------------------------------- buffer overview (0.2.7)
// gen~ writes 256 columns (fresh peak, worn peak, worn rms, wear) + write head into the
// device-unique buffer~ ---rkov. "---" is replaced in object boxes only, so the panel asks
// for the real name ("ovreq" -> [prepend ovname ---rkov]) and reads it with a JS Buffer.
// Without the buffer (or in tests) the display falls back to the JS model (S.amp, S.wear).
var ovBuf = null, ovName = null, ovFails = 0;
function ovname(n) {
    if (MODE !== "device" || n === undefined) return;
    n = String(n);
    if (n === "bang" || n === ovName) return;
    try { ovBuf = new Buffer(n); ovName = n; ovFails = 0; } catch (e) { ovBuf = null; }
}

function readOverview() {
    var a, i, o = S.ov, mx = 0;
    if (!ovBuf) return false;
    try { a = ovBuf.peek(1, 0, OVN * 4 + 1); } catch (e) { a = null; }
    if (!a || a.length < OVN * 4 + 1) { if (++ovFails > 10) { ovBuf = null; ovName = null; } return false; }
    for (i = 0; i < OVN; i++) {
        o.rfp[i] = a[i * 4]; o.rwp[i] = a[i * 4 + 1]; o.rwr[i] = a[i * 4 + 2]; o.rwe[i] = a[i * 4 + 3];
        if (o.rfp[i] > mx) mx = o.rfp[i];
    }
    o.rhead = a[OVN * 4];
    o.ok = mx > 0.0001;
    // display gain: the loudest column fills ~90 % of the height (quiet material stays readable)
    o.rgain = 0.9 / Math.max(0.02, mx);
    return true;
}

// fallback overview from the JS model (no buffer yet / tests)
function modelOverview() {
    var o = S.ov, i;
    for (i = 0; i < OVN; i++) {
        var c = Math.min(CELLS - 1, Math.floor(i / OVN * CELLS)), w = S.wear[c], a = S.amp[c];
        o.rfp[i] = a; o.rwp[i] = a * (1 - 0.35 * w); o.rwr[i] = o.rwp[i] * 0.4; o.rwe[i] = w;
    }
    o.rhead = S.head / CELLS;
    o.rgain = 0.9;
    o.ok = false;
}

// display values ease toward the latest data every frame (0.2.8: no steps): columns fast,
// the display gain slowly down / quickly up (loud hits never clip), the write head moves
// continuously between reads
function easeOverview() {
    var o = S.ov, i, k = 0.45;
    for (i = 0; i < OVN; i++) {
        o.fp[i] += (o.rfp[i] - o.fp[i]) * k;
        o.wp[i] += (o.rwp[i] - o.wp[i]) * k;
        o.wr[i] += (o.rwr[i] - o.wr[i]) * k;
        o.we[i] += (o.rwe[i] - o.we[i]) * 0.25;
    }
    o.gain += (o.rgain - o.gain) * (o.rgain < o.gain ? 0.5 : 0.04);
    if (!S.frozen) o.head = (o.head + 1 / (2 * secPerBar() * FPS)) % 1;
    var dh = o.rhead - o.head;
    if (dh > 0.5) dh -= 1; else if (dh < -0.5) dh += 1;
    o.head = (o.head + dh * 0.3 + 1) % 1;
}

// song tempo and time signature from [live.observer]
function tempo(v) { if (v > 0) songTempo = v; }
function signum(v) { if (v > 0) sigNum = v; }
function sigden(v) { if (v > 0) sigDen = v; }

// LARGE VIEW opened: place the window around the mouse position (screen coordinates from
// [mousestate]) so it opens on the monitor that shows Live, not always on the main monitor
var WIN_W = 960, WIN_H = 456;
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

// grain level: higher throws are louder (0.5 .. 1), bounce tails fall with sqrt(impact / throw)
function impactAmp(imp, tv, tvn) {
    tv = Math.max(0.5, tv || 8 * PHYS_SCALE);
    // loudness of the main hit from the nominal throw speed (global gravity, as up to 0.2.7);
    // bounce tails relative to the particle's own throw
    var main = 0.5 + 0.5 * Math.min(1, (tvn || tv) / (10 * PHYS_SCALE));
    return Math.max(0.12, main * Math.sqrt(Math.max(0, Math.min(1, imp / tv))));
}

function fireGrain(p, delayMs) {
    emitGrain(Math.max(0, Math.min(1, p.x / CW)), impactAmp(p.imp || 4, p.tv, p.tvn), Math.max(0, Math.min(1, p.x / CW)),
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
    // footprint: the grain wears max(80 ms, GRAIN) from its start (gen~), 2 bars long buffer
    var fw = Math.max(0.08, P.grain / 1000) / Math.max(0.5, 2 * secPerBar());
    S.reads.push({ x: Math.max(0, Math.min(1, p.x / CW)), w: Math.min(0.25, fw), a: 1 });
    if (S.reads.length > 24) S.reads.shift();
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

    // 0.2.4: DOSE multiplies SWARM (up to x2, max 32) instead of adding up to 10 particles
    // (SWARM 1 showed 11 particles); TARGET WEAR leaves SWARM exact
    var nBase = Math.max(1, Math.round(P.swarm));
    var n = (P.target != 2) ? Math.min(MAXP, Math.round(nBase * (1 + S.dose))) : nBase;
    S.n = n;
    S.nBase = nBase;
    S.sync = !!P.sync;
    S.frozen = !!P.freeze;
    S.target = P.target | 0;

    var g = gravityPx();
    // BOUNCE 0..100 % -> restitution 0.3..0.9: ~2 to ~20 rebounds above the grain threshold
    var rest = 0.3 + 0.6 * (P.bounce / 100);

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
        if (p.tr.length > TRAIL) p.tr.pop();
        if (p.rest) {
            // lying on the floor, waiting for the next grid tick
            if (p.flash > 0) p.flash--;
            continue;
        }
        var y0 = p.y, pg = particleG(p, g);
        p.vy += pg; p.x += p.vx; p.y += p.vy;
        if (p.x < 5) { p.x = 5; p.vx = -p.vx; }
        if (p.x > CW - 10) { p.x = CW - 10; p.vx = -p.vx; }
        if (p.y > CH - 18) {
            // fraction of this frame at which the floor was crossed -> sample-accurate timing
            var frac = (p.vy > 0) ? Math.max(0, Math.min(1, (CH - 18 - y0) / p.vy)) : 0;
            p.y = CH - 18;
            var impact = Math.abs(p.vy), tv = p.tv || 8 * PHYS_SCALE;
            p.vy = -impact * rest;
            // a particle on the floor gets at least "g" impact per frame: thresholds must stay
            // above that, else it micro-bounces every frame (0.2.4 test: 122 grains/s)
            if (impact > Math.max(0.1 * tv, 2.2 * pg)) {
                p.imp = impact;
                if (p.skipHit) {
                    // main hit was already scheduled at the throw: only flash and wear display
                    p.skipHit = false;
                    markGrain(p);
                } else if (P.sync) p.q = true; else fireGrain(p, frac * 1000 / FPS);
            }
            if (impact * rest < 1.6 * pg || impact < 0.08 * tv) {
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

    // read heads fade out in ~0.6 s
    for (i = S.reads.length - 1; i >= 0; i--) {
        S.reads[i].a -= 1 / (0.9 * FPS);
        if (S.reads[i].a <= 0) S.reads.splice(i, 1);
    }

    // buffer overview: real data from gen~ every 2nd frame (0.2.8, was every 8th), else the
    // JS model; the display eases toward it every frame
    if (frame % 2 === 0) {
        if (!ovBuf && frame % 64 === 0) outlet(0, "ovreq");
        if (!readOverview() || !S.ov.ok) modelOverview();
    }
    easeOverview();
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
function drawKnobAt(spec, v, cx, cy, r, labelY, valueY, labelSize, valueSize, valueText) {
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
    text(valueText || fmtValue(spec, v), cx, valueY, "center");
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

// card tone: every box (chamber, memory, control cards) is the same translucent dark (0.2.7)
function panelBox(x, y, w, h, diam) {
    mgraphics.rectangle_rounded(x, y, w, h, diam, diam);
    mgraphics.set_source_rgba(0, 0, 0, 0.25);
    mgraphics.fill_preserve();
    mgraphics.set_source_rgba(1, 1, 1, 0.07);
    mgraphics.set_line_width(1);
    mgraphics.stroke();
}

// DOSE shimmer: magenta from the top edge, strength = dose; shown where DOSE acts
// (chamber for TARGET ALL/SWARM, memory for ALL/WEAR) - at dose 0 every box looks the same
function doseHaze(x0, y0, w, h, st, diam) {
    if (st.dose < 0.01) return;
    var pat = mgraphics.pattern_create_linear(0, y0, 0, y0 + h * 0.5);
    pat.add_color_stop_rgba(0, 1.0, 0.310, 0.847, 0.12 * st.dose);
    pat.add_color_stop_rgba(1, 1.0, 0.310, 0.847, 0);
    mgraphics.set_source(pat);
    mgraphics.rectangle_rounded(x0 + 0.5, y0 + 0.5, w - 1, h * 0.5, diam, diam);
    mgraphics.fill();
}

// beats per bar and 16ths per beat of the song (2-bar buffer)
function beatsPerBar(st) { return Math.max(1, st.num || 4); }
function sixteenthsPerBeat(st) { return Math.max(1, Math.round(16 / Math.max(1, st.den || 4))); }

function drawChamber(x0, y0, w, h, st, big) {
    var sx = w / CW, i, p, diam = big ? 12 : 10;
    panelBox(x0, y0, w, h, diam);
    if (st.target !== 2) doseHaze(x0, y0, w, h, st, diam);

    if (st.sync) {
        var gap = big ? 5 : 2, sw = (w - 16 - gap * 15) / 16;
        for (i = 0; i < 16; i++) {
            var cur = i === st.step;
            if (cur) rgba(COL.cyan); else if (i % 4 === 0) mgraphics.set_source_rgba(0.231, 0.247, 0.286, 1);
            else rgba(COL.track);
            mgraphics.rectangle_rounded(x0 + 8 + i * (sw + gap), y0 + (big ? 10 : 5), sw, big ? 3 : 2, 2, 2);
            mgraphics.fill();
        }
    }

    // floor = the buffer: ticks on beats (device) or 16ths (large view), same scale as MEMORY
    var floorY = y0 + h - (big ? 28 : 6);
    var nb = beatsPerBar(st) * 2, n16 = big ? sixteenthsPerBeat(st) : 1, nt = nb * n16;
    rgba(COL.cyan, 0.45);
    mgraphics.set_line_width(1);
    for (i = 0; i <= nt; i++) {
        var tx = x0 + 8 + (w - 16) * i / nt, tl = (i % (nt / 2) === 0) ? (big ? 8 : 4) : ((i % n16 === 0) ? (big ? 5 : 2) : 2);
        mgraphics.move_to(tx, floorY + 2);
        mgraphics.line_to(tx, floorY + 2 + tl);
    }
    mgraphics.stroke();
    rgba(COL.cyan, st.flashing > 0 ? 0.35 : 0.2);
    mgraphics.rectangle(x0 + 6, floorY - 1.5, w - 12, big ? 5 : 4);
    mgraphics.fill();
    rgba(COL.cyan);
    mgraphics.rectangle(x0 + 6, floorY, w - 12, big ? 2 : 1.5);
    mgraphics.fill();
    if (big) {
        font(8, false);
        mgraphics.set_source_rgba(0.365, 0.384, 0.424, 1);
        text("BUFFER START", x0 + 10, y0 + h - 6);
        text("BUFFER END", x0 + w - 10, y0 + h - 6, "right");
    }

    var pr = big ? 4.5 : 2.4;
    var yScale = (floorY - y0) / (CH - 18);
    for (i = 0; i < st.n; i++) {
        p = st.ps[i];
        var px = x0 + p.x * sx, py = y0 + p.y * yScale - pr;
        if (py < y0 + pr + 2) {
            // above the chamber: small marker at the top edge, the particle falls back in
            rgba(COL.cyan, 0.8);
            mgraphics.rectangle(px - (big ? 4 : 2), y0 + 1, big ? 8 : 4, 2);
            mgraphics.fill();
            continue;
        }
        // trail: the last positions as a fading line (the parabola of the flight)
        if (p.tr.length > 2 && !p.rest) {
            mgraphics.set_line_width(big ? 1.5 : 1);
            for (var k = 1; k < p.tr.length; k++) {
                var ty1 = y0 + p.tr[k - 1][1] * yScale - pr, ty2 = y0 + p.tr[k][1] * yScale - pr;
                if (ty1 < y0 + 2 || ty2 < y0 + 2) continue;
                mgraphics.set_source_rgba(1, 1, 1, 0.28 * (1 - k / p.tr.length));
                mgraphics.move_to(x0 + p.tr[k - 1][0] * sx, ty1);
                mgraphics.line_to(x0 + p.tr[k][0] * sx, ty2);
                mgraphics.stroke();
            }
        }
        if (p.flash > 0) {
            var fl = p.flashLen || 7, fa = p.flash / fl;
            // impact: flash on the floor at the read position + expanding ring
            mgraphics.set_source_rgba(1, 1, 1, 0.9 * fa);
            mgraphics.rectangle(px - (big ? 9 : 4), floorY - 0.5, big ? 18 : 8, big ? 3 : 2.5);
            mgraphics.fill();
            var rr = pr * 1.5 + (fl - p.flash) * (big ? 3 : 1.4);
            rgba(COL.cyan, 0.6 * fa);
            mgraphics.set_line_width(big ? 1.5 : 1);
            mgraphics.ellipse(px - rr, floorY - rr, rr * 2, rr * 2);
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
            rgba(COL.cyan, 0.22);
            mgraphics.ellipse(px - pr * 2, py - pr * 2, pr * 4, pr * 4);
            mgraphics.fill();
            mgraphics.set_source_rgba(1, 1, 1, 1);
            mgraphics.ellipse(px - pr, py - pr, pr * 2, pr * 2);
            mgraphics.fill();
        }
    }
}

// MEMORY (0.2.7, scheme "cyan -> orange"): fresh audio cyan, wear orange.
// Two layers (peak band + rms core), thin outline of the fresh recording (palimpsest ghost),
// worn zones tinted + hatched, wear lane at the bottom (lights up where grains read),
// read heads fade out, cyan write head (grey when frozen).
var MEM_ICE = [0.769, 0.957, 1.0], LANE0 = [0.071, 0.149, 0.180];
function drawMemory(x0, y0, w, h, st, big) {
    var o = st.ov, i, diam = big ? 12 : 10;
    panelBox(x0, y0, w, h, diam);
    if (st.target !== 1) doseHaze(x0, y0, w, h, st, diam);
    if (!o || !o.fp.length) return;
    var meterW = big ? 22 : 0;
    var wx = x0 + 4, ww = w - 8 - meterW;
    var top = y0 + (big ? 16 : 12), laneH = big ? 6 : 4, laneY = y0 + h - laneH - (big ? 6 : 4);
    var bot = laneY - (big ? 6 : 4), mid = (top + bot) / 2, half = (bot - top) / 2;
    var n = o.fp.length, dx = ww / n, g = o.gain;
    // display curve for wear: sqrt makes light wear visible (numbers in the header stay real)
    var wd = [];
    for (i = 0; i < n; i++) wd.push(Math.sqrt(Math.max(0, Math.min(1, o.we[i]))));

    // ruler: bar lines strong, beats faint (labels 1, 1.2, ... in the large view)
    var nb = beatsPerBar(st), nbt = nb * 2;
    mgraphics.set_line_width(1);
    for (i = 0; i <= nbt; i++) {
        var rx = Math.round(wx + ww * i / nbt) + 0.5, bar = i % nb === 0;
        if (bar) rgba(COL.cyan, 0.2); else rgba(COL.cyan, 0.07);
        mgraphics.move_to(rx, top - (big ? 4 : 2));
        mgraphics.line_to(rx, bot);
        mgraphics.stroke();
        if (i < nbt && (big || bar)) {
            font(big ? 7.5 : 6.5, bar);
            if (bar) rgba(COL.text, 0.75); else rgba(COL.dim, 0.8);
            text(bar ? String(i / nb + 1) : (Math.floor(i / nb) + 1) + "." + (i % nb + 1), rx + 3, y0 + (big ? 10 : 8));
        }
    }
    rgba(COL.cyan, 0.08);
    mgraphics.move_to(wx, mid);
    mgraphics.line_to(wx + ww, mid);
    mgraphics.stroke();

    function yv(v) { return Math.min(half, v * g * half); }
    // peak band (worn)
    rgba(COL.cyan, 0.18);
    mgraphics.move_to(wx, mid - yv(o.wp[0]));
    for (i = 0; i < n; i++) mgraphics.line_to(wx + (i + 0.5) * dx, mid - yv(o.wp[i]));
    for (i = n - 1; i >= 0; i--) mgraphics.line_to(wx + (i + 0.5) * dx, mid + yv(o.wp[i]) * 0.94);
    mgraphics.close_path();
    mgraphics.fill();
    // wear tint inside the band
    for (i = 0; i < n; i++) {
        if (wd[i] < 0.2) continue;
        rgba(COL.orange, Math.min(0.45, 0.4 * wd[i]));
        var bh = yv(o.wp[i]);
        mgraphics.rectangle(wx + i * dx, mid - bh, dx + 0.3, bh * 1.94);
        mgraphics.fill();
    }
    // rms core
    rgba(MEM_ICE, 0.85);
    mgraphics.move_to(wx, mid - yv(o.wr[0]));
    for (i = 0; i < n; i++) mgraphics.line_to(wx + (i + 0.5) * dx, mid - yv(o.wr[i]));
    for (i = n - 1; i >= 0; i--) mgraphics.line_to(wx + (i + 0.5) * dx, mid + yv(o.wr[i]) * 0.94);
    mgraphics.close_path();
    mgraphics.fill();
    // hatch on worn zones (diagonal lines, clipped to the band column by column)
    var hs = big ? 5 : 4;
    rgba(COL.orange, 0.85);
    mgraphics.set_line_width(big ? 1 : 0.8);
    for (i = 0; i < n; i++) {
        if (wd[i] < 0.4) continue;
        var xa = wx + i * dx, xb = xa + dx, hb = yv(o.wp[i]), ya = mid - hb, yb = mid + hb * 0.94;
        var k0 = Math.ceil((ya + xa) / hs), k1 = Math.floor((yb + xa) / hs);
        for (var k = k0; k <= k1; k++) {
            var y1 = k * hs - xa, y2 = k * hs - xb;
            if (y2 < ya) continue;
            mgraphics.move_to(xa, y1);
            mgraphics.line_to(xb, y2);
        }
    }
    mgraphics.stroke();
    // outlines: worn peak (cyan) and the fresh recording (ghost)
    mgraphics.set_line_width(big ? 0.8 : 0.7);
    rgba(COL.cyan, 0.85);
    mgraphics.move_to(wx, mid - yv(o.wp[0]));
    for (i = 0; i < n; i++) mgraphics.line_to(wx + (i + 0.5) * dx, mid - yv(o.wp[i]));
    mgraphics.stroke();
    mgraphics.move_to(wx, mid + yv(o.wp[0]) * 0.94);
    for (i = 0; i < n; i++) mgraphics.line_to(wx + (i + 0.5) * dx, mid + yv(o.wp[i]) * 0.94);
    mgraphics.stroke();
    rgba(MEM_ICE, 0.4);
    mgraphics.move_to(wx, mid - yv(o.fp[0]));
    for (i = 0; i < n; i++) mgraphics.line_to(wx + (i + 0.5) * dx, mid - yv(o.fp[i]));
    mgraphics.stroke();
    mgraphics.move_to(wx, mid + yv(o.fp[0]) * 0.94);
    for (i = 0; i < n; i++) mgraphics.line_to(wx + (i + 0.5) * dx, mid + yv(o.fp[i]) * 0.94);
    mgraphics.stroke();

    // wear lane: dark cyan -> orange; columns just read light up white
    var lc = big ? 2 : 4, lw = dx * lc;
    for (i = 0; i < n; i += lc) {
        var we = 0, j;
        for (j = 0; j < lc && i + j < n; j++) we = Math.max(we, wd[i + j]);
        rgba(mixc(LANE0, COL.orange, we));
        mgraphics.rectangle(wx + i * dx, laneY, Math.max(0.6, lw - 0.6), laneH);
        mgraphics.fill();
    }
    // footprint glow (0.2.8): the part a grain wears, orange, fading - wear is visible at once
    for (i = 0; i < st.reads.length; i++) {
        var fr = st.reads[i], fx = wx + fr.x * ww, fwd = Math.max(2, (fr.w || 0.02) * ww);
        rgba(COL.orange, 0.32 * fr.a);
        mgraphics.rectangle(fx, top, Math.min(fwd, wx + ww - fx), bot - top);
        mgraphics.fill();
        rgba(COL.orange, 0.9 * fr.a);
        mgraphics.rectangle(fx, laneY, Math.min(fwd, wx + ww - fx), laneH);
        mgraphics.fill();
    }
    for (i = 0; i < st.reads.length; i++) {
        var rd = st.reads[i], hx = wx + rd.x * ww;
        mgraphics.set_source_rgba(1, 1, 1, 0.9 * rd.a);
        mgraphics.rectangle(hx - (big ? 4 : 2), laneY, big ? 8 : 4, laneH);
        mgraphics.fill();
        // read head with a short afterglow to the left
        var tail = mgraphics.pattern_create_linear(hx - (big ? 16 : 8), 0, hx, 0);
        tail.add_color_stop_rgba(0, 1, 1, 1, 0);
        tail.add_color_stop_rgba(1, 1, 1, 1, 0.16 * rd.a);
        mgraphics.set_source(tail);
        mgraphics.rectangle(hx - (big ? 16 : 8), top, big ? 16 : 8, bot - top);
        mgraphics.fill();
        mgraphics.set_source_rgba(1, 1, 1, rd.a);
        mgraphics.rectangle(hx, top, 1, bot - top);
        mgraphics.fill();
    }
    // write head
    var whx = wx + Math.max(0, Math.min(1, o.head)) * ww;
    if (st.frozen) mgraphics.set_source_rgba(0.365, 0.384, 0.424, 1); else rgba(COL.cyan);
    mgraphics.rectangle(whx, top - 2, big ? 2 : 1.5, bot - top + 2);
    mgraphics.fill();
    if (big && !st.frozen) {
        font(7, true);
        rgba(COL.cyan);
        text("REC", whx + 5, top + 8);
    }
    if (big) drawMeters(x0 + w - 18, top - 2, 14, laneY + laneH - top + 2, st.meters || [0, 0, 0, 0], 2.5, 1);
}

// IN L/R, OUT L/R meters (device and large view)
function drawMeters(x, y, w, h, mv, bw, gap) {
    var i, xs = [0, bw + gap, 2 * bw + 3 * gap, 3 * bw + 4 * gap];
    for (i = 0; i < 4; i++) {
        var mx = x + xs[i];
        mgraphics.set_source_rgba(0.114, 0.125, 0.153, 1);
        mgraphics.rectangle_rounded(mx, y, bw, h, bw * 0.6, bw * 0.6);
        mgraphics.fill();
        var db = mv[i] > 0.00001 ? 20 * Math.log(mv[i]) / Math.LN10 : -90;
        var nrm = Math.max(0, Math.min(1, (db + 60) / 60)), fh = nrm * h;
        if (fh > 0.5) {
            var pat = mgraphics.pattern_create_linear(0, y + h, 0, y);
            pat.add_color_stop_rgba(0, 0.231, 0.878, 0.561, 1);
            pat.add_color_stop_rgba(0.75, 0.231, 0.878, 0.561, 1);
            pat.add_color_stop_rgba(0.9, 1.0, 0.847, 0.290, 1);
            pat.add_color_stop_rgba(1, 1.0, 0.353, 0.239, 1);
            mgraphics.set_source(pat);
            mgraphics.rectangle_rounded(mx, y + h - fh, bw, fh, bw * 0.6, bw * 0.6);
            mgraphics.fill();
        }
    }
}

// most worn column (position as bar.beat.16th) and mean wear, from the overview
function wearStats(st) {
    var o = st.ov, i, mx = 0, mi = 0, sum = 0, n = o.we.length;
    for (i = 0; i < n; i++) { sum += o.we[i]; if (o.we[i] > mx) { mx = o.we[i]; mi = i; } }
    var nb = beatsPerBar(st), s16 = sixteenthsPerBeat(st), steps = nb * s16 * 2;
    var stp = Math.floor(mi / n * steps), bar = Math.floor(stp / (nb * s16)) + 1;
    var beat = Math.floor((stp % (nb * s16)) / s16) + 1, six = stp % s16 + 1;
    return { most: mx, pos: bar + "." + beat + "." + six, avg: n ? sum / n : 0 };
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
// SWARM shows "base -> effective" while DOSE adds particles
function swarmText() {
    var st = sharedState();
    if (!st || !st.nBase || st.n === st.nBase) return null;
    return st.nBase + " \u2192 " + st.n;
}

function drawDeviceKnob(name) {
    var r = LAYOUT[name];
    drawKnobAt(SPEC[name], valueOf(name), r[0] + r[2] / 2, r[1] + 31, 12, r[1] + 9, r[1] + 57, 8, 8.5,
               name === "swarm" ? swarmText() : null);
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
    if (st.frozen) { rgba(COL.cyan); text(memStatus(st), L.wave[0] + L.wave[2], 13, "right"); }
    else { rgba(COL.dim); text("MOST WORN " + Math.round(wearStats(st).most * 100) + " %", L.wave[0] + L.wave[2], 13, "right"); }

    drawChamber(L.chamber[0], L.chamber[1], L.chamber[2], L.chamber[3], st, false);
    drawMemory(L.wave[0], L.wave[1], L.wave[2], L.wave[3], st, false);

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

// layout 0.2.7 (GUI iteration 13): CHAMBER | MEMORY side by side, same width and height,
// no wear history (the wear lane in MEMORY shows it), meters in MEMORY; controls below
var LV = { chamber: [0, 66, 450, 200], memory: [470, 66, 450, 200] };
function drawLarge(w, h, st) {
    var C = LV.chamber, M = LV.memory;
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
    text("CHAMBER", C[0], 58);
    font(8, false);
    rgba(COL.dim);
    text(st.n + " PARTICLES \u00b7 " + (st.sync ? st.queued + " QUEUED" : st.flashing + " GRAINS"), C[0] + C[2], 58, "right");
    drawChamber(C[0], C[1], C[2], C[3], st, true);

    font(10, true);
    rgba(COL.orange);
    text("MEMORY", M[0], 58);
    font(8, false);
    var ws = wearStats(st);
    var info = "MOST WORN " + Math.round(ws.most * 100) + " % @ " + ws.pos + " \u00b7 AVG " + Math.round(ws.avg * 100) + " %";
    if (st.frozen) info = "FROZEN \u00b7 " + info;
    if (st.frozen) rgba(COL.cyan); else rgba(COL.dim);
    text(info, M[0] + M[2], 58, "right");
    drawMemory(M[0], M[1], M[2], M[3], st, true);
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
        drawKnobAt(sp, knobValue(k), c[0], c[1], KNOB_R, KNOB_LABEL_Y, KNOB_VALUE_Y, 8, 9,
                   k.name === "swarm" ? swarmText() : null);
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

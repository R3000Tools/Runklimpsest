// End-to-end audio simulation: the real particle engine (device/runklimpsest_ui.js, mode
// "device") drives the real DSP (device/runklimpsest_dsp.genexpr, transpiled), wired the
// way the device patch wires them: 30 fps frames, [metro] grid ticks, event ring buffer~,
// parameter messages. Renders scenarios on synthetic material, prints measurements and
// optionally writes WAV files.
//   node tests/audio_sim.js [outdir]
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const gen = require('./genexpr.js');

const SR = 48000, BLOCK = 64;
const ROOT = path.join(__dirname, '..', 'device');

// ------------------------------------------------------------------ material
// all test material is normalised to -3 dBFS peak (realistic mixing level)
function norm(pair) { let p = 0; for (const a of pair) for (const v of a) p = Math.max(p, Math.abs(v)); const g = 0.708 / p; for (const a of pair) for (let i = 0; i < a.length; i++) a[i] *= g; return pair; }
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1; }

function drums(sec, bpm) {
    const n = Math.round(sec * SR), L = new Float64Array(n), R = new Float64Array(n), r = rng(7);
    const step = 60 / bpm / 4 * SR;
    for (let s = 0; s * step < n; s++) {
        const t0 = Math.round(s * step), pos = s % 16;
        const kick = pos % 4 === 0, snare = pos === 4 || pos === 12, hat = true;
        for (let i = 0; i < 0.35 * SR && t0 + i < n; i++) {
            const t = i / SR;
            let v = 0, pan = 0;
            if (kick) v += Math.sin(2 * Math.PI * (45 * t + 90 * (1 - Math.exp(-t * 30)) / 30)) * Math.exp(-t * 9) * 0.8;
            if (snare && t < 0.25) { v += (r() * 0.5 + Math.sin(2 * Math.PI * 190 * t) * 0.3) * Math.exp(-t * 18); }
            if (hat && t < 0.06) { const h = r() * Math.exp(-t * 70) * (pos % 2 ? 0.12 : 0.2); L[t0 + i] += h * 0.8; R[t0 + i] += h * 1.1; }
            L[t0 + i] += v * (1 - pan); R[t0 + i] += v * (1 + pan);
        }
    }
    return norm([L, R]);
}

function pad(sec) {
    const n = Math.round(sec * SR), L = new Float64Array(n), R = new Float64Array(n);
    const chords = [[220, 261.6, 329.6, 392], [174.6, 220, 261.6, 329.6], [196, 246.9, 293.7, 349.2], [164.8, 207.7, 246.9, 329.6]];
    let lp = [0, 0];
    for (let i = 0; i < n; i++) {
        const t = i / SR, c = chords[Math.floor(t / 2) % 4];
        let l = 0, r = 0;
        c.forEach((f, k) => {
            const sawL = 2 * ((t * f * 1.002) % 1) - 1, sawR = 2 * ((t * f * 0.998 + k * 0.13) % 1) - 1;
            l += sawL; r += sawR;
        });
        lp[0] += (l * 0.09 - lp[0]) * 0.08; lp[1] += (r * 0.09 - lp[1]) * 0.08;
        const env = Math.min(1, (t % 2) * 8) * 0.9;
        L[i] = lp[0] * env; R[i] = lp[1] * env;
    }
    return norm([L, R]);
}

function pluck(sec, bpm) {
    const n = Math.round(sec * SR), L = new Float64Array(n), R = new Float64Array(n), r = rng(3);
    const notes = [261.6, 311.1, 392, 466.2, 523.3, 466.2, 392, 311.1];
    const step = Math.round(60 / bpm / 2 * SR);
    for (let s = 0; s * step < n; s++) {
        const f = notes[s % notes.length], len = Math.round(SR / f), buf = new Float64Array(len);
        for (let k = 0; k < len; k++) buf[k] = r() * 0.6;
        let idx = 0;
        for (let i = 0; i < step * 2 && s * step + i < n; i++) {
            const a = buf[idx], b = buf[(idx + 1) % len];
            buf[idx] = (a + b) * 0.4985; idx = (idx + 1) % len;
            const pan = (s % 4 - 1.5) * 0.25;
            L[s * step + i] += a * (1 - pan); R[s * step + i] += a * (1 + pan);
        }
    }
    return norm([L, R]);
}

// ------------------------------------------------------------------ device simulation
function makeUi(onOut, ovbuf) {
    const src = fs.readFileSync(path.join(ROOT, 'runklimpsest_ui.js'), 'utf8');
    const mg = new Proxy({}, { get: (t, k) => (k in t ? t[k] : (k === 'text_measure' ? () => [10, 8] :
        (k === 'pattern_create_linear' ? () => ({ add_color_stop_rgba() {} }) : () => {}))), set: (t, k, v) => { t[k] = v; return true; } });
    const ctx = { mgraphics: mg, jsarguments: ['x', 'device'], messagename: '', box: { rect: [0, 0, 580, 169] },
        Global: function (n) { return {}; }, outlet: (...a) => onOut(a.slice(1)), post: () => {}, Math,
        // Max JS Buffer stand-in: reads the gen~ overview (Buffer ov) like the real jsui
        Buffer: function () { this.peek = (c, s0, k) => Array.from(ovbuf ? ovbuf.subarray(s0, s0 + k) : []); } };
    vm.createContext(ctx);
    vm.runInContext(src, ctx);
    return {
        send(name, ...args) { ctx.messagename = name; if (typeof ctx[name] === 'function') ctx[name](...args); else ctx.anything(...args); },
        get(expr) { return vm.runInContext(expr, ctx); }
    };
}

const GEN_PARAM = { mix: 'p_mix', output: 'p_out', gsize: 'p_size', erosion: 'p_erosion', weartype: 'p_weartype',
    heal: 'p_heal', freeze: 'p_freeze', stereo: 'p_stereo' };

function simulate(input, settings, opts) {
    opts = opts || {};
    const g = gen.load(path.join(ROOT, 'runklimpsest_dsp.genexpr'), SR);
    const evbuf = new Float64Array(64 * 6), ovbuf = new Float64Array(1025);
    g.bind('ev', evbuf);
    g.bind('ov', ovbuf);
    let events = 0, ui = null;
    ui = makeUi((a) => {
        if (a[0] === 'ovreq') ui.send('ovname', 'sim_rkov');
        else if (a[0] === 'evw') evbuf[a[1]] = a[2];
        else if (a[0] === 'gen') { g.set(a[1], a[2]); if (a[1] === 'p_evhead') events++; }
    }, ovbuf);
    const setP = (k, v) => { ui.send(k, v); if (GEN_PARAM[k]) g.set(GEN_PARAM[k], v); };
    const spec = ui.get('SPEC');
    for (const k in spec) setP(k, spec[k].def);
    ui.send('tempo', opts.bpm || 120); ui.send('signum', 4); ui.send('sigden', 4);
    for (const k in settings) setP(k, settings[k]);

    const [inL, inR] = input, n = inL.length;
    const outL = new Float64Array(n), outR = new Float64Array(n);
    const frameLen = Math.round(0.033 * SR);
    const div = [4, 8, 16, 32][settings.division !== undefined ? settings.division : spec.division.def];
    const tickLen = 60 / (opts.bpm || 120) * 4 / div * SR;
    let nextFrame = 0, nextTick = 0, peak = 0, voiceSum = 0, voiceN = 0;
    const sched = opts.schedule || [];
    let si = 0;
    const t0 = Date.now();
    for (let b = 0; b < n; b += BLOCK) {
        while (si < sched.length && sched[si][0] * SR <= b) { setP(sched[si][1], sched[si][2]); si++; }
        if (b >= nextTick) { ui.send('tick'); nextTick += tickLen; }
        if (b >= nextFrame) {
            ui.send('level', peak); ui.send('bang');
            peak = 0; nextFrame += frameLen;
        }
        const e = Math.min(n, b + BLOCK);
        for (let i = b; i < e; i++) {
            const o = g.step(inL[i], inR[i]);
            outL[i] = o[0]; outR[i] = o[1];
            const a = Math.abs(inL[i] + inR[i]); if (a > peak) peak = a;
        }
        let act = 0; const vs = g.data.vs[0]; for (let v = 0; v < 32; v++) if (vs[v] > 0.5) act++;
        voiceSum += act; voiceN++;
    }
    return { L: outL, R: outR, events, avgVoices: voiceSum / voiceN, msPerSec: (Date.now() - t0) / (n / SR), g, ovbuf,
        ov: ui.get('JSON.stringify({ok: S.ov.ok, head: S.ov.head, we: S.ov.we})') };
}

// ------------------------------------------------------------------ measurements
const db = (x) => (x > 1e-9 ? 20 * Math.log10(x) : -180);
function rms(a, from, to) { let s = 0; from = from || 0; to = to || a.length; for (let i = from; i < to; i++) s += a[i] * a[i]; return Math.sqrt(s / (to - from)); }
function peakOf(a) { let p = 0; for (const v of a) p = Math.max(p, Math.abs(v)); return p; }
function mean(a) { let s = 0; for (const v of a) s += v; return s / a.length; }
// clicks: second difference far above what the input itself contains
function clickScore(out, inp) {
    const d2 = (a, i) => Math.abs(a[i] - 2 * a[i - 1] + a[i - 2]);
    let mo = 0, mi = 0;
    for (let i = 2; i < out.length; i++) { mo = Math.max(mo, d2(out, i)); mi = Math.max(mi, d2(inp, i)); }
    return mo / Math.max(1e-9, mi);
}
// correlation L/R (stereo width): 1 = mono, 0 = uncorrelated
function corr(L, R) { let lr = 0, ll = 0, rr = 0; for (let i = 0; i < L.length; i++) { lr += L[i] * R[i]; ll += L[i] * L[i]; rr += R[i] * R[i]; } return lr / Math.sqrt(ll * rr + 1e-18); }
// high-frequency share (> ~4 kHz) via first difference energy ratio
function brightness(a, from, to) { let d = 0, s = 0; for (let i = from + 1; i < to; i++) { d += (a[i] - a[i - 1]) ** 2; s += a[i] ** 2; } return Math.sqrt(d / (s + 1e-18)); }

function writeWav(file, L, R) {
    const n = L.length, buf = Buffer.alloc(44 + n * 6);
    buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 6, 4); buf.write('WAVEfmt ', 8);
    buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
    buf.writeUInt32LE(SR * 6, 28); buf.writeUInt16LE(6, 32); buf.writeUInt16LE(24, 34); buf.write('data', 36); buf.writeUInt32LE(n * 6, 40);
    let o = 44;
    for (let i = 0; i < n; i++) for (const v of [L[i], R[i]]) { const x = Math.max(-8388608, Math.min(8388607, Math.round(v * 8388607))); buf.writeIntLE(x, o, 3); o += 3; }
    fs.writeFileSync(file, buf);
}

// wear of the buffer: rms(worn - fresh) / rms(fresh) over the recorded loop
function wearOf(g) {
    const blen = Math.min(800000, Math.floor(g.get('p_barsec') * 2 * SR)), f = g.data.fresh[0], w = g.data.worn[0];
    let d = 0, s = 0; for (let i = 0; i < blen; i++) { d += (w[i] - f[i]) ** 2; s += f[i] ** 2; } return Math.sqrt(d / (s + 1e-18));
}

// display overview as the jsui sees it: real data? mean and max wear of the 256 columns
function ovText(o) { const m = o.we.reduce((a, b) => a + b, 0) / o.we.length; return (o.ok ? 'real' : 'MODEL') + ' ' + m.toFixed(2) + ' ' + Math.max(...o.we).toFixed(2); }

module.exports = { wearOf, SR, drums, pad, pluck, simulate, rms, peakOf, mean, db, clickScore, corr, brightness, writeWav };

// ------------------------------------------------------------------ CLI
if (require.main === module) {
    const outdir = process.argv[2];
    if (outdir) fs.mkdirSync(outdir, { recursive: true });
    const D = drums(12, 120), Pd = pad(24), Pl = pluck(12, 120);
    const scenarios = [
        ['01_drums_default', D, {}],
        ['02_drums_wet100', D, { mix: 100 }],
        ['03_drums_wet100_nosync', D, { mix: 100, sync: 0 }],
        ['04_drums_grain15ms', D, { mix: 100, gsize: 15 }],
        ['05_drums_grain300ms', D, { mix: 100, gsize: 300, swarm: 6 }],
        ['06_drums_lowgravity_highbounce', D, { mix: 100, gravity: 0.2, bounce: 95 }],
        ['07_drums_highgravity_swarm24', D, { mix: 100, gravity: 1, swarm: 24 }],
        ['08_pad_sat_freeze', Pd, { mix: 100, erosion: 80, weartype: 0, gsize: 200 }, [[4, 'freeze', 1]]],
        ['09_pad_tape_freeze', Pd, { mix: 100, erosion: 80, weartype: 1, gsize: 200 }, [[4, 'freeze', 1]]],
        ['10_pad_bit_freeze', Pd, { mix: 100, erosion: 80, weartype: 2, gsize: 200 }, [[4, 'freeze', 1]]],
        ['11_pad_erosion0_freeze', Pd, { mix: 100, erosion: 0, gsize: 200 }, [[4, 'freeze', 1]]],
        ['15_pad_sat30_freeze', Pd, { mix: 100, erosion: 30, weartype: 0, gsize: 200 }, [[4, 'freeze', 1]]],
        ['16_pad_tape55_freeze', Pd, { mix: 100, erosion: 55, weartype: 1, gsize: 200 }, [[4, 'freeze', 1]]],
        ['17_pad_bit55_freeze', Pd, { mix: 100, erosion: 55, weartype: 2, gsize: 200 }, [[4, 'freeze', 1]]],
        ['12_pluck_default', Pl, {}],
        ['18_pad_defaults_freeze', Pd, {}, [[4, 'freeze', 1]]],
        ['19_pad_defaults_grain40_freeze', Pd, { gsize: 40 }, [[4, 'freeze', 1]]],
        ['20_drums_pitch+12', D, { mix: 100, pitch: 12 }],
        ['21_drums_pitch-12', D, { mix: 100, pitch: -12 }],
        ['22_drums_pitch12_random', D, { mix: 100, pitch: 12, pitchmode: 1 }],
        ['23_drums_pitch7_impact', D, { mix: 100, pitch: 7, pitchmode: 2 }],
        ['24_drums_reverse50', D, { mix: 100, reverse: 50 }],
        ['25_pad_reverse100_freeze', Pd, { mix: 100, reverse: 100, gsize: 200 }, [[4, 'freeze', 1]]],
        ['26_pad_pitch+12_size5', Pd, { mix: 100, pitch: 12, gsize: 5 }],
        ['13_pluck_mono', Pl, { mix: 100, stereo: 1 }],
        ['14_pluck_stereo', Pl, { mix: 100, stereo: 0 }]
    ];
    console.log('scenario                          dry rms  out rms  out pk   dc       click  corr  bright(4s / end)  voices ev/s  ms/s  wear   >0.9     ov(ok mean max)');
    for (const [name, inp, set, sched] of scenarios) {
        const r = simulate(inp, set, { schedule: sched });
        const n = r.L.length, e4 = Math.min(n, 4 * SR);
        let over = 0; for (let i = 0; i < n; i++) if (Math.abs(r.L[i]) > 0.9 || Math.abs(r.R[i]) > 0.9) over++;
        const line = [name.padEnd(32),
            db(rms(inp[0])).toFixed(1).padStart(7), db(rms(r.L)).toFixed(1).padStart(8), db(Math.max(peakOf(r.L), peakOf(r.R))).toFixed(1).padStart(7),
            mean(r.L).toExponential(1).padStart(9), clickScore(r.L, inp[0]).toFixed(2).padStart(6), corr(r.L, r.R).toFixed(2).padStart(5),
            (brightness(r.L, e4 - SR, e4).toFixed(3) + ' / ' + brightness(r.L, n - SR, n).toFixed(3)).padStart(17),
            r.avgVoices.toFixed(1).padStart(7), (r.events / (n / SR)).toFixed(1).padStart(5), r.msPerSec.toFixed(0).padStart(5),
            wearOf(r.g).toFixed(3).padStart(6), (over / n * 100).toFixed(3).padStart(7) + '%',
            ovText(JSON.parse(r.ov))].join(' ');
        console.log(line);
        if (outdir) writeWav(path.join(outdir, name + '.wav'), r.L, r.R);
    }
    if (outdir) { writeWav(path.join(outdir, '00_dry_drums.wav'), D[0], D[1]); writeWav(path.join(outdir, '00_dry_pad.wav'), Pd[0], Pd[1]); writeWav(path.join(outdir, '00_dry_pluck.wav'), Pl[0], Pl[1]); }
}

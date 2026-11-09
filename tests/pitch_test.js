// Pitch and reverse check (0.3.0), directly on the gen~ codebox: record a test signal, freeze,
// fire one grain via the event ring and measure it.
//  - sine 220 Hz: frequency of a grain per pitch ratio (zero crossings in the flat part)
//  - chirp 200 -> 800 Hz: forward grains rise in frequency, reverse grains fall
// Usage: node tests/pitch_test.js
'use strict';
const path = require('path'), gen = require('./genexpr.js');
const SR = 48000, BLEN = 4 * SR;
function grain(sigf, ratio, dir, sizeMs) {
    const g = gen.load(path.join(__dirname, '..', 'device', 'runklimpsest_dsp.genexpr'), SR);
    const ev = new Float64Array(64 * 6), ov = new Float64Array(1025);
    g.bind('ev', ev); g.bind('ov', ov);
    g.set('p_barsec', 2); g.set('p_mix', 100); g.set('p_erosion', 0); g.set('p_size', sizeMs); g.set('p_stereo', 1);
    for (let i = 0; i < BLEN + 100; i++) { const v = sigf(i / SR); g.step(v, v); }
    g.set('p_freeze', 1);
    // 1.5 s silence: the input counts as inactive, the wet level regulation holds (no gain ride
    // and limiter work during the measured grain)
    for (let i = 0; i < 1.5 * SR; i++) g.step(0, 0);
    ev.set([0.5, 1, 0.5, 0, ratio, dir], 6);
    g.set('p_evhead', 1);
    const out = [];
    for (let i = 0; i < sizeMs / 1000 * SR + 200; i++) out.push(g.step(0, 0)[0]);
    // actual grain length (SIZE varies +-8 % per grain): measuring windows follow it
    out.len = Math.max(...Array.from(g.data.vs[3]));
    return out;
}
// frequency of the grain in [a, b): peak of a Hann-weighted DFT scanned finely around the
// expected value (zero crossings were biased by the slowly decaying offset the wet DC blocker
// leaves after the grain onset - flaky by 1-2 %)
function freq(x, a, b, guess) {
    let best = 0, bestF = 0;
    const N = b - a;
    for (let f = guess * 0.8; f <= guess * 1.25; f += guess * 0.0005) {
        const w = 2 * Math.PI * f / SR; let re = 0, im = 0;
        for (let i = 0; i < N; i++) { const h = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1)), v = x[a + i] * h; re += v * Math.cos(w * i); im -= v * Math.sin(w * i); }
        const p = re * re + im * im; if (p > best) { best = p; bestF = f; }
    }
    return bestF;
}
let fail = 0;
// 600 ms grains: >= 26 cycles in the window even at 110 Hz (a short window lets the mirrored
// spectrum bias the peak by up to 1 % depending on the start phase)
const size = 600;
console.log('PITCH  ratio  expected Hz  measured Hz');
for (const st of [-12, -7, 0, 7, 12]) {
    const r = Math.pow(2, st / 12), x = grain((t) => 0.5 * Math.sin(2 * Math.PI * 220 * t), r, 1, size), len = x.len;
    const exp = 220 * r, got = freq(x, Math.round(len * 0.3), Math.round(len * 0.7), exp);
    const ok = Math.abs(got - exp) < exp * 0.005;
    if (!ok) fail++;
    console.log(String(st).padStart(5), r.toFixed(3).padStart(6), exp.toFixed(1).padStart(12), got.toFixed(1).padStart(12), ok ? 'ok' : 'FAIL');
}
// chirp over the 4 s buffer: 200 Hz at 0 s .. 800 Hz at 4 s (phase = integral of frequency)
const chirp = (t) => { const u = t % 4; return 0.5 * Math.sin(2 * Math.PI * (200 * u + 75 * u * u)); };
console.log('DIR   first half Hz  second half Hz');
for (const dir of [1, -1]) {
    const x = grain(chirp, 1, dir, 400), L = x.len;
    const f1 = freq(x, Math.round(L * 0.25), Math.round(L * 0.5), 500), f2 = freq(x, Math.round(L * 0.5), Math.round(L * 0.75), 500);
    const ok = dir > 0 ? f2 > f1 * 1.02 : f2 < f1 / 1.02;
    if (!ok) fail++;
    console.log((dir > 0 ? ' fwd' : ' rev').padEnd(5), f1.toFixed(1).padStart(14), f2.toFixed(1).padStart(15), ok ? 'ok' : 'FAIL');
}
if (fail) { console.log(fail + ' check(s) failed'); process.exit(1); }
console.log('pitch and reverse ok');

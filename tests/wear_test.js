// Wear audibility: pad, FREEZE after 4 s, per wear type and EROSION, default HEAL/DOSE.
// Reports the wear of the loop (rms(worn - fresh) / rms(fresh), 1.0 = completely different)
// 10 s and 20 s after freezing, and the change of the wet output against erosion 0.
//   node tests/wear_test.js
'use strict';
const A = require('./audio_sim.js');
const SR = A.SR;

// identical particle paths for both runs of a comparison: seeded Math.random
function seeded(seed, fn) {
    const orig = Math.random; let s = seed >>> 0;
    Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    try { return fn(); } finally { Math.random = orig; }
}

const pad = A.pad(24);
const rows = [];
for (const wt of [0, 1, 2]) {
    for (const er of [30, 55, 80]) {
        const r = seeded(11, () => A.simulate(pad, { mix: 100, erosion: er, weartype: wt, gsize: 200 }, { schedule: [[4, 'freeze', 1]] }));
        const ref = seeded(11, () => A.simulate(pad, { mix: 100, erosion: 0, weartype: wt, gsize: 200 }, { schedule: [[4, 'freeze', 1]] }));
        // output difference vs. erosion 0 in the last 4 s (rms of difference relative to reference)
        const n = r.L.length, a = n - 4 * SR;
        let d = 0, s = 0;
        for (let i = a; i < n; i++) { d += (r.L[i] - ref.L[i]) ** 2; s += ref.L[i] ** 2; }
        rows.push([['SAT', 'TAPE', 'BIT'][wt], er, A.wearOf(r.g), A.brightness(r.L, a, n) / A.brightness(ref.L, a, n), Math.sqrt(d / s)]);
    }
}
console.log('type  erosion  loop wear (20 s)  brightness vs ref  output diff vs ref');
for (const [t, er, w, b, d] of rows) console.log(t.padEnd(5), String(er).padStart(7), w.toFixed(2).padStart(17), b.toFixed(2).padStart(18), (A.db(d)).toFixed(1).padStart(15) + ' dB');

// Transpiles device/runklimpsest_dsp.genexpr (the gen~ codebox that ships in the device)
// to a JavaScript function, so tests render exactly the shipped DSP code.
// Supports the subset the codebox uses: Param / History / Data / Buffer declarations
// (one per line), C-style statements, gen built-ins listed below.
'use strict';
const fs = require('fs');

function transpile(src, sr) {
    const lines = src.replace(/\r/g, '').split('\n');
    const params = [], hist = [], datas = [], bufs = [];
    const body = [];
    for (const raw of lines) {
        const line = raw.replace(/\/\/.*$/, '');
        let m;
        if ((m = line.match(/^\s*Param\s+(\w+)\s*\(\s*([-\d.e]+)[^)]*\)\s*;/))) params.push([m[1], +m[2]]);
        else if ((m = line.match(/^\s*History\s+(\w+)\s*\(\s*([-\d.e]+)\s*\)\s*;/))) hist.push([m[1], +m[2]]);
        else if ((m = line.match(/^\s*Data\s+(\w+)\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)\s*;/))) datas.push([m[1], +m[2], +m[3]]);
        else if ((m = line.match(/^\s*Buffer\s+(\w+)\s*\(([^)]*)\)\s*;/))) bufs.push(m[1]);
        else body.push(line);
    }
    const bodySrc = body.join('\n');
    const known = new Set([...params.map(p => p[0]), ...hist.map(h => h[0]), ...datas.map(d => d[0]), ...bufs,
        'in1', 'in2', 'out1', 'out2', 'samplerate', 'pi']);
    const locals = new Set();
    const re = /([A-Za-z_]\w*)\s*(?:=(?!=)|\+=|-=)/g;
    let m;
    while ((m = re.exec(bodySrc))) if (!known.has(m[1])) locals.add(m[1]);
    const code = `
        var samplerate = ${sr}, pi = Math.PI;
        function clamp(x, a, b) { return x < a ? a : (x > b ? b : x); }
        var floor = Math.floor, ceil = Math.ceil, exp = Math.exp, cos = Math.cos, sin = Math.sin, tanh = Math.tanh,
            sqrt = Math.sqrt, pow = Math.pow, abs = Math.abs, max = Math.max, min = Math.min;
        function sign(x) { return x > 0 ? 1 : (x < 0 ? -1 : 0); }
        function noise() { return Math.random() * 2 - 1; }
        function mstosamps(ms) { return ms * samplerate / 1000; }
        function peek(d, i, c) { i = Math.floor(i); var a = d[c | 0]; return (a && i >= 0 && i < a.length) ? a[i] : 0; }
        function poke(d, v, i, c) { i = Math.floor(i); var a = d[c | 0]; if (a && i >= 0 && i < a.length) a[i] = v; }
        function mk(n, ch) { var r = []; for (var c = 0; c < ch; c++) r.push(new Float64Array(n)); return r; }
        ${params.map(p => `var ${p[0]} = ${p[1]};`).join('\n')}
        ${hist.map(h => `var ${h[0]} = ${h[1]};`).join('\n')}
        ${datas.map(d => `var ${d[0]} = mk(${d[1]}, ${d[2]});`).join('\n')}
        ${bufs.map(b => `var ${b} = [new Float64Array(0)];`).join('\n')}
        function step(in1, in2) {
            var out1 = 0, out2 = 0;
            var ${[...locals].join(', ') || '_unused'};
            ${bodySrc}
            return [out1, out2];
        }
        return {
            step: step,
            set: function (n, v) { switch (n) { ${params.map(p => `case '${p[0]}': ${p[0]} = v; break;`).join(' ')} default: throw new Error('unknown param ' + n); } },
            get: function (n) { return eval(n); },
            bind: function (n, arr) { switch (n) { ${bufs.map(b => `case '${b}': ${b} = [arr]; break;`).join(' ')} } },
            data: { ${datas.map(d => `${d[0]}: ${d[0]}`).join(', ')} }
        };`;
    return { factory: new Function(code), params: params.map(p => p[0]), locals: [...locals] };
}

function load(path, sr) {
    const t = transpile(fs.readFileSync(path, 'utf8'), sr || 48000);
    const inst = t.factory();
    inst.paramNames = t.params;
    return inst;
}

module.exports = { transpile, load };

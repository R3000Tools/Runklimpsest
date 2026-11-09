// Usage: node tests/smoke.js [path/to/runklimpsest_ui.js]. Smoke test: runs the jsui file in node with mocked Max globals.
const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync(process.argv[2] || require('path').join(__dirname, '..', 'device', 'runklimpsest_ui.js'), 'utf8');
const globals = {};
let calls = 0;
function makeCtx(mode, rect, name) {
  const mg = new Proxy({}, { get: (t, k) => {
    if (k === 'text_measure') return (s) => [String(s).length * 5, 8];
    if (k === 'pattern_create_linear') return () => ({ add_color_stop_rgba() {} });
    if (k in t) return t[k];
    return () => { calls++; };
  }, set: (t, k, v) => { t[k] = v; return true; } });
  const out = [];
  const ctx = {
    mgraphics: mg, jsarguments: name ? ['runklimpsest_ui.js', mode, name] : ['runklimpsest_ui.js', mode], messagename: '',
    Global: function (name) { if (!globals[name]) globals[name] = {}; return globals[name]; },
    outlet: (...a) => out.push(a), post: console.log, Math,
    box: { rect: rect }, out
  };
  ctx.Global = new Proxy(function(){}, { construct: (t, args) => { const n = args[0]; if (!globals[n]) globals[n] = {}; return globals[n]; } });
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx;
}
const ch = makeCtx('device', [0,0,580,169]);
const mem = makeCtx('controls', [0,0,928,170]);
const dose = makeCtx('title', [0,0,200,18]);
const large = makeCtx('large', [0,0,928,400]);
const title = makeCtx('title', [0,0,200,18]);
function send(ctx, name, ...args) {
  ctx.messagename = name;
  if (typeof ctx[name] === 'function' && name !== 'anything') ctx[name](...args); else ctx.anything(...args);
}
const paint = (c) => vm.runInContext('paint.call({box: box})', c);
let uid = null;
for (let f = 0; f < 600; f++) {
  send(ch, 'level', f < 300 ? 0.6 : 0.0); send(ch, 'meters', f < 300 ? 0.3 : 0, f < 300 ? 0.25 : 0);
  if (f % 4 === 0) send(ch, 'tick');
  if (f === 100) send(ch, 'sync', 0);
  if (f === 200) { send(ch, 'sync', 1); send(ch, 'freeze', 1); send(ch, 'swarm', 24); send(ch, 'tempo', 90); send(ch, 'signum', 3); }
  send(ch, 'bang');
  for (const o of ch.out.splice(0)) if (o[1] === 'uid') uid = o[2];
  if (uid) { for (const c of [mem, dose, large]) { if (!c._u) { send(c, 'uid', uid); c._u = 1; } } }
  paint(ch); paint(mem); paint(dose); paint(large); paint(title);
}
const st = globals[uid].state;
console.log('uid', uid, 'n', st.n, 'queued', st.queued, 'maxwear', Math.max(...st.wear).toFixed(2), 'drawcalls', calls);
send(ch, 'gsize', 120); const pg = vm.runInContext('P.gsize', ch);
if (pg !== 120) throw new Error('message "gsize" did not reach P.gsize (name clash?)');
console.log('size param', pg);
// every parameter name must reach P (no function with the same name may swallow it)
const names = Object.keys(vm.runInContext('SPEC', ch));
for (const n of names) { send(ch, n, 1); if (vm.runInContext('P.' + n, ch) !== 1) throw new Error('param message swallowed: ' + n); }
console.log('all', names.length, 'parameter messages reach P');
// device widgets: knob drag / double-click and menu click must send "<name> <value>"
const knob = makeCtx('knob', [0,0,54,70], 'gravity'); send(knob, 'uid', uid);
const menu = makeCtx('menu', [0,0,43,13], 'division'); send(menu, 'uid', uid);
paint(knob); paint(menu);
knob.onclick(27, 34, 1, 0, 0); knob.ondrag(27, 4, 1, 0, 0); knob.ondrag(27, 4, 0, 0, 0); knob.ondblclick(27, 34);
menu.onclick(10, 6, 1, 0, 0); menu.onclick(10, 6, 1, 0, 1);
const ko = knob.out.map(o => o.slice(1)), mo = menu.out.map(o => o.slice(1));
// device panel clicks: knob drag, sync, division, freeze, more, dose
const DL = vm.runInContext('LAYOUT', ch); ch.out.length = 0;
const c = (r) => [r[0] + r[2] / 2, r[1] + r[3] / 2];
let p0 = c(DL.gravity); ch.onclick(p0[0], p0[1], 1, 0, 0); ch.ondrag(p0[0], p0[1] - 30, 1, 0, 0); ch.ondrag(p0[0], p0[1] - 30, 0, 0, 0); ch.ondblclick(p0[0], p0[1]);
const q0 = c(DL.sync); ch.onclick(q0[0], q0[1], 1, 0, 0);
const qd = c(DL.division); ch.onclick(qd[0], qd[1], 1, 0, 0);                 // opens the list, no output
const it3 = vm.runInContext('menuItemRect(3)', ch); paint(ch);                   // list drawn
ch.onclick(it3[0] + 5, it3[1] + 5, 1, 0, 0);                                     // picks 1/32
for (const k of ['freeze', 'more']) { const q = c(DL[k]); ch.onclick(q[0], q[1], 1, 0, 0); }
const dout = ch.out.map(o => o.slice(1)).filter(o => o[0] !== 'uid' && o[0] !== 'evw' && o[0] !== 'gen' && o[0] !== 'ovreq');
console.log('device panel out', JSON.stringify(dout));
const got = dout.map(o => o[0]).join(',');
if (got !== 'gravity,gravity,sync,division,freeze,open') throw new Error('device click outputs wrong: ' + got);
if (dout[3][1] !== 3) throw new Error('division list did not select item 3');
console.log('knob out', JSON.stringify(ko), 'menu out', JSON.stringify(mo));
const gdef = vm.runInContext('SPEC.gravity.def', knob);
if (!ko.length || ko[0][0] !== 'gravity' || ko[ko.length - 1][1] !== gdef) throw new Error('knob widget output wrong');
if (mo.length !== 2 || mo[0][0] !== 'division') throw new Error('menu widget output wrong');
const L = vm.runInContext('LAYOUT', ch); if (!L.gsize || !L.mix || !L.chamber || L.dose) throw new Error('generated LAYOUT missing or stale');
console.log('tempo seen by engine', st.tempo, st.num + '/' + st.den);
// 0.2.7 overview: without a buffer the panel asks for its name, with one it reads real data
const req = []; for (let f = 0; f < 130; f++) { send(ch, 'bang'); for (const o of ch.out.splice(0)) if (o[1] === 'ovreq') req.push(f); }
if (!req.length) throw new Error('panel never asked for the overview buffer name (ovreq)');
if (st.ov.ok) throw new Error('overview marked real without a buffer');
ch.Buffer = function (n) { this.n = n; };
ch.Buffer.prototype.peek = function (c, s0, n) { const a = []; for (let i = 0; i < n; i++) a.push(i === n - 1 ? 0.25 : ((i % 4 === 3) ? 0.5 : 0.3)); return a; };
send(ch, 'ovname', '123rkov', 'bang');
for (let f = 0; f < 16; f++) send(ch, 'bang');
if (!st.ov.ok || Math.abs(st.ov.rhead - 0.25) > 1e-9 || st.ov.rwe[10] !== 0.5) throw new Error('overview not read from buffer');
// 0.2.8: display eases toward the data (no steps) and gets there within a few frames
for (let f = 0; f < 20; f++) send(ch, 'bang');
if (Math.abs(st.ov.we[10] - 0.5) > 0.01 || Math.abs(st.ov.wp[10] - 0.3) > 0.01) throw new Error('display did not converge to the overview');
paint(ch); paint(large);
console.log('overview: ovreq sent, buffer read ok, head', st.ov.rhead, 'most worn', vm.runInContext('wearStats(sharedState())', ch).most);

// 0.3.0: no DOSE parameters any more, 8 device knobs, grain events with pitch ratio and direction
for (const gone of ['rate', 'recover', 'target', 'resetdose', 'grain']) if (names.includes(gone)) throw new Error('parameter should be gone: ' + gone);
const dk = vm.runInContext('DEVICE_KNOBS', ch);
if (dk.join(',') !== 'gravity,bounce,swarm,gsize,pitch,reverse,erosion,mix') throw new Error('device knobs wrong: ' + dk);
function grains(set, n) {
  for (const k in set) send(ch, k, set[k]);
  ch.out.length = 0;
  const res = [];
  for (let i = 0; i < n; i++) vm.runInContext('emitGrain(0.5, 0.8, 0.5, 0, ' + (i % 2 ? 0.25 : 1) + ')', ch);
  const ev = ch.out.filter(o => o[1] === 'evw');
  for (let i = 0; i + 5 < ev.length; i += 6) res.push({ ratio: ev[i + 4][3], dir: ev[i + 5][3], slot: ev[i][2] });
  return res;
}
let g = grains({ pitch: 7, pitchmode: 0, reverse: 0 }, 20);
if (g.some(x => Math.abs(x.ratio - Math.pow(2, 7 / 12)) > 1e-9 || x.dir !== 1)) throw new Error('FIXED pitch / forward wrong');
if (g[1].slot - g[0].slot !== 6 && g[1].slot !== 0) throw new Error('event slot stride is not 6');
g = grains({ pitch: 12, pitchmode: 1, reverse: 100 }, 200);
const semis = g.map(x => 12 * Math.log2(x.ratio));
if (Math.max(...semis) > 12.0001 || Math.min(...semis) < -12.0001 || new Set(semis.map(v => v.toFixed(3))).size < 50) throw new Error('RANDOM pitch range wrong');
if (g.some(x => x.dir !== -1)) throw new Error('REVERSE 100 % not all reverse');
g = grains({ pitch: -12, pitchmode: 2, reverse: 25 }, 400);
const main = g.filter((x, i) => i % 2 === 0).map(x => 12 * Math.log2(x.ratio)), tail = g.filter((x, i) => i % 2).map(x => 12 * Math.log2(x.ratio));
if (Math.abs(main[0] + 12) > 1e-9 || Math.abs(tail[0] + 3) > 1e-9) throw new Error('IMPACT scaling wrong: ' + main[0] + ' / ' + tail[0]);
const revShare = g.filter(x => x.dir < 0).length / g.length;
if (revShare < 0.17 || revShare > 0.33) throw new Error('REVERSE 25 % share off: ' + revShare);
send(ch, 'pitch', 0); send(ch, 'pitchmode', 0); send(ch, 'reverse', 0);
paint(ch); paint(mem); paint(large);
console.log('0.3.0: 16 parameters, 8 device knobs, pitch FIXED/RANDOM/IMPACT ok, reverse share at 25 %:', revShare.toFixed(2));

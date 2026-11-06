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
  if (f === 400) send(ch, 'resetdose', 1);
  send(ch, 'bang');
  for (const o of ch.out.splice(0)) if (o[1] === 'uid') uid = o[2];
  if (uid) { for (const c of [mem, dose, large]) { if (!c._u) { send(c, 'uid', uid); c._u = 1; } } }
  paint(ch); paint(mem); paint(dose); paint(large); paint(title);
  if (f === 299) console.log('dose at 300 frames (signal):', globals[uid].state.dose.toFixed(3), 'n', globals[uid].state.n);
}
const st = globals[uid].state;
console.log('uid', uid, 'dose end', st.dose.toFixed(3), 'n', st.n, 'queued', st.queued, 'maxwear', Math.max(...st.wear).toFixed(2), 'drawcalls', calls);
send(ch, 'resetdose', 1); console.log('after resetdose 1 resetReq', st.resetReq);
send(ch, 'grain', 120); const pg = vm.runInContext('P.grain', ch);
if (pg !== 120) throw new Error('message "grain" did not reach P.grain (name clash?)');
console.log('grain param', pg);
// every parameter name must reach P (no function with the same name may swallow it)
const names = Object.keys(vm.runInContext('SPEC', ch));
for (const n of names) { if (n === 'resetdose') continue; send(ch, n, 1); if (vm.runInContext('P.' + n, ch) !== 1) throw new Error('param message swallowed: ' + n); }
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
for (const k of ['freeze', 'more', 'dose']) { const q = c(DL[k]); ch.onclick(q[0], q[1], 1, 0, 0); }
const dout = ch.out.map(o => o.slice(1)).filter(o => o[0] !== 'uid' && o[0] !== 'evw' && o[0] !== 'gen');
console.log('device panel out', JSON.stringify(dout));
const got = dout.map(o => o[0]).join(',');
if (got !== 'gravity,gravity,sync,division,freeze,open,resetdose') throw new Error('device click outputs wrong: ' + got);
if (dout[3][1] !== 3) throw new Error('division list did not select item 3');
console.log('knob out', JSON.stringify(ko), 'menu out', JSON.stringify(mo));
if (!ko.length || ko[0][0] !== 'gravity' || ko[ko.length - 1][1] !== 0.62) throw new Error('knob widget output wrong');
if (mo.length !== 2 || mo[0][0] !== 'division') throw new Error('menu widget output wrong');
const L = vm.runInContext('LAYOUT', ch); if (!L.dose || !L.chamber) throw new Error('generated LAYOUT missing');
console.log('tempo seen by engine', st.tempo, st.num + '/' + st.den);

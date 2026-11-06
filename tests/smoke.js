// Usage: node tests/smoke.js [path/to/runklimpsest_ui.js]. Smoke test: runs the jsui file in node with mocked Max globals.
const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync(process.argv[2] || require('path').join(__dirname, '..', 'device', 'runklimpsest_ui.js'), 'utf8');
const globals = {};
let calls = 0;
function makeCtx(mode, rect) {
  const mg = new Proxy({}, { get: (t, k) => {
    if (k === 'text_measure') return (s) => [String(s).length * 5, 8];
    if (k in t) return t[k];
    return () => { calls++; };
  }, set: (t, k, v) => { t[k] = v; return true; } });
  const out = [];
  const ctx = {
    mgraphics: mg, jsarguments: ['runklimpsest_ui.js', mode], messagename: '',
    Global: function (name) { if (!globals[name]) globals[name] = {}; return globals[name]; },
    outlet: (...a) => out.push(a), post: console.log, Math,
    box: { rect: rect }, out
  };
  ctx.Global = new Proxy(function(){}, { construct: (t, args) => { const n = args[0]; if (!globals[n]) globals[n] = {}; return globals[n]; } });
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx;
}
const ch = makeCtx('chamber', [0,0,200,124]);
const mem = makeCtx('memory', [0,0,152,74]);
const dose = makeCtx('dose', [0,0,50,64]);
const large = makeCtx('large', [0,0,928,400]);
const title = makeCtx('title', [0,0,200,18]);
function send(ctx, name, ...args) {
  ctx.messagename = name;
  if (typeof ctx[name] === 'function' && name !== 'anything') ctx[name](...args); else ctx.anything(...args);
}
const paint = (c) => vm.runInContext('paint.call({box: box})', c);
let uid = null;
for (let f = 0; f < 600; f++) {
  send(ch, 'level', f < 300 ? 0.6 : 0.0);
  if (f % 4 === 0) send(ch, 'tick');
  if (f === 100) send(ch, 'sync', 0);
  if (f === 200) { send(ch, 'sync', 1); send(ch, 'freeze', 1); send(ch, 'swarm', 24); }
  if (f === 400) send(ch, 'resetdose', 1);
  send(ch, 'bang');
  for (const o of ch.out.splice(0)) if (o[1] === 'uid') uid = o[2];
  if (uid) { for (const c of [mem, dose, large]) { if (!c._u) { send(c, 'uid', uid); c._u = 1; } } }
  paint(ch); paint(mem); paint(dose); paint(large); paint(title);
  if (f === 299) console.log('dose at 300 frames (signal):', globals[uid].state.dose.toFixed(3), 'n', globals[uid].state.n);
}
const st = globals[uid].state;
console.log('uid', uid, 'dose end', st.dose.toFixed(3), 'n', st.n, 'queued', st.queued, 'maxwear', Math.max(...st.wear).toFixed(2), 'drawcalls', calls);
dose.onclick(10, 10); console.log('after dose click resetReq', st.resetReq);

// Usage: node tests/render.js [out.png]. Renders jsui modes with a Canvas2D-backed mgraphics mock (approximation of Max drawing).
const fs=require('fs');const {chromium}=require('playwright');
const src=fs.readFileSync(require('path').join(__dirname,'..','device','runklimpsest_ui.js'),'utf8');
const page=`<html><body style="margin:0;background:#16181d"><canvas id=c width=960 height=420></canvas><script>
const SRC=${JSON.stringify(src)};
const globals={};
function make(mode,ctx,ox,oy,w,h,name){
  let fontSize=10,fontBold=false;
  const mg={init(){},redraw(){},
    set_source_rgba(r,g,b,a){ctx.fillStyle=ctx.strokeStyle='rgba('+r*255+','+g*255+','+b*255+','+a+')';},
    rectangle(x,y,w,h){ctx.rect(x,y,w,h);}, rectangle_rounded(x,y,w,h,ow,oh){ctx.roundRect(x,y,w,h,Math.min(ow/2,w/2,h/2));},
    fill(){ctx.fill();ctx.beginPath();}, fill_preserve(){ctx.fill();}, stroke(){ctx.stroke();ctx.beginPath();},
    set_line_width(w){ctx.lineWidth=w;}, arc(x,y,r,a,b){ctx.moveTo(x+r*Math.cos(a),y+r*Math.sin(a));ctx.arc(x,y,r,a,b);},
    move_to(x,y){ctx.moveTo(x,y);}, line_to(x,y){ctx.lineTo(x,y);}, ellipse(x,y,w,h){ctx.moveTo(x+w,y+h/2);ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2);},
    select_font_face(n){fontBold=/Bold/.test(n);}, set_font_size(s){fontSize=s;ctx.font=(fontBold?'bold ':'')+s+'px Inter, Arial';},
    text_measure(s){ctx.font=(fontBold?'bold ':'')+fontSize+'px Inter, Arial';return [ctx.measureText(s).width,fontSize];},
    show_text(s){ctx.font=(fontBold?'bold ':'')+fontSize+'px Inter, Arial';const p=ctx.__p||[0,0];ctx.fillText(s,p[0],p[1]);},
    new_path(){ctx.beginPath();}, close_path(){ctx.closePath();},
    pattern_create_linear(x1,y1,x2,y2){const g=ctx.createLinearGradient(x1,y1,x2,y2);return {add_color_stop_rgba(o,r,gg,b,a){g.addColorStop(o,'rgba('+r*255+','+gg*255+','+b*255+','+a+')');},_g:g};},
    set_source(p){ctx.fillStyle=ctx.strokeStyle=p._g;}};
  const origMove=mg.move_to;mg.move_to=(x,y)=>{ctx.__p=[x,y];origMove(x,y);};
  const out=[];
  const env={mgraphics:mg,jsarguments:name?['x',mode,name]:['x',mode],outlet:(...a)=>out.push(a),Math,messagename:'',box:{rect:[0,0,w,h]}};
  env.Global=function(n){if(!globals[n])globals[n]={};return globals[n];};
  const f=new Function(...Object.keys(env),SRC+';return {bang,uid,paint,anything,level,tick,onclick,ondrag,ondblclick,out:()=>out,setmsg:(m)=>{messagename=m;}};');
  const api=f(...Object.values(env));
  return {api,paint(){ctx.save();ctx.translate(ox,oy);ctx.beginPath();api.paint.call({box:{rect:[0,0,w,h]}});ctx.restore();},out};
}
const c=document.getElementById('c').getContext('2d');
const ch=make('device',c,10,10,580,169), ctl=make('controls',c,16,230,928,170);
let uid=null;
for(let f=0;f<240;f++){ch.api.level(0.5);if(f%4==0)ch.api.tick();ch.api.bang();for(const o of ch.out.splice(0))if(o[1]=='uid')uid=o[2];}
ctl.api.uid(uid);
const L=new Function(SRC.slice(SRC.indexOf('// BEGIN GENERATED'),SRC.indexOf('// END GENERATED'))+';return LAYOUT;')();
const widgets=['gravity','bounce','swarm','erosion','mix','division'].map(n=>{const r=L[n];const w=make(n==='division'?'menu':'knob',c,10+r[0],10+r[1],r[2],r[3],n);w.api.uid(uid);return w;});
// interaction test: click SYNC (toggle), click division segment 4, drag gravity up
ctl.api.onclick(430,25);ctl.api.onclick(640,25);ctl.api.onclick(128,38);ctl.api.ondrag(128,8,1);
window.sent=ctl.out.slice();
ch.paint();widgets.forEach(w=>w.paint());ctl.paint();
</script></body></html>`;
(async()=>{const b=await chromium.launch();const pg=await b.newPage({deviceScaleFactor:1});
pg.on('pageerror',e=>console.log('PAGEERROR',e.message));
await pg.setContent(page);await pg.waitForTimeout(300);
console.log('sent:',JSON.stringify(await pg.evaluate(()=>window.sent)));
await pg.screenshot({path:process.argv[2]||'render.png'});await b.close();})();

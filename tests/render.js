// Usage: node tests/render.js [out.png]. Renders jsui modes with a Canvas2D-backed mgraphics mock (approximation of Max drawing).
const fs=require('fs');const {chromium}=require('playwright');
const src=fs.readFileSync(require('path').join(__dirname,'..','device','runklimpsest_ui.js'),'utf8');
const page=`<html><body style="margin:0;background:#16181d"><canvas id=c width=960 height=660></canvas><script>
const SRC=${JSON.stringify(src)};
const globals={};
// stand-in for the gen~ overview buffer (Max JS Buffer): drum-like peaks, two worn zones
function MockBuffer(name){this.name=name;}
MockBuffer.prototype.peek=function(ch,start,n){const a=[];const N=256;
  for(let i=0;i<N;i++){const t=i/N*8,beat=t%1,b=Math.floor(t);let pk=0.1+0.05*Math.abs(Math.sin(i*7.3));
    pk+=0.8*Math.exp(-beat*9)*(b%4===0?1:0.55)+(b%2===1?0.5*Math.exp(-beat*14):0)+0.15*Math.exp(-((t*2)%1)*22);pk=Math.min(0.95,pk)*0.5;
    const x=i/N,we=(x>0.3&&x<0.47)?0.7:((x>0.66&&x<0.73)?0.4:0.03);
    a.push(pk,pk*(1-0.3*we),pk*0.35*(1+0.8*we),we);}
  a.push(0.7);return a;};
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
  const env={Buffer:MockBuffer,mgraphics:mg,jsarguments:name?['x',mode,name]:['x',mode],outlet:(...a)=>out.push(a),Math,messagename:'',box:{rect:[0,0,w,h]}};
  env.Global=function(n){if(!globals[n])globals[n]={};return globals[n];};
  const f=new Function(...Object.keys(env),SRC+';return {ovname,bang,uid,paint,meters,anything,level,tick,onclick,ondrag,ondblclick,out:()=>out,setmsg:(m)=>{messagename=m;}};');
  const api=f(...Object.values(env));
  return {api,paint(){ctx.save();ctx.translate(ox,oy);ctx.beginPath();api.paint.call({box:{rect:[0,0,w,h]}});ctx.restore();},out};
}
const c=document.getElementById('c').getContext('2d');
const ch=make('device',c,10,10,634,169), lg=make('large',c,20,200,920,276), ctl=make('controls',c,20,482,920,160);
let uid=null;ch.api.ovname('rkov_test');
for(const [k,v] of [['pitch',7],['reverse',30]]){ch.api.setmsg(k);ch.api.anything(v);}
for(let f=0;f<240;f++){ch.api.level(0.5);if(f%4==0)ch.api.tick();ch.api.bang();for(const o of ch.out.splice(0))if(o[1]=='uid')uid=o[2];}
ctl.api.uid(uid);lg.api.uid(uid);
ch.api.meters(0.4,0.3);const DLr=new Function(SRC.slice(SRC.indexOf('// BEGIN GENERATED'),SRC.indexOf('// END GENERATED'))+';return LAYOUT;')();ch.api.onclick(DLr.division[0]+5,DLr.division[1]+5,1,0,0);
// interaction test: click SYNC (toggle), click division segment 4, drag gravity up
ctl.api.onclick(40,130);ctl.api.onclick(225,130);ctl.api.onclick(54,64);ctl.api.ondrag(54,34,1);
window.sent=ctl.out.slice();
ch.paint();lg.paint();ctl.paint();
</script></body></html>`;
(async()=>{const b=await chromium.launch();const pg=await b.newPage({deviceScaleFactor:1,viewport:{width:960,height:820}});
pg.on('pageerror',e=>console.log('PAGEERROR',e.message));
await pg.setContent(page);await pg.waitForTimeout(300);
console.log('sent:',JSON.stringify(await pg.evaluate(()=>window.sent)));
await pg.screenshot({path:process.argv[2]||'render.png'});await b.close();})();

// Renders the presentation layout (device + large view) as labelled boxes. Usage: node tests/layout.js [out.png]
const fs=require('fs');const {chromium}=require('playwright');
const p=JSON.parse(fs.readFileSync(require('path').join(__dirname,'..','device','Runklimpsest.maxpat'),'utf8')).patcher;
const win=p.boxes.find(b=>b.box.text==='p LargeView').box.patcher;
function html(boxes,w,h){let s=`<div style="position:relative;width:${w}px;height:${h}px;background:#111;font:9px sans-serif;color:#fff">`;
for(const {box:b} of boxes){if(!b.presentation)continue;const [x,y,bw,bh]=b.presentation_rect;
const lbl=b.maxclass==='comment'?b.text:(b.maxclass==='jsui'?'jsui:'+b.jsarguments[0]:(b.varname||b.maxclass));
const col={jsui:'#2a6',comment:'transparent',panel:'transparent'}[b.maxclass]||'#457';
s+=`<div style="position:absolute;left:${x}px;top:${y}px;width:${bw}px;height:${bh}px;border:1px solid #9cf;background:${col}55;overflow:hidden;box-sizing:border-box">${lbl}</div>`;}
return s+'</div>';}
(async()=>{const b=await chromium.launch();const pg=await b.newPage({deviceScaleFactor:2});
await pg.setContent(html(p.boxes,p.devicewidth||580,169)+'<br>'+html(win.boxes,960,456));
await pg.screenshot({path:process.argv[2]||'layout.png',fullPage:true});await b.close();})();

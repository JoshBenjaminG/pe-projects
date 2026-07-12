import{createClient as No}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Ea="https://mqfsgammpsumpltfutwl.supabase.co",La="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var v=No(Ea,La);function _a(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="goals"?{name:"goals"}:{name:"list"}}function K(){window.location.hash="#/"}function $a(t){window.location.hash=`#/lift/${t}`}function Da(){window.location.hash="#/workout/new"}function Ca(t){window.location.hash=`#/workout/${t}/edit`}function ye(){window.location.hash="#/help"}function Ta(){window.location.hash="#/weight"}function Ma(){window.location.hash="#/composite"}function qa(){window.location.hash="#/history"}function Aa(){window.location.hash="#/killstreak"}function oe(){window.location.hash="#/goals"}function we(){window.dispatchEvent(new Event("hashchange"))}async function be(){let{data:t,error:e}=await v.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Ra(){let{error:t}=await v.from("feedback_submissions").insert({});if(t)throw t}async function ke(){let{count:t,error:e}=await v.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function st(){let{data:t,error:e}=await v.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Po(){let{data:t,error:e}=await v.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function Wa(t){let{data:e,error:a}=await v.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function Yt(t,e,a={}){let{data:r,error:o}=await v.from("lifts").insert({...a,name:t,sort_order:e}).select().single();if(o)throw o;return r}async function Ia(t,e){let{data:a,error:r}=await v.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Na(t){let e=t.map((o,n)=>v.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Pa(t){let{error:e}=await v.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ua(t){let{error:e}=await v.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ha(t){let{data:e,error:a}=await v.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function kt(t){if(!t||t.length===0)return[];let{data:e,error:a}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ve(){let t=await Po();return kt(t)}async function Se(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function ft(t,e,a,r){let{data:o,error:n}=await v.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Fa(t,e){let{data:a,error:r}=await v.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Oa(t){let{error:e}=await v.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ba(t){let{error:e}=await v.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ga(){let{data:t,error:e}=await v.from("goals").select("*").is("deleted_at",null).order("created_at",{ascending:!0});if(e)throw e;return t}async function Va(t){let{data:e,error:a}=await v.from("goals").insert(t).select().single();if(a)throw a;return e}async function Ka(t){if(!t||t.length===0)return[];let{data:e,error:a}=await v.from("goals").insert(t).select();if(a)throw a;return e}async function Ya(t,e){let{data:a,error:r}=await v.from("goals").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ja(t){let{error:e}=await v.from("goals").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Xa(){let{data:t,error:e}=await v.from("goal_events").select("*").order("created_at",{ascending:!1}).limit(100);if(e)throw e;return t}async function Uo(t){let{data:e,error:a}=await v.from("goal_events").insert(t).select().single();if(a){if(a.code==="23505")return null;throw a}return e}async function za(t){let e=[];for(let a of t){let r=await Uo(a);r&&e.push(r)}return e}async function jt(){let{data:t,error:e}=await v.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Ja(t){let e=t.map((o,n)=>v.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Qa(t){let{data:e,error:a}=await v.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function xe(t,e,a){let{data:r,error:o}=await v.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await v.from("workout_lifts").insert(e.map(i=>({workout_id:r.id,lift_id:i})));if(n)throw n}return r}async function Za(t,e,a){let{error:r}=await v.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await v.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await v.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(n)throw n}}async function tr(t){let{error:e}=await v.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function er(t){let{error:e}=await v.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function dt(){let{data:t,error:e}=await v.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ar(t,e){let{data:a,error:r}=await v.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function rr(t,e){let{data:a,error:r}=await v.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function or(t){let{error:e}=await v.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function nr(t){let{error:e}=await v.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ut(){let{data:t,error:e}=await v.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function sr(t,e){let{data:a,error:r}=await v.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ir(t,e){let{data:a,error:r}=await v.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function lr(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function cr(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}async function dr(t,e){let{data:a,error:r}=await v.from("food_log_entries").select("*").is("deleted_at",null).gte("logged_at",t).lt("logged_at",e).order("logged_at",{ascending:!1});if(r)throw r;return a}async function ur(t,e,a){let{data:r,error:o}=await v.from("food_log_entries").insert({title:t,calories:e,logged_at:a||new Date().toISOString()}).select().single();if(o)throw o;return r}async function pr(t,e){let{data:a,error:r}=await v.from("food_log_entries").update(e).eq("id",t).select().single();if(r)throw r;return a}async function mr(t){let{error:e}=await v.from("food_log_entries").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function fr(t){let{error:e}=await v.from("food_log_entries").update({deleted_at:null}).eq("id",t);if(e)throw e}function j(t,e){return t*(1+e/30)}function C(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function vt(t){let e=new Map;for(let a of t){let r=C(a.performed_at),o=j(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Xt(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let r=new Set;for(let i of e)for(let h of i.dailySeries)r.add(h.date);let o=Array.from(r).sort(),n=[];for(let i of o){let h=0,m=0;for(let s of e){let l=null;for(let p of s.dailySeries)if(p.date<=i)l=p;else break;l&&(h+=l.e1rm/a.get(s.liftId),m+=1)}if(m>0){let s=h/m;n.push({date:i,ratio:s,pct:(s-1)*100})}}return n}function Ee(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>j(Number(r.weight),Number(r.reps))));return t>a}function ht(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function hr(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function gr(t){let e=new Map;for(let a of t){let r=C(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function gt(t){let e=new Map;for(let a of t){let r=C(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function yr(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Ht(t){let e=new Map;for(let a of t){let r=C(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var ne=null,Dt=null,Ct=null,Tt=null,$e=14,Le="#e8242c",wr="rgba(232, 36, 44, 0.18)",_e="#f2b134",br="rgba(242, 177, 52, 0.16)",Mt="#9a9ca6",qt="rgba(255, 255, 255, 0.08)";function De(t,e,{onPointClick:a}={}){ne&&(ne.destroy(),ne=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return ne=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:Le,backgroundColor:wr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Le,pointHitRadius:$e}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Mt},grid:{color:qt}},y:{ticks:{color:Mt,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:qt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),ne}function kr(t,e,{onPointClick:a}={}){Dt&&(Dt.destroy(),Dt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return Dt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:_e,backgroundColor:br,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:_e,pointHitRadius:$e}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Mt},grid:{color:qt}},y:{ticks:{color:Mt},grid:{color:qt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Dt}function vr(){Dt&&(Dt.destroy(),Dt=null)}function Ve(t,e,{onPointClick:a}={}){Ct&&(Ct.destroy(),Ct=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return Ct=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:Le,backgroundColor:wr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Le,pointHitRadius:$e}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Mt},grid:{color:qt}},y:{ticks:{color:Mt},grid:{color:qt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Ct}function Ke(){Ct&&(Ct.destroy(),Ct=null)}function Sr(t,e,{onPointClick:a}={}){Tt&&(Tt.destroy(),Tt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return Tt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:_e,backgroundColor:br,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:_e,pointHitRadius:$e}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Mt},grid:{color:qt}},y:{ticks:{color:Mt},grid:{color:qt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Tt}function xr(){Tt&&(Tt.destroy(),Tt=null)}function se(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,i=0,h=0,m=0,s=0,l=null,p=null,y=null,c=0,b=0,D=null,u=null;function L(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function $(f){let k=f.target.closest(".lt-drag-handle");if(!k)return;let E=k.closest("[data-reorder-item]");if(E){if(f.pointerType!=="touch"){f.preventDefault(),F(E,f.clientX,f.clientY);return}if(k.setPointerCapture)try{k.setPointerCapture(f.pointerId),D=k,u=f.pointerId}catch{}y=E,c=f.clientX,b=f.clientY,document.addEventListener("pointermove",H),document.addEventListener("pointerup",X),p=setTimeout(()=>{clearTimeout(p),p=null;let I=y,N=c,R=b;W(),F(I,N,R)},180)}}function q(){if(D&&u!==null&&D.releasePointerCapture)try{D.releasePointerCapture(u)}catch{}D=null,u=null}function W(){clearTimeout(p),p=null,y=null,document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",X)}function H(f){if(!y)return;let k=f.clientX-c,E=f.clientY-b;Math.hypot(k,E)<=10||(W(),q())}function X(){W(),q()}function F(f,k,E){r=f,n=k,i=E,s=E;let I=f.getBoundingClientRect();m=I.top,h=I.left,o=document.createElement(f.tagName),o.className="lt-reorder-placeholder",o.style.height=`${f.offsetHeight}px`,o.style.width=`${f.offsetWidth}px`,f.after(o),f.classList.add("lt-dragging"),f.style.position="fixed",f.style.left=`${I.left}px`,f.style.width=`${I.width}px`,f.style.top=`${m}px`,f.style.zIndex="1000",document.addEventListener("pointermove",ot),document.addEventListener("pointerup",S)}function Q(){let f=L().filter(I=>I!==r),k=r.getBoundingClientRect(),E=null;if(a==="x"){let I=k.left+k.width/2,N=k.top+k.height/2;for(let R of f){let T=R.getBoundingClientRect(),J=T.left+T.width/2,Y=T.top+T.height/2;if(Math.abs(Y-N)<T.height/2?I<J:N<Y){E=R;break}}}else{let I=k.top+k.height/2;for(let N of f){let R=N.getBoundingClientRect(),T=R.top+R.height/2;if(I<T){E=N;break}}}E?t.insertBefore(o,E):t.appendChild(o)}function z(){let f=s,k=window.innerHeight-s;return f<80?-16*(1-f/80):k<80?16*(1-k/80):0}function O(){if(!r){l=null;return}let f=z();if(f===0){l=null;return}window.scrollBy(0,f),Q(),l=requestAnimationFrame(O)}function mt(){l===null&&z()!==0&&(l=requestAnimationFrame(O))}function rt(){l!==null&&(cancelAnimationFrame(l),l=null)}function ot(f){if(r){if(f.preventDefault(),s=f.clientY,a==="x"){let k=f.clientX-n,E=f.clientY-i;r.style.left=`${h+k}px`,r.style.top=`${m+E}px`}else{let k=f.clientY-i;r.style.top=`${m+k}px`}Q(),a==="y"&&mt()}}function S(){if(!r)return;rt(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",ot),document.removeEventListener("pointerup",S),q();let f=L().map(k=>k.dataset.reorderItem);r=null,o=null,e&&e(f)}t.addEventListener("pointerdown",$)}var Ho="joshuaegage@gmail.com";function Er(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
    <div class="lt-feedback-modal" role="dialog" aria-modal="true" aria-label="Send feedback">
      <h2 class="lt-feedback-title">Got a bug or an idea?</h2>
      <textarea
        class="lt-feedback-textarea"
        data-feedback-text
        rows="5"
        placeholder="What's not working, or what would make this better?"
      ></textarea>
      <div class="lt-feedback-actions">
        <button type="button" class="lt-feedback-cancel" data-feedback-cancel>Cancel</button>
        <button type="button" class="lt-feedback-send" data-feedback-send>Send</button>
      </div>
    </div>
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function o(){if(r)return;r=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let i=document.scrollingElement;i&&(i.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(i){i.key==="Escape"&&o()}e.addEventListener("click",i=>{i.target===e&&o()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",o),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let i=a.value.trim(),h=encodeURIComponent("Lift Tracker feedback"),m=encodeURIComponent(i||"(no message entered)");Ra().catch(()=>{}),window.location.href=`mailto:${Ho}?subject=${h}&body=${m}`,o()})}var ie=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Ce(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Fo(t,e=new Date){let a=Ce(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let i=new Date(n.performed_at);i>=a&&i<r&&o.add(C(n.performed_at))}return o.size}function Oo(t){let e=null;for(let a of ie)t>=a.days&&(e=a);return e}function Te(t,e=new Date){let a=Fo(t,e);return{days:a,tier:Oo(a)}}function Ye(t,e=null){let a=new Map;for(let o of t){let i=Ce(new Date(o.performed_at)).getTime();a.has(i)||a.set(i,new Set),a.get(i).add(C(o.performed_at))}let r={};for(let o of ie)r[o.key]=0;for(let o of a.values())for(let n of ie)o.size>=n.days&&(r[n.key]+=1);return r}function Bo(t){let e=new Set;for(let a of t)e.add(C(a.performed_at));return e.size}function Go(t){let e=new Set;for(let a of t)e.add(Ce(new Date(a.performed_at)).getTime());return e.size}function Vo(t){let e=new Set;for(let n of t)e.add(Ce(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,i)=>n-i);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+7),o=i.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Ko(t){let e=new Set;for(let n of t)e.add(C(n.performed_at));let a=Array.from(e).sort().map(n=>{let[i,h,m]=n.split("-").map(Number);return new Date(i,h-1,m)});if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+1),o=i.getTime()===a[n].getTime()?o+1:1,o>r&&(r=o)}return r}function Yo(t){let e=new Map;for(let r of t)r.lift_id&&(e.has(r.lift_id)||e.set(r.lift_id,[]),e.get(r.lift_id).push(r));let a=Xt(Array.from(e.entries()).map(([r,o])=>({liftId:r,dailySeries:vt(o)})));return a.length?Math.max(...a.map(r=>r.pct)):0}function jo(t){let e=gt(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,r=0,o=0;for(let n of e){let i=n.weight-a;r=Math.max(r,i),o=Math.max(o,-i)}return{gain:r,loss:o}}function je(t,e=null,a={}){let{bodyWeightEntries:r=[],hasSubmittedFeedback:o=!1}=a,n=jo(r);return{totalDays:Bo(t),totalWeeks:Go(t),tierCounts:Ye(t,e),longestStreak:Vo(t),totalSets:t.length,longestDayStreak:Ko(t),compositeMaxPct:Yo(t),bodyWeightGain:n.gain,bodyWeightLoss:n.loss,hasSubmittedFeedback:o||zo(e)}}var Xo=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function zo(t){return t!=null&&Xo.has(t)}var Jo=50,Qo=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=Jo&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function zt(t,e=null,a={}){let r=je(t,e,a);return Qo.map(o=>({id:o.id,name:o.name,track:o.track,description:o.description,flavor:o.flavor??null,theme:o.theme??null,unlocked:o.isUnlocked(r)}))}function Me(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Jt=null,le=null;function Lr(){return Jt||(Jt=document.createElement("div"),Jt.className="lt-toast",document.body.appendChild(Jt),Jt)}function St(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=Lr();clearTimeout(le),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),i=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(le),i(),e&&e()},{once:!0}),le=setTimeout(()=>{i(),a&&a()},r)}function _r(t,{durationMs:e=4500}={}){let a=Lr();clearTimeout(le),a.innerHTML='<span class="lt-toast-message"></span>',a.querySelector(".lt-toast-message").textContent=t,a.classList.add("lt-toast-visible"),le=setTimeout(()=>{a.classList.remove("lt-toast-visible")},e)}function At(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function xt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function qe(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Ae(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var $r="lt-discovery-seen-",it={weight:"weight",history:"history",composite:"composite"};function Re(t){try{return window.localStorage.getItem(`${$r}${t}`)==="true"}catch{return!1}}function yt(t){try{window.localStorage.setItem(`${$r}${t}`,"true")}catch{}}var Dr="lt-weight-card-expanded";function Qt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Zo(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Cr(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function Tr(t){return`${Math.round(Number(t)||0)} cal`}function tn(t=new Date){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}function en(t=new Date){return new Date(t.getFullYear(),t.getMonth(),t.getDate()+1)}async function Mr(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await dt(),o=gt(r),n=yr(o),i=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${i}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let h=n.change<0?"↘":n.change>0?"↗":"→",m=At(Dr,!1);function s(){t.classList.toggle("lt-stats-row-expanded",m),m?t.innerHTML=`
        <div class="lt-weight-card-header">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="true">
            <span>Weight</span>
            ${i}
            <span class="lt-chevron" data-weight-chevron>&#9650;</span>
          </button>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <div class="lt-weight-card-body">
          <div class="lt-weight-stats lt-weight-stats-row">
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Start</span>
              <span class="lt-weight-stat-value">${Qt(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Zo(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${Qt(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${h} ${Qt(Math.abs(n.change))} lbs</span>
            </div>
          </div>
          <div class="lt-chart-wrap">
            <canvas data-home-weight-canvas></canvas>
          </div>
        </div>
      `:t.innerHTML=`
        <div class="lt-weight-card-row-collapsed">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="false">
            <span class="lt-weight-toggle-label">
              <span>Weight</span>
              ${i}
              <span class="lt-chevron" data-weight-chevron>&#9660;</span>
            </span>
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${Qt(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}m=!m,xt(Dr,m),s()}),m?Ve(t.querySelector("[data-home-weight-canvas]"),o):Ke()}s()}async function qr(t){yt(it.weight),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Weight</h1>
    </header>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="weight" role="tab" aria-selected="true">Weight</button>
      <button type="button" class="lt-tab" data-tab="waist" role="tab" aria-selected="false">Waist</button>
      <button type="button" class="lt-tab" data-tab="food" role="tab" aria-selected="false">Food</button>
    </div>

    <section data-tab-panel="weight">
      <form class="lt-quick-log" data-weight-form>
        <div class="lt-quick-log-fields">
          <label class="lt-field">
            <span>Date</span>
            <input type="date" name="date" required data-weight-date-input />
          </label>
          <label class="lt-field">
            <span>Weight (lb)</span>
            <input type="number" inputmode="decimal" step="0.1" min="0" name="weight" required data-weight-input />
          </label>
        </div>
        <button type="submit" class="lt-log-btn">Log weight</button>
      </form>

      <div class="lt-chart-wrap" data-weight-chart-section>
        <canvas data-weight-canvas></canvas>
      </div>
      <p class="lt-empty" data-weight-empty hidden>No weight entries yet — add your first one above.</p>

      <ul class="lt-history-list" data-weight-history></ul>
    </section>

    <section data-tab-panel="waist" hidden>
      <form class="lt-quick-log" data-waist-form>
        <div class="lt-quick-log-fields">
          <label class="lt-field">
            <span>Date</span>
            <input type="date" name="date" required data-waist-date-input />
          </label>
          <label class="lt-field">
            <span>Waist (in)</span>
            <input type="number" inputmode="decimal" step="0.1" min="0" name="waist" required data-waist-input />
          </label>
        </div>
        <button type="submit" class="lt-log-btn">Log waist</button>
      </form>

      <div class="lt-chart-wrap" data-waist-chart-section>
        <canvas data-waist-canvas></canvas>
      </div>
      <p class="lt-empty" data-waist-empty hidden>No waist measurements yet — add your first one above.</p>

      <ul class="lt-history-list" data-waist-history></ul>
    </section>

    <section data-tab-panel="food" hidden>
      <form class="lt-quick-log" data-food-form>
        <div class="lt-quick-log-fields">
          <label class="lt-field">
            <span>Food</span>
            <input type="text" name="title" maxlength="80" placeholder="Chicken bowl" required data-food-title-input />
          </label>
          <label class="lt-field">
            <span>Calories</span>
            <input type="number" inputmode="numeric" step="1" min="1" name="calories" required data-food-calories-input />
          </label>
        </div>
        <button type="submit" class="lt-log-btn">Log food</button>
      </form>

      <section class="lt-food-summary" data-food-summary>
        <span>Today</span>
        <strong data-food-total>0 cal</strong>
      </section>
      <p class="lt-empty" data-food-empty hidden>No food logged today — add your first entry above.</p>

      <ul class="lt-history-list" data-food-history></ul>
    </section>
  `,t.querySelector("[data-back]").addEventListener("click",K);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]'),food:t.querySelector('[data-tab-panel="food"]')},r="weight";e.forEach(_=>{_.addEventListener("click",()=>{_.dataset.tab!==r&&(r=_.dataset.tab,e.forEach(g=>g.setAttribute("aria-selected",String(g===_))),Object.entries(a).forEach(([g,A])=>{A.hidden=g!==r}),r==="weight"?c():r==="waist"?mt().catch(g=>console.error("[lift-tracker]",g)):It().catch(g=>console.error("[lift-tracker]",g)))})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-weight-chart-section]"),m=t.querySelector("[data-weight-canvas]"),s=t.querySelector("[data-weight-empty]"),l=t.querySelector("[data-weight-history]");n.value=C(new Date().toISOString());let p=[];async function y(){p=await dt(),b(),c()}function c(){let _=gt(p);if(_.length===0){h.hidden=!0,s.hidden=!1,Ke();return}h.hidden=!1,s.hidden=!0,a.weight.hidden||Ve(m,_)}function b(){if(p.length===0){l.innerHTML="";return}let _=p.slice().sort((g,A)=>new Date(A.logged_at)-new Date(g.logged_at));l.innerHTML=_.map(g=>`
          <li class="lt-history-row" data-entry-id="${g.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${g.id}">
              <span class="lt-history-weight">${Qt(Number(g.weight))} lb</span>
              <span class="lt-history-e1rm">${Cr(C(g.logged_at))}</span>
            </button>
          </li>
        `).join(""),l.querySelectorAll("[data-edit-trigger]").forEach(g=>{g.addEventListener("click",()=>D(g.dataset.editTrigger))})}function D(_){let g=l.querySelector(`[data-entry-id="${_}"]`),A=p.find(P=>P.id===_);!g||!A||(g.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${A.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${C(A.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,g.querySelector("[data-edit-cancel]").addEventListener("click",b),g.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await or(_),await y(),St("Weight entry deleted",{onUndo:async()=>{await nr(_),await y()}}))}),g.querySelector("[data-edit-form]").addEventListener("submit",async P=>{P.preventDefault();let B=Number(g.querySelector("[data-edit-weight]").value),Z=g.querySelector("[data-edit-date]").value;if(!(B>=0)||!Z)return;let nt=new Date(A.logged_at),[Gt,Nt,Vt]=Z.split("-").map(Number);nt.setFullYear(Gt,Nt-1,Vt),await rr(_,{weight:B,logged_at:nt.toISOString()}),await y()}))}o.addEventListener("submit",async _=>{_.preventDefault();let g=Number(i.value),A=n.value;if(!(g>=0)||!Number.isFinite(g)||!A)return;let[P,B,Z]=A.split("-").map(Number),nt=new Date;nt.setFullYear(P,B-1,Z),await ar(g,nt.toISOString()),i.value="",i.focus(),n.value=C(new Date().toISOString()),await y()});let u=t.querySelector("[data-waist-form]"),L=t.querySelector("[data-waist-date-input]"),$=t.querySelector("[data-waist-input]"),q=t.querySelector("[data-waist-chart-section]"),W=t.querySelector("[data-waist-canvas]"),H=t.querySelector("[data-waist-empty]"),X=t.querySelector("[data-waist-history]");L.value=C(new Date().toISOString());let F=[],Q=!1,z=null;async function O(){F=await Ut(),Q=!0,ot(),rt()}async function mt(){if(Q){rt();return}z||(H.hidden=!1,H.textContent="Loading waist...",q.hidden=!0,z=O().finally(()=>{z=null})),await z}function rt(){let _=Ht(F);if(_.length===0){q.hidden=!0,H.hidden=!1,H.textContent="No waist measurements yet — add your first one above.",xr();return}q.hidden=!1,H.hidden=!0,a.waist.hidden||Sr(W,_)}function ot(){if(F.length===0){X.innerHTML="";return}let _=F.slice().sort((g,A)=>new Date(A.logged_at)-new Date(g.logged_at));X.innerHTML=_.map(g=>`
          <li class="lt-history-row" data-entry-id="${g.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${g.id}">
              <span class="lt-history-weight">${Qt(Number(g.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Cr(C(g.logged_at))}</span>
            </button>
          </li>
        `).join(""),X.querySelectorAll("[data-edit-trigger]").forEach(g=>{g.addEventListener("click",()=>S(g.dataset.editTrigger))})}function S(_){let g=X.querySelector(`[data-entry-id="${_}"]`),A=F.find(P=>P.id===_);!g||!A||(g.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${A.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${C(A.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,g.querySelector("[data-edit-cancel]").addEventListener("click",ot),g.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await lr(_),await O(),St("Waist measurement deleted",{onUndo:async()=>{await cr(_),await O()}}))}),g.querySelector("[data-edit-form]").addEventListener("submit",async P=>{P.preventDefault();let B=Number(g.querySelector("[data-edit-waist]").value),Z=g.querySelector("[data-edit-date]").value;if(!(B>=0)||!Z)return;let nt=new Date(A.logged_at),[Gt,Nt,Vt]=Z.split("-").map(Number);nt.setFullYear(Gt,Nt-1,Vt),await ir(_,{waist_circumference:B,logged_at:nt.toISOString()}),await O()}))}u.addEventListener("submit",async _=>{_.preventDefault();let g=Number($.value),A=L.value;if(!(g>=0)||!Number.isFinite(g)||!A)return;let[P,B,Z]=A.split("-").map(Number),nt=new Date;nt.setFullYear(P,B-1,Z),await sr(g,nt.toISOString()),$.value="",$.focus(),L.value=C(new Date().toISOString()),await O()});let f=t.querySelector("[data-food-form]"),k=t.querySelector("[data-food-title-input]"),E=t.querySelector("[data-food-calories-input]"),I=t.querySelector("[data-food-total]"),N=t.querySelector("[data-food-empty]"),R=t.querySelector("[data-food-history]"),T=[],J=!1,Y=null;function Bt(){return{start:tn(new Date),end:en(new Date)}}async function et(){let{start:_,end:g}=Bt();T=await dr(_.toISOString(),g.toISOString()),J=!0,ee()}async function It(){if(J){ee();return}Y||(N.hidden=!1,N.textContent="Loading food log...",Y=et().finally(()=>{Y=null})),await Y}function ee(){let _=T.reduce((g,A)=>g+Number(A.calories),0);if(I.textContent=Tr(_),N.hidden=T.length>0,N.textContent="No food logged today — add your first entry above.",T.length===0){R.innerHTML="";return}R.innerHTML=T.map(g=>`
          <li class="lt-history-row" data-food-entry-id="${g.id}">
            <button type="button" class="lt-history-main" data-food-edit-trigger="${g.id}">
              <span class="lt-history-weight">${Ar(g.title)}</span>
              <span class="lt-history-e1rm">${Tr(g.calories)}</span>
            </button>
          </li>
        `).join(""),R.querySelectorAll("[data-food-edit-trigger]").forEach(g=>{g.addEventListener("click",()=>wt(g.dataset.foodEditTrigger))})}function wt(_){let g=R.querySelector(`[data-food-entry-id="${_}"]`),A=T.find(P=>P.id===_);!g||!A||(g.innerHTML=`
      <form class="lt-edit-set-form" data-food-edit-form>
        <label>Food <input type="text" maxlength="80" value="${an(A.title)}" data-edit-food-title /></label>
        <label>Calories <input type="number" step="1" min="1" value="${A.calories}" data-edit-food-calories /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,g.querySelector("[data-edit-cancel]").addEventListener("click",ee),g.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this food entry? You'll have a few seconds to undo it after.")&&(await mr(_),await et(),St("Food entry deleted",{onUndo:async()=>{await fr(_),await et()}}))}),g.querySelector("[data-food-edit-form]").addEventListener("submit",async P=>{P.preventDefault();let B=g.querySelector("[data-edit-food-title]").value.trim(),Z=Number(g.querySelector("[data-edit-food-calories]").value);!B||!Number.isInteger(Z)||Z<=0||(await pr(_,{title:B,calories:Z}),await et())}))}f.addEventListener("submit",async _=>{_.preventDefault();let g=k.value.trim(),A=Number(E.value);!g||!Number.isInteger(A)||A<=0||(await ur(g,A,new Date().toISOString()),k.value="",E.value="",k.focus(),await et())}),await y()}function Ar(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function an(t){return Ar(t)}var Rr="lt-seen-rank-achievements";function We(){let t=qe(Rr,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Wr(t){Ae(Rr,JSON.stringify(t))}var Xe="lt-active-workout";function ze(){try{return window.localStorage.getItem(Xe)||null}catch{return null}}function Je(t){try{t?window.localStorage.setItem(Xe,t):window.localStorage.removeItem(Xe)}catch{}}function Ir(t){let e=ze();return e&&t.find(a=>a.id===e)||null}var rn=120,Nr="lt-default-rest-seconds",Pr="lt-lift-rest-seconds-",Ur="lt-rest-timer-enabled",ut=null,Qe=null,Ze=null,Zt=0,Et=null;function Hr(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Fr(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function Ft(){return At(Ur,!1)}function Or(t){xt(Ur,!!t)}function ea(){return Hr(Nr)||rn}function Br(t){Fr(Nr,t)}function aa(t){return Hr(`${Pr}${t}`)}function Gr(t,e){Fr(`${Pr}${t}`,e)}function Ie(t){return aa(t)||ea()}function ra(){return ut||(ut=document.createElement("div"),ut.className="lt-rest-timer",ut.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,ut.querySelector("[data-rest-add]").addEventListener("click",()=>{Zt&&(Zt+=30*1e3,ta())}),ut.querySelector("[data-rest-skip]").addEventListener("click",Vr),document.body.appendChild(ut),ut)}function on(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function ta(){let t=ra(),e=Zt-Date.now();t.querySelector("[data-rest-time]").textContent=on(e),e<=0&&sn()}function oa(){clearInterval(Qe),clearTimeout(Ze),Qe=null,Ze=null}function nn(){try{ce(),Et.state==="suspended"&&Et.resume();let t=Et.currentTime,e=Et.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(Et.destination),[523.25,659.25].forEach((a,r)=>{let o=Et.createOscillator();o.type="sine",o.frequency.setValueAtTime(a,t+r*.12),o.connect(e),o.start(t+r*.12),o.stop(t+.75)})}catch{}}function ce(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;Et||=new t,Et.state==="suspended"&&Et.resume()}catch{}}function sn(){oa(),Zt=0;let t=ra();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",nn(),navigator.vibrate&&navigator.vibrate([120,70,120]),Ze=setTimeout(Vr,12e3)}function Vr(){oa(),Zt=0,ut&&ut.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function Ne({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=ra();oa(),Zt=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,ta(),Qe=setInterval(ta,250)}var ia=[{id:"lift_set",label:"Lift set"},{id:"weekly_workout_days",label:"Weekly workout days"},{id:"weekly_workout_volume",label:"Weekly workout volume"},{id:"workout_session_volume",label:"Workout session volume"}],ln=[.8,.9,.95];function de(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function cn(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r)}function dn(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setDate(e.getDate()-e.getDay()),C(e.toISOString())}function Kr(t,e=new Date){let a=cn(dn(e)),r=new Date(a);r.setDate(r.getDate()+7);let o=new Date(t);return o>=a&&o<r}function te(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function ue(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function lt(t){return`${Math.round(te(t)*100)}%`}function Yr(t,e){let a=new Set(e?.liftIds||[]),r=new Map;for(let o of t){if(!a.has(o.lift_id))continue;let n=C(o.performed_at);r.set(n,(r.get(n)||0)+Number(o.weight)*Number(o.reps))}return r}function un(t,e){let a=e.liftsById||new Map,r=e.workoutsById||new Map,o=e.activeSets||[],n=e.workoutHistorySets||o,i=t.lift_id?a.get(t.lift_id):null,h=t.workout_id?r.get(t.workout_id):null;if(t.type==="lift_set"){let m=o.filter(L=>L.lift_id===t.lift_id),s=Number(t.target_weight),l=Number(t.target_reps),p=j(s,l),y=null,c=0,b=null;for(let L of m){let $=Number(L.weight),q=Number(L.reps),W=j($,q);W>c&&(c=W,y=L),$>=s&&q>=l&&(b=L)}let D=!!b,u=D?1:te(c/p);return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:i?.name||"Lift goal",progress:u,achieved:D,currentLabel:y?`Best: ${ue(y.weight)} x ${y.reps}`:"No sets yet",targetLabel:`Goal: ${ue(s)} x ${l}`,detail:b?`Hit with ${ue(b.weight)} x ${b.reps}.`:`${lt(u)} there.`}}if(t.type==="weekly_workout_days"){let m=new Set;for(let c of n)Kr(c.performed_at)&&m.add(C(c.performed_at));let s=Number(t.target_value),l=m.size,p=l>=s,y=s>0?te(l/s):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"This week",progress:y,achieved:p,currentLabel:`${l} / ${ue(s)} days`,targetLabel:l+1===s?"One more workout gets it.":`Goal: ${ue(s)} days`,detail:p?"Weekly goal hit.":`${lt(y)} there.`}}if(t.type==="weekly_workout_volume"){let m=Yr(o.filter(c=>Kr(c.performed_at)),h),s=Array.from(m.values()).reduce((c,b)=>c+b,0),l=Number(t.target_value),p=s>=l,y=l>0?te(s/l):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout volume",progress:y,achieved:p,currentLabel:`${Math.round(s)} / ${Math.round(l)} ${t.unit||"lb"}`,targetLabel:"This week",detail:p?"Weekly volume goal hit.":`${lt(y)} there.`}}if(t.type==="workout_session_volume"){let m=Yr(o,h),s=Math.max(0,...Array.from(m.values())),l=Number(t.target_value),p=s>=l,y=l>0?te(s/l):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout session",progress:y,achieved:p,currentLabel:`Best: ${Math.round(s)} ${t.unit||"lb"}`,targetLabel:`Goal: ${Math.round(l)} ${t.unit||"lb"}`,detail:p?"Session volume goal hit.":`${lt(y)} there.`}}return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"Unsupported goal",progress:0,achieved:!1,currentLabel:"",targetLabel:"",detail:""}}function Xr(t,e){return t.filter(a=>a.deleted_at==null).map(a=>un(a,e))}var pn={"rank-private":t=>M(t.totalDays,1,"workout day"),"rank-pfc":t=>M(t.totalDays,2,"workout days"),"rank-corporal":t=>M(t.totalDays,3,"workout days"),"rank-sergeant":t=>M(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>M(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>M(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>M(t.totalDays,11,"workout days"),"rank-lieutenant":t=>M(t.totalDays,13,"workout days"),"rank-captain":t=>M(t.totalDays,15,"workout days"),"rank-major":t=>M(t.totalDays,18,"workout days"),"rank-colonel":t=>M(t.totalDays,22,"workout days"),"rank-general":t=>M(t.totalDays,27,"workout days"),"rank-prestige":t=>M(t.totalDays,33,"workout days"),"rank-prestige-master":t=>M(t.totalDays,40,"workout days"),"mastery-uav-1":t=>M(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>M(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>M(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>M(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>M(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>M(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>M(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>M(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>M(t.longestStreak,2,"weeks"),"streak-3":t=>M(t.longestStreak,3,"weeks"),"streak-4":t=>M(t.longestStreak,4,"weeks"),"streak-5":t=>M(t.longestStreak,5,"weeks"),"streak-6":t=>M(t.longestStreak,6,"weeks"),"streak-8":t=>M(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>na([M(t.totalDays,27,"workout days"),M(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>na([M(t.longestStreak,8,"week streak"),M(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>na([M(t.totalDays,40,"workout days"),M(t.tierCounts.chopper,3,"Choppers")])};function M(t,e,a){let r=Number(t)||0,o=Number(e)||1;return{current:r,target:o,progress:te(r/o),currentLabel:`${r} / ${o} ${a}`}}function na(t){return{...t.slice().sort((a,r)=>a.progress-r.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" · ")}}function zr(t,e=null,a={}){let r=je(t,e,a);return zt(t,e,a).filter(n=>n.track!=="secret").map(n=>{let i=pn[n.id],h=i?i(r):{progress:n.unlocked?1:0,currentLabel:n.description};return{kind:"achievement",key:`achievement:${n.id}`,sourceKey:n.id,title:n.name,subtitle:n.track,progress:n.unlocked?1:h.progress,achieved:n.unlocked,currentLabel:h.currentLabel,targetLabel:n.description,detail:n.unlocked?"Achievement unlocked.":`${lt(h.progress)} there.`}})}function Jr({goalEvaluations:t=[],achievementItems:e=[],events:a=[]}={}){let r=a.slice().sort((n,i)=>new Date(i.created_at)-new Date(n.created_at))[0]||null,o=[...t,...e].filter(n=>!n.achieved&&n.progress>=.6).sort((n,i)=>i.progress-n.progress).slice(0,5);return{latest:r,closest:o}}function Qr(t,e=[]){let a=new Set(e.map(o=>sa(o))),r=[];for(let o of t)if(o.kind==="goal"){for(let n of ln)if(o.progress>=n&&!o.achieved){let i={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"close",threshold:n,title:o.title,message:`${o.title} is ${lt(o.progress)} there.`,metadata:{progress:o.progress}};a.has(sa(i))||r.push(i)}if(o.achieved){let n={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"achieved",threshold:1,title:o.title,message:`Goal hit: ${o.title}.`,metadata:{progress:1}};a.has(sa(n))||r.push(n)}}return r}function sa(t){return t.goal_id?`goal:${t.goal_id}:${t.event_type}:${Number(t.threshold)||0}`:`achievement:${t.source_key}:${t.event_type}`}function Pe(t){return String(t||"").trim().toLowerCase()}function mn(t){let e=String(t||"").trim();return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function jr(t){let e=mn(t);return/^-?\d+(\.\d+)?$/.test(e)?Number(e):e==="true"?!0:e==="false"?!1:e}function Zr(t,{lifts:e=[],workouts:a=[]}={}){let r=[],o=null;for(let s of String(t||"").split(/\r?\n/)){let l=s.trim();if(!l||l.startsWith("#")||l==="goals:"||l.startsWith("goal_format:"))continue;if(l.startsWith("- ")){o&&r.push(o),o={};let y=l.slice(2).trim();if(y){let c=y.match(/^([^:]+):\s*(.*)$/);c&&(o[c[1].trim()]=jr(c[2]))}continue}let p=l.match(/^([^:]+):\s*(.*)$/);p&&o&&(o[p[1].trim()]=jr(p[2]))}o&&r.push(o);let n=new Map(e.map(s=>[Pe(s.name),s])),i=new Map(a.map(s=>[Pe(s.name),s])),h=[],m=[];return r.forEach((s,l)=>{let p=l+1,y=String(s.type||"").trim(),c={title:String(s.title||"").trim(),type:y,unit:String(s.unit||"lb").trim()||"lb",timeframe_weeks:de(s.timeframe_weeks),recurring:s.recurring===!0?"weekly":s.recurring||"none",metadata:{imported:!0}};if(c.title||m.push(`Goal ${p}: missing title.`),ia.some(b=>b.id===y)||m.push(`Goal ${p}: unsupported type "${y}".`),y==="lift_set"){let b=n.get(Pe(s.lift));b||m.push(`Goal ${p}: could not find lift "${s.lift||""}".`),c.lift_id=b?.id,c.target_weight=de(s.weight),c.target_reps=de(s.reps),c.target_weight==null&&m.push(`Goal ${p}: missing weight.`),c.target_reps==null&&m.push(`Goal ${p}: missing reps.`)}if(y==="weekly_workout_days"&&(c.target_value=de(s.target),c.recurring="weekly",c.target_value==null&&m.push(`Goal ${p}: missing target.`)),y==="weekly_workout_volume"||y==="workout_session_volume"){let b=i.get(Pe(s.workout));b||m.push(`Goal ${p}: could not find workout "${s.workout||""}".`),c.workout_id=b?.id,c.target_value=de(s.target),y==="weekly_workout_volume"&&(c.recurring="weekly"),c.target_value==null&&m.push(`Goal ${p}: missing target.`)}h.push(c)}),{goals:m.length?[]:h,errors:m,rawGoals:r}}async function Rt(){let[t,e,a,r,o,n,i,h]=await Promise.all([st(),jt(),ve(),Ga(),Xa(),dt(),be(),ke()]),m=t.length?await kt(t.map(s=>s.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:m,goals:r,events:o,bodyWeightEntries:n,userId:i,feedbackGiven:h,liftsById:new Map(t.map(s=>[s.id,s])),workoutsById:new Map(e.map(s=>[s.id,s]))}}function Lt(t){let e=Xr(t.goals,t),a=zr(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),r=Jr({goalEvaluations:e,achievementItems:a,events:t.events});return{goalEvaluations:e,achievementItems:a,momentum:r}}async function Ot({showToasts:t=!1}={}){let e=await Rt(),a=Lt(e),r=Qr([...a.goalEvaluations,...a.achievementItems],e.events),o=await za(r);if(await Promise.all(a.goalEvaluations.filter(n=>n.achieved&&n.goal.status==="active"&&n.goal.recurring!=="weekly").map(n=>Ya(n.goal.id,{status:"achieved",achieved_at:new Date().toISOString()}))),t&&o.length>0){let n=o.find(m=>m.event_type==="achieved"),i=o.find(m=>m.event_type==="close"),h=n||i;h&&_r(h.message||h.title)}return{context:e,...a,createdEvents:o}}var to=[{key:"bench-press",name:"Bench Press",aliases:["bench","barbell bench press","bench press warmup","bench press 2","bench press 3"],equipment:["barbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep shoulder blades set.","Touch the same point on the chest each rep.","Drive the bar up and slightly back."]},{key:"bicep-curl",name:"Bicep Curl",aliases:["bicep curls","curl"],equipment:["dumbbell","barbell","cable"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep elbows close to your sides.","Avoid swinging the torso.","Control the lower."]},{key:"calf-raise",name:"Calf Raise",aliases:["calf raises","standing calf raise"],equipment:["bodyweight","machine","dumbbell"],primaryMuscles:["calves"],secondaryMuscles:[],movementPatterns:["ankle extension"],tutorialUrl:"",cues:["Pause briefly at the top.","Use a full stretch at the bottom.","Keep reps controlled."]},{key:"dumbbell-chest-press",name:"Dumbbell Chest Press",aliases:["dumbell chest press","db chest press","dumbbell bench press","db bench press"],equipment:["dumbbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep wrists stacked over elbows.","Lower with control.","Press up without letting shoulders roll forward."]},{key:"dumbbell-curl",name:"Dumbbell Curl",aliases:["dumbell curl","db curl"],equipment:["dumbbell"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep upper arms still.","Rotate naturally through the curl if comfortable.","Avoid using momentum."]},{key:"dumbbell-lateral-raise",name:"Dumbbell Lateral Raise",aliases:["dumbell lateral raise","lateral raise","db lateral raise"],equipment:["dumbbell"],primaryMuscles:["side delts"],secondaryMuscles:["traps"],movementPatterns:["shoulder abduction"],tutorialUrl:"",cues:["Lead with elbows.","Stop around shoulder height.","Use light enough weight to stay smooth."]},{key:"dumbbell-row",name:"Dumbbell Row",aliases:["dumbell row","db row","one arm dumbbell row","one-arm dumbbell row"],equipment:["dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbow toward the hip.","Keep the torso steady.","Reach long at the bottom without losing control."]},{key:"dumbbell-shoulder-press",name:"Dumbbell Shoulder Press",aliases:["dumbell shoulder press","db shoulder press","dumbbell overhead press"],equipment:["dumbbell"],primaryMuscles:["shoulders","front delts"],secondaryMuscles:["triceps","upper chest"],movementPatterns:["push","vertical press"],tutorialUrl:"",cues:["Keep ribs down.","Press slightly back over the shoulders.","Control the bottom position."]},{key:"forearm-twist",name:"Forearm Twist",aliases:["forearm twists","wrist twist","pronation supination"],equipment:["dumbbell"],primaryMuscles:["forearms"],secondaryMuscles:["grip"],movementPatterns:["forearm rotation"],tutorialUrl:"",cues:["Move slowly through rotation.","Keep the elbow supported if needed.","Use a light load."]},{key:"hammer-curl",name:"Hammer Curl",aliases:["hammer curls"],equipment:["dumbbell"],primaryMuscles:["biceps","brachialis"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep palms facing each other.","Control the lower.","Avoid shoulder swing."]},{key:"hip-thrust",name:"Hip Thrust",aliases:["hip thrusts","barbell hip thrust"],equipment:["barbell","bench"],primaryMuscles:["glutes"],secondaryMuscles:["hamstrings","quads"],movementPatterns:["hinge","hip extension"],tutorialUrl:"",cues:["Tuck ribs down.","Drive through the heels.","Pause with hips fully extended."]},{key:"lunge",name:"Lunge",aliases:["lunges","db lunge","dumbbell lunge"],equipment:["bodyweight","dumbbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","calves"],movementPatterns:["squat","single-leg"],tutorialUrl:"",cues:["Step far enough to stay balanced.","Keep front knee tracking over toes.","Control the descent."]},{key:"overhead-tricep-extension",name:"Overhead Tricep Extension",aliases:["overhead tricep extensions","tricep extension","overhead triceps extension"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep elbows pointed forward.","Lower behind the head with control.","Extend without flaring hard."]},{key:"rear-delt-fly",name:"Rear Delt Fly",aliases:["rear delt fly","rear delt raise","reverse fly"],equipment:["dumbbell","machine","cable"],primaryMuscles:["rear delts"],secondaryMuscles:["upper back","traps"],movementPatterns:["pull","shoulder horizontal abduction"],tutorialUrl:"",cues:["Keep a slight elbow bend.","Move from the shoulders.","Avoid shrugging through the rep."]},{key:"row",name:"Row",aliases:["rows","cable row","machine row","seated row"],equipment:["cable","machine","barbell","dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbows back.","Keep chest tall.","Control the reach forward."]},{key:"shrug",name:"Shrug",aliases:["shrugs","dumbbell shrug","barbell shrug"],equipment:["dumbbell","barbell"],primaryMuscles:["traps"],secondaryMuscles:["forearms"],movementPatterns:["scapular elevation"],tutorialUrl:"",cues:["Lift shoulders straight up.","Pause briefly at the top.","Avoid rolling the shoulders."]},{key:"squat",name:"Squat",aliases:["barbell squat","squat warmup","squat 2","squat 3"],equipment:["barbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","core"],movementPatterns:["squat"],tutorialUrl:"",cues:["Brace before descending.","Keep knees tracking over toes.","Drive through the whole foot."]},{key:"tricep-curl",name:"Tricep Curl",aliases:["tricep curls","triceps curl"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep upper arms steady.","Fully extend with control.","Avoid using shoulder momentum."]},{key:"weighted-sit-up",name:"Weighted Sit-Up",aliases:["weighted sit ups","weighted sit ups 2","weighted situp","weighted sit-up"],equipment:["plate","dumbbell"],primaryMuscles:["abs"],secondaryMuscles:["hip flexors"],movementPatterns:["trunk flexion"],tutorialUrl:"",cues:["Keep the weight secure.","Curl the torso up under control.","Avoid yanking with the neck."]}];function Ue(t){return String(t||"").toLowerCase().replace(/dumbell/g,"dumbbell").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ")}function eo(t){return[t.name,t.key,...t.aliases||[]]}function fn(t,e){let a=Ue(e);if(a.length<2)return null;let r=null;for(let o of eo(t)){let n=Ue(o),i=null;n===a?i=0:n.startsWith(a)?i=1:n.includes(a)?i=2:a.split(" ").every(m=>n.includes(m))&&(i=3),i!=null&&(r==null||i<r)&&(r=i)}return r}function ao(t,{limit:e=5}={}){return to.map(a=>({entry:a,score:fn(a,t)})).filter(a=>a.score!=null).sort((a,r)=>a.score-r.score||a.entry.name.localeCompare(r.entry.name)).slice(0,e).map(a=>a.entry)}function pe(t){let e=String(t||"").trim();if(!e)return null;let a=Ue(e);return to.find(r=>r.key===e||r.key===a.replace(/\s+/g,"-")||eo(r).some(o=>Ue(o)===a))||null}var ro="lt-composite-expanded",la="lt-header-menu-open",oo="lt-momentum-expanded";async function no(t){let{data:{session:e}}=await v.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-menu" data-header-menu>
        <div class="lt-header-actions" data-header-actions hidden>
          <button type="button" class="lt-feedback-btn" data-history-btn>
            <span>History</span>
            <span class="lt-discovery-badge" data-history-discovery hidden aria-label="History not opened yet">!</span>
          </button>
          <button type="button" class="lt-logout-btn" data-logout-btn>Log out</button>
          <button type="button" class="lt-help-btn" data-help-btn aria-label="Help">?</button>
        </div>
        <button type="button" class="lt-hamburger-btn" data-hamburger-btn aria-label="Menu" aria-expanded="false">
          <span class="lt-hamburger-line"></span>
          <span class="lt-hamburger-line"></span>
          <span class="lt-hamburger-line"></span>
        </button>
      </div>
    </header>

    <div class="lt-toolbar">
      <button type="button" class="lt-mode-toggle" data-mode-toggle aria-pressed="false">Fast</button>

      <button type="button" class="lt-killstreak" data-killstreak-btn aria-label="View killstreak details">
        <span class="lt-killstreak-icon" data-killstreak-icon>&#127919;</span>
        <span class="lt-killstreak-info">
          <span class="lt-killstreak-label" data-killstreak-label>No Killstreak</span>
          <span class="lt-killstreak-sub" data-killstreak-sub>0 Day streak</span>
        </span>
        <span class="lt-killstreak-new-badge" data-killstreak-new-badge hidden aria-label="New achievement unlocked">!</span>
        <span class="lt-killstreak-chevron" aria-hidden="true">&#8250;</span>
      </button>

      <section class="lt-momentum lt-momentum-topline" data-momentum-section>
        <button type="button" class="lt-momentum-toggle" data-momentum-toggle aria-expanded="false">
          <span class="lt-momentum-title">Momentum</span>
          <span class="lt-momentum-summary" data-momentum-summary>Loading momentum...</span>
          <span class="lt-chevron" data-momentum-chevron>&#9660;</span>
        </button>
      </section>
    </div>

    <div class="lt-momentum-body lt-momentum-body-panel" data-momentum-body hidden></div>

    <div class="lt-stats-row" data-stats-row>
      <section class="lt-weight-card" data-weight-card></section>

      <section class="lt-composite" data-composite-section>
        <button type="button" class="lt-composite-toggle" data-composite-toggle aria-expanded="true">
          <span class="lt-composite-toggle-label">
            <span>Composite</span>
            <span class="lt-discovery-badge" data-composite-discovery hidden aria-label="Composite not explored yet">!</span>
            <span class="lt-composite-summary" data-composite-summary></span>
          </span>
          <span class="lt-chevron" data-chevron>&#9650;</span>
        </button>
        <div class="lt-composite-body" data-composite-body>
          <p class="lt-composite-scope" data-composite-scope></p>
          <p class="lt-composite-blurb" data-composite-blurb></p>
          <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
          <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
        </div>
      </section>
    </div>

    <div class="lt-action-row" data-action-row>
      <button type="button" class="lt-add-lift-toggle-btn" data-add-lift-toggle aria-pressed="false">
        <span>+ Add Lift</span>
        <span class="lt-discovery-badge" data-add-lift-discovery hidden aria-label="Add your first lift">!</span>
      </button>
      <button type="button" class="lt-create-workout-btn" data-create-workout-btn disabled aria-disabled="true">
        <span>+ Create Workout</span>
        <span class="lt-discovery-badge" data-create-workout-discovery hidden aria-label="Create your first workout">!</span>
      </button>
    </div>
    <p class="lt-empty lt-add-lift-hint" data-add-lift-hint hidden>Add one more lift to unlock workouts.</p>

    <form class="lt-add-lift" data-add-lift-form hidden>
      <div class="lt-add-lift-field">
        <input type="text" name="name" placeholder="New lift name" required maxlength="60" autocomplete="off" />
        <div class="lt-lift-suggestions" data-lift-suggestions hidden></div>
      </div>
      <button type="submit" aria-label="Add lift">+</button>
    </form>

    <div class="lt-workout-bar" data-workout-bar>
      <div class="lt-workout-pills" data-workout-pills></div>
    </div>
    <p class="lt-empty lt-workout-empty-hint" data-workout-empty-hint hidden>
      You have enough lifts to create a workout, like "Push Day" or "Full Body".
    </p>

    <ul class="lt-lift-list" data-lift-list></ul>
    <p class="lt-empty" data-list-empty hidden>No lifts yet — add your first one above.</p>
    ${a?"":'<button type="button" class="lt-feedback-btn lt-bottom-feedback-btn" data-feedback-btn>Feedback</button>'}
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,i=null;function h(d=!0){i&&(clearTimeout(i),i=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),d&&xt(la,!1),i=setTimeout(()=>{o.hidden=!0,i=null},n)}function m({persist:d=!0,instant:w=!1}={}){i&&(clearTimeout(i),i=null),o.hidden=!1,w?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),d&&xt(la,!0)}r.addEventListener("click",()=>{o.hidden?m():h()}),o.addEventListener("click",d=>{d.target.closest("button")&&h()}),At(la,!1)&&m({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",ye);let l=t.querySelector("[data-feedback-btn]");l&&l.addEventListener("click",()=>Er()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>v.auth.signOut());let y=t.querySelector("[data-composite-section]"),c=t.querySelector("[data-composite-toggle]"),b=t.querySelector("[data-composite-body]"),D=t.querySelector("[data-chevron]"),u=t.querySelector("[data-composite-summary]"),L=t.querySelector("[data-composite-discovery]"),$=t.querySelector("[data-momentum-toggle]"),q=t.querySelector("[data-momentum-body]"),W=t.querySelector("[data-momentum-summary]"),H=t.querySelector("[data-momentum-chevron]");function X(d){c.setAttribute("aria-expanded",String(d)),b.hidden=!d,D.innerHTML=d?"&#9650;":"&#9660;",y.classList.toggle("lt-stats-row-expanded",d)}X(At(ro,!0)),c.addEventListener("click",()=>{if(yt(it.composite),L.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ma();return}let d=c.getAttribute("aria-expanded")==="true";X(!d),xt(ro,!d)});function F(d){$.setAttribute("aria-expanded",String(d)),q.hidden=!d,H.innerHTML=d?"&#9650;":"&#9660;"}F(At(oo,!1)),$.addEventListener("click",()=>{let d=$.getAttribute("aria-expanded")==="true";F(!d),xt(oo,!d)});let Q=t.querySelector("[data-killstreak-icon]"),z=t.querySelector("[data-killstreak-label]"),O=t.querySelector("[data-killstreak-sub]"),mt=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Aa);function rt(d){let{days:w,tier:x}=Te(d);Q.textContent=x?x.icon:"🎯",z.textContent=x?`${x.label} Killstreak`:"No Killstreak",O.textContent=`${w} Day streak`;let G=zt(d).filter(V=>V.track==="rank"),U=Me(G,We()).length>0;mt.hidden=!U}let ot=t.querySelector("[data-weight-card]");function S(){yt(it.weight),Ta()}function f(d){Mr(ot,{onExpand:S,...d}).catch(w=>{console.error("[lift-tracker]",w),ot.classList.remove("lt-stats-row-expanded"),ot.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,ot.querySelector("[data-weight-expand]").addEventListener("click",S)})}let k=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{yt(it.history),k.hidden=!0,qa()});let E=t.querySelector("[data-add-lift-form]"),I=E.querySelector('input[name="name"]'),N=t.querySelector("[data-lift-suggestions]"),R=t.querySelector("[data-add-lift-toggle]"),T=t.querySelector("[data-add-lift-discovery]"),J=t.querySelector("[data-add-lift-hint]"),Y=t.querySelector("[data-create-workout-btn]"),Bt=t.querySelector("[data-create-workout-discovery]"),et=null;function It(){N.hidden=!0,N.innerHTML=""}function ee(d){et=null;let w=ao(d,{limit:4});if(w.length===0){It();return}N.hidden=!1,N.innerHTML=w.map(x=>`
      <button type="button" data-lift-suggestion="${he(x.key)}">
        <span>${Pt(x.name)}</span>
        <small>${Pt([...x.primaryMuscles,...x.equipment||[]].slice(0,3).join(" · "))}</small>
      </button>
    `).join("")}I.addEventListener("input",()=>{let d=I.value.trim();if(d.length<2){et=null,It();return}ee(d)}),N.addEventListener("click",d=>{let w=d.target.closest("[data-lift-suggestion]");if(!w)return;let x=pe(w.dataset.liftSuggestion);x&&(et=x,I.value=x.name,It(),I.focus())}),R.addEventListener("click",()=>{let d=E.hidden;E.hidden=!d,R.setAttribute("aria-pressed",String(d)),R.classList.toggle("lt-add-lift-toggle-active",d),d?I.focus():(et=null,It())});let wt=t.querySelector("[data-lift-list]"),_=t.querySelector("[data-list-empty]");Y.addEventListener("click",()=>{Y.disabled||Da()});let g=t.querySelector("[data-workout-pills]"),A=t.querySelector("[data-workout-empty-hint]"),P=[],B=ze();function Z(){return B&&P.find(d=>d.id===B)||null}function nt(){let d=Z();if(!d)return at;let w=new Set(d.liftIds);return at.filter(x=>w.has(x.id))}function Gt(){g.innerHTML=P.map(d=>{let w=d.id===B;return`
          <div class="lt-workout-pill-wrap${w?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${w}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of P){let w=g.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);w&&(w.textContent=d.name)}g.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let w=d.dataset.workoutPill;B=B===w?null:w,Je(B),Gt(),Ge(ae),ya(ae)})}),g.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",w=>{w.stopPropagation(),Ca(d.dataset.workoutEdit)})})}let Nt="lt-fast-mode",Vt="lt-burst-mode";function Co(){try{let d=window.localStorage.getItem(Nt);if(d!==null)return d==="true";let w=window.localStorage.getItem(Vt);return w!==null?(window.localStorage.setItem(Nt,w),window.localStorage.removeItem(Vt),w==="true"):!1}catch{return!1}}function To(d){try{window.localStorage.setItem(Nt,String(d))}catch{}}let at=[],_t=Co(),$t=new Map,ae=[],fe=t.querySelector("[data-mode-toggle]");function ha(){fe.textContent=_t?"Normal":"Fast",fe.setAttribute("aria-pressed",String(_t)),fe.classList.toggle("lt-mode-toggle-active",_t)}ha(),fe.addEventListener("click",()=>{_t=!_t,To(_t),ha(),Ge(ae)}),E.addEventListener("submit",async d=>{d.preventDefault();let w=E.querySelector('input[name="name"]'),x=w.value.trim();if(!x)return;let G=et&&et.name===x?et:pe(x);w.value="",et=null,It(),w.disabled=!0;try{await Yt(x,at.length,{dictionary_key:G?.key||null}),await ga()}finally{w.disabled=!1,w.focus()}}),se(wt,{onReorder:async d=>{let w=[...d],x=new Set(d),G=at.map(U=>x.has(U.id)?w.shift():U.id);await Na(G),at=G.map(U=>at.find(V=>V.id===U)).filter(Boolean)}}),se(g,{axis:"x",onReorder:async d=>{await Ja(d),P=d.map(w=>P.find(x=>x.id===w)).filter(Boolean)}});async function ga(){let d=await Rt();P=d.workouts,B&&!P.some(V=>V.id===B)&&(B=null,Je(null)),Gt(),at=d.lifts;let w=at.length>=2;if(T.hidden=at.length>=2,J.hidden=at.length!==1,Y.disabled=!w,Y.setAttribute("aria-disabled",String(!w)),Bt.hidden=!w||P.length>0,A.hidden=!w||P.length>0,at.length===0){wt.innerHTML="",_.hidden=!1,_.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",J.hidden=!0,y.hidden=!0,rt(d.workoutHistorySets),wa(Lt(d).momentum),f({showDiscovery:!1}),k.hidden=!0,L.hidden=!0,$t=new Map,ae=[];return}let x=d.activeSets,G=x.length>0;rt(d.workoutHistorySets),wa(Lt(d).momentum),f({showDiscovery:G&&!Re(it.weight)}),k.hidden=!G||Re(it.history),$t=new Map(at.map(V=>[V.id,[]]));for(let V of x){let bt=$t.get(V.lift_id);bt&&bt.push(V)}let U=at.map(V=>({liftId:V.id,dailySeries:vt($t.get(V.id)||[])}));Ge(U),ya(U)}function ya(d){let w=Z(),x=w?d.filter(ge=>w.liftIds.includes(ge.liftId)):d,G=Xt(x);y.hidden=!1;let U=t.querySelector("[data-composite-canvas]"),V=t.querySelector("[data-composite-empty]"),bt=t.querySelector("[data-composite-scope]"),Kt=t.querySelector("[data-composite-blurb]");if(bt.textContent=w?`Measuring ${w.name}`:"Measuring all lifts",Kt.textContent=w?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",V.textContent=w?`Log a few sets for lifts in ${w.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",G.length===0){U.hidden=!0,V.hidden=!1,u.textContent="",L.hidden=!0;return}U.hidden=!1,V.hidden=!0,u.textContent=hr(G[G.length-1].pct),L.hidden=Re(it.composite),De(U,G)}function Be(d){let w=vt($t.get(d)||[]),x=w[w.length-1];return x?`${Math.round(x.e1rm)} lb e1RM`:"No sets yet"}function Mo(d){let w=$t.get(d)||[];return w.length===0?"":w[w.length-1].weight}function Ge(d){ae=d;let w=nt();_.hidden=w.length>0,_.textContent=B?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",wt.innerHTML=w.map(x=>_t?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${x.id}" data-lift-id="${x.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${x.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Be(x.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${he(x.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${x.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Mo(x.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${x.id}" data-lift-id="${x.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${x.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${Be(x.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${he(x.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let x of at){let U=wt.querySelector(`[data-lift-id="${x.id}"]`)?.querySelector("[data-name-slot]");U&&(U.textContent=x.name)}wt.querySelectorAll("[data-open-lift]").forEach(x=>{x.addEventListener("click",()=>$a(x.dataset.openLift))}),_t&&qo()}function qo(){wt.querySelectorAll("[data-fast-log-form]").forEach(d=>{let w=d.dataset.fastLogForm;d.addEventListener("submit",async x=>{x.preventDefault();let G=d.querySelector("[data-fast-weight]"),U=d.querySelector("[data-fast-reps]"),V=d.querySelector("[data-fast-feedback]"),bt=Number(G.value),Kt=Number(U.value);if(!(bt>=0)||!Number.isFinite(bt)||!(Kt>0)||!Number.isInteger(Kt))return;let ge=$t.get(w)||[],Ao=j(bt,Kt),ba=Ee(Ao,ge),ka=new Date().toISOString();Ft()&&ce();let Ro=await ft(w,bt,Kt,ka),Wo=at.find(re=>re.id===w);Ft()&&Ne({seconds:Ie(w),liftName:Wo?.name||""});let va=[...ge,Ro];$t.set(w,va),U.value="",U.focus();let Sa=wt.querySelector(`[data-lift-id="${w}"]`)?.querySelector("[data-last-slot]");Sa&&(Sa.textContent=Be(w));let Io=C(ka),xa=ht(va.filter(re=>C(re.performed_at)===Io));V.hidden=!1,V.classList.toggle("lt-pr",ba),V.textContent=ba?`PR! ${Math.round(xa)} lb today`:`Logged · ${Math.round(xa)} lb today`,Ot({showToasts:!0}).catch(re=>console.error("[lift-tracker]",re))})})}function wa(d){let w=d.latest,x=d.closest||[],G=x[0];W.textContent=w?`Latest: ${w.title}`:G?`Closest: ${G.title} · ${lt(G.progress)}`:"No goals yet",q.innerHTML=`
      <div class="lt-momentum-grid">
        <section>
          <h3>Recently Achieved</h3>
          ${w?`
            <article class="lt-momentum-item lt-momentum-item-achieved">
              <span>${Pt(w.title)}</span>
              <small>${Pt(w.message||"Recently achieved.")}</small>
            </article>
          `:'<p class="lt-empty">New goal and achievement wins will show here.</p>'}
        </section>
        <section>
          <h3>Closest</h3>
          ${x.length?x.map(U=>`
            <article class="lt-momentum-item">
              <span>${Pt(U.title)}</span>
              <small>${Pt(U.currentLabel)} · ${Pt(U.detail)}</small>
              <span class="lt-goal-progress"><span style="width: ${Math.round(U.progress*100)}%"></span></span>
            </article>
          `).join(""):'<p class="lt-empty">Set goals or keep logging to surface close achievements.</p>'}
        </section>
      </div>
      <button type="button" class="lt-goal-secondary-btn" data-open-goals>View goals</button>
    `,q.querySelector("[data-open-goals]").addEventListener("click",oe)}function he(d){return String(d).replace(/[&<>"']/g,w=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[w])}function Pt(d){return he(d)}await ga()}var hn=2.5;function He(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function gn(t){return Math.round(Number(t)*2)/2}function yn(t){return t.slice().sort((e,a)=>new Date(e.performed_at)-new Date(a.performed_at))}function wn(t){return t.reduce((e,a)=>{if(!e)return a;let r=j(Number(e.weight),Number(e.reps));return j(Number(a.weight),Number(a.reps))>r?a:e},null)}function bn(t){let e=new Map;for(let a of yn(t)){let r=C(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>a[0].localeCompare(r[0]))}function so(t,{weightStep:e=hn}={}){let a=bn(t||[]),r=a[a.length-1];if(!r)return{baseline:null,context:null,options:[]};let[o,n]=r,i=a[a.length-2]||null,h=wn(n),m=Number(h.weight),s=Number(h.reps),l=gn(m+e),p=Math.max(1,s-2),y={date:o,latestVolume:ht(n),previousVolume:i?ht(i[1]):null,sessionSetCount:n.length};return{baseline:{weight:m,reps:s,e1rm:j(m,s),label:`${He(m)} lb x ${s}`,date:o},context:y,options:[{id:"reps",label:"Add reps",title:`${He(m)} lb x ${s+1}`,description:"Same weight, one more rep.",weight:m,reps:s+1},{id:"weight",label:"Add weight",title:`${He(l)} lb x ${p}`,description:"A heavier set with a small rep drop.",weight:l,reps:p},{id:"volume",label:"Add volume",title:`Extra set: ${He(m)} lb x ${s}`,description:"Repeat your best recent set to raise session volume.",weight:m,reps:s}]}}async function io(t,e){let a=await Wa(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input type="text" class="lt-lift-name-input" data-name-input maxlength="60" autocomplete="off" />
      <button type="button" class="lt-detail-delete" data-delete-lift aria-label="Delete lift">&times;</button>
    </header>

    <form class="lt-quick-log" data-log-form>
      <div class="lt-quick-log-fields">
        <label class="lt-field">
          <span>Weight (lb)</span>
          <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" required data-weight-input />
        </label>
        <label class="lt-field">
          <span>Reps</span>
          <input type="number" inputmode="numeric" step="1" min="1" name="reps" required data-reps-input />
        </label>
      </div>
      <button type="submit" class="lt-log-btn">Log set</button>
      <p class="lt-log-feedback" data-log-feedback hidden></p>
    </form>

    <section class="lt-rest-settings" aria-label="Rest timer settings">
      <label class="lt-rest-setting-toggle">
        <span data-rest-enabled-label>Rest timer: Off</span>
        <input type="checkbox" data-rest-enabled-input />
      </label>
      <label class="lt-rest-setting-field" data-default-rest-field>
        <span>Default rest</span>
        <input type="number" inputmode="numeric" step="15" min="15" max="600" data-default-rest-input />
        <small>sec</small>
      </label>
      <label class="lt-rest-setting-field" data-lift-rest-field>
        <span>This lift</span>
        <input type="number" inputmode="numeric" step="15" min="15" max="600" placeholder="Default" data-lift-rest-input />
        <small>sec</small>
      </label>
    </section>

    <section class="lt-lift-goals" data-lift-goals></section>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="history" role="tab" aria-selected="true">History</button>
      <button type="button" class="lt-tab" data-tab="details" role="tab" aria-selected="false">Details</button>
    </div>

    <section data-tab-panel="history"></section>
    <section data-tab-panel="details" hidden></section>
  `,t.querySelector("[data-back]").addEventListener("click",K);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",S=>{S.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let S=r.value.trim();if(!S||S===o){r.value=o;return}o=S,await Ia(e,S)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Pa(e),K(),St(`Deleted "${o}"`,{onUndo:async()=>{await Ua(e),we()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(S=>{S.addEventListener("click",()=>{n.forEach(f=>f.setAttribute("aria-selected",String(f===S))),Object.entries(i).forEach(([f,k])=>{k.hidden=f!==S.dataset.tab}),S.dataset.tab==="details"&&rt()})});let h=t.querySelector("[data-log-form]"),m=t.querySelector("[data-weight-input]"),s=t.querySelector("[data-reps-input]"),l=t.querySelector("[data-log-feedback]"),p=t.querySelector("[data-default-rest-input]"),y=t.querySelector("[data-lift-rest-input]"),c=t.querySelector("[data-rest-enabled-input]"),b=t.querySelector("[data-rest-enabled-label]"),D=t.querySelector("[data-default-rest-field]"),u=t.querySelector("[data-lift-rest-field]"),L=t.querySelector("[data-lift-goals]"),$=[];function q(){p.value=ea(),y.value=aa(e)||"";let S=Ft();c.checked=S,b.textContent=S?"Rest timer: On":"Rest timer: Off",p.disabled=!S,y.disabled=!S,D.classList.toggle("lt-rest-setting-field-disabled",!S),u.classList.toggle("lt-rest-setting-field-disabled",!S)}function W(S){let f=Number(S.value);return S.value===""?null:!Number.isFinite(f)||f<15?15:f>600?600:Math.round(f)}p.addEventListener("change",()=>{let S=W(p)||120;Br(S),q()}),y.addEventListener("change",()=>{let S=W(y);Gr(e,S),q()}),c.addEventListener("change",()=>{Or(c.checked),q()});async function H(){$=await Ha(e)}function X(){if($.length===0)return;let S=$[$.length-1];m.value=S.weight}h.addEventListener("submit",async S=>{S.preventDefault();let f=Number(m.value),k=Number(s.value);if(!(f>=0)||!Number.isFinite(f)||!(k>0)||!Number.isInteger(k))return;let E=j(f,k),N=Ee(E,$),R=new Date;Ft()&&ce(),await ft(e,f,k,R.toISOString()),Ft()&&Ne({seconds:Ie(e),liftName:o}),s.value="",s.focus(),await H(),z(),i.details.hidden||rt(),ot().catch(Y=>console.error("[lift-tracker]",Y));let T=C(R.toISOString()),J=ht($.filter(Y=>C(Y.performed_at)===T));l.hidden=!1,l.classList.toggle("lt-pr",N),l.textContent=N?`New PR! Today's volume: ${Math.round(J)} lb`:`Logged. Today's volume: ${Math.round(J)} lb`,Ot({showToasts:!0}).catch(Y=>console.error("[lift-tracker]",Y))});function F(S){let f=new Map;for(let k of S){let E=C(k.performed_at);f.has(E)||f.set(E,[]),f.get(E).push(k)}return Array.from(f.entries()).sort((k,E)=>E[0].localeCompare(k[0]))}function Q(S){let[f,k,E]=S.split("-").map(Number);return new Date(f,k-1,E).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function z(){let S=i.history;if($.length===0){S.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let f=F($);S.innerHTML=f.map(([k,E])=>{let I=ht(E),R=E.slice().sort((T,J)=>new Date(J.performed_at)-new Date(T.performed_at)).map(T=>{let J=Math.round(j(Number(T.weight),Number(T.reps)));return`
              <li class="lt-history-row" data-set-id="${T.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${T.id}">
                  <span class="lt-history-weight">${T.weight} lb &times; ${T.reps}</span>
                  <span class="lt-history-e1rm">${J} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${Q(k)}</span>
              <span class="lt-history-volume">${Math.round(I)} lb volume</span>
            </div>
            <ul class="lt-history-list">${R}</ul>
          </div>
        `}).join(""),S.querySelectorAll("[data-edit-trigger]").forEach(k=>{k.addEventListener("click",()=>mt(k.dataset.editTrigger))})}function O(S){return i.history.querySelector(`[data-set-id="${S}"]`)}function mt(S){let f=O(S),k=$.find(E=>E.id===S);!f||!k||(f.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${k.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${k.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${C(k.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,f.querySelector("[data-edit-cancel]").addEventListener("click",z),f.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Oa(S),await H(),z(),i.details.hidden||rt(),St("Set deleted",{onUndo:async()=>{await Ba(S),await H(),z(),i.details.hidden||rt()}})}),f.querySelector("[data-edit-form]").addEventListener("submit",async E=>{E.preventDefault();let I=Number(f.querySelector("[data-edit-weight]").value),N=Number(f.querySelector("[data-edit-reps]").value),R=f.querySelector("[data-edit-date]").value;if(!(I>=0)||!(N>0)||!R)return;let T=new Date(k.performed_at),[J,Y,Bt]=R.split("-").map(Number);T.setFullYear(J,Y-1,Bt),await Fa(S,{weight:I,reps:N,performed_at:T.toISOString()}),await H(),z(),i.details.hidden||rt()}))}function rt(){let S=i.details,f=vt($);if(f.length===0){S.innerHTML='<p class="lt-empty">No sets logged yet.</p>',vr();return}let k=so($),E=pe(a.dictionary_key||o);S.innerHTML=`
      ${kn(E)}
      ${vn(k)}
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `,S.querySelectorAll("[data-progression-option]").forEach(R=>{R.addEventListener("click",()=>{let T=k.options.find(J=>J.id===R.dataset.progressionOption);T&&(m.value=T.weight,s.value=T.reps,l.hidden=!0,h.scrollIntoView({behavior:"smooth",block:"start"}),s.focus())})});let I=S.querySelector("[data-lift-canvas]"),N=S.querySelector("[data-point-detail]");kr(I,f,{onPointClick:R=>{N.hidden=!1,N.textContent=`${Q(R.date)}: ${R.weight} lb × ${R.reps} (${Math.round(R.e1rm)} e1RM)`}})}await H(),q(),X(),z(),await ot();async function ot(){let S=await Rt(),{goalEvaluations:f}=Lt(S),k=f.filter(E=>E.goal.type==="lift_set"&&E.goal.lift_id===e).slice(0,3);if(k.length===0){L.innerHTML=`
        <button type="button" class="lt-lift-goals-empty" data-open-goals>
          Set a goal for this lift
        </button>
      `,L.querySelector("[data-open-goals]").addEventListener("click",oe);return}L.innerHTML=`
      <div class="lt-lift-goals-header">
        <span>Goals</span>
        <button type="button" data-open-goals>Manage</button>
      </div>
      ${k.map(E=>`
        <article class="lt-lift-goal-row">
          <span>
            <strong>${tt(E.title)}</strong>
            <small>${tt(E.currentLabel)} · ${tt(E.targetLabel)}</small>
          </span>
          <em>${E.achieved?"Hit":lt(E.progress)}</em>
        </article>
      `).join("")}
    `,L.querySelector("[data-open-goals]").addEventListener("click",oe)}}function kn(t){if(!t)return"";let e=t.primaryMuscles.map(n=>`<span>${tt(n)}</span>`).join(""),a=t.secondaryMuscles.map(n=>`<span>${tt(n)}</span>`).join(""),r=t.equipment.map(n=>`<span>${tt(n)}</span>`).join(""),o=t.movementPatterns.map(n=>`<span>${tt(n)}</span>`).join("");return`
    <section class="lt-lift-info-card">
      <div class="lt-lift-info-header">
        <span>Lift Info</span>
        <strong>${tt(t.name)}</strong>
      </div>
      <div class="lt-lift-info-group">
        <h3>Primary</h3>
        <div class="lt-lift-info-tags">${e||"<span>Not tagged</span>"}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Secondary</h3>
        <div class="lt-lift-info-tags">${a||"<span>None listed</span>"}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Equipment</h3>
        <div class="lt-lift-info-tags">${r||"<span>Not listed</span>"}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Pattern</h3>
        <div class="lt-lift-info-tags">${o||"<span>Not listed</span>"}</div>
      </div>
      ${t.cues?.length?`
        <ul class="lt-lift-info-cues">
          ${t.cues.map(n=>`<li>${tt(n)}</li>`).join("")}
        </ul>
      `:""}
      ${t.tutorialUrl?`<a class="lt-lift-info-link" href="${tt(t.tutorialUrl)}" target="_blank" rel="noopener noreferrer">Watch tutorial</a>`:'<p class="lt-lift-info-empty">Tutorial link not set yet.</p>'}
    </section>
  `}function vn(t){if(!t.baseline)return"";let e=t.context.previousVolume==null?`${Math.round(t.context.latestVolume)} lb last session`:`${Math.round(t.context.latestVolume)} lb last session · ${Math.round(t.context.previousVolume)} lb previous`;return`
    <section class="lt-progression-card">
      <div class="lt-progression-header">
        <span>Progression Options</span>
        <small>Based on ${tt(t.baseline.label)}</small>
      </div>
      <p class="lt-progression-context">${tt(e)}</p>
      <div class="lt-progression-options">
        ${t.options.map(a=>`
          <button type="button" class="lt-progression-option" data-progression-option="${tt(a.id)}">
            <span>${tt(a.label)}</span>
            <strong>${tt(a.title)}</strong>
            <small>${tt(a.description)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `}function tt(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var lo=60;function Fe(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-lo),e}function Wt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function me(t,e,a=new Date,r=`last ${lo} days`,o=[],n=[]){let i=C(a.toISOString()),h=[`Lift Tracker — ${r} (as of ${i})`,""],m=t.filter(s=>(e.get(s.id)||[]).length>0);if(m.length===0)h.push("No sets logged in this period."),h.push("");else{for(let l of m){let p=(e.get(l.id)||[]).slice().sort((b,D)=>new Date(b.performed_at)-new Date(D.performed_at)),y=ht(p),c=Math.max(...p.map(b=>j(Number(b.weight),Number(b.reps))));h.push(l.name);for(let b of p){let D=Math.round(j(Number(b.weight),Number(b.reps)));h.push(`  ${C(b.performed_at)}: ${b.weight} lb x ${b.reps} (e1RM ${D})`)}h.push(`  Sets: ${p.length} | Volume: ${Math.round(y)} lb | Best e1RM: ${Math.round(c)}`),h.push("")}let s=t.length-m.length;s>0&&(h.push(`(${s} lift${s===1?"":"s"} with no sets in this period omitted)`),h.push(""))}if(o.length>0){h.push("Body weight");for(let c of o)h.push(`  ${c.date}: ${Wt(c.weight)} lb`);let s=o[0].weight,l=o[o.length-1].weight,p=l-s,y=p>0?"+":"";h.push(`  Start: ${Wt(s)} lb | Current: ${Wt(l)} lb | Change: ${y}${Wt(p)} lb`),h.push("")}if(n.length>0){h.push("Waist");for(let c of n)h.push(`  ${c.date}: ${Wt(c.waist)} in`);let s=n[0].waist,l=n[n.length-1].waist,p=l-s,y=p>0?"+":"";h.push(`  Start: ${Wt(s)} in | Current: ${Wt(l)} in | Change: ${y}${Wt(p)} in`),h.push("")}return h.join(`
`).trimEnd()}var Sn=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
      killstreak based on how many different days you've logged a workout
      this week (Sunday through Saturday). 1 day earns a UAV, 2 days a
      Predator Missile, 3 days a Harrier Strike, and 4 or more days a
      Chopper Gunner. It resets on its own every Sunday — nothing to do.
      Tap the banner to see a full breakdown and how many of each tier
      you've earned over time.`},{title:"Fast mode",body:`Tap the "Fast" button near the top of the list to switch every
      lift row into a quick-log form right there on the list, with weight
      and reps fields and a "Log" button. Useful for supersets or circuits,
      where you're moving between several lifts and don't want to open
      each one's page to log a set. The weight field prefills with your
      last weight for that lift, and the "Log" button shows a PR note and
      that lift's volume for the day after each set. Tap the button again
      (now labeled "Normal") to switch back to the regular list.`},{title:"Export progress",body:`Tap "Export progress (last 60 days)" below to expand a plain-text
      summary of every set you've logged in the last 60 days, grouped by
      lift, with volume and estimated 1-rep max, plus your body weight
      history over the same window. Tap "Copy to clipboard" to grab it —
      useful for pasting into Claude or anywhere else you want feedback on
      your progress. Need older data? Use "Export full history" right below
      instead.`},{title:"Composite progress",body:`A chart combining every lift's estimated 1-rep max into one
      normalized trend line, so you can see overall strength progress at
      a glance instead of checking each lift one at a time.`},{title:"Adding a lift",body:`Type a name into "New lift name" near the bottom of the list
      and tap "+ Add Lift".`},{title:"Workouts",body:`A workout is a saved filter over your lift list, for when you
      only want to see the lifts for "Push day" or "Leg day" instead of
      everything. Tap "+ Create Workout" below the Add Lift form, name it,
      then drag the lifts you want into it above the yellow line and tap
      "Save workout" -- everything else stays below the line and out of
      the workout. The workout then shows up as a button in the row below
      Add Lift; tap it to filter the list down to just those lifts, and
      tap it again to clear the filter. Tap the pencil next to a workout's
      button to rename it, change which lifts are in it, or delete it.`},{title:"Reordering lifts",body:`Press and hold the dots on the right side of a lift row, then
      drag to move it up or down the list.`},{title:"Deleting a lift",body:`Open the lift's page and tap the × next to its name at the
      top. You'll have a few seconds to tap "Undo" before it's gone for
      good.`},{title:"Logging a set",body:`Tap a lift to open it. The weight field automatically fills in
      with the last weight you logged for that lift — enter your reps and
      tap "Log set" (change the weight first if you're lifting something
      different). You'll see a note if the set is a new estimated 1-rep
      max PR.`},{title:"History tab",body:`Shows every set you've logged for this lift, grouped by date,
      with that day's total volume. Tap any set to edit its weight, reps,
      or date, or to delete it (with the same undo safety net).`},{title:"Details tab",body:`A chart of this lift's estimated 1-rep max over time. Tap a
      point on the chart to see the exact weight and reps behind it.`},{title:"Renaming a lift",body:`On a lift's page, tap its name at the top and type a new one.
      It saves automatically when you tap away or press Enter.`}],xn=`
  <section class="lt-export-section" data-export-section>
    <button type="button" class="lt-export-toggle" data-export-toggle aria-expanded="false">
      <span>Export progress (last 60 days)</span>
      <span class="lt-chevron" data-export-chevron>&#9660;</span>
    </button>
    <div class="lt-export-body" data-export-body hidden>
      <textarea class="lt-export-textarea" data-export-textarea readonly></textarea>
      <div class="lt-export-actions">
        <button type="button" class="lt-export-copy" data-export-copy>Copy to clipboard</button>
        <span class="lt-export-status" data-export-status hidden></span>
      </div>
    </div>
  </section>

  <section class="lt-export-section" data-full-export-section>
    <button type="button" class="lt-export-toggle" data-full-export-toggle aria-expanded="false">
      <span>Export full history</span>
      <span class="lt-chevron" data-full-export-chevron>&#9660;</span>
    </button>
    <div class="lt-export-body" data-full-export-body hidden>
      <p class="lt-help-export-note">Every set you've ever logged, with
        no date cutoff — for when the 60-day export above isn't enough
        history.</p>
      <textarea class="lt-export-textarea" data-full-export-textarea readonly></textarea>
      <div class="lt-export-actions">
        <button type="button" class="lt-export-copy" data-full-export-copy>Copy to clipboard</button>
        <span class="lt-export-status" data-full-export-status hidden></span>
      </div>
    </div>
  </section>
`;async function co(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Sn.map(c=>`
          <section class="lt-help-section">
            <h2>${c.title}</h2>
            <p>${c.body}</p>
          </section>
          ${c.title==="Export progress"?xn:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",K);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let b=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(b)),a.hidden=!b,r.innerHTML=b?"&#9650;":"&#9660;",!!b){e.disabled=!0;try{let D=await st(),u=D.map(O=>O.id),L=Fe().toISOString(),$=await Se(u,L),q=new Map(D.map(O=>[O.id,[]]));for(let O of $){let mt=q.get(O.lift_id);mt&&mt.push(O)}let H=(await dt()).filter(O=>new Date(O.logged_at)>=new Date(L)),X=gt(H),Q=(await Ut()).filter(O=>new Date(O.logged_at)>=new Date(L)),z=Ht(Q);o.value=me(D,q,new Date,void 0,X,z),i.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let c=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),c=!0}catch{c=!1}if(!c)try{c=document.execCommand("copy")}catch{c=!1}i.hidden=!1,i.textContent=c?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let h=t.querySelector("[data-full-export-toggle]"),m=t.querySelector("[data-full-export-body]"),s=t.querySelector("[data-full-export-chevron]"),l=t.querySelector("[data-full-export-textarea]"),p=t.querySelector("[data-full-export-copy]"),y=t.querySelector("[data-full-export-status]");h.addEventListener("click",async()=>{let b=!(h.getAttribute("aria-expanded")==="true");if(h.setAttribute("aria-expanded",String(b)),m.hidden=!b,s.innerHTML=b?"&#9650;":"&#9660;",!!b){h.disabled=!0;try{let D=await st(),u=D.map(F=>F.id),L=await kt(u),$=new Map(D.map(F=>[F.id,[]]));for(let F of L){let Q=$.get(F.lift_id);Q&&Q.push(F)}let q=await dt(),W=gt(q),H=await Ut(),X=Ht(H);l.value=me(D,$,new Date,"all-time",W,X),y.hidden=!0}finally{h.disabled=!1}}}),p.addEventListener("click",async()=>{l.select();let c=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(l.value),c=!0}catch{c=!1}if(!c)try{c=document.execCommand("copy")}catch{c=!1}y.hidden=!1,y.textContent=c?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function uo(t){yt(it.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",K);let[e,a]=await Promise.all([st(),jt()]),r=Ir(a),o=r?e.filter(c=>r.liftIds.includes(c.id)):e,n=o.length?await kt(o.map(c=>c.id)):[],i=new Map(o.map(c=>[c.id,[]]));for(let c of n){let b=i.get(c.lift_id);b&&b.push(c)}let h=o.map(c=>({liftId:c.id,dailySeries:vt(i.get(c.id)||[])})),m=Xt(h),s=t.querySelector("[data-composite-canvas]"),l=t.querySelector("[data-composite-empty]"),p=t.querySelector("[data-composite-scope]"),y=t.querySelector("[data-composite-blurb]");if(p.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",y.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",l.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",m.length===0){s.hidden=!0,l.hidden=!1;return}s.hidden=!1,l.hidden=!0,De(s,m)}function En(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ln(){let t=await st(),e=new Map(t.map(r=>[r.id,r.name]));return(await kt(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function _n(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,i])=>{let m=i.slice().sort((s,l)=>new Date(s.performed_at)-new Date(l.performed_at)).map(s=>{let l=Math.round(j(Number(s.weight),Number(s.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${s.weight} lb &times; ${s.reps}</span>
                <span class="lt-history-e1rm">${l} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${m}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${En(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function po(t){yt(it.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",K);let e=t.querySelector("[data-history-content]"),a=await Ln();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=gr(a);e.innerHTML=r.map(([o,n])=>_n(o,n)).join("")}var mo="lt-theme",ca="default";function da(){return qe(mo,ca)}function fo(t){!t||t===ca?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function ho(t){fo(t),Ae(mo,t||ca)}function go(){fo(da())}var $n={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},Dn=["rank","mastery","streak","capstone","secret"],Cn="Hidden until unlocked.";async function yo(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Killstreak</h1>
    </header>

    <p class="lt-composite-blurb">Log a workout on more distinct days within a Sunday-Saturday week to climb the tiers below. It resets on its own every Sunday.</p>

    <section class="lt-killstreak-current" data-killstreak-current>
      <span class="lt-killstreak-current-icon" data-killstreak-current-icon>&#127919;</span>
      <span class="lt-killstreak-info">
        <span class="lt-killstreak-label" data-killstreak-current-label>No Killstreak</span>
        <span class="lt-killstreak-sub" data-killstreak-current-sub>0 Day streak</span>
      </span>
    </section>

    <ul class="lt-killstreak-tier-list" data-killstreak-tier-list></ul>

    <h2 class="lt-killstreak-achievements-heading">Achievements</h2>
    <p class="lt-composite-blurb" data-achievements-summary></p>
    <div data-achievements></div>
  `,t.querySelector("[data-back]").addEventListener("click",K);let e=await ve(),a=await dt(),r=await be(),o=await ke(),{days:n,tier:i}=Te(e);t.querySelector("[data-killstreak-current-icon]").textContent=i?i.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=i?`${i.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let h=Ye(e,r),m=t.querySelector("[data-killstreak-tier-list]");m.innerHTML=ie.map(u=>{let L=h[u.key];return`
      <li class="lt-killstreak-tier-row${i?.key===u.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${u.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${u.label}</span>
          <span class="lt-killstreak-tier-req">${u.days}+ day${u.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${L} earned</span>
      </li>
    `}).join("");let s=zt(e,r,{bodyWeightEntries:a,hasSubmittedFeedback:o}),l=s.filter(u=>u.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${l} / ${s.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let p=s.filter(u=>u.track==="rank"),y=new Set(Me(p,We()));Wr(p.filter(u=>u.unlocked).map(u=>u.id));let c=t.querySelector("[data-achievements]");function b(u){if(u.track!=="rank"){let H=u.track==="secret"&&!u.unlocked,X=H?" lt-achievement-card-desc-hidden":"",F=H?Cn:u.description,Q=u.flavor&&!H?`<span class="lt-achievement-card-flavor">${u.flavor}</span>`:"";return`
        <li class="lt-achievement-card${u.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${u.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${u.name}</span>
            <span class="lt-achievement-card-desc${X}">${F}</span>
            ${Q}
          </span>
        </li>
      `}let L=u.unlocked&&da()===u.theme.id,$=u.unlocked&&y.has(u.id),q=u.unlocked?`<span class="lt-achievement-card-theme">${u.theme.label} theme${L?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${u.theme.label}</span>`,W=$?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${u.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${$?" lt-achievement-card-new":""}${L?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${u.theme.id}"${u.unlocked?"":" disabled"} aria-label="${u.unlocked?`Apply the ${u.theme.label} theme`:`Locked: ${u.name}`}">
          <span class="lt-achievement-card-icon">${u.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${u.name}</span>
            <span class="lt-achievement-card-desc">${u.description}</span>
            ${q}
            ${W}
          </span>
        </button>
      </li>
    `}function D(){c.innerHTML=Dn.map(u=>{let $=s.filter(q=>q.track===u).sort((q,W)=>Number(W.unlocked)-Number(q.unlocked)).map(b).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${$n[u]}</h3>
          ${u==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${$}</ul>
        </section>
      `}).join("")}D(),c.addEventListener("click",u=>{let L=u.target.closest("[data-apply-theme]");!L||L.disabled||(ho(L.dataset.applyTheme),D())})}var ua=`goal_format: lift_tracker_goals_v1
goals:
  - title: Dumbbell Chest Press 35 x 10
    type: lift_set
    lift: dumbell chest press
    weight: 35
    reps: 10
    unit: lb
    timeframe_weeks: 4

  - title: Harrier Week
    type: weekly_workout_days
    target: 3
    recurring: weekly

  - title: Workout A Volume Base
    type: weekly_workout_volume
    workout: Workout A
    target: 18000
    unit: lb
    recurring: weekly`,bo=`Analyze this Lift Tracker export and create 5-8 goals that are achievable in 3-4 weeks.
Use only Lift Tracker YAML format.
Allowed types: lift_set, weekly_workout_days, weekly_workout_volume, workout_session_volume.
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;async function ko(t){let e=await Rt(),a=Lt(e),r=[];function o(){let s=a.goalEvaluations.filter(p=>p.goal.status==="active"&&!p.achieved),l=a.goalEvaluations.filter(p=>p.goal.status==="achieved"||p.achieved);t.innerHTML=`
      <header class="lt-detail-header">
        <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
        <h1 class="lt-weight-view-title">Goals</h1>
      </header>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Active Goals</h2>
        <div data-active-goals>
          ${s.length?s.map(wo).join(""):'<p class="lt-empty">No active goals yet. Add one below or paste a batch from an LLM.</p>'}
        </div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Add Goal</h2>
        ${i()}
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Import Goals</h2>
        <p class="lt-composite-blurb">You can have an LLM turn your recent Lift Tracker history into goals, then paste the YAML it returns here.</p>
        <ol class="lt-goal-steps">
          <li>Export your recent history from the <button type="button" class="lt-inline-link" data-help-export-link>? Help page</button>, or use the all-in-one copy button below.</li>
          <li>Paste the history, goal format, and prompt into an LLM.</li>
          <li>Ask it to return only Lift Tracker YAML using exact lift and workout names.</li>
          <li>Paste the YAML output into this box, tap Preview, then tap Import goals.</li>
        </ol>
        <div class="lt-goal-helper-actions">
          <button type="button" class="lt-goal-secondary-btn" data-copy-goal-packet>Copy 60-day history + prompt</button>
          <span class="lt-export-status" data-goal-packet-status hidden></span>
        </div>
        <textarea class="lt-goal-packet-output" data-goal-packet-output rows="10" readonly hidden></textarea>
        <details class="lt-goal-import-help">
          <summary><span>Goal format and LLM prompt</span><strong>View More -&gt;</strong></summary>
          <p class="lt-composite-blurb">Allowed types: <strong>lift_set</strong>, <strong>weekly_workout_days</strong>, <strong>weekly_workout_volume</strong>, <strong>workout_session_volume</strong>.</p>
          <pre>${pt(ua)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${pt(bo)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${vo(ua)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${l.length?l.map(wo).join(""):'<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `,t.querySelector("[data-back]").addEventListener("click",K),t.querySelector("[data-help-export-link]").addEventListener("click",ye),h(),m(),t.querySelectorAll("[data-delete-goal]").forEach(p=>{p.addEventListener("click",async()=>{await ja(p.dataset.deleteGoal),await n()})})}async function n(){e=await Rt(),a=Lt(e),o()}function i(){return`
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${ia.map(s=>`<option value="${s.id}">${s.label}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field lt-goal-title-field">
          <span>Title</span>
          <input type="text" name="title" maxlength="80" placeholder="Dumbbell Row 45 x 12" required />
        </label>
        <label class="lt-field" data-lift-field>
          <span>Lift</span>
          <select name="lift_id">
            ${e.lifts.map(s=>`<option value="${s.id}">${pt(s.name)}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field" data-workout-field hidden>
          <span>Workout</span>
          <select name="workout_id">
            ${e.workouts.map(s=>`<option value="${s.id}">${pt(s.name)}</option>`).join("")}
          </select>
        </label>
        <div class="lt-goal-number-row" data-lift-set-fields>
          <label class="lt-field">
            <span>Weight</span>
            <input type="number" inputmode="decimal" step="0.5" min="0" name="target_weight" />
          </label>
          <label class="lt-field">
            <span>Reps</span>
            <input type="number" inputmode="numeric" step="1" min="1" name="target_reps" />
          </label>
        </div>
        <label class="lt-field" data-target-field hidden>
          <span>Target</span>
          <input type="number" inputmode="decimal" step="1" min="0" name="target_value" />
        </label>
        <label class="lt-field">
          <span>Timeframe weeks</span>
          <input type="number" inputmode="numeric" step="1" min="1" name="timeframe_weeks" placeholder="4" />
        </label>
        <button type="submit" class="lt-log-btn">Save goal</button>
        <p class="lt-log-feedback" data-goal-feedback hidden></p>
      </form>
    `}function h(){let s=t.querySelector("[data-goal-form]"),l=t.querySelector("[data-goal-type]"),p=t.querySelector("[data-goal-feedback]");function y(){let c=l.value;t.querySelector("[data-lift-field]").hidden=c!=="lift_set",t.querySelector("[data-workout-field]").hidden=!["weekly_workout_volume","workout_session_volume"].includes(c),t.querySelector("[data-lift-set-fields]").hidden=c!=="lift_set",t.querySelector("[data-target-field]").hidden=c==="lift_set"}l.addEventListener("change",y),y(),s.addEventListener("submit",async c=>{c.preventDefault(),p.hidden=!0;let b=s.type.value,u={title:s.title.value.trim(),type:b,unit:"lb",timeframe_weeks:Oe(s.timeframe_weeks.value),recurring:b.startsWith("weekly_")?"weekly":"none",metadata:{}};b==="lift_set"?(u.lift_id=s.lift_id.value,u.target_weight=Oe(s.target_weight.value),u.target_reps=Oe(s.target_reps.value)):(u.target_value=Oe(s.target_value.value),b!=="weekly_workout_days"&&(u.workout_id=s.workout_id.value));let L=qn(u);if(L){p.hidden=!1,p.textContent=L;return}await Va(u),await Ot(),s.reset(),await n()})}function m(){let s=t.querySelector("[data-import-text]"),l=t.querySelector("[data-import-feedback]"),p=t.querySelector("[data-save-import]"),y=t.querySelector("[data-copy-goal-packet]"),c=t.querySelector("[data-goal-packet-output]"),b=t.querySelector("[data-goal-packet-status]");y.addEventListener("click",async()=>{let D=y.textContent;y.disabled=!0,y.textContent="Building...",b.hidden=!0;try{let u=await Tn();c.value=u,c.hidden=!1;let L=await Mn(u);b.hidden=!1,b.textContent=L?"Copied. Paste this into an LLM.":"Copy from the box below."}finally{y.disabled=!1,y.textContent=D}}),t.querySelector("[data-preview-import]").addEventListener("click",()=>{let D=Zr(s.value,{lifts:e.lifts,workouts:e.workouts});if(r=D.goals,D.errors.length){p.hidden=!0,l.innerHTML=`<div class="lt-goal-import-errors">${D.errors.map(u=>`<p>${pt(u)}</p>`).join("")}</div>`;return}p.hidden=r.length===0,l.innerHTML=r.length?`<ul class="lt-goal-preview-list">${r.map(u=>`<li>${pt(u.title)} <span>${pt(u.type)}</span></li>`).join("")}</ul>`:'<p class="lt-empty">No goals found in that text.</p>'}),p.addEventListener("click",async()=>{r.length!==0&&(await Ka(r),await Ot(),s.value="",r=[],await n())})}o()}async function Tn(){let t=await st(),e=t.map(l=>l.id),a=Fe().toISOString(),r=await Se(e,a),o=new Map(t.map(l=>[l.id,[]]));for(let l of r){let p=o.get(l.lift_id);p&&p.push(l)}let i=(await dt()).filter(l=>new Date(l.logged_at)>=new Date(a)),m=(await Ut()).filter(l=>new Date(l.logged_at)>=new Date(a)),s=me(t,o,new Date,void 0,gt(i),Ht(m));return["Use the Lift Tracker export below to create goals.","",bo,"","Return only YAML in this exact format. Do not wrap it in markdown fences.","",ua,"","Lift Tracker export:","",s].join(`
`)}async function Mn(t){if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let a=document.execCommand("copy");return e.remove(),a}catch{return!1}}function wo(t){let e=t.achieved||t.goal.status==="achieved";return`
    <article class="lt-goal-card${e?" lt-goal-card-achieved":""}">
      <div class="lt-goal-card-main">
        <span class="lt-goal-card-title">${pt(t.title)}</span>
        <span class="lt-goal-card-sub">${pt(t.currentLabel)} · ${pt(t.targetLabel)}</span>
        <span class="lt-goal-progress" aria-label="${lt(t.progress)} complete">
          <span style="width: ${Math.round(Math.min(t.progress,1)*100)}%"></span>
        </span>
      </div>
      <div class="lt-goal-card-side">
        <span>${e?"Hit":lt(t.progress)}</span>
        <button type="button" data-delete-goal="${t.goal.id}" aria-label="Delete ${vo(t.title)}">&times;</button>
      </div>
    </article>
  `}function qn(t){if(!t.title)return"Add a title.";if(t.type==="lift_set"){if(!t.lift_id)return"Choose a lift.";if(t.target_weight==null)return"Add a target weight.";if(t.target_reps==null)return"Add target reps."}else if(t.target_value==null)return"Add a target.";return(t.type==="weekly_workout_volume"||t.type==="workout_session_volume")&&!t.workout_id?"Choose a workout.":null}function Oe(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function pt(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function vo(t){return pt(t)}var So="__divider__";async function pa(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([st(),r?Qa(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?xo(n.name):""}"
      />
      ${r?'<button type="button" class="lt-detail-delete" data-delete-workout aria-label="Delete workout">&times;</button>':""}
    </header>

    <p class="lt-workout-instructions">
      Drag the lifts you want in this workout above the yellow line, then save.
    </p>

    <ul class="lt-lift-list lt-workout-lift-list" data-workout-lift-list></ul>
    <p class="lt-empty" data-workout-lifts-empty hidden>Add a lift on the homepage first.</p>

    <button type="button" class="lt-save-workout-btn" data-save-workout>Save workout</button>
    <p class="lt-workout-save-feedback" data-workout-save-feedback hidden></p>
  `,t.querySelector("[data-back]").addEventListener("click",K);let h=t.querySelector("[data-workout-name-input]"),m=t.querySelector("[data-workout-lift-list]"),s=t.querySelector("[data-workout-lifts-empty]"),l=t.querySelector("[data-save-workout]"),p=t.querySelector("[data-workout-save-feedback]");s.hidden=o.length>0;let y=o.filter(u=>i.has(u.id)),c=o.filter(u=>!i.has(u.id));m.innerHTML=[...y.map(b),D(),...c.map(b)].join("");for(let u of o){let $=m.querySelector(`[data-lift-id="${u.id}"]`)?.querySelector("[data-name-slot]");$&&($.textContent=u.name)}se(m,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await tr(a),K(),St(`Deleted "${n.name}"`,{onUndo:async()=>{await er(a),we()}}))}),l.addEventListener("click",async()=>{let u=h.value.trim();if(!u){h.focus();return}let L=Array.from(m.querySelectorAll("[data-reorder-item]")),$=L.findIndex(W=>W.dataset.reorderItem===So),q=L.slice(0,$).map(W=>W.dataset.reorderItem);l.disabled=!0,p.hidden=!0;try{if(r)await Za(a,u,q);else{let W=await jt();await xe(u,q,W.length)}K()}catch(W){console.error("[lift-tracker]",W),p.hidden=!1,p.textContent="Something went wrong saving the workout.",l.disabled=!1}});function b(u){return`
      <li class="lt-lift-row" data-reorder-item="${u.id}" data-lift-id="${u.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${xo(u.name)}">&#8942;&#8942;</button>
      </li>
    `}function D(){return`
      <li class="lt-workout-divider" data-reorder-item="${So}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function xo(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var An=`${window.location.origin}${window.location.pathname}`;function Rn(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ma(t){let e="signin";function a(o,n,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Rn(i||"")}">

          <label for="lt-password">Password</label>
          <input
            type="password"
            id="lt-password"
            name="password"
            autocomplete="${e==="signup"?"new-password":"current-password"}"
            minlength="6"
            required
          >

          <button type="submit">${e==="signup"?"Create account":"Sign in"}</button>

          ${o?`<p class="lt-gate-error">${o}</p>`:""}
          ${n?`<p class="lt-gate-info">${n}</p>`:""}

          <button type="button" class="lt-gate-toggle" data-auth-toggle>
            ${e==="signup"?"Already have an account? Sign in":"Don't have an account? Create one"}
          </button>
        </form>
      </main>
    `}function r(o,n,i){t.innerHTML=a(o,n,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let h=t.querySelector("[data-auth-form]");h.addEventListener("submit",async m=>{m.preventDefault();let s=h.email.value.trim(),l=h.password.value,p=h.querySelector('button[type="submit"]');p.disabled=!0,p.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:y,error:c}=e==="signup"?await v.auth.signUp({email:s,password:l,options:{emailRedirectTo:An}}):await v.auth.signInWithPassword({email:s,password:l});if(c)throw c;if(e==="signup"&&!y.session){e="signin",r(null,`Account created. Check ${s} for a confirmation link, then sign in here.`,s);return}}catch(y){r(y.message||"Something went wrong. Try again.",null,s)}})}r()}function Eo(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function Lo(){let{data:t,error:e}=await v.auth.signInAnonymously();if(e)throw e;return await Wn(),t}async function Wn(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([Yt("Bench Press",0),Yt("Squat",1),Yt("Deadlift",2)]);await Promise.all([ft(e.id,135,8,t(6)),ft(e.id,145,6,t(2)),ft(a.id,185,5,t(5)),ft(a.id,195,5,t(1)),ft(r.id,225,5,t(3))]),await xe("Full Body",[e.id,a.id,r.id],0)}var ct=document.getElementById("lift-tracker-app");go();var _o=0;async function fa(){let t=++_o,e=()=>t!==_o;try{let{data:{session:a}}=await v.auth.getSession();if(e())return;if(!a)if(Eo())try{if(await Lo(),e())return}catch(o){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",o),await ma(ct);return}else return await ma(ct),e(),void 0;let r=_a();if(r.name==="detail"?await io(ct,r.liftId):r.name==="help"?await co(ct):r.name==="weight"?await qr(ct):r.name==="composite"?await uo(ct):r.name==="history"?await po(ct):r.name==="killstreak"?await yo(ct):r.name==="goals"?await ko(ct):r.name==="workout-new"?await pa(ct,{mode:"create"}):r.name==="workout-edit"?await pa(ct,{mode:"edit",workoutId:r.workoutId}):await no(ct),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),ct.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",fa);var $o=null,Do=!1;v.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!Do;Do=!0;let o=a!==$o;$o=a,!(r||!o)&&(K(),fa())});fa();

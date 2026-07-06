import{createClient as ko}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var ha="https://mqfsgammpsumpltfutwl.supabase.co",ga="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var S=ko(ha,ga);function ya(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="goals"?{name:"goals"}:{name:"list"}}function U(){window.location.hash="#/"}function wa(t){window.location.hash=`#/lift/${t}`}function ba(){window.location.hash="#/workout/new"}function ka(t){window.location.hash=`#/workout/${t}/edit`}function oe(){window.location.hash="#/help"}function va(){window.location.hash="#/weight"}function Sa(){window.location.hash="#/composite"}function xa(){window.location.hash="#/history"}function Ea(){window.location.hash="#/killstreak"}function Yt(){window.location.hash="#/goals"}function ne(){window.dispatchEvent(new Event("hashchange"))}async function se(){let{data:t,error:e}=await S.auth.getUser();if(e)throw e;return t?.user?.id??null}async function _a(){let{error:t}=await S.from("feedback_submissions").insert({});if(t)throw t}async function ie(){let{count:t,error:e}=await S.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function J(){let{data:t,error:e}=await S.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function vo(){let{data:t,error:e}=await S.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function La(t){let{data:e,error:a}=await S.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function It(t,e){let{data:a,error:r}=await S.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function $a(t,e){let{data:a,error:r}=await S.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Ca(t){let e=t.map((o,n)=>S.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Da(t){let{error:e}=await S.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ta(t){let{error:e}=await S.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ma(t){let{data:e,error:a}=await S.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function mt(t){if(!t||t.length===0)return[];let{data:e,error:a}=await S.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function le(){let t=await vo();return mt(t)}async function ce(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await S.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function it(t,e,a,r){let{data:o,error:n}=await S.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Aa(t,e){let{data:a,error:r}=await S.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function qa(t){let{error:e}=await S.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ra(t){let{error:e}=await S.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Wa(){let{data:t,error:e}=await S.from("goals").select("*").is("deleted_at",null).order("created_at",{ascending:!0});if(e)throw e;return t}async function Ia(t){let{data:e,error:a}=await S.from("goals").insert(t).select().single();if(a)throw a;return e}async function Na(t){if(!t||t.length===0)return[];let{data:e,error:a}=await S.from("goals").insert(t).select();if(a)throw a;return e}async function Pa(t,e){let{data:a,error:r}=await S.from("goals").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ha(t){let{error:e}=await S.from("goals").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Oa(){let{data:t,error:e}=await S.from("goal_events").select("*").order("created_at",{ascending:!1}).limit(100);if(e)throw e;return t}async function So(t){let{data:e,error:a}=await S.from("goal_events").insert(t).select().single();if(a){if(a.code==="23505")return null;throw a}return e}async function Ua(t){let e=[];for(let a of t){let r=await So(a);r&&e.push(r)}return e}async function Nt(){let{data:t,error:e}=await S.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Fa(t){let e=t.map((o,n)=>S.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ba(t){let{data:e,error:a}=await S.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function de(t,e,a){let{data:r,error:o}=await S.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await S.from("workout_lifts").insert(e.map(i=>({workout_id:r.id,lift_id:i})));if(n)throw n}return r}async function Ga(t,e,a){let{error:r}=await S.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await S.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await S.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(n)throw n}}async function Va(t){let{error:e}=await S.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ka(t){let{error:e}=await S.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function et(){let{data:t,error:e}=await S.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Ya(t,e){let{data:a,error:r}=await S.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ja(t,e){let{data:a,error:r}=await S.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Xa(t){let{error:e}=await S.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function za(t){let{error:e}=await S.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Tt(){let{data:t,error:e}=await S.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Ja(t,e){let{data:a,error:r}=await S.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Qa(t,e){let{data:a,error:r}=await S.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Za(t){let{error:e}=await S.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function tr(t){let{error:e}=await S.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function B(t,e){return t*(1+e/30)}function D(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function ft(t){let e=new Map;for(let a of t){let r=D(a.performed_at),o=B(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Pt(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let r=new Set;for(let i of e)for(let g of i.dailySeries)r.add(g.date);let o=Array.from(r).sort(),n=[];for(let i of o){let g=0,h=0;for(let s of e){let d=null;for(let m of s.dailySeries)if(m.date<=i)d=m;else break;d&&(g+=d.e1rm/a.get(s.liftId),h+=1)}if(h>0){let s=g/h;n.push({date:i,ratio:s,pct:(s-1)*100})}}return n}function ue(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>B(Number(r.weight),Number(r.reps))));return t>a}function lt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function er(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function ar(t){let e=new Map;for(let a of t){let r=D(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function ct(t){let e=new Map;for(let a of t){let r=D(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function rr(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Mt(t){let e=new Map;for(let a of t){let r=D(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var jt=null,vt=null,St=null,xt=null,fe=14,pe="#e8242c",or="rgba(232, 36, 44, 0.18)",me="#f2b134",nr="rgba(242, 177, 52, 0.16)",Et="#9a9ca6",_t="rgba(255, 255, 255, 0.08)";function he(t,e,{onPointClick:a}={}){jt&&(jt.destroy(),jt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return jt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:pe,backgroundColor:or,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:pe,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:_t}},y:{ticks:{color:Et,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),jt}function sr(t,e,{onPointClick:a}={}){vt&&(vt.destroy(),vt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return vt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:me,backgroundColor:nr,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:me,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:_t}},y:{ticks:{color:Et},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),vt}function ir(){vt&&(vt.destroy(),vt=null)}function qe(t,e,{onPointClick:a}={}){St&&(St.destroy(),St=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return St=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:pe,backgroundColor:or,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:pe,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:_t}},y:{ticks:{color:Et},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),St}function Re(){St&&(St.destroy(),St=null)}function lr(t,e,{onPointClick:a}={}){xt&&(xt.destroy(),xt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return xt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:me,backgroundColor:nr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:me,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:_t}},y:{ticks:{color:Et},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),xt}function cr(){xt&&(xt.destroy(),xt=null)}function Xt(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,i=0,g=0,h=0,s=0,d=null,m=null,y=null,u=0,k=0,$=null,p=null;function x(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function _(l){let c=l.target.closest(".lt-drag-handle");if(!c)return;let w=c.closest("[data-reorder-item]");if(w){if(l.pointerType!=="touch"){l.preventDefault(),N(w,l.clientX,l.clientY);return}if(c.setPointerCapture)try{c.setPointerCapture(l.pointerId),$=c,p=l.pointerId}catch{}y=w,u=l.clientX,k=l.clientY,document.addEventListener("pointermove",I),document.addEventListener("pointerup",G),m=setTimeout(()=>{clearTimeout(m),m=null;let C=y,T=u,q=k;R(),N(C,T,q)},180)}}function A(){if($&&p!==null&&$.releasePointerCapture)try{$.releasePointerCapture(p)}catch{}$=null,p=null}function R(){clearTimeout(m),m=null,y=null,document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",G)}function I(l){if(!y)return;let c=l.clientX-u,w=l.clientY-k;Math.hypot(c,w)<=10||(R(),A())}function G(){R(),A()}function N(l,c,w){r=l,n=c,i=w,s=w;let C=l.getBoundingClientRect();h=C.top,g=C.left,o=document.createElement(l.tagName),o.className="lt-reorder-placeholder",o.style.height=`${l.offsetHeight}px`,o.style.width=`${l.offsetWidth}px`,l.after(o),l.classList.add("lt-dragging"),l.style.position="fixed",l.style.left=`${C.left}px`,l.style.width=`${C.width}px`,l.style.top=`${h}px`,l.style.zIndex="1000",document.addEventListener("pointermove",z),document.addEventListener("pointerup",v)}function K(){let l=x().filter(C=>C!==r),c=r.getBoundingClientRect(),w=null;if(a==="x"){let C=c.left+c.width/2,T=c.top+c.height/2;for(let q of l){let L=q.getBoundingClientRect(),Y=L.left+L.width/2,H=L.top+L.height/2;if(Math.abs(H-T)<L.height/2?C<Y:T<H){w=q;break}}}else{let C=c.top+c.height/2;for(let T of l){let q=T.getBoundingClientRect(),L=q.top+q.height/2;if(C<L){w=T;break}}}w?t.insertBefore(o,w):t.appendChild(o)}function V(){let l=s,c=window.innerHeight-s;return l<80?-16*(1-l/80):c<80?16*(1-c/80):0}function P(){if(!r){d=null;return}let l=V();if(l===0){d=null;return}window.scrollBy(0,l),K(),d=requestAnimationFrame(P)}function nt(){d===null&&V()!==0&&(d=requestAnimationFrame(P))}function X(){d!==null&&(cancelAnimationFrame(d),d=null)}function z(l){if(r){if(l.preventDefault(),s=l.clientY,a==="x"){let c=l.clientX-n,w=l.clientY-i;r.style.left=`${g+c}px`,r.style.top=`${h+w}px`}else{let c=l.clientY-i;r.style.top=`${h+c}px`}K(),a==="y"&&nt()}}function v(){if(!r)return;X(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",z),document.removeEventListener("pointerup",v),A();let l=x().map(c=>c.dataset.reorderItem);r=null,o=null,e&&e(l)}t.addEventListener("pointerdown",_)}var xo="joshuaegage@gmail.com";function dr(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function o(){if(r)return;r=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let i=document.scrollingElement;i&&(i.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(i){i.key==="Escape"&&o()}e.addEventListener("click",i=>{i.target===e&&o()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",o),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let i=a.value.trim(),g=encodeURIComponent("Lift Tracker feedback"),h=encodeURIComponent(i||"(no message entered)");_a().catch(()=>{}),window.location.href=`mailto:${xo}?subject=${g}&body=${h}`,o()})}var zt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function ge(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Eo(t,e=new Date){let a=ge(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let i=new Date(n.performed_at);i>=a&&i<r&&o.add(D(n.performed_at))}return o.size}function _o(t){let e=null;for(let a of zt)t>=a.days&&(e=a);return e}function ye(t,e=new Date){let a=Eo(t,e);return{days:a,tier:_o(a)}}function We(t,e=null){let a=new Map;for(let o of t){let i=ge(new Date(o.performed_at)).getTime();a.has(i)||a.set(i,new Set),a.get(i).add(D(o.performed_at))}let r={};for(let o of zt)r[o.key]=0;for(let o of a.values())for(let n of zt)o.size>=n.days&&(r[n.key]+=1);return r}function Lo(t){let e=new Set;for(let a of t)e.add(D(a.performed_at));return e.size}function $o(t){let e=new Set;for(let a of t)e.add(ge(new Date(a.performed_at)).getTime());return e.size}function Co(t){let e=new Set;for(let n of t)e.add(ge(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,i)=>n-i);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+7),o=i.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Do(t){let e=new Set;for(let n of t)e.add(D(n.performed_at));let a=Array.from(e).sort().map(n=>{let[i,g,h]=n.split("-").map(Number);return new Date(i,g-1,h)});if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+1),o=i.getTime()===a[n].getTime()?o+1:1,o>r&&(r=o)}return r}function To(t){let e=new Map;for(let r of t)r.lift_id&&(e.has(r.lift_id)||e.set(r.lift_id,[]),e.get(r.lift_id).push(r));let a=Pt(Array.from(e.entries()).map(([r,o])=>({liftId:r,dailySeries:ft(o)})));return a.length?Math.max(...a.map(r=>r.pct)):0}function Mo(t){let e=ct(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,r=0,o=0;for(let n of e){let i=n.weight-a;r=Math.max(r,i),o=Math.max(o,-i)}return{gain:r,loss:o}}function Ie(t,e=null,a={}){let{bodyWeightEntries:r=[],hasSubmittedFeedback:o=!1}=a,n=Mo(r);return{totalDays:Lo(t),totalWeeks:$o(t),tierCounts:We(t,e),longestStreak:Co(t),totalSets:t.length,longestDayStreak:Do(t),compositeMaxPct:To(t),bodyWeightGain:n.gain,bodyWeightLoss:n.loss,hasSubmittedFeedback:o||qo(e)}}var Ao=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function qo(t){return t!=null&&Ao.has(t)}var Ro=50,Wo=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=Ro&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function Ht(t,e=null,a={}){let r=Ie(t,e,a);return Wo.map(o=>({id:o.id,name:o.name,track:o.track,description:o.description,flavor:o.flavor??null,theme:o.theme??null,unlocked:o.isUnlocked(r)}))}function we(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Ot=null,Jt=null;function ur(){return Ot||(Ot=document.createElement("div"),Ot.className="lt-toast",document.body.appendChild(Ot),Ot)}function Lt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=ur();clearTimeout(Jt),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),i=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(Jt),i(),e&&e()},{once:!0}),Jt=setTimeout(()=>{i(),a&&a()},r)}function pr(t,{durationMs:e=4500}={}){let a=ur();clearTimeout(Jt),a.innerHTML='<span class="lt-toast-message"></span>',a.querySelector(".lt-toast-message").textContent=t,a.classList.add("lt-toast-visible"),Jt=setTimeout(()=>{a.classList.remove("lt-toast-visible")},e)}function $t(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function ht(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function be(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function ke(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var mr="lt-discovery-seen-",Q={weight:"weight",history:"history",composite:"composite"};function ve(t){try{return window.localStorage.getItem(`${mr}${t}`)==="true"}catch{return!1}}function dt(t){try{window.localStorage.setItem(`${mr}${t}`,"true")}catch{}}var fr="lt-weight-card-expanded";function Ut(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Io(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function hr(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function gr(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await et(),o=ct(r),n=rr(o),i=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${i}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let g=n.change<0?"↘":n.change>0?"↗":"→",h=$t(fr,!1);function s(){t.classList.toggle("lt-stats-row-expanded",h),h?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${Ut(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Io(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${Ut(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${g} ${Ut(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${Ut(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}h=!h,ht(fr,h),s()}),h?qe(t.querySelector("[data-home-weight-canvas]"),o):Re()}s()}async function yr(t){dt(Q.weight),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Weight</h1>
    </header>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="weight" role="tab" aria-selected="true">Weight</button>
      <button type="button" class="lt-tab" data-tab="waist" role="tab" aria-selected="false">Waist</button>
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(l=>{l.addEventListener("click",()=>{l.dataset.tab!==r&&(r=l.dataset.tab,e.forEach(c=>c.setAttribute("aria-selected",String(c===l))),Object.entries(a).forEach(([c,w])=>{w.hidden=c!==r}),r==="weight"?u():nt().catch(c=>console.error("[lift-tracker]",c)))})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),g=t.querySelector("[data-weight-chart-section]"),h=t.querySelector("[data-weight-canvas]"),s=t.querySelector("[data-weight-empty]"),d=t.querySelector("[data-weight-history]");n.value=D(new Date().toISOString());let m=[];async function y(){m=await et(),k(),u()}function u(){let l=ct(m);if(l.length===0){g.hidden=!0,s.hidden=!1,Re();return}g.hidden=!1,s.hidden=!0,a.weight.hidden||qe(h,l)}function k(){if(m.length===0){d.innerHTML="";return}let l=m.slice().sort((c,w)=>new Date(w.logged_at)-new Date(c.logged_at));d.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Ut(Number(c.weight))} lb</span>
              <span class="lt-history-e1rm">${hr(D(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),d.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>$(c.dataset.editTrigger))})}function $(l){let c=d.querySelector(`[data-entry-id="${l}"]`),w=m.find(C=>C.id===l);!c||!w||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${w.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${D(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",k),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Xa(l),await y(),Lt("Weight entry deleted",{onUndo:async()=>{await za(l),await y()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let T=Number(c.querySelector("[data-edit-weight]").value),q=c.querySelector("[data-edit-date]").value;if(!(T>=0)||!q)return;let L=new Date(w.logged_at),[Y,H,at]=q.split("-").map(Number);L.setFullYear(Y,H-1,at),await ja(l,{weight:T,logged_at:L.toISOString()}),await y()}))}o.addEventListener("submit",async l=>{l.preventDefault();let c=Number(i.value),w=n.value;if(!(c>=0)||!Number.isFinite(c)||!w)return;let[C,T,q]=w.split("-").map(Number),L=new Date;L.setFullYear(C,T-1,q),await Ya(c,L.toISOString()),i.value="",i.focus(),n.value=D(new Date().toISOString()),await y()});let p=t.querySelector("[data-waist-form]"),x=t.querySelector("[data-waist-date-input]"),_=t.querySelector("[data-waist-input]"),A=t.querySelector("[data-waist-chart-section]"),R=t.querySelector("[data-waist-canvas]"),I=t.querySelector("[data-waist-empty]"),G=t.querySelector("[data-waist-history]");x.value=D(new Date().toISOString());let N=[],K=!1,V=null;async function P(){N=await Tt(),K=!0,z(),X()}async function nt(){if(K){X();return}V||(I.hidden=!1,I.textContent="Loading waist...",A.hidden=!0,V=P().finally(()=>{V=null})),await V}function X(){let l=Mt(N);if(l.length===0){A.hidden=!0,I.hidden=!1,I.textContent="No waist measurements yet — add your first one above.",cr();return}A.hidden=!1,I.hidden=!0,a.waist.hidden||lr(R,l)}function z(){if(N.length===0){G.innerHTML="";return}let l=N.slice().sort((c,w)=>new Date(w.logged_at)-new Date(c.logged_at));G.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Ut(Number(c.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${hr(D(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),G.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>v(c.dataset.editTrigger))})}function v(l){let c=G.querySelector(`[data-entry-id="${l}"]`),w=N.find(C=>C.id===l);!c||!w||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${w.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${D(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",z),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await Za(l),await P(),Lt("Waist measurement deleted",{onUndo:async()=>{await tr(l),await P()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let T=Number(c.querySelector("[data-edit-waist]").value),q=c.querySelector("[data-edit-date]").value;if(!(T>=0)||!q)return;let L=new Date(w.logged_at),[Y,H,at]=q.split("-").map(Number);L.setFullYear(Y,H-1,at),await Qa(l,{waist_circumference:T,logged_at:L.toISOString()}),await P()}))}p.addEventListener("submit",async l=>{l.preventDefault();let c=Number(_.value),w=x.value;if(!(c>=0)||!Number.isFinite(c)||!w)return;let[C,T,q]=w.split("-").map(Number),L=new Date;L.setFullYear(C,T-1,q),await Ja(c,L.toISOString()),_.value="",_.focus(),x.value=D(new Date().toISOString()),await P()}),await y()}var wr="lt-seen-rank-achievements";function Se(){let t=be(wr,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function br(t){ke(wr,JSON.stringify(t))}var Ne="lt-active-workout";function Pe(){try{return window.localStorage.getItem(Ne)||null}catch{return null}}function He(t){try{t?window.localStorage.setItem(Ne,t):window.localStorage.removeItem(Ne)}catch{}}function kr(t){let e=Pe();return e&&t.find(a=>a.id===e)||null}var No=120,vr="lt-default-rest-seconds",Sr="lt-lift-rest-seconds-",xr="lt-rest-timer-enabled",rt=null,Oe=null,Ue=null,Ft=0,gt=null;function Er(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function _r(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function At(){return $t(xr,!1)}function Lr(t){ht(xr,!!t)}function Be(){return Er(vr)||No}function $r(t){_r(vr,t)}function Ge(t){return Er(`${Sr}${t}`)}function Cr(t,e){_r(`${Sr}${t}`,e)}function xe(t){return Ge(t)||Be()}function Ve(){return rt||(rt=document.createElement("div"),rt.className="lt-rest-timer",rt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,rt.querySelector("[data-rest-add]").addEventListener("click",()=>{Ft&&(Ft+=30*1e3,Fe())}),rt.querySelector("[data-rest-skip]").addEventListener("click",Dr),document.body.appendChild(rt),rt)}function Po(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function Fe(){let t=Ve(),e=Ft-Date.now();t.querySelector("[data-rest-time]").textContent=Po(e),e<=0&&Oo()}function Ke(){clearInterval(Oe),clearTimeout(Ue),Oe=null,Ue=null}function Ho(){try{Qt(),gt.state==="suspended"&&gt.resume();let t=gt.currentTime,e=gt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(gt.destination),[523.25,659.25].forEach((a,r)=>{let o=gt.createOscillator();o.type="sine",o.frequency.setValueAtTime(a,t+r*.12),o.connect(e),o.start(t+r*.12),o.stop(t+.75)})}catch{}}function Qt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;gt||=new t,gt.state==="suspended"&&gt.resume()}catch{}}function Oo(){Ke(),Ft=0;let t=Ve();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",Ho(),navigator.vibrate&&navigator.vibrate([120,70,120]),Ue=setTimeout(Dr,12e3)}function Dr(){Ke(),Ft=0,rt&&rt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function Ee({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=Ve();Ke(),Ft=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,Fe(),Oe=setInterval(Fe,250)}var Xe=[{id:"lift_set",label:"Lift set"},{id:"weekly_workout_days",label:"Weekly workout days"},{id:"weekly_workout_volume",label:"Weekly workout volume"},{id:"workout_session_volume",label:"Workout session volume"}],Uo=[.8,.9,.95];function Zt(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function Fo(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r)}function Bo(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setDate(e.getDate()-e.getDay()),D(e.toISOString())}function Tr(t,e=new Date){let a=Fo(Bo(e)),r=new Date(a);r.setDate(r.getDate()+7);let o=new Date(t);return o>=a&&o<r}function Bt(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function te(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function Z(t){return`${Math.round(Bt(t)*100)}%`}function Mr(t,e){let a=new Set(e?.liftIds||[]),r=new Map;for(let o of t){if(!a.has(o.lift_id))continue;let n=D(o.performed_at);r.set(n,(r.get(n)||0)+Number(o.weight)*Number(o.reps))}return r}function Go(t,e){let a=e.liftsById||new Map,r=e.workoutsById||new Map,o=e.activeSets||[],n=e.workoutHistorySets||o,i=t.lift_id?a.get(t.lift_id):null,g=t.workout_id?r.get(t.workout_id):null;if(t.type==="lift_set"){let h=o.filter(x=>x.lift_id===t.lift_id),s=Number(t.target_weight),d=Number(t.target_reps),m=B(s,d),y=null,u=0,k=null;for(let x of h){let _=Number(x.weight),A=Number(x.reps),R=B(_,A);R>u&&(u=R,y=x),_>=s&&A>=d&&(k=x)}let $=!!k,p=$?1:Bt(u/m);return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:i?.name||"Lift goal",progress:p,achieved:$,currentLabel:y?`Best: ${te(y.weight)} x ${y.reps}`:"No sets yet",targetLabel:`Goal: ${te(s)} x ${d}`,detail:k?`Hit with ${te(k.weight)} x ${k.reps}.`:`${Z(p)} there.`}}if(t.type==="weekly_workout_days"){let h=new Set;for(let u of n)Tr(u.performed_at)&&h.add(D(u.performed_at));let s=Number(t.target_value),d=h.size,m=d>=s,y=s>0?Bt(d/s):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"This week",progress:y,achieved:m,currentLabel:`${d} / ${te(s)} days`,targetLabel:d+1===s?"One more workout gets it.":`Goal: ${te(s)} days`,detail:m?"Weekly goal hit.":`${Z(y)} there.`}}if(t.type==="weekly_workout_volume"){let h=Mr(o.filter(u=>Tr(u.performed_at)),g),s=Array.from(h.values()).reduce((u,k)=>u+k,0),d=Number(t.target_value),m=s>=d,y=d>0?Bt(s/d):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:g?.name||"Workout volume",progress:y,achieved:m,currentLabel:`${Math.round(s)} / ${Math.round(d)} ${t.unit||"lb"}`,targetLabel:"This week",detail:m?"Weekly volume goal hit.":`${Z(y)} there.`}}if(t.type==="workout_session_volume"){let h=Mr(o,g),s=Math.max(0,...Array.from(h.values())),d=Number(t.target_value),m=s>=d,y=d>0?Bt(s/d):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:g?.name||"Workout session",progress:y,achieved:m,currentLabel:`Best: ${Math.round(s)} ${t.unit||"lb"}`,targetLabel:`Goal: ${Math.round(d)} ${t.unit||"lb"}`,detail:m?"Session volume goal hit.":`${Z(y)} there.`}}return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"Unsupported goal",progress:0,achieved:!1,currentLabel:"",targetLabel:"",detail:""}}function qr(t,e){return t.filter(a=>a.deleted_at==null).map(a=>Go(a,e))}var Vo={"rank-private":t=>M(t.totalDays,1,"workout day"),"rank-pfc":t=>M(t.totalDays,2,"workout days"),"rank-corporal":t=>M(t.totalDays,3,"workout days"),"rank-sergeant":t=>M(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>M(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>M(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>M(t.totalDays,11,"workout days"),"rank-lieutenant":t=>M(t.totalDays,13,"workout days"),"rank-captain":t=>M(t.totalDays,15,"workout days"),"rank-major":t=>M(t.totalDays,18,"workout days"),"rank-colonel":t=>M(t.totalDays,22,"workout days"),"rank-general":t=>M(t.totalDays,27,"workout days"),"rank-prestige":t=>M(t.totalDays,33,"workout days"),"rank-prestige-master":t=>M(t.totalDays,40,"workout days"),"mastery-uav-1":t=>M(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>M(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>M(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>M(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>M(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>M(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>M(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>M(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>M(t.longestStreak,2,"weeks"),"streak-3":t=>M(t.longestStreak,3,"weeks"),"streak-4":t=>M(t.longestStreak,4,"weeks"),"streak-5":t=>M(t.longestStreak,5,"weeks"),"streak-6":t=>M(t.longestStreak,6,"weeks"),"streak-8":t=>M(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>Ye([M(t.totalDays,27,"workout days"),M(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>Ye([M(t.longestStreak,8,"week streak"),M(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>Ye([M(t.totalDays,40,"workout days"),M(t.tierCounts.chopper,3,"Choppers")])};function M(t,e,a){let r=Number(t)||0,o=Number(e)||1;return{current:r,target:o,progress:Bt(r/o),currentLabel:`${r} / ${o} ${a}`}}function Ye(t){return{...t.slice().sort((a,r)=>a.progress-r.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" · ")}}function Rr(t,e=null,a={}){let r=Ie(t,e,a);return Ht(t,e,a).filter(n=>n.track!=="secret").map(n=>{let i=Vo[n.id],g=i?i(r):{progress:n.unlocked?1:0,currentLabel:n.description};return{kind:"achievement",key:`achievement:${n.id}`,sourceKey:n.id,title:n.name,subtitle:n.track,progress:n.unlocked?1:g.progress,achieved:n.unlocked,currentLabel:g.currentLabel,targetLabel:n.description,detail:n.unlocked?"Achievement unlocked.":`${Z(g.progress)} there.`}})}function Wr({goalEvaluations:t=[],achievementItems:e=[],events:a=[]}={}){let r=a.slice().sort((n,i)=>new Date(i.created_at)-new Date(n.created_at))[0]||null,o=[...t,...e].filter(n=>!n.achieved&&n.progress>=.6).sort((n,i)=>i.progress-n.progress).slice(0,5);return{latest:r,closest:o}}function Ir(t,e=[]){let a=new Set(e.map(o=>je(o))),r=[];for(let o of t)if(o.kind==="goal"){for(let n of Uo)if(o.progress>=n&&!o.achieved){let i={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"close",threshold:n,title:o.title,message:`${o.title} is ${Z(o.progress)} there.`,metadata:{progress:o.progress}};a.has(je(i))||r.push(i)}if(o.achieved){let n={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"achieved",threshold:1,title:o.title,message:`Goal hit: ${o.title}.`,metadata:{progress:1}};a.has(je(n))||r.push(n)}}return r}function je(t){return t.goal_id?`goal:${t.goal_id}:${t.event_type}:${Number(t.threshold)||0}`:`achievement:${t.source_key}:${t.event_type}`}function _e(t){return String(t||"").trim().toLowerCase()}function Ko(t){let e=String(t||"").trim();return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function Ar(t){let e=Ko(t);return/^-?\d+(\.\d+)?$/.test(e)?Number(e):e==="true"?!0:e==="false"?!1:e}function Nr(t,{lifts:e=[],workouts:a=[]}={}){let r=[],o=null;for(let s of String(t||"").split(/\r?\n/)){let d=s.trim();if(!d||d.startsWith("#")||d==="goals:"||d.startsWith("goal_format:"))continue;if(d.startsWith("- ")){o&&r.push(o),o={};let y=d.slice(2).trim();if(y){let u=y.match(/^([^:]+):\s*(.*)$/);u&&(o[u[1].trim()]=Ar(u[2]))}continue}let m=d.match(/^([^:]+):\s*(.*)$/);m&&o&&(o[m[1].trim()]=Ar(m[2]))}o&&r.push(o);let n=new Map(e.map(s=>[_e(s.name),s])),i=new Map(a.map(s=>[_e(s.name),s])),g=[],h=[];return r.forEach((s,d)=>{let m=d+1,y=String(s.type||"").trim(),u={title:String(s.title||"").trim(),type:y,unit:String(s.unit||"lb").trim()||"lb",timeframe_weeks:Zt(s.timeframe_weeks),recurring:s.recurring===!0?"weekly":s.recurring||"none",metadata:{imported:!0}};if(u.title||h.push(`Goal ${m}: missing title.`),Xe.some(k=>k.id===y)||h.push(`Goal ${m}: unsupported type "${y}".`),y==="lift_set"){let k=n.get(_e(s.lift));k||h.push(`Goal ${m}: could not find lift "${s.lift||""}".`),u.lift_id=k?.id,u.target_weight=Zt(s.weight),u.target_reps=Zt(s.reps),u.target_weight==null&&h.push(`Goal ${m}: missing weight.`),u.target_reps==null&&h.push(`Goal ${m}: missing reps.`)}if(y==="weekly_workout_days"&&(u.target_value=Zt(s.target),u.recurring="weekly",u.target_value==null&&h.push(`Goal ${m}: missing target.`)),y==="weekly_workout_volume"||y==="workout_session_volume"){let k=i.get(_e(s.workout));k||h.push(`Goal ${m}: could not find workout "${s.workout||""}".`),u.workout_id=k?.id,u.target_value=Zt(s.target),y==="weekly_workout_volume"&&(u.recurring="weekly"),u.target_value==null&&h.push(`Goal ${m}: missing target.`)}g.push(u)}),{goals:h.length?[]:g,errors:h,rawGoals:r}}async function Ct(){let[t,e,a,r,o,n,i,g]=await Promise.all([J(),Nt(),le(),Wa(),Oa(),et(),se(),ie()]),h=t.length?await mt(t.map(s=>s.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:h,goals:r,events:o,bodyWeightEntries:n,userId:i,feedbackGiven:g,liftsById:new Map(t.map(s=>[s.id,s])),workoutsById:new Map(e.map(s=>[s.id,s]))}}function yt(t){let e=qr(t.goals,t),a=Rr(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),r=Wr({goalEvaluations:e,achievementItems:a,events:t.events});return{goalEvaluations:e,achievementItems:a,momentum:r}}async function qt({showToasts:t=!1}={}){let e=await Ct(),a=yt(e),r=Ir([...a.goalEvaluations,...a.achievementItems],e.events),o=await Ua(r);if(await Promise.all(a.goalEvaluations.filter(n=>n.achieved&&n.goal.status==="active"&&n.goal.recurring!=="weekly").map(n=>Pa(n.goal.id,{status:"achieved",achieved_at:new Date().toISOString()}))),t&&o.length>0){let n=o.find(h=>h.event_type==="achieved"),i=o.find(h=>h.event_type==="close"),g=n||i;g&&pr(g.message||g.title)}return{context:e,...a,createdEvents:o}}var Pr="lt-composite-expanded",ze="lt-header-menu-open",Hr="lt-momentum-expanded";async function Or(t){let{data:{session:e}}=await S.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
      <input type="text" name="name" placeholder="New lift name" required maxlength="60" autocomplete="off" />
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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,i=null;function g(f=!0){i&&(clearTimeout(i),i=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),f&&ht(ze,!1),i=setTimeout(()=>{o.hidden=!0,i=null},n)}function h({persist:f=!0,instant:b=!1}={}){i&&(clearTimeout(i),i=null),o.hidden=!1,b?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),f&&ht(ze,!0)}r.addEventListener("click",()=>{o.hidden?h():g()}),o.addEventListener("click",f=>{f.target.closest("button")&&g()}),$t(ze,!1)&&h({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",oe);let d=t.querySelector("[data-feedback-btn]");d&&d.addEventListener("click",()=>dr()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>S.auth.signOut());let y=t.querySelector("[data-composite-section]"),u=t.querySelector("[data-composite-toggle]"),k=t.querySelector("[data-composite-body]"),$=t.querySelector("[data-chevron]"),p=t.querySelector("[data-composite-summary]"),x=t.querySelector("[data-composite-discovery]"),_=t.querySelector("[data-momentum-toggle]"),A=t.querySelector("[data-momentum-body]"),R=t.querySelector("[data-momentum-summary]"),I=t.querySelector("[data-momentum-chevron]");function G(f){u.setAttribute("aria-expanded",String(f)),k.hidden=!f,$.innerHTML=f?"&#9650;":"&#9660;",y.classList.toggle("lt-stats-row-expanded",f)}G($t(Pr,!0)),u.addEventListener("click",()=>{if(dt(Q.composite),x.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Sa();return}let f=u.getAttribute("aria-expanded")==="true";G(!f),ht(Pr,!f)});function N(f){_.setAttribute("aria-expanded",String(f)),A.hidden=!f,I.innerHTML=f?"&#9650;":"&#9660;"}N($t(Hr,!1)),_.addEventListener("click",()=>{let f=_.getAttribute("aria-expanded")==="true";N(!f),ht(Hr,!f)});let K=t.querySelector("[data-killstreak-icon]"),V=t.querySelector("[data-killstreak-label]"),P=t.querySelector("[data-killstreak-sub]"),nt=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Ea);function X(f){let{days:b,tier:E}=ye(f);K.textContent=E?E.icon:"🎯",V.textContent=E?`${E.label} Killstreak`:"No Killstreak",P.textContent=`${b} Day streak`;let F=Ht(f).filter(O=>O.track==="rank"),W=we(F,Se()).length>0;nt.hidden=!W}let z=t.querySelector("[data-weight-card]");function v(){dt(Q.weight),va()}function l(f){gr(z,{onExpand:v,...f}).catch(b=>{console.error("[lift-tracker]",b),z.classList.remove("lt-stats-row-expanded"),z.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,z.querySelector("[data-weight-expand]").addEventListener("click",v)})}let c=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{dt(Q.history),c.hidden=!0,xa()});let w=t.querySelector("[data-add-lift-form]"),C=t.querySelector("[data-add-lift-toggle]"),T=t.querySelector("[data-add-lift-discovery]"),q=t.querySelector("[data-add-lift-hint]"),L=t.querySelector("[data-create-workout-btn]"),Y=t.querySelector("[data-create-workout-discovery]");C.addEventListener("click",()=>{let f=w.hidden;w.hidden=!f,C.setAttribute("aria-pressed",String(f)),C.classList.toggle("lt-add-lift-toggle-active",f),f&&w.querySelector('input[name="name"]').focus()});let H=t.querySelector("[data-lift-list]"),at=t.querySelector("[data-list-empty]");L.addEventListener("click",()=>{L.disabled||ba()});let Rt=t.querySelector("[data-workout-pills]"),co=t.querySelector("[data-workout-empty-hint]"),ut=[],st=Pe();function ra(){return st&&ut.find(f=>f.id===st)||null}function uo(){let f=ra();if(!f)return j;let b=new Set(f.liftIds);return j.filter(E=>b.has(E.id))}function oa(){Rt.innerHTML=ut.map(f=>{let b=f.id===st;return`
          <div class="lt-workout-pill-wrap${b?" lt-workout-pill-wrap-active":""}" data-reorder-item="${f.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${f.id}" aria-pressed="${b}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${f.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let f of ut){let b=Rt.querySelector(`[data-workout-pill="${f.id}"] [data-workout-pill-name]`);b&&(b.textContent=f.name)}Rt.querySelectorAll("[data-workout-pill]").forEach(f=>{f.addEventListener("click",()=>{let b=f.dataset.workoutPill;st=st===b?null:b,He(st),oa(),Me(Gt),la(Gt)})}),Rt.querySelectorAll("[data-workout-edit]").forEach(f=>{f.addEventListener("click",b=>{b.stopPropagation(),ka(f.dataset.workoutEdit)})})}let De="lt-fast-mode",na="lt-burst-mode";function po(){try{let f=window.localStorage.getItem(De);if(f!==null)return f==="true";let b=window.localStorage.getItem(na);return b!==null?(window.localStorage.setItem(De,b),window.localStorage.removeItem(na),b==="true"):!1}catch{return!1}}function mo(f){try{window.localStorage.setItem(De,String(f))}catch{}}let j=[],bt=po(),kt=new Map,Gt=[],ae=t.querySelector("[data-mode-toggle]");function sa(){ae.textContent=bt?"Normal":"Fast",ae.setAttribute("aria-pressed",String(bt)),ae.classList.toggle("lt-mode-toggle-active",bt)}sa(),ae.addEventListener("click",()=>{bt=!bt,mo(bt),sa(),Me(Gt)}),w.addEventListener("submit",async f=>{f.preventDefault();let b=w.querySelector('input[name="name"]'),E=b.value.trim();if(E){b.value="",b.disabled=!0;try{await It(E,j.length),await ia()}finally{b.disabled=!1,b.focus()}}}),Xt(H,{onReorder:async f=>{let b=[...f],E=new Set(f),F=j.map(W=>E.has(W.id)?b.shift():W.id);await Ca(F),j=F.map(W=>j.find(O=>O.id===W)).filter(Boolean)}}),Xt(Rt,{axis:"x",onReorder:async f=>{await Fa(f),ut=f.map(b=>ut.find(E=>E.id===b)).filter(Boolean)}});async function ia(){let f=await Ct();ut=f.workouts,st&&!ut.some(O=>O.id===st)&&(st=null,He(null)),oa(),j=f.lifts;let b=j.length>=2;if(T.hidden=j.length>=2,q.hidden=j.length!==1,L.disabled=!b,L.setAttribute("aria-disabled",String(!b)),Y.hidden=!b||ut.length>0,co.hidden=!b||ut.length>0,j.length===0){H.innerHTML="",at.hidden=!1,at.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",q.hidden=!0,y.hidden=!0,X(f.workoutHistorySets),ca(yt(f).momentum),l({showDiscovery:!1}),c.hidden=!0,x.hidden=!0,kt=new Map,Gt=[];return}let E=f.activeSets,F=E.length>0;X(f.workoutHistorySets),ca(yt(f).momentum),l({showDiscovery:F&&!ve(Q.weight)}),c.hidden=!F||ve(Q.history),kt=new Map(j.map(O=>[O.id,[]]));for(let O of E){let pt=kt.get(O.lift_id);pt&&pt.push(O)}let W=j.map(O=>({liftId:O.id,dailySeries:ft(kt.get(O.id)||[])}));Me(W),la(W)}function la(f){let b=ra(),E=b?f.filter(re=>b.liftIds.includes(re.liftId)):f,F=Pt(E);y.hidden=!1;let W=t.querySelector("[data-composite-canvas]"),O=t.querySelector("[data-composite-empty]"),pt=t.querySelector("[data-composite-scope]"),Wt=t.querySelector("[data-composite-blurb]");if(pt.textContent=b?`Measuring ${b.name}`:"Measuring all lifts",Wt.textContent=b?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",O.textContent=b?`Log a few sets for lifts in ${b.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",F.length===0){W.hidden=!0,O.hidden=!1,p.textContent="",x.hidden=!0;return}W.hidden=!1,O.hidden=!0,p.textContent=er(F[F.length-1].pct),x.hidden=ve(Q.composite),he(W,F)}function Te(f){let b=ft(kt.get(f)||[]),E=b[b.length-1];return E?`${Math.round(E.e1rm)} lb e1RM`:"No sets yet"}function fo(f){let b=kt.get(f)||[];return b.length===0?"":b[b.length-1].weight}function Me(f){Gt=f;let b=uo();at.hidden=b.length>0,at.textContent=st?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",H.innerHTML=b.map(E=>bt?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${E.id}" data-lift-id="${E.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${E.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Te(E.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Ae(E.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${E.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${fo(E.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${E.id}" data-lift-id="${E.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${E.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${Te(E.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Ae(E.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let E of j){let W=H.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");W&&(W.textContent=E.name)}H.querySelectorAll("[data-open-lift]").forEach(E=>{E.addEventListener("click",()=>wa(E.dataset.openLift))}),bt&&ho()}function ho(){H.querySelectorAll("[data-fast-log-form]").forEach(f=>{let b=f.dataset.fastLogForm;f.addEventListener("submit",async E=>{E.preventDefault();let F=f.querySelector("[data-fast-weight]"),W=f.querySelector("[data-fast-reps]"),O=f.querySelector("[data-fast-feedback]"),pt=Number(F.value),Wt=Number(W.value);if(!(pt>=0)||!Number.isFinite(pt)||!(Wt>0)||!Number.isInteger(Wt))return;let re=kt.get(b)||[],go=B(pt,Wt),da=ue(go,re),ua=new Date().toISOString();At()&&Qt();let yo=await it(b,pt,Wt,ua),wo=j.find(Kt=>Kt.id===b);At()&&Ee({seconds:xe(b),liftName:wo?.name||""});let pa=[...re,yo];kt.set(b,pa),W.value="",W.focus();let ma=H.querySelector(`[data-lift-id="${b}"]`)?.querySelector("[data-last-slot]");ma&&(ma.textContent=Te(b));let bo=D(ua),fa=lt(pa.filter(Kt=>D(Kt.performed_at)===bo));O.hidden=!1,O.classList.toggle("lt-pr",da),O.textContent=da?`PR! ${Math.round(fa)} lb today`:`Logged · ${Math.round(fa)} lb today`,qt({showToasts:!0}).catch(Kt=>console.error("[lift-tracker]",Kt))})})}function ca(f){let b=f.latest,E=f.closest||[],F=E[0];R.textContent=b?`Latest: ${b.title}`:F?`Closest: ${F.title} · ${Z(F.progress)}`:"No goals yet",A.innerHTML=`
      <div class="lt-momentum-grid">
        <section>
          <h3>Recently Achieved</h3>
          ${b?`
            <article class="lt-momentum-item lt-momentum-item-achieved">
              <span>${Vt(b.title)}</span>
              <small>${Vt(b.message||"Recently achieved.")}</small>
            </article>
          `:'<p class="lt-empty">New goal and achievement wins will show here.</p>'}
        </section>
        <section>
          <h3>Closest</h3>
          ${E.length?E.map(W=>`
            <article class="lt-momentum-item">
              <span>${Vt(W.title)}</span>
              <small>${Vt(W.currentLabel)} · ${Vt(W.detail)}</small>
              <span class="lt-goal-progress"><span style="width: ${Math.round(W.progress*100)}%"></span></span>
            </article>
          `).join(""):'<p class="lt-empty">Set goals or keep logging to surface close achievements.</p>'}
        </section>
      </div>
      <button type="button" class="lt-goal-secondary-btn" data-open-goals>View goals</button>
    `,A.querySelector("[data-open-goals]").addEventListener("click",Yt)}function Ae(f){return String(f).replace(/[&<>"']/g,b=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[b])}function Vt(f){return Ae(f)}await ia()}var Yo=2.5;function Le(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function jo(t){return Math.round(Number(t)*2)/2}function Xo(t){return t.slice().sort((e,a)=>new Date(e.performed_at)-new Date(a.performed_at))}function zo(t){return t.reduce((e,a)=>{if(!e)return a;let r=B(Number(e.weight),Number(e.reps));return B(Number(a.weight),Number(a.reps))>r?a:e},null)}function Jo(t){let e=new Map;for(let a of Xo(t)){let r=D(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>a[0].localeCompare(r[0]))}function Ur(t,{weightStep:e=Yo}={}){let a=Jo(t||[]),r=a[a.length-1];if(!r)return{baseline:null,context:null,options:[]};let[o,n]=r,i=a[a.length-2]||null,g=zo(n),h=Number(g.weight),s=Number(g.reps),d=jo(h+e),m=Math.max(1,s-2),y={date:o,latestVolume:lt(n),previousVolume:i?lt(i[1]):null,sessionSetCount:n.length};return{baseline:{weight:h,reps:s,e1rm:B(h,s),label:`${Le(h)} lb x ${s}`,date:o},context:y,options:[{id:"reps",label:"Add reps",title:`${Le(h)} lb x ${s+1}`,description:"Same weight, one more rep.",weight:h,reps:s+1},{id:"weight",label:"Add weight",title:`${Le(d)} lb x ${m}`,description:"A heavier set with a small rep drop.",weight:d,reps:m},{id:"volume",label:"Add volume",title:`Extra set: ${Le(h)} lb x ${s}`,description:"Repeat your best recent set to raise session volume.",weight:h,reps:s}]}}async function Fr(t,e){let a=await La(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",v=>{v.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let v=r.value.trim();if(!v||v===o){r.value=o;return}o=v,await $a(e,v)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Da(e),U(),Lt(`Deleted "${o}"`,{onUndo:async()=>{await Ta(e),ne()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(v=>{v.addEventListener("click",()=>{n.forEach(l=>l.setAttribute("aria-selected",String(l===v))),Object.entries(i).forEach(([l,c])=>{c.hidden=l!==v.dataset.tab}),v.dataset.tab==="details"&&X()})});let g=t.querySelector("[data-log-form]"),h=t.querySelector("[data-weight-input]"),s=t.querySelector("[data-reps-input]"),d=t.querySelector("[data-log-feedback]"),m=t.querySelector("[data-default-rest-input]"),y=t.querySelector("[data-lift-rest-input]"),u=t.querySelector("[data-rest-enabled-input]"),k=t.querySelector("[data-rest-enabled-label]"),$=t.querySelector("[data-default-rest-field]"),p=t.querySelector("[data-lift-rest-field]"),x=t.querySelector("[data-lift-goals]"),_=[];function A(){m.value=Be(),y.value=Ge(e)||"";let v=At();u.checked=v,k.textContent=v?"Rest timer: On":"Rest timer: Off",m.disabled=!v,y.disabled=!v,$.classList.toggle("lt-rest-setting-field-disabled",!v),p.classList.toggle("lt-rest-setting-field-disabled",!v)}function R(v){let l=Number(v.value);return v.value===""?null:!Number.isFinite(l)||l<15?15:l>600?600:Math.round(l)}m.addEventListener("change",()=>{let v=R(m)||120;$r(v),A()}),y.addEventListener("change",()=>{let v=R(y);Cr(e,v),A()}),u.addEventListener("change",()=>{Lr(u.checked),A()});async function I(){_=await Ma(e)}function G(){if(_.length===0)return;let v=_[_.length-1];h.value=v.weight}g.addEventListener("submit",async v=>{v.preventDefault();let l=Number(h.value),c=Number(s.value);if(!(l>=0)||!Number.isFinite(l)||!(c>0)||!Number.isInteger(c))return;let w=B(l,c),T=ue(w,_),q=new Date;At()&&Qt(),await it(e,l,c,q.toISOString()),At()&&Ee({seconds:xe(e),liftName:o}),s.value="",s.focus(),await I(),V(),i.details.hidden||X(),z().catch(H=>console.error("[lift-tracker]",H));let L=D(q.toISOString()),Y=lt(_.filter(H=>D(H.performed_at)===L));d.hidden=!1,d.classList.toggle("lt-pr",T),d.textContent=T?`New PR! Today's volume: ${Math.round(Y)} lb`:`Logged. Today's volume: ${Math.round(Y)} lb`,qt({showToasts:!0}).catch(H=>console.error("[lift-tracker]",H))});function N(v){let l=new Map;for(let c of v){let w=D(c.performed_at);l.has(w)||l.set(w,[]),l.get(w).push(c)}return Array.from(l.entries()).sort((c,w)=>w[0].localeCompare(c[0]))}function K(v){let[l,c,w]=v.split("-").map(Number);return new Date(l,c-1,w).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function V(){let v=i.history;if(_.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let l=N(_);v.innerHTML=l.map(([c,w])=>{let C=lt(w),q=w.slice().sort((L,Y)=>new Date(Y.performed_at)-new Date(L.performed_at)).map(L=>{let Y=Math.round(B(Number(L.weight),Number(L.reps)));return`
              <li class="lt-history-row" data-set-id="${L.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${L.id}">
                  <span class="lt-history-weight">${L.weight} lb &times; ${L.reps}</span>
                  <span class="lt-history-e1rm">${Y} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${K(c)}</span>
              <span class="lt-history-volume">${Math.round(C)} lb volume</span>
            </div>
            <ul class="lt-history-list">${q}</ul>
          </div>
        `}).join(""),v.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>nt(c.dataset.editTrigger))})}function P(v){return i.history.querySelector(`[data-set-id="${v}"]`)}function nt(v){let l=P(v),c=_.find(w=>w.id===v);!l||!c||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${c.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${c.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${D(c.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",V),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await qa(v),await I(),V(),i.details.hidden||X(),Lt("Set deleted",{onUndo:async()=>{await Ra(v),await I(),V(),i.details.hidden||X()}})}),l.querySelector("[data-edit-form]").addEventListener("submit",async w=>{w.preventDefault();let C=Number(l.querySelector("[data-edit-weight]").value),T=Number(l.querySelector("[data-edit-reps]").value),q=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!(T>0)||!q)return;let L=new Date(c.performed_at),[Y,H,at]=q.split("-").map(Number);L.setFullYear(Y,H-1,at),await Aa(v,{weight:C,reps:T,performed_at:L.toISOString()}),await I(),V(),i.details.hidden||X()}))}function X(){let v=i.details,l=ft(_);if(l.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>',ir();return}let c=Ur(_);v.innerHTML=`
      ${Qo(c)}
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `,v.querySelectorAll("[data-progression-option]").forEach(T=>{T.addEventListener("click",()=>{let q=c.options.find(L=>L.id===T.dataset.progressionOption);q&&(h.value=q.weight,s.value=q.reps,d.hidden=!0,g.scrollIntoView({behavior:"smooth",block:"start"}),s.focus())})});let w=v.querySelector("[data-lift-canvas]"),C=v.querySelector("[data-point-detail]");sr(w,l,{onPointClick:T=>{C.hidden=!1,C.textContent=`${K(T.date)}: ${T.weight} lb × ${T.reps} (${Math.round(T.e1rm)} e1RM)`}})}await I(),A(),G(),V(),await z();async function z(){let v=await Ct(),{goalEvaluations:l}=yt(v),c=l.filter(w=>w.goal.type==="lift_set"&&w.goal.lift_id===e).slice(0,3);if(c.length===0){x.innerHTML=`
        <button type="button" class="lt-lift-goals-empty" data-open-goals>
          Set a goal for this lift
        </button>
      `,x.querySelector("[data-open-goals]").addEventListener("click",Yt);return}x.innerHTML=`
      <div class="lt-lift-goals-header">
        <span>Goals</span>
        <button type="button" data-open-goals>Manage</button>
      </div>
      ${c.map(w=>`
        <article class="lt-lift-goal-row">
          <span>
            <strong>${wt(w.title)}</strong>
            <small>${wt(w.currentLabel)} · ${wt(w.targetLabel)}</small>
          </span>
          <em>${w.achieved?"Hit":Z(w.progress)}</em>
        </article>
      `).join("")}
    `,x.querySelector("[data-open-goals]").addEventListener("click",Yt)}}function Qo(t){if(!t.baseline)return"";let e=t.context.previousVolume==null?`${Math.round(t.context.latestVolume)} lb last session`:`${Math.round(t.context.latestVolume)} lb last session · ${Math.round(t.context.previousVolume)} lb previous`;return`
    <section class="lt-progression-card">
      <div class="lt-progression-header">
        <span>Progression Options</span>
        <small>Based on ${wt(t.baseline.label)}</small>
      </div>
      <p class="lt-progression-context">${wt(e)}</p>
      <div class="lt-progression-options">
        ${t.options.map(a=>`
          <button type="button" class="lt-progression-option" data-progression-option="${wt(a.id)}">
            <span>${wt(a.label)}</span>
            <strong>${wt(a.title)}</strong>
            <small>${wt(a.description)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `}function wt(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Br=60;function $e(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Br),e}function Dt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ee(t,e,a=new Date,r=`last ${Br} days`,o=[],n=[]){let i=D(a.toISOString()),g=[`Lift Tracker — ${r} (as of ${i})`,""],h=t.filter(s=>(e.get(s.id)||[]).length>0);if(h.length===0)g.push("No sets logged in this period."),g.push("");else{for(let d of h){let m=(e.get(d.id)||[]).slice().sort((k,$)=>new Date(k.performed_at)-new Date($.performed_at)),y=lt(m),u=Math.max(...m.map(k=>B(Number(k.weight),Number(k.reps))));g.push(d.name);for(let k of m){let $=Math.round(B(Number(k.weight),Number(k.reps)));g.push(`  ${D(k.performed_at)}: ${k.weight} lb x ${k.reps} (e1RM ${$})`)}g.push(`  Sets: ${m.length} | Volume: ${Math.round(y)} lb | Best e1RM: ${Math.round(u)}`),g.push("")}let s=t.length-h.length;s>0&&(g.push(`(${s} lift${s===1?"":"s"} with no sets in this period omitted)`),g.push(""))}if(o.length>0){g.push("Body weight");for(let u of o)g.push(`  ${u.date}: ${Dt(u.weight)} lb`);let s=o[0].weight,d=o[o.length-1].weight,m=d-s,y=m>0?"+":"";g.push(`  Start: ${Dt(s)} lb | Current: ${Dt(d)} lb | Change: ${y}${Dt(m)} lb`),g.push("")}if(n.length>0){g.push("Waist");for(let u of n)g.push(`  ${u.date}: ${Dt(u.waist)} in`);let s=n[0].waist,d=n[n.length-1].waist,m=d-s,y=m>0?"+":"";g.push(`  Start: ${Dt(s)} in | Current: ${Dt(d)} in | Change: ${y}${Dt(m)} in`),g.push("")}return g.join(`
`).trimEnd()}var Zo=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],tn=`
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
`;async function Gr(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Zo.map(u=>`
          <section class="lt-help-section">
            <h2>${u.title}</h2>
            <p>${u.body}</p>
          </section>
          ${u.title==="Export progress"?tn:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let k=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(k)),a.hidden=!k,r.innerHTML=k?"&#9650;":"&#9660;",!!k){e.disabled=!0;try{let $=await J(),p=$.map(P=>P.id),x=$e().toISOString(),_=await ce(p,x),A=new Map($.map(P=>[P.id,[]]));for(let P of _){let nt=A.get(P.lift_id);nt&&nt.push(P)}let I=(await et()).filter(P=>new Date(P.logged_at)>=new Date(x)),G=ct(I),K=(await Tt()).filter(P=>new Date(P.logged_at)>=new Date(x)),V=Mt(K);o.value=ee($,A,new Date,void 0,G,V),i.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}i.hidden=!1,i.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let g=t.querySelector("[data-full-export-toggle]"),h=t.querySelector("[data-full-export-body]"),s=t.querySelector("[data-full-export-chevron]"),d=t.querySelector("[data-full-export-textarea]"),m=t.querySelector("[data-full-export-copy]"),y=t.querySelector("[data-full-export-status]");g.addEventListener("click",async()=>{let k=!(g.getAttribute("aria-expanded")==="true");if(g.setAttribute("aria-expanded",String(k)),h.hidden=!k,s.innerHTML=k?"&#9650;":"&#9660;",!!k){g.disabled=!0;try{let $=await J(),p=$.map(N=>N.id),x=await mt(p),_=new Map($.map(N=>[N.id,[]]));for(let N of x){let K=_.get(N.lift_id);K&&K.push(N)}let A=await et(),R=ct(A),I=await Tt(),G=Mt(I);d.value=ee($,_,new Date,"all-time",R,G),y.hidden=!0}finally{g.disabled=!1}}}),m.addEventListener("click",async()=>{d.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(d.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}y.hidden=!1,y.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function Vr(t){dt(Q.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let[e,a]=await Promise.all([J(),Nt()]),r=kr(a),o=r?e.filter(u=>r.liftIds.includes(u.id)):e,n=o.length?await mt(o.map(u=>u.id)):[],i=new Map(o.map(u=>[u.id,[]]));for(let u of n){let k=i.get(u.lift_id);k&&k.push(u)}let g=o.map(u=>({liftId:u.id,dailySeries:ft(i.get(u.id)||[])})),h=Pt(g),s=t.querySelector("[data-composite-canvas]"),d=t.querySelector("[data-composite-empty]"),m=t.querySelector("[data-composite-scope]"),y=t.querySelector("[data-composite-blurb]");if(m.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",y.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",d.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",h.length===0){s.hidden=!0,d.hidden=!1;return}s.hidden=!1,d.hidden=!0,he(s,h)}function en(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function an(){let t=await J(),e=new Map(t.map(r=>[r.id,r.name]));return(await mt(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function rn(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,i])=>{let h=i.slice().sort((s,d)=>new Date(s.performed_at)-new Date(d.performed_at)).map(s=>{let d=Math.round(B(Number(s.weight),Number(s.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${s.weight} lb &times; ${s.reps}</span>
                <span class="lt-history-e1rm">${d} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${h}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${en(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function Kr(t){dt(Q.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),a=await an();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=ar(a);e.innerHTML=r.map(([o,n])=>rn(o,n)).join("")}var Yr="lt-theme",Je="default";function Qe(){return be(Yr,Je)}function jr(t){!t||t===Je?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function Xr(t){jr(t),ke(Yr,t||Je)}function zr(){jr(Qe())}var on={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},nn=["rank","mastery","streak","capstone","secret"],sn="Hidden until unlocked.";async function Jr(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await le(),a=await et(),r=await se(),o=await ie(),{days:n,tier:i}=ye(e);t.querySelector("[data-killstreak-current-icon]").textContent=i?i.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=i?`${i.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let g=We(e,r),h=t.querySelector("[data-killstreak-tier-list]");h.innerHTML=zt.map(p=>{let x=g[p.key];return`
      <li class="lt-killstreak-tier-row${i?.key===p.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${p.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${p.label}</span>
          <span class="lt-killstreak-tier-req">${p.days}+ day${p.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${x} earned</span>
      </li>
    `}).join("");let s=Ht(e,r,{bodyWeightEntries:a,hasSubmittedFeedback:o}),d=s.filter(p=>p.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${d} / ${s.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let m=s.filter(p=>p.track==="rank"),y=new Set(we(m,Se()));br(m.filter(p=>p.unlocked).map(p=>p.id));let u=t.querySelector("[data-achievements]");function k(p){if(p.track!=="rank"){let I=p.track==="secret"&&!p.unlocked,G=I?" lt-achievement-card-desc-hidden":"",N=I?sn:p.description,K=p.flavor&&!I?`<span class="lt-achievement-card-flavor">${p.flavor}</span>`:"";return`
        <li class="lt-achievement-card${p.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${p.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${p.name}</span>
            <span class="lt-achievement-card-desc${G}">${N}</span>
            ${K}
          </span>
        </li>
      `}let x=p.unlocked&&Qe()===p.theme.id,_=p.unlocked&&y.has(p.id),A=p.unlocked?`<span class="lt-achievement-card-theme">${p.theme.label} theme${x?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${p.theme.label}</span>`,R=_?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${p.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${_?" lt-achievement-card-new":""}${x?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${p.theme.id}"${p.unlocked?"":" disabled"} aria-label="${p.unlocked?`Apply the ${p.theme.label} theme`:`Locked: ${p.name}`}">
          <span class="lt-achievement-card-icon">${p.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${p.name}</span>
            <span class="lt-achievement-card-desc">${p.description}</span>
            ${A}
            ${R}
          </span>
        </button>
      </li>
    `}function $(){u.innerHTML=nn.map(p=>{let _=s.filter(A=>A.track===p).sort((A,R)=>Number(R.unlocked)-Number(A.unlocked)).map(k).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${on[p]}</h3>
          ${p==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${_}</ul>
        </section>
      `}).join("")}$(),u.addEventListener("click",p=>{let x=p.target.closest("[data-apply-theme]");!x||x.disabled||(Xr(x.dataset.applyTheme),$())})}var Ze=`goal_format: lift_tracker_goals_v1
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
    recurring: weekly`,Zr=`Analyze this Lift Tracker export and create 5-8 goals that are achievable in 3-4 weeks.
Use only Lift Tracker YAML format.
Allowed types: lift_set, weekly_workout_days, weekly_workout_volume, workout_session_volume.
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;async function to(t){let e=await Ct(),a=yt(e),r=[];function o(){let s=a.goalEvaluations.filter(m=>m.goal.status==="active"&&!m.achieved),d=a.goalEvaluations.filter(m=>m.goal.status==="achieved"||m.achieved);t.innerHTML=`
      <header class="lt-detail-header">
        <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
        <h1 class="lt-weight-view-title">Goals</h1>
      </header>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Active Goals</h2>
        <div data-active-goals>
          ${s.length?s.map(Qr).join(""):'<p class="lt-empty">No active goals yet. Add one below or paste a batch from an LLM.</p>'}
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
          <pre>${ot(Ze)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${ot(Zr)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${eo(Ze)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${d.length?d.map(Qr).join(""):'<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `,t.querySelector("[data-back]").addEventListener("click",U),t.querySelector("[data-help-export-link]").addEventListener("click",oe),g(),h(),t.querySelectorAll("[data-delete-goal]").forEach(m=>{m.addEventListener("click",async()=>{await Ha(m.dataset.deleteGoal),await n()})})}async function n(){e=await Ct(),a=yt(e),o()}function i(){return`
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${Xe.map(s=>`<option value="${s.id}">${s.label}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field lt-goal-title-field">
          <span>Title</span>
          <input type="text" name="title" maxlength="80" placeholder="Dumbbell Row 45 x 12" required />
        </label>
        <label class="lt-field" data-lift-field>
          <span>Lift</span>
          <select name="lift_id">
            ${e.lifts.map(s=>`<option value="${s.id}">${ot(s.name)}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field" data-workout-field hidden>
          <span>Workout</span>
          <select name="workout_id">
            ${e.workouts.map(s=>`<option value="${s.id}">${ot(s.name)}</option>`).join("")}
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
    `}function g(){let s=t.querySelector("[data-goal-form]"),d=t.querySelector("[data-goal-type]"),m=t.querySelector("[data-goal-feedback]");function y(){let u=d.value;t.querySelector("[data-lift-field]").hidden=u!=="lift_set",t.querySelector("[data-workout-field]").hidden=!["weekly_workout_volume","workout_session_volume"].includes(u),t.querySelector("[data-lift-set-fields]").hidden=u!=="lift_set",t.querySelector("[data-target-field]").hidden=u==="lift_set"}d.addEventListener("change",y),y(),s.addEventListener("submit",async u=>{u.preventDefault(),m.hidden=!0;let k=s.type.value,p={title:s.title.value.trim(),type:k,unit:"lb",timeframe_weeks:Ce(s.timeframe_weeks.value),recurring:k.startsWith("weekly_")?"weekly":"none",metadata:{}};k==="lift_set"?(p.lift_id=s.lift_id.value,p.target_weight=Ce(s.target_weight.value),p.target_reps=Ce(s.target_reps.value)):(p.target_value=Ce(s.target_value.value),k!=="weekly_workout_days"&&(p.workout_id=s.workout_id.value));let x=dn(p);if(x){m.hidden=!1,m.textContent=x;return}await Ia(p),await qt(),s.reset(),await n()})}function h(){let s=t.querySelector("[data-import-text]"),d=t.querySelector("[data-import-feedback]"),m=t.querySelector("[data-save-import]"),y=t.querySelector("[data-copy-goal-packet]"),u=t.querySelector("[data-goal-packet-output]"),k=t.querySelector("[data-goal-packet-status]");y.addEventListener("click",async()=>{let $=y.textContent;y.disabled=!0,y.textContent="Building...",k.hidden=!0;try{let p=await ln();u.value=p,u.hidden=!1;let x=await cn(p);k.hidden=!1,k.textContent=x?"Copied. Paste this into an LLM.":"Copy from the box below."}finally{y.disabled=!1,y.textContent=$}}),t.querySelector("[data-preview-import]").addEventListener("click",()=>{let $=Nr(s.value,{lifts:e.lifts,workouts:e.workouts});if(r=$.goals,$.errors.length){m.hidden=!0,d.innerHTML=`<div class="lt-goal-import-errors">${$.errors.map(p=>`<p>${ot(p)}</p>`).join("")}</div>`;return}m.hidden=r.length===0,d.innerHTML=r.length?`<ul class="lt-goal-preview-list">${r.map(p=>`<li>${ot(p.title)} <span>${ot(p.type)}</span></li>`).join("")}</ul>`:'<p class="lt-empty">No goals found in that text.</p>'}),m.addEventListener("click",async()=>{r.length!==0&&(await Na(r),await qt(),s.value="",r=[],await n())})}o()}async function ln(){let t=await J(),e=t.map(d=>d.id),a=$e().toISOString(),r=await ce(e,a),o=new Map(t.map(d=>[d.id,[]]));for(let d of r){let m=o.get(d.lift_id);m&&m.push(d)}let i=(await et()).filter(d=>new Date(d.logged_at)>=new Date(a)),h=(await Tt()).filter(d=>new Date(d.logged_at)>=new Date(a)),s=ee(t,o,new Date,void 0,ct(i),Mt(h));return["Use the Lift Tracker export below to create goals.","",Zr,"","Return only YAML in this exact format. Do not wrap it in markdown fences.","",Ze,"","Lift Tracker export:","",s].join(`
`)}async function cn(t){if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let a=document.execCommand("copy");return e.remove(),a}catch{return!1}}function Qr(t){let e=t.achieved||t.goal.status==="achieved";return`
    <article class="lt-goal-card${e?" lt-goal-card-achieved":""}">
      <div class="lt-goal-card-main">
        <span class="lt-goal-card-title">${ot(t.title)}</span>
        <span class="lt-goal-card-sub">${ot(t.currentLabel)} · ${ot(t.targetLabel)}</span>
        <span class="lt-goal-progress" aria-label="${Z(t.progress)} complete">
          <span style="width: ${Math.round(Math.min(t.progress,1)*100)}%"></span>
        </span>
      </div>
      <div class="lt-goal-card-side">
        <span>${e?"Hit":Z(t.progress)}</span>
        <button type="button" data-delete-goal="${t.goal.id}" aria-label="Delete ${eo(t.title)}">&times;</button>
      </div>
    </article>
  `}function dn(t){if(!t.title)return"Add a title.";if(t.type==="lift_set"){if(!t.lift_id)return"Choose a lift.";if(t.target_weight==null)return"Add a target weight.";if(t.target_reps==null)return"Add target reps."}else if(t.target_value==null)return"Add a target.";return(t.type==="weekly_workout_volume"||t.type==="workout_session_volume")&&!t.workout_id?"Choose a workout.":null}function Ce(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function ot(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function eo(t){return ot(t)}var ao="__divider__";async function ta(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([J(),r?Ba(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?ro(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let g=t.querySelector("[data-workout-name-input]"),h=t.querySelector("[data-workout-lift-list]"),s=t.querySelector("[data-workout-lifts-empty]"),d=t.querySelector("[data-save-workout]"),m=t.querySelector("[data-workout-save-feedback]");s.hidden=o.length>0;let y=o.filter(p=>i.has(p.id)),u=o.filter(p=>!i.has(p.id));h.innerHTML=[...y.map(k),$(),...u.map(k)].join("");for(let p of o){let _=h.querySelector(`[data-lift-id="${p.id}"]`)?.querySelector("[data-name-slot]");_&&(_.textContent=p.name)}Xt(h,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Va(a),U(),Lt(`Deleted "${n.name}"`,{onUndo:async()=>{await Ka(a),ne()}}))}),d.addEventListener("click",async()=>{let p=g.value.trim();if(!p){g.focus();return}let x=Array.from(h.querySelectorAll("[data-reorder-item]")),_=x.findIndex(R=>R.dataset.reorderItem===ao),A=x.slice(0,_).map(R=>R.dataset.reorderItem);d.disabled=!0,m.hidden=!0;try{if(r)await Ga(a,p,A);else{let R=await Nt();await de(p,A,R.length)}U()}catch(R){console.error("[lift-tracker]",R),m.hidden=!1,m.textContent="Something went wrong saving the workout.",d.disabled=!1}});function k(p){return`
      <li class="lt-lift-row" data-reorder-item="${p.id}" data-lift-id="${p.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${ro(p.name)}">&#8942;&#8942;</button>
      </li>
    `}function $(){return`
      <li class="lt-workout-divider" data-reorder-item="${ao}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function ro(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var un=`${window.location.origin}${window.location.pathname}`;function pn(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ea(t){let e="signin";function a(o,n,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${pn(i||"")}">

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
    `}function r(o,n,i){t.innerHTML=a(o,n,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let g=t.querySelector("[data-auth-form]");g.addEventListener("submit",async h=>{h.preventDefault();let s=g.email.value.trim(),d=g.password.value,m=g.querySelector('button[type="submit"]');m.disabled=!0,m.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:y,error:u}=e==="signup"?await S.auth.signUp({email:s,password:d,options:{emailRedirectTo:un}}):await S.auth.signInWithPassword({email:s,password:d});if(u)throw u;if(e==="signup"&&!y.session){e="signin",r(null,`Account created. Check ${s} for a confirmation link, then sign in here.`,s);return}}catch(y){r(y.message||"Something went wrong. Try again.",null,s)}})}r()}function oo(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function no(){let{data:t,error:e}=await S.auth.signInAnonymously();if(e)throw e;return await mn(),t}async function mn(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([It("Bench Press",0),It("Squat",1),It("Deadlift",2)]);await Promise.all([it(e.id,135,8,t(6)),it(e.id,145,6,t(2)),it(a.id,185,5,t(5)),it(a.id,195,5,t(1)),it(r.id,225,5,t(3))]),await de("Full Body",[e.id,a.id,r.id],0)}var tt=document.getElementById("lift-tracker-app");zr();var so=0;async function aa(){let t=++so,e=()=>t!==so;try{let{data:{session:a}}=await S.auth.getSession();if(e())return;if(!a)if(oo())try{if(await no(),e())return}catch(o){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",o),await ea(tt);return}else return await ea(tt),e(),void 0;let r=ya();if(r.name==="detail"?await Fr(tt,r.liftId):r.name==="help"?await Gr(tt):r.name==="weight"?await yr(tt):r.name==="composite"?await Vr(tt):r.name==="history"?await Kr(tt):r.name==="killstreak"?await Jr(tt):r.name==="goals"?await to(tt):r.name==="workout-new"?await ta(tt,{mode:"create"}):r.name==="workout-edit"?await ta(tt,{mode:"edit",workoutId:r.workoutId}):await Or(tt),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),tt.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",aa);var io=null,lo=!1;S.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!lo;lo=!0;let o=a!==io;io=a,!(r||!o)&&(U(),aa())});aa();

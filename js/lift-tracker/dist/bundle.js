import{createClient as To}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var va="https://mqfsgammpsumpltfutwl.supabase.co",Sa="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var x=To(va,Sa);function xa(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="goals"?{name:"goals"}:{name:"list"}}function O(){window.location.hash="#/"}function Ea(t){window.location.hash=`#/lift/${t}`}function La(){window.location.hash="#/workout/new"}function _a(t){window.location.hash=`#/workout/${t}/edit`}function de(){window.location.hash="#/help"}function $a(){window.location.hash="#/weight"}function Ca(){window.location.hash="#/composite"}function Da(){window.location.hash="#/history"}function Ta(){window.location.hash="#/killstreak"}function zt(){window.location.hash="#/goals"}function ue(){window.dispatchEvent(new Event("hashchange"))}async function pe(){let{data:t,error:e}=await x.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Ma(){let{error:t}=await x.from("feedback_submissions").insert({});if(t)throw t}async function me(){let{count:t,error:e}=await x.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function Q(){let{data:t,error:e}=await x.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Mo(){let{data:t,error:e}=await x.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function qa(t){let{data:e,error:a}=await x.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function Nt(t,e,a={}){let{data:r,error:o}=await x.from("lifts").insert({...a,name:t,sort_order:e}).select().single();if(o)throw o;return r}async function Aa(t,e){let{data:a,error:r}=await x.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Ra(t){let e=t.map((o,s)=>x.from("lifts").update({sort_order:s}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Wa(t){let{error:e}=await x.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ia(t){let{error:e}=await x.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Pa(t){let{data:e,error:a}=await x.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ft(t){if(!t||t.length===0)return[];let{data:e,error:a}=await x.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function fe(){let t=await Mo();return ft(t)}async function he(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await x.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function it(t,e,a,r){let{data:o,error:s}=await x.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(s)throw s;return o}async function Na(t,e){let{data:a,error:r}=await x.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ua(t){let{error:e}=await x.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ha(t){let{error:e}=await x.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Oa(){let{data:t,error:e}=await x.from("goals").select("*").is("deleted_at",null).order("created_at",{ascending:!0});if(e)throw e;return t}async function Fa(t){let{data:e,error:a}=await x.from("goals").insert(t).select().single();if(a)throw a;return e}async function Ba(t){if(!t||t.length===0)return[];let{data:e,error:a}=await x.from("goals").insert(t).select();if(a)throw a;return e}async function Ga(t,e){let{data:a,error:r}=await x.from("goals").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Va(t){let{error:e}=await x.from("goals").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ka(){let{data:t,error:e}=await x.from("goal_events").select("*").order("created_at",{ascending:!1}).limit(100);if(e)throw e;return t}async function qo(t){let{data:e,error:a}=await x.from("goal_events").insert(t).select().single();if(a){if(a.code==="23505")return null;throw a}return e}async function Ya(t){let e=[];for(let a of t){let r=await qo(a);r&&e.push(r)}return e}async function Ut(){let{data:t,error:e}=await x.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function ja(t){let e=t.map((o,s)=>x.from("workouts").update({sort_order:s}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Xa(t){let{data:e,error:a}=await x.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function ge(t,e,a){let{data:r,error:o}=await x.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:s}=await x.from("workout_lifts").insert(e.map(i=>({workout_id:r.id,lift_id:i})));if(s)throw s}return r}async function za(t,e,a){let{error:r}=await x.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await x.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:s}=await x.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(s)throw s}}async function Ja(t){let{error:e}=await x.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Qa(t){let{error:e}=await x.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function at(){let{data:t,error:e}=await x.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Za(t,e){let{data:a,error:r}=await x.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function tr(t,e){let{data:a,error:r}=await x.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function er(t){let{error:e}=await x.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ar(t){let{error:e}=await x.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function At(){let{data:t,error:e}=await x.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function rr(t,e){let{data:a,error:r}=await x.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function or(t,e){let{data:a,error:r}=await x.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function sr(t){let{error:e}=await x.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function nr(t){let{error:e}=await x.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function G(t,e){return t*(1+e/30)}function T(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function ht(t){let e=new Map;for(let a of t){let r=T(a.performed_at),o=G(Number(a.weight),Number(a.reps)),s=e.get(r);(!s||o>s.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Ht(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let r=new Set;for(let i of e)for(let g of i.dailySeries)r.add(g.date);let o=Array.from(r).sort(),s=[];for(let i of o){let g=0,h=0;for(let n of e){let d=null;for(let f of n.dailySeries)if(f.date<=i)d=f;else break;d&&(g+=d.e1rm/a.get(n.liftId),h+=1)}if(h>0){let n=g/h;s.push({date:i,ratio:n,pct:(n-1)*100})}}return s}function ye(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>G(Number(r.weight),Number(r.reps))));return t>a}function lt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function ir(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function lr(t){let e=new Map;for(let a of t){let r=T(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function ct(t){let e=new Map;for(let a of t){let r=T(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function cr(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Rt(t){let e=new Map;for(let a of t){let r=T(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var Jt=null,St=null,xt=null,Et=null,ke=14,we="#e8242c",dr="rgba(232, 36, 44, 0.18)",be="#f2b134",ur="rgba(242, 177, 52, 0.16)",Lt="#9a9ca6",_t="rgba(255, 255, 255, 0.08)";function ve(t,e,{onPointClick:a}={}){Jt&&(Jt.destroy(),Jt=null);let r=e.map(s=>s.date),o=e.map(s=>Math.round(s.pct*10)/10);return Jt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:we,backgroundColor:dr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:we,pointHitRadius:ke}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Lt},grid:{color:_t}},y:{ticks:{color:Lt,callback:s=>`${s>0?"+":""}${s}%`},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(s,i)=>{i.length&&a&&a(e[i[0].index])}}}),Jt}function pr(t,e,{onPointClick:a}={}){St&&(St.destroy(),St=null);let r=e.map(s=>s.date),o=e.map(s=>Math.round(s.e1rm*10)/10);return St=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:be,backgroundColor:ur,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:be,pointHitRadius:ke}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Lt},grid:{color:_t}},y:{ticks:{color:Lt},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(s,i)=>{i.length&&a&&a(e[i[0].index])}}}),St}function mr(){St&&(St.destroy(),St=null)}function Ue(t,e,{onPointClick:a}={}){xt&&(xt.destroy(),xt=null);let r=e.map(s=>s.date),o=e.map(s=>Math.round(s.weight*10)/10);return xt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:we,backgroundColor:dr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:we,pointHitRadius:ke}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Lt},grid:{color:_t}},y:{ticks:{color:Lt},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(s,i)=>{i.length&&a&&a(e[i[0].index])}}}),xt}function He(){xt&&(xt.destroy(),xt=null)}function fr(t,e,{onPointClick:a}={}){Et&&(Et.destroy(),Et=null);let r=e.map(s=>s.date),o=e.map(s=>Math.round(s.waist*10)/10);return Et=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:be,backgroundColor:ur,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:be,pointHitRadius:ke}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Lt},grid:{color:_t}},y:{ticks:{color:Lt},grid:{color:_t}}},plugins:{legend:{display:!1}},onClick:(s,i)=>{i.length&&a&&a(e[i[0].index])}}}),Et}function hr(){Et&&(Et.destroy(),Et=null)}function Qt(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,s=0,i=0,g=0,h=0,n=0,d=null,f=null,y=null,u=0,k=0,$=null,m=null;function E(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function L(l){let c=l.target.closest(".lt-drag-handle");if(!c)return;let b=c.closest("[data-reorder-item]");if(b){if(l.pointerType!=="touch"){l.preventDefault(),P(b,l.clientX,l.clientY);return}if(c.setPointerCapture)try{c.setPointerCapture(l.pointerId),$=c,m=l.pointerId}catch{}y=b,u=l.clientX,k=l.clientY,document.addEventListener("pointermove",I),document.addEventListener("pointerup",V),f=setTimeout(()=>{clearTimeout(f),f=null;let C=y,A=u,D=k;R(),P(C,A,D)},180)}}function q(){if($&&m!==null&&$.releasePointerCapture)try{$.releasePointerCapture(m)}catch{}$=null,m=null}function R(){clearTimeout(f),f=null,y=null,document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",V)}function I(l){if(!y)return;let c=l.clientX-u,b=l.clientY-k;Math.hypot(c,b)<=10||(R(),q())}function V(){R(),q()}function P(l,c,b){r=l,s=c,i=b,n=b;let C=l.getBoundingClientRect();h=C.top,g=C.left,o=document.createElement(l.tagName),o.className="lt-reorder-placeholder",o.style.height=`${l.offsetHeight}px`,o.style.width=`${l.offsetWidth}px`,l.after(o),l.classList.add("lt-dragging"),l.style.position="fixed",l.style.left=`${C.left}px`,l.style.width=`${C.width}px`,l.style.top=`${h}px`,l.style.zIndex="1000",document.addEventListener("pointermove",J),document.addEventListener("pointerup",v)}function Y(){let l=E().filter(C=>C!==r),c=r.getBoundingClientRect(),b=null;if(a==="x"){let C=c.left+c.width/2,A=c.top+c.height/2;for(let D of l){let _=D.getBoundingClientRect(),F=_.left+_.width/2,B=_.top+_.height/2;if(Math.abs(B-A)<_.height/2?C<F:A<B){b=D;break}}}else{let C=c.top+c.height/2;for(let A of l){let D=A.getBoundingClientRect(),_=D.top+D.height/2;if(C<_){b=A;break}}}b?t.insertBefore(o,b):t.appendChild(o)}function K(){let l=n,c=window.innerHeight-n;return l<80?-16*(1-l/80):c<80?16*(1-c/80):0}function N(){if(!r){d=null;return}let l=K();if(l===0){d=null;return}window.scrollBy(0,l),Y(),d=requestAnimationFrame(N)}function st(){d===null&&K()!==0&&(d=requestAnimationFrame(N))}function z(){d!==null&&(cancelAnimationFrame(d),d=null)}function J(l){if(r){if(l.preventDefault(),n=l.clientY,a==="x"){let c=l.clientX-s,b=l.clientY-i;r.style.left=`${g+c}px`,r.style.top=`${h+b}px`}else{let c=l.clientY-i;r.style.top=`${h+c}px`}Y(),a==="y"&&st()}}function v(){if(!r)return;z(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",J),document.removeEventListener("pointerup",v),q();let l=E().map(c=>c.dataset.reorderItem);r=null,o=null,e&&e(l)}t.addEventListener("pointerdown",L)}var Ao="joshuaegage@gmail.com";function gr(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function o(){if(r)return;r=!0,document.removeEventListener("keydown",s),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let i=document.scrollingElement;i&&(i.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function s(i){i.key==="Escape"&&o()}e.addEventListener("click",i=>{i.target===e&&o()}),document.addEventListener("keydown",s),e.querySelector("[data-feedback-cancel]").addEventListener("click",o),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let i=a.value.trim(),g=encodeURIComponent("Lift Tracker feedback"),h=encodeURIComponent(i||"(no message entered)");Ma().catch(()=>{}),window.location.href=`mailto:${Ao}?subject=${g}&body=${h}`,o()})}var Zt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Se(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Ro(t,e=new Date){let a=Se(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let s of t){let i=new Date(s.performed_at);i>=a&&i<r&&o.add(T(s.performed_at))}return o.size}function Wo(t){let e=null;for(let a of Zt)t>=a.days&&(e=a);return e}function xe(t,e=new Date){let a=Ro(t,e);return{days:a,tier:Wo(a)}}function Oe(t,e=null){let a=new Map;for(let o of t){let i=Se(new Date(o.performed_at)).getTime();a.has(i)||a.set(i,new Set),a.get(i).add(T(o.performed_at))}let r={};for(let o of Zt)r[o.key]=0;for(let o of a.values())for(let s of Zt)o.size>=s.days&&(r[s.key]+=1);return r}function Io(t){let e=new Set;for(let a of t)e.add(T(a.performed_at));return e.size}function Po(t){let e=new Set;for(let a of t)e.add(Se(new Date(a.performed_at)).getTime());return e.size}function No(t){let e=new Set;for(let s of t)e.add(Se(new Date(s.performed_at)).getTime());let a=Array.from(e).sort((s,i)=>s-i);if(a.length===0)return 0;let r=1,o=1;for(let s=1;s<a.length;s++){let i=new Date(a[s-1]);i.setDate(i.getDate()+7),o=i.getTime()===a[s]?o+1:1,o>r&&(r=o)}return r}function Uo(t){let e=new Set;for(let s of t)e.add(T(s.performed_at));let a=Array.from(e).sort().map(s=>{let[i,g,h]=s.split("-").map(Number);return new Date(i,g-1,h)});if(a.length===0)return 0;let r=1,o=1;for(let s=1;s<a.length;s++){let i=new Date(a[s-1]);i.setDate(i.getDate()+1),o=i.getTime()===a[s].getTime()?o+1:1,o>r&&(r=o)}return r}function Ho(t){let e=new Map;for(let r of t)r.lift_id&&(e.has(r.lift_id)||e.set(r.lift_id,[]),e.get(r.lift_id).push(r));let a=Ht(Array.from(e.entries()).map(([r,o])=>({liftId:r,dailySeries:ht(o)})));return a.length?Math.max(...a.map(r=>r.pct)):0}function Oo(t){let e=ct(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,r=0,o=0;for(let s of e){let i=s.weight-a;r=Math.max(r,i),o=Math.max(o,-i)}return{gain:r,loss:o}}function Fe(t,e=null,a={}){let{bodyWeightEntries:r=[],hasSubmittedFeedback:o=!1}=a,s=Oo(r);return{totalDays:Io(t),totalWeeks:Po(t),tierCounts:Oe(t,e),longestStreak:No(t),totalSets:t.length,longestDayStreak:Uo(t),compositeMaxPct:Ho(t),bodyWeightGain:s.gain,bodyWeightLoss:s.loss,hasSubmittedFeedback:o||Bo(e)}}var Fo=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function Bo(t){return t!=null&&Fo.has(t)}var Go=50,Vo=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=Go&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function Ot(t,e=null,a={}){let r=Fe(t,e,a);return Vo.map(o=>({id:o.id,name:o.name,track:o.track,description:o.description,flavor:o.flavor??null,theme:o.theme??null,unlocked:o.isUnlocked(r)}))}function Ee(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Ft=null,te=null;function yr(){return Ft||(Ft=document.createElement("div"),Ft.className="lt-toast",document.body.appendChild(Ft),Ft)}function $t(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=yr();clearTimeout(te),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let s=o.querySelector(".lt-toast-undo"),i=()=>o.classList.remove("lt-toast-visible");s.addEventListener("click",()=>{clearTimeout(te),i(),e&&e()},{once:!0}),te=setTimeout(()=>{i(),a&&a()},r)}function wr(t,{durationMs:e=4500}={}){let a=yr();clearTimeout(te),a.innerHTML='<span class="lt-toast-message"></span>',a.querySelector(".lt-toast-message").textContent=t,a.classList.add("lt-toast-visible"),te=setTimeout(()=>{a.classList.remove("lt-toast-visible")},e)}function Ct(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function gt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Le(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function _e(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var br="lt-discovery-seen-",Z={weight:"weight",history:"history",composite:"composite"};function $e(t){try{return window.localStorage.getItem(`${br}${t}`)==="true"}catch{return!1}}function dt(t){try{window.localStorage.setItem(`${br}${t}`,"true")}catch{}}var kr="lt-weight-card-expanded";function Bt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Ko(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function vr(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Sr(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await at(),o=ct(r),s=cr(o),i=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!s){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${i}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let g=s.change<0?"↘":s.change>0?"↗":"→",h=Ct(kr,!1);function n(){t.classList.toggle("lt-stats-row-expanded",h),h?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${Bt(s.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Ko(s.currentDate)})</span>
              <span class="lt-weight-stat-value">${Bt(s.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${g} ${Bt(Math.abs(s.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${Bt(s.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}h=!h,gt(kr,h),n()}),h?Ue(t.querySelector("[data-home-weight-canvas]"),o):He()}n()}async function xr(t){dt(Z.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(l=>{l.addEventListener("click",()=>{l.dataset.tab!==r&&(r=l.dataset.tab,e.forEach(c=>c.setAttribute("aria-selected",String(c===l))),Object.entries(a).forEach(([c,b])=>{b.hidden=c!==r}),r==="weight"?u():st().catch(c=>console.error("[lift-tracker]",c)))})});let o=t.querySelector("[data-weight-form]"),s=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),g=t.querySelector("[data-weight-chart-section]"),h=t.querySelector("[data-weight-canvas]"),n=t.querySelector("[data-weight-empty]"),d=t.querySelector("[data-weight-history]");s.value=T(new Date().toISOString());let f=[];async function y(){f=await at(),k(),u()}function u(){let l=ct(f);if(l.length===0){g.hidden=!0,n.hidden=!1,He();return}g.hidden=!1,n.hidden=!0,a.weight.hidden||Ue(h,l)}function k(){if(f.length===0){d.innerHTML="";return}let l=f.slice().sort((c,b)=>new Date(b.logged_at)-new Date(c.logged_at));d.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Bt(Number(c.weight))} lb</span>
              <span class="lt-history-e1rm">${vr(T(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),d.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>$(c.dataset.editTrigger))})}function $(l){let c=d.querySelector(`[data-entry-id="${l}"]`),b=f.find(C=>C.id===l);!c||!b||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${b.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${T(b.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",k),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await er(l),await y(),$t("Weight entry deleted",{onUndo:async()=>{await ar(l),await y()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let A=Number(c.querySelector("[data-edit-weight]").value),D=c.querySelector("[data-edit-date]").value;if(!(A>=0)||!D)return;let _=new Date(b.logged_at),[F,B,bt]=D.split("-").map(Number);_.setFullYear(F,B-1,bt),await tr(l,{weight:A,logged_at:_.toISOString()}),await y()}))}o.addEventListener("submit",async l=>{l.preventDefault();let c=Number(i.value),b=s.value;if(!(c>=0)||!Number.isFinite(c)||!b)return;let[C,A,D]=b.split("-").map(Number),_=new Date;_.setFullYear(C,A-1,D),await Za(c,_.toISOString()),i.value="",i.focus(),s.value=T(new Date().toISOString()),await y()});let m=t.querySelector("[data-waist-form]"),E=t.querySelector("[data-waist-date-input]"),L=t.querySelector("[data-waist-input]"),q=t.querySelector("[data-waist-chart-section]"),R=t.querySelector("[data-waist-canvas]"),I=t.querySelector("[data-waist-empty]"),V=t.querySelector("[data-waist-history]");E.value=T(new Date().toISOString());let P=[],Y=!1,K=null;async function N(){P=await At(),Y=!0,J(),z()}async function st(){if(Y){z();return}K||(I.hidden=!1,I.textContent="Loading waist...",q.hidden=!0,K=N().finally(()=>{K=null})),await K}function z(){let l=Rt(P);if(l.length===0){q.hidden=!0,I.hidden=!1,I.textContent="No waist measurements yet — add your first one above.",hr();return}q.hidden=!1,I.hidden=!0,a.waist.hidden||fr(R,l)}function J(){if(P.length===0){V.innerHTML="";return}let l=P.slice().sort((c,b)=>new Date(b.logged_at)-new Date(c.logged_at));V.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Bt(Number(c.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${vr(T(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),V.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>v(c.dataset.editTrigger))})}function v(l){let c=V.querySelector(`[data-entry-id="${l}"]`),b=P.find(C=>C.id===l);!c||!b||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${b.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${T(b.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",J),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await sr(l),await N(),$t("Waist measurement deleted",{onUndo:async()=>{await nr(l),await N()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let A=Number(c.querySelector("[data-edit-waist]").value),D=c.querySelector("[data-edit-date]").value;if(!(A>=0)||!D)return;let _=new Date(b.logged_at),[F,B,bt]=D.split("-").map(Number);_.setFullYear(F,B-1,bt),await or(l,{waist_circumference:A,logged_at:_.toISOString()}),await N()}))}m.addEventListener("submit",async l=>{l.preventDefault();let c=Number(L.value),b=E.value;if(!(c>=0)||!Number.isFinite(c)||!b)return;let[C,A,D]=b.split("-").map(Number),_=new Date;_.setFullYear(C,A-1,D),await rr(c,_.toISOString()),L.value="",L.focus(),E.value=T(new Date().toISOString()),await N()}),await y()}var Er="lt-seen-rank-achievements";function Ce(){let t=Le(Er,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Lr(t){_e(Er,JSON.stringify(t))}var Be="lt-active-workout";function Ge(){try{return window.localStorage.getItem(Be)||null}catch{return null}}function Ve(t){try{t?window.localStorage.setItem(Be,t):window.localStorage.removeItem(Be)}catch{}}function _r(t){let e=Ge();return e&&t.find(a=>a.id===e)||null}var Yo=120,$r="lt-default-rest-seconds",Cr="lt-lift-rest-seconds-",Dr="lt-rest-timer-enabled",rt=null,Ke=null,Ye=null,Gt=0,yt=null;function Tr(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Mr(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function Wt(){return Ct(Dr,!1)}function qr(t){gt(Dr,!!t)}function Xe(){return Tr($r)||Yo}function Ar(t){Mr($r,t)}function ze(t){return Tr(`${Cr}${t}`)}function Rr(t,e){Mr(`${Cr}${t}`,e)}function De(t){return ze(t)||Xe()}function Je(){return rt||(rt=document.createElement("div"),rt.className="lt-rest-timer",rt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,rt.querySelector("[data-rest-add]").addEventListener("click",()=>{Gt&&(Gt+=30*1e3,je())}),rt.querySelector("[data-rest-skip]").addEventListener("click",Wr),document.body.appendChild(rt),rt)}function jo(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function je(){let t=Je(),e=Gt-Date.now();t.querySelector("[data-rest-time]").textContent=jo(e),e<=0&&zo()}function Qe(){clearInterval(Ke),clearTimeout(Ye),Ke=null,Ye=null}function Xo(){try{ee(),yt.state==="suspended"&&yt.resume();let t=yt.currentTime,e=yt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(yt.destination),[523.25,659.25].forEach((a,r)=>{let o=yt.createOscillator();o.type="sine",o.frequency.setValueAtTime(a,t+r*.12),o.connect(e),o.start(t+r*.12),o.stop(t+.75)})}catch{}}function ee(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;yt||=new t,yt.state==="suspended"&&yt.resume()}catch{}}function zo(){Qe(),Gt=0;let t=Je();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",Xo(),navigator.vibrate&&navigator.vibrate([120,70,120]),Ye=setTimeout(Wr,12e3)}function Wr(){Qe(),Gt=0,rt&&rt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function Te({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=Je();Qe(),Gt=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,je(),Ke=setInterval(je,250)}var ea=[{id:"lift_set",label:"Lift set"},{id:"weekly_workout_days",label:"Weekly workout days"},{id:"weekly_workout_volume",label:"Weekly workout volume"},{id:"workout_session_volume",label:"Workout session volume"}],Jo=[.8,.9,.95];function ae(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function Qo(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r)}function Zo(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setDate(e.getDate()-e.getDay()),T(e.toISOString())}function Ir(t,e=new Date){let a=Qo(Zo(e)),r=new Date(a);r.setDate(r.getDate()+7);let o=new Date(t);return o>=a&&o<r}function Vt(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function re(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function tt(t){return`${Math.round(Vt(t)*100)}%`}function Pr(t,e){let a=new Set(e?.liftIds||[]),r=new Map;for(let o of t){if(!a.has(o.lift_id))continue;let s=T(o.performed_at);r.set(s,(r.get(s)||0)+Number(o.weight)*Number(o.reps))}return r}function ts(t,e){let a=e.liftsById||new Map,r=e.workoutsById||new Map,o=e.activeSets||[],s=e.workoutHistorySets||o,i=t.lift_id?a.get(t.lift_id):null,g=t.workout_id?r.get(t.workout_id):null;if(t.type==="lift_set"){let h=o.filter(E=>E.lift_id===t.lift_id),n=Number(t.target_weight),d=Number(t.target_reps),f=G(n,d),y=null,u=0,k=null;for(let E of h){let L=Number(E.weight),q=Number(E.reps),R=G(L,q);R>u&&(u=R,y=E),L>=n&&q>=d&&(k=E)}let $=!!k,m=$?1:Vt(u/f);return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:i?.name||"Lift goal",progress:m,achieved:$,currentLabel:y?`Best: ${re(y.weight)} x ${y.reps}`:"No sets yet",targetLabel:`Goal: ${re(n)} x ${d}`,detail:k?`Hit with ${re(k.weight)} x ${k.reps}.`:`${tt(m)} there.`}}if(t.type==="weekly_workout_days"){let h=new Set;for(let u of s)Ir(u.performed_at)&&h.add(T(u.performed_at));let n=Number(t.target_value),d=h.size,f=d>=n,y=n>0?Vt(d/n):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"This week",progress:y,achieved:f,currentLabel:`${d} / ${re(n)} days`,targetLabel:d+1===n?"One more workout gets it.":`Goal: ${re(n)} days`,detail:f?"Weekly goal hit.":`${tt(y)} there.`}}if(t.type==="weekly_workout_volume"){let h=Pr(o.filter(u=>Ir(u.performed_at)),g),n=Array.from(h.values()).reduce((u,k)=>u+k,0),d=Number(t.target_value),f=n>=d,y=d>0?Vt(n/d):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:g?.name||"Workout volume",progress:y,achieved:f,currentLabel:`${Math.round(n)} / ${Math.round(d)} ${t.unit||"lb"}`,targetLabel:"This week",detail:f?"Weekly volume goal hit.":`${tt(y)} there.`}}if(t.type==="workout_session_volume"){let h=Pr(o,g),n=Math.max(0,...Array.from(h.values())),d=Number(t.target_value),f=n>=d,y=d>0?Vt(n/d):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:g?.name||"Workout session",progress:y,achieved:f,currentLabel:`Best: ${Math.round(n)} ${t.unit||"lb"}`,targetLabel:`Goal: ${Math.round(d)} ${t.unit||"lb"}`,detail:f?"Session volume goal hit.":`${tt(y)} there.`}}return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"Unsupported goal",progress:0,achieved:!1,currentLabel:"",targetLabel:"",detail:""}}function Ur(t,e){return t.filter(a=>a.deleted_at==null).map(a=>ts(a,e))}var es={"rank-private":t=>M(t.totalDays,1,"workout day"),"rank-pfc":t=>M(t.totalDays,2,"workout days"),"rank-corporal":t=>M(t.totalDays,3,"workout days"),"rank-sergeant":t=>M(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>M(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>M(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>M(t.totalDays,11,"workout days"),"rank-lieutenant":t=>M(t.totalDays,13,"workout days"),"rank-captain":t=>M(t.totalDays,15,"workout days"),"rank-major":t=>M(t.totalDays,18,"workout days"),"rank-colonel":t=>M(t.totalDays,22,"workout days"),"rank-general":t=>M(t.totalDays,27,"workout days"),"rank-prestige":t=>M(t.totalDays,33,"workout days"),"rank-prestige-master":t=>M(t.totalDays,40,"workout days"),"mastery-uav-1":t=>M(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>M(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>M(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>M(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>M(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>M(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>M(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>M(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>M(t.longestStreak,2,"weeks"),"streak-3":t=>M(t.longestStreak,3,"weeks"),"streak-4":t=>M(t.longestStreak,4,"weeks"),"streak-5":t=>M(t.longestStreak,5,"weeks"),"streak-6":t=>M(t.longestStreak,6,"weeks"),"streak-8":t=>M(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>Ze([M(t.totalDays,27,"workout days"),M(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>Ze([M(t.longestStreak,8,"week streak"),M(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>Ze([M(t.totalDays,40,"workout days"),M(t.tierCounts.chopper,3,"Choppers")])};function M(t,e,a){let r=Number(t)||0,o=Number(e)||1;return{current:r,target:o,progress:Vt(r/o),currentLabel:`${r} / ${o} ${a}`}}function Ze(t){return{...t.slice().sort((a,r)=>a.progress-r.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" · ")}}function Hr(t,e=null,a={}){let r=Fe(t,e,a);return Ot(t,e,a).filter(s=>s.track!=="secret").map(s=>{let i=es[s.id],g=i?i(r):{progress:s.unlocked?1:0,currentLabel:s.description};return{kind:"achievement",key:`achievement:${s.id}`,sourceKey:s.id,title:s.name,subtitle:s.track,progress:s.unlocked?1:g.progress,achieved:s.unlocked,currentLabel:g.currentLabel,targetLabel:s.description,detail:s.unlocked?"Achievement unlocked.":`${tt(g.progress)} there.`}})}function Or({goalEvaluations:t=[],achievementItems:e=[],events:a=[]}={}){let r=a.slice().sort((s,i)=>new Date(i.created_at)-new Date(s.created_at))[0]||null,o=[...t,...e].filter(s=>!s.achieved&&s.progress>=.6).sort((s,i)=>i.progress-s.progress).slice(0,5);return{latest:r,closest:o}}function Fr(t,e=[]){let a=new Set(e.map(o=>ta(o))),r=[];for(let o of t)if(o.kind==="goal"){for(let s of Jo)if(o.progress>=s&&!o.achieved){let i={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"close",threshold:s,title:o.title,message:`${o.title} is ${tt(o.progress)} there.`,metadata:{progress:o.progress}};a.has(ta(i))||r.push(i)}if(o.achieved){let s={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"achieved",threshold:1,title:o.title,message:`Goal hit: ${o.title}.`,metadata:{progress:1}};a.has(ta(s))||r.push(s)}}return r}function ta(t){return t.goal_id?`goal:${t.goal_id}:${t.event_type}:${Number(t.threshold)||0}`:`achievement:${t.source_key}:${t.event_type}`}function Me(t){return String(t||"").trim().toLowerCase()}function as(t){let e=String(t||"").trim();return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function Nr(t){let e=as(t);return/^-?\d+(\.\d+)?$/.test(e)?Number(e):e==="true"?!0:e==="false"?!1:e}function Br(t,{lifts:e=[],workouts:a=[]}={}){let r=[],o=null;for(let n of String(t||"").split(/\r?\n/)){let d=n.trim();if(!d||d.startsWith("#")||d==="goals:"||d.startsWith("goal_format:"))continue;if(d.startsWith("- ")){o&&r.push(o),o={};let y=d.slice(2).trim();if(y){let u=y.match(/^([^:]+):\s*(.*)$/);u&&(o[u[1].trim()]=Nr(u[2]))}continue}let f=d.match(/^([^:]+):\s*(.*)$/);f&&o&&(o[f[1].trim()]=Nr(f[2]))}o&&r.push(o);let s=new Map(e.map(n=>[Me(n.name),n])),i=new Map(a.map(n=>[Me(n.name),n])),g=[],h=[];return r.forEach((n,d)=>{let f=d+1,y=String(n.type||"").trim(),u={title:String(n.title||"").trim(),type:y,unit:String(n.unit||"lb").trim()||"lb",timeframe_weeks:ae(n.timeframe_weeks),recurring:n.recurring===!0?"weekly":n.recurring||"none",metadata:{imported:!0}};if(u.title||h.push(`Goal ${f}: missing title.`),ea.some(k=>k.id===y)||h.push(`Goal ${f}: unsupported type "${y}".`),y==="lift_set"){let k=s.get(Me(n.lift));k||h.push(`Goal ${f}: could not find lift "${n.lift||""}".`),u.lift_id=k?.id,u.target_weight=ae(n.weight),u.target_reps=ae(n.reps),u.target_weight==null&&h.push(`Goal ${f}: missing weight.`),u.target_reps==null&&h.push(`Goal ${f}: missing reps.`)}if(y==="weekly_workout_days"&&(u.target_value=ae(n.target),u.recurring="weekly",u.target_value==null&&h.push(`Goal ${f}: missing target.`)),y==="weekly_workout_volume"||y==="workout_session_volume"){let k=i.get(Me(n.workout));k||h.push(`Goal ${f}: could not find workout "${n.workout||""}".`),u.workout_id=k?.id,u.target_value=ae(n.target),y==="weekly_workout_volume"&&(u.recurring="weekly"),u.target_value==null&&h.push(`Goal ${f}: missing target.`)}g.push(u)}),{goals:h.length?[]:g,errors:h,rawGoals:r}}async function Dt(){let[t,e,a,r,o,s,i,g]=await Promise.all([Q(),Ut(),fe(),Oa(),Ka(),at(),pe(),me()]),h=t.length?await ft(t.map(n=>n.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:h,goals:r,events:o,bodyWeightEntries:s,userId:i,feedbackGiven:g,liftsById:new Map(t.map(n=>[n.id,n])),workoutsById:new Map(e.map(n=>[n.id,n]))}}function wt(t){let e=Ur(t.goals,t),a=Hr(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),r=Or({goalEvaluations:e,achievementItems:a,events:t.events});return{goalEvaluations:e,achievementItems:a,momentum:r}}async function It({showToasts:t=!1}={}){let e=await Dt(),a=wt(e),r=Fr([...a.goalEvaluations,...a.achievementItems],e.events),o=await Ya(r);if(await Promise.all(a.goalEvaluations.filter(s=>s.achieved&&s.goal.status==="active"&&s.goal.recurring!=="weekly").map(s=>Ga(s.goal.id,{status:"achieved",achieved_at:new Date().toISOString()}))),t&&o.length>0){let s=o.find(h=>h.event_type==="achieved"),i=o.find(h=>h.event_type==="close"),g=s||i;g&&wr(g.message||g.title)}return{context:e,...a,createdEvents:o}}var Gr=[{key:"bench-press",name:"Bench Press",aliases:["bench","barbell bench press","bench press warmup","bench press 2","bench press 3"],equipment:["barbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep shoulder blades set.","Touch the same point on the chest each rep.","Drive the bar up and slightly back."]},{key:"bicep-curl",name:"Bicep Curl",aliases:["bicep curls","curl"],equipment:["dumbbell","barbell","cable"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep elbows close to your sides.","Avoid swinging the torso.","Control the lower."]},{key:"calf-raise",name:"Calf Raise",aliases:["calf raises","standing calf raise"],equipment:["bodyweight","machine","dumbbell"],primaryMuscles:["calves"],secondaryMuscles:[],movementPatterns:["ankle extension"],tutorialUrl:"",cues:["Pause briefly at the top.","Use a full stretch at the bottom.","Keep reps controlled."]},{key:"dumbbell-chest-press",name:"Dumbbell Chest Press",aliases:["dumbell chest press","db chest press","dumbbell bench press","db bench press"],equipment:["dumbbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep wrists stacked over elbows.","Lower with control.","Press up without letting shoulders roll forward."]},{key:"dumbbell-curl",name:"Dumbbell Curl",aliases:["dumbell curl","db curl"],equipment:["dumbbell"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep upper arms still.","Rotate naturally through the curl if comfortable.","Avoid using momentum."]},{key:"dumbbell-lateral-raise",name:"Dumbbell Lateral Raise",aliases:["dumbell lateral raise","lateral raise","db lateral raise"],equipment:["dumbbell"],primaryMuscles:["side delts"],secondaryMuscles:["traps"],movementPatterns:["shoulder abduction"],tutorialUrl:"",cues:["Lead with elbows.","Stop around shoulder height.","Use light enough weight to stay smooth."]},{key:"dumbbell-row",name:"Dumbbell Row",aliases:["dumbell row","db row","one arm dumbbell row","one-arm dumbbell row"],equipment:["dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbow toward the hip.","Keep the torso steady.","Reach long at the bottom without losing control."]},{key:"dumbbell-shoulder-press",name:"Dumbbell Shoulder Press",aliases:["dumbell shoulder press","db shoulder press","dumbbell overhead press"],equipment:["dumbbell"],primaryMuscles:["shoulders","front delts"],secondaryMuscles:["triceps","upper chest"],movementPatterns:["push","vertical press"],tutorialUrl:"",cues:["Keep ribs down.","Press slightly back over the shoulders.","Control the bottom position."]},{key:"forearm-twist",name:"Forearm Twist",aliases:["forearm twists","wrist twist","pronation supination"],equipment:["dumbbell"],primaryMuscles:["forearms"],secondaryMuscles:["grip"],movementPatterns:["forearm rotation"],tutorialUrl:"",cues:["Move slowly through rotation.","Keep the elbow supported if needed.","Use a light load."]},{key:"hammer-curl",name:"Hammer Curl",aliases:["hammer curls"],equipment:["dumbbell"],primaryMuscles:["biceps","brachialis"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep palms facing each other.","Control the lower.","Avoid shoulder swing."]},{key:"hip-thrust",name:"Hip Thrust",aliases:["hip thrusts","barbell hip thrust"],equipment:["barbell","bench"],primaryMuscles:["glutes"],secondaryMuscles:["hamstrings","quads"],movementPatterns:["hinge","hip extension"],tutorialUrl:"",cues:["Tuck ribs down.","Drive through the heels.","Pause with hips fully extended."]},{key:"lunge",name:"Lunge",aliases:["lunges","db lunge","dumbbell lunge"],equipment:["bodyweight","dumbbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","calves"],movementPatterns:["squat","single-leg"],tutorialUrl:"",cues:["Step far enough to stay balanced.","Keep front knee tracking over toes.","Control the descent."]},{key:"overhead-tricep-extension",name:"Overhead Tricep Extension",aliases:["overhead tricep extensions","tricep extension","overhead triceps extension"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep elbows pointed forward.","Lower behind the head with control.","Extend without flaring hard."]},{key:"rear-delt-fly",name:"Rear Delt Fly",aliases:["rear delt fly","rear delt raise","reverse fly"],equipment:["dumbbell","machine","cable"],primaryMuscles:["rear delts"],secondaryMuscles:["upper back","traps"],movementPatterns:["pull","shoulder horizontal abduction"],tutorialUrl:"",cues:["Keep a slight elbow bend.","Move from the shoulders.","Avoid shrugging through the rep."]},{key:"row",name:"Row",aliases:["rows","cable row","machine row","seated row"],equipment:["cable","machine","barbell","dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbows back.","Keep chest tall.","Control the reach forward."]},{key:"shrug",name:"Shrug",aliases:["shrugs","dumbbell shrug","barbell shrug"],equipment:["dumbbell","barbell"],primaryMuscles:["traps"],secondaryMuscles:["forearms"],movementPatterns:["scapular elevation"],tutorialUrl:"",cues:["Lift shoulders straight up.","Pause briefly at the top.","Avoid rolling the shoulders."]},{key:"squat",name:"Squat",aliases:["barbell squat","squat warmup","squat 2","squat 3"],equipment:["barbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","core"],movementPatterns:["squat"],tutorialUrl:"",cues:["Brace before descending.","Keep knees tracking over toes.","Drive through the whole foot."]},{key:"tricep-curl",name:"Tricep Curl",aliases:["tricep curls","triceps curl"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep upper arms steady.","Fully extend with control.","Avoid using shoulder momentum."]},{key:"weighted-sit-up",name:"Weighted Sit-Up",aliases:["weighted sit ups","weighted sit ups 2","weighted situp","weighted sit-up"],equipment:["plate","dumbbell"],primaryMuscles:["abs"],secondaryMuscles:["hip flexors"],movementPatterns:["trunk flexion"],tutorialUrl:"",cues:["Keep the weight secure.","Curl the torso up under control.","Avoid yanking with the neck."]}];function qe(t){return String(t||"").toLowerCase().replace(/dumbell/g,"dumbbell").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ")}function Vr(t){return[t.name,t.key,...t.aliases||[]]}function rs(t,e){let a=qe(e);if(a.length<2)return null;let r=null;for(let o of Vr(t)){let s=qe(o),i=null;s===a?i=0:s.startsWith(a)?i=1:s.includes(a)?i=2:a.split(" ").every(h=>s.includes(h))&&(i=3),i!=null&&(r==null||i<r)&&(r=i)}return r}function Kr(t,{limit:e=5}={}){return Gr.map(a=>({entry:a,score:rs(a,t)})).filter(a=>a.score!=null).sort((a,r)=>a.score-r.score||a.entry.name.localeCompare(r.entry.name)).slice(0,e).map(a=>a.entry)}function oe(t){let e=String(t||"").trim();if(!e)return null;let a=qe(e);return Gr.find(r=>r.key===e||r.key===a.replace(/\s+/g,"-")||Vr(r).some(o=>qe(o)===a))||null}var Yr="lt-composite-expanded",aa="lt-header-menu-open",jr="lt-momentum-expanded";async function Xr(t){let{data:{session:e}}=await x.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),s=240,i=null;function g(p=!0){i&&(clearTimeout(i),i=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),p&&gt(aa,!1),i=setTimeout(()=>{o.hidden=!0,i=null},s)}function h({persist:p=!0,instant:w=!1}={}){i&&(clearTimeout(i),i=null),o.hidden=!1,w?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),p&&gt(aa,!0)}r.addEventListener("click",()=>{o.hidden?h():g()}),o.addEventListener("click",p=>{p.target.closest("button")&&g()}),Ct(aa,!1)&&h({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",de);let d=t.querySelector("[data-feedback-btn]");d&&d.addEventListener("click",()=>gr()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>x.auth.signOut());let y=t.querySelector("[data-composite-section]"),u=t.querySelector("[data-composite-toggle]"),k=t.querySelector("[data-composite-body]"),$=t.querySelector("[data-chevron]"),m=t.querySelector("[data-composite-summary]"),E=t.querySelector("[data-composite-discovery]"),L=t.querySelector("[data-momentum-toggle]"),q=t.querySelector("[data-momentum-body]"),R=t.querySelector("[data-momentum-summary]"),I=t.querySelector("[data-momentum-chevron]");function V(p){u.setAttribute("aria-expanded",String(p)),k.hidden=!p,$.innerHTML=p?"&#9650;":"&#9660;",y.classList.toggle("lt-stats-row-expanded",p)}V(Ct(Yr,!0)),u.addEventListener("click",()=>{if(dt(Z.composite),E.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ca();return}let p=u.getAttribute("aria-expanded")==="true";V(!p),gt(Yr,!p)});function P(p){L.setAttribute("aria-expanded",String(p)),q.hidden=!p,I.innerHTML=p?"&#9650;":"&#9660;"}P(Ct(jr,!1)),L.addEventListener("click",()=>{let p=L.getAttribute("aria-expanded")==="true";P(!p),gt(jr,!p)});let Y=t.querySelector("[data-killstreak-icon]"),K=t.querySelector("[data-killstreak-label]"),N=t.querySelector("[data-killstreak-sub]"),st=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Ta);function z(p){let{days:w,tier:S}=xe(p);Y.textContent=S?S.icon:"🎯",K.textContent=S?`${S.label} Killstreak`:"No Killstreak",N.textContent=`${w} Day streak`;let U=Ot(p).filter(H=>H.track==="rank"),W=Ee(U,Ce()).length>0;st.hidden=!W}let J=t.querySelector("[data-weight-card]");function v(){dt(Z.weight),$a()}function l(p){Sr(J,{onExpand:v,...p}).catch(w=>{console.error("[lift-tracker]",w),J.classList.remove("lt-stats-row-expanded"),J.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,J.querySelector("[data-weight-expand]").addEventListener("click",v)})}let c=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{dt(Z.history),c.hidden=!0,Da()});let b=t.querySelector("[data-add-lift-form]"),C=b.querySelector('input[name="name"]'),A=t.querySelector("[data-lift-suggestions]"),D=t.querySelector("[data-add-lift-toggle]"),_=t.querySelector("[data-add-lift-discovery]"),F=t.querySelector("[data-add-lift-hint]"),B=t.querySelector("[data-create-workout-btn]"),bt=t.querySelector("[data-create-workout-discovery]"),ut=null;function Kt(){A.hidden=!0,A.innerHTML=""}function bo(p){ut=null;let w=Kr(p,{limit:4});if(w.length===0){Kt();return}A.hidden=!1,A.innerHTML=w.map(S=>`
      <button type="button" data-lift-suggestion="${le(S.key)}">
        <span>${qt(S.name)}</span>
        <small>${qt([...S.primaryMuscles,...S.equipment||[]].slice(0,3).join(" · "))}</small>
      </button>
    `).join("")}C.addEventListener("input",()=>{let p=C.value.trim();if(p.length<2){ut=null,Kt();return}bo(p)}),A.addEventListener("click",p=>{let w=p.target.closest("[data-lift-suggestion]");if(!w)return;let S=oe(w.dataset.liftSuggestion);S&&(ut=S,C.value=S.name,Kt(),C.focus())}),D.addEventListener("click",()=>{let p=b.hidden;b.hidden=!p,D.setAttribute("aria-pressed",String(p)),D.classList.toggle("lt-add-lift-toggle-active",p),p?C.focus():(ut=null,Kt())});let Mt=t.querySelector("[data-lift-list]"),ne=t.querySelector("[data-list-empty]");B.addEventListener("click",()=>{B.disabled||La()});let Yt=t.querySelector("[data-workout-pills]"),ko=t.querySelector("[data-workout-empty-hint]"),pt=[],nt=Ge();function ca(){return nt&&pt.find(p=>p.id===nt)||null}function vo(){let p=ca();if(!p)return X;let w=new Set(p.liftIds);return X.filter(S=>w.has(S.id))}function da(){Yt.innerHTML=pt.map(p=>{let w=p.id===nt;return`
          <div class="lt-workout-pill-wrap${w?" lt-workout-pill-wrap-active":""}" data-reorder-item="${p.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${p.id}" aria-pressed="${w}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${p.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let p of pt){let w=Yt.querySelector(`[data-workout-pill="${p.id}"] [data-workout-pill-name]`);w&&(w.textContent=p.name)}Yt.querySelectorAll("[data-workout-pill]").forEach(p=>{p.addEventListener("click",()=>{let w=p.dataset.workoutPill;nt=nt===w?null:w,Ve(nt),da(),Ne(jt),fa(jt)})}),Yt.querySelectorAll("[data-workout-edit]").forEach(p=>{p.addEventListener("click",w=>{w.stopPropagation(),_a(p.dataset.workoutEdit)})})}let Ie="lt-fast-mode",ua="lt-burst-mode";function So(){try{let p=window.localStorage.getItem(Ie);if(p!==null)return p==="true";let w=window.localStorage.getItem(ua);return w!==null?(window.localStorage.setItem(Ie,w),window.localStorage.removeItem(ua),w==="true"):!1}catch{return!1}}function xo(p){try{window.localStorage.setItem(Ie,String(p))}catch{}}let X=[],kt=So(),vt=new Map,jt=[],ie=t.querySelector("[data-mode-toggle]");function pa(){ie.textContent=kt?"Normal":"Fast",ie.setAttribute("aria-pressed",String(kt)),ie.classList.toggle("lt-mode-toggle-active",kt)}pa(),ie.addEventListener("click",()=>{kt=!kt,xo(kt),pa(),Ne(jt)}),b.addEventListener("submit",async p=>{p.preventDefault();let w=b.querySelector('input[name="name"]'),S=w.value.trim();if(!S)return;let U=ut&&ut.name===S?ut:oe(S);w.value="",ut=null,Kt(),w.disabled=!0;try{await Nt(S,X.length,{dictionary_key:U?.key||null}),await ma()}finally{w.disabled=!1,w.focus()}}),Qt(Mt,{onReorder:async p=>{let w=[...p],S=new Set(p),U=X.map(W=>S.has(W.id)?w.shift():W.id);await Ra(U),X=U.map(W=>X.find(H=>H.id===W)).filter(Boolean)}}),Qt(Yt,{axis:"x",onReorder:async p=>{await ja(p),pt=p.map(w=>pt.find(S=>S.id===w)).filter(Boolean)}});async function ma(){let p=await Dt();pt=p.workouts,nt&&!pt.some(H=>H.id===nt)&&(nt=null,Ve(null)),da(),X=p.lifts;let w=X.length>=2;if(_.hidden=X.length>=2,F.hidden=X.length!==1,B.disabled=!w,B.setAttribute("aria-disabled",String(!w)),bt.hidden=!w||pt.length>0,ko.hidden=!w||pt.length>0,X.length===0){Mt.innerHTML="",ne.hidden=!1,ne.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",F.hidden=!0,y.hidden=!0,z(p.workoutHistorySets),ha(wt(p).momentum),l({showDiscovery:!1}),c.hidden=!0,E.hidden=!0,vt=new Map,jt=[];return}let S=p.activeSets,U=S.length>0;z(p.workoutHistorySets),ha(wt(p).momentum),l({showDiscovery:U&&!$e(Z.weight)}),c.hidden=!U||$e(Z.history),vt=new Map(X.map(H=>[H.id,[]]));for(let H of S){let mt=vt.get(H.lift_id);mt&&mt.push(H)}let W=X.map(H=>({liftId:H.id,dailySeries:ht(vt.get(H.id)||[])}));Ne(W),fa(W)}function fa(p){let w=ca(),S=w?p.filter(ce=>w.liftIds.includes(ce.liftId)):p,U=Ht(S);y.hidden=!1;let W=t.querySelector("[data-composite-canvas]"),H=t.querySelector("[data-composite-empty]"),mt=t.querySelector("[data-composite-scope]"),Pt=t.querySelector("[data-composite-blurb]");if(mt.textContent=w?`Measuring ${w.name}`:"Measuring all lifts",Pt.textContent=w?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",H.textContent=w?`Log a few sets for lifts in ${w.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",U.length===0){W.hidden=!0,H.hidden=!1,m.textContent="",E.hidden=!0;return}W.hidden=!1,H.hidden=!0,m.textContent=ir(U[U.length-1].pct),E.hidden=$e(Z.composite),ve(W,U)}function Pe(p){let w=ht(vt.get(p)||[]),S=w[w.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function Eo(p){let w=vt.get(p)||[];return w.length===0?"":w[w.length-1].weight}function Ne(p){jt=p;let w=vo();ne.hidden=w.length>0,ne.textContent=nt?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",Mt.innerHTML=w.map(S=>kt?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${S.id}" data-lift-id="${S.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${S.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Pe(S.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${le(S.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${S.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Eo(S.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${S.id}" data-lift-id="${S.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${S.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${Pe(S.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${le(S.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let S of X){let W=Mt.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");W&&(W.textContent=S.name)}Mt.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Ea(S.dataset.openLift))}),kt&&Lo()}function Lo(){Mt.querySelectorAll("[data-fast-log-form]").forEach(p=>{let w=p.dataset.fastLogForm;p.addEventListener("submit",async S=>{S.preventDefault();let U=p.querySelector("[data-fast-weight]"),W=p.querySelector("[data-fast-reps]"),H=p.querySelector("[data-fast-feedback]"),mt=Number(U.value),Pt=Number(W.value);if(!(mt>=0)||!Number.isFinite(mt)||!(Pt>0)||!Number.isInteger(Pt))return;let ce=vt.get(w)||[],_o=G(mt,Pt),ga=ye(_o,ce),ya=new Date().toISOString();Wt()&&ee();let $o=await it(w,mt,Pt,ya),Co=X.find(Xt=>Xt.id===w);Wt()&&Te({seconds:De(w),liftName:Co?.name||""});let wa=[...ce,$o];vt.set(w,wa),W.value="",W.focus();let ba=Mt.querySelector(`[data-lift-id="${w}"]`)?.querySelector("[data-last-slot]");ba&&(ba.textContent=Pe(w));let Do=T(ya),ka=lt(wa.filter(Xt=>T(Xt.performed_at)===Do));H.hidden=!1,H.classList.toggle("lt-pr",ga),H.textContent=ga?`PR! ${Math.round(ka)} lb today`:`Logged · ${Math.round(ka)} lb today`,It({showToasts:!0}).catch(Xt=>console.error("[lift-tracker]",Xt))})})}function ha(p){let w=p.latest,S=p.closest||[],U=S[0];R.textContent=w?`Latest: ${w.title}`:U?`Closest: ${U.title} · ${tt(U.progress)}`:"No goals yet",q.innerHTML=`
      <div class="lt-momentum-grid">
        <section>
          <h3>Recently Achieved</h3>
          ${w?`
            <article class="lt-momentum-item lt-momentum-item-achieved">
              <span>${qt(w.title)}</span>
              <small>${qt(w.message||"Recently achieved.")}</small>
            </article>
          `:'<p class="lt-empty">New goal and achievement wins will show here.</p>'}
        </section>
        <section>
          <h3>Closest</h3>
          ${S.length?S.map(W=>`
            <article class="lt-momentum-item">
              <span>${qt(W.title)}</span>
              <small>${qt(W.currentLabel)} · ${qt(W.detail)}</small>
              <span class="lt-goal-progress"><span style="width: ${Math.round(W.progress*100)}%"></span></span>
            </article>
          `).join(""):'<p class="lt-empty">Set goals or keep logging to surface close achievements.</p>'}
        </section>
      </div>
      <button type="button" class="lt-goal-secondary-btn" data-open-goals>View goals</button>
    `,q.querySelector("[data-open-goals]").addEventListener("click",zt)}function le(p){return String(p).replace(/[&<>"']/g,w=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[w])}function qt(p){return le(p)}await ma()}var os=2.5;function Ae(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function ss(t){return Math.round(Number(t)*2)/2}function ns(t){return t.slice().sort((e,a)=>new Date(e.performed_at)-new Date(a.performed_at))}function is(t){return t.reduce((e,a)=>{if(!e)return a;let r=G(Number(e.weight),Number(e.reps));return G(Number(a.weight),Number(a.reps))>r?a:e},null)}function ls(t){let e=new Map;for(let a of ns(t)){let r=T(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>a[0].localeCompare(r[0]))}function zr(t,{weightStep:e=os}={}){let a=ls(t||[]),r=a[a.length-1];if(!r)return{baseline:null,context:null,options:[]};let[o,s]=r,i=a[a.length-2]||null,g=is(s),h=Number(g.weight),n=Number(g.reps),d=ss(h+e),f=Math.max(1,n-2),y={date:o,latestVolume:lt(s),previousVolume:i?lt(i[1]):null,sessionSetCount:s.length};return{baseline:{weight:h,reps:n,e1rm:G(h,n),label:`${Ae(h)} lb x ${n}`,date:o},context:y,options:[{id:"reps",label:"Add reps",title:`${Ae(h)} lb x ${n+1}`,description:"Same weight, one more rep.",weight:h,reps:n+1},{id:"weight",label:"Add weight",title:`${Ae(d)} lb x ${f}`,description:"A heavier set with a small rep drop.",weight:d,reps:f},{id:"volume",label:"Add volume",title:`Extra set: ${Ae(h)} lb x ${n}`,description:"Repeat your best recent set to raise session volume.",weight:h,reps:n}]}}async function Jr(t,e){let a=await qa(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",v=>{v.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let v=r.value.trim();if(!v||v===o){r.value=o;return}o=v,await Aa(e,v)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Wa(e),O(),$t(`Deleted "${o}"`,{onUndo:async()=>{await Ia(e),ue()}}))});let s=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};s.forEach(v=>{v.addEventListener("click",()=>{s.forEach(l=>l.setAttribute("aria-selected",String(l===v))),Object.entries(i).forEach(([l,c])=>{c.hidden=l!==v.dataset.tab}),v.dataset.tab==="details"&&z()})});let g=t.querySelector("[data-log-form]"),h=t.querySelector("[data-weight-input]"),n=t.querySelector("[data-reps-input]"),d=t.querySelector("[data-log-feedback]"),f=t.querySelector("[data-default-rest-input]"),y=t.querySelector("[data-lift-rest-input]"),u=t.querySelector("[data-rest-enabled-input]"),k=t.querySelector("[data-rest-enabled-label]"),$=t.querySelector("[data-default-rest-field]"),m=t.querySelector("[data-lift-rest-field]"),E=t.querySelector("[data-lift-goals]"),L=[];function q(){f.value=Xe(),y.value=ze(e)||"";let v=Wt();u.checked=v,k.textContent=v?"Rest timer: On":"Rest timer: Off",f.disabled=!v,y.disabled=!v,$.classList.toggle("lt-rest-setting-field-disabled",!v),m.classList.toggle("lt-rest-setting-field-disabled",!v)}function R(v){let l=Number(v.value);return v.value===""?null:!Number.isFinite(l)||l<15?15:l>600?600:Math.round(l)}f.addEventListener("change",()=>{let v=R(f)||120;Ar(v),q()}),y.addEventListener("change",()=>{let v=R(y);Rr(e,v),q()}),u.addEventListener("change",()=>{qr(u.checked),q()});async function I(){L=await Pa(e)}function V(){if(L.length===0)return;let v=L[L.length-1];h.value=v.weight}g.addEventListener("submit",async v=>{v.preventDefault();let l=Number(h.value),c=Number(n.value);if(!(l>=0)||!Number.isFinite(l)||!(c>0)||!Number.isInteger(c))return;let b=G(l,c),A=ye(b,L),D=new Date;Wt()&&ee(),await it(e,l,c,D.toISOString()),Wt()&&Te({seconds:De(e),liftName:o}),n.value="",n.focus(),await I(),K(),i.details.hidden||z(),J().catch(B=>console.error("[lift-tracker]",B));let _=T(D.toISOString()),F=lt(L.filter(B=>T(B.performed_at)===_));d.hidden=!1,d.classList.toggle("lt-pr",A),d.textContent=A?`New PR! Today's volume: ${Math.round(F)} lb`:`Logged. Today's volume: ${Math.round(F)} lb`,It({showToasts:!0}).catch(B=>console.error("[lift-tracker]",B))});function P(v){let l=new Map;for(let c of v){let b=T(c.performed_at);l.has(b)||l.set(b,[]),l.get(b).push(c)}return Array.from(l.entries()).sort((c,b)=>b[0].localeCompare(c[0]))}function Y(v){let[l,c,b]=v.split("-").map(Number);return new Date(l,c-1,b).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function K(){let v=i.history;if(L.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let l=P(L);v.innerHTML=l.map(([c,b])=>{let C=lt(b),D=b.slice().sort((_,F)=>new Date(F.performed_at)-new Date(_.performed_at)).map(_=>{let F=Math.round(G(Number(_.weight),Number(_.reps)));return`
              <li class="lt-history-row" data-set-id="${_.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${_.id}">
                  <span class="lt-history-weight">${_.weight} lb &times; ${_.reps}</span>
                  <span class="lt-history-e1rm">${F} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${Y(c)}</span>
              <span class="lt-history-volume">${Math.round(C)} lb volume</span>
            </div>
            <ul class="lt-history-list">${D}</ul>
          </div>
        `}).join(""),v.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>st(c.dataset.editTrigger))})}function N(v){return i.history.querySelector(`[data-set-id="${v}"]`)}function st(v){let l=N(v),c=L.find(b=>b.id===v);!l||!c||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${c.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${c.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${T(c.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",K),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Ua(v),await I(),K(),i.details.hidden||z(),$t("Set deleted",{onUndo:async()=>{await Ha(v),await I(),K(),i.details.hidden||z()}})}),l.querySelector("[data-edit-form]").addEventListener("submit",async b=>{b.preventDefault();let C=Number(l.querySelector("[data-edit-weight]").value),A=Number(l.querySelector("[data-edit-reps]").value),D=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!(A>0)||!D)return;let _=new Date(c.performed_at),[F,B,bt]=D.split("-").map(Number);_.setFullYear(F,B-1,bt),await Na(v,{weight:C,reps:A,performed_at:_.toISOString()}),await I(),K(),i.details.hidden||z()}))}function z(){let v=i.details,l=ht(L);if(l.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>',mr();return}let c=zr(L),b=oe(a.dictionary_key||o);v.innerHTML=`
      ${cs(b)}
      ${ds(c)}
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `,v.querySelectorAll("[data-progression-option]").forEach(D=>{D.addEventListener("click",()=>{let _=c.options.find(F=>F.id===D.dataset.progressionOption);_&&(h.value=_.weight,n.value=_.reps,d.hidden=!0,g.scrollIntoView({behavior:"smooth",block:"start"}),n.focus())})});let C=v.querySelector("[data-lift-canvas]"),A=v.querySelector("[data-point-detail]");pr(C,l,{onPointClick:D=>{A.hidden=!1,A.textContent=`${Y(D.date)}: ${D.weight} lb × ${D.reps} (${Math.round(D.e1rm)} e1RM)`}})}await I(),q(),V(),K(),await J();async function J(){let v=await Dt(),{goalEvaluations:l}=wt(v),c=l.filter(b=>b.goal.type==="lift_set"&&b.goal.lift_id===e).slice(0,3);if(c.length===0){E.innerHTML=`
        <button type="button" class="lt-lift-goals-empty" data-open-goals>
          Set a goal for this lift
        </button>
      `,E.querySelector("[data-open-goals]").addEventListener("click",zt);return}E.innerHTML=`
      <div class="lt-lift-goals-header">
        <span>Goals</span>
        <button type="button" data-open-goals>Manage</button>
      </div>
      ${c.map(b=>`
        <article class="lt-lift-goal-row">
          <span>
            <strong>${j(b.title)}</strong>
            <small>${j(b.currentLabel)} · ${j(b.targetLabel)}</small>
          </span>
          <em>${b.achieved?"Hit":tt(b.progress)}</em>
        </article>
      `).join("")}
    `,E.querySelector("[data-open-goals]").addEventListener("click",zt)}}function cs(t){if(!t)return"";let e=t.primaryMuscles.map(s=>`<span>${j(s)}</span>`).join(""),a=t.secondaryMuscles.map(s=>`<span>${j(s)}</span>`).join(""),r=t.equipment.map(s=>`<span>${j(s)}</span>`).join(""),o=t.movementPatterns.map(s=>`<span>${j(s)}</span>`).join("");return`
    <section class="lt-lift-info-card">
      <div class="lt-lift-info-header">
        <span>Lift Info</span>
        <strong>${j(t.name)}</strong>
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
          ${t.cues.map(s=>`<li>${j(s)}</li>`).join("")}
        </ul>
      `:""}
      ${t.tutorialUrl?`<a class="lt-lift-info-link" href="${j(t.tutorialUrl)}" target="_blank" rel="noopener noreferrer">Watch tutorial</a>`:'<p class="lt-lift-info-empty">Tutorial link not set yet.</p>'}
    </section>
  `}function ds(t){if(!t.baseline)return"";let e=t.context.previousVolume==null?`${Math.round(t.context.latestVolume)} lb last session`:`${Math.round(t.context.latestVolume)} lb last session · ${Math.round(t.context.previousVolume)} lb previous`;return`
    <section class="lt-progression-card">
      <div class="lt-progression-header">
        <span>Progression Options</span>
        <small>Based on ${j(t.baseline.label)}</small>
      </div>
      <p class="lt-progression-context">${j(e)}</p>
      <div class="lt-progression-options">
        ${t.options.map(a=>`
          <button type="button" class="lt-progression-option" data-progression-option="${j(a.id)}">
            <span>${j(a.label)}</span>
            <strong>${j(a.title)}</strong>
            <small>${j(a.description)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `}function j(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Qr=60;function Re(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Qr),e}function Tt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function se(t,e,a=new Date,r=`last ${Qr} days`,o=[],s=[]){let i=T(a.toISOString()),g=[`Lift Tracker — ${r} (as of ${i})`,""],h=t.filter(n=>(e.get(n.id)||[]).length>0);if(h.length===0)g.push("No sets logged in this period."),g.push("");else{for(let d of h){let f=(e.get(d.id)||[]).slice().sort((k,$)=>new Date(k.performed_at)-new Date($.performed_at)),y=lt(f),u=Math.max(...f.map(k=>G(Number(k.weight),Number(k.reps))));g.push(d.name);for(let k of f){let $=Math.round(G(Number(k.weight),Number(k.reps)));g.push(`  ${T(k.performed_at)}: ${k.weight} lb x ${k.reps} (e1RM ${$})`)}g.push(`  Sets: ${f.length} | Volume: ${Math.round(y)} lb | Best e1RM: ${Math.round(u)}`),g.push("")}let n=t.length-h.length;n>0&&(g.push(`(${n} lift${n===1?"":"s"} with no sets in this period omitted)`),g.push(""))}if(o.length>0){g.push("Body weight");for(let u of o)g.push(`  ${u.date}: ${Tt(u.weight)} lb`);let n=o[0].weight,d=o[o.length-1].weight,f=d-n,y=f>0?"+":"";g.push(`  Start: ${Tt(n)} lb | Current: ${Tt(d)} lb | Change: ${y}${Tt(f)} lb`),g.push("")}if(s.length>0){g.push("Waist");for(let u of s)g.push(`  ${u.date}: ${Tt(u.waist)} in`);let n=s[0].waist,d=s[s.length-1].waist,f=d-n,y=f>0?"+":"";g.push(`  Start: ${Tt(n)} in | Current: ${Tt(d)} in | Change: ${y}${Tt(f)} in`),g.push("")}return g.join(`
`).trimEnd()}var us=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],ps=`
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
`;async function Zr(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${us.map(u=>`
          <section class="lt-help-section">
            <h2>${u.title}</h2>
            <p>${u.body}</p>
          </section>
          ${u.title==="Export progress"?ps:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),s=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let k=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(k)),a.hidden=!k,r.innerHTML=k?"&#9650;":"&#9660;",!!k){e.disabled=!0;try{let $=await Q(),m=$.map(N=>N.id),E=Re().toISOString(),L=await he(m,E),q=new Map($.map(N=>[N.id,[]]));for(let N of L){let st=q.get(N.lift_id);st&&st.push(N)}let I=(await at()).filter(N=>new Date(N.logged_at)>=new Date(E)),V=ct(I),Y=(await At()).filter(N=>new Date(N.logged_at)>=new Date(E)),K=Rt(Y);o.value=se($,q,new Date,void 0,V,K),i.hidden=!0}finally{e.disabled=!1}}}),s.addEventListener("click",async()=>{o.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}i.hidden=!1,i.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let g=t.querySelector("[data-full-export-toggle]"),h=t.querySelector("[data-full-export-body]"),n=t.querySelector("[data-full-export-chevron]"),d=t.querySelector("[data-full-export-textarea]"),f=t.querySelector("[data-full-export-copy]"),y=t.querySelector("[data-full-export-status]");g.addEventListener("click",async()=>{let k=!(g.getAttribute("aria-expanded")==="true");if(g.setAttribute("aria-expanded",String(k)),h.hidden=!k,n.innerHTML=k?"&#9650;":"&#9660;",!!k){g.disabled=!0;try{let $=await Q(),m=$.map(P=>P.id),E=await ft(m),L=new Map($.map(P=>[P.id,[]]));for(let P of E){let Y=L.get(P.lift_id);Y&&Y.push(P)}let q=await at(),R=ct(q),I=await At(),V=Rt(I);d.value=se($,L,new Date,"all-time",R,V),y.hidden=!0}finally{g.disabled=!1}}}),f.addEventListener("click",async()=>{d.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(d.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}y.hidden=!1,y.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function to(t){dt(Z.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",O);let[e,a]=await Promise.all([Q(),Ut()]),r=_r(a),o=r?e.filter(u=>r.liftIds.includes(u.id)):e,s=o.length?await ft(o.map(u=>u.id)):[],i=new Map(o.map(u=>[u.id,[]]));for(let u of s){let k=i.get(u.lift_id);k&&k.push(u)}let g=o.map(u=>({liftId:u.id,dailySeries:ht(i.get(u.id)||[])})),h=Ht(g),n=t.querySelector("[data-composite-canvas]"),d=t.querySelector("[data-composite-empty]"),f=t.querySelector("[data-composite-scope]"),y=t.querySelector("[data-composite-blurb]");if(f.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",y.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",d.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",h.length===0){n.hidden=!0,d.hidden=!1;return}n.hidden=!1,d.hidden=!0,ve(n,h)}function ms(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function fs(){let t=await Q(),e=new Map(t.map(r=>[r.id,r.name]));return(await ft(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function hs(t,e){let a=new Map;for(let s of e)a.has(s.liftName)||a.set(s.liftName,[]),a.get(s.liftName).push(s);let r=Array.from(a.entries()).map(([s,i])=>{let h=i.slice().sort((n,d)=>new Date(n.performed_at)-new Date(d.performed_at)).map(n=>{let d=Math.round(G(Number(n.weight),Number(n.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${n.weight} lb &times; ${n.reps}</span>
                <span class="lt-history-e1rm">${d} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${s}</div>
          <ul class="lt-history-list">${h}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${ms(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function eo(t){dt(Z.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=t.querySelector("[data-history-content]"),a=await fs();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=lr(a);e.innerHTML=r.map(([o,s])=>hs(o,s)).join("")}var ao="lt-theme",ra="default";function oa(){return Le(ao,ra)}function ro(t){!t||t===ra?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function oo(t){ro(t),_e(ao,t||ra)}function so(){ro(oa())}var gs={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},ys=["rank","mastery","streak","capstone","secret"],ws="Hidden until unlocked.";async function no(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=await fe(),a=await at(),r=await pe(),o=await me(),{days:s,tier:i}=xe(e);t.querySelector("[data-killstreak-current-icon]").textContent=i?i.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=i?`${i.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${s} Day streak`;let g=Oe(e,r),h=t.querySelector("[data-killstreak-tier-list]");h.innerHTML=Zt.map(m=>{let E=g[m.key];return`
      <li class="lt-killstreak-tier-row${i?.key===m.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${m.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${m.label}</span>
          <span class="lt-killstreak-tier-req">${m.days}+ day${m.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${E} earned</span>
      </li>
    `}).join("");let n=Ot(e,r,{bodyWeightEntries:a,hasSubmittedFeedback:o}),d=n.filter(m=>m.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${d} / ${n.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let f=n.filter(m=>m.track==="rank"),y=new Set(Ee(f,Ce()));Lr(f.filter(m=>m.unlocked).map(m=>m.id));let u=t.querySelector("[data-achievements]");function k(m){if(m.track!=="rank"){let I=m.track==="secret"&&!m.unlocked,V=I?" lt-achievement-card-desc-hidden":"",P=I?ws:m.description,Y=m.flavor&&!I?`<span class="lt-achievement-card-flavor">${m.flavor}</span>`:"";return`
        <li class="lt-achievement-card${m.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${m.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${m.name}</span>
            <span class="lt-achievement-card-desc${V}">${P}</span>
            ${Y}
          </span>
        </li>
      `}let E=m.unlocked&&oa()===m.theme.id,L=m.unlocked&&y.has(m.id),q=m.unlocked?`<span class="lt-achievement-card-theme">${m.theme.label} theme${E?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${m.theme.label}</span>`,R=L?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${m.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${L?" lt-achievement-card-new":""}${E?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${m.theme.id}"${m.unlocked?"":" disabled"} aria-label="${m.unlocked?`Apply the ${m.theme.label} theme`:`Locked: ${m.name}`}">
          <span class="lt-achievement-card-icon">${m.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${m.name}</span>
            <span class="lt-achievement-card-desc">${m.description}</span>
            ${q}
            ${R}
          </span>
        </button>
      </li>
    `}function $(){u.innerHTML=ys.map(m=>{let L=n.filter(q=>q.track===m).sort((q,R)=>Number(R.unlocked)-Number(q.unlocked)).map(k).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${gs[m]}</h3>
          ${m==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${L}</ul>
        </section>
      `}).join("")}$(),u.addEventListener("click",m=>{let E=m.target.closest("[data-apply-theme]");!E||E.disabled||(oo(E.dataset.applyTheme),$())})}var sa=`goal_format: lift_tracker_goals_v1
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
    recurring: weekly`,lo=`Analyze this Lift Tracker export and create 5-8 goals that are achievable in 3-4 weeks.
Use only Lift Tracker YAML format.
Allowed types: lift_set, weekly_workout_days, weekly_workout_volume, workout_session_volume.
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;async function co(t){let e=await Dt(),a=wt(e),r=[];function o(){let n=a.goalEvaluations.filter(f=>f.goal.status==="active"&&!f.achieved),d=a.goalEvaluations.filter(f=>f.goal.status==="achieved"||f.achieved);t.innerHTML=`
      <header class="lt-detail-header">
        <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
        <h1 class="lt-weight-view-title">Goals</h1>
      </header>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Active Goals</h2>
        <div data-active-goals>
          ${n.length?n.map(io).join(""):'<p class="lt-empty">No active goals yet. Add one below or paste a batch from an LLM.</p>'}
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
          <pre>${ot(sa)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${ot(lo)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${uo(sa)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${d.length?d.map(io).join(""):'<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `,t.querySelector("[data-back]").addEventListener("click",O),t.querySelector("[data-help-export-link]").addEventListener("click",de),g(),h(),t.querySelectorAll("[data-delete-goal]").forEach(f=>{f.addEventListener("click",async()=>{await Va(f.dataset.deleteGoal),await s()})})}async function s(){e=await Dt(),a=wt(e),o()}function i(){return`
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${ea.map(n=>`<option value="${n.id}">${n.label}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field lt-goal-title-field">
          <span>Title</span>
          <input type="text" name="title" maxlength="80" placeholder="Dumbbell Row 45 x 12" required />
        </label>
        <label class="lt-field" data-lift-field>
          <span>Lift</span>
          <select name="lift_id">
            ${e.lifts.map(n=>`<option value="${n.id}">${ot(n.name)}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field" data-workout-field hidden>
          <span>Workout</span>
          <select name="workout_id">
            ${e.workouts.map(n=>`<option value="${n.id}">${ot(n.name)}</option>`).join("")}
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
    `}function g(){let n=t.querySelector("[data-goal-form]"),d=t.querySelector("[data-goal-type]"),f=t.querySelector("[data-goal-feedback]");function y(){let u=d.value;t.querySelector("[data-lift-field]").hidden=u!=="lift_set",t.querySelector("[data-workout-field]").hidden=!["weekly_workout_volume","workout_session_volume"].includes(u),t.querySelector("[data-lift-set-fields]").hidden=u!=="lift_set",t.querySelector("[data-target-field]").hidden=u==="lift_set"}d.addEventListener("change",y),y(),n.addEventListener("submit",async u=>{u.preventDefault(),f.hidden=!0;let k=n.type.value,m={title:n.title.value.trim(),type:k,unit:"lb",timeframe_weeks:We(n.timeframe_weeks.value),recurring:k.startsWith("weekly_")?"weekly":"none",metadata:{}};k==="lift_set"?(m.lift_id=n.lift_id.value,m.target_weight=We(n.target_weight.value),m.target_reps=We(n.target_reps.value)):(m.target_value=We(n.target_value.value),k!=="weekly_workout_days"&&(m.workout_id=n.workout_id.value));let E=vs(m);if(E){f.hidden=!1,f.textContent=E;return}await Fa(m),await It(),n.reset(),await s()})}function h(){let n=t.querySelector("[data-import-text]"),d=t.querySelector("[data-import-feedback]"),f=t.querySelector("[data-save-import]"),y=t.querySelector("[data-copy-goal-packet]"),u=t.querySelector("[data-goal-packet-output]"),k=t.querySelector("[data-goal-packet-status]");y.addEventListener("click",async()=>{let $=y.textContent;y.disabled=!0,y.textContent="Building...",k.hidden=!0;try{let m=await bs();u.value=m,u.hidden=!1;let E=await ks(m);k.hidden=!1,k.textContent=E?"Copied. Paste this into an LLM.":"Copy from the box below."}finally{y.disabled=!1,y.textContent=$}}),t.querySelector("[data-preview-import]").addEventListener("click",()=>{let $=Br(n.value,{lifts:e.lifts,workouts:e.workouts});if(r=$.goals,$.errors.length){f.hidden=!0,d.innerHTML=`<div class="lt-goal-import-errors">${$.errors.map(m=>`<p>${ot(m)}</p>`).join("")}</div>`;return}f.hidden=r.length===0,d.innerHTML=r.length?`<ul class="lt-goal-preview-list">${r.map(m=>`<li>${ot(m.title)} <span>${ot(m.type)}</span></li>`).join("")}</ul>`:'<p class="lt-empty">No goals found in that text.</p>'}),f.addEventListener("click",async()=>{r.length!==0&&(await Ba(r),await It(),n.value="",r=[],await s())})}o()}async function bs(){let t=await Q(),e=t.map(d=>d.id),a=Re().toISOString(),r=await he(e,a),o=new Map(t.map(d=>[d.id,[]]));for(let d of r){let f=o.get(d.lift_id);f&&f.push(d)}let i=(await at()).filter(d=>new Date(d.logged_at)>=new Date(a)),h=(await At()).filter(d=>new Date(d.logged_at)>=new Date(a)),n=se(t,o,new Date,void 0,ct(i),Rt(h));return["Use the Lift Tracker export below to create goals.","",lo,"","Return only YAML in this exact format. Do not wrap it in markdown fences.","",sa,"","Lift Tracker export:","",n].join(`
`)}async function ks(t){if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let a=document.execCommand("copy");return e.remove(),a}catch{return!1}}function io(t){let e=t.achieved||t.goal.status==="achieved";return`
    <article class="lt-goal-card${e?" lt-goal-card-achieved":""}">
      <div class="lt-goal-card-main">
        <span class="lt-goal-card-title">${ot(t.title)}</span>
        <span class="lt-goal-card-sub">${ot(t.currentLabel)} · ${ot(t.targetLabel)}</span>
        <span class="lt-goal-progress" aria-label="${tt(t.progress)} complete">
          <span style="width: ${Math.round(Math.min(t.progress,1)*100)}%"></span>
        </span>
      </div>
      <div class="lt-goal-card-side">
        <span>${e?"Hit":tt(t.progress)}</span>
        <button type="button" data-delete-goal="${t.goal.id}" aria-label="Delete ${uo(t.title)}">&times;</button>
      </div>
    </article>
  `}function vs(t){if(!t.title)return"Add a title.";if(t.type==="lift_set"){if(!t.lift_id)return"Choose a lift.";if(t.target_weight==null)return"Add a target weight.";if(t.target_reps==null)return"Add target reps."}else if(t.target_value==null)return"Add a target.";return(t.type==="weekly_workout_volume"||t.type==="workout_session_volume")&&!t.workout_id?"Choose a workout.":null}function We(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function ot(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function uo(t){return ot(t)}var po="__divider__";async function na(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,s]=await Promise.all([Q(),r?Xa(a):Promise.resolve(null)]);if(r&&!s){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(r?s.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?mo(s.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let g=t.querySelector("[data-workout-name-input]"),h=t.querySelector("[data-workout-lift-list]"),n=t.querySelector("[data-workout-lifts-empty]"),d=t.querySelector("[data-save-workout]"),f=t.querySelector("[data-workout-save-feedback]");n.hidden=o.length>0;let y=o.filter(m=>i.has(m.id)),u=o.filter(m=>!i.has(m.id));h.innerHTML=[...y.map(k),$(),...u.map(k)].join("");for(let m of o){let L=h.querySelector(`[data-lift-id="${m.id}"]`)?.querySelector("[data-name-slot]");L&&(L.textContent=m.name)}Qt(h,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${s.name}"? You'll have a few seconds to undo it after.`)&&(await Ja(a),O(),$t(`Deleted "${s.name}"`,{onUndo:async()=>{await Qa(a),ue()}}))}),d.addEventListener("click",async()=>{let m=g.value.trim();if(!m){g.focus();return}let E=Array.from(h.querySelectorAll("[data-reorder-item]")),L=E.findIndex(R=>R.dataset.reorderItem===po),q=E.slice(0,L).map(R=>R.dataset.reorderItem);d.disabled=!0,f.hidden=!0;try{if(r)await za(a,m,q);else{let R=await Ut();await ge(m,q,R.length)}O()}catch(R){console.error("[lift-tracker]",R),f.hidden=!1,f.textContent="Something went wrong saving the workout.",d.disabled=!1}});function k(m){return`
      <li class="lt-lift-row" data-reorder-item="${m.id}" data-lift-id="${m.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${mo(m.name)}">&#8942;&#8942;</button>
      </li>
    `}function $(){return`
      <li class="lt-workout-divider" data-reorder-item="${po}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function mo(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Ss=`${window.location.origin}${window.location.pathname}`;function xs(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ia(t){let e="signin";function a(o,s,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${xs(i||"")}">

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
          ${s?`<p class="lt-gate-info">${s}</p>`:""}

          <button type="button" class="lt-gate-toggle" data-auth-toggle>
            ${e==="signup"?"Already have an account? Sign in":"Don't have an account? Create one"}
          </button>
        </form>
      </main>
    `}function r(o,s,i){t.innerHTML=a(o,s,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let g=t.querySelector("[data-auth-form]");g.addEventListener("submit",async h=>{h.preventDefault();let n=g.email.value.trim(),d=g.password.value,f=g.querySelector('button[type="submit"]');f.disabled=!0,f.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:y,error:u}=e==="signup"?await x.auth.signUp({email:n,password:d,options:{emailRedirectTo:Ss}}):await x.auth.signInWithPassword({email:n,password:d});if(u)throw u;if(e==="signup"&&!y.session){e="signin",r(null,`Account created. Check ${n} for a confirmation link, then sign in here.`,n);return}}catch(y){r(y.message||"Something went wrong. Try again.",null,n)}})}r()}function fo(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function ho(){let{data:t,error:e}=await x.auth.signInAnonymously();if(e)throw e;return await Es(),t}async function Es(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([Nt("Bench Press",0),Nt("Squat",1),Nt("Deadlift",2)]);await Promise.all([it(e.id,135,8,t(6)),it(e.id,145,6,t(2)),it(a.id,185,5,t(5)),it(a.id,195,5,t(1)),it(r.id,225,5,t(3))]),await ge("Full Body",[e.id,a.id,r.id],0)}var et=document.getElementById("lift-tracker-app");so();var go=0;async function la(){let t=++go,e=()=>t!==go;try{let{data:{session:a}}=await x.auth.getSession();if(e())return;if(!a)if(fo())try{if(await ho(),e())return}catch(o){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",o),await ia(et);return}else return await ia(et),e(),void 0;let r=xa();if(r.name==="detail"?await Jr(et,r.liftId):r.name==="help"?await Zr(et):r.name==="weight"?await xr(et):r.name==="composite"?await to(et):r.name==="history"?await eo(et):r.name==="killstreak"?await no(et):r.name==="goals"?await co(et):r.name==="workout-new"?await na(et,{mode:"create"}):r.name==="workout-edit"?await na(et,{mode:"edit",workoutId:r.workoutId}):await Xr(et),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),et.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",la);var yo=null,wo=!1;x.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!wo;wo=!0;let o=a!==yo;yo=a,!(r||!o)&&(O(),la())});la();

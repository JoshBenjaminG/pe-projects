import{createClient as yo}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var da="https://mqfsgammpsumpltfutwl.supabase.co",ua="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var S=yo(da,ua);function pa(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="goals"?{name:"goals"}:{name:"list"}}function O(){window.location.hash="#/"}function ma(t){window.location.hash=`#/lift/${t}`}function fa(){window.location.hash="#/workout/new"}function ha(t){window.location.hash=`#/workout/${t}/edit`}function ga(){window.location.hash="#/help"}function ya(){window.location.hash="#/weight"}function wa(){window.location.hash="#/composite"}function ba(){window.location.hash="#/history"}function ka(){window.location.hash="#/killstreak"}function Mt(){window.location.hash="#/goals"}function ae(){window.dispatchEvent(new Event("hashchange"))}async function re(){let{data:t,error:e}=await S.auth.getUser();if(e)throw e;return t?.user?.id??null}async function va(){let{error:t}=await S.from("feedback_submissions").insert({});if(t)throw t}async function oe(){let{count:t,error:e}=await S.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function et(){let{data:t,error:e}=await S.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function wo(){let{data:t,error:e}=await S.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function Sa(t){let{data:e,error:a}=await S.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function Rt(t,e){let{data:a,error:r}=await S.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function xa(t,e){let{data:a,error:r}=await S.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Ea(t){let e=t.map((o,n)=>S.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function _a(t){let{error:e}=await S.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function La(t){let{error:e}=await S.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function $a(t){let{data:e,error:a}=await S.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ut(t){if(!t||t.length===0)return[];let{data:e,error:a}=await S.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ne(){let t=await wo();return ut(t)}async function Da(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await S.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function st(t,e,a,r){let{data:o,error:n}=await S.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Ca(t,e){let{data:a,error:r}=await S.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ta(t){let{error:e}=await S.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function qa(t){let{error:e}=await S.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Aa(){let{data:t,error:e}=await S.from("goals").select("*").is("deleted_at",null).order("created_at",{ascending:!0});if(e)throw e;return t}async function Ma(t){let{data:e,error:a}=await S.from("goals").insert(t).select().single();if(a)throw a;return e}async function Ra(t){if(!t||t.length===0)return[];let{data:e,error:a}=await S.from("goals").insert(t).select();if(a)throw a;return e}async function Wa(t,e){let{data:a,error:r}=await S.from("goals").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ia(t){let{error:e}=await S.from("goals").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Na(){let{data:t,error:e}=await S.from("goal_events").select("*").order("created_at",{ascending:!1}).limit(100);if(e)throw e;return t}async function bo(t){let{data:e,error:a}=await S.from("goal_events").insert(t).select().single();if(a){if(a.code==="23505")return null;throw a}return e}async function Pa(t){let e=[];for(let a of t){let r=await bo(a);r&&e.push(r)}return e}async function Wt(){let{data:t,error:e}=await S.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Ha(t){let e=t.map((o,n)=>S.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ua(t){let{data:e,error:a}=await S.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function se(t,e,a){let{data:r,error:o}=await S.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await S.from("workout_lifts").insert(e.map(i=>({workout_id:r.id,lift_id:i})));if(n)throw n}return r}async function Oa(t,e,a){let{error:r}=await S.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await S.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await S.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(n)throw n}}async function Fa(t){let{error:e}=await S.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ga(t){let{error:e}=await S.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function it(){let{data:t,error:e}=await S.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Ba(t,e){let{data:a,error:r}=await S.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Va(t,e){let{data:a,error:r}=await S.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ka(t){let{error:e}=await S.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ya(t){let{error:e}=await S.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Vt(){let{data:t,error:e}=await S.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ja(t,e){let{data:a,error:r}=await S.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Xa(t,e){let{data:a,error:r}=await S.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function za(t){let{error:e}=await S.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ja(t){let{error:e}=await S.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function j(t,e){return t*(1+e/30)}function T(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function pt(t){let e=new Map;for(let a of t){let r=T(a.performed_at),o=j(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function It(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let r=new Set;for(let i of e)for(let h of i.dailySeries)r.add(h.date);let o=Array.from(r).sort(),n=[];for(let i of o){let h=0,g=0;for(let s of e){let u=null;for(let f of s.dailySeries)if(f.date<=i)u=f;else break;u&&(h+=u.e1rm/a.get(s.liftId),g+=1)}if(g>0){let s=h/g;n.push({date:i,ratio:s,pct:(s-1)*100})}}return n}function ie(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>j(Number(r.weight),Number(r.reps))));return t>a}function Dt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function Qa(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function Za(t){let e=new Map;for(let a of t){let r=T(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function wt(t){let e=new Map;for(let a of t){let r=T(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function tr(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Kt(t){let e=new Map;for(let a of t){let r=T(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var Yt=null,bt=null,kt=null,vt=null,de=14,le="#e8242c",er="rgba(232, 36, 44, 0.18)",ce="#f2b134",ar="rgba(242, 177, 52, 0.16)",St="#9a9ca6",xt="rgba(255, 255, 255, 0.08)";function ue(t,e,{onPointClick:a}={}){Yt&&(Yt.destroy(),Yt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return Yt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:le,backgroundColor:er,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:le,pointHitRadius:de}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Yt}function rr(t,e,{onPointClick:a}={}){bt&&(bt.destroy(),bt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return bt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:ce,backgroundColor:ar,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:ce,pointHitRadius:de}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),bt}function or(){bt&&(bt.destroy(),bt=null)}function $e(t,e,{onPointClick:a}={}){kt&&(kt.destroy(),kt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return kt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:le,backgroundColor:er,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:le,pointHitRadius:de}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),kt}function De(){kt&&(kt.destroy(),kt=null)}function nr(t,e,{onPointClick:a}={}){vt&&(vt.destroy(),vt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return vt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:ce,backgroundColor:ar,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:ce,pointHitRadius:de}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),vt}function sr(){vt&&(vt.destroy(),vt=null)}function jt(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,i=0,h=0,g=0,s=0,u=null,f=null,w=null,d=0,k=0,q=null,m=null;function x(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function _(l){let c=l.target.closest(".lt-drag-handle");if(!c)return;let y=c.closest("[data-reorder-item]");if(y){if(l.pointerType!=="touch"){l.preventDefault(),N(y,l.clientX,l.clientY);return}if(c.setPointerCapture)try{c.setPointerCapture(l.pointerId),q=c,m=l.pointerId}catch{}w=y,d=l.clientX,k=l.clientY,document.addEventListener("pointermove",I),document.addEventListener("pointerup",G),f=setTimeout(()=>{clearTimeout(f),f=null;let L=w,R=d,M=k;A(),N(L,R,M)},180)}}function C(){if(q&&m!==null&&q.releasePointerCapture)try{q.releasePointerCapture(m)}catch{}q=null,m=null}function A(){clearTimeout(f),f=null,w=null,document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",G)}function I(l){if(!w)return;let c=l.clientX-d,y=l.clientY-k;Math.hypot(c,y)<=10||(A(),C())}function G(){A(),C()}function N(l,c,y){r=l,n=c,i=y,s=y;let L=l.getBoundingClientRect();g=L.top,h=L.left,o=document.createElement(l.tagName),o.className="lt-reorder-placeholder",o.style.height=`${l.offsetHeight}px`,o.style.width=`${l.offsetWidth}px`,l.after(o),l.classList.add("lt-dragging"),l.style.position="fixed",l.style.left=`${L.left}px`,l.style.width=`${L.width}px`,l.style.top=`${g}px`,l.style.zIndex="1000",document.addEventListener("pointermove",z),document.addEventListener("pointerup",v)}function V(){let l=x().filter(L=>L!==r),c=r.getBoundingClientRect(),y=null;if(a==="x"){let L=c.left+c.width/2,R=c.top+c.height/2;for(let M of l){let $=M.getBoundingClientRect(),K=$.left+$.width/2,H=$.top+$.height/2;if(Math.abs(H-R)<$.height/2?L<K:R<H){y=M;break}}}else{let L=c.top+c.height/2;for(let R of l){let M=R.getBoundingClientRect(),$=M.top+M.height/2;if(L<$){y=R;break}}}y?t.insertBefore(o,y):t.appendChild(o)}function B(){let l=s,c=window.innerHeight-s;return l<80?-16*(1-l/80):c<80?16*(1-c/80):0}function P(){if(!r){u=null;return}let l=B();if(l===0){u=null;return}window.scrollBy(0,l),V(),u=requestAnimationFrame(P)}function ot(){u===null&&B()!==0&&(u=requestAnimationFrame(P))}function X(){u!==null&&(cancelAnimationFrame(u),u=null)}function z(l){if(r){if(l.preventDefault(),s=l.clientY,a==="x"){let c=l.clientX-n,y=l.clientY-i;r.style.left=`${h+c}px`,r.style.top=`${g+y}px`}else{let c=l.clientY-i;r.style.top=`${g+c}px`}V(),a==="y"&&ot()}}function v(){if(!r)return;X(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",z),document.removeEventListener("pointerup",v),C();let l=x().map(c=>c.dataset.reorderItem);r=null,o=null,e&&e(l)}t.addEventListener("pointerdown",_)}var ko="joshuaegage@gmail.com";function ir(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function o(){if(r)return;r=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let i=document.scrollingElement;i&&(i.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(i){i.key==="Escape"&&o()}e.addEventListener("click",i=>{i.target===e&&o()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",o),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let i=a.value.trim(),h=encodeURIComponent("Lift Tracker feedback"),g=encodeURIComponent(i||"(no message entered)");va().catch(()=>{}),window.location.href=`mailto:${ko}?subject=${h}&body=${g}`,o()})}var Xt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function pe(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function vo(t,e=new Date){let a=pe(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let i=new Date(n.performed_at);i>=a&&i<r&&o.add(T(n.performed_at))}return o.size}function So(t){let e=null;for(let a of Xt)t>=a.days&&(e=a);return e}function me(t,e=new Date){let a=vo(t,e);return{days:a,tier:So(a)}}function Ce(t,e=null){let a=new Map;for(let o of t){let i=pe(new Date(o.performed_at)).getTime();a.has(i)||a.set(i,new Set),a.get(i).add(T(o.performed_at))}let r={};for(let o of Xt)r[o.key]=0;for(let o of a.values())for(let n of Xt)o.size>=n.days&&(r[n.key]+=1);return r}function xo(t){let e=new Set;for(let a of t)e.add(T(a.performed_at));return e.size}function Eo(t){let e=new Set;for(let a of t)e.add(pe(new Date(a.performed_at)).getTime());return e.size}function _o(t){let e=new Set;for(let n of t)e.add(pe(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,i)=>n-i);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+7),o=i.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Lo(t){let e=new Set;for(let n of t)e.add(T(n.performed_at));let a=Array.from(e).sort().map(n=>{let[i,h,g]=n.split("-").map(Number);return new Date(i,h-1,g)});if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+1),o=i.getTime()===a[n].getTime()?o+1:1,o>r&&(r=o)}return r}function $o(t){let e=new Map;for(let r of t)r.lift_id&&(e.has(r.lift_id)||e.set(r.lift_id,[]),e.get(r.lift_id).push(r));let a=It(Array.from(e.entries()).map(([r,o])=>({liftId:r,dailySeries:pt(o)})));return a.length?Math.max(...a.map(r=>r.pct)):0}function Do(t){let e=wt(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,r=0,o=0;for(let n of e){let i=n.weight-a;r=Math.max(r,i),o=Math.max(o,-i)}return{gain:r,loss:o}}function Te(t,e=null,a={}){let{bodyWeightEntries:r=[],hasSubmittedFeedback:o=!1}=a,n=Do(r);return{totalDays:xo(t),totalWeeks:Eo(t),tierCounts:Ce(t,e),longestStreak:_o(t),totalSets:t.length,longestDayStreak:Lo(t),compositeMaxPct:$o(t),bodyWeightGain:n.gain,bodyWeightLoss:n.loss,hasSubmittedFeedback:o||To(e)}}var Co=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function To(t){return t!=null&&Co.has(t)}var qo=50,Ao=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=qo&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function Nt(t,e=null,a={}){let r=Te(t,e,a);return Ao.map(o=>({id:o.id,name:o.name,track:o.track,description:o.description,flavor:o.flavor??null,theme:o.theme??null,unlocked:o.isUnlocked(r)}))}function fe(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Pt=null,zt=null;function lr(){return Pt||(Pt=document.createElement("div"),Pt.className="lt-toast",document.body.appendChild(Pt),Pt)}function Et(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=lr();clearTimeout(zt),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),i=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(zt),i(),e&&e()},{once:!0}),zt=setTimeout(()=>{i(),a&&a()},r)}function cr(t,{durationMs:e=4500}={}){let a=lr();clearTimeout(zt),a.innerHTML='<span class="lt-toast-message"></span>',a.querySelector(".lt-toast-message").textContent=t,a.classList.add("lt-toast-visible"),zt=setTimeout(()=>{a.classList.remove("lt-toast-visible")},e)}function _t(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function mt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function he(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function ge(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var dr="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function ye(t){try{return window.localStorage.getItem(`${dr}${t}`)==="true"}catch{return!1}}function lt(t){try{window.localStorage.setItem(`${dr}${t}`,"true")}catch{}}var ur="lt-weight-card-expanded";function Ht(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Mo(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function pr(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function mr(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await it(),o=wt(r),n=tr(o),i=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${i}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let h=n.change<0?"↘":n.change>0?"↗":"→",g=_t(ur,!1);function s(){t.classList.toggle("lt-stats-row-expanded",g),g?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${Ht(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Mo(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${Ht(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${h} ${Ht(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${Ht(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}g=!g,mt(ur,g),s()}),g?$e(t.querySelector("[data-home-weight-canvas]"),o):De()}s()}async function fr(t){lt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(l=>{l.addEventListener("click",()=>{l.dataset.tab!==r&&(r=l.dataset.tab,e.forEach(c=>c.setAttribute("aria-selected",String(c===l))),Object.entries(a).forEach(([c,y])=>{y.hidden=c!==r}),r==="weight"?d():ot().catch(c=>console.error("[lift-tracker]",c)))})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-weight-chart-section]"),g=t.querySelector("[data-weight-canvas]"),s=t.querySelector("[data-weight-empty]"),u=t.querySelector("[data-weight-history]");n.value=T(new Date().toISOString());let f=[];async function w(){f=await it(),k(),d()}function d(){let l=wt(f);if(l.length===0){h.hidden=!0,s.hidden=!1,De();return}h.hidden=!1,s.hidden=!0,a.weight.hidden||$e(g,l)}function k(){if(f.length===0){u.innerHTML="";return}let l=f.slice().sort((c,y)=>new Date(y.logged_at)-new Date(c.logged_at));u.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Ht(Number(c.weight))} lb</span>
              <span class="lt-history-e1rm">${pr(T(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),u.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>q(c.dataset.editTrigger))})}function q(l){let c=u.querySelector(`[data-entry-id="${l}"]`),y=f.find(L=>L.id===l);!c||!y||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${y.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${T(y.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",k),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Ka(l),await w(),Et("Weight entry deleted",{onUndo:async()=>{await Ya(l),await w()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async L=>{L.preventDefault();let R=Number(c.querySelector("[data-edit-weight]").value),M=c.querySelector("[data-edit-date]").value;if(!(R>=0)||!M)return;let $=new Date(y.logged_at),[K,H,tt]=M.split("-").map(Number);$.setFullYear(K,H-1,tt),await Va(l,{weight:R,logged_at:$.toISOString()}),await w()}))}o.addEventListener("submit",async l=>{l.preventDefault();let c=Number(i.value),y=n.value;if(!(c>=0)||!Number.isFinite(c)||!y)return;let[L,R,M]=y.split("-").map(Number),$=new Date;$.setFullYear(L,R-1,M),await Ba(c,$.toISOString()),i.value="",i.focus(),n.value=T(new Date().toISOString()),await w()});let m=t.querySelector("[data-waist-form]"),x=t.querySelector("[data-waist-date-input]"),_=t.querySelector("[data-waist-input]"),C=t.querySelector("[data-waist-chart-section]"),A=t.querySelector("[data-waist-canvas]"),I=t.querySelector("[data-waist-empty]"),G=t.querySelector("[data-waist-history]");x.value=T(new Date().toISOString());let N=[],V=!1,B=null;async function P(){N=await Vt(),V=!0,z(),X()}async function ot(){if(V){X();return}B||(I.hidden=!1,I.textContent="Loading waist...",C.hidden=!0,B=P().finally(()=>{B=null})),await B}function X(){let l=Kt(N);if(l.length===0){C.hidden=!0,I.hidden=!1,I.textContent="No waist measurements yet — add your first one above.",sr();return}C.hidden=!1,I.hidden=!0,a.waist.hidden||nr(A,l)}function z(){if(N.length===0){G.innerHTML="";return}let l=N.slice().sort((c,y)=>new Date(y.logged_at)-new Date(c.logged_at));G.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Ht(Number(c.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${pr(T(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),G.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>v(c.dataset.editTrigger))})}function v(l){let c=G.querySelector(`[data-entry-id="${l}"]`),y=N.find(L=>L.id===l);!c||!y||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${y.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${T(y.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",z),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await za(l),await P(),Et("Waist measurement deleted",{onUndo:async()=>{await Ja(l),await P()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async L=>{L.preventDefault();let R=Number(c.querySelector("[data-edit-waist]").value),M=c.querySelector("[data-edit-date]").value;if(!(R>=0)||!M)return;let $=new Date(y.logged_at),[K,H,tt]=M.split("-").map(Number);$.setFullYear(K,H-1,tt),await Xa(l,{waist_circumference:R,logged_at:$.toISOString()}),await P()}))}m.addEventListener("submit",async l=>{l.preventDefault();let c=Number(_.value),y=x.value;if(!(c>=0)||!Number.isFinite(c)||!y)return;let[L,R,M]=y.split("-").map(Number),$=new Date;$.setFullYear(L,R-1,M),await ja(c,$.toISOString()),_.value="",_.focus(),x.value=T(new Date().toISOString()),await P()}),await w()}var hr="lt-seen-rank-achievements";function we(){let t=he(hr,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function gr(t){ge(hr,JSON.stringify(t))}var qe="lt-active-workout";function Ae(){try{return window.localStorage.getItem(qe)||null}catch{return null}}function Me(t){try{t?window.localStorage.setItem(qe,t):window.localStorage.removeItem(qe)}catch{}}function yr(t){let e=Ae();return e&&t.find(a=>a.id===e)||null}var Ro=120,wr="lt-default-rest-seconds",br="lt-lift-rest-seconds-",kr="lt-rest-timer-enabled",at=null,Re=null,We=null,Ut=0,ft=null;function vr(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Sr(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function Ct(){return _t(kr,!1)}function xr(t){mt(kr,!!t)}function Ne(){return vr(wr)||Ro}function Er(t){Sr(wr,t)}function Pe(t){return vr(`${br}${t}`)}function _r(t,e){Sr(`${br}${t}`,e)}function be(t){return Pe(t)||Ne()}function He(){return at||(at=document.createElement("div"),at.className="lt-rest-timer",at.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,at.querySelector("[data-rest-add]").addEventListener("click",()=>{Ut&&(Ut+=30*1e3,Ie())}),at.querySelector("[data-rest-skip]").addEventListener("click",Lr),document.body.appendChild(at),at)}function Wo(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function Ie(){let t=He(),e=Ut-Date.now();t.querySelector("[data-rest-time]").textContent=Wo(e),e<=0&&No()}function Ue(){clearInterval(Re),clearTimeout(We),Re=null,We=null}function Io(){try{Jt(),ft.state==="suspended"&&ft.resume();let t=ft.currentTime,e=ft.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(ft.destination),[523.25,659.25].forEach((a,r)=>{let o=ft.createOscillator();o.type="sine",o.frequency.setValueAtTime(a,t+r*.12),o.connect(e),o.start(t+r*.12),o.stop(t+.75)})}catch{}}function Jt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;ft||=new t,ft.state==="suspended"&&ft.resume()}catch{}}function No(){Ue(),Ut=0;let t=He();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",Io(),navigator.vibrate&&navigator.vibrate([120,70,120]),We=setTimeout(Lr,12e3)}function Lr(){Ue(),Ut=0,at&&at.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function ke({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=He();Ue(),Ut=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,Ie(),Re=setInterval(Ie,250)}var Ge=[{id:"lift_set",label:"Lift set"},{id:"weekly_workout_days",label:"Weekly workout days"},{id:"weekly_workout_volume",label:"Weekly workout volume"},{id:"workout_session_volume",label:"Workout session volume"}],Po=[.8,.9,.95];function Qt(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function Ho(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r)}function Uo(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setDate(e.getDate()-e.getDay()),T(e.toISOString())}function $r(t,e=new Date){let a=Ho(Uo(e)),r=new Date(a);r.setDate(r.getDate()+7);let o=new Date(t);return o>=a&&o<r}function Ot(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function Zt(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function Q(t){return`${Math.round(Ot(t)*100)}%`}function Dr(t,e){let a=new Set(e?.liftIds||[]),r=new Map;for(let o of t){if(!a.has(o.lift_id))continue;let n=T(o.performed_at);r.set(n,(r.get(n)||0)+Number(o.weight)*Number(o.reps))}return r}function Oo(t,e){let a=e.liftsById||new Map,r=e.workoutsById||new Map,o=e.activeSets||[],n=e.workoutHistorySets||o,i=t.lift_id?a.get(t.lift_id):null,h=t.workout_id?r.get(t.workout_id):null;if(t.type==="lift_set"){let g=o.filter(x=>x.lift_id===t.lift_id),s=Number(t.target_weight),u=Number(t.target_reps),f=j(s,u),w=null,d=0,k=null;for(let x of g){let _=Number(x.weight),C=Number(x.reps),A=j(_,C);A>d&&(d=A,w=x),_>=s&&C>=u&&(k=x)}let q=!!k,m=q?1:Ot(d/f);return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:i?.name||"Lift goal",progress:m,achieved:q,currentLabel:w?`Best: ${Zt(w.weight)} x ${w.reps}`:"No sets yet",targetLabel:`Goal: ${Zt(s)} x ${u}`,detail:k?`Hit with ${Zt(k.weight)} x ${k.reps}.`:`${Q(m)} there.`}}if(t.type==="weekly_workout_days"){let g=new Set;for(let d of n)$r(d.performed_at)&&g.add(T(d.performed_at));let s=Number(t.target_value),u=g.size,f=u>=s,w=s>0?Ot(u/s):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"This week",progress:w,achieved:f,currentLabel:`${u} / ${Zt(s)} days`,targetLabel:u+1===s?"One more workout gets it.":`Goal: ${Zt(s)} days`,detail:f?"Weekly goal hit.":`${Q(w)} there.`}}if(t.type==="weekly_workout_volume"){let g=Dr(o.filter(d=>$r(d.performed_at)),h),s=Array.from(g.values()).reduce((d,k)=>d+k,0),u=Number(t.target_value),f=s>=u,w=u>0?Ot(s/u):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout volume",progress:w,achieved:f,currentLabel:`${Math.round(s)} / ${Math.round(u)} ${t.unit||"lb"}`,targetLabel:"This week",detail:f?"Weekly volume goal hit.":`${Q(w)} there.`}}if(t.type==="workout_session_volume"){let g=Dr(o,h),s=Math.max(0,...Array.from(g.values())),u=Number(t.target_value),f=s>=u,w=u>0?Ot(s/u):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout session",progress:w,achieved:f,currentLabel:`Best: ${Math.round(s)} ${t.unit||"lb"}`,targetLabel:`Goal: ${Math.round(u)} ${t.unit||"lb"}`,detail:f?"Session volume goal hit.":`${Q(w)} there.`}}return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"Unsupported goal",progress:0,achieved:!1,currentLabel:"",targetLabel:"",detail:""}}function Tr(t,e){return t.filter(a=>a.deleted_at==null).map(a=>Oo(a,e))}var Fo={"rank-private":t=>D(t.totalDays,1,"workout day"),"rank-pfc":t=>D(t.totalDays,2,"workout days"),"rank-corporal":t=>D(t.totalDays,3,"workout days"),"rank-sergeant":t=>D(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>D(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>D(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>D(t.totalDays,11,"workout days"),"rank-lieutenant":t=>D(t.totalDays,13,"workout days"),"rank-captain":t=>D(t.totalDays,15,"workout days"),"rank-major":t=>D(t.totalDays,18,"workout days"),"rank-colonel":t=>D(t.totalDays,22,"workout days"),"rank-general":t=>D(t.totalDays,27,"workout days"),"rank-prestige":t=>D(t.totalDays,33,"workout days"),"rank-prestige-master":t=>D(t.totalDays,40,"workout days"),"mastery-uav-1":t=>D(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>D(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>D(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>D(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>D(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>D(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>D(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>D(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>D(t.longestStreak,2,"weeks"),"streak-3":t=>D(t.longestStreak,3,"weeks"),"streak-4":t=>D(t.longestStreak,4,"weeks"),"streak-5":t=>D(t.longestStreak,5,"weeks"),"streak-6":t=>D(t.longestStreak,6,"weeks"),"streak-8":t=>D(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>Oe([D(t.totalDays,27,"workout days"),D(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>Oe([D(t.longestStreak,8,"week streak"),D(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>Oe([D(t.totalDays,40,"workout days"),D(t.tierCounts.chopper,3,"Choppers")])};function D(t,e,a){let r=Number(t)||0,o=Number(e)||1;return{current:r,target:o,progress:Ot(r/o),currentLabel:`${r} / ${o} ${a}`}}function Oe(t){return{...t.slice().sort((a,r)=>a.progress-r.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" · ")}}function qr(t,e=null,a={}){let r=Te(t,e,a);return Nt(t,e,a).filter(n=>n.track!=="secret").map(n=>{let i=Fo[n.id],h=i?i(r):{progress:n.unlocked?1:0,currentLabel:n.description};return{kind:"achievement",key:`achievement:${n.id}`,sourceKey:n.id,title:n.name,subtitle:n.track,progress:n.unlocked?1:h.progress,achieved:n.unlocked,currentLabel:h.currentLabel,targetLabel:n.description,detail:n.unlocked?"Achievement unlocked.":`${Q(h.progress)} there.`}})}function Ar({goalEvaluations:t=[],achievementItems:e=[],events:a=[]}={}){let r=a.slice().sort((n,i)=>new Date(i.created_at)-new Date(n.created_at))[0]||null,o=[...t,...e].filter(n=>!n.achieved&&n.progress>=.6).sort((n,i)=>i.progress-n.progress).slice(0,5);return{latest:r,closest:o}}function Mr(t,e=[]){let a=new Set(e.map(o=>Fe(o))),r=[];for(let o of t)if(o.kind==="goal"){for(let n of Po)if(o.progress>=n&&!o.achieved){let i={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"close",threshold:n,title:o.title,message:`${o.title} is ${Q(o.progress)} there.`,metadata:{progress:o.progress}};a.has(Fe(i))||r.push(i)}if(o.achieved){let n={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"achieved",threshold:1,title:o.title,message:`Goal hit: ${o.title}.`,metadata:{progress:1}};a.has(Fe(n))||r.push(n)}}return r}function Fe(t){return t.goal_id?`goal:${t.goal_id}:${t.event_type}:${Number(t.threshold)||0}`:`achievement:${t.source_key}:${t.event_type}`}function ve(t){return String(t||"").trim().toLowerCase()}function Go(t){let e=String(t||"").trim();return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function Cr(t){let e=Go(t);return/^-?\d+(\.\d+)?$/.test(e)?Number(e):e==="true"?!0:e==="false"?!1:e}function Rr(t,{lifts:e=[],workouts:a=[]}={}){let r=[],o=null;for(let s of String(t||"").split(/\r?\n/)){let u=s.trim();if(!u||u.startsWith("#")||u==="goals:"||u.startsWith("goal_format:"))continue;if(u.startsWith("- ")){o&&r.push(o),o={};let w=u.slice(2).trim();if(w){let d=w.match(/^([^:]+):\s*(.*)$/);d&&(o[d[1].trim()]=Cr(d[2]))}continue}let f=u.match(/^([^:]+):\s*(.*)$/);f&&o&&(o[f[1].trim()]=Cr(f[2]))}o&&r.push(o);let n=new Map(e.map(s=>[ve(s.name),s])),i=new Map(a.map(s=>[ve(s.name),s])),h=[],g=[];return r.forEach((s,u)=>{let f=u+1,w=String(s.type||"").trim(),d={title:String(s.title||"").trim(),type:w,unit:String(s.unit||"lb").trim()||"lb",timeframe_weeks:Qt(s.timeframe_weeks),recurring:s.recurring===!0?"weekly":s.recurring||"none",metadata:{imported:!0}};if(d.title||g.push(`Goal ${f}: missing title.`),Ge.some(k=>k.id===w)||g.push(`Goal ${f}: unsupported type "${w}".`),w==="lift_set"){let k=n.get(ve(s.lift));k||g.push(`Goal ${f}: could not find lift "${s.lift||""}".`),d.lift_id=k?.id,d.target_weight=Qt(s.weight),d.target_reps=Qt(s.reps),d.target_weight==null&&g.push(`Goal ${f}: missing weight.`),d.target_reps==null&&g.push(`Goal ${f}: missing reps.`)}if(w==="weekly_workout_days"&&(d.target_value=Qt(s.target),d.recurring="weekly",d.target_value==null&&g.push(`Goal ${f}: missing target.`)),w==="weekly_workout_volume"||w==="workout_session_volume"){let k=i.get(ve(s.workout));k||g.push(`Goal ${f}: could not find workout "${s.workout||""}".`),d.workout_id=k?.id,d.target_value=Qt(s.target),w==="weekly_workout_volume"&&(d.recurring="weekly"),d.target_value==null&&g.push(`Goal ${f}: missing target.`)}h.push(d)}),{goals:g.length?[]:h,errors:g,rawGoals:r}}async function Lt(){let[t,e,a,r,o,n,i,h]=await Promise.all([et(),Wt(),ne(),Aa(),Na(),it(),re(),oe()]),g=t.length?await ut(t.map(s=>s.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:g,goals:r,events:o,bodyWeightEntries:n,userId:i,feedbackGiven:h,liftsById:new Map(t.map(s=>[s.id,s])),workoutsById:new Map(e.map(s=>[s.id,s]))}}function ht(t){let e=Tr(t.goals,t),a=qr(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),r=Ar({goalEvaluations:e,achievementItems:a,events:t.events});return{goalEvaluations:e,achievementItems:a,momentum:r}}async function Tt({showToasts:t=!1}={}){let e=await Lt(),a=ht(e),r=Mr([...a.goalEvaluations,...a.achievementItems],e.events),o=await Pa(r);if(await Promise.all(a.goalEvaluations.filter(n=>n.achieved&&n.goal.status==="active"&&n.goal.recurring!=="weekly").map(n=>Wa(n.goal.id,{status:"achieved",achieved_at:new Date().toISOString()}))),t&&o.length>0){let n=o.find(g=>g.event_type==="achieved"),i=o.find(g=>g.event_type==="close"),h=n||i;h&&cr(h.message||h.title)}return{context:e,...a,createdEvents:o}}var Wr="lt-composite-expanded",Be="lt-header-menu-open",Ir="lt-momentum-expanded";async function Nr(t){let{data:{session:e}}=await S.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-menu" data-header-menu>
        <div class="lt-header-actions" data-header-actions hidden>
          ${a?"":'<button type="button" class="lt-feedback-btn" data-feedback-btn>Feedback</button>'}
          <button type="button" class="lt-feedback-btn" data-goals-btn>Goals</button>
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

      <button type="button" class="lt-history-btn" data-history-btn>
        <span>History</span>
        <span class="lt-discovery-badge" data-history-discovery hidden aria-label="History not opened yet">!</span>
      </button>
    </div>

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

    <section class="lt-momentum" data-momentum-section>
      <button type="button" class="lt-momentum-toggle" data-momentum-toggle aria-expanded="false">
        <span class="lt-momentum-title">Momentum</span>
        <span class="lt-momentum-summary" data-momentum-summary>Loading momentum...</span>
        <span class="lt-chevron" data-momentum-chevron>&#9660;</span>
      </button>
      <div class="lt-momentum-body" data-momentum-body hidden></div>
    </section>

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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,i=null;function h(p=!0){i&&(clearTimeout(i),i=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),p&&mt(Be,!1),i=setTimeout(()=>{o.hidden=!0,i=null},n)}function g({persist:p=!0,instant:b=!1}={}){i&&(clearTimeout(i),i=null),o.hidden=!1,b?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),p&&mt(Be,!0)}r.addEventListener("click",()=>{o.hidden?g():h()}),o.addEventListener("click",p=>{p.target.closest("button")&&h()}),_t(Be,!1)&&g({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",ga);let u=t.querySelector("[data-feedback-btn]");u&&u.addEventListener("click",()=>ir()),t.querySelector("[data-goals-btn]").addEventListener("click",Mt),t.querySelector("[data-logout-btn]").addEventListener("click",()=>S.auth.signOut());let w=t.querySelector("[data-composite-section]"),d=t.querySelector("[data-composite-toggle]"),k=t.querySelector("[data-composite-body]"),q=t.querySelector("[data-chevron]"),m=t.querySelector("[data-composite-summary]"),x=t.querySelector("[data-composite-discovery]"),_=t.querySelector("[data-momentum-toggle]"),C=t.querySelector("[data-momentum-body]"),A=t.querySelector("[data-momentum-summary]"),I=t.querySelector("[data-momentum-chevron]");function G(p){d.setAttribute("aria-expanded",String(p)),k.hidden=!p,q.innerHTML=p?"&#9650;":"&#9660;",w.classList.toggle("lt-stats-row-expanded",p)}G(_t(Wr,!0)),d.addEventListener("click",()=>{if(lt(J.composite),x.hidden=!0,window.matchMedia("(max-width: 359px)").matches){wa();return}let p=d.getAttribute("aria-expanded")==="true";G(!p),mt(Wr,!p)});function N(p){_.setAttribute("aria-expanded",String(p)),C.hidden=!p,I.innerHTML=p?"&#9650;":"&#9660;"}N(_t(Ir,!1)),_.addEventListener("click",()=>{let p=_.getAttribute("aria-expanded")==="true";N(!p),mt(Ir,!p)});let V=t.querySelector("[data-killstreak-icon]"),B=t.querySelector("[data-killstreak-label]"),P=t.querySelector("[data-killstreak-sub]"),ot=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",ka);function X(p){let{days:b,tier:E}=me(p);V.textContent=E?E.icon:"🎯",B.textContent=E?`${E.label} Killstreak`:"No Killstreak",P.textContent=`${b} Day streak`;let F=Nt(p).filter(U=>U.track==="rank"),W=fe(F,we()).length>0;ot.hidden=!W}let z=t.querySelector("[data-weight-card]");function v(){lt(J.weight),ya()}function l(p){mr(z,{onExpand:v,...p}).catch(b=>{console.error("[lift-tracker]",b),z.classList.remove("lt-stats-row-expanded"),z.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,z.querySelector("[data-weight-expand]").addEventListener("click",v)})}let c=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{lt(J.history),c.hidden=!0,ba()});let y=t.querySelector("[data-add-lift-form]"),L=t.querySelector("[data-add-lift-toggle]"),R=t.querySelector("[data-add-lift-discovery]"),M=t.querySelector("[data-add-lift-hint]"),$=t.querySelector("[data-create-workout-btn]"),K=t.querySelector("[data-create-workout-discovery]");L.addEventListener("click",()=>{let p=y.hidden;y.hidden=!p,L.setAttribute("aria-pressed",String(p)),L.classList.toggle("lt-add-lift-toggle-active",p),p&&y.querySelector('input[name="name"]').focus()});let H=t.querySelector("[data-lift-list]"),tt=t.querySelector("[data-list-empty]");$.addEventListener("click",()=>{$.disabled||fa()});let qt=t.querySelector("[data-workout-pills]"),so=t.querySelector("[data-workout-empty-hint]"),ct=[],nt=Ae();function Qe(){return nt&&ct.find(p=>p.id===nt)||null}function io(){let p=Qe();if(!p)return Y;let b=new Set(p.liftIds);return Y.filter(E=>b.has(E.id))}function Ze(){qt.innerHTML=ct.map(p=>{let b=p.id===nt;return`
          <div class="lt-workout-pill-wrap${b?" lt-workout-pill-wrap-active":""}" data-reorder-item="${p.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${p.id}" aria-pressed="${b}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${p.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let p of ct){let b=qt.querySelector(`[data-workout-pill="${p.id}"] [data-workout-pill-name]`);b&&(b.textContent=p.name)}qt.querySelectorAll("[data-workout-pill]").forEach(p=>{p.addEventListener("click",()=>{let b=p.dataset.workoutPill;nt=nt===b?null:b,Me(nt),Ze(),_e(Ft),ra(Ft)})}),qt.querySelectorAll("[data-workout-edit]").forEach(p=>{p.addEventListener("click",b=>{b.stopPropagation(),ha(p.dataset.workoutEdit)})})}let xe="lt-fast-mode",ta="lt-burst-mode";function lo(){try{let p=window.localStorage.getItem(xe);if(p!==null)return p==="true";let b=window.localStorage.getItem(ta);return b!==null?(window.localStorage.setItem(xe,b),window.localStorage.removeItem(ta),b==="true"):!1}catch{return!1}}function co(p){try{window.localStorage.setItem(xe,String(p))}catch{}}let Y=[],gt=lo(),yt=new Map,Ft=[],te=t.querySelector("[data-mode-toggle]");function ea(){te.textContent=gt?"Normal":"Fast",te.setAttribute("aria-pressed",String(gt)),te.classList.toggle("lt-mode-toggle-active",gt)}ea(),te.addEventListener("click",()=>{gt=!gt,co(gt),ea(),_e(Ft)}),y.addEventListener("submit",async p=>{p.preventDefault();let b=y.querySelector('input[name="name"]'),E=b.value.trim();if(E){b.value="",b.disabled=!0;try{await Rt(E,Y.length),await aa()}finally{b.disabled=!1,b.focus()}}}),jt(H,{onReorder:async p=>{let b=[...p],E=new Set(p),F=Y.map(W=>E.has(W.id)?b.shift():W.id);await Ea(F),Y=F.map(W=>Y.find(U=>U.id===W)).filter(Boolean)}}),jt(qt,{axis:"x",onReorder:async p=>{await Ha(p),ct=p.map(b=>ct.find(E=>E.id===b)).filter(Boolean)}});async function aa(){let p=await Lt();ct=p.workouts,nt&&!ct.some(U=>U.id===nt)&&(nt=null,Me(null)),Ze(),Y=p.lifts;let b=Y.length>=2;if(R.hidden=Y.length>=2,M.hidden=Y.length!==1,$.disabled=!b,$.setAttribute("aria-disabled",String(!b)),K.hidden=!b||ct.length>0,so.hidden=!b||ct.length>0,Y.length===0){H.innerHTML="",tt.hidden=!1,tt.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",M.hidden=!0,w.hidden=!0,X(p.workoutHistorySets),oa(ht(p).momentum),l({showDiscovery:!1}),c.hidden=!0,x.hidden=!0,yt=new Map,Ft=[];return}let E=p.activeSets,F=E.length>0;X(p.workoutHistorySets),oa(ht(p).momentum),l({showDiscovery:F&&!ye(J.weight)}),c.hidden=!F||ye(J.history),yt=new Map(Y.map(U=>[U.id,[]]));for(let U of E){let dt=yt.get(U.lift_id);dt&&dt.push(U)}let W=Y.map(U=>({liftId:U.id,dailySeries:pt(yt.get(U.id)||[])}));_e(W),ra(W)}function ra(p){let b=Qe(),E=b?p.filter(ee=>b.liftIds.includes(ee.liftId)):p,F=It(E);w.hidden=!1;let W=t.querySelector("[data-composite-canvas]"),U=t.querySelector("[data-composite-empty]"),dt=t.querySelector("[data-composite-scope]"),At=t.querySelector("[data-composite-blurb]");if(dt.textContent=b?`Measuring ${b.name}`:"Measuring all lifts",At.textContent=b?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",U.textContent=b?`Log a few sets for lifts in ${b.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",F.length===0){W.hidden=!0,U.hidden=!1,m.textContent="",x.hidden=!0;return}W.hidden=!1,U.hidden=!0,m.textContent=Qa(F[F.length-1].pct),x.hidden=ye(J.composite),ue(W,F)}function Ee(p){let b=pt(yt.get(p)||[]),E=b[b.length-1];return E?`${Math.round(E.e1rm)} lb e1RM`:"No sets yet"}function uo(p){let b=yt.get(p)||[];return b.length===0?"":b[b.length-1].weight}function _e(p){Ft=p;let b=io();tt.hidden=b.length>0,tt.textContent=nt?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",H.innerHTML=b.map(E=>gt?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${E.id}" data-lift-id="${E.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${E.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Ee(E.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Le(E.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${E.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${uo(E.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${Ee(E.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Le(E.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let E of Y){let W=H.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");W&&(W.textContent=E.name)}H.querySelectorAll("[data-open-lift]").forEach(E=>{E.addEventListener("click",()=>ma(E.dataset.openLift))}),gt&&po()}function po(){H.querySelectorAll("[data-fast-log-form]").forEach(p=>{let b=p.dataset.fastLogForm;p.addEventListener("submit",async E=>{E.preventDefault();let F=p.querySelector("[data-fast-weight]"),W=p.querySelector("[data-fast-reps]"),U=p.querySelector("[data-fast-feedback]"),dt=Number(F.value),At=Number(W.value);if(!(dt>=0)||!Number.isFinite(dt)||!(At>0)||!Number.isInteger(At))return;let ee=yt.get(b)||[],mo=j(dt,At),na=ie(mo,ee),sa=new Date().toISOString();Ct()&&Jt();let fo=await st(b,dt,At,sa),ho=Y.find(Bt=>Bt.id===b);Ct()&&ke({seconds:be(b),liftName:ho?.name||""});let ia=[...ee,fo];yt.set(b,ia),W.value="",W.focus();let la=H.querySelector(`[data-lift-id="${b}"]`)?.querySelector("[data-last-slot]");la&&(la.textContent=Ee(b));let go=T(sa),ca=Dt(ia.filter(Bt=>T(Bt.performed_at)===go));U.hidden=!1,U.classList.toggle("lt-pr",na),U.textContent=na?`PR! ${Math.round(ca)} lb today`:`Logged · ${Math.round(ca)} lb today`,Tt({showToasts:!0}).catch(Bt=>console.error("[lift-tracker]",Bt))})})}function oa(p){let b=p.latest,E=p.closest||[],F=E[0];A.textContent=b?`Latest: ${b.title}`:F?`Closest: ${F.title} · ${Q(F.progress)}`:"No goals yet",C.innerHTML=`
      <div class="lt-momentum-grid">
        <section>
          <h3>Recently Achieved</h3>
          ${b?`
            <article class="lt-momentum-item lt-momentum-item-achieved">
              <span>${Gt(b.title)}</span>
              <small>${Gt(b.message||"Recently achieved.")}</small>
            </article>
          `:'<p class="lt-empty">New goal and achievement wins will show here.</p>'}
        </section>
        <section>
          <h3>Closest</h3>
          ${E.length?E.map(W=>`
            <article class="lt-momentum-item">
              <span>${Gt(W.title)}</span>
              <small>${Gt(W.currentLabel)} · ${Gt(W.detail)}</small>
              <span class="lt-goal-progress"><span style="width: ${Math.round(W.progress*100)}%"></span></span>
            </article>
          `).join(""):'<p class="lt-empty">Set goals or keep logging to surface close achievements.</p>'}
        </section>
      </div>
      <button type="button" class="lt-goal-secondary-btn" data-open-goals>View goals</button>
    `,C.querySelector("[data-open-goals]").addEventListener("click",Mt)}function Le(p){return String(p).replace(/[&<>"']/g,b=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[b])}function Gt(p){return Le(p)}await aa()}async function Pr(t,e){let a=await Sa(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",v=>{v.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let v=r.value.trim();if(!v||v===o){r.value=o;return}o=v,await xa(e,v)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await _a(e),O(),Et(`Deleted "${o}"`,{onUndo:async()=>{await La(e),ae()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(v=>{v.addEventListener("click",()=>{n.forEach(l=>l.setAttribute("aria-selected",String(l===v))),Object.entries(i).forEach(([l,c])=>{c.hidden=l!==v.dataset.tab}),v.dataset.tab==="details"&&X()})});let h=t.querySelector("[data-log-form]"),g=t.querySelector("[data-weight-input]"),s=t.querySelector("[data-reps-input]"),u=t.querySelector("[data-log-feedback]"),f=t.querySelector("[data-default-rest-input]"),w=t.querySelector("[data-lift-rest-input]"),d=t.querySelector("[data-rest-enabled-input]"),k=t.querySelector("[data-rest-enabled-label]"),q=t.querySelector("[data-default-rest-field]"),m=t.querySelector("[data-lift-rest-field]"),x=t.querySelector("[data-lift-goals]"),_=[];function C(){f.value=Ne(),w.value=Pe(e)||"";let v=Ct();d.checked=v,k.textContent=v?"Rest timer: On":"Rest timer: Off",f.disabled=!v,w.disabled=!v,q.classList.toggle("lt-rest-setting-field-disabled",!v),m.classList.toggle("lt-rest-setting-field-disabled",!v)}function A(v){let l=Number(v.value);return v.value===""?null:!Number.isFinite(l)||l<15?15:l>600?600:Math.round(l)}f.addEventListener("change",()=>{let v=A(f)||120;Er(v),C()}),w.addEventListener("change",()=>{let v=A(w);_r(e,v),C()}),d.addEventListener("change",()=>{xr(d.checked),C()});async function I(){_=await $a(e)}function G(){if(_.length===0)return;let v=_[_.length-1];g.value=v.weight}h.addEventListener("submit",async v=>{v.preventDefault();let l=Number(g.value),c=Number(s.value);if(!(l>=0)||!Number.isFinite(l)||!(c>0)||!Number.isInteger(c))return;let y=j(l,c),R=ie(y,_),M=new Date;Ct()&&Jt(),await st(e,l,c,M.toISOString()),Ct()&&ke({seconds:be(e),liftName:o}),s.value="",s.focus(),await I(),B(),i.details.hidden||X(),z().catch(H=>console.error("[lift-tracker]",H));let $=T(M.toISOString()),K=Dt(_.filter(H=>T(H.performed_at)===$));u.hidden=!1,u.classList.toggle("lt-pr",R),u.textContent=R?`New PR! Today's volume: ${Math.round(K)} lb`:`Logged. Today's volume: ${Math.round(K)} lb`,Tt({showToasts:!0}).catch(H=>console.error("[lift-tracker]",H))});function N(v){let l=new Map;for(let c of v){let y=T(c.performed_at);l.has(y)||l.set(y,[]),l.get(y).push(c)}return Array.from(l.entries()).sort((c,y)=>y[0].localeCompare(c[0]))}function V(v){let[l,c,y]=v.split("-").map(Number);return new Date(l,c-1,y).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function B(){let v=i.history;if(_.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let l=N(_);v.innerHTML=l.map(([c,y])=>{let L=Dt(y),M=y.slice().sort(($,K)=>new Date(K.performed_at)-new Date($.performed_at)).map($=>{let K=Math.round(j(Number($.weight),Number($.reps)));return`
              <li class="lt-history-row" data-set-id="${$.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${$.id}">
                  <span class="lt-history-weight">${$.weight} lb &times; ${$.reps}</span>
                  <span class="lt-history-e1rm">${K} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${V(c)}</span>
              <span class="lt-history-volume">${Math.round(L)} lb volume</span>
            </div>
            <ul class="lt-history-list">${M}</ul>
          </div>
        `}).join(""),v.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>ot(c.dataset.editTrigger))})}function P(v){return i.history.querySelector(`[data-set-id="${v}"]`)}function ot(v){let l=P(v),c=_.find(y=>y.id===v);!l||!c||(l.innerHTML=`
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
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",B),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Ta(v),await I(),B(),i.details.hidden||X(),Et("Set deleted",{onUndo:async()=>{await qa(v),await I(),B(),i.details.hidden||X()}})}),l.querySelector("[data-edit-form]").addEventListener("submit",async y=>{y.preventDefault();let L=Number(l.querySelector("[data-edit-weight]").value),R=Number(l.querySelector("[data-edit-reps]").value),M=l.querySelector("[data-edit-date]").value;if(!(L>=0)||!(R>0)||!M)return;let $=new Date(c.performed_at),[K,H,tt]=M.split("-").map(Number);$.setFullYear(K,H-1,tt),await Ca(v,{weight:L,reps:R,performed_at:$.toISOString()}),await I(),B(),i.details.hidden||X()}))}function X(){let v=i.details,l=pt(_);if(l.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>',or();return}v.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let c=v.querySelector("[data-lift-canvas]"),y=v.querySelector("[data-point-detail]");rr(c,l,{onPointClick:L=>{y.hidden=!1,y.textContent=`${V(L.date)}: ${L.weight} lb × ${L.reps} (${Math.round(L.e1rm)} e1RM)`}})}await I(),C(),G(),B(),await z();async function z(){let v=await Lt(),{goalEvaluations:l}=ht(v),c=l.filter(y=>y.goal.type==="lift_set"&&y.goal.lift_id===e).slice(0,3);if(c.length===0){x.innerHTML=`
        <button type="button" class="lt-lift-goals-empty" data-open-goals>
          Set a goal for this lift
        </button>
      `,x.querySelector("[data-open-goals]").addEventListener("click",Mt);return}x.innerHTML=`
      <div class="lt-lift-goals-header">
        <span>Goals</span>
        <button type="button" data-open-goals>Manage</button>
      </div>
      ${c.map(y=>`
        <article class="lt-lift-goal-row">
          <span>
            <strong>${Ve(y.title)}</strong>
            <small>${Ve(y.currentLabel)} · ${Ve(y.targetLabel)}</small>
          </span>
          <em>${y.achieved?"Hit":Q(y.progress)}</em>
        </article>
      `).join("")}
    `,x.querySelector("[data-open-goals]").addEventListener("click",Mt)}}function Ve(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Hr=60;function Ur(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Hr),e}function $t(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Ke(t,e,a=new Date,r=`last ${Hr} days`,o=[],n=[]){let i=T(a.toISOString()),h=[`Lift Tracker — ${r} (as of ${i})`,""],g=t.filter(s=>(e.get(s.id)||[]).length>0);if(g.length===0)h.push("No sets logged in this period."),h.push("");else{for(let u of g){let f=(e.get(u.id)||[]).slice().sort((k,q)=>new Date(k.performed_at)-new Date(q.performed_at)),w=Dt(f),d=Math.max(...f.map(k=>j(Number(k.weight),Number(k.reps))));h.push(u.name);for(let k of f){let q=Math.round(j(Number(k.weight),Number(k.reps)));h.push(`  ${T(k.performed_at)}: ${k.weight} lb x ${k.reps} (e1RM ${q})`)}h.push(`  Sets: ${f.length} | Volume: ${Math.round(w)} lb | Best e1RM: ${Math.round(d)}`),h.push("")}let s=t.length-g.length;s>0&&(h.push(`(${s} lift${s===1?"":"s"} with no sets in this period omitted)`),h.push(""))}if(o.length>0){h.push("Body weight");for(let d of o)h.push(`  ${d.date}: ${$t(d.weight)} lb`);let s=o[0].weight,u=o[o.length-1].weight,f=u-s,w=f>0?"+":"";h.push(`  Start: ${$t(s)} lb | Current: ${$t(u)} lb | Change: ${w}${$t(f)} lb`),h.push("")}if(n.length>0){h.push("Waist");for(let d of n)h.push(`  ${d.date}: ${$t(d.waist)} in`);let s=n[0].waist,u=n[n.length-1].waist,f=u-s,w=f>0?"+":"";h.push(`  Start: ${$t(s)} in | Current: ${$t(u)} in | Change: ${w}${$t(f)} in`),h.push("")}return h.join(`
`).trimEnd()}var Bo=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Vo=`
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
`;async function Or(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Bo.map(d=>`
          <section class="lt-help-section">
            <h2>${d.title}</h2>
            <p>${d.body}</p>
          </section>
          ${d.title==="Export progress"?Vo:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let k=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(k)),a.hidden=!k,r.innerHTML=k?"&#9650;":"&#9660;",!!k){e.disabled=!0;try{let q=await et(),m=q.map(P=>P.id),x=Ur().toISOString(),_=await Da(m,x),C=new Map(q.map(P=>[P.id,[]]));for(let P of _){let ot=C.get(P.lift_id);ot&&ot.push(P)}let I=(await it()).filter(P=>new Date(P.logged_at)>=new Date(x)),G=wt(I),V=(await Vt()).filter(P=>new Date(P.logged_at)>=new Date(x)),B=Kt(V);o.value=Ke(q,C,new Date,void 0,G,B),i.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}i.hidden=!1,i.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let h=t.querySelector("[data-full-export-toggle]"),g=t.querySelector("[data-full-export-body]"),s=t.querySelector("[data-full-export-chevron]"),u=t.querySelector("[data-full-export-textarea]"),f=t.querySelector("[data-full-export-copy]"),w=t.querySelector("[data-full-export-status]");h.addEventListener("click",async()=>{let k=!(h.getAttribute("aria-expanded")==="true");if(h.setAttribute("aria-expanded",String(k)),g.hidden=!k,s.innerHTML=k?"&#9650;":"&#9660;",!!k){h.disabled=!0;try{let q=await et(),m=q.map(N=>N.id),x=await ut(m),_=new Map(q.map(N=>[N.id,[]]));for(let N of x){let V=_.get(N.lift_id);V&&V.push(N)}let C=await it(),A=wt(C),I=await Vt(),G=Kt(I);u.value=Ke(q,_,new Date,"all-time",A,G),w.hidden=!0}finally{h.disabled=!1}}}),f.addEventListener("click",async()=>{u.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(u.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}w.hidden=!1,w.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function Fr(t){lt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",O);let[e,a]=await Promise.all([et(),Wt()]),r=yr(a),o=r?e.filter(d=>r.liftIds.includes(d.id)):e,n=o.length?await ut(o.map(d=>d.id)):[],i=new Map(o.map(d=>[d.id,[]]));for(let d of n){let k=i.get(d.lift_id);k&&k.push(d)}let h=o.map(d=>({liftId:d.id,dailySeries:pt(i.get(d.id)||[])})),g=It(h),s=t.querySelector("[data-composite-canvas]"),u=t.querySelector("[data-composite-empty]"),f=t.querySelector("[data-composite-scope]"),w=t.querySelector("[data-composite-blurb]");if(f.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",w.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",u.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",g.length===0){s.hidden=!0,u.hidden=!1;return}s.hidden=!1,u.hidden=!0,ue(s,g)}function Ko(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Yo(){let t=await et(),e=new Map(t.map(r=>[r.id,r.name]));return(await ut(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function jo(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,i])=>{let g=i.slice().sort((s,u)=>new Date(s.performed_at)-new Date(u.performed_at)).map(s=>{let u=Math.round(j(Number(s.weight),Number(s.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${s.weight} lb &times; ${s.reps}</span>
                <span class="lt-history-e1rm">${u} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${g}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Ko(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function Gr(t){lt(J.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=t.querySelector("[data-history-content]"),a=await Yo();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=Za(a);e.innerHTML=r.map(([o,n])=>jo(o,n)).join("")}var Br="lt-theme",Ye="default";function je(){return he(Br,Ye)}function Vr(t){!t||t===Ye?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function Kr(t){Vr(t),ge(Br,t||Ye)}function Yr(){Vr(je())}var Xo={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},zo=["rank","mastery","streak","capstone","secret"],Jo="Hidden until unlocked.";async function jr(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let e=await ne(),a=await it(),r=await re(),o=await oe(),{days:n,tier:i}=me(e);t.querySelector("[data-killstreak-current-icon]").textContent=i?i.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=i?`${i.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let h=Ce(e,r),g=t.querySelector("[data-killstreak-tier-list]");g.innerHTML=Xt.map(m=>{let x=h[m.key];return`
      <li class="lt-killstreak-tier-row${i?.key===m.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${m.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${m.label}</span>
          <span class="lt-killstreak-tier-req">${m.days}+ day${m.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${x} earned</span>
      </li>
    `}).join("");let s=Nt(e,r,{bodyWeightEntries:a,hasSubmittedFeedback:o}),u=s.filter(m=>m.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${u} / ${s.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let f=s.filter(m=>m.track==="rank"),w=new Set(fe(f,we()));gr(f.filter(m=>m.unlocked).map(m=>m.id));let d=t.querySelector("[data-achievements]");function k(m){if(m.track!=="rank"){let I=m.track==="secret"&&!m.unlocked,G=I?" lt-achievement-card-desc-hidden":"",N=I?Jo:m.description,V=m.flavor&&!I?`<span class="lt-achievement-card-flavor">${m.flavor}</span>`:"";return`
        <li class="lt-achievement-card${m.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${m.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${m.name}</span>
            <span class="lt-achievement-card-desc${G}">${N}</span>
            ${V}
          </span>
        </li>
      `}let x=m.unlocked&&je()===m.theme.id,_=m.unlocked&&w.has(m.id),C=m.unlocked?`<span class="lt-achievement-card-theme">${m.theme.label} theme${x?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${m.theme.label}</span>`,A=_?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${m.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${_?" lt-achievement-card-new":""}${x?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${m.theme.id}"${m.unlocked?"":" disabled"} aria-label="${m.unlocked?`Apply the ${m.theme.label} theme`:`Locked: ${m.name}`}">
          <span class="lt-achievement-card-icon">${m.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${m.name}</span>
            <span class="lt-achievement-card-desc">${m.description}</span>
            ${C}
            ${A}
          </span>
        </button>
      </li>
    `}function q(){d.innerHTML=zo.map(m=>{let _=s.filter(C=>C.track===m).sort((C,A)=>Number(A.unlocked)-Number(C.unlocked)).map(k).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Xo[m]}</h3>
          ${m==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${_}</ul>
        </section>
      `}).join("")}q(),d.addEventListener("click",m=>{let x=m.target.closest("[data-apply-theme]");!x||x.disabled||(Kr(x.dataset.applyTheme),q())})}var Xr=`goal_format: lift_tracker_goals_v1
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
    recurring: weekly`,Qo=`Analyze this Lift Tracker export and create 5-8 goals that are achievable in 3-4 weeks.
Use only Lift Tracker YAML format.
Allowed types: lift_set, weekly_workout_days, weekly_workout_volume, workout_session_volume.
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;async function Jr(t){let e=await Lt(),a=ht(e),r=[];function o(){let s=a.goalEvaluations.filter(f=>f.goal.status==="active"&&!f.achieved),u=a.goalEvaluations.filter(f=>f.goal.status==="achieved"||f.achieved);t.innerHTML=`
      <header class="lt-detail-header">
        <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
        <h1 class="lt-weight-view-title">Goals</h1>
      </header>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Active Goals</h2>
        <div data-active-goals>
          ${s.length?s.map(zr).join(""):'<p class="lt-empty">No active goals yet. Add one below or paste a batch from an LLM.</p>'}
        </div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Add Goal</h2>
        ${i()}
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Import Goals</h2>
        <p class="lt-composite-blurb">Paste Lift Tracker YAML. Use exact lift and workout names. This format is intentionally simple so an LLM can read your export and generate goals.</p>
        <details class="lt-goal-import-help">
          <summary>Format and LLM prompt</summary>
          <p class="lt-composite-blurb">Allowed types: <strong>lift_set</strong>, <strong>weekly_workout_days</strong>, <strong>weekly_workout_volume</strong>, <strong>workout_session_volume</strong>.</p>
          <pre>${rt(Xr)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${rt(Qo)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${Qr(Xr)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${u.length?u.map(zr).join(""):'<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `,t.querySelector("[data-back]").addEventListener("click",O),h(),g(),t.querySelectorAll("[data-delete-goal]").forEach(f=>{f.addEventListener("click",async()=>{await Ia(f.dataset.deleteGoal),await n()})})}async function n(){e=await Lt(),a=ht(e),o()}function i(){return`
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${Ge.map(s=>`<option value="${s.id}">${s.label}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field lt-goal-title-field">
          <span>Title</span>
          <input type="text" name="title" maxlength="80" placeholder="Dumbbell Row 45 x 12" required />
        </label>
        <label class="lt-field" data-lift-field>
          <span>Lift</span>
          <select name="lift_id">
            ${e.lifts.map(s=>`<option value="${s.id}">${rt(s.name)}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field" data-workout-field hidden>
          <span>Workout</span>
          <select name="workout_id">
            ${e.workouts.map(s=>`<option value="${s.id}">${rt(s.name)}</option>`).join("")}
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
    `}function h(){let s=t.querySelector("[data-goal-form]"),u=t.querySelector("[data-goal-type]"),f=t.querySelector("[data-goal-feedback]");function w(){let d=u.value;t.querySelector("[data-lift-field]").hidden=d!=="lift_set",t.querySelector("[data-workout-field]").hidden=!["weekly_workout_volume","workout_session_volume"].includes(d),t.querySelector("[data-lift-set-fields]").hidden=d!=="lift_set",t.querySelector("[data-target-field]").hidden=d==="lift_set"}u.addEventListener("change",w),w(),s.addEventListener("submit",async d=>{d.preventDefault(),f.hidden=!0;let k=s.type.value,m={title:s.title.value.trim(),type:k,unit:"lb",timeframe_weeks:Se(s.timeframe_weeks.value),recurring:k.startsWith("weekly_")?"weekly":"none",metadata:{}};k==="lift_set"?(m.lift_id=s.lift_id.value,m.target_weight=Se(s.target_weight.value),m.target_reps=Se(s.target_reps.value)):(m.target_value=Se(s.target_value.value),k!=="weekly_workout_days"&&(m.workout_id=s.workout_id.value));let x=Zo(m);if(x){f.hidden=!1,f.textContent=x;return}await Ma(m),await Tt(),s.reset(),await n()})}function g(){let s=t.querySelector("[data-import-text]"),u=t.querySelector("[data-import-feedback]"),f=t.querySelector("[data-save-import]");t.querySelector("[data-preview-import]").addEventListener("click",()=>{let w=Rr(s.value,{lifts:e.lifts,workouts:e.workouts});if(r=w.goals,w.errors.length){f.hidden=!0,u.innerHTML=`<div class="lt-goal-import-errors">${w.errors.map(d=>`<p>${rt(d)}</p>`).join("")}</div>`;return}f.hidden=r.length===0,u.innerHTML=r.length?`<ul class="lt-goal-preview-list">${r.map(d=>`<li>${rt(d.title)} <span>${rt(d.type)}</span></li>`).join("")}</ul>`:'<p class="lt-empty">No goals found in that text.</p>'}),f.addEventListener("click",async()=>{r.length!==0&&(await Ra(r),await Tt(),s.value="",r=[],await n())})}o()}function zr(t){let e=t.achieved||t.goal.status==="achieved";return`
    <article class="lt-goal-card${e?" lt-goal-card-achieved":""}">
      <div class="lt-goal-card-main">
        <span class="lt-goal-card-title">${rt(t.title)}</span>
        <span class="lt-goal-card-sub">${rt(t.currentLabel)} · ${rt(t.targetLabel)}</span>
        <span class="lt-goal-progress" aria-label="${Q(t.progress)} complete">
          <span style="width: ${Math.round(Math.min(t.progress,1)*100)}%"></span>
        </span>
      </div>
      <div class="lt-goal-card-side">
        <span>${e?"Hit":Q(t.progress)}</span>
        <button type="button" data-delete-goal="${t.goal.id}" aria-label="Delete ${Qr(t.title)}">&times;</button>
      </div>
    </article>
  `}function Zo(t){if(!t.title)return"Add a title.";if(t.type==="lift_set"){if(!t.lift_id)return"Choose a lift.";if(t.target_weight==null)return"Add a target weight.";if(t.target_reps==null)return"Add target reps."}else if(t.target_value==null)return"Add a target.";return(t.type==="weekly_workout_volume"||t.type==="workout_session_volume")&&!t.workout_id?"Choose a workout.":null}function Se(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function rt(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Qr(t){return rt(t)}var Zr="__divider__";async function Xe(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([et(),r?Ua(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?to(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",O);let h=t.querySelector("[data-workout-name-input]"),g=t.querySelector("[data-workout-lift-list]"),s=t.querySelector("[data-workout-lifts-empty]"),u=t.querySelector("[data-save-workout]"),f=t.querySelector("[data-workout-save-feedback]");s.hidden=o.length>0;let w=o.filter(m=>i.has(m.id)),d=o.filter(m=>!i.has(m.id));g.innerHTML=[...w.map(k),q(),...d.map(k)].join("");for(let m of o){let _=g.querySelector(`[data-lift-id="${m.id}"]`)?.querySelector("[data-name-slot]");_&&(_.textContent=m.name)}jt(g,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Fa(a),O(),Et(`Deleted "${n.name}"`,{onUndo:async()=>{await Ga(a),ae()}}))}),u.addEventListener("click",async()=>{let m=h.value.trim();if(!m){h.focus();return}let x=Array.from(g.querySelectorAll("[data-reorder-item]")),_=x.findIndex(A=>A.dataset.reorderItem===Zr),C=x.slice(0,_).map(A=>A.dataset.reorderItem);u.disabled=!0,f.hidden=!0;try{if(r)await Oa(a,m,C);else{let A=await Wt();await se(m,C,A.length)}O()}catch(A){console.error("[lift-tracker]",A),f.hidden=!1,f.textContent="Something went wrong saving the workout.",u.disabled=!1}});function k(m){return`
      <li class="lt-lift-row" data-reorder-item="${m.id}" data-lift-id="${m.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${to(m.name)}">&#8942;&#8942;</button>
      </li>
    `}function q(){return`
      <li class="lt-workout-divider" data-reorder-item="${Zr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function to(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var tn=`${window.location.origin}${window.location.pathname}`;function en(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ze(t){let e="signin";function a(o,n,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${en(i||"")}">

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
    `}function r(o,n,i){t.innerHTML=a(o,n,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let h=t.querySelector("[data-auth-form]");h.addEventListener("submit",async g=>{g.preventDefault();let s=h.email.value.trim(),u=h.password.value,f=h.querySelector('button[type="submit"]');f.disabled=!0,f.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:w,error:d}=e==="signup"?await S.auth.signUp({email:s,password:u,options:{emailRedirectTo:tn}}):await S.auth.signInWithPassword({email:s,password:u});if(d)throw d;if(e==="signup"&&!w.session){e="signin",r(null,`Account created. Check ${s} for a confirmation link, then sign in here.`,s);return}}catch(w){r(w.message||"Something went wrong. Try again.",null,s)}})}r()}function eo(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function ao(){let{data:t,error:e}=await S.auth.signInAnonymously();if(e)throw e;return await an(),t}async function an(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([Rt("Bench Press",0),Rt("Squat",1),Rt("Deadlift",2)]);await Promise.all([st(e.id,135,8,t(6)),st(e.id,145,6,t(2)),st(a.id,185,5,t(5)),st(a.id,195,5,t(1)),st(r.id,225,5,t(3))]),await se("Full Body",[e.id,a.id,r.id],0)}var Z=document.getElementById("lift-tracker-app");Yr();var ro=0;async function Je(){let t=++ro,e=()=>t!==ro;try{let{data:{session:a}}=await S.auth.getSession();if(e())return;if(!a)if(eo())try{if(await ao(),e())return}catch(o){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",o),await ze(Z);return}else return await ze(Z),e(),void 0;let r=pa();if(r.name==="detail"?await Pr(Z,r.liftId):r.name==="help"?await Or(Z):r.name==="weight"?await fr(Z):r.name==="composite"?await Fr(Z):r.name==="history"?await Gr(Z):r.name==="killstreak"?await jr(Z):r.name==="goals"?await Jr(Z):r.name==="workout-new"?await Xe(Z,{mode:"create"}):r.name==="workout-edit"?await Xe(Z,{mode:"edit",workoutId:r.workoutId}):await Nr(Z),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",Je);var oo=null,no=!1;S.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!no;no=!0;let o=a!==oo;oo=a,!(r||!o)&&(O(),Je())});Je();

import{createClient as wo}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var ma="https://mqfsgammpsumpltfutwl.supabase.co",ha="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var S=wo(ma,ha);function ga(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="goals"?{name:"goals"}:{name:"list"}}function U(){window.location.hash="#/"}function ya(t){window.location.hash=`#/lift/${t}`}function wa(){window.location.hash="#/workout/new"}function ba(t){window.location.hash=`#/workout/${t}/edit`}function re(){window.location.hash="#/help"}function ka(){window.location.hash="#/weight"}function va(){window.location.hash="#/composite"}function Sa(){window.location.hash="#/history"}function xa(){window.location.hash="#/killstreak"}function Wt(){window.location.hash="#/goals"}function oe(){window.dispatchEvent(new Event("hashchange"))}async function ne(){let{data:t,error:e}=await S.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Ea(){let{error:t}=await S.from("feedback_submissions").insert({});if(t)throw t}async function se(){let{count:t,error:e}=await S.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function J(){let{data:t,error:e}=await S.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function bo(){let{data:t,error:e}=await S.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function La(t){let{data:e,error:a}=await S.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function It(t,e){let{data:a,error:r}=await S.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function _a(t,e){let{data:a,error:r}=await S.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Ca(t){let e=t.map((o,n)=>S.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Da(t){let{error:e}=await S.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function $a(t){let{error:e}=await S.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ta(t){let{data:e,error:a}=await S.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function pt(t){if(!t||t.length===0)return[];let{data:e,error:a}=await S.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ie(){let t=await bo();return pt(t)}async function le(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await S.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function it(t,e,a,r){let{data:o,error:n}=await S.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function qa(t,e){let{data:a,error:r}=await S.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ma(t){let{error:e}=await S.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Aa(t){let{error:e}=await S.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ra(){let{data:t,error:e}=await S.from("goals").select("*").is("deleted_at",null).order("created_at",{ascending:!0});if(e)throw e;return t}async function Wa(t){let{data:e,error:a}=await S.from("goals").insert(t).select().single();if(a)throw a;return e}async function Ia(t){if(!t||t.length===0)return[];let{data:e,error:a}=await S.from("goals").insert(t).select();if(a)throw a;return e}async function Na(t,e){let{data:a,error:r}=await S.from("goals").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Pa(t){let{error:e}=await S.from("goals").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ha(){let{data:t,error:e}=await S.from("goal_events").select("*").order("created_at",{ascending:!1}).limit(100);if(e)throw e;return t}async function ko(t){let{data:e,error:a}=await S.from("goal_events").insert(t).select().single();if(a){if(a.code==="23505")return null;throw a}return e}async function Oa(t){let e=[];for(let a of t){let r=await ko(a);r&&e.push(r)}return e}async function Nt(){let{data:t,error:e}=await S.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Ua(t){let e=t.map((o,n)=>S.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Fa(t){let{data:e,error:a}=await S.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function ce(t,e,a){let{data:r,error:o}=await S.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await S.from("workout_lifts").insert(e.map(i=>({workout_id:r.id,lift_id:i})));if(n)throw n}return r}async function Ba(t,e,a){let{error:r}=await S.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await S.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await S.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(n)throw n}}async function Ga(t){let{error:e}=await S.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Va(t){let{error:e}=await S.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function et(){let{data:t,error:e}=await S.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Ya(t,e){let{data:a,error:r}=await S.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Ka(t,e){let{data:a,error:r}=await S.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ja(t){let{error:e}=await S.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Xa(t){let{error:e}=await S.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Dt(){let{data:t,error:e}=await S.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function za(t,e){let{data:a,error:r}=await S.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Ja(t,e){let{data:a,error:r}=await S.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Qa(t){let{error:e}=await S.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Za(t){let{error:e}=await S.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function j(t,e){return t*(1+e/30)}function q(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function ft(t){let e=new Map;for(let a of t){let r=q(a.performed_at),o=j(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Pt(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let r=new Set;for(let i of e)for(let h of i.dailySeries)r.add(h.date);let o=Array.from(r).sort(),n=[];for(let i of o){let h=0,g=0;for(let s of e){let d=null;for(let m of s.dailySeries)if(m.date<=i)d=m;else break;d&&(h+=d.e1rm/a.get(s.liftId),g+=1)}if(g>0){let s=h/g;n.push({date:i,ratio:s,pct:(s-1)*100})}}return n}function de(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>j(Number(r.weight),Number(r.reps))));return t>a}function $t(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function tr(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function er(t){let e=new Map;for(let a of t){let r=q(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function lt(t){let e=new Map;for(let a of t){let r=q(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function ar(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Tt(t){let e=new Map;for(let a of t){let r=q(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var Kt=null,bt=null,kt=null,vt=null,fe=14,ue="#e8242c",rr="rgba(232, 36, 44, 0.18)",pe="#f2b134",or="rgba(242, 177, 52, 0.16)",St="#9a9ca6",xt="rgba(255, 255, 255, 0.08)";function me(t,e,{onPointClick:a}={}){Kt&&(Kt.destroy(),Kt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return Kt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:ue,backgroundColor:rr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:ue,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Kt}function nr(t,e,{onPointClick:a}={}){bt&&(bt.destroy(),bt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return bt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:pe,backgroundColor:or,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:pe,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),bt}function sr(){bt&&(bt.destroy(),bt=null)}function qe(t,e,{onPointClick:a}={}){kt&&(kt.destroy(),kt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return kt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:ue,backgroundColor:rr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:ue,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),kt}function Me(){kt&&(kt.destroy(),kt=null)}function ir(t,e,{onPointClick:a}={}){vt&&(vt.destroy(),vt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return vt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:pe,backgroundColor:or,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:pe,pointHitRadius:fe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),vt}function lr(){vt&&(vt.destroy(),vt=null)}function jt(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,i=0,h=0,g=0,s=0,d=null,m=null,y=null,u=0,k=0,C=null,p=null;function x(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function L(l){let c=l.target.closest(".lt-drag-handle");if(!c)return;let w=c.closest("[data-reorder-item]");if(w){if(l.pointerType!=="touch"){l.preventDefault(),N(w,l.clientX,l.clientY);return}if(c.setPointerCapture)try{c.setPointerCapture(l.pointerId),C=c,p=l.pointerId}catch{}y=w,u=l.clientX,k=l.clientY,document.addEventListener("pointermove",I),document.addEventListener("pointerup",B),m=setTimeout(()=>{clearTimeout(m),m=null;let _=y,R=u,A=k;M(),N(_,R,A)},180)}}function T(){if(C&&p!==null&&C.releasePointerCapture)try{C.releasePointerCapture(p)}catch{}C=null,p=null}function M(){clearTimeout(m),m=null,y=null,document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",B)}function I(l){if(!y)return;let c=l.clientX-u,w=l.clientY-k;Math.hypot(c,w)<=10||(M(),T())}function B(){M(),T()}function N(l,c,w){r=l,n=c,i=w,s=w;let _=l.getBoundingClientRect();g=_.top,h=_.left,o=document.createElement(l.tagName),o.className="lt-reorder-placeholder",o.style.height=`${l.offsetHeight}px`,o.style.width=`${l.offsetWidth}px`,l.after(o),l.classList.add("lt-dragging"),l.style.position="fixed",l.style.left=`${_.left}px`,l.style.width=`${_.width}px`,l.style.top=`${g}px`,l.style.zIndex="1000",document.addEventListener("pointermove",z),document.addEventListener("pointerup",v)}function V(){let l=x().filter(_=>_!==r),c=r.getBoundingClientRect(),w=null;if(a==="x"){let _=c.left+c.width/2,R=c.top+c.height/2;for(let A of l){let D=A.getBoundingClientRect(),Y=D.left+D.width/2,H=D.top+D.height/2;if(Math.abs(H-R)<D.height/2?_<Y:R<H){w=A;break}}}else{let _=c.top+c.height/2;for(let R of l){let A=R.getBoundingClientRect(),D=A.top+A.height/2;if(_<D){w=R;break}}}w?t.insertBefore(o,w):t.appendChild(o)}function G(){let l=s,c=window.innerHeight-s;return l<80?-16*(1-l/80):c<80?16*(1-c/80):0}function P(){if(!r){d=null;return}let l=G();if(l===0){d=null;return}window.scrollBy(0,l),V(),d=requestAnimationFrame(P)}function nt(){d===null&&G()!==0&&(d=requestAnimationFrame(P))}function X(){d!==null&&(cancelAnimationFrame(d),d=null)}function z(l){if(r){if(l.preventDefault(),s=l.clientY,a==="x"){let c=l.clientX-n,w=l.clientY-i;r.style.left=`${h+c}px`,r.style.top=`${g+w}px`}else{let c=l.clientY-i;r.style.top=`${g+c}px`}V(),a==="y"&&nt()}}function v(){if(!r)return;X(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",z),document.removeEventListener("pointerup",v),T();let l=x().map(c=>c.dataset.reorderItem);r=null,o=null,e&&e(l)}t.addEventListener("pointerdown",L)}var vo="joshuaegage@gmail.com";function cr(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function o(){if(r)return;r=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let i=document.scrollingElement;i&&(i.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(i){i.key==="Escape"&&o()}e.addEventListener("click",i=>{i.target===e&&o()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",o),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let i=a.value.trim(),h=encodeURIComponent("Lift Tracker feedback"),g=encodeURIComponent(i||"(no message entered)");Ea().catch(()=>{}),window.location.href=`mailto:${vo}?subject=${h}&body=${g}`,o()})}var Xt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function he(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function So(t,e=new Date){let a=he(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let i=new Date(n.performed_at);i>=a&&i<r&&o.add(q(n.performed_at))}return o.size}function xo(t){let e=null;for(let a of Xt)t>=a.days&&(e=a);return e}function ge(t,e=new Date){let a=So(t,e);return{days:a,tier:xo(a)}}function Ae(t,e=null){let a=new Map;for(let o of t){let i=he(new Date(o.performed_at)).getTime();a.has(i)||a.set(i,new Set),a.get(i).add(q(o.performed_at))}let r={};for(let o of Xt)r[o.key]=0;for(let o of a.values())for(let n of Xt)o.size>=n.days&&(r[n.key]+=1);return r}function Eo(t){let e=new Set;for(let a of t)e.add(q(a.performed_at));return e.size}function Lo(t){let e=new Set;for(let a of t)e.add(he(new Date(a.performed_at)).getTime());return e.size}function _o(t){let e=new Set;for(let n of t)e.add(he(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,i)=>n-i);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+7),o=i.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Co(t){let e=new Set;for(let n of t)e.add(q(n.performed_at));let a=Array.from(e).sort().map(n=>{let[i,h,g]=n.split("-").map(Number);return new Date(i,h-1,g)});if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+1),o=i.getTime()===a[n].getTime()?o+1:1,o>r&&(r=o)}return r}function Do(t){let e=new Map;for(let r of t)r.lift_id&&(e.has(r.lift_id)||e.set(r.lift_id,[]),e.get(r.lift_id).push(r));let a=Pt(Array.from(e.entries()).map(([r,o])=>({liftId:r,dailySeries:ft(o)})));return a.length?Math.max(...a.map(r=>r.pct)):0}function $o(t){let e=lt(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,r=0,o=0;for(let n of e){let i=n.weight-a;r=Math.max(r,i),o=Math.max(o,-i)}return{gain:r,loss:o}}function Re(t,e=null,a={}){let{bodyWeightEntries:r=[],hasSubmittedFeedback:o=!1}=a,n=$o(r);return{totalDays:Eo(t),totalWeeks:Lo(t),tierCounts:Ae(t,e),longestStreak:_o(t),totalSets:t.length,longestDayStreak:Co(t),compositeMaxPct:Do(t),bodyWeightGain:n.gain,bodyWeightLoss:n.loss,hasSubmittedFeedback:o||qo(e)}}var To=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function qo(t){return t!=null&&To.has(t)}var Mo=50,Ao=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=Mo&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function Ht(t,e=null,a={}){let r=Re(t,e,a);return Ao.map(o=>({id:o.id,name:o.name,track:o.track,description:o.description,flavor:o.flavor??null,theme:o.theme??null,unlocked:o.isUnlocked(r)}))}function ye(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Ot=null,zt=null;function dr(){return Ot||(Ot=document.createElement("div"),Ot.className="lt-toast",document.body.appendChild(Ot),Ot)}function Et(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=dr();clearTimeout(zt),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),i=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(zt),i(),e&&e()},{once:!0}),zt=setTimeout(()=>{i(),a&&a()},r)}function ur(t,{durationMs:e=4500}={}){let a=dr();clearTimeout(zt),a.innerHTML='<span class="lt-toast-message"></span>',a.querySelector(".lt-toast-message").textContent=t,a.classList.add("lt-toast-visible"),zt=setTimeout(()=>{a.classList.remove("lt-toast-visible")},e)}function Lt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function mt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function we(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function be(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var pr="lt-discovery-seen-",Q={weight:"weight",history:"history",composite:"composite"};function ke(t){try{return window.localStorage.getItem(`${pr}${t}`)==="true"}catch{return!1}}function ct(t){try{window.localStorage.setItem(`${pr}${t}`,"true")}catch{}}var fr="lt-weight-card-expanded";function Ut(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Ro(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function mr(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function hr(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await et(),o=lt(r),n=ar(o),i=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${i}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let h=n.change<0?"↘":n.change>0?"↗":"→",g=Lt(fr,!1);function s(){t.classList.toggle("lt-stats-row-expanded",g),g?t.innerHTML=`
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
              <span class="lt-weight-stat-label">Current (${Ro(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${Ut(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${h} ${Ut(Math.abs(n.change))} lbs</span>
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
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}g=!g,mt(fr,g),s()}),g?qe(t.querySelector("[data-home-weight-canvas]"),o):Me()}s()}async function gr(t){ct(Q.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(l=>{l.addEventListener("click",()=>{l.dataset.tab!==r&&(r=l.dataset.tab,e.forEach(c=>c.setAttribute("aria-selected",String(c===l))),Object.entries(a).forEach(([c,w])=>{w.hidden=c!==r}),r==="weight"?u():nt().catch(c=>console.error("[lift-tracker]",c)))})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-weight-chart-section]"),g=t.querySelector("[data-weight-canvas]"),s=t.querySelector("[data-weight-empty]"),d=t.querySelector("[data-weight-history]");n.value=q(new Date().toISOString());let m=[];async function y(){m=await et(),k(),u()}function u(){let l=lt(m);if(l.length===0){h.hidden=!0,s.hidden=!1,Me();return}h.hidden=!1,s.hidden=!0,a.weight.hidden||qe(g,l)}function k(){if(m.length===0){d.innerHTML="";return}let l=m.slice().sort((c,w)=>new Date(w.logged_at)-new Date(c.logged_at));d.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Ut(Number(c.weight))} lb</span>
              <span class="lt-history-e1rm">${mr(q(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),d.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>C(c.dataset.editTrigger))})}function C(l){let c=d.querySelector(`[data-entry-id="${l}"]`),w=m.find(_=>_.id===l);!c||!w||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${w.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${q(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",k),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await ja(l),await y(),Et("Weight entry deleted",{onUndo:async()=>{await Xa(l),await y()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async _=>{_.preventDefault();let R=Number(c.querySelector("[data-edit-weight]").value),A=c.querySelector("[data-edit-date]").value;if(!(R>=0)||!A)return;let D=new Date(w.logged_at),[Y,H,at]=A.split("-").map(Number);D.setFullYear(Y,H-1,at),await Ka(l,{weight:R,logged_at:D.toISOString()}),await y()}))}o.addEventListener("submit",async l=>{l.preventDefault();let c=Number(i.value),w=n.value;if(!(c>=0)||!Number.isFinite(c)||!w)return;let[_,R,A]=w.split("-").map(Number),D=new Date;D.setFullYear(_,R-1,A),await Ya(c,D.toISOString()),i.value="",i.focus(),n.value=q(new Date().toISOString()),await y()});let p=t.querySelector("[data-waist-form]"),x=t.querySelector("[data-waist-date-input]"),L=t.querySelector("[data-waist-input]"),T=t.querySelector("[data-waist-chart-section]"),M=t.querySelector("[data-waist-canvas]"),I=t.querySelector("[data-waist-empty]"),B=t.querySelector("[data-waist-history]");x.value=q(new Date().toISOString());let N=[],V=!1,G=null;async function P(){N=await Dt(),V=!0,z(),X()}async function nt(){if(V){X();return}G||(I.hidden=!1,I.textContent="Loading waist...",T.hidden=!0,G=P().finally(()=>{G=null})),await G}function X(){let l=Tt(N);if(l.length===0){T.hidden=!0,I.hidden=!1,I.textContent="No waist measurements yet — add your first one above.",lr();return}T.hidden=!1,I.hidden=!0,a.waist.hidden||ir(M,l)}function z(){if(N.length===0){B.innerHTML="";return}let l=N.slice().sort((c,w)=>new Date(w.logged_at)-new Date(c.logged_at));B.innerHTML=l.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${Ut(Number(c.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${mr(q(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),B.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>v(c.dataset.editTrigger))})}function v(l){let c=B.querySelector(`[data-entry-id="${l}"]`),w=N.find(_=>_.id===l);!c||!w||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${w.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${q(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",z),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await Qa(l),await P(),Et("Waist measurement deleted",{onUndo:async()=>{await Za(l),await P()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async _=>{_.preventDefault();let R=Number(c.querySelector("[data-edit-waist]").value),A=c.querySelector("[data-edit-date]").value;if(!(R>=0)||!A)return;let D=new Date(w.logged_at),[Y,H,at]=A.split("-").map(Number);D.setFullYear(Y,H-1,at),await Ja(l,{waist_circumference:R,logged_at:D.toISOString()}),await P()}))}p.addEventListener("submit",async l=>{l.preventDefault();let c=Number(L.value),w=x.value;if(!(c>=0)||!Number.isFinite(c)||!w)return;let[_,R,A]=w.split("-").map(Number),D=new Date;D.setFullYear(_,R-1,A),await za(c,D.toISOString()),L.value="",L.focus(),x.value=q(new Date().toISOString()),await P()}),await y()}var yr="lt-seen-rank-achievements";function ve(){let t=we(yr,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function wr(t){be(yr,JSON.stringify(t))}var We="lt-active-workout";function Ie(){try{return window.localStorage.getItem(We)||null}catch{return null}}function Ne(t){try{t?window.localStorage.setItem(We,t):window.localStorage.removeItem(We)}catch{}}function br(t){let e=Ie();return e&&t.find(a=>a.id===e)||null}var Wo=120,kr="lt-default-rest-seconds",vr="lt-lift-rest-seconds-",Sr="lt-rest-timer-enabled",rt=null,Pe=null,He=null,Ft=0,ht=null;function xr(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Er(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function qt(){return Lt(Sr,!1)}function Lr(t){mt(Sr,!!t)}function Ue(){return xr(kr)||Wo}function _r(t){Er(kr,t)}function Fe(t){return xr(`${vr}${t}`)}function Cr(t,e){Er(`${vr}${t}`,e)}function Se(t){return Fe(t)||Ue()}function Be(){return rt||(rt=document.createElement("div"),rt.className="lt-rest-timer",rt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,rt.querySelector("[data-rest-add]").addEventListener("click",()=>{Ft&&(Ft+=30*1e3,Oe())}),rt.querySelector("[data-rest-skip]").addEventListener("click",Dr),document.body.appendChild(rt),rt)}function Io(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function Oe(){let t=Be(),e=Ft-Date.now();t.querySelector("[data-rest-time]").textContent=Io(e),e<=0&&Po()}function Ge(){clearInterval(Pe),clearTimeout(He),Pe=null,He=null}function No(){try{Jt(),ht.state==="suspended"&&ht.resume();let t=ht.currentTime,e=ht.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(ht.destination),[523.25,659.25].forEach((a,r)=>{let o=ht.createOscillator();o.type="sine",o.frequency.setValueAtTime(a,t+r*.12),o.connect(e),o.start(t+r*.12),o.stop(t+.75)})}catch{}}function Jt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;ht||=new t,ht.state==="suspended"&&ht.resume()}catch{}}function Po(){Ge(),Ft=0;let t=Be();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",No(),navigator.vibrate&&navigator.vibrate([120,70,120]),He=setTimeout(Dr,12e3)}function Dr(){Ge(),Ft=0,rt&&rt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function xe({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=Be();Ge(),Ft=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,Oe(),Pe=setInterval(Oe,250)}var Ke=[{id:"lift_set",label:"Lift set"},{id:"weekly_workout_days",label:"Weekly workout days"},{id:"weekly_workout_volume",label:"Weekly workout volume"},{id:"workout_session_volume",label:"Workout session volume"}],Ho=[.8,.9,.95];function Qt(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function Oo(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r)}function Uo(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setDate(e.getDate()-e.getDay()),q(e.toISOString())}function $r(t,e=new Date){let a=Oo(Uo(e)),r=new Date(a);r.setDate(r.getDate()+7);let o=new Date(t);return o>=a&&o<r}function Bt(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function Zt(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function Z(t){return`${Math.round(Bt(t)*100)}%`}function Tr(t,e){let a=new Set(e?.liftIds||[]),r=new Map;for(let o of t){if(!a.has(o.lift_id))continue;let n=q(o.performed_at);r.set(n,(r.get(n)||0)+Number(o.weight)*Number(o.reps))}return r}function Fo(t,e){let a=e.liftsById||new Map,r=e.workoutsById||new Map,o=e.activeSets||[],n=e.workoutHistorySets||o,i=t.lift_id?a.get(t.lift_id):null,h=t.workout_id?r.get(t.workout_id):null;if(t.type==="lift_set"){let g=o.filter(x=>x.lift_id===t.lift_id),s=Number(t.target_weight),d=Number(t.target_reps),m=j(s,d),y=null,u=0,k=null;for(let x of g){let L=Number(x.weight),T=Number(x.reps),M=j(L,T);M>u&&(u=M,y=x),L>=s&&T>=d&&(k=x)}let C=!!k,p=C?1:Bt(u/m);return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:i?.name||"Lift goal",progress:p,achieved:C,currentLabel:y?`Best: ${Zt(y.weight)} x ${y.reps}`:"No sets yet",targetLabel:`Goal: ${Zt(s)} x ${d}`,detail:k?`Hit with ${Zt(k.weight)} x ${k.reps}.`:`${Z(p)} there.`}}if(t.type==="weekly_workout_days"){let g=new Set;for(let u of n)$r(u.performed_at)&&g.add(q(u.performed_at));let s=Number(t.target_value),d=g.size,m=d>=s,y=s>0?Bt(d/s):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"This week",progress:y,achieved:m,currentLabel:`${d} / ${Zt(s)} days`,targetLabel:d+1===s?"One more workout gets it.":`Goal: ${Zt(s)} days`,detail:m?"Weekly goal hit.":`${Z(y)} there.`}}if(t.type==="weekly_workout_volume"){let g=Tr(o.filter(u=>$r(u.performed_at)),h),s=Array.from(g.values()).reduce((u,k)=>u+k,0),d=Number(t.target_value),m=s>=d,y=d>0?Bt(s/d):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout volume",progress:y,achieved:m,currentLabel:`${Math.round(s)} / ${Math.round(d)} ${t.unit||"lb"}`,targetLabel:"This week",detail:m?"Weekly volume goal hit.":`${Z(y)} there.`}}if(t.type==="workout_session_volume"){let g=Tr(o,h),s=Math.max(0,...Array.from(g.values())),d=Number(t.target_value),m=s>=d,y=d>0?Bt(s/d):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout session",progress:y,achieved:m,currentLabel:`Best: ${Math.round(s)} ${t.unit||"lb"}`,targetLabel:`Goal: ${Math.round(d)} ${t.unit||"lb"}`,detail:m?"Session volume goal hit.":`${Z(y)} there.`}}return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"Unsupported goal",progress:0,achieved:!1,currentLabel:"",targetLabel:"",detail:""}}function Mr(t,e){return t.filter(a=>a.deleted_at==null).map(a=>Fo(a,e))}var Bo={"rank-private":t=>$(t.totalDays,1,"workout day"),"rank-pfc":t=>$(t.totalDays,2,"workout days"),"rank-corporal":t=>$(t.totalDays,3,"workout days"),"rank-sergeant":t=>$(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>$(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>$(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>$(t.totalDays,11,"workout days"),"rank-lieutenant":t=>$(t.totalDays,13,"workout days"),"rank-captain":t=>$(t.totalDays,15,"workout days"),"rank-major":t=>$(t.totalDays,18,"workout days"),"rank-colonel":t=>$(t.totalDays,22,"workout days"),"rank-general":t=>$(t.totalDays,27,"workout days"),"rank-prestige":t=>$(t.totalDays,33,"workout days"),"rank-prestige-master":t=>$(t.totalDays,40,"workout days"),"mastery-uav-1":t=>$(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>$(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>$(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>$(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>$(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>$(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>$(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>$(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>$(t.longestStreak,2,"weeks"),"streak-3":t=>$(t.longestStreak,3,"weeks"),"streak-4":t=>$(t.longestStreak,4,"weeks"),"streak-5":t=>$(t.longestStreak,5,"weeks"),"streak-6":t=>$(t.longestStreak,6,"weeks"),"streak-8":t=>$(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>Ve([$(t.totalDays,27,"workout days"),$(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>Ve([$(t.longestStreak,8,"week streak"),$(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>Ve([$(t.totalDays,40,"workout days"),$(t.tierCounts.chopper,3,"Choppers")])};function $(t,e,a){let r=Number(t)||0,o=Number(e)||1;return{current:r,target:o,progress:Bt(r/o),currentLabel:`${r} / ${o} ${a}`}}function Ve(t){return{...t.slice().sort((a,r)=>a.progress-r.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" · ")}}function Ar(t,e=null,a={}){let r=Re(t,e,a);return Ht(t,e,a).filter(n=>n.track!=="secret").map(n=>{let i=Bo[n.id],h=i?i(r):{progress:n.unlocked?1:0,currentLabel:n.description};return{kind:"achievement",key:`achievement:${n.id}`,sourceKey:n.id,title:n.name,subtitle:n.track,progress:n.unlocked?1:h.progress,achieved:n.unlocked,currentLabel:h.currentLabel,targetLabel:n.description,detail:n.unlocked?"Achievement unlocked.":`${Z(h.progress)} there.`}})}function Rr({goalEvaluations:t=[],achievementItems:e=[],events:a=[]}={}){let r=a.slice().sort((n,i)=>new Date(i.created_at)-new Date(n.created_at))[0]||null,o=[...t,...e].filter(n=>!n.achieved&&n.progress>=.6).sort((n,i)=>i.progress-n.progress).slice(0,5);return{latest:r,closest:o}}function Wr(t,e=[]){let a=new Set(e.map(o=>Ye(o))),r=[];for(let o of t)if(o.kind==="goal"){for(let n of Ho)if(o.progress>=n&&!o.achieved){let i={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"close",threshold:n,title:o.title,message:`${o.title} is ${Z(o.progress)} there.`,metadata:{progress:o.progress}};a.has(Ye(i))||r.push(i)}if(o.achieved){let n={goal_id:o.goal.id,source_type:"goal",source_key:`goal:${o.goal.id}`,event_type:"achieved",threshold:1,title:o.title,message:`Goal hit: ${o.title}.`,metadata:{progress:1}};a.has(Ye(n))||r.push(n)}}return r}function Ye(t){return t.goal_id?`goal:${t.goal_id}:${t.event_type}:${Number(t.threshold)||0}`:`achievement:${t.source_key}:${t.event_type}`}function Ee(t){return String(t||"").trim().toLowerCase()}function Go(t){let e=String(t||"").trim();return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function qr(t){let e=Go(t);return/^-?\d+(\.\d+)?$/.test(e)?Number(e):e==="true"?!0:e==="false"?!1:e}function Ir(t,{lifts:e=[],workouts:a=[]}={}){let r=[],o=null;for(let s of String(t||"").split(/\r?\n/)){let d=s.trim();if(!d||d.startsWith("#")||d==="goals:"||d.startsWith("goal_format:"))continue;if(d.startsWith("- ")){o&&r.push(o),o={};let y=d.slice(2).trim();if(y){let u=y.match(/^([^:]+):\s*(.*)$/);u&&(o[u[1].trim()]=qr(u[2]))}continue}let m=d.match(/^([^:]+):\s*(.*)$/);m&&o&&(o[m[1].trim()]=qr(m[2]))}o&&r.push(o);let n=new Map(e.map(s=>[Ee(s.name),s])),i=new Map(a.map(s=>[Ee(s.name),s])),h=[],g=[];return r.forEach((s,d)=>{let m=d+1,y=String(s.type||"").trim(),u={title:String(s.title||"").trim(),type:y,unit:String(s.unit||"lb").trim()||"lb",timeframe_weeks:Qt(s.timeframe_weeks),recurring:s.recurring===!0?"weekly":s.recurring||"none",metadata:{imported:!0}};if(u.title||g.push(`Goal ${m}: missing title.`),Ke.some(k=>k.id===y)||g.push(`Goal ${m}: unsupported type "${y}".`),y==="lift_set"){let k=n.get(Ee(s.lift));k||g.push(`Goal ${m}: could not find lift "${s.lift||""}".`),u.lift_id=k?.id,u.target_weight=Qt(s.weight),u.target_reps=Qt(s.reps),u.target_weight==null&&g.push(`Goal ${m}: missing weight.`),u.target_reps==null&&g.push(`Goal ${m}: missing reps.`)}if(y==="weekly_workout_days"&&(u.target_value=Qt(s.target),u.recurring="weekly",u.target_value==null&&g.push(`Goal ${m}: missing target.`)),y==="weekly_workout_volume"||y==="workout_session_volume"){let k=i.get(Ee(s.workout));k||g.push(`Goal ${m}: could not find workout "${s.workout||""}".`),u.workout_id=k?.id,u.target_value=Qt(s.target),y==="weekly_workout_volume"&&(u.recurring="weekly"),u.target_value==null&&g.push(`Goal ${m}: missing target.`)}h.push(u)}),{goals:g.length?[]:h,errors:g,rawGoals:r}}async function _t(){let[t,e,a,r,o,n,i,h]=await Promise.all([J(),Nt(),ie(),Ra(),Ha(),et(),ne(),se()]),g=t.length?await pt(t.map(s=>s.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:g,goals:r,events:o,bodyWeightEntries:n,userId:i,feedbackGiven:h,liftsById:new Map(t.map(s=>[s.id,s])),workoutsById:new Map(e.map(s=>[s.id,s]))}}function gt(t){let e=Mr(t.goals,t),a=Ar(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),r=Rr({goalEvaluations:e,achievementItems:a,events:t.events});return{goalEvaluations:e,achievementItems:a,momentum:r}}async function Mt({showToasts:t=!1}={}){let e=await _t(),a=gt(e),r=Wr([...a.goalEvaluations,...a.achievementItems],e.events),o=await Oa(r);if(await Promise.all(a.goalEvaluations.filter(n=>n.achieved&&n.goal.status==="active"&&n.goal.recurring!=="weekly").map(n=>Na(n.goal.id,{status:"achieved",achieved_at:new Date().toISOString()}))),t&&o.length>0){let n=o.find(g=>g.event_type==="achieved"),i=o.find(g=>g.event_type==="close"),h=n||i;h&&ur(h.message||h.title)}return{context:e,...a,createdEvents:o}}var Nr="lt-composite-expanded",je="lt-header-menu-open",Pr="lt-momentum-expanded";async function Hr(t){let{data:{session:e}}=await S.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-menu" data-header-menu>
        <div class="lt-header-actions" data-header-actions hidden>
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
    ${a?"":'<button type="button" class="lt-feedback-btn lt-bottom-feedback-btn" data-feedback-btn>Feedback</button>'}
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,i=null;function h(f=!0){i&&(clearTimeout(i),i=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),f&&mt(je,!1),i=setTimeout(()=>{o.hidden=!0,i=null},n)}function g({persist:f=!0,instant:b=!1}={}){i&&(clearTimeout(i),i=null),o.hidden=!1,b?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),f&&mt(je,!0)}r.addEventListener("click",()=>{o.hidden?g():h()}),o.addEventListener("click",f=>{f.target.closest("button")&&h()}),Lt(je,!1)&&g({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",re);let d=t.querySelector("[data-feedback-btn]");d&&d.addEventListener("click",()=>cr()),t.querySelector("[data-goals-btn]").addEventListener("click",Wt),t.querySelector("[data-logout-btn]").addEventListener("click",()=>S.auth.signOut());let y=t.querySelector("[data-composite-section]"),u=t.querySelector("[data-composite-toggle]"),k=t.querySelector("[data-composite-body]"),C=t.querySelector("[data-chevron]"),p=t.querySelector("[data-composite-summary]"),x=t.querySelector("[data-composite-discovery]"),L=t.querySelector("[data-momentum-toggle]"),T=t.querySelector("[data-momentum-body]"),M=t.querySelector("[data-momentum-summary]"),I=t.querySelector("[data-momentum-chevron]");function B(f){u.setAttribute("aria-expanded",String(f)),k.hidden=!f,C.innerHTML=f?"&#9650;":"&#9660;",y.classList.toggle("lt-stats-row-expanded",f)}B(Lt(Nr,!0)),u.addEventListener("click",()=>{if(ct(Q.composite),x.hidden=!0,window.matchMedia("(max-width: 359px)").matches){va();return}let f=u.getAttribute("aria-expanded")==="true";B(!f),mt(Nr,!f)});function N(f){L.setAttribute("aria-expanded",String(f)),T.hidden=!f,I.innerHTML=f?"&#9650;":"&#9660;"}N(Lt(Pr,!1)),L.addEventListener("click",()=>{let f=L.getAttribute("aria-expanded")==="true";N(!f),mt(Pr,!f)});let V=t.querySelector("[data-killstreak-icon]"),G=t.querySelector("[data-killstreak-label]"),P=t.querySelector("[data-killstreak-sub]"),nt=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",xa);function X(f){let{days:b,tier:E}=ge(f);V.textContent=E?E.icon:"🎯",G.textContent=E?`${E.label} Killstreak`:"No Killstreak",P.textContent=`${b} Day streak`;let F=Ht(f).filter(O=>O.track==="rank"),W=ye(F,ve()).length>0;nt.hidden=!W}let z=t.querySelector("[data-weight-card]");function v(){ct(Q.weight),ka()}function l(f){hr(z,{onExpand:v,...f}).catch(b=>{console.error("[lift-tracker]",b),z.classList.remove("lt-stats-row-expanded"),z.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,z.querySelector("[data-weight-expand]").addEventListener("click",v)})}let c=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{ct(Q.history),c.hidden=!0,Sa()});let w=t.querySelector("[data-add-lift-form]"),_=t.querySelector("[data-add-lift-toggle]"),R=t.querySelector("[data-add-lift-discovery]"),A=t.querySelector("[data-add-lift-hint]"),D=t.querySelector("[data-create-workout-btn]"),Y=t.querySelector("[data-create-workout-discovery]");_.addEventListener("click",()=>{let f=w.hidden;w.hidden=!f,_.setAttribute("aria-pressed",String(f)),_.classList.toggle("lt-add-lift-toggle-active",f),f&&w.querySelector('input[name="name"]').focus()});let H=t.querySelector("[data-lift-list]"),at=t.querySelector("[data-list-empty]");D.addEventListener("click",()=>{D.disabled||wa()});let At=t.querySelector("[data-workout-pills]"),io=t.querySelector("[data-workout-empty-hint]"),dt=[],st=Ie();function aa(){return st&&dt.find(f=>f.id===st)||null}function lo(){let f=aa();if(!f)return K;let b=new Set(f.liftIds);return K.filter(E=>b.has(E.id))}function ra(){At.innerHTML=dt.map(f=>{let b=f.id===st;return`
          <div class="lt-workout-pill-wrap${b?" lt-workout-pill-wrap-active":""}" data-reorder-item="${f.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${f.id}" aria-pressed="${b}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${f.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let f of dt){let b=At.querySelector(`[data-workout-pill="${f.id}"] [data-workout-pill-name]`);b&&(b.textContent=f.name)}At.querySelectorAll("[data-workout-pill]").forEach(f=>{f.addEventListener("click",()=>{let b=f.dataset.workoutPill;st=st===b?null:b,Ne(st),ra(),$e(Gt),ia(Gt)})}),At.querySelectorAll("[data-workout-edit]").forEach(f=>{f.addEventListener("click",b=>{b.stopPropagation(),ba(f.dataset.workoutEdit)})})}let Ce="lt-fast-mode",oa="lt-burst-mode";function co(){try{let f=window.localStorage.getItem(Ce);if(f!==null)return f==="true";let b=window.localStorage.getItem(oa);return b!==null?(window.localStorage.setItem(Ce,b),window.localStorage.removeItem(oa),b==="true"):!1}catch{return!1}}function uo(f){try{window.localStorage.setItem(Ce,String(f))}catch{}}let K=[],yt=co(),wt=new Map,Gt=[],ee=t.querySelector("[data-mode-toggle]");function na(){ee.textContent=yt?"Normal":"Fast",ee.setAttribute("aria-pressed",String(yt)),ee.classList.toggle("lt-mode-toggle-active",yt)}na(),ee.addEventListener("click",()=>{yt=!yt,uo(yt),na(),$e(Gt)}),w.addEventListener("submit",async f=>{f.preventDefault();let b=w.querySelector('input[name="name"]'),E=b.value.trim();if(E){b.value="",b.disabled=!0;try{await It(E,K.length),await sa()}finally{b.disabled=!1,b.focus()}}}),jt(H,{onReorder:async f=>{let b=[...f],E=new Set(f),F=K.map(W=>E.has(W.id)?b.shift():W.id);await Ca(F),K=F.map(W=>K.find(O=>O.id===W)).filter(Boolean)}}),jt(At,{axis:"x",onReorder:async f=>{await Ua(f),dt=f.map(b=>dt.find(E=>E.id===b)).filter(Boolean)}});async function sa(){let f=await _t();dt=f.workouts,st&&!dt.some(O=>O.id===st)&&(st=null,Ne(null)),ra(),K=f.lifts;let b=K.length>=2;if(R.hidden=K.length>=2,A.hidden=K.length!==1,D.disabled=!b,D.setAttribute("aria-disabled",String(!b)),Y.hidden=!b||dt.length>0,io.hidden=!b||dt.length>0,K.length===0){H.innerHTML="",at.hidden=!1,at.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",A.hidden=!0,y.hidden=!0,X(f.workoutHistorySets),la(gt(f).momentum),l({showDiscovery:!1}),c.hidden=!0,x.hidden=!0,wt=new Map,Gt=[];return}let E=f.activeSets,F=E.length>0;X(f.workoutHistorySets),la(gt(f).momentum),l({showDiscovery:F&&!ke(Q.weight)}),c.hidden=!F||ke(Q.history),wt=new Map(K.map(O=>[O.id,[]]));for(let O of E){let ut=wt.get(O.lift_id);ut&&ut.push(O)}let W=K.map(O=>({liftId:O.id,dailySeries:ft(wt.get(O.id)||[])}));$e(W),ia(W)}function ia(f){let b=aa(),E=b?f.filter(ae=>b.liftIds.includes(ae.liftId)):f,F=Pt(E);y.hidden=!1;let W=t.querySelector("[data-composite-canvas]"),O=t.querySelector("[data-composite-empty]"),ut=t.querySelector("[data-composite-scope]"),Rt=t.querySelector("[data-composite-blurb]");if(ut.textContent=b?`Measuring ${b.name}`:"Measuring all lifts",Rt.textContent=b?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",O.textContent=b?`Log a few sets for lifts in ${b.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",F.length===0){W.hidden=!0,O.hidden=!1,p.textContent="",x.hidden=!0;return}W.hidden=!1,O.hidden=!0,p.textContent=tr(F[F.length-1].pct),x.hidden=ke(Q.composite),me(W,F)}function De(f){let b=ft(wt.get(f)||[]),E=b[b.length-1];return E?`${Math.round(E.e1rm)} lb e1RM`:"No sets yet"}function po(f){let b=wt.get(f)||[];return b.length===0?"":b[b.length-1].weight}function $e(f){Gt=f;let b=lo();at.hidden=b.length>0,at.textContent=st?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",H.innerHTML=b.map(E=>yt?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${E.id}" data-lift-id="${E.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${E.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${De(E.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Te(E.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${E.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${po(E.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${De(E.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Te(E.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let E of K){let W=H.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");W&&(W.textContent=E.name)}H.querySelectorAll("[data-open-lift]").forEach(E=>{E.addEventListener("click",()=>ya(E.dataset.openLift))}),yt&&fo()}function fo(){H.querySelectorAll("[data-fast-log-form]").forEach(f=>{let b=f.dataset.fastLogForm;f.addEventListener("submit",async E=>{E.preventDefault();let F=f.querySelector("[data-fast-weight]"),W=f.querySelector("[data-fast-reps]"),O=f.querySelector("[data-fast-feedback]"),ut=Number(F.value),Rt=Number(W.value);if(!(ut>=0)||!Number.isFinite(ut)||!(Rt>0)||!Number.isInteger(Rt))return;let ae=wt.get(b)||[],mo=j(ut,Rt),ca=de(mo,ae),da=new Date().toISOString();qt()&&Jt();let ho=await it(b,ut,Rt,da),go=K.find(Yt=>Yt.id===b);qt()&&xe({seconds:Se(b),liftName:go?.name||""});let ua=[...ae,ho];wt.set(b,ua),W.value="",W.focus();let pa=H.querySelector(`[data-lift-id="${b}"]`)?.querySelector("[data-last-slot]");pa&&(pa.textContent=De(b));let yo=q(da),fa=$t(ua.filter(Yt=>q(Yt.performed_at)===yo));O.hidden=!1,O.classList.toggle("lt-pr",ca),O.textContent=ca?`PR! ${Math.round(fa)} lb today`:`Logged · ${Math.round(fa)} lb today`,Mt({showToasts:!0}).catch(Yt=>console.error("[lift-tracker]",Yt))})})}function la(f){let b=f.latest,E=f.closest||[],F=E[0];M.textContent=b?`Latest: ${b.title}`:F?`Closest: ${F.title} · ${Z(F.progress)}`:"No goals yet",T.innerHTML=`
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
    `,T.querySelector("[data-open-goals]").addEventListener("click",Wt)}function Te(f){return String(f).replace(/[&<>"']/g,b=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[b])}function Vt(f){return Te(f)}await sa()}async function Or(t,e){let a=await La(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",v=>{v.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let v=r.value.trim();if(!v||v===o){r.value=o;return}o=v,await _a(e,v)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Da(e),U(),Et(`Deleted "${o}"`,{onUndo:async()=>{await $a(e),oe()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(v=>{v.addEventListener("click",()=>{n.forEach(l=>l.setAttribute("aria-selected",String(l===v))),Object.entries(i).forEach(([l,c])=>{c.hidden=l!==v.dataset.tab}),v.dataset.tab==="details"&&X()})});let h=t.querySelector("[data-log-form]"),g=t.querySelector("[data-weight-input]"),s=t.querySelector("[data-reps-input]"),d=t.querySelector("[data-log-feedback]"),m=t.querySelector("[data-default-rest-input]"),y=t.querySelector("[data-lift-rest-input]"),u=t.querySelector("[data-rest-enabled-input]"),k=t.querySelector("[data-rest-enabled-label]"),C=t.querySelector("[data-default-rest-field]"),p=t.querySelector("[data-lift-rest-field]"),x=t.querySelector("[data-lift-goals]"),L=[];function T(){m.value=Ue(),y.value=Fe(e)||"";let v=qt();u.checked=v,k.textContent=v?"Rest timer: On":"Rest timer: Off",m.disabled=!v,y.disabled=!v,C.classList.toggle("lt-rest-setting-field-disabled",!v),p.classList.toggle("lt-rest-setting-field-disabled",!v)}function M(v){let l=Number(v.value);return v.value===""?null:!Number.isFinite(l)||l<15?15:l>600?600:Math.round(l)}m.addEventListener("change",()=>{let v=M(m)||120;_r(v),T()}),y.addEventListener("change",()=>{let v=M(y);Cr(e,v),T()}),u.addEventListener("change",()=>{Lr(u.checked),T()});async function I(){L=await Ta(e)}function B(){if(L.length===0)return;let v=L[L.length-1];g.value=v.weight}h.addEventListener("submit",async v=>{v.preventDefault();let l=Number(g.value),c=Number(s.value);if(!(l>=0)||!Number.isFinite(l)||!(c>0)||!Number.isInteger(c))return;let w=j(l,c),R=de(w,L),A=new Date;qt()&&Jt(),await it(e,l,c,A.toISOString()),qt()&&xe({seconds:Se(e),liftName:o}),s.value="",s.focus(),await I(),G(),i.details.hidden||X(),z().catch(H=>console.error("[lift-tracker]",H));let D=q(A.toISOString()),Y=$t(L.filter(H=>q(H.performed_at)===D));d.hidden=!1,d.classList.toggle("lt-pr",R),d.textContent=R?`New PR! Today's volume: ${Math.round(Y)} lb`:`Logged. Today's volume: ${Math.round(Y)} lb`,Mt({showToasts:!0}).catch(H=>console.error("[lift-tracker]",H))});function N(v){let l=new Map;for(let c of v){let w=q(c.performed_at);l.has(w)||l.set(w,[]),l.get(w).push(c)}return Array.from(l.entries()).sort((c,w)=>w[0].localeCompare(c[0]))}function V(v){let[l,c,w]=v.split("-").map(Number);return new Date(l,c-1,w).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function G(){let v=i.history;if(L.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let l=N(L);v.innerHTML=l.map(([c,w])=>{let _=$t(w),A=w.slice().sort((D,Y)=>new Date(Y.performed_at)-new Date(D.performed_at)).map(D=>{let Y=Math.round(j(Number(D.weight),Number(D.reps)));return`
              <li class="lt-history-row" data-set-id="${D.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${D.id}">
                  <span class="lt-history-weight">${D.weight} lb &times; ${D.reps}</span>
                  <span class="lt-history-e1rm">${Y} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${V(c)}</span>
              <span class="lt-history-volume">${Math.round(_)} lb volume</span>
            </div>
            <ul class="lt-history-list">${A}</ul>
          </div>
        `}).join(""),v.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>nt(c.dataset.editTrigger))})}function P(v){return i.history.querySelector(`[data-set-id="${v}"]`)}function nt(v){let l=P(v),c=L.find(w=>w.id===v);!l||!c||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${c.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${c.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${q(c.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",G),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Ma(v),await I(),G(),i.details.hidden||X(),Et("Set deleted",{onUndo:async()=>{await Aa(v),await I(),G(),i.details.hidden||X()}})}),l.querySelector("[data-edit-form]").addEventListener("submit",async w=>{w.preventDefault();let _=Number(l.querySelector("[data-edit-weight]").value),R=Number(l.querySelector("[data-edit-reps]").value),A=l.querySelector("[data-edit-date]").value;if(!(_>=0)||!(R>0)||!A)return;let D=new Date(c.performed_at),[Y,H,at]=A.split("-").map(Number);D.setFullYear(Y,H-1,at),await qa(v,{weight:_,reps:R,performed_at:D.toISOString()}),await I(),G(),i.details.hidden||X()}))}function X(){let v=i.details,l=ft(L);if(l.length===0){v.innerHTML='<p class="lt-empty">No sets logged yet.</p>',sr();return}v.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let c=v.querySelector("[data-lift-canvas]"),w=v.querySelector("[data-point-detail]");nr(c,l,{onPointClick:_=>{w.hidden=!1,w.textContent=`${V(_.date)}: ${_.weight} lb × ${_.reps} (${Math.round(_.e1rm)} e1RM)`}})}await I(),T(),B(),G(),await z();async function z(){let v=await _t(),{goalEvaluations:l}=gt(v),c=l.filter(w=>w.goal.type==="lift_set"&&w.goal.lift_id===e).slice(0,3);if(c.length===0){x.innerHTML=`
        <button type="button" class="lt-lift-goals-empty" data-open-goals>
          Set a goal for this lift
        </button>
      `,x.querySelector("[data-open-goals]").addEventListener("click",Wt);return}x.innerHTML=`
      <div class="lt-lift-goals-header">
        <span>Goals</span>
        <button type="button" data-open-goals>Manage</button>
      </div>
      ${c.map(w=>`
        <article class="lt-lift-goal-row">
          <span>
            <strong>${Xe(w.title)}</strong>
            <small>${Xe(w.currentLabel)} · ${Xe(w.targetLabel)}</small>
          </span>
          <em>${w.achieved?"Hit":Z(w.progress)}</em>
        </article>
      `).join("")}
    `,x.querySelector("[data-open-goals]").addEventListener("click",Wt)}}function Xe(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Ur=60;function Le(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Ur),e}function Ct(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function te(t,e,a=new Date,r=`last ${Ur} days`,o=[],n=[]){let i=q(a.toISOString()),h=[`Lift Tracker — ${r} (as of ${i})`,""],g=t.filter(s=>(e.get(s.id)||[]).length>0);if(g.length===0)h.push("No sets logged in this period."),h.push("");else{for(let d of g){let m=(e.get(d.id)||[]).slice().sort((k,C)=>new Date(k.performed_at)-new Date(C.performed_at)),y=$t(m),u=Math.max(...m.map(k=>j(Number(k.weight),Number(k.reps))));h.push(d.name);for(let k of m){let C=Math.round(j(Number(k.weight),Number(k.reps)));h.push(`  ${q(k.performed_at)}: ${k.weight} lb x ${k.reps} (e1RM ${C})`)}h.push(`  Sets: ${m.length} | Volume: ${Math.round(y)} lb | Best e1RM: ${Math.round(u)}`),h.push("")}let s=t.length-g.length;s>0&&(h.push(`(${s} lift${s===1?"":"s"} with no sets in this period omitted)`),h.push(""))}if(o.length>0){h.push("Body weight");for(let u of o)h.push(`  ${u.date}: ${Ct(u.weight)} lb`);let s=o[0].weight,d=o[o.length-1].weight,m=d-s,y=m>0?"+":"";h.push(`  Start: ${Ct(s)} lb | Current: ${Ct(d)} lb | Change: ${y}${Ct(m)} lb`),h.push("")}if(n.length>0){h.push("Waist");for(let u of n)h.push(`  ${u.date}: ${Ct(u.waist)} in`);let s=n[0].waist,d=n[n.length-1].waist,m=d-s,y=m>0?"+":"";h.push(`  Start: ${Ct(s)} in | Current: ${Ct(d)} in | Change: ${y}${Ct(m)} in`),h.push("")}return h.join(`
`).trimEnd()}var Vo=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Yo=`
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
`;async function Fr(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Vo.map(u=>`
          <section class="lt-help-section">
            <h2>${u.title}</h2>
            <p>${u.body}</p>
          </section>
          ${u.title==="Export progress"?Yo:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let k=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(k)),a.hidden=!k,r.innerHTML=k?"&#9650;":"&#9660;",!!k){e.disabled=!0;try{let C=await J(),p=C.map(P=>P.id),x=Le().toISOString(),L=await le(p,x),T=new Map(C.map(P=>[P.id,[]]));for(let P of L){let nt=T.get(P.lift_id);nt&&nt.push(P)}let I=(await et()).filter(P=>new Date(P.logged_at)>=new Date(x)),B=lt(I),V=(await Dt()).filter(P=>new Date(P.logged_at)>=new Date(x)),G=Tt(V);o.value=te(C,T,new Date,void 0,B,G),i.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}i.hidden=!1,i.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let h=t.querySelector("[data-full-export-toggle]"),g=t.querySelector("[data-full-export-body]"),s=t.querySelector("[data-full-export-chevron]"),d=t.querySelector("[data-full-export-textarea]"),m=t.querySelector("[data-full-export-copy]"),y=t.querySelector("[data-full-export-status]");h.addEventListener("click",async()=>{let k=!(h.getAttribute("aria-expanded")==="true");if(h.setAttribute("aria-expanded",String(k)),g.hidden=!k,s.innerHTML=k?"&#9650;":"&#9660;",!!k){h.disabled=!0;try{let C=await J(),p=C.map(N=>N.id),x=await pt(p),L=new Map(C.map(N=>[N.id,[]]));for(let N of x){let V=L.get(N.lift_id);V&&V.push(N)}let T=await et(),M=lt(T),I=await Dt(),B=Tt(I);d.value=te(C,L,new Date,"all-time",M,B),y.hidden=!0}finally{h.disabled=!1}}}),m.addEventListener("click",async()=>{d.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(d.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}y.hidden=!1,y.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function Br(t){ct(Q.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let[e,a]=await Promise.all([J(),Nt()]),r=br(a),o=r?e.filter(u=>r.liftIds.includes(u.id)):e,n=o.length?await pt(o.map(u=>u.id)):[],i=new Map(o.map(u=>[u.id,[]]));for(let u of n){let k=i.get(u.lift_id);k&&k.push(u)}let h=o.map(u=>({liftId:u.id,dailySeries:ft(i.get(u.id)||[])})),g=Pt(h),s=t.querySelector("[data-composite-canvas]"),d=t.querySelector("[data-composite-empty]"),m=t.querySelector("[data-composite-scope]"),y=t.querySelector("[data-composite-blurb]");if(m.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",y.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",d.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",g.length===0){s.hidden=!0,d.hidden=!1;return}s.hidden=!1,d.hidden=!0,me(s,g)}function Ko(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function jo(){let t=await J(),e=new Map(t.map(r=>[r.id,r.name]));return(await pt(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Xo(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,i])=>{let g=i.slice().sort((s,d)=>new Date(s.performed_at)-new Date(d.performed_at)).map(s=>{let d=Math.round(j(Number(s.weight),Number(s.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${s.weight} lb &times; ${s.reps}</span>
                <span class="lt-history-e1rm">${d} e1RM</span>
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
  `}async function Gr(t){ct(Q.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),a=await jo();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=er(a);e.innerHTML=r.map(([o,n])=>Xo(o,n)).join("")}var Vr="lt-theme",ze="default";function Je(){return we(Vr,ze)}function Yr(t){!t||t===ze?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function Kr(t){Yr(t),be(Vr,t||ze)}function jr(){Yr(Je())}var zo={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},Jo=["rank","mastery","streak","capstone","secret"],Qo="Hidden until unlocked.";async function Xr(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await ie(),a=await et(),r=await ne(),o=await se(),{days:n,tier:i}=ge(e);t.querySelector("[data-killstreak-current-icon]").textContent=i?i.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=i?`${i.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let h=Ae(e,r),g=t.querySelector("[data-killstreak-tier-list]");g.innerHTML=Xt.map(p=>{let x=h[p.key];return`
      <li class="lt-killstreak-tier-row${i?.key===p.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${p.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${p.label}</span>
          <span class="lt-killstreak-tier-req">${p.days}+ day${p.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${x} earned</span>
      </li>
    `}).join("");let s=Ht(e,r,{bodyWeightEntries:a,hasSubmittedFeedback:o}),d=s.filter(p=>p.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${d} / ${s.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let m=s.filter(p=>p.track==="rank"),y=new Set(ye(m,ve()));wr(m.filter(p=>p.unlocked).map(p=>p.id));let u=t.querySelector("[data-achievements]");function k(p){if(p.track!=="rank"){let I=p.track==="secret"&&!p.unlocked,B=I?" lt-achievement-card-desc-hidden":"",N=I?Qo:p.description,V=p.flavor&&!I?`<span class="lt-achievement-card-flavor">${p.flavor}</span>`:"";return`
        <li class="lt-achievement-card${p.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${p.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${p.name}</span>
            <span class="lt-achievement-card-desc${B}">${N}</span>
            ${V}
          </span>
        </li>
      `}let x=p.unlocked&&Je()===p.theme.id,L=p.unlocked&&y.has(p.id),T=p.unlocked?`<span class="lt-achievement-card-theme">${p.theme.label} theme${x?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${p.theme.label}</span>`,M=L?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${p.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${L?" lt-achievement-card-new":""}${x?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${p.theme.id}"${p.unlocked?"":" disabled"} aria-label="${p.unlocked?`Apply the ${p.theme.label} theme`:`Locked: ${p.name}`}">
          <span class="lt-achievement-card-icon">${p.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${p.name}</span>
            <span class="lt-achievement-card-desc">${p.description}</span>
            ${T}
            ${M}
          </span>
        </button>
      </li>
    `}function C(){u.innerHTML=Jo.map(p=>{let L=s.filter(T=>T.track===p).sort((T,M)=>Number(M.unlocked)-Number(T.unlocked)).map(k).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${zo[p]}</h3>
          ${p==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${L}</ul>
        </section>
      `}).join("")}C(),u.addEventListener("click",p=>{let x=p.target.closest("[data-apply-theme]");!x||x.disabled||(Kr(x.dataset.applyTheme),C())})}var Qe=`goal_format: lift_tracker_goals_v1
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
    recurring: weekly`,Jr=`Analyze this Lift Tracker export and create 5-8 goals that are achievable in 3-4 weeks.
Use only Lift Tracker YAML format.
Allowed types: lift_set, weekly_workout_days, weekly_workout_volume, workout_session_volume.
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;async function Qr(t){let e=await _t(),a=gt(e),r=[];function o(){let s=a.goalEvaluations.filter(m=>m.goal.status==="active"&&!m.achieved),d=a.goalEvaluations.filter(m=>m.goal.status==="achieved"||m.achieved);t.innerHTML=`
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
          <pre>${ot(Qe)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${ot(Jr)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${Zr(Qe)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${d.length?d.map(zr).join(""):'<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `,t.querySelector("[data-back]").addEventListener("click",U),t.querySelector("[data-help-export-link]").addEventListener("click",re),h(),g(),t.querySelectorAll("[data-delete-goal]").forEach(m=>{m.addEventListener("click",async()=>{await Pa(m.dataset.deleteGoal),await n()})})}async function n(){e=await _t(),a=gt(e),o()}function i(){return`
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${Ke.map(s=>`<option value="${s.id}">${s.label}</option>`).join("")}
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
    `}function h(){let s=t.querySelector("[data-goal-form]"),d=t.querySelector("[data-goal-type]"),m=t.querySelector("[data-goal-feedback]");function y(){let u=d.value;t.querySelector("[data-lift-field]").hidden=u!=="lift_set",t.querySelector("[data-workout-field]").hidden=!["weekly_workout_volume","workout_session_volume"].includes(u),t.querySelector("[data-lift-set-fields]").hidden=u!=="lift_set",t.querySelector("[data-target-field]").hidden=u==="lift_set"}d.addEventListener("change",y),y(),s.addEventListener("submit",async u=>{u.preventDefault(),m.hidden=!0;let k=s.type.value,p={title:s.title.value.trim(),type:k,unit:"lb",timeframe_weeks:_e(s.timeframe_weeks.value),recurring:k.startsWith("weekly_")?"weekly":"none",metadata:{}};k==="lift_set"?(p.lift_id=s.lift_id.value,p.target_weight=_e(s.target_weight.value),p.target_reps=_e(s.target_reps.value)):(p.target_value=_e(s.target_value.value),k!=="weekly_workout_days"&&(p.workout_id=s.workout_id.value));let x=en(p);if(x){m.hidden=!1,m.textContent=x;return}await Wa(p),await Mt(),s.reset(),await n()})}function g(){let s=t.querySelector("[data-import-text]"),d=t.querySelector("[data-import-feedback]"),m=t.querySelector("[data-save-import]"),y=t.querySelector("[data-copy-goal-packet]"),u=t.querySelector("[data-goal-packet-output]"),k=t.querySelector("[data-goal-packet-status]");y.addEventListener("click",async()=>{let C=y.textContent;y.disabled=!0,y.textContent="Building...",k.hidden=!0;try{let p=await Zo();u.value=p,u.hidden=!1;let x=await tn(p);k.hidden=!1,k.textContent=x?"Copied. Paste this into an LLM.":"Copy from the box below."}finally{y.disabled=!1,y.textContent=C}}),t.querySelector("[data-preview-import]").addEventListener("click",()=>{let C=Ir(s.value,{lifts:e.lifts,workouts:e.workouts});if(r=C.goals,C.errors.length){m.hidden=!0,d.innerHTML=`<div class="lt-goal-import-errors">${C.errors.map(p=>`<p>${ot(p)}</p>`).join("")}</div>`;return}m.hidden=r.length===0,d.innerHTML=r.length?`<ul class="lt-goal-preview-list">${r.map(p=>`<li>${ot(p.title)} <span>${ot(p.type)}</span></li>`).join("")}</ul>`:'<p class="lt-empty">No goals found in that text.</p>'}),m.addEventListener("click",async()=>{r.length!==0&&(await Ia(r),await Mt(),s.value="",r=[],await n())})}o()}async function Zo(){let t=await J(),e=t.map(d=>d.id),a=Le().toISOString(),r=await le(e,a),o=new Map(t.map(d=>[d.id,[]]));for(let d of r){let m=o.get(d.lift_id);m&&m.push(d)}let i=(await et()).filter(d=>new Date(d.logged_at)>=new Date(a)),g=(await Dt()).filter(d=>new Date(d.logged_at)>=new Date(a)),s=te(t,o,new Date,void 0,lt(i),Tt(g));return["Use the Lift Tracker export below to create goals.","",Jr,"","Return only YAML in this exact format. Do not wrap it in markdown fences.","",Qe,"","Lift Tracker export:","",s].join(`
`)}async function tn(t){if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let a=document.execCommand("copy");return e.remove(),a}catch{return!1}}function zr(t){let e=t.achieved||t.goal.status==="achieved";return`
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
        <button type="button" data-delete-goal="${t.goal.id}" aria-label="Delete ${Zr(t.title)}">&times;</button>
      </div>
    </article>
  `}function en(t){if(!t.title)return"Add a title.";if(t.type==="lift_set"){if(!t.lift_id)return"Choose a lift.";if(t.target_weight==null)return"Add a target weight.";if(t.target_reps==null)return"Add target reps."}else if(t.target_value==null)return"Add a target.";return(t.type==="weekly_workout_volume"||t.type==="workout_session_volume")&&!t.workout_id?"Choose a workout.":null}function _e(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function ot(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Zr(t){return ot(t)}var to="__divider__";async function Ze(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([J(),r?Fa(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?eo(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let h=t.querySelector("[data-workout-name-input]"),g=t.querySelector("[data-workout-lift-list]"),s=t.querySelector("[data-workout-lifts-empty]"),d=t.querySelector("[data-save-workout]"),m=t.querySelector("[data-workout-save-feedback]");s.hidden=o.length>0;let y=o.filter(p=>i.has(p.id)),u=o.filter(p=>!i.has(p.id));g.innerHTML=[...y.map(k),C(),...u.map(k)].join("");for(let p of o){let L=g.querySelector(`[data-lift-id="${p.id}"]`)?.querySelector("[data-name-slot]");L&&(L.textContent=p.name)}jt(g,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Ga(a),U(),Et(`Deleted "${n.name}"`,{onUndo:async()=>{await Va(a),oe()}}))}),d.addEventListener("click",async()=>{let p=h.value.trim();if(!p){h.focus();return}let x=Array.from(g.querySelectorAll("[data-reorder-item]")),L=x.findIndex(M=>M.dataset.reorderItem===to),T=x.slice(0,L).map(M=>M.dataset.reorderItem);d.disabled=!0,m.hidden=!0;try{if(r)await Ba(a,p,T);else{let M=await Nt();await ce(p,T,M.length)}U()}catch(M){console.error("[lift-tracker]",M),m.hidden=!1,m.textContent="Something went wrong saving the workout.",d.disabled=!1}});function k(p){return`
      <li class="lt-lift-row" data-reorder-item="${p.id}" data-lift-id="${p.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${eo(p.name)}">&#8942;&#8942;</button>
      </li>
    `}function C(){return`
      <li class="lt-workout-divider" data-reorder-item="${to}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function eo(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var an=`${window.location.origin}${window.location.pathname}`;function rn(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ta(t){let e="signin";function a(o,n,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${rn(i||"")}">

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
    `}function r(o,n,i){t.innerHTML=a(o,n,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let h=t.querySelector("[data-auth-form]");h.addEventListener("submit",async g=>{g.preventDefault();let s=h.email.value.trim(),d=h.password.value,m=h.querySelector('button[type="submit"]');m.disabled=!0,m.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:y,error:u}=e==="signup"?await S.auth.signUp({email:s,password:d,options:{emailRedirectTo:an}}):await S.auth.signInWithPassword({email:s,password:d});if(u)throw u;if(e==="signup"&&!y.session){e="signin",r(null,`Account created. Check ${s} for a confirmation link, then sign in here.`,s);return}}catch(y){r(y.message||"Something went wrong. Try again.",null,s)}})}r()}function ao(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function ro(){let{data:t,error:e}=await S.auth.signInAnonymously();if(e)throw e;return await on(),t}async function on(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([It("Bench Press",0),It("Squat",1),It("Deadlift",2)]);await Promise.all([it(e.id,135,8,t(6)),it(e.id,145,6,t(2)),it(a.id,185,5,t(5)),it(a.id,195,5,t(1)),it(r.id,225,5,t(3))]),await ce("Full Body",[e.id,a.id,r.id],0)}var tt=document.getElementById("lift-tracker-app");jr();var oo=0;async function ea(){let t=++oo,e=()=>t!==oo;try{let{data:{session:a}}=await S.auth.getSession();if(e())return;if(!a)if(ao())try{if(await ro(),e())return}catch(o){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",o),await ta(tt);return}else return await ta(tt),e(),void 0;let r=ga();if(r.name==="detail"?await Or(tt,r.liftId):r.name==="help"?await Fr(tt):r.name==="weight"?await gr(tt):r.name==="composite"?await Br(tt):r.name==="history"?await Gr(tt):r.name==="killstreak"?await Xr(tt):r.name==="goals"?await Qr(tt):r.name==="workout-new"?await Ze(tt,{mode:"create"}):r.name==="workout-edit"?await Ze(tt,{mode:"edit",workoutId:r.workoutId}):await Hr(tt),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),tt.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",ea);var no=null,so=!1;S.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!so;so=!0;let o=a!==no;no=a,!(r||!o)&&(U(),ea())});ea();

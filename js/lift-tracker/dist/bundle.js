import{createClient as xa}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var ne="https://mqfsgammpsumpltfutwl.supabase.co",se="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var y=xa(ne,se);function ie(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function U(){window.location.hash="#/"}function le(t){window.location.hash=`#/lift/${t}`}function de(){window.location.hash="#/workout/new"}function ce(t){window.location.hash=`#/workout/${t}/edit`}function ue(){window.location.hash="#/help"}function pe(){window.location.hash="#/weight"}function fe(){window.location.hash="#/composite"}function me(){window.location.hash="#/history"}function he(){window.location.hash="#/killstreak"}function _t(){window.dispatchEvent(new Event("hashchange"))}async function K(){let{data:t,error:e}=await y.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function ge(t){let{data:e,error:a}=await y.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function dt(t,e){let{data:a,error:r}=await y.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function we(t,e){let{data:a,error:r}=await y.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function ye(t){let e=t.map((o,n)=>y.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function be(t){let{error:e}=await y.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ke(t){let{error:e}=await y.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ve(t){let{data:e,error:a}=await y.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function z(t){if(!t||t.length===0)return[];let{data:e,error:a}=await y.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function Se(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await y.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function J(t,e,a,r){let{data:o,error:n}=await y.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function xe(t,e){let{data:a,error:r}=await y.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ee(t){let{error:e}=await y.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Le(t){let{error:e}=await y.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ct(){let{data:t,error:e}=await y.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function _e(t){let e=t.map((o,n)=>y.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ce(t){let{data:e,error:a}=await y.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Dt(t,e,a){let{data:r,error:o}=await y.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await y.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(n)throw n}return r}async function De(t,e,a){let{error:r}=await y.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await y.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await y.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(n)throw n}}async function qe(t){let{error:e}=await y.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Te(t){let{error:e}=await y.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ct(){let{data:t,error:e}=await y.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function $e(t,e){let{data:a,error:r}=await y.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Ae(t,e){let{data:a,error:r}=await y.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Me(t){let{error:e}=await y.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Re(t){let{error:e}=await y.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function gt(){let{data:t,error:e}=await y.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function We(t,e){let{data:a,error:r}=await y.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Ne(t,e){let{data:a,error:r}=await y.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function He(t){let{error:e}=await y.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ie(t){let{error:e}=await y.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Y(t,e){return t*(1+e/30)}function A(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function it(t){let e=new Map;for(let a of t){let r=A(a.performed_at),o=Y(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function qt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let u of s.dailySeries)r.add(u.date);let o=Array.from(r).sort(),n=[];for(let s of o){let u=0,b=0;for(let g of e){let d=null;for(let w of g.dailySeries)if(w.date<=s)d=w;else break;d&&(u+=d.e1rm/a.get(g.liftId),b+=1)}if(b>0){let g=u/b;n.push({date:s,ratio:g,pct:(g-1)*100})}}return n}function Tt(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>Y(Number(r.weight),Number(r.reps))));return t>a}function lt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function Oe(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function Ue(t){let e=new Map;for(let a of t){let r=A(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function ut(t){let e=new Map;for(let a of t){let r=A(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function Pe(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function wt(t){let e=new Map;for(let a of t){let r=A(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var yt=null,tt=null,et=null,at=null,Mt=14,$t="#e8242c",Be="rgba(232, 36, 44, 0.18)",At="#f2b134",Fe="rgba(242, 177, 52, 0.16)",rt="#9a9ca6",ot="rgba(255, 255, 255, 0.08)";function Rt(t,e,{onPointClick:a}={}){yt&&(yt.destroy(),yt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return yt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:$t,backgroundColor:Be,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:$t,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:ot}},y:{ticks:{color:rt,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:ot}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),yt}function Ve(t,e,{onPointClick:a}={}){tt&&(tt.destroy(),tt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return tt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:At,backgroundColor:Fe,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:At,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:ot}},y:{ticks:{color:rt},grid:{color:ot}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),tt}function Ke(){tt&&(tt.destroy(),tt=null)}function Ut(t,e,{onPointClick:a}={}){et&&(et.destroy(),et=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return et=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:$t,backgroundColor:Be,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:$t,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:ot}},y:{ticks:{color:rt},grid:{color:ot}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),et}function Pt(){et&&(et.destroy(),et=null)}function Ye(t,e,{onPointClick:a}={}){at&&(at.destroy(),at=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return at=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:At,backgroundColor:Fe,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:At,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:ot}},y:{ticks:{color:rt},grid:{color:ot}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),at}function Ge(){at&&(at.destroy(),at=null)}function bt(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,s=0,u=0,b=0,g=0,d=null,w=null,E=null,h=0,_=0,M=null,C=null;function I(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function O(l){let L=l.target.closest(".lt-drag-handle");if(!L)return;let q=L.closest("[data-reorder-item]");if(q){if(l.pointerType!=="touch"){l.preventDefault(),S(q,l.clientX,l.clientY);return}if(L.setPointerCapture)try{L.setPointerCapture(l.pointerId),M=L,C=l.pointerId}catch{}E=q,h=l.clientX,_=l.clientY,document.addEventListener("pointermove",k),document.addEventListener("pointerup",x),w=setTimeout(()=>{clearTimeout(w),w=null;let W=E,B=h,P=_;f(),S(W,B,P)},180)}}function N(){if(M&&C!==null&&M.releasePointerCapture)try{M.releasePointerCapture(C)}catch{}M=null,C=null}function f(){clearTimeout(w),w=null,E=null,document.removeEventListener("pointermove",k),document.removeEventListener("pointerup",x)}function k(l){if(!E)return;let L=l.clientX-h,q=l.clientY-_;Math.hypot(L,q)<=10||(f(),N())}function x(){f(),N()}function S(l,L,q){r=l,n=L,s=q,g=q;let W=l.getBoundingClientRect();b=W.top,u=W.left,o=document.createElement(l.tagName),o.className="lt-reorder-placeholder",o.style.height=`${l.offsetHeight}px`,o.style.width=`${l.offsetWidth}px`,l.after(o),l.classList.add("lt-dragging"),l.style.position="fixed",l.style.left=`${W.left}px`,l.style.width=`${W.width}px`,l.style.top=`${b}px`,l.style.zIndex="1000",document.addEventListener("pointermove",c),document.addEventListener("pointerup",D)}function $(){let l=I().filter(W=>W!==r),L=r.getBoundingClientRect(),q=null;if(a==="x"){let W=L.left+L.width/2,B=L.top+L.height/2;for(let P of l){let F=P.getBoundingClientRect(),Ht=F.left+F.width/2,vt=F.top+F.height/2;if(Math.abs(vt-B)<F.height/2?W<Ht:B<vt){q=P;break}}}else{let W=L.top+L.height/2;for(let B of l){let P=B.getBoundingClientRect(),F=P.top+P.height/2;if(W<F){q=B;break}}}q?t.insertBefore(o,q):t.appendChild(o)}function H(){let l=g,L=window.innerHeight-g;return l<80?-16*(1-l/80):L<80?16*(1-L/80):0}function T(){if(!r){d=null;return}let l=H();if(l===0){d=null;return}window.scrollBy(0,l),$(),d=requestAnimationFrame(T)}function R(){d===null&&H()!==0&&(d=requestAnimationFrame(T))}function v(){d!==null&&(cancelAnimationFrame(d),d=null)}function c(l){if(r){if(l.preventDefault(),g=l.clientY,a==="x"){let L=l.clientX-n,q=l.clientY-s;r.style.left=`${u+L}px`,r.style.top=`${b+q}px`}else{let L=l.clientY-s;r.style.top=`${b+L}px`}$(),a==="y"&&R()}}function D(){if(!r)return;v(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",c),document.removeEventListener("pointerup",D),N();let l=I().map(L=>L.dataset.reorderItem);r=null,o=null,e&&e(l)}t.addEventListener("pointerdown",O)}var Ea="joshuaegage@gmail.com";function Xe(){let t=document.createElement("div");t.className="lt-feedback-overlay",t.innerHTML=`
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
  `,document.body.appendChild(t);let e=t.querySelector("[data-feedback-text]");e.focus();function a(){t.remove()}t.addEventListener("click",r=>{r.target===t&&a()}),t.querySelector("[data-feedback-cancel]").addEventListener("click",a),t.querySelector("[data-feedback-send]").addEventListener("click",()=>{let r=e.value.trim(),o=encodeURIComponent("Lift Tracker feedback"),n=encodeURIComponent(r||"(no message entered)");window.location.href=`mailto:${Ea}?subject=${o}&body=${n}`,a()})}var Wt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Bt(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function La(t,e=new Date){let a=Bt(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let s=new Date(n.performed_at);s>=a&&s<r&&o.add(A(n.performed_at))}return o.size}function je(t){let e=null;for(let a of Wt)t>=a.days&&(e=a);return e}function Nt(t,e=new Date){let a=La(t,e);return{days:a,tier:je(a)}}function Ft(t){let e=new Map;for(let r of t){let n=Bt(new Date(r.performed_at)).getTime();e.has(n)||e.set(n,new Set),e.get(n).add(A(r.performed_at))}let a={};for(let r of Wt)a[r.key]=0;for(let r of e.values()){let o=je(r.size);o&&(a[o.key]+=1)}return a}function _a(t){let e=new Set;for(let a of t)e.add(A(a.performed_at));return e.size}function Ca(t){let e=new Set;for(let n of t)e.add(Bt(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,s)=>n-s);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+7),o=s.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Da(t){return{totalDays:_a(t),tierCounts:Ft(t),longestStreak:Ca(t)}}var qa=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 3 workout days.",isUnlocked:t=>t.totalDays>=3},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 6 workout days.",isUnlocked:t=>t.totalDays>=6},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 10 workout days.",isUnlocked:t=>t.totalDays>=10},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 15 workout days.",isUnlocked:t=>t.totalDays>=15},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 21 workout days.",isUnlocked:t=>t.totalDays>=21},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 28 workout days.",isUnlocked:t=>t.totalDays>=28},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 36 workout days.",isUnlocked:t=>t.totalDays>=36},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 45 workout days.",isUnlocked:t=>t.totalDays>=45},{id:"rank-major",name:"Major",track:"rank",description:"Log 55 workout days.",isUnlocked:t=>t.totalDays>=55},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 67 workout days.",isUnlocked:t=>t.totalDays>=67},{id:"rank-general",name:"General",track:"rank",description:"Log 80 workout days.",isUnlocked:t=>t.totalDays>=80},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 100 workout days.",isUnlocked:t=>t.totalDays>=100},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 150 workout days.",isUnlocked:t=>t.totalDays>=150},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (80 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=80&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (150 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=150&&t.tierCounts.chopper>=5}];function ze(t){let e=Da(t);return qa.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,unlocked:a.isUnlocked(e)}))}var pt=null,Vt=null;function Ta(){return pt||(pt=document.createElement("div"),pt.className="lt-toast",document.body.appendChild(pt),pt)}function nt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=Ta();clearTimeout(Vt),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),s=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(Vt),s(),e&&e()},{once:!0}),Vt=setTimeout(()=>{s(),a&&a()},r)}function kt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function ft(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var Je="lt-weight-card-expanded";function mt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function $a(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Qe(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ze(t,{onExpand:e}={}){let a=await ct(),r=ut(a),o=Pe(r);if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let n=o.change<0?"↘":o.change>0?"↗":"→",s=kt(Je,!1);function u(){t.classList.toggle("lt-stats-row-expanded",s),s?t.innerHTML=`
        <div class="lt-weight-card-header">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="true">
            <span>Weight</span>
            <span class="lt-chevron" data-weight-chevron>&#9650;</span>
          </button>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <div class="lt-weight-card-body">
          <div class="lt-weight-stats lt-weight-stats-row">
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Start</span>
              <span class="lt-weight-stat-value">${mt(o.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${$a(o.currentDate)})</span>
              <span class="lt-weight-stat-value">${mt(o.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${n} ${mt(Math.abs(o.change))} lbs</span>
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
              <span class="lt-chevron" data-weight-chevron>&#9660;</span>
            </span>
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${mt(o.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}s=!s,ft(Je,s),u()}),s?Ut(t.querySelector("[data-home-weight-canvas]"),r):Pt()}u()}async function ta(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(v=>{v.addEventListener("click",()=>{v.dataset.tab!==r&&(r=v.dataset.tab,e.forEach(c=>c.setAttribute("aria-selected",String(c===v))),Object.entries(a).forEach(([c,D])=>{D.hidden=c!==r}),r==="weight"?h():H())})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),u=t.querySelector("[data-weight-chart-section]"),b=t.querySelector("[data-weight-canvas]"),g=t.querySelector("[data-weight-empty]"),d=t.querySelector("[data-weight-history]");n.value=A(new Date().toISOString());let w=[];async function E(){w=await ct(),_(),h()}function h(){let v=ut(w);if(v.length===0){u.hidden=!0,g.hidden=!1,Pt();return}u.hidden=!1,g.hidden=!0,a.weight.hidden||Ut(b,v)}function _(){if(w.length===0){d.innerHTML="";return}let v=w.slice().sort((c,D)=>new Date(D.logged_at)-new Date(c.logged_at));d.innerHTML=v.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${mt(Number(c.weight))} lb</span>
              <span class="lt-history-e1rm">${Qe(A(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),d.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>M(c.dataset.editTrigger))})}function M(v){let c=d.querySelector(`[data-entry-id="${v}"]`),D=w.find(l=>l.id===v);!c||!D||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${D.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${A(D.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",_),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Me(v),await E(),nt("Weight entry deleted",{onUndo:async()=>{await Re(v),await E()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async l=>{l.preventDefault();let L=Number(c.querySelector("[data-edit-weight]").value),q=c.querySelector("[data-edit-date]").value;if(!(L>=0)||!q)return;let W=new Date(D.logged_at),[B,P,F]=q.split("-").map(Number);W.setFullYear(B,P-1,F),await Ae(v,{weight:L,logged_at:W.toISOString()}),await E()}))}o.addEventListener("submit",async v=>{v.preventDefault();let c=Number(s.value),D=n.value;if(!(c>=0)||!Number.isFinite(c)||!D)return;let[l,L,q]=D.split("-").map(Number),W=new Date;W.setFullYear(l,L-1,q),await $e(c,W.toISOString()),s.value="",s.focus(),n.value=A(new Date().toISOString()),await E()});let C=t.querySelector("[data-waist-form]"),I=t.querySelector("[data-waist-date-input]"),O=t.querySelector("[data-waist-input]"),N=t.querySelector("[data-waist-chart-section]"),f=t.querySelector("[data-waist-canvas]"),k=t.querySelector("[data-waist-empty]"),x=t.querySelector("[data-waist-history]");I.value=A(new Date().toISOString());let S=[];async function $(){S=await gt(),T(),H()}function H(){let v=wt(S);if(v.length===0){N.hidden=!0,k.hidden=!1,Ge();return}N.hidden=!1,k.hidden=!0,a.waist.hidden||Ye(f,v)}function T(){if(S.length===0){x.innerHTML="";return}let v=S.slice().sort((c,D)=>new Date(D.logged_at)-new Date(c.logged_at));x.innerHTML=v.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${mt(Number(c.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Qe(A(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),x.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>R(c.dataset.editTrigger))})}function R(v){let c=x.querySelector(`[data-entry-id="${v}"]`),D=S.find(l=>l.id===v);!c||!D||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${D.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${A(D.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",T),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await He(v),await $(),nt("Waist measurement deleted",{onUndo:async()=>{await Ie(v),await $()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async l=>{l.preventDefault();let L=Number(c.querySelector("[data-edit-waist]").value),q=c.querySelector("[data-edit-date]").value;if(!(L>=0)||!q)return;let W=new Date(D.logged_at),[B,P,F]=q.split("-").map(Number);W.setFullYear(B,P-1,F),await Ne(v,{waist_circumference:L,logged_at:W.toISOString()}),await $()}))}C.addEventListener("submit",async v=>{v.preventDefault();let c=Number(O.value),D=I.value;if(!(c>=0)||!Number.isFinite(c)||!D)return;let[l,L,q]=D.split("-").map(Number),W=new Date;W.setFullYear(l,L-1,q),await We(c,W.toISOString()),O.value="",O.focus(),I.value=A(new Date().toISOString()),await $()}),await Promise.all([E(),$()])}var ea="lt-composite-expanded",Kt="lt-header-menu-open";async function aa(t){let{data:{session:e}}=await y.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-menu" data-header-menu>
        <div class="lt-header-actions" data-header-actions hidden>
          ${a?"":'<button type="button" class="lt-feedback-btn" data-feedback-btn>Feedback</button>'}
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
      </button>

      <button type="button" class="lt-history-btn" data-history-btn>History</button>
    </div>

    <div class="lt-stats-row" data-stats-row>
      <section class="lt-weight-card" data-weight-card></section>

      <section class="lt-composite" data-composite-section>
        <button type="button" class="lt-composite-toggle" data-composite-toggle aria-expanded="true">
          <span class="lt-composite-toggle-label">
            <span>Composite</span>
            <span class="lt-composite-summary" data-composite-summary></span>
          </span>
          <span class="lt-chevron" data-chevron>&#9650;</span>
        </button>
        <div class="lt-composite-body" data-composite-body>
          <p class="lt-composite-blurb">Your average strength gain across all lifts, relative to where each one started.</p>
          <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
          <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
        </div>
      </section>
    </div>

    <div class="lt-action-row" data-action-row>
      <button type="button" class="lt-add-lift-toggle-btn" data-add-lift-toggle aria-pressed="false">+ Add Lift</button>
      <button type="button" class="lt-create-workout-btn" data-create-workout-btn>+ Create Workout</button>
    </div>

    <form class="lt-add-lift" data-add-lift-form hidden>
      <input type="text" name="name" placeholder="New lift name" required maxlength="60" autocomplete="off" />
      <button type="submit" aria-label="Add lift">+</button>
    </form>

    <div class="lt-workout-bar" data-workout-bar>
      <div class="lt-workout-pills" data-workout-pills></div>
    </div>
    <p class="lt-empty lt-workout-empty-hint" data-workout-empty-hint hidden>
      Group your lifts into a workout (like "Push Day") to filter the list down to just those.
    </p>

    <ul class="lt-lift-list" data-lift-list></ul>
    <p class="lt-empty" data-list-empty hidden>No lifts yet — add your first one above.</p>
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,s=null;function u(i=!0){s&&(clearTimeout(s),s=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),i&&ft(Kt,!1),s=setTimeout(()=>{o.hidden=!0,s=null},n)}function b({persist:i=!0,instant:p=!1}={}){s&&(clearTimeout(s),s=null),o.hidden=!1,p?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),i&&ft(Kt,!0)}r.addEventListener("click",()=>{o.hidden?b():u()}),o.addEventListener("click",i=>{i.target.closest("button")&&u()}),kt(Kt,!1)&&b({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",ue);let d=t.querySelector("[data-feedback-btn]");d&&d.addEventListener("click",()=>Xe()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>y.auth.signOut());let E=t.querySelector("[data-composite-section]"),h=t.querySelector("[data-composite-toggle]"),_=t.querySelector("[data-composite-body]"),M=t.querySelector("[data-chevron]"),C=t.querySelector("[data-composite-summary]");function I(i){h.setAttribute("aria-expanded",String(i)),_.hidden=!i,M.innerHTML=i?"&#9650;":"&#9660;",E.classList.toggle("lt-stats-row-expanded",i)}I(kt(ea,!0)),h.addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){fe();return}let i=h.getAttribute("aria-expanded")==="true";I(!i),ft(ea,!i)});let O=t.querySelector("[data-killstreak-icon]"),N=t.querySelector("[data-killstreak-label]"),f=t.querySelector("[data-killstreak-sub]");t.querySelector("[data-killstreak-btn]").addEventListener("click",he);function k(i){let{days:p,tier:m}=Nt(i);O.textContent=m?m.icon:"🎯",N.textContent=m?`${m.label} Killstreak`:"No Killstreak",f.textContent=`${p} Day streak`}let x=t.querySelector("[data-weight-card]");Ze(x,{onExpand:pe}),t.querySelector("[data-history-btn]").addEventListener("click",me);let S=t.querySelector("[data-add-lift-form]"),$=t.querySelector("[data-add-lift-toggle]");$.addEventListener("click",()=>{let i=S.hidden;S.hidden=!i,$.setAttribute("aria-pressed",String(i)),$.classList.toggle("lt-add-lift-toggle-active",i),i&&S.querySelector('input[name="name"]').focus()});let H=t.querySelector("[data-lift-list]"),T=t.querySelector("[data-list-empty]");t.querySelector("[data-create-workout-btn]").addEventListener("click",de);let R=t.querySelector("[data-workout-pills]"),v=t.querySelector("[data-workout-empty-hint]"),c="lt-active-workout",D=[],l=W();function L(){if(!l)return V;let i=D.find(m=>m.id===l);if(!i)return V;let p=new Set(i.liftIds);return V.filter(m=>p.has(m.id))}function q(){v.hidden=D.length>0,R.innerHTML=D.map(i=>{let p=i.id===l;return`
          <div class="lt-workout-pill-wrap${p?" lt-workout-pill-wrap-active":""}" data-reorder-item="${i.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${i.id}" aria-pressed="${p}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${i.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let i of D){let p=R.querySelector(`[data-workout-pill="${i.id}"] [data-workout-pill-name]`);p&&(p.textContent=i.name)}R.querySelectorAll("[data-workout-pill]").forEach(i=>{i.addEventListener("click",()=>{let p=i.dataset.workoutPill;l=l===p?null:p,B(l),q(),Ot(St)})}),R.querySelectorAll("[data-workout-edit]").forEach(i=>{i.addEventListener("click",p=>{p.stopPropagation(),ce(i.dataset.workoutEdit)})})}function W(){try{return window.localStorage.getItem(c)||null}catch{return null}}function B(i){try{i?window.localStorage.setItem(c,i):window.localStorage.removeItem(c)}catch{}}let P="lt-fast-mode",F="lt-burst-mode";function Ht(){try{let i=window.localStorage.getItem(P);if(i!==null)return i==="true";let p=window.localStorage.getItem(F);return p!==null?(window.localStorage.setItem(P,p),window.localStorage.removeItem(F),p==="true"):!1}catch{return!1}}function vt(i){try{window.localStorage.setItem(P,String(i))}catch{}}let V=[],Q=Ht(),Z=new Map,St=[],xt=t.querySelector("[data-mode-toggle]");function zt(){xt.textContent=Q?"Normal":"Fast",xt.setAttribute("aria-pressed",String(Q)),xt.classList.toggle("lt-mode-toggle-active",Q)}zt(),xt.addEventListener("click",()=>{Q=!Q,vt(Q),zt(),Ot(St)}),S.addEventListener("submit",async i=>{i.preventDefault();let p=S.querySelector('input[name="name"]'),m=p.value.trim();if(m){p.value="",p.disabled=!0;try{await dt(m,V.length),await Jt()}finally{p.disabled=!1,p.focus()}}}),bt(H,{onReorder:async i=>{let p=[...i],m=new Set(i),X=V.map(j=>m.has(j.id)?p.shift():j.id);await ye(X),V=X.map(j=>V.find(ht=>ht.id===j)).filter(Boolean)}}),bt(R,{axis:"x",onReorder:async i=>{await _e(i),D=i.map(p=>D.find(m=>m.id===p)).filter(Boolean)}});async function Jt(){if(D=await Ct(),l&&!D.some(m=>m.id===l)&&(l=null,B(null)),q(),V=await K(),V.length===0){H.innerHTML="",T.hidden=!1,T.textContent="No lifts yet — add your first one above.",E.hidden=!0,k([]),Z=new Map,St=[];return}let i=await z(V.map(m=>m.id));k(i),Z=new Map(V.map(m=>[m.id,[]]));for(let m of i){let X=Z.get(m.lift_id);X&&X.push(m)}let p=V.map(m=>({liftId:m.id,dailySeries:it(Z.get(m.id)||[])}));Ot(p),ga(p)}function ga(i){let p=qt(i);E.hidden=!1;let m=t.querySelector("[data-composite-canvas]"),X=t.querySelector("[data-composite-empty]");if(p.length===0){m.hidden=!0,X.hidden=!1,C.textContent="";return}m.hidden=!1,X.hidden=!0,C.textContent=Oe(p[p.length-1].pct),Rt(m,p)}function It(i){let p=it(Z.get(i)||[]),m=p[p.length-1];return m?`${Math.round(m.e1rm)} lb e1RM`:"No sets yet"}function wa(i){let p=Z.get(i)||[];return p.length===0?"":p[p.length-1].weight}function Ot(i){St=i;let p=L();T.hidden=p.length>0,T.textContent=l?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",H.innerHTML=p.map(m=>Q?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${m.id}" data-lift-id="${m.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${m.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${It(m.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Qt(m.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${m.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${wa(m.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${m.id}" data-lift-id="${m.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${m.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${It(m.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Qt(m.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let m of V){let j=H.querySelector(`[data-lift-id="${m.id}"]`)?.querySelector("[data-name-slot]");j&&(j.textContent=m.name)}H.querySelectorAll("[data-open-lift]").forEach(m=>{m.addEventListener("click",()=>le(m.dataset.openLift))}),Q&&ya()}function ya(){H.querySelectorAll("[data-fast-log-form]").forEach(i=>{let p=i.dataset.fastLogForm;i.addEventListener("submit",async m=>{m.preventDefault();let X=i.querySelector("[data-fast-weight]"),j=i.querySelector("[data-fast-reps]"),ht=i.querySelector("[data-fast-feedback]"),Et=Number(X.value),Lt=Number(j.value);if(!(Et>=0)||!Number.isFinite(Et)||!(Lt>0)||!Number.isInteger(Lt))return;let Zt=Z.get(p)||[],ba=Y(Et,Lt),te=Tt(ba,Zt),ee=new Date().toISOString(),ka=await J(p,Et,Lt,ee),ae=[...Zt,ka];Z.set(p,ae),j.value="",j.focus();let re=H.querySelector(`[data-lift-id="${p}"]`)?.querySelector("[data-last-slot]");re&&(re.textContent=It(p));let va=A(ee),oe=lt(ae.filter(Sa=>A(Sa.performed_at)===va));ht.hidden=!1,ht.classList.toggle("lt-pr",te),ht.textContent=te?`PR! ${Math.round(oe)} lb today`:`Logged · ${Math.round(oe)} lb today`})})}function Qt(i){return String(i).replace(/[&<>"']/g,p=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[p])}await Jt()}async function ra(t,e){let a=await ge(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="history" role="tab" aria-selected="true">History</button>
      <button type="button" class="lt-tab" data-tab="details" role="tab" aria-selected="false">Details</button>
    </div>

    <section data-tab-panel="history"></section>
    <section data-tab-panel="details" hidden></section>
  `,t.querySelector("[data-back]").addEventListener("click",U);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",f=>{f.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let f=r.value.trim();if(!f||f===o){r.value=o;return}o=f,await we(e,f)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await be(e),U(),nt(`Deleted "${o}"`,{onUndo:async()=>{await ke(e),_t()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(f=>{f.addEventListener("click",()=>{n.forEach(k=>k.setAttribute("aria-selected",String(k===f))),Object.entries(s).forEach(([k,x])=>{x.hidden=k!==f.dataset.tab}),f.dataset.tab==="details"&&N()})});let u=t.querySelector("[data-log-form]"),b=t.querySelector("[data-weight-input]"),g=t.querySelector("[data-reps-input]"),d=t.querySelector("[data-log-feedback]"),w=[];async function E(){w=await ve(e)}function h(){if(w.length===0)return;let f=w[w.length-1];b.value=f.weight}u.addEventListener("submit",async f=>{f.preventDefault();let k=Number(b.value),x=Number(g.value);if(!(k>=0)||!Number.isFinite(k)||!(x>0)||!Number.isInteger(x))return;let S=Y(k,x),H=Tt(S,w),T=new Date;await J(e,k,x,T.toISOString()),g.value="",g.focus(),await E(),C(),s.details.hidden||N();let R=A(T.toISOString()),v=lt(w.filter(c=>A(c.performed_at)===R));d.hidden=!1,d.classList.toggle("lt-pr",H),d.textContent=H?`New PR! Today's volume: ${Math.round(v)} lb`:`Logged. Today's volume: ${Math.round(v)} lb`});function _(f){let k=new Map;for(let x of f){let S=A(x.performed_at);k.has(S)||k.set(S,[]),k.get(S).push(x)}return Array.from(k.entries()).sort((x,S)=>S[0].localeCompare(x[0]))}function M(f){let[k,x,S]=f.split("-").map(Number);return new Date(k,x-1,S).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function C(){let f=s.history;if(w.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let k=_(w);f.innerHTML=k.map(([x,S])=>{let $=lt(S),T=S.slice().sort((R,v)=>new Date(v.performed_at)-new Date(R.performed_at)).map(R=>{let v=Math.round(Y(Number(R.weight),Number(R.reps)));return`
              <li class="lt-history-row" data-set-id="${R.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${R.id}">
                  <span class="lt-history-weight">${R.weight} lb &times; ${R.reps}</span>
                  <span class="lt-history-e1rm">${v} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${M(x)}</span>
              <span class="lt-history-volume">${Math.round($)} lb volume</span>
            </div>
            <ul class="lt-history-list">${T}</ul>
          </div>
        `}).join(""),f.querySelectorAll("[data-edit-trigger]").forEach(x=>{x.addEventListener("click",()=>O(x.dataset.editTrigger))})}function I(f){return s.history.querySelector(`[data-set-id="${f}"]`)}function O(f){let k=I(f),x=w.find(S=>S.id===f);!k||!x||(k.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${x.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${x.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${A(x.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,k.querySelector("[data-edit-cancel]").addEventListener("click",C),k.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Ee(f),await E(),C(),s.details.hidden||N(),nt("Set deleted",{onUndo:async()=>{await Le(f),await E(),C(),s.details.hidden||N()}})}),k.querySelector("[data-edit-form]").addEventListener("submit",async S=>{S.preventDefault();let $=Number(k.querySelector("[data-edit-weight]").value),H=Number(k.querySelector("[data-edit-reps]").value),T=k.querySelector("[data-edit-date]").value;if(!($>=0)||!(H>0)||!T)return;let R=new Date(x.performed_at),[v,c,D]=T.split("-").map(Number);R.setFullYear(v,c-1,D),await xe(f,{weight:$,reps:H,performed_at:R.toISOString()}),await E(),C(),s.details.hidden||N()}))}function N(){let f=s.details,k=it(w);if(k.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Ke();return}f.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let x=f.querySelector("[data-lift-canvas]"),S=f.querySelector("[data-point-detail]");Ve(x,k,{onPointClick:$=>{S.hidden=!1,S.textContent=`${M($.date)}: ${$.weight} lb × ${$.reps} (${Math.round($.e1rm)} e1RM)`}})}await E(),h(),C()}var oa=60;function na(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-oa),e}function st(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Yt(t,e,a=new Date,r=`last ${oa} days`,o=[],n=[]){let s=A(a.toISOString()),u=[`Lift Tracker — ${r} (as of ${s})`,""],b=t.filter(g=>(e.get(g.id)||[]).length>0);if(b.length===0)u.push("No sets logged in this period."),u.push("");else{for(let d of b){let w=(e.get(d.id)||[]).slice().sort((_,M)=>new Date(_.performed_at)-new Date(M.performed_at)),E=lt(w),h=Math.max(...w.map(_=>Y(Number(_.weight),Number(_.reps))));u.push(d.name);for(let _ of w){let M=Math.round(Y(Number(_.weight),Number(_.reps)));u.push(`  ${A(_.performed_at)}: ${_.weight} lb x ${_.reps} (e1RM ${M})`)}u.push(`  Sets: ${w.length} | Volume: ${Math.round(E)} lb | Best e1RM: ${Math.round(h)}`),u.push("")}let g=t.length-b.length;g>0&&(u.push(`(${g} lift${g===1?"":"s"} with no sets in this period omitted)`),u.push(""))}if(o.length>0){u.push("Body weight");for(let h of o)u.push(`  ${h.date}: ${st(h.weight)} lb`);let g=o[0].weight,d=o[o.length-1].weight,w=d-g,E=w>0?"+":"";u.push(`  Start: ${st(g)} lb | Current: ${st(d)} lb | Change: ${E}${st(w)} lb`),u.push("")}if(n.length>0){u.push("Waist");for(let h of n)u.push(`  ${h.date}: ${st(h.waist)} in`);let g=n[0].waist,d=n[n.length-1].waist,w=d-g,E=w>0?"+":"";u.push(`  Start: ${st(g)} in | Current: ${st(d)} in | Change: ${E}${st(w)} in`),u.push("")}return u.join(`
`).trimEnd()}var Aa=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Ma=`
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
`;async function sa(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Aa.map(h=>`
          <section class="lt-help-section">
            <h2>${h.title}</h2>
            <p>${h.body}</p>
          </section>
          ${h.title==="Export progress"?Ma:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let _=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(_)),a.hidden=!_,r.innerHTML=_?"&#9650;":"&#9660;",!!_){e.disabled=!0;try{let M=await K(),C=M.map(T=>T.id),I=na().toISOString(),O=await Se(C,I),N=new Map(M.map(T=>[T.id,[]]));for(let T of O){let R=N.get(T.lift_id);R&&R.push(T)}let k=(await ct()).filter(T=>new Date(T.logged_at)>=new Date(I)),x=ut(k),$=(await gt()).filter(T=>new Date(T.logged_at)>=new Date(I)),H=wt($);o.value=Yt(M,N,new Date,void 0,x,H),s.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let h=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),h=!0}catch{h=!1}if(!h)try{h=document.execCommand("copy")}catch{h=!1}s.hidden=!1,s.textContent=h?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let u=t.querySelector("[data-full-export-toggle]"),b=t.querySelector("[data-full-export-body]"),g=t.querySelector("[data-full-export-chevron]"),d=t.querySelector("[data-full-export-textarea]"),w=t.querySelector("[data-full-export-copy]"),E=t.querySelector("[data-full-export-status]");u.addEventListener("click",async()=>{let _=!(u.getAttribute("aria-expanded")==="true");if(u.setAttribute("aria-expanded",String(_)),b.hidden=!_,g.innerHTML=_?"&#9650;":"&#9660;",!!_){u.disabled=!0;try{let M=await K(),C=M.map(S=>S.id),I=await z(C),O=new Map(M.map(S=>[S.id,[]]));for(let S of I){let $=O.get(S.lift_id);$&&$.push(S)}let N=await ct(),f=ut(N),k=await gt(),x=wt(k);d.value=Yt(M,O,new Date,"all-time",f,x),E.hidden=!0}finally{u.disabled=!1}}}),w.addEventListener("click",async()=>{d.select();let h=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(d.value),h=!0}catch{h=!1}if(!h)try{h=document.execCommand("copy")}catch{h=!1}E.hidden=!1,E.textContent=h?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function ia(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-blurb">Your average strength gain across all lifts, relative to where each one started.</p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await K(),a=e.length?await z(e.map(b=>b.id)):[],r=new Map(e.map(b=>[b.id,[]]));for(let b of a){let g=r.get(b.lift_id);g&&g.push(b)}let o=e.map(b=>({liftId:b.id,dailySeries:it(r.get(b.id)||[])})),n=qt(o),s=t.querySelector("[data-composite-canvas]"),u=t.querySelector("[data-composite-empty]");if(n.length===0){s.hidden=!0,u.hidden=!1;return}s.hidden=!1,u.hidden=!0,Rt(s,n)}function Ra(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Wa(){let t=await K(),e=new Map(t.map(r=>[r.id,r.name]));return(await z(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Na(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,s])=>{let b=s.slice().sort((g,d)=>new Date(g.performed_at)-new Date(d.performed_at)).map(g=>{let d=Math.round(Y(Number(g.weight),Number(g.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${g.weight} lb &times; ${g.reps}</span>
                <span class="lt-history-e1rm">${d} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${b}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Ra(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function la(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),a=await Wa();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=Ue(a);e.innerHTML=r.map(([o,n])=>Na(o,n)).join("")}var Ha={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},Ia=["rank","mastery","streak","capstone"];async function da(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await K(),a=e.length?await z(e.map(d=>d.id)):[],{days:r,tier:o}=Nt(a);t.querySelector("[data-killstreak-current-icon]").textContent=o?o.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=o?`${o.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let n=Ft(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Wt.map(d=>{let w=n[d.key];return`
      <li class="lt-killstreak-tier-row${o?.key===d.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${d.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${d.label}</span>
          <span class="lt-killstreak-tier-req">${d.days}+ day${d.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${w} earned</span>
      </li>
    `}).join("");let u=ze(a),b=u.filter(d=>d.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${b} / ${u.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let g=t.querySelector("[data-achievements]");g.innerHTML=Ia.map(d=>{let E=u.filter(h=>h.track===d).sort((h,_)=>Number(_.unlocked)-Number(h.unlocked)).map(h=>`
      <li class="lt-achievement-card${h.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
        <span class="lt-achievement-card-icon">${h.unlocked?"🎖️":"🔒"}</span>
        <span class="lt-achievement-card-info">
          <span class="lt-achievement-card-name">${h.name}</span>
          <span class="lt-achievement-card-desc">${h.description}</span>
        </span>
      </li>
    `).join("");return`
      <section class="lt-achievement-track">
        <h3 class="lt-achievement-track-heading">${Ha[d]}</h3>
        <ul class="lt-achievement-list">${E}</ul>
      </section>
    `}).join("")}var ca="__divider__";async function Gt(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([K(),r?Ce(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?ua(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let u=t.querySelector("[data-workout-name-input]"),b=t.querySelector("[data-workout-lift-list]"),g=t.querySelector("[data-workout-lifts-empty]"),d=t.querySelector("[data-save-workout]"),w=t.querySelector("[data-workout-save-feedback]");g.hidden=o.length>0;let E=o.filter(C=>s.has(C.id)),h=o.filter(C=>!s.has(C.id));b.innerHTML=[...E.map(_),M(),...h.map(_)].join("");for(let C of o){let O=b.querySelector(`[data-lift-id="${C.id}"]`)?.querySelector("[data-name-slot]");O&&(O.textContent=C.name)}bt(b,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await qe(a),U(),nt(`Deleted "${n.name}"`,{onUndo:async()=>{await Te(a),_t()}}))}),d.addEventListener("click",async()=>{let C=u.value.trim();if(!C){u.focus();return}let I=Array.from(b.querySelectorAll("[data-reorder-item]")),O=I.findIndex(f=>f.dataset.reorderItem===ca),N=I.slice(0,O).map(f=>f.dataset.reorderItem);d.disabled=!0,w.hidden=!0;try{if(r)await De(a,C,N);else{let f=await Ct();await Dt(C,N,f.length)}U()}catch(f){console.error("[lift-tracker]",f),w.hidden=!1,w.textContent="Something went wrong saving the workout.",d.disabled=!1}});function _(C){return`
      <li class="lt-lift-row" data-reorder-item="${C.id}" data-lift-id="${C.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${ua(C.name)}">&#8942;&#8942;</button>
      </li>
    `}function M(){return`
      <li class="lt-workout-divider" data-reorder-item="${ca}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function ua(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Oa=`${window.location.origin}${window.location.pathname}`;function Ua(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Xt(t){let e="signin";function a(o,n,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Ua(s||"")}">

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
    `}function r(o,n,s){t.innerHTML=a(o,n,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let u=t.querySelector("[data-auth-form]");u.addEventListener("submit",async b=>{b.preventDefault();let g=u.email.value.trim(),d=u.password.value,w=u.querySelector('button[type="submit"]');w.disabled=!0,w.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:E,error:h}=e==="signup"?await y.auth.signUp({email:g,password:d,options:{emailRedirectTo:Oa}}):await y.auth.signInWithPassword({email:g,password:d});if(h)throw h;if(e==="signup"&&!E.session){e="signin",r(null,`Account created. Check ${g} for a confirmation link, then sign in here.`,g);return}}catch(E){r(E.message||"Something went wrong. Try again.",null,g)}})}r()}function pa(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function fa(){let{data:t,error:e}=await y.auth.signInAnonymously();if(e)throw e;return await Pa(),t}async function Pa(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([dt("Bench Press",0),dt("Squat",1),dt("Deadlift",2)]);await Promise.all([J(e.id,135,8,t(6)),J(e.id,145,6,t(2)),J(a.id,185,5,t(5)),J(a.id,195,5,t(1)),J(r.id,225,5,t(3))]),await Dt("Full Body",[e.id,a.id,r.id],0)}var G=document.getElementById("lift-tracker-app");async function jt(){try{let{data:{session:t}}=await y.auth.getSession();if(!t)if(pa())try{await fa()}catch(a){console.error("[lift-tracker] guest demo sign-in failed",a),await Xt(G);return}else{await Xt(G);return}let e=ie();e.name==="detail"?await ra(G,e.liftId):e.name==="help"?await sa(G):e.name==="weight"?await ta(G):e.name==="composite"?await ia(G):e.name==="history"?await la(G):e.name==="killstreak"?await da(G):e.name==="workout-new"?await Gt(G,{mode:"create"}):e.name==="workout-edit"?await Gt(G,{mode:"edit",workoutId:e.workoutId}):await aa(G),window.scrollTo(0,0)}catch(t){console.error("[lift-tracker]",t),G.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",jt);var ma=null,ha=!1;y.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!ha;ha=!0;let o=a!==ma;ma=a,!(r||!o)&&(U(),jt())});jt();

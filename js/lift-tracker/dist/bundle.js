import{createClient as Pa}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var he="https://mqfsgammpsumpltfutwl.supabase.co",ge="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var k=Pa(he,ge);function we(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function U(){window.location.hash="#/"}function ye(t){window.location.hash=`#/lift/${t}`}function be(){window.location.hash="#/workout/new"}function ke(t){window.location.hash=`#/workout/${t}/edit`}function ve(){window.location.hash="#/help"}function Se(){window.location.hash="#/weight"}function xe(){window.location.hash="#/composite"}function Ee(){window.location.hash="#/history"}function Le(){window.location.hash="#/killstreak"}function Ct(){window.dispatchEvent(new Event("hashchange"))}async function G(){let{data:t,error:e}=await k.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function _e(t){let{data:e,error:a}=await k.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function pt(t,e){let{data:a,error:r}=await k.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Ce(t,e){let{data:a,error:r}=await k.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function De(t){let e=t.map((o,n)=>k.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function qe(t){let{error:e}=await k.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Te(t){let{error:e}=await k.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function $e(t){let{data:e,error:a}=await k.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function J(t){if(!t||t.length===0)return[];let{data:e,error:a}=await k.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function Ae(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await k.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function Q(t,e,a,r){let{data:o,error:n}=await k.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Me(t,e){let{data:a,error:r}=await k.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Re(t){let{error:e}=await k.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function We(t){let{error:e}=await k.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ft(){let{data:t,error:e}=await k.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Ie(t){let e=t.map((o,n)=>k.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ne(t){let{data:e,error:a}=await k.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Dt(t,e,a){let{data:r,error:o}=await k.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await k.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(n)throw n}return r}async function Pe(t,e,a){let{error:r}=await k.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await k.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await k.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(n)throw n}}async function Ue(t){let{error:e}=await k.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function He(t){let{error:e}=await k.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function mt(){let{data:t,error:e}=await k.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Oe(t,e){let{data:a,error:r}=await k.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Be(t,e){let{data:a,error:r}=await k.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Fe(t){let{error:e}=await k.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ve(t){let{error:e}=await k.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function kt(){let{data:t,error:e}=await k.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Ke(t,e){let{data:a,error:r}=await k.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Ye(t,e){let{data:a,error:r}=await k.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ge(t){let{error:e}=await k.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Xe(t){let{error:e}=await k.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function X(t,e){return t*(1+e/30)}function M(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function lt(t){let e=new Map;for(let a of t){let r=M(a.performed_at),o=X(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function qt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let p of s.dailySeries)r.add(p.date);let o=Array.from(r).sort(),n=[];for(let s of o){let p=0,C=0;for(let h of e){let g=null;for(let w of h.dailySeries)if(w.date<=s)g=w;else break;g&&(p+=g.e1rm/a.get(h.liftId),C+=1)}if(C>0){let h=p/C;n.push({date:s,ratio:h,pct:(h-1)*100})}}return n}function Tt(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>X(Number(r.weight),Number(r.reps))));return t>a}function ct(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function je(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function ze(t){let e=new Map;for(let a of t){let r=M(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function ht(t){let e=new Map;for(let a of t){let r=M(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function Je(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function vt(t){let e=new Map;for(let a of t){let r=M(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var St=null,et=null,at=null,rt=null,Mt=14,$t="#e8242c",Qe="rgba(232, 36, 44, 0.18)",At="#f2b134",Ze="rgba(242, 177, 52, 0.16)",ot="#9a9ca6",nt="rgba(255, 255, 255, 0.08)";function Rt(t,e,{onPointClick:a}={}){St&&(St.destroy(),St=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return St=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:$t,backgroundColor:Qe,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:$t,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:nt}},y:{ticks:{color:ot,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),St}function ta(t,e,{onPointClick:a}={}){et&&(et.destroy(),et=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return et=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:At,backgroundColor:Ze,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:At,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:nt}},y:{ticks:{color:ot},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),et}function ea(){et&&(et.destroy(),et=null)}function Kt(t,e,{onPointClick:a}={}){at&&(at.destroy(),at=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return at=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:$t,backgroundColor:Qe,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:$t,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:nt}},y:{ticks:{color:ot},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),at}function Yt(){at&&(at.destroy(),at=null)}function aa(t,e,{onPointClick:a}={}){rt&&(rt.destroy(),rt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return rt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:At,backgroundColor:Ze,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:At,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:nt}},y:{ticks:{color:ot},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),rt}function ra(){rt&&(rt.destroy(),rt=null)}function xt(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,s=0,p=0,C=0,h=0,g=null,w=null,x=null,d=0,i=0,D=null,E=null;function R(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function P(c){let _=c.target.closest(".lt-drag-handle");if(!_)return;let A=_.closest("[data-reorder-item]");if(A){if(c.pointerType!=="touch"){c.preventDefault(),L(A,c.clientX,c.clientY);return}if(_.setPointerCapture)try{_.setPointerCapture(c.pointerId),D=_,E=c.pointerId}catch{}x=A,d=c.clientX,i=c.clientY,document.addEventListener("pointermove",v),document.addEventListener("pointerup",S),w=setTimeout(()=>{clearTimeout(w),w=null;let W=x,B=d,K=i;m(),L(W,B,K)},180)}}function N(){if(D&&E!==null&&D.releasePointerCapture)try{D.releasePointerCapture(E)}catch{}D=null,E=null}function m(){clearTimeout(w),w=null,x=null,document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",S)}function v(c){if(!x)return;let _=c.clientX-d,A=c.clientY-i;Math.hypot(_,A)<=10||(m(),N())}function S(){m(),N()}function L(c,_,A){r=c,n=_,s=A,h=A;let W=c.getBoundingClientRect();C=W.top,p=W.left,o=document.createElement(c.tagName),o.className="lt-reorder-placeholder",o.style.height=`${c.offsetHeight}px`,o.style.width=`${c.offsetWidth}px`,c.after(o),c.classList.add("lt-dragging"),c.style.position="fixed",c.style.left=`${W.left}px`,c.style.width=`${W.width}px`,c.style.top=`${C}px`,c.style.zIndex="1000",document.addEventListener("pointermove",f),document.addEventListener("pointerup",q)}function $(){let c=R().filter(W=>W!==r),_=r.getBoundingClientRect(),A=null;if(a==="x"){let W=_.left+_.width/2,B=_.top+_.height/2;for(let K of c){let Y=K.getBoundingClientRect(),Bt=Y.left+Y.width/2,F=Y.top+Y.height/2;if(Math.abs(F-B)<Y.height/2?W<Bt:B<F){A=K;break}}}else{let W=_.top+_.height/2;for(let B of c){let K=B.getBoundingClientRect(),Y=K.top+K.height/2;if(W<Y){A=B;break}}}A?t.insertBefore(o,A):t.appendChild(o)}function H(){let c=h,_=window.innerHeight-h;return c<80?-16*(1-c/80):_<80?16*(1-_/80):0}function T(){if(!r){g=null;return}let c=H();if(c===0){g=null;return}window.scrollBy(0,c),$(),g=requestAnimationFrame(T)}function I(){g===null&&H()!==0&&(g=requestAnimationFrame(T))}function b(){g!==null&&(cancelAnimationFrame(g),g=null)}function f(c){if(r){if(c.preventDefault(),h=c.clientY,a==="x"){let _=c.clientX-n,A=c.clientY-s;r.style.left=`${p+_}px`,r.style.top=`${C+A}px`}else{let _=c.clientY-s;r.style.top=`${C+_}px`}$(),a==="y"&&I()}}function q(){if(!r)return;b(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",f),document.removeEventListener("pointerup",q),N();let c=R().map(_=>_.dataset.reorderItem);r=null,o=null,e&&e(c)}t.addEventListener("pointerdown",P)}var Ua="joshuaegage@gmail.com";function oa(){let t=document.createElement("div");t.className="lt-feedback-overlay",t.innerHTML=`
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
  `,document.body.appendChild(t);let e=t.querySelector("[data-feedback-text]");e.focus();function a(){t.remove()}t.addEventListener("click",r=>{r.target===t&&a()}),t.querySelector("[data-feedback-cancel]").addEventListener("click",a),t.querySelector("[data-feedback-send]").addEventListener("click",()=>{let r=e.value.trim(),o=encodeURIComponent("Lift Tracker feedback"),n=encodeURIComponent(r||"(no message entered)");window.location.href=`mailto:${Ua}?subject=${o}&body=${n}`,a()})}var Wt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Gt(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Ha(t,e=new Date){let a=Gt(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let s=new Date(n.performed_at);s>=a&&s<r&&o.add(M(n.performed_at))}return o.size}function na(t){let e=null;for(let a of Wt)t>=a.days&&(e=a);return e}function It(t,e=new Date){let a=Ha(t,e);return{days:a,tier:na(a)}}function Xt(t){let e=new Map;for(let r of t){let n=Gt(new Date(r.performed_at)).getTime();e.has(n)||e.set(n,new Set),e.get(n).add(M(r.performed_at))}let a={};for(let r of Wt)a[r.key]=0;for(let r of e.values()){let o=na(r.size);o&&(a[o.key]+=1)}return a}function Oa(t){let e=new Set;for(let a of t)e.add(M(a.performed_at));return e.size}function Ba(t){let e=new Set;for(let n of t)e.add(Gt(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,s)=>n-s);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+7),o=s.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Fa(t){return{totalDays:Oa(t),tierCounts:Xt(t),longestStreak:Ba(t)}}var Va=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5}];function Nt(t){let e=Fa(t);return Va.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Pt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var gt=null,jt=null;function Ka(){return gt||(gt=document.createElement("div"),gt.className="lt-toast",document.body.appendChild(gt),gt)}function st(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=Ka();clearTimeout(jt),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),s=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(jt),s(),e&&e()},{once:!0}),jt=setTimeout(()=>{s(),a&&a()},r)}function Et(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function wt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Ut(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Ht(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var sa="lt-weight-card-expanded";function yt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Ya(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function ia(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function la(t,{onExpand:e}={}){let a=await mt(),r=ht(a),o=Je(r);if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let n=o.change<0?"↘":o.change>0?"↗":"→",s=Et(sa,!1);function p(){t.classList.toggle("lt-stats-row-expanded",s),s?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${yt(o.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Ya(o.currentDate)})</span>
              <span class="lt-weight-stat-value">${yt(o.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${n} ${yt(Math.abs(o.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${yt(o.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}s=!s,wt(sa,s),p()}),s?Kt(t.querySelector("[data-home-weight-canvas]"),r):Yt()}p()}async function ca(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(b=>{b.addEventListener("click",()=>{b.dataset.tab!==r&&(r=b.dataset.tab,e.forEach(f=>f.setAttribute("aria-selected",String(f===b))),Object.entries(a).forEach(([f,q])=>{q.hidden=f!==r}),r==="weight"?d():H())})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),p=t.querySelector("[data-weight-chart-section]"),C=t.querySelector("[data-weight-canvas]"),h=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");n.value=M(new Date().toISOString());let w=[];async function x(){w=await mt(),i(),d()}function d(){let b=ht(w);if(b.length===0){p.hidden=!0,h.hidden=!1,Yt();return}p.hidden=!1,h.hidden=!0,a.weight.hidden||Kt(C,b)}function i(){if(w.length===0){g.innerHTML="";return}let b=w.slice().sort((f,q)=>new Date(q.logged_at)-new Date(f.logged_at));g.innerHTML=b.map(f=>`
          <li class="lt-history-row" data-entry-id="${f.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${f.id}">
              <span class="lt-history-weight">${yt(Number(f.weight))} lb</span>
              <span class="lt-history-e1rm">${ia(M(f.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(f=>{f.addEventListener("click",()=>D(f.dataset.editTrigger))})}function D(b){let f=g.querySelector(`[data-entry-id="${b}"]`),q=w.find(c=>c.id===b);!f||!q||(f.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${q.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${M(q.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,f.querySelector("[data-edit-cancel]").addEventListener("click",i),f.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Fe(b),await x(),st("Weight entry deleted",{onUndo:async()=>{await Ve(b),await x()}}))}),f.querySelector("[data-edit-form]").addEventListener("submit",async c=>{c.preventDefault();let _=Number(f.querySelector("[data-edit-weight]").value),A=f.querySelector("[data-edit-date]").value;if(!(_>=0)||!A)return;let W=new Date(q.logged_at),[B,K,Y]=A.split("-").map(Number);W.setFullYear(B,K-1,Y),await Be(b,{weight:_,logged_at:W.toISOString()}),await x()}))}o.addEventListener("submit",async b=>{b.preventDefault();let f=Number(s.value),q=n.value;if(!(f>=0)||!Number.isFinite(f)||!q)return;let[c,_,A]=q.split("-").map(Number),W=new Date;W.setFullYear(c,_-1,A),await Oe(f,W.toISOString()),s.value="",s.focus(),n.value=M(new Date().toISOString()),await x()});let E=t.querySelector("[data-waist-form]"),R=t.querySelector("[data-waist-date-input]"),P=t.querySelector("[data-waist-input]"),N=t.querySelector("[data-waist-chart-section]"),m=t.querySelector("[data-waist-canvas]"),v=t.querySelector("[data-waist-empty]"),S=t.querySelector("[data-waist-history]");R.value=M(new Date().toISOString());let L=[];async function $(){L=await kt(),T(),H()}function H(){let b=vt(L);if(b.length===0){N.hidden=!0,v.hidden=!1,ra();return}N.hidden=!1,v.hidden=!0,a.waist.hidden||aa(m,b)}function T(){if(L.length===0){S.innerHTML="";return}let b=L.slice().sort((f,q)=>new Date(q.logged_at)-new Date(f.logged_at));S.innerHTML=b.map(f=>`
          <li class="lt-history-row" data-entry-id="${f.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${f.id}">
              <span class="lt-history-weight">${yt(Number(f.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${ia(M(f.logged_at))}</span>
            </button>
          </li>
        `).join(""),S.querySelectorAll("[data-edit-trigger]").forEach(f=>{f.addEventListener("click",()=>I(f.dataset.editTrigger))})}function I(b){let f=S.querySelector(`[data-entry-id="${b}"]`),q=L.find(c=>c.id===b);!f||!q||(f.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${q.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${M(q.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,f.querySelector("[data-edit-cancel]").addEventListener("click",T),f.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await Ge(b),await $(),st("Waist measurement deleted",{onUndo:async()=>{await Xe(b),await $()}}))}),f.querySelector("[data-edit-form]").addEventListener("submit",async c=>{c.preventDefault();let _=Number(f.querySelector("[data-edit-waist]").value),A=f.querySelector("[data-edit-date]").value;if(!(_>=0)||!A)return;let W=new Date(q.logged_at),[B,K,Y]=A.split("-").map(Number);W.setFullYear(B,K-1,Y),await Ye(b,{waist_circumference:_,logged_at:W.toISOString()}),await $()}))}E.addEventListener("submit",async b=>{b.preventDefault();let f=Number(P.value),q=R.value;if(!(f>=0)||!Number.isFinite(f)||!q)return;let[c,_,A]=q.split("-").map(Number),W=new Date;W.setFullYear(c,_-1,A),await Ke(f,W.toISOString()),P.value="",P.focus(),R.value=M(new Date().toISOString()),await $()}),await Promise.all([x(),$()])}var da="lt-seen-rank-achievements";function Ot(){let t=Ut(da,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function ua(t){Ht(da,JSON.stringify(t))}var zt="lt-active-workout";function Jt(){try{return window.localStorage.getItem(zt)||null}catch{return null}}function Qt(t){try{t?window.localStorage.setItem(zt,t):window.localStorage.removeItem(zt)}catch{}}function pa(t){let e=Jt();return e&&t.find(a=>a.id===e)||null}var fa="lt-composite-expanded",Zt="lt-header-menu-open";async function ma(t){let{data:{session:e}}=await k.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
        <span class="lt-killstreak-new-badge" data-killstreak-new-badge hidden aria-label="New achievement unlocked">!</span>
        <span class="lt-killstreak-chevron" aria-hidden="true">&#8250;</span>
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
          <p class="lt-composite-scope" data-composite-scope></p>
          <p class="lt-composite-blurb" data-composite-blurb></p>
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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,s=null;function p(l=!0){s&&(clearTimeout(s),s=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),l&&wt(Zt,!1),s=setTimeout(()=>{o.hidden=!0,s=null},n)}function C({persist:l=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),o.hidden=!1,u?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),l&&wt(Zt,!0)}r.addEventListener("click",()=>{o.hidden?C():p()}),o.addEventListener("click",l=>{l.target.closest("button")&&p()}),Et(Zt,!1)&&C({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",ve);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>oa()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>k.auth.signOut());let x=t.querySelector("[data-composite-section]"),d=t.querySelector("[data-composite-toggle]"),i=t.querySelector("[data-composite-body]"),D=t.querySelector("[data-chevron]"),E=t.querySelector("[data-composite-summary]");function R(l){d.setAttribute("aria-expanded",String(l)),i.hidden=!l,D.innerHTML=l?"&#9650;":"&#9660;",x.classList.toggle("lt-stats-row-expanded",l)}R(Et(fa,!0)),d.addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){xe();return}let l=d.getAttribute("aria-expanded")==="true";R(!l),wt(fa,!l)});let P=t.querySelector("[data-killstreak-icon]"),N=t.querySelector("[data-killstreak-label]"),m=t.querySelector("[data-killstreak-sub]"),v=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Le);function S(l){let{days:u,tier:y}=It(l);P.textContent=y?y.icon:"🎯",N.textContent=y?`${y.label} Killstreak`:"No Killstreak",m.textContent=`${u} Day streak`;let V=Nt(l).filter(z=>z.track==="rank"),O=Pt(V,Ot()).length>0;v.hidden=!O}let L=t.querySelector("[data-weight-card]");la(L,{onExpand:Se}),t.querySelector("[data-history-btn]").addEventListener("click",Ee);let $=t.querySelector("[data-add-lift-form]"),H=t.querySelector("[data-add-lift-toggle]");H.addEventListener("click",()=>{let l=$.hidden;$.hidden=!l,H.setAttribute("aria-pressed",String(l)),H.classList.toggle("lt-add-lift-toggle-active",l),l&&$.querySelector('input[name="name"]').focus()});let T=t.querySelector("[data-lift-list]"),I=t.querySelector("[data-list-empty]");t.querySelector("[data-create-workout-btn]").addEventListener("click",be);let b=t.querySelector("[data-workout-pills]"),f=t.querySelector("[data-workout-empty-hint]"),q=[],c=Jt();function _(){return c&&q.find(l=>l.id===c)||null}function A(){let l=_();if(!l)return F;let u=new Set(l.liftIds);return F.filter(y=>u.has(y.id))}function W(){f.hidden=q.length>0,b.innerHTML=q.map(l=>{let u=l.id===c;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${l.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${l.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${l.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let l of q){let u=b.querySelector(`[data-workout-pill="${l.id}"] [data-workout-pill-name]`);u&&(u.textContent=l.name)}b.querySelectorAll("[data-workout-pill]").forEach(l=>{l.addEventListener("click",()=>{let u=l.dataset.workoutPill;c=c===u?null:u,Qt(c),W(),Vt(bt),le(bt)})}),b.querySelectorAll("[data-workout-edit]").forEach(l=>{l.addEventListener("click",u=>{u.stopPropagation(),ke(l.dataset.workoutEdit)})})}let B="lt-fast-mode",K="lt-burst-mode";function Y(){try{let l=window.localStorage.getItem(B);if(l!==null)return l==="true";let u=window.localStorage.getItem(K);return u!==null?(window.localStorage.setItem(B,u),window.localStorage.removeItem(K),u==="true"):!1}catch{return!1}}function Bt(l){try{window.localStorage.setItem(B,String(l))}catch{}}let F=[],Z=Y(),tt=new Map,bt=[],Lt=t.querySelector("[data-mode-toggle]");function se(){Lt.textContent=Z?"Normal":"Fast",Lt.setAttribute("aria-pressed",String(Z)),Lt.classList.toggle("lt-mode-toggle-active",Z)}se(),Lt.addEventListener("click",()=>{Z=!Z,Bt(Z),se(),Vt(bt)}),$.addEventListener("submit",async l=>{l.preventDefault();let u=$.querySelector('input[name="name"]'),y=u.value.trim();if(y){u.value="",u.disabled=!0;try{await pt(y,F.length),await ie()}finally{u.disabled=!1,u.focus()}}}),xt(T,{onReorder:async l=>{let u=[...l],y=new Set(l),V=F.map(O=>y.has(O.id)?u.shift():O.id);await De(V),F=V.map(O=>F.find(z=>z.id===O)).filter(Boolean)}}),xt(b,{axis:"x",onReorder:async l=>{await Ie(l),q=l.map(u=>q.find(y=>y.id===u)).filter(Boolean)}});async function ie(){if(q=await ft(),c&&!q.some(y=>y.id===c)&&(c=null,Qt(null)),W(),F=await G(),F.length===0){T.innerHTML="",I.hidden=!1,I.textContent="No lifts yet — add your first one above.",x.hidden=!0,S([]),tt=new Map,bt=[];return}let l=await J(F.map(y=>y.id));S(l),tt=new Map(F.map(y=>[y.id,[]]));for(let y of l){let V=tt.get(y.lift_id);V&&V.push(y)}let u=F.map(y=>({liftId:y.id,dailySeries:lt(tt.get(y.id)||[])}));Vt(u),le(u)}function le(l){let u=_(),y=u?l.filter(_t=>u.liftIds.includes(_t.liftId)):l,V=qt(y);x.hidden=!1;let O=t.querySelector("[data-composite-canvas]"),z=t.querySelector("[data-composite-empty]"),dt=t.querySelector("[data-composite-scope]"),ut=t.querySelector("[data-composite-blurb]");if(dt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",ut.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",z.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",V.length===0){O.hidden=!0,z.hidden=!1,E.textContent="";return}O.hidden=!1,z.hidden=!0,E.textContent=je(V[V.length-1].pct),Rt(O,V)}function Ft(l){let u=lt(tt.get(l)||[]),y=u[u.length-1];return y?`${Math.round(y.e1rm)} lb e1RM`:"No sets yet"}function Aa(l){let u=tt.get(l)||[];return u.length===0?"":u[u.length-1].weight}function Vt(l){bt=l;let u=A();I.hidden=u.length>0,I.textContent=c?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",T.innerHTML=u.map(y=>Z?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${y.id}" data-lift-id="${y.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${y.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Ft(y.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${ce(y.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${y.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Aa(y.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${y.id}" data-lift-id="${y.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${y.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${Ft(y.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${ce(y.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let y of F){let O=T.querySelector(`[data-lift-id="${y.id}"]`)?.querySelector("[data-name-slot]");O&&(O.textContent=y.name)}T.querySelectorAll("[data-open-lift]").forEach(y=>{y.addEventListener("click",()=>ye(y.dataset.openLift))}),Z&&Ma()}function Ma(){T.querySelectorAll("[data-fast-log-form]").forEach(l=>{let u=l.dataset.fastLogForm;l.addEventListener("submit",async y=>{y.preventDefault();let V=l.querySelector("[data-fast-weight]"),O=l.querySelector("[data-fast-reps]"),z=l.querySelector("[data-fast-feedback]"),dt=Number(V.value),ut=Number(O.value);if(!(dt>=0)||!Number.isFinite(dt)||!(ut>0)||!Number.isInteger(ut))return;let _t=tt.get(u)||[],Ra=X(dt,ut),de=Tt(Ra,_t),ue=new Date().toISOString(),Wa=await Q(u,dt,ut,ue),pe=[..._t,Wa];tt.set(u,pe),O.value="",O.focus();let fe=T.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");fe&&(fe.textContent=Ft(u));let Ia=M(ue),me=ct(pe.filter(Na=>M(Na.performed_at)===Ia));z.hidden=!1,z.classList.toggle("lt-pr",de),z.textContent=de?`PR! ${Math.round(me)} lb today`:`Logged · ${Math.round(me)} lb today`})})}function ce(l){return String(l).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await ie()}async function ha(t,e){let a=await _e(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",m=>{m.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let m=r.value.trim();if(!m||m===o){r.value=o;return}o=m,await Ce(e,m)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await qe(e),U(),st(`Deleted "${o}"`,{onUndo:async()=>{await Te(e),Ct()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(m=>{m.addEventListener("click",()=>{n.forEach(v=>v.setAttribute("aria-selected",String(v===m))),Object.entries(s).forEach(([v,S])=>{S.hidden=v!==m.dataset.tab}),m.dataset.tab==="details"&&N()})});let p=t.querySelector("[data-log-form]"),C=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),w=[];async function x(){w=await $e(e)}function d(){if(w.length===0)return;let m=w[w.length-1];C.value=m.weight}p.addEventListener("submit",async m=>{m.preventDefault();let v=Number(C.value),S=Number(h.value);if(!(v>=0)||!Number.isFinite(v)||!(S>0)||!Number.isInteger(S))return;let L=X(v,S),H=Tt(L,w),T=new Date;await Q(e,v,S,T.toISOString()),h.value="",h.focus(),await x(),E(),s.details.hidden||N();let I=M(T.toISOString()),b=ct(w.filter(f=>M(f.performed_at)===I));g.hidden=!1,g.classList.toggle("lt-pr",H),g.textContent=H?`New PR! Today's volume: ${Math.round(b)} lb`:`Logged. Today's volume: ${Math.round(b)} lb`});function i(m){let v=new Map;for(let S of m){let L=M(S.performed_at);v.has(L)||v.set(L,[]),v.get(L).push(S)}return Array.from(v.entries()).sort((S,L)=>L[0].localeCompare(S[0]))}function D(m){let[v,S,L]=m.split("-").map(Number);return new Date(v,S-1,L).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function E(){let m=s.history;if(w.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let v=i(w);m.innerHTML=v.map(([S,L])=>{let $=ct(L),T=L.slice().sort((I,b)=>new Date(b.performed_at)-new Date(I.performed_at)).map(I=>{let b=Math.round(X(Number(I.weight),Number(I.reps)));return`
              <li class="lt-history-row" data-set-id="${I.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${I.id}">
                  <span class="lt-history-weight">${I.weight} lb &times; ${I.reps}</span>
                  <span class="lt-history-e1rm">${b} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${D(S)}</span>
              <span class="lt-history-volume">${Math.round($)} lb volume</span>
            </div>
            <ul class="lt-history-list">${T}</ul>
          </div>
        `}).join(""),m.querySelectorAll("[data-edit-trigger]").forEach(S=>{S.addEventListener("click",()=>P(S.dataset.editTrigger))})}function R(m){return s.history.querySelector(`[data-set-id="${m}"]`)}function P(m){let v=R(m),S=w.find(L=>L.id===m);!v||!S||(v.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${S.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${S.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${M(S.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,v.querySelector("[data-edit-cancel]").addEventListener("click",E),v.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Re(m),await x(),E(),s.details.hidden||N(),st("Set deleted",{onUndo:async()=>{await We(m),await x(),E(),s.details.hidden||N()}})}),v.querySelector("[data-edit-form]").addEventListener("submit",async L=>{L.preventDefault();let $=Number(v.querySelector("[data-edit-weight]").value),H=Number(v.querySelector("[data-edit-reps]").value),T=v.querySelector("[data-edit-date]").value;if(!($>=0)||!(H>0)||!T)return;let I=new Date(S.performed_at),[b,f,q]=T.split("-").map(Number);I.setFullYear(b,f-1,q),await Me(m,{weight:$,reps:H,performed_at:I.toISOString()}),await x(),E(),s.details.hidden||N()}))}function N(){let m=s.details,v=lt(w);if(v.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>',ea();return}m.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let S=m.querySelector("[data-lift-canvas]"),L=m.querySelector("[data-point-detail]");ta(S,v,{onPointClick:$=>{L.hidden=!1,L.textContent=`${D($.date)}: ${$.weight} lb × ${$.reps} (${Math.round($.e1rm)} e1RM)`}})}await x(),d(),E()}var ga=60;function wa(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-ga),e}function it(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function te(t,e,a=new Date,r=`last ${ga} days`,o=[],n=[]){let s=M(a.toISOString()),p=[`Lift Tracker — ${r} (as of ${s})`,""],C=t.filter(h=>(e.get(h.id)||[]).length>0);if(C.length===0)p.push("No sets logged in this period."),p.push("");else{for(let g of C){let w=(e.get(g.id)||[]).slice().sort((i,D)=>new Date(i.performed_at)-new Date(D.performed_at)),x=ct(w),d=Math.max(...w.map(i=>X(Number(i.weight),Number(i.reps))));p.push(g.name);for(let i of w){let D=Math.round(X(Number(i.weight),Number(i.reps)));p.push(`  ${M(i.performed_at)}: ${i.weight} lb x ${i.reps} (e1RM ${D})`)}p.push(`  Sets: ${w.length} | Volume: ${Math.round(x)} lb | Best e1RM: ${Math.round(d)}`),p.push("")}let h=t.length-C.length;h>0&&(p.push(`(${h} lift${h===1?"":"s"} with no sets in this period omitted)`),p.push(""))}if(o.length>0){p.push("Body weight");for(let d of o)p.push(`  ${d.date}: ${it(d.weight)} lb`);let h=o[0].weight,g=o[o.length-1].weight,w=g-h,x=w>0?"+":"";p.push(`  Start: ${it(h)} lb | Current: ${it(g)} lb | Change: ${x}${it(w)} lb`),p.push("")}if(n.length>0){p.push("Waist");for(let d of n)p.push(`  ${d.date}: ${it(d.waist)} in`);let h=n[0].waist,g=n[n.length-1].waist,w=g-h,x=w>0?"+":"";p.push(`  Start: ${it(h)} in | Current: ${it(g)} in | Change: ${x}${it(w)} in`),p.push("")}return p.join(`
`).trimEnd()}var Ga=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Xa=`
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
`;async function ya(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Ga.map(d=>`
          <section class="lt-help-section">
            <h2>${d.title}</h2>
            <p>${d.body}</p>
          </section>
          ${d.title==="Export progress"?Xa:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let i=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(i)),a.hidden=!i,r.innerHTML=i?"&#9650;":"&#9660;",!!i){e.disabled=!0;try{let D=await G(),E=D.map(T=>T.id),R=wa().toISOString(),P=await Ae(E,R),N=new Map(D.map(T=>[T.id,[]]));for(let T of P){let I=N.get(T.lift_id);I&&I.push(T)}let v=(await mt()).filter(T=>new Date(T.logged_at)>=new Date(R)),S=ht(v),$=(await kt()).filter(T=>new Date(T.logged_at)>=new Date(R)),H=vt($);o.value=te(D,N,new Date,void 0,S,H),s.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}s.hidden=!1,s.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let p=t.querySelector("[data-full-export-toggle]"),C=t.querySelector("[data-full-export-body]"),h=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),w=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");p.addEventListener("click",async()=>{let i=!(p.getAttribute("aria-expanded")==="true");if(p.setAttribute("aria-expanded",String(i)),C.hidden=!i,h.innerHTML=i?"&#9650;":"&#9660;",!!i){p.disabled=!0;try{let D=await G(),E=D.map(L=>L.id),R=await J(E),P=new Map(D.map(L=>[L.id,[]]));for(let L of R){let $=P.get(L.lift_id);$&&$.push(L)}let N=await mt(),m=ht(N),v=await kt(),S=vt(v);g.value=te(D,P,new Date,"all-time",m,S),x.hidden=!0}finally{p.disabled=!1}}}),w.addEventListener("click",async()=>{g.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}x.hidden=!1,x.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function ba(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let[e,a]=await Promise.all([G(),ft()]),r=pa(a),o=r?e.filter(d=>r.liftIds.includes(d.id)):e,n=o.length?await J(o.map(d=>d.id)):[],s=new Map(o.map(d=>[d.id,[]]));for(let d of n){let i=s.get(d.lift_id);i&&i.push(d)}let p=o.map(d=>({liftId:d.id,dailySeries:lt(s.get(d.id)||[])})),C=qt(p),h=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),w=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(w.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",x.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",C.length===0){h.hidden=!0,g.hidden=!1;return}h.hidden=!1,g.hidden=!0,Rt(h,C)}function ja(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function za(){let t=await G(),e=new Map(t.map(r=>[r.id,r.name]));return(await J(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Ja(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,s])=>{let C=s.slice().sort((h,g)=>new Date(h.performed_at)-new Date(g.performed_at)).map(h=>{let g=Math.round(X(Number(h.weight),Number(h.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${h.weight} lb &times; ${h.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${C}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${ja(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function ka(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),a=await za();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=ze(a);e.innerHTML=r.map(([o,n])=>Ja(o,n)).join("")}var va="lt-theme",ee="default";function ae(){return Ut(va,ee)}function Sa(t){!t||t===ee?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function xa(t){Sa(t),Ht(va,t||ee)}function Ea(){Sa(ae())}var Qa={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},Za=["rank","mastery","streak","capstone"];async function La(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await G(),a=e.length?await J(e.map(i=>i.id)):[],{days:r,tier:o}=It(a);t.querySelector("[data-killstreak-current-icon]").textContent=o?o.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=o?`${o.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let n=Xt(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Wt.map(i=>{let D=n[i.key];return`
      <li class="lt-killstreak-tier-row${o?.key===i.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${i.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${i.label}</span>
          <span class="lt-killstreak-tier-req">${i.days}+ day${i.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${D} earned</span>
      </li>
    `}).join("");let p=Nt(a),C=p.filter(i=>i.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${C} / ${p.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let h=p.filter(i=>i.track==="rank"),g=new Set(Pt(h,Ot()));ua(h.filter(i=>i.unlocked).map(i=>i.id));let w=t.querySelector("[data-achievements]");function x(i){if(i.track!=="rank")return`
        <li class="lt-achievement-card${i.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${i.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${i.name}</span>
            <span class="lt-achievement-card-desc">${i.description}</span>
          </span>
        </li>
      `;let D=i.unlocked&&ae()===i.theme.id,E=i.unlocked&&g.has(i.id),R=i.unlocked?`<span class="lt-achievement-card-theme">🎨 ${i.theme.label}${D?" · Active":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${i.theme.label}</span>`;return`
      <li class="lt-achievement-card${i.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${E?" lt-achievement-card-new":""}${D?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${i.theme.id}"${i.unlocked?"":" disabled"} aria-label="${i.unlocked?`Apply the ${i.theme.label} theme`:`Locked: ${i.name}`}">
          <span class="lt-achievement-card-icon">${i.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${i.name}</span>
            <span class="lt-achievement-card-desc">${i.description}</span>
            ${R}
          </span>
        </button>
      </li>
    `}function d(){w.innerHTML=Za.map(i=>{let E=p.filter(R=>R.track===i).sort((R,P)=>Number(P.unlocked)-Number(R.unlocked)).map(x).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Qa[i]}</h3>
          <ul class="lt-achievement-list">${E}</ul>
        </section>
      `}).join("")}d(),w.addEventListener("click",i=>{let D=i.target.closest("[data-apply-theme]");!D||D.disabled||(xa(D.dataset.applyTheme),d())})}var _a="__divider__";async function re(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([G(),r?Ne(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?Ca(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let p=t.querySelector("[data-workout-name-input]"),C=t.querySelector("[data-workout-lift-list]"),h=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),w=t.querySelector("[data-workout-save-feedback]");h.hidden=o.length>0;let x=o.filter(E=>s.has(E.id)),d=o.filter(E=>!s.has(E.id));C.innerHTML=[...x.map(i),D(),...d.map(i)].join("");for(let E of o){let P=C.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");P&&(P.textContent=E.name)}xt(C,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Ue(a),U(),st(`Deleted "${n.name}"`,{onUndo:async()=>{await He(a),Ct()}}))}),g.addEventListener("click",async()=>{let E=p.value.trim();if(!E){p.focus();return}let R=Array.from(C.querySelectorAll("[data-reorder-item]")),P=R.findIndex(m=>m.dataset.reorderItem===_a),N=R.slice(0,P).map(m=>m.dataset.reorderItem);g.disabled=!0,w.hidden=!0;try{if(r)await Pe(a,E,N);else{let m=await ft();await Dt(E,N,m.length)}U()}catch(m){console.error("[lift-tracker]",m),w.hidden=!1,w.textContent="Something went wrong saving the workout.",g.disabled=!1}});function i(E){return`
      <li class="lt-lift-row" data-reorder-item="${E.id}" data-lift-id="${E.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${Ca(E.name)}">&#8942;&#8942;</button>
      </li>
    `}function D(){return`
      <li class="lt-workout-divider" data-reorder-item="${_a}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function Ca(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var tr=`${window.location.origin}${window.location.pathname}`;function er(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function oe(t){let e="signin";function a(o,n,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${er(s||"")}">

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
    `}function r(o,n,s){t.innerHTML=a(o,n,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let p=t.querySelector("[data-auth-form]");p.addEventListener("submit",async C=>{C.preventDefault();let h=p.email.value.trim(),g=p.password.value,w=p.querySelector('button[type="submit"]');w.disabled=!0,w.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:d}=e==="signup"?await k.auth.signUp({email:h,password:g,options:{emailRedirectTo:tr}}):await k.auth.signInWithPassword({email:h,password:g});if(d)throw d;if(e==="signup"&&!x.session){e="signin",r(null,`Account created. Check ${h} for a confirmation link, then sign in here.`,h);return}}catch(x){r(x.message||"Something went wrong. Try again.",null,h)}})}r()}function Da(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function qa(){let{data:t,error:e}=await k.auth.signInAnonymously();if(e)throw e;return await ar(),t}async function ar(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([pt("Bench Press",0),pt("Squat",1),pt("Deadlift",2)]);await Promise.all([Q(e.id,135,8,t(6)),Q(e.id,145,6,t(2)),Q(a.id,185,5,t(5)),Q(a.id,195,5,t(1)),Q(r.id,225,5,t(3))]),await Dt("Full Body",[e.id,a.id,r.id],0)}var j=document.getElementById("lift-tracker-app");Ea();async function ne(){try{let{data:{session:t}}=await k.auth.getSession();if(!t)if(Da())try{await qa()}catch(a){console.error("[lift-tracker] guest demo sign-in failed",a),await oe(j);return}else{await oe(j);return}let e=we();e.name==="detail"?await ha(j,e.liftId):e.name==="help"?await ya(j):e.name==="weight"?await ca(j):e.name==="composite"?await ba(j):e.name==="history"?await ka(j):e.name==="killstreak"?await La(j):e.name==="workout-new"?await re(j,{mode:"create"}):e.name==="workout-edit"?await re(j,{mode:"edit",workoutId:e.workoutId}):await ma(j),window.scrollTo(0,0)}catch(t){console.error("[lift-tracker]",t),j.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",ne);var Ta=null,$a=!1;k.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!$a;$a=!0;let o=a!==Ta;Ta=a,!(r||!o)&&(U(),ne())});ne();

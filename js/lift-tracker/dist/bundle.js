import{createClient as Na}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var fe="https://mqfsgammpsumpltfutwl.supabase.co",me="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var v=Na(fe,me);function he(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function U(){window.location.hash="#/"}function ge(t){window.location.hash=`#/lift/${t}`}function we(){window.location.hash="#/workout/new"}function ye(t){window.location.hash=`#/workout/${t}/edit`}function be(){window.location.hash="#/help"}function ke(){window.location.hash="#/weight"}function ve(){window.location.hash="#/composite"}function Se(){window.location.hash="#/history"}function xe(){window.location.hash="#/killstreak"}function Ct(){window.dispatchEvent(new Event("hashchange"))}async function G(){let{data:t,error:e}=await v.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Ee(t){let{data:e,error:a}=await v.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function ct(t,e){let{data:a,error:r}=await v.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Le(t,e){let{data:a,error:r}=await v.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function _e(t){let e=t.map((n,o)=>v.from("lifts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function Ce(t){let{error:e}=await v.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function De(t){let{error:e}=await v.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Te(t){let{data:e,error:a}=await v.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function z(t){if(!t||t.length===0)return[];let{data:e,error:a}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function qe(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function J(t,e,a,r){let{data:n,error:o}=await v.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(o)throw o;return n}async function $e(t,e){let{data:a,error:r}=await v.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ae(t){let{error:e}=await v.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Me(t){let{error:e}=await v.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Dt(){let{data:t,error:e}=await v.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Re(t){let e=t.map((n,o)=>v.from("workouts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function We(t){let{data:e,error:a}=await v.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Tt(t,e,a){let{data:r,error:n}=await v.from("workouts").insert({name:t,sort_order:a}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await v.from("workout_lifts").insert(e.map(i=>({workout_id:r.id,lift_id:i})));if(o)throw o}return r}async function Ne(t,e,a){let{error:r}=await v.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:n}=await v.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(a.length>0){let{error:o}=await v.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(o)throw o}}async function Ie(t){let{error:e}=await v.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Pe(t){let{error:e}=await v.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ut(){let{data:t,error:e}=await v.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Ue(t,e){let{data:a,error:r}=await v.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function He(t,e){let{data:a,error:r}=await v.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Oe(t){let{error:e}=await v.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Be(t){let{error:e}=await v.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function gt(){let{data:t,error:e}=await v.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Fe(t,e){let{data:a,error:r}=await v.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Ve(t,e){let{data:a,error:r}=await v.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ke(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ye(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function X(t,e){return t*(1+e/30)}function M(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${n}`}function lt(t){let e=new Map;for(let a of t){let r=M(a.performed_at),n=X(Number(a.weight),Number(a.reps)),o=e.get(r);(!o||n>o.e1rm)&&e.set(r,{date:r,e1rm:n,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function qt(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let r=new Set;for(let i of e)for(let c of i.dailySeries)r.add(c.date);let n=Array.from(r).sort(),o=[];for(let i of n){let c=0,S=0;for(let h of e){let g=null;for(let w of h.dailySeries)if(w.date<=i)g=w;else break;g&&(c+=g.e1rm/a.get(h.liftId),S+=1)}if(S>0){let h=c/S;o.push({date:i,ratio:h,pct:(h-1)*100})}}return o}function $t(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>X(Number(r.weight),Number(r.reps))));return t>a}function dt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function Ge(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function Xe(t){let e=new Map;for(let a of t){let r=M(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function pt(t){let e=new Map;for(let a of t){let r=M(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:n})=>({date:a,weight:r,entryId:n}))}function je(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function wt(t){let e=new Map;for(let a of t){let r=M(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:n})=>({date:a,waist:r,entryId:n}))}var yt=null,tt=null,et=null,at=null,Rt=14,At="#e8242c",ze="rgba(232, 36, 44, 0.18)",Mt="#f2b134",Je="rgba(242, 177, 52, 0.16)",rt="#9a9ca6",nt="rgba(255, 255, 255, 0.08)";function Wt(t,e,{onPointClick:a}={}){yt&&(yt.destroy(),yt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return yt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:n,borderColor:At,backgroundColor:ze,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:At,pointHitRadius:Rt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:nt}},y:{ticks:{color:rt,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(o,i)=>{i.length&&a&&a(e[i[0].index])}}}),yt}function Qe(t,e,{onPointClick:a}={}){tt&&(tt.destroy(),tt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return tt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:n,borderColor:Mt,backgroundColor:Je,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Mt,pointHitRadius:Rt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:nt}},y:{ticks:{color:rt},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(o,i)=>{i.length&&a&&a(e[i[0].index])}}}),tt}function Ze(){tt&&(tt.destroy(),tt=null)}function Kt(t,e,{onPointClick:a}={}){et&&(et.destroy(),et=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return et=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:n,borderColor:At,backgroundColor:ze,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:At,pointHitRadius:Rt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:nt}},y:{ticks:{color:rt},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(o,i)=>{i.length&&a&&a(e[i[0].index])}}}),et}function Yt(){et&&(et.destroy(),et=null)}function ta(t,e,{onPointClick:a}={}){at&&(at.destroy(),at=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return at=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:n,borderColor:Mt,backgroundColor:Je,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Mt,pointHitRadius:Rt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:rt},grid:{color:nt}},y:{ticks:{color:rt},grid:{color:nt}}},plugins:{legend:{display:!1}},onClick:(o,i)=>{i.length&&a&&a(e[i[0].index])}}}),at}function ea(){at&&(at.destroy(),at=null)}function bt(t,{onReorder:e,axis:a="y"}={}){let r=null,n=null,o=0,i=0,c=0,S=0,h=0,g=null,w=null,_=null,y=0,s=0,D=null,L=null;function R(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function P(d){let k=d.target.closest(".lt-drag-handle");if(!k)return;let A=k.closest("[data-reorder-item]");if(A){if(d.pointerType!=="touch"){d.preventDefault(),C(A,d.clientX,d.clientY);return}if(k.setPointerCapture)try{k.setPointerCapture(d.pointerId),D=k,L=d.pointerId}catch{}_=A,y=d.clientX,s=d.clientY,document.addEventListener("pointermove",x),document.addEventListener("pointerup",E),w=setTimeout(()=>{clearTimeout(w),w=null;let W=_,V=y,B=s;f(),C(W,V,B)},180)}}function I(){if(D&&L!==null&&D.releasePointerCapture)try{D.releasePointerCapture(L)}catch{}D=null,L=null}function f(){clearTimeout(w),w=null,_=null,document.removeEventListener("pointermove",x),document.removeEventListener("pointerup",E)}function x(d){if(!_)return;let k=d.clientX-y,A=d.clientY-s;Math.hypot(k,A)<=10||(f(),I())}function E(){f(),I()}function C(d,k,A){r=d,o=k,i=A,h=A;let W=d.getBoundingClientRect();S=W.top,c=W.left,n=document.createElement(d.tagName),n.className="lt-reorder-placeholder",n.style.height=`${d.offsetHeight}px`,n.style.width=`${d.offsetWidth}px`,d.after(n),d.classList.add("lt-dragging"),d.style.position="fixed",d.style.left=`${W.left}px`,d.style.width=`${W.width}px`,d.style.top=`${S}px`,d.style.zIndex="1000",document.addEventListener("pointermove",u),document.addEventListener("pointerup",$)}function q(){let d=R().filter(W=>W!==r),k=r.getBoundingClientRect(),A=null;if(a==="x"){let W=k.left+k.width/2,V=k.top+k.height/2;for(let B of d){let O=B.getBoundingClientRect(),vt=O.left+O.width/2,St=O.top+O.height/2;if(Math.abs(St-V)<O.height/2?W<vt:V<St){A=B;break}}}else{let W=k.top+k.height/2;for(let V of d){let B=V.getBoundingClientRect(),O=B.top+B.height/2;if(W<O){A=V;break}}}A?t.insertBefore(n,A):t.appendChild(n)}function H(){let d=h,k=window.innerHeight-h;return d<80?-16*(1-d/80):k<80?16*(1-k/80):0}function T(){if(!r){g=null;return}let d=H();if(d===0){g=null;return}window.scrollBy(0,d),q(),g=requestAnimationFrame(T)}function N(){g===null&&H()!==0&&(g=requestAnimationFrame(T))}function b(){g!==null&&(cancelAnimationFrame(g),g=null)}function u(d){if(r){if(d.preventDefault(),h=d.clientY,a==="x"){let k=d.clientX-o,A=d.clientY-i;r.style.left=`${c+k}px`,r.style.top=`${S+A}px`}else{let k=d.clientY-i;r.style.top=`${S+k}px`}q(),a==="y"&&N()}}function $(){if(!r)return;b(),n.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",u),document.removeEventListener("pointerup",$),I();let d=R().map(k=>k.dataset.reorderItem);r=null,n=null,e&&e(d)}t.addEventListener("pointerdown",P)}var Ia="joshuaegage@gmail.com";function aa(){let t=document.createElement("div");t.className="lt-feedback-overlay",t.innerHTML=`
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
  `,document.body.appendChild(t);let e=t.querySelector("[data-feedback-text]");e.focus();function a(){t.remove()}t.addEventListener("click",r=>{r.target===t&&a()}),t.querySelector("[data-feedback-cancel]").addEventListener("click",a),t.querySelector("[data-feedback-send]").addEventListener("click",()=>{let r=e.value.trim(),n=encodeURIComponent("Lift Tracker feedback"),o=encodeURIComponent(r||"(no message entered)");window.location.href=`mailto:${Ia}?subject=${n}&body=${o}`,a()})}var Nt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Gt(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Pa(t,e=new Date){let a=Gt(e),r=new Date(a);r.setDate(r.getDate()+7);let n=new Set;for(let o of t){let i=new Date(o.performed_at);i>=a&&i<r&&n.add(M(o.performed_at))}return n.size}function ra(t){let e=null;for(let a of Nt)t>=a.days&&(e=a);return e}function It(t,e=new Date){let a=Pa(t,e);return{days:a,tier:ra(a)}}function Xt(t){let e=new Map;for(let r of t){let o=Gt(new Date(r.performed_at)).getTime();e.has(o)||e.set(o,new Set),e.get(o).add(M(r.performed_at))}let a={};for(let r of Nt)a[r.key]=0;for(let r of e.values()){let n=ra(r.size);n&&(a[n.key]+=1)}return a}function Ua(t){let e=new Set;for(let a of t)e.add(M(a.performed_at));return e.size}function Ha(t){let e=new Set;for(let o of t)e.add(Gt(new Date(o.performed_at)).getTime());let a=Array.from(e).sort((o,i)=>o-i);if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let i=new Date(a[o-1]);i.setDate(i.getDate()+7),n=i.getTime()===a[o]?n+1:1,n>r&&(r=n)}return r}function Oa(t){return{totalDays:Ua(t),tierCounts:Xt(t),longestStreak:Ha(t)}}var Ba=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 3 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=3},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 6 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=6},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 10 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=10},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 15 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=15},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 21 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=21},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 28 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=28},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 36 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=36},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 45 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=45},{id:"rank-major",name:"Major",track:"rank",description:"Log 55 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=55},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 67 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=67},{id:"rank-general",name:"General",track:"rank",description:"Log 80 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=80},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 100 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=100},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 150 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=150},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (80 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=80&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (150 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=150&&t.tierCounts.chopper>=5}];function Pt(t){let e=Oa(t);return Ba.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Ut(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var ft=null,jt=null;function Fa(){return ft||(ft=document.createElement("div"),ft.className="lt-toast",document.body.appendChild(ft),ft)}function ot(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let n=Fa();clearTimeout(jt),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),i=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(jt),i(),e&&e()},{once:!0}),jt=setTimeout(()=>{i(),a&&a()},r)}function kt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function mt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Ht(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Ot(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var na="lt-weight-card-expanded";function ht(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Va(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function oa(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function ia(t,{onExpand:e}={}){let a=await ut(),r=pt(a),n=je(r);if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let o=n.change<0?"↘":n.change>0?"↗":"→",i=kt(na,!1);function c(){t.classList.toggle("lt-stats-row-expanded",i),i?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${ht(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Va(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${ht(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${o} ${ht(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${ht(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}i=!i,mt(na,i),c()}),i?Kt(t.querySelector("[data-home-weight-canvas]"),r):Yt()}c()}async function sa(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(b=>{b.addEventListener("click",()=>{b.dataset.tab!==r&&(r=b.dataset.tab,e.forEach(u=>u.setAttribute("aria-selected",String(u===b))),Object.entries(a).forEach(([u,$])=>{$.hidden=u!==r}),r==="weight"?y():H())})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),c=t.querySelector("[data-weight-chart-section]"),S=t.querySelector("[data-weight-canvas]"),h=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");o.value=M(new Date().toISOString());let w=[];async function _(){w=await ut(),s(),y()}function y(){let b=pt(w);if(b.length===0){c.hidden=!0,h.hidden=!1,Yt();return}c.hidden=!1,h.hidden=!0,a.weight.hidden||Kt(S,b)}function s(){if(w.length===0){g.innerHTML="";return}let b=w.slice().sort((u,$)=>new Date($.logged_at)-new Date(u.logged_at));g.innerHTML=b.map(u=>`
          <li class="lt-history-row" data-entry-id="${u.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${u.id}">
              <span class="lt-history-weight">${ht(Number(u.weight))} lb</span>
              <span class="lt-history-e1rm">${oa(M(u.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(u=>{u.addEventListener("click",()=>D(u.dataset.editTrigger))})}function D(b){let u=g.querySelector(`[data-entry-id="${b}"]`),$=w.find(d=>d.id===b);!u||!$||(u.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${$.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${M($.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,u.querySelector("[data-edit-cancel]").addEventListener("click",s),u.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Oe(b),await _(),ot("Weight entry deleted",{onUndo:async()=>{await Be(b),await _()}}))}),u.querySelector("[data-edit-form]").addEventListener("submit",async d=>{d.preventDefault();let k=Number(u.querySelector("[data-edit-weight]").value),A=u.querySelector("[data-edit-date]").value;if(!(k>=0)||!A)return;let W=new Date($.logged_at),[V,B,O]=A.split("-").map(Number);W.setFullYear(V,B-1,O),await He(b,{weight:k,logged_at:W.toISOString()}),await _()}))}n.addEventListener("submit",async b=>{b.preventDefault();let u=Number(i.value),$=o.value;if(!(u>=0)||!Number.isFinite(u)||!$)return;let[d,k,A]=$.split("-").map(Number),W=new Date;W.setFullYear(d,k-1,A),await Ue(u,W.toISOString()),i.value="",i.focus(),o.value=M(new Date().toISOString()),await _()});let L=t.querySelector("[data-waist-form]"),R=t.querySelector("[data-waist-date-input]"),P=t.querySelector("[data-waist-input]"),I=t.querySelector("[data-waist-chart-section]"),f=t.querySelector("[data-waist-canvas]"),x=t.querySelector("[data-waist-empty]"),E=t.querySelector("[data-waist-history]");R.value=M(new Date().toISOString());let C=[];async function q(){C=await gt(),T(),H()}function H(){let b=wt(C);if(b.length===0){I.hidden=!0,x.hidden=!1,ea();return}I.hidden=!1,x.hidden=!0,a.waist.hidden||ta(f,b)}function T(){if(C.length===0){E.innerHTML="";return}let b=C.slice().sort((u,$)=>new Date($.logged_at)-new Date(u.logged_at));E.innerHTML=b.map(u=>`
          <li class="lt-history-row" data-entry-id="${u.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${u.id}">
              <span class="lt-history-weight">${ht(Number(u.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${oa(M(u.logged_at))}</span>
            </button>
          </li>
        `).join(""),E.querySelectorAll("[data-edit-trigger]").forEach(u=>{u.addEventListener("click",()=>N(u.dataset.editTrigger))})}function N(b){let u=E.querySelector(`[data-entry-id="${b}"]`),$=C.find(d=>d.id===b);!u||!$||(u.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${$.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${M($.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,u.querySelector("[data-edit-cancel]").addEventListener("click",T),u.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await Ke(b),await q(),ot("Waist measurement deleted",{onUndo:async()=>{await Ye(b),await q()}}))}),u.querySelector("[data-edit-form]").addEventListener("submit",async d=>{d.preventDefault();let k=Number(u.querySelector("[data-edit-waist]").value),A=u.querySelector("[data-edit-date]").value;if(!(k>=0)||!A)return;let W=new Date($.logged_at),[V,B,O]=A.split("-").map(Number);W.setFullYear(V,B-1,O),await Ve(b,{waist_circumference:k,logged_at:W.toISOString()}),await q()}))}L.addEventListener("submit",async b=>{b.preventDefault();let u=Number(P.value),$=R.value;if(!(u>=0)||!Number.isFinite(u)||!$)return;let[d,k,A]=$.split("-").map(Number),W=new Date;W.setFullYear(d,k-1,A),await Fe(u,W.toISOString()),P.value="",P.focus(),R.value=M(new Date().toISOString()),await q()}),await Promise.all([_(),q()])}var la="lt-seen-rank-achievements";function Bt(){let t=Ht(la,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function da(t){Ot(la,JSON.stringify(t))}var ca="lt-composite-expanded",zt="lt-header-menu-open";async function ua(t){let{data:{session:e}}=await v.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,i=null;function c(l=!0){i&&(clearTimeout(i),i=null),n.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),l&&mt(zt,!1),i=setTimeout(()=>{n.hidden=!0,i=null},o)}function S({persist:l=!0,instant:p=!1}={}){i&&(clearTimeout(i),i=null),n.hidden=!1,p?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),l&&mt(zt,!0)}r.addEventListener("click",()=>{n.hidden?S():c()}),n.addEventListener("click",l=>{l.target.closest("button")&&c()}),kt(zt,!1)&&S({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",be);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>aa()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>v.auth.signOut());let _=t.querySelector("[data-composite-section]"),y=t.querySelector("[data-composite-toggle]"),s=t.querySelector("[data-composite-body]"),D=t.querySelector("[data-chevron]"),L=t.querySelector("[data-composite-summary]");function R(l){y.setAttribute("aria-expanded",String(l)),s.hidden=!l,D.innerHTML=l?"&#9650;":"&#9660;",_.classList.toggle("lt-stats-row-expanded",l)}R(kt(ca,!0)),y.addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){ve();return}let l=y.getAttribute("aria-expanded")==="true";R(!l),mt(ca,!l)});let P=t.querySelector("[data-killstreak-icon]"),I=t.querySelector("[data-killstreak-label]"),f=t.querySelector("[data-killstreak-sub]"),x=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",xe);function E(l){let{days:p,tier:m}=It(l);P.textContent=m?m.icon:"🎯",I.textContent=m?`${m.label} Killstreak`:"No Killstreak",f.textContent=`${p} Day streak`;let K=Pt(l).filter(st=>st.track==="rank"),Y=Ut(K,Bt()).length>0;x.hidden=!Y}let C=t.querySelector("[data-weight-card]");ia(C,{onExpand:ke}),t.querySelector("[data-history-btn]").addEventListener("click",Se);let q=t.querySelector("[data-add-lift-form]"),H=t.querySelector("[data-add-lift-toggle]");H.addEventListener("click",()=>{let l=q.hidden;q.hidden=!l,H.setAttribute("aria-pressed",String(l)),H.classList.toggle("lt-add-lift-toggle-active",l),l&&q.querySelector('input[name="name"]').focus()});let T=t.querySelector("[data-lift-list]"),N=t.querySelector("[data-list-empty]");t.querySelector("[data-create-workout-btn]").addEventListener("click",we);let b=t.querySelector("[data-workout-pills]"),u=t.querySelector("[data-workout-empty-hint]"),$="lt-active-workout",d=[],k=V();function A(){if(!k)return F;let l=d.find(m=>m.id===k);if(!l)return F;let p=new Set(l.liftIds);return F.filter(m=>p.has(m.id))}function W(){u.hidden=d.length>0,b.innerHTML=d.map(l=>{let p=l.id===k;return`
          <div class="lt-workout-pill-wrap${p?" lt-workout-pill-wrap-active":""}" data-reorder-item="${l.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${l.id}" aria-pressed="${p}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${l.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let l of d){let p=b.querySelector(`[data-workout-pill="${l.id}"] [data-workout-pill-name]`);p&&(p.textContent=l.name)}b.querySelectorAll("[data-workout-pill]").forEach(l=>{l.addEventListener("click",()=>{let p=l.dataset.workoutPill;k=k===p?null:p,B(k),W(),Vt(xt)})}),b.querySelectorAll("[data-workout-edit]").forEach(l=>{l.addEventListener("click",p=>{p.stopPropagation(),ye(l.dataset.workoutEdit)})})}function V(){try{return window.localStorage.getItem($)||null}catch{return null}}function B(l){try{l?window.localStorage.setItem($,l):window.localStorage.removeItem($)}catch{}}let O="lt-fast-mode",vt="lt-burst-mode";function St(){try{let l=window.localStorage.getItem(O);if(l!==null)return l==="true";let p=window.localStorage.getItem(vt);return p!==null?(window.localStorage.setItem(O,p),window.localStorage.removeItem(vt),p==="true"):!1}catch{return!1}}function re(l){try{window.localStorage.setItem(O,String(l))}catch{}}let F=[],Q=St(),Z=new Map,xt=[],Et=t.querySelector("[data-mode-toggle]");function ne(){Et.textContent=Q?"Normal":"Fast",Et.setAttribute("aria-pressed",String(Q)),Et.classList.toggle("lt-mode-toggle-active",Q)}ne(),Et.addEventListener("click",()=>{Q=!Q,re(Q),ne(),Vt(xt)}),q.addEventListener("submit",async l=>{l.preventDefault();let p=q.querySelector('input[name="name"]'),m=p.value.trim();if(m){p.value="",p.disabled=!0;try{await ct(m,F.length),await oe()}finally{p.disabled=!1,p.focus()}}}),bt(T,{onReorder:async l=>{let p=[...l],m=new Set(l),K=F.map(Y=>m.has(Y.id)?p.shift():Y.id);await _e(K),F=K.map(Y=>F.find(st=>st.id===Y)).filter(Boolean)}}),bt(b,{axis:"x",onReorder:async l=>{await Re(l),d=l.map(p=>d.find(m=>m.id===p)).filter(Boolean)}});async function oe(){if(d=await Dt(),k&&!d.some(m=>m.id===k)&&(k=null,B(null)),W(),F=await G(),F.length===0){T.innerHTML="",N.hidden=!1,N.textContent="No lifts yet — add your first one above.",_.hidden=!0,E([]),Z=new Map,xt=[];return}let l=await z(F.map(m=>m.id));E(l),Z=new Map(F.map(m=>[m.id,[]]));for(let m of l){let K=Z.get(m.lift_id);K&&K.push(m)}let p=F.map(m=>({liftId:m.id,dailySeries:lt(Z.get(m.id)||[])}));Vt(p),Ta(p)}function Ta(l){let p=qt(l);_.hidden=!1;let m=t.querySelector("[data-composite-canvas]"),K=t.querySelector("[data-composite-empty]");if(p.length===0){m.hidden=!0,K.hidden=!1,L.textContent="";return}m.hidden=!1,K.hidden=!0,L.textContent=Ge(p[p.length-1].pct),Wt(m,p)}function Ft(l){let p=lt(Z.get(l)||[]),m=p[p.length-1];return m?`${Math.round(m.e1rm)} lb e1RM`:"No sets yet"}function qa(l){let p=Z.get(l)||[];return p.length===0?"":p[p.length-1].weight}function Vt(l){xt=l;let p=A();N.hidden=p.length>0,N.textContent=k?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",T.innerHTML=p.map(m=>Q?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${m.id}" data-lift-id="${m.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${m.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Ft(m.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${ie(m.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${m.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${qa(m.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${Ft(m.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${ie(m.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let m of F){let Y=T.querySelector(`[data-lift-id="${m.id}"]`)?.querySelector("[data-name-slot]");Y&&(Y.textContent=m.name)}T.querySelectorAll("[data-open-lift]").forEach(m=>{m.addEventListener("click",()=>ge(m.dataset.openLift))}),Q&&$a()}function $a(){T.querySelectorAll("[data-fast-log-form]").forEach(l=>{let p=l.dataset.fastLogForm;l.addEventListener("submit",async m=>{m.preventDefault();let K=l.querySelector("[data-fast-weight]"),Y=l.querySelector("[data-fast-reps]"),st=l.querySelector("[data-fast-feedback]"),Lt=Number(K.value),_t=Number(Y.value);if(!(Lt>=0)||!Number.isFinite(Lt)||!(_t>0)||!Number.isInteger(_t))return;let se=Z.get(p)||[],Aa=X(Lt,_t),le=$t(Aa,se),de=new Date().toISOString(),Ma=await J(p,Lt,_t,de),ce=[...se,Ma];Z.set(p,ce),Y.value="",Y.focus();let ue=T.querySelector(`[data-lift-id="${p}"]`)?.querySelector("[data-last-slot]");ue&&(ue.textContent=Ft(p));let Ra=M(de),pe=dt(ce.filter(Wa=>M(Wa.performed_at)===Ra));st.hidden=!1,st.classList.toggle("lt-pr",le),st.textContent=le?`PR! ${Math.round(pe)} lb today`:`Logged · ${Math.round(pe)} lb today`})})}function ie(l){return String(l).replace(/[&<>"']/g,p=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[p])}await oe()}async function pa(t,e){let a=await Ee(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let r=t.querySelector("[data-name-input]");r.value=a.name;let n=a.name;r.addEventListener("keydown",f=>{f.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let f=r.value.trim();if(!f||f===n){r.value=n;return}n=f,await Le(e,f)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await Ce(e),U(),ot(`Deleted "${n}"`,{onUndo:async()=>{await De(e),Ct()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(f=>{f.addEventListener("click",()=>{o.forEach(x=>x.setAttribute("aria-selected",String(x===f))),Object.entries(i).forEach(([x,E])=>{E.hidden=x!==f.dataset.tab}),f.dataset.tab==="details"&&I()})});let c=t.querySelector("[data-log-form]"),S=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),w=[];async function _(){w=await Te(e)}function y(){if(w.length===0)return;let f=w[w.length-1];S.value=f.weight}c.addEventListener("submit",async f=>{f.preventDefault();let x=Number(S.value),E=Number(h.value);if(!(x>=0)||!Number.isFinite(x)||!(E>0)||!Number.isInteger(E))return;let C=X(x,E),H=$t(C,w),T=new Date;await J(e,x,E,T.toISOString()),h.value="",h.focus(),await _(),L(),i.details.hidden||I();let N=M(T.toISOString()),b=dt(w.filter(u=>M(u.performed_at)===N));g.hidden=!1,g.classList.toggle("lt-pr",H),g.textContent=H?`New PR! Today's volume: ${Math.round(b)} lb`:`Logged. Today's volume: ${Math.round(b)} lb`});function s(f){let x=new Map;for(let E of f){let C=M(E.performed_at);x.has(C)||x.set(C,[]),x.get(C).push(E)}return Array.from(x.entries()).sort((E,C)=>C[0].localeCompare(E[0]))}function D(f){let[x,E,C]=f.split("-").map(Number);return new Date(x,E-1,C).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function L(){let f=i.history;if(w.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let x=s(w);f.innerHTML=x.map(([E,C])=>{let q=dt(C),T=C.slice().sort((N,b)=>new Date(b.performed_at)-new Date(N.performed_at)).map(N=>{let b=Math.round(X(Number(N.weight),Number(N.reps)));return`
              <li class="lt-history-row" data-set-id="${N.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${N.id}">
                  <span class="lt-history-weight">${N.weight} lb &times; ${N.reps}</span>
                  <span class="lt-history-e1rm">${b} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${D(E)}</span>
              <span class="lt-history-volume">${Math.round(q)} lb volume</span>
            </div>
            <ul class="lt-history-list">${T}</ul>
          </div>
        `}).join(""),f.querySelectorAll("[data-edit-trigger]").forEach(E=>{E.addEventListener("click",()=>P(E.dataset.editTrigger))})}function R(f){return i.history.querySelector(`[data-set-id="${f}"]`)}function P(f){let x=R(f),E=w.find(C=>C.id===f);!x||!E||(x.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${E.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${E.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${M(E.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,x.querySelector("[data-edit-cancel]").addEventListener("click",L),x.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Ae(f),await _(),L(),i.details.hidden||I(),ot("Set deleted",{onUndo:async()=>{await Me(f),await _(),L(),i.details.hidden||I()}})}),x.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let q=Number(x.querySelector("[data-edit-weight]").value),H=Number(x.querySelector("[data-edit-reps]").value),T=x.querySelector("[data-edit-date]").value;if(!(q>=0)||!(H>0)||!T)return;let N=new Date(E.performed_at),[b,u,$]=T.split("-").map(Number);N.setFullYear(b,u-1,$),await $e(f,{weight:q,reps:H,performed_at:N.toISOString()}),await _(),L(),i.details.hidden||I()}))}function I(){let f=i.details,x=lt(w);if(x.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Ze();return}f.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let E=f.querySelector("[data-lift-canvas]"),C=f.querySelector("[data-point-detail]");Qe(E,x,{onPointClick:q=>{C.hidden=!1,C.textContent=`${D(q.date)}: ${q.weight} lb × ${q.reps} (${Math.round(q.e1rm)} e1RM)`}})}await _(),y(),L()}var fa=60;function ma(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-fa),e}function it(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Jt(t,e,a=new Date,r=`last ${fa} days`,n=[],o=[]){let i=M(a.toISOString()),c=[`Lift Tracker — ${r} (as of ${i})`,""],S=t.filter(h=>(e.get(h.id)||[]).length>0);if(S.length===0)c.push("No sets logged in this period."),c.push("");else{for(let g of S){let w=(e.get(g.id)||[]).slice().sort((s,D)=>new Date(s.performed_at)-new Date(D.performed_at)),_=dt(w),y=Math.max(...w.map(s=>X(Number(s.weight),Number(s.reps))));c.push(g.name);for(let s of w){let D=Math.round(X(Number(s.weight),Number(s.reps)));c.push(`  ${M(s.performed_at)}: ${s.weight} lb x ${s.reps} (e1RM ${D})`)}c.push(`  Sets: ${w.length} | Volume: ${Math.round(_)} lb | Best e1RM: ${Math.round(y)}`),c.push("")}let h=t.length-S.length;h>0&&(c.push(`(${h} lift${h===1?"":"s"} with no sets in this period omitted)`),c.push(""))}if(n.length>0){c.push("Body weight");for(let y of n)c.push(`  ${y.date}: ${it(y.weight)} lb`);let h=n[0].weight,g=n[n.length-1].weight,w=g-h,_=w>0?"+":"";c.push(`  Start: ${it(h)} lb | Current: ${it(g)} lb | Change: ${_}${it(w)} lb`),c.push("")}if(o.length>0){c.push("Waist");for(let y of o)c.push(`  ${y.date}: ${it(y.waist)} in`);let h=o[0].waist,g=o[o.length-1].waist,w=g-h,_=w>0?"+":"";c.push(`  Start: ${it(h)} in | Current: ${it(g)} in | Change: ${_}${it(w)} in`),c.push("")}return c.join(`
`).trimEnd()}var Ka=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Ya=`
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
`;async function ha(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Ka.map(y=>`
          <section class="lt-help-section">
            <h2>${y.title}</h2>
            <p>${y.body}</p>
          </section>
          ${y.title==="Export progress"?Ya:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let s=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(s)),a.hidden=!s,r.innerHTML=s?"&#9650;":"&#9660;",!!s){e.disabled=!0;try{let D=await G(),L=D.map(T=>T.id),R=ma().toISOString(),P=await qe(L,R),I=new Map(D.map(T=>[T.id,[]]));for(let T of P){let N=I.get(T.lift_id);N&&N.push(T)}let x=(await ut()).filter(T=>new Date(T.logged_at)>=new Date(R)),E=pt(x),q=(await gt()).filter(T=>new Date(T.logged_at)>=new Date(R)),H=wt(q);n.value=Jt(D,I,new Date,void 0,E,H),i.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let y=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),y=!0}catch{y=!1}if(!y)try{y=document.execCommand("copy")}catch{y=!1}i.hidden=!1,i.textContent=y?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let c=t.querySelector("[data-full-export-toggle]"),S=t.querySelector("[data-full-export-body]"),h=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),w=t.querySelector("[data-full-export-copy]"),_=t.querySelector("[data-full-export-status]");c.addEventListener("click",async()=>{let s=!(c.getAttribute("aria-expanded")==="true");if(c.setAttribute("aria-expanded",String(s)),S.hidden=!s,h.innerHTML=s?"&#9650;":"&#9660;",!!s){c.disabled=!0;try{let D=await G(),L=D.map(C=>C.id),R=await z(L),P=new Map(D.map(C=>[C.id,[]]));for(let C of R){let q=P.get(C.lift_id);q&&q.push(C)}let I=await ut(),f=pt(I),x=await gt(),E=wt(x);g.value=Jt(D,P,new Date,"all-time",f,E),_.hidden=!0}finally{c.disabled=!1}}}),w.addEventListener("click",async()=>{g.select();let y=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),y=!0}catch{y=!1}if(!y)try{y=document.execCommand("copy")}catch{y=!1}_.hidden=!1,_.textContent=y?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function ga(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-blurb">Your average strength gain across all lifts, relative to where each one started.</p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await G(),a=e.length?await z(e.map(S=>S.id)):[],r=new Map(e.map(S=>[S.id,[]]));for(let S of a){let h=r.get(S.lift_id);h&&h.push(S)}let n=e.map(S=>({liftId:S.id,dailySeries:lt(r.get(S.id)||[])})),o=qt(n),i=t.querySelector("[data-composite-canvas]"),c=t.querySelector("[data-composite-empty]");if(o.length===0){i.hidden=!0,c.hidden=!1;return}i.hidden=!1,c.hidden=!0,Wt(i,o)}function Ga(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Xa(){let t=await G(),e=new Map(t.map(r=>[r.id,r.name]));return(await z(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function ja(t,e){let a=new Map;for(let o of e)a.has(o.liftName)||a.set(o.liftName,[]),a.get(o.liftName).push(o);let r=Array.from(a.entries()).map(([o,i])=>{let S=i.slice().sort((h,g)=>new Date(h.performed_at)-new Date(g.performed_at)).map(h=>{let g=Math.round(X(Number(h.weight),Number(h.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${h.weight} lb &times; ${h.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${o}</div>
          <ul class="lt-history-list">${S}</ul>
        </div>
      `}).join(""),n=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Ga(t)}</span>
        <span class="lt-history-volume">${n} lift${n===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function wa(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),a=await Xa();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=Xe(a);e.innerHTML=r.map(([n,o])=>ja(n,o)).join("")}var ya="lt-theme",Qt="default";function Zt(){return Ht(ya,Qt)}function ba(t){!t||t===Qt?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function ka(t){ba(t),Ot(ya,t||Qt)}function va(){ba(Zt())}var za={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},Ja=["rank","mastery","streak","capstone"];async function Sa(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await G(),a=e.length?await z(e.map(s=>s.id)):[],{days:r,tier:n}=It(a);t.querySelector("[data-killstreak-current-icon]").textContent=n?n.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=n?`${n.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let o=Xt(a),i=t.querySelector("[data-killstreak-tier-list]");i.innerHTML=Nt.map(s=>{let D=o[s.key];return`
      <li class="lt-killstreak-tier-row${n?.key===s.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${s.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${s.label}</span>
          <span class="lt-killstreak-tier-req">${s.days}+ day${s.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${D} earned</span>
      </li>
    `}).join("");let c=Pt(a),S=c.filter(s=>s.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${S} / ${c.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let h=c.filter(s=>s.track==="rank"),g=new Set(Ut(h,Bt()));da(h.filter(s=>s.unlocked).map(s=>s.id));let w=t.querySelector("[data-achievements]");function _(s){if(s.track!=="rank")return`
        <li class="lt-achievement-card${s.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${s.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${s.name}</span>
            <span class="lt-achievement-card-desc">${s.description}</span>
          </span>
        </li>
      `;let D=s.unlocked&&Zt()===s.theme.id,L=s.unlocked&&g.has(s.id),R=s.unlocked?`<span class="lt-achievement-card-theme">🎨 ${s.theme.label}${D?" · Active":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${s.theme.label}</span>`;return`
      <li class="lt-achievement-card${s.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${L?" lt-achievement-card-new":""}${D?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${s.theme.id}"${s.unlocked?"":" disabled"} aria-label="${s.unlocked?`Apply the ${s.theme.label} theme`:`Locked: ${s.name}`}">
          <span class="lt-achievement-card-icon">${s.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${s.name}</span>
            <span class="lt-achievement-card-desc">${s.description}</span>
            ${R}
          </span>
        </button>
      </li>
    `}function y(){w.innerHTML=Ja.map(s=>{let L=c.filter(R=>R.track===s).sort((R,P)=>Number(P.unlocked)-Number(R.unlocked)).map(_).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${za[s]}</h3>
          <ul class="lt-achievement-list">${L}</ul>
        </section>
      `}).join("")}y(),w.addEventListener("click",s=>{let D=s.target.closest("[data-apply-theme]");!D||D.disabled||(ka(D.dataset.applyTheme),y())})}var xa="__divider__";async function te(t,{mode:e,workoutId:a}={}){let r=e==="edit",[n,o]=await Promise.all([G(),r?We(a):Promise.resolve(null)]);if(r&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(r?o.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?Ea(o.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let c=t.querySelector("[data-workout-name-input]"),S=t.querySelector("[data-workout-lift-list]"),h=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),w=t.querySelector("[data-workout-save-feedback]");h.hidden=n.length>0;let _=n.filter(L=>i.has(L.id)),y=n.filter(L=>!i.has(L.id));S.innerHTML=[..._.map(s),D(),...y.map(s)].join("");for(let L of n){let P=S.querySelector(`[data-lift-id="${L.id}"]`)?.querySelector("[data-name-slot]");P&&(P.textContent=L.name)}bt(S,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await Ie(a),U(),ot(`Deleted "${o.name}"`,{onUndo:async()=>{await Pe(a),Ct()}}))}),g.addEventListener("click",async()=>{let L=c.value.trim();if(!L){c.focus();return}let R=Array.from(S.querySelectorAll("[data-reorder-item]")),P=R.findIndex(f=>f.dataset.reorderItem===xa),I=R.slice(0,P).map(f=>f.dataset.reorderItem);g.disabled=!0,w.hidden=!0;try{if(r)await Ne(a,L,I);else{let f=await Dt();await Tt(L,I,f.length)}U()}catch(f){console.error("[lift-tracker]",f),w.hidden=!1,w.textContent="Something went wrong saving the workout.",g.disabled=!1}});function s(L){return`
      <li class="lt-lift-row" data-reorder-item="${L.id}" data-lift-id="${L.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${Ea(L.name)}">&#8942;&#8942;</button>
      </li>
    `}function D(){return`
      <li class="lt-workout-divider" data-reorder-item="${xa}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function Ea(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Qa=`${window.location.origin}${window.location.pathname}`;function Za(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ee(t){let e="signin";function a(n,o,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Za(i||"")}">

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

          ${n?`<p class="lt-gate-error">${n}</p>`:""}
          ${o?`<p class="lt-gate-info">${o}</p>`:""}

          <button type="button" class="lt-gate-toggle" data-auth-toggle>
            ${e==="signup"?"Already have an account? Sign in":"Don't have an account? Create one"}
          </button>
        </form>
      </main>
    `}function r(n,o,i){t.innerHTML=a(n,o,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let c=t.querySelector("[data-auth-form]");c.addEventListener("submit",async S=>{S.preventDefault();let h=c.email.value.trim(),g=c.password.value,w=c.querySelector('button[type="submit"]');w.disabled=!0,w.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:_,error:y}=e==="signup"?await v.auth.signUp({email:h,password:g,options:{emailRedirectTo:Qa}}):await v.auth.signInWithPassword({email:h,password:g});if(y)throw y;if(e==="signup"&&!_.session){e="signin",r(null,`Account created. Check ${h} for a confirmation link, then sign in here.`,h);return}}catch(_){r(_.message||"Something went wrong. Try again.",null,h)}})}r()}function La(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function _a(){let{data:t,error:e}=await v.auth.signInAnonymously();if(e)throw e;return await tr(),t}async function tr(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([ct("Bench Press",0),ct("Squat",1),ct("Deadlift",2)]);await Promise.all([J(e.id,135,8,t(6)),J(e.id,145,6,t(2)),J(a.id,185,5,t(5)),J(a.id,195,5,t(1)),J(r.id,225,5,t(3))]),await Tt("Full Body",[e.id,a.id,r.id],0)}var j=document.getElementById("lift-tracker-app");va();async function ae(){try{let{data:{session:t}}=await v.auth.getSession();if(!t)if(La())try{await _a()}catch(a){console.error("[lift-tracker] guest demo sign-in failed",a),await ee(j);return}else{await ee(j);return}let e=he();e.name==="detail"?await pa(j,e.liftId):e.name==="help"?await ha(j):e.name==="weight"?await sa(j):e.name==="composite"?await ga(j):e.name==="history"?await wa(j):e.name==="killstreak"?await Sa(j):e.name==="workout-new"?await te(j,{mode:"create"}):e.name==="workout-edit"?await te(j,{mode:"edit",workoutId:e.workoutId}):await ua(j),window.scrollTo(0,0)}catch(t){console.error("[lift-tracker]",t),j.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",ae);var Ca=null,Da=!1;v.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!Da;Da=!0;let n=a!==Ca;Ca=a,!(r||!n)&&(U(),ae())});ae();

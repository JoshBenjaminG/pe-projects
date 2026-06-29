import{createClient as wr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Oe="https://mqfsgammpsumpltfutwl.supabase.co",Ue="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var b=wr(Oe,Ue);function Pe(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function P(){window.location.hash="#/"}function He(t){window.location.hash=`#/lift/${t}`}function Fe(){window.location.hash="#/workout/new"}function Be(t){window.location.hash=`#/workout/${t}/edit`}function Ve(){window.location.hash="#/help"}function Ke(){window.location.hash="#/weight"}function Ye(){window.location.hash="#/composite"}function Ge(){window.location.hash="#/history"}function Xe(){window.location.hash="#/killstreak"}function It(){window.dispatchEvent(new Event("hashchange"))}async function z(){let{data:t,error:e}=await b.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function je(t){let{data:e,error:a}=await b.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function bt(t,e){let{data:a,error:r}=await b.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function ze(t,e){let{data:a,error:r}=await b.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Je(t){let e=t.map((n,o)=>b.from("lifts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function Qe(t){let{error:e}=await b.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ze(t){let{error:e}=await b.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ta(t){let{data:e,error:a}=await b.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function et(t){if(!t||t.length===0)return[];let{data:e,error:a}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ea(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function at(t,e,a,r){let{data:n,error:o}=await b.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(o)throw o;return n}async function aa(t,e){let{data:a,error:r}=await b.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ra(t){let{error:e}=await b.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function na(t){let{error:e}=await b.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function kt(){let{data:t,error:e}=await b.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function oa(t){let e=t.map((n,o)=>b.from("workouts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function sa(t){let{data:e,error:a}=await b.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Nt(t,e,a){let{data:r,error:n}=await b.from("workouts").insert({name:t,sort_order:a}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await b.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(o)throw o}return r}async function ia(t,e,a){let{error:r}=await b.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:n}=await b.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(a.length>0){let{error:o}=await b.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(o)throw o}}async function la(t){let{error:e}=await b.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ca(t){let{error:e}=await b.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function vt(){let{data:t,error:e}=await b.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function da(t,e){let{data:a,error:r}=await b.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ua(t,e){let{data:a,error:r}=await b.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function pa(t){let{error:e}=await b.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function fa(t){let{error:e}=await b.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function _t(){let{data:t,error:e}=await b.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ma(t,e){let{data:a,error:r}=await b.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ha(t,e){let{data:a,error:r}=await b.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ga(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ya(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Q(t,e){return t*(1+e/30)}function A(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${n}`}function ht(t){let e=new Map;for(let a of t){let r=A(a.performed_at),n=Q(Number(a.weight),Number(a.reps)),o=e.get(r);(!o||n>o.e1rm)&&e.set(r,{date:r,e1rm:n,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Ot(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let f of s.dailySeries)r.add(f.date);let n=Array.from(r).sort(),o=[];for(let s of n){let f=0,k=0;for(let h of e){let g=null;for(let S of h.dailySeries)if(S.date<=s)g=S;else break;g&&(f+=g.e1rm/a.get(h.liftId),k+=1)}if(k>0){let h=f/k;o.push({date:s,ratio:h,pct:(h-1)*100})}}return o}function Ut(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>Q(Number(r.weight),Number(r.reps))));return t>a}function gt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function wa(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function ba(t){let e=new Map;for(let a of t){let r=A(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function St(t){let e=new Map;for(let a of t){let r=A(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:n})=>({date:a,weight:r,entryId:n}))}function ka(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Tt(t){let e=new Map;for(let a of t){let r=A(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:n})=>({date:a,waist:r,entryId:n}))}var qt=null,it=null,lt=null,ct=null,Ft=14,Pt="#e8242c",va="rgba(232, 36, 44, 0.18)",Ht="#f2b134",Sa="rgba(242, 177, 52, 0.16)",dt="#9a9ca6",ut="rgba(255, 255, 255, 0.08)";function Bt(t,e,{onPointClick:a}={}){qt&&(qt.destroy(),qt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return qt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:n,borderColor:Pt,backgroundColor:va,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Pt,pointHitRadius:Ft}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),qt}function xa(t,e,{onPointClick:a}={}){it&&(it.destroy(),it=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return it=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:n,borderColor:Ht,backgroundColor:Sa,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Ht,pointHitRadius:Ft}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),it}function Ea(){it&&(it.destroy(),it=null)}function ne(t,e,{onPointClick:a}={}){lt&&(lt.destroy(),lt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return lt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:n,borderColor:Pt,backgroundColor:va,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Pt,pointHitRadius:Ft}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),lt}function oe(){lt&&(lt.destroy(),lt=null)}function La(t,e,{onPointClick:a}={}){ct&&(ct.destroy(),ct=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return ct=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:n,borderColor:Ht,backgroundColor:Sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Ft}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),ct}function Ca(){ct&&(ct.destroy(),ct=null)}function At(t,{onReorder:e,axis:a="y"}={}){let r=null,n=null,o=0,s=0,f=0,k=0,h=0,g=null,S=null,L=null,u=0,c=0,C=null,E=null;function T(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function M(i){let l=i.target.closest(".lt-drag-handle");if(!l)return;let v=l.closest("[data-reorder-item]");if(v){if(i.pointerType!=="touch"){i.preventDefault(),R(v,i.clientX,i.clientY);return}if(l.setPointerCapture)try{l.setPointerCapture(i.pointerId),C=l,E=i.pointerId}catch{}L=v,u=i.clientX,c=i.clientY,document.addEventListener("pointermove",F),document.addEventListener("pointerup",K),S=setTimeout(()=>{clearTimeout(S),S=null;let D=L,I=u,W=c;$(),R(D,I,W)},180)}}function U(){if(C&&E!==null&&C.releasePointerCapture)try{C.releasePointerCapture(E)}catch{}C=null,E=null}function $(){clearTimeout(S),S=null,L=null,document.removeEventListener("pointermove",F),document.removeEventListener("pointerup",K)}function F(i){if(!L)return;let l=i.clientX-u,v=i.clientY-c;Math.hypot(l,v)<=10||($(),U())}function K(){$(),U()}function R(i,l,v){r=i,o=l,s=v,h=v;let D=i.getBoundingClientRect();k=D.top,f=D.left,n=document.createElement(i.tagName),n.className="lt-reorder-placeholder",n.style.height=`${i.offsetHeight}px`,n.style.width=`${i.offsetWidth}px`,i.after(n),i.classList.add("lt-dragging"),i.style.position="fixed",i.style.left=`${D.left}px`,i.style.width=`${D.width}px`,i.style.top=`${k}px`,i.style.zIndex="1000",document.addEventListener("pointermove",B),document.addEventListener("pointerup",X)}function m(){let i=T().filter(D=>D!==r),l=r.getBoundingClientRect(),v=null;if(a==="x"){let D=l.left+l.width/2,I=l.top+l.height/2;for(let W of i){let O=W.getBoundingClientRect(),Y=O.left+O.width/2,H=O.top+O.height/2;if(Math.abs(H-I)<O.height/2?D<Y:I<H){v=W;break}}}else{let D=l.top+l.height/2;for(let I of i){let W=I.getBoundingClientRect(),O=W.top+W.height/2;if(D<O){v=I;break}}}v?t.insertBefore(n,v):t.appendChild(n)}function w(){let i=h,l=window.innerHeight-h;return i<80?-16*(1-i/80):l<80?16*(1-l/80):0}function y(){if(!r){g=null;return}let i=w();if(i===0){g=null;return}window.scrollBy(0,i),m(),g=requestAnimationFrame(y)}function _(){g===null&&w()!==0&&(g=requestAnimationFrame(y))}function N(){g!==null&&(cancelAnimationFrame(g),g=null)}function B(i){if(r){if(i.preventDefault(),h=i.clientY,a==="x"){let l=i.clientX-o,v=i.clientY-s;r.style.left=`${f+l}px`,r.style.top=`${k+v}px`}else{let l=i.clientY-s;r.style.top=`${k+l}px`}m(),a==="y"&&_()}}function X(){if(!r)return;N(),n.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",B),document.removeEventListener("pointerup",X),U();let i=T().map(l=>l.dataset.reorderItem);r=null,n=null,e&&e(i)}t.addEventListener("pointerdown",M)}var br="joshuaegage@gmail.com";function Da(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function n(){if(r)return;r=!0,document.removeEventListener("keydown",o),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function o(s){s.key==="Escape"&&n()}e.addEventListener("click",s=>{s.target===e&&n()}),document.addEventListener("keydown",o),e.querySelector("[data-feedback-cancel]").addEventListener("click",n),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),f=encodeURIComponent("Lift Tracker feedback"),k=encodeURIComponent(s||"(no message entered)");window.location.href=`mailto:${br}?subject=${f}&body=${k}`,n()})}var Vt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function se(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function kr(t,e=new Date){let a=se(e),r=new Date(a);r.setDate(r.getDate()+7);let n=new Set;for(let o of t){let s=new Date(o.performed_at);s>=a&&s<r&&n.add(A(o.performed_at))}return n.size}function _a(t){let e=null;for(let a of Vt)t>=a.days&&(e=a);return e}function Kt(t,e=new Date){let a=kr(t,e);return{days:a,tier:_a(a)}}function ie(t){let e=new Map;for(let r of t){let o=se(new Date(r.performed_at)).getTime();e.has(o)||e.set(o,new Set),e.get(o).add(A(r.performed_at))}let a={};for(let r of Vt)a[r.key]=0;for(let r of e.values()){let n=_a(r.size);n&&(a[n.key]+=1)}return a}function vr(t){let e=new Set;for(let a of t)e.add(A(a.performed_at));return e.size}function Sr(t){let e=new Set;for(let o of t)e.add(se(new Date(o.performed_at)).getTime());let a=Array.from(e).sort((o,s)=>o-s);if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let s=new Date(a[o-1]);s.setDate(s.getDate()+7),n=s.getTime()===a[o]?n+1:1,n>r&&(r=n)}return r}function xr(t){return{totalDays:vr(t),tierCounts:ie(t),longestStreak:Sr(t)}}var Er=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5}];function Yt(t){let e=xr(t);return Er.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Gt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var xt=null,le=null;function Lr(){return xt||(xt=document.createElement("div"),xt.className="lt-toast",document.body.appendChild(xt),xt)}function pt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let n=Lr();clearTimeout(le),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),s=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(le),s(),e&&e()},{once:!0}),le=setTimeout(()=>{s(),a&&a()},r)}function $t(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function Et(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Xt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function jt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var Ta="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function zt(t){try{return window.localStorage.getItem(`${Ta}${t}`)==="true"}catch{return!1}}function rt(t){try{window.localStorage.setItem(`${Ta}${t}`,"true")}catch{}}var qa="lt-weight-card-expanded";function Lt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Cr(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Aa(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function $a(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await vt(),n=St(r),o=ka(n),s=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let f=o.change<0?"↘":o.change>0?"↗":"→",k=$t(qa,!1);function h(){t.classList.toggle("lt-stats-row-expanded",k),k?t.innerHTML=`
        <div class="lt-weight-card-header">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="true">
            <span>Weight</span>
            ${s}
            <span class="lt-chevron" data-weight-chevron>&#9650;</span>
          </button>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <div class="lt-weight-card-body">
          <div class="lt-weight-stats lt-weight-stats-row">
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Start</span>
              <span class="lt-weight-stat-value">${Lt(o.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Cr(o.currentDate)})</span>
              <span class="lt-weight-stat-value">${Lt(o.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${f} ${Lt(Math.abs(o.change))} lbs</span>
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
              ${s}
              <span class="lt-chevron" data-weight-chevron>&#9660;</span>
            </span>
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${Lt(o.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}k=!k,Et(qa,k),h()}),k?ne(t.querySelector("[data-home-weight-canvas]"),n):oe()}h()}async function Ra(t){rt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(i=>{i.addEventListener("click",()=>{i.dataset.tab!==r&&(r=i.dataset.tab,e.forEach(l=>l.setAttribute("aria-selected",String(l===i))),Object.entries(a).forEach(([l,v])=>{v.hidden=l!==r}),r==="weight"?u():_().catch(l=>console.error("[lift-tracker]",l)))})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),f=t.querySelector("[data-weight-chart-section]"),k=t.querySelector("[data-weight-canvas]"),h=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");o.value=A(new Date().toISOString());let S=[];async function L(){S=await vt(),c(),u()}function u(){let i=St(S);if(i.length===0){f.hidden=!0,h.hidden=!1,oe();return}f.hidden=!1,h.hidden=!0,a.weight.hidden||ne(k,i)}function c(){if(S.length===0){g.innerHTML="";return}let i=S.slice().sort((l,v)=>new Date(v.logged_at)-new Date(l.logged_at));g.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Lt(Number(l.weight))} lb</span>
              <span class="lt-history-e1rm">${Aa(A(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>C(l.dataset.editTrigger))})}function C(i){let l=g.querySelector(`[data-entry-id="${i}"]`),v=S.find(D=>D.id===i);!l||!v||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${v.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${A(v.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",c),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await pa(i),await L(),pt("Weight entry deleted",{onUndo:async()=>{await fa(i),await L()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async D=>{D.preventDefault();let I=Number(l.querySelector("[data-edit-weight]").value),W=l.querySelector("[data-edit-date]").value;if(!(I>=0)||!W)return;let O=new Date(v.logged_at),[Y,H,mt]=W.split("-").map(Number);O.setFullYear(Y,H-1,mt),await ua(i,{weight:I,logged_at:O.toISOString()}),await L()}))}n.addEventListener("submit",async i=>{i.preventDefault();let l=Number(s.value),v=o.value;if(!(l>=0)||!Number.isFinite(l)||!v)return;let[D,I,W]=v.split("-").map(Number),O=new Date;O.setFullYear(D,I-1,W),await da(l,O.toISOString()),s.value="",s.focus(),o.value=A(new Date().toISOString()),await L()});let E=t.querySelector("[data-waist-form]"),T=t.querySelector("[data-waist-date-input]"),M=t.querySelector("[data-waist-input]"),U=t.querySelector("[data-waist-chart-section]"),$=t.querySelector("[data-waist-canvas]"),F=t.querySelector("[data-waist-empty]"),K=t.querySelector("[data-waist-history]");T.value=A(new Date().toISOString());let R=[],m=!1,w=null;async function y(){R=await _t(),m=!0,B(),N()}async function _(){if(m){N();return}w||(F.hidden=!1,F.textContent="Loading waist...",U.hidden=!0,w=y().finally(()=>{w=null})),await w}function N(){let i=Tt(R);if(i.length===0){U.hidden=!0,F.hidden=!1,F.textContent="No waist measurements yet — add your first one above.",Ca();return}U.hidden=!1,F.hidden=!0,a.waist.hidden||La($,i)}function B(){if(R.length===0){K.innerHTML="";return}let i=R.slice().sort((l,v)=>new Date(v.logged_at)-new Date(l.logged_at));K.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Lt(Number(l.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Aa(A(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),K.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>X(l.dataset.editTrigger))})}function X(i){let l=K.querySelector(`[data-entry-id="${i}"]`),v=R.find(D=>D.id===i);!l||!v||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${v.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${A(v.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",B),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ga(i),await y(),pt("Waist measurement deleted",{onUndo:async()=>{await ya(i),await y()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async D=>{D.preventDefault();let I=Number(l.querySelector("[data-edit-waist]").value),W=l.querySelector("[data-edit-date]").value;if(!(I>=0)||!W)return;let O=new Date(v.logged_at),[Y,H,mt]=W.split("-").map(Number);O.setFullYear(Y,H-1,mt),await ha(i,{waist_circumference:I,logged_at:O.toISOString()}),await y()}))}E.addEventListener("submit",async i=>{i.preventDefault();let l=Number(M.value),v=T.value;if(!(l>=0)||!Number.isFinite(l)||!v)return;let[D,I,W]=v.split("-").map(Number),O=new Date;O.setFullYear(D,I-1,W),await ma(l,O.toISOString()),M.value="",M.focus(),T.value=A(new Date().toISOString()),await y()}),await L()}var Ma="lt-seen-rank-achievements";function Jt(){let t=Xt(Ma,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Wa(t){jt(Ma,JSON.stringify(t))}var ce="lt-active-workout";function de(){try{return window.localStorage.getItem(ce)||null}catch{return null}}function ue(t){try{t?window.localStorage.setItem(ce,t):window.localStorage.removeItem(ce)}catch{}}function Ia(t){let e=de();return e&&t.find(a=>a.id===e)||null}var Na="lt-default-rest-seconds",Oa="lt-lift-rest-seconds-",tt=null,pe=null,fe=null,Ct=0,nt=null;function Ua(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Pa(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function he(){return Ua(Na)||120}function Ha(t){Pa(Na,t)}function ge(t){return Ua(`${Oa}${t}`)}function Fa(t,e){Pa(`${Oa}${t}`,e)}function Qt(t){return ge(t)||he()}function ye(){return tt||(tt=document.createElement("div"),tt.className="lt-rest-timer",tt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,tt.querySelector("[data-rest-add]").addEventListener("click",()=>{Ct&&(Ct+=30*1e3,me())}),tt.querySelector("[data-rest-skip]").addEventListener("click",Ba),document.body.appendChild(tt),tt)}function Dr(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function me(){let t=ye(),e=Ct-Date.now();t.querySelector("[data-rest-time]").textContent=Dr(e),e<=0&&Tr()}function we(){clearInterval(pe),clearTimeout(fe),pe=null,fe=null}function _r(){try{Rt(),nt.state==="suspended"&&nt.resume();let t=nt.currentTime,e=nt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(nt.destination),[523.25,659.25].forEach((a,r)=>{let n=nt.createOscillator();n.type="sine",n.frequency.setValueAtTime(a,t+r*.12),n.connect(e),n.start(t+r*.12),n.stop(t+.75)})}catch{}}function Rt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;nt||=new t,nt.state==="suspended"&&nt.resume()}catch{}}function Tr(){we(),Ct=0;let t=ye();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",_r(),navigator.vibrate&&navigator.vibrate([120,70,120]),fe=setTimeout(Ba,12e3)}function Ba(){we(),Ct=0,tt&&tt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function Zt({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=ye();we(),Ct=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,me(),pe=setInterval(me,250)}var Va="lt-composite-expanded",be="lt-header-menu-open";async function Ka(t){let{data:{session:e}}=await b.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,s=null;function f(d=!0){s&&(clearTimeout(s),s=null),n.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),d&&Et(be,!1),s=setTimeout(()=>{n.hidden=!0,s=null},o)}function k({persist:d=!0,instant:p=!1}={}){s&&(clearTimeout(s),s=null),n.hidden=!1,p?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),d&&Et(be,!0)}r.addEventListener("click",()=>{n.hidden?k():f()}),n.addEventListener("click",d=>{d.target.closest("button")&&f()}),$t(be,!1)&&k({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ve);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>Da()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>b.auth.signOut());let L=t.querySelector("[data-composite-section]"),u=t.querySelector("[data-composite-toggle]"),c=t.querySelector("[data-composite-body]"),C=t.querySelector("[data-chevron]"),E=t.querySelector("[data-composite-summary]"),T=t.querySelector("[data-composite-discovery]");function M(d){u.setAttribute("aria-expanded",String(d)),c.hidden=!d,C.innerHTML=d?"&#9650;":"&#9660;",L.classList.toggle("lt-stats-row-expanded",d)}M($t(Va,!0)),u.addEventListener("click",()=>{if(rt(J.composite),T.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ye();return}let d=u.getAttribute("aria-expanded")==="true";M(!d),Et(Va,!d)});let U=t.querySelector("[data-killstreak-icon]"),$=t.querySelector("[data-killstreak-label]"),F=t.querySelector("[data-killstreak-sub]"),K=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Xe);function R(d){let{days:p,tier:x}=Kt(d);U.textContent=x?x.icon:"🎯",$.textContent=x?`${x.label} Killstreak`:"No Killstreak",F.textContent=`${p} Day streak`;let G=Yt(d).filter(j=>j.track==="rank"),q=Gt(G,Jt()).length>0;K.hidden=!q}let m=t.querySelector("[data-weight-card]");function w(){rt(J.weight),Ke()}function y(d){$a(m,{onExpand:w,...d}).catch(p=>{console.error("[lift-tracker]",p),m.classList.remove("lt-stats-row-expanded"),m.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,m.querySelector("[data-weight-expand]").addEventListener("click",w)})}let _=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{rt(J.history),_.hidden=!0,Ge()});let N=t.querySelector("[data-add-lift-form]"),B=t.querySelector("[data-add-lift-toggle]"),X=t.querySelector("[data-add-lift-discovery]"),i=t.querySelector("[data-add-lift-hint]"),l=t.querySelector("[data-create-workout-btn]"),v=t.querySelector("[data-create-workout-discovery]");B.addEventListener("click",()=>{let d=N.hidden;N.hidden=!d,B.setAttribute("aria-pressed",String(d)),B.classList.toggle("lt-add-lift-toggle-active",d),d&&N.querySelector('input[name="name"]').focus()});let D=t.querySelector("[data-lift-list]"),I=t.querySelector("[data-list-empty]");l.addEventListener("click",()=>{l.disabled||Fe()});let W=t.querySelector("[data-workout-pills]"),O=t.querySelector("[data-workout-empty-hint]"),Y=[],H=de();function mt(){return H&&Y.find(d=>d.id===H)||null}function Ce(){let d=mt();if(!d)return V;let p=new Set(d.liftIds);return V.filter(x=>p.has(x.id))}function De(){W.innerHTML=Y.map(d=>{let p=d.id===H;return`
          <div class="lt-workout-pill-wrap${p?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${p}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of Y){let p=W.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);p&&(p.textContent=d.name)}W.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let p=d.dataset.workoutPill;H=H===p?null:p,ue(H),De(),ae(Dt),Ae(Dt)})}),W.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",p=>{p.stopPropagation(),Be(d.dataset.workoutEdit)})})}let te="lt-fast-mode",_e="lt-burst-mode";function dr(){try{let d=window.localStorage.getItem(te);if(d!==null)return d==="true";let p=window.localStorage.getItem(_e);return p!==null?(window.localStorage.setItem(te,p),window.localStorage.removeItem(_e),p==="true"):!1}catch{return!1}}function ur(d){try{window.localStorage.setItem(te,String(d))}catch{}}let V=[],ot=dr(),st=new Map,Dt=[],Mt=t.querySelector("[data-mode-toggle]");function Te(){Mt.textContent=ot?"Normal":"Fast",Mt.setAttribute("aria-pressed",String(ot)),Mt.classList.toggle("lt-mode-toggle-active",ot)}Te(),Mt.addEventListener("click",()=>{ot=!ot,ur(ot),Te(),ae(Dt)}),N.addEventListener("submit",async d=>{d.preventDefault();let p=N.querySelector('input[name="name"]'),x=p.value.trim();if(x){p.value="",p.disabled=!0;try{await bt(x,V.length),await qe()}finally{p.disabled=!1,p.focus()}}}),At(D,{onReorder:async d=>{let p=[...d],x=new Set(d),G=V.map(q=>x.has(q.id)?p.shift():q.id);await Je(G),V=G.map(q=>V.find(j=>j.id===q)).filter(Boolean)}}),At(W,{axis:"x",onReorder:async d=>{await oa(d),Y=d.map(p=>Y.find(x=>x.id===p)).filter(Boolean)}});async function qe(){Y=await kt(),H&&!Y.some(q=>q.id===H)&&(H=null,ue(null)),De(),V=await z();let d=V.length>=2;if(X.hidden=V.length>=2,i.hidden=V.length!==1,l.disabled=!d,l.setAttribute("aria-disabled",String(!d)),v.hidden=!d||Y.length>0,O.hidden=!d||Y.length>0,V.length===0){D.innerHTML="",I.hidden=!1,I.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",i.hidden=!0,L.hidden=!0,R([]),y({showDiscovery:!1}),_.hidden=!0,T.hidden=!0,st=new Map,Dt=[];return}let p=await et(V.map(q=>q.id)),x=p.length>0;R(p),y({showDiscovery:x&&!zt(J.weight)}),_.hidden=!x||zt(J.history),st=new Map(V.map(q=>[q.id,[]]));for(let q of p){let j=st.get(q.lift_id);j&&j.push(q)}let G=V.map(q=>({liftId:q.id,dailySeries:ht(st.get(q.id)||[])}));ae(G),Ae(G)}function Ae(d){let p=mt(),x=p?d.filter(Wt=>p.liftIds.includes(Wt.liftId)):d,G=Ot(x);L.hidden=!1;let q=t.querySelector("[data-composite-canvas]"),j=t.querySelector("[data-composite-empty]"),yt=t.querySelector("[data-composite-scope]"),wt=t.querySelector("[data-composite-blurb]");if(yt.textContent=p?`Measuring ${p.name}`:"Measuring all lifts",wt.textContent=p?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",j.textContent=p?`Log a few sets for lifts in ${p.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",G.length===0){q.hidden=!0,j.hidden=!1,E.textContent="",T.hidden=!0;return}q.hidden=!1,j.hidden=!0,E.textContent=wa(G[G.length-1].pct),T.hidden=zt(J.composite),Bt(q,G)}function ee(d){let p=ht(st.get(d)||[]),x=p[p.length-1];return x?`${Math.round(x.e1rm)} lb e1RM`:"No sets yet"}function pr(d){let p=st.get(d)||[];return p.length===0?"":p[p.length-1].weight}function ae(d){Dt=d;let p=Ce();I.hidden=p.length>0,I.textContent=H?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",D.innerHTML=p.map(x=>ot?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${x.id}" data-lift-id="${x.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${x.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${ee(x.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${$e(x.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${x.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${pr(x.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${ee(x.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${$e(x.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let x of V){let q=D.querySelector(`[data-lift-id="${x.id}"]`)?.querySelector("[data-name-slot]");q&&(q.textContent=x.name)}D.querySelectorAll("[data-open-lift]").forEach(x=>{x.addEventListener("click",()=>He(x.dataset.openLift))}),ot&&fr()}function fr(){D.querySelectorAll("[data-fast-log-form]").forEach(d=>{let p=d.dataset.fastLogForm;d.addEventListener("submit",async x=>{x.preventDefault();let G=d.querySelector("[data-fast-weight]"),q=d.querySelector("[data-fast-reps]"),j=d.querySelector("[data-fast-feedback]"),yt=Number(G.value),wt=Number(q.value);if(!(yt>=0)||!Number.isFinite(yt)||!(wt>0)||!Number.isInteger(wt))return;let Wt=st.get(p)||[],mr=Q(yt,wt),Re=Ut(mr,Wt),Me=new Date().toISOString();Rt();let hr=await at(p,yt,wt,Me),gr=V.find(re=>re.id===p);Zt({seconds:Qt(p),liftName:gr?.name||""});let We=[...Wt,hr];st.set(p,We),q.value="",q.focus();let Ie=D.querySelector(`[data-lift-id="${p}"]`)?.querySelector("[data-last-slot]");Ie&&(Ie.textContent=ee(p));let yr=A(Me),Ne=gt(We.filter(re=>A(re.performed_at)===yr));j.hidden=!1,j.classList.toggle("lt-pr",Re),j.textContent=Re?`PR! ${Math.round(Ne)} lb today`:`Logged · ${Math.round(Ne)} lb today`})})}function $e(d){return String(d).replace(/[&<>"']/g,p=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[p])}await qe()}async function Ya(t,e){let a=await je(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
      <label class="lt-rest-setting-field">
        <span>Default rest</span>
        <input type="number" inputmode="numeric" step="15" min="15" max="600" data-default-rest-input />
        <small>sec</small>
      </label>
      <label class="lt-rest-setting-field">
        <span>This lift</span>
        <input type="number" inputmode="numeric" step="15" min="15" max="600" placeholder="Default" data-lift-rest-input />
        <small>sec</small>
      </label>
    </section>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="history" role="tab" aria-selected="true">History</button>
      <button type="button" class="lt-tab" data-tab="details" role="tab" aria-selected="false">Details</button>
    </div>

    <section data-tab-panel="history"></section>
    <section data-tab-panel="details" hidden></section>
  `,t.querySelector("[data-back]").addEventListener("click",P);let r=t.querySelector("[data-name-input]");r.value=a.name;let n=a.name;r.addEventListener("keydown",m=>{m.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let m=r.value.trim();if(!m||m===n){r.value=n;return}n=m,await ze(e,m)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await Qe(e),P(),pt(`Deleted "${n}"`,{onUndo:async()=>{await Ze(e),It()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(m=>{m.addEventListener("click",()=>{o.forEach(w=>w.setAttribute("aria-selected",String(w===m))),Object.entries(s).forEach(([w,y])=>{y.hidden=w!==m.dataset.tab}),m.dataset.tab==="details"&&R()})});let f=t.querySelector("[data-log-form]"),k=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),S=t.querySelector("[data-default-rest-input]"),L=t.querySelector("[data-lift-rest-input]"),u=[];function c(){S.value=he(),L.value=ge(e)||""}function C(m){let w=Number(m.value);return m.value===""?null:!Number.isFinite(w)||w<15?15:w>600?600:Math.round(w)}S.addEventListener("change",()=>{let m=C(S)||120;Ha(m),c()}),L.addEventListener("change",()=>{let m=C(L);Fa(e,m),c()});async function E(){u=await ta(e)}function T(){if(u.length===0)return;let m=u[u.length-1];k.value=m.weight}f.addEventListener("submit",async m=>{m.preventDefault();let w=Number(k.value),y=Number(h.value);if(!(w>=0)||!Number.isFinite(w)||!(y>0)||!Number.isInteger(y))return;let _=Q(w,y),B=Ut(_,u),X=new Date;Rt(),await at(e,w,y,X.toISOString()),Zt({seconds:Qt(e),liftName:n}),h.value="",h.focus(),await E(),$(),s.details.hidden||R();let i=A(X.toISOString()),l=gt(u.filter(v=>A(v.performed_at)===i));g.hidden=!1,g.classList.toggle("lt-pr",B),g.textContent=B?`New PR! Today's volume: ${Math.round(l)} lb`:`Logged. Today's volume: ${Math.round(l)} lb`});function M(m){let w=new Map;for(let y of m){let _=A(y.performed_at);w.has(_)||w.set(_,[]),w.get(_).push(y)}return Array.from(w.entries()).sort((y,_)=>_[0].localeCompare(y[0]))}function U(m){let[w,y,_]=m.split("-").map(Number);return new Date(w,y-1,_).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function $(){let m=s.history;if(u.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let w=M(u);m.innerHTML=w.map(([y,_])=>{let N=gt(_),X=_.slice().sort((i,l)=>new Date(l.performed_at)-new Date(i.performed_at)).map(i=>{let l=Math.round(Q(Number(i.weight),Number(i.reps)));return`
              <li class="lt-history-row" data-set-id="${i.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${i.id}">
                  <span class="lt-history-weight">${i.weight} lb &times; ${i.reps}</span>
                  <span class="lt-history-e1rm">${l} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${U(y)}</span>
              <span class="lt-history-volume">${Math.round(N)} lb volume</span>
            </div>
            <ul class="lt-history-list">${X}</ul>
          </div>
        `}).join(""),m.querySelectorAll("[data-edit-trigger]").forEach(y=>{y.addEventListener("click",()=>K(y.dataset.editTrigger))})}function F(m){return s.history.querySelector(`[data-set-id="${m}"]`)}function K(m){let w=F(m),y=u.find(_=>_.id===m);!w||!y||(w.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${y.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${y.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${A(y.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,w.querySelector("[data-edit-cancel]").addEventListener("click",$),w.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await ra(m),await E(),$(),s.details.hidden||R(),pt("Set deleted",{onUndo:async()=>{await na(m),await E(),$(),s.details.hidden||R()}})}),w.querySelector("[data-edit-form]").addEventListener("submit",async _=>{_.preventDefault();let N=Number(w.querySelector("[data-edit-weight]").value),B=Number(w.querySelector("[data-edit-reps]").value),X=w.querySelector("[data-edit-date]").value;if(!(N>=0)||!(B>0)||!X)return;let i=new Date(y.performed_at),[l,v,D]=X.split("-").map(Number);i.setFullYear(l,v-1,D),await aa(m,{weight:N,reps:B,performed_at:i.toISOString()}),await E(),$(),s.details.hidden||R()}))}function R(){let m=s.details,w=ht(u);if(w.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Ea();return}m.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let y=m.querySelector("[data-lift-canvas]"),_=m.querySelector("[data-point-detail]");xa(y,w,{onPointClick:N=>{_.hidden=!1,_.textContent=`${U(N.date)}: ${N.weight} lb × ${N.reps} (${Math.round(N.e1rm)} e1RM)`}})}await E(),c(),T(),$()}var Ga=60;function Xa(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Ga),e}function ft(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ke(t,e,a=new Date,r=`last ${Ga} days`,n=[],o=[]){let s=A(a.toISOString()),f=[`Lift Tracker — ${r} (as of ${s})`,""],k=t.filter(h=>(e.get(h.id)||[]).length>0);if(k.length===0)f.push("No sets logged in this period."),f.push("");else{for(let g of k){let S=(e.get(g.id)||[]).slice().sort((c,C)=>new Date(c.performed_at)-new Date(C.performed_at)),L=gt(S),u=Math.max(...S.map(c=>Q(Number(c.weight),Number(c.reps))));f.push(g.name);for(let c of S){let C=Math.round(Q(Number(c.weight),Number(c.reps)));f.push(`  ${A(c.performed_at)}: ${c.weight} lb x ${c.reps} (e1RM ${C})`)}f.push(`  Sets: ${S.length} | Volume: ${Math.round(L)} lb | Best e1RM: ${Math.round(u)}`),f.push("")}let h=t.length-k.length;h>0&&(f.push(`(${h} lift${h===1?"":"s"} with no sets in this period omitted)`),f.push(""))}if(n.length>0){f.push("Body weight");for(let u of n)f.push(`  ${u.date}: ${ft(u.weight)} lb`);let h=n[0].weight,g=n[n.length-1].weight,S=g-h,L=S>0?"+":"";f.push(`  Start: ${ft(h)} lb | Current: ${ft(g)} lb | Change: ${L}${ft(S)} lb`),f.push("")}if(o.length>0){f.push("Waist");for(let u of o)f.push(`  ${u.date}: ${ft(u.waist)} in`);let h=o[0].waist,g=o[o.length-1].waist,S=g-h,L=S>0?"+":"";f.push(`  Start: ${ft(h)} in | Current: ${ft(g)} in | Change: ${L}${ft(S)} in`),f.push("")}return f.join(`
`).trimEnd()}var qr=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Ar=`
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
`;async function ja(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${qr.map(u=>`
          <section class="lt-help-section">
            <h2>${u.title}</h2>
            <p>${u.body}</p>
          </section>
          ${u.title==="Export progress"?Ar:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let c=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(c)),a.hidden=!c,r.innerHTML=c?"&#9650;":"&#9660;",!!c){e.disabled=!0;try{let C=await z(),E=C.map(y=>y.id),T=Xa().toISOString(),M=await ea(E,T),U=new Map(C.map(y=>[y.id,[]]));for(let y of M){let _=U.get(y.lift_id);_&&_.push(y)}let F=(await vt()).filter(y=>new Date(y.logged_at)>=new Date(T)),K=St(F),m=(await _t()).filter(y=>new Date(y.logged_at)>=new Date(T)),w=Tt(m);n.value=ke(C,U,new Date,void 0,K,w),s.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}s.hidden=!1,s.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let f=t.querySelector("[data-full-export-toggle]"),k=t.querySelector("[data-full-export-body]"),h=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),S=t.querySelector("[data-full-export-copy]"),L=t.querySelector("[data-full-export-status]");f.addEventListener("click",async()=>{let c=!(f.getAttribute("aria-expanded")==="true");if(f.setAttribute("aria-expanded",String(c)),k.hidden=!c,h.innerHTML=c?"&#9650;":"&#9660;",!!c){f.disabled=!0;try{let C=await z(),E=C.map(R=>R.id),T=await et(E),M=new Map(C.map(R=>[R.id,[]]));for(let R of T){let m=M.get(R.lift_id);m&&m.push(R)}let U=await vt(),$=St(U),F=await _t(),K=Tt(F);g.value=ke(C,M,new Date,"all-time",$,K),L.hidden=!0}finally{f.disabled=!1}}}),S.addEventListener("click",async()=>{g.select();let u=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),u=!0}catch{u=!1}if(!u)try{u=document.execCommand("copy")}catch{u=!1}L.hidden=!1,L.textContent=u?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function za(t){rt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",P);let[e,a]=await Promise.all([z(),kt()]),r=Ia(a),n=r?e.filter(u=>r.liftIds.includes(u.id)):e,o=n.length?await et(n.map(u=>u.id)):[],s=new Map(n.map(u=>[u.id,[]]));for(let u of o){let c=s.get(u.lift_id);c&&c.push(u)}let f=n.map(u=>({liftId:u.id,dailySeries:ht(s.get(u.id)||[])})),k=Ot(f),h=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),S=t.querySelector("[data-composite-scope]"),L=t.querySelector("[data-composite-blurb]");if(S.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",L.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",k.length===0){h.hidden=!0,g.hidden=!1;return}h.hidden=!1,g.hidden=!0,Bt(h,k)}function $r(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Rr(){let t=await z(),e=new Map(t.map(r=>[r.id,r.name]));return(await et(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Mr(t,e){let a=new Map;for(let o of e)a.has(o.liftName)||a.set(o.liftName,[]),a.get(o.liftName).push(o);let r=Array.from(a.entries()).map(([o,s])=>{let k=s.slice().sort((h,g)=>new Date(h.performed_at)-new Date(g.performed_at)).map(h=>{let g=Math.round(Q(Number(h.weight),Number(h.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${h.weight} lb &times; ${h.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${o}</div>
          <ul class="lt-history-list">${k}</ul>
        </div>
      `}).join(""),n=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${$r(t)}</span>
        <span class="lt-history-volume">${n} lift${n===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function Ja(t){rt(J.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=t.querySelector("[data-history-content]"),a=await Rr();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=ba(a);e.innerHTML=r.map(([n,o])=>Mr(n,o)).join("")}var Qa="lt-theme",ve="default";function Se(){return Xt(Qa,ve)}function Za(t){!t||t===ve?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function tr(t){Za(t),jt(Qa,t||ve)}function er(){Za(Se())}var Wr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},Ir=["rank","mastery","streak","capstone"];async function ar(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=await z(),a=e.length?await et(e.map(c=>c.id)):[],{days:r,tier:n}=Kt(a);t.querySelector("[data-killstreak-current-icon]").textContent=n?n.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=n?`${n.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let o=ie(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Vt.map(c=>{let C=o[c.key];return`
      <li class="lt-killstreak-tier-row${n?.key===c.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${c.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${c.label}</span>
          <span class="lt-killstreak-tier-req">${c.days}+ day${c.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${C} earned</span>
      </li>
    `}).join("");let f=Yt(a),k=f.filter(c=>c.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${k} / ${f.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let h=f.filter(c=>c.track==="rank"),g=new Set(Gt(h,Jt()));Wa(h.filter(c=>c.unlocked).map(c=>c.id));let S=t.querySelector("[data-achievements]");function L(c){if(c.track!=="rank")return`
        <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc">${c.description}</span>
          </span>
        </li>
      `;let C=c.unlocked&&Se()===c.theme.id,E=c.unlocked&&g.has(c.id),T=c.unlocked?`<span class="lt-achievement-card-theme">${c.theme.label} theme${C?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${c.theme.label}</span>`,M=E?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${E?" lt-achievement-card-new":""}${C?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${c.theme.id}"${c.unlocked?"":" disabled"} aria-label="${c.unlocked?`Apply the ${c.theme.label} theme`:`Locked: ${c.name}`}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc">${c.description}</span>
            ${T}
            ${M}
          </span>
        </button>
      </li>
    `}function u(){S.innerHTML=Ir.map(c=>{let E=f.filter(T=>T.track===c).sort((T,M)=>Number(M.unlocked)-Number(T.unlocked)).map(L).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Wr[c]}</h3>
          ${c==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${E}</ul>
        </section>
      `}).join("")}u(),S.addEventListener("click",c=>{let C=c.target.closest("[data-apply-theme]");!C||C.disabled||(tr(C.dataset.applyTheme),u())})}var rr="__divider__";async function xe(t,{mode:e,workoutId:a}={}){let r=e==="edit",[n,o]=await Promise.all([z(),r?sa(a):Promise.resolve(null)]);if(r&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?o.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?nr(o.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",P);let f=t.querySelector("[data-workout-name-input]"),k=t.querySelector("[data-workout-lift-list]"),h=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),S=t.querySelector("[data-workout-save-feedback]");h.hidden=n.length>0;let L=n.filter(E=>s.has(E.id)),u=n.filter(E=>!s.has(E.id));k.innerHTML=[...L.map(c),C(),...u.map(c)].join("");for(let E of n){let M=k.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");M&&(M.textContent=E.name)}At(k,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await la(a),P(),pt(`Deleted "${o.name}"`,{onUndo:async()=>{await ca(a),It()}}))}),g.addEventListener("click",async()=>{let E=f.value.trim();if(!E){f.focus();return}let T=Array.from(k.querySelectorAll("[data-reorder-item]")),M=T.findIndex($=>$.dataset.reorderItem===rr),U=T.slice(0,M).map($=>$.dataset.reorderItem);g.disabled=!0,S.hidden=!0;try{if(r)await ia(a,E,U);else{let $=await kt();await Nt(E,U,$.length)}P()}catch($){console.error("[lift-tracker]",$),S.hidden=!1,S.textContent="Something went wrong saving the workout.",g.disabled=!1}});function c(E){return`
      <li class="lt-lift-row" data-reorder-item="${E.id}" data-lift-id="${E.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${nr(E.name)}">&#8942;&#8942;</button>
      </li>
    `}function C(){return`
      <li class="lt-workout-divider" data-reorder-item="${rr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function nr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Nr=`${window.location.origin}${window.location.pathname}`;function Or(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Ee(t){let e="signin";function a(n,o,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Or(s||"")}">

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
    `}function r(n,o,s){t.innerHTML=a(n,o,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let f=t.querySelector("[data-auth-form]");f.addEventListener("submit",async k=>{k.preventDefault();let h=f.email.value.trim(),g=f.password.value,S=f.querySelector('button[type="submit"]');S.disabled=!0,S.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:L,error:u}=e==="signup"?await b.auth.signUp({email:h,password:g,options:{emailRedirectTo:Nr}}):await b.auth.signInWithPassword({email:h,password:g});if(u)throw u;if(e==="signup"&&!L.session){e="signin",r(null,`Account created. Check ${h} for a confirmation link, then sign in here.`,h);return}}catch(L){r(L.message||"Something went wrong. Try again.",null,h)}})}r()}function or(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function sr(){let{data:t,error:e}=await b.auth.signInAnonymously();if(e)throw e;return await Ur(),t}async function Ur(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([bt("Bench Press",0),bt("Squat",1),bt("Deadlift",2)]);await Promise.all([at(e.id,135,8,t(6)),at(e.id,145,6,t(2)),at(a.id,185,5,t(5)),at(a.id,195,5,t(1)),at(r.id,225,5,t(3))]),await Nt("Full Body",[e.id,a.id,r.id],0)}var Z=document.getElementById("lift-tracker-app");er();var ir=0;async function Le(){let t=++ir,e=()=>t!==ir;try{let{data:{session:a}}=await b.auth.getSession();if(e())return;if(!a)if(or())try{if(await sr(),e())return}catch(n){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",n),await Ee(Z);return}else return await Ee(Z),e(),void 0;let r=Pe();if(r.name==="detail"?await Ya(Z,r.liftId):r.name==="help"?await ja(Z):r.name==="weight"?await Ra(Z):r.name==="composite"?await za(Z):r.name==="history"?await Ja(Z):r.name==="killstreak"?await ar(Z):r.name==="workout-new"?await xe(Z,{mode:"create"}):r.name==="workout-edit"?await xe(Z,{mode:"edit",workoutId:r.workoutId}):await Ka(Z),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",Le);var lr=null,cr=!1;b.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!cr;cr=!0;let n=a!==lr;lr=a,!(r||!n)&&(P(),Le())});Le();

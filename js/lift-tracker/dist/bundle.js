import{createClient as vr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Pe="https://mqfsgammpsumpltfutwl.supabase.co",Ue="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var w=vr(Pe,Ue);function He(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function U(){window.location.hash="#/"}function Fe(t){window.location.hash=`#/lift/${t}`}function Be(){window.location.hash="#/workout/new"}function Ve(t){window.location.hash=`#/workout/${t}/edit`}function Ke(){window.location.hash="#/help"}function Ye(){window.location.hash="#/weight"}function Ge(){window.location.hash="#/composite"}function Xe(){window.location.hash="#/history"}function je(){window.location.hash="#/killstreak"}function Nt(){window.dispatchEvent(new Event("hashchange"))}async function z(){let{data:t,error:e}=await w.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function ze(t){let{data:e,error:a}=await w.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function St(t,e){let{data:a,error:r}=await w.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Je(t,e){let{data:a,error:r}=await w.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Qe(t){let e=t.map((n,o)=>w.from("lifts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function Ze(t){let{error:e}=await w.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ta(t){let{error:e}=await w.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ea(t){let{data:e,error:a}=await w.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function et(t){if(!t||t.length===0)return[];let{data:e,error:a}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function aa(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function at(t,e,a,r){let{data:n,error:o}=await w.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(o)throw o;return n}async function ra(t,e){let{data:a,error:r}=await w.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function na(t){let{error:e}=await w.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function oa(t){let{error:e}=await w.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function xt(){let{data:t,error:e}=await w.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function sa(t){let e=t.map((n,o)=>w.from("workouts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function ia(t){let{data:e,error:a}=await w.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Ot(t,e,a){let{data:r,error:n}=await w.from("workouts").insert({name:t,sort_order:a}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await w.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(o)throw o}return r}async function la(t,e,a){let{error:r}=await w.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:n}=await w.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(a.length>0){let{error:o}=await w.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(o)throw o}}async function da(t){let{error:e}=await w.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ca(t){let{error:e}=await w.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Et(){let{data:t,error:e}=await w.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ua(t,e){let{data:a,error:r}=await w.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function pa(t,e){let{data:a,error:r}=await w.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function fa(t){let{error:e}=await w.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ma(t){let{error:e}=await w.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function qt(){let{data:t,error:e}=await w.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ha(t,e){let{data:a,error:r}=await w.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ga(t,e){let{data:a,error:r}=await w.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ya(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function wa(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Q(t,e){return t*(1+e/30)}function $(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${n}`}function gt(t){let e=new Map;for(let a of t){let r=$(a.performed_at),n=Q(Number(a.weight),Number(a.reps)),o=e.get(r);(!o||n>o.e1rm)&&e.set(r,{date:r,e1rm:n,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Pt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let m of s.dailySeries)r.add(m.date);let n=Array.from(r).sort(),o=[];for(let s of n){let m=0,b=0;for(let h of e){let g=null;for(let k of h.dailySeries)if(k.date<=s)g=k;else break;g&&(m+=g.e1rm/a.get(h.liftId),b+=1)}if(b>0){let h=m/b;o.push({date:s,ratio:h,pct:(h-1)*100})}}return o}function Ut(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>Q(Number(r.weight),Number(r.reps))));return t>a}function yt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function ba(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function ka(t){let e=new Map;for(let a of t){let r=$(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function Lt(t){let e=new Map;for(let a of t){let r=$(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:n})=>({date:a,weight:r,entryId:n}))}function va(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function At(t){let e=new Map;for(let a of t){let r=$(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:n})=>({date:a,waist:r,entryId:n}))}var $t=null,it=null,lt=null,dt=null,Bt=14,Ht="#e8242c",Sa="rgba(232, 36, 44, 0.18)",Ft="#f2b134",xa="rgba(242, 177, 52, 0.16)",ct="#9a9ca6",ut="rgba(255, 255, 255, 0.08)";function Vt(t,e,{onPointClick:a}={}){$t&&($t.destroy(),$t=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return $t=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:n,borderColor:Ht,backgroundColor:Sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ct},grid:{color:ut}},y:{ticks:{color:ct,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),$t}function Ea(t,e,{onPointClick:a}={}){it&&(it.destroy(),it=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return it=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:n,borderColor:Ft,backgroundColor:xa,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ct},grid:{color:ut}},y:{ticks:{color:ct},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),it}function La(){it&&(it.destroy(),it=null)}function oe(t,e,{onPointClick:a}={}){lt&&(lt.destroy(),lt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return lt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:n,borderColor:Ht,backgroundColor:Sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ct},grid:{color:ut}},y:{ticks:{color:ct},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),lt}function se(){lt&&(lt.destroy(),lt=null)}function Ca(t,e,{onPointClick:a}={}){dt&&(dt.destroy(),dt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return dt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:n,borderColor:Ft,backgroundColor:xa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ct},grid:{color:ut}},y:{ticks:{color:ct},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),dt}function Da(){dt&&(dt.destroy(),dt=null)}function Rt(t,{onReorder:e,axis:a="y"}={}){let r=null,n=null,o=0,s=0,m=0,b=0,h=0,g=null,k=null,E=null,p=0,d=0,_=null,C=null;function L(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function R(i){let l=i.target.closest(".lt-drag-handle");if(!l)return;let y=l.closest("[data-reorder-item]");if(y){if(i.pointerType!=="touch"){i.preventDefault(),N(y,i.clientX,i.clientY);return}if(l.setPointerCapture)try{l.setPointerCapture(i.pointerId),_=l,C=i.pointerId}catch{}E=y,p=i.clientX,d=i.clientY,document.addEventListener("pointermove",B),document.addEventListener("pointerup",Y),k=setTimeout(()=>{clearTimeout(k),k=null;let x=E,D=p,q=d;W(),N(x,D,q)},180)}}function P(){if(_&&C!==null&&_.releasePointerCapture)try{_.releasePointerCapture(C)}catch{}_=null,C=null}function W(){clearTimeout(k),k=null,E=null,document.removeEventListener("pointermove",B),document.removeEventListener("pointerup",Y)}function B(i){if(!E)return;let l=i.clientX-p,y=i.clientY-d;Math.hypot(l,y)<=10||(W(),P())}function Y(){W(),P()}function N(i,l,y){r=i,o=l,s=y,h=y;let x=i.getBoundingClientRect();b=x.top,m=x.left,n=document.createElement(i.tagName),n.className="lt-reorder-placeholder",n.style.height=`${i.offsetHeight}px`,n.style.width=`${i.offsetWidth}px`,i.after(n),i.classList.add("lt-dragging"),i.style.position="fixed",i.style.left=`${x.left}px`,i.style.width=`${x.width}px`,i.style.top=`${b}px`,i.style.zIndex="1000",document.addEventListener("pointermove",v),document.addEventListener("pointerup",T)}function O(){let i=L().filter(x=>x!==r),l=r.getBoundingClientRect(),y=null;if(a==="x"){let x=l.left+l.width/2,D=l.top+l.height/2;for(let q of i){let M=q.getBoundingClientRect(),H=M.left+M.width/2,F=M.top+M.height/2;if(Math.abs(F-D)<M.height/2?x<H:D<F){y=q;break}}}else{let x=l.top+l.height/2;for(let D of i){let q=D.getBoundingClientRect(),M=q.top+q.height/2;if(x<M){y=D;break}}}y?t.insertBefore(n,y):t.appendChild(n)}function X(){let i=h,l=window.innerHeight-h;return i<80?-16*(1-i/80):l<80?16*(1-l/80):0}function I(){if(!r){g=null;return}let i=X();if(i===0){g=null;return}window.scrollBy(0,i),O(),g=requestAnimationFrame(I)}function V(){g===null&&X()!==0&&(g=requestAnimationFrame(I))}function f(){g!==null&&(cancelAnimationFrame(g),g=null)}function v(i){if(r){if(i.preventDefault(),h=i.clientY,a==="x"){let l=i.clientX-o,y=i.clientY-s;r.style.left=`${m+l}px`,r.style.top=`${b+y}px`}else{let l=i.clientY-s;r.style.top=`${b+l}px`}O(),a==="y"&&V()}}function T(){if(!r)return;f(),n.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",T),P();let i=L().map(l=>l.dataset.reorderItem);r=null,n=null,e&&e(i)}t.addEventListener("pointerdown",R)}var Sr="joshuaegage@gmail.com";function _a(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function n(){if(r)return;r=!0,document.removeEventListener("keydown",o),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function o(s){s.key==="Escape"&&n()}e.addEventListener("click",s=>{s.target===e&&n()}),document.addEventListener("keydown",o),e.querySelector("[data-feedback-cancel]").addEventListener("click",n),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),m=encodeURIComponent("Lift Tracker feedback"),b=encodeURIComponent(s||"(no message entered)");window.location.href=`mailto:${Sr}?subject=${m}&body=${b}`,n()})}var Kt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function ie(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function xr(t,e=new Date){let a=ie(e),r=new Date(a);r.setDate(r.getDate()+7);let n=new Set;for(let o of t){let s=new Date(o.performed_at);s>=a&&s<r&&n.add($(o.performed_at))}return n.size}function Ta(t){let e=null;for(let a of Kt)t>=a.days&&(e=a);return e}function Yt(t,e=new Date){let a=xr(t,e);return{days:a,tier:Ta(a)}}function le(t){let e=new Map;for(let r of t){let o=ie(new Date(r.performed_at)).getTime();e.has(o)||e.set(o,new Set),e.get(o).add($(r.performed_at))}let a={};for(let r of Kt)a[r.key]=0;for(let r of e.values()){let n=Ta(r.size);n&&(a[n.key]+=1)}return a}function Er(t){let e=new Set;for(let a of t)e.add($(a.performed_at));return e.size}function Lr(t){let e=new Set;for(let o of t)e.add(ie(new Date(o.performed_at)).getTime());let a=Array.from(e).sort((o,s)=>o-s);if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let s=new Date(a[o-1]);s.setDate(s.getDate()+7),n=s.getTime()===a[o]?n+1:1,n>r&&(r=n)}return r}function Cr(t){return{totalDays:Er(t),tierCounts:le(t),longestStreak:Lr(t)}}var Dr=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5}];function Gt(t){let e=Cr(t);return Dr.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Xt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Ct=null,de=null;function _r(){return Ct||(Ct=document.createElement("div"),Ct.className="lt-toast",document.body.appendChild(Ct),Ct)}function pt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let n=_r();clearTimeout(de),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),s=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(de),s(),e&&e()},{once:!0}),de=setTimeout(()=>{s(),a&&a()},r)}function wt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function ft(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function jt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function zt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var qa="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function Jt(t){try{return window.localStorage.getItem(`${qa}${t}`)==="true"}catch{return!1}}function rt(t){try{window.localStorage.setItem(`${qa}${t}`,"true")}catch{}}var Aa="lt-weight-card-expanded";function Dt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Tr(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function $a(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ra(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await Et(),n=Lt(r),o=va(n),s=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let m=o.change<0?"↘":o.change>0?"↗":"→",b=wt(Aa,!1);function h(){t.classList.toggle("lt-stats-row-expanded",b),b?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${Dt(o.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Tr(o.currentDate)})</span>
              <span class="lt-weight-stat-value">${Dt(o.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${m} ${Dt(Math.abs(o.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${Dt(o.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}b=!b,ft(Aa,b),h()}),b?oe(t.querySelector("[data-home-weight-canvas]"),n):se()}h()}async function Ma(t){rt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(i=>{i.addEventListener("click",()=>{i.dataset.tab!==r&&(r=i.dataset.tab,e.forEach(l=>l.setAttribute("aria-selected",String(l===i))),Object.entries(a).forEach(([l,y])=>{y.hidden=l!==r}),r==="weight"?p():V().catch(l=>console.error("[lift-tracker]",l)))})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),m=t.querySelector("[data-weight-chart-section]"),b=t.querySelector("[data-weight-canvas]"),h=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");o.value=$(new Date().toISOString());let k=[];async function E(){k=await Et(),d(),p()}function p(){let i=Lt(k);if(i.length===0){m.hidden=!0,h.hidden=!1,se();return}m.hidden=!1,h.hidden=!0,a.weight.hidden||oe(b,i)}function d(){if(k.length===0){g.innerHTML="";return}let i=k.slice().sort((l,y)=>new Date(y.logged_at)-new Date(l.logged_at));g.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Dt(Number(l.weight))} lb</span>
              <span class="lt-history-e1rm">${$a($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>_(l.dataset.editTrigger))})}function _(i){let l=g.querySelector(`[data-entry-id="${i}"]`),y=k.find(x=>x.id===i);!l||!y||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${y.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${$(y.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",d),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await fa(i),await E(),pt("Weight entry deleted",{onUndo:async()=>{await ma(i),await E()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async x=>{x.preventDefault();let D=Number(l.querySelector("[data-edit-weight]").value),q=l.querySelector("[data-edit-date]").value;if(!(D>=0)||!q)return;let M=new Date(y.logged_at),[H,F,ht]=q.split("-").map(Number);M.setFullYear(H,F-1,ht),await pa(i,{weight:D,logged_at:M.toISOString()}),await E()}))}n.addEventListener("submit",async i=>{i.preventDefault();let l=Number(s.value),y=o.value;if(!(l>=0)||!Number.isFinite(l)||!y)return;let[x,D,q]=y.split("-").map(Number),M=new Date;M.setFullYear(x,D-1,q),await ua(l,M.toISOString()),s.value="",s.focus(),o.value=$(new Date().toISOString()),await E()});let C=t.querySelector("[data-waist-form]"),L=t.querySelector("[data-waist-date-input]"),R=t.querySelector("[data-waist-input]"),P=t.querySelector("[data-waist-chart-section]"),W=t.querySelector("[data-waist-canvas]"),B=t.querySelector("[data-waist-empty]"),Y=t.querySelector("[data-waist-history]");L.value=$(new Date().toISOString());let N=[],O=!1,X=null;async function I(){N=await qt(),O=!0,v(),f()}async function V(){if(O){f();return}X||(B.hidden=!1,B.textContent="Loading waist...",P.hidden=!0,X=I().finally(()=>{X=null})),await X}function f(){let i=At(N);if(i.length===0){P.hidden=!0,B.hidden=!1,B.textContent="No waist measurements yet — add your first one above.",Da();return}P.hidden=!1,B.hidden=!0,a.waist.hidden||Ca(W,i)}function v(){if(N.length===0){Y.innerHTML="";return}let i=N.slice().sort((l,y)=>new Date(y.logged_at)-new Date(l.logged_at));Y.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Dt(Number(l.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${$a($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),Y.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>T(l.dataset.editTrigger))})}function T(i){let l=Y.querySelector(`[data-entry-id="${i}"]`),y=N.find(x=>x.id===i);!l||!y||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${y.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${$(y.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",v),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ya(i),await I(),pt("Waist measurement deleted",{onUndo:async()=>{await wa(i),await I()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async x=>{x.preventDefault();let D=Number(l.querySelector("[data-edit-waist]").value),q=l.querySelector("[data-edit-date]").value;if(!(D>=0)||!q)return;let M=new Date(y.logged_at),[H,F,ht]=q.split("-").map(Number);M.setFullYear(H,F-1,ht),await ga(i,{waist_circumference:D,logged_at:M.toISOString()}),await I()}))}C.addEventListener("submit",async i=>{i.preventDefault();let l=Number(R.value),y=L.value;if(!(l>=0)||!Number.isFinite(l)||!y)return;let[x,D,q]=y.split("-").map(Number),M=new Date;M.setFullYear(x,D-1,q),await ha(l,M.toISOString()),R.value="",R.focus(),L.value=$(new Date().toISOString()),await I()}),await E()}var Wa="lt-seen-rank-achievements";function Qt(){let t=jt(Wa,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Ia(t){zt(Wa,JSON.stringify(t))}var ce="lt-active-workout";function ue(){try{return window.localStorage.getItem(ce)||null}catch{return null}}function pe(t){try{t?window.localStorage.setItem(ce,t):window.localStorage.removeItem(ce)}catch{}}function Na(t){let e=ue();return e&&t.find(a=>a.id===e)||null}var qr=120,Oa="lt-default-rest-seconds",Pa="lt-lift-rest-seconds-",Ua="lt-rest-timer-enabled",tt=null,fe=null,me=null,_t=0,nt=null;function Ha(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Fa(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function bt(){return wt(Ua,!1)}function Ba(t){ft(Ua,!!t)}function ge(){return Ha(Oa)||qr}function Va(t){Fa(Oa,t)}function ye(t){return Ha(`${Pa}${t}`)}function Ka(t,e){Fa(`${Pa}${t}`,e)}function Zt(t){return ye(t)||ge()}function we(){return tt||(tt=document.createElement("div"),tt.className="lt-rest-timer",tt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,tt.querySelector("[data-rest-add]").addEventListener("click",()=>{_t&&(_t+=30*1e3,he())}),tt.querySelector("[data-rest-skip]").addEventListener("click",Ya),document.body.appendChild(tt),tt)}function Ar(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function he(){let t=we(),e=_t-Date.now();t.querySelector("[data-rest-time]").textContent=Ar(e),e<=0&&Rr()}function be(){clearInterval(fe),clearTimeout(me),fe=null,me=null}function $r(){try{Mt(),nt.state==="suspended"&&nt.resume();let t=nt.currentTime,e=nt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(nt.destination),[523.25,659.25].forEach((a,r)=>{let n=nt.createOscillator();n.type="sine",n.frequency.setValueAtTime(a,t+r*.12),n.connect(e),n.start(t+r*.12),n.stop(t+.75)})}catch{}}function Mt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;nt||=new t,nt.state==="suspended"&&nt.resume()}catch{}}function Rr(){be(),_t=0;let t=we();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",$r(),navigator.vibrate&&navigator.vibrate([120,70,120]),me=setTimeout(Ya,12e3)}function Ya(){be(),_t=0,tt&&tt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function te({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=we();be(),_t=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,he(),fe=setInterval(he,250)}var Ga="lt-composite-expanded",ke="lt-header-menu-open";async function Xa(t){let{data:{session:e}}=await w.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,s=null;function m(c=!0){s&&(clearTimeout(s),s=null),n.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),c&&ft(ke,!1),s=setTimeout(()=>{n.hidden=!0,s=null},o)}function b({persist:c=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),n.hidden=!1,u?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),c&&ft(ke,!0)}r.addEventListener("click",()=>{n.hidden?b():m()}),n.addEventListener("click",c=>{c.target.closest("button")&&m()}),wt(ke,!1)&&b({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ke);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>_a()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>w.auth.signOut());let E=t.querySelector("[data-composite-section]"),p=t.querySelector("[data-composite-toggle]"),d=t.querySelector("[data-composite-body]"),_=t.querySelector("[data-chevron]"),C=t.querySelector("[data-composite-summary]"),L=t.querySelector("[data-composite-discovery]");function R(c){p.setAttribute("aria-expanded",String(c)),d.hidden=!c,_.innerHTML=c?"&#9650;":"&#9660;",E.classList.toggle("lt-stats-row-expanded",c)}R(wt(Ga,!0)),p.addEventListener("click",()=>{if(rt(J.composite),L.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ge();return}let c=p.getAttribute("aria-expanded")==="true";R(!c),ft(Ga,!c)});let P=t.querySelector("[data-killstreak-icon]"),W=t.querySelector("[data-killstreak-label]"),B=t.querySelector("[data-killstreak-sub]"),Y=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",je);function N(c){let{days:u,tier:S}=Yt(c);P.textContent=S?S.icon:"🎯",W.textContent=S?`${S.label} Killstreak`:"No Killstreak",B.textContent=`${u} Day streak`;let G=Gt(c).filter(j=>j.track==="rank"),A=Xt(G,Qt()).length>0;Y.hidden=!A}let O=t.querySelector("[data-weight-card]");function X(){rt(J.weight),Ye()}function I(c){Ra(O,{onExpand:X,...c}).catch(u=>{console.error("[lift-tracker]",u),O.classList.remove("lt-stats-row-expanded"),O.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,O.querySelector("[data-weight-expand]").addEventListener("click",X)})}let V=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{rt(J.history),V.hidden=!0,Xe()});let f=t.querySelector("[data-add-lift-form]"),v=t.querySelector("[data-add-lift-toggle]"),T=t.querySelector("[data-add-lift-discovery]"),i=t.querySelector("[data-add-lift-hint]"),l=t.querySelector("[data-create-workout-btn]"),y=t.querySelector("[data-create-workout-discovery]");v.addEventListener("click",()=>{let c=f.hidden;f.hidden=!c,v.setAttribute("aria-pressed",String(c)),v.classList.toggle("lt-add-lift-toggle-active",c),c&&f.querySelector('input[name="name"]').focus()});let x=t.querySelector("[data-lift-list]"),D=t.querySelector("[data-list-empty]");l.addEventListener("click",()=>{l.disabled||Be()});let q=t.querySelector("[data-workout-pills]"),M=t.querySelector("[data-workout-empty-hint]"),H=[],F=ue();function ht(){return F&&H.find(c=>c.id===F)||null}function De(){let c=ht();if(!c)return K;let u=new Set(c.liftIds);return K.filter(S=>u.has(S.id))}function _e(){q.innerHTML=H.map(c=>{let u=c.id===F;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${c.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${c.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${c.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let c of H){let u=q.querySelector(`[data-workout-pill="${c.id}"] [data-workout-pill-name]`);u&&(u.textContent=c.name)}q.querySelectorAll("[data-workout-pill]").forEach(c=>{c.addEventListener("click",()=>{let u=c.dataset.workoutPill;F=F===u?null:u,pe(F),_e(),re(Tt),$e(Tt)})}),q.querySelectorAll("[data-workout-edit]").forEach(c=>{c.addEventListener("click",u=>{u.stopPropagation(),Ve(c.dataset.workoutEdit)})})}let ee="lt-fast-mode",Te="lt-burst-mode";function fr(){try{let c=window.localStorage.getItem(ee);if(c!==null)return c==="true";let u=window.localStorage.getItem(Te);return u!==null?(window.localStorage.setItem(ee,u),window.localStorage.removeItem(Te),u==="true"):!1}catch{return!1}}function mr(c){try{window.localStorage.setItem(ee,String(c))}catch{}}let K=[],ot=fr(),st=new Map,Tt=[],Wt=t.querySelector("[data-mode-toggle]");function qe(){Wt.textContent=ot?"Normal":"Fast",Wt.setAttribute("aria-pressed",String(ot)),Wt.classList.toggle("lt-mode-toggle-active",ot)}qe(),Wt.addEventListener("click",()=>{ot=!ot,mr(ot),qe(),re(Tt)}),f.addEventListener("submit",async c=>{c.preventDefault();let u=f.querySelector('input[name="name"]'),S=u.value.trim();if(S){u.value="",u.disabled=!0;try{await St(S,K.length),await Ae()}finally{u.disabled=!1,u.focus()}}}),Rt(x,{onReorder:async c=>{let u=[...c],S=new Set(c),G=K.map(A=>S.has(A.id)?u.shift():A.id);await Qe(G),K=G.map(A=>K.find(j=>j.id===A)).filter(Boolean)}}),Rt(q,{axis:"x",onReorder:async c=>{await sa(c),H=c.map(u=>H.find(S=>S.id===u)).filter(Boolean)}});async function Ae(){H=await xt(),F&&!H.some(A=>A.id===F)&&(F=null,pe(null)),_e(),K=await z();let c=K.length>=2;if(T.hidden=K.length>=2,i.hidden=K.length!==1,l.disabled=!c,l.setAttribute("aria-disabled",String(!c)),y.hidden=!c||H.length>0,M.hidden=!c||H.length>0,K.length===0){x.innerHTML="",D.hidden=!1,D.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",i.hidden=!0,E.hidden=!0,N([]),I({showDiscovery:!1}),V.hidden=!0,L.hidden=!0,st=new Map,Tt=[];return}let u=await et(K.map(A=>A.id)),S=u.length>0;N(u),I({showDiscovery:S&&!Jt(J.weight)}),V.hidden=!S||Jt(J.history),st=new Map(K.map(A=>[A.id,[]]));for(let A of u){let j=st.get(A.lift_id);j&&j.push(A)}let G=K.map(A=>({liftId:A.id,dailySeries:gt(st.get(A.id)||[])}));re(G),$e(G)}function $e(c){let u=ht(),S=u?c.filter(It=>u.liftIds.includes(It.liftId)):c,G=Pt(S);E.hidden=!1;let A=t.querySelector("[data-composite-canvas]"),j=t.querySelector("[data-composite-empty]"),kt=t.querySelector("[data-composite-scope]"),vt=t.querySelector("[data-composite-blurb]");if(kt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",vt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",j.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",G.length===0){A.hidden=!0,j.hidden=!1,C.textContent="",L.hidden=!0;return}A.hidden=!1,j.hidden=!0,C.textContent=ba(G[G.length-1].pct),L.hidden=Jt(J.composite),Vt(A,G)}function ae(c){let u=gt(st.get(c)||[]),S=u[u.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function hr(c){let u=st.get(c)||[];return u.length===0?"":u[u.length-1].weight}function re(c){Tt=c;let u=De();D.hidden=u.length>0,D.textContent=F?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",x.innerHTML=u.map(S=>ot?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${S.id}" data-lift-id="${S.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${S.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${ae(S.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Re(S.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${S.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${hr(S.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${ae(S.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Re(S.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let S of K){let A=x.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");A&&(A.textContent=S.name)}x.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Fe(S.dataset.openLift))}),ot&&gr()}function gr(){x.querySelectorAll("[data-fast-log-form]").forEach(c=>{let u=c.dataset.fastLogForm;c.addEventListener("submit",async S=>{S.preventDefault();let G=c.querySelector("[data-fast-weight]"),A=c.querySelector("[data-fast-reps]"),j=c.querySelector("[data-fast-feedback]"),kt=Number(G.value),vt=Number(A.value);if(!(kt>=0)||!Number.isFinite(kt)||!(vt>0)||!Number.isInteger(vt))return;let It=st.get(u)||[],yr=Q(kt,vt),Me=Ut(yr,It),We=new Date().toISOString();bt()&&Mt();let wr=await at(u,kt,vt,We),br=K.find(ne=>ne.id===u);bt()&&te({seconds:Zt(u),liftName:br?.name||""});let Ie=[...It,wr];st.set(u,Ie),A.value="",A.focus();let Ne=x.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");Ne&&(Ne.textContent=ae(u));let kr=$(We),Oe=yt(Ie.filter(ne=>$(ne.performed_at)===kr));j.hidden=!1,j.classList.toggle("lt-pr",Me),j.textContent=Me?`PR! ${Math.round(Oe)} lb today`:`Logged · ${Math.round(Oe)} lb today`})})}function Re(c){return String(c).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await Ae()}async function ja(t,e){let a=await ze(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="history" role="tab" aria-selected="true">History</button>
      <button type="button" class="lt-tab" data-tab="details" role="tab" aria-selected="false">Details</button>
    </div>

    <section data-tab-panel="history"></section>
    <section data-tab-panel="details" hidden></section>
  `,t.querySelector("[data-back]").addEventListener("click",U);let r=t.querySelector("[data-name-input]");r.value=a.name;let n=a.name;r.addEventListener("keydown",f=>{f.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let f=r.value.trim();if(!f||f===n){r.value=n;return}n=f,await Je(e,f)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await Ze(e),U(),pt(`Deleted "${n}"`,{onUndo:async()=>{await ta(e),Nt()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(f=>{f.addEventListener("click",()=>{o.forEach(v=>v.setAttribute("aria-selected",String(v===f))),Object.entries(s).forEach(([v,T])=>{T.hidden=v!==f.dataset.tab}),f.dataset.tab==="details"&&V()})});let m=t.querySelector("[data-log-form]"),b=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),k=t.querySelector("[data-default-rest-input]"),E=t.querySelector("[data-lift-rest-input]"),p=t.querySelector("[data-rest-enabled-input]"),d=t.querySelector("[data-rest-enabled-label]"),_=t.querySelector("[data-default-rest-field]"),C=t.querySelector("[data-lift-rest-field]"),L=[];function R(){k.value=ge(),E.value=ye(e)||"";let f=bt();p.checked=f,d.textContent=f?"Rest timer: On":"Rest timer: Off",k.disabled=!f,E.disabled=!f,_.classList.toggle("lt-rest-setting-field-disabled",!f),C.classList.toggle("lt-rest-setting-field-disabled",!f)}function P(f){let v=Number(f.value);return f.value===""?null:!Number.isFinite(v)||v<15?15:v>600?600:Math.round(v)}k.addEventListener("change",()=>{let f=P(k)||120;Va(f),R()}),E.addEventListener("change",()=>{let f=P(E);Ka(e,f),R()}),p.addEventListener("change",()=>{Ba(p.checked),R()});async function W(){L=await ea(e)}function B(){if(L.length===0)return;let f=L[L.length-1];b.value=f.weight}m.addEventListener("submit",async f=>{f.preventDefault();let v=Number(b.value),T=Number(h.value);if(!(v>=0)||!Number.isFinite(v)||!(T>0)||!Number.isInteger(T))return;let i=Q(v,T),y=Ut(i,L),x=new Date;bt()&&Mt(),await at(e,v,T,x.toISOString()),bt()&&te({seconds:Zt(e),liftName:n}),h.value="",h.focus(),await W(),O(),s.details.hidden||V();let D=$(x.toISOString()),q=yt(L.filter(M=>$(M.performed_at)===D));g.hidden=!1,g.classList.toggle("lt-pr",y),g.textContent=y?`New PR! Today's volume: ${Math.round(q)} lb`:`Logged. Today's volume: ${Math.round(q)} lb`});function Y(f){let v=new Map;for(let T of f){let i=$(T.performed_at);v.has(i)||v.set(i,[]),v.get(i).push(T)}return Array.from(v.entries()).sort((T,i)=>i[0].localeCompare(T[0]))}function N(f){let[v,T,i]=f.split("-").map(Number);return new Date(v,T-1,i).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function O(){let f=s.history;if(L.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let v=Y(L);f.innerHTML=v.map(([T,i])=>{let l=yt(i),x=i.slice().sort((D,q)=>new Date(q.performed_at)-new Date(D.performed_at)).map(D=>{let q=Math.round(Q(Number(D.weight),Number(D.reps)));return`
              <li class="lt-history-row" data-set-id="${D.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${D.id}">
                  <span class="lt-history-weight">${D.weight} lb &times; ${D.reps}</span>
                  <span class="lt-history-e1rm">${q} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${N(T)}</span>
              <span class="lt-history-volume">${Math.round(l)} lb volume</span>
            </div>
            <ul class="lt-history-list">${x}</ul>
          </div>
        `}).join(""),f.querySelectorAll("[data-edit-trigger]").forEach(T=>{T.addEventListener("click",()=>I(T.dataset.editTrigger))})}function X(f){return s.history.querySelector(`[data-set-id="${f}"]`)}function I(f){let v=X(f),T=L.find(i=>i.id===f);!v||!T||(v.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${T.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${T.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${$(T.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,v.querySelector("[data-edit-cancel]").addEventListener("click",O),v.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await na(f),await W(),O(),s.details.hidden||V(),pt("Set deleted",{onUndo:async()=>{await oa(f),await W(),O(),s.details.hidden||V()}})}),v.querySelector("[data-edit-form]").addEventListener("submit",async i=>{i.preventDefault();let l=Number(v.querySelector("[data-edit-weight]").value),y=Number(v.querySelector("[data-edit-reps]").value),x=v.querySelector("[data-edit-date]").value;if(!(l>=0)||!(y>0)||!x)return;let D=new Date(T.performed_at),[q,M,H]=x.split("-").map(Number);D.setFullYear(q,M-1,H),await ra(f,{weight:l,reps:y,performed_at:D.toISOString()}),await W(),O(),s.details.hidden||V()}))}function V(){let f=s.details,v=gt(L);if(v.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>',La();return}f.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let T=f.querySelector("[data-lift-canvas]"),i=f.querySelector("[data-point-detail]");Ea(T,v,{onPointClick:l=>{i.hidden=!1,i.textContent=`${N(l.date)}: ${l.weight} lb × ${l.reps} (${Math.round(l.e1rm)} e1RM)`}})}await W(),R(),B(),O()}var za=60;function Ja(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-za),e}function mt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ve(t,e,a=new Date,r=`last ${za} days`,n=[],o=[]){let s=$(a.toISOString()),m=[`Lift Tracker — ${r} (as of ${s})`,""],b=t.filter(h=>(e.get(h.id)||[]).length>0);if(b.length===0)m.push("No sets logged in this period."),m.push("");else{for(let g of b){let k=(e.get(g.id)||[]).slice().sort((d,_)=>new Date(d.performed_at)-new Date(_.performed_at)),E=yt(k),p=Math.max(...k.map(d=>Q(Number(d.weight),Number(d.reps))));m.push(g.name);for(let d of k){let _=Math.round(Q(Number(d.weight),Number(d.reps)));m.push(`  ${$(d.performed_at)}: ${d.weight} lb x ${d.reps} (e1RM ${_})`)}m.push(`  Sets: ${k.length} | Volume: ${Math.round(E)} lb | Best e1RM: ${Math.round(p)}`),m.push("")}let h=t.length-b.length;h>0&&(m.push(`(${h} lift${h===1?"":"s"} with no sets in this period omitted)`),m.push(""))}if(n.length>0){m.push("Body weight");for(let p of n)m.push(`  ${p.date}: ${mt(p.weight)} lb`);let h=n[0].weight,g=n[n.length-1].weight,k=g-h,E=k>0?"+":"";m.push(`  Start: ${mt(h)} lb | Current: ${mt(g)} lb | Change: ${E}${mt(k)} lb`),m.push("")}if(o.length>0){m.push("Waist");for(let p of o)m.push(`  ${p.date}: ${mt(p.waist)} in`);let h=o[0].waist,g=o[o.length-1].waist,k=g-h,E=k>0?"+":"";m.push(`  Start: ${mt(h)} in | Current: ${mt(g)} in | Change: ${E}${mt(k)} in`),m.push("")}return m.join(`
`).trimEnd()}var Mr=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Wr=`
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
`;async function Qa(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Mr.map(p=>`
          <section class="lt-help-section">
            <h2>${p.title}</h2>
            <p>${p.body}</p>
          </section>
          ${p.title==="Export progress"?Wr:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let d=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(d)),a.hidden=!d,r.innerHTML=d?"&#9650;":"&#9660;",!!d){e.disabled=!0;try{let _=await z(),C=_.map(I=>I.id),L=Ja().toISOString(),R=await aa(C,L),P=new Map(_.map(I=>[I.id,[]]));for(let I of R){let V=P.get(I.lift_id);V&&V.push(I)}let B=(await Et()).filter(I=>new Date(I.logged_at)>=new Date(L)),Y=Lt(B),O=(await qt()).filter(I=>new Date(I.logged_at)>=new Date(L)),X=At(O);n.value=ve(_,P,new Date,void 0,Y,X),s.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}s.hidden=!1,s.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let m=t.querySelector("[data-full-export-toggle]"),b=t.querySelector("[data-full-export-body]"),h=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),k=t.querySelector("[data-full-export-copy]"),E=t.querySelector("[data-full-export-status]");m.addEventListener("click",async()=>{let d=!(m.getAttribute("aria-expanded")==="true");if(m.setAttribute("aria-expanded",String(d)),b.hidden=!d,h.innerHTML=d?"&#9650;":"&#9660;",!!d){m.disabled=!0;try{let _=await z(),C=_.map(N=>N.id),L=await et(C),R=new Map(_.map(N=>[N.id,[]]));for(let N of L){let O=R.get(N.lift_id);O&&O.push(N)}let P=await Et(),W=Lt(P),B=await qt(),Y=At(B);g.value=ve(_,R,new Date,"all-time",W,Y),E.hidden=!0}finally{m.disabled=!1}}}),k.addEventListener("click",async()=>{g.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}E.hidden=!1,E.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function Za(t){rt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let[e,a]=await Promise.all([z(),xt()]),r=Na(a),n=r?e.filter(p=>r.liftIds.includes(p.id)):e,o=n.length?await et(n.map(p=>p.id)):[],s=new Map(n.map(p=>[p.id,[]]));for(let p of o){let d=s.get(p.lift_id);d&&d.push(p)}let m=n.map(p=>({liftId:p.id,dailySeries:gt(s.get(p.id)||[])})),b=Pt(m),h=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),k=t.querySelector("[data-composite-scope]"),E=t.querySelector("[data-composite-blurb]");if(k.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",E.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",b.length===0){h.hidden=!0,g.hidden=!1;return}h.hidden=!1,g.hidden=!0,Vt(h,b)}function Ir(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Nr(){let t=await z(),e=new Map(t.map(r=>[r.id,r.name]));return(await et(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Or(t,e){let a=new Map;for(let o of e)a.has(o.liftName)||a.set(o.liftName,[]),a.get(o.liftName).push(o);let r=Array.from(a.entries()).map(([o,s])=>{let b=s.slice().sort((h,g)=>new Date(h.performed_at)-new Date(g.performed_at)).map(h=>{let g=Math.round(Q(Number(h.weight),Number(h.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${h.weight} lb &times; ${h.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${o}</div>
          <ul class="lt-history-list">${b}</ul>
        </div>
      `}).join(""),n=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Ir(t)}</span>
        <span class="lt-history-volume">${n} lift${n===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function tr(t){rt(J.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),a=await Nr();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=ka(a);e.innerHTML=r.map(([n,o])=>Or(n,o)).join("")}var er="lt-theme",Se="default";function xe(){return jt(er,Se)}function ar(t){!t||t===Se?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function rr(t){ar(t),zt(er,t||Se)}function nr(){ar(xe())}var Pr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},Ur=["rank","mastery","streak","capstone"];async function or(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await z(),a=e.length?await et(e.map(d=>d.id)):[],{days:r,tier:n}=Yt(a);t.querySelector("[data-killstreak-current-icon]").textContent=n?n.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=n?`${n.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let o=le(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Kt.map(d=>{let _=o[d.key];return`
      <li class="lt-killstreak-tier-row${n?.key===d.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${d.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${d.label}</span>
          <span class="lt-killstreak-tier-req">${d.days}+ day${d.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${_} earned</span>
      </li>
    `}).join("");let m=Gt(a),b=m.filter(d=>d.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${b} / ${m.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let h=m.filter(d=>d.track==="rank"),g=new Set(Xt(h,Qt()));Ia(h.filter(d=>d.unlocked).map(d=>d.id));let k=t.querySelector("[data-achievements]");function E(d){if(d.track!=="rank")return`
        <li class="lt-achievement-card${d.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${d.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${d.name}</span>
            <span class="lt-achievement-card-desc">${d.description}</span>
          </span>
        </li>
      `;let _=d.unlocked&&xe()===d.theme.id,C=d.unlocked&&g.has(d.id),L=d.unlocked?`<span class="lt-achievement-card-theme">${d.theme.label} theme${_?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${d.theme.label}</span>`,R=C?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${d.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${C?" lt-achievement-card-new":""}${_?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${d.theme.id}"${d.unlocked?"":" disabled"} aria-label="${d.unlocked?`Apply the ${d.theme.label} theme`:`Locked: ${d.name}`}">
          <span class="lt-achievement-card-icon">${d.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${d.name}</span>
            <span class="lt-achievement-card-desc">${d.description}</span>
            ${L}
            ${R}
          </span>
        </button>
      </li>
    `}function p(){k.innerHTML=Ur.map(d=>{let C=m.filter(L=>L.track===d).sort((L,R)=>Number(R.unlocked)-Number(L.unlocked)).map(E).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Pr[d]}</h3>
          ${d==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${C}</ul>
        </section>
      `}).join("")}p(),k.addEventListener("click",d=>{let _=d.target.closest("[data-apply-theme]");!_||_.disabled||(rr(_.dataset.applyTheme),p())})}var sr="__divider__";async function Ee(t,{mode:e,workoutId:a}={}){let r=e==="edit",[n,o]=await Promise.all([z(),r?ia(a):Promise.resolve(null)]);if(r&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?o.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?ir(o.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let m=t.querySelector("[data-workout-name-input]"),b=t.querySelector("[data-workout-lift-list]"),h=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),k=t.querySelector("[data-workout-save-feedback]");h.hidden=n.length>0;let E=n.filter(C=>s.has(C.id)),p=n.filter(C=>!s.has(C.id));b.innerHTML=[...E.map(d),_(),...p.map(d)].join("");for(let C of n){let R=b.querySelector(`[data-lift-id="${C.id}"]`)?.querySelector("[data-name-slot]");R&&(R.textContent=C.name)}Rt(b,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await da(a),U(),pt(`Deleted "${o.name}"`,{onUndo:async()=>{await ca(a),Nt()}}))}),g.addEventListener("click",async()=>{let C=m.value.trim();if(!C){m.focus();return}let L=Array.from(b.querySelectorAll("[data-reorder-item]")),R=L.findIndex(W=>W.dataset.reorderItem===sr),P=L.slice(0,R).map(W=>W.dataset.reorderItem);g.disabled=!0,k.hidden=!0;try{if(r)await la(a,C,P);else{let W=await xt();await Ot(C,P,W.length)}U()}catch(W){console.error("[lift-tracker]",W),k.hidden=!1,k.textContent="Something went wrong saving the workout.",g.disabled=!1}});function d(C){return`
      <li class="lt-lift-row" data-reorder-item="${C.id}" data-lift-id="${C.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${ir(C.name)}">&#8942;&#8942;</button>
      </li>
    `}function _(){return`
      <li class="lt-workout-divider" data-reorder-item="${sr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function ir(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Hr=`${window.location.origin}${window.location.pathname}`;function Fr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Le(t){let e="signin";function a(n,o,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Fr(s||"")}">

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
    `}function r(n,o,s){t.innerHTML=a(n,o,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let m=t.querySelector("[data-auth-form]");m.addEventListener("submit",async b=>{b.preventDefault();let h=m.email.value.trim(),g=m.password.value,k=m.querySelector('button[type="submit"]');k.disabled=!0,k.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:E,error:p}=e==="signup"?await w.auth.signUp({email:h,password:g,options:{emailRedirectTo:Hr}}):await w.auth.signInWithPassword({email:h,password:g});if(p)throw p;if(e==="signup"&&!E.session){e="signin",r(null,`Account created. Check ${h} for a confirmation link, then sign in here.`,h);return}}catch(E){r(E.message||"Something went wrong. Try again.",null,h)}})}r()}function lr(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function dr(){let{data:t,error:e}=await w.auth.signInAnonymously();if(e)throw e;return await Br(),t}async function Br(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([St("Bench Press",0),St("Squat",1),St("Deadlift",2)]);await Promise.all([at(e.id,135,8,t(6)),at(e.id,145,6,t(2)),at(a.id,185,5,t(5)),at(a.id,195,5,t(1)),at(r.id,225,5,t(3))]),await Ot("Full Body",[e.id,a.id,r.id],0)}var Z=document.getElementById("lift-tracker-app");nr();var cr=0;async function Ce(){let t=++cr,e=()=>t!==cr;try{let{data:{session:a}}=await w.auth.getSession();if(e())return;if(!a)if(lr())try{if(await dr(),e())return}catch(n){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",n),await Le(Z);return}else return await Le(Z),e(),void 0;let r=He();if(r.name==="detail"?await ja(Z,r.liftId):r.name==="help"?await Qa(Z):r.name==="weight"?await Ma(Z):r.name==="composite"?await Za(Z):r.name==="history"?await tr(Z):r.name==="killstreak"?await or(Z):r.name==="workout-new"?await Ee(Z,{mode:"create"}):r.name==="workout-edit"?await Ee(Z,{mode:"edit",workoutId:r.workoutId}):await Xa(Z),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",Ce);var ur=null,pr=!1;w.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!pr;pr=!0;let n=a!==ur;ur=a,!(r||!n)&&(U(),Ce())});Ce();

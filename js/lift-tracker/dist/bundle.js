import{createClient as xr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Ue="https://mqfsgammpsumpltfutwl.supabase.co",He="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var b=xr(Ue,He);function Fe(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function U(){window.location.hash="#/"}function Be(t){window.location.hash=`#/lift/${t}`}function Ve(){window.location.hash="#/workout/new"}function Ke(t){window.location.hash=`#/workout/${t}/edit`}function Ye(){window.location.hash="#/help"}function Ge(){window.location.hash="#/weight"}function Xe(){window.location.hash="#/composite"}function je(){window.location.hash="#/history"}function ze(){window.location.hash="#/killstreak"}function Nt(){window.dispatchEvent(new Event("hashchange"))}async function Je(){let{data:t,error:e}=await b.auth.getUser();if(e)throw e;return t?.user?.id??null}async function z(){let{data:t,error:e}=await b.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Qe(t){let{data:e,error:r}=await b.from("lifts").select("*").eq("id",t).maybeSingle();if(r)throw r;return e}async function St(t,e){let{data:r,error:a}=await b.from("lifts").insert({name:t,sort_order:e}).select().single();if(a)throw a;return r}async function Ze(t,e){let{data:r,error:a}=await b.from("lifts").update({name:e}).eq("id",t).select().single();if(a)throw a;return r}async function ta(t){let e=t.map((n,o)=>b.from("lifts").update({sort_order:o}).eq("id",n)),a=(await Promise.all(e)).find(n=>n.error);if(a)throw a.error}async function ea(t){let{error:e}=await b.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function aa(t){let{error:e}=await b.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ra(t){let{data:e,error:r}=await b.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(r)throw r;return e}async function et(t){if(!t||t.length===0)return[];let{data:e,error:r}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(r)throw r;return e}async function na(t,e){if(!t||t.length===0)return[];let{data:r,error:a}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(a)throw a;return r}async function at(t,e,r,a){let{data:n,error:o}=await b.from("sets").insert({lift_id:t,weight:e,reps:r,performed_at:a||new Date().toISOString()}).select().single();if(o)throw o;return n}async function oa(t,e){let{data:r,error:a}=await b.from("sets").update(e).eq("id",t).select().single();if(a)throw a;return r}async function sa(t){let{error:e}=await b.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ia(t){let{error:e}=await b.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function xt(){let{data:t,error:e}=await b.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(r=>({...r,liftIds:(r.workout_lifts||[]).map(a=>a.lift_id)}))}async function la(t){let e=t.map((n,o)=>b.from("workouts").update({sort_order:o}).eq("id",n)),a=(await Promise.all(e)).find(n=>n.error);if(a)throw a.error}async function ca(t){let{data:e,error:r}=await b.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(r)throw r;return e?{...e,liftIds:(e.workout_lifts||[]).map(a=>a.lift_id)}:null}async function Ot(t,e,r){let{data:a,error:n}=await b.from("workouts").insert({name:t,sort_order:r}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await b.from("workout_lifts").insert(e.map(s=>({workout_id:a.id,lift_id:s})));if(o)throw o}return a}async function da(t,e,r){let{error:a}=await b.from("workouts").update({name:e}).eq("id",t);if(a)throw a;let{error:n}=await b.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(r.length>0){let{error:o}=await b.from("workout_lifts").insert(r.map(s=>({workout_id:t,lift_id:s})));if(o)throw o}}async function ua(t){let{error:e}=await b.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function pa(t){let{error:e}=await b.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Et(){let{data:t,error:e}=await b.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function fa(t,e){let{data:r,error:a}=await b.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(a)throw a;return r}async function ma(t,e){let{data:r,error:a}=await b.from("body_weight").update(e).eq("id",t).select().single();if(a)throw a;return r}async function ha(t){let{error:e}=await b.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ga(t){let{error:e}=await b.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function qt(){let{data:t,error:e}=await b.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ya(t,e){let{data:r,error:a}=await b.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(a)throw a;return r}async function wa(t,e){let{data:r,error:a}=await b.from("waist_measurements").update(e).eq("id",t).select().single();if(a)throw a;return r}async function ba(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ka(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Q(t,e){return t*(1+e/30)}function R(t){let e=new Date(t),r=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${r}-${a}-${n}`}function gt(t){let e=new Map;for(let r of t){let a=R(r.performed_at),n=Q(Number(r.weight),Number(r.reps)),o=e.get(a);(!o||n>o.e1rm)&&e.set(a,{date:a,e1rm:n,weight:Number(r.weight),reps:Number(r.reps),setId:r.id})}return Array.from(e.values()).sort((r,a)=>r.date.localeCompare(a.date))}function Pt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let r=new Map;for(let s of e)r.set(s.liftId,s.dailySeries[0].e1rm);let a=new Set;for(let s of e)for(let m of s.dailySeries)a.add(m.date);let n=Array.from(a).sort(),o=[];for(let s of n){let m=0,y=0;for(let h of e){let g=null;for(let v of h.dailySeries)if(v.date<=s)g=v;else break;g&&(m+=g.e1rm/r.get(h.liftId),y+=1)}if(y>0){let h=m/y;o.push({date:s,ratio:h,pct:(h-1)*100})}}return o}function Ut(t,e){if(!e||e.length===0)return!1;let r=Math.max(...e.map(a=>Q(Number(a.weight),Number(a.reps))));return t>r}function yt(t){return t.reduce((e,r)=>e+Number(r.weight)*Number(r.reps),0)}function va(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function Sa(t){let e=new Map;for(let r of t){let a=R(r.performed_at);e.has(a)||e.set(a,[]),e.get(a).push(r)}return Array.from(e.entries()).sort((r,a)=>a[0].localeCompare(r[0]))}function Lt(t){let e=new Map;for(let r of t){let a=R(r.logged_at),n=e.get(a);(!n||new Date(r.created_at||0)>=new Date(n.createdAt||0))&&e.set(a,{date:a,weight:Number(r.weight),entryId:r.id,createdAt:r.created_at})}return Array.from(e.values()).sort((r,a)=>r.date.localeCompare(a.date)).map(({date:r,weight:a,entryId:n})=>({date:r,weight:a,entryId:n}))}function xa(t){if(t.length===0)return null;let e=t[0],r=t[t.length-1];return{start:e.weight,current:r.weight,currentDate:r.date,change:r.weight-e.weight}}function At(t){let e=new Map;for(let r of t){let a=R(r.logged_at),n=e.get(a);(!n||new Date(r.created_at||0)>=new Date(n.createdAt||0))&&e.set(a,{date:a,waist:Number(r.waist_circumference),entryId:r.id,createdAt:r.created_at})}return Array.from(e.values()).sort((r,a)=>r.date.localeCompare(a.date)).map(({date:r,waist:a,entryId:n})=>({date:r,waist:a,entryId:n}))}var $t=null,it=null,lt=null,ct=null,Bt=14,Ht="#e8242c",Ea="rgba(232, 36, 44, 0.18)",Ft="#f2b134",La="rgba(242, 177, 52, 0.16)",dt="#9a9ca6",ut="rgba(255, 255, 255, 0.08)";function Vt(t,e,{onPointClick:r}={}){$t&&($t.destroy(),$t=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return $t=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Composite progress",data:n,borderColor:Ht,backgroundColor:Ea,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),$t}function Ca(t,e,{onPointClick:r}={}){it&&(it.destroy(),it=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return it=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Estimated 1RM",data:n,borderColor:Ft,backgroundColor:La,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),it}function Da(){it&&(it.destroy(),it=null)}function oe(t,e,{onPointClick:r}={}){lt&&(lt.destroy(),lt=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return lt=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Weight",data:n,borderColor:Ht,backgroundColor:Ea,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),lt}function se(){lt&&(lt.destroy(),lt=null)}function _a(t,e,{onPointClick:r}={}){ct&&(ct.destroy(),ct=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return ct=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Waist",data:n,borderColor:Ft,backgroundColor:La,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),ct}function Ta(){ct&&(ct.destroy(),ct=null)}function Rt(t,{onReorder:e,axis:r="y"}={}){let a=null,n=null,o=0,s=0,m=0,y=0,h=0,g=null,v=null,x=null,p=0,E=0,d=null,L=null;function D(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function A(i){let l=i.target.closest(".lt-drag-handle");if(!l)return;let w=l.closest("[data-reorder-item]");if(w){if(i.pointerType!=="touch"){i.preventDefault(),O(w,i.clientX,i.clientY);return}if(l.setPointerCapture)try{l.setPointerCapture(i.pointerId),d=l,L=i.pointerId}catch{}x=w,p=i.clientX,E=i.clientY,document.addEventListener("pointermove",H),document.addEventListener("pointerup",F),v=setTimeout(()=>{clearTimeout(v),v=null;let C=x,_=p,q=E;M(),O(C,_,q)},180)}}function W(){if(d&&L!==null&&d.releasePointerCapture)try{d.releasePointerCapture(L)}catch{}d=null,L=null}function M(){clearTimeout(v),v=null,x=null,document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",F)}function H(i){if(!x)return;let l=i.clientX-p,w=i.clientY-E;Math.hypot(l,w)<=10||(M(),W())}function F(){M(),W()}function O(i,l,w){a=i,o=l,s=w,h=w;let C=i.getBoundingClientRect();y=C.top,m=C.left,n=document.createElement(i.tagName),n.className="lt-reorder-placeholder",n.style.height=`${i.offsetHeight}px`,n.style.width=`${i.offsetWidth}px`,i.after(n),i.classList.add("lt-dragging"),i.style.position="fixed",i.style.left=`${C.left}px`,i.style.width=`${C.width}px`,i.style.top=`${y}px`,i.style.zIndex="1000",document.addEventListener("pointermove",k),document.addEventListener("pointerup",T)}function P(){let i=D().filter(C=>C!==a),l=a.getBoundingClientRect(),w=null;if(r==="x"){let C=l.left+l.width/2,_=l.top+l.height/2;for(let q of i){let I=q.getBoundingClientRect(),B=I.left+I.width/2,V=I.top+I.height/2;if(Math.abs(V-_)<I.height/2?C<B:_<V){w=q;break}}}else{let C=l.top+l.height/2;for(let _ of i){let q=_.getBoundingClientRect(),I=q.top+q.height/2;if(C<I){w=_;break}}}w?t.insertBefore(n,w):t.appendChild(n)}function X(){let i=h,l=window.innerHeight-h;return i<80?-16*(1-i/80):l<80?16*(1-l/80):0}function N(){if(!a){g=null;return}let i=X();if(i===0){g=null;return}window.scrollBy(0,i),P(),g=requestAnimationFrame(N)}function K(){g===null&&X()!==0&&(g=requestAnimationFrame(N))}function f(){g!==null&&(cancelAnimationFrame(g),g=null)}function k(i){if(a){if(i.preventDefault(),h=i.clientY,r==="x"){let l=i.clientX-o,w=i.clientY-s;a.style.left=`${m+l}px`,a.style.top=`${y+w}px`}else{let l=i.clientY-s;a.style.top=`${y+l}px`}P(),r==="y"&&K()}}function T(){if(!a)return;f(),n.replaceWith(a),a.classList.remove("lt-dragging"),a.style.position="",a.style.left="",a.style.width="",a.style.top="",a.style.zIndex="",document.removeEventListener("pointermove",k),document.removeEventListener("pointerup",T),W();let i=D().map(l=>l.dataset.reorderItem);a=null,n=null,e&&e(i)}t.addEventListener("pointerdown",A)}var Er="joshuaegage@gmail.com";function qa(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let r=e.querySelector("[data-feedback-text]");r.focus({preventScroll:!0});let a=!1;function n(){if(a)return;a=!0,document.removeEventListener("keydown",o),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function o(s){s.key==="Escape"&&n()}e.addEventListener("click",s=>{s.target===e&&n()}),document.addEventListener("keydown",o),e.querySelector("[data-feedback-cancel]").addEventListener("click",n),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=r.value.trim(),m=encodeURIComponent("Lift Tracker feedback"),y=encodeURIComponent(s||"(no message entered)");window.location.href=`mailto:${Er}?subject=${m}&body=${y}`,n()})}var Kt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function le(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=e.getDay();return e.setDate(e.getDate()-r),e}function Lr(t,e=new Date){let r=le(e),a=new Date(r);a.setDate(a.getDate()+7);let n=new Set;for(let o of t){let s=new Date(o.performed_at);s>=r&&s<a&&n.add(R(o.performed_at))}return n.size}function Aa(t){let e=null;for(let r of Kt)t>=r.days&&(e=r);return e}function Yt(t,e=new Date){let r=Lr(t,e);return{days:r,tier:Aa(r)}}function ce(t,e=null){let r=new Map;for(let n of t){let s=le(new Date(n.performed_at)).getTime();r.has(s)||r.set(s,new Set),r.get(s).add(R(n.performed_at))}let a={};for(let n of Kt)a[n.key]=0;for(let n of r.values()){let o=Aa(n.size);o&&(a[o.key]+=1)}return Dr(a,e)}var Cr={"19bf3140-6738-496f-ac0c-20e316c4c3c0":{uav:1,harrier:1}};function Dr(t,e){let r=e?Cr[e]:null;if(!r)return t;let a={...t};for(let n of Object.keys(r))a[n]=(a[n]??0)+r[n];return a}function _r(t){let e=new Set;for(let r of t)e.add(R(r.performed_at));return e.size}function Tr(t){let e=new Set;for(let o of t)e.add(le(new Date(o.performed_at)).getTime());let r=Array.from(e).sort((o,s)=>o-s);if(r.length===0)return 0;let a=1,n=1;for(let o=1;o<r.length;o++){let s=new Date(r[o-1]);s.setDate(s.getDate()+7),n=s.getTime()===r[o]?n+1:1,n>a&&(a=n)}return a}function qr(t){let e=new Set;for(let o of t)e.add(R(o.performed_at));let r=Array.from(e).sort().map(o=>{let[s,m,y]=o.split("-").map(Number);return new Date(s,m-1,y)});if(r.length===0)return 0;let a=1,n=1;for(let o=1;o<r.length;o++){let s=new Date(r[o-1]);s.setDate(s.getDate()+1),n=s.getTime()===r[o].getTime()?n+1:1,n>a&&(a=n)}return a}function Ar(t,e=null){return{totalDays:_r(t),tierCounts:ce(t,e),longestStreak:Tr(t),totalSets:t.length,longestDayStreak:qr(t)}}var ie=50,$r=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",isUnlocked:()=>!1},{id:"secret-psl-god",name:"PSL God",track:"secret",description:"Log 300 total sets.",isUnlocked:t=>t.totalSets>=ie&&t.totalSets>=300},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",isUnlocked:t=>t.totalSets>=ie&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Log a set on 14 consecutive days.",isUnlocked:t=>t.totalSets>=ie&&t.longestDayStreak>=14}];function Gt(t,e=null){let r=Ar(t,e);return $r.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(r)}))}function Xt(t,e){let r=new Set(e);return t.filter(a=>a.unlocked&&!r.has(a.id)).map(a=>a.id)}var Ct=null,de=null;function Rr(){return Ct||(Ct=document.createElement("div"),Ct.className="lt-toast",document.body.appendChild(Ct),Ct)}function pt(t,{onUndo:e,onExpire:r,durationMs:a=5e3}={}){let n=Rr();clearTimeout(de),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),s=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(de),s(),e&&e()},{once:!0}),de=setTimeout(()=>{s(),r&&r()},a)}function wt(t,e){try{let r=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return r?decodeURIComponent(r[1])==="true":e}catch{return e}}function ft(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function jt(t,e){try{let r=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return r?decodeURIComponent(r[1]):e}catch{return e}}function zt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var $a="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function Jt(t){try{return window.localStorage.getItem(`${$a}${t}`)==="true"}catch{return!1}}function rt(t){try{window.localStorage.setItem(`${$a}${t}`,"true")}catch{}}var Ra="lt-weight-card-expanded";function Dt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Mr(t){let[,e,r]=t.split("-");return`${Number(e)}/${Number(r)}`}function Ma(t){let[e,r,a]=t.split("-").map(Number);return new Date(e,r-1,a).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ia(t,{onExpand:e,showDiscovery:r=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let a=await Et(),n=Lt(a),o=xa(n),s=r&&a.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let m=o.change<0?"↘":o.change>0?"↗":"→",y=wt(Ra,!1);function h(){t.classList.toggle("lt-stats-row-expanded",y),y?t.innerHTML=`
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
              <span class="lt-weight-stat-label">Current (${Mr(o.currentDate)})</span>
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
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}y=!y,ft(Ra,y),h()}),y?oe(t.querySelector("[data-home-weight-canvas]"),n):se()}h()}async function Wa(t){rt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),r={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},a="weight";e.forEach(i=>{i.addEventListener("click",()=>{i.dataset.tab!==a&&(a=i.dataset.tab,e.forEach(l=>l.setAttribute("aria-selected",String(l===i))),Object.entries(r).forEach(([l,w])=>{w.hidden=l!==a}),a==="weight"?p():K().catch(l=>console.error("[lift-tracker]",l)))})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),m=t.querySelector("[data-weight-chart-section]"),y=t.querySelector("[data-weight-canvas]"),h=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");o.value=R(new Date().toISOString());let v=[];async function x(){v=await Et(),E(),p()}function p(){let i=Lt(v);if(i.length===0){m.hidden=!0,h.hidden=!1,se();return}m.hidden=!1,h.hidden=!0,r.weight.hidden||oe(y,i)}function E(){if(v.length===0){g.innerHTML="";return}let i=v.slice().sort((l,w)=>new Date(w.logged_at)-new Date(l.logged_at));g.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Dt(Number(l.weight))} lb</span>
              <span class="lt-history-e1rm">${Ma(R(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>d(l.dataset.editTrigger))})}function d(i){let l=g.querySelector(`[data-entry-id="${i}"]`),w=v.find(C=>C.id===i);!l||!w||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${w.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${R(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",E),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await ha(i),await x(),pt("Weight entry deleted",{onUndo:async()=>{await ga(i),await x()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let _=Number(l.querySelector("[data-edit-weight]").value),q=l.querySelector("[data-edit-date]").value;if(!(_>=0)||!q)return;let I=new Date(w.logged_at),[B,V,ht]=q.split("-").map(Number);I.setFullYear(B,V-1,ht),await ma(i,{weight:_,logged_at:I.toISOString()}),await x()}))}n.addEventListener("submit",async i=>{i.preventDefault();let l=Number(s.value),w=o.value;if(!(l>=0)||!Number.isFinite(l)||!w)return;let[C,_,q]=w.split("-").map(Number),I=new Date;I.setFullYear(C,_-1,q),await fa(l,I.toISOString()),s.value="",s.focus(),o.value=R(new Date().toISOString()),await x()});let L=t.querySelector("[data-waist-form]"),D=t.querySelector("[data-waist-date-input]"),A=t.querySelector("[data-waist-input]"),W=t.querySelector("[data-waist-chart-section]"),M=t.querySelector("[data-waist-canvas]"),H=t.querySelector("[data-waist-empty]"),F=t.querySelector("[data-waist-history]");D.value=R(new Date().toISOString());let O=[],P=!1,X=null;async function N(){O=await qt(),P=!0,k(),f()}async function K(){if(P){f();return}X||(H.hidden=!1,H.textContent="Loading waist...",W.hidden=!0,X=N().finally(()=>{X=null})),await X}function f(){let i=At(O);if(i.length===0){W.hidden=!0,H.hidden=!1,H.textContent="No waist measurements yet — add your first one above.",Ta();return}W.hidden=!1,H.hidden=!0,r.waist.hidden||_a(M,i)}function k(){if(O.length===0){F.innerHTML="";return}let i=O.slice().sort((l,w)=>new Date(w.logged_at)-new Date(l.logged_at));F.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Dt(Number(l.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Ma(R(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),F.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>T(l.dataset.editTrigger))})}function T(i){let l=F.querySelector(`[data-entry-id="${i}"]`),w=O.find(C=>C.id===i);!l||!w||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${w.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${R(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",k),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ba(i),await N(),pt("Waist measurement deleted",{onUndo:async()=>{await ka(i),await N()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let _=Number(l.querySelector("[data-edit-waist]").value),q=l.querySelector("[data-edit-date]").value;if(!(_>=0)||!q)return;let I=new Date(w.logged_at),[B,V,ht]=q.split("-").map(Number);I.setFullYear(B,V-1,ht),await wa(i,{waist_circumference:_,logged_at:I.toISOString()}),await N()}))}L.addEventListener("submit",async i=>{i.preventDefault();let l=Number(A.value),w=D.value;if(!(l>=0)||!Number.isFinite(l)||!w)return;let[C,_,q]=w.split("-").map(Number),I=new Date;I.setFullYear(C,_-1,q),await ya(l,I.toISOString()),A.value="",A.focus(),D.value=R(new Date().toISOString()),await N()}),await x()}var Na="lt-seen-rank-achievements";function Qt(){let t=jt(Na,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(r=>typeof r=="string"):[]}catch{return[]}}function Oa(t){zt(Na,JSON.stringify(t))}var ue="lt-active-workout";function pe(){try{return window.localStorage.getItem(ue)||null}catch{return null}}function fe(t){try{t?window.localStorage.setItem(ue,t):window.localStorage.removeItem(ue)}catch{}}function Pa(t){let e=pe();return e&&t.find(r=>r.id===e)||null}var Ir=120,Ua="lt-default-rest-seconds",Ha="lt-lift-rest-seconds-",Fa="lt-rest-timer-enabled",tt=null,me=null,he=null,_t=0,nt=null;function Ba(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let r=Number(e);return Number.isFinite(r)&&r>0?r:null}catch{return null}}function Va(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function bt(){return wt(Fa,!1)}function Ka(t){ft(Fa,!!t)}function ye(){return Ba(Ua)||Ir}function Ya(t){Va(Ua,t)}function we(t){return Ba(`${Ha}${t}`)}function Ga(t,e){Va(`${Ha}${t}`,e)}function Zt(t){return we(t)||ye()}function be(){return tt||(tt=document.createElement("div"),tt.className="lt-rest-timer",tt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,tt.querySelector("[data-rest-add]").addEventListener("click",()=>{_t&&(_t+=30*1e3,ge())}),tt.querySelector("[data-rest-skip]").addEventListener("click",Xa),document.body.appendChild(tt),tt)}function Wr(t){let e=Math.max(0,Math.ceil(t/1e3)),r=Math.floor(e/60),a=String(e%60).padStart(2,"0");return`${r}:${a}`}function ge(){let t=be(),e=_t-Date.now();t.querySelector("[data-rest-time]").textContent=Wr(e),e<=0&&Or()}function ke(){clearInterval(me),clearTimeout(he),me=null,he=null}function Nr(){try{Mt(),nt.state==="suspended"&&nt.resume();let t=nt.currentTime,e=nt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(nt.destination),[523.25,659.25].forEach((r,a)=>{let n=nt.createOscillator();n.type="sine",n.frequency.setValueAtTime(r,t+a*.12),n.connect(e),n.start(t+a*.12),n.stop(t+.75)})}catch{}}function Mt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;nt||=new t,nt.state==="suspended"&&nt.resume()}catch{}}function Or(){ke(),_t=0;let t=be();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",Nr(),navigator.vibrate&&navigator.vibrate([120,70,120]),he=setTimeout(Xa,12e3)}function Xa(){ke(),_t=0,tt&&tt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function te({seconds:t,liftName:e=""}={}){let r=Number(t);if(!Number.isFinite(r)||r<=0)return;let a=be();ke(),_t=Date.now()+r*1e3,a.classList.remove("lt-rest-timer-done"),a.classList.add("lt-rest-timer-visible"),a.querySelector(".lt-rest-timer-label").textContent="Rest",a.querySelector("[data-rest-lift]").textContent=e,ge(),me=setInterval(ge,250)}var ja="lt-composite-expanded",ve="lt-header-menu-open";async function za(t){let{data:{session:e}}=await b.auth.getSession(),r=!!e?.user?.is_anonymous;t.innerHTML=`
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-menu" data-header-menu>
        <div class="lt-header-actions" data-header-actions hidden>
          ${r?"":'<button type="button" class="lt-feedback-btn" data-feedback-btn>Feedback</button>'}
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
  `;let a=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,s=null;function m(c=!0){s&&(clearTimeout(s),s=null),n.classList.remove("lt-header-actions-open"),a.setAttribute("aria-expanded","false"),c&&ft(ve,!1),s=setTimeout(()=>{n.hidden=!0,s=null},o)}function y({persist:c=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),n.hidden=!1,u?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),a.setAttribute("aria-expanded","true"),c&&ft(ve,!0)}a.addEventListener("click",()=>{n.hidden?y():m()}),n.addEventListener("click",c=>{c.target.closest("button")&&m()}),wt(ve,!1)&&y({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ye);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>qa()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>b.auth.signOut());let x=t.querySelector("[data-composite-section]"),p=t.querySelector("[data-composite-toggle]"),E=t.querySelector("[data-composite-body]"),d=t.querySelector("[data-chevron]"),L=t.querySelector("[data-composite-summary]"),D=t.querySelector("[data-composite-discovery]");function A(c){p.setAttribute("aria-expanded",String(c)),E.hidden=!c,d.innerHTML=c?"&#9650;":"&#9660;",x.classList.toggle("lt-stats-row-expanded",c)}A(wt(ja,!0)),p.addEventListener("click",()=>{if(rt(J.composite),D.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Xe();return}let c=p.getAttribute("aria-expanded")==="true";A(!c),ft(ja,!c)});let W=t.querySelector("[data-killstreak-icon]"),M=t.querySelector("[data-killstreak-label]"),H=t.querySelector("[data-killstreak-sub]"),F=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",ze);function O(c){let{days:u,tier:S}=Yt(c);W.textContent=S?S.icon:"🎯",M.textContent=S?`${S.label} Killstreak`:"No Killstreak",H.textContent=`${u} Day streak`;let G=Gt(c).filter(j=>j.track==="rank"),$=Xt(G,Qt()).length>0;F.hidden=!$}let P=t.querySelector("[data-weight-card]");function X(){rt(J.weight),Ge()}function N(c){Ia(P,{onExpand:X,...c}).catch(u=>{console.error("[lift-tracker]",u),P.classList.remove("lt-stats-row-expanded"),P.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,P.querySelector("[data-weight-expand]").addEventListener("click",X)})}let K=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{rt(J.history),K.hidden=!0,je()});let f=t.querySelector("[data-add-lift-form]"),k=t.querySelector("[data-add-lift-toggle]"),T=t.querySelector("[data-add-lift-discovery]"),i=t.querySelector("[data-add-lift-hint]"),l=t.querySelector("[data-create-workout-btn]"),w=t.querySelector("[data-create-workout-discovery]");k.addEventListener("click",()=>{let c=f.hidden;f.hidden=!c,k.setAttribute("aria-pressed",String(c)),k.classList.toggle("lt-add-lift-toggle-active",c),c&&f.querySelector('input[name="name"]').focus()});let C=t.querySelector("[data-lift-list]"),_=t.querySelector("[data-list-empty]");l.addEventListener("click",()=>{l.disabled||Ve()});let q=t.querySelector("[data-workout-pills]"),I=t.querySelector("[data-workout-empty-hint]"),B=[],V=pe();function ht(){return V&&B.find(c=>c.id===V)||null}function _e(){let c=ht();if(!c)return Y;let u=new Set(c.liftIds);return Y.filter(S=>u.has(S.id))}function Te(){q.innerHTML=B.map(c=>{let u=c.id===V;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${c.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${c.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${c.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let c of B){let u=q.querySelector(`[data-workout-pill="${c.id}"] [data-workout-pill-name]`);u&&(u.textContent=c.name)}q.querySelectorAll("[data-workout-pill]").forEach(c=>{c.addEventListener("click",()=>{let u=c.dataset.workoutPill;V=V===u?null:u,fe(V),Te(),re(Tt),Re(Tt)})}),q.querySelectorAll("[data-workout-edit]").forEach(c=>{c.addEventListener("click",u=>{u.stopPropagation(),Ke(c.dataset.workoutEdit)})})}let ee="lt-fast-mode",qe="lt-burst-mode";function hr(){try{let c=window.localStorage.getItem(ee);if(c!==null)return c==="true";let u=window.localStorage.getItem(qe);return u!==null?(window.localStorage.setItem(ee,u),window.localStorage.removeItem(qe),u==="true"):!1}catch{return!1}}function gr(c){try{window.localStorage.setItem(ee,String(c))}catch{}}let Y=[],ot=hr(),st=new Map,Tt=[],It=t.querySelector("[data-mode-toggle]");function Ae(){It.textContent=ot?"Normal":"Fast",It.setAttribute("aria-pressed",String(ot)),It.classList.toggle("lt-mode-toggle-active",ot)}Ae(),It.addEventListener("click",()=>{ot=!ot,gr(ot),Ae(),re(Tt)}),f.addEventListener("submit",async c=>{c.preventDefault();let u=f.querySelector('input[name="name"]'),S=u.value.trim();if(S){u.value="",u.disabled=!0;try{await St(S,Y.length),await $e()}finally{u.disabled=!1,u.focus()}}}),Rt(C,{onReorder:async c=>{let u=[...c],S=new Set(c),G=Y.map($=>S.has($.id)?u.shift():$.id);await ta(G),Y=G.map($=>Y.find(j=>j.id===$)).filter(Boolean)}}),Rt(q,{axis:"x",onReorder:async c=>{await la(c),B=c.map(u=>B.find(S=>S.id===u)).filter(Boolean)}});async function $e(){B=await xt(),V&&!B.some($=>$.id===V)&&(V=null,fe(null)),Te(),Y=await z();let c=Y.length>=2;if(T.hidden=Y.length>=2,i.hidden=Y.length!==1,l.disabled=!c,l.setAttribute("aria-disabled",String(!c)),w.hidden=!c||B.length>0,I.hidden=!c||B.length>0,Y.length===0){C.innerHTML="",_.hidden=!1,_.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",i.hidden=!0,x.hidden=!0,O([]),N({showDiscovery:!1}),K.hidden=!0,D.hidden=!0,st=new Map,Tt=[];return}let u=await et(Y.map($=>$.id)),S=u.length>0;O(u),N({showDiscovery:S&&!Jt(J.weight)}),K.hidden=!S||Jt(J.history),st=new Map(Y.map($=>[$.id,[]]));for(let $ of u){let j=st.get($.lift_id);j&&j.push($)}let G=Y.map($=>({liftId:$.id,dailySeries:gt(st.get($.id)||[])}));re(G),Re(G)}function Re(c){let u=ht(),S=u?c.filter(Wt=>u.liftIds.includes(Wt.liftId)):c,G=Pt(S);x.hidden=!1;let $=t.querySelector("[data-composite-canvas]"),j=t.querySelector("[data-composite-empty]"),kt=t.querySelector("[data-composite-scope]"),vt=t.querySelector("[data-composite-blurb]");if(kt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",vt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",j.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",G.length===0){$.hidden=!0,j.hidden=!1,L.textContent="",D.hidden=!0;return}$.hidden=!1,j.hidden=!0,L.textContent=va(G[G.length-1].pct),D.hidden=Jt(J.composite),Vt($,G)}function ae(c){let u=gt(st.get(c)||[]),S=u[u.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function yr(c){let u=st.get(c)||[];return u.length===0?"":u[u.length-1].weight}function re(c){Tt=c;let u=_e();_.hidden=u.length>0,_.textContent=V?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",C.innerHTML=u.map(S=>ot?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${S.id}" data-lift-id="${S.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${S.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${ae(S.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Me(S.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${S.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${yr(S.id)}" data-fast-weight />
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
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Me(S.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let S of Y){let $=C.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");$&&($.textContent=S.name)}C.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Be(S.dataset.openLift))}),ot&&wr()}function wr(){C.querySelectorAll("[data-fast-log-form]").forEach(c=>{let u=c.dataset.fastLogForm;c.addEventListener("submit",async S=>{S.preventDefault();let G=c.querySelector("[data-fast-weight]"),$=c.querySelector("[data-fast-reps]"),j=c.querySelector("[data-fast-feedback]"),kt=Number(G.value),vt=Number($.value);if(!(kt>=0)||!Number.isFinite(kt)||!(vt>0)||!Number.isInteger(vt))return;let Wt=st.get(u)||[],br=Q(kt,vt),Ie=Ut(br,Wt),We=new Date().toISOString();bt()&&Mt();let kr=await at(u,kt,vt,We),vr=Y.find(ne=>ne.id===u);bt()&&te({seconds:Zt(u),liftName:vr?.name||""});let Ne=[...Wt,kr];st.set(u,Ne),$.value="",$.focus();let Oe=C.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");Oe&&(Oe.textContent=ae(u));let Sr=R(We),Pe=yt(Ne.filter(ne=>R(ne.performed_at)===Sr));j.hidden=!1,j.classList.toggle("lt-pr",Ie),j.textContent=Ie?`PR! ${Math.round(Pe)} lb today`:`Logged · ${Math.round(Pe)} lb today`})})}function Me(c){return String(c).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await $e()}async function Ja(t,e){let r=await Qe(e);if(!r||r.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let a=t.querySelector("[data-name-input]");a.value=r.name;let n=r.name;a.addEventListener("keydown",f=>{f.key==="Enter"&&a.blur()}),a.addEventListener("blur",async()=>{let f=a.value.trim();if(!f||f===n){a.value=n;return}n=f,await Ze(e,f)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await ea(e),U(),pt(`Deleted "${n}"`,{onUndo:async()=>{await aa(e),Nt()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(f=>{f.addEventListener("click",()=>{o.forEach(k=>k.setAttribute("aria-selected",String(k===f))),Object.entries(s).forEach(([k,T])=>{T.hidden=k!==f.dataset.tab}),f.dataset.tab==="details"&&K()})});let m=t.querySelector("[data-log-form]"),y=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),v=t.querySelector("[data-default-rest-input]"),x=t.querySelector("[data-lift-rest-input]"),p=t.querySelector("[data-rest-enabled-input]"),E=t.querySelector("[data-rest-enabled-label]"),d=t.querySelector("[data-default-rest-field]"),L=t.querySelector("[data-lift-rest-field]"),D=[];function A(){v.value=ye(),x.value=we(e)||"";let f=bt();p.checked=f,E.textContent=f?"Rest timer: On":"Rest timer: Off",v.disabled=!f,x.disabled=!f,d.classList.toggle("lt-rest-setting-field-disabled",!f),L.classList.toggle("lt-rest-setting-field-disabled",!f)}function W(f){let k=Number(f.value);return f.value===""?null:!Number.isFinite(k)||k<15?15:k>600?600:Math.round(k)}v.addEventListener("change",()=>{let f=W(v)||120;Ya(f),A()}),x.addEventListener("change",()=>{let f=W(x);Ga(e,f),A()}),p.addEventListener("change",()=>{Ka(p.checked),A()});async function M(){D=await ra(e)}function H(){if(D.length===0)return;let f=D[D.length-1];y.value=f.weight}m.addEventListener("submit",async f=>{f.preventDefault();let k=Number(y.value),T=Number(h.value);if(!(k>=0)||!Number.isFinite(k)||!(T>0)||!Number.isInteger(T))return;let i=Q(k,T),w=Ut(i,D),C=new Date;bt()&&Mt(),await at(e,k,T,C.toISOString()),bt()&&te({seconds:Zt(e),liftName:n}),h.value="",h.focus(),await M(),P(),s.details.hidden||K();let _=R(C.toISOString()),q=yt(D.filter(I=>R(I.performed_at)===_));g.hidden=!1,g.classList.toggle("lt-pr",w),g.textContent=w?`New PR! Today's volume: ${Math.round(q)} lb`:`Logged. Today's volume: ${Math.round(q)} lb`});function F(f){let k=new Map;for(let T of f){let i=R(T.performed_at);k.has(i)||k.set(i,[]),k.get(i).push(T)}return Array.from(k.entries()).sort((T,i)=>i[0].localeCompare(T[0]))}function O(f){let[k,T,i]=f.split("-").map(Number);return new Date(k,T-1,i).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function P(){let f=s.history;if(D.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let k=F(D);f.innerHTML=k.map(([T,i])=>{let l=yt(i),C=i.slice().sort((_,q)=>new Date(q.performed_at)-new Date(_.performed_at)).map(_=>{let q=Math.round(Q(Number(_.weight),Number(_.reps)));return`
              <li class="lt-history-row" data-set-id="${_.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${_.id}">
                  <span class="lt-history-weight">${_.weight} lb &times; ${_.reps}</span>
                  <span class="lt-history-e1rm">${q} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${O(T)}</span>
              <span class="lt-history-volume">${Math.round(l)} lb volume</span>
            </div>
            <ul class="lt-history-list">${C}</ul>
          </div>
        `}).join(""),f.querySelectorAll("[data-edit-trigger]").forEach(T=>{T.addEventListener("click",()=>N(T.dataset.editTrigger))})}function X(f){return s.history.querySelector(`[data-set-id="${f}"]`)}function N(f){let k=X(f),T=D.find(i=>i.id===f);!k||!T||(k.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${T.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${T.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${R(T.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,k.querySelector("[data-edit-cancel]").addEventListener("click",P),k.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await sa(f),await M(),P(),s.details.hidden||K(),pt("Set deleted",{onUndo:async()=>{await ia(f),await M(),P(),s.details.hidden||K()}})}),k.querySelector("[data-edit-form]").addEventListener("submit",async i=>{i.preventDefault();let l=Number(k.querySelector("[data-edit-weight]").value),w=Number(k.querySelector("[data-edit-reps]").value),C=k.querySelector("[data-edit-date]").value;if(!(l>=0)||!(w>0)||!C)return;let _=new Date(T.performed_at),[q,I,B]=C.split("-").map(Number);_.setFullYear(q,I-1,B),await oa(f,{weight:l,reps:w,performed_at:_.toISOString()}),await M(),P(),s.details.hidden||K()}))}function K(){let f=s.details,k=gt(D);if(k.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Da();return}f.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let T=f.querySelector("[data-lift-canvas]"),i=f.querySelector("[data-point-detail]");Ca(T,k,{onPointClick:l=>{i.hidden=!1,i.textContent=`${O(l.date)}: ${l.weight} lb × ${l.reps} (${Math.round(l.e1rm)} e1RM)`}})}await M(),A(),H(),P()}var Qa=60;function Za(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Qa),e}function mt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Se(t,e,r=new Date,a=`last ${Qa} days`,n=[],o=[]){let s=R(r.toISOString()),m=[`Lift Tracker — ${a} (as of ${s})`,""],y=t.filter(h=>(e.get(h.id)||[]).length>0);if(y.length===0)m.push("No sets logged in this period."),m.push("");else{for(let g of y){let v=(e.get(g.id)||[]).slice().sort((E,d)=>new Date(E.performed_at)-new Date(d.performed_at)),x=yt(v),p=Math.max(...v.map(E=>Q(Number(E.weight),Number(E.reps))));m.push(g.name);for(let E of v){let d=Math.round(Q(Number(E.weight),Number(E.reps)));m.push(`  ${R(E.performed_at)}: ${E.weight} lb x ${E.reps} (e1RM ${d})`)}m.push(`  Sets: ${v.length} | Volume: ${Math.round(x)} lb | Best e1RM: ${Math.round(p)}`),m.push("")}let h=t.length-y.length;h>0&&(m.push(`(${h} lift${h===1?"":"s"} with no sets in this period omitted)`),m.push(""))}if(n.length>0){m.push("Body weight");for(let p of n)m.push(`  ${p.date}: ${mt(p.weight)} lb`);let h=n[0].weight,g=n[n.length-1].weight,v=g-h,x=v>0?"+":"";m.push(`  Start: ${mt(h)} lb | Current: ${mt(g)} lb | Change: ${x}${mt(v)} lb`),m.push("")}if(o.length>0){m.push("Waist");for(let p of o)m.push(`  ${p.date}: ${mt(p.waist)} in`);let h=o[0].waist,g=o[o.length-1].waist,v=g-h,x=v>0?"+":"";m.push(`  Start: ${mt(h)} in | Current: ${mt(g)} in | Change: ${x}${mt(v)} in`),m.push("")}return m.join(`
`).trimEnd()}var Pr=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Ur=`
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
`;async function tr(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Pr.map(p=>`
          <section class="lt-help-section">
            <h2>${p.title}</h2>
            <p>${p.body}</p>
          </section>
          ${p.title==="Export progress"?Ur:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),r=t.querySelector("[data-export-body]"),a=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let E=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(E)),r.hidden=!E,a.innerHTML=E?"&#9650;":"&#9660;",!!E){e.disabled=!0;try{let d=await z(),L=d.map(N=>N.id),D=Za().toISOString(),A=await na(L,D),W=new Map(d.map(N=>[N.id,[]]));for(let N of A){let K=W.get(N.lift_id);K&&K.push(N)}let H=(await Et()).filter(N=>new Date(N.logged_at)>=new Date(D)),F=Lt(H),P=(await qt()).filter(N=>new Date(N.logged_at)>=new Date(D)),X=At(P);n.value=Se(d,W,new Date,void 0,F,X),s.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}s.hidden=!1,s.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let m=t.querySelector("[data-full-export-toggle]"),y=t.querySelector("[data-full-export-body]"),h=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),v=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");m.addEventListener("click",async()=>{let E=!(m.getAttribute("aria-expanded")==="true");if(m.setAttribute("aria-expanded",String(E)),y.hidden=!E,h.innerHTML=E?"&#9650;":"&#9660;",!!E){m.disabled=!0;try{let d=await z(),L=d.map(O=>O.id),D=await et(L),A=new Map(d.map(O=>[O.id,[]]));for(let O of D){let P=A.get(O.lift_id);P&&P.push(O)}let W=await Et(),M=Lt(W),H=await qt(),F=At(H);g.value=Se(d,A,new Date,"all-time",M,F),x.hidden=!0}finally{m.disabled=!1}}}),v.addEventListener("click",async()=>{g.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}x.hidden=!1,x.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function er(t){rt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let[e,r]=await Promise.all([z(),xt()]),a=Pa(r),n=a?e.filter(p=>a.liftIds.includes(p.id)):e,o=n.length?await et(n.map(p=>p.id)):[],s=new Map(n.map(p=>[p.id,[]]));for(let p of o){let E=s.get(p.lift_id);E&&E.push(p)}let m=n.map(p=>({liftId:p.id,dailySeries:gt(s.get(p.id)||[])})),y=Pt(m),h=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),v=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(v.textContent=a?`Measuring ${a.name}`:"Measuring all lifts",x.textContent=a?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=a?`Log a few sets for lifts in ${a.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",y.length===0){h.hidden=!0,g.hidden=!1;return}h.hidden=!1,g.hidden=!0,Vt(h,y)}function Hr(t){let[e,r,a]=t.split("-").map(Number);return new Date(e,r-1,a).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Fr(){let t=await z(),e=new Map(t.map(a=>[a.id,a.name]));return(await et(t.map(a=>a.id))).map(a=>({...a,liftName:e.get(a.lift_id)||"Unknown lift"}))}function Br(t,e){let r=new Map;for(let o of e)r.has(o.liftName)||r.set(o.liftName,[]),r.get(o.liftName).push(o);let a=Array.from(r.entries()).map(([o,s])=>{let y=s.slice().sort((h,g)=>new Date(h.performed_at)-new Date(g.performed_at)).map(h=>{let g=Math.round(Q(Number(h.weight),Number(h.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${h.weight} lb &times; ${h.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${o}</div>
          <ul class="lt-history-list">${y}</ul>
        </div>
      `}).join(""),n=r.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Hr(t)}</span>
        <span class="lt-history-volume">${n} lift${n===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${a}
    </div>
  `}async function ar(t){rt(J.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),r=await Fr();if(r.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let a=Sa(r);e.innerHTML=a.map(([n,o])=>Br(n,o)).join("")}var rr="lt-theme",xe="default";function Ee(){return jt(rr,xe)}function nr(t){!t||t===xe?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function or(t){nr(t),zt(rr,t||xe)}function sr(){nr(Ee())}var Vr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},Kr=["rank","mastery","streak","capstone","secret"],Yr="Hidden until unlocked.";async function ir(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await z(),r=e.length?await et(e.map(d=>d.id)):[],a=await Je(),{days:n,tier:o}=Yt(r);t.querySelector("[data-killstreak-current-icon]").textContent=o?o.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=o?`${o.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let s=ce(r,a),m=t.querySelector("[data-killstreak-tier-list]");m.innerHTML=Kt.map(d=>{let L=s[d.key];return`
      <li class="lt-killstreak-tier-row${o?.key===d.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${d.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${d.label}</span>
          <span class="lt-killstreak-tier-req">${d.days}+ day${d.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${L} earned</span>
      </li>
    `}).join("");let y=Gt(r,a),h=y.filter(d=>d.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${h} / ${y.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let g=y.filter(d=>d.track==="rank"),v=new Set(Xt(g,Qt()));Oa(g.filter(d=>d.unlocked).map(d=>d.id));let x=t.querySelector("[data-achievements]");function p(d){if(d.track!=="rank"){let M=d.track==="secret"&&!d.unlocked,H=M?" lt-achievement-card-desc-hidden":"",F=M?Yr:d.description;return`
        <li class="lt-achievement-card${d.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${d.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${d.name}</span>
            <span class="lt-achievement-card-desc${H}">${F}</span>
          </span>
        </li>
      `}let L=d.unlocked&&Ee()===d.theme.id,D=d.unlocked&&v.has(d.id),A=d.unlocked?`<span class="lt-achievement-card-theme">${d.theme.label} theme${L?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${d.theme.label}</span>`,W=D?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${d.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${D?" lt-achievement-card-new":""}${L?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${d.theme.id}"${d.unlocked?"":" disabled"} aria-label="${d.unlocked?`Apply the ${d.theme.label} theme`:`Locked: ${d.name}`}">
          <span class="lt-achievement-card-icon">${d.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${d.name}</span>
            <span class="lt-achievement-card-desc">${d.description}</span>
            ${A}
            ${W}
          </span>
        </button>
      </li>
    `}function E(){x.innerHTML=Kr.map(d=>{let D=y.filter(A=>A.track===d).sort((A,W)=>Number(W.unlocked)-Number(A.unlocked)).map(p).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Vr[d]}</h3>
          ${d==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${D}</ul>
        </section>
      `}).join("")}E(),x.addEventListener("click",d=>{let L=d.target.closest("[data-apply-theme]");!L||L.disabled||(or(L.dataset.applyTheme),E())})}var lr="__divider__";async function Le(t,{mode:e,workoutId:r}={}){let a=e==="edit",[n,o]=await Promise.all([z(),a?ca(r):Promise.resolve(null)]);if(a&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(a?o.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${a?cr(o.name):""}"
      />
      ${a?'<button type="button" class="lt-detail-delete" data-delete-workout aria-label="Delete workout">&times;</button>':""}
    </header>

    <p class="lt-workout-instructions">
      Drag the lifts you want in this workout above the yellow line, then save.
    </p>

    <ul class="lt-lift-list lt-workout-lift-list" data-workout-lift-list></ul>
    <p class="lt-empty" data-workout-lifts-empty hidden>Add a lift on the homepage first.</p>

    <button type="button" class="lt-save-workout-btn" data-save-workout>Save workout</button>
    <p class="lt-workout-save-feedback" data-workout-save-feedback hidden></p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let m=t.querySelector("[data-workout-name-input]"),y=t.querySelector("[data-workout-lift-list]"),h=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),v=t.querySelector("[data-workout-save-feedback]");h.hidden=n.length>0;let x=n.filter(L=>s.has(L.id)),p=n.filter(L=>!s.has(L.id));y.innerHTML=[...x.map(E),d(),...p.map(E)].join("");for(let L of n){let A=y.querySelector(`[data-lift-id="${L.id}"]`)?.querySelector("[data-name-slot]");A&&(A.textContent=L.name)}Rt(y,{onReorder:()=>{}}),a&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await ua(r),U(),pt(`Deleted "${o.name}"`,{onUndo:async()=>{await pa(r),Nt()}}))}),g.addEventListener("click",async()=>{let L=m.value.trim();if(!L){m.focus();return}let D=Array.from(y.querySelectorAll("[data-reorder-item]")),A=D.findIndex(M=>M.dataset.reorderItem===lr),W=D.slice(0,A).map(M=>M.dataset.reorderItem);g.disabled=!0,v.hidden=!0;try{if(a)await da(r,L,W);else{let M=await xt();await Ot(L,W,M.length)}U()}catch(M){console.error("[lift-tracker]",M),v.hidden=!1,v.textContent="Something went wrong saving the workout.",g.disabled=!1}});function E(L){return`
      <li class="lt-lift-row" data-reorder-item="${L.id}" data-lift-id="${L.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${cr(L.name)}">&#8942;&#8942;</button>
      </li>
    `}function d(){return`
      <li class="lt-workout-divider" data-reorder-item="${lr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function cr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Gr=`${window.location.origin}${window.location.pathname}`;function Xr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Ce(t){let e="signin";function r(n,o,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Xr(s||"")}">

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
    `}function a(n,o,s){t.innerHTML=r(n,o,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",a()});let m=t.querySelector("[data-auth-form]");m.addEventListener("submit",async y=>{y.preventDefault();let h=m.email.value.trim(),g=m.password.value,v=m.querySelector('button[type="submit"]');v.disabled=!0,v.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:p}=e==="signup"?await b.auth.signUp({email:h,password:g,options:{emailRedirectTo:Gr}}):await b.auth.signInWithPassword({email:h,password:g});if(p)throw p;if(e==="signup"&&!x.session){e="signin",a(null,`Account created. Check ${h} for a confirmation link, then sign in here.`,h);return}}catch(x){a(x.message||"Something went wrong. Try again.",null,h)}})}a()}function dr(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function ur(){let{data:t,error:e}=await b.auth.signInAnonymously();if(e)throw e;return await jr(),t}async function jr(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,r,a]=await Promise.all([St("Bench Press",0),St("Squat",1),St("Deadlift",2)]);await Promise.all([at(e.id,135,8,t(6)),at(e.id,145,6,t(2)),at(r.id,185,5,t(5)),at(r.id,195,5,t(1)),at(a.id,225,5,t(3))]),await Ot("Full Body",[e.id,r.id,a.id],0)}var Z=document.getElementById("lift-tracker-app");sr();var pr=0;async function De(){let t=++pr,e=()=>t!==pr;try{let{data:{session:r}}=await b.auth.getSession();if(e())return;if(!r)if(dr())try{if(await ur(),e())return}catch(n){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",n),await Ce(Z);return}else return await Ce(Z),e(),void 0;let a=Fe();if(a.name==="detail"?await Ja(Z,a.liftId):a.name==="help"?await tr(Z):a.name==="weight"?await Wa(Z):a.name==="composite"?await er(Z):a.name==="history"?await ar(Z):a.name==="killstreak"?await ir(Z):a.name==="workout-new"?await Le(Z,{mode:"create"}):a.name==="workout-edit"?await Le(Z,{mode:"edit",workoutId:a.workoutId}):await za(Z),e())return;window.scrollTo(0,0)}catch(r){if(e())return;console.error("[lift-tracker]",r),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",De);var fr=null,mr=!1;b.auth.onAuthStateChange((t,e)=>{let r=e?.user?.id??null,a=!mr;mr=!0;let n=r!==fr;fr=r,!(a||!n)&&(U(),De())});De();

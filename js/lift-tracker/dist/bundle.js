import{createClient as Er}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Ue="https://mqfsgammpsumpltfutwl.supabase.co",Oe="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var y=Er(Ue,Oe);function He(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function F(){window.location.hash="#/"}function Fe(t){window.location.hash=`#/lift/${t}`}function Be(){window.location.hash="#/workout/new"}function Ve(t){window.location.hash=`#/workout/${t}/edit`}function Ke(){window.location.hash="#/help"}function Ye(){window.location.hash="#/weight"}function Ge(){window.location.hash="#/composite"}function Xe(){window.location.hash="#/history"}function je(){window.location.hash="#/killstreak"}function Pt(){window.dispatchEvent(new Event("hashchange"))}async function ze(){let{data:t,error:e}=await y.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Je(){let{error:t}=await y.from("feedback_submissions").insert({});if(t)throw t}async function Qe(){let{count:t,error:e}=await y.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function z(){let{data:t,error:e}=await y.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Ze(t){let{data:e,error:r}=await y.from("lifts").select("*").eq("id",t).maybeSingle();if(r)throw r;return e}async function Et(t,e){let{data:r,error:a}=await y.from("lifts").insert({name:t,sort_order:e}).select().single();if(a)throw a;return r}async function ta(t,e){let{data:r,error:a}=await y.from("lifts").update({name:e}).eq("id",t).select().single();if(a)throw a;return r}async function ea(t){let e=t.map((n,o)=>y.from("lifts").update({sort_order:o}).eq("id",n)),a=(await Promise.all(e)).find(n=>n.error);if(a)throw a.error}async function aa(t){let{error:e}=await y.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ra(t){let{error:e}=await y.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function na(t){let{data:e,error:r}=await y.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(r)throw r;return e}async function et(t){if(!t||t.length===0)return[];let{data:e,error:r}=await y.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(r)throw r;return e}async function oa(t,e){if(!t||t.length===0)return[];let{data:r,error:a}=await y.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(a)throw a;return r}async function at(t,e,r,a){let{data:n,error:o}=await y.from("sets").insert({lift_id:t,weight:e,reps:r,performed_at:a||new Date().toISOString()}).select().single();if(o)throw o;return n}async function sa(t,e){let{data:r,error:a}=await y.from("sets").update(e).eq("id",t).select().single();if(a)throw a;return r}async function ia(t){let{error:e}=await y.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function la(t){let{error:e}=await y.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Lt(){let{data:t,error:e}=await y.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(r=>({...r,liftIds:(r.workout_lifts||[]).map(a=>a.lift_id)}))}async function ca(t){let e=t.map((n,o)=>y.from("workouts").update({sort_order:o}).eq("id",n)),a=(await Promise.all(e)).find(n=>n.error);if(a)throw a.error}async function da(t){let{data:e,error:r}=await y.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(r)throw r;return e?{...e,liftIds:(e.workout_lifts||[]).map(a=>a.lift_id)}:null}async function Ut(t,e,r){let{data:a,error:n}=await y.from("workouts").insert({name:t,sort_order:r}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await y.from("workout_lifts").insert(e.map(s=>({workout_id:a.id,lift_id:s})));if(o)throw o}return a}async function ua(t,e,r){let{error:a}=await y.from("workouts").update({name:e}).eq("id",t);if(a)throw a;let{error:n}=await y.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(r.length>0){let{error:o}=await y.from("workout_lifts").insert(r.map(s=>({workout_id:t,lift_id:s})));if(o)throw o}}async function pa(t){let{error:e}=await y.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function fa(t){let{error:e}=await y.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function lt(){let{data:t,error:e}=await y.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ma(t,e){let{data:r,error:a}=await y.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(a)throw a;return r}async function ha(t,e){let{data:r,error:a}=await y.from("body_weight").update(e).eq("id",t).select().single();if(a)throw a;return r}async function ga(t){let{error:e}=await y.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ya(t){let{error:e}=await y.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function At(){let{data:t,error:e}=await y.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function wa(t,e){let{data:r,error:a}=await y.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(a)throw a;return r}async function ba(t,e){let{data:r,error:a}=await y.from("waist_measurements").update(e).eq("id",t).select().single();if(a)throw a;return r}async function ka(t){let{error:e}=await y.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function va(t){let{error:e}=await y.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Q(t,e){return t*(1+e/30)}function $(t){let e=new Date(t),r=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${r}-${a}-${n}`}function nt(t){let e=new Map;for(let r of t){let a=$(r.performed_at),n=Q(Number(r.weight),Number(r.reps)),o=e.get(a);(!o||n>o.e1rm)&&e.set(a,{date:a,e1rm:n,weight:Number(r.weight),reps:Number(r.reps),setId:r.id})}return Array.from(e.values()).sort((r,a)=>r.date.localeCompare(a.date))}function Ct(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let r=new Map;for(let s of e)r.set(s.liftId,s.dailySeries[0].e1rm);let a=new Set;for(let s of e)for(let p of s.dailySeries)a.add(p.date);let n=Array.from(a).sort(),o=[];for(let s of n){let p=0,b=0;for(let g of e){let h=null;for(let v of g.dailySeries)if(v.date<=s)h=v;else break;h&&(p+=h.e1rm/r.get(g.liftId),b+=1)}if(b>0){let g=p/b;o.push({date:s,ratio:g,pct:(g-1)*100})}}return o}function Ot(t,e){if(!e||e.length===0)return!1;let r=Math.max(...e.map(a=>Q(Number(a.weight),Number(a.reps))));return t>r}function bt(t){return t.reduce((e,r)=>e+Number(r.weight)*Number(r.reps),0)}function Sa(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function xa(t){let e=new Map;for(let r of t){let a=$(r.performed_at);e.has(a)||e.set(a,[]),e.get(a).push(r)}return Array.from(e.entries()).sort((r,a)=>a[0].localeCompare(r[0]))}function ct(t){let e=new Map;for(let r of t){let a=$(r.logged_at),n=e.get(a);(!n||new Date(r.created_at||0)>=new Date(n.createdAt||0))&&e.set(a,{date:a,weight:Number(r.weight),entryId:r.id,createdAt:r.created_at})}return Array.from(e.values()).sort((r,a)=>r.date.localeCompare(a.date)).map(({date:r,weight:a,entryId:n})=>({date:r,weight:a,entryId:n}))}function Ea(t){if(t.length===0)return null;let e=t[0],r=t[t.length-1];return{start:e.weight,current:r.weight,currentDate:r.date,change:r.weight-e.weight}}function Rt(t){let e=new Map;for(let r of t){let a=$(r.logged_at),n=e.get(a);(!n||new Date(r.created_at||0)>=new Date(n.createdAt||0))&&e.set(a,{date:a,waist:Number(r.waist_circumference),entryId:r.id,createdAt:r.created_at})}return Array.from(e.values()).sort((r,a)=>r.date.localeCompare(a.date)).map(({date:r,waist:a,entryId:n})=>({date:r,waist:a,entryId:n}))}var $t=null,dt=null,ut=null,pt=null,Bt=14,Ht="#e8242c",La="rgba(232, 36, 44, 0.18)",Ft="#f2b134",Ca="rgba(242, 177, 52, 0.16)",ft="#9a9ca6",mt="rgba(255, 255, 255, 0.08)";function Vt(t,e,{onPointClick:r}={}){$t&&($t.destroy(),$t=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return $t=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Composite progress",data:n,borderColor:Ht,backgroundColor:La,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ft},grid:{color:mt}},y:{ticks:{color:ft,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:mt}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),$t}function Da(t,e,{onPointClick:r}={}){dt&&(dt.destroy(),dt=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return dt=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Estimated 1RM",data:n,borderColor:Ft,backgroundColor:Ca,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ft},grid:{color:mt}},y:{ticks:{color:ft},grid:{color:mt}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),dt}function _a(){dt&&(dt.destroy(),dt=null)}function oe(t,e,{onPointClick:r}={}){ut&&(ut.destroy(),ut=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return ut=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Weight",data:n,borderColor:Ht,backgroundColor:La,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ft},grid:{color:mt}},y:{ticks:{color:ft},grid:{color:mt}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),ut}function se(){ut&&(ut.destroy(),ut=null)}function Ta(t,e,{onPointClick:r}={}){pt&&(pt.destroy(),pt=null);let a=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return pt=new Chart(t,{type:"line",data:{labels:a,datasets:[{label:"Waist",data:n,borderColor:Ft,backgroundColor:Ca,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ft},grid:{color:mt}},y:{ticks:{color:ft},grid:{color:mt}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&r&&r(e[s[0].index])}}}),pt}function qa(){pt&&(pt.destroy(),pt=null)}function Mt(t,{onReorder:e,axis:r="y"}={}){let a=null,n=null,o=0,s=0,p=0,b=0,g=0,h=null,v=null,x=null,f=0,E=0,M=null,D=null;function c(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function _(i){let l=i.target.closest(".lt-drag-handle");if(!l)return;let w=l.closest("[data-reorder-item]");if(w){if(i.pointerType!=="touch"){i.preventDefault(),N(w,i.clientX,i.clientY);return}if(l.setPointerCapture)try{l.setPointerCapture(i.pointerId),M=l,D=i.pointerId}catch{}x=w,f=i.clientX,E=i.clientY,document.addEventListener("pointermove",O),document.addEventListener("pointerup",H),v=setTimeout(()=>{clearTimeout(v),v=null;let L=x,C=f,q=E;A(),N(L,C,q)},180)}}function W(){if(M&&D!==null&&M.releasePointerCapture)try{M.releasePointerCapture(D)}catch{}M=null,D=null}function A(){clearTimeout(v),v=null,x=null,document.removeEventListener("pointermove",O),document.removeEventListener("pointerup",H)}function O(i){if(!x)return;let l=i.clientX-f,w=i.clientY-E;Math.hypot(l,w)<=10||(A(),W())}function H(){A(),W()}function N(i,l,w){a=i,o=l,s=w,g=w;let L=i.getBoundingClientRect();b=L.top,p=L.left,n=document.createElement(i.tagName),n.className="lt-reorder-placeholder",n.style.height=`${i.offsetHeight}px`,n.style.width=`${i.offsetWidth}px`,i.after(n),i.classList.add("lt-dragging"),i.style.position="fixed",i.style.left=`${L.left}px`,i.style.width=`${L.width}px`,i.style.top=`${b}px`,i.style.zIndex="1000",document.addEventListener("pointermove",k),document.addEventListener("pointerup",T)}function P(){let i=c().filter(L=>L!==a),l=a.getBoundingClientRect(),w=null;if(r==="x"){let L=l.left+l.width/2,C=l.top+l.height/2;for(let q of i){let I=q.getBoundingClientRect(),B=I.left+I.width/2,V=I.top+I.height/2;if(Math.abs(V-C)<I.height/2?L<B:C<V){w=q;break}}}else{let L=l.top+l.height/2;for(let C of i){let q=C.getBoundingClientRect(),I=q.top+q.height/2;if(L<I){w=C;break}}}w?t.insertBefore(n,w):t.appendChild(n)}function K(){let i=g,l=window.innerHeight-g;return i<80?-16*(1-i/80):l<80?16*(1-l/80):0}function U(){if(!a){h=null;return}let i=K();if(i===0){h=null;return}window.scrollBy(0,i),P(),h=requestAnimationFrame(U)}function Y(){h===null&&K()!==0&&(h=requestAnimationFrame(U))}function m(){h!==null&&(cancelAnimationFrame(h),h=null)}function k(i){if(a){if(i.preventDefault(),g=i.clientY,r==="x"){let l=i.clientX-o,w=i.clientY-s;a.style.left=`${p+l}px`,a.style.top=`${b+w}px`}else{let l=i.clientY-s;a.style.top=`${b+l}px`}P(),r==="y"&&Y()}}function T(){if(!a)return;m(),n.replaceWith(a),a.classList.remove("lt-dragging"),a.style.position="",a.style.left="",a.style.width="",a.style.top="",a.style.zIndex="",document.removeEventListener("pointermove",k),document.removeEventListener("pointerup",T),W();let i=c().map(l=>l.dataset.reorderItem);a=null,n=null,e&&e(i)}t.addEventListener("pointerdown",_)}var Lr="joshuaegage@gmail.com";function Aa(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let r=e.querySelector("[data-feedback-text]");r.focus({preventScroll:!0});let a=!1;function n(){if(a)return;a=!0,document.removeEventListener("keydown",o),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function o(s){s.key==="Escape"&&n()}e.addEventListener("click",s=>{s.target===e&&n()}),document.addEventListener("keydown",o),e.querySelector("[data-feedback-cancel]").addEventListener("click",n),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=r.value.trim(),p=encodeURIComponent("Lift Tracker feedback"),b=encodeURIComponent(s||"(no message entered)");Je().catch(()=>{}),window.location.href=`mailto:${Lr}?subject=${p}&body=${b}`,n()})}var Kt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function ie(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),r=e.getDay();return e.setDate(e.getDate()-r),e}function Cr(t,e=new Date){let r=ie(e),a=new Date(r);a.setDate(a.getDate()+7);let n=new Set;for(let o of t){let s=new Date(o.performed_at);s>=r&&s<a&&n.add($(o.performed_at))}return n.size}function Ra(t){let e=null;for(let r of Kt)t>=r.days&&(e=r);return e}function Yt(t,e=new Date){let r=Cr(t,e);return{days:r,tier:Ra(r)}}function le(t,e=null){let r=new Map;for(let n of t){let s=ie(new Date(n.performed_at)).getTime();r.has(s)||r.set(s,new Set),r.get(s).add($(n.performed_at))}let a={};for(let n of Kt)a[n.key]=0;for(let n of r.values()){let o=Ra(n.size);o&&(a[o.key]+=1)}return _r(a,e)}var Dr={"19bf3140-6738-496f-ac0c-20e316c4c3c0":{uav:1,harrier:1}};function _r(t,e){let r=e?Dr[e]:null;if(!r)return t;let a={...t};for(let n of Object.keys(r))a[n]=(a[n]??0)+r[n];return a}function Tr(t){let e=new Set;for(let r of t)e.add($(r.performed_at));return e.size}function qr(t){let e=new Set;for(let o of t)e.add(ie(new Date(o.performed_at)).getTime());let r=Array.from(e).sort((o,s)=>o-s);if(r.length===0)return 0;let a=1,n=1;for(let o=1;o<r.length;o++){let s=new Date(r[o-1]);s.setDate(s.getDate()+7),n=s.getTime()===r[o]?n+1:1,n>a&&(a=n)}return a}function Ar(t){let e=new Set;for(let o of t)e.add($(o.performed_at));let r=Array.from(e).sort().map(o=>{let[s,p,b]=o.split("-").map(Number);return new Date(s,p-1,b)});if(r.length===0)return 0;let a=1,n=1;for(let o=1;o<r.length;o++){let s=new Date(r[o-1]);s.setDate(s.getDate()+1),n=s.getTime()===r[o].getTime()?n+1:1,n>a&&(a=n)}return a}function Rr(t){let e=new Map;for(let a of t)a.lift_id&&(e.has(a.lift_id)||e.set(a.lift_id,[]),e.get(a.lift_id).push(a));let r=Ct(Array.from(e.entries()).map(([a,n])=>({liftId:a,dailySeries:nt(n)})));return r.length?Math.max(...r.map(a=>a.pct)):0}function $r(t){let e=ct(t);if(e.length===0)return{gain:0,loss:0};let r=e[0].weight,a=0,n=0;for(let o of e){let s=o.weight-r;a=Math.max(a,s),n=Math.max(n,-s)}return{gain:a,loss:n}}function Mr(t,e=null,r={}){let{bodyWeightEntries:a=[],hasSubmittedFeedback:n=!1}=r,o=$r(a);return{totalDays:Tr(t),tierCounts:le(t,e),longestStreak:qr(t),totalSets:t.length,longestDayStreak:Ar(t),compositeMaxPct:Rr(t),bodyWeightGain:o.gain,bodyWeightLoss:o.loss,hasSubmittedFeedback:n||Ir(e)}}var Wr=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function Ir(t){return t!=null&&Wr.has(t)}var Nr=50,Pr=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Reach +17% composite score across all lifts.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.compositeMaxPct>=17},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=Nr&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function Gt(t,e=null,r={}){let a=Mr(t,e,r);return Pr.map(n=>({id:n.id,name:n.name,track:n.track,description:n.description,flavor:n.flavor??null,theme:n.theme??null,unlocked:n.isUnlocked(a)}))}function Xt(t,e){let r=new Set(e);return t.filter(a=>a.unlocked&&!r.has(a.id)).map(a=>a.id)}var Dt=null,ce=null;function Ur(){return Dt||(Dt=document.createElement("div"),Dt.className="lt-toast",document.body.appendChild(Dt),Dt)}function ht(t,{onUndo:e,onExpire:r,durationMs:a=5e3}={}){let n=Ur();clearTimeout(ce),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),s=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(ce),s(),e&&e()},{once:!0}),ce=setTimeout(()=>{s(),r&&r()},a)}function kt(t,e){try{let r=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return r?decodeURIComponent(r[1])==="true":e}catch{return e}}function gt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function jt(t,e){try{let r=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return r?decodeURIComponent(r[1]):e}catch{return e}}function zt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var $a="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function Jt(t){try{return window.localStorage.getItem(`${$a}${t}`)==="true"}catch{return!1}}function rt(t){try{window.localStorage.setItem(`${$a}${t}`,"true")}catch{}}var Ma="lt-weight-card-expanded";function _t(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Or(t){let[,e,r]=t.split("-");return`${Number(e)}/${Number(r)}`}function Wa(t){let[e,r,a]=t.split("-").map(Number);return new Date(e,r-1,a).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ia(t,{onExpand:e,showDiscovery:r=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let a=await lt(),n=ct(a),o=Ea(n),s=r&&a.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let p=o.change<0?"↘":o.change>0?"↗":"→",b=kt(Ma,!1);function g(){t.classList.toggle("lt-stats-row-expanded",b),b?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${_t(o.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Or(o.currentDate)})</span>
              <span class="lt-weight-stat-value">${_t(o.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${p} ${_t(Math.abs(o.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${_t(o.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}b=!b,gt(Ma,b),g()}),b?oe(t.querySelector("[data-home-weight-canvas]"),n):se()}g()}async function Na(t){rt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=Array.from(t.querySelectorAll("[data-tab]")),r={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},a="weight";e.forEach(i=>{i.addEventListener("click",()=>{i.dataset.tab!==a&&(a=i.dataset.tab,e.forEach(l=>l.setAttribute("aria-selected",String(l===i))),Object.entries(r).forEach(([l,w])=>{w.hidden=l!==a}),a==="weight"?f():Y().catch(l=>console.error("[lift-tracker]",l)))})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),p=t.querySelector("[data-weight-chart-section]"),b=t.querySelector("[data-weight-canvas]"),g=t.querySelector("[data-weight-empty]"),h=t.querySelector("[data-weight-history]");o.value=$(new Date().toISOString());let v=[];async function x(){v=await lt(),E(),f()}function f(){let i=ct(v);if(i.length===0){p.hidden=!0,g.hidden=!1,se();return}p.hidden=!1,g.hidden=!0,r.weight.hidden||oe(b,i)}function E(){if(v.length===0){h.innerHTML="";return}let i=v.slice().sort((l,w)=>new Date(w.logged_at)-new Date(l.logged_at));h.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${_t(Number(l.weight))} lb</span>
              <span class="lt-history-e1rm">${Wa($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),h.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>M(l.dataset.editTrigger))})}function M(i){let l=h.querySelector(`[data-entry-id="${i}"]`),w=v.find(L=>L.id===i);!l||!w||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${w.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${$(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",E),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await ga(i),await x(),ht("Weight entry deleted",{onUndo:async()=>{await ya(i),await x()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async L=>{L.preventDefault();let C=Number(l.querySelector("[data-edit-weight]").value),q=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!q)return;let I=new Date(w.logged_at),[B,V,wt]=q.split("-").map(Number);I.setFullYear(B,V-1,wt),await ha(i,{weight:C,logged_at:I.toISOString()}),await x()}))}n.addEventListener("submit",async i=>{i.preventDefault();let l=Number(s.value),w=o.value;if(!(l>=0)||!Number.isFinite(l)||!w)return;let[L,C,q]=w.split("-").map(Number),I=new Date;I.setFullYear(L,C-1,q),await ma(l,I.toISOString()),s.value="",s.focus(),o.value=$(new Date().toISOString()),await x()});let D=t.querySelector("[data-waist-form]"),c=t.querySelector("[data-waist-date-input]"),_=t.querySelector("[data-waist-input]"),W=t.querySelector("[data-waist-chart-section]"),A=t.querySelector("[data-waist-canvas]"),O=t.querySelector("[data-waist-empty]"),H=t.querySelector("[data-waist-history]");c.value=$(new Date().toISOString());let N=[],P=!1,K=null;async function U(){N=await At(),P=!0,k(),m()}async function Y(){if(P){m();return}K||(O.hidden=!1,O.textContent="Loading waist...",W.hidden=!0,K=U().finally(()=>{K=null})),await K}function m(){let i=Rt(N);if(i.length===0){W.hidden=!0,O.hidden=!1,O.textContent="No waist measurements yet — add your first one above.",qa();return}W.hidden=!1,O.hidden=!0,r.waist.hidden||Ta(A,i)}function k(){if(N.length===0){H.innerHTML="";return}let i=N.slice().sort((l,w)=>new Date(w.logged_at)-new Date(l.logged_at));H.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${_t(Number(l.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Wa($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),H.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>T(l.dataset.editTrigger))})}function T(i){let l=H.querySelector(`[data-entry-id="${i}"]`),w=N.find(L=>L.id===i);!l||!w||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${w.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${$(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",k),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ka(i),await U(),ht("Waist measurement deleted",{onUndo:async()=>{await va(i),await U()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async L=>{L.preventDefault();let C=Number(l.querySelector("[data-edit-waist]").value),q=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!q)return;let I=new Date(w.logged_at),[B,V,wt]=q.split("-").map(Number);I.setFullYear(B,V-1,wt),await ba(i,{waist_circumference:C,logged_at:I.toISOString()}),await U()}))}D.addEventListener("submit",async i=>{i.preventDefault();let l=Number(_.value),w=c.value;if(!(l>=0)||!Number.isFinite(l)||!w)return;let[L,C,q]=w.split("-").map(Number),I=new Date;I.setFullYear(L,C-1,q),await wa(l,I.toISOString()),_.value="",_.focus(),c.value=$(new Date().toISOString()),await U()}),await x()}var Pa="lt-seen-rank-achievements";function Qt(){let t=jt(Pa,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(r=>typeof r=="string"):[]}catch{return[]}}function Ua(t){zt(Pa,JSON.stringify(t))}var de="lt-active-workout";function ue(){try{return window.localStorage.getItem(de)||null}catch{return null}}function pe(t){try{t?window.localStorage.setItem(de,t):window.localStorage.removeItem(de)}catch{}}function Oa(t){let e=ue();return e&&t.find(r=>r.id===e)||null}var Hr=120,Ha="lt-default-rest-seconds",Fa="lt-lift-rest-seconds-",Ba="lt-rest-timer-enabled",tt=null,fe=null,me=null,Tt=0,ot=null;function Va(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let r=Number(e);return Number.isFinite(r)&&r>0?r:null}catch{return null}}function Ka(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function vt(){return kt(Ba,!1)}function Ya(t){gt(Ba,!!t)}function ge(){return Va(Ha)||Hr}function Ga(t){Ka(Ha,t)}function ye(t){return Va(`${Fa}${t}`)}function Xa(t,e){Ka(`${Fa}${t}`,e)}function Zt(t){return ye(t)||ge()}function we(){return tt||(tt=document.createElement("div"),tt.className="lt-rest-timer",tt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,tt.querySelector("[data-rest-add]").addEventListener("click",()=>{Tt&&(Tt+=30*1e3,he())}),tt.querySelector("[data-rest-skip]").addEventListener("click",ja),document.body.appendChild(tt),tt)}function Fr(t){let e=Math.max(0,Math.ceil(t/1e3)),r=Math.floor(e/60),a=String(e%60).padStart(2,"0");return`${r}:${a}`}function he(){let t=we(),e=Tt-Date.now();t.querySelector("[data-rest-time]").textContent=Fr(e),e<=0&&Vr()}function be(){clearInterval(fe),clearTimeout(me),fe=null,me=null}function Br(){try{Wt(),ot.state==="suspended"&&ot.resume();let t=ot.currentTime,e=ot.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(ot.destination),[523.25,659.25].forEach((r,a)=>{let n=ot.createOscillator();n.type="sine",n.frequency.setValueAtTime(r,t+a*.12),n.connect(e),n.start(t+a*.12),n.stop(t+.75)})}catch{}}function Wt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;ot||=new t,ot.state==="suspended"&&ot.resume()}catch{}}function Vr(){be(),Tt=0;let t=we();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",Br(),navigator.vibrate&&navigator.vibrate([120,70,120]),me=setTimeout(ja,12e3)}function ja(){be(),Tt=0,tt&&tt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function te({seconds:t,liftName:e=""}={}){let r=Number(t);if(!Number.isFinite(r)||r<=0)return;let a=we();be(),Tt=Date.now()+r*1e3,a.classList.remove("lt-rest-timer-done"),a.classList.add("lt-rest-timer-visible"),a.querySelector(".lt-rest-timer-label").textContent="Rest",a.querySelector("[data-rest-lift]").textContent=e,he(),fe=setInterval(he,250)}var za="lt-composite-expanded",ke="lt-header-menu-open";async function Ja(t){let{data:{session:e}}=await y.auth.getSession(),r=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let a=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,s=null;function p(d=!0){s&&(clearTimeout(s),s=null),n.classList.remove("lt-header-actions-open"),a.setAttribute("aria-expanded","false"),d&&gt(ke,!1),s=setTimeout(()=>{n.hidden=!0,s=null},o)}function b({persist:d=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),n.hidden=!1,u?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),a.setAttribute("aria-expanded","true"),d&&gt(ke,!0)}a.addEventListener("click",()=>{n.hidden?b():p()}),n.addEventListener("click",d=>{d.target.closest("button")&&p()}),kt(ke,!1)&&b({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ke);let h=t.querySelector("[data-feedback-btn]");h&&h.addEventListener("click",()=>Aa()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>y.auth.signOut());let x=t.querySelector("[data-composite-section]"),f=t.querySelector("[data-composite-toggle]"),E=t.querySelector("[data-composite-body]"),M=t.querySelector("[data-chevron]"),D=t.querySelector("[data-composite-summary]"),c=t.querySelector("[data-composite-discovery]");function _(d){f.setAttribute("aria-expanded",String(d)),E.hidden=!d,M.innerHTML=d?"&#9650;":"&#9660;",x.classList.toggle("lt-stats-row-expanded",d)}_(kt(za,!0)),f.addEventListener("click",()=>{if(rt(J.composite),c.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ge();return}let d=f.getAttribute("aria-expanded")==="true";_(!d),gt(za,!d)});let W=t.querySelector("[data-killstreak-icon]"),A=t.querySelector("[data-killstreak-label]"),O=t.querySelector("[data-killstreak-sub]"),H=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",je);function N(d){let{days:u,tier:S}=Yt(d);W.textContent=S?S.icon:"🎯",A.textContent=S?`${S.label} Killstreak`:"No Killstreak",O.textContent=`${u} Day streak`;let X=Gt(d).filter(j=>j.track==="rank"),R=Xt(X,Qt()).length>0;H.hidden=!R}let P=t.querySelector("[data-weight-card]");function K(){rt(J.weight),Ye()}function U(d){Ia(P,{onExpand:K,...d}).catch(u=>{console.error("[lift-tracker]",u),P.classList.remove("lt-stats-row-expanded"),P.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,P.querySelector("[data-weight-expand]").addEventListener("click",K)})}let Y=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{rt(J.history),Y.hidden=!0,Xe()});let m=t.querySelector("[data-add-lift-form]"),k=t.querySelector("[data-add-lift-toggle]"),T=t.querySelector("[data-add-lift-discovery]"),i=t.querySelector("[data-add-lift-hint]"),l=t.querySelector("[data-create-workout-btn]"),w=t.querySelector("[data-create-workout-discovery]");k.addEventListener("click",()=>{let d=m.hidden;m.hidden=!d,k.setAttribute("aria-pressed",String(d)),k.classList.toggle("lt-add-lift-toggle-active",d),d&&m.querySelector('input[name="name"]').focus()});let L=t.querySelector("[data-lift-list]"),C=t.querySelector("[data-list-empty]");l.addEventListener("click",()=>{l.disabled||Be()});let q=t.querySelector("[data-workout-pills]"),I=t.querySelector("[data-workout-empty-hint]"),B=[],V=ue();function wt(){return V&&B.find(d=>d.id===V)||null}function De(){let d=wt();if(!d)return G;let u=new Set(d.liftIds);return G.filter(S=>u.has(S.id))}function _e(){q.innerHTML=B.map(d=>{let u=d.id===V;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of B){let u=q.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);u&&(u.textContent=d.name)}q.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let u=d.dataset.workoutPill;V=V===u?null:u,pe(V),_e(),re(qt),Re(qt)})}),q.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",u=>{u.stopPropagation(),Ve(d.dataset.workoutEdit)})})}let ee="lt-fast-mode",Te="lt-burst-mode";function gr(){try{let d=window.localStorage.getItem(ee);if(d!==null)return d==="true";let u=window.localStorage.getItem(Te);return u!==null?(window.localStorage.setItem(ee,u),window.localStorage.removeItem(Te),u==="true"):!1}catch{return!1}}function yr(d){try{window.localStorage.setItem(ee,String(d))}catch{}}let G=[],st=gr(),it=new Map,qt=[],It=t.querySelector("[data-mode-toggle]");function qe(){It.textContent=st?"Normal":"Fast",It.setAttribute("aria-pressed",String(st)),It.classList.toggle("lt-mode-toggle-active",st)}qe(),It.addEventListener("click",()=>{st=!st,yr(st),qe(),re(qt)}),m.addEventListener("submit",async d=>{d.preventDefault();let u=m.querySelector('input[name="name"]'),S=u.value.trim();if(S){u.value="",u.disabled=!0;try{await Et(S,G.length),await Ae()}finally{u.disabled=!1,u.focus()}}}),Mt(L,{onReorder:async d=>{let u=[...d],S=new Set(d),X=G.map(R=>S.has(R.id)?u.shift():R.id);await ea(X),G=X.map(R=>G.find(j=>j.id===R)).filter(Boolean)}}),Mt(q,{axis:"x",onReorder:async d=>{await ca(d),B=d.map(u=>B.find(S=>S.id===u)).filter(Boolean)}});async function Ae(){B=await Lt(),V&&!B.some(R=>R.id===V)&&(V=null,pe(null)),_e(),G=await z();let d=G.length>=2;if(T.hidden=G.length>=2,i.hidden=G.length!==1,l.disabled=!d,l.setAttribute("aria-disabled",String(!d)),w.hidden=!d||B.length>0,I.hidden=!d||B.length>0,G.length===0){L.innerHTML="",C.hidden=!1,C.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",i.hidden=!0,x.hidden=!0,N([]),U({showDiscovery:!1}),Y.hidden=!0,c.hidden=!0,it=new Map,qt=[];return}let u=await et(G.map(R=>R.id)),S=u.length>0;N(u),U({showDiscovery:S&&!Jt(J.weight)}),Y.hidden=!S||Jt(J.history),it=new Map(G.map(R=>[R.id,[]]));for(let R of u){let j=it.get(R.lift_id);j&&j.push(R)}let X=G.map(R=>({liftId:R.id,dailySeries:nt(it.get(R.id)||[])}));re(X),Re(X)}function Re(d){let u=wt(),S=u?d.filter(Nt=>u.liftIds.includes(Nt.liftId)):d,X=Ct(S);x.hidden=!1;let R=t.querySelector("[data-composite-canvas]"),j=t.querySelector("[data-composite-empty]"),St=t.querySelector("[data-composite-scope]"),xt=t.querySelector("[data-composite-blurb]");if(St.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",xt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",j.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",X.length===0){R.hidden=!0,j.hidden=!1,D.textContent="",c.hidden=!0;return}R.hidden=!1,j.hidden=!0,D.textContent=Sa(X[X.length-1].pct),c.hidden=Jt(J.composite),Vt(R,X)}function ae(d){let u=nt(it.get(d)||[]),S=u[u.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function wr(d){let u=it.get(d)||[];return u.length===0?"":u[u.length-1].weight}function re(d){qt=d;let u=De();C.hidden=u.length>0,C.textContent=V?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",L.innerHTML=u.map(S=>st?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${S.id}" data-lift-id="${S.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${S.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${ae(S.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${$e(S.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${S.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${wr(S.id)}" data-fast-weight />
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
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${$e(S.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let S of G){let R=L.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");R&&(R.textContent=S.name)}L.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Fe(S.dataset.openLift))}),st&&br()}function br(){L.querySelectorAll("[data-fast-log-form]").forEach(d=>{let u=d.dataset.fastLogForm;d.addEventListener("submit",async S=>{S.preventDefault();let X=d.querySelector("[data-fast-weight]"),R=d.querySelector("[data-fast-reps]"),j=d.querySelector("[data-fast-feedback]"),St=Number(X.value),xt=Number(R.value);if(!(St>=0)||!Number.isFinite(St)||!(xt>0)||!Number.isInteger(xt))return;let Nt=it.get(u)||[],kr=Q(St,xt),Me=Ot(kr,Nt),We=new Date().toISOString();vt()&&Wt();let vr=await at(u,St,xt,We),Sr=G.find(ne=>ne.id===u);vt()&&te({seconds:Zt(u),liftName:Sr?.name||""});let Ie=[...Nt,vr];it.set(u,Ie),R.value="",R.focus();let Ne=L.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");Ne&&(Ne.textContent=ae(u));let xr=$(We),Pe=bt(Ie.filter(ne=>$(ne.performed_at)===xr));j.hidden=!1,j.classList.toggle("lt-pr",Me),j.textContent=Me?`PR! ${Math.round(Pe)} lb today`:`Logged · ${Math.round(Pe)} lb today`})})}function $e(d){return String(d).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await Ae()}async function Qa(t,e){let r=await Ze(e);if(!r||r.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let a=t.querySelector("[data-name-input]");a.value=r.name;let n=r.name;a.addEventListener("keydown",m=>{m.key==="Enter"&&a.blur()}),a.addEventListener("blur",async()=>{let m=a.value.trim();if(!m||m===n){a.value=n;return}n=m,await ta(e,m)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await aa(e),F(),ht(`Deleted "${n}"`,{onUndo:async()=>{await ra(e),Pt()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(m=>{m.addEventListener("click",()=>{o.forEach(k=>k.setAttribute("aria-selected",String(k===m))),Object.entries(s).forEach(([k,T])=>{T.hidden=k!==m.dataset.tab}),m.dataset.tab==="details"&&Y()})});let p=t.querySelector("[data-log-form]"),b=t.querySelector("[data-weight-input]"),g=t.querySelector("[data-reps-input]"),h=t.querySelector("[data-log-feedback]"),v=t.querySelector("[data-default-rest-input]"),x=t.querySelector("[data-lift-rest-input]"),f=t.querySelector("[data-rest-enabled-input]"),E=t.querySelector("[data-rest-enabled-label]"),M=t.querySelector("[data-default-rest-field]"),D=t.querySelector("[data-lift-rest-field]"),c=[];function _(){v.value=ge(),x.value=ye(e)||"";let m=vt();f.checked=m,E.textContent=m?"Rest timer: On":"Rest timer: Off",v.disabled=!m,x.disabled=!m,M.classList.toggle("lt-rest-setting-field-disabled",!m),D.classList.toggle("lt-rest-setting-field-disabled",!m)}function W(m){let k=Number(m.value);return m.value===""?null:!Number.isFinite(k)||k<15?15:k>600?600:Math.round(k)}v.addEventListener("change",()=>{let m=W(v)||120;Ga(m),_()}),x.addEventListener("change",()=>{let m=W(x);Xa(e,m),_()}),f.addEventListener("change",()=>{Ya(f.checked),_()});async function A(){c=await na(e)}function O(){if(c.length===0)return;let m=c[c.length-1];b.value=m.weight}p.addEventListener("submit",async m=>{m.preventDefault();let k=Number(b.value),T=Number(g.value);if(!(k>=0)||!Number.isFinite(k)||!(T>0)||!Number.isInteger(T))return;let i=Q(k,T),w=Ot(i,c),L=new Date;vt()&&Wt(),await at(e,k,T,L.toISOString()),vt()&&te({seconds:Zt(e),liftName:n}),g.value="",g.focus(),await A(),P(),s.details.hidden||Y();let C=$(L.toISOString()),q=bt(c.filter(I=>$(I.performed_at)===C));h.hidden=!1,h.classList.toggle("lt-pr",w),h.textContent=w?`New PR! Today's volume: ${Math.round(q)} lb`:`Logged. Today's volume: ${Math.round(q)} lb`});function H(m){let k=new Map;for(let T of m){let i=$(T.performed_at);k.has(i)||k.set(i,[]),k.get(i).push(T)}return Array.from(k.entries()).sort((T,i)=>i[0].localeCompare(T[0]))}function N(m){let[k,T,i]=m.split("-").map(Number);return new Date(k,T-1,i).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function P(){let m=s.history;if(c.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let k=H(c);m.innerHTML=k.map(([T,i])=>{let l=bt(i),L=i.slice().sort((C,q)=>new Date(q.performed_at)-new Date(C.performed_at)).map(C=>{let q=Math.round(Q(Number(C.weight),Number(C.reps)));return`
              <li class="lt-history-row" data-set-id="${C.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${C.id}">
                  <span class="lt-history-weight">${C.weight} lb &times; ${C.reps}</span>
                  <span class="lt-history-e1rm">${q} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${N(T)}</span>
              <span class="lt-history-volume">${Math.round(l)} lb volume</span>
            </div>
            <ul class="lt-history-list">${L}</ul>
          </div>
        `}).join(""),m.querySelectorAll("[data-edit-trigger]").forEach(T=>{T.addEventListener("click",()=>U(T.dataset.editTrigger))})}function K(m){return s.history.querySelector(`[data-set-id="${m}"]`)}function U(m){let k=K(m),T=c.find(i=>i.id===m);!k||!T||(k.innerHTML=`
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
    `,k.querySelector("[data-edit-cancel]").addEventListener("click",P),k.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await ia(m),await A(),P(),s.details.hidden||Y(),ht("Set deleted",{onUndo:async()=>{await la(m),await A(),P(),s.details.hidden||Y()}})}),k.querySelector("[data-edit-form]").addEventListener("submit",async i=>{i.preventDefault();let l=Number(k.querySelector("[data-edit-weight]").value),w=Number(k.querySelector("[data-edit-reps]").value),L=k.querySelector("[data-edit-date]").value;if(!(l>=0)||!(w>0)||!L)return;let C=new Date(T.performed_at),[q,I,B]=L.split("-").map(Number);C.setFullYear(q,I-1,B),await sa(m,{weight:l,reps:w,performed_at:C.toISOString()}),await A(),P(),s.details.hidden||Y()}))}function Y(){let m=s.details,k=nt(c);if(k.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>',_a();return}m.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let T=m.querySelector("[data-lift-canvas]"),i=m.querySelector("[data-point-detail]");Da(T,k,{onPointClick:l=>{i.hidden=!1,i.textContent=`${N(l.date)}: ${l.weight} lb × ${l.reps} (${Math.round(l.e1rm)} e1RM)`}})}await A(),_(),O(),P()}var Za=60;function tr(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Za),e}function yt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ve(t,e,r=new Date,a=`last ${Za} days`,n=[],o=[]){let s=$(r.toISOString()),p=[`Lift Tracker — ${a} (as of ${s})`,""],b=t.filter(g=>(e.get(g.id)||[]).length>0);if(b.length===0)p.push("No sets logged in this period."),p.push("");else{for(let h of b){let v=(e.get(h.id)||[]).slice().sort((E,M)=>new Date(E.performed_at)-new Date(M.performed_at)),x=bt(v),f=Math.max(...v.map(E=>Q(Number(E.weight),Number(E.reps))));p.push(h.name);for(let E of v){let M=Math.round(Q(Number(E.weight),Number(E.reps)));p.push(`  ${$(E.performed_at)}: ${E.weight} lb x ${E.reps} (e1RM ${M})`)}p.push(`  Sets: ${v.length} | Volume: ${Math.round(x)} lb | Best e1RM: ${Math.round(f)}`),p.push("")}let g=t.length-b.length;g>0&&(p.push(`(${g} lift${g===1?"":"s"} with no sets in this period omitted)`),p.push(""))}if(n.length>0){p.push("Body weight");for(let f of n)p.push(`  ${f.date}: ${yt(f.weight)} lb`);let g=n[0].weight,h=n[n.length-1].weight,v=h-g,x=v>0?"+":"";p.push(`  Start: ${yt(g)} lb | Current: ${yt(h)} lb | Change: ${x}${yt(v)} lb`),p.push("")}if(o.length>0){p.push("Waist");for(let f of o)p.push(`  ${f.date}: ${yt(f.waist)} in`);let g=o[0].waist,h=o[o.length-1].waist,v=h-g,x=v>0?"+":"";p.push(`  Start: ${yt(g)} in | Current: ${yt(h)} in | Change: ${x}${yt(v)} in`),p.push("")}return p.join(`
`).trimEnd()}var Kr=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Yr=`
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
`;async function er(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Kr.map(f=>`
          <section class="lt-help-section">
            <h2>${f.title}</h2>
            <p>${f.body}</p>
          </section>
          ${f.title==="Export progress"?Yr:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=t.querySelector("[data-export-toggle]"),r=t.querySelector("[data-export-body]"),a=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let E=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(E)),r.hidden=!E,a.innerHTML=E?"&#9650;":"&#9660;",!!E){e.disabled=!0;try{let M=await z(),D=M.map(U=>U.id),c=tr().toISOString(),_=await oa(D,c),W=new Map(M.map(U=>[U.id,[]]));for(let U of _){let Y=W.get(U.lift_id);Y&&Y.push(U)}let O=(await lt()).filter(U=>new Date(U.logged_at)>=new Date(c)),H=ct(O),P=(await At()).filter(U=>new Date(U.logged_at)>=new Date(c)),K=Rt(P);n.value=ve(M,W,new Date,void 0,H,K),s.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let f=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),f=!0}catch{f=!1}if(!f)try{f=document.execCommand("copy")}catch{f=!1}s.hidden=!1,s.textContent=f?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let p=t.querySelector("[data-full-export-toggle]"),b=t.querySelector("[data-full-export-body]"),g=t.querySelector("[data-full-export-chevron]"),h=t.querySelector("[data-full-export-textarea]"),v=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");p.addEventListener("click",async()=>{let E=!(p.getAttribute("aria-expanded")==="true");if(p.setAttribute("aria-expanded",String(E)),b.hidden=!E,g.innerHTML=E?"&#9650;":"&#9660;",!!E){p.disabled=!0;try{let M=await z(),D=M.map(N=>N.id),c=await et(D),_=new Map(M.map(N=>[N.id,[]]));for(let N of c){let P=_.get(N.lift_id);P&&P.push(N)}let W=await lt(),A=ct(W),O=await At(),H=Rt(O);h.value=ve(M,_,new Date,"all-time",A,H),x.hidden=!0}finally{p.disabled=!1}}}),v.addEventListener("click",async()=>{h.select();let f=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(h.value),f=!0}catch{f=!1}if(!f)try{f=document.execCommand("copy")}catch{f=!1}x.hidden=!1,x.textContent=f?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function ar(t){rt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",F);let[e,r]=await Promise.all([z(),Lt()]),a=Oa(r),n=a?e.filter(f=>a.liftIds.includes(f.id)):e,o=n.length?await et(n.map(f=>f.id)):[],s=new Map(n.map(f=>[f.id,[]]));for(let f of o){let E=s.get(f.lift_id);E&&E.push(f)}let p=n.map(f=>({liftId:f.id,dailySeries:nt(s.get(f.id)||[])})),b=Ct(p),g=t.querySelector("[data-composite-canvas]"),h=t.querySelector("[data-composite-empty]"),v=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(v.textContent=a?`Measuring ${a.name}`:"Measuring all lifts",x.textContent=a?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",h.textContent=a?`Log a few sets for lifts in ${a.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",b.length===0){g.hidden=!0,h.hidden=!1;return}g.hidden=!1,h.hidden=!0,Vt(g,b)}function Gr(t){let[e,r,a]=t.split("-").map(Number);return new Date(e,r-1,a).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Xr(){let t=await z(),e=new Map(t.map(a=>[a.id,a.name]));return(await et(t.map(a=>a.id))).map(a=>({...a,liftName:e.get(a.lift_id)||"Unknown lift"}))}function jr(t,e){let r=new Map;for(let o of e)r.has(o.liftName)||r.set(o.liftName,[]),r.get(o.liftName).push(o);let a=Array.from(r.entries()).map(([o,s])=>{let b=s.slice().sort((g,h)=>new Date(g.performed_at)-new Date(h.performed_at)).map(g=>{let h=Math.round(Q(Number(g.weight),Number(g.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${g.weight} lb &times; ${g.reps}</span>
                <span class="lt-history-e1rm">${h} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${o}</div>
          <ul class="lt-history-list">${b}</ul>
        </div>
      `}).join(""),n=r.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Gr(t)}</span>
        <span class="lt-history-volume">${n} lift${n===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${a}
    </div>
  `}async function rr(t){rt(J.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=t.querySelector("[data-history-content]"),r=await Xr();if(r.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let a=xa(r);e.innerHTML=a.map(([n,o])=>jr(n,o)).join("")}var nr="lt-theme",Se="default";function xe(){return jt(nr,Se)}function or(t){!t||t===Se?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function sr(t){or(t),zt(nr,t||Se)}function ir(){or(xe())}var zr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},Jr=["rank","mastery","streak","capstone","secret"],Qr="Hidden until unlocked.";async function lr(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=await z(),r=e.length?await et(e.map(c=>c.id)):[],a=await lt(),n=await ze(),o=await Qe(),{days:s,tier:p}=Yt(r);t.querySelector("[data-killstreak-current-icon]").textContent=p?p.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=p?`${p.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${s} Day streak`;let b=le(r,n),g=t.querySelector("[data-killstreak-tier-list]");g.innerHTML=Kt.map(c=>{let _=b[c.key];return`
      <li class="lt-killstreak-tier-row${p?.key===c.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${c.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${c.label}</span>
          <span class="lt-killstreak-tier-req">${c.days}+ day${c.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${_} earned</span>
      </li>
    `}).join("");let h=Gt(r,n,{bodyWeightEntries:a,hasSubmittedFeedback:o}),v=h.filter(c=>c.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${v} / ${h.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let x=h.filter(c=>c.track==="rank"),f=new Set(Xt(x,Qt()));Ua(x.filter(c=>c.unlocked).map(c=>c.id));let E=t.querySelector("[data-achievements]");function M(c){if(c.track!=="rank"){let H=c.track==="secret"&&!c.unlocked,N=H?" lt-achievement-card-desc-hidden":"",P=H?Qr:c.description,K=c.flavor&&!H?`<span class="lt-achievement-card-flavor">${c.flavor}</span>`:"";return`
        <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc${N}">${P}</span>
            ${K}
          </span>
        </li>
      `}let _=c.unlocked&&xe()===c.theme.id,W=c.unlocked&&f.has(c.id),A=c.unlocked?`<span class="lt-achievement-card-theme">${c.theme.label} theme${_?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${c.theme.label}</span>`,O=W?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${W?" lt-achievement-card-new":""}${_?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${c.theme.id}"${c.unlocked?"":" disabled"} aria-label="${c.unlocked?`Apply the ${c.theme.label} theme`:`Locked: ${c.name}`}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc">${c.description}</span>
            ${A}
            ${O}
          </span>
        </button>
      </li>
    `}function D(){E.innerHTML=Jr.map(c=>{let W=h.filter(A=>A.track===c).sort((A,O)=>Number(O.unlocked)-Number(A.unlocked)).map(M).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${zr[c]}</h3>
          ${c==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${W}</ul>
        </section>
      `}).join("")}D(),E.addEventListener("click",c=>{let _=c.target.closest("[data-apply-theme]");!_||_.disabled||(sr(_.dataset.applyTheme),D())})}var cr="__divider__";async function Ee(t,{mode:e,workoutId:r}={}){let a=e==="edit",[n,o]=await Promise.all([z(),a?da(r):Promise.resolve(null)]);if(a&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(a?o.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${a?dr(o.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let p=t.querySelector("[data-workout-name-input]"),b=t.querySelector("[data-workout-lift-list]"),g=t.querySelector("[data-workout-lifts-empty]"),h=t.querySelector("[data-save-workout]"),v=t.querySelector("[data-workout-save-feedback]");g.hidden=n.length>0;let x=n.filter(D=>s.has(D.id)),f=n.filter(D=>!s.has(D.id));b.innerHTML=[...x.map(E),M(),...f.map(E)].join("");for(let D of n){let _=b.querySelector(`[data-lift-id="${D.id}"]`)?.querySelector("[data-name-slot]");_&&(_.textContent=D.name)}Mt(b,{onReorder:()=>{}}),a&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await pa(r),F(),ht(`Deleted "${o.name}"`,{onUndo:async()=>{await fa(r),Pt()}}))}),h.addEventListener("click",async()=>{let D=p.value.trim();if(!D){p.focus();return}let c=Array.from(b.querySelectorAll("[data-reorder-item]")),_=c.findIndex(A=>A.dataset.reorderItem===cr),W=c.slice(0,_).map(A=>A.dataset.reorderItem);h.disabled=!0,v.hidden=!0;try{if(a)await ua(r,D,W);else{let A=await Lt();await Ut(D,W,A.length)}F()}catch(A){console.error("[lift-tracker]",A),v.hidden=!1,v.textContent="Something went wrong saving the workout.",h.disabled=!1}});function E(D){return`
      <li class="lt-lift-row" data-reorder-item="${D.id}" data-lift-id="${D.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${dr(D.name)}">&#8942;&#8942;</button>
      </li>
    `}function M(){return`
      <li class="lt-workout-divider" data-reorder-item="${cr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function dr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Zr=`${window.location.origin}${window.location.pathname}`;function tn(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Le(t){let e="signin";function r(n,o,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${tn(s||"")}">

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
    `}function a(n,o,s){t.innerHTML=r(n,o,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",a()});let p=t.querySelector("[data-auth-form]");p.addEventListener("submit",async b=>{b.preventDefault();let g=p.email.value.trim(),h=p.password.value,v=p.querySelector('button[type="submit"]');v.disabled=!0,v.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:f}=e==="signup"?await y.auth.signUp({email:g,password:h,options:{emailRedirectTo:Zr}}):await y.auth.signInWithPassword({email:g,password:h});if(f)throw f;if(e==="signup"&&!x.session){e="signin",a(null,`Account created. Check ${g} for a confirmation link, then sign in here.`,g);return}}catch(x){a(x.message||"Something went wrong. Try again.",null,g)}})}a()}function ur(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function pr(){let{data:t,error:e}=await y.auth.signInAnonymously();if(e)throw e;return await en(),t}async function en(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,r,a]=await Promise.all([Et("Bench Press",0),Et("Squat",1),Et("Deadlift",2)]);await Promise.all([at(e.id,135,8,t(6)),at(e.id,145,6,t(2)),at(r.id,185,5,t(5)),at(r.id,195,5,t(1)),at(a.id,225,5,t(3))]),await Ut("Full Body",[e.id,r.id,a.id],0)}var Z=document.getElementById("lift-tracker-app");ir();var fr=0;async function Ce(){let t=++fr,e=()=>t!==fr;try{let{data:{session:r}}=await y.auth.getSession();if(e())return;if(!r)if(ur())try{if(await pr(),e())return}catch(n){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",n),await Le(Z);return}else return await Le(Z),e(),void 0;let a=He();if(a.name==="detail"?await Qa(Z,a.liftId):a.name==="help"?await er(Z):a.name==="weight"?await Na(Z):a.name==="composite"?await ar(Z):a.name==="history"?await rr(Z):a.name==="killstreak"?await lr(Z):a.name==="workout-new"?await Ee(Z,{mode:"create"}):a.name==="workout-edit"?await Ee(Z,{mode:"edit",workoutId:a.workoutId}):await Ja(Z),e())return;window.scrollTo(0,0)}catch(r){if(e())return;console.error("[lift-tracker]",r),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",Ce);var mr=null,hr=!1;y.auth.onAuthStateChange((t,e)=>{let r=e?.user?.id??null,a=!hr;hr=!0;let n=r!==mr;mr=r,!(a||!n)&&(F(),Ce())});Ce();

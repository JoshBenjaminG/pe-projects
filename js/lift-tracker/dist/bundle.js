import{createClient as Lr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Oe="https://mqfsgammpsumpltfutwl.supabase.co",Pe="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var y=Lr(Oe,Pe);function He(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function H(){window.location.hash="#/"}function Fe(t){window.location.hash=`#/lift/${t}`}function Be(){window.location.hash="#/workout/new"}function Ve(t){window.location.hash=`#/workout/${t}/edit`}function Ke(){window.location.hash="#/help"}function Ye(){window.location.hash="#/weight"}function Ge(){window.location.hash="#/composite"}function Xe(){window.location.hash="#/history"}function je(){window.location.hash="#/killstreak"}function Nt(){window.dispatchEvent(new Event("hashchange"))}async function ze(){let{data:t,error:e}=await y.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Je(){let{error:t}=await y.from("feedback_submissions").insert({});if(t)throw t}async function Qe(){let{count:t,error:e}=await y.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function z(){let{data:t,error:e}=await y.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Ze(t){let{data:e,error:a}=await y.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function St(t,e){let{data:a,error:r}=await y.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function ta(t,e){let{data:a,error:r}=await y.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function ea(t){let e=t.map((n,o)=>y.from("lifts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function aa(t){let{error:e}=await y.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ra(t){let{error:e}=await y.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function na(t){let{data:e,error:a}=await y.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function et(t){if(!t||t.length===0)return[];let{data:e,error:a}=await y.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function oa(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await y.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function at(t,e,a,r){let{data:n,error:o}=await y.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(o)throw o;return n}async function sa(t,e){let{data:a,error:r}=await y.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ia(t){let{error:e}=await y.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function la(t){let{error:e}=await y.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function xt(){let{data:t,error:e}=await y.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function ca(t){let e=t.map((n,o)=>y.from("workouts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function da(t){let{data:e,error:a}=await y.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Ut(t,e,a){let{data:r,error:n}=await y.from("workouts").insert({name:t,sort_order:a}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await y.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(o)throw o}return r}async function ua(t,e,a){let{error:r}=await y.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:n}=await y.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(a.length>0){let{error:o}=await y.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(o)throw o}}async function pa(t){let{error:e}=await y.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function fa(t){let{error:e}=await y.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Et(){let{data:t,error:e}=await y.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ma(t,e){let{data:a,error:r}=await y.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ha(t,e){let{data:a,error:r}=await y.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ga(t){let{error:e}=await y.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ya(t){let{error:e}=await y.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function qt(){let{data:t,error:e}=await y.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function wa(t,e){let{data:a,error:r}=await y.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ba(t,e){let{data:a,error:r}=await y.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ka(t){let{error:e}=await y.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function va(t){let{error:e}=await y.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Q(t,e){return t*(1+e/30)}function $(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${n}`}function gt(t){let e=new Map;for(let a of t){let r=$(a.performed_at),n=Q(Number(a.weight),Number(a.reps)),o=e.get(r);(!o||n>o.e1rm)&&e.set(r,{date:r,e1rm:n,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Ot(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let h of s.dailySeries)r.add(h.date);let n=Array.from(r).sort(),o=[];for(let s of n){let h=0,b=0;for(let m of e){let g=null;for(let k of m.dailySeries)if(k.date<=s)g=k;else break;g&&(h+=g.e1rm/a.get(m.liftId),b+=1)}if(b>0){let m=h/b;o.push({date:s,ratio:m,pct:(m-1)*100})}}return o}function Pt(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>Q(Number(r.weight),Number(r.reps))));return t>a}function yt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function Sa(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function xa(t){let e=new Map;for(let a of t){let r=$(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function Lt(t){let e=new Map;for(let a of t){let r=$(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:n})=>({date:a,weight:r,entryId:n}))}function Ea(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function At(t){let e=new Map;for(let a of t){let r=$(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:n})=>({date:a,waist:r,entryId:n}))}var $t=null,it=null,lt=null,ct=null,Bt=14,Ht="#e8242c",La="rgba(232, 36, 44, 0.18)",Ft="#f2b134",Da="rgba(242, 177, 52, 0.16)",dt="#9a9ca6",ut="rgba(255, 255, 255, 0.08)";function Vt(t,e,{onPointClick:a}={}){$t&&($t.destroy(),$t=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return $t=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:n,borderColor:Ht,backgroundColor:La,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),$t}function Ca(t,e,{onPointClick:a}={}){it&&(it.destroy(),it=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return it=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:n,borderColor:Ft,backgroundColor:Da,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),it}function _a(){it&&(it.destroy(),it=null)}function oe(t,e,{onPointClick:a}={}){lt&&(lt.destroy(),lt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return lt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:n,borderColor:Ht,backgroundColor:La,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),lt}function se(){lt&&(lt.destroy(),lt=null)}function Ta(t,e,{onPointClick:a}={}){ct&&(ct.destroy(),ct=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return ct=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:n,borderColor:Ft,backgroundColor:Da,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),ct}function qa(){ct&&(ct.destroy(),ct=null)}function Rt(t,{onReorder:e,axis:a="y"}={}){let r=null,n=null,o=0,s=0,h=0,b=0,m=0,g=null,k=null,L=null,p=0,D=0,R=null,c=null;function S(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function q(i){let l=i.target.closest(".lt-drag-handle");if(!l)return;let w=l.closest("[data-reorder-item]");if(w){if(i.pointerType!=="touch"){i.preventDefault(),N(w,i.clientX,i.clientY);return}if(l.setPointerCapture)try{l.setPointerCapture(i.pointerId),R=l,c=i.pointerId}catch{}L=w,p=i.clientX,D=i.clientY,document.addEventListener("pointermove",P),document.addEventListener("pointerup",F),k=setTimeout(()=>{clearTimeout(k),k=null;let E=L,C=p,T=D;M(),N(E,C,T)},180)}}function I(){if(R&&c!==null&&R.releasePointerCapture)try{R.releasePointerCapture(c)}catch{}R=null,c=null}function M(){clearTimeout(k),k=null,L=null,document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",F)}function P(i){if(!L)return;let l=i.clientX-p,w=i.clientY-D;Math.hypot(l,w)<=10||(M(),I())}function F(){M(),I()}function N(i,l,w){r=i,o=l,s=w,m=w;let E=i.getBoundingClientRect();b=E.top,h=E.left,n=document.createElement(i.tagName),n.className="lt-reorder-placeholder",n.style.height=`${i.offsetHeight}px`,n.style.width=`${i.offsetWidth}px`,i.after(n),i.classList.add("lt-dragging"),i.style.position="fixed",i.style.left=`${E.left}px`,i.style.width=`${E.width}px`,i.style.top=`${b}px`,i.style.zIndex="1000",document.addEventListener("pointermove",v),document.addEventListener("pointerup",_)}function U(){let i=S().filter(E=>E!==r),l=r.getBoundingClientRect(),w=null;if(a==="x"){let E=l.left+l.width/2,C=l.top+l.height/2;for(let T of i){let W=T.getBoundingClientRect(),B=W.left+W.width/2,V=W.top+W.height/2;if(Math.abs(V-C)<W.height/2?E<B:C<V){w=T;break}}}else{let E=l.top+l.height/2;for(let C of i){let T=C.getBoundingClientRect(),W=T.top+T.height/2;if(E<W){w=C;break}}}w?t.insertBefore(n,w):t.appendChild(n)}function X(){let i=m,l=window.innerHeight-m;return i<80?-16*(1-i/80):l<80?16*(1-l/80):0}function O(){if(!r){g=null;return}let i=X();if(i===0){g=null;return}window.scrollBy(0,i),U(),g=requestAnimationFrame(O)}function K(){g===null&&X()!==0&&(g=requestAnimationFrame(O))}function f(){g!==null&&(cancelAnimationFrame(g),g=null)}function v(i){if(r){if(i.preventDefault(),m=i.clientY,a==="x"){let l=i.clientX-o,w=i.clientY-s;r.style.left=`${h+l}px`,r.style.top=`${b+w}px`}else{let l=i.clientY-s;r.style.top=`${b+l}px`}U(),a==="y"&&K()}}function _(){if(!r)return;f(),n.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",_),I();let i=S().map(l=>l.dataset.reorderItem);r=null,n=null,e&&e(i)}t.addEventListener("pointerdown",q)}var Dr="joshuaegage@gmail.com";function Aa(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function n(){if(r)return;r=!0,document.removeEventListener("keydown",o),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function o(s){s.key==="Escape"&&n()}e.addEventListener("click",s=>{s.target===e&&n()}),document.addEventListener("keydown",o),e.querySelector("[data-feedback-cancel]").addEventListener("click",n),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),h=encodeURIComponent("Lift Tracker feedback"),b=encodeURIComponent(s||"(no message entered)");Je().catch(()=>{}),window.location.href=`mailto:${Dr}?subject=${h}&body=${b}`,n()})}var Kt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function ie(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Cr(t,e=new Date){let a=ie(e),r=new Date(a);r.setDate(r.getDate()+7);let n=new Set;for(let o of t){let s=new Date(o.performed_at);s>=a&&s<r&&n.add($(o.performed_at))}return n.size}function Ra(t){let e=null;for(let a of Kt)t>=a.days&&(e=a);return e}function Yt(t,e=new Date){let a=Cr(t,e);return{days:a,tier:Ra(a)}}function le(t,e=null){let a=new Map;for(let n of t){let s=ie(new Date(n.performed_at)).getTime();a.has(s)||a.set(s,new Set),a.get(s).add($(n.performed_at))}let r={};for(let n of Kt)r[n.key]=0;for(let n of a.values()){let o=Ra(n.size);o&&(r[o.key]+=1)}return Tr(r,e)}var _r={"19bf3140-6738-496f-ac0c-20e316c4c3c0":{uav:1,harrier:1}};function Tr(t,e){let a=e?_r[e]:null;if(!a)return t;let r={...t};for(let n of Object.keys(a))r[n]=(r[n]??0)+a[n];return r}function qr(t){let e=new Set;for(let a of t)e.add($(a.performed_at));return e.size}function Ar(t){let e=new Set;for(let o of t)e.add(ie(new Date(o.performed_at)).getTime());let a=Array.from(e).sort((o,s)=>o-s);if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let s=new Date(a[o-1]);s.setDate(s.getDate()+7),n=s.getTime()===a[o]?n+1:1,n>r&&(r=n)}return r}function $r(t){let e=new Set;for(let o of t)e.add($(o.performed_at));let a=Array.from(e).sort().map(o=>{let[s,h,b]=o.split("-").map(Number);return new Date(s,h-1,b)});if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let s=new Date(a[o-1]);s.setDate(s.getDate()+1),n=s.getTime()===a[o].getTime()?n+1:1,n>r&&(r=n)}return r}function Rr(t,e=null,a={}){let{hasSubmittedFeedback:r=!1}=a;return{totalDays:qr(t),tierCounts:le(t,e),longestStreak:Ar(t),totalSets:t.length,longestDayStreak:$r(t),hasSubmittedFeedback:r||Ir(e)}}var Mr=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function Ir(t){return t!=null&&Mr.has(t)}var $a=50,Wr=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-psl-god",name:"PSL God",track:"secret",description:"Log 300 total sets.",flavor:'"December 17, 2005" — ???',isUnlocked:t=>t.totalSets>=$a&&t.totalSets>=300},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=$a&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function Gt(t,e=null,a={}){let r=Rr(t,e,a);return Wr.map(n=>({id:n.id,name:n.name,track:n.track,description:n.description,flavor:n.flavor??null,theme:n.theme??null,unlocked:n.isUnlocked(r)}))}function Xt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Dt=null,ce=null;function Nr(){return Dt||(Dt=document.createElement("div"),Dt.className="lt-toast",document.body.appendChild(Dt),Dt)}function pt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let n=Nr();clearTimeout(ce),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),s=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(ce),s(),e&&e()},{once:!0}),ce=setTimeout(()=>{s(),a&&a()},r)}function wt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function ft(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function jt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function zt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var Ma="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function Jt(t){try{return window.localStorage.getItem(`${Ma}${t}`)==="true"}catch{return!1}}function rt(t){try{window.localStorage.setItem(`${Ma}${t}`,"true")}catch{}}var Ia="lt-weight-card-expanded";function Ct(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Ur(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Wa(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Na(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await Et(),n=Lt(r),o=Ea(n),s=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let h=o.change<0?"↘":o.change>0?"↗":"→",b=wt(Ia,!1);function m(){t.classList.toggle("lt-stats-row-expanded",b),b?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${Ct(o.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Ur(o.currentDate)})</span>
              <span class="lt-weight-stat-value">${Ct(o.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${h} ${Ct(Math.abs(o.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${Ct(o.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}b=!b,ft(Ia,b),m()}),b?oe(t.querySelector("[data-home-weight-canvas]"),n):se()}m()}async function Ua(t){rt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(i=>{i.addEventListener("click",()=>{i.dataset.tab!==r&&(r=i.dataset.tab,e.forEach(l=>l.setAttribute("aria-selected",String(l===i))),Object.entries(a).forEach(([l,w])=>{w.hidden=l!==r}),r==="weight"?p():K().catch(l=>console.error("[lift-tracker]",l)))})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-weight-chart-section]"),b=t.querySelector("[data-weight-canvas]"),m=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");o.value=$(new Date().toISOString());let k=[];async function L(){k=await Et(),D(),p()}function p(){let i=Lt(k);if(i.length===0){h.hidden=!0,m.hidden=!1,se();return}h.hidden=!1,m.hidden=!0,a.weight.hidden||oe(b,i)}function D(){if(k.length===0){g.innerHTML="";return}let i=k.slice().sort((l,w)=>new Date(w.logged_at)-new Date(l.logged_at));g.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Ct(Number(l.weight))} lb</span>
              <span class="lt-history-e1rm">${Wa($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>R(l.dataset.editTrigger))})}function R(i){let l=g.querySelector(`[data-entry-id="${i}"]`),w=k.find(E=>E.id===i);!l||!w||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${w.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${$(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",D),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await ga(i),await L(),pt("Weight entry deleted",{onUndo:async()=>{await ya(i),await L()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async E=>{E.preventDefault();let C=Number(l.querySelector("[data-edit-weight]").value),T=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!T)return;let W=new Date(w.logged_at),[B,V,ht]=T.split("-").map(Number);W.setFullYear(B,V-1,ht),await ha(i,{weight:C,logged_at:W.toISOString()}),await L()}))}n.addEventListener("submit",async i=>{i.preventDefault();let l=Number(s.value),w=o.value;if(!(l>=0)||!Number.isFinite(l)||!w)return;let[E,C,T]=w.split("-").map(Number),W=new Date;W.setFullYear(E,C-1,T),await ma(l,W.toISOString()),s.value="",s.focus(),o.value=$(new Date().toISOString()),await L()});let c=t.querySelector("[data-waist-form]"),S=t.querySelector("[data-waist-date-input]"),q=t.querySelector("[data-waist-input]"),I=t.querySelector("[data-waist-chart-section]"),M=t.querySelector("[data-waist-canvas]"),P=t.querySelector("[data-waist-empty]"),F=t.querySelector("[data-waist-history]");S.value=$(new Date().toISOString());let N=[],U=!1,X=null;async function O(){N=await qt(),U=!0,v(),f()}async function K(){if(U){f();return}X||(P.hidden=!1,P.textContent="Loading waist...",I.hidden=!0,X=O().finally(()=>{X=null})),await X}function f(){let i=At(N);if(i.length===0){I.hidden=!0,P.hidden=!1,P.textContent="No waist measurements yet — add your first one above.",qa();return}I.hidden=!1,P.hidden=!0,a.waist.hidden||Ta(M,i)}function v(){if(N.length===0){F.innerHTML="";return}let i=N.slice().sort((l,w)=>new Date(w.logged_at)-new Date(l.logged_at));F.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Ct(Number(l.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Wa($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),F.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>_(l.dataset.editTrigger))})}function _(i){let l=F.querySelector(`[data-entry-id="${i}"]`),w=N.find(E=>E.id===i);!l||!w||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${w.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${$(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",v),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ka(i),await O(),pt("Waist measurement deleted",{onUndo:async()=>{await va(i),await O()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async E=>{E.preventDefault();let C=Number(l.querySelector("[data-edit-waist]").value),T=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!T)return;let W=new Date(w.logged_at),[B,V,ht]=T.split("-").map(Number);W.setFullYear(B,V-1,ht),await ba(i,{waist_circumference:C,logged_at:W.toISOString()}),await O()}))}c.addEventListener("submit",async i=>{i.preventDefault();let l=Number(q.value),w=S.value;if(!(l>=0)||!Number.isFinite(l)||!w)return;let[E,C,T]=w.split("-").map(Number),W=new Date;W.setFullYear(E,C-1,T),await wa(l,W.toISOString()),q.value="",q.focus(),S.value=$(new Date().toISOString()),await O()}),await L()}var Oa="lt-seen-rank-achievements";function Qt(){let t=jt(Oa,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Pa(t){zt(Oa,JSON.stringify(t))}var de="lt-active-workout";function ue(){try{return window.localStorage.getItem(de)||null}catch{return null}}function pe(t){try{t?window.localStorage.setItem(de,t):window.localStorage.removeItem(de)}catch{}}function Ha(t){let e=ue();return e&&t.find(a=>a.id===e)||null}var Or=120,Fa="lt-default-rest-seconds",Ba="lt-lift-rest-seconds-",Va="lt-rest-timer-enabled",tt=null,fe=null,me=null,_t=0,nt=null;function Ka(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Ya(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function bt(){return wt(Va,!1)}function Ga(t){ft(Va,!!t)}function ge(){return Ka(Fa)||Or}function Xa(t){Ya(Fa,t)}function ye(t){return Ka(`${Ba}${t}`)}function ja(t,e){Ya(`${Ba}${t}`,e)}function Zt(t){return ye(t)||ge()}function we(){return tt||(tt=document.createElement("div"),tt.className="lt-rest-timer",tt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,tt.querySelector("[data-rest-add]").addEventListener("click",()=>{_t&&(_t+=30*1e3,he())}),tt.querySelector("[data-rest-skip]").addEventListener("click",za),document.body.appendChild(tt),tt)}function Pr(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function he(){let t=we(),e=_t-Date.now();t.querySelector("[data-rest-time]").textContent=Pr(e),e<=0&&Fr()}function be(){clearInterval(fe),clearTimeout(me),fe=null,me=null}function Hr(){try{Mt(),nt.state==="suspended"&&nt.resume();let t=nt.currentTime,e=nt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(nt.destination),[523.25,659.25].forEach((a,r)=>{let n=nt.createOscillator();n.type="sine",n.frequency.setValueAtTime(a,t+r*.12),n.connect(e),n.start(t+r*.12),n.stop(t+.75)})}catch{}}function Mt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;nt||=new t,nt.state==="suspended"&&nt.resume()}catch{}}function Fr(){be(),_t=0;let t=we();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",Hr(),navigator.vibrate&&navigator.vibrate([120,70,120]),me=setTimeout(za,12e3)}function za(){be(),_t=0,tt&&tt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function te({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=we();be(),_t=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,he(),fe=setInterval(he,250)}var Ja="lt-composite-expanded",ke="lt-header-menu-open";async function Qa(t){let{data:{session:e}}=await y.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,s=null;function h(d=!0){s&&(clearTimeout(s),s=null),n.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),d&&ft(ke,!1),s=setTimeout(()=>{n.hidden=!0,s=null},o)}function b({persist:d=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),n.hidden=!1,u?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),d&&ft(ke,!0)}r.addEventListener("click",()=>{n.hidden?b():h()}),n.addEventListener("click",d=>{d.target.closest("button")&&h()}),wt(ke,!1)&&b({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ke);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>Aa()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>y.auth.signOut());let L=t.querySelector("[data-composite-section]"),p=t.querySelector("[data-composite-toggle]"),D=t.querySelector("[data-composite-body]"),R=t.querySelector("[data-chevron]"),c=t.querySelector("[data-composite-summary]"),S=t.querySelector("[data-composite-discovery]");function q(d){p.setAttribute("aria-expanded",String(d)),D.hidden=!d,R.innerHTML=d?"&#9650;":"&#9660;",L.classList.toggle("lt-stats-row-expanded",d)}q(wt(Ja,!0)),p.addEventListener("click",()=>{if(rt(J.composite),S.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ge();return}let d=p.getAttribute("aria-expanded")==="true";q(!d),ft(Ja,!d)});let I=t.querySelector("[data-killstreak-icon]"),M=t.querySelector("[data-killstreak-label]"),P=t.querySelector("[data-killstreak-sub]"),F=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",je);function N(d){let{days:u,tier:x}=Yt(d);I.textContent=x?x.icon:"🎯",M.textContent=x?`${x.label} Killstreak`:"No Killstreak",P.textContent=`${u} Day streak`;let G=Gt(d).filter(j=>j.track==="rank"),A=Xt(G,Qt()).length>0;F.hidden=!A}let U=t.querySelector("[data-weight-card]");function X(){rt(J.weight),Ye()}function O(d){Na(U,{onExpand:X,...d}).catch(u=>{console.error("[lift-tracker]",u),U.classList.remove("lt-stats-row-expanded"),U.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,U.querySelector("[data-weight-expand]").addEventListener("click",X)})}let K=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{rt(J.history),K.hidden=!0,Xe()});let f=t.querySelector("[data-add-lift-form]"),v=t.querySelector("[data-add-lift-toggle]"),_=t.querySelector("[data-add-lift-discovery]"),i=t.querySelector("[data-add-lift-hint]"),l=t.querySelector("[data-create-workout-btn]"),w=t.querySelector("[data-create-workout-discovery]");v.addEventListener("click",()=>{let d=f.hidden;f.hidden=!d,v.setAttribute("aria-pressed",String(d)),v.classList.toggle("lt-add-lift-toggle-active",d),d&&f.querySelector('input[name="name"]').focus()});let E=t.querySelector("[data-lift-list]"),C=t.querySelector("[data-list-empty]");l.addEventListener("click",()=>{l.disabled||Be()});let T=t.querySelector("[data-workout-pills]"),W=t.querySelector("[data-workout-empty-hint]"),B=[],V=ue();function ht(){return V&&B.find(d=>d.id===V)||null}function Ce(){let d=ht();if(!d)return Y;let u=new Set(d.liftIds);return Y.filter(x=>u.has(x.id))}function _e(){T.innerHTML=B.map(d=>{let u=d.id===V;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of B){let u=T.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);u&&(u.textContent=d.name)}T.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let u=d.dataset.workoutPill;V=V===u?null:u,pe(V),_e(),re(Tt),$e(Tt)})}),T.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",u=>{u.stopPropagation(),Ve(d.dataset.workoutEdit)})})}let ee="lt-fast-mode",Te="lt-burst-mode";function yr(){try{let d=window.localStorage.getItem(ee);if(d!==null)return d==="true";let u=window.localStorage.getItem(Te);return u!==null?(window.localStorage.setItem(ee,u),window.localStorage.removeItem(Te),u==="true"):!1}catch{return!1}}function wr(d){try{window.localStorage.setItem(ee,String(d))}catch{}}let Y=[],ot=yr(),st=new Map,Tt=[],It=t.querySelector("[data-mode-toggle]");function qe(){It.textContent=ot?"Normal":"Fast",It.setAttribute("aria-pressed",String(ot)),It.classList.toggle("lt-mode-toggle-active",ot)}qe(),It.addEventListener("click",()=>{ot=!ot,wr(ot),qe(),re(Tt)}),f.addEventListener("submit",async d=>{d.preventDefault();let u=f.querySelector('input[name="name"]'),x=u.value.trim();if(x){u.value="",u.disabled=!0;try{await St(x,Y.length),await Ae()}finally{u.disabled=!1,u.focus()}}}),Rt(E,{onReorder:async d=>{let u=[...d],x=new Set(d),G=Y.map(A=>x.has(A.id)?u.shift():A.id);await ea(G),Y=G.map(A=>Y.find(j=>j.id===A)).filter(Boolean)}}),Rt(T,{axis:"x",onReorder:async d=>{await ca(d),B=d.map(u=>B.find(x=>x.id===u)).filter(Boolean)}});async function Ae(){B=await xt(),V&&!B.some(A=>A.id===V)&&(V=null,pe(null)),_e(),Y=await z();let d=Y.length>=2;if(_.hidden=Y.length>=2,i.hidden=Y.length!==1,l.disabled=!d,l.setAttribute("aria-disabled",String(!d)),w.hidden=!d||B.length>0,W.hidden=!d||B.length>0,Y.length===0){E.innerHTML="",C.hidden=!1,C.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",i.hidden=!0,L.hidden=!0,N([]),O({showDiscovery:!1}),K.hidden=!0,S.hidden=!0,st=new Map,Tt=[];return}let u=await et(Y.map(A=>A.id)),x=u.length>0;N(u),O({showDiscovery:x&&!Jt(J.weight)}),K.hidden=!x||Jt(J.history),st=new Map(Y.map(A=>[A.id,[]]));for(let A of u){let j=st.get(A.lift_id);j&&j.push(A)}let G=Y.map(A=>({liftId:A.id,dailySeries:gt(st.get(A.id)||[])}));re(G),$e(G)}function $e(d){let u=ht(),x=u?d.filter(Wt=>u.liftIds.includes(Wt.liftId)):d,G=Ot(x);L.hidden=!1;let A=t.querySelector("[data-composite-canvas]"),j=t.querySelector("[data-composite-empty]"),kt=t.querySelector("[data-composite-scope]"),vt=t.querySelector("[data-composite-blurb]");if(kt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",vt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",j.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",G.length===0){A.hidden=!0,j.hidden=!1,c.textContent="",S.hidden=!0;return}A.hidden=!1,j.hidden=!0,c.textContent=Sa(G[G.length-1].pct),S.hidden=Jt(J.composite),Vt(A,G)}function ae(d){let u=gt(st.get(d)||[]),x=u[u.length-1];return x?`${Math.round(x.e1rm)} lb e1RM`:"No sets yet"}function br(d){let u=st.get(d)||[];return u.length===0?"":u[u.length-1].weight}function re(d){Tt=d;let u=Ce();C.hidden=u.length>0,C.textContent=V?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",E.innerHTML=u.map(x=>ot?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${x.id}" data-lift-id="${x.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${x.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${ae(x.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Re(x.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${x.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${br(x.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${ae(x.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Re(x.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let x of Y){let A=E.querySelector(`[data-lift-id="${x.id}"]`)?.querySelector("[data-name-slot]");A&&(A.textContent=x.name)}E.querySelectorAll("[data-open-lift]").forEach(x=>{x.addEventListener("click",()=>Fe(x.dataset.openLift))}),ot&&kr()}function kr(){E.querySelectorAll("[data-fast-log-form]").forEach(d=>{let u=d.dataset.fastLogForm;d.addEventListener("submit",async x=>{x.preventDefault();let G=d.querySelector("[data-fast-weight]"),A=d.querySelector("[data-fast-reps]"),j=d.querySelector("[data-fast-feedback]"),kt=Number(G.value),vt=Number(A.value);if(!(kt>=0)||!Number.isFinite(kt)||!(vt>0)||!Number.isInteger(vt))return;let Wt=st.get(u)||[],vr=Q(kt,vt),Me=Pt(vr,Wt),Ie=new Date().toISOString();bt()&&Mt();let Sr=await at(u,kt,vt,Ie),xr=Y.find(ne=>ne.id===u);bt()&&te({seconds:Zt(u),liftName:xr?.name||""});let We=[...Wt,Sr];st.set(u,We),A.value="",A.focus();let Ne=E.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");Ne&&(Ne.textContent=ae(u));let Er=$(Ie),Ue=yt(We.filter(ne=>$(ne.performed_at)===Er));j.hidden=!1,j.classList.toggle("lt-pr",Me),j.textContent=Me?`PR! ${Math.round(Ue)} lb today`:`Logged · ${Math.round(Ue)} lb today`})})}function Re(d){return String(d).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await Ae()}async function Za(t,e){let a=await Ze(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let r=t.querySelector("[data-name-input]");r.value=a.name;let n=a.name;r.addEventListener("keydown",f=>{f.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let f=r.value.trim();if(!f||f===n){r.value=n;return}n=f,await ta(e,f)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await aa(e),H(),pt(`Deleted "${n}"`,{onUndo:async()=>{await ra(e),Nt()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(f=>{f.addEventListener("click",()=>{o.forEach(v=>v.setAttribute("aria-selected",String(v===f))),Object.entries(s).forEach(([v,_])=>{_.hidden=v!==f.dataset.tab}),f.dataset.tab==="details"&&K()})});let h=t.querySelector("[data-log-form]"),b=t.querySelector("[data-weight-input]"),m=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),k=t.querySelector("[data-default-rest-input]"),L=t.querySelector("[data-lift-rest-input]"),p=t.querySelector("[data-rest-enabled-input]"),D=t.querySelector("[data-rest-enabled-label]"),R=t.querySelector("[data-default-rest-field]"),c=t.querySelector("[data-lift-rest-field]"),S=[];function q(){k.value=ge(),L.value=ye(e)||"";let f=bt();p.checked=f,D.textContent=f?"Rest timer: On":"Rest timer: Off",k.disabled=!f,L.disabled=!f,R.classList.toggle("lt-rest-setting-field-disabled",!f),c.classList.toggle("lt-rest-setting-field-disabled",!f)}function I(f){let v=Number(f.value);return f.value===""?null:!Number.isFinite(v)||v<15?15:v>600?600:Math.round(v)}k.addEventListener("change",()=>{let f=I(k)||120;Xa(f),q()}),L.addEventListener("change",()=>{let f=I(L);ja(e,f),q()}),p.addEventListener("change",()=>{Ga(p.checked),q()});async function M(){S=await na(e)}function P(){if(S.length===0)return;let f=S[S.length-1];b.value=f.weight}h.addEventListener("submit",async f=>{f.preventDefault();let v=Number(b.value),_=Number(m.value);if(!(v>=0)||!Number.isFinite(v)||!(_>0)||!Number.isInteger(_))return;let i=Q(v,_),w=Pt(i,S),E=new Date;bt()&&Mt(),await at(e,v,_,E.toISOString()),bt()&&te({seconds:Zt(e),liftName:n}),m.value="",m.focus(),await M(),U(),s.details.hidden||K();let C=$(E.toISOString()),T=yt(S.filter(W=>$(W.performed_at)===C));g.hidden=!1,g.classList.toggle("lt-pr",w),g.textContent=w?`New PR! Today's volume: ${Math.round(T)} lb`:`Logged. Today's volume: ${Math.round(T)} lb`});function F(f){let v=new Map;for(let _ of f){let i=$(_.performed_at);v.has(i)||v.set(i,[]),v.get(i).push(_)}return Array.from(v.entries()).sort((_,i)=>i[0].localeCompare(_[0]))}function N(f){let[v,_,i]=f.split("-").map(Number);return new Date(v,_-1,i).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function U(){let f=s.history;if(S.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let v=F(S);f.innerHTML=v.map(([_,i])=>{let l=yt(i),E=i.slice().sort((C,T)=>new Date(T.performed_at)-new Date(C.performed_at)).map(C=>{let T=Math.round(Q(Number(C.weight),Number(C.reps)));return`
              <li class="lt-history-row" data-set-id="${C.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${C.id}">
                  <span class="lt-history-weight">${C.weight} lb &times; ${C.reps}</span>
                  <span class="lt-history-e1rm">${T} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${N(_)}</span>
              <span class="lt-history-volume">${Math.round(l)} lb volume</span>
            </div>
            <ul class="lt-history-list">${E}</ul>
          </div>
        `}).join(""),f.querySelectorAll("[data-edit-trigger]").forEach(_=>{_.addEventListener("click",()=>O(_.dataset.editTrigger))})}function X(f){return s.history.querySelector(`[data-set-id="${f}"]`)}function O(f){let v=X(f),_=S.find(i=>i.id===f);!v||!_||(v.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${_.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${_.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${$(_.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,v.querySelector("[data-edit-cancel]").addEventListener("click",U),v.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await ia(f),await M(),U(),s.details.hidden||K(),pt("Set deleted",{onUndo:async()=>{await la(f),await M(),U(),s.details.hidden||K()}})}),v.querySelector("[data-edit-form]").addEventListener("submit",async i=>{i.preventDefault();let l=Number(v.querySelector("[data-edit-weight]").value),w=Number(v.querySelector("[data-edit-reps]").value),E=v.querySelector("[data-edit-date]").value;if(!(l>=0)||!(w>0)||!E)return;let C=new Date(_.performed_at),[T,W,B]=E.split("-").map(Number);C.setFullYear(T,W-1,B),await sa(f,{weight:l,reps:w,performed_at:C.toISOString()}),await M(),U(),s.details.hidden||K()}))}function K(){let f=s.details,v=gt(S);if(v.length===0){f.innerHTML='<p class="lt-empty">No sets logged yet.</p>',_a();return}f.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let _=f.querySelector("[data-lift-canvas]"),i=f.querySelector("[data-point-detail]");Ca(_,v,{onPointClick:l=>{i.hidden=!1,i.textContent=`${N(l.date)}: ${l.weight} lb × ${l.reps} (${Math.round(l.e1rm)} e1RM)`}})}await M(),q(),P(),U()}var tr=60;function er(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-tr),e}function mt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ve(t,e,a=new Date,r=`last ${tr} days`,n=[],o=[]){let s=$(a.toISOString()),h=[`Lift Tracker — ${r} (as of ${s})`,""],b=t.filter(m=>(e.get(m.id)||[]).length>0);if(b.length===0)h.push("No sets logged in this period."),h.push("");else{for(let g of b){let k=(e.get(g.id)||[]).slice().sort((D,R)=>new Date(D.performed_at)-new Date(R.performed_at)),L=yt(k),p=Math.max(...k.map(D=>Q(Number(D.weight),Number(D.reps))));h.push(g.name);for(let D of k){let R=Math.round(Q(Number(D.weight),Number(D.reps)));h.push(`  ${$(D.performed_at)}: ${D.weight} lb x ${D.reps} (e1RM ${R})`)}h.push(`  Sets: ${k.length} | Volume: ${Math.round(L)} lb | Best e1RM: ${Math.round(p)}`),h.push("")}let m=t.length-b.length;m>0&&(h.push(`(${m} lift${m===1?"":"s"} with no sets in this period omitted)`),h.push(""))}if(n.length>0){h.push("Body weight");for(let p of n)h.push(`  ${p.date}: ${mt(p.weight)} lb`);let m=n[0].weight,g=n[n.length-1].weight,k=g-m,L=k>0?"+":"";h.push(`  Start: ${mt(m)} lb | Current: ${mt(g)} lb | Change: ${L}${mt(k)} lb`),h.push("")}if(o.length>0){h.push("Waist");for(let p of o)h.push(`  ${p.date}: ${mt(p.waist)} in`);let m=o[0].waist,g=o[o.length-1].waist,k=g-m,L=k>0?"+":"";h.push(`  Start: ${mt(m)} in | Current: ${mt(g)} in | Change: ${L}${mt(k)} in`),h.push("")}return h.join(`
`).trimEnd()}var Br=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Vr=`
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
`;async function ar(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Br.map(p=>`
          <section class="lt-help-section">
            <h2>${p.title}</h2>
            <p>${p.body}</p>
          </section>
          ${p.title==="Export progress"?Vr:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let D=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(D)),a.hidden=!D,r.innerHTML=D?"&#9650;":"&#9660;",!!D){e.disabled=!0;try{let R=await z(),c=R.map(O=>O.id),S=er().toISOString(),q=await oa(c,S),I=new Map(R.map(O=>[O.id,[]]));for(let O of q){let K=I.get(O.lift_id);K&&K.push(O)}let P=(await Et()).filter(O=>new Date(O.logged_at)>=new Date(S)),F=Lt(P),U=(await qt()).filter(O=>new Date(O.logged_at)>=new Date(S)),X=At(U);n.value=ve(R,I,new Date,void 0,F,X),s.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}s.hidden=!1,s.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let h=t.querySelector("[data-full-export-toggle]"),b=t.querySelector("[data-full-export-body]"),m=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),k=t.querySelector("[data-full-export-copy]"),L=t.querySelector("[data-full-export-status]");h.addEventListener("click",async()=>{let D=!(h.getAttribute("aria-expanded")==="true");if(h.setAttribute("aria-expanded",String(D)),b.hidden=!D,m.innerHTML=D?"&#9650;":"&#9660;",!!D){h.disabled=!0;try{let R=await z(),c=R.map(N=>N.id),S=await et(c),q=new Map(R.map(N=>[N.id,[]]));for(let N of S){let U=q.get(N.lift_id);U&&U.push(N)}let I=await Et(),M=Lt(I),P=await qt(),F=At(P);g.value=ve(R,q,new Date,"all-time",M,F),L.hidden=!0}finally{h.disabled=!1}}}),k.addEventListener("click",async()=>{g.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}L.hidden=!1,L.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function rr(t){rt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",H);let[e,a]=await Promise.all([z(),xt()]),r=Ha(a),n=r?e.filter(p=>r.liftIds.includes(p.id)):e,o=n.length?await et(n.map(p=>p.id)):[],s=new Map(n.map(p=>[p.id,[]]));for(let p of o){let D=s.get(p.lift_id);D&&D.push(p)}let h=n.map(p=>({liftId:p.id,dailySeries:gt(s.get(p.id)||[])})),b=Ot(h),m=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),k=t.querySelector("[data-composite-scope]"),L=t.querySelector("[data-composite-blurb]");if(k.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",L.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",b.length===0){m.hidden=!0,g.hidden=!1;return}m.hidden=!1,g.hidden=!0,Vt(m,b)}function Kr(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Yr(){let t=await z(),e=new Map(t.map(r=>[r.id,r.name]));return(await et(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Gr(t,e){let a=new Map;for(let o of e)a.has(o.liftName)||a.set(o.liftName,[]),a.get(o.liftName).push(o);let r=Array.from(a.entries()).map(([o,s])=>{let b=s.slice().sort((m,g)=>new Date(m.performed_at)-new Date(g.performed_at)).map(m=>{let g=Math.round(Q(Number(m.weight),Number(m.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${m.weight} lb &times; ${m.reps}</span>
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
        <span>${Kr(t)}</span>
        <span class="lt-history-volume">${n} lift${n===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function nr(t){rt(J.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=t.querySelector("[data-history-content]"),a=await Yr();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=xa(a);e.innerHTML=r.map(([n,o])=>Gr(n,o)).join("")}var or="lt-theme",Se="default";function xe(){return jt(or,Se)}function sr(t){!t||t===Se?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function ir(t){sr(t),zt(or,t||Se)}function lr(){sr(xe())}var Xr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},jr=["rank","mastery","streak","capstone","secret"],zr="Hidden until unlocked.";async function cr(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=await z(),a=e.length?await et(e.map(c=>c.id)):[],r=await ze(),n=await Qe(),{days:o,tier:s}=Yt(a);t.querySelector("[data-killstreak-current-icon]").textContent=s?s.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=s?`${s.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${o} Day streak`;let h=le(a,r),b=t.querySelector("[data-killstreak-tier-list]");b.innerHTML=Kt.map(c=>{let S=h[c.key];return`
      <li class="lt-killstreak-tier-row${s?.key===c.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${c.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${c.label}</span>
          <span class="lt-killstreak-tier-req">${c.days}+ day${c.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${S} earned</span>
      </li>
    `}).join("");let m=Gt(a,r,{hasSubmittedFeedback:n}),g=m.filter(c=>c.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${g} / ${m.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let k=m.filter(c=>c.track==="rank"),L=new Set(Xt(k,Qt()));Pa(k.filter(c=>c.unlocked).map(c=>c.id));let p=t.querySelector("[data-achievements]");function D(c){if(c.track!=="rank"){let P=c.track==="secret"&&!c.unlocked,F=P?" lt-achievement-card-desc-hidden":"",N=P?zr:c.description,U=c.flavor&&!P?`<span class="lt-achievement-card-flavor">${c.flavor}</span>`:"";return`
        <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc${F}">${N}</span>
            ${U}
          </span>
        </li>
      `}let S=c.unlocked&&xe()===c.theme.id,q=c.unlocked&&L.has(c.id),I=c.unlocked?`<span class="lt-achievement-card-theme">${c.theme.label} theme${S?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${c.theme.label}</span>`,M=q?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${q?" lt-achievement-card-new":""}${S?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${c.theme.id}"${c.unlocked?"":" disabled"} aria-label="${c.unlocked?`Apply the ${c.theme.label} theme`:`Locked: ${c.name}`}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc">${c.description}</span>
            ${I}
            ${M}
          </span>
        </button>
      </li>
    `}function R(){p.innerHTML=jr.map(c=>{let q=m.filter(I=>I.track===c).sort((I,M)=>Number(M.unlocked)-Number(I.unlocked)).map(D).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Xr[c]}</h3>
          ${c==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${q}</ul>
        </section>
      `}).join("")}R(),p.addEventListener("click",c=>{let S=c.target.closest("[data-apply-theme]");!S||S.disabled||(ir(S.dataset.applyTheme),R())})}var dr="__divider__";async function Ee(t,{mode:e,workoutId:a}={}){let r=e==="edit",[n,o]=await Promise.all([z(),r?da(a):Promise.resolve(null)]);if(r&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?o.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?ur(o.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let h=t.querySelector("[data-workout-name-input]"),b=t.querySelector("[data-workout-lift-list]"),m=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),k=t.querySelector("[data-workout-save-feedback]");m.hidden=n.length>0;let L=n.filter(c=>s.has(c.id)),p=n.filter(c=>!s.has(c.id));b.innerHTML=[...L.map(D),R(),...p.map(D)].join("");for(let c of n){let q=b.querySelector(`[data-lift-id="${c.id}"]`)?.querySelector("[data-name-slot]");q&&(q.textContent=c.name)}Rt(b,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await pa(a),H(),pt(`Deleted "${o.name}"`,{onUndo:async()=>{await fa(a),Nt()}}))}),g.addEventListener("click",async()=>{let c=h.value.trim();if(!c){h.focus();return}let S=Array.from(b.querySelectorAll("[data-reorder-item]")),q=S.findIndex(M=>M.dataset.reorderItem===dr),I=S.slice(0,q).map(M=>M.dataset.reorderItem);g.disabled=!0,k.hidden=!0;try{if(r)await ua(a,c,I);else{let M=await xt();await Ut(c,I,M.length)}H()}catch(M){console.error("[lift-tracker]",M),k.hidden=!1,k.textContent="Something went wrong saving the workout.",g.disabled=!1}});function D(c){return`
      <li class="lt-lift-row" data-reorder-item="${c.id}" data-lift-id="${c.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${ur(c.name)}">&#8942;&#8942;</button>
      </li>
    `}function R(){return`
      <li class="lt-workout-divider" data-reorder-item="${dr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function ur(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Jr=`${window.location.origin}${window.location.pathname}`;function Qr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Le(t){let e="signin";function a(n,o,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Qr(s||"")}">

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
    `}function r(n,o,s){t.innerHTML=a(n,o,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let h=t.querySelector("[data-auth-form]");h.addEventListener("submit",async b=>{b.preventDefault();let m=h.email.value.trim(),g=h.password.value,k=h.querySelector('button[type="submit"]');k.disabled=!0,k.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:L,error:p}=e==="signup"?await y.auth.signUp({email:m,password:g,options:{emailRedirectTo:Jr}}):await y.auth.signInWithPassword({email:m,password:g});if(p)throw p;if(e==="signup"&&!L.session){e="signin",r(null,`Account created. Check ${m} for a confirmation link, then sign in here.`,m);return}}catch(L){r(L.message||"Something went wrong. Try again.",null,m)}})}r()}function pr(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function fr(){let{data:t,error:e}=await y.auth.signInAnonymously();if(e)throw e;return await Zr(),t}async function Zr(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([St("Bench Press",0),St("Squat",1),St("Deadlift",2)]);await Promise.all([at(e.id,135,8,t(6)),at(e.id,145,6,t(2)),at(a.id,185,5,t(5)),at(a.id,195,5,t(1)),at(r.id,225,5,t(3))]),await Ut("Full Body",[e.id,a.id,r.id],0)}var Z=document.getElementById("lift-tracker-app");lr();var mr=0;async function De(){let t=++mr,e=()=>t!==mr;try{let{data:{session:a}}=await y.auth.getSession();if(e())return;if(!a)if(pr())try{if(await fr(),e())return}catch(n){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",n),await Le(Z);return}else return await Le(Z),e(),void 0;let r=He();if(r.name==="detail"?await Za(Z,r.liftId):r.name==="help"?await ar(Z):r.name==="weight"?await Ua(Z):r.name==="composite"?await rr(Z):r.name==="history"?await nr(Z):r.name==="killstreak"?await cr(Z):r.name==="workout-new"?await Ee(Z,{mode:"create"}):r.name==="workout-edit"?await Ee(Z,{mode:"edit",workoutId:r.workoutId}):await Qa(Z),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",De);var hr=null,gr=!1;y.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!gr;gr=!0;let n=a!==hr;hr=a,!(r||!n)&&(H(),De())});De();

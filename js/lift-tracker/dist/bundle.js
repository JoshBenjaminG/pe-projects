import{createClient as Sr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Ue="https://mqfsgammpsumpltfutwl.supabase.co",He="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var b=Sr(Ue,He);function Fe(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function U(){window.location.hash="#/"}function Be(t){window.location.hash=`#/lift/${t}`}function Ve(){window.location.hash="#/workout/new"}function Ke(t){window.location.hash=`#/workout/${t}/edit`}function Ye(){window.location.hash="#/help"}function Ge(){window.location.hash="#/weight"}function Xe(){window.location.hash="#/composite"}function je(){window.location.hash="#/history"}function ze(){window.location.hash="#/killstreak"}function Nt(){window.dispatchEvent(new Event("hashchange"))}async function z(){let{data:t,error:e}=await b.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Je(t){let{data:e,error:a}=await b.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function St(t,e){let{data:a,error:r}=await b.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Qe(t,e){let{data:a,error:r}=await b.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Ze(t){let e=t.map((n,o)=>b.from("lifts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function ta(t){let{error:e}=await b.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ea(t){let{error:e}=await b.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function aa(t){let{data:e,error:a}=await b.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function et(t){if(!t||t.length===0)return[];let{data:e,error:a}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ra(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function at(t,e,a,r){let{data:n,error:o}=await b.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(o)throw o;return n}async function na(t,e){let{data:a,error:r}=await b.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function oa(t){let{error:e}=await b.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function sa(t){let{error:e}=await b.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function xt(){let{data:t,error:e}=await b.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function ia(t){let e=t.map((n,o)=>b.from("workouts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function la(t){let{data:e,error:a}=await b.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Pt(t,e,a){let{data:r,error:n}=await b.from("workouts").insert({name:t,sort_order:a}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await b.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(o)throw o}return r}async function ca(t,e,a){let{error:r}=await b.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:n}=await b.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(a.length>0){let{error:o}=await b.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(o)throw o}}async function da(t){let{error:e}=await b.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ua(t){let{error:e}=await b.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Et(){let{data:t,error:e}=await b.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function pa(t,e){let{data:a,error:r}=await b.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function fa(t,e){let{data:a,error:r}=await b.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ma(t){let{error:e}=await b.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ha(t){let{error:e}=await b.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function qt(){let{data:t,error:e}=await b.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ga(t,e){let{data:a,error:r}=await b.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ya(t,e){let{data:a,error:r}=await b.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function wa(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ba(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Q(t,e){return t*(1+e/30)}function $(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${n}`}function gt(t){let e=new Map;for(let a of t){let r=$(a.performed_at),n=Q(Number(a.weight),Number(a.reps)),o=e.get(r);(!o||n>o.e1rm)&&e.set(r,{date:r,e1rm:n,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Ot(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let f of s.dailySeries)r.add(f.date);let n=Array.from(r).sort(),o=[];for(let s of n){let f=0,w=0;for(let h of e){let g=null;for(let k of h.dailySeries)if(k.date<=s)g=k;else break;g&&(f+=g.e1rm/a.get(h.liftId),w+=1)}if(w>0){let h=f/w;o.push({date:s,ratio:h,pct:(h-1)*100})}}return o}function Ut(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>Q(Number(r.weight),Number(r.reps))));return t>a}function yt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function ka(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function va(t){let e=new Map;for(let a of t){let r=$(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function Lt(t){let e=new Map;for(let a of t){let r=$(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:n})=>({date:a,weight:r,entryId:n}))}function Sa(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function At(t){let e=new Map;for(let a of t){let r=$(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:n})=>({date:a,waist:r,entryId:n}))}var $t=null,it=null,lt=null,ct=null,Bt=14,Ht="#e8242c",xa="rgba(232, 36, 44, 0.18)",Ft="#f2b134",Ea="rgba(242, 177, 52, 0.16)",dt="#9a9ca6",ut="rgba(255, 255, 255, 0.08)";function Vt(t,e,{onPointClick:a}={}){$t&&($t.destroy(),$t=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return $t=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:n,borderColor:Ht,backgroundColor:xa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),$t}function La(t,e,{onPointClick:a}={}){it&&(it.destroy(),it=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return it=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:n,borderColor:Ft,backgroundColor:Ea,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),it}function Da(){it&&(it.destroy(),it=null)}function oe(t,e,{onPointClick:a}={}){lt&&(lt.destroy(),lt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return lt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:n,borderColor:Ht,backgroundColor:xa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),lt}function se(){lt&&(lt.destroy(),lt=null)}function Ca(t,e,{onPointClick:a}={}){ct&&(ct.destroy(),ct=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return ct=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:n,borderColor:Ft,backgroundColor:Ea,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),ct}function _a(){ct&&(ct.destroy(),ct=null)}function Rt(t,{onReorder:e,axis:a="y"}={}){let r=null,n=null,o=0,s=0,f=0,w=0,h=0,g=null,k=null,E=null,p=0,c=0,_=null,D=null;function L(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function R(i){let l=i.target.closest(".lt-drag-handle");if(!l)return;let y=l.closest("[data-reorder-item]");if(y){if(i.pointerType!=="touch"){i.preventDefault(),P(y,i.clientX,i.clientY);return}if(l.setPointerCapture)try{l.setPointerCapture(i.pointerId),_=l,D=i.pointerId}catch{}E=y,p=i.clientX,c=i.clientY,document.addEventListener("pointermove",H),document.addEventListener("pointerup",Y),k=setTimeout(()=>{clearTimeout(k),k=null;let x=E,C=p,q=c;M(),P(x,C,q)},180)}}function N(){if(_&&D!==null&&_.releasePointerCapture)try{_.releasePointerCapture(D)}catch{}_=null,D=null}function M(){clearTimeout(k),k=null,E=null,document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",Y)}function H(i){if(!E)return;let l=i.clientX-p,y=i.clientY-c;Math.hypot(l,y)<=10||(M(),N())}function Y(){M(),N()}function P(i,l,y){r=i,o=l,s=y,h=y;let x=i.getBoundingClientRect();w=x.top,f=x.left,n=document.createElement(i.tagName),n.className="lt-reorder-placeholder",n.style.height=`${i.offsetHeight}px`,n.style.width=`${i.offsetWidth}px`,i.after(n),i.classList.add("lt-dragging"),i.style.position="fixed",i.style.left=`${x.left}px`,i.style.width=`${x.width}px`,i.style.top=`${w}px`,i.style.zIndex="1000",document.addEventListener("pointermove",v),document.addEventListener("pointerup",T)}function O(){let i=L().filter(x=>x!==r),l=r.getBoundingClientRect(),y=null;if(a==="x"){let x=l.left+l.width/2,C=l.top+l.height/2;for(let q of i){let I=q.getBoundingClientRect(),F=I.left+I.width/2,B=I.top+I.height/2;if(Math.abs(B-C)<I.height/2?x<F:C<B){y=q;break}}}else{let x=l.top+l.height/2;for(let C of i){let q=C.getBoundingClientRect(),I=q.top+q.height/2;if(x<I){y=C;break}}}y?t.insertBefore(n,y):t.appendChild(n)}function X(){let i=h,l=window.innerHeight-h;return i<80?-16*(1-i/80):l<80?16*(1-l/80):0}function W(){if(!r){g=null;return}let i=X();if(i===0){g=null;return}window.scrollBy(0,i),O(),g=requestAnimationFrame(W)}function V(){g===null&&X()!==0&&(g=requestAnimationFrame(W))}function m(){g!==null&&(cancelAnimationFrame(g),g=null)}function v(i){if(r){if(i.preventDefault(),h=i.clientY,a==="x"){let l=i.clientX-o,y=i.clientY-s;r.style.left=`${f+l}px`,r.style.top=`${w+y}px`}else{let l=i.clientY-s;r.style.top=`${w+l}px`}O(),a==="y"&&V()}}function T(){if(!r)return;m(),n.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",T),N();let i=L().map(l=>l.dataset.reorderItem);r=null,n=null,e&&e(i)}t.addEventListener("pointerdown",R)}var xr="joshuaegage@gmail.com";function Ta(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function n(){if(r)return;r=!0,document.removeEventListener("keydown",o),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function o(s){s.key==="Escape"&&n()}e.addEventListener("click",s=>{s.target===e&&n()}),document.addEventListener("keydown",o),e.querySelector("[data-feedback-cancel]").addEventListener("click",n),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),f=encodeURIComponent("Lift Tracker feedback"),w=encodeURIComponent(s||"(no message entered)");window.location.href=`mailto:${xr}?subject=${f}&body=${w}`,n()})}var Kt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function le(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Er(t,e=new Date){let a=le(e),r=new Date(a);r.setDate(r.getDate()+7);let n=new Set;for(let o of t){let s=new Date(o.performed_at);s>=a&&s<r&&n.add($(o.performed_at))}return n.size}function qa(t){let e=null;for(let a of Kt)t>=a.days&&(e=a);return e}function Yt(t,e=new Date){let a=Er(t,e);return{days:a,tier:qa(a)}}function ce(t){let e=new Map;for(let r of t){let o=le(new Date(r.performed_at)).getTime();e.has(o)||e.set(o,new Set),e.get(o).add($(r.performed_at))}let a={};for(let r of Kt)a[r.key]=0;for(let r of e.values()){let n=qa(r.size);n&&(a[n.key]+=1)}return a}function Lr(t){let e=new Set;for(let a of t)e.add($(a.performed_at));return e.size}function Dr(t){let e=new Set;for(let o of t)e.add(le(new Date(o.performed_at)).getTime());let a=Array.from(e).sort((o,s)=>o-s);if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let s=new Date(a[o-1]);s.setDate(s.getDate()+7),n=s.getTime()===a[o]?n+1:1,n>r&&(r=n)}return r}function Cr(t){let e=new Set;for(let o of t)e.add($(o.performed_at));let a=Array.from(e).sort().map(o=>{let[s,f,w]=o.split("-").map(Number);return new Date(s,f-1,w)});if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let s=new Date(a[o-1]);s.setDate(s.getDate()+1),n=s.getTime()===a[o].getTime()?n+1:1,n>r&&(r=n)}return r}function _r(t){return{totalDays:Lr(t),tierCounts:ce(t),longestStreak:Dr(t),totalSets:t.length,longestDayStreak:Cr(t)}}var ie=50,Tr=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",isUnlocked:()=>!1},{id:"secret-psl-god",name:"PSL God",track:"secret",description:"Log 300 total sets.",isUnlocked:t=>t.totalSets>=ie&&t.totalSets>=300},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",isUnlocked:t=>t.totalSets>=ie&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Log a set on 14 consecutive days.",isUnlocked:t=>t.totalSets>=ie&&t.longestDayStreak>=14}];function Gt(t){let e=_r(t);return Tr.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Xt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Dt=null,de=null;function qr(){return Dt||(Dt=document.createElement("div"),Dt.className="lt-toast",document.body.appendChild(Dt),Dt)}function pt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let n=qr();clearTimeout(de),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),s=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(de),s(),e&&e()},{once:!0}),de=setTimeout(()=>{s(),a&&a()},r)}function wt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function ft(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function jt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function zt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var Aa="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function Jt(t){try{return window.localStorage.getItem(`${Aa}${t}`)==="true"}catch{return!1}}function rt(t){try{window.localStorage.setItem(`${Aa}${t}`,"true")}catch{}}var $a="lt-weight-card-expanded";function Ct(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Ar(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Ra(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ma(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await Et(),n=Lt(r),o=Sa(n),s=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!o){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let f=o.change<0?"↘":o.change>0?"↗":"→",w=wt($a,!1);function h(){t.classList.toggle("lt-stats-row-expanded",w),w?t.innerHTML=`
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
              <span class="lt-weight-stat-label">Current (${Ar(o.currentDate)})</span>
              <span class="lt-weight-stat-value">${Ct(o.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${f} ${Ct(Math.abs(o.change))} lbs</span>
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
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}w=!w,ft($a,w),h()}),w?oe(t.querySelector("[data-home-weight-canvas]"),n):se()}h()}async function Ia(t){rt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(i=>{i.addEventListener("click",()=>{i.dataset.tab!==r&&(r=i.dataset.tab,e.forEach(l=>l.setAttribute("aria-selected",String(l===i))),Object.entries(a).forEach(([l,y])=>{y.hidden=l!==r}),r==="weight"?p():V().catch(l=>console.error("[lift-tracker]",l)))})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),f=t.querySelector("[data-weight-chart-section]"),w=t.querySelector("[data-weight-canvas]"),h=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");o.value=$(new Date().toISOString());let k=[];async function E(){k=await Et(),c(),p()}function p(){let i=Lt(k);if(i.length===0){f.hidden=!0,h.hidden=!1,se();return}f.hidden=!1,h.hidden=!0,a.weight.hidden||oe(w,i)}function c(){if(k.length===0){g.innerHTML="";return}let i=k.slice().sort((l,y)=>new Date(y.logged_at)-new Date(l.logged_at));g.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Ct(Number(l.weight))} lb</span>
              <span class="lt-history-e1rm">${Ra($(l.logged_at))}</span>
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
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",c),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await ma(i),await E(),pt("Weight entry deleted",{onUndo:async()=>{await ha(i),await E()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async x=>{x.preventDefault();let C=Number(l.querySelector("[data-edit-weight]").value),q=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!q)return;let I=new Date(y.logged_at),[F,B,ht]=q.split("-").map(Number);I.setFullYear(F,B-1,ht),await fa(i,{weight:C,logged_at:I.toISOString()}),await E()}))}n.addEventListener("submit",async i=>{i.preventDefault();let l=Number(s.value),y=o.value;if(!(l>=0)||!Number.isFinite(l)||!y)return;let[x,C,q]=y.split("-").map(Number),I=new Date;I.setFullYear(x,C-1,q),await pa(l,I.toISOString()),s.value="",s.focus(),o.value=$(new Date().toISOString()),await E()});let D=t.querySelector("[data-waist-form]"),L=t.querySelector("[data-waist-date-input]"),R=t.querySelector("[data-waist-input]"),N=t.querySelector("[data-waist-chart-section]"),M=t.querySelector("[data-waist-canvas]"),H=t.querySelector("[data-waist-empty]"),Y=t.querySelector("[data-waist-history]");L.value=$(new Date().toISOString());let P=[],O=!1,X=null;async function W(){P=await qt(),O=!0,v(),m()}async function V(){if(O){m();return}X||(H.hidden=!1,H.textContent="Loading waist...",N.hidden=!0,X=W().finally(()=>{X=null})),await X}function m(){let i=At(P);if(i.length===0){N.hidden=!0,H.hidden=!1,H.textContent="No waist measurements yet — add your first one above.",_a();return}N.hidden=!1,H.hidden=!0,a.waist.hidden||Ca(M,i)}function v(){if(P.length===0){Y.innerHTML="";return}let i=P.slice().sort((l,y)=>new Date(y.logged_at)-new Date(l.logged_at));Y.innerHTML=i.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${Ct(Number(l.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Ra($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),Y.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>T(l.dataset.editTrigger))})}function T(i){let l=Y.querySelector(`[data-entry-id="${i}"]`),y=P.find(x=>x.id===i);!l||!y||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${y.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${$(y.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",v),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await wa(i),await W(),pt("Waist measurement deleted",{onUndo:async()=>{await ba(i),await W()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async x=>{x.preventDefault();let C=Number(l.querySelector("[data-edit-waist]").value),q=l.querySelector("[data-edit-date]").value;if(!(C>=0)||!q)return;let I=new Date(y.logged_at),[F,B,ht]=q.split("-").map(Number);I.setFullYear(F,B-1,ht),await ya(i,{waist_circumference:C,logged_at:I.toISOString()}),await W()}))}D.addEventListener("submit",async i=>{i.preventDefault();let l=Number(R.value),y=L.value;if(!(l>=0)||!Number.isFinite(l)||!y)return;let[x,C,q]=y.split("-").map(Number),I=new Date;I.setFullYear(x,C-1,q),await ga(l,I.toISOString()),R.value="",R.focus(),L.value=$(new Date().toISOString()),await W()}),await E()}var Wa="lt-seen-rank-achievements";function Qt(){let t=jt(Wa,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Na(t){zt(Wa,JSON.stringify(t))}var ue="lt-active-workout";function pe(){try{return window.localStorage.getItem(ue)||null}catch{return null}}function fe(t){try{t?window.localStorage.setItem(ue,t):window.localStorage.removeItem(ue)}catch{}}function Pa(t){let e=pe();return e&&t.find(a=>a.id===e)||null}var $r=120,Oa="lt-default-rest-seconds",Ua="lt-lift-rest-seconds-",Ha="lt-rest-timer-enabled",tt=null,me=null,he=null,_t=0,nt=null;function Fa(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Ba(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function bt(){return wt(Ha,!1)}function Va(t){ft(Ha,!!t)}function ye(){return Fa(Oa)||$r}function Ka(t){Ba(Oa,t)}function we(t){return Fa(`${Ua}${t}`)}function Ya(t,e){Ba(`${Ua}${t}`,e)}function Zt(t){return we(t)||ye()}function be(){return tt||(tt=document.createElement("div"),tt.className="lt-rest-timer",tt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,tt.querySelector("[data-rest-add]").addEventListener("click",()=>{_t&&(_t+=30*1e3,ge())}),tt.querySelector("[data-rest-skip]").addEventListener("click",Ga),document.body.appendChild(tt),tt)}function Rr(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function ge(){let t=be(),e=_t-Date.now();t.querySelector("[data-rest-time]").textContent=Rr(e),e<=0&&Ir()}function ke(){clearInterval(me),clearTimeout(he),me=null,he=null}function Mr(){try{Mt(),nt.state==="suspended"&&nt.resume();let t=nt.currentTime,e=nt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(nt.destination),[523.25,659.25].forEach((a,r)=>{let n=nt.createOscillator();n.type="sine",n.frequency.setValueAtTime(a,t+r*.12),n.connect(e),n.start(t+r*.12),n.stop(t+.75)})}catch{}}function Mt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;nt||=new t,nt.state==="suspended"&&nt.resume()}catch{}}function Ir(){ke(),_t=0;let t=be();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",Mr(),navigator.vibrate&&navigator.vibrate([120,70,120]),he=setTimeout(Ga,12e3)}function Ga(){ke(),_t=0,tt&&tt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function te({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=be();ke(),_t=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,ge(),me=setInterval(ge,250)}var Xa="lt-composite-expanded",ve="lt-header-menu-open";async function ja(t){let{data:{session:e}}=await b.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,s=null;function f(d=!0){s&&(clearTimeout(s),s=null),n.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),d&&ft(ve,!1),s=setTimeout(()=>{n.hidden=!0,s=null},o)}function w({persist:d=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),n.hidden=!1,u?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),d&&ft(ve,!0)}r.addEventListener("click",()=>{n.hidden?w():f()}),n.addEventListener("click",d=>{d.target.closest("button")&&f()}),wt(ve,!1)&&w({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ye);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>Ta()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>b.auth.signOut());let E=t.querySelector("[data-composite-section]"),p=t.querySelector("[data-composite-toggle]"),c=t.querySelector("[data-composite-body]"),_=t.querySelector("[data-chevron]"),D=t.querySelector("[data-composite-summary]"),L=t.querySelector("[data-composite-discovery]");function R(d){p.setAttribute("aria-expanded",String(d)),c.hidden=!d,_.innerHTML=d?"&#9650;":"&#9660;",E.classList.toggle("lt-stats-row-expanded",d)}R(wt(Xa,!0)),p.addEventListener("click",()=>{if(rt(J.composite),L.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Xe();return}let d=p.getAttribute("aria-expanded")==="true";R(!d),ft(Xa,!d)});let N=t.querySelector("[data-killstreak-icon]"),M=t.querySelector("[data-killstreak-label]"),H=t.querySelector("[data-killstreak-sub]"),Y=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",ze);function P(d){let{days:u,tier:S}=Yt(d);N.textContent=S?S.icon:"🎯",M.textContent=S?`${S.label} Killstreak`:"No Killstreak",H.textContent=`${u} Day streak`;let G=Gt(d).filter(j=>j.track==="rank"),A=Xt(G,Qt()).length>0;Y.hidden=!A}let O=t.querySelector("[data-weight-card]");function X(){rt(J.weight),Ge()}function W(d){Ma(O,{onExpand:X,...d}).catch(u=>{console.error("[lift-tracker]",u),O.classList.remove("lt-stats-row-expanded"),O.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,O.querySelector("[data-weight-expand]").addEventListener("click",X)})}let V=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{rt(J.history),V.hidden=!0,je()});let m=t.querySelector("[data-add-lift-form]"),v=t.querySelector("[data-add-lift-toggle]"),T=t.querySelector("[data-add-lift-discovery]"),i=t.querySelector("[data-add-lift-hint]"),l=t.querySelector("[data-create-workout-btn]"),y=t.querySelector("[data-create-workout-discovery]");v.addEventListener("click",()=>{let d=m.hidden;m.hidden=!d,v.setAttribute("aria-pressed",String(d)),v.classList.toggle("lt-add-lift-toggle-active",d),d&&m.querySelector('input[name="name"]').focus()});let x=t.querySelector("[data-lift-list]"),C=t.querySelector("[data-list-empty]");l.addEventListener("click",()=>{l.disabled||Ve()});let q=t.querySelector("[data-workout-pills]"),I=t.querySelector("[data-workout-empty-hint]"),F=[],B=pe();function ht(){return B&&F.find(d=>d.id===B)||null}function _e(){let d=ht();if(!d)return K;let u=new Set(d.liftIds);return K.filter(S=>u.has(S.id))}function Te(){q.innerHTML=F.map(d=>{let u=d.id===B;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of F){let u=q.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);u&&(u.textContent=d.name)}q.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let u=d.dataset.workoutPill;B=B===u?null:u,fe(B),Te(),re(Tt),Re(Tt)})}),q.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",u=>{u.stopPropagation(),Ke(d.dataset.workoutEdit)})})}let ee="lt-fast-mode",qe="lt-burst-mode";function mr(){try{let d=window.localStorage.getItem(ee);if(d!==null)return d==="true";let u=window.localStorage.getItem(qe);return u!==null?(window.localStorage.setItem(ee,u),window.localStorage.removeItem(qe),u==="true"):!1}catch{return!1}}function hr(d){try{window.localStorage.setItem(ee,String(d))}catch{}}let K=[],ot=mr(),st=new Map,Tt=[],It=t.querySelector("[data-mode-toggle]");function Ae(){It.textContent=ot?"Normal":"Fast",It.setAttribute("aria-pressed",String(ot)),It.classList.toggle("lt-mode-toggle-active",ot)}Ae(),It.addEventListener("click",()=>{ot=!ot,hr(ot),Ae(),re(Tt)}),m.addEventListener("submit",async d=>{d.preventDefault();let u=m.querySelector('input[name="name"]'),S=u.value.trim();if(S){u.value="",u.disabled=!0;try{await St(S,K.length),await $e()}finally{u.disabled=!1,u.focus()}}}),Rt(x,{onReorder:async d=>{let u=[...d],S=new Set(d),G=K.map(A=>S.has(A.id)?u.shift():A.id);await Ze(G),K=G.map(A=>K.find(j=>j.id===A)).filter(Boolean)}}),Rt(q,{axis:"x",onReorder:async d=>{await ia(d),F=d.map(u=>F.find(S=>S.id===u)).filter(Boolean)}});async function $e(){F=await xt(),B&&!F.some(A=>A.id===B)&&(B=null,fe(null)),Te(),K=await z();let d=K.length>=2;if(T.hidden=K.length>=2,i.hidden=K.length!==1,l.disabled=!d,l.setAttribute("aria-disabled",String(!d)),y.hidden=!d||F.length>0,I.hidden=!d||F.length>0,K.length===0){x.innerHTML="",C.hidden=!1,C.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",i.hidden=!0,E.hidden=!0,P([]),W({showDiscovery:!1}),V.hidden=!0,L.hidden=!0,st=new Map,Tt=[];return}let u=await et(K.map(A=>A.id)),S=u.length>0;P(u),W({showDiscovery:S&&!Jt(J.weight)}),V.hidden=!S||Jt(J.history),st=new Map(K.map(A=>[A.id,[]]));for(let A of u){let j=st.get(A.lift_id);j&&j.push(A)}let G=K.map(A=>({liftId:A.id,dailySeries:gt(st.get(A.id)||[])}));re(G),Re(G)}function Re(d){let u=ht(),S=u?d.filter(Wt=>u.liftIds.includes(Wt.liftId)):d,G=Ot(S);E.hidden=!1;let A=t.querySelector("[data-composite-canvas]"),j=t.querySelector("[data-composite-empty]"),kt=t.querySelector("[data-composite-scope]"),vt=t.querySelector("[data-composite-blurb]");if(kt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",vt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",j.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",G.length===0){A.hidden=!0,j.hidden=!1,D.textContent="",L.hidden=!0;return}A.hidden=!1,j.hidden=!0,D.textContent=ka(G[G.length-1].pct),L.hidden=Jt(J.composite),Vt(A,G)}function ae(d){let u=gt(st.get(d)||[]),S=u[u.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function gr(d){let u=st.get(d)||[];return u.length===0?"":u[u.length-1].weight}function re(d){Tt=d;let u=_e();C.hidden=u.length>0,C.textContent=B?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",x.innerHTML=u.map(S=>ot?`
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
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${gr(S.id)}" data-fast-weight />
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
        `).join("");for(let S of K){let A=x.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");A&&(A.textContent=S.name)}x.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Be(S.dataset.openLift))}),ot&&yr()}function yr(){x.querySelectorAll("[data-fast-log-form]").forEach(d=>{let u=d.dataset.fastLogForm;d.addEventListener("submit",async S=>{S.preventDefault();let G=d.querySelector("[data-fast-weight]"),A=d.querySelector("[data-fast-reps]"),j=d.querySelector("[data-fast-feedback]"),kt=Number(G.value),vt=Number(A.value);if(!(kt>=0)||!Number.isFinite(kt)||!(vt>0)||!Number.isInteger(vt))return;let Wt=st.get(u)||[],wr=Q(kt,vt),Ie=Ut(wr,Wt),We=new Date().toISOString();bt()&&Mt();let br=await at(u,kt,vt,We),kr=K.find(ne=>ne.id===u);bt()&&te({seconds:Zt(u),liftName:kr?.name||""});let Ne=[...Wt,br];st.set(u,Ne),A.value="",A.focus();let Pe=x.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");Pe&&(Pe.textContent=ae(u));let vr=$(We),Oe=yt(Ne.filter(ne=>$(ne.performed_at)===vr));j.hidden=!1,j.classList.toggle("lt-pr",Ie),j.textContent=Ie?`PR! ${Math.round(Oe)} lb today`:`Logged · ${Math.round(Oe)} lb today`})})}function Me(d){return String(d).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await $e()}async function za(t,e){let a=await Je(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let r=t.querySelector("[data-name-input]");r.value=a.name;let n=a.name;r.addEventListener("keydown",m=>{m.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let m=r.value.trim();if(!m||m===n){r.value=n;return}n=m,await Qe(e,m)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await ta(e),U(),pt(`Deleted "${n}"`,{onUndo:async()=>{await ea(e),Nt()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(m=>{m.addEventListener("click",()=>{o.forEach(v=>v.setAttribute("aria-selected",String(v===m))),Object.entries(s).forEach(([v,T])=>{T.hidden=v!==m.dataset.tab}),m.dataset.tab==="details"&&V()})});let f=t.querySelector("[data-log-form]"),w=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),k=t.querySelector("[data-default-rest-input]"),E=t.querySelector("[data-lift-rest-input]"),p=t.querySelector("[data-rest-enabled-input]"),c=t.querySelector("[data-rest-enabled-label]"),_=t.querySelector("[data-default-rest-field]"),D=t.querySelector("[data-lift-rest-field]"),L=[];function R(){k.value=ye(),E.value=we(e)||"";let m=bt();p.checked=m,c.textContent=m?"Rest timer: On":"Rest timer: Off",k.disabled=!m,E.disabled=!m,_.classList.toggle("lt-rest-setting-field-disabled",!m),D.classList.toggle("lt-rest-setting-field-disabled",!m)}function N(m){let v=Number(m.value);return m.value===""?null:!Number.isFinite(v)||v<15?15:v>600?600:Math.round(v)}k.addEventListener("change",()=>{let m=N(k)||120;Ka(m),R()}),E.addEventListener("change",()=>{let m=N(E);Ya(e,m),R()}),p.addEventListener("change",()=>{Va(p.checked),R()});async function M(){L=await aa(e)}function H(){if(L.length===0)return;let m=L[L.length-1];w.value=m.weight}f.addEventListener("submit",async m=>{m.preventDefault();let v=Number(w.value),T=Number(h.value);if(!(v>=0)||!Number.isFinite(v)||!(T>0)||!Number.isInteger(T))return;let i=Q(v,T),y=Ut(i,L),x=new Date;bt()&&Mt(),await at(e,v,T,x.toISOString()),bt()&&te({seconds:Zt(e),liftName:n}),h.value="",h.focus(),await M(),O(),s.details.hidden||V();let C=$(x.toISOString()),q=yt(L.filter(I=>$(I.performed_at)===C));g.hidden=!1,g.classList.toggle("lt-pr",y),g.textContent=y?`New PR! Today's volume: ${Math.round(q)} lb`:`Logged. Today's volume: ${Math.round(q)} lb`});function Y(m){let v=new Map;for(let T of m){let i=$(T.performed_at);v.has(i)||v.set(i,[]),v.get(i).push(T)}return Array.from(v.entries()).sort((T,i)=>i[0].localeCompare(T[0]))}function P(m){let[v,T,i]=m.split("-").map(Number);return new Date(v,T-1,i).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function O(){let m=s.history;if(L.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let v=Y(L);m.innerHTML=v.map(([T,i])=>{let l=yt(i),x=i.slice().sort((C,q)=>new Date(q.performed_at)-new Date(C.performed_at)).map(C=>{let q=Math.round(Q(Number(C.weight),Number(C.reps)));return`
              <li class="lt-history-row" data-set-id="${C.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${C.id}">
                  <span class="lt-history-weight">${C.weight} lb &times; ${C.reps}</span>
                  <span class="lt-history-e1rm">${q} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${P(T)}</span>
              <span class="lt-history-volume">${Math.round(l)} lb volume</span>
            </div>
            <ul class="lt-history-list">${x}</ul>
          </div>
        `}).join(""),m.querySelectorAll("[data-edit-trigger]").forEach(T=>{T.addEventListener("click",()=>W(T.dataset.editTrigger))})}function X(m){return s.history.querySelector(`[data-set-id="${m}"]`)}function W(m){let v=X(m),T=L.find(i=>i.id===m);!v||!T||(v.innerHTML=`
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
    `,v.querySelector("[data-edit-cancel]").addEventListener("click",O),v.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await oa(m),await M(),O(),s.details.hidden||V(),pt("Set deleted",{onUndo:async()=>{await sa(m),await M(),O(),s.details.hidden||V()}})}),v.querySelector("[data-edit-form]").addEventListener("submit",async i=>{i.preventDefault();let l=Number(v.querySelector("[data-edit-weight]").value),y=Number(v.querySelector("[data-edit-reps]").value),x=v.querySelector("[data-edit-date]").value;if(!(l>=0)||!(y>0)||!x)return;let C=new Date(T.performed_at),[q,I,F]=x.split("-").map(Number);C.setFullYear(q,I-1,F),await na(m,{weight:l,reps:y,performed_at:C.toISOString()}),await M(),O(),s.details.hidden||V()}))}function V(){let m=s.details,v=gt(L);if(v.length===0){m.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Da();return}m.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let T=m.querySelector("[data-lift-canvas]"),i=m.querySelector("[data-point-detail]");La(T,v,{onPointClick:l=>{i.hidden=!1,i.textContent=`${P(l.date)}: ${l.weight} lb × ${l.reps} (${Math.round(l.e1rm)} e1RM)`}})}await M(),R(),H(),O()}var Ja=60;function Qa(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Ja),e}function mt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Se(t,e,a=new Date,r=`last ${Ja} days`,n=[],o=[]){let s=$(a.toISOString()),f=[`Lift Tracker — ${r} (as of ${s})`,""],w=t.filter(h=>(e.get(h.id)||[]).length>0);if(w.length===0)f.push("No sets logged in this period."),f.push("");else{for(let g of w){let k=(e.get(g.id)||[]).slice().sort((c,_)=>new Date(c.performed_at)-new Date(_.performed_at)),E=yt(k),p=Math.max(...k.map(c=>Q(Number(c.weight),Number(c.reps))));f.push(g.name);for(let c of k){let _=Math.round(Q(Number(c.weight),Number(c.reps)));f.push(`  ${$(c.performed_at)}: ${c.weight} lb x ${c.reps} (e1RM ${_})`)}f.push(`  Sets: ${k.length} | Volume: ${Math.round(E)} lb | Best e1RM: ${Math.round(p)}`),f.push("")}let h=t.length-w.length;h>0&&(f.push(`(${h} lift${h===1?"":"s"} with no sets in this period omitted)`),f.push(""))}if(n.length>0){f.push("Body weight");for(let p of n)f.push(`  ${p.date}: ${mt(p.weight)} lb`);let h=n[0].weight,g=n[n.length-1].weight,k=g-h,E=k>0?"+":"";f.push(`  Start: ${mt(h)} lb | Current: ${mt(g)} lb | Change: ${E}${mt(k)} lb`),f.push("")}if(o.length>0){f.push("Waist");for(let p of o)f.push(`  ${p.date}: ${mt(p.waist)} in`);let h=o[0].waist,g=o[o.length-1].waist,k=g-h,E=k>0?"+":"";f.push(`  Start: ${mt(h)} in | Current: ${mt(g)} in | Change: ${E}${mt(k)} in`),f.push("")}return f.join(`
`).trimEnd()}var Wr=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Nr=`
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
`;async function Za(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Wr.map(p=>`
          <section class="lt-help-section">
            <h2>${p.title}</h2>
            <p>${p.body}</p>
          </section>
          ${p.title==="Export progress"?Nr:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let c=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(c)),a.hidden=!c,r.innerHTML=c?"&#9650;":"&#9660;",!!c){e.disabled=!0;try{let _=await z(),D=_.map(W=>W.id),L=Qa().toISOString(),R=await ra(D,L),N=new Map(_.map(W=>[W.id,[]]));for(let W of R){let V=N.get(W.lift_id);V&&V.push(W)}let H=(await Et()).filter(W=>new Date(W.logged_at)>=new Date(L)),Y=Lt(H),O=(await qt()).filter(W=>new Date(W.logged_at)>=new Date(L)),X=At(O);n.value=Se(_,N,new Date,void 0,Y,X),s.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}s.hidden=!1,s.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let f=t.querySelector("[data-full-export-toggle]"),w=t.querySelector("[data-full-export-body]"),h=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),k=t.querySelector("[data-full-export-copy]"),E=t.querySelector("[data-full-export-status]");f.addEventListener("click",async()=>{let c=!(f.getAttribute("aria-expanded")==="true");if(f.setAttribute("aria-expanded",String(c)),w.hidden=!c,h.innerHTML=c?"&#9650;":"&#9660;",!!c){f.disabled=!0;try{let _=await z(),D=_.map(P=>P.id),L=await et(D),R=new Map(_.map(P=>[P.id,[]]));for(let P of L){let O=R.get(P.lift_id);O&&O.push(P)}let N=await Et(),M=Lt(N),H=await qt(),Y=At(H);g.value=Se(_,R,new Date,"all-time",M,Y),E.hidden=!0}finally{f.disabled=!1}}}),k.addEventListener("click",async()=>{g.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}E.hidden=!1,E.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function tr(t){rt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",U);let[e,a]=await Promise.all([z(),xt()]),r=Pa(a),n=r?e.filter(p=>r.liftIds.includes(p.id)):e,o=n.length?await et(n.map(p=>p.id)):[],s=new Map(n.map(p=>[p.id,[]]));for(let p of o){let c=s.get(p.lift_id);c&&c.push(p)}let f=n.map(p=>({liftId:p.id,dailySeries:gt(s.get(p.id)||[])})),w=Ot(f),h=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),k=t.querySelector("[data-composite-scope]"),E=t.querySelector("[data-composite-blurb]");if(k.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",E.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",w.length===0){h.hidden=!0,g.hidden=!1;return}h.hidden=!1,g.hidden=!0,Vt(h,w)}function Pr(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Or(){let t=await z(),e=new Map(t.map(r=>[r.id,r.name]));return(await et(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Ur(t,e){let a=new Map;for(let o of e)a.has(o.liftName)||a.set(o.liftName,[]),a.get(o.liftName).push(o);let r=Array.from(a.entries()).map(([o,s])=>{let w=s.slice().sort((h,g)=>new Date(h.performed_at)-new Date(g.performed_at)).map(h=>{let g=Math.round(Q(Number(h.weight),Number(h.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${h.weight} lb &times; ${h.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${o}</div>
          <ul class="lt-history-list">${w}</ul>
        </div>
      `}).join(""),n=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Pr(t)}</span>
        <span class="lt-history-volume">${n} lift${n===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function er(t){rt(J.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=t.querySelector("[data-history-content]"),a=await Or();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=va(a);e.innerHTML=r.map(([n,o])=>Ur(n,o)).join("")}var ar="lt-theme",xe="default";function Ee(){return jt(ar,xe)}function rr(t){!t||t===xe?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function nr(t){rr(t),zt(ar,t||xe)}function or(){rr(Ee())}var Hr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},Fr=["rank","mastery","streak","capstone","secret"],Br="Hidden until unlocked.";async function sr(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let e=await z(),a=e.length?await et(e.map(c=>c.id)):[],{days:r,tier:n}=Yt(a);t.querySelector("[data-killstreak-current-icon]").textContent=n?n.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=n?`${n.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let o=ce(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Kt.map(c=>{let _=o[c.key];return`
      <li class="lt-killstreak-tier-row${n?.key===c.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${c.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${c.label}</span>
          <span class="lt-killstreak-tier-req">${c.days}+ day${c.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${_} earned</span>
      </li>
    `}).join("");let f=Gt(a),w=f.filter(c=>c.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${w} / ${f.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let h=f.filter(c=>c.track==="rank"),g=new Set(Xt(h,Qt()));Na(h.filter(c=>c.unlocked).map(c=>c.id));let k=t.querySelector("[data-achievements]");function E(c){if(c.track!=="rank"){let N=c.track==="secret"&&!c.unlocked,M=N?" lt-achievement-card-desc-hidden":"",H=N?Br:c.description;return`
        <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc${M}">${H}</span>
          </span>
        </li>
      `}let _=c.unlocked&&Ee()===c.theme.id,D=c.unlocked&&g.has(c.id),L=c.unlocked?`<span class="lt-achievement-card-theme">${c.theme.label} theme${_?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${c.theme.label}</span>`,R=D?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${c.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${D?" lt-achievement-card-new":""}${_?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${c.theme.id}"${c.unlocked?"":" disabled"} aria-label="${c.unlocked?`Apply the ${c.theme.label} theme`:`Locked: ${c.name}`}">
          <span class="lt-achievement-card-icon">${c.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${c.name}</span>
            <span class="lt-achievement-card-desc">${c.description}</span>
            ${L}
            ${R}
          </span>
        </button>
      </li>
    `}function p(){k.innerHTML=Fr.map(c=>{let D=f.filter(L=>L.track===c).sort((L,R)=>Number(R.unlocked)-Number(L.unlocked)).map(E).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Hr[c]}</h3>
          ${c==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${D}</ul>
        </section>
      `}).join("")}p(),k.addEventListener("click",c=>{let _=c.target.closest("[data-apply-theme]");!_||_.disabled||(nr(_.dataset.applyTheme),p())})}var ir="__divider__";async function Le(t,{mode:e,workoutId:a}={}){let r=e==="edit",[n,o]=await Promise.all([z(),r?la(a):Promise.resolve(null)]);if(r&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?o.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?lr(o.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",U);let f=t.querySelector("[data-workout-name-input]"),w=t.querySelector("[data-workout-lift-list]"),h=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),k=t.querySelector("[data-workout-save-feedback]");h.hidden=n.length>0;let E=n.filter(D=>s.has(D.id)),p=n.filter(D=>!s.has(D.id));w.innerHTML=[...E.map(c),_(),...p.map(c)].join("");for(let D of n){let R=w.querySelector(`[data-lift-id="${D.id}"]`)?.querySelector("[data-name-slot]");R&&(R.textContent=D.name)}Rt(w,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await da(a),U(),pt(`Deleted "${o.name}"`,{onUndo:async()=>{await ua(a),Nt()}}))}),g.addEventListener("click",async()=>{let D=f.value.trim();if(!D){f.focus();return}let L=Array.from(w.querySelectorAll("[data-reorder-item]")),R=L.findIndex(M=>M.dataset.reorderItem===ir),N=L.slice(0,R).map(M=>M.dataset.reorderItem);g.disabled=!0,k.hidden=!0;try{if(r)await ca(a,D,N);else{let M=await xt();await Pt(D,N,M.length)}U()}catch(M){console.error("[lift-tracker]",M),k.hidden=!1,k.textContent="Something went wrong saving the workout.",g.disabled=!1}});function c(D){return`
      <li class="lt-lift-row" data-reorder-item="${D.id}" data-lift-id="${D.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${lr(D.name)}">&#8942;&#8942;</button>
      </li>
    `}function _(){return`
      <li class="lt-workout-divider" data-reorder-item="${ir}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function lr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Vr=`${window.location.origin}${window.location.pathname}`;function Kr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function De(t){let e="signin";function a(n,o,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Kr(s||"")}">

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
    `}function r(n,o,s){t.innerHTML=a(n,o,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let f=t.querySelector("[data-auth-form]");f.addEventListener("submit",async w=>{w.preventDefault();let h=f.email.value.trim(),g=f.password.value,k=f.querySelector('button[type="submit"]');k.disabled=!0,k.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:E,error:p}=e==="signup"?await b.auth.signUp({email:h,password:g,options:{emailRedirectTo:Vr}}):await b.auth.signInWithPassword({email:h,password:g});if(p)throw p;if(e==="signup"&&!E.session){e="signin",r(null,`Account created. Check ${h} for a confirmation link, then sign in here.`,h);return}}catch(E){r(E.message||"Something went wrong. Try again.",null,h)}})}r()}function cr(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function dr(){let{data:t,error:e}=await b.auth.signInAnonymously();if(e)throw e;return await Yr(),t}async function Yr(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([St("Bench Press",0),St("Squat",1),St("Deadlift",2)]);await Promise.all([at(e.id,135,8,t(6)),at(e.id,145,6,t(2)),at(a.id,185,5,t(5)),at(a.id,195,5,t(1)),at(r.id,225,5,t(3))]),await Pt("Full Body",[e.id,a.id,r.id],0)}var Z=document.getElementById("lift-tracker-app");or();var ur=0;async function Ce(){let t=++ur,e=()=>t!==ur;try{let{data:{session:a}}=await b.auth.getSession();if(e())return;if(!a)if(cr())try{if(await dr(),e())return}catch(n){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",n),await De(Z);return}else return await De(Z),e(),void 0;let r=Fe();if(r.name==="detail"?await za(Z,r.liftId):r.name==="help"?await Za(Z):r.name==="weight"?await Ia(Z):r.name==="composite"?await tr(Z):r.name==="history"?await er(Z):r.name==="killstreak"?await sr(Z):r.name==="workout-new"?await Le(Z,{mode:"create"}):r.name==="workout-edit"?await Le(Z,{mode:"edit",workoutId:r.workoutId}):await ja(Z),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",Ce);var pr=null,fr=!1;b.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!fr;fr=!0;let n=a!==pr;pr=a,!(r||!n)&&(U(),Ce())});Ce();

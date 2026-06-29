import{createClient as vr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Pe="https://mqfsgammpsumpltfutwl.supabase.co",Ue="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var b=vr(Pe,Ue);function He(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function F(){window.location.hash="#/"}function Fe(t){window.location.hash=`#/lift/${t}`}function Be(){window.location.hash="#/workout/new"}function Ve(t){window.location.hash=`#/workout/${t}/edit`}function Ke(){window.location.hash="#/help"}function Ye(){window.location.hash="#/weight"}function Ge(){window.location.hash="#/composite"}function Xe(){window.location.hash="#/history"}function je(){window.location.hash="#/killstreak"}function Nt(){window.dispatchEvent(new Event("hashchange"))}async function z(){let{data:t,error:e}=await b.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function ze(t){let{data:e,error:a}=await b.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function St(t,e){let{data:a,error:r}=await b.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Je(t,e){let{data:a,error:r}=await b.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Qe(t){let e=t.map((n,o)=>b.from("lifts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function Ze(t){let{error:e}=await b.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ta(t){let{error:e}=await b.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ea(t){let{data:e,error:a}=await b.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function et(t){if(!t||t.length===0)return[];let{data:e,error:a}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function aa(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await b.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function at(t,e,a,r){let{data:n,error:o}=await b.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(o)throw o;return n}async function ra(t,e){let{data:a,error:r}=await b.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function na(t){let{error:e}=await b.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function oa(t){let{error:e}=await b.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function xt(){let{data:t,error:e}=await b.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function sa(t){let e=t.map((n,o)=>b.from("workouts").update({sort_order:o}).eq("id",n)),r=(await Promise.all(e)).find(n=>n.error);if(r)throw r.error}async function ia(t){let{data:e,error:a}=await b.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Ot(t,e,a){let{data:r,error:n}=await b.from("workouts").insert({name:t,sort_order:a}).select().single();if(n)throw n;if(e.length>0){let{error:o}=await b.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(o)throw o}return r}async function la(t,e,a){let{error:r}=await b.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:n}=await b.from("workout_lifts").delete().eq("workout_id",t);if(n)throw n;if(a.length>0){let{error:o}=await b.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(o)throw o}}async function ca(t){let{error:e}=await b.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function da(t){let{error:e}=await b.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Et(){let{data:t,error:e}=await b.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ua(t,e){let{data:a,error:r}=await b.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function pa(t,e){let{data:a,error:r}=await b.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function fa(t){let{error:e}=await b.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ma(t){let{error:e}=await b.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function qt(){let{data:t,error:e}=await b.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ha(t,e){let{data:a,error:r}=await b.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ga(t,e){let{data:a,error:r}=await b.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ya(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function wa(t){let{error:e}=await b.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function Q(t,e){return t*(1+e/30)}function A(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${n}`}function gt(t){let e=new Map;for(let a of t){let r=A(a.performed_at),n=Q(Number(a.weight),Number(a.reps)),o=e.get(r);(!o||n>o.e1rm)&&e.set(r,{date:r,e1rm:n,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Pt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let f of s.dailySeries)r.add(f.date);let n=Array.from(r).sort(),o=[];for(let s of n){let f=0,k=0;for(let h of e){let y=null;for(let v of h.dailySeries)if(v.date<=s)y=v;else break;y&&(f+=y.e1rm/a.get(h.liftId),k+=1)}if(k>0){let h=f/k;o.push({date:s,ratio:h,pct:(h-1)*100})}}return o}function Ut(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>Q(Number(r.weight),Number(r.reps))));return t>a}function yt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function ba(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function ka(t){let e=new Map;for(let a of t){let r=A(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function Lt(t){let e=new Map;for(let a of t){let r=A(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:n})=>({date:a,weight:r,entryId:n}))}function va(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function At(t){let e=new Map;for(let a of t){let r=A(a.logged_at),n=e.get(r);(!n||new Date(a.created_at||0)>=new Date(n.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:n})=>({date:a,waist:r,entryId:n}))}var $t=null,it=null,lt=null,ct=null,Bt=14,Ht="#e8242c",Sa="rgba(232, 36, 44, 0.18)",Ft="#f2b134",xa="rgba(242, 177, 52, 0.16)",dt="#9a9ca6",ut="rgba(255, 255, 255, 0.08)";function Vt(t,e,{onPointClick:a}={}){$t&&($t.destroy(),$t=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.pct*10)/10);return $t=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:n,borderColor:Ht,backgroundColor:Sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt,callback:o=>`${o>0?"+":""}${o}%`},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),$t}function Ea(t,e,{onPointClick:a}={}){it&&(it.destroy(),it=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.e1rm*10)/10);return it=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:n,borderColor:Ft,backgroundColor:xa,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),it}function La(){it&&(it.destroy(),it=null)}function oe(t,e,{onPointClick:a}={}){lt&&(lt.destroy(),lt=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.weight*10)/10);return lt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:n,borderColor:Ht,backgroundColor:Sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ht,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),lt}function se(){lt&&(lt.destroy(),lt=null)}function Ca(t,e,{onPointClick:a}={}){ct&&(ct.destroy(),ct=null);let r=e.map(o=>o.date),n=e.map(o=>Math.round(o.waist*10)/10);return ct=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:n,borderColor:Ft,backgroundColor:xa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Ft,pointHitRadius:Bt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:dt},grid:{color:ut}},y:{ticks:{color:dt},grid:{color:ut}}},plugins:{legend:{display:!1}},onClick:(o,s)=>{s.length&&a&&a(e[s[0].index])}}}),ct}function Da(){ct&&(ct.destroy(),ct=null)}function Rt(t,{onReorder:e,axis:a="y"}={}){let r=null,n=null,o=0,s=0,f=0,k=0,h=0,y=null,v=null,x=null,p=0,l=0,E=null,L=null;function _(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function $(c){let i=c.target.closest(".lt-drag-handle");if(!i)return;let w=i.closest("[data-reorder-item]");if(w){if(c.pointerType!=="touch"){c.preventDefault(),N(w,c.clientX,c.clientY);return}if(i.setPointerCapture)try{i.setPointerCapture(c.pointerId),E=i,L=c.pointerId}catch{}x=w,p=c.clientX,l=c.clientY,document.addEventListener("pointermove",I),document.addEventListener("pointerup",K),v=setTimeout(()=>{clearTimeout(v),v=null;let D=x,R=p,M=l;W(),N(D,R,M)},180)}}function H(){if(E&&L!==null&&E.releasePointerCapture)try{E.releasePointerCapture(L)}catch{}E=null,L=null}function W(){clearTimeout(v),v=null,x=null,document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",K)}function I(c){if(!x)return;let i=c.clientX-p,w=c.clientY-l;Math.hypot(i,w)<=10||(W(),H())}function K(){W(),H()}function N(c,i,w){r=c,o=i,s=w,h=w;let D=c.getBoundingClientRect();k=D.top,f=D.left,n=document.createElement(c.tagName),n.className="lt-reorder-placeholder",n.style.height=`${c.offsetHeight}px`,n.style.width=`${c.offsetWidth}px`,c.after(n),c.classList.add("lt-dragging"),c.style.position="fixed",c.style.left=`${D.left}px`,c.style.width=`${D.width}px`,c.style.top=`${k}px`,c.style.zIndex="1000",document.addEventListener("pointermove",U),document.addEventListener("pointerup",j)}function O(){let c=_().filter(D=>D!==r),i=r.getBoundingClientRect(),w=null;if(a==="x"){let D=i.left+i.width/2,R=i.top+i.height/2;for(let M of c){let P=M.getBoundingClientRect(),Y=P.left+P.width/2,B=P.top+P.height/2;if(Math.abs(B-R)<P.height/2?D<Y:R<B){w=M;break}}}else{let D=i.top+i.height/2;for(let R of c){let M=R.getBoundingClientRect(),P=M.top+M.height/2;if(D<P){w=R;break}}}w?t.insertBefore(n,w):t.appendChild(n)}function g(){let c=h,i=window.innerHeight-h;return c<80?-16*(1-c/80):i<80?16*(1-i/80):0}function m(){if(!r){y=null;return}let c=g();if(c===0){y=null;return}window.scrollBy(0,c),O(),y=requestAnimationFrame(m)}function C(){y===null&&g()!==0&&(y=requestAnimationFrame(m))}function T(){y!==null&&(cancelAnimationFrame(y),y=null)}function U(c){if(r){if(c.preventDefault(),h=c.clientY,a==="x"){let i=c.clientX-o,w=c.clientY-s;r.style.left=`${f+i}px`,r.style.top=`${k+w}px`}else{let i=c.clientY-s;r.style.top=`${k+i}px`}O(),a==="y"&&C()}}function j(){if(!r)return;T(),n.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",U),document.removeEventListener("pointerup",j),H();let c=_().map(i=>i.dataset.reorderItem);r=null,n=null,e&&e(c)}t.addEventListener("pointerdown",$)}var Sr="joshuaegage@gmail.com";function _a(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function n(){if(r)return;r=!0,document.removeEventListener("keydown",o),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function o(s){s.key==="Escape"&&n()}e.addEventListener("click",s=>{s.target===e&&n()}),document.addEventListener("keydown",o),e.querySelector("[data-feedback-cancel]").addEventListener("click",n),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),f=encodeURIComponent("Lift Tracker feedback"),k=encodeURIComponent(s||"(no message entered)");window.location.href=`mailto:${Sr}?subject=${f}&body=${k}`,n()})}var Kt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function ie(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function xr(t,e=new Date){let a=ie(e),r=new Date(a);r.setDate(r.getDate()+7);let n=new Set;for(let o of t){let s=new Date(o.performed_at);s>=a&&s<r&&n.add(A(o.performed_at))}return n.size}function Ta(t){let e=null;for(let a of Kt)t>=a.days&&(e=a);return e}function Yt(t,e=new Date){let a=xr(t,e);return{days:a,tier:Ta(a)}}function le(t){let e=new Map;for(let r of t){let o=ie(new Date(r.performed_at)).getTime();e.has(o)||e.set(o,new Set),e.get(o).add(A(r.performed_at))}let a={};for(let r of Kt)a[r.key]=0;for(let r of e.values()){let n=Ta(r.size);n&&(a[n.key]+=1)}return a}function Er(t){let e=new Set;for(let a of t)e.add(A(a.performed_at));return e.size}function Lr(t){let e=new Set;for(let o of t)e.add(ie(new Date(o.performed_at)).getTime());let a=Array.from(e).sort((o,s)=>o-s);if(a.length===0)return 0;let r=1,n=1;for(let o=1;o<a.length;o++){let s=new Date(a[o-1]);s.setDate(s.getDate()+7),n=s.getTime()===a[o]?n+1:1,n>r&&(r=n)}return r}function Cr(t){return{totalDays:Er(t),tierCounts:le(t),longestStreak:Lr(t)}}var Dr=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5}];function Gt(t){let e=Cr(t);return Dr.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Xt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Ct=null,ce=null;function _r(){return Ct||(Ct=document.createElement("div"),Ct.className="lt-toast",document.body.appendChild(Ct),Ct)}function pt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let n=_r();clearTimeout(ce),n.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,n.querySelector(".lt-toast-message").textContent=t,n.classList.add("lt-toast-visible");let o=n.querySelector(".lt-toast-undo"),s=()=>n.classList.remove("lt-toast-visible");o.addEventListener("click",()=>{clearTimeout(ce),s(),e&&e()},{once:!0}),ce=setTimeout(()=>{s(),a&&a()},r)}function wt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function ft(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function jt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function zt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var qa="lt-discovery-seen-",J={weight:"weight",history:"history",composite:"composite"};function Jt(t){try{return window.localStorage.getItem(`${qa}${t}`)==="true"}catch{return!1}}function rt(t){try{window.localStorage.setItem(`${qa}${t}`,"true")}catch{}}var Aa="lt-weight-card-expanded";function Dt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Tr(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function $a(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ra(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
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
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let f=o.change<0?"↘":o.change>0?"↗":"→",k=wt(Aa,!1);function h(){t.classList.toggle("lt-stats-row-expanded",k),k?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${f} ${Dt(Math.abs(o.change))} lbs</span>
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
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}k=!k,ft(Aa,k),h()}),k?oe(t.querySelector("[data-home-weight-canvas]"),n):se()}h()}async function Ma(t){rt(J.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(c=>{c.addEventListener("click",()=>{c.dataset.tab!==r&&(r=c.dataset.tab,e.forEach(i=>i.setAttribute("aria-selected",String(i===c))),Object.entries(a).forEach(([i,w])=>{w.hidden=i!==r}),r==="weight"?p():C().catch(i=>console.error("[lift-tracker]",i)))})});let n=t.querySelector("[data-weight-form]"),o=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),f=t.querySelector("[data-weight-chart-section]"),k=t.querySelector("[data-weight-canvas]"),h=t.querySelector("[data-weight-empty]"),y=t.querySelector("[data-weight-history]");o.value=A(new Date().toISOString());let v=[];async function x(){v=await Et(),l(),p()}function p(){let c=Lt(v);if(c.length===0){f.hidden=!0,h.hidden=!1,se();return}f.hidden=!1,h.hidden=!0,a.weight.hidden||oe(k,c)}function l(){if(v.length===0){y.innerHTML="";return}let c=v.slice().sort((i,w)=>new Date(w.logged_at)-new Date(i.logged_at));y.innerHTML=c.map(i=>`
          <li class="lt-history-row" data-entry-id="${i.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${i.id}">
              <span class="lt-history-weight">${Dt(Number(i.weight))} lb</span>
              <span class="lt-history-e1rm">${$a(A(i.logged_at))}</span>
            </button>
          </li>
        `).join(""),y.querySelectorAll("[data-edit-trigger]").forEach(i=>{i.addEventListener("click",()=>E(i.dataset.editTrigger))})}function E(c){let i=y.querySelector(`[data-entry-id="${c}"]`),w=v.find(D=>D.id===c);!i||!w||(i.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${w.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${A(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,i.querySelector("[data-edit-cancel]").addEventListener("click",l),i.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await fa(c),await x(),pt("Weight entry deleted",{onUndo:async()=>{await ma(c),await x()}}))}),i.querySelector("[data-edit-form]").addEventListener("submit",async D=>{D.preventDefault();let R=Number(i.querySelector("[data-edit-weight]").value),M=i.querySelector("[data-edit-date]").value;if(!(R>=0)||!M)return;let P=new Date(w.logged_at),[Y,B,ht]=M.split("-").map(Number);P.setFullYear(Y,B-1,ht),await pa(c,{weight:R,logged_at:P.toISOString()}),await x()}))}n.addEventListener("submit",async c=>{c.preventDefault();let i=Number(s.value),w=o.value;if(!(i>=0)||!Number.isFinite(i)||!w)return;let[D,R,M]=w.split("-").map(Number),P=new Date;P.setFullYear(D,R-1,M),await ua(i,P.toISOString()),s.value="",s.focus(),o.value=A(new Date().toISOString()),await x()});let L=t.querySelector("[data-waist-form]"),_=t.querySelector("[data-waist-date-input]"),$=t.querySelector("[data-waist-input]"),H=t.querySelector("[data-waist-chart-section]"),W=t.querySelector("[data-waist-canvas]"),I=t.querySelector("[data-waist-empty]"),K=t.querySelector("[data-waist-history]");_.value=A(new Date().toISOString());let N=[],O=!1,g=null;async function m(){N=await qt(),O=!0,U(),T()}async function C(){if(O){T();return}g||(I.hidden=!1,I.textContent="Loading waist...",H.hidden=!0,g=m().finally(()=>{g=null})),await g}function T(){let c=At(N);if(c.length===0){H.hidden=!0,I.hidden=!1,I.textContent="No waist measurements yet — add your first one above.",Da();return}H.hidden=!1,I.hidden=!0,a.waist.hidden||Ca(W,c)}function U(){if(N.length===0){K.innerHTML="";return}let c=N.slice().sort((i,w)=>new Date(w.logged_at)-new Date(i.logged_at));K.innerHTML=c.map(i=>`
          <li class="lt-history-row" data-entry-id="${i.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${i.id}">
              <span class="lt-history-weight">${Dt(Number(i.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${$a(A(i.logged_at))}</span>
            </button>
          </li>
        `).join(""),K.querySelectorAll("[data-edit-trigger]").forEach(i=>{i.addEventListener("click",()=>j(i.dataset.editTrigger))})}function j(c){let i=K.querySelector(`[data-entry-id="${c}"]`),w=N.find(D=>D.id===c);!i||!w||(i.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${w.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${A(w.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,i.querySelector("[data-edit-cancel]").addEventListener("click",U),i.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ya(c),await m(),pt("Waist measurement deleted",{onUndo:async()=>{await wa(c),await m()}}))}),i.querySelector("[data-edit-form]").addEventListener("submit",async D=>{D.preventDefault();let R=Number(i.querySelector("[data-edit-waist]").value),M=i.querySelector("[data-edit-date]").value;if(!(R>=0)||!M)return;let P=new Date(w.logged_at),[Y,B,ht]=M.split("-").map(Number);P.setFullYear(Y,B-1,ht),await ga(c,{waist_circumference:R,logged_at:P.toISOString()}),await m()}))}L.addEventListener("submit",async c=>{c.preventDefault();let i=Number($.value),w=_.value;if(!(i>=0)||!Number.isFinite(i)||!w)return;let[D,R,M]=w.split("-").map(Number),P=new Date;P.setFullYear(D,R-1,M),await ha(i,P.toISOString()),$.value="",$.focus(),_.value=A(new Date().toISOString()),await m()}),await x()}var Wa="lt-seen-rank-achievements";function Qt(){let t=jt(Wa,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Ia(t){zt(Wa,JSON.stringify(t))}var de="lt-active-workout";function ue(){try{return window.localStorage.getItem(de)||null}catch{return null}}function pe(t){try{t?window.localStorage.setItem(de,t):window.localStorage.removeItem(de)}catch{}}function Na(t){let e=ue();return e&&t.find(a=>a.id===e)||null}var qr=120,Oa="lt-default-rest-seconds",Pa="lt-lift-rest-seconds-",Ua="lt-rest-timer-enabled",tt=null,fe=null,me=null,_t=0,nt=null;function Ha(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Fa(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function bt(){return wt(Ua,!1)}function Ba(t){ft(Ua,!!t)}function ge(){return Ha(Oa)||qr}function Va(t){Fa(Oa,t)}function ye(t){return Ha(`${Pa}${t}`)}function Ka(t,e){Fa(`${Pa}${t}`,e)}function Zt(t){return ye(t)||ge()}function we(){return tt||(tt=document.createElement("div"),tt.className="lt-rest-timer",tt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,tt.querySelector("[data-rest-add]").addEventListener("click",()=>{_t&&(_t+=30*1e3,he())}),tt.querySelector("[data-rest-skip]").addEventListener("click",Ya),document.body.appendChild(tt),tt)}function Ar(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function he(){let t=we(),e=_t-Date.now();t.querySelector("[data-rest-time]").textContent=Ar(e),e<=0&&Rr()}function be(){clearInterval(fe),clearTimeout(me),fe=null,me=null}function $r(){try{Mt(),nt.state==="suspended"&&nt.resume();let t=nt.currentTime,e=nt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(nt.destination),[523.25,659.25].forEach((a,r)=>{let n=nt.createOscillator();n.type="sine",n.frequency.setValueAtTime(a,t+r*.12),n.connect(e),n.start(t+r*.12),n.stop(t+.75)})}catch{}}function Mt(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;nt||=new t,nt.state==="suspended"&&nt.resume()}catch{}}function Rr(){be(),_t=0;let t=we();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",$r(),navigator.vibrate&&navigator.vibrate([120,70,120]),me=setTimeout(Ya,12e3)}function Ya(){be(),_t=0,tt&&tt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function te({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=we();be(),_t=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,he(),fe=setInterval(he,250)}var Ga="lt-composite-expanded",ke="lt-header-menu-open";async function Xa(t){let{data:{session:e}}=await b.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),n=t.querySelector("[data-header-actions]"),o=240,s=null;function f(d=!0){s&&(clearTimeout(s),s=null),n.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),d&&ft(ke,!1),s=setTimeout(()=>{n.hidden=!0,s=null},o)}function k({persist:d=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),n.hidden=!1,u?n.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>n.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),d&&ft(ke,!0)}r.addEventListener("click",()=>{n.hidden?k():f()}),n.addEventListener("click",d=>{d.target.closest("button")&&f()}),wt(ke,!1)&&k({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ke);let y=t.querySelector("[data-feedback-btn]");y&&y.addEventListener("click",()=>_a()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>b.auth.signOut());let x=t.querySelector("[data-composite-section]"),p=t.querySelector("[data-composite-toggle]"),l=t.querySelector("[data-composite-body]"),E=t.querySelector("[data-chevron]"),L=t.querySelector("[data-composite-summary]"),_=t.querySelector("[data-composite-discovery]");function $(d){p.setAttribute("aria-expanded",String(d)),l.hidden=!d,E.innerHTML=d?"&#9650;":"&#9660;",x.classList.toggle("lt-stats-row-expanded",d)}$(wt(Ga,!0)),p.addEventListener("click",()=>{if(rt(J.composite),_.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ge();return}let d=p.getAttribute("aria-expanded")==="true";$(!d),ft(Ga,!d)});let H=t.querySelector("[data-killstreak-icon]"),W=t.querySelector("[data-killstreak-label]"),I=t.querySelector("[data-killstreak-sub]"),K=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",je);function N(d){let{days:u,tier:S}=Yt(d);H.textContent=S?S.icon:"🎯",W.textContent=S?`${S.label} Killstreak`:"No Killstreak",I.textContent=`${u} Day streak`;let G=Gt(d).filter(X=>X.track==="rank"),q=Xt(G,Qt()).length>0;K.hidden=!q}let O=t.querySelector("[data-weight-card]");function g(){rt(J.weight),Ye()}function m(d){Ra(O,{onExpand:g,...d}).catch(u=>{console.error("[lift-tracker]",u),O.classList.remove("lt-stats-row-expanded"),O.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,O.querySelector("[data-weight-expand]").addEventListener("click",g)})}let C=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{rt(J.history),C.hidden=!0,Xe()});let T=t.querySelector("[data-add-lift-form]"),U=t.querySelector("[data-add-lift-toggle]"),j=t.querySelector("[data-add-lift-discovery]"),c=t.querySelector("[data-add-lift-hint]"),i=t.querySelector("[data-create-workout-btn]"),w=t.querySelector("[data-create-workout-discovery]");U.addEventListener("click",()=>{let d=T.hidden;T.hidden=!d,U.setAttribute("aria-pressed",String(d)),U.classList.toggle("lt-add-lift-toggle-active",d),d&&T.querySelector('input[name="name"]').focus()});let D=t.querySelector("[data-lift-list]"),R=t.querySelector("[data-list-empty]");i.addEventListener("click",()=>{i.disabled||Be()});let M=t.querySelector("[data-workout-pills]"),P=t.querySelector("[data-workout-empty-hint]"),Y=[],B=ue();function ht(){return B&&Y.find(d=>d.id===B)||null}function De(){let d=ht();if(!d)return V;let u=new Set(d.liftIds);return V.filter(S=>u.has(S.id))}function _e(){M.innerHTML=Y.map(d=>{let u=d.id===B;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of Y){let u=M.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);u&&(u.textContent=d.name)}M.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let u=d.dataset.workoutPill;B=B===u?null:u,pe(B),_e(),re(Tt),$e(Tt)})}),M.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",u=>{u.stopPropagation(),Ve(d.dataset.workoutEdit)})})}let ee="lt-fast-mode",Te="lt-burst-mode";function fr(){try{let d=window.localStorage.getItem(ee);if(d!==null)return d==="true";let u=window.localStorage.getItem(Te);return u!==null?(window.localStorage.setItem(ee,u),window.localStorage.removeItem(Te),u==="true"):!1}catch{return!1}}function mr(d){try{window.localStorage.setItem(ee,String(d))}catch{}}let V=[],ot=fr(),st=new Map,Tt=[],Wt=t.querySelector("[data-mode-toggle]");function qe(){Wt.textContent=ot?"Normal":"Fast",Wt.setAttribute("aria-pressed",String(ot)),Wt.classList.toggle("lt-mode-toggle-active",ot)}qe(),Wt.addEventListener("click",()=>{ot=!ot,mr(ot),qe(),re(Tt)}),T.addEventListener("submit",async d=>{d.preventDefault();let u=T.querySelector('input[name="name"]'),S=u.value.trim();if(S){u.value="",u.disabled=!0;try{await St(S,V.length),await Ae()}finally{u.disabled=!1,u.focus()}}}),Rt(D,{onReorder:async d=>{let u=[...d],S=new Set(d),G=V.map(q=>S.has(q.id)?u.shift():q.id);await Qe(G),V=G.map(q=>V.find(X=>X.id===q)).filter(Boolean)}}),Rt(M,{axis:"x",onReorder:async d=>{await sa(d),Y=d.map(u=>Y.find(S=>S.id===u)).filter(Boolean)}});async function Ae(){Y=await xt(),B&&!Y.some(q=>q.id===B)&&(B=null,pe(null)),_e(),V=await z();let d=V.length>=2;if(j.hidden=V.length>=2,c.hidden=V.length!==1,i.disabled=!d,i.setAttribute("aria-disabled",String(!d)),w.hidden=!d||Y.length>0,P.hidden=!d||Y.length>0,V.length===0){D.innerHTML="",R.hidden=!1,R.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",c.hidden=!0,x.hidden=!0,N([]),m({showDiscovery:!1}),C.hidden=!0,_.hidden=!0,st=new Map,Tt=[];return}let u=await et(V.map(q=>q.id)),S=u.length>0;N(u),m({showDiscovery:S&&!Jt(J.weight)}),C.hidden=!S||Jt(J.history),st=new Map(V.map(q=>[q.id,[]]));for(let q of u){let X=st.get(q.lift_id);X&&X.push(q)}let G=V.map(q=>({liftId:q.id,dailySeries:gt(st.get(q.id)||[])}));re(G),$e(G)}function $e(d){let u=ht(),S=u?d.filter(It=>u.liftIds.includes(It.liftId)):d,G=Pt(S);x.hidden=!1;let q=t.querySelector("[data-composite-canvas]"),X=t.querySelector("[data-composite-empty]"),kt=t.querySelector("[data-composite-scope]"),vt=t.querySelector("[data-composite-blurb]");if(kt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",vt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",X.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",G.length===0){q.hidden=!0,X.hidden=!1,L.textContent="",_.hidden=!0;return}q.hidden=!1,X.hidden=!0,L.textContent=ba(G[G.length-1].pct),_.hidden=Jt(J.composite),Vt(q,G)}function ae(d){let u=gt(st.get(d)||[]),S=u[u.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function hr(d){let u=st.get(d)||[];return u.length===0?"":u[u.length-1].weight}function re(d){Tt=d;let u=De();R.hidden=u.length>0,R.textContent=B?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",D.innerHTML=u.map(S=>ot?`
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
        `).join("");for(let S of V){let q=D.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");q&&(q.textContent=S.name)}D.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Fe(S.dataset.openLift))}),ot&&gr()}function gr(){D.querySelectorAll("[data-fast-log-form]").forEach(d=>{let u=d.dataset.fastLogForm;d.addEventListener("submit",async S=>{S.preventDefault();let G=d.querySelector("[data-fast-weight]"),q=d.querySelector("[data-fast-reps]"),X=d.querySelector("[data-fast-feedback]"),kt=Number(G.value),vt=Number(q.value);if(!(kt>=0)||!Number.isFinite(kt)||!(vt>0)||!Number.isInteger(vt))return;let It=st.get(u)||[],yr=Q(kt,vt),Me=Ut(yr,It),We=new Date().toISOString();bt()&&Mt();let wr=await at(u,kt,vt,We),br=V.find(ne=>ne.id===u);bt()&&te({seconds:Zt(u),liftName:br?.name||""});let Ie=[...It,wr];st.set(u,Ie),q.value="",q.focus();let Ne=D.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");Ne&&(Ne.textContent=ae(u));let kr=A(We),Oe=yt(Ie.filter(ne=>A(ne.performed_at)===kr));X.hidden=!1,X.classList.toggle("lt-pr",Me),X.textContent=Me?`PR! ${Math.round(Oe)} lb today`:`Logged · ${Math.round(Oe)} lb today`})})}function Re(d){return String(d).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await Ae()}async function ja(t,e){let a=await ze(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
        <span>Rest timer (all lifts)</span>
        <input type="checkbox" data-rest-enabled-input />
      </label>
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let r=t.querySelector("[data-name-input]");r.value=a.name;let n=a.name;r.addEventListener("keydown",g=>{g.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let g=r.value.trim();if(!g||g===n){r.value=n;return}n=g,await Je(e,g)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${n}"? You'll have a few seconds to undo it after.`)&&(await Ze(e),F(),pt(`Deleted "${n}"`,{onUndo:async()=>{await ta(e),Nt()}}))});let o=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};o.forEach(g=>{g.addEventListener("click",()=>{o.forEach(m=>m.setAttribute("aria-selected",String(m===g))),Object.entries(s).forEach(([m,C])=>{C.hidden=m!==g.dataset.tab}),g.dataset.tab==="details"&&O()})});let f=t.querySelector("[data-log-form]"),k=t.querySelector("[data-weight-input]"),h=t.querySelector("[data-reps-input]"),y=t.querySelector("[data-log-feedback]"),v=t.querySelector("[data-default-rest-input]"),x=t.querySelector("[data-lift-rest-input]"),p=t.querySelector("[data-rest-enabled-input]"),l=[];function E(){v.value=ge(),x.value=ye(e)||"",p.checked=bt()}function L(g){let m=Number(g.value);return g.value===""?null:!Number.isFinite(m)||m<15?15:m>600?600:Math.round(m)}v.addEventListener("change",()=>{let g=L(v)||120;Va(g),E()}),x.addEventListener("change",()=>{let g=L(x);Ka(e,g),E()}),p.addEventListener("change",()=>{Ba(p.checked),E()});async function _(){l=await ea(e)}function $(){if(l.length===0)return;let g=l[l.length-1];k.value=g.weight}f.addEventListener("submit",async g=>{g.preventDefault();let m=Number(k.value),C=Number(h.value);if(!(m>=0)||!Number.isFinite(m)||!(C>0)||!Number.isInteger(C))return;let T=Q(m,C),j=Ut(T,l),c=new Date;bt()&&Mt(),await at(e,m,C,c.toISOString()),bt()&&te({seconds:Zt(e),liftName:n}),h.value="",h.focus(),await _(),I(),s.details.hidden||O();let i=A(c.toISOString()),w=yt(l.filter(D=>A(D.performed_at)===i));y.hidden=!1,y.classList.toggle("lt-pr",j),y.textContent=j?`New PR! Today's volume: ${Math.round(w)} lb`:`Logged. Today's volume: ${Math.round(w)} lb`});function H(g){let m=new Map;for(let C of g){let T=A(C.performed_at);m.has(T)||m.set(T,[]),m.get(T).push(C)}return Array.from(m.entries()).sort((C,T)=>T[0].localeCompare(C[0]))}function W(g){let[m,C,T]=g.split("-").map(Number);return new Date(m,C-1,T).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function I(){let g=s.history;if(l.length===0){g.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let m=H(l);g.innerHTML=m.map(([C,T])=>{let U=yt(T),c=T.slice().sort((i,w)=>new Date(w.performed_at)-new Date(i.performed_at)).map(i=>{let w=Math.round(Q(Number(i.weight),Number(i.reps)));return`
              <li class="lt-history-row" data-set-id="${i.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${i.id}">
                  <span class="lt-history-weight">${i.weight} lb &times; ${i.reps}</span>
                  <span class="lt-history-e1rm">${w} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${W(C)}</span>
              <span class="lt-history-volume">${Math.round(U)} lb volume</span>
            </div>
            <ul class="lt-history-list">${c}</ul>
          </div>
        `}).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(C=>{C.addEventListener("click",()=>N(C.dataset.editTrigger))})}function K(g){return s.history.querySelector(`[data-set-id="${g}"]`)}function N(g){let m=K(g),C=l.find(T=>T.id===g);!m||!C||(m.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${C.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${C.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${A(C.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",I),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await na(g),await _(),I(),s.details.hidden||O(),pt("Set deleted",{onUndo:async()=>{await oa(g),await _(),I(),s.details.hidden||O()}})}),m.querySelector("[data-edit-form]").addEventListener("submit",async T=>{T.preventDefault();let U=Number(m.querySelector("[data-edit-weight]").value),j=Number(m.querySelector("[data-edit-reps]").value),c=m.querySelector("[data-edit-date]").value;if(!(U>=0)||!(j>0)||!c)return;let i=new Date(C.performed_at),[w,D,R]=c.split("-").map(Number);i.setFullYear(w,D-1,R),await ra(g,{weight:U,reps:j,performed_at:i.toISOString()}),await _(),I(),s.details.hidden||O()}))}function O(){let g=s.details,m=gt(l);if(m.length===0){g.innerHTML='<p class="lt-empty">No sets logged yet.</p>',La();return}g.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let C=g.querySelector("[data-lift-canvas]"),T=g.querySelector("[data-point-detail]");Ea(C,m,{onPointClick:U=>{T.hidden=!1,T.textContent=`${W(U.date)}: ${U.weight} lb × ${U.reps} (${Math.round(U.e1rm)} e1RM)`}})}await _(),E(),$(),I()}var za=60;function Ja(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-za),e}function mt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ve(t,e,a=new Date,r=`last ${za} days`,n=[],o=[]){let s=A(a.toISOString()),f=[`Lift Tracker — ${r} (as of ${s})`,""],k=t.filter(h=>(e.get(h.id)||[]).length>0);if(k.length===0)f.push("No sets logged in this period."),f.push("");else{for(let y of k){let v=(e.get(y.id)||[]).slice().sort((l,E)=>new Date(l.performed_at)-new Date(E.performed_at)),x=yt(v),p=Math.max(...v.map(l=>Q(Number(l.weight),Number(l.reps))));f.push(y.name);for(let l of v){let E=Math.round(Q(Number(l.weight),Number(l.reps)));f.push(`  ${A(l.performed_at)}: ${l.weight} lb x ${l.reps} (e1RM ${E})`)}f.push(`  Sets: ${v.length} | Volume: ${Math.round(x)} lb | Best e1RM: ${Math.round(p)}`),f.push("")}let h=t.length-k.length;h>0&&(f.push(`(${h} lift${h===1?"":"s"} with no sets in this period omitted)`),f.push(""))}if(n.length>0){f.push("Body weight");for(let p of n)f.push(`  ${p.date}: ${mt(p.weight)} lb`);let h=n[0].weight,y=n[n.length-1].weight,v=y-h,x=v>0?"+":"";f.push(`  Start: ${mt(h)} lb | Current: ${mt(y)} lb | Change: ${x}${mt(v)} lb`),f.push("")}if(o.length>0){f.push("Waist");for(let p of o)f.push(`  ${p.date}: ${mt(p.waist)} in`);let h=o[0].waist,y=o[o.length-1].waist,v=y-h,x=v>0?"+":"";f.push(`  Start: ${mt(h)} in | Current: ${mt(y)} in | Change: ${x}${mt(v)} in`),f.push("")}return f.join(`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),n=t.querySelector("[data-export-textarea]"),o=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let l=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(l)),a.hidden=!l,r.innerHTML=l?"&#9650;":"&#9660;",!!l){e.disabled=!0;try{let E=await z(),L=E.map(m=>m.id),_=Ja().toISOString(),$=await aa(L,_),H=new Map(E.map(m=>[m.id,[]]));for(let m of $){let C=H.get(m.lift_id);C&&C.push(m)}let I=(await Et()).filter(m=>new Date(m.logged_at)>=new Date(_)),K=Lt(I),O=(await qt()).filter(m=>new Date(m.logged_at)>=new Date(_)),g=At(O);n.value=ve(E,H,new Date,void 0,K,g),s.hidden=!0}finally{e.disabled=!1}}}),o.addEventListener("click",async()=>{n.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(n.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}s.hidden=!1,s.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let f=t.querySelector("[data-full-export-toggle]"),k=t.querySelector("[data-full-export-body]"),h=t.querySelector("[data-full-export-chevron]"),y=t.querySelector("[data-full-export-textarea]"),v=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");f.addEventListener("click",async()=>{let l=!(f.getAttribute("aria-expanded")==="true");if(f.setAttribute("aria-expanded",String(l)),k.hidden=!l,h.innerHTML=l?"&#9650;":"&#9660;",!!l){f.disabled=!0;try{let E=await z(),L=E.map(N=>N.id),_=await et(L),$=new Map(E.map(N=>[N.id,[]]));for(let N of _){let O=$.get(N.lift_id);O&&O.push(N)}let H=await Et(),W=Lt(H),I=await qt(),K=At(I);y.value=ve(E,$,new Date,"all-time",W,K),x.hidden=!0}finally{f.disabled=!1}}}),v.addEventListener("click",async()=>{y.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(y.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}x.hidden=!1,x.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function Za(t){rt(J.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",F);let[e,a]=await Promise.all([z(),xt()]),r=Na(a),n=r?e.filter(p=>r.liftIds.includes(p.id)):e,o=n.length?await et(n.map(p=>p.id)):[],s=new Map(n.map(p=>[p.id,[]]));for(let p of o){let l=s.get(p.lift_id);l&&l.push(p)}let f=n.map(p=>({liftId:p.id,dailySeries:gt(s.get(p.id)||[])})),k=Pt(f),h=t.querySelector("[data-composite-canvas]"),y=t.querySelector("[data-composite-empty]"),v=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(v.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",x.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",y.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",k.length===0){h.hidden=!0,y.hidden=!1;return}h.hidden=!1,y.hidden=!0,Vt(h,k)}function Ir(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Nr(){let t=await z(),e=new Map(t.map(r=>[r.id,r.name]));return(await et(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function Or(t,e){let a=new Map;for(let o of e)a.has(o.liftName)||a.set(o.liftName,[]),a.get(o.liftName).push(o);let r=Array.from(a.entries()).map(([o,s])=>{let k=s.slice().sort((h,y)=>new Date(h.performed_at)-new Date(y.performed_at)).map(h=>{let y=Math.round(Q(Number(h.weight),Number(h.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${h.weight} lb &times; ${h.reps}</span>
                <span class="lt-history-e1rm">${y} e1RM</span>
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=t.querySelector("[data-history-content]"),a=await Nr();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=ka(a);e.innerHTML=r.map(([n,o])=>Or(n,o)).join("")}var er="lt-theme",Se="default";function xe(){return jt(er,Se)}function ar(t){!t||t===Se?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function rr(t){ar(t),zt(er,t||Se)}function nr(){ar(xe())}var Pr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},Ur=["rank","mastery","streak","capstone"];async function or(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=await z(),a=e.length?await et(e.map(l=>l.id)):[],{days:r,tier:n}=Yt(a);t.querySelector("[data-killstreak-current-icon]").textContent=n?n.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=n?`${n.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let o=le(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Kt.map(l=>{let E=o[l.key];return`
      <li class="lt-killstreak-tier-row${n?.key===l.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${l.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${l.label}</span>
          <span class="lt-killstreak-tier-req">${l.days}+ day${l.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${E} earned</span>
      </li>
    `}).join("");let f=Gt(a),k=f.filter(l=>l.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${k} / ${f.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let h=f.filter(l=>l.track==="rank"),y=new Set(Xt(h,Qt()));Ia(h.filter(l=>l.unlocked).map(l=>l.id));let v=t.querySelector("[data-achievements]");function x(l){if(l.track!=="rank")return`
        <li class="lt-achievement-card${l.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${l.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${l.name}</span>
            <span class="lt-achievement-card-desc">${l.description}</span>
          </span>
        </li>
      `;let E=l.unlocked&&xe()===l.theme.id,L=l.unlocked&&y.has(l.id),_=l.unlocked?`<span class="lt-achievement-card-theme">${l.theme.label} theme${E?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${l.theme.label}</span>`,$=L?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${l.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${L?" lt-achievement-card-new":""}${E?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${l.theme.id}"${l.unlocked?"":" disabled"} aria-label="${l.unlocked?`Apply the ${l.theme.label} theme`:`Locked: ${l.name}`}">
          <span class="lt-achievement-card-icon">${l.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${l.name}</span>
            <span class="lt-achievement-card-desc">${l.description}</span>
            ${_}
            ${$}
          </span>
        </button>
      </li>
    `}function p(){v.innerHTML=Ur.map(l=>{let L=f.filter(_=>_.track===l).sort((_,$)=>Number($.unlocked)-Number(_.unlocked)).map(x).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Pr[l]}</h3>
          ${l==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${L}</ul>
        </section>
      `}).join("")}p(),v.addEventListener("click",l=>{let E=l.target.closest("[data-apply-theme]");!E||E.disabled||(rr(E.dataset.applyTheme),p())})}var sr="__divider__";async function Ee(t,{mode:e,workoutId:a}={}){let r=e==="edit",[n,o]=await Promise.all([z(),r?ia(a):Promise.resolve(null)]);if(r&&!o){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?o.liftIds:[]);t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let f=t.querySelector("[data-workout-name-input]"),k=t.querySelector("[data-workout-lift-list]"),h=t.querySelector("[data-workout-lifts-empty]"),y=t.querySelector("[data-save-workout]"),v=t.querySelector("[data-workout-save-feedback]");h.hidden=n.length>0;let x=n.filter(L=>s.has(L.id)),p=n.filter(L=>!s.has(L.id));k.innerHTML=[...x.map(l),E(),...p.map(l)].join("");for(let L of n){let $=k.querySelector(`[data-lift-id="${L.id}"]`)?.querySelector("[data-name-slot]");$&&($.textContent=L.name)}Rt(k,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${o.name}"? You'll have a few seconds to undo it after.`)&&(await ca(a),F(),pt(`Deleted "${o.name}"`,{onUndo:async()=>{await da(a),Nt()}}))}),y.addEventListener("click",async()=>{let L=f.value.trim();if(!L){f.focus();return}let _=Array.from(k.querySelectorAll("[data-reorder-item]")),$=_.findIndex(W=>W.dataset.reorderItem===sr),H=_.slice(0,$).map(W=>W.dataset.reorderItem);y.disabled=!0,v.hidden=!0;try{if(r)await la(a,L,H);else{let W=await xt();await Ot(L,H,W.length)}F()}catch(W){console.error("[lift-tracker]",W),v.hidden=!1,v.textContent="Something went wrong saving the workout.",y.disabled=!1}});function l(L){return`
      <li class="lt-lift-row" data-reorder-item="${L.id}" data-lift-id="${L.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${ir(L.name)}">&#8942;&#8942;</button>
      </li>
    `}function E(){return`
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
    `}function r(n,o,s){t.innerHTML=a(n,o,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let f=t.querySelector("[data-auth-form]");f.addEventListener("submit",async k=>{k.preventDefault();let h=f.email.value.trim(),y=f.password.value,v=f.querySelector('button[type="submit"]');v.disabled=!0,v.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:p}=e==="signup"?await b.auth.signUp({email:h,password:y,options:{emailRedirectTo:Hr}}):await b.auth.signInWithPassword({email:h,password:y});if(p)throw p;if(e==="signup"&&!x.session){e="signin",r(null,`Account created. Check ${h} for a confirmation link, then sign in here.`,h);return}}catch(x){r(x.message||"Something went wrong. Try again.",null,h)}})}r()}function lr(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function cr(){let{data:t,error:e}=await b.auth.signInAnonymously();if(e)throw e;return await Br(),t}async function Br(){let t=n=>new Date(Date.now()-n*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([St("Bench Press",0),St("Squat",1),St("Deadlift",2)]);await Promise.all([at(e.id,135,8,t(6)),at(e.id,145,6,t(2)),at(a.id,185,5,t(5)),at(a.id,195,5,t(1)),at(r.id,225,5,t(3))]),await Ot("Full Body",[e.id,a.id,r.id],0)}var Z=document.getElementById("lift-tracker-app");nr();var dr=0;async function Ce(){let t=++dr,e=()=>t!==dr;try{let{data:{session:a}}=await b.auth.getSession();if(e())return;if(!a)if(lr())try{if(await cr(),e())return}catch(n){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",n),await Le(Z);return}else return await Le(Z),e(),void 0;let r=He();if(r.name==="detail"?await ja(Z,r.liftId):r.name==="help"?await Qa(Z):r.name==="weight"?await Ma(Z):r.name==="composite"?await Za(Z):r.name==="history"?await tr(Z):r.name==="killstreak"?await or(Z):r.name==="workout-new"?await Ee(Z,{mode:"create"}):r.name==="workout-edit"?await Ee(Z,{mode:"edit",workoutId:r.workoutId}):await Xa(Z),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),Z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",Ce);var ur=null,pr=!1;b.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!pr;pr=!0;let n=a!==ur;ur=a,!(r||!n)&&(F(),Ce())});Ce();

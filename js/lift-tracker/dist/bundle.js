import{createClient as za}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Ee="https://mqfsgammpsumpltfutwl.supabase.co",Le="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var w=za(Ee,Le);function Ce(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function B(){window.location.hash="#/"}function De(t){window.location.hash=`#/lift/${t}`}function _e(){window.location.hash="#/workout/new"}function qe(t){window.location.hash=`#/workout/${t}/edit`}function Te(){window.location.hash="#/help"}function Ae(){window.location.hash="#/weight"}function $e(){window.location.hash="#/composite"}function Me(){window.location.hash="#/history"}function Re(){window.location.hash="#/killstreak"}function $t(){window.dispatchEvent(new Event("hashchange"))}async function j(){let{data:t,error:e}=await w.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function We(t){let{data:e,error:a}=await w.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function yt(t,e){let{data:a,error:r}=await w.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Ie(t,e){let{data:a,error:r}=await w.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Ne(t){let e=t.map((o,n)=>w.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Oe(t){let{error:e}=await w.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ue(t){let{error:e}=await w.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Pe(t){let{data:e,error:a}=await w.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function Z(t){if(!t||t.length===0)return[];let{data:e,error:a}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function He(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function tt(t,e,a,r){let{data:o,error:n}=await w.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Be(t,e){let{data:a,error:r}=await w.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Fe(t){let{error:e}=await w.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ve(t){let{error:e}=await w.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function wt(){let{data:t,error:e}=await w.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Ke(t){let e=t.map((o,n)=>w.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ye(t){let{data:e,error:a}=await w.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function Mt(t,e,a){let{data:r,error:o}=await w.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await w.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(n)throw n}return r}async function Ge(t,e,a){let{error:r}=await w.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await w.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await w.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(n)throw n}}async function Xe(t){let{error:e}=await w.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function je(t){let{error:e}=await w.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function bt(){let{data:t,error:e}=await w.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ze(t,e){let{data:a,error:r}=await w.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Je(t,e){let{data:a,error:r}=await w.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Qe(t){let{error:e}=await w.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ze(t){let{error:e}=await w.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Lt(){let{data:t,error:e}=await w.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ta(t,e){let{data:a,error:r}=await w.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ea(t,e){let{data:a,error:r}=await w.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function aa(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ra(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function J(t,e){return t*(1+e/30)}function $(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function ft(t){let e=new Map;for(let a of t){let r=$(a.performed_at),o=J(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Rt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let f of s.dailySeries)r.add(f.date);let o=Array.from(r).sort(),n=[];for(let s of o){let f=0,b=0;for(let m of e){let g=null;for(let y of m.dailySeries)if(y.date<=s)g=y;else break;g&&(f+=g.e1rm/a.get(m.liftId),b+=1)}if(b>0){let m=f/b;n.push({date:s,ratio:m,pct:(m-1)*100})}}return n}function Wt(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>J(Number(r.weight),Number(r.reps))));return t>a}function mt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function oa(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function na(t){let e=new Map;for(let a of t){let r=$(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function kt(t){let e=new Map;for(let a of t){let r=$(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function sa(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Ct(t){let e=new Map;for(let a of t){let r=$(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var Dt=null,nt=null,st=null,it=null,Ot=14,It="#e8242c",ia="rgba(232, 36, 44, 0.18)",Nt="#f2b134",la="rgba(242, 177, 52, 0.16)",lt="#9a9ca6",dt="rgba(255, 255, 255, 0.08)";function Ut(t,e,{onPointClick:a}={}){Dt&&(Dt.destroy(),Dt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return Dt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:It,backgroundColor:ia,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:It,pointHitRadius:Ot}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:lt},grid:{color:dt}},y:{ticks:{color:lt,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:dt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Dt}function da(t,e,{onPointClick:a}={}){nt&&(nt.destroy(),nt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return nt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:Nt,backgroundColor:la,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Nt,pointHitRadius:Ot}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:lt},grid:{color:dt}},y:{ticks:{color:lt},grid:{color:dt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),nt}function ca(){nt&&(nt.destroy(),nt=null)}function Jt(t,e,{onPointClick:a}={}){st&&(st.destroy(),st=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return st=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:It,backgroundColor:ia,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:It,pointHitRadius:Ot}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:lt},grid:{color:dt}},y:{ticks:{color:lt},grid:{color:dt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),st}function Qt(){st&&(st.destroy(),st=null)}function ua(t,e,{onPointClick:a}={}){it&&(it.destroy(),it=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return it=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:Nt,backgroundColor:la,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Nt,pointHitRadius:Ot}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:lt},grid:{color:dt}},y:{ticks:{color:lt},grid:{color:dt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),it}function pa(){it&&(it.destroy(),it=null)}function _t(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,s=0,f=0,b=0,m=0,g=null,y=null,x=null,p=0,i=0,D=null,E=null;function T(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function N(c){let l=c.target.closest(".lt-drag-handle");if(!l)return;let S=l.closest("[data-reorder-item]");if(S){if(c.pointerType!=="touch"){c.preventDefault(),C(S,c.clientX,c.clientY);return}if(l.setPointerCapture)try{l.setPointerCapture(c.pointerId),D=l,E=c.pointerId}catch{}x=S,p=c.clientX,i=c.clientY,document.addEventListener("pointermove",k),document.addEventListener("pointerup",L),y=setTimeout(()=>{clearTimeout(y),y=null;let _=x,O=p,I=i;h(),C(_,O,I)},180)}}function W(){if(D&&E!==null&&D.releasePointerCapture)try{D.releasePointerCapture(E)}catch{}D=null,E=null}function h(){clearTimeout(y),y=null,x=null,document.removeEventListener("pointermove",k),document.removeEventListener("pointerup",L)}function k(c){if(!x)return;let l=c.clientX-p,S=c.clientY-i;Math.hypot(l,S)<=10||(h(),W())}function L(){h(),W()}function C(c,l,S){r=c,n=l,s=S,m=S;let _=c.getBoundingClientRect();b=_.top,f=_.left,o=document.createElement(c.tagName),o.className="lt-reorder-placeholder",o.style.height=`${c.offsetHeight}px`,o.style.width=`${c.offsetWidth}px`,c.after(o),c.classList.add("lt-dragging"),c.style.position="fixed",c.style.left=`${_.left}px`,c.style.width=`${_.width}px`,c.style.top=`${b}px`,c.style.zIndex="1000",document.addEventListener("pointermove",X),document.addEventListener("pointerup",at)}function M(){let c=T().filter(_=>_!==r),l=r.getBoundingClientRect(),S=null;if(a==="x"){let _=l.left+l.width/2,O=l.top+l.height/2;for(let I of c){let U=I.getBoundingClientRect(),V=U.left+U.width/2,F=U.top+U.height/2;if(Math.abs(F-O)<U.height/2?_<V:O<F){S=I;break}}}else{let _=l.top+l.height/2;for(let O of c){let I=O.getBoundingClientRect(),U=I.top+I.height/2;if(_<U){S=O;break}}}S?t.insertBefore(o,S):t.appendChild(o)}function P(){let c=m,l=window.innerHeight-m;return c<80?-16*(1-c/80):l<80?16*(1-l/80):0}function q(){if(!r){g=null;return}let c=P();if(c===0){g=null;return}window.scrollBy(0,c),M(),g=requestAnimationFrame(q)}function R(){g===null&&P()!==0&&(g=requestAnimationFrame(q))}function H(){g!==null&&(cancelAnimationFrame(g),g=null)}function X(c){if(r){if(c.preventDefault(),m=c.clientY,a==="x"){let l=c.clientX-n,S=c.clientY-s;r.style.left=`${f+l}px`,r.style.top=`${b+S}px`}else{let l=c.clientY-s;r.style.top=`${b+l}px`}M(),a==="y"&&R()}}function at(){if(!r)return;H(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",X),document.removeEventListener("pointerup",at),W();let c=T().map(l=>l.dataset.reorderItem);r=null,o=null,e&&e(c)}t.addEventListener("pointerdown",N)}var Ja="joshuaegage@gmail.com";function fa(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function o(){if(r)return;r=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(s){s.key==="Escape"&&o()}e.addEventListener("click",s=>{s.target===e&&o()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",o),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),f=encodeURIComponent("Lift Tracker feedback"),b=encodeURIComponent(s||"(no message entered)");window.location.href=`mailto:${Ja}?subject=${f}&body=${b}`,o()})}var Pt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Zt(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Qa(t,e=new Date){let a=Zt(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let s=new Date(n.performed_at);s>=a&&s<r&&o.add($(n.performed_at))}return o.size}function ma(t){let e=null;for(let a of Pt)t>=a.days&&(e=a);return e}function Ht(t,e=new Date){let a=Qa(t,e);return{days:a,tier:ma(a)}}function te(t){let e=new Map;for(let r of t){let n=Zt(new Date(r.performed_at)).getTime();e.has(n)||e.set(n,new Set),e.get(n).add($(r.performed_at))}let a={};for(let r of Pt)a[r.key]=0;for(let r of e.values()){let o=ma(r.size);o&&(a[o.key]+=1)}return a}function Za(t){let e=new Set;for(let a of t)e.add($(a.performed_at));return e.size}function tr(t){let e=new Set;for(let n of t)e.add(Zt(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,s)=>n-s);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+7),o=s.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function er(t){return{totalDays:Za(t),tierCounts:te(t),longestStreak:tr(t)}}var ar=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5}];function Bt(t){let e=er(t);return ar.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Ft(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var vt=null,ee=null;function rr(){return vt||(vt=document.createElement("div"),vt.className="lt-toast",document.body.appendChild(vt),vt)}function ct(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=rr();clearTimeout(ee),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),s=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(ee),s(),e&&e()},{once:!0}),ee=setTimeout(()=>{s(),a&&a()},r)}function qt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function St(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Vt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Kt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var ha="lt-discovery-seen-",z={weight:"weight",history:"history",composite:"composite"};function Yt(t){try{return window.localStorage.getItem(`${ha}${t}`)==="true"}catch{return!1}}function et(t){try{window.localStorage.setItem(`${ha}${t}`,"true")}catch{}}var ga="lt-weight-card-expanded";function xt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function or(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function ya(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function wa(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await bt(),o=kt(r),n=sa(o),s=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let f=n.change<0?"↘":n.change>0?"↗":"→",b=qt(ga,!1);function m(){t.classList.toggle("lt-stats-row-expanded",b),b?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${xt(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${or(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${xt(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${f} ${xt(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${xt(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}b=!b,St(ga,b),m()}),b?Jt(t.querySelector("[data-home-weight-canvas]"),o):Qt()}m()}async function ba(t){et(z.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",B);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(c=>{c.addEventListener("click",()=>{c.dataset.tab!==r&&(r=c.dataset.tab,e.forEach(l=>l.setAttribute("aria-selected",String(l===c))),Object.entries(a).forEach(([l,S])=>{S.hidden=l!==r}),r==="weight"?p():R().catch(l=>console.error("[lift-tracker]",l)))})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),f=t.querySelector("[data-weight-chart-section]"),b=t.querySelector("[data-weight-canvas]"),m=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");n.value=$(new Date().toISOString());let y=[];async function x(){y=await bt(),i(),p()}function p(){let c=kt(y);if(c.length===0){f.hidden=!0,m.hidden=!1,Qt();return}f.hidden=!1,m.hidden=!0,a.weight.hidden||Jt(b,c)}function i(){if(y.length===0){g.innerHTML="";return}let c=y.slice().sort((l,S)=>new Date(S.logged_at)-new Date(l.logged_at));g.innerHTML=c.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${xt(Number(l.weight))} lb</span>
              <span class="lt-history-e1rm">${ya($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>D(l.dataset.editTrigger))})}function D(c){let l=g.querySelector(`[data-entry-id="${c}"]`),S=y.find(_=>_.id===c);!l||!S||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${S.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${$(S.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",i),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Qe(c),await x(),ct("Weight entry deleted",{onUndo:async()=>{await Ze(c),await x()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async _=>{_.preventDefault();let O=Number(l.querySelector("[data-edit-weight]").value),I=l.querySelector("[data-edit-date]").value;if(!(O>=0)||!I)return;let U=new Date(S.logged_at),[V,F,pt]=I.split("-").map(Number);U.setFullYear(V,F-1,pt),await Je(c,{weight:O,logged_at:U.toISOString()}),await x()}))}o.addEventListener("submit",async c=>{c.preventDefault();let l=Number(s.value),S=n.value;if(!(l>=0)||!Number.isFinite(l)||!S)return;let[_,O,I]=S.split("-").map(Number),U=new Date;U.setFullYear(_,O-1,I),await ze(l,U.toISOString()),s.value="",s.focus(),n.value=$(new Date().toISOString()),await x()});let E=t.querySelector("[data-waist-form]"),T=t.querySelector("[data-waist-date-input]"),N=t.querySelector("[data-waist-input]"),W=t.querySelector("[data-waist-chart-section]"),h=t.querySelector("[data-waist-canvas]"),k=t.querySelector("[data-waist-empty]"),L=t.querySelector("[data-waist-history]");T.value=$(new Date().toISOString());let C=[],M=!1,P=null;async function q(){C=await Lt(),M=!0,X(),H()}async function R(){if(M){H();return}P||(k.hidden=!1,k.textContent="Loading waist...",W.hidden=!0,P=q().finally(()=>{P=null})),await P}function H(){let c=Ct(C);if(c.length===0){W.hidden=!0,k.hidden=!1,k.textContent="No waist measurements yet — add your first one above.",pa();return}W.hidden=!1,k.hidden=!0,a.waist.hidden||ua(h,c)}function X(){if(C.length===0){L.innerHTML="";return}let c=C.slice().sort((l,S)=>new Date(S.logged_at)-new Date(l.logged_at));L.innerHTML=c.map(l=>`
          <li class="lt-history-row" data-entry-id="${l.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${l.id}">
              <span class="lt-history-weight">${xt(Number(l.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${ya($(l.logged_at))}</span>
            </button>
          </li>
        `).join(""),L.querySelectorAll("[data-edit-trigger]").forEach(l=>{l.addEventListener("click",()=>at(l.dataset.editTrigger))})}function at(c){let l=L.querySelector(`[data-entry-id="${c}"]`),S=C.find(_=>_.id===c);!l||!S||(l.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${S.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${$(S.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,l.querySelector("[data-edit-cancel]").addEventListener("click",X),l.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await aa(c),await q(),ct("Waist measurement deleted",{onUndo:async()=>{await ra(c),await q()}}))}),l.querySelector("[data-edit-form]").addEventListener("submit",async _=>{_.preventDefault();let O=Number(l.querySelector("[data-edit-waist]").value),I=l.querySelector("[data-edit-date]").value;if(!(O>=0)||!I)return;let U=new Date(S.logged_at),[V,F,pt]=I.split("-").map(Number);U.setFullYear(V,F-1,pt),await ea(c,{waist_circumference:O,logged_at:U.toISOString()}),await q()}))}E.addEventListener("submit",async c=>{c.preventDefault();let l=Number(N.value),S=T.value;if(!(l>=0)||!Number.isFinite(l)||!S)return;let[_,O,I]=S.split("-").map(Number),U=new Date;U.setFullYear(_,O-1,I),await ta(l,U.toISOString()),N.value="",N.focus(),T.value=$(new Date().toISOString()),await q()}),await x()}var ka="lt-seen-rank-achievements";function Gt(){let t=Vt(ka,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function va(t){Kt(ka,JSON.stringify(t))}var ae="lt-active-workout";function re(){try{return window.localStorage.getItem(ae)||null}catch{return null}}function oe(t){try{t?window.localStorage.setItem(ae,t):window.localStorage.removeItem(ae)}catch{}}function Sa(t){let e=re();return e&&t.find(a=>a.id===e)||null}var xa="lt-composite-expanded",ne="lt-header-menu-open";async function Ea(t){let{data:{session:e}}=await w.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,s=null;function f(d=!0){s&&(clearTimeout(s),s=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),d&&St(ne,!1),s=setTimeout(()=>{o.hidden=!0,s=null},n)}function b({persist:d=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),o.hidden=!1,u?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),d&&St(ne,!0)}r.addEventListener("click",()=>{o.hidden?b():f()}),o.addEventListener("click",d=>{d.target.closest("button")&&f()}),qt(ne,!1)&&b({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Te);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>fa()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>w.auth.signOut());let x=t.querySelector("[data-composite-section]"),p=t.querySelector("[data-composite-toggle]"),i=t.querySelector("[data-composite-body]"),D=t.querySelector("[data-chevron]"),E=t.querySelector("[data-composite-summary]"),T=t.querySelector("[data-composite-discovery]");function N(d){p.setAttribute("aria-expanded",String(d)),i.hidden=!d,D.innerHTML=d?"&#9650;":"&#9660;",x.classList.toggle("lt-stats-row-expanded",d)}N(qt(xa,!0)),p.addEventListener("click",()=>{if(et(z.composite),T.hidden=!0,window.matchMedia("(max-width: 359px)").matches){$e();return}let d=p.getAttribute("aria-expanded")==="true";N(!d),St(xa,!d)});let W=t.querySelector("[data-killstreak-icon]"),h=t.querySelector("[data-killstreak-label]"),k=t.querySelector("[data-killstreak-sub]"),L=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Re);function C(d){let{days:u,tier:v}=Ht(d);W.textContent=v?v.icon:"🎯",h.textContent=v?`${v.label} Killstreak`:"No Killstreak",k.textContent=`${u} Day streak`;let Y=Bt(d).filter(G=>G.track==="rank"),A=Ft(Y,Gt()).length>0;L.hidden=!A}let M=t.querySelector("[data-weight-card]");function P(){et(z.weight),Ae()}function q(d){wa(M,{onExpand:P,...d}).catch(u=>{console.error("[lift-tracker]",u),M.classList.remove("lt-stats-row-expanded"),M.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,M.querySelector("[data-weight-expand]").addEventListener("click",P)})}let R=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{et(z.history),R.hidden=!0,Me()});let H=t.querySelector("[data-add-lift-form]"),X=t.querySelector("[data-add-lift-toggle]"),at=t.querySelector("[data-add-lift-discovery]"),c=t.querySelector("[data-add-lift-hint]"),l=t.querySelector("[data-create-workout-btn]"),S=t.querySelector("[data-create-workout-discovery]");X.addEventListener("click",()=>{let d=H.hidden;H.hidden=!d,X.setAttribute("aria-pressed",String(d)),X.classList.toggle("lt-add-lift-toggle-active",d),d&&H.querySelector('input[name="name"]').focus()});let _=t.querySelector("[data-lift-list]"),O=t.querySelector("[data-list-empty]");l.addEventListener("click",()=>{l.disabled||_e()});let I=t.querySelector("[data-workout-pills]"),U=t.querySelector("[data-workout-empty-hint]"),V=[],F=re();function pt(){return F&&V.find(d=>d.id===F)||null}function pe(){let d=pt();if(!d)return K;let u=new Set(d.liftIds);return K.filter(v=>u.has(v.id))}function fe(){I.innerHTML=V.map(d=>{let u=d.id===F;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of V){let u=I.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);u&&(u.textContent=d.name)}I.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let u=d.dataset.workoutPill;F=F===u?null:u,oe(F),fe(),zt(Et),ye(Et)})}),I.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",u=>{u.stopPropagation(),qe(d.dataset.workoutEdit)})})}let Xt="lt-fast-mode",me="lt-burst-mode";function Ba(){try{let d=window.localStorage.getItem(Xt);if(d!==null)return d==="true";let u=window.localStorage.getItem(me);return u!==null?(window.localStorage.setItem(Xt,u),window.localStorage.removeItem(me),u==="true"):!1}catch{return!1}}function Fa(d){try{window.localStorage.setItem(Xt,String(d))}catch{}}let K=[],rt=Ba(),ot=new Map,Et=[],Tt=t.querySelector("[data-mode-toggle]");function he(){Tt.textContent=rt?"Normal":"Fast",Tt.setAttribute("aria-pressed",String(rt)),Tt.classList.toggle("lt-mode-toggle-active",rt)}he(),Tt.addEventListener("click",()=>{rt=!rt,Fa(rt),he(),zt(Et)}),H.addEventListener("submit",async d=>{d.preventDefault();let u=H.querySelector('input[name="name"]'),v=u.value.trim();if(v){u.value="",u.disabled=!0;try{await yt(v,K.length),await ge()}finally{u.disabled=!1,u.focus()}}}),_t(_,{onReorder:async d=>{let u=[...d],v=new Set(d),Y=K.map(A=>v.has(A.id)?u.shift():A.id);await Ne(Y),K=Y.map(A=>K.find(G=>G.id===A)).filter(Boolean)}}),_t(I,{axis:"x",onReorder:async d=>{await Ke(d),V=d.map(u=>V.find(v=>v.id===u)).filter(Boolean)}});async function ge(){V=await wt(),F&&!V.some(A=>A.id===F)&&(F=null,oe(null)),fe(),K=await j();let d=K.length>=2;if(at.hidden=K.length>=2,c.hidden=K.length!==1,l.disabled=!d,l.setAttribute("aria-disabled",String(!d)),S.hidden=!d||V.length>0,U.hidden=!d||V.length>0,K.length===0){_.innerHTML="",O.hidden=!1,O.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",c.hidden=!0,x.hidden=!0,C([]),q({showDiscovery:!1}),R.hidden=!0,T.hidden=!0,ot=new Map,Et=[];return}let u=await Z(K.map(A=>A.id)),v=u.length>0;C(u),q({showDiscovery:v&&!Yt(z.weight)}),R.hidden=!v||Yt(z.history),ot=new Map(K.map(A=>[A.id,[]]));for(let A of u){let G=ot.get(A.lift_id);G&&G.push(A)}let Y=K.map(A=>({liftId:A.id,dailySeries:ft(ot.get(A.id)||[])}));zt(Y),ye(Y)}function ye(d){let u=pt(),v=u?d.filter(At=>u.liftIds.includes(At.liftId)):d,Y=Rt(v);x.hidden=!1;let A=t.querySelector("[data-composite-canvas]"),G=t.querySelector("[data-composite-empty]"),ht=t.querySelector("[data-composite-scope]"),gt=t.querySelector("[data-composite-blurb]");if(ht.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",gt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",G.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",Y.length===0){A.hidden=!0,G.hidden=!1,E.textContent="",T.hidden=!0;return}A.hidden=!1,G.hidden=!0,E.textContent=oa(Y[Y.length-1].pct),T.hidden=Yt(z.composite),Ut(A,Y)}function jt(d){let u=ft(ot.get(d)||[]),v=u[u.length-1];return v?`${Math.round(v.e1rm)} lb e1RM`:"No sets yet"}function Va(d){let u=ot.get(d)||[];return u.length===0?"":u[u.length-1].weight}function zt(d){Et=d;let u=pe();O.hidden=u.length>0,O.textContent=F?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",_.innerHTML=u.map(v=>rt?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${v.id}" data-lift-id="${v.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${v.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${jt(v.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${we(v.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${v.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Va(v.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${v.id}" data-lift-id="${v.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${v.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${jt(v.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${we(v.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let v of K){let A=_.querySelector(`[data-lift-id="${v.id}"]`)?.querySelector("[data-name-slot]");A&&(A.textContent=v.name)}_.querySelectorAll("[data-open-lift]").forEach(v=>{v.addEventListener("click",()=>De(v.dataset.openLift))}),rt&&Ka()}function Ka(){_.querySelectorAll("[data-fast-log-form]").forEach(d=>{let u=d.dataset.fastLogForm;d.addEventListener("submit",async v=>{v.preventDefault();let Y=d.querySelector("[data-fast-weight]"),A=d.querySelector("[data-fast-reps]"),G=d.querySelector("[data-fast-feedback]"),ht=Number(Y.value),gt=Number(A.value);if(!(ht>=0)||!Number.isFinite(ht)||!(gt>0)||!Number.isInteger(gt))return;let At=ot.get(u)||[],Ya=J(ht,gt),be=Wt(Ya,At),ke=new Date().toISOString(),Ga=await tt(u,ht,gt,ke),ve=[...At,Ga];ot.set(u,ve),A.value="",A.focus();let Se=_.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");Se&&(Se.textContent=jt(u));let Xa=$(ke),xe=mt(ve.filter(ja=>$(ja.performed_at)===Xa));G.hidden=!1,G.classList.toggle("lt-pr",be),G.textContent=be?`PR! ${Math.round(xe)} lb today`:`Logged · ${Math.round(xe)} lb today`})})}function we(d){return String(d).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await ge()}async function La(t,e){let a=await We(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",B);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",h=>{h.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let h=r.value.trim();if(!h||h===o){r.value=o;return}o=h,await Ie(e,h)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Oe(e),B(),ct(`Deleted "${o}"`,{onUndo:async()=>{await Ue(e),$t()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(h=>{h.addEventListener("click",()=>{n.forEach(k=>k.setAttribute("aria-selected",String(k===h))),Object.entries(s).forEach(([k,L])=>{L.hidden=k!==h.dataset.tab}),h.dataset.tab==="details"&&W()})});let f=t.querySelector("[data-log-form]"),b=t.querySelector("[data-weight-input]"),m=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),y=[];async function x(){y=await Pe(e)}function p(){if(y.length===0)return;let h=y[y.length-1];b.value=h.weight}f.addEventListener("submit",async h=>{h.preventDefault();let k=Number(b.value),L=Number(m.value);if(!(k>=0)||!Number.isFinite(k)||!(L>0)||!Number.isInteger(L))return;let C=J(k,L),P=Wt(C,y),q=new Date;await tt(e,k,L,q.toISOString()),m.value="",m.focus(),await x(),E(),s.details.hidden||W();let R=$(q.toISOString()),H=mt(y.filter(X=>$(X.performed_at)===R));g.hidden=!1,g.classList.toggle("lt-pr",P),g.textContent=P?`New PR! Today's volume: ${Math.round(H)} lb`:`Logged. Today's volume: ${Math.round(H)} lb`});function i(h){let k=new Map;for(let L of h){let C=$(L.performed_at);k.has(C)||k.set(C,[]),k.get(C).push(L)}return Array.from(k.entries()).sort((L,C)=>C[0].localeCompare(L[0]))}function D(h){let[k,L,C]=h.split("-").map(Number);return new Date(k,L-1,C).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function E(){let h=s.history;if(y.length===0){h.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let k=i(y);h.innerHTML=k.map(([L,C])=>{let M=mt(C),q=C.slice().sort((R,H)=>new Date(H.performed_at)-new Date(R.performed_at)).map(R=>{let H=Math.round(J(Number(R.weight),Number(R.reps)));return`
              <li class="lt-history-row" data-set-id="${R.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${R.id}">
                  <span class="lt-history-weight">${R.weight} lb &times; ${R.reps}</span>
                  <span class="lt-history-e1rm">${H} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${D(L)}</span>
              <span class="lt-history-volume">${Math.round(M)} lb volume</span>
            </div>
            <ul class="lt-history-list">${q}</ul>
          </div>
        `}).join(""),h.querySelectorAll("[data-edit-trigger]").forEach(L=>{L.addEventListener("click",()=>N(L.dataset.editTrigger))})}function T(h){return s.history.querySelector(`[data-set-id="${h}"]`)}function N(h){let k=T(h),L=y.find(C=>C.id===h);!k||!L||(k.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${L.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${L.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${$(L.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,k.querySelector("[data-edit-cancel]").addEventListener("click",E),k.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Fe(h),await x(),E(),s.details.hidden||W(),ct("Set deleted",{onUndo:async()=>{await Ve(h),await x(),E(),s.details.hidden||W()}})}),k.querySelector("[data-edit-form]").addEventListener("submit",async C=>{C.preventDefault();let M=Number(k.querySelector("[data-edit-weight]").value),P=Number(k.querySelector("[data-edit-reps]").value),q=k.querySelector("[data-edit-date]").value;if(!(M>=0)||!(P>0)||!q)return;let R=new Date(L.performed_at),[H,X,at]=q.split("-").map(Number);R.setFullYear(H,X-1,at),await Be(h,{weight:M,reps:P,performed_at:R.toISOString()}),await x(),E(),s.details.hidden||W()}))}function W(){let h=s.details,k=ft(y);if(k.length===0){h.innerHTML='<p class="lt-empty">No sets logged yet.</p>',ca();return}h.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let L=h.querySelector("[data-lift-canvas]"),C=h.querySelector("[data-point-detail]");da(L,k,{onPointClick:M=>{C.hidden=!1,C.textContent=`${D(M.date)}: ${M.weight} lb × ${M.reps} (${Math.round(M.e1rm)} e1RM)`}})}await x(),p(),E()}var Ca=60;function Da(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-Ca),e}function ut(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function se(t,e,a=new Date,r=`last ${Ca} days`,o=[],n=[]){let s=$(a.toISOString()),f=[`Lift Tracker — ${r} (as of ${s})`,""],b=t.filter(m=>(e.get(m.id)||[]).length>0);if(b.length===0)f.push("No sets logged in this period."),f.push("");else{for(let g of b){let y=(e.get(g.id)||[]).slice().sort((i,D)=>new Date(i.performed_at)-new Date(D.performed_at)),x=mt(y),p=Math.max(...y.map(i=>J(Number(i.weight),Number(i.reps))));f.push(g.name);for(let i of y){let D=Math.round(J(Number(i.weight),Number(i.reps)));f.push(`  ${$(i.performed_at)}: ${i.weight} lb x ${i.reps} (e1RM ${D})`)}f.push(`  Sets: ${y.length} | Volume: ${Math.round(x)} lb | Best e1RM: ${Math.round(p)}`),f.push("")}let m=t.length-b.length;m>0&&(f.push(`(${m} lift${m===1?"":"s"} with no sets in this period omitted)`),f.push(""))}if(o.length>0){f.push("Body weight");for(let p of o)f.push(`  ${p.date}: ${ut(p.weight)} lb`);let m=o[0].weight,g=o[o.length-1].weight,y=g-m,x=y>0?"+":"";f.push(`  Start: ${ut(m)} lb | Current: ${ut(g)} lb | Change: ${x}${ut(y)} lb`),f.push("")}if(n.length>0){f.push("Waist");for(let p of n)f.push(`  ${p.date}: ${ut(p.waist)} in`);let m=n[0].waist,g=n[n.length-1].waist,y=g-m,x=y>0?"+":"";f.push(`  Start: ${ut(m)} in | Current: ${ut(g)} in | Change: ${x}${ut(y)} in`),f.push("")}return f.join(`
`).trimEnd()}var nr=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],sr=`
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
`;async function _a(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${nr.map(p=>`
          <section class="lt-help-section">
            <h2>${p.title}</h2>
            <p>${p.body}</p>
          </section>
          ${p.title==="Export progress"?sr:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",B);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let i=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(i)),a.hidden=!i,r.innerHTML=i?"&#9650;":"&#9660;",!!i){e.disabled=!0;try{let D=await j(),E=D.map(q=>q.id),T=Da().toISOString(),N=await He(E,T),W=new Map(D.map(q=>[q.id,[]]));for(let q of N){let R=W.get(q.lift_id);R&&R.push(q)}let k=(await bt()).filter(q=>new Date(q.logged_at)>=new Date(T)),L=kt(k),M=(await Lt()).filter(q=>new Date(q.logged_at)>=new Date(T)),P=Ct(M);o.value=se(D,W,new Date,void 0,L,P),s.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}s.hidden=!1,s.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let f=t.querySelector("[data-full-export-toggle]"),b=t.querySelector("[data-full-export-body]"),m=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),y=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");f.addEventListener("click",async()=>{let i=!(f.getAttribute("aria-expanded")==="true");if(f.setAttribute("aria-expanded",String(i)),b.hidden=!i,m.innerHTML=i?"&#9650;":"&#9660;",!!i){f.disabled=!0;try{let D=await j(),E=D.map(C=>C.id),T=await Z(E),N=new Map(D.map(C=>[C.id,[]]));for(let C of T){let M=N.get(C.lift_id);M&&M.push(C)}let W=await bt(),h=kt(W),k=await Lt(),L=Ct(k);g.value=se(D,N,new Date,"all-time",h,L),x.hidden=!0}finally{f.disabled=!1}}}),y.addEventListener("click",async()=>{g.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}x.hidden=!1,x.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function qa(t){et(z.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",B);let[e,a]=await Promise.all([j(),wt()]),r=Sa(a),o=r?e.filter(p=>r.liftIds.includes(p.id)):e,n=o.length?await Z(o.map(p=>p.id)):[],s=new Map(o.map(p=>[p.id,[]]));for(let p of n){let i=s.get(p.lift_id);i&&i.push(p)}let f=o.map(p=>({liftId:p.id,dailySeries:ft(s.get(p.id)||[])})),b=Rt(f),m=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),y=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(y.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",x.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",b.length===0){m.hidden=!0,g.hidden=!1;return}m.hidden=!1,g.hidden=!0,Ut(m,b)}function ir(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function lr(){let t=await j(),e=new Map(t.map(r=>[r.id,r.name]));return(await Z(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function dr(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,s])=>{let b=s.slice().sort((m,g)=>new Date(m.performed_at)-new Date(g.performed_at)).map(m=>{let g=Math.round(J(Number(m.weight),Number(m.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${m.weight} lb &times; ${m.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
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
        <span>${ir(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function Ta(t){et(z.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",B);let e=t.querySelector("[data-history-content]"),a=await lr();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=na(a);e.innerHTML=r.map(([o,n])=>dr(o,n)).join("")}var Aa="lt-theme",ie="default";function le(){return Vt(Aa,ie)}function $a(t){!t||t===ie?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function Ma(t){$a(t),Kt(Aa,t||ie)}function Ra(){$a(le())}var cr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},ur=["rank","mastery","streak","capstone"];async function Wa(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",B);let e=await j(),a=e.length?await Z(e.map(i=>i.id)):[],{days:r,tier:o}=Ht(a);t.querySelector("[data-killstreak-current-icon]").textContent=o?o.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=o?`${o.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let n=te(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Pt.map(i=>{let D=n[i.key];return`
      <li class="lt-killstreak-tier-row${o?.key===i.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${i.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${i.label}</span>
          <span class="lt-killstreak-tier-req">${i.days}+ day${i.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${D} earned</span>
      </li>
    `}).join("");let f=Bt(a),b=f.filter(i=>i.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${b} / ${f.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let m=f.filter(i=>i.track==="rank"),g=new Set(Ft(m,Gt()));va(m.filter(i=>i.unlocked).map(i=>i.id));let y=t.querySelector("[data-achievements]");function x(i){if(i.track!=="rank")return`
        <li class="lt-achievement-card${i.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${i.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${i.name}</span>
            <span class="lt-achievement-card-desc">${i.description}</span>
          </span>
        </li>
      `;let D=i.unlocked&&le()===i.theme.id,E=i.unlocked&&g.has(i.id),T=i.unlocked?`<span class="lt-achievement-card-theme">🎨 ${i.theme.label}${D?" · Active":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${i.theme.label}</span>`;return`
      <li class="lt-achievement-card${i.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${E?" lt-achievement-card-new":""}${D?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${i.theme.id}"${i.unlocked?"":" disabled"} aria-label="${i.unlocked?`Apply the ${i.theme.label} theme`:`Locked: ${i.name}`}">
          <span class="lt-achievement-card-icon">${i.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${i.name}</span>
            <span class="lt-achievement-card-desc">${i.description}</span>
            ${T}
          </span>
        </button>
      </li>
    `}function p(){y.innerHTML=ur.map(i=>{let E=f.filter(T=>T.track===i).sort((T,N)=>Number(N.unlocked)-Number(T.unlocked)).map(x).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${cr[i]}</h3>
          <ul class="lt-achievement-list">${E}</ul>
        </section>
      `}).join("")}p(),y.addEventListener("click",i=>{let D=i.target.closest("[data-apply-theme]");!D||D.disabled||(Ma(D.dataset.applyTheme),p())})}var Ia="__divider__";async function de(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([j(),r?Ye(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?Na(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",B);let f=t.querySelector("[data-workout-name-input]"),b=t.querySelector("[data-workout-lift-list]"),m=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),y=t.querySelector("[data-workout-save-feedback]");m.hidden=o.length>0;let x=o.filter(E=>s.has(E.id)),p=o.filter(E=>!s.has(E.id));b.innerHTML=[...x.map(i),D(),...p.map(i)].join("");for(let E of o){let N=b.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");N&&(N.textContent=E.name)}_t(b,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Xe(a),B(),ct(`Deleted "${n.name}"`,{onUndo:async()=>{await je(a),$t()}}))}),g.addEventListener("click",async()=>{let E=f.value.trim();if(!E){f.focus();return}let T=Array.from(b.querySelectorAll("[data-reorder-item]")),N=T.findIndex(h=>h.dataset.reorderItem===Ia),W=T.slice(0,N).map(h=>h.dataset.reorderItem);g.disabled=!0,y.hidden=!0;try{if(r)await Ge(a,E,W);else{let h=await wt();await Mt(E,W,h.length)}B()}catch(h){console.error("[lift-tracker]",h),y.hidden=!1,y.textContent="Something went wrong saving the workout.",g.disabled=!1}});function i(E){return`
      <li class="lt-lift-row" data-reorder-item="${E.id}" data-lift-id="${E.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${Na(E.name)}">&#8942;&#8942;</button>
      </li>
    `}function D(){return`
      <li class="lt-workout-divider" data-reorder-item="${Ia}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function Na(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var pr=`${window.location.origin}${window.location.pathname}`;function fr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ce(t){let e="signin";function a(o,n,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${fr(s||"")}">

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
    `}function r(o,n,s){t.innerHTML=a(o,n,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let f=t.querySelector("[data-auth-form]");f.addEventListener("submit",async b=>{b.preventDefault();let m=f.email.value.trim(),g=f.password.value,y=f.querySelector('button[type="submit"]');y.disabled=!0,y.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:p}=e==="signup"?await w.auth.signUp({email:m,password:g,options:{emailRedirectTo:pr}}):await w.auth.signInWithPassword({email:m,password:g});if(p)throw p;if(e==="signup"&&!x.session){e="signin",r(null,`Account created. Check ${m} for a confirmation link, then sign in here.`,m);return}}catch(x){r(x.message||"Something went wrong. Try again.",null,m)}})}r()}function Oa(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function Ua(){let{data:t,error:e}=await w.auth.signInAnonymously();if(e)throw e;return await mr(),t}async function mr(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([yt("Bench Press",0),yt("Squat",1),yt("Deadlift",2)]);await Promise.all([tt(e.id,135,8,t(6)),tt(e.id,145,6,t(2)),tt(a.id,185,5,t(5)),tt(a.id,195,5,t(1)),tt(r.id,225,5,t(3))]),await Mt("Full Body",[e.id,a.id,r.id],0)}var Q=document.getElementById("lift-tracker-app");Ra();async function ue(){try{let{data:{session:t}}=await w.auth.getSession();if(!t)if(Oa())try{await Ua()}catch(a){console.error("[lift-tracker] guest demo sign-in failed",a),await ce(Q);return}else{await ce(Q);return}let e=Ce();e.name==="detail"?await La(Q,e.liftId):e.name==="help"?await _a(Q):e.name==="weight"?await ba(Q):e.name==="composite"?await qa(Q):e.name==="history"?await Ta(Q):e.name==="killstreak"?await Wa(Q):e.name==="workout-new"?await de(Q,{mode:"create"}):e.name==="workout-edit"?await de(Q,{mode:"edit",workoutId:e.workoutId}):await Ea(Q),window.scrollTo(0,0)}catch(t){console.error("[lift-tracker]",t),Q.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",ue);var Pa=null,Ha=!1;w.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!Ha;Ha=!0;let o=a!==Pa;Pa=a,!(r||!o)&&(B(),ue())});ue();

import{createClient as ja}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Ee="https://mqfsgammpsumpltfutwl.supabase.co",Le="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var w=ja(Ee,Le);function De(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function H(){window.location.hash="#/"}function Ce(t){window.location.hash=`#/lift/${t}`}function _e(){window.location.hash="#/workout/new"}function qe(t){window.location.hash=`#/workout/${t}/edit`}function Te(){window.location.hash="#/help"}function $e(){window.location.hash="#/weight"}function Ae(){window.location.hash="#/composite"}function Me(){window.location.hash="#/history"}function Re(){window.location.hash="#/killstreak"}function $t(){window.dispatchEvent(new Event("hashchange"))}async function X(){let{data:t,error:e}=await w.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function We(t){let{data:e,error:a}=await w.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function ht(t,e){let{data:a,error:r}=await w.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Ie(t,e){let{data:a,error:r}=await w.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Ne(t){let e=t.map((o,n)=>w.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Oe(t){let{error:e}=await w.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ue(t){let{error:e}=await w.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Pe(t){let{data:e,error:a}=await w.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function Z(t){if(!t||t.length===0)return[];let{data:e,error:a}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function He(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function tt(t,e,a,r){let{data:o,error:n}=await w.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Be(t,e){let{data:a,error:r}=await w.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Fe(t){let{error:e}=await w.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ve(t){let{error:e}=await w.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function gt(){let{data:t,error:e}=await w.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Ke(t){let e=t.map((o,n)=>w.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ye(t){let{data:e,error:a}=await w.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function At(t,e,a){let{data:r,error:o}=await w.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await w.from("workout_lifts").insert(e.map(i=>({workout_id:r.id,lift_id:i})));if(n)throw n}return r}async function Ge(t,e,a){let{error:r}=await w.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await w.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await w.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(n)throw n}}async function Xe(t){let{error:e}=await w.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function je(t){let{error:e}=await w.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function yt(){let{data:t,error:e}=await w.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ze(t,e){let{data:a,error:r}=await w.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Je(t,e){let{data:a,error:r}=await w.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Qe(t){let{error:e}=await w.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ze(t){let{error:e}=await w.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Et(){let{data:t,error:e}=await w.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function ta(t,e){let{data:a,error:r}=await w.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ea(t,e){let{data:a,error:r}=await w.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function aa(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ra(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function J(t,e){return t*(1+e/30)}function W(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function ut(t){let e=new Map;for(let a of t){let r=W(a.performed_at),o=J(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Mt(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let r=new Set;for(let i of e)for(let p of i.dailySeries)r.add(p.date);let o=Array.from(r).sort(),n=[];for(let i of o){let p=0,k=0;for(let f of e){let g=null;for(let y of f.dailySeries)if(y.date<=i)g=y;else break;g&&(p+=g.e1rm/a.get(f.liftId),k+=1)}if(k>0){let f=p/k;n.push({date:i,ratio:f,pct:(f-1)*100})}}return n}function Rt(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>J(Number(r.weight),Number(r.reps))));return t>a}function pt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function oa(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function na(t){let e=new Map;for(let a of t){let r=W(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function wt(t){let e=new Map;for(let a of t){let r=W(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function ia(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Lt(t){let e=new Map;for(let a of t){let r=W(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var Dt=null,ot=null,nt=null,it=null,Nt=14,Wt="#e8242c",sa="rgba(232, 36, 44, 0.18)",It="#f2b134",la="rgba(242, 177, 52, 0.16)",st="#9a9ca6",lt="rgba(255, 255, 255, 0.08)";function Ot(t,e,{onPointClick:a}={}){Dt&&(Dt.destroy(),Dt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return Dt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:Wt,backgroundColor:sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Wt,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:lt}},y:{ticks:{color:st,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:lt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Dt}function da(t,e,{onPointClick:a}={}){ot&&(ot.destroy(),ot=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return ot=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:It,backgroundColor:la,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:It,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:lt}},y:{ticks:{color:st},grid:{color:lt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),ot}function ca(){ot&&(ot.destroy(),ot=null)}function Jt(t,e,{onPointClick:a}={}){nt&&(nt.destroy(),nt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return nt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:Wt,backgroundColor:sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Wt,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:lt}},y:{ticks:{color:st},grid:{color:lt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),nt}function Qt(){nt&&(nt.destroy(),nt=null)}function ua(t,e,{onPointClick:a}={}){it&&(it.destroy(),it=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return it=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:It,backgroundColor:la,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:It,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:lt}},y:{ticks:{color:st},grid:{color:lt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),it}function pa(){it&&(it.destroy(),it=null)}function Ct(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,i=0,p=0,k=0,f=0,g=null,y=null,x=null,d=0,s=0,_=null,E=null;function T(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function O(u){let C=u.target.closest(".lt-drag-handle");if(!C)return;let q=C.closest("[data-reorder-item]");if(q){if(u.pointerType!=="touch"){u.preventDefault(),D(q,u.clientX,u.clientY);return}if(C.setPointerCapture)try{C.setPointerCapture(u.pointerId),_=C,E=u.pointerId}catch{}x=q,d=u.clientX,s=u.clientY,document.addEventListener("pointermove",v),document.addEventListener("pointerup",L),y=setTimeout(()=>{clearTimeout(y),y=null;let A=x,F=d,G=s;h(),D(A,F,G)},180)}}function U(){if(_&&E!==null&&_.releasePointerCapture)try{_.releasePointerCapture(E)}catch{}_=null,E=null}function h(){clearTimeout(y),y=null,x=null,document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",L)}function v(u){if(!x)return;let C=u.clientX-d,q=u.clientY-s;Math.hypot(C,q)<=10||(h(),U())}function L(){h(),U()}function D(u,C,q){r=u,n=C,i=q,f=q;let A=u.getBoundingClientRect();k=A.top,p=A.left,o=document.createElement(u.tagName),o.className="lt-reorder-placeholder",o.style.height=`${u.offsetHeight}px`,o.style.width=`${u.offsetWidth}px`,u.after(o),u.classList.add("lt-dragging"),u.style.position="fixed",u.style.left=`${A.left}px`,u.style.width=`${A.width}px`,u.style.top=`${k}px`,u.style.zIndex="1000",document.addEventListener("pointermove",m),document.addEventListener("pointerup",$)}function I(){let u=T().filter(A=>A!==r),C=r.getBoundingClientRect(),q=null;if(a==="x"){let A=C.left+C.width/2,F=C.top+C.height/2;for(let G of u){let P=G.getBoundingClientRect(),z=P.left+P.width/2,St=P.top+P.height/2;if(Math.abs(St-F)<P.height/2?A<z:F<St){q=G;break}}}else{let A=C.top+C.height/2;for(let F of u){let G=F.getBoundingClientRect(),P=G.top+G.height/2;if(A<P){q=F;break}}}q?t.insertBefore(o,q):t.appendChild(o)}function B(){let u=f,C=window.innerHeight-f;return u<80?-16*(1-u/80):C<80?16*(1-C/80):0}function R(){if(!r){g=null;return}let u=B();if(u===0){g=null;return}window.scrollBy(0,u),I(),g=requestAnimationFrame(R)}function N(){g===null&&B()!==0&&(g=requestAnimationFrame(R))}function b(){g!==null&&(cancelAnimationFrame(g),g=null)}function m(u){if(r){if(u.preventDefault(),f=u.clientY,a==="x"){let C=u.clientX-n,q=u.clientY-i;r.style.left=`${p+C}px`,r.style.top=`${k+q}px`}else{let C=u.clientY-i;r.style.top=`${k+C}px`}I(),a==="y"&&N()}}function $(){if(!r)return;b(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",m),document.removeEventListener("pointerup",$),U();let u=T().map(C=>C.dataset.reorderItem);r=null,o=null,e&&e(u)}t.addEventListener("pointerdown",O)}var za="joshuaegage@gmail.com";function fa(){let t=document.createElement("div");t.className="lt-feedback-overlay",t.innerHTML=`
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
  `,document.body.appendChild(t);let e=t.querySelector("[data-feedback-text]");e.focus();function a(){t.remove()}t.addEventListener("click",r=>{r.target===t&&a()}),t.querySelector("[data-feedback-cancel]").addEventListener("click",a),t.querySelector("[data-feedback-send]").addEventListener("click",()=>{let r=e.value.trim(),o=encodeURIComponent("Lift Tracker feedback"),n=encodeURIComponent(r||"(no message entered)");window.location.href=`mailto:${za}?subject=${o}&body=${n}`,a()})}var Ut=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Zt(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Ja(t,e=new Date){let a=Zt(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let i=new Date(n.performed_at);i>=a&&i<r&&o.add(W(n.performed_at))}return o.size}function ma(t){let e=null;for(let a of Ut)t>=a.days&&(e=a);return e}function Pt(t,e=new Date){let a=Ja(t,e);return{days:a,tier:ma(a)}}function te(t){let e=new Map;for(let r of t){let n=Zt(new Date(r.performed_at)).getTime();e.has(n)||e.set(n,new Set),e.get(n).add(W(r.performed_at))}let a={};for(let r of Ut)a[r.key]=0;for(let r of e.values()){let o=ma(r.size);o&&(a[o.key]+=1)}return a}function Qa(t){let e=new Set;for(let a of t)e.add(W(a.performed_at));return e.size}function Za(t){let e=new Set;for(let n of t)e.add(Zt(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,i)=>n-i);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+7),o=i.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function tr(t){return{totalDays:Qa(t),tierCounts:te(t),longestStreak:Za(t)}}var er=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5}];function Ht(t){let e=tr(t);return er.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Bt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var bt=null,ee=null;function ar(){return bt||(bt=document.createElement("div"),bt.className="lt-toast",document.body.appendChild(bt),bt)}function dt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=ar();clearTimeout(ee),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),i=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(ee),i(),e&&e()},{once:!0}),ee=setTimeout(()=>{i(),a&&a()},r)}function _t(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function kt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Ft(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Vt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var ha="lt-discovery-seen-",j={weight:"weight",history:"history",composite:"composite"};function Kt(t){try{return window.localStorage.getItem(`${ha}${t}`)==="true"}catch{return!1}}function et(t){try{window.localStorage.setItem(`${ha}${t}`,"true")}catch{}}var ga="lt-weight-card-expanded";function vt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function rr(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function ya(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function ae(t,{onExpand:e,showDiscovery:a=!1}={}){let r=await yt(),o=wt(r),n=ia(o),i=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${i}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let p=n.change<0?"↘":n.change>0?"↗":"→",k=_t(ga,!1);function f(){t.classList.toggle("lt-stats-row-expanded",k),k?t.innerHTML=`
        <div class="lt-weight-card-header">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="true">
            <span>Weight</span>
            ${i}
            <span class="lt-chevron" data-weight-chevron>&#9650;</span>
          </button>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <div class="lt-weight-card-body">
          <div class="lt-weight-stats lt-weight-stats-row">
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Start</span>
              <span class="lt-weight-stat-value">${vt(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${rr(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${vt(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${p} ${vt(Math.abs(n.change))} lbs</span>
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
              ${i}
              <span class="lt-chevron" data-weight-chevron>&#9660;</span>
            </span>
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${vt(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}k=!k,kt(ga,k),f()}),k?Jt(t.querySelector("[data-home-weight-canvas]"),o):Qt()}f()}async function wa(t){et(j.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(b=>{b.addEventListener("click",()=>{b.dataset.tab!==r&&(r=b.dataset.tab,e.forEach(m=>m.setAttribute("aria-selected",String(m===b))),Object.entries(a).forEach(([m,$])=>{$.hidden=m!==r}),r==="weight"?d():B())})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),p=t.querySelector("[data-weight-chart-section]"),k=t.querySelector("[data-weight-canvas]"),f=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");n.value=W(new Date().toISOString());let y=[];async function x(){y=await yt(),s(),d()}function d(){let b=wt(y);if(b.length===0){p.hidden=!0,f.hidden=!1,Qt();return}p.hidden=!1,f.hidden=!0,a.weight.hidden||Jt(k,b)}function s(){if(y.length===0){g.innerHTML="";return}let b=y.slice().sort((m,$)=>new Date($.logged_at)-new Date(m.logged_at));g.innerHTML=b.map(m=>`
          <li class="lt-history-row" data-entry-id="${m.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${m.id}">
              <span class="lt-history-weight">${vt(Number(m.weight))} lb</span>
              <span class="lt-history-e1rm">${ya(W(m.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(m=>{m.addEventListener("click",()=>_(m.dataset.editTrigger))})}function _(b){let m=g.querySelector(`[data-entry-id="${b}"]`),$=y.find(u=>u.id===b);!m||!$||(m.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${$.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${W($.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",s),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Qe(b),await x(),dt("Weight entry deleted",{onUndo:async()=>{await Ze(b),await x()}}))}),m.querySelector("[data-edit-form]").addEventListener("submit",async u=>{u.preventDefault();let C=Number(m.querySelector("[data-edit-weight]").value),q=m.querySelector("[data-edit-date]").value;if(!(C>=0)||!q)return;let A=new Date($.logged_at),[F,G,P]=q.split("-").map(Number);A.setFullYear(F,G-1,P),await Je(b,{weight:C,logged_at:A.toISOString()}),await x()}))}o.addEventListener("submit",async b=>{b.preventDefault();let m=Number(i.value),$=n.value;if(!(m>=0)||!Number.isFinite(m)||!$)return;let[u,C,q]=$.split("-").map(Number),A=new Date;A.setFullYear(u,C-1,q),await ze(m,A.toISOString()),i.value="",i.focus(),n.value=W(new Date().toISOString()),await x()});let E=t.querySelector("[data-waist-form]"),T=t.querySelector("[data-waist-date-input]"),O=t.querySelector("[data-waist-input]"),U=t.querySelector("[data-waist-chart-section]"),h=t.querySelector("[data-waist-canvas]"),v=t.querySelector("[data-waist-empty]"),L=t.querySelector("[data-waist-history]");T.value=W(new Date().toISOString());let D=[];async function I(){D=await Et(),R(),B()}function B(){let b=Lt(D);if(b.length===0){U.hidden=!0,v.hidden=!1,pa();return}U.hidden=!1,v.hidden=!0,a.waist.hidden||ua(h,b)}function R(){if(D.length===0){L.innerHTML="";return}let b=D.slice().sort((m,$)=>new Date($.logged_at)-new Date(m.logged_at));L.innerHTML=b.map(m=>`
          <li class="lt-history-row" data-entry-id="${m.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${m.id}">
              <span class="lt-history-weight">${vt(Number(m.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${ya(W(m.logged_at))}</span>
            </button>
          </li>
        `).join(""),L.querySelectorAll("[data-edit-trigger]").forEach(m=>{m.addEventListener("click",()=>N(m.dataset.editTrigger))})}function N(b){let m=L.querySelector(`[data-entry-id="${b}"]`),$=D.find(u=>u.id===b);!m||!$||(m.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${$.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${W($.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",R),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await aa(b),await I(),dt("Waist measurement deleted",{onUndo:async()=>{await ra(b),await I()}}))}),m.querySelector("[data-edit-form]").addEventListener("submit",async u=>{u.preventDefault();let C=Number(m.querySelector("[data-edit-waist]").value),q=m.querySelector("[data-edit-date]").value;if(!(C>=0)||!q)return;let A=new Date($.logged_at),[F,G,P]=q.split("-").map(Number);A.setFullYear(F,G-1,P),await ea(b,{waist_circumference:C,logged_at:A.toISOString()}),await I()}))}E.addEventListener("submit",async b=>{b.preventDefault();let m=Number(O.value),$=T.value;if(!(m>=0)||!Number.isFinite(m)||!$)return;let[u,C,q]=$.split("-").map(Number),A=new Date;A.setFullYear(u,C-1,q),await ta(m,A.toISOString()),O.value="",O.focus(),T.value=W(new Date().toISOString()),await I()}),await Promise.all([x(),I()])}var ba="lt-seen-rank-achievements";function Yt(){let t=Ft(ba,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function ka(t){Vt(ba,JSON.stringify(t))}var re="lt-active-workout";function oe(){try{return window.localStorage.getItem(re)||null}catch{return null}}function ne(t){try{t?window.localStorage.setItem(re,t):window.localStorage.removeItem(re)}catch{}}function va(t){let e=oe();return e&&t.find(a=>a.id===e)||null}var Sa="lt-composite-expanded",ie="lt-header-menu-open";async function xa(t){let{data:{session:e}}=await w.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,i=null;function p(l=!0){i&&(clearTimeout(i),i=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),l&&kt(ie,!1),i=setTimeout(()=>{o.hidden=!0,i=null},n)}function k({persist:l=!0,instant:c=!1}={}){i&&(clearTimeout(i),i=null),o.hidden=!1,c?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),l&&kt(ie,!0)}r.addEventListener("click",()=>{o.hidden?k():p()}),o.addEventListener("click",l=>{l.target.closest("button")&&p()}),_t(ie,!1)&&k({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Te);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>fa()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>w.auth.signOut());let x=t.querySelector("[data-composite-section]"),d=t.querySelector("[data-composite-toggle]"),s=t.querySelector("[data-composite-body]"),_=t.querySelector("[data-chevron]"),E=t.querySelector("[data-composite-summary]"),T=t.querySelector("[data-composite-discovery]");function O(l){d.setAttribute("aria-expanded",String(l)),s.hidden=!l,_.innerHTML=l?"&#9650;":"&#9660;",x.classList.toggle("lt-stats-row-expanded",l)}O(_t(Sa,!0)),d.addEventListener("click",()=>{if(et(j.composite),T.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ae();return}let l=d.getAttribute("aria-expanded")==="true";O(!l),kt(Sa,!l)});let U=t.querySelector("[data-killstreak-icon]"),h=t.querySelector("[data-killstreak-label]"),v=t.querySelector("[data-killstreak-sub]"),L=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Re);function D(l){let{days:c,tier:S}=Pt(l);U.textContent=S?S.icon:"🎯",h.textContent=S?`${S.label} Killstreak`:"No Killstreak",v.textContent=`${c} Day streak`;let K=Ht(l).filter(Y=>Y.track==="rank"),M=Bt(K,Yt()).length>0;L.hidden=!M}let I=t.querySelector("[data-weight-card]");function B(){et(j.weight),$e()}let R=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{et(j.history),R.hidden=!0,Me()});let N=t.querySelector("[data-add-lift-form]"),b=t.querySelector("[data-add-lift-toggle]"),m=t.querySelector("[data-add-lift-discovery]"),$=t.querySelector("[data-add-lift-hint]"),u=t.querySelector("[data-create-workout-btn]"),C=t.querySelector("[data-create-workout-discovery]");b.addEventListener("click",()=>{let l=N.hidden;N.hidden=!l,b.setAttribute("aria-pressed",String(l)),b.classList.toggle("lt-add-lift-toggle-active",l),l&&N.querySelector('input[name="name"]').focus()});let q=t.querySelector("[data-lift-list]"),A=t.querySelector("[data-list-empty]");u.addEventListener("click",()=>{u.disabled||_e()});let F=t.querySelector("[data-workout-pills]"),G=t.querySelector("[data-workout-empty-hint]"),P=[],z=oe();function St(){return z&&P.find(l=>l.id===z)||null}function fe(){let l=St();if(!l)return V;let c=new Set(l.liftIds);return V.filter(S=>c.has(S.id))}function Gt(){F.innerHTML=P.map(l=>{let c=l.id===z;return`
          <div class="lt-workout-pill-wrap${c?" lt-workout-pill-wrap-active":""}" data-reorder-item="${l.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${l.id}" aria-pressed="${c}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${l.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let l of P){let c=F.querySelector(`[data-workout-pill="${l.id}"] [data-workout-pill-name]`);c&&(c.textContent=l.name)}F.querySelectorAll("[data-workout-pill]").forEach(l=>{l.addEventListener("click",()=>{let c=l.dataset.workoutPill;z=z===c?null:c,ne(z),Gt(),zt(xt),ye(xt)})}),F.querySelectorAll("[data-workout-edit]").forEach(l=>{l.addEventListener("click",c=>{c.stopPropagation(),qe(l.dataset.workoutEdit)})})}let Xt="lt-fast-mode",me="lt-burst-mode";function Ha(){try{let l=window.localStorage.getItem(Xt);if(l!==null)return l==="true";let c=window.localStorage.getItem(me);return c!==null?(window.localStorage.setItem(Xt,c),window.localStorage.removeItem(me),c==="true"):!1}catch{return!1}}function Ba(l){try{window.localStorage.setItem(Xt,String(l))}catch{}}let V=[],at=Ha(),rt=new Map,xt=[],qt=t.querySelector("[data-mode-toggle]");function he(){qt.textContent=at?"Normal":"Fast",qt.setAttribute("aria-pressed",String(at)),qt.classList.toggle("lt-mode-toggle-active",at)}he(),qt.addEventListener("click",()=>{at=!at,Ba(at),he(),zt(xt)}),N.addEventListener("submit",async l=>{l.preventDefault();let c=N.querySelector('input[name="name"]'),S=c.value.trim();if(S){c.value="",c.disabled=!0;try{await ht(S,V.length),await ge()}finally{c.disabled=!1,c.focus()}}}),Ct(q,{onReorder:async l=>{let c=[...l],S=new Set(l),K=V.map(M=>S.has(M.id)?c.shift():M.id);await Ne(K),V=K.map(M=>V.find(Y=>Y.id===M)).filter(Boolean)}}),Ct(F,{axis:"x",onReorder:async l=>{await Ke(l),P=l.map(c=>P.find(S=>S.id===c)).filter(Boolean)}});async function ge(){P=await gt(),z&&!P.some(M=>M.id===z)&&(z=null,ne(null)),Gt(),V=await X();let l=V.length>=2;if(m.hidden=V.length>=2,$.hidden=V.length!==1,u.disabled=!l,u.setAttribute("aria-disabled",String(!l)),C.hidden=!l||P.length>0,G.hidden=!l||P.length>0,V.length===0){q.innerHTML="",A.hidden=!1,A.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",$.hidden=!0,x.hidden=!0,D([]),await ae(I,{onExpand:B,showDiscovery:!1}),R.hidden=!0,T.hidden=!0,rt=new Map,xt=[];return}let c=await Z(V.map(M=>M.id)),S=c.length>0;D(c),await ae(I,{onExpand:B,showDiscovery:S&&!Kt(j.weight)}),R.hidden=!S||Kt(j.history),rt=new Map(V.map(M=>[M.id,[]]));for(let M of c){let Y=rt.get(M.lift_id);Y&&Y.push(M)}let K=V.map(M=>({liftId:M.id,dailySeries:ut(rt.get(M.id)||[])}));zt(K),ye(K)}function ye(l){let c=St(),S=c?l.filter(Tt=>c.liftIds.includes(Tt.liftId)):l,K=Mt(S);x.hidden=!1;let M=t.querySelector("[data-composite-canvas]"),Y=t.querySelector("[data-composite-empty]"),ft=t.querySelector("[data-composite-scope]"),mt=t.querySelector("[data-composite-blurb]");if(ft.textContent=c?`Measuring ${c.name}`:"Measuring all lifts",mt.textContent=c?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",Y.textContent=c?`Log a few sets for lifts in ${c.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",K.length===0){M.hidden=!0,Y.hidden=!1,E.textContent="",T.hidden=!0;return}M.hidden=!1,Y.hidden=!0,E.textContent=oa(K[K.length-1].pct),T.hidden=Kt(j.composite),Ot(M,K)}function jt(l){let c=ut(rt.get(l)||[]),S=c[c.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function Fa(l){let c=rt.get(l)||[];return c.length===0?"":c[c.length-1].weight}function zt(l){xt=l;let c=fe();A.hidden=c.length>0,A.textContent=z?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",q.innerHTML=c.map(S=>at?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${S.id}" data-lift-id="${S.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${S.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${jt(S.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${we(S.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${S.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Fa(S.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${jt(S.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${we(S.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let S of V){let M=q.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");M&&(M.textContent=S.name)}q.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Ce(S.dataset.openLift))}),at&&Va()}function Va(){q.querySelectorAll("[data-fast-log-form]").forEach(l=>{let c=l.dataset.fastLogForm;l.addEventListener("submit",async S=>{S.preventDefault();let K=l.querySelector("[data-fast-weight]"),M=l.querySelector("[data-fast-reps]"),Y=l.querySelector("[data-fast-feedback]"),ft=Number(K.value),mt=Number(M.value);if(!(ft>=0)||!Number.isFinite(ft)||!(mt>0)||!Number.isInteger(mt))return;let Tt=rt.get(c)||[],Ka=J(ft,mt),be=Rt(Ka,Tt),ke=new Date().toISOString(),Ya=await tt(c,ft,mt,ke),ve=[...Tt,Ya];rt.set(c,ve),M.value="",M.focus();let Se=q.querySelector(`[data-lift-id="${c}"]`)?.querySelector("[data-last-slot]");Se&&(Se.textContent=jt(c));let Ga=W(ke),xe=pt(ve.filter(Xa=>W(Xa.performed_at)===Ga));Y.hidden=!1,Y.classList.toggle("lt-pr",be),Y.textContent=be?`PR! ${Math.round(xe)} lb today`:`Logged · ${Math.round(xe)} lb today`})})}function we(l){return String(l).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c])}await ge()}async function Ea(t,e){let a=await We(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",h=>{h.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let h=r.value.trim();if(!h||h===o){r.value=o;return}o=h,await Ie(e,h)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Oe(e),H(),dt(`Deleted "${o}"`,{onUndo:async()=>{await Ue(e),$t()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(h=>{h.addEventListener("click",()=>{n.forEach(v=>v.setAttribute("aria-selected",String(v===h))),Object.entries(i).forEach(([v,L])=>{L.hidden=v!==h.dataset.tab}),h.dataset.tab==="details"&&U()})});let p=t.querySelector("[data-log-form]"),k=t.querySelector("[data-weight-input]"),f=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),y=[];async function x(){y=await Pe(e)}function d(){if(y.length===0)return;let h=y[y.length-1];k.value=h.weight}p.addEventListener("submit",async h=>{h.preventDefault();let v=Number(k.value),L=Number(f.value);if(!(v>=0)||!Number.isFinite(v)||!(L>0)||!Number.isInteger(L))return;let D=J(v,L),B=Rt(D,y),R=new Date;await tt(e,v,L,R.toISOString()),f.value="",f.focus(),await x(),E(),i.details.hidden||U();let N=W(R.toISOString()),b=pt(y.filter(m=>W(m.performed_at)===N));g.hidden=!1,g.classList.toggle("lt-pr",B),g.textContent=B?`New PR! Today's volume: ${Math.round(b)} lb`:`Logged. Today's volume: ${Math.round(b)} lb`});function s(h){let v=new Map;for(let L of h){let D=W(L.performed_at);v.has(D)||v.set(D,[]),v.get(D).push(L)}return Array.from(v.entries()).sort((L,D)=>D[0].localeCompare(L[0]))}function _(h){let[v,L,D]=h.split("-").map(Number);return new Date(v,L-1,D).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function E(){let h=i.history;if(y.length===0){h.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let v=s(y);h.innerHTML=v.map(([L,D])=>{let I=pt(D),R=D.slice().sort((N,b)=>new Date(b.performed_at)-new Date(N.performed_at)).map(N=>{let b=Math.round(J(Number(N.weight),Number(N.reps)));return`
              <li class="lt-history-row" data-set-id="${N.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${N.id}">
                  <span class="lt-history-weight">${N.weight} lb &times; ${N.reps}</span>
                  <span class="lt-history-e1rm">${b} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${_(L)}</span>
              <span class="lt-history-volume">${Math.round(I)} lb volume</span>
            </div>
            <ul class="lt-history-list">${R}</ul>
          </div>
        `}).join(""),h.querySelectorAll("[data-edit-trigger]").forEach(L=>{L.addEventListener("click",()=>O(L.dataset.editTrigger))})}function T(h){return i.history.querySelector(`[data-set-id="${h}"]`)}function O(h){let v=T(h),L=y.find(D=>D.id===h);!v||!L||(v.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${L.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${L.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${W(L.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,v.querySelector("[data-edit-cancel]").addEventListener("click",E),v.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Fe(h),await x(),E(),i.details.hidden||U(),dt("Set deleted",{onUndo:async()=>{await Ve(h),await x(),E(),i.details.hidden||U()}})}),v.querySelector("[data-edit-form]").addEventListener("submit",async D=>{D.preventDefault();let I=Number(v.querySelector("[data-edit-weight]").value),B=Number(v.querySelector("[data-edit-reps]").value),R=v.querySelector("[data-edit-date]").value;if(!(I>=0)||!(B>0)||!R)return;let N=new Date(L.performed_at),[b,m,$]=R.split("-").map(Number);N.setFullYear(b,m-1,$),await Be(h,{weight:I,reps:B,performed_at:N.toISOString()}),await x(),E(),i.details.hidden||U()}))}function U(){let h=i.details,v=ut(y);if(v.length===0){h.innerHTML='<p class="lt-empty">No sets logged yet.</p>',ca();return}h.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let L=h.querySelector("[data-lift-canvas]"),D=h.querySelector("[data-point-detail]");da(L,v,{onPointClick:I=>{D.hidden=!1,D.textContent=`${_(I.date)}: ${I.weight} lb × ${I.reps} (${Math.round(I.e1rm)} e1RM)`}})}await x(),d(),E()}var La=60;function Da(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-La),e}function ct(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function se(t,e,a=new Date,r=`last ${La} days`,o=[],n=[]){let i=W(a.toISOString()),p=[`Lift Tracker — ${r} (as of ${i})`,""],k=t.filter(f=>(e.get(f.id)||[]).length>0);if(k.length===0)p.push("No sets logged in this period."),p.push("");else{for(let g of k){let y=(e.get(g.id)||[]).slice().sort((s,_)=>new Date(s.performed_at)-new Date(_.performed_at)),x=pt(y),d=Math.max(...y.map(s=>J(Number(s.weight),Number(s.reps))));p.push(g.name);for(let s of y){let _=Math.round(J(Number(s.weight),Number(s.reps)));p.push(`  ${W(s.performed_at)}: ${s.weight} lb x ${s.reps} (e1RM ${_})`)}p.push(`  Sets: ${y.length} | Volume: ${Math.round(x)} lb | Best e1RM: ${Math.round(d)}`),p.push("")}let f=t.length-k.length;f>0&&(p.push(`(${f} lift${f===1?"":"s"} with no sets in this period omitted)`),p.push(""))}if(o.length>0){p.push("Body weight");for(let d of o)p.push(`  ${d.date}: ${ct(d.weight)} lb`);let f=o[0].weight,g=o[o.length-1].weight,y=g-f,x=y>0?"+":"";p.push(`  Start: ${ct(f)} lb | Current: ${ct(g)} lb | Change: ${x}${ct(y)} lb`),p.push("")}if(n.length>0){p.push("Waist");for(let d of n)p.push(`  ${d.date}: ${ct(d.waist)} in`);let f=n[0].waist,g=n[n.length-1].waist,y=g-f,x=y>0?"+":"";p.push(`  Start: ${ct(f)} in | Current: ${ct(g)} in | Change: ${x}${ct(y)} in`),p.push("")}return p.join(`
`).trimEnd()}var or=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],nr=`
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
`;async function Ca(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${or.map(d=>`
          <section class="lt-help-section">
            <h2>${d.title}</h2>
            <p>${d.body}</p>
          </section>
          ${d.title==="Export progress"?nr:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let s=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(s)),a.hidden=!s,r.innerHTML=s?"&#9650;":"&#9660;",!!s){e.disabled=!0;try{let _=await X(),E=_.map(R=>R.id),T=Da().toISOString(),O=await He(E,T),U=new Map(_.map(R=>[R.id,[]]));for(let R of O){let N=U.get(R.lift_id);N&&N.push(R)}let v=(await yt()).filter(R=>new Date(R.logged_at)>=new Date(T)),L=wt(v),I=(await Et()).filter(R=>new Date(R.logged_at)>=new Date(T)),B=Lt(I);o.value=se(_,U,new Date,void 0,L,B),i.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}i.hidden=!1,i.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let p=t.querySelector("[data-full-export-toggle]"),k=t.querySelector("[data-full-export-body]"),f=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),y=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");p.addEventListener("click",async()=>{let s=!(p.getAttribute("aria-expanded")==="true");if(p.setAttribute("aria-expanded",String(s)),k.hidden=!s,f.innerHTML=s?"&#9650;":"&#9660;",!!s){p.disabled=!0;try{let _=await X(),E=_.map(D=>D.id),T=await Z(E),O=new Map(_.map(D=>[D.id,[]]));for(let D of T){let I=O.get(D.lift_id);I&&I.push(D)}let U=await yt(),h=wt(U),v=await Et(),L=Lt(v);g.value=se(_,O,new Date,"all-time",h,L),x.hidden=!0}finally{p.disabled=!1}}}),y.addEventListener("click",async()=>{g.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}x.hidden=!1,x.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function _a(t){et(j.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",H);let[e,a]=await Promise.all([X(),gt()]),r=va(a),o=r?e.filter(d=>r.liftIds.includes(d.id)):e,n=o.length?await Z(o.map(d=>d.id)):[],i=new Map(o.map(d=>[d.id,[]]));for(let d of n){let s=i.get(d.lift_id);s&&s.push(d)}let p=o.map(d=>({liftId:d.id,dailySeries:ut(i.get(d.id)||[])})),k=Mt(p),f=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),y=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(y.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",x.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",k.length===0){f.hidden=!0,g.hidden=!1;return}f.hidden=!1,g.hidden=!0,Ot(f,k)}function ir(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function sr(){let t=await X(),e=new Map(t.map(r=>[r.id,r.name]));return(await Z(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function lr(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,i])=>{let k=i.slice().sort((f,g)=>new Date(f.performed_at)-new Date(g.performed_at)).map(f=>{let g=Math.round(J(Number(f.weight),Number(f.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${f.weight} lb &times; ${f.reps}</span>
                <span class="lt-history-e1rm">${g} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${k}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${ir(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function qa(t){et(j.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=t.querySelector("[data-history-content]"),a=await sr();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=na(a);e.innerHTML=r.map(([o,n])=>lr(o,n)).join("")}var Ta="lt-theme",le="default";function de(){return Ft(Ta,le)}function $a(t){!t||t===le?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function Aa(t){$a(t),Vt(Ta,t||le)}function Ma(){$a(de())}var dr={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},cr=["rank","mastery","streak","capstone"];async function Ra(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let e=await X(),a=e.length?await Z(e.map(s=>s.id)):[],{days:r,tier:o}=Pt(a);t.querySelector("[data-killstreak-current-icon]").textContent=o?o.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=o?`${o.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let n=te(a),i=t.querySelector("[data-killstreak-tier-list]");i.innerHTML=Ut.map(s=>{let _=n[s.key];return`
      <li class="lt-killstreak-tier-row${o?.key===s.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${s.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${s.label}</span>
          <span class="lt-killstreak-tier-req">${s.days}+ day${s.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${_} earned</span>
      </li>
    `}).join("");let p=Ht(a),k=p.filter(s=>s.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${k} / ${p.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let f=p.filter(s=>s.track==="rank"),g=new Set(Bt(f,Yt()));ka(f.filter(s=>s.unlocked).map(s=>s.id));let y=t.querySelector("[data-achievements]");function x(s){if(s.track!=="rank")return`
        <li class="lt-achievement-card${s.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${s.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${s.name}</span>
            <span class="lt-achievement-card-desc">${s.description}</span>
          </span>
        </li>
      `;let _=s.unlocked&&de()===s.theme.id,E=s.unlocked&&g.has(s.id),T=s.unlocked?`<span class="lt-achievement-card-theme">🎨 ${s.theme.label}${_?" · Active":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${s.theme.label}</span>`;return`
      <li class="lt-achievement-card${s.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${E?" lt-achievement-card-new":""}${_?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${s.theme.id}"${s.unlocked?"":" disabled"} aria-label="${s.unlocked?`Apply the ${s.theme.label} theme`:`Locked: ${s.name}`}">
          <span class="lt-achievement-card-icon">${s.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${s.name}</span>
            <span class="lt-achievement-card-desc">${s.description}</span>
            ${T}
          </span>
        </button>
      </li>
    `}function d(){y.innerHTML=cr.map(s=>{let E=p.filter(T=>T.track===s).sort((T,O)=>Number(O.unlocked)-Number(T.unlocked)).map(x).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${dr[s]}</h3>
          <ul class="lt-achievement-list">${E}</ul>
        </section>
      `}).join("")}d(),y.addEventListener("click",s=>{let _=s.target.closest("[data-apply-theme]");!_||_.disabled||(Aa(_.dataset.applyTheme),d())})}var Wa="__divider__";async function ce(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([X(),r?Ye(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?Ia(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",H);let p=t.querySelector("[data-workout-name-input]"),k=t.querySelector("[data-workout-lift-list]"),f=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),y=t.querySelector("[data-workout-save-feedback]");f.hidden=o.length>0;let x=o.filter(E=>i.has(E.id)),d=o.filter(E=>!i.has(E.id));k.innerHTML=[...x.map(s),_(),...d.map(s)].join("");for(let E of o){let O=k.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");O&&(O.textContent=E.name)}Ct(k,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Xe(a),H(),dt(`Deleted "${n.name}"`,{onUndo:async()=>{await je(a),$t()}}))}),g.addEventListener("click",async()=>{let E=p.value.trim();if(!E){p.focus();return}let T=Array.from(k.querySelectorAll("[data-reorder-item]")),O=T.findIndex(h=>h.dataset.reorderItem===Wa),U=T.slice(0,O).map(h=>h.dataset.reorderItem);g.disabled=!0,y.hidden=!0;try{if(r)await Ge(a,E,U);else{let h=await gt();await At(E,U,h.length)}H()}catch(h){console.error("[lift-tracker]",h),y.hidden=!1,y.textContent="Something went wrong saving the workout.",g.disabled=!1}});function s(E){return`
      <li class="lt-lift-row" data-reorder-item="${E.id}" data-lift-id="${E.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${Ia(E.name)}">&#8942;&#8942;</button>
      </li>
    `}function _(){return`
      <li class="lt-workout-divider" data-reorder-item="${Wa}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function Ia(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var ur=`${window.location.origin}${window.location.pathname}`;function pr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ue(t){let e="signin";function a(o,n,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${pr(i||"")}">

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
    `}function r(o,n,i){t.innerHTML=a(o,n,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let p=t.querySelector("[data-auth-form]");p.addEventListener("submit",async k=>{k.preventDefault();let f=p.email.value.trim(),g=p.password.value,y=p.querySelector('button[type="submit"]');y.disabled=!0,y.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:d}=e==="signup"?await w.auth.signUp({email:f,password:g,options:{emailRedirectTo:ur}}):await w.auth.signInWithPassword({email:f,password:g});if(d)throw d;if(e==="signup"&&!x.session){e="signin",r(null,`Account created. Check ${f} for a confirmation link, then sign in here.`,f);return}}catch(x){r(x.message||"Something went wrong. Try again.",null,f)}})}r()}function Na(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function Oa(){let{data:t,error:e}=await w.auth.signInAnonymously();if(e)throw e;return await fr(),t}async function fr(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([ht("Bench Press",0),ht("Squat",1),ht("Deadlift",2)]);await Promise.all([tt(e.id,135,8,t(6)),tt(e.id,145,6,t(2)),tt(a.id,185,5,t(5)),tt(a.id,195,5,t(1)),tt(r.id,225,5,t(3))]),await At("Full Body",[e.id,a.id,r.id],0)}var Q=document.getElementById("lift-tracker-app");Ma();async function pe(){try{let{data:{session:t}}=await w.auth.getSession();if(!t)if(Na())try{await Oa()}catch(a){console.error("[lift-tracker] guest demo sign-in failed",a),await ue(Q);return}else{await ue(Q);return}let e=De();e.name==="detail"?await Ea(Q,e.liftId):e.name==="help"?await Ca(Q):e.name==="weight"?await wa(Q):e.name==="composite"?await _a(Q):e.name==="history"?await qa(Q):e.name==="killstreak"?await Ra(Q):e.name==="workout-new"?await ce(Q,{mode:"create"}):e.name==="workout-edit"?await ce(Q,{mode:"edit",workoutId:e.workoutId}):await xa(Q),window.scrollTo(0,0)}catch(t){console.error("[lift-tracker]",t),Q.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",pe);var Ua=null,Pa=!1;w.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!Pa;Pa=!0;let o=a!==Ua;Ua=a,!(r||!o)&&(H(),pe())});pe();

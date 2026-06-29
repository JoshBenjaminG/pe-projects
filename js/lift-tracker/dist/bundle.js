import{createClient as Ga}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Se="https://mqfsgammpsumpltfutwl.supabase.co",xe="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var w=Ga(Se,xe);function Ee(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function F(){window.location.hash="#/"}function Le(t){window.location.hash=`#/lift/${t}`}function De(){window.location.hash="#/workout/new"}function _e(t){window.location.hash=`#/workout/${t}/edit`}function Ce(){window.location.hash="#/help"}function Te(){window.location.hash="#/weight"}function qe(){window.location.hash="#/composite"}function $e(){window.location.hash="#/history"}function Ae(){window.location.hash="#/killstreak"}function $t(){window.dispatchEvent(new Event("hashchange"))}async function G(){let{data:t,error:e}=await w.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Me(t){let{data:e,error:a}=await w.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function mt(t,e){let{data:a,error:r}=await w.from("lifts").insert({name:t,sort_order:e}).select().single();if(r)throw r;return a}async function Re(t,e){let{data:a,error:r}=await w.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function We(t){let e=t.map((o,n)=>w.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ie(t){let{error:e}=await w.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ne(t){let{error:e}=await w.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Oe(t){let{data:e,error:a}=await w.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function Q(t){if(!t||t.length===0)return[];let{data:e,error:a}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function Ue(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function Z(t,e,a,r){let{data:o,error:n}=await w.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Pe(t,e){let{data:a,error:r}=await w.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function He(t){let{error:e}=await w.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Be(t){let{error:e}=await w.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ht(){let{data:t,error:e}=await w.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Fe(t){let e=t.map((o,n)=>w.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ve(t){let{data:e,error:a}=await w.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function At(t,e,a){let{data:r,error:o}=await w.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await w.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(n)throw n}return r}async function Ke(t,e,a){let{error:r}=await w.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await w.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await w.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(n)throw n}}async function Ye(t){let{error:e}=await w.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ge(t){let{error:e}=await w.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function gt(){let{data:t,error:e}=await w.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Xe(t,e){let{data:a,error:r}=await w.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function je(t,e){let{data:a,error:r}=await w.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ze(t){let{error:e}=await w.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Je(t){let{error:e}=await w.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function xt(){let{data:t,error:e}=await w.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Qe(t,e){let{data:a,error:r}=await w.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Ze(t,e){let{data:a,error:r}=await w.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ta(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ea(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function j(t,e){return t*(1+e/30)}function M(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function dt(t){let e=new Map;for(let a of t){let r=M(a.performed_at),o=j(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function Mt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let p of s.dailySeries)r.add(p.date);let o=Array.from(r).sort(),n=[];for(let s of o){let p=0,k=0;for(let f of e){let g=null;for(let y of f.dailySeries)if(y.date<=s)g=y;else break;g&&(p+=g.e1rm/a.get(f.liftId),k+=1)}if(k>0){let f=p/k;n.push({date:s,ratio:f,pct:(f-1)*100})}}return n}function Rt(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>j(Number(r.weight),Number(r.reps))));return t>a}function ut(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function aa(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function ra(t){let e=new Map;for(let a of t){let r=M(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function yt(t){let e=new Map;for(let a of t){let r=M(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function oa(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Et(t){let e=new Map;for(let a of t){let r=M(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}var Lt=null,rt=null,ot=null,nt=null,Nt=14,Wt="#e8242c",na="rgba(232, 36, 44, 0.18)",It="#f2b134",sa="rgba(242, 177, 52, 0.16)",st="#9a9ca6",it="rgba(255, 255, 255, 0.08)";function Ot(t,e,{onPointClick:a}={}){Lt&&(Lt.destroy(),Lt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return Lt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:Wt,backgroundColor:na,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Wt,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:it}},y:{ticks:{color:st,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:it}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Lt}function ia(t,e,{onPointClick:a}={}){rt&&(rt.destroy(),rt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return rt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:It,backgroundColor:sa,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:It,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:it}},y:{ticks:{color:st},grid:{color:it}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),rt}function la(){rt&&(rt.destroy(),rt=null)}function Jt(t,e,{onPointClick:a}={}){ot&&(ot.destroy(),ot=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return ot=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:Wt,backgroundColor:na,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Wt,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:it}},y:{ticks:{color:st},grid:{color:it}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),ot}function Qt(){ot&&(ot.destroy(),ot=null)}function ca(t,e,{onPointClick:a}={}){nt&&(nt.destroy(),nt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return nt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:It,backgroundColor:sa,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:It,pointHitRadius:Nt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:st},grid:{color:it}},y:{ticks:{color:st},grid:{color:it}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),nt}function da(){nt&&(nt.destroy(),nt=null)}function Dt(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,s=0,p=0,k=0,f=0,g=null,y=null,x=null,d=0,i=0,C=null,E=null;function q(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function O(c){let D=c.target.closest(".lt-drag-handle");if(!D)return;let T=D.closest("[data-reorder-item]");if(T){if(c.pointerType!=="touch"){c.preventDefault(),_(T,c.clientX,c.clientY);return}if(D.setPointerCapture)try{D.setPointerCapture(c.pointerId),C=D,E=c.pointerId}catch{}x=T,d=c.clientX,i=c.clientY,document.addEventListener("pointermove",v),document.addEventListener("pointerup",L),y=setTimeout(()=>{clearTimeout(y),y=null;let I=x,H=d,P=i;h(),_(I,H,P)},180)}}function U(){if(C&&E!==null&&C.releasePointerCapture)try{C.releasePointerCapture(E)}catch{}C=null,E=null}function h(){clearTimeout(y),y=null,x=null,document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",L)}function v(c){if(!x)return;let D=c.clientX-d,T=c.clientY-i;Math.hypot(D,T)<=10||(h(),U())}function L(){h(),U()}function _(c,D,T){r=c,n=D,s=T,f=T;let I=c.getBoundingClientRect();k=I.top,p=I.left,o=document.createElement(c.tagName),o.className="lt-reorder-placeholder",o.style.height=`${c.offsetHeight}px`,o.style.width=`${c.offsetWidth}px`,c.after(o),c.classList.add("lt-dragging"),c.style.position="fixed",c.style.left=`${I.left}px`,c.style.width=`${I.width}px`,c.style.top=`${k}px`,c.style.zIndex="1000",document.addEventListener("pointermove",m),document.addEventListener("pointerup",A)}function R(){let c=q().filter(I=>I!==r),D=r.getBoundingClientRect(),T=null;if(a==="x"){let I=D.left+D.width/2,H=D.top+D.height/2;for(let P of c){let K=P.getBoundingClientRect(),Gt=K.left+K.width/2,vt=K.top+K.height/2;if(Math.abs(vt-H)<K.height/2?I<Gt:H<vt){T=P;break}}}else{let I=D.top+D.height/2;for(let H of c){let P=H.getBoundingClientRect(),K=P.top+P.height/2;if(I<K){T=H;break}}}T?t.insertBefore(o,T):t.appendChild(o)}function V(){let c=f,D=window.innerHeight-f;return c<80?-16*(1-c/80):D<80?16*(1-D/80):0}function $(){if(!r){g=null;return}let c=V();if(c===0){g=null;return}window.scrollBy(0,c),R(),g=requestAnimationFrame($)}function W(){g===null&&V()!==0&&(g=requestAnimationFrame($))}function b(){g!==null&&(cancelAnimationFrame(g),g=null)}function m(c){if(r){if(c.preventDefault(),f=c.clientY,a==="x"){let D=c.clientX-n,T=c.clientY-s;r.style.left=`${p+D}px`,r.style.top=`${k+T}px`}else{let D=c.clientY-s;r.style.top=`${k+D}px`}R(),a==="y"&&W()}}function A(){if(!r)return;b(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",m),document.removeEventListener("pointerup",A),U();let c=q().map(D=>D.dataset.reorderItem);r=null,o=null,e&&e(c)}t.addEventListener("pointerdown",O)}var Xa="joshuaegage@gmail.com";function ua(){let t=document.createElement("div");t.className="lt-feedback-overlay",t.innerHTML=`
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
  `,document.body.appendChild(t);let e=t.querySelector("[data-feedback-text]");e.focus();function a(){t.remove()}t.addEventListener("click",r=>{r.target===t&&a()}),t.querySelector("[data-feedback-cancel]").addEventListener("click",a),t.querySelector("[data-feedback-send]").addEventListener("click",()=>{let r=e.value.trim(),o=encodeURIComponent("Lift Tracker feedback"),n=encodeURIComponent(r||"(no message entered)");window.location.href=`mailto:${Xa}?subject=${o}&body=${n}`,a()})}var Ut=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Zt(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function ja(t,e=new Date){let a=Zt(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let s=new Date(n.performed_at);s>=a&&s<r&&o.add(M(n.performed_at))}return o.size}function pa(t){let e=null;for(let a of Ut)t>=a.days&&(e=a);return e}function Pt(t,e=new Date){let a=ja(t,e);return{days:a,tier:pa(a)}}function te(t){let e=new Map;for(let r of t){let n=Zt(new Date(r.performed_at)).getTime();e.has(n)||e.set(n,new Set),e.get(n).add(M(r.performed_at))}let a={};for(let r of Ut)a[r.key]=0;for(let r of e.values()){let o=pa(r.size);o&&(a[o.key]+=1)}return a}function za(t){let e=new Set;for(let a of t)e.add(M(a.performed_at));return e.size}function Ja(t){let e=new Set;for(let n of t)e.add(Zt(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,s)=>n-s);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+7),o=s.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Qa(t){return{totalDays:za(t),tierCounts:te(t),longestStreak:Ja(t)}}var Za=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 5 times.",isUnlocked:t=>t.tierCounts.chopper>=5},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x5).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=5},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x5).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=5}];function Ht(t){let e=Qa(t);return Za.map(a=>({id:a.id,name:a.name,track:a.track,description:a.description,theme:a.theme??null,unlocked:a.isUnlocked(e)}))}function Bt(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var wt=null,ee=null;function tr(){return wt||(wt=document.createElement("div"),wt.className="lt-toast",document.body.appendChild(wt),wt)}function lt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=tr();clearTimeout(ee),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),s=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(ee),s(),e&&e()},{once:!0}),ee=setTimeout(()=>{s(),a&&a()},r)}function _t(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function bt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Ft(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Vt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var fa="lt-discovery-seen-",X={weight:"weight",history:"history",composite:"composite"};function Kt(t){try{return window.localStorage.getItem(`${fa}${t}`)==="true"}catch{return!1}}function tt(t){try{window.localStorage.setItem(`${fa}${t}`,"true")}catch{}}var ma="lt-weight-card-expanded";function kt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function er(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function ha(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function ae(t,{onExpand:e,showDiscovery:a=!1}={}){let r=await gt(),o=yt(r),n=oa(o),s=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let p=n.change<0?"↘":n.change>0?"↗":"→",k=_t(ma,!1);function f(){t.classList.toggle("lt-stats-row-expanded",k),k?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${kt(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${er(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${kt(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${p} ${kt(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${kt(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}k=!k,bt(ma,k),f()}),k?Jt(t.querySelector("[data-home-weight-canvas]"),o):Qt()}f()}async function ga(t){tt(X.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},r="weight";e.forEach(b=>{b.addEventListener("click",()=>{b.dataset.tab!==r&&(r=b.dataset.tab,e.forEach(m=>m.setAttribute("aria-selected",String(m===b))),Object.entries(a).forEach(([m,A])=>{A.hidden=m!==r}),r==="weight"?d():V())})});let o=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),s=t.querySelector("[data-weight-input]"),p=t.querySelector("[data-weight-chart-section]"),k=t.querySelector("[data-weight-canvas]"),f=t.querySelector("[data-weight-empty]"),g=t.querySelector("[data-weight-history]");n.value=M(new Date().toISOString());let y=[];async function x(){y=await gt(),i(),d()}function d(){let b=yt(y);if(b.length===0){p.hidden=!0,f.hidden=!1,Qt();return}p.hidden=!1,f.hidden=!0,a.weight.hidden||Jt(k,b)}function i(){if(y.length===0){g.innerHTML="";return}let b=y.slice().sort((m,A)=>new Date(A.logged_at)-new Date(m.logged_at));g.innerHTML=b.map(m=>`
          <li class="lt-history-row" data-entry-id="${m.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${m.id}">
              <span class="lt-history-weight">${kt(Number(m.weight))} lb</span>
              <span class="lt-history-e1rm">${ha(M(m.logged_at))}</span>
            </button>
          </li>
        `).join(""),g.querySelectorAll("[data-edit-trigger]").forEach(m=>{m.addEventListener("click",()=>C(m.dataset.editTrigger))})}function C(b){let m=g.querySelector(`[data-entry-id="${b}"]`),A=y.find(c=>c.id===b);!m||!A||(m.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${A.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${M(A.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",i),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await ze(b),await x(),lt("Weight entry deleted",{onUndo:async()=>{await Je(b),await x()}}))}),m.querySelector("[data-edit-form]").addEventListener("submit",async c=>{c.preventDefault();let D=Number(m.querySelector("[data-edit-weight]").value),T=m.querySelector("[data-edit-date]").value;if(!(D>=0)||!T)return;let I=new Date(A.logged_at),[H,P,K]=T.split("-").map(Number);I.setFullYear(H,P-1,K),await je(b,{weight:D,logged_at:I.toISOString()}),await x()}))}o.addEventListener("submit",async b=>{b.preventDefault();let m=Number(s.value),A=n.value;if(!(m>=0)||!Number.isFinite(m)||!A)return;let[c,D,T]=A.split("-").map(Number),I=new Date;I.setFullYear(c,D-1,T),await Xe(m,I.toISOString()),s.value="",s.focus(),n.value=M(new Date().toISOString()),await x()});let E=t.querySelector("[data-waist-form]"),q=t.querySelector("[data-waist-date-input]"),O=t.querySelector("[data-waist-input]"),U=t.querySelector("[data-waist-chart-section]"),h=t.querySelector("[data-waist-canvas]"),v=t.querySelector("[data-waist-empty]"),L=t.querySelector("[data-waist-history]");q.value=M(new Date().toISOString());let _=[];async function R(){_=await xt(),$(),V()}function V(){let b=Et(_);if(b.length===0){U.hidden=!0,v.hidden=!1,da();return}U.hidden=!1,v.hidden=!0,a.waist.hidden||ca(h,b)}function $(){if(_.length===0){L.innerHTML="";return}let b=_.slice().sort((m,A)=>new Date(A.logged_at)-new Date(m.logged_at));L.innerHTML=b.map(m=>`
          <li class="lt-history-row" data-entry-id="${m.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${m.id}">
              <span class="lt-history-weight">${kt(Number(m.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${ha(M(m.logged_at))}</span>
            </button>
          </li>
        `).join(""),L.querySelectorAll("[data-edit-trigger]").forEach(m=>{m.addEventListener("click",()=>W(m.dataset.editTrigger))})}function W(b){let m=L.querySelector(`[data-entry-id="${b}"]`),A=_.find(c=>c.id===b);!m||!A||(m.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${A.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${M(A.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",$),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ta(b),await R(),lt("Waist measurement deleted",{onUndo:async()=>{await ea(b),await R()}}))}),m.querySelector("[data-edit-form]").addEventListener("submit",async c=>{c.preventDefault();let D=Number(m.querySelector("[data-edit-waist]").value),T=m.querySelector("[data-edit-date]").value;if(!(D>=0)||!T)return;let I=new Date(A.logged_at),[H,P,K]=T.split("-").map(Number);I.setFullYear(H,P-1,K),await Ze(b,{waist_circumference:D,logged_at:I.toISOString()}),await R()}))}E.addEventListener("submit",async b=>{b.preventDefault();let m=Number(O.value),A=q.value;if(!(m>=0)||!Number.isFinite(m)||!A)return;let[c,D,T]=A.split("-").map(Number),I=new Date;I.setFullYear(c,D-1,T),await Qe(m,I.toISOString()),O.value="",O.focus(),q.value=M(new Date().toISOString()),await R()}),await Promise.all([x(),R()])}var ya="lt-seen-rank-achievements";function Yt(){let t=Ft(ya,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function wa(t){Vt(ya,JSON.stringify(t))}var re="lt-active-workout";function oe(){try{return window.localStorage.getItem(re)||null}catch{return null}}function ne(t){try{t?window.localStorage.setItem(re,t):window.localStorage.removeItem(re)}catch{}}function ba(t){let e=oe();return e&&t.find(a=>a.id===e)||null}var ka="lt-composite-expanded",se="lt-header-menu-open";async function va(t){let{data:{session:e}}=await w.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
      <button type="button" class="lt-create-workout-btn" data-create-workout-btn>
        <span>+ Create Workout</span>
        <span class="lt-discovery-badge" data-create-workout-discovery hidden aria-label="Create your first workout">!</span>
      </button>
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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,s=null;function p(l=!0){s&&(clearTimeout(s),s=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),l&&bt(se,!1),s=setTimeout(()=>{o.hidden=!0,s=null},n)}function k({persist:l=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),o.hidden=!1,u?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),l&&bt(se,!0)}r.addEventListener("click",()=>{o.hidden?k():p()}),o.addEventListener("click",l=>{l.target.closest("button")&&p()}),_t(se,!1)&&k({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ce);let g=t.querySelector("[data-feedback-btn]");g&&g.addEventListener("click",()=>ua()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>w.auth.signOut());let x=t.querySelector("[data-composite-section]"),d=t.querySelector("[data-composite-toggle]"),i=t.querySelector("[data-composite-body]"),C=t.querySelector("[data-chevron]"),E=t.querySelector("[data-composite-summary]"),q=t.querySelector("[data-composite-discovery]");function O(l){d.setAttribute("aria-expanded",String(l)),i.hidden=!l,C.innerHTML=l?"&#9650;":"&#9660;",x.classList.toggle("lt-stats-row-expanded",l)}O(_t(ka,!0)),d.addEventListener("click",()=>{if(tt(X.composite),q.hidden=!0,window.matchMedia("(max-width: 359px)").matches){qe();return}let l=d.getAttribute("aria-expanded")==="true";O(!l),bt(ka,!l)});let U=t.querySelector("[data-killstreak-icon]"),h=t.querySelector("[data-killstreak-label]"),v=t.querySelector("[data-killstreak-sub]"),L=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Ae);function _(l){let{days:u,tier:S}=Pt(l);U.textContent=S?S.icon:"🎯",h.textContent=S?`${S.label} Killstreak`:"No Killstreak",v.textContent=`${u} Day streak`;let N=Ht(l).filter(J=>J.track==="rank"),B=Bt(N,Yt()).length>0;L.hidden=!B}let R=t.querySelector("[data-weight-card]");function V(){tt(X.weight),Te()}let $=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{tt(X.history),$.hidden=!0,$e()});let W=t.querySelector("[data-add-lift-form]"),b=t.querySelector("[data-add-lift-toggle]"),m=t.querySelector("[data-add-lift-discovery]"),A=t.querySelector("[data-create-workout-discovery]");b.addEventListener("click",()=>{let l=W.hidden;W.hidden=!l,b.setAttribute("aria-pressed",String(l)),b.classList.toggle("lt-add-lift-toggle-active",l),l&&W.querySelector('input[name="name"]').focus()});let c=t.querySelector("[data-lift-list]"),D=t.querySelector("[data-list-empty]");t.querySelector("[data-create-workout-btn]").addEventListener("click",De);let T=t.querySelector("[data-workout-pills]"),I=t.querySelector("[data-workout-empty-hint]"),H=[],P=oe();function K(){return P&&H.find(l=>l.id===P)||null}function Gt(){let l=K();if(!l)return Y;let u=new Set(l.liftIds);return Y.filter(S=>u.has(S.id))}function vt(){I.hidden=H.length>0,T.innerHTML=H.map(l=>{let u=l.id===P;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${l.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${l.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${l.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let l of H){let u=T.querySelector(`[data-workout-pill="${l.id}"] [data-workout-pill-name]`);u&&(u.textContent=l.name)}T.querySelectorAll("[data-workout-pill]").forEach(l=>{l.addEventListener("click",()=>{let u=l.dataset.workoutPill;P=P===u?null:u,ne(P),vt(),zt(St),he(St)})}),T.querySelectorAll("[data-workout-edit]").forEach(l=>{l.addEventListener("click",u=>{u.stopPropagation(),_e(l.dataset.workoutEdit)})})}let Ct="lt-fast-mode",Xt="lt-burst-mode";function Ua(){try{let l=window.localStorage.getItem(Ct);if(l!==null)return l==="true";let u=window.localStorage.getItem(Xt);return u!==null?(window.localStorage.setItem(Ct,u),window.localStorage.removeItem(Xt),u==="true"):!1}catch{return!1}}function Pa(l){try{window.localStorage.setItem(Ct,String(l))}catch{}}let Y=[],et=Ua(),at=new Map,St=[],Tt=t.querySelector("[data-mode-toggle]");function fe(){Tt.textContent=et?"Normal":"Fast",Tt.setAttribute("aria-pressed",String(et)),Tt.classList.toggle("lt-mode-toggle-active",et)}fe(),Tt.addEventListener("click",()=>{et=!et,Pa(et),fe(),zt(St)}),W.addEventListener("submit",async l=>{l.preventDefault();let u=W.querySelector('input[name="name"]'),S=u.value.trim();if(S){u.value="",u.disabled=!0;try{await mt(S,Y.length),await me()}finally{u.disabled=!1,u.focus()}}}),Dt(c,{onReorder:async l=>{let u=[...l],S=new Set(l),N=Y.map(B=>S.has(B.id)?u.shift():B.id);await We(N),Y=N.map(B=>Y.find(J=>J.id===B)).filter(Boolean)}}),Dt(T,{axis:"x",onReorder:async l=>{await Fe(l),H=l.map(u=>H.find(S=>S.id===u)).filter(Boolean)}});async function me(){if(H=await ht(),P&&!H.some(N=>N.id===P)&&(P=null,ne(null)),vt(),Y=await G(),m.hidden=Y.length>0,A.hidden=Y.length===0||H.length>0,Y.length===0){c.innerHTML="",D.hidden=!1,D.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",x.hidden=!0,_([]),await ae(R,{onExpand:V,showDiscovery:!1}),$.hidden=!0,q.hidden=!0,at=new Map,St=[];return}let l=await Q(Y.map(N=>N.id)),u=l.length>0;_(l),await ae(R,{onExpand:V,showDiscovery:u&&!Kt(X.weight)}),$.hidden=!u||Kt(X.history),at=new Map(Y.map(N=>[N.id,[]]));for(let N of l){let B=at.get(N.lift_id);B&&B.push(N)}let S=Y.map(N=>({liftId:N.id,dailySeries:dt(at.get(N.id)||[])}));zt(S),he(S)}function he(l){let u=K(),S=u?l.filter(qt=>u.liftIds.includes(qt.liftId)):l,N=Mt(S);x.hidden=!1;let B=t.querySelector("[data-composite-canvas]"),J=t.querySelector("[data-composite-empty]"),pt=t.querySelector("[data-composite-scope]"),ft=t.querySelector("[data-composite-blurb]");if(pt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",ft.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",J.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",N.length===0){B.hidden=!0,J.hidden=!1,E.textContent="",q.hidden=!0;return}B.hidden=!1,J.hidden=!0,E.textContent=aa(N[N.length-1].pct),q.hidden=Kt(X.composite),Ot(B,N)}function jt(l){let u=dt(at.get(l)||[]),S=u[u.length-1];return S?`${Math.round(S.e1rm)} lb e1RM`:"No sets yet"}function Ha(l){let u=at.get(l)||[];return u.length===0?"":u[u.length-1].weight}function zt(l){St=l;let u=Gt();D.hidden=u.length>0,D.textContent=P?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",c.innerHTML=u.map(S=>et?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${S.id}" data-lift-id="${S.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${S.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${jt(S.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${ge(S.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${S.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Ha(S.id)}" data-fast-weight />
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
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${ge(S.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let S of Y){let B=c.querySelector(`[data-lift-id="${S.id}"]`)?.querySelector("[data-name-slot]");B&&(B.textContent=S.name)}c.querySelectorAll("[data-open-lift]").forEach(S=>{S.addEventListener("click",()=>Le(S.dataset.openLift))}),et&&Ba()}function Ba(){c.querySelectorAll("[data-fast-log-form]").forEach(l=>{let u=l.dataset.fastLogForm;l.addEventListener("submit",async S=>{S.preventDefault();let N=l.querySelector("[data-fast-weight]"),B=l.querySelector("[data-fast-reps]"),J=l.querySelector("[data-fast-feedback]"),pt=Number(N.value),ft=Number(B.value);if(!(pt>=0)||!Number.isFinite(pt)||!(ft>0)||!Number.isInteger(ft))return;let qt=at.get(u)||[],Fa=j(pt,ft),ye=Rt(Fa,qt),we=new Date().toISOString(),Va=await Z(u,pt,ft,we),be=[...qt,Va];at.set(u,be),B.value="",B.focus();let ke=c.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");ke&&(ke.textContent=jt(u));let Ka=M(we),ve=ut(be.filter(Ya=>M(Ya.performed_at)===Ka));J.hidden=!1,J.classList.toggle("lt-pr",ye),J.textContent=ye?`PR! ${Math.round(ve)} lb today`:`Logged · ${Math.round(ve)} lb today`})})}function ge(l){return String(l).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await me()}async function Sa(t,e){let a=await Me(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",h=>{h.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let h=r.value.trim();if(!h||h===o){r.value=o;return}o=h,await Re(e,h)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Ie(e),F(),lt(`Deleted "${o}"`,{onUndo:async()=>{await Ne(e),$t()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(h=>{h.addEventListener("click",()=>{n.forEach(v=>v.setAttribute("aria-selected",String(v===h))),Object.entries(s).forEach(([v,L])=>{L.hidden=v!==h.dataset.tab}),h.dataset.tab==="details"&&U()})});let p=t.querySelector("[data-log-form]"),k=t.querySelector("[data-weight-input]"),f=t.querySelector("[data-reps-input]"),g=t.querySelector("[data-log-feedback]"),y=[];async function x(){y=await Oe(e)}function d(){if(y.length===0)return;let h=y[y.length-1];k.value=h.weight}p.addEventListener("submit",async h=>{h.preventDefault();let v=Number(k.value),L=Number(f.value);if(!(v>=0)||!Number.isFinite(v)||!(L>0)||!Number.isInteger(L))return;let _=j(v,L),V=Rt(_,y),$=new Date;await Z(e,v,L,$.toISOString()),f.value="",f.focus(),await x(),E(),s.details.hidden||U();let W=M($.toISOString()),b=ut(y.filter(m=>M(m.performed_at)===W));g.hidden=!1,g.classList.toggle("lt-pr",V),g.textContent=V?`New PR! Today's volume: ${Math.round(b)} lb`:`Logged. Today's volume: ${Math.round(b)} lb`});function i(h){let v=new Map;for(let L of h){let _=M(L.performed_at);v.has(_)||v.set(_,[]),v.get(_).push(L)}return Array.from(v.entries()).sort((L,_)=>_[0].localeCompare(L[0]))}function C(h){let[v,L,_]=h.split("-").map(Number);return new Date(v,L-1,_).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function E(){let h=s.history;if(y.length===0){h.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let v=i(y);h.innerHTML=v.map(([L,_])=>{let R=ut(_),$=_.slice().sort((W,b)=>new Date(b.performed_at)-new Date(W.performed_at)).map(W=>{let b=Math.round(j(Number(W.weight),Number(W.reps)));return`
              <li class="lt-history-row" data-set-id="${W.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${W.id}">
                  <span class="lt-history-weight">${W.weight} lb &times; ${W.reps}</span>
                  <span class="lt-history-e1rm">${b} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${C(L)}</span>
              <span class="lt-history-volume">${Math.round(R)} lb volume</span>
            </div>
            <ul class="lt-history-list">${$}</ul>
          </div>
        `}).join(""),h.querySelectorAll("[data-edit-trigger]").forEach(L=>{L.addEventListener("click",()=>O(L.dataset.editTrigger))})}function q(h){return s.history.querySelector(`[data-set-id="${h}"]`)}function O(h){let v=q(h),L=y.find(_=>_.id===h);!v||!L||(v.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${L.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${L.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${M(L.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,v.querySelector("[data-edit-cancel]").addEventListener("click",E),v.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await He(h),await x(),E(),s.details.hidden||U(),lt("Set deleted",{onUndo:async()=>{await Be(h),await x(),E(),s.details.hidden||U()}})}),v.querySelector("[data-edit-form]").addEventListener("submit",async _=>{_.preventDefault();let R=Number(v.querySelector("[data-edit-weight]").value),V=Number(v.querySelector("[data-edit-reps]").value),$=v.querySelector("[data-edit-date]").value;if(!(R>=0)||!(V>0)||!$)return;let W=new Date(L.performed_at),[b,m,A]=$.split("-").map(Number);W.setFullYear(b,m-1,A),await Pe(h,{weight:R,reps:V,performed_at:W.toISOString()}),await x(),E(),s.details.hidden||U()}))}function U(){let h=s.details,v=dt(y);if(v.length===0){h.innerHTML='<p class="lt-empty">No sets logged yet.</p>',la();return}h.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let L=h.querySelector("[data-lift-canvas]"),_=h.querySelector("[data-point-detail]");ia(L,v,{onPointClick:R=>{_.hidden=!1,_.textContent=`${C(R.date)}: ${R.weight} lb × ${R.reps} (${Math.round(R.e1rm)} e1RM)`}})}await x(),d(),E()}var xa=60;function Ea(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-xa),e}function ct(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ie(t,e,a=new Date,r=`last ${xa} days`,o=[],n=[]){let s=M(a.toISOString()),p=[`Lift Tracker — ${r} (as of ${s})`,""],k=t.filter(f=>(e.get(f.id)||[]).length>0);if(k.length===0)p.push("No sets logged in this period."),p.push("");else{for(let g of k){let y=(e.get(g.id)||[]).slice().sort((i,C)=>new Date(i.performed_at)-new Date(C.performed_at)),x=ut(y),d=Math.max(...y.map(i=>j(Number(i.weight),Number(i.reps))));p.push(g.name);for(let i of y){let C=Math.round(j(Number(i.weight),Number(i.reps)));p.push(`  ${M(i.performed_at)}: ${i.weight} lb x ${i.reps} (e1RM ${C})`)}p.push(`  Sets: ${y.length} | Volume: ${Math.round(x)} lb | Best e1RM: ${Math.round(d)}`),p.push("")}let f=t.length-k.length;f>0&&(p.push(`(${f} lift${f===1?"":"s"} with no sets in this period omitted)`),p.push(""))}if(o.length>0){p.push("Body weight");for(let d of o)p.push(`  ${d.date}: ${ct(d.weight)} lb`);let f=o[0].weight,g=o[o.length-1].weight,y=g-f,x=y>0?"+":"";p.push(`  Start: ${ct(f)} lb | Current: ${ct(g)} lb | Change: ${x}${ct(y)} lb`),p.push("")}if(n.length>0){p.push("Waist");for(let d of n)p.push(`  ${d.date}: ${ct(d.waist)} in`);let f=n[0].waist,g=n[n.length-1].waist,y=g-f,x=y>0?"+":"";p.push(`  Start: ${ct(f)} in | Current: ${ct(g)} in | Change: ${x}${ct(y)} in`),p.push("")}return p.join(`
`).trimEnd()}var ar=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],rr=`
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
`;async function La(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${ar.map(d=>`
          <section class="lt-help-section">
            <h2>${d.title}</h2>
            <p>${d.body}</p>
          </section>
          ${d.title==="Export progress"?rr:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let i=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(i)),a.hidden=!i,r.innerHTML=i?"&#9650;":"&#9660;",!!i){e.disabled=!0;try{let C=await G(),E=C.map($=>$.id),q=Ea().toISOString(),O=await Ue(E,q),U=new Map(C.map($=>[$.id,[]]));for(let $ of O){let W=U.get($.lift_id);W&&W.push($)}let v=(await gt()).filter($=>new Date($.logged_at)>=new Date(q)),L=yt(v),R=(await xt()).filter($=>new Date($.logged_at)>=new Date(q)),V=Et(R);o.value=ie(C,U,new Date,void 0,L,V),s.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}s.hidden=!1,s.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let p=t.querySelector("[data-full-export-toggle]"),k=t.querySelector("[data-full-export-body]"),f=t.querySelector("[data-full-export-chevron]"),g=t.querySelector("[data-full-export-textarea]"),y=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");p.addEventListener("click",async()=>{let i=!(p.getAttribute("aria-expanded")==="true");if(p.setAttribute("aria-expanded",String(i)),k.hidden=!i,f.innerHTML=i?"&#9650;":"&#9660;",!!i){p.disabled=!0;try{let C=await G(),E=C.map(_=>_.id),q=await Q(E),O=new Map(C.map(_=>[_.id,[]]));for(let _ of q){let R=O.get(_.lift_id);R&&R.push(_)}let U=await gt(),h=yt(U),v=await xt(),L=Et(v);g.value=ie(C,O,new Date,"all-time",h,L),x.hidden=!0}finally{p.disabled=!1}}}),y.addEventListener("click",async()=>{g.select();let d=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(g.value),d=!0}catch{d=!1}if(!d)try{d=document.execCommand("copy")}catch{d=!1}x.hidden=!1,x.textContent=d?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function Da(t){tt(X.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",F);let[e,a]=await Promise.all([G(),ht()]),r=ba(a),o=r?e.filter(d=>r.liftIds.includes(d.id)):e,n=o.length?await Q(o.map(d=>d.id)):[],s=new Map(o.map(d=>[d.id,[]]));for(let d of n){let i=s.get(d.lift_id);i&&i.push(d)}let p=o.map(d=>({liftId:d.id,dailySeries:dt(s.get(d.id)||[])})),k=Mt(p),f=t.querySelector("[data-composite-canvas]"),g=t.querySelector("[data-composite-empty]"),y=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(y.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",x.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",g.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",k.length===0){f.hidden=!0,g.hidden=!1;return}f.hidden=!1,g.hidden=!0,Ot(f,k)}function or(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function nr(){let t=await G(),e=new Map(t.map(r=>[r.id,r.name]));return(await Q(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function sr(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,s])=>{let k=s.slice().sort((f,g)=>new Date(f.performed_at)-new Date(g.performed_at)).map(f=>{let g=Math.round(j(Number(f.weight),Number(f.reps)));return`
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
        <span>${or(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function _a(t){tt(X.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=t.querySelector("[data-history-content]"),a=await nr();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=ra(a);e.innerHTML=r.map(([o,n])=>sr(o,n)).join("")}var Ca="lt-theme",le="default";function ce(){return Ft(Ca,le)}function Ta(t){!t||t===le?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function qa(t){Ta(t),Vt(Ca,t||le)}function $a(){Ta(ce())}var ir={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone"},lr=["rank","mastery","streak","capstone"];async function Aa(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let e=await G(),a=e.length?await Q(e.map(i=>i.id)):[],{days:r,tier:o}=Pt(a);t.querySelector("[data-killstreak-current-icon]").textContent=o?o.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=o?`${o.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${r} Day streak`;let n=te(a),s=t.querySelector("[data-killstreak-tier-list]");s.innerHTML=Ut.map(i=>{let C=n[i.key];return`
      <li class="lt-killstreak-tier-row${o?.key===i.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${i.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${i.label}</span>
          <span class="lt-killstreak-tier-req">${i.days}+ day${i.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${C} earned</span>
      </li>
    `}).join("");let p=Ht(a),k=p.filter(i=>i.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${k} / ${p.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let f=p.filter(i=>i.track==="rank"),g=new Set(Bt(f,Yt()));wa(f.filter(i=>i.unlocked).map(i=>i.id));let y=t.querySelector("[data-achievements]");function x(i){if(i.track!=="rank")return`
        <li class="lt-achievement-card${i.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${i.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${i.name}</span>
            <span class="lt-achievement-card-desc">${i.description}</span>
          </span>
        </li>
      `;let C=i.unlocked&&ce()===i.theme.id,E=i.unlocked&&g.has(i.id),q=i.unlocked?`<span class="lt-achievement-card-theme">🎨 ${i.theme.label}${C?" · Active":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${i.theme.label}</span>`;return`
      <li class="lt-achievement-card${i.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${E?" lt-achievement-card-new":""}${C?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${i.theme.id}"${i.unlocked?"":" disabled"} aria-label="${i.unlocked?`Apply the ${i.theme.label} theme`:`Locked: ${i.name}`}">
          <span class="lt-achievement-card-icon">${i.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${i.name}</span>
            <span class="lt-achievement-card-desc">${i.description}</span>
            ${q}
          </span>
        </button>
      </li>
    `}function d(){y.innerHTML=lr.map(i=>{let E=p.filter(q=>q.track===i).sort((q,O)=>Number(O.unlocked)-Number(q.unlocked)).map(x).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${ir[i]}</h3>
          <ul class="lt-achievement-list">${E}</ul>
        </section>
      `}).join("")}d(),y.addEventListener("click",i=>{let C=i.target.closest("[data-apply-theme]");!C||C.disabled||(qa(C.dataset.applyTheme),d())})}var Ma="__divider__";async function de(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([G(),r?Ve(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?Ra(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",F);let p=t.querySelector("[data-workout-name-input]"),k=t.querySelector("[data-workout-lift-list]"),f=t.querySelector("[data-workout-lifts-empty]"),g=t.querySelector("[data-save-workout]"),y=t.querySelector("[data-workout-save-feedback]");f.hidden=o.length>0;let x=o.filter(E=>s.has(E.id)),d=o.filter(E=>!s.has(E.id));k.innerHTML=[...x.map(i),C(),...d.map(i)].join("");for(let E of o){let O=k.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");O&&(O.textContent=E.name)}Dt(k,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Ye(a),F(),lt(`Deleted "${n.name}"`,{onUndo:async()=>{await Ge(a),$t()}}))}),g.addEventListener("click",async()=>{let E=p.value.trim();if(!E){p.focus();return}let q=Array.from(k.querySelectorAll("[data-reorder-item]")),O=q.findIndex(h=>h.dataset.reorderItem===Ma),U=q.slice(0,O).map(h=>h.dataset.reorderItem);g.disabled=!0,y.hidden=!0;try{if(r)await Ke(a,E,U);else{let h=await ht();await At(E,U,h.length)}F()}catch(h){console.error("[lift-tracker]",h),y.hidden=!1,y.textContent="Something went wrong saving the workout.",g.disabled=!1}});function i(E){return`
      <li class="lt-lift-row" data-reorder-item="${E.id}" data-lift-id="${E.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${Ra(E.name)}">&#8942;&#8942;</button>
      </li>
    `}function C(){return`
      <li class="lt-workout-divider" data-reorder-item="${Ma}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function Ra(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var cr=`${window.location.origin}${window.location.pathname}`;function dr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ue(t){let e="signin";function a(o,n,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${dr(s||"")}">

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
    `}function r(o,n,s){t.innerHTML=a(o,n,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let p=t.querySelector("[data-auth-form]");p.addEventListener("submit",async k=>{k.preventDefault();let f=p.email.value.trim(),g=p.password.value,y=p.querySelector('button[type="submit"]');y.disabled=!0,y.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:d}=e==="signup"?await w.auth.signUp({email:f,password:g,options:{emailRedirectTo:cr}}):await w.auth.signInWithPassword({email:f,password:g});if(d)throw d;if(e==="signup"&&!x.session){e="signin",r(null,`Account created. Check ${f} for a confirmation link, then sign in here.`,f);return}}catch(x){r(x.message||"Something went wrong. Try again.",null,f)}})}r()}function Wa(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function Ia(){let{data:t,error:e}=await w.auth.signInAnonymously();if(e)throw e;return await ur(),t}async function ur(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([mt("Bench Press",0),mt("Squat",1),mt("Deadlift",2)]);await Promise.all([Z(e.id,135,8,t(6)),Z(e.id,145,6,t(2)),Z(a.id,185,5,t(5)),Z(a.id,195,5,t(1)),Z(r.id,225,5,t(3))]),await At("Full Body",[e.id,a.id,r.id],0)}var z=document.getElementById("lift-tracker-app");$a();async function pe(){try{let{data:{session:t}}=await w.auth.getSession();if(!t)if(Wa())try{await Ia()}catch(a){console.error("[lift-tracker] guest demo sign-in failed",a),await ue(z);return}else{await ue(z);return}let e=Ee();e.name==="detail"?await Sa(z,e.liftId):e.name==="help"?await La(z):e.name==="weight"?await ga(z):e.name==="composite"?await Da(z):e.name==="history"?await _a(z):e.name==="killstreak"?await Aa(z):e.name==="workout-new"?await de(z,{mode:"create"}):e.name==="workout-edit"?await de(z,{mode:"edit",workoutId:e.workoutId}):await va(z),window.scrollTo(0,0)}catch(t){console.error("[lift-tracker]",t),z.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",pe);var Na=null,Oa=!1;w.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!Oa;Oa=!0;let o=a!==Na;Na=a,!(r||!o)&&(F(),pe())});pe();

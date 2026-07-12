import{createClient as Vr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var $a="https://mqfsgammpsumpltfutwl.supabase.co",Ta="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var v=Vr($a,Ta);function Ma(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight",tab:"weight"}:t==="weight/food"?{name:"weight",tab:"food"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="goals"?{name:"goals"}:{name:"list"}}function V(){window.location.hash="#/"}function qa(t){window.location.hash=`#/lift/${t}`}function Aa(){window.location.hash="#/workout/new"}function Ra(t){window.location.hash=`#/workout/${t}/edit`}function Se(){window.location.hash="#/help"}function Wa(){window.location.hash="#/weight"}function Na(){window.location.hash="#/weight/food"}function Ia(){window.location.hash="#/composite"}function Pa(){window.location.hash="#/history"}function Fa(){window.location.hash="#/killstreak"}function ie(){window.location.hash="#/goals"}function xe(){window.dispatchEvent(new Event("hashchange"))}async function Ee(){let{data:t,error:e}=await v.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Ha(){let{error:t}=await v.from("feedback_submissions").insert({});if(t)throw t}async function Le(){let{count:t,error:e}=await v.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function st(){let{data:t,error:e}=await v.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Kr(){let{data:t,error:e}=await v.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function Ua(t){let{data:e,error:a}=await v.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function Jt(t,e,a={}){let{data:o,error:r}=await v.from("lifts").insert({...a,name:t,sort_order:e}).select().single();if(r)throw r;return o}async function Oa(t,e){let{data:a,error:o}=await v.from("lifts").update({name:e}).eq("id",t).select().single();if(o)throw o;return a}async function Ba(t){let e=t.map((r,n)=>v.from("lifts").update({sort_order:n}).eq("id",r)),o=(await Promise.all(e)).find(r=>r.error);if(o)throw o.error}async function Ga(t){let{error:e}=await v.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Va(t){let{error:e}=await v.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ka(t){let{data:e,error:a}=await v.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function Dt(t){if(!t||t.length===0)return[];let{data:e,error:a}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function _e(){let t=await Kr();return Dt(t)}async function Ce(t,e){if(!t||t.length===0)return[];let{data:a,error:o}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(o)throw o;return a}async function bt(t,e,a,o){let{data:r,error:n}=await v.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:o||new Date().toISOString()}).select().single();if(n)throw n;return r}async function Ya(t,e){let{data:a,error:o}=await v.from("sets").update(e).eq("id",t).select().single();if(o)throw o;return a}async function ja(t){let{error:e}=await v.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Xa(t){let{error:e}=await v.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function za(){let{data:t,error:e}=await v.from("goals").select("*").is("deleted_at",null).order("created_at",{ascending:!0});if(e)throw e;return t}async function Ja(t){let{data:e,error:a}=await v.from("goals").insert(t).select().single();if(a)throw a;return e}async function Qa(t){if(!t||t.length===0)return[];let{data:e,error:a}=await v.from("goals").insert(t).select();if(a)throw a;return e}async function Za(t,e){let{data:a,error:o}=await v.from("goals").update(e).eq("id",t).select().single();if(o)throw o;return a}async function to(t){let{error:e}=await v.from("goals").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function eo(){let{data:t,error:e}=await v.from("goal_events").select("*").order("created_at",{ascending:!1}).limit(100);if(e)throw e;return t}async function Yr(t){let{data:e,error:a}=await v.from("goal_events").insert(t).select().single();if(a){if(a.code==="23505")return null;throw a}return e}async function ao(t){let e=[];for(let a of t){let o=await Yr(a);o&&e.push(o)}return e}async function Qt(){let{data:t,error:e}=await v.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(o=>o.lift_id)}))}async function oo(t){let e=t.map((r,n)=>v.from("workouts").update({sort_order:n}).eq("id",r)),o=(await Promise.all(e)).find(r=>r.error);if(o)throw o.error}async function ro(t){let{data:e,error:a}=await v.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(o=>o.lift_id)}:null}async function De(t,e,a){let{data:o,error:r}=await v.from("workouts").insert({name:t,sort_order:a}).select().single();if(r)throw r;if(e.length>0){let{error:n}=await v.from("workout_lifts").insert(e.map(i=>({workout_id:o.id,lift_id:i})));if(n)throw n}return o}async function no(t,e,a){let{error:o}=await v.from("workouts").update({name:e}).eq("id",t);if(o)throw o;let{error:r}=await v.from("workout_lifts").delete().eq("workout_id",t);if(r)throw r;if(a.length>0){let{error:n}=await v.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(n)throw n}}async function so(t){let{error:e}=await v.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function io(t){let{error:e}=await v.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ft(){let{data:t,error:e}=await v.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function lo(t,e){let{data:a,error:o}=await v.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(o)throw o;return a}async function co(t,e){let{data:a,error:o}=await v.from("body_weight").update(e).eq("id",t).select().single();if(o)throw o;return a}async function uo(t){let{error:e}=await v.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function po(t){let{error:e}=await v.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Gt(){let{data:t,error:e}=await v.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function mo(t,e){let{data:a,error:o}=await v.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(o)throw o;return a}async function fo(t,e){let{data:a,error:o}=await v.from("waist_measurements").update(e).eq("id",t).select().single();if(o)throw o;return a}async function ho(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function go(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}async function yo(t,e){let{data:a,error:o}=await v.from("food_log_entries").select("*").is("deleted_at",null).gte("logged_at",t).lt("logged_at",e).order("logged_at",{ascending:!1});if(o)throw o;return a}async function wo(t,e,a){let{data:o,error:r}=await v.from("food_log_entries").insert({title:t,calories:e,logged_at:a||new Date().toISOString()}).select().single();if(r)throw r;return o}async function bo(t,e){let{data:a,error:o}=await v.from("food_log_entries").update(e).eq("id",t).select().single();if(o)throw o;return a}async function ko(t){let{error:e}=await v.from("food_log_entries").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function vo(t){let{error:e}=await v.from("food_log_entries").update({deleted_at:null}).eq("id",t);if(e)throw e}function J(t,e){return t*(1+e/30)}function T(t){let e=new Date(t),a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${o}-${r}`}function $t(t){let e=new Map;for(let a of t){let o=T(a.performed_at),r=J(Number(a.weight),Number(a.reps)),n=e.get(o);(!n||r>n.e1rm)&&e.set(o,{date:o,e1rm:r,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date))}function Zt(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let o=new Set;for(let i of e)for(let h of i.dailySeries)o.add(h.date);let r=Array.from(o).sort(),n=[];for(let i of r){let h=0,p=0;for(let s of e){let c=null;for(let m of s.dailySeries)if(m.date<=i)c=m;else break;c&&(h+=c.e1rm/a.get(s.liftId),p+=1)}if(p>0){let s=h/p;n.push({date:i,ratio:s,pct:(s-1)*100})}}return n}function $e(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(o=>J(Number(o.weight),Number(o.reps))));return t>a}function kt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function So(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function xo(t){let e=new Map;for(let a of t){let o=T(a.performed_at);e.has(o)||e.set(o,[]),e.get(o).push(a)}return Array.from(e.entries()).sort((a,o)=>o[0].localeCompare(a[0]))}function vt(t){let e=new Map;for(let a of t){let o=T(a.logged_at),r=e.get(o);(!r||new Date(a.created_at||0)>=new Date(r.createdAt||0))&&e.set(o,{date:o,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date)).map(({date:a,weight:o,entryId:r})=>({date:a,weight:o,entryId:r}))}function Eo(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function Vt(t){let e=new Map;for(let a of t){let o=T(a.logged_at),r=e.get(o);(!r||new Date(a.created_at||0)>=new Date(r.createdAt||0))&&e.set(o,{date:o,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date)).map(({date:a,waist:o,entryId:r})=>({date:a,waist:o,entryId:r}))}function Lo(t){let e=new Map;for(let a of t){let o=T(a.logged_at);e.set(o,(e.get(o)||0)+Number(a.calories))}return Array.from(e.entries()).sort((a,o)=>a[0].localeCompare(o[0])).map(([a,o])=>({date:a,calories:o}))}var le=null,Wt=null,Nt=null,It=null,Pt=null,ce=14,Te="#e8242c",_o="rgba(232, 36, 44, 0.18)",te="#f2b134",Xe="rgba(242, 177, 52, 0.16)",St="#9a9ca6",xt="rgba(255, 255, 255, 0.08)";function Me(t,e,{onPointClick:a}={}){le&&(le.destroy(),le=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.pct*10)/10);return le=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Composite progress",data:r,borderColor:Te,backgroundColor:_o,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Te,pointHitRadius:ce}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),le}function Co(t,e,{onPointClick:a}={}){Wt&&(Wt.destroy(),Wt=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.e1rm*10)/10);return Wt=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Estimated 1RM",data:r,borderColor:te,backgroundColor:Xe,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:te,pointHitRadius:ce}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Wt}function Do(){Wt&&(Wt.destroy(),Wt=null)}function ze(t,e,{onPointClick:a}={}){Nt&&(Nt.destroy(),Nt=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.weight*10)/10);return Nt=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Weight",data:r,borderColor:Te,backgroundColor:_o,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Te,pointHitRadius:ce}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Nt}function Je(){Nt&&(Nt.destroy(),Nt=null)}function $o(t,e,{onPointClick:a}={}){It&&(It.destroy(),It=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.waist*10)/10);return It=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Waist",data:r,borderColor:te,backgroundColor:Xe,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:te,pointHitRadius:ce}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{ticks:{color:St},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),It}function To(){It&&(It.destroy(),It=null)}function Mo(t,e,{onPointClick:a}={}){Pt&&(Pt.destroy(),Pt=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(Number(n.calories)));return Pt=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Calories",data:r,borderColor:te,backgroundColor:Xe,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:te,pointHitRadius:ce}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:St},grid:{color:xt}},y:{beginAtZero:!0,ticks:{color:St,callback:n=>`${n} cal`},grid:{color:xt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),Pt}function qo(){Pt&&(Pt.destroy(),Pt=null)}function de(t,{onReorder:e,axis:a="y"}={}){let o=null,r=null,n=0,i=0,h=0,p=0,s=0,c=null,m=null,y=null,l=0,w=0,C=null,u=null;function _(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function D(f){let S=f.target.closest(".lt-drag-handle");if(!S)return;let L=S.closest("[data-reorder-item]");if(L){if(f.pointerType!=="touch"){f.preventDefault(),U(L,f.clientX,f.clientY);return}if(S.setPointerCapture)try{S.setPointerCapture(f.pointerId),C=S,u=f.pointerId}catch{}y=L,l=f.clientX,w=f.clientY,document.addEventListener("pointermove",O),document.addEventListener("pointerup",at),m=setTimeout(()=>{clearTimeout(m),m=null;let N=y,P=l,R=w;A(),U(N,P,R)},180)}}function q(){if(C&&u!==null&&C.releasePointerCapture)try{C.releasePointerCapture(u)}catch{}C=null,u=null}function A(){clearTimeout(m),m=null,y=null,document.removeEventListener("pointermove",O),document.removeEventListener("pointerup",at)}function O(f){if(!y)return;let S=f.clientX-l,L=f.clientY-w;Math.hypot(S,L)<=10||(A(),q())}function at(){A(),q()}function U(f,S,L){o=f,n=S,i=L,s=L;let N=f.getBoundingClientRect();p=N.top,h=N.left,r=document.createElement(f.tagName),r.className="lt-reorder-placeholder",r.style.height=`${f.offsetHeight}px`,r.style.width=`${f.offsetWidth}px`,f.after(r),f.classList.add("lt-dragging"),f.style.position="fixed",f.style.left=`${N.left}px`,f.style.width=`${N.width}px`,f.style.top=`${p}px`,f.style.zIndex="1000",document.addEventListener("pointermove",wt),document.addEventListener("pointerup",k)}function K(){let f=_().filter(N=>N!==o),S=o.getBoundingClientRect(),L=null;if(a==="x"){let N=S.left+S.width/2,P=S.top+S.height/2;for(let R of f){let W=R.getBoundingClientRect(),Q=W.left+W.width/2,et=W.top+W.height/2;if(Math.abs(et-P)<W.height/2?N<Q:P<et){L=R;break}}}else{let N=S.top+S.height/2;for(let P of f){let R=P.getBoundingClientRect(),W=R.top+R.height/2;if(N<W){L=P;break}}}L?t.insertBefore(r,L):t.appendChild(r)}function z(){let f=s,S=window.innerHeight-s;return f<80?-16*(1-f/80):S<80?16*(1-S/80):0}function Y(){if(!o){c=null;return}let f=z();if(f===0){c=null;return}window.scrollBy(0,f),K(),c=requestAnimationFrame(Y)}function ot(){c===null&&z()!==0&&(c=requestAnimationFrame(Y))}function tt(){c!==null&&(cancelAnimationFrame(c),c=null)}function wt(f){if(o){if(f.preventDefault(),s=f.clientY,a==="x"){let S=f.clientX-n,L=f.clientY-i;o.style.left=`${h+S}px`,o.style.top=`${p+L}px`}else{let S=f.clientY-i;o.style.top=`${p+S}px`}K(),a==="y"&&ot()}}function k(){if(!o)return;tt(),r.replaceWith(o),o.classList.remove("lt-dragging"),o.style.position="",o.style.left="",o.style.width="",o.style.top="",o.style.zIndex="",document.removeEventListener("pointermove",wt),document.removeEventListener("pointerup",k),q();let f=_().map(S=>S.dataset.reorderItem);o=null,r=null,e&&e(f)}t.addEventListener("pointerdown",D)}var jr="joshuaegage@gmail.com";function Ao(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let o=!1;function r(){if(o)return;o=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let i=document.scrollingElement;i&&(i.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(i){i.key==="Escape"&&r()}e.addEventListener("click",i=>{i.target===e&&r()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",r),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let i=a.value.trim(),h=encodeURIComponent("Lift Tracker feedback"),p=encodeURIComponent(i||"(no message entered)");Ha().catch(()=>{}),window.location.href=`mailto:${jr}?subject=${h}&body=${p}`,r()})}var ue=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function qe(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Xr(t,e=new Date){let a=qe(e),o=new Date(a);o.setDate(o.getDate()+7);let r=new Set;for(let n of t){let i=new Date(n.performed_at);i>=a&&i<o&&r.add(T(n.performed_at))}return r.size}function zr(t){let e=null;for(let a of ue)t>=a.days&&(e=a);return e}function Ae(t,e=new Date){let a=Xr(t,e);return{days:a,tier:zr(a)}}function Qe(t,e=null){let a=new Map;for(let r of t){let i=qe(new Date(r.performed_at)).getTime();a.has(i)||a.set(i,new Set),a.get(i).add(T(r.performed_at))}let o={};for(let r of ue)o[r.key]=0;for(let r of a.values())for(let n of ue)r.size>=n.days&&(o[n.key]+=1);return o}function Jr(t){let e=new Set;for(let a of t)e.add(T(a.performed_at));return e.size}function Qr(t){let e=new Set;for(let a of t)e.add(qe(new Date(a.performed_at)).getTime());return e.size}function Zr(t){let e=new Set;for(let n of t)e.add(qe(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,i)=>n-i);if(a.length===0)return 0;let o=1,r=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+7),r=i.getTime()===a[n]?r+1:1,r>o&&(o=r)}return o}function tn(t){let e=new Set;for(let n of t)e.add(T(n.performed_at));let a=Array.from(e).sort().map(n=>{let[i,h,p]=n.split("-").map(Number);return new Date(i,h-1,p)});if(a.length===0)return 0;let o=1,r=1;for(let n=1;n<a.length;n++){let i=new Date(a[n-1]);i.setDate(i.getDate()+1),r=i.getTime()===a[n].getTime()?r+1:1,r>o&&(o=r)}return o}function en(t){let e=new Map;for(let o of t)o.lift_id&&(e.has(o.lift_id)||e.set(o.lift_id,[]),e.get(o.lift_id).push(o));let a=Zt(Array.from(e.entries()).map(([o,r])=>({liftId:o,dailySeries:$t(r)})));return a.length?Math.max(...a.map(o=>o.pct)):0}function an(t){let e=vt(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,o=0,r=0;for(let n of e){let i=n.weight-a;o=Math.max(o,i),r=Math.max(r,-i)}return{gain:o,loss:r}}function Ze(t,e=null,a={}){let{bodyWeightEntries:o=[],hasSubmittedFeedback:r=!1}=a,n=an(o);return{totalDays:Jr(t),totalWeeks:Qr(t),tierCounts:Qe(t,e),longestStreak:Zr(t),totalSets:t.length,longestDayStreak:tn(t),compositeMaxPct:en(t),bodyWeightGain:n.gain,bodyWeightLoss:n.loss,hasSubmittedFeedback:r||rn(e)}}var on=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function rn(t){return t!=null&&on.has(t)}var nn=50,sn=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=nn&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function ee(t,e=null,a={}){let o=Ze(t,e,a);return sn.map(r=>({id:r.id,name:r.name,track:r.track,description:r.description,flavor:r.flavor??null,theme:r.theme??null,unlocked:r.isUnlocked(o)}))}function Re(t,e){let a=new Set(e);return t.filter(o=>o.unlocked&&!a.has(o.id)).map(o=>o.id)}var ae=null,pe=null;function Ro(){return ae||(ae=document.createElement("div"),ae.className="lt-toast",document.body.appendChild(ae),ae)}function Tt(t,{onUndo:e,onExpire:a,durationMs:o=5e3}={}){let r=Ro();clearTimeout(pe),r.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,r.querySelector(".lt-toast-message").textContent=t,r.classList.add("lt-toast-visible");let n=r.querySelector(".lt-toast-undo"),i=()=>r.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(pe),i(),e&&e()},{once:!0}),pe=setTimeout(()=>{i(),a&&a()},o)}function Wo(t,{durationMs:e=4500}={}){let a=Ro();clearTimeout(pe),a.innerHTML='<span class="lt-toast-message"></span>',a.querySelector(".lt-toast-message").textContent=t,a.classList.add("lt-toast-visible"),pe=setTimeout(()=>{a.classList.remove("lt-toast-visible")},e)}function Ft(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function Mt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function We(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Ne(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var No="lt-discovery-seen-",it={weight:"weight",history:"history",composite:"composite"};function Ie(t){try{return window.localStorage.getItem(`${No}${t}`)==="true"}catch{return!1}}function Et(t){try{window.localStorage.setItem(`${No}${t}`,"true")}catch{}}var Io="lt-weight-card-expanded",ln=30;function oe(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function cn(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Po(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function Fo(t){return`${Math.round(Number(t)||0)} cal`}function Ho(t=new Date){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}function Uo(t=new Date){return new Date(t.getFullYear(),t.getMonth(),t.getDate()+1)}async function Oo(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let o=await ft(),r=vt(o),n=Eo(r),i=a&&o.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${i}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let h=n.change<0?"↘":n.change>0?"↗":"→",p=Ft(Io,!1);function s(){t.classList.toggle("lt-stats-row-expanded",p),p?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${oe(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${cn(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${oe(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${h} ${oe(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${oe(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}p=!p,Mt(Io,p),s()}),p?ze(t.querySelector("[data-home-weight-canvas]"),r):Je()}s()}async function Bo(t,{initialTab:e="weight"}={}){Et(it.weight),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Weight</h1>
    </header>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="weight" role="tab" aria-selected="true">Weight</button>
      <button type="button" class="lt-tab" data-tab="waist" role="tab" aria-selected="false">Waist</button>
      <button type="button" class="lt-tab" data-tab="food" role="tab" aria-selected="false">Food</button>
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

    <section data-tab-panel="food" hidden>
      <div class="lt-chart-wrap" data-food-chart-section>
        <canvas data-food-canvas></canvas>
      </div>
      <p class="lt-empty" data-food-chart-empty hidden>No food entries yet — log food to see daily calories.</p>

      <form class="lt-quick-log" data-food-form>
        <div class="lt-quick-log-fields">
          <label class="lt-field">
            <span>Food</span>
            <input type="text" name="title" maxlength="80" placeholder="Chicken bowl" required data-food-title-input />
          </label>
          <label class="lt-field">
            <span>Calories</span>
            <input type="number" inputmode="numeric" step="1" min="1" name="calories" required data-food-calories-input />
          </label>
        </div>
        <button type="submit" class="lt-log-btn">Log food</button>
      </form>

      <section class="lt-food-summary" data-food-summary>
        <span>Today</span>
        <strong data-food-total>0 cal</strong>
      </section>
      <p class="lt-empty" data-food-empty hidden>No food logged today — add your first entry above.</p>

      <ul class="lt-history-list" data-food-history></ul>
    </section>
  `,t.querySelector("[data-back]").addEventListener("click",V);let a=Array.from(t.querySelectorAll("[data-tab]")),o={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]'),food:t.querySelector('[data-tab-panel="food"]')},r="weight";function n(x){!o[x]||x===r||(r=x,a.forEach(b=>b.setAttribute("aria-selected",String(b.dataset.tab===r))),Object.entries(o).forEach(([b,$])=>{$.hidden=b!==r}),r==="weight"?C():r==="waist"?wt().catch(b=>console.error("[lift-tracker]",b)):Ke().catch(b=>console.error("[lift-tracker]",b)))}a.forEach(x=>{x.addEventListener("click",()=>{n(x.dataset.tab)})});let i=t.querySelector("[data-weight-form]"),h=t.querySelector("[data-weight-date-input]"),p=t.querySelector("[data-weight-input]"),s=t.querySelector("[data-weight-chart-section]"),c=t.querySelector("[data-weight-canvas]"),m=t.querySelector("[data-weight-empty]"),y=t.querySelector("[data-weight-history]");h.value=T(new Date().toISOString());let l=[];async function w(){l=await ft(),u(),C()}function C(){let x=vt(l);if(x.length===0){s.hidden=!0,m.hidden=!1,Je();return}s.hidden=!1,m.hidden=!0,o.weight.hidden||ze(c,x)}function u(){if(l.length===0){y.innerHTML="";return}let x=l.slice().sort((b,$)=>new Date($.logged_at)-new Date(b.logged_at));y.innerHTML=x.map(b=>`
          <li class="lt-history-row" data-entry-id="${b.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${b.id}">
              <span class="lt-history-weight">${oe(Number(b.weight))} lb</span>
              <span class="lt-history-e1rm">${Po(T(b.logged_at))}</span>
            </button>
          </li>
        `).join(""),y.querySelectorAll("[data-edit-trigger]").forEach(b=>{b.addEventListener("click",()=>_(b.dataset.editTrigger))})}function _(x){let b=y.querySelector(`[data-entry-id="${x}"]`),$=l.find(j=>j.id===x);!b||!$||(b.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${$.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${T($.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,b.querySelector("[data-edit-cancel]").addEventListener("click",u),b.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await uo(x),await w(),Tt("Weight entry deleted",{onUndo:async()=>{await po(x),await w()}}))}),b.querySelector("[data-edit-form]").addEventListener("submit",async j=>{j.preventDefault();let F=Number(b.querySelector("[data-edit-weight]").value),X=b.querySelector("[data-edit-date]").value;if(!(F>=0)||!X)return;let I=new Date($.logged_at),[pt,mt,_t]=X.split("-").map(Number);I.setFullYear(pt,mt-1,_t),await co(x,{weight:F,logged_at:I.toISOString()}),await w()}))}i.addEventListener("submit",async x=>{x.preventDefault();let b=Number(p.value),$=h.value;if(!(b>=0)||!Number.isFinite(b)||!$)return;let[j,F,X]=$.split("-").map(Number),I=new Date;I.setFullYear(j,F-1,X),await lo(b,I.toISOString()),p.value="",p.focus(),h.value=T(new Date().toISOString()),await w()});let D=t.querySelector("[data-waist-form]"),q=t.querySelector("[data-waist-date-input]"),A=t.querySelector("[data-waist-input]"),O=t.querySelector("[data-waist-chart-section]"),at=t.querySelector("[data-waist-canvas]"),U=t.querySelector("[data-waist-empty]"),K=t.querySelector("[data-waist-history]");q.value=T(new Date().toISOString());let z=[],Y=!1,ot=null;async function tt(){z=await Gt(),Y=!0,f(),k()}async function wt(){if(Y){k();return}ot||(U.hidden=!1,U.textContent="Loading waist...",O.hidden=!0,ot=tt().finally(()=>{ot=null})),await ot}function k(){let x=Vt(z);if(x.length===0){O.hidden=!0,U.hidden=!1,U.textContent="No waist measurements yet — add your first one above.",To();return}O.hidden=!1,U.hidden=!0,o.waist.hidden||$o(at,x)}function f(){if(z.length===0){K.innerHTML="";return}let x=z.slice().sort((b,$)=>new Date($.logged_at)-new Date(b.logged_at));K.innerHTML=x.map(b=>`
          <li class="lt-history-row" data-entry-id="${b.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${b.id}">
              <span class="lt-history-weight">${oe(Number(b.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Po(T(b.logged_at))}</span>
            </button>
          </li>
        `).join(""),K.querySelectorAll("[data-edit-trigger]").forEach(b=>{b.addEventListener("click",()=>S(b.dataset.editTrigger))})}function S(x){let b=K.querySelector(`[data-entry-id="${x}"]`),$=z.find(j=>j.id===x);!b||!$||(b.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${$.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${T($.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,b.querySelector("[data-edit-cancel]").addEventListener("click",f),b.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await ho(x),await tt(),Tt("Waist measurement deleted",{onUndo:async()=>{await go(x),await tt()}}))}),b.querySelector("[data-edit-form]").addEventListener("submit",async j=>{j.preventDefault();let F=Number(b.querySelector("[data-edit-waist]").value),X=b.querySelector("[data-edit-date]").value;if(!(F>=0)||!X)return;let I=new Date($.logged_at),[pt,mt,_t]=X.split("-").map(Number);I.setFullYear(pt,mt-1,_t),await fo(x,{waist_circumference:F,logged_at:I.toISOString()}),await tt()}))}D.addEventListener("submit",async x=>{x.preventDefault();let b=Number(A.value),$=q.value;if(!(b>=0)||!Number.isFinite(b)||!$)return;let[j,F,X]=$.split("-").map(Number),I=new Date;I.setFullYear(j,F-1,X),await mo(b,I.toISOString()),A.value="",A.focus(),q.value=T(new Date().toISOString()),await tt()});let L=t.querySelector("[data-food-form]"),N=t.querySelector("[data-food-title-input]"),P=t.querySelector("[data-food-calories-input]"),R=t.querySelector("[data-food-chart-section]"),W=t.querySelector("[data-food-canvas]"),Q=t.querySelector("[data-food-chart-empty]"),et=t.querySelector("[data-food-total]"),dt=t.querySelector("[data-food-empty]"),Ot=t.querySelector("[data-food-history]"),rt=[],Rt=!1,jt=null;function Lt(){let x=new Date;return{start:Ho(x),end:Uo(x)}}function Xt(){let x=Ho(new Date);return{start:new Date(x.getFullYear(),x.getMonth(),x.getDate()-(ln-1)),end:Uo(x)}}async function ht(){let x=Xt();rt=await yo(x.start.toISOString(),x.end.toISOString()),Rt=!0,ut(),nt()}async function Ke(){if(Rt){nt();return}jt||(dt.hidden=!1,dt.textContent="Loading food log...",jt=ht().finally(()=>{jt=null})),await jt}function nt(){let{start:x,end:b}=Lt(),$=rt.filter(F=>{let X=new Date(F.logged_at);return X>=x&&X<b}),j=$.reduce((F,X)=>F+Number(X.calories),0);if(et.textContent=Fo(j),dt.hidden=$.length>0,dt.textContent="No food logged today — add your first entry above.",$.length===0){Ot.innerHTML="";return}Ot.innerHTML=$.map(F=>`
          <li class="lt-history-row" data-food-entry-id="${F.id}">
            <button type="button" class="lt-history-main" data-food-edit-trigger="${F.id}">
              <span class="lt-history-weight">${Go(F.title)}</span>
              <span class="lt-history-e1rm">${Fo(F.calories)}</span>
            </button>
          </li>
        `).join(""),Ot.querySelectorAll("[data-food-edit-trigger]").forEach(F=>{F.addEventListener("click",()=>we(F.dataset.foodEditTrigger))})}function ut(){let x=Lo(rt);if(x.length===0){R.hidden=!0,Q.hidden=!1,qo();return}R.hidden=!1,Q.hidden=!0,o.food.hidden||Mo(W,x)}function we(x){let b=Ot.querySelector(`[data-food-entry-id="${x}"]`),$=rt.find(j=>j.id===x);!b||!$||(b.innerHTML=`
      <form class="lt-edit-set-form" data-food-edit-form>
        <label>Food <input type="text" maxlength="80" value="${dn($.title)}" data-edit-food-title /></label>
        <label>Calories <input type="number" step="1" min="1" value="${$.calories}" data-edit-food-calories /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,b.querySelector("[data-edit-cancel]").addEventListener("click",nt),b.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this food entry? You'll have a few seconds to undo it after.")&&(await ko(x),await ht(),Tt("Food entry deleted",{onUndo:async()=>{await vo(x),await ht()}}))}),b.querySelector("[data-food-edit-form]").addEventListener("submit",async j=>{j.preventDefault();let F=b.querySelector("[data-edit-food-title]").value.trim(),X=Number(b.querySelector("[data-edit-food-calories]").value);!F||!Number.isInteger(X)||X<=0||(await bo(x,{title:F,calories:X}),await ht())}))}L.addEventListener("submit",async x=>{x.preventDefault();let b=N.value.trim(),$=Number(P.value);!b||!Number.isInteger($)||$<=0||(await wo(b,$,new Date().toISOString()),N.value="",P.value="",N.focus(),await ht())}),n(e),await w()}function Go(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function dn(t){return Go(t)}var Vo="lt-seen-rank-achievements";function Pe(){let t=We(Vo,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Ko(t){Ne(Vo,JSON.stringify(t))}var ta="lt-active-workout";function ea(){try{return window.localStorage.getItem(ta)||null}catch{return null}}function aa(t){try{t?window.localStorage.setItem(ta,t):window.localStorage.removeItem(ta)}catch{}}function Yo(t){let e=ea();return e&&t.find(a=>a.id===e)||null}var un=120,jo="lt-default-rest-seconds",Xo="lt-lift-rest-seconds-",zo="lt-rest-timer-enabled",gt=null,oa=null,ra=null,re=0,qt=null;function Jo(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Qo(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function Kt(){return Ft(zo,!1)}function Zo(t){Mt(zo,!!t)}function sa(){return Jo(jo)||un}function tr(t){Qo(jo,t)}function ia(t){return Jo(`${Xo}${t}`)}function er(t,e){Qo(`${Xo}${t}`,e)}function Fe(t){return ia(t)||sa()}function la(){return gt||(gt=document.createElement("div"),gt.className="lt-rest-timer",gt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,gt.querySelector("[data-rest-add]").addEventListener("click",()=>{re&&(re+=30*1e3,na())}),gt.querySelector("[data-rest-skip]").addEventListener("click",ar),document.body.appendChild(gt),gt)}function pn(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),o=String(e%60).padStart(2,"0");return`${a}:${o}`}function na(){let t=la(),e=re-Date.now();t.querySelector("[data-rest-time]").textContent=pn(e),e<=0&&fn()}function ca(){clearInterval(oa),clearTimeout(ra),oa=null,ra=null}function mn(){try{me(),qt.state==="suspended"&&qt.resume();let t=qt.currentTime,e=qt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(qt.destination),[523.25,659.25].forEach((a,o)=>{let r=qt.createOscillator();r.type="sine",r.frequency.setValueAtTime(a,t+o*.12),r.connect(e),r.start(t+o*.12),r.stop(t+.75)})}catch{}}function me(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;qt||=new t,qt.state==="suspended"&&qt.resume()}catch{}}function fn(){ca(),re=0;let t=la();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",mn(),navigator.vibrate&&navigator.vibrate([120,70,120]),ra=setTimeout(ar,12e3)}function ar(){ca(),re=0,gt&&gt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function He({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let o=la();ca(),re=Date.now()+a*1e3,o.classList.remove("lt-rest-timer-done"),o.classList.add("lt-rest-timer-visible"),o.querySelector(".lt-rest-timer-label").textContent="Rest",o.querySelector("[data-rest-lift]").textContent=e,na(),oa=setInterval(na,250)}var pa=[{id:"lift_set",label:"Lift set"},{id:"weekly_workout_days",label:"Weekly workout days"},{id:"weekly_workout_volume",label:"Weekly workout volume"},{id:"workout_session_volume",label:"Workout session volume"}],hn=[.8,.9,.95];function fe(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function gn(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o)}function yn(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setDate(e.getDate()-e.getDay()),T(e.toISOString())}function or(t,e=new Date){let a=gn(yn(e)),o=new Date(a);o.setDate(o.getDate()+7);let r=new Date(t);return r>=a&&r<o}function ne(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function he(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function lt(t){return`${Math.round(ne(t)*100)}%`}function rr(t,e){let a=new Set(e?.liftIds||[]),o=new Map;for(let r of t){if(!a.has(r.lift_id))continue;let n=T(r.performed_at);o.set(n,(o.get(n)||0)+Number(r.weight)*Number(r.reps))}return o}function wn(t,e){let a=e.liftsById||new Map,o=e.workoutsById||new Map,r=e.activeSets||[],n=e.workoutHistorySets||r,i=t.lift_id?a.get(t.lift_id):null,h=t.workout_id?o.get(t.workout_id):null;if(t.type==="lift_set"){let p=r.filter(_=>_.lift_id===t.lift_id),s=Number(t.target_weight),c=Number(t.target_reps),m=J(s,c),y=null,l=0,w=null;for(let _ of p){let D=Number(_.weight),q=Number(_.reps),A=J(D,q);A>l&&(l=A,y=_),D>=s&&q>=c&&(w=_)}let C=!!w,u=C?1:ne(l/m);return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:i?.name||"Lift goal",progress:u,achieved:C,currentLabel:y?`Best: ${he(y.weight)} x ${y.reps}`:"No sets yet",targetLabel:`Goal: ${he(s)} x ${c}`,detail:w?`Hit with ${he(w.weight)} x ${w.reps}.`:`${lt(u)} there.`}}if(t.type==="weekly_workout_days"){let p=new Set;for(let l of n)or(l.performed_at)&&p.add(T(l.performed_at));let s=Number(t.target_value),c=p.size,m=c>=s,y=s>0?ne(c/s):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"This week",progress:y,achieved:m,currentLabel:`${c} / ${he(s)} days`,targetLabel:c+1===s?"One more workout gets it.":`Goal: ${he(s)} days`,detail:m?"Weekly goal hit.":`${lt(y)} there.`}}if(t.type==="weekly_workout_volume"){let p=rr(r.filter(l=>or(l.performed_at)),h),s=Array.from(p.values()).reduce((l,w)=>l+w,0),c=Number(t.target_value),m=s>=c,y=c>0?ne(s/c):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout volume",progress:y,achieved:m,currentLabel:`${Math.round(s)} / ${Math.round(c)} ${t.unit||"lb"}`,targetLabel:"This week",detail:m?"Weekly volume goal hit.":`${lt(y)} there.`}}if(t.type==="workout_session_volume"){let p=rr(r,h),s=Math.max(0,...Array.from(p.values())),c=Number(t.target_value),m=s>=c,y=c>0?ne(s/c):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:h?.name||"Workout session",progress:y,achieved:m,currentLabel:`Best: ${Math.round(s)} ${t.unit||"lb"}`,targetLabel:`Goal: ${Math.round(c)} ${t.unit||"lb"}`,detail:m?"Session volume goal hit.":`${lt(y)} there.`}}return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"Unsupported goal",progress:0,achieved:!1,currentLabel:"",targetLabel:"",detail:""}}function sr(t,e){return t.filter(a=>a.deleted_at==null).map(a=>wn(a,e))}var bn={"rank-private":t=>M(t.totalDays,1,"workout day"),"rank-pfc":t=>M(t.totalDays,2,"workout days"),"rank-corporal":t=>M(t.totalDays,3,"workout days"),"rank-sergeant":t=>M(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>M(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>M(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>M(t.totalDays,11,"workout days"),"rank-lieutenant":t=>M(t.totalDays,13,"workout days"),"rank-captain":t=>M(t.totalDays,15,"workout days"),"rank-major":t=>M(t.totalDays,18,"workout days"),"rank-colonel":t=>M(t.totalDays,22,"workout days"),"rank-general":t=>M(t.totalDays,27,"workout days"),"rank-prestige":t=>M(t.totalDays,33,"workout days"),"rank-prestige-master":t=>M(t.totalDays,40,"workout days"),"mastery-uav-1":t=>M(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>M(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>M(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>M(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>M(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>M(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>M(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>M(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>M(t.longestStreak,2,"weeks"),"streak-3":t=>M(t.longestStreak,3,"weeks"),"streak-4":t=>M(t.longestStreak,4,"weeks"),"streak-5":t=>M(t.longestStreak,5,"weeks"),"streak-6":t=>M(t.longestStreak,6,"weeks"),"streak-8":t=>M(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>da([M(t.totalDays,27,"workout days"),M(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>da([M(t.longestStreak,8,"week streak"),M(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>da([M(t.totalDays,40,"workout days"),M(t.tierCounts.chopper,3,"Choppers")])};function M(t,e,a){let o=Number(t)||0,r=Number(e)||1;return{current:o,target:r,progress:ne(o/r),currentLabel:`${o} / ${r} ${a}`}}function da(t){return{...t.slice().sort((a,o)=>a.progress-o.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" · ")}}function ir(t,e=null,a={}){let o=Ze(t,e,a);return ee(t,e,a).filter(n=>n.track!=="secret").map(n=>{let i=bn[n.id],h=i?i(o):{progress:n.unlocked?1:0,currentLabel:n.description};return{kind:"achievement",key:`achievement:${n.id}`,sourceKey:n.id,title:n.name,subtitle:n.track,progress:n.unlocked?1:h.progress,achieved:n.unlocked,currentLabel:h.currentLabel,targetLabel:n.description,detail:n.unlocked?"Achievement unlocked.":`${lt(h.progress)} there.`}})}function lr({goalEvaluations:t=[],achievementItems:e=[],events:a=[]}={}){let o=a.slice().sort((n,i)=>new Date(i.created_at)-new Date(n.created_at))[0]||null,r=[...t,...e].filter(n=>!n.achieved&&n.progress>=.6).sort((n,i)=>i.progress-n.progress).slice(0,5);return{latest:o,closest:r}}function cr(t,e=[]){let a=new Set(e.map(r=>ua(r))),o=[];for(let r of t)if(r.kind==="goal"){for(let n of hn)if(r.progress>=n&&!r.achieved){let i={goal_id:r.goal.id,source_type:"goal",source_key:`goal:${r.goal.id}`,event_type:"close",threshold:n,title:r.title,message:`${r.title} is ${lt(r.progress)} there.`,metadata:{progress:r.progress}};a.has(ua(i))||o.push(i)}if(r.achieved){let n={goal_id:r.goal.id,source_type:"goal",source_key:`goal:${r.goal.id}`,event_type:"achieved",threshold:1,title:r.title,message:`Goal hit: ${r.title}.`,metadata:{progress:1}};a.has(ua(n))||o.push(n)}}return o}function ua(t){return t.goal_id?`goal:${t.goal_id}:${t.event_type}:${Number(t.threshold)||0}`:`achievement:${t.source_key}:${t.event_type}`}function Ue(t){return String(t||"").trim().toLowerCase()}function kn(t){let e=String(t||"").trim();return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function nr(t){let e=kn(t);return/^-?\d+(\.\d+)?$/.test(e)?Number(e):e==="true"?!0:e==="false"?!1:e}function dr(t,{lifts:e=[],workouts:a=[]}={}){let o=[],r=null;for(let s of String(t||"").split(/\r?\n/)){let c=s.trim();if(!c||c.startsWith("#")||c==="goals:"||c.startsWith("goal_format:"))continue;if(c.startsWith("- ")){r&&o.push(r),r={};let y=c.slice(2).trim();if(y){let l=y.match(/^([^:]+):\s*(.*)$/);l&&(r[l[1].trim()]=nr(l[2]))}continue}let m=c.match(/^([^:]+):\s*(.*)$/);m&&r&&(r[m[1].trim()]=nr(m[2]))}r&&o.push(r);let n=new Map(e.map(s=>[Ue(s.name),s])),i=new Map(a.map(s=>[Ue(s.name),s])),h=[],p=[];return o.forEach((s,c)=>{let m=c+1,y=String(s.type||"").trim(),l={title:String(s.title||"").trim(),type:y,unit:String(s.unit||"lb").trim()||"lb",timeframe_weeks:fe(s.timeframe_weeks),recurring:s.recurring===!0?"weekly":s.recurring||"none",metadata:{imported:!0}};if(l.title||p.push(`Goal ${m}: missing title.`),pa.some(w=>w.id===y)||p.push(`Goal ${m}: unsupported type "${y}".`),y==="lift_set"){let w=n.get(Ue(s.lift));w||p.push(`Goal ${m}: could not find lift "${s.lift||""}".`),l.lift_id=w?.id,l.target_weight=fe(s.weight),l.target_reps=fe(s.reps),l.target_weight==null&&p.push(`Goal ${m}: missing weight.`),l.target_reps==null&&p.push(`Goal ${m}: missing reps.`)}if(y==="weekly_workout_days"&&(l.target_value=fe(s.target),l.recurring="weekly",l.target_value==null&&p.push(`Goal ${m}: missing target.`)),y==="weekly_workout_volume"||y==="workout_session_volume"){let w=i.get(Ue(s.workout));w||p.push(`Goal ${m}: could not find workout "${s.workout||""}".`),l.workout_id=w?.id,l.target_value=fe(s.target),y==="weekly_workout_volume"&&(l.recurring="weekly"),l.target_value==null&&p.push(`Goal ${m}: missing target.`)}h.push(l)}),{goals:p.length?[]:h,errors:p,rawGoals:o}}async function Ht(){let[t,e,a,o,r,n,i,h]=await Promise.all([st(),Qt(),_e(),za(),eo(),ft(),Ee(),Le()]),p=t.length?await Dt(t.map(s=>s.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:p,goals:o,events:r,bodyWeightEntries:n,userId:i,feedbackGiven:h,liftsById:new Map(t.map(s=>[s.id,s])),workoutsById:new Map(e.map(s=>[s.id,s]))}}function At(t){let e=sr(t.goals,t),a=ir(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),o=lr({goalEvaluations:e,achievementItems:a,events:t.events});return{goalEvaluations:e,achievementItems:a,momentum:o}}async function Yt({showToasts:t=!1}={}){let e=await Ht(),a=At(e),o=cr([...a.goalEvaluations,...a.achievementItems],e.events),r=await ao(o);if(await Promise.all(a.goalEvaluations.filter(n=>n.achieved&&n.goal.status==="active"&&n.goal.recurring!=="weekly").map(n=>Za(n.goal.id,{status:"achieved",achieved_at:new Date().toISOString()}))),t&&r.length>0){let n=r.find(p=>p.event_type==="achieved"),i=r.find(p=>p.event_type==="close"),h=n||i;h&&Wo(h.message||h.title)}return{context:e,...a,createdEvents:r}}var ur=[{key:"bench-press",name:"Bench Press",aliases:["bench","barbell bench press","bench press warmup","bench press 2","bench press 3"],equipment:["barbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep shoulder blades set.","Touch the same point on the chest each rep.","Drive the bar up and slightly back."]},{key:"bicep-curl",name:"Bicep Curl",aliases:["bicep curls","curl"],equipment:["dumbbell","barbell","cable"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep elbows close to your sides.","Avoid swinging the torso.","Control the lower."]},{key:"calf-raise",name:"Calf Raise",aliases:["calf raises","standing calf raise"],equipment:["bodyweight","machine","dumbbell"],primaryMuscles:["calves"],secondaryMuscles:[],movementPatterns:["ankle extension"],tutorialUrl:"",cues:["Pause briefly at the top.","Use a full stretch at the bottom.","Keep reps controlled."]},{key:"dumbbell-chest-press",name:"Dumbbell Chest Press",aliases:["dumbell chest press","db chest press","dumbbell bench press","db bench press"],equipment:["dumbbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep wrists stacked over elbows.","Lower with control.","Press up without letting shoulders roll forward."]},{key:"dumbbell-curl",name:"Dumbbell Curl",aliases:["dumbell curl","db curl"],equipment:["dumbbell"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep upper arms still.","Rotate naturally through the curl if comfortable.","Avoid using momentum."]},{key:"dumbbell-lateral-raise",name:"Dumbbell Lateral Raise",aliases:["dumbell lateral raise","lateral raise","db lateral raise"],equipment:["dumbbell"],primaryMuscles:["side delts"],secondaryMuscles:["traps"],movementPatterns:["shoulder abduction"],tutorialUrl:"",cues:["Lead with elbows.","Stop around shoulder height.","Use light enough weight to stay smooth."]},{key:"dumbbell-row",name:"Dumbbell Row",aliases:["dumbell row","db row","one arm dumbbell row","one-arm dumbbell row"],equipment:["dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbow toward the hip.","Keep the torso steady.","Reach long at the bottom without losing control."]},{key:"dumbbell-shoulder-press",name:"Dumbbell Shoulder Press",aliases:["dumbell shoulder press","db shoulder press","dumbbell overhead press"],equipment:["dumbbell"],primaryMuscles:["shoulders","front delts"],secondaryMuscles:["triceps","upper chest"],movementPatterns:["push","vertical press"],tutorialUrl:"",cues:["Keep ribs down.","Press slightly back over the shoulders.","Control the bottom position."]},{key:"forearm-twist",name:"Forearm Twist",aliases:["forearm twists","wrist twist","pronation supination"],equipment:["dumbbell"],primaryMuscles:["forearms"],secondaryMuscles:["grip"],movementPatterns:["forearm rotation"],tutorialUrl:"",cues:["Move slowly through rotation.","Keep the elbow supported if needed.","Use a light load."]},{key:"hammer-curl",name:"Hammer Curl",aliases:["hammer curls"],equipment:["dumbbell"],primaryMuscles:["biceps","brachialis"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep palms facing each other.","Control the lower.","Avoid shoulder swing."]},{key:"hip-thrust",name:"Hip Thrust",aliases:["hip thrusts","barbell hip thrust"],equipment:["barbell","bench"],primaryMuscles:["glutes"],secondaryMuscles:["hamstrings","quads"],movementPatterns:["hinge","hip extension"],tutorialUrl:"",cues:["Tuck ribs down.","Drive through the heels.","Pause with hips fully extended."]},{key:"lunge",name:"Lunge",aliases:["lunges","db lunge","dumbbell lunge"],equipment:["bodyweight","dumbbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","calves"],movementPatterns:["squat","single-leg"],tutorialUrl:"",cues:["Step far enough to stay balanced.","Keep front knee tracking over toes.","Control the descent."]},{key:"overhead-tricep-extension",name:"Overhead Tricep Extension",aliases:["overhead tricep extensions","tricep extension","overhead triceps extension"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep elbows pointed forward.","Lower behind the head with control.","Extend without flaring hard."]},{key:"rear-delt-fly",name:"Rear Delt Fly",aliases:["rear delt fly","rear delt raise","reverse fly"],equipment:["dumbbell","machine","cable"],primaryMuscles:["rear delts"],secondaryMuscles:["upper back","traps"],movementPatterns:["pull","shoulder horizontal abduction"],tutorialUrl:"",cues:["Keep a slight elbow bend.","Move from the shoulders.","Avoid shrugging through the rep."]},{key:"row",name:"Row",aliases:["rows","cable row","machine row","seated row"],equipment:["cable","machine","barbell","dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbows back.","Keep chest tall.","Control the reach forward."]},{key:"shrug",name:"Shrug",aliases:["shrugs","dumbbell shrug","barbell shrug"],equipment:["dumbbell","barbell"],primaryMuscles:["traps"],secondaryMuscles:["forearms"],movementPatterns:["scapular elevation"],tutorialUrl:"",cues:["Lift shoulders straight up.","Pause briefly at the top.","Avoid rolling the shoulders."]},{key:"squat",name:"Squat",aliases:["barbell squat","squat warmup","squat 2","squat 3"],equipment:["barbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","core"],movementPatterns:["squat"],tutorialUrl:"",cues:["Brace before descending.","Keep knees tracking over toes.","Drive through the whole foot."]},{key:"tricep-curl",name:"Tricep Curl",aliases:["tricep curls","triceps curl"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep upper arms steady.","Fully extend with control.","Avoid using shoulder momentum."]},{key:"weighted-sit-up",name:"Weighted Sit-Up",aliases:["weighted sit ups","weighted sit ups 2","weighted situp","weighted sit-up"],equipment:["plate","dumbbell"],primaryMuscles:["abs"],secondaryMuscles:["hip flexors"],movementPatterns:["trunk flexion"],tutorialUrl:"",cues:["Keep the weight secure.","Curl the torso up under control.","Avoid yanking with the neck."]}];function Oe(t){return String(t||"").toLowerCase().replace(/dumbell/g,"dumbbell").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ")}function pr(t){return[t.name,t.key,...t.aliases||[]]}function vn(t,e){let a=Oe(e);if(a.length<2)return null;let o=null;for(let r of pr(t)){let n=Oe(r),i=null;n===a?i=0:n.startsWith(a)?i=1:n.includes(a)?i=2:a.split(" ").every(p=>n.includes(p))&&(i=3),i!=null&&(o==null||i<o)&&(o=i)}return o}function mr(t,{limit:e=5}={}){return ur.map(a=>({entry:a,score:vn(a,t)})).filter(a=>a.score!=null).sort((a,o)=>a.score-o.score||a.entry.name.localeCompare(o.entry.name)).slice(0,e).map(a=>a.entry)}function ge(t){let e=String(t||"").trim();if(!e)return null;let a=Oe(e);return ur.find(o=>o.key===e||o.key===a.replace(/\s+/g,"-")||pr(o).some(r=>Oe(r)===a))||null}var fr="lt-composite-expanded",ma="lt-header-menu-open",hr="lt-momentum-expanded";async function gr(t){let{data:{session:e}}=await v.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
    <header class="lt-header">
      <h1>Lift Tracker</h1>
      <div class="lt-header-menu" data-header-menu>
        <div class="lt-header-actions" data-header-actions hidden>
          <button type="button" class="lt-feedback-btn" data-history-btn>
            <span>History</span>
            <span class="lt-discovery-badge" data-history-discovery hidden aria-label="History not opened yet">!</span>
          </button>
          <button type="button" class="lt-feedback-btn" data-calories-btn>Calories</button>
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

      <section class="lt-momentum lt-momentum-topline" data-momentum-section>
        <button type="button" class="lt-momentum-toggle" data-momentum-toggle aria-expanded="false">
          <span class="lt-momentum-title">Momentum</span>
          <span class="lt-momentum-summary" data-momentum-summary>Loading momentum...</span>
          <span class="lt-chevron" data-momentum-chevron>&#9660;</span>
        </button>
      </section>
    </div>

    <div class="lt-momentum-body lt-momentum-body-panel" data-momentum-body hidden></div>

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
      <div class="lt-add-lift-field">
        <input type="text" name="name" placeholder="New lift name" required maxlength="60" autocomplete="off" />
        <div class="lt-lift-suggestions" data-lift-suggestions hidden></div>
      </div>
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
    <div class="lt-bottom-actions">
      ${a?"":'<button type="button" class="lt-feedback-btn lt-bottom-feedback-btn" data-feedback-btn>Feedback</button>'}
      <button type="button" class="lt-logout-btn lt-bottom-logout-btn" data-logout-btn>Log out</button>
    </div>
  `;let o=t.querySelector("[data-hamburger-btn]"),r=t.querySelector("[data-header-actions]"),n=240,i=null;function h(d=!0){i&&(clearTimeout(i),i=null),r.classList.remove("lt-header-actions-open"),o.setAttribute("aria-expanded","false"),d&&Mt(ma,!1),i=setTimeout(()=>{r.hidden=!0,i=null},n)}function p({persist:d=!0,instant:g=!1}={}){i&&(clearTimeout(i),i=null),r.hidden=!1,g?r.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>r.classList.add("lt-header-actions-open")),o.setAttribute("aria-expanded","true"),d&&Mt(ma,!0)}o.addEventListener("click",()=>{r.hidden?p():h()}),r.addEventListener("click",d=>{d.target.closest("button")&&h()}),Ft(ma,!1)&&p({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Se),t.querySelector("[data-calories-btn]").addEventListener("click",Na);let m=t.querySelector("[data-feedback-btn]");m&&m.addEventListener("click",()=>Ao()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>v.auth.signOut());let l=t.querySelector("[data-composite-section]"),w=t.querySelector("[data-composite-toggle]"),C=t.querySelector("[data-composite-body]"),u=t.querySelector("[data-chevron]"),_=t.querySelector("[data-composite-summary]"),D=t.querySelector("[data-composite-discovery]"),q=t.querySelector("[data-momentum-toggle]"),A=t.querySelector("[data-momentum-body]"),O=t.querySelector("[data-momentum-summary]"),at=t.querySelector("[data-momentum-chevron]");function U(d){w.setAttribute("aria-expanded",String(d)),C.hidden=!d,u.innerHTML=d?"&#9650;":"&#9660;",l.classList.toggle("lt-stats-row-expanded",d)}U(Ft(fr,!0)),w.addEventListener("click",()=>{if(Et(it.composite),D.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ia();return}let d=w.getAttribute("aria-expanded")==="true";U(!d),Mt(fr,!d)});function K(d){q.setAttribute("aria-expanded",String(d)),A.hidden=!d,at.innerHTML=d?"&#9650;":"&#9660;"}K(Ft(hr,!1)),q.addEventListener("click",()=>{let d=q.getAttribute("aria-expanded")==="true";K(!d),Mt(hr,!d)});let z=t.querySelector("[data-killstreak-icon]"),Y=t.querySelector("[data-killstreak-label]"),ot=t.querySelector("[data-killstreak-sub]"),tt=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Fa);function wt(d){let{days:g,tier:E}=Ae(d);z.textContent=E?E.icon:"🎯",Y.textContent=E?`${E.label} Killstreak`:"No Killstreak",ot.textContent=`${g} Day streak`;let B=ee(d).filter(G=>G.track==="rank"),H=Re(B,Pe()).length>0;tt.hidden=!H}let k=t.querySelector("[data-weight-card]");function f(){Et(it.weight),Wa()}function S(d){Oo(k,{onExpand:f,...d}).catch(g=>{console.error("[lift-tracker]",g),k.classList.remove("lt-stats-row-expanded"),k.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,k.querySelector("[data-weight-expand]").addEventListener("click",f)})}let L=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{Et(it.history),L.hidden=!0,Pa()});let N=t.querySelector("[data-add-lift-form]"),P=N.querySelector('input[name="name"]'),R=t.querySelector("[data-lift-suggestions]"),W=t.querySelector("[data-add-lift-toggle]"),Q=t.querySelector("[data-add-lift-discovery]"),et=t.querySelector("[data-add-lift-hint]"),dt=t.querySelector("[data-create-workout-btn]"),Ot=t.querySelector("[data-create-workout-discovery]"),rt=null;function Rt(){R.hidden=!0,R.innerHTML=""}function jt(d){rt=null;let g=mr(d,{limit:4});if(g.length===0){Rt();return}R.hidden=!1,R.innerHTML=g.map(E=>`
      <button type="button" data-lift-suggestion="${ke(E.key)}">
        <span>${Bt(E.name)}</span>
        <small>${Bt([...E.primaryMuscles,...E.equipment||[]].slice(0,3).join(" · "))}</small>
      </button>
    `).join("")}P.addEventListener("input",()=>{let d=P.value.trim();if(d.length<2){rt=null,Rt();return}jt(d)}),R.addEventListener("click",d=>{let g=d.target.closest("[data-lift-suggestion]");if(!g)return;let E=ge(g.dataset.liftSuggestion);E&&(rt=E,P.value=E.name,Rt(),P.focus())}),W.addEventListener("click",()=>{let d=N.hidden;N.hidden=!d,W.setAttribute("aria-pressed",String(d)),W.classList.toggle("lt-add-lift-toggle-active",d),d?P.focus():(rt=null,Rt())});let Lt=t.querySelector("[data-lift-list]"),Xt=t.querySelector("[data-list-empty]");dt.addEventListener("click",()=>{dt.disabled||Aa()});let ht=t.querySelector("[data-workout-pills]"),Ke=t.querySelector("[data-workout-empty-hint]"),nt=[],ut=ea();function we(){return ut&&nt.find(d=>d.id===ut)||null}function x(){let d=we();if(!d)return I;let g=new Set(d.liftIds);return I.filter(E=>g.has(E.id))}function b(){ht.innerHTML=nt.map(d=>{let g=d.id===ut;return`
          <div class="lt-workout-pill-wrap${g?" lt-workout-pill-wrap-active":""}" data-reorder-item="${d.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${d.id}" aria-pressed="${g}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${d.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let d of nt){let g=ht.querySelector(`[data-workout-pill="${d.id}"] [data-workout-pill-name]`);g&&(g.textContent=d.name)}ht.querySelectorAll("[data-workout-pill]").forEach(d=>{d.addEventListener("click",()=>{let g=d.dataset.workoutPill;ut=ut===g?null:g,aa(ut),b(),je(_t),Sa(_t)})}),ht.querySelectorAll("[data-workout-edit]").forEach(d=>{d.addEventListener("click",g=>{g.stopPropagation(),Ra(d.dataset.workoutEdit)})})}let $="lt-fast-mode",j="lt-burst-mode";function F(){try{let d=window.localStorage.getItem($);if(d!==null)return d==="true";let g=window.localStorage.getItem(j);return g!==null?(window.localStorage.setItem($,g),window.localStorage.removeItem(j),g==="true"):!1}catch{return!1}}function X(d){try{window.localStorage.setItem($,String(d))}catch{}}let I=[],pt=F(),mt=new Map,_t=[],be=t.querySelector("[data-mode-toggle]");function ka(){be.textContent=pt?"Normal":"Fast",be.setAttribute("aria-pressed",String(pt)),be.classList.toggle("lt-mode-toggle-active",pt)}ka(),be.addEventListener("click",()=>{pt=!pt,X(pt),ka(),je(_t)}),N.addEventListener("submit",async d=>{d.preventDefault();let g=N.querySelector('input[name="name"]'),E=g.value.trim();if(!E)return;let B=rt&&rt.name===E?rt:ge(E);g.value="",rt=null,Rt(),g.disabled=!0;try{await Jt(E,I.length,{dictionary_key:B?.key||null}),await va()}finally{g.disabled=!1,g.focus()}}),de(Lt,{onReorder:async d=>{let g=[...d],E=new Set(d),B=I.map(H=>E.has(H.id)?g.shift():H.id);await Ba(B),I=B.map(H=>I.find(G=>G.id===H)).filter(Boolean)}}),de(ht,{axis:"x",onReorder:async d=>{await oo(d),nt=d.map(g=>nt.find(E=>E.id===g)).filter(Boolean)}});async function va(){let d=await Ht();nt=d.workouts,ut&&!nt.some(G=>G.id===ut)&&(ut=null,aa(null)),b(),I=d.lifts;let g=I.length>=2;if(Q.hidden=I.length>=2,et.hidden=I.length!==1,dt.disabled=!g,dt.setAttribute("aria-disabled",String(!g)),Ot.hidden=!g||nt.length>0,Ke.hidden=!g||nt.length>0,I.length===0){Lt.innerHTML="",Xt.hidden=!1,Xt.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",et.hidden=!0,l.hidden=!0,wt(d.workoutHistorySets),xa(At(d).momentum),S({showDiscovery:!1}),L.hidden=!0,D.hidden=!0,mt=new Map,_t=[];return}let E=d.activeSets,B=E.length>0;wt(d.workoutHistorySets),xa(At(d).momentum),S({showDiscovery:B&&!Ie(it.weight)}),L.hidden=!B||Ie(it.history),mt=new Map(I.map(G=>[G.id,[]]));for(let G of E){let Ct=mt.get(G.lift_id);Ct&&Ct.push(G)}let H=I.map(G=>({liftId:G.id,dailySeries:$t(mt.get(G.id)||[])}));je(H),Sa(H)}function Sa(d){let g=we(),E=g?d.filter(ve=>g.liftIds.includes(ve.liftId)):d,B=Zt(E);l.hidden=!1;let H=t.querySelector("[data-composite-canvas]"),G=t.querySelector("[data-composite-empty]"),Ct=t.querySelector("[data-composite-scope]"),zt=t.querySelector("[data-composite-blurb]");if(Ct.textContent=g?`Measuring ${g.name}`:"Measuring all lifts",zt.textContent=g?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",G.textContent=g?`Log a few sets for lifts in ${g.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",B.length===0){H.hidden=!0,G.hidden=!1,_.textContent="",D.hidden=!0;return}H.hidden=!1,G.hidden=!0,_.textContent=So(B[B.length-1].pct),D.hidden=Ie(it.composite),Me(H,B)}function Ye(d){let g=$t(mt.get(d)||[]),E=g[g.length-1];return E?`${Math.round(E.e1rm)} lb e1RM`:"No sets yet"}function Fr(d){let g=mt.get(d)||[];return g.length===0?"":g[g.length-1].weight}function je(d){_t=d;let g=x();Xt.hidden=g.length>0,Xt.textContent=ut?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",Lt.innerHTML=g.map(E=>pt?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${E.id}" data-lift-id="${E.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${E.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Ye(E.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${ke(E.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${E.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Fr(E.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${E.id}" data-lift-id="${E.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${E.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${Ye(E.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${ke(E.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let E of I){let H=Lt.querySelector(`[data-lift-id="${E.id}"]`)?.querySelector("[data-name-slot]");H&&(H.textContent=E.name)}Lt.querySelectorAll("[data-open-lift]").forEach(E=>{E.addEventListener("click",()=>qa(E.dataset.openLift))}),pt&&Hr()}function Hr(){Lt.querySelectorAll("[data-fast-log-form]").forEach(d=>{let g=d.dataset.fastLogForm;d.addEventListener("submit",async E=>{E.preventDefault();let B=d.querySelector("[data-fast-weight]"),H=d.querySelector("[data-fast-reps]"),G=d.querySelector("[data-fast-feedback]"),Ct=Number(B.value),zt=Number(H.value);if(!(Ct>=0)||!Number.isFinite(Ct)||!(zt>0)||!Number.isInteger(zt))return;let ve=mt.get(g)||[],Ur=J(Ct,zt),Ea=$e(Ur,ve),La=new Date().toISOString();Kt()&&me();let Or=await bt(g,Ct,zt,La),Br=I.find(se=>se.id===g);Kt()&&He({seconds:Fe(g),liftName:Br?.name||""});let _a=[...ve,Or];mt.set(g,_a),H.value="",H.focus();let Ca=Lt.querySelector(`[data-lift-id="${g}"]`)?.querySelector("[data-last-slot]");Ca&&(Ca.textContent=Ye(g));let Gr=T(La),Da=kt(_a.filter(se=>T(se.performed_at)===Gr));G.hidden=!1,G.classList.toggle("lt-pr",Ea),G.textContent=Ea?`PR! ${Math.round(Da)} lb today`:`Logged · ${Math.round(Da)} lb today`,Yt({showToasts:!0}).catch(se=>console.error("[lift-tracker]",se))})})}function xa(d){let g=d.latest,E=d.closest||[],B=E[0];O.textContent=g?`Latest: ${g.title}`:B?`Closest: ${B.title} · ${lt(B.progress)}`:"No goals yet",A.innerHTML=`
      <div class="lt-momentum-grid">
        <section>
          <h3>Recently Achieved</h3>
          ${g?`
            <article class="lt-momentum-item lt-momentum-item-achieved">
              <span>${Bt(g.title)}</span>
              <small>${Bt(g.message||"Recently achieved.")}</small>
            </article>
          `:'<p class="lt-empty">New goal and achievement wins will show here.</p>'}
        </section>
        <section>
          <h3>Closest</h3>
          ${E.length?E.map(H=>`
            <article class="lt-momentum-item">
              <span>${Bt(H.title)}</span>
              <small>${Bt(H.currentLabel)} · ${Bt(H.detail)}</small>
              <span class="lt-goal-progress"><span style="width: ${Math.round(H.progress*100)}%"></span></span>
            </article>
          `).join(""):'<p class="lt-empty">Set goals or keep logging to surface close achievements.</p>'}
        </section>
      </div>
      <button type="button" class="lt-goal-secondary-btn" data-open-goals>View goals</button>
    `,A.querySelector("[data-open-goals]").addEventListener("click",ie)}function ke(d){return String(d).replace(/[&<>"']/g,g=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[g])}function Bt(d){return ke(d)}await va()}var Sn=2.5;function Be(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function xn(t){return Math.round(Number(t)*2)/2}function En(t){return t.slice().sort((e,a)=>new Date(e.performed_at)-new Date(a.performed_at))}function Ln(t){return t.reduce((e,a)=>{if(!e)return a;let o=J(Number(e.weight),Number(e.reps));return J(Number(a.weight),Number(a.reps))>o?a:e},null)}function _n(t){let e=new Map;for(let a of En(t)){let o=T(a.performed_at);e.has(o)||e.set(o,[]),e.get(o).push(a)}return Array.from(e.entries()).sort((a,o)=>a[0].localeCompare(o[0]))}function yr(t,{weightStep:e=Sn}={}){let a=_n(t||[]),o=a[a.length-1];if(!o)return{baseline:null,context:null,options:[]};let[r,n]=o,i=a[a.length-2]||null,h=Ln(n),p=Number(h.weight),s=Number(h.reps),c=xn(p+e),m=Math.max(1,s-2),y={date:r,latestVolume:kt(n),previousVolume:i?kt(i[1]):null,sessionSetCount:n.length};return{baseline:{weight:p,reps:s,e1rm:J(p,s),label:`${Be(p)} lb x ${s}`,date:r},context:y,options:[{id:"reps",label:"Add reps",title:`${Be(p)} lb x ${s+1}`,description:"Same weight, one more rep.",weight:p,reps:s+1},{id:"weight",label:"Add weight",title:`${Be(c)} lb x ${m}`,description:"A heavier set with a small rep drop.",weight:c,reps:m},{id:"volume",label:"Add volume",title:`Extra set: ${Be(p)} lb x ${s}`,description:"Repeat your best recent set to raise session volume.",weight:p,reps:s}]}}async function wr(t,e){let a=await Ua(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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

    <section class="lt-lift-goals" data-lift-goals></section>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="history" role="tab" aria-selected="true">History</button>
      <button type="button" class="lt-tab" data-tab="details" role="tab" aria-selected="false">Details</button>
    </div>

    <section data-tab-panel="history"></section>
    <section data-tab-panel="details" hidden></section>
  `,t.querySelector("[data-back]").addEventListener("click",V);let o=t.querySelector("[data-name-input]");o.value=a.name;let r=a.name;o.addEventListener("keydown",k=>{k.key==="Enter"&&o.blur()}),o.addEventListener("blur",async()=>{let k=o.value.trim();if(!k||k===r){o.value=r;return}r=k,await Oa(e,k)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${r}"? You'll have a few seconds to undo it after.`)&&(await Ga(e),V(),Tt(`Deleted "${r}"`,{onUndo:async()=>{await Va(e),xe()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(k=>{k.addEventListener("click",()=>{n.forEach(f=>f.setAttribute("aria-selected",String(f===k))),Object.entries(i).forEach(([f,S])=>{S.hidden=f!==k.dataset.tab}),k.dataset.tab==="details"&&tt()})});let h=t.querySelector("[data-log-form]"),p=t.querySelector("[data-weight-input]"),s=t.querySelector("[data-reps-input]"),c=t.querySelector("[data-log-feedback]"),m=t.querySelector("[data-default-rest-input]"),y=t.querySelector("[data-lift-rest-input]"),l=t.querySelector("[data-rest-enabled-input]"),w=t.querySelector("[data-rest-enabled-label]"),C=t.querySelector("[data-default-rest-field]"),u=t.querySelector("[data-lift-rest-field]"),_=t.querySelector("[data-lift-goals]"),D=[];function q(){m.value=sa(),y.value=ia(e)||"";let k=Kt();l.checked=k,w.textContent=k?"Rest timer: On":"Rest timer: Off",m.disabled=!k,y.disabled=!k,C.classList.toggle("lt-rest-setting-field-disabled",!k),u.classList.toggle("lt-rest-setting-field-disabled",!k)}function A(k){let f=Number(k.value);return k.value===""?null:!Number.isFinite(f)||f<15?15:f>600?600:Math.round(f)}m.addEventListener("change",()=>{let k=A(m)||120;tr(k),q()}),y.addEventListener("change",()=>{let k=A(y);er(e,k),q()}),l.addEventListener("change",()=>{Zo(l.checked),q()});async function O(){D=await Ka(e)}function at(){if(D.length===0)return;let k=D[D.length-1];p.value=k.weight}h.addEventListener("submit",async k=>{k.preventDefault();let f=Number(p.value),S=Number(s.value);if(!(f>=0)||!Number.isFinite(f)||!(S>0)||!Number.isInteger(S))return;let L=J(f,S),P=$e(L,D),R=new Date;Kt()&&me(),await bt(e,f,S,R.toISOString()),Kt()&&He({seconds:Fe(e),liftName:r}),s.value="",s.focus(),await O(),z(),i.details.hidden||tt(),wt().catch(et=>console.error("[lift-tracker]",et));let W=T(R.toISOString()),Q=kt(D.filter(et=>T(et.performed_at)===W));c.hidden=!1,c.classList.toggle("lt-pr",P),c.textContent=P?`New PR! Today's volume: ${Math.round(Q)} lb`:`Logged. Today's volume: ${Math.round(Q)} lb`,Yt({showToasts:!0}).catch(et=>console.error("[lift-tracker]",et))});function U(k){let f=new Map;for(let S of k){let L=T(S.performed_at);f.has(L)||f.set(L,[]),f.get(L).push(S)}return Array.from(f.entries()).sort((S,L)=>L[0].localeCompare(S[0]))}function K(k){let[f,S,L]=k.split("-").map(Number);return new Date(f,S-1,L).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function z(){let k=i.history;if(D.length===0){k.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let f=U(D);k.innerHTML=f.map(([S,L])=>{let N=kt(L),R=L.slice().sort((W,Q)=>new Date(Q.performed_at)-new Date(W.performed_at)).map(W=>{let Q=Math.round(J(Number(W.weight),Number(W.reps)));return`
              <li class="lt-history-row" data-set-id="${W.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${W.id}">
                  <span class="lt-history-weight">${W.weight} lb &times; ${W.reps}</span>
                  <span class="lt-history-e1rm">${Q} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${K(S)}</span>
              <span class="lt-history-volume">${Math.round(N)} lb volume</span>
            </div>
            <ul class="lt-history-list">${R}</ul>
          </div>
        `}).join(""),k.querySelectorAll("[data-edit-trigger]").forEach(S=>{S.addEventListener("click",()=>ot(S.dataset.editTrigger))})}function Y(k){return i.history.querySelector(`[data-set-id="${k}"]`)}function ot(k){let f=Y(k),S=D.find(L=>L.id===k);!f||!S||(f.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${S.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${S.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${T(S.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,f.querySelector("[data-edit-cancel]").addEventListener("click",z),f.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await ja(k),await O(),z(),i.details.hidden||tt(),Tt("Set deleted",{onUndo:async()=>{await Xa(k),await O(),z(),i.details.hidden||tt()}})}),f.querySelector("[data-edit-form]").addEventListener("submit",async L=>{L.preventDefault();let N=Number(f.querySelector("[data-edit-weight]").value),P=Number(f.querySelector("[data-edit-reps]").value),R=f.querySelector("[data-edit-date]").value;if(!(N>=0)||!(P>0)||!R)return;let W=new Date(S.performed_at),[Q,et,dt]=R.split("-").map(Number);W.setFullYear(Q,et-1,dt),await Ya(k,{weight:N,reps:P,performed_at:W.toISOString()}),await O(),z(),i.details.hidden||tt()}))}function tt(){let k=i.details,f=$t(D);if(f.length===0){k.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Do();return}let S=yr(D),L=ge(a.dictionary_key||r);k.innerHTML=`
      ${Cn(L)}
      ${Dn(S)}
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `,k.querySelectorAll("[data-progression-option]").forEach(R=>{R.addEventListener("click",()=>{let W=S.options.find(Q=>Q.id===R.dataset.progressionOption);W&&(p.value=W.weight,s.value=W.reps,c.hidden=!0,h.scrollIntoView({behavior:"smooth",block:"start"}),s.focus())})});let N=k.querySelector("[data-lift-canvas]"),P=k.querySelector("[data-point-detail]");Co(N,f,{onPointClick:R=>{P.hidden=!1,P.textContent=`${K(R.date)}: ${R.weight} lb × ${R.reps} (${Math.round(R.e1rm)} e1RM)`}})}await O(),q(),at(),z(),await wt();async function wt(){let k=await Ht(),{goalEvaluations:f}=At(k),S=f.filter(L=>L.goal.type==="lift_set"&&L.goal.lift_id===e).slice(0,3);if(S.length===0){_.innerHTML=`
        <button type="button" class="lt-lift-goals-empty" data-open-goals>
          Set a goal for this lift
        </button>
      `,_.querySelector("[data-open-goals]").addEventListener("click",ie);return}_.innerHTML=`
      <div class="lt-lift-goals-header">
        <span>Goals</span>
        <button type="button" data-open-goals>Manage</button>
      </div>
      ${S.map(L=>`
        <article class="lt-lift-goal-row">
          <span>
            <strong>${Z(L.title)}</strong>
            <small>${Z(L.currentLabel)} · ${Z(L.targetLabel)}</small>
          </span>
          <em>${L.achieved?"Hit":lt(L.progress)}</em>
        </article>
      `).join("")}
    `,_.querySelector("[data-open-goals]").addEventListener("click",ie)}}function Cn(t){if(!t)return"";let e=t.primaryMuscles.map(n=>`<span>${Z(n)}</span>`).join(""),a=t.secondaryMuscles.map(n=>`<span>${Z(n)}</span>`).join(""),o=t.equipment.map(n=>`<span>${Z(n)}</span>`).join(""),r=t.movementPatterns.map(n=>`<span>${Z(n)}</span>`).join("");return`
    <section class="lt-lift-info-card">
      <div class="lt-lift-info-header">
        <span>Lift Info</span>
        <strong>${Z(t.name)}</strong>
      </div>
      <div class="lt-lift-info-group">
        <h3>Primary</h3>
        <div class="lt-lift-info-tags">${e||"<span>Not tagged</span>"}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Secondary</h3>
        <div class="lt-lift-info-tags">${a||"<span>None listed</span>"}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Equipment</h3>
        <div class="lt-lift-info-tags">${o||"<span>Not listed</span>"}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Pattern</h3>
        <div class="lt-lift-info-tags">${r||"<span>Not listed</span>"}</div>
      </div>
      ${t.cues?.length?`
        <ul class="lt-lift-info-cues">
          ${t.cues.map(n=>`<li>${Z(n)}</li>`).join("")}
        </ul>
      `:""}
      ${t.tutorialUrl?`<a class="lt-lift-info-link" href="${Z(t.tutorialUrl)}" target="_blank" rel="noopener noreferrer">Watch tutorial</a>`:'<p class="lt-lift-info-empty">Tutorial link not set yet.</p>'}
    </section>
  `}function Dn(t){if(!t.baseline)return"";let e=t.context.previousVolume==null?`${Math.round(t.context.latestVolume)} lb last session`:`${Math.round(t.context.latestVolume)} lb last session · ${Math.round(t.context.previousVolume)} lb previous`;return`
    <section class="lt-progression-card">
      <div class="lt-progression-header">
        <span>Progression Options</span>
        <small>Based on ${Z(t.baseline.label)}</small>
      </div>
      <p class="lt-progression-context">${Z(e)}</p>
      <div class="lt-progression-options">
        ${t.options.map(a=>`
          <button type="button" class="lt-progression-option" data-progression-option="${Z(a.id)}">
            <span>${Z(a.label)}</span>
            <strong>${Z(a.title)}</strong>
            <small>${Z(a.description)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `}function Z(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var br=60;function Ge(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-br),e}function Ut(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ye(t,e,a=new Date,o=`last ${br} days`,r=[],n=[]){let i=T(a.toISOString()),h=[`Lift Tracker — ${o} (as of ${i})`,""],p=t.filter(s=>(e.get(s.id)||[]).length>0);if(p.length===0)h.push("No sets logged in this period."),h.push("");else{for(let c of p){let m=(e.get(c.id)||[]).slice().sort((w,C)=>new Date(w.performed_at)-new Date(C.performed_at)),y=kt(m),l=Math.max(...m.map(w=>J(Number(w.weight),Number(w.reps))));h.push(c.name);for(let w of m){let C=Math.round(J(Number(w.weight),Number(w.reps)));h.push(`  ${T(w.performed_at)}: ${w.weight} lb x ${w.reps} (e1RM ${C})`)}h.push(`  Sets: ${m.length} | Volume: ${Math.round(y)} lb | Best e1RM: ${Math.round(l)}`),h.push("")}let s=t.length-p.length;s>0&&(h.push(`(${s} lift${s===1?"":"s"} with no sets in this period omitted)`),h.push(""))}if(r.length>0){h.push("Body weight");for(let l of r)h.push(`  ${l.date}: ${Ut(l.weight)} lb`);let s=r[0].weight,c=r[r.length-1].weight,m=c-s,y=m>0?"+":"";h.push(`  Start: ${Ut(s)} lb | Current: ${Ut(c)} lb | Change: ${y}${Ut(m)} lb`),h.push("")}if(n.length>0){h.push("Waist");for(let l of n)h.push(`  ${l.date}: ${Ut(l.waist)} in`);let s=n[0].waist,c=n[n.length-1].waist,m=c-s,y=m>0?"+":"";h.push(`  Start: ${Ut(s)} in | Current: ${Ut(c)} in | Change: ${y}${Ut(m)} in`),h.push("")}return h.join(`
`).trimEnd()}var $n=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Tn=`
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
`;async function kr(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${$n.map(l=>`
          <section class="lt-help-section">
            <h2>${l.title}</h2>
            <p>${l.body}</p>
          </section>
          ${l.title==="Export progress"?Tn:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",V);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),o=t.querySelector("[data-export-chevron]"),r=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let w=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(w)),a.hidden=!w,o.innerHTML=w?"&#9650;":"&#9660;",!!w){e.disabled=!0;try{let C=await st(),u=C.map(Y=>Y.id),_=Ge().toISOString(),D=await Ce(u,_),q=new Map(C.map(Y=>[Y.id,[]]));for(let Y of D){let ot=q.get(Y.lift_id);ot&&ot.push(Y)}let O=(await ft()).filter(Y=>new Date(Y.logged_at)>=new Date(_)),at=vt(O),K=(await Gt()).filter(Y=>new Date(Y.logged_at)>=new Date(_)),z=Vt(K);r.value=ye(C,q,new Date,void 0,at,z),i.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{r.select();let l=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(r.value),l=!0}catch{l=!1}if(!l)try{l=document.execCommand("copy")}catch{l=!1}i.hidden=!1,i.textContent=l?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let h=t.querySelector("[data-full-export-toggle]"),p=t.querySelector("[data-full-export-body]"),s=t.querySelector("[data-full-export-chevron]"),c=t.querySelector("[data-full-export-textarea]"),m=t.querySelector("[data-full-export-copy]"),y=t.querySelector("[data-full-export-status]");h.addEventListener("click",async()=>{let w=!(h.getAttribute("aria-expanded")==="true");if(h.setAttribute("aria-expanded",String(w)),p.hidden=!w,s.innerHTML=w?"&#9650;":"&#9660;",!!w){h.disabled=!0;try{let C=await st(),u=C.map(U=>U.id),_=await Dt(u),D=new Map(C.map(U=>[U.id,[]]));for(let U of _){let K=D.get(U.lift_id);K&&K.push(U)}let q=await ft(),A=vt(q),O=await Gt(),at=Vt(O);c.value=ye(C,D,new Date,"all-time",A,at),y.hidden=!0}finally{h.disabled=!1}}}),m.addEventListener("click",async()=>{c.select();let l=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(c.value),l=!0}catch{l=!1}if(!l)try{l=document.execCommand("copy")}catch{l=!1}y.hidden=!1,y.textContent=l?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function vr(t){Et(it.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",V);let[e,a]=await Promise.all([st(),Qt()]),o=Yo(a),r=o?e.filter(l=>o.liftIds.includes(l.id)):e,n=r.length?await Dt(r.map(l=>l.id)):[],i=new Map(r.map(l=>[l.id,[]]));for(let l of n){let w=i.get(l.lift_id);w&&w.push(l)}let h=r.map(l=>({liftId:l.id,dailySeries:$t(i.get(l.id)||[])})),p=Zt(h),s=t.querySelector("[data-composite-canvas]"),c=t.querySelector("[data-composite-empty]"),m=t.querySelector("[data-composite-scope]"),y=t.querySelector("[data-composite-blurb]");if(m.textContent=o?`Measuring ${o.name}`:"Measuring all lifts",y.textContent=o?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",c.textContent=o?`Log a few sets for lifts in ${o.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",p.length===0){s.hidden=!0,c.hidden=!1;return}s.hidden=!1,c.hidden=!0,Me(s,p)}function Mn(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function qn(){let t=await st(),e=new Map(t.map(o=>[o.id,o.name]));return(await Dt(t.map(o=>o.id))).map(o=>({...o,liftName:e.get(o.lift_id)||"Unknown lift"}))}function An(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let o=Array.from(a.entries()).map(([n,i])=>{let p=i.slice().sort((s,c)=>new Date(s.performed_at)-new Date(c.performed_at)).map(s=>{let c=Math.round(J(Number(s.weight),Number(s.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${s.weight} lb &times; ${s.reps}</span>
                <span class="lt-history-e1rm">${c} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${p}</ul>
        </div>
      `}).join(""),r=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Mn(t)}</span>
        <span class="lt-history-volume">${r} lift${r===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${o}
    </div>
  `}async function Sr(t){Et(it.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",V);let e=t.querySelector("[data-history-content]"),a=await qn();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let o=xo(a);e.innerHTML=o.map(([r,n])=>An(r,n)).join("")}var xr="lt-theme",fa="default";function ha(){return We(xr,fa)}function Er(t){!t||t===fa?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function Lr(t){Er(t),Ne(xr,t||fa)}function _r(){Er(ha())}var Rn={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},Wn=["rank","mastery","streak","capstone","secret"],Nn="Hidden until unlocked.";async function Cr(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",V);let e=await _e(),a=await ft(),o=await Ee(),r=await Le(),{days:n,tier:i}=Ae(e);t.querySelector("[data-killstreak-current-icon]").textContent=i?i.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=i?`${i.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let h=Qe(e,o),p=t.querySelector("[data-killstreak-tier-list]");p.innerHTML=ue.map(u=>{let _=h[u.key];return`
      <li class="lt-killstreak-tier-row${i?.key===u.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${u.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${u.label}</span>
          <span class="lt-killstreak-tier-req">${u.days}+ day${u.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${_} earned</span>
      </li>
    `}).join("");let s=ee(e,o,{bodyWeightEntries:a,hasSubmittedFeedback:r}),c=s.filter(u=>u.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${c} / ${s.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let m=s.filter(u=>u.track==="rank"),y=new Set(Re(m,Pe()));Ko(m.filter(u=>u.unlocked).map(u=>u.id));let l=t.querySelector("[data-achievements]");function w(u){if(u.track!=="rank"){let O=u.track==="secret"&&!u.unlocked,at=O?" lt-achievement-card-desc-hidden":"",U=O?Nn:u.description,K=u.flavor&&!O?`<span class="lt-achievement-card-flavor">${u.flavor}</span>`:"";return`
        <li class="lt-achievement-card${u.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${u.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${u.name}</span>
            <span class="lt-achievement-card-desc${at}">${U}</span>
            ${K}
          </span>
        </li>
      `}let _=u.unlocked&&ha()===u.theme.id,D=u.unlocked&&y.has(u.id),q=u.unlocked?`<span class="lt-achievement-card-theme">${u.theme.label} theme${_?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${u.theme.label}</span>`,A=D?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${u.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${D?" lt-achievement-card-new":""}${_?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${u.theme.id}"${u.unlocked?"":" disabled"} aria-label="${u.unlocked?`Apply the ${u.theme.label} theme`:`Locked: ${u.name}`}">
          <span class="lt-achievement-card-icon">${u.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${u.name}</span>
            <span class="lt-achievement-card-desc">${u.description}</span>
            ${q}
            ${A}
          </span>
        </button>
      </li>
    `}function C(){l.innerHTML=Wn.map(u=>{let D=s.filter(q=>q.track===u).sort((q,A)=>Number(A.unlocked)-Number(q.unlocked)).map(w).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Rn[u]}</h3>
          ${u==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${D}</ul>
        </section>
      `}).join("")}C(),l.addEventListener("click",u=>{let _=u.target.closest("[data-apply-theme]");!_||_.disabled||(Lr(_.dataset.applyTheme),C())})}var ga=`goal_format: lift_tracker_goals_v1
goals:
  - title: Dumbbell Chest Press 35 x 10
    type: lift_set
    lift: dumbell chest press
    weight: 35
    reps: 10
    unit: lb
    timeframe_weeks: 4

  - title: Harrier Week
    type: weekly_workout_days
    target: 3
    recurring: weekly

  - title: Workout A Volume Base
    type: weekly_workout_volume
    workout: Workout A
    target: 18000
    unit: lb
    recurring: weekly`,$r=`Analyze this Lift Tracker export and create 5-8 goals that are achievable in 3-4 weeks.
Use only Lift Tracker YAML format.
Allowed types: lift_set, weekly_workout_days, weekly_workout_volume, workout_session_volume.
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;async function Tr(t){let e=await Ht(),a=At(e),o=[];function r(){let s=a.goalEvaluations.filter(m=>m.goal.status==="active"&&!m.achieved),c=a.goalEvaluations.filter(m=>m.goal.status==="achieved"||m.achieved);t.innerHTML=`
      <header class="lt-detail-header">
        <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
        <h1 class="lt-weight-view-title">Goals</h1>
      </header>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Active Goals</h2>
        <div data-active-goals>
          ${s.length?s.map(Dr).join(""):'<p class="lt-empty">No active goals yet. Add one below or paste a batch from an LLM.</p>'}
        </div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Add Goal</h2>
        ${i()}
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Import Goals</h2>
        <p class="lt-composite-blurb">You can have an LLM turn your recent Lift Tracker history into goals, then paste the YAML it returns here.</p>
        <ol class="lt-goal-steps">
          <li>Export your recent history from the <button type="button" class="lt-inline-link" data-help-export-link>? Help page</button>, or use the all-in-one copy button below.</li>
          <li>Paste the history, goal format, and prompt into an LLM.</li>
          <li>Ask it to return only Lift Tracker YAML using exact lift and workout names.</li>
          <li>Paste the YAML output into this box, tap Preview, then tap Import goals.</li>
        </ol>
        <div class="lt-goal-helper-actions">
          <button type="button" class="lt-goal-secondary-btn" data-copy-goal-packet>Copy 60-day history + prompt</button>
          <span class="lt-export-status" data-goal-packet-status hidden></span>
        </div>
        <textarea class="lt-goal-packet-output" data-goal-packet-output rows="10" readonly hidden></textarea>
        <details class="lt-goal-import-help">
          <summary><span>Goal format and LLM prompt</span><strong>View More -&gt;</strong></summary>
          <p class="lt-composite-blurb">Allowed types: <strong>lift_set</strong>, <strong>weekly_workout_days</strong>, <strong>weekly_workout_volume</strong>, <strong>workout_session_volume</strong>.</p>
          <pre>${yt(ga)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${yt($r)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${Mr(ga)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${c.length?c.map(Dr).join(""):'<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `,t.querySelector("[data-back]").addEventListener("click",V),t.querySelector("[data-help-export-link]").addEventListener("click",Se),h(),p(),t.querySelectorAll("[data-delete-goal]").forEach(m=>{m.addEventListener("click",async()=>{await to(m.dataset.deleteGoal),await n()})})}async function n(){e=await Ht(),a=At(e),r()}function i(){return`
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${pa.map(s=>`<option value="${s.id}">${s.label}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field lt-goal-title-field">
          <span>Title</span>
          <input type="text" name="title" maxlength="80" placeholder="Dumbbell Row 45 x 12" required />
        </label>
        <label class="lt-field" data-lift-field>
          <span>Lift</span>
          <select name="lift_id">
            ${e.lifts.map(s=>`<option value="${s.id}">${yt(s.name)}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field" data-workout-field hidden>
          <span>Workout</span>
          <select name="workout_id">
            ${e.workouts.map(s=>`<option value="${s.id}">${yt(s.name)}</option>`).join("")}
          </select>
        </label>
        <div class="lt-goal-number-row" data-lift-set-fields>
          <label class="lt-field">
            <span>Weight</span>
            <input type="number" inputmode="decimal" step="0.5" min="0" name="target_weight" />
          </label>
          <label class="lt-field">
            <span>Reps</span>
            <input type="number" inputmode="numeric" step="1" min="1" name="target_reps" />
          </label>
        </div>
        <label class="lt-field" data-target-field hidden>
          <span>Target</span>
          <input type="number" inputmode="decimal" step="1" min="0" name="target_value" />
        </label>
        <label class="lt-field">
          <span>Timeframe weeks</span>
          <input type="number" inputmode="numeric" step="1" min="1" name="timeframe_weeks" placeholder="4" />
        </label>
        <button type="submit" class="lt-log-btn">Save goal</button>
        <p class="lt-log-feedback" data-goal-feedback hidden></p>
      </form>
    `}function h(){let s=t.querySelector("[data-goal-form]"),c=t.querySelector("[data-goal-type]"),m=t.querySelector("[data-goal-feedback]");function y(){let l=c.value;t.querySelector("[data-lift-field]").hidden=l!=="lift_set",t.querySelector("[data-workout-field]").hidden=!["weekly_workout_volume","workout_session_volume"].includes(l),t.querySelector("[data-lift-set-fields]").hidden=l!=="lift_set",t.querySelector("[data-target-field]").hidden=l==="lift_set"}c.addEventListener("change",y),y(),s.addEventListener("submit",async l=>{l.preventDefault(),m.hidden=!0;let w=s.type.value,u={title:s.title.value.trim(),type:w,unit:"lb",timeframe_weeks:Ve(s.timeframe_weeks.value),recurring:w.startsWith("weekly_")?"weekly":"none",metadata:{}};w==="lift_set"?(u.lift_id=s.lift_id.value,u.target_weight=Ve(s.target_weight.value),u.target_reps=Ve(s.target_reps.value)):(u.target_value=Ve(s.target_value.value),w!=="weekly_workout_days"&&(u.workout_id=s.workout_id.value));let _=Fn(u);if(_){m.hidden=!1,m.textContent=_;return}await Ja(u),await Yt(),s.reset(),await n()})}function p(){let s=t.querySelector("[data-import-text]"),c=t.querySelector("[data-import-feedback]"),m=t.querySelector("[data-save-import]"),y=t.querySelector("[data-copy-goal-packet]"),l=t.querySelector("[data-goal-packet-output]"),w=t.querySelector("[data-goal-packet-status]");y.addEventListener("click",async()=>{let C=y.textContent;y.disabled=!0,y.textContent="Building...",w.hidden=!0;try{let u=await In();l.value=u,l.hidden=!1;let _=await Pn(u);w.hidden=!1,w.textContent=_?"Copied. Paste this into an LLM.":"Copy from the box below."}finally{y.disabled=!1,y.textContent=C}}),t.querySelector("[data-preview-import]").addEventListener("click",()=>{let C=dr(s.value,{lifts:e.lifts,workouts:e.workouts});if(o=C.goals,C.errors.length){m.hidden=!0,c.innerHTML=`<div class="lt-goal-import-errors">${C.errors.map(u=>`<p>${yt(u)}</p>`).join("")}</div>`;return}m.hidden=o.length===0,c.innerHTML=o.length?`<ul class="lt-goal-preview-list">${o.map(u=>`<li>${yt(u.title)} <span>${yt(u.type)}</span></li>`).join("")}</ul>`:'<p class="lt-empty">No goals found in that text.</p>'}),m.addEventListener("click",async()=>{o.length!==0&&(await Qa(o),await Yt(),s.value="",o=[],await n())})}r()}async function In(){let t=await st(),e=t.map(c=>c.id),a=Ge().toISOString(),o=await Ce(e,a),r=new Map(t.map(c=>[c.id,[]]));for(let c of o){let m=r.get(c.lift_id);m&&m.push(c)}let i=(await ft()).filter(c=>new Date(c.logged_at)>=new Date(a)),p=(await Gt()).filter(c=>new Date(c.logged_at)>=new Date(a)),s=ye(t,r,new Date,void 0,vt(i),Vt(p));return["Use the Lift Tracker export below to create goals.","",$r,"","Return only YAML in this exact format. Do not wrap it in markdown fences.","",ga,"","Lift Tracker export:","",s].join(`
`)}async function Pn(t){if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let a=document.execCommand("copy");return e.remove(),a}catch{return!1}}function Dr(t){let e=t.achieved||t.goal.status==="achieved";return`
    <article class="lt-goal-card${e?" lt-goal-card-achieved":""}">
      <div class="lt-goal-card-main">
        <span class="lt-goal-card-title">${yt(t.title)}</span>
        <span class="lt-goal-card-sub">${yt(t.currentLabel)} · ${yt(t.targetLabel)}</span>
        <span class="lt-goal-progress" aria-label="${lt(t.progress)} complete">
          <span style="width: ${Math.round(Math.min(t.progress,1)*100)}%"></span>
        </span>
      </div>
      <div class="lt-goal-card-side">
        <span>${e?"Hit":lt(t.progress)}</span>
        <button type="button" data-delete-goal="${t.goal.id}" aria-label="Delete ${Mr(t.title)}">&times;</button>
      </div>
    </article>
  `}function Fn(t){if(!t.title)return"Add a title.";if(t.type==="lift_set"){if(!t.lift_id)return"Choose a lift.";if(t.target_weight==null)return"Add a target weight.";if(t.target_reps==null)return"Add target reps."}else if(t.target_value==null)return"Add a target.";return(t.type==="weekly_workout_volume"||t.type==="workout_session_volume")&&!t.workout_id?"Choose a workout.":null}function Ve(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function yt(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Mr(t){return yt(t)}var qr="__divider__";async function ya(t,{mode:e,workoutId:a}={}){let o=e==="edit",[r,n]=await Promise.all([st(),o?ro(a):Promise.resolve(null)]);if(o&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(o?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${o?Ar(n.name):""}"
      />
      ${o?'<button type="button" class="lt-detail-delete" data-delete-workout aria-label="Delete workout">&times;</button>':""}
    </header>

    <p class="lt-workout-instructions">
      Drag the lifts you want in this workout above the yellow line, then save.
    </p>

    <ul class="lt-lift-list lt-workout-lift-list" data-workout-lift-list></ul>
    <p class="lt-empty" data-workout-lifts-empty hidden>Add a lift on the homepage first.</p>

    <button type="button" class="lt-save-workout-btn" data-save-workout>Save workout</button>
    <p class="lt-workout-save-feedback" data-workout-save-feedback hidden></p>
  `,t.querySelector("[data-back]").addEventListener("click",V);let h=t.querySelector("[data-workout-name-input]"),p=t.querySelector("[data-workout-lift-list]"),s=t.querySelector("[data-workout-lifts-empty]"),c=t.querySelector("[data-save-workout]"),m=t.querySelector("[data-workout-save-feedback]");s.hidden=r.length>0;let y=r.filter(u=>i.has(u.id)),l=r.filter(u=>!i.has(u.id));p.innerHTML=[...y.map(w),C(),...l.map(w)].join("");for(let u of r){let D=p.querySelector(`[data-lift-id="${u.id}"]`)?.querySelector("[data-name-slot]");D&&(D.textContent=u.name)}de(p,{onReorder:()=>{}}),o&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await so(a),V(),Tt(`Deleted "${n.name}"`,{onUndo:async()=>{await io(a),xe()}}))}),c.addEventListener("click",async()=>{let u=h.value.trim();if(!u){h.focus();return}let _=Array.from(p.querySelectorAll("[data-reorder-item]")),D=_.findIndex(A=>A.dataset.reorderItem===qr),q=_.slice(0,D).map(A=>A.dataset.reorderItem);c.disabled=!0,m.hidden=!0;try{if(o)await no(a,u,q);else{let A=await Qt();await De(u,q,A.length)}V()}catch(A){console.error("[lift-tracker]",A),m.hidden=!1,m.textContent="Something went wrong saving the workout.",c.disabled=!1}});function w(u){return`
      <li class="lt-lift-row" data-reorder-item="${u.id}" data-lift-id="${u.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${Ar(u.name)}">&#8942;&#8942;</button>
      </li>
    `}function C(){return`
      <li class="lt-workout-divider" data-reorder-item="${qr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function Ar(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Hn=`${window.location.origin}${window.location.pathname}`;function Un(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function wa(t){let e="signin";function a(r,n,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Un(i||"")}">

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

          ${r?`<p class="lt-gate-error">${r}</p>`:""}
          ${n?`<p class="lt-gate-info">${n}</p>`:""}

          <button type="button" class="lt-gate-toggle" data-auth-toggle>
            ${e==="signup"?"Already have an account? Sign in":"Don't have an account? Create one"}
          </button>
        </form>
      </main>
    `}function o(r,n,i){t.innerHTML=a(r,n,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",o()});let h=t.querySelector("[data-auth-form]");h.addEventListener("submit",async p=>{p.preventDefault();let s=h.email.value.trim(),c=h.password.value,m=h.querySelector('button[type="submit"]');m.disabled=!0,m.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:y,error:l}=e==="signup"?await v.auth.signUp({email:s,password:c,options:{emailRedirectTo:Hn}}):await v.auth.signInWithPassword({email:s,password:c});if(l)throw l;if(e==="signup"&&!y.session){e="signin",o(null,`Account created. Check ${s} for a confirmation link, then sign in here.`,s);return}}catch(y){o(y.message||"Something went wrong. Try again.",null,s)}})}o()}function Rr(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function Wr(){let{data:t,error:e}=await v.auth.signInAnonymously();if(e)throw e;return await On(),t}async function On(){let t=r=>new Date(Date.now()-r*24*60*60*1e3).toISOString(),[e,a,o]=await Promise.all([Jt("Bench Press",0),Jt("Squat",1),Jt("Deadlift",2)]);await Promise.all([bt(e.id,135,8,t(6)),bt(e.id,145,6,t(2)),bt(a.id,185,5,t(5)),bt(a.id,195,5,t(1)),bt(o.id,225,5,t(3))]),await De("Full Body",[e.id,a.id,o.id],0)}var ct=document.getElementById("lift-tracker-app");_r();var Nr=0;async function ba(){let t=++Nr,e=()=>t!==Nr;try{let{data:{session:a}}=await v.auth.getSession();if(e())return;if(!a)if(Rr())try{if(await Wr(),e())return}catch(r){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",r),await wa(ct);return}else return await wa(ct),e(),void 0;let o=Ma();if(o.name==="detail"?await wr(ct,o.liftId):o.name==="help"?await kr(ct):o.name==="weight"?await Bo(ct,{initialTab:o.tab}):o.name==="composite"?await vr(ct):o.name==="history"?await Sr(ct):o.name==="killstreak"?await Cr(ct):o.name==="goals"?await Tr(ct):o.name==="workout-new"?await ya(ct,{mode:"create"}):o.name==="workout-edit"?await ya(ct,{mode:"edit",workoutId:o.workoutId}):await gr(ct),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),ct.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",ba);var Ir=null,Pr=!1;v.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,o=!Pr;Pr=!0;let r=a!==Ir;Ir=a,!(o||!r)&&(V(),ba())});ba();

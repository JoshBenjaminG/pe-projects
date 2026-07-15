import{createClient as Gr}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var Aa="https://mqfsgammpsumpltfutwl.supabase.co",Ra="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var v=Gr(Aa,Ra);function Ia(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight",tab:"weight"}:t==="weight/food"?{name:"weight",tab:"food"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="goals"?{name:"goals"}:{name:"list"}}function j(){window.location.hash="#/"}function Na(t){window.location.hash=`#/lift/${t}`}function Wa(){window.location.hash="#/workout/new"}function Pa(t){window.location.hash=`#/workout/${t}/edit`}function Ee(){window.location.hash="#/help"}function Fa(){window.location.hash="#/weight"}function Ha(){window.location.hash="#/weight/food"}function Ua(){window.location.hash="#/composite"}function Oa(){window.location.hash="#/history"}function Ba(){window.location.hash="#/killstreak"}function de(){window.location.hash="#/goals"}function Le(){window.dispatchEvent(new Event("hashchange"))}async function _e(){let{data:t,error:e}=await v.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Ga(){let{error:t}=await v.from("feedback_submissions").insert({});if(t)throw t}async function Ce(){let{count:t,error:e}=await v.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function dt(){let{data:t,error:e}=await v.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function Vr(){let{data:t,error:e}=await v.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function Va(t){let{data:e,error:a}=await v.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function Zt(t,e,a={}){let{data:o,error:r}=await v.from("lifts").insert({...a,name:t,sort_order:e}).select().single();if(r)throw r;return o}async function Ka(t,e){let{data:a,error:o}=await v.from("lifts").update({name:e}).eq("id",t).select().single();if(o)throw o;return a}async function Ya(t){let e=t.map((r,n)=>v.from("lifts").update({sort_order:n}).eq("id",r)),o=(await Promise.all(e)).find(r=>r.error);if(o)throw o.error}async function ja(t){let{error:e}=await v.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Xa(t){let{error:e}=await v.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function za(t){let{data:e,error:a}=await v.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function $t(t){if(!t||t.length===0)return[];let{data:e,error:a}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function $e(){let t=await Vr();return $t(t)}async function De(t,e){if(!t||t.length===0)return[];let{data:a,error:o}=await v.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(o)throw o;return a}async function vt(t,e,a,o){let{data:r,error:n}=await v.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:o||new Date().toISOString()}).select().single();if(n)throw n;return r}async function Ja(t,e){let{data:a,error:o}=await v.from("sets").update(e).eq("id",t).select().single();if(o)throw o;return a}async function Qa(t){let{error:e}=await v.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Za(t){let{error:e}=await v.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function to(){let{data:t,error:e}=await v.from("goals").select("*").is("deleted_at",null).order("created_at",{ascending:!0});if(e)throw e;return t}async function eo(t){let{data:e,error:a}=await v.from("goals").insert(t).select().single();if(a)throw a;return e}async function ao(t){if(!t||t.length===0)return[];let{data:e,error:a}=await v.from("goals").insert(t).select();if(a)throw a;return e}async function oo(t,e){let{data:a,error:o}=await v.from("goals").update(e).eq("id",t).select().single();if(o)throw o;return a}async function ro(t){let{error:e}=await v.from("goals").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function no(){let{data:t,error:e}=await v.from("goal_events").select("*").order("created_at",{ascending:!1}).limit(100);if(e)throw e;return t}async function Kr(t){let{data:e,error:a}=await v.from("goal_events").insert(t).select().single();if(a){if(a.code==="23505")return null;throw a}return e}async function so(t){let e=[];for(let a of t){let o=await Kr(a);o&&e.push(o)}return e}async function te(){let{data:t,error:e}=await v.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(o=>o.lift_id)}))}async function io(t){let e=t.map((r,n)=>v.from("workouts").update({sort_order:n}).eq("id",r)),o=(await Promise.all(e)).find(r=>r.error);if(o)throw o.error}async function lo(t){let{data:e,error:a}=await v.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(o=>o.lift_id)}:null}async function Te(t,e,a){let{data:o,error:r}=await v.from("workouts").insert({name:t,sort_order:a}).select().single();if(r)throw r;if(e.length>0){let{error:n}=await v.from("workout_lifts").insert(e.map(s=>({workout_id:o.id,lift_id:s})));if(n)throw n}return o}async function co(t,e,a){let{error:o}=await v.from("workouts").update({name:e}).eq("id",t);if(o)throw o;let{error:r}=await v.from("workout_lifts").delete().eq("workout_id",t);if(r)throw r;if(a.length>0){let{error:n}=await v.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(n)throw n}}async function uo(t){let{error:e}=await v.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function po(t){let{error:e}=await v.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function gt(){let{data:t,error:e}=await v.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function mo(t,e){let{data:a,error:o}=await v.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(o)throw o;return a}async function fo(t,e){let{data:a,error:o}=await v.from("body_weight").update(e).eq("id",t).select().single();if(o)throw o;return a}async function ho(t){let{error:e}=await v.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function go(t){let{error:e}=await v.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Yt(){let{data:t,error:e}=await v.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function yo(t,e){let{data:a,error:o}=await v.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(o)throw o;return a}async function wo(t,e){let{data:a,error:o}=await v.from("waist_measurements").update(e).eq("id",t).select().single();if(o)throw o;return a}async function bo(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ko(t){let{error:e}=await v.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}async function jt(t,e){let{data:a,error:o}=await v.from("food_log_entries").select("*").is("deleted_at",null).gte("logged_at",t).lt("logged_at",e).order("logged_at",{ascending:!1});if(o)throw o;return a}async function vo(t,e,a){let{data:o,error:r}=await v.from("food_log_entries").insert({title:t,calories:e,logged_at:a||new Date().toISOString()}).select().single();if(r)throw r;return o}async function So(t,e){let{data:a,error:o}=await v.from("food_log_entries").update(e).eq("id",t).select().single();if(o)throw o;return a}async function xo(t){let{error:e}=await v.from("food_log_entries").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Eo(t){let{error:e}=await v.from("food_log_entries").update({deleted_at:null}).eq("id",t);if(e)throw e}function z(t,e){return t*(1+e/30)}function $(t){let e=new Date(t),a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${o}-${r}`}function Dt(t){let e=new Map;for(let a of t){let o=$(a.performed_at),r=z(Number(a.weight),Number(a.reps)),n=e.get(o);(!n||r>n.e1rm)&&e.set(o,{date:o,e1rm:r,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date))}function ee(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let o=new Set;for(let s of e)for(let w of s.dailySeries)o.add(w.date);let r=Array.from(o).sort(),n=[];for(let s of r){let w=0,c=0;for(let i of e){let m=null;for(let p of i.dailySeries)if(p.date<=s)m=p;else break;m&&(w+=m.e1rm/a.get(i.liftId),c+=1)}if(c>0){let i=w/c;n.push({date:s,ratio:i,pct:(i-1)*100})}}return n}function Me(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(o=>z(Number(o.weight),Number(o.reps))));return t>a}function St(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function Lo(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function _o(t){let e=new Map;for(let a of t){let o=$(a.performed_at);e.has(o)||e.set(o,[]),e.get(o).push(a)}return Array.from(e.entries()).sort((a,o)=>o[0].localeCompare(a[0]))}function xt(t){let e=new Map;for(let a of t){let o=$(a.logged_at),r=e.get(o);(!r||new Date(a.created_at||0)>=new Date(r.createdAt||0))&&e.set(o,{date:o,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date)).map(({date:a,weight:o,entryId:r})=>({date:a,weight:o,entryId:r}))}function Co(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function $o(t){let e=new Map;for(let a of t){let o=$(a.logged_at),r=e.get(o);(!r||new Date(a.created_at||0)>=new Date(r.createdAt||0))&&e.set(o,{date:o,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date)).map(({date:a,waist:o,entryId:r})=>({date:a,waist:o,entryId:r}))}function Nt(t){let e=new Map;for(let a of t){let o=$(a.logged_at);e.set(o,(e.get(o)||0)+Number(a.calories))}return Array.from(e.entries()).sort((a,o)=>a[0].localeCompare(o[0])).map(([a,o])=>({date:a,calories:o}))}var ue=null,Wt=null,Pt=null,Ft=null,Ht=null,pe=14,qe="#e8242c",Do="rgba(232, 36, 44, 0.18)",ae="#f2b134",ze="rgba(242, 177, 52, 0.16)",Et="#9a9ca6",Lt="rgba(255, 255, 255, 0.08)";function Ae(t,e,{onPointClick:a}={}){ue&&(ue.destroy(),ue=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.pct*10)/10);return ue=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Composite progress",data:r,borderColor:qe,backgroundColor:Do,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:qe,pointHitRadius:pe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:Lt}},y:{ticks:{color:Et,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:Lt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),ue}function To(t,e,{onPointClick:a}={}){Wt&&(Wt.destroy(),Wt=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.e1rm*10)/10);return Wt=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Estimated 1RM",data:r,borderColor:ae,backgroundColor:ze,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:ae,pointHitRadius:pe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:Lt}},y:{ticks:{color:Et},grid:{color:Lt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Wt}function Mo(){Wt&&(Wt.destroy(),Wt=null)}function Je(t,e,{onPointClick:a}={}){Pt&&(Pt.destroy(),Pt=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.weight*10)/10);return Pt=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Weight",data:r,borderColor:qe,backgroundColor:Do,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:qe,pointHitRadius:pe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:Lt}},y:{ticks:{color:Et},grid:{color:Lt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Pt}function Qe(){Pt&&(Pt.destroy(),Pt=null)}function qo(t,e,{onPointClick:a}={}){Ft&&(Ft.destroy(),Ft=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.waist*10)/10);return Ft=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Waist",data:r,borderColor:ae,backgroundColor:ze,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:ae,pointHitRadius:pe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:Lt}},y:{ticks:{color:Et},grid:{color:Lt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Ft}function Ao(){Ft&&(Ft.destroy(),Ft=null)}function Ro(t,e,{onPointClick:a}={}){Ht&&(Ht.destroy(),Ht=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(Number(n.calories)));return Ht=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Calories",data:r,borderColor:ae,backgroundColor:ze,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:ae,pointHitRadius:pe}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:Et},grid:{color:Lt}},y:{beginAtZero:!0,ticks:{color:Et,callback:n=>`${n} cal`},grid:{color:Lt}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Ht}function Io(){Ht&&(Ht.destroy(),Ht=null)}function me(t,{onReorder:e,axis:a="y"}={}){let o=null,r=null,n=0,s=0,w=0,c=0,i=0,m=null,p=null,f=null,l=0,b=0,C=null,d=null;function _(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function D(h){let S=h.target.closest(".lt-drag-handle");if(!S)return;let L=S.closest("[data-reorder-item]");if(L){if(h.pointerType!=="touch"){h.preventDefault(),J(L,h.clientX,h.clientY);return}if(S.setPointerCapture)try{S.setPointerCapture(h.pointerId),C=S,d=h.pointerId}catch{}f=L,l=h.clientX,b=h.clientY,document.addEventListener("pointermove",G),document.addEventListener("pointerup",nt),p=setTimeout(()=>{clearTimeout(p),p=null;let W=f,F=l,I=b;R(),J(W,F,I)},180)}}function A(){if(C&&d!==null&&C.releasePointerCapture)try{C.releasePointerCapture(d)}catch{}C=null,d=null}function R(){clearTimeout(p),p=null,f=null,document.removeEventListener("pointermove",G),document.removeEventListener("pointerup",nt)}function G(h){if(!f)return;let S=h.clientX-l,L=h.clientY-b;Math.hypot(S,L)<=10||(R(),A())}function nt(){R(),A()}function J(h,S,L){o=h,n=S,s=L,i=L;let W=h.getBoundingClientRect();c=W.top,w=W.left,r=document.createElement(h.tagName),r.className="lt-reorder-placeholder",r.style.height=`${h.offsetHeight}px`,r.style.width=`${h.offsetWidth}px`,h.after(r),h.classList.add("lt-dragging"),h.style.position="fixed",h.style.left=`${W.left}px`,h.style.width=`${W.width}px`,h.style.top=`${c}px`,h.style.zIndex="1000",document.addEventListener("pointermove",lt),document.addEventListener("pointerup",k)}function O(){let h=_().filter(W=>W!==o),S=o.getBoundingClientRect(),L=null;if(a==="x"){let W=S.left+S.width/2,F=S.top+S.height/2;for(let I of h){let N=I.getBoundingClientRect(),Q=N.left+N.width/2,ot=N.top+N.height/2;if(Math.abs(ot-F)<N.height/2?W<Q:F<ot){L=I;break}}}else{let W=S.top+S.height/2;for(let F of h){let I=F.getBoundingClientRect(),N=I.top+I.height/2;if(W<N){L=F;break}}}L?t.insertBefore(r,L):t.appendChild(r)}function B(){let h=i,S=window.innerHeight-i;return h<80?-16*(1-h/80):S<80?16*(1-S/80):0}function yt(){if(!o){m=null;return}let h=B();if(h===0){m=null;return}window.scrollBy(0,h),O(),m=requestAnimationFrame(yt)}function ft(){m===null&&B()!==0&&(m=requestAnimationFrame(yt))}function P(){m!==null&&(cancelAnimationFrame(m),m=null)}function lt(h){if(o){if(h.preventDefault(),i=h.clientY,a==="x"){let S=h.clientX-n,L=h.clientY-s;o.style.left=`${w+S}px`,o.style.top=`${c+L}px`}else{let S=h.clientY-s;o.style.top=`${c+S}px`}O(),a==="y"&&ft()}}function k(){if(!o)return;P(),r.replaceWith(o),o.classList.remove("lt-dragging"),o.style.position="",o.style.left="",o.style.width="",o.style.top="",o.style.zIndex="",document.removeEventListener("pointermove",lt),document.removeEventListener("pointerup",k),A();let h=_().map(S=>S.dataset.reorderItem);o=null,r=null,e&&e(h)}t.addEventListener("pointerdown",D)}var Yr="joshuaegage@gmail.com";function No(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let o=!1;function r(){if(o)return;o=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(s){s.key==="Escape"&&r()}e.addEventListener("click",s=>{s.target===e&&r()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",r),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),w=encodeURIComponent("Lift Tracker feedback"),c=encodeURIComponent(s||"(no message entered)");Ga().catch(()=>{}),window.location.href=`mailto:${Yr}?subject=${w}&body=${c}`,r()})}var fe=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Re(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function jr(t,e=new Date){let a=Re(e),o=new Date(a);o.setDate(o.getDate()+7);let r=new Set;for(let n of t){let s=new Date(n.performed_at);s>=a&&s<o&&r.add($(n.performed_at))}return r.size}function Xr(t){let e=null;for(let a of fe)t>=a.days&&(e=a);return e}function Ie(t,e=new Date){let a=jr(t,e);return{days:a,tier:Xr(a)}}function Ze(t,e=null){let a=new Map;for(let r of t){let s=Re(new Date(r.performed_at)).getTime();a.has(s)||a.set(s,new Set),a.get(s).add($(r.performed_at))}let o={};for(let r of fe)o[r.key]=0;for(let r of a.values())for(let n of fe)r.size>=n.days&&(o[n.key]+=1);return o}function zr(t){let e=new Set;for(let a of t)e.add($(a.performed_at));return e.size}function Jr(t){let e=new Set;for(let a of t)e.add(Re(new Date(a.performed_at)).getTime());return e.size}function Qr(t){let e=new Set;for(let n of t)e.add(Re(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,s)=>n-s);if(a.length===0)return 0;let o=1,r=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+7),r=s.getTime()===a[n]?r+1:1,r>o&&(o=r)}return o}function Zr(t){let e=new Set;for(let n of t)e.add($(n.performed_at));let a=Array.from(e).sort().map(n=>{let[s,w,c]=n.split("-").map(Number);return new Date(s,w-1,c)});if(a.length===0)return 0;let o=1,r=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+1),r=s.getTime()===a[n].getTime()?r+1:1,r>o&&(o=r)}return o}function tn(t){let e=new Map;for(let o of t)o.lift_id&&(e.has(o.lift_id)||e.set(o.lift_id,[]),e.get(o.lift_id).push(o));let a=ee(Array.from(e.entries()).map(([o,r])=>({liftId:o,dailySeries:Dt(r)})));return a.length?Math.max(...a.map(o=>o.pct)):0}function en(t){let e=xt(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,o=0,r=0;for(let n of e){let s=n.weight-a;o=Math.max(o,s),r=Math.max(r,-s)}return{gain:o,loss:r}}function ta(t,e=null,a={}){let{bodyWeightEntries:o=[],hasSubmittedFeedback:r=!1}=a,n=en(o);return{totalDays:zr(t),totalWeeks:Jr(t),tierCounts:Ze(t,e),longestStreak:Qr(t),totalSets:t.length,longestDayStreak:Zr(t),compositeMaxPct:tn(t),bodyWeightGain:n.gain,bodyWeightLoss:n.loss,hasSubmittedFeedback:r||on(e)}}var an=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function on(t){return t!=null&&an.has(t)}var rn=50,nn=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=rn&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function oe(t,e=null,a={}){let o=ta(t,e,a);return nn.map(r=>({id:r.id,name:r.name,track:r.track,description:r.description,flavor:r.flavor??null,theme:r.theme??null,unlocked:r.isUnlocked(o)}))}function Ne(t,e){let a=new Set(e);return t.filter(o=>o.unlocked&&!a.has(o.id)).map(o=>o.id)}var re=null,he=null;function Wo(){return re||(re=document.createElement("div"),re.className="lt-toast",document.body.appendChild(re),re)}function Tt(t,{onUndo:e,onExpire:a,durationMs:o=5e3}={}){let r=Wo();clearTimeout(he),r.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,r.querySelector(".lt-toast-message").textContent=t,r.classList.add("lt-toast-visible");let n=r.querySelector(".lt-toast-undo"),s=()=>r.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(he),s(),e&&e()},{once:!0}),he=setTimeout(()=>{s(),a&&a()},o)}function Po(t,{durationMs:e=4500}={}){let a=Wo();clearTimeout(he),a.innerHTML='<span class="lt-toast-message"></span>',a.querySelector(".lt-toast-message").textContent=t,a.classList.add("lt-toast-visible"),he=setTimeout(()=>{a.classList.remove("lt-toast-visible")},e)}function Ut(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function Mt(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function We(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function Pe(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var Fo="lt-discovery-seen-",ut={weight:"weight",history:"history",composite:"composite"};function Fe(t){try{return window.localStorage.getItem(`${Fo}${t}`)==="true"}catch{return!1}}function _t(t){try{window.localStorage.setItem(`${Fo}${t}`,"true")}catch{}}var Ho="lt-weight-card-expanded",sn="1970-01-01T00:00:00.000Z";function ne(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ln(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function aa(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function Uo(t){let e=$(new Date().toISOString());return t===e?"Today":aa(t)}function ea(t){return`${Math.round(Number(t)||0)} cal`}async function Oo(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let o=await gt(),r=xt(o),n=Co(r),s=a&&o.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let w=n.change<0?"↘":n.change>0?"↗":"→",c=Ut(Ho,!1);function i(){t.classList.toggle("lt-stats-row-expanded",c),c?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${ne(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${ln(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${ne(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${w} ${ne(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${ne(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}c=!c,Mt(Ho,c),i()}),c?Je(t.querySelector("[data-home-weight-canvas]"),r):Qe()}i()}async function Bo(t,{initialTab:e="weight"}={}){_t(ut.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",j);let a=Array.from(t.querySelectorAll("[data-tab]")),o={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]'),food:t.querySelector('[data-tab-panel="food"]')},r="weight";function n(E){!o[E]||E===r||(r=E,a.forEach(y=>y.setAttribute("aria-selected",String(y.dataset.tab===r))),Object.entries(o).forEach(([y,M])=>{M.hidden=y!==r}),r==="weight"?C():r==="waist"?lt().catch(y=>console.error("[lift-tracker]",y)):Gt().catch(y=>console.error("[lift-tracker]",y)))}a.forEach(E=>{E.addEventListener("click",()=>{n(E.dataset.tab)})});let s=t.querySelector("[data-weight-form]"),w=t.querySelector("[data-weight-date-input]"),c=t.querySelector("[data-weight-input]"),i=t.querySelector("[data-weight-chart-section]"),m=t.querySelector("[data-weight-canvas]"),p=t.querySelector("[data-weight-empty]"),f=t.querySelector("[data-weight-history]");w.value=$(new Date().toISOString());let l=[];async function b(){l=await gt(),d(),C()}function C(){let E=xt(l);if(E.length===0){i.hidden=!0,p.hidden=!1,Qe();return}i.hidden=!1,p.hidden=!0,o.weight.hidden||Je(m,E)}function d(){if(l.length===0){f.innerHTML="";return}let E=l.slice().sort((y,M)=>new Date(M.logged_at)-new Date(y.logged_at));f.innerHTML=E.map(y=>`
          <li class="lt-history-row" data-entry-id="${y.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${y.id}">
              <span class="lt-history-weight">${ne(Number(y.weight))} lb</span>
              <span class="lt-history-e1rm">${aa($(y.logged_at))}</span>
            </button>
          </li>
        `).join(""),f.querySelectorAll("[data-edit-trigger]").forEach(y=>{y.addEventListener("click",()=>_(y.dataset.editTrigger))})}function _(E){let y=f.querySelector(`[data-entry-id="${E}"]`),M=l.find(H=>H.id===E);!y||!M||(y.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${M.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${$(M.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,y.querySelector("[data-edit-cancel]").addEventListener("click",d),y.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await ho(E),await b(),Tt("Weight entry deleted",{onUndo:async()=>{await go(E),await b()}}))}),y.querySelector("[data-edit-form]").addEventListener("submit",async H=>{H.preventDefault();let tt=Number(y.querySelector("[data-edit-weight]").value),et=y.querySelector("[data-edit-date]").value;if(!(tt>=0)||!et)return;let rt=new Date(M.logged_at),[V,T,X]=et.split("-").map(Number);rt.setFullYear(V,T-1,X),await fo(E,{weight:tt,logged_at:rt.toISOString()}),await b()}))}s.addEventListener("submit",async E=>{E.preventDefault();let y=Number(c.value),M=w.value;if(!(y>=0)||!Number.isFinite(y)||!M)return;let[H,tt,et]=M.split("-").map(Number),rt=new Date;rt.setFullYear(H,tt-1,et),await mo(y,rt.toISOString()),c.value="",c.focus(),w.value=$(new Date().toISOString()),await b()});let D=t.querySelector("[data-waist-form]"),A=t.querySelector("[data-waist-date-input]"),R=t.querySelector("[data-waist-input]"),G=t.querySelector("[data-waist-chart-section]"),nt=t.querySelector("[data-waist-canvas]"),J=t.querySelector("[data-waist-empty]"),O=t.querySelector("[data-waist-history]");A.value=$(new Date().toISOString());let B=[],yt=!1,ft=null;async function P(){B=await Yt(),yt=!0,h(),k()}async function lt(){if(yt){k();return}ft||(J.hidden=!1,J.textContent="Loading waist...",G.hidden=!0,ft=P().finally(()=>{ft=null})),await ft}function k(){let E=$o(B);if(E.length===0){G.hidden=!0,J.hidden=!1,J.textContent="No waist measurements yet — add your first one above.",Ao();return}G.hidden=!1,J.hidden=!0,o.waist.hidden||qo(nt,E)}function h(){if(B.length===0){O.innerHTML="";return}let E=B.slice().sort((y,M)=>new Date(M.logged_at)-new Date(y.logged_at));O.innerHTML=E.map(y=>`
          <li class="lt-history-row" data-entry-id="${y.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${y.id}">
              <span class="lt-history-weight">${ne(Number(y.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${aa($(y.logged_at))}</span>
            </button>
          </li>
        `).join(""),O.querySelectorAll("[data-edit-trigger]").forEach(y=>{y.addEventListener("click",()=>S(y.dataset.editTrigger))})}function S(E){let y=O.querySelector(`[data-entry-id="${E}"]`),M=B.find(H=>H.id===E);!y||!M||(y.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${M.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${$(M.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,y.querySelector("[data-edit-cancel]").addEventListener("click",h),y.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await bo(E),await P(),Tt("Waist measurement deleted",{onUndo:async()=>{await ko(E),await P()}}))}),y.querySelector("[data-edit-form]").addEventListener("submit",async H=>{H.preventDefault();let tt=Number(y.querySelector("[data-edit-waist]").value),et=y.querySelector("[data-edit-date]").value;if(!(tt>=0)||!et)return;let rt=new Date(M.logged_at),[V,T,X]=et.split("-").map(Number);rt.setFullYear(V,T-1,X),await wo(E,{waist_circumference:tt,logged_at:rt.toISOString()}),await P()}))}D.addEventListener("submit",async E=>{E.preventDefault();let y=Number(R.value),M=A.value;if(!(y>=0)||!Number.isFinite(y)||!M)return;let[H,tt,et]=M.split("-").map(Number),rt=new Date;rt.setFullYear(H,tt-1,et),await yo(y,rt.toISOString()),R.value="",R.focus(),A.value=$(new Date().toISOString()),await P()});let L=t.querySelector("[data-food-form]"),W=t.querySelector("[data-food-title-input]"),F=t.querySelector("[data-food-calories-input]"),I=t.querySelector("[data-food-chart-section]"),N=t.querySelector("[data-food-canvas]"),Q=t.querySelector("[data-food-chart-empty]"),ot=t.querySelector("[data-food-total]"),st=t.querySelector("[data-food-empty]"),Rt=t.querySelector("[data-food-history]"),it=[],It=!1,Jt=null,Z=$(new Date().toISOString());async function kt(){it=await jt(sn,new Date().toISOString()),It=!0,ct(),Vt()}async function Gt(){if(It){Vt();return}Jt||(st.hidden=!1,st.textContent="Loading food log...",Jt=kt().finally(()=>{Jt=null})),await Jt}function Vt(){let E=Nt(it),y=new Map(E.map(T=>[T.date,T.calories]));E.length>0&&!y.has(Z)&&(Z=E[E.length-1].date);let M=it.filter(T=>$(T.logged_at)===Z).sort((T,X)=>new Date(X.logged_at)-new Date(T.logged_at)),H=Uo(Z),tt=y.get(Z)||0;if(t.querySelector("[data-food-summary] span").textContent=H,ot.textContent=ea(tt),st.hidden=M.length>0||E.length===0,st.textContent=`No food logged for ${H.toLowerCase()}.`,E.length===0){Rt.innerHTML="",st.hidden=!1,st.textContent="No food logged yet — add your first entry above.";return}let rt=E.slice().sort((T,X)=>X.date.localeCompare(T.date)).map(T=>{let X=T.date===Z;return`
          <li class="lt-history-row lt-food-day-row${X?" lt-food-day-row-active":""}" data-food-day-row="${T.date}">
            <button type="button" class="lt-history-main" data-food-day="${T.date}" aria-expanded="${X}">
              <span class="lt-history-weight">${Uo(T.date)}</span>
              <span class="lt-history-e1rm">${ea(T.calories)}</span>
            </button>
          </li>
        `}).join(""),V=M.map(T=>`
          <li class="lt-history-row lt-food-entry-row" data-food-entry-id="${T.id}">
            <button type="button" class="lt-history-main" data-food-edit-trigger="${T.id}">
              <span class="lt-history-weight">${oa(T.title)}</span>
              <span class="lt-history-e1rm">${ea(T.calories)}</span>
            </button>
          </li>
        `).join("");Rt.innerHTML=`
      ${rt}
      <li class="lt-food-entry-heading" aria-hidden="true">${oa(H)} entries</li>
      ${V}
    `,Rt.querySelectorAll("[data-food-day]").forEach(T=>{T.addEventListener("click",()=>{Z=T.dataset.foodDay,Vt(),ct()})}),Rt.querySelectorAll("[data-food-edit-trigger]").forEach(T=>{T.addEventListener("click",()=>ht(T.dataset.foodEditTrigger))})}function ct(){let E=Nt(it);if(E.length===0){I.hidden=!0,Q.hidden=!1,Io();return}I.hidden=!1,Q.hidden=!0,o.food.hidden||Ro(N,E,{onPointClick:y=>{Z=y.date,Vt(),ct()}})}function ht(E){let y=Rt.querySelector(`[data-food-entry-id="${E}"]`),M=it.find(H=>H.id===E);!y||!M||(y.innerHTML=`
      <form class="lt-edit-set-form" data-food-edit-form>
        <label>Food <input type="text" maxlength="80" value="${cn(M.title)}" data-edit-food-title /></label>
        <label>Calories <input type="number" step="1" min="1" value="${M.calories}" data-edit-food-calories /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,y.querySelector("[data-edit-cancel]").addEventListener("click",Vt),y.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this food entry? You'll have a few seconds to undo it after.")&&(await xo(E),await kt(),Tt("Food entry deleted",{onUndo:async()=>{await Eo(E),await kt()}}))}),y.querySelector("[data-food-edit-form]").addEventListener("submit",async H=>{H.preventDefault();let tt=y.querySelector("[data-edit-food-title]").value.trim(),et=Number(y.querySelector("[data-edit-food-calories]").value);!tt||!Number.isInteger(et)||et<=0||(await So(E,{title:tt,calories:et}),await kt())}))}L.addEventListener("submit",async E=>{E.preventDefault();let y=W.value.trim(),M=Number(F.value);if(!y||!Number.isInteger(M)||M<=0)return;let H=new Date;await vo(y,M,H.toISOString()),Z=$(H.toISOString()),W.value="",F.value="",W.focus(),await kt()}),n(e),await b()}function oa(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function cn(t){return oa(t)}var Go="lt-seen-rank-achievements";function He(){let t=We(Go,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Vo(t){Pe(Go,JSON.stringify(t))}var ra="lt-active-workout";function na(){try{return window.localStorage.getItem(ra)||null}catch{return null}}function sa(t){try{t?window.localStorage.setItem(ra,t):window.localStorage.removeItem(ra)}catch{}}function Ko(t){let e=na();return e&&t.find(a=>a.id===e)||null}var dn=120,Yo="lt-default-rest-seconds",jo="lt-lift-rest-seconds-",Xo="lt-rest-timer-enabled",wt=null,ia=null,la=null,se=0,qt=null;function zo(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Jo(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function Xt(){return Ut(Xo,!1)}function Qo(t){Mt(Xo,!!t)}function da(){return zo(Yo)||dn}function Zo(t){Jo(Yo,t)}function ua(t){return zo(`${jo}${t}`)}function tr(t,e){Jo(`${jo}${t}`,e)}function Ue(t){return ua(t)||da()}function pa(){return wt||(wt=document.createElement("div"),wt.className="lt-rest-timer",wt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,wt.querySelector("[data-rest-add]").addEventListener("click",()=>{se&&(se+=30*1e3,ca())}),wt.querySelector("[data-rest-skip]").addEventListener("click",er),document.body.appendChild(wt),wt)}function un(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),o=String(e%60).padStart(2,"0");return`${a}:${o}`}function ca(){let t=pa(),e=se-Date.now();t.querySelector("[data-rest-time]").textContent=un(e),e<=0&&mn()}function ma(){clearInterval(ia),clearTimeout(la),ia=null,la=null}function pn(){try{ge(),qt.state==="suspended"&&qt.resume();let t=qt.currentTime,e=qt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(qt.destination),[523.25,659.25].forEach((a,o)=>{let r=qt.createOscillator();r.type="sine",r.frequency.setValueAtTime(a,t+o*.12),r.connect(e),r.start(t+o*.12),r.stop(t+.75)})}catch{}}function ge(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;qt||=new t,qt.state==="suspended"&&qt.resume()}catch{}}function mn(){ma(),se=0;let t=pa();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",pn(),navigator.vibrate&&navigator.vibrate([120,70,120]),la=setTimeout(er,12e3)}function er(){ma(),se=0,wt&&wt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function Oe({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let o=pa();ma(),se=Date.now()+a*1e3,o.classList.remove("lt-rest-timer-done"),o.classList.add("lt-rest-timer-visible"),o.querySelector(".lt-rest-timer-label").textContent="Rest",o.querySelector("[data-rest-lift]").textContent=e,ca(),ia=setInterval(ca,250)}var ga=[{id:"lift_set",label:"Lift set"},{id:"weekly_workout_days",label:"Weekly workout days"},{id:"weekly_workout_volume",label:"Weekly workout volume"},{id:"workout_session_volume",label:"Workout session volume"}],fn=[.8,.9,.95];function ye(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function hn(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o)}function gn(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate());return e.setDate(e.getDate()-e.getDay()),$(e.toISOString())}function ar(t,e=new Date){let a=hn(gn(e)),o=new Date(a);o.setDate(o.getDate()+7);let r=new Date(t);return r>=a&&r<o}function ie(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function we(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function pt(t){return`${Math.round(ie(t)*100)}%`}function or(t,e){let a=new Set(e?.liftIds||[]),o=new Map;for(let r of t){if(!a.has(r.lift_id))continue;let n=$(r.performed_at);o.set(n,(o.get(n)||0)+Number(r.weight)*Number(r.reps))}return o}function yn(t,e){let a=e.liftsById||new Map,o=e.workoutsById||new Map,r=e.activeSets||[],n=e.workoutHistorySets||r,s=t.lift_id?a.get(t.lift_id):null,w=t.workout_id?o.get(t.workout_id):null;if(t.type==="lift_set"){let c=r.filter(_=>_.lift_id===t.lift_id),i=Number(t.target_weight),m=Number(t.target_reps),p=z(i,m),f=null,l=0,b=null;for(let _ of c){let D=Number(_.weight),A=Number(_.reps),R=z(D,A);R>l&&(l=R,f=_),D>=i&&A>=m&&(b=_)}let C=!!b,d=C?1:ie(l/p);return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:s?.name||"Lift goal",progress:d,achieved:C,currentLabel:f?`Best: ${we(f.weight)} x ${f.reps}`:"No sets yet",targetLabel:`Goal: ${we(i)} x ${m}`,detail:b?`Hit with ${we(b.weight)} x ${b.reps}.`:`${pt(d)} there.`}}if(t.type==="weekly_workout_days"){let c=new Set;for(let l of n)ar(l.performed_at)&&c.add($(l.performed_at));let i=Number(t.target_value),m=c.size,p=m>=i,f=i>0?ie(m/i):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"This week",progress:f,achieved:p,currentLabel:`${m} / ${we(i)} days`,targetLabel:m+1===i?"One more workout gets it.":`Goal: ${we(i)} days`,detail:p?"Weekly goal hit.":`${pt(f)} there.`}}if(t.type==="weekly_workout_volume"){let c=or(r.filter(l=>ar(l.performed_at)),w),i=Array.from(c.values()).reduce((l,b)=>l+b,0),m=Number(t.target_value),p=i>=m,f=m>0?ie(i/m):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:w?.name||"Workout volume",progress:f,achieved:p,currentLabel:`${Math.round(i)} / ${Math.round(m)} ${t.unit||"lb"}`,targetLabel:"This week",detail:p?"Weekly volume goal hit.":`${pt(f)} there.`}}if(t.type==="workout_session_volume"){let c=or(r,w),i=Math.max(0,...Array.from(c.values())),m=Number(t.target_value),p=i>=m,f=m>0?ie(i/m):0;return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:w?.name||"Workout session",progress:f,achieved:p,currentLabel:`Best: ${Math.round(i)} ${t.unit||"lb"}`,targetLabel:`Goal: ${Math.round(m)} ${t.unit||"lb"}`,detail:p?"Session volume goal hit.":`${pt(f)} there.`}}return{goal:t,kind:"goal",key:`goal:${t.id}`,title:t.title,subtitle:"Unsupported goal",progress:0,achieved:!1,currentLabel:"",targetLabel:"",detail:""}}function nr(t,e){return t.filter(a=>a.deleted_at==null).map(a=>yn(a,e))}var wn={"rank-private":t=>q(t.totalDays,1,"workout day"),"rank-pfc":t=>q(t.totalDays,2,"workout days"),"rank-corporal":t=>q(t.totalDays,3,"workout days"),"rank-sergeant":t=>q(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>q(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>q(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>q(t.totalDays,11,"workout days"),"rank-lieutenant":t=>q(t.totalDays,13,"workout days"),"rank-captain":t=>q(t.totalDays,15,"workout days"),"rank-major":t=>q(t.totalDays,18,"workout days"),"rank-colonel":t=>q(t.totalDays,22,"workout days"),"rank-general":t=>q(t.totalDays,27,"workout days"),"rank-prestige":t=>q(t.totalDays,33,"workout days"),"rank-prestige-master":t=>q(t.totalDays,40,"workout days"),"mastery-uav-1":t=>q(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>q(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>q(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>q(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>q(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>q(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>q(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>q(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>q(t.longestStreak,2,"weeks"),"streak-3":t=>q(t.longestStreak,3,"weeks"),"streak-4":t=>q(t.longestStreak,4,"weeks"),"streak-5":t=>q(t.longestStreak,5,"weeks"),"streak-6":t=>q(t.longestStreak,6,"weeks"),"streak-8":t=>q(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>fa([q(t.totalDays,27,"workout days"),q(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>fa([q(t.longestStreak,8,"week streak"),q(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>fa([q(t.totalDays,40,"workout days"),q(t.tierCounts.chopper,3,"Choppers")])};function q(t,e,a){let o=Number(t)||0,r=Number(e)||1;return{current:o,target:r,progress:ie(o/r),currentLabel:`${o} / ${r} ${a}`}}function fa(t){return{...t.slice().sort((a,o)=>a.progress-o.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" · ")}}function sr(t,e=null,a={}){let o=ta(t,e,a);return oe(t,e,a).filter(n=>n.track!=="secret").map(n=>{let s=wn[n.id],w=s?s(o):{progress:n.unlocked?1:0,currentLabel:n.description};return{kind:"achievement",key:`achievement:${n.id}`,sourceKey:n.id,title:n.name,subtitle:n.track,progress:n.unlocked?1:w.progress,achieved:n.unlocked,currentLabel:w.currentLabel,targetLabel:n.description,detail:n.unlocked?"Achievement unlocked.":`${pt(w.progress)} there.`}})}function ir({goalEvaluations:t=[],achievementItems:e=[],events:a=[]}={}){let o=a.slice().sort((n,s)=>new Date(s.created_at)-new Date(n.created_at))[0]||null,r=[...t,...e].filter(n=>!n.achieved&&n.progress>=.6).sort((n,s)=>s.progress-n.progress).slice(0,5);return{latest:o,closest:r}}function lr(t,e=[]){let a=new Set(e.map(r=>ha(r))),o=[];for(let r of t)if(r.kind==="goal"){for(let n of fn)if(r.progress>=n&&!r.achieved){let s={goal_id:r.goal.id,source_type:"goal",source_key:`goal:${r.goal.id}`,event_type:"close",threshold:n,title:r.title,message:`${r.title} is ${pt(r.progress)} there.`,metadata:{progress:r.progress}};a.has(ha(s))||o.push(s)}if(r.achieved){let n={goal_id:r.goal.id,source_type:"goal",source_key:`goal:${r.goal.id}`,event_type:"achieved",threshold:1,title:r.title,message:`Goal hit: ${r.title}.`,metadata:{progress:1}};a.has(ha(n))||o.push(n)}}return o}function ha(t){return t.goal_id?`goal:${t.goal_id}:${t.event_type}:${Number(t.threshold)||0}`:`achievement:${t.source_key}:${t.event_type}`}function Be(t){return String(t||"").trim().toLowerCase()}function bn(t){let e=String(t||"").trim();return e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1):e}function rr(t){let e=bn(t);return/^-?\d+(\.\d+)?$/.test(e)?Number(e):e==="true"?!0:e==="false"?!1:e}function cr(t,{lifts:e=[],workouts:a=[]}={}){let o=[],r=null;for(let i of String(t||"").split(/\r?\n/)){let m=i.trim();if(!m||m.startsWith("#")||m==="goals:"||m.startsWith("goal_format:"))continue;if(m.startsWith("- ")){r&&o.push(r),r={};let f=m.slice(2).trim();if(f){let l=f.match(/^([^:]+):\s*(.*)$/);l&&(r[l[1].trim()]=rr(l[2]))}continue}let p=m.match(/^([^:]+):\s*(.*)$/);p&&r&&(r[p[1].trim()]=rr(p[2]))}r&&o.push(r);let n=new Map(e.map(i=>[Be(i.name),i])),s=new Map(a.map(i=>[Be(i.name),i])),w=[],c=[];return o.forEach((i,m)=>{let p=m+1,f=String(i.type||"").trim(),l={title:String(i.title||"").trim(),type:f,unit:String(i.unit||"lb").trim()||"lb",timeframe_weeks:ye(i.timeframe_weeks),recurring:i.recurring===!0?"weekly":i.recurring||"none",metadata:{imported:!0}};if(l.title||c.push(`Goal ${p}: missing title.`),ga.some(b=>b.id===f)||c.push(`Goal ${p}: unsupported type "${f}".`),f==="lift_set"){let b=n.get(Be(i.lift));b||c.push(`Goal ${p}: could not find lift "${i.lift||""}".`),l.lift_id=b?.id,l.target_weight=ye(i.weight),l.target_reps=ye(i.reps),l.target_weight==null&&c.push(`Goal ${p}: missing weight.`),l.target_reps==null&&c.push(`Goal ${p}: missing reps.`)}if(f==="weekly_workout_days"&&(l.target_value=ye(i.target),l.recurring="weekly",l.target_value==null&&c.push(`Goal ${p}: missing target.`)),f==="weekly_workout_volume"||f==="workout_session_volume"){let b=s.get(Be(i.workout));b||c.push(`Goal ${p}: could not find workout "${i.workout||""}".`),l.workout_id=b?.id,l.target_value=ye(i.target),f==="weekly_workout_volume"&&(l.recurring="weekly"),l.target_value==null&&c.push(`Goal ${p}: missing target.`)}w.push(l)}),{goals:c.length?[]:w,errors:c,rawGoals:o}}async function Ot(){let[t,e,a,o,r,n,s,w]=await Promise.all([dt(),te(),$e(),to(),no(),gt(),_e(),Ce()]),c=t.length?await $t(t.map(i=>i.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:c,goals:o,events:r,bodyWeightEntries:n,userId:s,feedbackGiven:w,liftsById:new Map(t.map(i=>[i.id,i])),workoutsById:new Map(e.map(i=>[i.id,i]))}}function At(t){let e=nr(t.goals,t),a=sr(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),o=ir({goalEvaluations:e,achievementItems:a,events:t.events});return{goalEvaluations:e,achievementItems:a,momentum:o}}async function zt({showToasts:t=!1}={}){let e=await Ot(),a=At(e),o=lr([...a.goalEvaluations,...a.achievementItems],e.events),r=await so(o);if(await Promise.all(a.goalEvaluations.filter(n=>n.achieved&&n.goal.status==="active"&&n.goal.recurring!=="weekly").map(n=>oo(n.goal.id,{status:"achieved",achieved_at:new Date().toISOString()}))),t&&r.length>0){let n=r.find(c=>c.event_type==="achieved"),s=r.find(c=>c.event_type==="close"),w=n||s;w&&Po(w.message||w.title)}return{context:e,...a,createdEvents:r}}var dr=[{key:"bench-press",name:"Bench Press",aliases:["bench","barbell bench press","bench press warmup","bench press 2","bench press 3"],equipment:["barbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep shoulder blades set.","Touch the same point on the chest each rep.","Drive the bar up and slightly back."]},{key:"bicep-curl",name:"Bicep Curl",aliases:["bicep curls","curl"],equipment:["dumbbell","barbell","cable"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep elbows close to your sides.","Avoid swinging the torso.","Control the lower."]},{key:"calf-raise",name:"Calf Raise",aliases:["calf raises","standing calf raise"],equipment:["bodyweight","machine","dumbbell"],primaryMuscles:["calves"],secondaryMuscles:[],movementPatterns:["ankle extension"],tutorialUrl:"",cues:["Pause briefly at the top.","Use a full stretch at the bottom.","Keep reps controlled."]},{key:"dumbbell-chest-press",name:"Dumbbell Chest Press",aliases:["dumbell chest press","db chest press","dumbbell bench press","db bench press"],equipment:["dumbbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep wrists stacked over elbows.","Lower with control.","Press up without letting shoulders roll forward."]},{key:"dumbbell-curl",name:"Dumbbell Curl",aliases:["dumbell curl","db curl"],equipment:["dumbbell"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep upper arms still.","Rotate naturally through the curl if comfortable.","Avoid using momentum."]},{key:"dumbbell-lateral-raise",name:"Dumbbell Lateral Raise",aliases:["dumbell lateral raise","lateral raise","db lateral raise"],equipment:["dumbbell"],primaryMuscles:["side delts"],secondaryMuscles:["traps"],movementPatterns:["shoulder abduction"],tutorialUrl:"",cues:["Lead with elbows.","Stop around shoulder height.","Use light enough weight to stay smooth."]},{key:"dumbbell-row",name:"Dumbbell Row",aliases:["dumbell row","db row","one arm dumbbell row","one-arm dumbbell row"],equipment:["dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbow toward the hip.","Keep the torso steady.","Reach long at the bottom without losing control."]},{key:"dumbbell-shoulder-press",name:"Dumbbell Shoulder Press",aliases:["dumbell shoulder press","db shoulder press","dumbbell overhead press"],equipment:["dumbbell"],primaryMuscles:["shoulders","front delts"],secondaryMuscles:["triceps","upper chest"],movementPatterns:["push","vertical press"],tutorialUrl:"",cues:["Keep ribs down.","Press slightly back over the shoulders.","Control the bottom position."]},{key:"forearm-twist",name:"Forearm Twist",aliases:["forearm twists","wrist twist","pronation supination"],equipment:["dumbbell"],primaryMuscles:["forearms"],secondaryMuscles:["grip"],movementPatterns:["forearm rotation"],tutorialUrl:"",cues:["Move slowly through rotation.","Keep the elbow supported if needed.","Use a light load."]},{key:"hammer-curl",name:"Hammer Curl",aliases:["hammer curls"],equipment:["dumbbell"],primaryMuscles:["biceps","brachialis"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep palms facing each other.","Control the lower.","Avoid shoulder swing."]},{key:"hip-thrust",name:"Hip Thrust",aliases:["hip thrusts","barbell hip thrust"],equipment:["barbell","bench"],primaryMuscles:["glutes"],secondaryMuscles:["hamstrings","quads"],movementPatterns:["hinge","hip extension"],tutorialUrl:"",cues:["Tuck ribs down.","Drive through the heels.","Pause with hips fully extended."]},{key:"lunge",name:"Lunge",aliases:["lunges","db lunge","dumbbell lunge"],equipment:["bodyweight","dumbbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","calves"],movementPatterns:["squat","single-leg"],tutorialUrl:"",cues:["Step far enough to stay balanced.","Keep front knee tracking over toes.","Control the descent."]},{key:"overhead-tricep-extension",name:"Overhead Tricep Extension",aliases:["overhead tricep extensions","tricep extension","overhead triceps extension"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep elbows pointed forward.","Lower behind the head with control.","Extend without flaring hard."]},{key:"rear-delt-fly",name:"Rear Delt Fly",aliases:["rear delt fly","rear delt raise","reverse fly"],equipment:["dumbbell","machine","cable"],primaryMuscles:["rear delts"],secondaryMuscles:["upper back","traps"],movementPatterns:["pull","shoulder horizontal abduction"],tutorialUrl:"",cues:["Keep a slight elbow bend.","Move from the shoulders.","Avoid shrugging through the rep."]},{key:"row",name:"Row",aliases:["rows","cable row","machine row","seated row"],equipment:["cable","machine","barbell","dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbows back.","Keep chest tall.","Control the reach forward."]},{key:"shrug",name:"Shrug",aliases:["shrugs","dumbbell shrug","barbell shrug"],equipment:["dumbbell","barbell"],primaryMuscles:["traps"],secondaryMuscles:["forearms"],movementPatterns:["scapular elevation"],tutorialUrl:"",cues:["Lift shoulders straight up.","Pause briefly at the top.","Avoid rolling the shoulders."]},{key:"squat",name:"Squat",aliases:["barbell squat","squat warmup","squat 2","squat 3"],equipment:["barbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","core"],movementPatterns:["squat"],tutorialUrl:"",cues:["Brace before descending.","Keep knees tracking over toes.","Drive through the whole foot."]},{key:"tricep-curl",name:"Tricep Curl",aliases:["tricep curls","triceps curl"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep upper arms steady.","Fully extend with control.","Avoid using shoulder momentum."]},{key:"weighted-sit-up",name:"Weighted Sit-Up",aliases:["weighted sit ups","weighted sit ups 2","weighted situp","weighted sit-up"],equipment:["plate","dumbbell"],primaryMuscles:["abs"],secondaryMuscles:["hip flexors"],movementPatterns:["trunk flexion"],tutorialUrl:"",cues:["Keep the weight secure.","Curl the torso up under control.","Avoid yanking with the neck."]}];function Ge(t){return String(t||"").toLowerCase().replace(/dumbell/g,"dumbbell").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ")}function ur(t){return[t.name,t.key,...t.aliases||[]]}function kn(t,e){let a=Ge(e);if(a.length<2)return null;let o=null;for(let r of ur(t)){let n=Ge(r),s=null;n===a?s=0:n.startsWith(a)?s=1:n.includes(a)?s=2:a.split(" ").every(c=>n.includes(c))&&(s=3),s!=null&&(o==null||s<o)&&(o=s)}return o}function pr(t,{limit:e=5}={}){return dr.map(a=>({entry:a,score:kn(a,t)})).filter(a=>a.score!=null).sort((a,o)=>a.score-o.score||a.entry.name.localeCompare(o.entry.name)).slice(0,e).map(a=>a.entry)}function be(t){let e=String(t||"").trim();if(!e)return null;let a=Ge(e);return dr.find(o=>o.key===e||o.key===a.replace(/\s+/g,"-")||ur(o).some(r=>Ge(r)===a))||null}var mr="lt-composite-expanded",ya="lt-header-menu-open",fr="lt-momentum-expanded";async function hr(t){let{data:{session:e}}=await v.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
  `;let o=t.querySelector("[data-hamburger-btn]"),r=t.querySelector("[data-header-actions]"),n=240,s=null;function w(u=!0){s&&(clearTimeout(s),s=null),r.classList.remove("lt-header-actions-open"),o.setAttribute("aria-expanded","false"),u&&Mt(ya,!1),s=setTimeout(()=>{r.hidden=!0,s=null},n)}function c({persist:u=!0,instant:g=!1}={}){s&&(clearTimeout(s),s=null),r.hidden=!1,g?r.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>r.classList.add("lt-header-actions-open")),o.setAttribute("aria-expanded","true"),u&&Mt(ya,!0)}o.addEventListener("click",()=>{r.hidden?c():w()}),r.addEventListener("click",u=>{u.target.closest("button")&&w()}),Ut(ya,!1)&&c({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",Ee),t.querySelector("[data-calories-btn]").addEventListener("click",Ha);let p=t.querySelector("[data-feedback-btn]");p&&p.addEventListener("click",()=>No()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>v.auth.signOut());let l=t.querySelector("[data-composite-section]"),b=t.querySelector("[data-composite-toggle]"),C=t.querySelector("[data-composite-body]"),d=t.querySelector("[data-chevron]"),_=t.querySelector("[data-composite-summary]"),D=t.querySelector("[data-composite-discovery]"),A=t.querySelector("[data-momentum-toggle]"),R=t.querySelector("[data-momentum-body]"),G=t.querySelector("[data-momentum-summary]"),nt=t.querySelector("[data-momentum-chevron]");function J(u){b.setAttribute("aria-expanded",String(u)),C.hidden=!u,d.innerHTML=u?"&#9650;":"&#9660;",l.classList.toggle("lt-stats-row-expanded",u)}J(Ut(mr,!0)),b.addEventListener("click",()=>{if(_t(ut.composite),D.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ua();return}let u=b.getAttribute("aria-expanded")==="true";J(!u),Mt(mr,!u)});function O(u){A.setAttribute("aria-expanded",String(u)),R.hidden=!u,nt.innerHTML=u?"&#9650;":"&#9660;"}O(Ut(fr,!1)),A.addEventListener("click",()=>{let u=A.getAttribute("aria-expanded")==="true";O(!u),Mt(fr,!u)});let B=t.querySelector("[data-killstreak-icon]"),yt=t.querySelector("[data-killstreak-label]"),ft=t.querySelector("[data-killstreak-sub]"),P=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Ba);function lt(u){let{days:g,tier:x}=Ie(u);B.textContent=x?x.icon:"🎯",yt.textContent=x?`${x.label} Killstreak`:"No Killstreak",ft.textContent=`${g} Day streak`;let K=oe(u).filter(Y=>Y.track==="rank"),U=Ne(K,He()).length>0;P.hidden=!U}let k=t.querySelector("[data-weight-card]");function h(){_t(ut.weight),Fa()}function S(u){Oo(k,{onExpand:h,...u}).catch(g=>{console.error("[lift-tracker]",g),k.classList.remove("lt-stats-row-expanded"),k.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,k.querySelector("[data-weight-expand]").addEventListener("click",h)})}let L=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{_t(ut.history),L.hidden=!0,Oa()});let W=t.querySelector("[data-add-lift-form]"),F=W.querySelector('input[name="name"]'),I=t.querySelector("[data-lift-suggestions]"),N=t.querySelector("[data-add-lift-toggle]"),Q=t.querySelector("[data-add-lift-discovery]"),ot=t.querySelector("[data-add-lift-hint]"),st=t.querySelector("[data-create-workout-btn]"),Rt=t.querySelector("[data-create-workout-discovery]"),it=null;function It(){I.hidden=!0,I.innerHTML=""}function Jt(u){it=null;let g=pr(u,{limit:4});if(g.length===0){It();return}I.hidden=!1,I.innerHTML=g.map(x=>`
      <button type="button" data-lift-suggestion="${Se(x.key)}">
        <span>${Kt(x.name)}</span>
        <small>${Kt([...x.primaryMuscles,...x.equipment||[]].slice(0,3).join(" · "))}</small>
      </button>
    `).join("")}F.addEventListener("input",()=>{let u=F.value.trim();if(u.length<2){it=null,It();return}Jt(u)}),I.addEventListener("click",u=>{let g=u.target.closest("[data-lift-suggestion]");if(!g)return;let x=be(g.dataset.liftSuggestion);x&&(it=x,F.value=x.name,It(),F.focus())}),N.addEventListener("click",()=>{let u=W.hidden;W.hidden=!u,N.setAttribute("aria-pressed",String(u)),N.classList.toggle("lt-add-lift-toggle-active",u),u?F.focus():(it=null,It())});let Z=t.querySelector("[data-lift-list]"),kt=t.querySelector("[data-list-empty]");st.addEventListener("click",()=>{st.disabled||Wa()});let Gt=t.querySelector("[data-workout-pills]"),Vt=t.querySelector("[data-workout-empty-hint]"),ct=[],ht=na();function E(){return ht&&ct.find(u=>u.id===ht)||null}function y(){let u=E();if(!u)return V;let g=new Set(u.liftIds);return V.filter(x=>g.has(x.id))}function M(){Gt.innerHTML=ct.map(u=>{let g=u.id===ht;return`
          <div class="lt-workout-pill-wrap${g?" lt-workout-pill-wrap-active":""}" data-reorder-item="${u.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${u.id}" aria-pressed="${g}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${u.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let u of ct){let g=Gt.querySelector(`[data-workout-pill="${u.id}"] [data-workout-pill-name]`);g&&(g.textContent=u.name)}Gt.querySelectorAll("[data-workout-pill]").forEach(u=>{u.addEventListener("click",()=>{let g=u.dataset.workoutPill;ht=ht===g?null:g,sa(ht),M(),Xe(le),_a(le)})}),Gt.querySelectorAll("[data-workout-edit]").forEach(u=>{u.addEventListener("click",g=>{g.stopPropagation(),Pa(u.dataset.workoutEdit)})})}let H="lt-fast-mode",tt="lt-burst-mode";function et(){try{let u=window.localStorage.getItem(H);if(u!==null)return u==="true";let g=window.localStorage.getItem(tt);return g!==null?(window.localStorage.setItem(H,g),window.localStorage.removeItem(tt),g==="true"):!1}catch{return!1}}function rt(u){try{window.localStorage.setItem(H,String(u))}catch{}}let V=[],T=et(),X=new Map,le=[],ve=t.querySelector("[data-mode-toggle]");function Ea(){ve.textContent=T?"Normal":"Fast",ve.setAttribute("aria-pressed",String(T)),ve.classList.toggle("lt-mode-toggle-active",T)}Ea(),ve.addEventListener("click",()=>{T=!T,rt(T),Ea(),Xe(le)}),W.addEventListener("submit",async u=>{u.preventDefault();let g=W.querySelector('input[name="name"]'),x=g.value.trim();if(!x)return;let K=it&&it.name===x?it:be(x);g.value="",it=null,It(),g.disabled=!0;try{await Zt(x,V.length,{dictionary_key:K?.key||null}),await La()}finally{g.disabled=!1,g.focus()}}),me(Z,{onReorder:async u=>{let g=[...u],x=new Set(u),K=V.map(U=>x.has(U.id)?g.shift():U.id);await Ya(K),V=K.map(U=>V.find(Y=>Y.id===U)).filter(Boolean)}}),me(Gt,{axis:"x",onReorder:async u=>{await io(u),ct=u.map(g=>ct.find(x=>x.id===g)).filter(Boolean)}});async function La(){let u=await Ot();ct=u.workouts,ht&&!ct.some(Y=>Y.id===ht)&&(ht=null,sa(null)),M(),V=u.lifts;let g=V.length>=2;if(Q.hidden=V.length>=2,ot.hidden=V.length!==1,st.disabled=!g,st.setAttribute("aria-disabled",String(!g)),Rt.hidden=!g||ct.length>0,Vt.hidden=!g||ct.length>0,V.length===0){Z.innerHTML="",kt.hidden=!1,kt.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",ot.hidden=!0,l.hidden=!0,lt(u.workoutHistorySets),Ca(At(u).momentum),S({showDiscovery:!1}),L.hidden=!0,D.hidden=!0,X=new Map,le=[];return}let x=u.activeSets,K=x.length>0;lt(u.workoutHistorySets),Ca(At(u).momentum),S({showDiscovery:K&&!Fe(ut.weight)}),L.hidden=!K||Fe(ut.history),X=new Map(V.map(Y=>[Y.id,[]]));for(let Y of x){let Ct=X.get(Y.lift_id);Ct&&Ct.push(Y)}let U=V.map(Y=>({liftId:Y.id,dailySeries:Dt(X.get(Y.id)||[])}));Xe(U),_a(U)}function _a(u){let g=E(),x=g?u.filter(xe=>g.liftIds.includes(xe.liftId)):u,K=ee(x);l.hidden=!1;let U=t.querySelector("[data-composite-canvas]"),Y=t.querySelector("[data-composite-empty]"),Ct=t.querySelector("[data-composite-scope]"),Qt=t.querySelector("[data-composite-blurb]");if(Ct.textContent=g?`Measuring ${g.name}`:"Measuring all lifts",Qt.textContent=g?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",Y.textContent=g?`Log a few sets for lifts in ${g.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",K.length===0){U.hidden=!0,Y.hidden=!1,_.textContent="",D.hidden=!0;return}U.hidden=!1,Y.hidden=!0,_.textContent=Lo(K[K.length-1].pct),D.hidden=Fe(ut.composite),Ae(U,K)}function je(u){let g=Dt(X.get(u)||[]),x=g[g.length-1];return x?`${Math.round(x.e1rm)} lb e1RM`:"No sets yet"}function Pr(u){let g=X.get(u)||[];return g.length===0?"":g[g.length-1].weight}function Xe(u){le=u;let g=y();kt.hidden=g.length>0,kt.textContent=ht?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",Z.innerHTML=g.map(x=>T?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${x.id}" data-lift-id="${x.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${x.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${je(x.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${Se(x.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${x.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${Pr(x.id)}" data-fast-weight />
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
                <span class="lt-lift-last">${je(x.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${Se(x.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let x of V){let U=Z.querySelector(`[data-lift-id="${x.id}"]`)?.querySelector("[data-name-slot]");U&&(U.textContent=x.name)}Z.querySelectorAll("[data-open-lift]").forEach(x=>{x.addEventListener("click",()=>Na(x.dataset.openLift))}),T&&Fr()}function Fr(){Z.querySelectorAll("[data-fast-log-form]").forEach(u=>{let g=u.dataset.fastLogForm;u.addEventListener("submit",async x=>{x.preventDefault();let K=u.querySelector("[data-fast-weight]"),U=u.querySelector("[data-fast-reps]"),Y=u.querySelector("[data-fast-feedback]"),Ct=Number(K.value),Qt=Number(U.value);if(!(Ct>=0)||!Number.isFinite(Ct)||!(Qt>0)||!Number.isInteger(Qt))return;let xe=X.get(g)||[],Hr=z(Ct,Qt),$a=Me(Hr,xe),Da=new Date().toISOString();Xt()&&ge();let Ur=await vt(g,Ct,Qt,Da),Or=V.find(ce=>ce.id===g);Xt()&&Oe({seconds:Ue(g),liftName:Or?.name||""});let Ta=[...xe,Ur];X.set(g,Ta),U.value="",U.focus();let Ma=Z.querySelector(`[data-lift-id="${g}"]`)?.querySelector("[data-last-slot]");Ma&&(Ma.textContent=je(g));let Br=$(Da),qa=St(Ta.filter(ce=>$(ce.performed_at)===Br));Y.hidden=!1,Y.classList.toggle("lt-pr",$a),Y.textContent=$a?`PR! ${Math.round(qa)} lb today`:`Logged · ${Math.round(qa)} lb today`,zt({showToasts:!0}).catch(ce=>console.error("[lift-tracker]",ce))})})}function Ca(u){let g=u.latest,x=u.closest||[],K=x[0];G.textContent=g?`Latest: ${g.title}`:K?`Closest: ${K.title} · ${pt(K.progress)}`:"No goals yet",R.innerHTML=`
      <div class="lt-momentum-grid">
        <section>
          <h3>Recently Achieved</h3>
          ${g?`
            <article class="lt-momentum-item lt-momentum-item-achieved">
              <span>${Kt(g.title)}</span>
              <small>${Kt(g.message||"Recently achieved.")}</small>
            </article>
          `:'<p class="lt-empty">New goal and achievement wins will show here.</p>'}
        </section>
        <section>
          <h3>Closest</h3>
          ${x.length?x.map(U=>`
            <article class="lt-momentum-item">
              <span>${Kt(U.title)}</span>
              <small>${Kt(U.currentLabel)} · ${Kt(U.detail)}</small>
              <span class="lt-goal-progress"><span style="width: ${Math.round(U.progress*100)}%"></span></span>
            </article>
          `).join(""):'<p class="lt-empty">Set goals or keep logging to surface close achievements.</p>'}
        </section>
      </div>
      <button type="button" class="lt-goal-secondary-btn" data-open-goals>View goals</button>
    `,R.querySelector("[data-open-goals]").addEventListener("click",de)}function Se(u){return String(u).replace(/[&<>"']/g,g=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[g])}function Kt(u){return Se(u)}await La()}var vn=2.5;function Ve(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function Sn(t){return Math.round(Number(t)*2)/2}function xn(t){return t.slice().sort((e,a)=>new Date(e.performed_at)-new Date(a.performed_at))}function En(t){return t.reduce((e,a)=>{if(!e)return a;let o=z(Number(e.weight),Number(e.reps));return z(Number(a.weight),Number(a.reps))>o?a:e},null)}function Ln(t){let e=new Map;for(let a of xn(t)){let o=$(a.performed_at);e.has(o)||e.set(o,[]),e.get(o).push(a)}return Array.from(e.entries()).sort((a,o)=>a[0].localeCompare(o[0]))}function gr(t,{weightStep:e=vn}={}){let a=Ln(t||[]),o=a[a.length-1];if(!o)return{baseline:null,context:null,options:[]};let[r,n]=o,s=a[a.length-2]||null,w=En(n),c=Number(w.weight),i=Number(w.reps),m=Sn(c+e),p=Math.max(1,i-2),f={date:r,latestVolume:St(n),previousVolume:s?St(s[1]):null,sessionSetCount:n.length};return{baseline:{weight:c,reps:i,e1rm:z(c,i),label:`${Ve(c)} lb x ${i}`,date:r},context:f,options:[{id:"reps",label:"Add reps",title:`${Ve(c)} lb x ${i+1}`,description:"Same weight, one more rep.",weight:c,reps:i+1},{id:"weight",label:"Add weight",title:`${Ve(m)} lb x ${p}`,description:"A heavier set with a small rep drop.",weight:m,reps:p},{id:"volume",label:"Add volume",title:`Extra set: ${Ve(c)} lb x ${i}`,description:"Repeat your best recent set to raise session volume.",weight:c,reps:i}]}}async function yr(t,e){let a=await Va(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",j);let o=t.querySelector("[data-name-input]");o.value=a.name;let r=a.name;o.addEventListener("keydown",k=>{k.key==="Enter"&&o.blur()}),o.addEventListener("blur",async()=>{let k=o.value.trim();if(!k||k===r){o.value=r;return}r=k,await Ka(e,k)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${r}"? You'll have a few seconds to undo it after.`)&&(await ja(e),j(),Tt(`Deleted "${r}"`,{onUndo:async()=>{await Xa(e),Le()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(k=>{k.addEventListener("click",()=>{n.forEach(h=>h.setAttribute("aria-selected",String(h===k))),Object.entries(s).forEach(([h,S])=>{S.hidden=h!==k.dataset.tab}),k.dataset.tab==="details"&&P()})});let w=t.querySelector("[data-log-form]"),c=t.querySelector("[data-weight-input]"),i=t.querySelector("[data-reps-input]"),m=t.querySelector("[data-log-feedback]"),p=t.querySelector("[data-default-rest-input]"),f=t.querySelector("[data-lift-rest-input]"),l=t.querySelector("[data-rest-enabled-input]"),b=t.querySelector("[data-rest-enabled-label]"),C=t.querySelector("[data-default-rest-field]"),d=t.querySelector("[data-lift-rest-field]"),_=t.querySelector("[data-lift-goals]"),D=[];function A(){p.value=da(),f.value=ua(e)||"";let k=Xt();l.checked=k,b.textContent=k?"Rest timer: On":"Rest timer: Off",p.disabled=!k,f.disabled=!k,C.classList.toggle("lt-rest-setting-field-disabled",!k),d.classList.toggle("lt-rest-setting-field-disabled",!k)}function R(k){let h=Number(k.value);return k.value===""?null:!Number.isFinite(h)||h<15?15:h>600?600:Math.round(h)}p.addEventListener("change",()=>{let k=R(p)||120;Zo(k),A()}),f.addEventListener("change",()=>{let k=R(f);tr(e,k),A()}),l.addEventListener("change",()=>{Qo(l.checked),A()});async function G(){D=await za(e)}function nt(){if(D.length===0)return;let k=D[D.length-1];c.value=k.weight}w.addEventListener("submit",async k=>{k.preventDefault();let h=Number(c.value),S=Number(i.value);if(!(h>=0)||!Number.isFinite(h)||!(S>0)||!Number.isInteger(S))return;let L=z(h,S),F=Me(L,D),I=new Date;Xt()&&ge(),await vt(e,h,S,I.toISOString()),Xt()&&Oe({seconds:Ue(e),liftName:r}),i.value="",i.focus(),await G(),B(),s.details.hidden||P(),lt().catch(ot=>console.error("[lift-tracker]",ot));let N=$(I.toISOString()),Q=St(D.filter(ot=>$(ot.performed_at)===N));m.hidden=!1,m.classList.toggle("lt-pr",F),m.textContent=F?`New PR! Today's volume: ${Math.round(Q)} lb`:`Logged. Today's volume: ${Math.round(Q)} lb`,zt({showToasts:!0}).catch(ot=>console.error("[lift-tracker]",ot))});function J(k){let h=new Map;for(let S of k){let L=$(S.performed_at);h.has(L)||h.set(L,[]),h.get(L).push(S)}return Array.from(h.entries()).sort((S,L)=>L[0].localeCompare(S[0]))}function O(k){let[h,S,L]=k.split("-").map(Number);return new Date(h,S-1,L).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function B(){let k=s.history;if(D.length===0){k.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let h=J(D);k.innerHTML=h.map(([S,L])=>{let W=St(L),I=L.slice().sort((N,Q)=>new Date(Q.performed_at)-new Date(N.performed_at)).map(N=>{let Q=Math.round(z(Number(N.weight),Number(N.reps)));return`
              <li class="lt-history-row" data-set-id="${N.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${N.id}">
                  <span class="lt-history-weight">${N.weight} lb &times; ${N.reps}</span>
                  <span class="lt-history-e1rm">${Q} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${O(S)}</span>
              <span class="lt-history-volume">${Math.round(W)} lb volume</span>
            </div>
            <ul class="lt-history-list">${I}</ul>
          </div>
        `}).join(""),k.querySelectorAll("[data-edit-trigger]").forEach(S=>{S.addEventListener("click",()=>ft(S.dataset.editTrigger))})}function yt(k){return s.history.querySelector(`[data-set-id="${k}"]`)}function ft(k){let h=yt(k),S=D.find(L=>L.id===k);!h||!S||(h.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${S.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${S.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${$(S.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,h.querySelector("[data-edit-cancel]").addEventListener("click",B),h.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Qa(k),await G(),B(),s.details.hidden||P(),Tt("Set deleted",{onUndo:async()=>{await Za(k),await G(),B(),s.details.hidden||P()}})}),h.querySelector("[data-edit-form]").addEventListener("submit",async L=>{L.preventDefault();let W=Number(h.querySelector("[data-edit-weight]").value),F=Number(h.querySelector("[data-edit-reps]").value),I=h.querySelector("[data-edit-date]").value;if(!(W>=0)||!(F>0)||!I)return;let N=new Date(S.performed_at),[Q,ot,st]=I.split("-").map(Number);N.setFullYear(Q,ot-1,st),await Ja(k,{weight:W,reps:F,performed_at:N.toISOString()}),await G(),B(),s.details.hidden||P()}))}function P(){let k=s.details,h=Dt(D);if(h.length===0){k.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Mo();return}let S=gr(D),L=be(a.dictionary_key||r);k.innerHTML=`
      ${_n(L)}
      ${Cn(S)}
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `,k.querySelectorAll("[data-progression-option]").forEach(I=>{I.addEventListener("click",()=>{let N=S.options.find(Q=>Q.id===I.dataset.progressionOption);N&&(c.value=N.weight,i.value=N.reps,m.hidden=!0,w.scrollIntoView({behavior:"smooth",block:"start"}),i.focus())})});let W=k.querySelector("[data-lift-canvas]"),F=k.querySelector("[data-point-detail]");To(W,h,{onPointClick:I=>{F.hidden=!1,F.textContent=`${O(I.date)}: ${I.weight} lb × ${I.reps} (${Math.round(I.e1rm)} e1RM)`}})}await G(),A(),nt(),B(),await lt();async function lt(){let k=await Ot(),{goalEvaluations:h}=At(k),S=h.filter(L=>L.goal.type==="lift_set"&&L.goal.lift_id===e).slice(0,3);if(S.length===0){_.innerHTML=`
        <button type="button" class="lt-lift-goals-empty" data-open-goals>
          Set a goal for this lift
        </button>
      `,_.querySelector("[data-open-goals]").addEventListener("click",de);return}_.innerHTML=`
      <div class="lt-lift-goals-header">
        <span>Goals</span>
        <button type="button" data-open-goals>Manage</button>
      </div>
      ${S.map(L=>`
        <article class="lt-lift-goal-row">
          <span>
            <strong>${at(L.title)}</strong>
            <small>${at(L.currentLabel)} · ${at(L.targetLabel)}</small>
          </span>
          <em>${L.achieved?"Hit":pt(L.progress)}</em>
        </article>
      `).join("")}
    `,_.querySelector("[data-open-goals]").addEventListener("click",de)}}function _n(t){if(!t)return"";let e=t.primaryMuscles.map(n=>`<span>${at(n)}</span>`).join(""),a=t.secondaryMuscles.map(n=>`<span>${at(n)}</span>`).join(""),o=t.equipment.map(n=>`<span>${at(n)}</span>`).join(""),r=t.movementPatterns.map(n=>`<span>${at(n)}</span>`).join("");return`
    <section class="lt-lift-info-card">
      <div class="lt-lift-info-header">
        <span>Lift Info</span>
        <strong>${at(t.name)}</strong>
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
          ${t.cues.map(n=>`<li>${at(n)}</li>`).join("")}
        </ul>
      `:""}
      ${t.tutorialUrl?`<a class="lt-lift-info-link" href="${at(t.tutorialUrl)}" target="_blank" rel="noopener noreferrer">Watch tutorial</a>`:'<p class="lt-lift-info-empty">Tutorial link not set yet.</p>'}
    </section>
  `}function Cn(t){if(!t.baseline)return"";let e=t.context.previousVolume==null?`${Math.round(t.context.latestVolume)} lb last session`:`${Math.round(t.context.latestVolume)} lb last session · ${Math.round(t.context.previousVolume)} lb previous`;return`
    <section class="lt-progression-card">
      <div class="lt-progression-header">
        <span>Progression Options</span>
        <small>Based on ${at(t.baseline.label)}</small>
      </div>
      <p class="lt-progression-context">${at(e)}</p>
      <div class="lt-progression-options">
        ${t.options.map(a=>`
          <button type="button" class="lt-progression-option" data-progression-option="${at(a.id)}">
            <span>${at(a.label)}</span>
            <strong>${at(a.title)}</strong>
            <small>${at(a.description)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `}function at(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var wr=60;function Ke(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-wr),e}function Bt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function $n(t){return t.map(e=>({date:e.date||$(e.logged_at),waist:Number(e.waist??e.waist_circumference),sortAt:e.logged_at||e.date})).filter(e=>Number.isFinite(e.waist)&&e.date).sort((e,a)=>new Date(e.sortAt)-new Date(a.sortAt))}function ke(t,e,a=new Date,o=`last ${wr} days`,r=[],n=[],s=[]){let w=$(a.toISOString()),c=[`Lift Tracker — ${o} (as of ${w})`,""],i=t.filter(p=>(e.get(p.id)||[]).length>0);if(i.length===0)c.push("No sets logged in this period."),c.push("");else{for(let f of i){let l=(e.get(f.id)||[]).slice().sort((d,_)=>new Date(d.performed_at)-new Date(_.performed_at)),b=St(l),C=Math.max(...l.map(d=>z(Number(d.weight),Number(d.reps))));c.push(f.name);for(let d of l){let _=Math.round(z(Number(d.weight),Number(d.reps)));c.push(`  ${$(d.performed_at)}: ${d.weight} lb x ${d.reps} (e1RM ${_})`)}c.push(`  Sets: ${l.length} | Volume: ${Math.round(b)} lb | Best e1RM: ${Math.round(C)}`),c.push("")}let p=t.length-i.length;p>0&&(c.push(`(${p} lift${p===1?"":"s"} with no sets in this period omitted)`),c.push(""))}if(r.length>0){c.push("Body weight");for(let C of r)c.push(`  ${C.date}: ${Bt(C.weight)} lb`);let p=r[0].weight,f=r[r.length-1].weight,l=f-p,b=l>0?"+":"";c.push(`  Start: ${Bt(p)} lb | Current: ${Bt(f)} lb | Change: ${b}${Bt(l)} lb`),c.push("")}let m=$n(n);if(m.length>0){c.push("Waist");for(let C of m)c.push(`  ${C.date}: ${Bt(C.waist)} in`);let p=m[0].waist,f=m[m.length-1].waist,l=f-p,b=l>0?"+":"";c.push(`  Start: ${Bt(p)} in | Current: ${Bt(f)} in | Change: ${b}${Bt(l)} in`),c.push("")}if(s.length>0){c.push("Calories");for(let l of s)c.push(`  ${l.date}: ${Math.round(Number(l.calories))} cal`);let p=s.reduce((l,b)=>l+Number(b.calories),0),f=p/s.length;c.push(`  Days logged: ${s.length} | Total: ${Math.round(p)} cal | Avg/day: ${Math.round(f)} cal`),c.push("")}return c.join(`
`).trimEnd()}var Dn=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      lift, with volume and estimated 1-rep max, plus your body weight,
      waist, and calorie history over the same window. Tap "Copy to clipboard" to grab it —
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
`;async function br(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Dn.map(l=>`
          <section class="lt-help-section">
            <h2>${l.title}</h2>
            <p>${l.body}</p>
          </section>
          ${l.title==="Export progress"?Tn:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",j);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),o=t.querySelector("[data-export-chevron]"),r=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let b=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(b)),a.hidden=!b,o.innerHTML=b?"&#9650;":"&#9660;",!!b){e.disabled=!0;try{let C=await dt(),d=C.map(P=>P.id),_=Ke().toISOString(),D=await De(d,_),A=new Map(C.map(P=>[P.id,[]]));for(let P of D){let lt=A.get(P.lift_id);lt&&lt.push(P)}let G=(await gt()).filter(P=>new Date(P.logged_at)>=new Date(_)),nt=xt(G),O=(await Yt()).filter(P=>new Date(P.logged_at)>=new Date(_)),B=new Date,yt=await jt(_,B.toISOString()),ft=Nt(yt);r.value=ke(C,A,B,void 0,nt,O,ft),s.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{r.select();let l=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(r.value),l=!0}catch{l=!1}if(!l)try{l=document.execCommand("copy")}catch{l=!1}s.hidden=!1,s.textContent=l?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let w=t.querySelector("[data-full-export-toggle]"),c=t.querySelector("[data-full-export-body]"),i=t.querySelector("[data-full-export-chevron]"),m=t.querySelector("[data-full-export-textarea]"),p=t.querySelector("[data-full-export-copy]"),f=t.querySelector("[data-full-export-status]");w.addEventListener("click",async()=>{let b=!(w.getAttribute("aria-expanded")==="true");if(w.setAttribute("aria-expanded",String(b)),c.hidden=!b,i.innerHTML=b?"&#9650;":"&#9660;",!!b){w.disabled=!0;try{let C=await dt(),d=C.map(O=>O.id),_=await $t(d),D=new Map(C.map(O=>[O.id,[]]));for(let O of _){let B=D.get(O.lift_id);B&&B.push(O)}let A=await gt(),R=xt(A),G=await Yt(),nt=await jt("1970-01-01T00:00:00.000Z",new Date().toISOString()),J=Nt(nt);m.value=ke(C,D,new Date,"all-time",R,G,J),f.hidden=!0}finally{w.disabled=!1}}}),p.addEventListener("click",async()=>{m.select();let l=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(m.value),l=!0}catch{l=!1}if(!l)try{l=document.execCommand("copy")}catch{l=!1}f.hidden=!1,f.textContent=l?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function kr(t){_t(ut.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",j);let[e,a]=await Promise.all([dt(),te()]),o=Ko(a),r=o?e.filter(l=>o.liftIds.includes(l.id)):e,n=r.length?await $t(r.map(l=>l.id)):[],s=new Map(r.map(l=>[l.id,[]]));for(let l of n){let b=s.get(l.lift_id);b&&b.push(l)}let w=r.map(l=>({liftId:l.id,dailySeries:Dt(s.get(l.id)||[])})),c=ee(w),i=t.querySelector("[data-composite-canvas]"),m=t.querySelector("[data-composite-empty]"),p=t.querySelector("[data-composite-scope]"),f=t.querySelector("[data-composite-blurb]");if(p.textContent=o?`Measuring ${o.name}`:"Measuring all lifts",f.textContent=o?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",m.textContent=o?`Log a few sets for lifts in ${o.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",c.length===0){i.hidden=!0,m.hidden=!1;return}i.hidden=!1,m.hidden=!0,Ae(i,c)}function Mn(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function qn(){let t=await dt(),e=new Map(t.map(o=>[o.id,o.name]));return(await $t(t.map(o=>o.id))).map(o=>({...o,liftName:e.get(o.lift_id)||"Unknown lift"}))}function An(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let o=Array.from(a.entries()).map(([n,s])=>{let c=s.slice().sort((i,m)=>new Date(i.performed_at)-new Date(m.performed_at)).map(i=>{let m=Math.round(z(Number(i.weight),Number(i.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${i.weight} lb &times; ${i.reps}</span>
                <span class="lt-history-e1rm">${m} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${c}</ul>
        </div>
      `}).join(""),r=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${Mn(t)}</span>
        <span class="lt-history-volume">${r} lift${r===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${o}
    </div>
  `}async function vr(t){_t(ut.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",j);let e=t.querySelector("[data-history-content]"),a=await qn();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let o=_o(a);e.innerHTML=o.map(([r,n])=>An(r,n)).join("")}var Sr="lt-theme",wa="default";function ba(){return We(Sr,wa)}function xr(t){!t||t===wa?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function Er(t){xr(t),Pe(Sr,t||wa)}function Lr(){xr(ba())}var Rn={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},In=["rank","mastery","streak","capstone","secret"],Nn="Hidden until unlocked.";async function _r(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",j);let e=await $e(),a=await gt(),o=await _e(),r=await Ce(),{days:n,tier:s}=Ie(e);t.querySelector("[data-killstreak-current-icon]").textContent=s?s.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=s?`${s.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let w=Ze(e,o),c=t.querySelector("[data-killstreak-tier-list]");c.innerHTML=fe.map(d=>{let _=w[d.key];return`
      <li class="lt-killstreak-tier-row${s?.key===d.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${d.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${d.label}</span>
          <span class="lt-killstreak-tier-req">${d.days}+ day${d.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${_} earned</span>
      </li>
    `}).join("");let i=oe(e,o,{bodyWeightEntries:a,hasSubmittedFeedback:r}),m=i.filter(d=>d.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${m} / ${i.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let p=i.filter(d=>d.track==="rank"),f=new Set(Ne(p,He()));Vo(p.filter(d=>d.unlocked).map(d=>d.id));let l=t.querySelector("[data-achievements]");function b(d){if(d.track!=="rank"){let G=d.track==="secret"&&!d.unlocked,nt=G?" lt-achievement-card-desc-hidden":"",J=G?Nn:d.description,O=d.flavor&&!G?`<span class="lt-achievement-card-flavor">${d.flavor}</span>`:"";return`
        <li class="lt-achievement-card${d.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${d.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${d.name}</span>
            <span class="lt-achievement-card-desc${nt}">${J}</span>
            ${O}
          </span>
        </li>
      `}let _=d.unlocked&&ba()===d.theme.id,D=d.unlocked&&f.has(d.id),A=d.unlocked?`<span class="lt-achievement-card-theme">${d.theme.label} theme${_?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${d.theme.label}</span>`,R=D?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${d.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${D?" lt-achievement-card-new":""}${_?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${d.theme.id}"${d.unlocked?"":" disabled"} aria-label="${d.unlocked?`Apply the ${d.theme.label} theme`:`Locked: ${d.name}`}">
          <span class="lt-achievement-card-icon">${d.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${d.name}</span>
            <span class="lt-achievement-card-desc">${d.description}</span>
            ${A}
            ${R}
          </span>
        </button>
      </li>
    `}function C(){l.innerHTML=In.map(d=>{let D=i.filter(A=>A.track===d).sort((A,R)=>Number(R.unlocked)-Number(A.unlocked)).map(b).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${Rn[d]}</h3>
          ${d==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${D}</ul>
        </section>
      `}).join("")}C(),l.addEventListener("click",d=>{let _=d.target.closest("[data-apply-theme]");!_||_.disabled||(Er(_.dataset.applyTheme),C())})}var ka=`goal_format: lift_tracker_goals_v1
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
For lift_set goals, use concrete weight and reps. Use exact lift and workout names from the export.`;async function Dr(t){let e=await Ot(),a=At(e),o=[];function r(){let i=a.goalEvaluations.filter(p=>p.goal.status==="active"&&!p.achieved),m=a.goalEvaluations.filter(p=>p.goal.status==="achieved"||p.achieved);t.innerHTML=`
      <header class="lt-detail-header">
        <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
        <h1 class="lt-weight-view-title">Goals</h1>
      </header>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Active Goals</h2>
        <div data-active-goals>
          ${i.length?i.map(Cr).join(""):'<p class="lt-empty">No active goals yet. Add one below or paste a batch from an LLM.</p>'}
        </div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Add Goal</h2>
        ${s()}
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
          <pre>${bt(ka)}</pre>
          <p class="lt-composite-blurb">Prompt to give an LLM:</p>
          <pre>${bt($r)}</pre>
        </details>
        <textarea class="lt-goal-import-text" data-import-text rows="12" spellcheck="false" placeholder="${Tr(ka)}"></textarea>
        <div class="lt-goal-actions">
          <button type="button" class="lt-goal-secondary-btn" data-preview-import>Preview</button>
          <button type="button" class="lt-log-btn" data-save-import hidden>Import goals</button>
        </div>
        <div data-import-feedback></div>
      </section>

      <section class="lt-goals-section">
        <h2 class="lt-goals-heading">Completed</h2>
        <div data-completed-goals>
          ${m.length?m.map(Cr).join(""):'<p class="lt-empty">Completed goals will collect here.</p>'}
        </div>
      </section>
    `,t.querySelector("[data-back]").addEventListener("click",j),t.querySelector("[data-help-export-link]").addEventListener("click",Ee),w(),c(),t.querySelectorAll("[data-delete-goal]").forEach(p=>{p.addEventListener("click",async()=>{await ro(p.dataset.deleteGoal),await n()})})}async function n(){e=await Ot(),a=At(e),r()}function s(){return`
      <form class="lt-goal-form" data-goal-form>
        <label class="lt-field">
          <span>Type</span>
          <select name="type" data-goal-type>
            ${ga.map(i=>`<option value="${i.id}">${i.label}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field lt-goal-title-field">
          <span>Title</span>
          <input type="text" name="title" maxlength="80" placeholder="Dumbbell Row 45 x 12" required />
        </label>
        <label class="lt-field" data-lift-field>
          <span>Lift</span>
          <select name="lift_id">
            ${e.lifts.map(i=>`<option value="${i.id}">${bt(i.name)}</option>`).join("")}
          </select>
        </label>
        <label class="lt-field" data-workout-field hidden>
          <span>Workout</span>
          <select name="workout_id">
            ${e.workouts.map(i=>`<option value="${i.id}">${bt(i.name)}</option>`).join("")}
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
    `}function w(){let i=t.querySelector("[data-goal-form]"),m=t.querySelector("[data-goal-type]"),p=t.querySelector("[data-goal-feedback]");function f(){let l=m.value;t.querySelector("[data-lift-field]").hidden=l!=="lift_set",t.querySelector("[data-workout-field]").hidden=!["weekly_workout_volume","workout_session_volume"].includes(l),t.querySelector("[data-lift-set-fields]").hidden=l!=="lift_set",t.querySelector("[data-target-field]").hidden=l==="lift_set"}m.addEventListener("change",f),f(),i.addEventListener("submit",async l=>{l.preventDefault(),p.hidden=!0;let b=i.type.value,d={title:i.title.value.trim(),type:b,unit:"lb",timeframe_weeks:Ye(i.timeframe_weeks.value),recurring:b.startsWith("weekly_")?"weekly":"none",metadata:{}};b==="lift_set"?(d.lift_id=i.lift_id.value,d.target_weight=Ye(i.target_weight.value),d.target_reps=Ye(i.target_reps.value)):(d.target_value=Ye(i.target_value.value),b!=="weekly_workout_days"&&(d.workout_id=i.workout_id.value));let _=Fn(d);if(_){p.hidden=!1,p.textContent=_;return}await eo(d),await zt(),i.reset(),await n()})}function c(){let i=t.querySelector("[data-import-text]"),m=t.querySelector("[data-import-feedback]"),p=t.querySelector("[data-save-import]"),f=t.querySelector("[data-copy-goal-packet]"),l=t.querySelector("[data-goal-packet-output]"),b=t.querySelector("[data-goal-packet-status]");f.addEventListener("click",async()=>{let C=f.textContent;f.disabled=!0,f.textContent="Building...",b.hidden=!0;try{let d=await Wn();l.value=d,l.hidden=!1;let _=await Pn(d);b.hidden=!1,b.textContent=_?"Copied. Paste this into an LLM.":"Copy from the box below."}finally{f.disabled=!1,f.textContent=C}}),t.querySelector("[data-preview-import]").addEventListener("click",()=>{let C=cr(i.value,{lifts:e.lifts,workouts:e.workouts});if(o=C.goals,C.errors.length){p.hidden=!0,m.innerHTML=`<div class="lt-goal-import-errors">${C.errors.map(d=>`<p>${bt(d)}</p>`).join("")}</div>`;return}p.hidden=o.length===0,m.innerHTML=o.length?`<ul class="lt-goal-preview-list">${o.map(d=>`<li>${bt(d.title)} <span>${bt(d.type)}</span></li>`).join("")}</ul>`:'<p class="lt-empty">No goals found in that text.</p>'}),p.addEventListener("click",async()=>{o.length!==0&&(await ao(o),await zt(),i.value="",o=[],await n())})}r()}async function Wn(){let t=await dt(),e=t.map(f=>f.id),a=Ke().toISOString(),o=await De(e,a),r=new Map(t.map(f=>[f.id,[]]));for(let f of o){let l=r.get(f.lift_id);l&&l.push(f)}let s=(await gt()).filter(f=>new Date(f.logged_at)>=new Date(a)),c=(await Yt()).filter(f=>new Date(f.logged_at)>=new Date(a)),i=new Date,m=await jt(a,i.toISOString()),p=ke(t,r,i,void 0,xt(s),c,Nt(m));return["Use the Lift Tracker export below to create goals.","",$r,"","Return only YAML in this exact format. Do not wrap it in markdown fences.","",ka,"","Lift Tracker export:","",p].join(`
`)}async function Pn(t){if(navigator.clipboard?.writeText)try{return await navigator.clipboard.writeText(t),!0}catch{}try{let e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let a=document.execCommand("copy");return e.remove(),a}catch{return!1}}function Cr(t){let e=t.achieved||t.goal.status==="achieved";return`
    <article class="lt-goal-card${e?" lt-goal-card-achieved":""}">
      <div class="lt-goal-card-main">
        <span class="lt-goal-card-title">${bt(t.title)}</span>
        <span class="lt-goal-card-sub">${bt(t.currentLabel)} · ${bt(t.targetLabel)}</span>
        <span class="lt-goal-progress" aria-label="${pt(t.progress)} complete">
          <span style="width: ${Math.round(Math.min(t.progress,1)*100)}%"></span>
        </span>
      </div>
      <div class="lt-goal-card-side">
        <span>${e?"Hit":pt(t.progress)}</span>
        <button type="button" data-delete-goal="${t.goal.id}" aria-label="Delete ${Tr(t.title)}">&times;</button>
      </div>
    </article>
  `}function Fn(t){if(!t.title)return"Add a title.";if(t.type==="lift_set"){if(!t.lift_id)return"Choose a lift.";if(t.target_weight==null)return"Add a target weight.";if(t.target_reps==null)return"Add target reps."}else if(t.target_value==null)return"Add a target.";return(t.type==="weekly_workout_volume"||t.type==="workout_session_volume")&&!t.workout_id?"Choose a workout.":null}function Ye(t){if(t==null||t==="")return null;let e=Number(t);return Number.isFinite(e)?e:null}function bt(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Tr(t){return bt(t)}var Mr="__divider__";async function va(t,{mode:e,workoutId:a}={}){let o=e==="edit",[r,n]=await Promise.all([dt(),o?lo(a):Promise.resolve(null)]);if(o&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(o?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${o?qr(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",j);let w=t.querySelector("[data-workout-name-input]"),c=t.querySelector("[data-workout-lift-list]"),i=t.querySelector("[data-workout-lifts-empty]"),m=t.querySelector("[data-save-workout]"),p=t.querySelector("[data-workout-save-feedback]");i.hidden=r.length>0;let f=r.filter(d=>s.has(d.id)),l=r.filter(d=>!s.has(d.id));c.innerHTML=[...f.map(b),C(),...l.map(b)].join("");for(let d of r){let D=c.querySelector(`[data-lift-id="${d.id}"]`)?.querySelector("[data-name-slot]");D&&(D.textContent=d.name)}me(c,{onReorder:()=>{}}),o&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await uo(a),j(),Tt(`Deleted "${n.name}"`,{onUndo:async()=>{await po(a),Le()}}))}),m.addEventListener("click",async()=>{let d=w.value.trim();if(!d){w.focus();return}let _=Array.from(c.querySelectorAll("[data-reorder-item]")),D=_.findIndex(R=>R.dataset.reorderItem===Mr),A=_.slice(0,D).map(R=>R.dataset.reorderItem);m.disabled=!0,p.hidden=!0;try{if(o)await co(a,d,A);else{let R=await te();await Te(d,A,R.length)}j()}catch(R){console.error("[lift-tracker]",R),p.hidden=!1,p.textContent="Something went wrong saving the workout.",m.disabled=!1}});function b(d){return`
      <li class="lt-lift-row" data-reorder-item="${d.id}" data-lift-id="${d.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${qr(d.name)}">&#8942;&#8942;</button>
      </li>
    `}function C(){return`
      <li class="lt-workout-divider" data-reorder-item="${Mr}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function qr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Hn=`${window.location.origin}${window.location.pathname}`;function Un(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Sa(t){let e="signin";function a(r,n,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Un(s||"")}">

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
    `}function o(r,n,s){t.innerHTML=a(r,n,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",o()});let w=t.querySelector("[data-auth-form]");w.addEventListener("submit",async c=>{c.preventDefault();let i=w.email.value.trim(),m=w.password.value,p=w.querySelector('button[type="submit"]');p.disabled=!0,p.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:f,error:l}=e==="signup"?await v.auth.signUp({email:i,password:m,options:{emailRedirectTo:Hn}}):await v.auth.signInWithPassword({email:i,password:m});if(l)throw l;if(e==="signup"&&!f.session){e="signin",o(null,`Account created. Check ${i} for a confirmation link, then sign in here.`,i);return}}catch(f){o(f.message||"Something went wrong. Try again.",null,i)}})}o()}function Ar(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function Rr(){let{data:t,error:e}=await v.auth.signInAnonymously();if(e)throw e;return await On(),t}async function On(){let t=r=>new Date(Date.now()-r*24*60*60*1e3).toISOString(),[e,a,o]=await Promise.all([Zt("Bench Press",0),Zt("Squat",1),Zt("Deadlift",2)]);await Promise.all([vt(e.id,135,8,t(6)),vt(e.id,145,6,t(2)),vt(a.id,185,5,t(5)),vt(a.id,195,5,t(1)),vt(o.id,225,5,t(3))]),await Te("Full Body",[e.id,a.id,o.id],0)}var mt=document.getElementById("lift-tracker-app");Lr();var Ir=0;async function xa(){let t=++Ir,e=()=>t!==Ir;try{let{data:{session:a}}=await v.auth.getSession();if(e())return;if(!a)if(Ar())try{if(await Rr(),e())return}catch(r){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",r),await Sa(mt);return}else return await Sa(mt),e(),void 0;let o=Ia();if(o.name==="detail"?await yr(mt,o.liftId):o.name==="help"?await br(mt):o.name==="weight"?await Bo(mt,{initialTab:o.tab}):o.name==="composite"?await kr(mt):o.name==="history"?await vr(mt):o.name==="killstreak"?await _r(mt):o.name==="goals"?await Dr(mt):o.name==="workout-new"?await va(mt,{mode:"create"}):o.name==="workout-edit"?await va(mt,{mode:"edit",workoutId:o.workoutId}):await hr(mt),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),mt.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",xa);var Nr=null,Wr=!1;v.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,o=!Wr;Wr=!0;let r=a!==Nr;Nr=a,!(o||!r)&&(j(),xa())});xa();

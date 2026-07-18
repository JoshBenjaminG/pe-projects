import{createClient as Do}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var xa="https://mqfsgammpsumpltfutwl.supabase.co",Ea="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var k=Do(xa,Ea);function La(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight",tab:"weight"}:t==="weight/food"?{name:"weight",tab:"food"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:t==="prs"||t==="goals"?{name:"prs"}:{name:"list"}}function j(){window.location.hash="#/"}function fe(t){window.location.hash=`#/lift/${t}`}function Ca(){window.location.hash="#/workout/new"}function Da(t){window.location.hash=`#/workout/${t}/edit`}function _a(){window.location.hash="#/help"}function Ta(){window.location.hash="#/weight"}function $a(){window.location.hash="#/weight/food"}function Ma(){window.location.hash="#/composite"}function qa(){window.location.hash="#/history"}function Ra(){window.location.hash="#/killstreak"}function Aa(){window.location.hash="#/prs"}function he(){window.dispatchEvent(new Event("hashchange"))}async function ge(){let{data:t,error:e}=await k.auth.getUser();if(e)throw e;return t?.user?.id??null}async function Ia(){let{error:t}=await k.from("feedback_submissions").insert({});if(t)throw t}async function ye(){let{count:t,error:e}=await k.from("feedback_submissions").select("id",{count:"exact",head:!0});if(e)throw e;return(t??0)>0}async function ct(){let{data:t,error:e}=await k.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function _o(){let{data:t,error:e}=await k.from("lifts").select("id");if(e)throw e;return t.map(a=>a.id)}async function Pa(t){let{data:e,error:a}=await k.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function Yt(t,e,a={}){let{data:r,error:o}=await k.from("lifts").insert({...a,name:t,sort_order:e}).select().single();if(o)throw o;return r}async function Na(t,e){let{data:a,error:r}=await k.from("lifts").update({name:e}).eq("id",t).select().single();if(r)throw r;return a}async function Wa(t){let e=t.map((o,n)=>k.from("lifts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ua(t){let{error:e}=await k.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Fa(t){let{error:e}=await k.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Ha(t){let{data:e,error:a}=await k.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function yt(t){if(!t||t.length===0)return[];let{data:e,error:a}=await k.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function we(){let t=await _o();return yt(t)}async function Oa(t,e){if(!t||t.length===0)return[];let{data:a,error:r}=await k.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(r)throw r;return a}async function kt(t,e,a,r){let{data:o,error:n}=await k.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:r||new Date().toISOString()}).select().single();if(n)throw n;return o}async function Ba(t,e){let{data:a,error:r}=await k.from("sets").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Ka(t){let{error:e}=await k.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Va(t){let{error:e}=await k.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Gt(){let{data:t,error:e}=await k.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(r=>r.lift_id)}))}async function Ya(t){let e=t.map((o,n)=>k.from("workouts").update({sort_order:n}).eq("id",o)),r=(await Promise.all(e)).find(o=>o.error);if(r)throw r.error}async function Ga(t){let{data:e,error:a}=await k.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(r=>r.lift_id)}:null}async function be(t,e,a){let{data:r,error:o}=await k.from("workouts").insert({name:t,sort_order:a}).select().single();if(o)throw o;if(e.length>0){let{error:n}=await k.from("workout_lifts").insert(e.map(s=>({workout_id:r.id,lift_id:s})));if(n)throw n}return r}async function ja(t,e,a){let{error:r}=await k.from("workouts").update({name:e}).eq("id",t);if(r)throw r;let{error:o}=await k.from("workout_lifts").delete().eq("workout_id",t);if(o)throw o;if(a.length>0){let{error:n}=await k.from("workout_lifts").insert(a.map(s=>({workout_id:t,lift_id:s})));if(n)throw n}}async function Xa(t){let{error:e}=await k.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function za(t){let{error:e}=await k.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function vt(){let{data:t,error:e}=await k.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Ja(t,e){let{data:a,error:r}=await k.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function Qa(t,e){let{data:a,error:r}=await k.from("body_weight").update(e).eq("id",t).select().single();if(r)throw r;return a}async function Za(t){let{error:e}=await k.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function tr(t){let{error:e}=await k.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function re(){let{data:t,error:e}=await k.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function er(t,e){let{data:a,error:r}=await k.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(r)throw r;return a}async function ar(t,e){let{data:a,error:r}=await k.from("waist_measurements").update(e).eq("id",t).select().single();if(r)throw r;return a}async function rr(t){let{error:e}=await k.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function or(t){let{error:e}=await k.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}async function oe(t,e){let{data:a,error:r}=await k.from("food_log_entries").select("*").is("deleted_at",null).gte("logged_at",t).lt("logged_at",e).order("logged_at",{ascending:!1});if(r)throw r;return a}async function nr(t,e,a){let{data:r,error:o}=await k.from("food_log_entries").insert({title:t,calories:e,logged_at:a||new Date().toISOString()}).select().single();if(o)throw o;return r}async function sr(t,e){let{data:a,error:r}=await k.from("food_log_entries").update(e).eq("id",t).select().single();if(r)throw r;return a}async function ir(t){let{error:e}=await k.from("food_log_entries").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function lr(t){let{error:e}=await k.from("food_log_entries").update({deleted_at:null}).eq("id",t);if(e)throw e}function et(t,e){return t*(1+e/30)}function _(t){let e=new Date(t),a=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${a}-${r}-${o}`}function Ct(t){let e=new Map;for(let a of t){let r=_(a.performed_at),o=et(Number(a.weight),Number(a.reps)),n=e.get(r);(!n||o>n.e1rm)&&e.set(r,{date:r,e1rm:o,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date))}function jt(t){let e=t.filter(s=>s.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let s of e)a.set(s.liftId,s.dailySeries[0].e1rm);let r=new Set;for(let s of e)for(let f of s.dailySeries)r.add(f.date);let o=Array.from(r).sort(),n=[];for(let s of o){let f=0,c=0;for(let g of e){let b=null;for(let S of g.dailySeries)if(S.date<=s)b=S;else break;b&&(f+=b.e1rm/a.get(g.liftId),c+=1)}if(c>0){let g=f/c;n.push({date:s,ratio:g,pct:(g-1)*100})}}return n}function ke(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(r=>et(Number(r.weight),Number(r.reps))));return t>a}function Xt(t){let e=new Map;for(let r of t||[])!r?.lift_id||!r.performed_at||(e.has(r.lift_id)||e.set(r.lift_id,[]),e.get(r.lift_id).push(r));let a=[];for(let[r,o]of e.entries()){let n=o.slice().sort((f,c)=>new Date(f.performed_at)-new Date(c.performed_at)),s=null;for(let f of n){let c=Number(f.weight),g=Number(f.reps),b=et(c,g);if(s==null){s=b;continue}b>s&&(a.push({liftId:r,setId:f.id,performed_at:f.performed_at,weight:c,reps:g,e1rm:b,previousE1RM:s,improvement:b-s}),s=b)}}return a.sort((r,o)=>new Date(o.performed_at)-new Date(r.performed_at))}function St(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function cr(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function dr(t){let e=new Map;for(let a of t){let r=_(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>r[0].localeCompare(a[0]))}function qt(t){let e=new Map;for(let a of t){let r=_(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,weight:r,entryId:o})=>({date:a,weight:r,entryId:o}))}function ur(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function pr(t){let e=new Map;for(let a of t){let r=_(a.logged_at),o=e.get(r);(!o||new Date(a.created_at||0)>=new Date(o.createdAt||0))&&e.set(r,{date:r,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,r)=>a.date.localeCompare(r.date)).map(({date:a,waist:r,entryId:o})=>({date:a,waist:r,entryId:o}))}function zt(t){let e=new Map;for(let a of t){let r=_(a.logged_at);e.set(r,(e.get(r)||0)+Number(a.calories))}return Array.from(e.entries()).sort((a,r)=>a[0].localeCompare(r[0])).map(([a,r])=>({date:a,calories:r}))}var ne=null,Rt=null,At=null,It=null,Pt=null,se=14,ve="#e8242c",mr="rgba(232, 36, 44, 0.18)",Jt="#f2b134",Ue="rgba(242, 177, 52, 0.16)",xt="#9a9ca6",Et="rgba(255, 255, 255, 0.08)";function Se(t,e,{onPointClick:a}={}){ne&&(ne.destroy(),ne=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.pct*10)/10);return ne=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Composite progress",data:o,borderColor:ve,backgroundColor:mr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:ve,pointHitRadius:se}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:xt},grid:{color:Et}},y:{ticks:{color:xt,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:Et}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),ne}function fr(t,e,{onPointClick:a}={}){Rt&&(Rt.destroy(),Rt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.e1rm*10)/10);return Rt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Estimated 1RM",data:o,borderColor:Jt,backgroundColor:Ue,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Jt,pointHitRadius:se}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:xt},grid:{color:Et}},y:{ticks:{color:xt},grid:{color:Et}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Rt}function hr(){Rt&&(Rt.destroy(),Rt=null)}function Fe(t,e,{onPointClick:a}={}){At&&(At.destroy(),At=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.weight*10)/10);return At=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Weight",data:o,borderColor:ve,backgroundColor:mr,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:ve,pointHitRadius:se}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:xt},grid:{color:Et}},y:{ticks:{color:xt},grid:{color:Et}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),At}function He(){At&&(At.destroy(),At=null)}function gr(t,e,{onPointClick:a}={}){It&&(It.destroy(),It=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(n.waist*10)/10);return It=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Waist",data:o,borderColor:Jt,backgroundColor:Ue,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:Jt,pointHitRadius:se}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:xt},grid:{color:Et}},y:{ticks:{color:xt},grid:{color:Et}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),It}function yr(){It&&(It.destroy(),It=null)}function wr(t,e,{onPointClick:a}={}){Pt&&(Pt.destroy(),Pt=null);let r=e.map(n=>n.date),o=e.map(n=>Math.round(Number(n.calories)));return Pt=new Chart(t,{type:"line",data:{labels:r,datasets:[{label:"Calories",data:o,borderColor:Jt,backgroundColor:Ue,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:Jt,pointHitRadius:se}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:xt},grid:{color:Et}},y:{beginAtZero:!0,ticks:{color:xt,callback:n=>`${n} cal`},grid:{color:Et}}},plugins:{legend:{display:!1}},onClick:(n,s)=>{s.length&&a&&a(e[s[0].index])}}}),Pt}function br(){Pt&&(Pt.destroy(),Pt=null)}function ie(t,{onReorder:e,axis:a="y"}={}){let r=null,o=null,n=0,s=0,f=0,c=0,g=0,b=null,S=null,x=null,p=0,L=0,q=null,l=null;function $(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function D(d){let w=d.target.closest(".lt-drag-handle");if(!w)return;let E=w.closest("[data-reorder-item]");if(E){if(d.pointerType!=="touch"){d.preventDefault(),z(E,d.clientX,d.clientY);return}if(w.setPointerCapture)try{w.setPointerCapture(d.pointerId),q=w,l=d.pointerId}catch{}x=E,p=d.clientX,L=d.clientY,document.addEventListener("pointermove",V),document.addEventListener("pointerup",ot),S=setTimeout(()=>{clearTimeout(S),S=null;let P=x,U=p,R=L;N(),z(P,U,R)},180)}}function I(){if(q&&l!==null&&q.releasePointerCapture)try{q.releasePointerCapture(l)}catch{}q=null,l=null}function N(){clearTimeout(S),S=null,x=null,document.removeEventListener("pointermove",V),document.removeEventListener("pointerup",ot)}function V(d){if(!x)return;let w=d.clientX-p,E=d.clientY-L;Math.hypot(w,E)<=10||(N(),I())}function ot(){N(),I()}function z(d,w,E){r=d,n=w,s=E,g=E;let P=d.getBoundingClientRect();c=P.top,f=P.left,o=document.createElement(d.tagName),o.className="lt-reorder-placeholder",o.style.height=`${d.offsetHeight}px`,o.style.width=`${d.offsetWidth}px`,d.after(o),d.classList.add("lt-dragging"),d.style.position="fixed",d.style.left=`${P.left}px`,d.style.width=`${P.width}px`,d.style.top=`${c}px`,d.style.zIndex="1000",document.addEventListener("pointermove",it),document.addEventListener("pointerup",y)}function O(){let d=$().filter(P=>P!==r),w=r.getBoundingClientRect(),E=null;if(a==="x"){let P=w.left+w.width/2,U=w.top+w.height/2;for(let R of d){let A=R.getBoundingClientRect(),J=A.left+A.width/2,gt=A.top+A.height/2;if(Math.abs(gt-U)<A.height/2?P<J:U<gt){E=R;break}}}else{let P=w.top+w.height/2;for(let U of d){let R=U.getBoundingClientRect(),A=R.top+R.height/2;if(P<A){E=U;break}}}E?t.insertBefore(o,E):t.appendChild(o)}function K(){let d=g,w=window.innerHeight-g;return d<80?-16*(1-d/80):w<80?16*(1-w/80):0}function ht(){if(!r){b=null;return}let d=K();if(d===0){b=null;return}window.scrollBy(0,d),O(),b=requestAnimationFrame(ht)}function mt(){b===null&&K()!==0&&(b=requestAnimationFrame(ht))}function W(){b!==null&&(cancelAnimationFrame(b),b=null)}function it(d){if(r){if(d.preventDefault(),g=d.clientY,a==="x"){let w=d.clientX-n,E=d.clientY-s;r.style.left=`${f+w}px`,r.style.top=`${c+E}px`}else{let w=d.clientY-s;r.style.top=`${c+w}px`}O(),a==="y"&&mt()}}function y(){if(!r)return;W(),o.replaceWith(r),r.classList.remove("lt-dragging"),r.style.position="",r.style.left="",r.style.width="",r.style.top="",r.style.zIndex="",document.removeEventListener("pointermove",it),document.removeEventListener("pointerup",y),I();let d=$().map(w=>w.dataset.reorderItem);r=null,o=null,e&&e(d)}t.addEventListener("pointerdown",D)}var To="joshuaegage@gmail.com";function kr(){let t=document.activeElement instanceof HTMLElement?document.activeElement:null,e=document.createElement("div");e.className="lt-feedback-overlay",e.innerHTML=`
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
  `,document.body.appendChild(e),document.body.classList.add("lt-feedback-modal-open");let a=e.querySelector("[data-feedback-text]");a.focus({preventScroll:!0});let r=!1;function o(){if(r)return;r=!0,document.removeEventListener("keydown",n),e.remove(),document.body.classList.remove("lt-feedback-modal-open");let s=document.scrollingElement;s&&(s.scrollLeft=0),t&&document.contains(t)&&requestAnimationFrame(()=>t.focus({preventScroll:!0}))}function n(s){s.key==="Escape"&&o()}e.addEventListener("click",s=>{s.target===e&&o()}),document.addEventListener("keydown",n),e.querySelector("[data-feedback-cancel]").addEventListener("click",o),e.querySelector("[data-feedback-send]").addEventListener("click",()=>{let s=a.value.trim(),f=encodeURIComponent("Lift Tracker feedback"),c=encodeURIComponent(s||"(no message entered)");Ia().catch(()=>{}),window.location.href=`mailto:${To}?subject=${f}&body=${c}`,o()})}var le=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function xe(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function $o(t,e=new Date){let a=xe(e),r=new Date(a);r.setDate(r.getDate()+7);let o=new Set;for(let n of t){let s=new Date(n.performed_at);s>=a&&s<r&&o.add(_(n.performed_at))}return o.size}function Mo(t){let e=null;for(let a of le)t>=a.days&&(e=a);return e}function Ee(t,e=new Date){let a=$o(t,e);return{days:a,tier:Mo(a)}}function Oe(t,e=null){let a=new Map;for(let o of t){let s=xe(new Date(o.performed_at)).getTime();a.has(s)||a.set(s,new Set),a.get(s).add(_(o.performed_at))}let r={};for(let o of le)r[o.key]=0;for(let o of a.values())for(let n of le)o.size>=n.days&&(r[n.key]+=1);return r}function qo(t){let e=new Set;for(let a of t)e.add(_(a.performed_at));return e.size}function Ro(t){let e=new Set;for(let a of t)e.add(xe(new Date(a.performed_at)).getTime());return e.size}function Ao(t){let e=new Set;for(let n of t)e.add(xe(new Date(n.performed_at)).getTime());let a=Array.from(e).sort((n,s)=>n-s);if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+7),o=s.getTime()===a[n]?o+1:1,o>r&&(r=o)}return r}function Io(t){let e=new Set;for(let n of t)e.add(_(n.performed_at));let a=Array.from(e).sort().map(n=>{let[s,f,c]=n.split("-").map(Number);return new Date(s,f-1,c)});if(a.length===0)return 0;let r=1,o=1;for(let n=1;n<a.length;n++){let s=new Date(a[n-1]);s.setDate(s.getDate()+1),o=s.getTime()===a[n].getTime()?o+1:1,o>r&&(r=o)}return r}function Po(t){let e=new Map;for(let r of t)r.lift_id&&(e.has(r.lift_id)||e.set(r.lift_id,[]),e.get(r.lift_id).push(r));let a=jt(Array.from(e.entries()).map(([r,o])=>({liftId:r,dailySeries:Ct(o)})));return a.length?Math.max(...a.map(r=>r.pct)):0}function No(t){let e=qt(t);if(e.length===0)return{gain:0,loss:0};let a=e[0].weight,r=0,o=0;for(let n of e){let s=n.weight-a;r=Math.max(r,s),o=Math.max(o,-s)}return{gain:r,loss:o}}function Be(t,e=null,a={}){let{bodyWeightEntries:r=[],hasSubmittedFeedback:o=!1}=a,n=No(r);return{totalDays:qo(t),totalWeeks:Ro(t),tierCounts:Oe(t,e),longestStreak:Ao(t),totalSets:t.length,longestDayStreak:Io(t),compositeMaxPct:Po(t),bodyWeightGain:n.gain,bodyWeightLoss:n.loss,hasSubmittedFeedback:o||Uo(e)}}var Wo=new Set(["19bf3140-6738-496f-ac0c-20e316c4c3c0","1445e5d7-276a-4fca-bb91-1c0a7ff44b65"]);function Uo(t){return t!=null&&Wo.has(t)}var Fo=50,Ho=[{id:"rank-private",name:"Private",track:"rank",description:"Log 1 workout day.",theme:{id:"default",label:"Lift Tracker"},isUnlocked:t=>t.totalDays>=1},{id:"rank-pfc",name:"Private First Class",track:"rank",description:"Log 2 workout days.",theme:{id:"agile",label:"Agile"},isUnlocked:t=>t.totalDays>=2},{id:"rank-corporal",name:"Corporal",track:"rank",description:"Log 3 workout days.",theme:{id:"agriculture",label:"Agriculture"},isUnlocked:t=>t.totalDays>=3},{id:"rank-sergeant",name:"Sergeant",track:"rank",description:"Log 5 workout days.",theme:{id:"bluelift",label:"Blue Lift"},isUnlocked:t=>t.totalDays>=5},{id:"rank-staff-sergeant",name:"Staff Sergeant",track:"rank",description:"Log 7 workout days.",theme:{id:"army",label:"Army"},isUnlocked:t=>t.totalDays>=7},{id:"rank-master-sergeant",name:"Master Sergeant",track:"rank",description:"Log 9 workout days.",theme:{id:"brown",label:"Brown"},isUnlocked:t=>t.totalDays>=9},{id:"rank-warrant-officer",name:"Warrant Officer",track:"rank",description:"Log 11 workout days.",theme:{id:"neon",label:"Neon"},isUnlocked:t=>t.totalDays>=11},{id:"rank-lieutenant",name:"Lieutenant",track:"rank",description:"Log 13 workout days.",theme:{id:"white",label:"White"},isUnlocked:t=>t.totalDays>=13},{id:"rank-captain",name:"Captain",track:"rank",description:"Log 15 workout days.",theme:{id:"apple",label:"Apple"},isUnlocked:t=>t.totalDays>=15},{id:"rank-major",name:"Major",track:"rank",description:"Log 18 workout days.",theme:{id:"candy",label:"Candy"},isUnlocked:t=>t.totalDays>=18},{id:"rank-colonel",name:"Colonel",track:"rank",description:"Log 22 workout days.",theme:{id:"dim",label:"Dim"},isUnlocked:t=>t.totalDays>=22},{id:"rank-general",name:"General",track:"rank",description:"Log 27 workout days.",theme:{id:"evolution",label:"Evolution"},isUnlocked:t=>t.totalDays>=27},{id:"rank-prestige",name:"Prestige",track:"rank",description:"Log 33 workout days.",theme:{id:"gwen",label:"Gwen"},isUnlocked:t=>t.totalDays>=33},{id:"rank-prestige-master",name:"Prestige Master",track:"rank",description:"Log 40 workout days.",theme:{id:"questionable",label:"Questionable"},isUnlocked:t=>t.totalDays>=40},{id:"mastery-uav-1",name:"UAV Specialist",track:"mastery",description:"Earn the UAV tier 3 times.",isUnlocked:t=>t.tierCounts.uav>=3},{id:"mastery-uav-2",name:"UAV Veteran",track:"mastery",description:"Earn the UAV tier 10 times.",isUnlocked:t=>t.tierCounts.uav>=10},{id:"mastery-predator-1",name:"Predator Specialist",track:"mastery",description:"Earn Predator Missile 3 times.",isUnlocked:t=>t.tierCounts.predator>=3},{id:"mastery-predator-2",name:"Predator Veteran",track:"mastery",description:"Earn Predator Missile 10 times.",isUnlocked:t=>t.tierCounts.predator>=10},{id:"mastery-harrier-1",name:"Harrier Specialist",track:"mastery",description:"Earn Harrier Strike 5 times.",isUnlocked:t=>t.tierCounts.harrier>=5},{id:"mastery-harrier-2",name:"Harrier Veteran",track:"mastery",description:"Earn Harrier Strike 15 times.",isUnlocked:t=>t.tierCounts.harrier>=15},{id:"mastery-chopper-1",name:"Chopper Gunner",track:"mastery",description:"Earn Chopper Gunner for the first time.",isUnlocked:t=>t.tierCounts.chopper>=1},{id:"mastery-chopper-2",name:"Gunship",track:"mastery",description:"Earn Chopper Gunner 3 times.",isUnlocked:t=>t.tierCounts.chopper>=3},{id:"streak-2",name:"Counter-UAV",track:"streak",description:"2 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=2},{id:"streak-3",name:"Care Package",track:"streak",description:"3 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=3},{id:"streak-4",name:"Sentry Gun",track:"streak",description:"4 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=4},{id:"streak-5",name:"Attack Helicopter",track:"streak",description:"5 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=5},{id:"streak-6",name:"Stealth Bomber",track:"streak",description:"6 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=6},{id:"streak-8",name:"Juggernaut",track:"streak",description:"8 consecutive weeks with at least a UAV.",isUnlocked:t=>t.longestStreak>=8},{id:"capstone-tactical-nuke",name:"Tactical Nuke",track:"capstone",description:"Reach General (27 days) and earn Gunship (Chopper Gunner x3).",isUnlocked:t=>t.totalDays>=27&&t.tierCounts.chopper>=3},{id:"capstone-moab",name:"MOAB",track:"capstone",description:"Reach Juggernaut (8-week streak) and Harrier Veteran (x15).",isUnlocked:t=>t.longestStreak>=8&&t.tierCounts.harrier>=15},{id:"capstone-dark-matter",name:"Dark Matter",track:"capstone",description:"Reach Prestige Master (40 days) and earn Gunship (x3).",isUnlocked:t=>t.totalDays>=40&&t.tierCounts.chopper>=3},{id:"secret-blue-pill",name:"Blue Pill",track:"secret",description:"Participated in the beta.",flavor:'"Believe whatever you want to believe." — Morpheus',isUnlocked:()=>!0},{id:"secret-red-pill",name:"Red Pill",track:"secret",description:"Participated in the alpha.",flavor:`"I'll show you how deep the rabbit hole goes." — Morpheus`,isUnlocked:()=>!1},{id:"secret-clear-pill",name:"Clear Pill",track:"secret",description:"Log workouts in 12 different weeks.",flavor:'"There is a quiet at the top of the Bridge that no one warns you about. It is not peace. It is the room after everyone has gone home." - M. Halvard Strickett',isUnlocked:t=>t.totalWeeks>=12},{id:"secret-enlightenment",name:"Enlightenment",track:"secret",description:"Lose 9 pounds.",flavor:'"They would all bear witness to the bare flesh of the one who is free. To the one who left it all behind." - Narrator, Jujstu Kaisen',isUnlocked:t=>t.bodyWeightLoss>=9},{id:"secret-gamma-radiation",name:"Gamma Radiation",track:"secret",description:"Gain 9 pounds.",flavor:'"That’s my secret, Captain: I’m always angry." - Bruce Banner',isUnlocked:t=>t.bodyWeightGain>=9},{id:"secret-human-instrumentality",name:"Human Instrumentality Project",track:"secret",description:"Log a workout on 70 distinct days.",flavor:`"From now on, you're on your own. You'll have to make your own decisions." — Misato`,isUnlocked:t=>t.totalSets>=Fo&&t.totalDays>=70},{id:"secret-one-wish-willow",name:"One Wish Willow",track:"secret",description:"Submit feedback through the app.",flavor:'"I wish Nikki Freeman loved me more than anyone in the f**king world." — Baron "Bear" Bailey',isUnlocked:t=>t.hasSubmittedFeedback}];function Qt(t,e=null,a={}){let r=Be(t,e,a);return Ho.map(o=>({id:o.id,name:o.name,track:o.track,description:o.description,flavor:o.flavor??null,theme:o.theme??null,unlocked:o.isUnlocked(r)}))}function Le(t,e){let a=new Set(e);return t.filter(r=>r.unlocked&&!a.has(r.id)).map(r=>r.id)}var Zt=null,Ke=null;function Oo(){return Zt||(Zt=document.createElement("div"),Zt.className="lt-toast",document.body.appendChild(Zt),Zt)}function Dt(t,{onUndo:e,onExpire:a,durationMs:r=5e3}={}){let o=Oo();clearTimeout(Ke),o.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,o.querySelector(".lt-toast-message").textContent=t,o.classList.add("lt-toast-visible");let n=o.querySelector(".lt-toast-undo"),s=()=>o.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(Ke),s(),e&&e()},{once:!0}),Ke=setTimeout(()=>{s(),a&&a()},r)}function Nt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function _t(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}function Ce(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1]):e}catch{return e}}function De(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var vr="lt-discovery-seen-",dt={weight:"weight",history:"history",composite:"composite"};function _e(t){try{return window.localStorage.getItem(`${vr}${t}`)==="true"}catch{return!1}}function Lt(t){try{window.localStorage.setItem(`${vr}${t}`,"true")}catch{}}var Sr="lt-weight-card-expanded",Bo="1970-01-01T00:00:00.000Z";function te(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Ko(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Ye(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function xr(t){let e=_(new Date().toISOString());return t===e?"Today":Ye(t)}function Ve(t){return`${Math.round(Number(t)||0)} cal`}async function Er(t,{onExpand:e,showDiscovery:a=!1}={}){t.classList.remove("lt-stats-row-expanded"),t.innerHTML=`
    <div class="lt-weight-card-row-collapsed">
      <button type="button" class="lt-weight-toggle" data-weight-expand aria-label="Open weight tracker">
        <span class="lt-weight-toggle-label">
          <span>Weight</span>
          <span class="lt-chevron">&#9660;</span>
        </span>
        <span class="lt-weight-stat-value lt-weight-collapsed-value">Loading...</span>
      </button>
    </div>
  `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});let r=await vt(),o=qt(r),n=ur(o),s=a&&r.length===0?'<span class="lt-discovery-badge" aria-label="Weight tracker not tried yet">!</span>':"";if(!n){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight ${s}</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let f=n.change<0?"↘":n.change>0?"↗":"→",c=Nt(Sr,!1);function g(){t.classList.toggle("lt-stats-row-expanded",c),c?t.innerHTML=`
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
              <span class="lt-weight-stat-value">${te(n.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${Ko(n.currentDate)})</span>
              <span class="lt-weight-stat-value">${te(n.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${f} ${te(Math.abs(n.change))} lbs</span>
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
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${te(n.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}c=!c,_t(Sr,c),g()}),c?Fe(t.querySelector("[data-home-weight-canvas]"),o):He()}g()}async function Lr(t,{initialTab:e="weight"}={}){Lt(dt.weight),t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",j);let a=Array.from(t.querySelectorAll("[data-tab]")),r={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]'),food:t.querySelector('[data-tab-panel="food"]')},o="weight";function n(v){!r[v]||v===o||(o=v,a.forEach(m=>m.setAttribute("aria-selected",String(m.dataset.tab===o))),Object.entries(r).forEach(([m,T])=>{T.hidden=m!==o}),o==="weight"?q():o==="waist"?it().catch(m=>console.error("[lift-tracker]",m)):Ut().catch(m=>console.error("[lift-tracker]",m)))}a.forEach(v=>{v.addEventListener("click",()=>{n(v.dataset.tab)})});let s=t.querySelector("[data-weight-form]"),f=t.querySelector("[data-weight-date-input]"),c=t.querySelector("[data-weight-input]"),g=t.querySelector("[data-weight-chart-section]"),b=t.querySelector("[data-weight-canvas]"),S=t.querySelector("[data-weight-empty]"),x=t.querySelector("[data-weight-history]");f.value=_(new Date().toISOString());let p=[];async function L(){p=await vt(),l(),q()}function q(){let v=qt(p);if(v.length===0){g.hidden=!0,S.hidden=!1,He();return}g.hidden=!1,S.hidden=!0,r.weight.hidden||Fe(b,v)}function l(){if(p.length===0){x.innerHTML="";return}let v=p.slice().sort((m,T)=>new Date(T.logged_at)-new Date(m.logged_at));x.innerHTML=v.map(m=>`
          <li class="lt-history-row" data-entry-id="${m.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${m.id}">
              <span class="lt-history-weight">${te(Number(m.weight))} lb</span>
              <span class="lt-history-e1rm">${Ye(_(m.logged_at))}</span>
            </button>
          </li>
        `).join(""),x.querySelectorAll("[data-edit-trigger]").forEach(m=>{m.addEventListener("click",()=>$(m.dataset.editTrigger))})}function $(v){let m=x.querySelector(`[data-entry-id="${v}"]`),T=p.find(F=>F.id===v);!m||!T||(m.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${T.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${_(T.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",l),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await Za(v),await L(),Dt("Weight entry deleted",{onUndo:async()=>{await tr(v),await L()}}))}),m.querySelector("[data-edit-form]").addEventListener("submit",async F=>{F.preventDefault();let Z=Number(m.querySelector("[data-edit-weight]").value),at=m.querySelector("[data-edit-date]").value;if(!(Z>=0)||!at)return;let rt=new Date(T.logged_at),[G,C,X]=at.split("-").map(Number);rt.setFullYear(G,C-1,X),await Qa(v,{weight:Z,logged_at:rt.toISOString()}),await L()}))}s.addEventListener("submit",async v=>{v.preventDefault();let m=Number(c.value),T=f.value;if(!(m>=0)||!Number.isFinite(m)||!T)return;let[F,Z,at]=T.split("-").map(Number),rt=new Date;rt.setFullYear(F,Z-1,at),await Ja(m,rt.toISOString()),c.value="",c.focus(),f.value=_(new Date().toISOString()),await L()});let D=t.querySelector("[data-waist-form]"),I=t.querySelector("[data-waist-date-input]"),N=t.querySelector("[data-waist-input]"),V=t.querySelector("[data-waist-chart-section]"),ot=t.querySelector("[data-waist-canvas]"),z=t.querySelector("[data-waist-empty]"),O=t.querySelector("[data-waist-history]");I.value=_(new Date().toISOString());let K=[],ht=!1,mt=null;async function W(){K=await re(),ht=!0,d(),y()}async function it(){if(ht){y();return}mt||(z.hidden=!1,z.textContent="Loading waist...",V.hidden=!0,mt=W().finally(()=>{mt=null})),await mt}function y(){let v=pr(K);if(v.length===0){V.hidden=!0,z.hidden=!1,z.textContent="No waist measurements yet — add your first one above.",yr();return}V.hidden=!1,z.hidden=!0,r.waist.hidden||gr(ot,v)}function d(){if(K.length===0){O.innerHTML="";return}let v=K.slice().sort((m,T)=>new Date(T.logged_at)-new Date(m.logged_at));O.innerHTML=v.map(m=>`
          <li class="lt-history-row" data-entry-id="${m.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${m.id}">
              <span class="lt-history-weight">${te(Number(m.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Ye(_(m.logged_at))}</span>
            </button>
          </li>
        `).join(""),O.querySelectorAll("[data-edit-trigger]").forEach(m=>{m.addEventListener("click",()=>w(m.dataset.editTrigger))})}function w(v){let m=O.querySelector(`[data-entry-id="${v}"]`),T=K.find(F=>F.id===v);!m||!T||(m.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${T.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${_(T.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",d),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await rr(v),await W(),Dt("Waist measurement deleted",{onUndo:async()=>{await or(v),await W()}}))}),m.querySelector("[data-edit-form]").addEventListener("submit",async F=>{F.preventDefault();let Z=Number(m.querySelector("[data-edit-waist]").value),at=m.querySelector("[data-edit-date]").value;if(!(Z>=0)||!at)return;let rt=new Date(T.logged_at),[G,C,X]=at.split("-").map(Number);rt.setFullYear(G,C-1,X),await ar(v,{waist_circumference:Z,logged_at:rt.toISOString()}),await W()}))}D.addEventListener("submit",async v=>{v.preventDefault();let m=Number(N.value),T=I.value;if(!(m>=0)||!Number.isFinite(m)||!T)return;let[F,Z,at]=T.split("-").map(Number),rt=new Date;rt.setFullYear(F,Z-1,at),await er(m,rt.toISOString()),N.value="",N.focus(),I.value=_(new Date().toISOString()),await W()});let E=t.querySelector("[data-food-form]"),P=t.querySelector("[data-food-title-input]"),U=t.querySelector("[data-food-calories-input]"),R=t.querySelector("[data-food-chart-section]"),A=t.querySelector("[data-food-canvas]"),J=t.querySelector("[data-food-chart-empty]"),gt=t.querySelector("[data-food-total]"),nt=t.querySelector("[data-food-empty]"),$t=t.querySelector("[data-food-history]"),st=[],Mt=!1,Bt=null,Q=_(new Date().toISOString());async function bt(){st=await oe(Bo,new Date().toISOString()),Mt=!0,lt(),Ft()}async function Ut(){if(Mt){Ft();return}Bt||(nt.hidden=!1,nt.textContent="Loading food log...",Bt=bt().finally(()=>{Bt=null})),await Bt}function Ft(){let v=zt(st),m=new Map(v.map(C=>[C.date,C.calories]));v.length>0&&!m.has(Q)&&(Q=v[v.length-1].date);let T=st.filter(C=>_(C.logged_at)===Q).sort((C,X)=>new Date(X.logged_at)-new Date(C.logged_at)),F=xr(Q),Z=m.get(Q)||0;if(t.querySelector("[data-food-summary] span").textContent=F,gt.textContent=Ve(Z),nt.hidden=T.length>0||v.length===0,nt.textContent=`No food logged for ${F.toLowerCase()}.`,v.length===0){$t.innerHTML="",nt.hidden=!1,nt.textContent="No food logged yet — add your first entry above.";return}let rt=v.slice().sort((C,X)=>X.date.localeCompare(C.date)).map(C=>{let X=C.date===Q;return`
          <li class="lt-history-row lt-food-day-row${X?" lt-food-day-row-active":""}" data-food-day-row="${C.date}">
            <button type="button" class="lt-history-main" data-food-day="${C.date}" aria-expanded="${X}">
              <span class="lt-history-weight">${xr(C.date)}</span>
              <span class="lt-history-e1rm">${Ve(C.calories)}</span>
            </button>
          </li>
        `}).join(""),G=T.map(C=>`
          <li class="lt-history-row lt-food-entry-row" data-food-entry-id="${C.id}">
            <button type="button" class="lt-history-main" data-food-edit-trigger="${C.id}">
              <span class="lt-history-weight">${Ge(C.title)}</span>
              <span class="lt-history-e1rm">${Ve(C.calories)}</span>
            </button>
          </li>
        `).join("");$t.innerHTML=`
      ${rt}
      <li class="lt-food-entry-heading" aria-hidden="true">${Ge(F)} entries</li>
      ${G}
    `,$t.querySelectorAll("[data-food-day]").forEach(C=>{C.addEventListener("click",()=>{Q=C.dataset.foodDay,Ft(),lt()})}),$t.querySelectorAll("[data-food-edit-trigger]").forEach(C=>{C.addEventListener("click",()=>ft(C.dataset.foodEditTrigger))})}function lt(){let v=zt(st);if(v.length===0){R.hidden=!0,J.hidden=!1,br();return}R.hidden=!1,J.hidden=!0,r.food.hidden||wr(A,v,{onPointClick:m=>{Q=m.date,Ft(),lt()}})}function ft(v){let m=$t.querySelector(`[data-food-entry-id="${v}"]`),T=st.find(F=>F.id===v);!m||!T||(m.innerHTML=`
      <form class="lt-edit-set-form" data-food-edit-form>
        <label>Food <input type="text" maxlength="80" value="${Vo(T.title)}" data-edit-food-title /></label>
        <label>Calories <input type="number" step="1" min="1" value="${T.calories}" data-edit-food-calories /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,m.querySelector("[data-edit-cancel]").addEventListener("click",Ft),m.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this food entry? You'll have a few seconds to undo it after.")&&(await ir(v),await bt(),Dt("Food entry deleted",{onUndo:async()=>{await lr(v),await bt()}}))}),m.querySelector("[data-food-edit-form]").addEventListener("submit",async F=>{F.preventDefault();let Z=m.querySelector("[data-edit-food-title]").value.trim(),at=Number(m.querySelector("[data-edit-food-calories]").value);!Z||!Number.isInteger(at)||at<=0||(await sr(v,{title:Z,calories:at}),await bt())}))}E.addEventListener("submit",async v=>{v.preventDefault();let m=P.value.trim(),T=Number(U.value);if(!m||!Number.isInteger(T)||T<=0)return;let F=new Date;await nr(m,T,F.toISOString()),Q=_(F.toISOString()),P.value="",U.value="",P.focus(),await bt()}),n(e),await L()}function Ge(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Vo(t){return Ge(t)}var Cr="lt-seen-rank-achievements";function Te(){let t=Ce(Cr,"");if(!t)return[];try{let e=JSON.parse(t);return Array.isArray(e)?e.filter(a=>typeof a=="string"):[]}catch{return[]}}function Dr(t){De(Cr,JSON.stringify(t))}var je="lt-active-workout";function Xe(){try{return window.localStorage.getItem(je)||null}catch{return null}}function ze(t){try{t?window.localStorage.setItem(je,t):window.localStorage.removeItem(je)}catch{}}function _r(t){let e=Xe();return e&&t.find(a=>a.id===e)||null}var Yo=120,Tr="lt-default-rest-seconds",$r="lt-lift-rest-seconds-",Mr="lt-rest-timer-enabled",wt=null,Je=null,Qe=null,ee=0,Tt=null;function qr(t){try{let e=window.localStorage.getItem(t);if(e===null||e==="")return null;let a=Number(e);return Number.isFinite(a)&&a>0?a:null}catch{return null}}function Rr(t,e){try{if(e===null||e===""){window.localStorage.removeItem(t);return}window.localStorage.setItem(t,String(e))}catch{}}function Ot(){return Nt(Mr,!1)}function Ar(t){_t(Mr,!!t)}function ta(){return qr(Tr)||Yo}function Ir(t){Rr(Tr,t)}function ea(t){return qr(`${$r}${t}`)}function Pr(t,e){Rr(`${$r}${t}`,e)}function $e(t){return ea(t)||ta()}function aa(){return wt||(wt=document.createElement("div"),wt.className="lt-rest-timer",wt.innerHTML=`
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `,wt.querySelector("[data-rest-add]").addEventListener("click",()=>{ee&&(ee+=30*1e3,Ze())}),wt.querySelector("[data-rest-skip]").addEventListener("click",Nr),document.body.appendChild(wt),wt)}function Go(t){let e=Math.max(0,Math.ceil(t/1e3)),a=Math.floor(e/60),r=String(e%60).padStart(2,"0");return`${a}:${r}`}function Ze(){let t=aa(),e=ee-Date.now();t.querySelector("[data-rest-time]").textContent=Go(e),e<=0&&Xo()}function ra(){clearInterval(Je),clearTimeout(Qe),Je=null,Qe=null}function jo(){try{ce(),Tt.state==="suspended"&&Tt.resume();let t=Tt.currentTime,e=Tt.createGain();e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(.08,t+.03),e.gain.exponentialRampToValueAtTime(1e-4,t+.75),e.connect(Tt.destination),[523.25,659.25].forEach((a,r)=>{let o=Tt.createOscillator();o.type="sine",o.frequency.setValueAtTime(a,t+r*.12),o.connect(e),o.start(t+r*.12),o.stop(t+.75)})}catch{}}function ce(){try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return;Tt||=new t,Tt.state==="suspended"&&Tt.resume()}catch{}}function Xo(){ra(),ee=0;let t=aa();t.classList.add("lt-rest-timer-done"),t.querySelector(".lt-rest-timer-label").textContent="Rest done",t.querySelector("[data-rest-time]").textContent="0:00",jo(),navigator.vibrate&&navigator.vibrate([120,70,120]),Qe=setTimeout(Nr,12e3)}function Nr(){ra(),ee=0,wt&&wt.classList.remove("lt-rest-timer-visible","lt-rest-timer-done")}function Me({seconds:t,liftName:e=""}={}){let a=Number(t);if(!Number.isFinite(a)||a<=0)return;let r=aa();ra(),ee=Date.now()+a*1e3,r.classList.remove("lt-rest-timer-done"),r.classList.add("lt-rest-timer-visible"),r.querySelector(".lt-rest-timer-label").textContent="Rest",r.querySelector("[data-rest-lift]").textContent=e,Ze(),Je=setInterval(Ze,250)}function Wr(t){return!Number.isFinite(t)||t<0?0:Math.min(t,1)}function na(t){return`${Math.round(Wr(t)*100)}%`}var zo={"rank-private":t=>M(t.totalDays,1,"workout day"),"rank-pfc":t=>M(t.totalDays,2,"workout days"),"rank-corporal":t=>M(t.totalDays,3,"workout days"),"rank-sergeant":t=>M(t.totalDays,5,"workout days"),"rank-staff-sergeant":t=>M(t.totalDays,7,"workout days"),"rank-master-sergeant":t=>M(t.totalDays,9,"workout days"),"rank-warrant-officer":t=>M(t.totalDays,11,"workout days"),"rank-lieutenant":t=>M(t.totalDays,13,"workout days"),"rank-captain":t=>M(t.totalDays,15,"workout days"),"rank-major":t=>M(t.totalDays,18,"workout days"),"rank-colonel":t=>M(t.totalDays,22,"workout days"),"rank-general":t=>M(t.totalDays,27,"workout days"),"rank-prestige":t=>M(t.totalDays,33,"workout days"),"rank-prestige-master":t=>M(t.totalDays,40,"workout days"),"mastery-uav-1":t=>M(t.tierCounts.uav,3,"UAVs"),"mastery-uav-2":t=>M(t.tierCounts.uav,10,"UAVs"),"mastery-predator-1":t=>M(t.tierCounts.predator,3,"Predators"),"mastery-predator-2":t=>M(t.tierCounts.predator,10,"Predators"),"mastery-harrier-1":t=>M(t.tierCounts.harrier,5,"Harriers"),"mastery-harrier-2":t=>M(t.tierCounts.harrier,15,"Harriers"),"mastery-chopper-1":t=>M(t.tierCounts.chopper,1,"Choppers"),"mastery-chopper-2":t=>M(t.tierCounts.chopper,3,"Choppers"),"streak-2":t=>M(t.longestStreak,2,"weeks"),"streak-3":t=>M(t.longestStreak,3,"weeks"),"streak-4":t=>M(t.longestStreak,4,"weeks"),"streak-5":t=>M(t.longestStreak,5,"weeks"),"streak-6":t=>M(t.longestStreak,6,"weeks"),"streak-8":t=>M(t.longestStreak,8,"weeks"),"capstone-tactical-nuke":t=>oa([M(t.totalDays,27,"workout days"),M(t.tierCounts.chopper,3,"Choppers")]),"capstone-moab":t=>oa([M(t.longestStreak,8,"week streak"),M(t.tierCounts.harrier,15,"Harriers")]),"capstone-dark-matter":t=>oa([M(t.totalDays,40,"workout days"),M(t.tierCounts.chopper,3,"Choppers")])};function M(t,e,a){let r=Number(t)||0,o=Number(e)||1;return{current:r,target:o,progress:Wr(r/o),currentLabel:`${r} / ${o} ${a}`}}function oa(t){return{...t.slice().sort((a,r)=>a.progress-r.progress)[0],progress:Math.min(...t.map(a=>a.progress)),currentLabel:t.map(a=>a.currentLabel).join(" - ")}}function Ur(t,e=null,a={}){let r=Be(t,e,a);return Qt(t,e,a).filter(n=>n.track!=="secret").map(n=>{let s=zo[n.id],f=s?s(r):{progress:n.unlocked?1:0,currentLabel:n.description};return{kind:"achievement",key:`achievement:${n.id}`,sourceKey:n.id,title:n.name,subtitle:n.track,progress:n.unlocked?1:f.progress,achieved:n.unlocked,currentLabel:f.currentLabel,targetLabel:n.description,detail:n.unlocked?"Achievement unlocked.":`${na(f.progress)} there.`}})}function Fr({achievementItems:t=[],events:e=[]}={}){let a=e.slice().sort((o,n)=>new Date(n.created_at)-new Date(o.created_at))[0]||null,r=t.filter(o=>!o.achieved&&o.progress>=.6).sort((o,n)=>n.progress-o.progress).slice(0,5);return{latest:a,closest:r}}async function Hr(){let[t,e,a,r,o,n]=await Promise.all([ct(),Gt(),we(),vt(),ge(),ye()]),s=t.length?await yt(t.map(f=>f.id)):[];return{lifts:t,workouts:e,workoutHistorySets:a,activeSets:s,events:[],bodyWeightEntries:r,userId:o,feedbackGiven:n,liftsById:new Map(t.map(f=>[f.id,f])),workoutsById:new Map(e.map(f=>[f.id,f]))}}function qe(t){let e=Ur(t.workoutHistorySets,t.userId,{bodyWeightEntries:t.bodyWeightEntries,hasSubmittedFeedback:t.feedbackGiven}),a=Fr({achievementItems:e,events:t.events});return{achievementItems:e,momentum:a}}var Or=[{key:"bench-press",name:"Bench Press",aliases:["bench","barbell bench press","bench press warmup","bench press 2","bench press 3"],equipment:["barbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep shoulder blades set.","Touch the same point on the chest each rep.","Drive the bar up and slightly back."]},{key:"bicep-curl",name:"Bicep Curl",aliases:["bicep curls","curl"],equipment:["dumbbell","barbell","cable"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep elbows close to your sides.","Avoid swinging the torso.","Control the lower."]},{key:"calf-raise",name:"Calf Raise",aliases:["calf raises","standing calf raise"],equipment:["bodyweight","machine","dumbbell"],primaryMuscles:["calves"],secondaryMuscles:[],movementPatterns:["ankle extension"],tutorialUrl:"",cues:["Pause briefly at the top.","Use a full stretch at the bottom.","Keep reps controlled."]},{key:"dumbbell-chest-press",name:"Dumbbell Chest Press",aliases:["dumbell chest press","db chest press","dumbbell bench press","db bench press"],equipment:["dumbbell","bench"],primaryMuscles:["chest"],secondaryMuscles:["triceps","front delts"],movementPatterns:["push","horizontal press"],tutorialUrl:"",cues:["Keep wrists stacked over elbows.","Lower with control.","Press up without letting shoulders roll forward."]},{key:"dumbbell-curl",name:"Dumbbell Curl",aliases:["dumbell curl","db curl"],equipment:["dumbbell"],primaryMuscles:["biceps"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep upper arms still.","Rotate naturally through the curl if comfortable.","Avoid using momentum."]},{key:"dumbbell-lateral-raise",name:"Dumbbell Lateral Raise",aliases:["dumbell lateral raise","lateral raise","db lateral raise"],equipment:["dumbbell"],primaryMuscles:["side delts"],secondaryMuscles:["traps"],movementPatterns:["shoulder abduction"],tutorialUrl:"",cues:["Lead with elbows.","Stop around shoulder height.","Use light enough weight to stay smooth."]},{key:"dumbbell-row",name:"Dumbbell Row",aliases:["dumbell row","db row","one arm dumbbell row","one-arm dumbbell row"],equipment:["dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbow toward the hip.","Keep the torso steady.","Reach long at the bottom without losing control."]},{key:"dumbbell-shoulder-press",name:"Dumbbell Shoulder Press",aliases:["dumbell shoulder press","db shoulder press","dumbbell overhead press"],equipment:["dumbbell"],primaryMuscles:["shoulders","front delts"],secondaryMuscles:["triceps","upper chest"],movementPatterns:["push","vertical press"],tutorialUrl:"",cues:["Keep ribs down.","Press slightly back over the shoulders.","Control the bottom position."]},{key:"forearm-twist",name:"Forearm Twist",aliases:["forearm twists","wrist twist","pronation supination"],equipment:["dumbbell"],primaryMuscles:["forearms"],secondaryMuscles:["grip"],movementPatterns:["forearm rotation"],tutorialUrl:"",cues:["Move slowly through rotation.","Keep the elbow supported if needed.","Use a light load."]},{key:"hammer-curl",name:"Hammer Curl",aliases:["hammer curls"],equipment:["dumbbell"],primaryMuscles:["biceps","brachialis"],secondaryMuscles:["forearms"],movementPatterns:["curl","elbow flexion"],tutorialUrl:"",cues:["Keep palms facing each other.","Control the lower.","Avoid shoulder swing."]},{key:"hip-thrust",name:"Hip Thrust",aliases:["hip thrusts","barbell hip thrust"],equipment:["barbell","bench"],primaryMuscles:["glutes"],secondaryMuscles:["hamstrings","quads"],movementPatterns:["hinge","hip extension"],tutorialUrl:"",cues:["Tuck ribs down.","Drive through the heels.","Pause with hips fully extended."]},{key:"lunge",name:"Lunge",aliases:["lunges","db lunge","dumbbell lunge"],equipment:["bodyweight","dumbbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","calves"],movementPatterns:["squat","single-leg"],tutorialUrl:"",cues:["Step far enough to stay balanced.","Keep front knee tracking over toes.","Control the descent."]},{key:"overhead-tricep-extension",name:"Overhead Tricep Extension",aliases:["overhead tricep extensions","tricep extension","overhead triceps extension"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep elbows pointed forward.","Lower behind the head with control.","Extend without flaring hard."]},{key:"rear-delt-fly",name:"Rear Delt Fly",aliases:["rear delt fly","rear delt raise","reverse fly"],equipment:["dumbbell","machine","cable"],primaryMuscles:["rear delts"],secondaryMuscles:["upper back","traps"],movementPatterns:["pull","shoulder horizontal abduction"],tutorialUrl:"",cues:["Keep a slight elbow bend.","Move from the shoulders.","Avoid shrugging through the rep."]},{key:"row",name:"Row",aliases:["rows","cable row","machine row","seated row"],equipment:["cable","machine","barbell","dumbbell"],primaryMuscles:["back","lats"],secondaryMuscles:["rear delts","biceps","traps"],movementPatterns:["pull","horizontal pull"],tutorialUrl:"",cues:["Pull elbows back.","Keep chest tall.","Control the reach forward."]},{key:"shrug",name:"Shrug",aliases:["shrugs","dumbbell shrug","barbell shrug"],equipment:["dumbbell","barbell"],primaryMuscles:["traps"],secondaryMuscles:["forearms"],movementPatterns:["scapular elevation"],tutorialUrl:"",cues:["Lift shoulders straight up.","Pause briefly at the top.","Avoid rolling the shoulders."]},{key:"squat",name:"Squat",aliases:["barbell squat","squat warmup","squat 2","squat 3"],equipment:["barbell"],primaryMuscles:["quads","glutes"],secondaryMuscles:["hamstrings","core"],movementPatterns:["squat"],tutorialUrl:"",cues:["Brace before descending.","Keep knees tracking over toes.","Drive through the whole foot."]},{key:"tricep-curl",name:"Tricep Curl",aliases:["tricep curls","triceps curl"],equipment:["dumbbell","cable"],primaryMuscles:["triceps"],secondaryMuscles:[],movementPatterns:["elbow extension"],tutorialUrl:"",cues:["Keep upper arms steady.","Fully extend with control.","Avoid using shoulder momentum."]},{key:"weighted-sit-up",name:"Weighted Sit-Up",aliases:["weighted sit ups","weighted sit ups 2","weighted situp","weighted sit-up"],equipment:["plate","dumbbell"],primaryMuscles:["abs"],secondaryMuscles:["hip flexors"],movementPatterns:["trunk flexion"],tutorialUrl:"",cues:["Keep the weight secure.","Curl the torso up under control.","Avoid yanking with the neck."]}];function Re(t){return String(t||"").toLowerCase().replace(/dumbell/g,"dumbbell").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ")}function Br(t){return[t.name,t.key,...t.aliases||[]]}function Jo(t,e){let a=Re(e);if(a.length<2)return null;let r=null;for(let o of Br(t)){let n=Re(o),s=null;n===a?s=0:n.startsWith(a)?s=1:n.includes(a)?s=2:a.split(" ").every(c=>n.includes(c))&&(s=3),s!=null&&(r==null||s<r)&&(r=s)}return r}function Kr(t,{limit:e=5}={}){return Or.map(a=>({entry:a,score:Jo(a,t)})).filter(a=>a.score!=null).sort((a,r)=>a.score-r.score||a.entry.name.localeCompare(r.entry.name)).slice(0,e).map(a=>a.entry)}function de(t){let e=String(t||"").trim();if(!e)return null;let a=Re(e);return Or.find(r=>r.key===e||r.key===a.replace(/\s+/g,"-")||Br(r).some(o=>Re(o)===a))||null}var Vr="lt-composite-expanded",sa="lt-header-menu-open",Yr="lt-momentum-expanded";async function Gr(t){let{data:{session:e}}=await k.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
          <span class="lt-momentum-title">PRs</span>
          <span class="lt-momentum-summary" data-momentum-summary>Loading PRs...</span>
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
  `;let r=t.querySelector("[data-hamburger-btn]"),o=t.querySelector("[data-header-actions]"),n=240,s=null;function f(i=!0){s&&(clearTimeout(s),s=null),o.classList.remove("lt-header-actions-open"),r.setAttribute("aria-expanded","false"),i&&_t(sa,!1),s=setTimeout(()=>{o.hidden=!0,s=null},n)}function c({persist:i=!0,instant:u=!1}={}){s&&(clearTimeout(s),s=null),o.hidden=!1,u?o.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>o.classList.add("lt-header-actions-open")),r.setAttribute("aria-expanded","true"),i&&_t(sa,!0)}r.addEventListener("click",()=>{o.hidden?c():f()}),o.addEventListener("click",i=>{i.target.closest("button")&&f()}),Nt(sa,!1)&&c({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",_a),t.querySelector("[data-calories-btn]").addEventListener("click",$a);let S=t.querySelector("[data-feedback-btn]");S&&S.addEventListener("click",()=>kr()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>k.auth.signOut());let p=t.querySelector("[data-composite-section]"),L=t.querySelector("[data-composite-toggle]"),q=t.querySelector("[data-composite-body]"),l=t.querySelector("[data-chevron]"),$=t.querySelector("[data-composite-summary]"),D=t.querySelector("[data-composite-discovery]"),I=t.querySelector("[data-momentum-toggle]"),N=t.querySelector("[data-momentum-body]"),V=t.querySelector("[data-momentum-summary]"),ot=t.querySelector("[data-momentum-chevron]");function z(i){L.setAttribute("aria-expanded",String(i)),q.hidden=!i,l.innerHTML=i?"&#9650;":"&#9660;",p.classList.toggle("lt-stats-row-expanded",i)}z(Nt(Vr,!0)),L.addEventListener("click",()=>{if(Lt(dt.composite),D.hidden=!0,window.matchMedia("(max-width: 359px)").matches){Ma();return}let i=L.getAttribute("aria-expanded")==="true";z(!i),_t(Vr,!i)});function O(i){I.setAttribute("aria-expanded",String(i)),N.hidden=!i,ot.innerHTML=i?"&#9650;":"&#9660;"}O(Nt(Yr,!1)),I.addEventListener("click",()=>{let i=I.getAttribute("aria-expanded")==="true";O(!i),_t(Yr,!i)});let K=t.querySelector("[data-killstreak-icon]"),ht=t.querySelector("[data-killstreak-label]"),mt=t.querySelector("[data-killstreak-sub]"),W=t.querySelector("[data-killstreak-new-badge]");t.querySelector("[data-killstreak-btn]").addEventListener("click",Ra);function it(i){let{days:u,tier:h}=Ee(i);K.textContent=h?h.icon:"🎯",ht.textContent=h?`${h.label} Killstreak`:"No Killstreak",mt.textContent=`${u} Day streak`;let Y=Qt(i).filter(H=>H.track==="rank"),B=Le(Y,Te()).length>0;W.hidden=!B}let y=t.querySelector("[data-weight-card]");function d(){Lt(dt.weight),Ta()}function w(i){Er(y,{onExpand:d,...i}).catch(u=>{console.error("[lift-tracker]",u),y.classList.remove("lt-stats-row-expanded"),y.innerHTML=`
        <div class="lt-weight-card-header">
          <h2>Weight</h2>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <p class="lt-weight-empty">Could not load weight right now.</p>
      `,y.querySelector("[data-weight-expand]").addEventListener("click",d)})}let E=t.querySelector("[data-history-discovery]");t.querySelector("[data-history-btn]").addEventListener("click",()=>{Lt(dt.history),E.hidden=!0,qa()});let P=t.querySelector("[data-add-lift-form]"),U=P.querySelector('input[name="name"]'),R=t.querySelector("[data-lift-suggestions]"),A=t.querySelector("[data-add-lift-toggle]"),J=t.querySelector("[data-add-lift-discovery]"),gt=t.querySelector("[data-add-lift-hint]"),nt=t.querySelector("[data-create-workout-btn]"),$t=t.querySelector("[data-create-workout-discovery]"),st=null;function Mt(){R.hidden=!0,R.innerHTML=""}function Bt(i){st=null;let u=Kr(i,{limit:4});if(u.length===0){Mt();return}R.hidden=!1,R.innerHTML=u.map(h=>`
      <button type="button" data-lift-suggestion="${pe(h.key)}">
        <span>${Ht(h.name)}</span>
        <small>${Ht([...h.primaryMuscles,...h.equipment||[]].slice(0,3).join(" · "))}</small>
      </button>
    `).join("")}U.addEventListener("input",()=>{let i=U.value.trim();if(i.length<2){st=null,Mt();return}Bt(i)}),R.addEventListener("click",i=>{let u=i.target.closest("[data-lift-suggestion]");if(!u)return;let h=de(u.dataset.liftSuggestion);h&&(st=h,U.value=h.name,Mt(),U.focus())}),A.addEventListener("click",()=>{let i=P.hidden;P.hidden=!i,A.setAttribute("aria-pressed",String(i)),A.classList.toggle("lt-add-lift-toggle-active",i),i?U.focus():(st=null,Mt())});let Q=t.querySelector("[data-lift-list]"),bt=t.querySelector("[data-list-empty]");nt.addEventListener("click",()=>{nt.disabled||Ca()});let Ut=t.querySelector("[data-workout-pills]"),Ft=t.querySelector("[data-workout-empty-hint]"),lt=[],ft=Xe();function v(){return ft&&lt.find(i=>i.id===ft)||null}function m(){let i=v();if(!i)return G;let u=new Set(i.liftIds);return G.filter(h=>u.has(h.id))}function T(){Ut.innerHTML=lt.map(i=>{let u=i.id===ft;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${i.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${i.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${i.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let i of lt){let u=Ut.querySelector(`[data-workout-pill="${i.id}"] [data-workout-pill-name]`);u&&(u.textContent=i.name)}Ut.querySelectorAll("[data-workout-pill]").forEach(i=>{i.addEventListener("click",()=>{let u=i.dataset.workoutPill;ft=ft===u?null:u,ze(ft),T(),Pe(ae),ha(ae)})}),Ut.querySelectorAll("[data-workout-edit]").forEach(i=>{i.addEventListener("click",u=>{u.stopPropagation(),Da(i.dataset.workoutEdit)})})}let F="lt-fast-mode",Z="lt-burst-mode";function at(){try{let i=window.localStorage.getItem(F);if(i!==null)return i==="true";let u=window.localStorage.getItem(Z);return u!==null?(window.localStorage.setItem(F,u),window.localStorage.removeItem(Z),u==="true"):!1}catch{return!1}}function rt(i){try{window.localStorage.setItem(F,String(i))}catch{}}let G=[],C=at(),X=new Map,ae=[],Kt=null,ue=t.querySelector("[data-mode-toggle]");function ma(){ue.textContent=C?"Normal":"Fast",ue.setAttribute("aria-pressed",String(C)),ue.classList.toggle("lt-mode-toggle-active",C)}ma(),ue.addEventListener("click",()=>{C=!C,rt(C),ma(),Pe(ae)}),P.addEventListener("submit",async i=>{i.preventDefault();let u=P.querySelector('input[name="name"]'),h=u.value.trim();if(!h)return;let Y=st&&st.name===h?st:de(h);u.value="",st=null,Mt(),u.disabled=!0;try{await Yt(h,G.length,{dictionary_key:Y?.key||null}),await fa()}finally{u.disabled=!1,u.focus()}}),ie(Q,{onReorder:async i=>{let u=[...i],h=new Set(i),Y=G.map(B=>h.has(B.id)?u.shift():B.id);await Wa(Y),G=Y.map(B=>G.find(H=>H.id===B)).filter(Boolean)}}),ie(Ut,{axis:"x",onReorder:async i=>{await Ya(i),lt=i.map(u=>lt.find(h=>h.id===u)).filter(Boolean)}});async function fa(){let i=await Hr();Kt=i,lt=i.workouts,ft&&!lt.some(H=>H.id===ft)&&(ft=null,ze(null)),T(),G=i.lifts;let u=G.length>=2;if(J.hidden=G.length>=2,gt.hidden=G.length!==1,nt.disabled=!u,nt.setAttribute("aria-disabled",String(!u)),$t.hidden=!u||lt.length>0,Ft.hidden=!u||lt.length>0,G.length===0){Q.innerHTML="",bt.hidden=!1,bt.textContent="Start by adding your first lift above. Once it exists, you can log sets and build workouts around it.",gt.hidden=!0,p.hidden=!0,it(i.workoutHistorySets),Ne(qe(i).momentum,i),w({showDiscovery:!1}),E.hidden=!0,D.hidden=!0,X=new Map,ae=[];return}let h=i.activeSets,Y=h.length>0;it(i.workoutHistorySets),Ne(qe(i).momentum,i),w({showDiscovery:Y&&!_e(dt.weight)}),E.hidden=!Y||_e(dt.history),X=new Map(G.map(H=>[H.id,[]]));for(let H of h){let tt=X.get(H.lift_id);tt&&tt.push(H)}let B=G.map(H=>({liftId:H.id,dailySeries:Ct(X.get(H.id)||[])}));Pe(B),ha(B)}function ha(i){let u=v(),h=u?i.filter(me=>u.liftIds.includes(me.liftId)):i,Y=jt(h);p.hidden=!1;let B=t.querySelector("[data-composite-canvas]"),H=t.querySelector("[data-composite-empty]"),tt=t.querySelector("[data-composite-scope]"),Vt=t.querySelector("[data-composite-blurb]");if(tt.textContent=u?`Measuring ${u.name}`:"Measuring all lifts",Vt.textContent=u?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",H.textContent=u?`Log a few sets for lifts in ${u.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",Y.length===0){B.hidden=!0,H.hidden=!1,$.textContent="",D.hidden=!0;return}B.hidden=!1,H.hidden=!0,$.textContent=cr(Y[Y.length-1].pct),D.hidden=_e(dt.composite),Se(B,Y)}function Ie(i){let u=Ct(X.get(i)||[]),h=u[u.length-1];return h?`${Math.round(h.e1rm)} lb e1RM`:"No sets yet"}function ko(i){let u=X.get(i)||[];return u.length===0?"":u[u.length-1].weight}function Pe(i){ae=i;let u=m();bt.hidden=u.length>0,bt.textContent=ft?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",Q.innerHTML=u.map(h=>C?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${h.id}" data-lift-id="${h.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${h.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Ie(h.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${pe(h.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${h.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${ko(h.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${h.id}" data-lift-id="${h.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${h.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${Ie(h.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${pe(h.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let h of G){let B=Q.querySelector(`[data-lift-id="${h.id}"]`)?.querySelector("[data-name-slot]");B&&(B.textContent=h.name)}Q.querySelectorAll("[data-open-lift]").forEach(h=>{h.addEventListener("click",()=>fe(h.dataset.openLift))}),C&&vo()}function vo(){Q.querySelectorAll("[data-fast-log-form]").forEach(i=>{let u=i.dataset.fastLogForm;i.addEventListener("submit",async h=>{h.preventDefault();let Y=i.querySelector("[data-fast-weight]"),B=i.querySelector("[data-fast-reps]"),H=i.querySelector("[data-fast-feedback]"),tt=Number(Y.value),Vt=Number(B.value);if(!(tt>=0)||!Number.isFinite(tt)||!(Vt>0)||!Number.isInteger(Vt))return;let me=X.get(u)||[],Eo=et(tt,Vt),ya=ke(Eo,me),wa=new Date().toISOString();Ot()&&ce();let ba=await kt(u,tt,Vt,wa),Lo=G.find(We=>We.id===u);Ot()&&Me({seconds:$e(u),liftName:Lo?.name||""});let ka=[...me,ba];X.set(u,ka),B.value="",B.focus();let va=Q.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");va&&(va.textContent=Ie(u));let Co=_(wa),Sa=St(ka.filter(We=>_(We.performed_at)===Co));H.hidden=!1,H.classList.toggle("lt-pr",ya),H.textContent=ya?`PR! ${Math.round(Sa)} lb today`:`Logged · ${Math.round(Sa)} lb today`,Kt&&(Kt.activeSets=[...Kt.activeSets,ba],Ne(qe(Kt).momentum,Kt))})})}function Ne(i,u={}){let h=So(u).slice(0,4),Y=h[0],B=i.closest||[],H=B[0];V.textContent=Y?`Latest: ${Y.liftName}`:H?`Closest: ${H.title} · ${na(H.progress)}`:"No PRs yet",N.innerHTML=`
      <div class="lt-momentum-grid">
        <section>
          <h3>Recent PRs</h3>
          ${h.length?h.map(tt=>`
            <article class="lt-momentum-item lt-momentum-item-achieved">
              <span>${Ht(tt.liftName)}</span>
              <small>${Ht(tt.summary)}</small>
            </article>
          `).join(""):'<p class="lt-empty">New personal records will show here.</p>'}
        </section>
        <section>
          <h3>Close Achievements</h3>
          ${B.length?B.map(tt=>`
            <article class="lt-momentum-item">
              <span>${Ht(tt.title)}</span>
              <small>${Ht(tt.currentLabel)} · ${Ht(tt.detail)}</small>
              <span class="lt-progress-bar"><span style="width: ${Math.round(tt.progress*100)}%"></span></span>
            </article>
          `).join(""):'<p class="lt-empty">Keep logging to surface close achievements.</p>'}
        </section>
      </div>
      <button type="button" class="lt-secondary-btn" data-open-prs>View PRs</button>
    `,N.querySelector("[data-open-prs]").addEventListener("click",Aa)}function So(i){let u=i.liftsById||new Map((i.lifts||[]).map(h=>[h.id,h]));return Xt(i.activeSets||[]).map(h=>{let Y=u.get(h.liftId)?.name||"Lift";return{...h,liftName:Y,summary:`${xo(h.performed_at)} · ${ga(h.weight)} lb x ${ga(h.reps)} · ${Math.round(h.e1rm)} e1RM`}})}function xo(i){return new Date(i).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function ga(i){let u=Number(i);return Number.isFinite(u)?Number.isInteger(u)?String(u):String(Math.round(u*10)/10):String(i)}function pe(i){return String(i).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}function Ht(i){return pe(i)}await fa()}async function Xr(t){let e=await ct(),a=e.length?await yt(e.map(n=>n.id)):[],r=new Map(e.map(n=>[n.id,n])),o=Xt(a).slice(0,40);t.innerHTML=`
    <header class="lt-weight-view-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Recent PRs</h1>
    </header>

    <section class="lt-prs-section">
      <h2 class="lt-prs-heading">Personal Records</h2>
      <p class="lt-composite-blurb">
        These are sets that beat that lift's previous best estimated 1RM. Your first set on a lift starts the baseline; later jumps show here.
      </p>
      ${o.length?`
        <div class="lt-pr-list">
          ${o.map(n=>Qo(n,r.get(n.liftId))).join("")}
        </div>
      `:`
        <p class="lt-empty">No PRs yet. Log a few sessions for the same lift and new records will collect here.</p>
      `}
    </section>
  `,t.querySelector("[data-back]").addEventListener("click",j),t.querySelectorAll("[data-open-lift]").forEach(n=>{n.addEventListener("click",()=>fe(n.dataset.openLift))})}function Qo(t,e){let a=e?.name||"Lift";return`
    <article class="lt-pr-card">
      <button type="button" class="lt-pr-card-main" data-open-lift="${Zr(t.liftId)}">
        <span class="lt-pr-card-title">${Zo(a)}</span>
        <span class="lt-pr-card-sub">${Qr(t.performed_at)} · ${Jr(t)} · ${Math.round(t.e1rm)} e1RM</span>
      </button>
      <span class="lt-pr-card-side">+${Math.max(1,Math.round(t.improvement))}</span>
    </article>
  `}function zr(t){return t.length===0?'<p class="lt-lift-prs-empty">No PRs yet. Keep logging this lift to build a record trail.</p>':t.map(e=>`
    <article class="lt-lift-pr-row">
      <span>
        <strong>${Jr(e)}</strong>
        <small>${Qr(e.performed_at)} · ${Math.round(e.e1rm)} e1RM</small>
      </span>
      <em>+${Math.max(1,Math.round(e.improvement))}</em>
    </article>
  `).join("")}function Jr(t){return`${jr(t.weight)} lb x ${jr(t.reps)}`}function jr(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):String(t)}function Qr(t){return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}function Zr(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function Zo(t){return Zr(t)}var tn=2.5;function Ae(t){let e=Number(t);return Number.isFinite(e)?Number.isInteger(e)?String(e):String(Math.round(e*10)/10):""}function en(t){return Math.round(Number(t)*2)/2}function an(t){return t.slice().sort((e,a)=>new Date(e.performed_at)-new Date(a.performed_at))}function rn(t){return t.reduce((e,a)=>{if(!e)return a;let r=et(Number(e.weight),Number(e.reps));return et(Number(a.weight),Number(a.reps))>r?a:e},null)}function on(t){let e=new Map;for(let a of an(t)){let r=_(a.performed_at);e.has(r)||e.set(r,[]),e.get(r).push(a)}return Array.from(e.entries()).sort((a,r)=>a[0].localeCompare(r[0]))}function to(t,{weightStep:e=tn}={}){let a=on(t||[]),r=a[a.length-1];if(!r)return{baseline:null,context:null,options:[]};let[o,n]=r,s=a[a.length-2]||null,f=rn(n),c=Number(f.weight),g=Number(f.reps),b=en(c+e),S=Math.max(1,g-2),x={date:o,latestVolume:St(n),previousVolume:s?St(s[1]):null,sessionSetCount:n.length};return{baseline:{weight:c,reps:g,e1rm:et(c,g),label:`${Ae(c)} lb x ${g}`,date:o},context:x,options:[{id:"reps",label:"Add reps",title:`${Ae(c)} lb x ${g+1}`,description:"Same weight, one more rep.",weight:c,reps:g+1},{id:"weight",label:"Add weight",title:`${Ae(b)} lb x ${S}`,description:"A heavier set with a small rep drop.",weight:b,reps:S},{id:"volume",label:"Add volume",title:`Extra set: ${Ae(c)} lb x ${g}`,description:"Repeat your best recent set to raise session volume.",weight:c,reps:g}]}}async function eo(t,e){let a=await Pa(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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

    <section class="lt-lift-prs" data-lift-prs></section>

    <div class="lt-tabs" role="tablist">
      <button type="button" class="lt-tab" data-tab="history" role="tab" aria-selected="true">History</button>
      <button type="button" class="lt-tab" data-tab="details" role="tab" aria-selected="false">Details</button>
    </div>

    <section data-tab-panel="history"></section>
    <section data-tab-panel="details" hidden></section>
  `,t.querySelector("[data-back]").addEventListener("click",j);let r=t.querySelector("[data-name-input]");r.value=a.name;let o=a.name;r.addEventListener("keydown",y=>{y.key==="Enter"&&r.blur()}),r.addEventListener("blur",async()=>{let y=r.value.trim();if(!y||y===o){r.value=o;return}o=y,await Na(e,y)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${o}"? You'll have a few seconds to undo it after.`)&&(await Ua(e),j(),Dt(`Deleted "${o}"`,{onUndo:async()=>{await Fa(e),he()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),s={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(y=>{y.addEventListener("click",()=>{n.forEach(d=>d.setAttribute("aria-selected",String(d===y))),Object.entries(s).forEach(([d,w])=>{w.hidden=d!==y.dataset.tab}),y.dataset.tab==="details"&&W()})});let f=t.querySelector("[data-log-form]"),c=t.querySelector("[data-weight-input]"),g=t.querySelector("[data-reps-input]"),b=t.querySelector("[data-log-feedback]"),S=t.querySelector("[data-default-rest-input]"),x=t.querySelector("[data-lift-rest-input]"),p=t.querySelector("[data-rest-enabled-input]"),L=t.querySelector("[data-rest-enabled-label]"),q=t.querySelector("[data-default-rest-field]"),l=t.querySelector("[data-lift-rest-field]"),$=t.querySelector("[data-lift-prs]"),D=[];function I(){S.value=ta(),x.value=ea(e)||"";let y=Ot();p.checked=y,L.textContent=y?"Rest timer: On":"Rest timer: Off",S.disabled=!y,x.disabled=!y,q.classList.toggle("lt-rest-setting-field-disabled",!y),l.classList.toggle("lt-rest-setting-field-disabled",!y)}function N(y){let d=Number(y.value);return y.value===""?null:!Number.isFinite(d)||d<15?15:d>600?600:Math.round(d)}S.addEventListener("change",()=>{let y=N(S)||120;Ir(y),I()}),x.addEventListener("change",()=>{let y=N(x);Pr(e,y),I()}),p.addEventListener("change",()=>{Ar(p.checked),I()});async function V(){D=await Ha(e)}function ot(){if(D.length===0)return;let y=D[D.length-1];c.value=y.weight}f.addEventListener("submit",async y=>{y.preventDefault();let d=Number(c.value),w=Number(g.value);if(!(d>=0)||!Number.isFinite(d)||!(w>0)||!Number.isInteger(w))return;let E=et(d,w),U=ke(E,D),R=new Date;Ot()&&ce(),await kt(e,d,w,R.toISOString()),Ot()&&Me({seconds:$e(e),liftName:o}),g.value="",g.focus(),await V(),K(),s.details.hidden||W(),it();let A=_(R.toISOString()),J=St(D.filter(gt=>_(gt.performed_at)===A));b.hidden=!1,b.classList.toggle("lt-pr",U),b.textContent=U?`New PR! Today's volume: ${Math.round(J)} lb`:`Logged. Today's volume: ${Math.round(J)} lb`});function z(y){let d=new Map;for(let w of y){let E=_(w.performed_at);d.has(E)||d.set(E,[]),d.get(E).push(w)}return Array.from(d.entries()).sort((w,E)=>E[0].localeCompare(w[0]))}function O(y){let[d,w,E]=y.split("-").map(Number);return new Date(d,w-1,E).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function K(){let y=s.history;if(D.length===0){y.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let d=z(D);y.innerHTML=d.map(([w,E])=>{let P=St(E),R=E.slice().sort((A,J)=>new Date(J.performed_at)-new Date(A.performed_at)).map(A=>{let J=Math.round(et(Number(A.weight),Number(A.reps)));return`
              <li class="lt-history-row" data-set-id="${A.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${A.id}">
                  <span class="lt-history-weight">${A.weight} lb &times; ${A.reps}</span>
                  <span class="lt-history-e1rm">${J} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${O(w)}</span>
              <span class="lt-history-volume">${Math.round(P)} lb volume</span>
            </div>
            <ul class="lt-history-list">${R}</ul>
          </div>
        `}).join(""),y.querySelectorAll("[data-edit-trigger]").forEach(w=>{w.addEventListener("click",()=>mt(w.dataset.editTrigger))})}function ht(y){return s.history.querySelector(`[data-set-id="${y}"]`)}function mt(y){let d=ht(y),w=D.find(E=>E.id===y);!d||!w||(d.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${w.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${w.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${_(w.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,d.querySelector("[data-edit-cancel]").addEventListener("click",K),d.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Ka(y),await V(),K(),s.details.hidden||W(),Dt("Set deleted",{onUndo:async()=>{await Va(y),await V(),K(),s.details.hidden||W()}})}),d.querySelector("[data-edit-form]").addEventListener("submit",async E=>{E.preventDefault();let P=Number(d.querySelector("[data-edit-weight]").value),U=Number(d.querySelector("[data-edit-reps]").value),R=d.querySelector("[data-edit-date]").value;if(!(P>=0)||!(U>0)||!R)return;let A=new Date(w.performed_at),[J,gt,nt]=R.split("-").map(Number);A.setFullYear(J,gt-1,nt),await Ba(y,{weight:P,reps:U,performed_at:A.toISOString()}),await V(),K(),s.details.hidden||W()}))}function W(){let y=s.details,d=Ct(D);if(d.length===0){y.innerHTML='<p class="lt-empty">No sets logged yet.</p>',hr();return}let w=to(D),E=de(a.dictionary_key||o);y.innerHTML=`
      ${nn(E)}
      ${sn(w)}
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `,y.querySelectorAll("[data-progression-option]").forEach(R=>{R.addEventListener("click",()=>{let A=w.options.find(J=>J.id===R.dataset.progressionOption);A&&(c.value=A.weight,g.value=A.reps,b.hidden=!0,f.scrollIntoView({behavior:"smooth",block:"start"}),g.focus())})});let P=y.querySelector("[data-lift-canvas]"),U=y.querySelector("[data-point-detail]");fr(P,d,{onPointClick:R=>{U.hidden=!1,U.textContent=`${O(R.date)}: ${R.weight} lb × ${R.reps} (${Math.round(R.e1rm)} e1RM)`}})}await V(),I(),ot(),K(),it();function it(){let y=Xt(D).slice(0,3);$.innerHTML=`
      <div class="lt-lift-prs-header">
        <span>Recent PRs</span>
      </div>
      ${zr(y)}
    `}}function nn(t){if(!t)return"";let e=t.primaryMuscles.map(n=>`<span>${ut(n)}</span>`).join(""),a=t.secondaryMuscles.map(n=>`<span>${ut(n)}</span>`).join(""),r=t.equipment.map(n=>`<span>${ut(n)}</span>`).join(""),o=t.movementPatterns.map(n=>`<span>${ut(n)}</span>`).join("");return`
    <section class="lt-lift-info-card">
      <div class="lt-lift-info-header">
        <span>Lift Info</span>
        <strong>${ut(t.name)}</strong>
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
        <div class="lt-lift-info-tags">${r||"<span>Not listed</span>"}</div>
      </div>
      <div class="lt-lift-info-group">
        <h3>Pattern</h3>
        <div class="lt-lift-info-tags">${o||"<span>Not listed</span>"}</div>
      </div>
      ${t.cues?.length?`
        <ul class="lt-lift-info-cues">
          ${t.cues.map(n=>`<li>${ut(n)}</li>`).join("")}
        </ul>
      `:""}
      ${t.tutorialUrl?`<a class="lt-lift-info-link" href="${ut(t.tutorialUrl)}" target="_blank" rel="noopener noreferrer">Watch tutorial</a>`:'<p class="lt-lift-info-empty">Tutorial link not set yet.</p>'}
    </section>
  `}function sn(t){if(!t.baseline)return"";let e=t.context.previousVolume==null?`${Math.round(t.context.latestVolume)} lb last session`:`${Math.round(t.context.latestVolume)} lb last session · ${Math.round(t.context.previousVolume)} lb previous`;return`
    <section class="lt-progression-card">
      <div class="lt-progression-header">
        <span>Progression Options</span>
        <small>Based on ${ut(t.baseline.label)}</small>
      </div>
      <p class="lt-progression-context">${ut(e)}</p>
      <div class="lt-progression-options">
        ${t.options.map(a=>`
          <button type="button" class="lt-progression-option" data-progression-option="${ut(a.id)}">
            <span>${ut(a.label)}</span>
            <strong>${ut(a.title)}</strong>
            <small>${ut(a.description)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `}function ut(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var ao=60;function ro(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-ao),e}function Wt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function ln(t){return t.map(e=>({date:e.date||_(e.logged_at),waist:Number(e.waist??e.waist_circumference),sortAt:e.logged_at||e.date})).filter(e=>Number.isFinite(e.waist)&&e.date).sort((e,a)=>new Date(e.sortAt)-new Date(a.sortAt))}function ia(t,e,a=new Date,r=`last ${ao} days`,o=[],n=[],s=[]){let f=_(a.toISOString()),c=[`Lift Tracker — ${r} (as of ${f})`,""],g=t.filter(S=>(e.get(S.id)||[]).length>0);if(g.length===0)c.push("No sets logged in this period."),c.push("");else{for(let x of g){let p=(e.get(x.id)||[]).slice().sort((l,$)=>new Date(l.performed_at)-new Date($.performed_at)),L=St(p),q=Math.max(...p.map(l=>et(Number(l.weight),Number(l.reps))));c.push(x.name);for(let l of p){let $=Math.round(et(Number(l.weight),Number(l.reps)));c.push(`  ${_(l.performed_at)}: ${l.weight} lb x ${l.reps} (e1RM ${$})`)}c.push(`  Sets: ${p.length} | Volume: ${Math.round(L)} lb | Best e1RM: ${Math.round(q)}`),c.push("")}let S=t.length-g.length;S>0&&(c.push(`(${S} lift${S===1?"":"s"} with no sets in this period omitted)`),c.push(""))}if(o.length>0){c.push("Body weight");for(let q of o)c.push(`  ${q.date}: ${Wt(q.weight)} lb`);let S=o[0].weight,x=o[o.length-1].weight,p=x-S,L=p>0?"+":"";c.push(`  Start: ${Wt(S)} lb | Current: ${Wt(x)} lb | Change: ${L}${Wt(p)} lb`),c.push("")}let b=ln(n);if(b.length>0){c.push("Waist");for(let q of b)c.push(`  ${q.date}: ${Wt(q.waist)} in`);let S=b[0].waist,x=b[b.length-1].waist,p=x-S,L=p>0?"+":"";c.push(`  Start: ${Wt(S)} in | Current: ${Wt(x)} in | Change: ${L}${Wt(p)} in`),c.push("")}if(s.length>0){c.push("Calories");for(let p of s)c.push(`  ${p.date}: ${Math.round(Number(p.calories))} cal`);let S=s.reduce((p,L)=>p+Number(L.calories),0),x=S/s.length;c.push(`  Days logged: ${s.length} | Total: ${Math.round(S)} cal | Avg/day: ${Math.round(x)} cal`),c.push("")}return c.join(`
`).trimEnd()}var cn=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],dn=`
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
`;async function oo(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${cn.map(p=>`
          <section class="lt-help-section">
            <h2>${p.title}</h2>
            <p>${p.body}</p>
          </section>
          ${p.title==="Export progress"?dn:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",j);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),r=t.querySelector("[data-export-chevron]"),o=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),s=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let L=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(L)),a.hidden=!L,r.innerHTML=L?"&#9650;":"&#9660;",!!L){e.disabled=!0;try{let q=await ct(),l=q.map(W=>W.id),$=ro().toISOString(),D=await Oa(l,$),I=new Map(q.map(W=>[W.id,[]]));for(let W of D){let it=I.get(W.lift_id);it&&it.push(W)}let V=(await vt()).filter(W=>new Date(W.logged_at)>=new Date($)),ot=qt(V),O=(await re()).filter(W=>new Date(W.logged_at)>=new Date($)),K=new Date,ht=await oe($,K.toISOString()),mt=zt(ht);o.value=ia(q,I,K,void 0,ot,O,mt),s.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{o.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(o.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}s.hidden=!1,s.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let f=t.querySelector("[data-full-export-toggle]"),c=t.querySelector("[data-full-export-body]"),g=t.querySelector("[data-full-export-chevron]"),b=t.querySelector("[data-full-export-textarea]"),S=t.querySelector("[data-full-export-copy]"),x=t.querySelector("[data-full-export-status]");f.addEventListener("click",async()=>{let L=!(f.getAttribute("aria-expanded")==="true");if(f.setAttribute("aria-expanded",String(L)),c.hidden=!L,g.innerHTML=L?"&#9650;":"&#9660;",!!L){f.disabled=!0;try{let q=await ct(),l=q.map(O=>O.id),$=await yt(l),D=new Map(q.map(O=>[O.id,[]]));for(let O of $){let K=D.get(O.lift_id);K&&K.push(O)}let I=await vt(),N=qt(I),V=await re(),ot=await oe("1970-01-01T00:00:00.000Z",new Date().toISOString()),z=zt(ot);b.value=ia(q,D,new Date,"all-time",N,V,z),x.hidden=!0}finally{f.disabled=!1}}}),S.addEventListener("click",async()=>{b.select();let p=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(b.value),p=!0}catch{p=!1}if(!p)try{p=document.execCommand("copy")}catch{p=!1}x.hidden=!1,x.textContent=p?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function no(t){Lt(dt.composite),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-scope" data-composite-scope></p>
    <p class="lt-composite-blurb" data-composite-blurb></p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",j);let[e,a]=await Promise.all([ct(),Gt()]),r=_r(a),o=r?e.filter(p=>r.liftIds.includes(p.id)):e,n=o.length?await yt(o.map(p=>p.id)):[],s=new Map(o.map(p=>[p.id,[]]));for(let p of n){let L=s.get(p.lift_id);L&&L.push(p)}let f=o.map(p=>({liftId:p.id,dailySeries:Ct(s.get(p.id)||[])})),c=jt(f),g=t.querySelector("[data-composite-canvas]"),b=t.querySelector("[data-composite-empty]"),S=t.querySelector("[data-composite-scope]"),x=t.querySelector("[data-composite-blurb]");if(S.textContent=r?`Measuring ${r.name}`:"Measuring all lifts",x.textContent=r?"Your average strength gain across the lifts in this workout, relative to where each one started.":"Your average strength gain across all lifts, relative to where each one started.",b.textContent=r?`Log a few sets for lifts in ${r.name} to see this workout's composite progress.`:"Log a few workouts to see your composite progress.",c.length===0){g.hidden=!0,b.hidden=!1;return}g.hidden=!1,b.hidden=!0,Se(g,c)}function un(t){let[e,a,r]=t.split("-").map(Number);return new Date(e,a-1,r).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function pn(){let t=await ct(),e=new Map(t.map(r=>[r.id,r.name]));return(await yt(t.map(r=>r.id))).map(r=>({...r,liftName:e.get(r.lift_id)||"Unknown lift"}))}function mn(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let r=Array.from(a.entries()).map(([n,s])=>{let c=s.slice().sort((g,b)=>new Date(g.performed_at)-new Date(b.performed_at)).map(g=>{let b=Math.round(et(Number(g.weight),Number(g.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${g.weight} lb &times; ${g.reps}</span>
                <span class="lt-history-e1rm">${b} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${c}</ul>
        </div>
      `}).join(""),o=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${un(t)}</span>
        <span class="lt-history-volume">${o} lift${o===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${r}
    </div>
  `}async function so(t){Lt(dt.history),t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",j);let e=t.querySelector("[data-history-content]"),a=await pn();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let r=dr(a);e.innerHTML=r.map(([o,n])=>mn(o,n)).join("")}var io="lt-theme",la="default";function ca(){return Ce(io,la)}function lo(t){!t||t===la?delete document.documentElement.dataset.ltTheme:document.documentElement.dataset.ltTheme=t}function co(t){lo(t),De(io,t||la)}function uo(){lo(ca())}var fn={rank:"Rank",mastery:"Killstreak Mastery",streak:"Consistency",capstone:"Capstone",secret:"Secrets"},hn=["rank","mastery","streak","capstone","secret"],gn="Hidden until unlocked.";async function po(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",j);let e=await we(),a=await vt(),r=await ge(),o=await ye(),{days:n,tier:s}=Ee(e);t.querySelector("[data-killstreak-current-icon]").textContent=s?s.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=s?`${s.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${n} Day streak`;let f=Oe(e,r),c=t.querySelector("[data-killstreak-tier-list]");c.innerHTML=le.map(l=>{let $=f[l.key];return`
      <li class="lt-killstreak-tier-row${s?.key===l.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${l.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${l.label}</span>
          <span class="lt-killstreak-tier-req">${l.days}+ day${l.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${$} earned</span>
      </li>
    `}).join("");let g=Qt(e,r,{bodyWeightEntries:a,hasSubmittedFeedback:o}),b=g.filter(l=>l.unlocked).length;t.querySelector("[data-achievements-summary]").textContent=`${b} / ${g.length} unlocked. Each badge stays unlocked for good once you've earned it.`;let S=g.filter(l=>l.track==="rank"),x=new Set(Le(S,Te()));Dr(S.filter(l=>l.unlocked).map(l=>l.id));let p=t.querySelector("[data-achievements]");function L(l){if(l.track!=="rank"){let V=l.track==="secret"&&!l.unlocked,ot=V?" lt-achievement-card-desc-hidden":"",z=V?gn:l.description,O=l.flavor&&!V?`<span class="lt-achievement-card-flavor">${l.flavor}</span>`:"";return`
        <li class="lt-achievement-card${l.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}">
          <span class="lt-achievement-card-icon">${l.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${l.name}</span>
            <span class="lt-achievement-card-desc${ot}">${z}</span>
            ${O}
          </span>
        </li>
      `}let $=l.unlocked&&ca()===l.theme.id,D=l.unlocked&&x.has(l.id),I=l.unlocked?`<span class="lt-achievement-card-theme">${l.theme.label} theme${$?" selected":""}</span>`:`<span class="lt-achievement-card-theme lt-achievement-card-theme-locked">🎨 Unlocks: ${l.theme.label}</span>`,N=D?'<span class="lt-achievement-card-new-theme">New theme unlocked</span>':"";return`
      <li class="lt-achievement-card${l.unlocked?" lt-achievement-card-unlocked":" lt-achievement-card-locked"}${D?" lt-achievement-card-new":""}${$?" lt-achievement-card-active-theme":""}">
        <button type="button" class="lt-achievement-card-btn" data-apply-theme="${l.theme.id}"${l.unlocked?"":" disabled"} aria-label="${l.unlocked?`Apply the ${l.theme.label} theme`:`Locked: ${l.name}`}">
          <span class="lt-achievement-card-icon">${l.unlocked?"🎖️":"🔒"}</span>
          <span class="lt-achievement-card-info">
            <span class="lt-achievement-card-name">${l.name}</span>
            <span class="lt-achievement-card-desc">${l.description}</span>
            ${I}
            ${N}
          </span>
        </button>
      </li>
    `}function q(){p.innerHTML=hn.map(l=>{let D=g.filter(I=>I.track===l).sort((I,N)=>Number(N.unlocked)-Number(I.unlocked)).map(L).join("");return`
        <section class="lt-achievement-track">
          <h3 class="lt-achievement-track-heading">${fn[l]}</h3>
          ${l==="rank"?'<p class="lt-achievement-track-note">Ranks unlock themes. Try out a theme below.</p>':""}
          <ul class="lt-achievement-list">${D}</ul>
        </section>
      `}).join("")}q(),p.addEventListener("click",l=>{let $=l.target.closest("[data-apply-theme]");!$||$.disabled||(co($.dataset.applyTheme),q())})}var mo="__divider__";async function da(t,{mode:e,workoutId:a}={}){let r=e==="edit",[o,n]=await Promise.all([ct(),r?Ga(a):Promise.resolve(null)]);if(r&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let s=new Set(r?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${r?fo(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",j);let f=t.querySelector("[data-workout-name-input]"),c=t.querySelector("[data-workout-lift-list]"),g=t.querySelector("[data-workout-lifts-empty]"),b=t.querySelector("[data-save-workout]"),S=t.querySelector("[data-workout-save-feedback]");g.hidden=o.length>0;let x=o.filter(l=>s.has(l.id)),p=o.filter(l=>!s.has(l.id));c.innerHTML=[...x.map(L),q(),...p.map(L)].join("");for(let l of o){let D=c.querySelector(`[data-lift-id="${l.id}"]`)?.querySelector("[data-name-slot]");D&&(D.textContent=l.name)}ie(c,{onReorder:()=>{}}),r&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await Xa(a),j(),Dt(`Deleted "${n.name}"`,{onUndo:async()=>{await za(a),he()}}))}),b.addEventListener("click",async()=>{let l=f.value.trim();if(!l){f.focus();return}let $=Array.from(c.querySelectorAll("[data-reorder-item]")),D=$.findIndex(N=>N.dataset.reorderItem===mo),I=$.slice(0,D).map(N=>N.dataset.reorderItem);b.disabled=!0,S.hidden=!0;try{if(r)await ja(a,l,I);else{let N=await Gt();await be(l,I,N.length)}j()}catch(N){console.error("[lift-tracker]",N),S.hidden=!1,S.textContent="Something went wrong saving the workout.",b.disabled=!1}});function L(l){return`
      <li class="lt-lift-row" data-reorder-item="${l.id}" data-lift-id="${l.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${fo(l.name)}">&#8942;&#8942;</button>
      </li>
    `}function q(){return`
      <li class="lt-workout-divider" data-reorder-item="${mo}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function fo(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var yn=`${window.location.origin}${window.location.pathname}`;function wn(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function ua(t){let e="signin";function a(o,n,s){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${wn(s||"")}">

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
    `}function r(o,n,s){t.innerHTML=a(o,n,s),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",r()});let f=t.querySelector("[data-auth-form]");f.addEventListener("submit",async c=>{c.preventDefault();let g=f.email.value.trim(),b=f.password.value,S=f.querySelector('button[type="submit"]');S.disabled=!0,S.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:x,error:p}=e==="signup"?await k.auth.signUp({email:g,password:b,options:{emailRedirectTo:yn}}):await k.auth.signInWithPassword({email:g,password:b});if(p)throw p;if(e==="signup"&&!x.session){e="signin",r(null,`Account created. Check ${g} for a confirmation link, then sign in here.`,g);return}}catch(x){r(x.message||"Something went wrong. Try again.",null,g)}})}r()}function ho(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function go(){let{data:t,error:e}=await k.auth.signInAnonymously();if(e)throw e;return await bn(),t}async function bn(){let t=o=>new Date(Date.now()-o*24*60*60*1e3).toISOString(),[e,a,r]=await Promise.all([Yt("Bench Press",0),Yt("Squat",1),Yt("Deadlift",2)]);await Promise.all([kt(e.id,135,8,t(6)),kt(e.id,145,6,t(2)),kt(a.id,185,5,t(5)),kt(a.id,195,5,t(1)),kt(r.id,225,5,t(3))]),await be("Full Body",[e.id,a.id,r.id],0)}var pt=document.getElementById("lift-tracker-app");uo();var yo=0;async function pa(){let t=++yo,e=()=>t!==yo;try{let{data:{session:a}}=await k.auth.getSession();if(e())return;if(!a)if(ho())try{if(await go(),e())return}catch(o){if(e())return;console.error("[lift-tracker] guest demo sign-in failed",o),await ua(pt);return}else return await ua(pt),e(),void 0;let r=La();if(r.name==="detail"?await eo(pt,r.liftId):r.name==="help"?await oo(pt):r.name==="weight"?await Lr(pt,{initialTab:r.tab}):r.name==="composite"?await no(pt):r.name==="history"?await so(pt):r.name==="killstreak"?await po(pt):r.name==="prs"?await Xr(pt):r.name==="workout-new"?await da(pt,{mode:"create"}):r.name==="workout-edit"?await da(pt,{mode:"edit",workoutId:r.workoutId}):await Gr(pt),e())return;window.scrollTo(0,0)}catch(a){if(e())return;console.error("[lift-tracker]",a),pt.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",pa);var wo=null,bo=!1;k.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,r=!bo;bo=!0;let o=a!==wo;wo=a,!(r||!o)&&(j(),pa())});pa();

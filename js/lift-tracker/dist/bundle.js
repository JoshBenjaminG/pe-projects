import{createClient as Sa}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";var oe="https://mqfsgammpsumpltfutwl.supabase.co",re="sb_publishable_thcq6mjdiLYXwzfXUk3pgw_VJWYPFg5";var w=Sa(oe,re);function ne(){let t=window.location.hash.replace(/^#\/?/,"");if(t.startsWith("lift/"))return{name:"detail",liftId:t.slice(5)};if(t==="workout/new")return{name:"workout-new"};let e=t.match(/^workout\/([^/]+)\/edit$/);return e?{name:"workout-edit",workoutId:e[1]}:t==="help"?{name:"help"}:t==="weight"?{name:"weight"}:t==="composite"?{name:"composite"}:t==="history"?{name:"history"}:t==="killstreak"?{name:"killstreak"}:{name:"list"}}function P(){window.location.hash="#/"}function ie(t){window.location.hash=`#/lift/${t}`}function se(){window.location.hash="#/workout/new"}function le(t){window.location.hash=`#/workout/${t}/edit`}function de(){window.location.hash="#/help"}function ce(){window.location.hash="#/weight"}function ue(){window.location.hash="#/composite"}function pe(){window.location.hash="#/history"}function fe(){window.location.hash="#/killstreak"}function _t(){window.dispatchEvent(new Event("hashchange"))}async function Y(){let{data:t,error:e}=await w.from("lifts").select("*").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t}async function me(t){let{data:e,error:a}=await w.from("lifts").select("*").eq("id",t).maybeSingle();if(a)throw a;return e}async function dt(t,e){let{data:a,error:o}=await w.from("lifts").insert({name:t,sort_order:e}).select().single();if(o)throw o;return a}async function he(t,e){let{data:a,error:o}=await w.from("lifts").update({name:e}).eq("id",t).select().single();if(o)throw o;return a}async function ge(t){let e=t.map((r,n)=>w.from("lifts").update({sort_order:n}).eq("id",r)),o=(await Promise.all(e)).find(r=>r.error);if(o)throw o.error}async function we(t){let{error:e}=await w.from("lifts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function ye(t){let{error:e}=await w.from("lifts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function be(t){let{data:e,error:a}=await w.from("sets").select("*").eq("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function z(t){if(!t||t.length===0)return[];let{data:e,error:a}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).order("performed_at",{ascending:!0});if(a)throw a;return e}async function ke(t,e){if(!t||t.length===0)return[];let{data:a,error:o}=await w.from("sets").select("*").in("lift_id",t).is("deleted_at",null).gte("performed_at",e).order("performed_at",{ascending:!0});if(o)throw o;return a}async function J(t,e,a,o){let{data:r,error:n}=await w.from("sets").insert({lift_id:t,weight:e,reps:a,performed_at:o||new Date().toISOString()}).select().single();if(n)throw n;return r}async function ve(t,e){let{data:a,error:o}=await w.from("sets").update(e).eq("id",t).select().single();if(o)throw o;return a}async function Se(t){let{error:e}=await w.from("sets").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function xe(t){let{error:e}=await w.from("sets").update({deleted_at:null}).eq("id",t);if(e)throw e}async function Dt(){let{data:t,error:e}=await w.from("workouts").select("*, workout_lifts(lift_id)").is("deleted_at",null).order("sort_order",{ascending:!0});if(e)throw e;return t.map(a=>({...a,liftIds:(a.workout_lifts||[]).map(o=>o.lift_id)}))}async function Ee(t){let e=t.map((r,n)=>w.from("workouts").update({sort_order:n}).eq("id",r)),o=(await Promise.all(e)).find(r=>r.error);if(o)throw o.error}async function Le(t){let{data:e,error:a}=await w.from("workouts").select("*, workout_lifts(lift_id)").eq("id",t).maybeSingle();if(a)throw a;return e?{...e,liftIds:(e.workout_lifts||[]).map(o=>o.lift_id)}:null}async function Ct(t,e,a){let{data:o,error:r}=await w.from("workouts").insert({name:t,sort_order:a}).select().single();if(r)throw r;if(e.length>0){let{error:n}=await w.from("workout_lifts").insert(e.map(i=>({workout_id:o.id,lift_id:i})));if(n)throw n}return o}async function _e(t,e,a){let{error:o}=await w.from("workouts").update({name:e}).eq("id",t);if(o)throw o;let{error:r}=await w.from("workout_lifts").delete().eq("workout_id",t);if(r)throw r;if(a.length>0){let{error:n}=await w.from("workout_lifts").insert(a.map(i=>({workout_id:t,lift_id:i})));if(n)throw n}}async function De(t){let{error:e}=await w.from("workouts").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ce(t){let{error:e}=await w.from("workouts").update({deleted_at:null}).eq("id",t);if(e)throw e}async function ct(){let{data:t,error:e}=await w.from("body_weight").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function qe(t,e){let{data:a,error:o}=await w.from("body_weight").insert({weight:t,logged_at:e||new Date().toISOString()}).select().single();if(o)throw o;return a}async function Te(t,e){let{data:a,error:o}=await w.from("body_weight").update(e).eq("id",t).select().single();if(o)throw o;return a}async function $e(t){let{error:e}=await w.from("body_weight").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ae(t){let{error:e}=await w.from("body_weight").update({deleted_at:null}).eq("id",t);if(e)throw e}async function gt(){let{data:t,error:e}=await w.from("waist_measurements").select("*").is("deleted_at",null).order("logged_at",{ascending:!0});if(e)throw e;return t}async function Me(t,e){let{data:a,error:o}=await w.from("waist_measurements").insert({waist_circumference:t,logged_at:e||new Date().toISOString()}).select().single();if(o)throw o;return a}async function Re(t,e){let{data:a,error:o}=await w.from("waist_measurements").update(e).eq("id",t).select().single();if(o)throw o;return a}async function We(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:new Date().toISOString()}).eq("id",t);if(e)throw e}async function Ne(t){let{error:e}=await w.from("waist_measurements").update({deleted_at:null}).eq("id",t);if(e)throw e}function V(t,e){return t*(1+e/30)}function A(t){let e=new Date(t),a=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${a}-${o}-${r}`}function st(t){let e=new Map;for(let a of t){let o=A(a.performed_at),r=V(Number(a.weight),Number(a.reps)),n=e.get(o);(!n||r>n.e1rm)&&e.set(o,{date:o,e1rm:r,weight:Number(a.weight),reps:Number(a.reps),setId:a.id})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date))}function qt(t){let e=t.filter(i=>i.dailySeries.length>0);if(e.length===0)return[];let a=new Map;for(let i of e)a.set(i.liftId,i.dailySeries[0].e1rm);let o=new Set;for(let i of e)for(let d of i.dailySeries)o.add(d.date);let r=Array.from(o).sort(),n=[];for(let i of r){let d=0,b=0;for(let m of e){let h=null;for(let g of m.dailySeries)if(g.date<=i)h=g;else break;h&&(d+=h.e1rm/a.get(m.liftId),b+=1)}if(b>0){let m=d/b;n.push({date:i,ratio:m,pct:(m-1)*100})}}return n}function Tt(t,e){if(!e||e.length===0)return!1;let a=Math.max(...e.map(o=>V(Number(o.weight),Number(o.reps))));return t>a}function lt(t){return t.reduce((e,a)=>e+Number(a.weight)*Number(a.reps),0)}function Ie(t){let e=Math.round(t);return e===0?"0%":e>0?`+${e}%`:`−${Math.abs(e)}%`}function Oe(t){let e=new Map;for(let a of t){let o=A(a.performed_at);e.has(o)||e.set(o,[]),e.get(o).push(a)}return Array.from(e.entries()).sort((a,o)=>o[0].localeCompare(a[0]))}function ut(t){let e=new Map;for(let a of t){let o=A(a.logged_at),r=e.get(o);(!r||new Date(a.created_at||0)>=new Date(r.createdAt||0))&&e.set(o,{date:o,weight:Number(a.weight),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date)).map(({date:a,weight:o,entryId:r})=>({date:a,weight:o,entryId:r}))}function He(t){if(t.length===0)return null;let e=t[0],a=t[t.length-1];return{start:e.weight,current:a.weight,currentDate:a.date,change:a.weight-e.weight}}function wt(t){let e=new Map;for(let a of t){let o=A(a.logged_at),r=e.get(o);(!r||new Date(a.created_at||0)>=new Date(r.createdAt||0))&&e.set(o,{date:o,waist:Number(a.waist_circumference),entryId:a.id,createdAt:a.created_at})}return Array.from(e.values()).sort((a,o)=>a.date.localeCompare(o.date)).map(({date:a,waist:o,entryId:r})=>({date:a,waist:o,entryId:r}))}var yt=null,tt=null,et=null,at=null,Mt=14,$t="#e8242c",Pe="rgba(232, 36, 44, 0.18)",At="#f2b134",Be="rgba(242, 177, 52, 0.16)",ot="#9a9ca6",rt="rgba(255, 255, 255, 0.08)";function Rt(t,e,{onPointClick:a}={}){yt&&(yt.destroy(),yt=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.pct*10)/10);return yt=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Composite progress",data:r,borderColor:$t,backgroundColor:Pe,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:$t,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:rt}},y:{ticks:{color:ot,callback:n=>`${n>0?"+":""}${n}%`},grid:{color:rt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),yt}function Fe(t,e,{onPointClick:a}={}){tt&&(tt.destroy(),tt=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.e1rm*10)/10);return tt=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Estimated 1RM",data:r,borderColor:At,backgroundColor:Be,fill:!0,tension:.25,pointRadius:4,pointBackgroundColor:At,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:rt}},y:{ticks:{color:ot},grid:{color:rt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),tt}function Ue(){tt&&(tt.destroy(),tt=null)}function Pt(t,e,{onPointClick:a}={}){et&&(et.destroy(),et=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.weight*10)/10);return et=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Weight",data:r,borderColor:$t,backgroundColor:Pe,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:$t,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:rt}},y:{ticks:{color:ot},grid:{color:rt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),et}function Bt(){et&&(et.destroy(),et=null)}function Ke(t,e,{onPointClick:a}={}){at&&(at.destroy(),at=null);let o=e.map(n=>n.date),r=e.map(n=>Math.round(n.waist*10)/10);return at=new Chart(t,{type:"line",data:{labels:o,datasets:[{label:"Waist",data:r,borderColor:At,backgroundColor:Be,fill:!0,tension:.25,pointRadius:3,pointBackgroundColor:At,pointHitRadius:Mt}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"nearest",intersect:!0},scales:{x:{ticks:{color:ot},grid:{color:rt}},y:{ticks:{color:ot},grid:{color:rt}}},plugins:{legend:{display:!1}},onClick:(n,i)=>{i.length&&a&&a(e[i[0].index])}}}),at}function Ye(){at&&(at.destroy(),at=null)}function bt(t,{onReorder:e,axis:a="y"}={}){let o=null,r=null,n=0,i=0,d=0,b=0,m=0,h=null,g=null,L=null,y=0,C=0,M=null,_=null;function O(){return Array.from(t.querySelectorAll("[data-reorder-item]"))}function H(l){let E=l.target.closest(".lt-drag-handle");if(!E)return;let q=E.closest("[data-reorder-item]");if(q){if(l.pointerType!=="touch"){l.preventDefault(),S(q,l.clientX,l.clientY);return}if(E.setPointerCapture)try{E.setPointerCapture(l.pointerId),M=E,_=l.pointerId}catch{}L=q,y=l.clientX,C=l.clientY,document.addEventListener("pointermove",k),document.addEventListener("pointerup",x),g=setTimeout(()=>{clearTimeout(g),g=null;let W=L,F=y,B=C;p(),S(W,F,B)},180)}}function N(){if(M&&_!==null&&M.releasePointerCapture)try{M.releasePointerCapture(_)}catch{}M=null,_=null}function p(){clearTimeout(g),g=null,L=null,document.removeEventListener("pointermove",k),document.removeEventListener("pointerup",x)}function k(l){if(!L)return;let E=l.clientX-y,q=l.clientY-C;Math.hypot(E,q)<=10||(p(),N())}function x(){p(),N()}function S(l,E,q){o=l,n=E,i=q,m=q;let W=l.getBoundingClientRect();b=W.top,d=W.left,r=document.createElement(l.tagName),r.className="lt-reorder-placeholder",r.style.height=`${l.offsetHeight}px`,r.style.width=`${l.offsetWidth}px`,l.after(r),l.classList.add("lt-dragging"),l.style.position="fixed",l.style.left=`${W.left}px`,l.style.width=`${W.width}px`,l.style.top=`${b}px`,l.style.zIndex="1000",document.addEventListener("pointermove",c),document.addEventListener("pointerup",D)}function $(){let l=O().filter(W=>W!==o),E=o.getBoundingClientRect(),q=null;if(a==="x"){let W=E.left+E.width/2,F=E.top+E.height/2;for(let B of l){let U=B.getBoundingClientRect(),It=U.left+U.width/2,vt=U.top+U.height/2;if(Math.abs(vt-F)<U.height/2?W<It:F<vt){q=B;break}}}else{let W=E.top+E.height/2;for(let F of l){let B=F.getBoundingClientRect(),U=B.top+B.height/2;if(W<U){q=F;break}}}q?t.insertBefore(r,q):t.appendChild(r)}function I(){let l=m,E=window.innerHeight-m;return l<80?-16*(1-l/80):E<80?16*(1-E/80):0}function T(){if(!o){h=null;return}let l=I();if(l===0){h=null;return}window.scrollBy(0,l),$(),h=requestAnimationFrame(T)}function R(){h===null&&I()!==0&&(h=requestAnimationFrame(T))}function v(){h!==null&&(cancelAnimationFrame(h),h=null)}function c(l){if(o){if(l.preventDefault(),m=l.clientY,a==="x"){let E=l.clientX-n,q=l.clientY-i;o.style.left=`${d+E}px`,o.style.top=`${b+q}px`}else{let E=l.clientY-i;o.style.top=`${b+E}px`}$(),a==="y"&&R()}}function D(){if(!o)return;v(),r.replaceWith(o),o.classList.remove("lt-dragging"),o.style.position="",o.style.left="",o.style.width="",o.style.top="",o.style.zIndex="",document.removeEventListener("pointermove",c),document.removeEventListener("pointerup",D),N();let l=O().map(E=>E.dataset.reorderItem);o=null,r=null,e&&e(l)}t.addEventListener("pointerdown",H)}var xa="joshuaegage@gmail.com";function Ve(){let t=document.createElement("div");t.className="lt-feedback-overlay",t.innerHTML=`
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
  `,document.body.appendChild(t);let e=t.querySelector("[data-feedback-text]");e.focus();function a(){t.remove()}t.addEventListener("click",o=>{o.target===t&&a()}),t.querySelector("[data-feedback-cancel]").addEventListener("click",a),t.querySelector("[data-feedback-send]").addEventListener("click",()=>{let o=e.value.trim(),r=encodeURIComponent("Lift Tracker feedback"),n=encodeURIComponent(o||"(no message entered)");window.location.href=`mailto:${xa}?subject=${r}&body=${n}`,a()})}var Wt=[{days:1,key:"uav",label:"UAV",icon:String.fromCodePoint(128225)},{days:2,key:"predator",label:"Predator Missile",icon:String.fromCodePoint(128640)},{days:3,key:"harrier",label:"Harrier Strike",icon:String.fromCodePoint(9992,65039)},{days:4,key:"chopper",label:"Chopper Gunner",icon:String.fromCodePoint(128641)}];function Xe(t=new Date){let e=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=e.getDay();return e.setDate(e.getDate()-a),e}function Ea(t,e=new Date){let a=Xe(e),o=new Date(a);o.setDate(o.getDate()+7);let r=new Set;for(let n of t){let i=new Date(n.performed_at);i>=a&&i<o&&r.add(A(n.performed_at))}return r.size}function Ge(t){let e=null;for(let a of Wt)t>=a.days&&(e=a);return e}function Nt(t,e=new Date){let a=Ea(t,e);return{days:a,tier:Ge(a)}}function je(t){let e=new Map;for(let o of t){let n=Xe(new Date(o.performed_at)).getTime();e.has(n)||e.set(n,new Set),e.get(n).add(A(o.performed_at))}let a={};for(let o of Wt)a[o.key]=0;for(let o of e.values()){let r=Ge(o.size);r&&(a[r.key]+=1)}return a}var pt=null,Ft=null;function La(){return pt||(pt=document.createElement("div"),pt.className="lt-toast",document.body.appendChild(pt),pt)}function nt(t,{onUndo:e,onExpire:a,durationMs:o=5e3}={}){let r=La();clearTimeout(Ft),r.innerHTML=`
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `,r.querySelector(".lt-toast-message").textContent=t,r.classList.add("lt-toast-visible");let n=r.querySelector(".lt-toast-undo"),i=()=>r.classList.remove("lt-toast-visible");n.addEventListener("click",()=>{clearTimeout(Ft),i(),e&&e()},{once:!0}),Ft=setTimeout(()=>{i(),a&&a()},o)}function kt(t,e){try{let a=document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));return a?decodeURIComponent(a[1])==="true":e}catch{return e}}function ft(t,e){try{document.cookie=`${t}=${encodeURIComponent(String(e))}; max-age=31536000; path=/; samesite=lax`}catch{}}var ze="lt-weight-card-expanded";function mt(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function _a(t){let[,e,a]=t.split("-");return`${Number(e)}/${Number(a)}`}function Je(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Qe(t,{onExpand:e}={}){let a=await ct(),o=ut(a),r=He(o);if(!r){t.innerHTML=`
      <div class="lt-weight-card-header">
        <h2>Weight</h2>
        <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
      </div>
      <p class="lt-weight-empty">No weight entries yet — tap the arrow above to log one.</p>
    `,t.querySelector("[data-weight-expand]").addEventListener("click",()=>{e&&e()});return}let n=r.change<0?"↘":r.change>0?"↗":"→",i=kt(ze,!1);function d(){t.classList.toggle("lt-stats-row-expanded",i),i?t.innerHTML=`
        <div class="lt-weight-card-header">
          <button type="button" class="lt-weight-toggle" data-weight-toggle aria-expanded="true">
            <span>Weight</span>
            <span class="lt-chevron" data-weight-chevron>&#9650;</span>
          </button>
          <button type="button" class="lt-weight-expand" data-weight-expand aria-label="Open weight tracker">&#8250;</button>
        </div>
        <div class="lt-weight-card-body">
          <div class="lt-weight-stats lt-weight-stats-row">
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Start</span>
              <span class="lt-weight-stat-value">${mt(r.start)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Current (${_a(r.currentDate)})</span>
              <span class="lt-weight-stat-value">${mt(r.current)} lbs</span>
            </div>
            <div class="lt-weight-stat">
              <span class="lt-weight-stat-label">Change</span>
              <span class="lt-weight-stat-value">${n} ${mt(Math.abs(r.change))} lbs</span>
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
              <span class="lt-chevron" data-weight-chevron>&#9660;</span>
            </span>
            <span class="lt-weight-stat-value lt-weight-collapsed-value">${mt(r.current)} lbs</span>
          </button>
        </div>
      `,t.querySelector("[data-weight-expand]")?.addEventListener("click",()=>{e&&e()}),t.querySelector("[data-weight-toggle]").addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){e&&e();return}i=!i,ft(ze,i),d()}),i?Pt(t.querySelector("[data-home-weight-canvas]"),o):Bt()}d()}async function Ze(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=Array.from(t.querySelectorAll("[data-tab]")),a={weight:t.querySelector('[data-tab-panel="weight"]'),waist:t.querySelector('[data-tab-panel="waist"]')},o="weight";e.forEach(v=>{v.addEventListener("click",()=>{v.dataset.tab!==o&&(o=v.dataset.tab,e.forEach(c=>c.setAttribute("aria-selected",String(c===v))),Object.entries(a).forEach(([c,D])=>{D.hidden=c!==o}),o==="weight"?y():I())})});let r=t.querySelector("[data-weight-form]"),n=t.querySelector("[data-weight-date-input]"),i=t.querySelector("[data-weight-input]"),d=t.querySelector("[data-weight-chart-section]"),b=t.querySelector("[data-weight-canvas]"),m=t.querySelector("[data-weight-empty]"),h=t.querySelector("[data-weight-history]");n.value=A(new Date().toISOString());let g=[];async function L(){g=await ct(),C(),y()}function y(){let v=ut(g);if(v.length===0){d.hidden=!0,m.hidden=!1,Bt();return}d.hidden=!1,m.hidden=!0,a.weight.hidden||Pt(b,v)}function C(){if(g.length===0){h.innerHTML="";return}let v=g.slice().sort((c,D)=>new Date(D.logged_at)-new Date(c.logged_at));h.innerHTML=v.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${mt(Number(c.weight))} lb</span>
              <span class="lt-history-e1rm">${Je(A(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),h.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>M(c.dataset.editTrigger))})}function M(v){let c=h.querySelector(`[data-entry-id="${v}"]`),D=g.find(l=>l.id===v);!c||!D||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.1" min="0" value="${D.weight}" data-edit-weight /></label>
        <label>Date <input type="date" value="${A(D.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",C),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this weight entry? You'll have a few seconds to undo it after.")&&(await $e(v),await L(),nt("Weight entry deleted",{onUndo:async()=>{await Ae(v),await L()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async l=>{l.preventDefault();let E=Number(c.querySelector("[data-edit-weight]").value),q=c.querySelector("[data-edit-date]").value;if(!(E>=0)||!q)return;let W=new Date(D.logged_at),[F,B,U]=q.split("-").map(Number);W.setFullYear(F,B-1,U),await Te(v,{weight:E,logged_at:W.toISOString()}),await L()}))}r.addEventListener("submit",async v=>{v.preventDefault();let c=Number(i.value),D=n.value;if(!(c>=0)||!Number.isFinite(c)||!D)return;let[l,E,q]=D.split("-").map(Number),W=new Date;W.setFullYear(l,E-1,q),await qe(c,W.toISOString()),i.value="",i.focus(),n.value=A(new Date().toISOString()),await L()});let _=t.querySelector("[data-waist-form]"),O=t.querySelector("[data-waist-date-input]"),H=t.querySelector("[data-waist-input]"),N=t.querySelector("[data-waist-chart-section]"),p=t.querySelector("[data-waist-canvas]"),k=t.querySelector("[data-waist-empty]"),x=t.querySelector("[data-waist-history]");O.value=A(new Date().toISOString());let S=[];async function $(){S=await gt(),T(),I()}function I(){let v=wt(S);if(v.length===0){N.hidden=!0,k.hidden=!1,Ye();return}N.hidden=!1,k.hidden=!0,a.waist.hidden||Ke(p,v)}function T(){if(S.length===0){x.innerHTML="";return}let v=S.slice().sort((c,D)=>new Date(D.logged_at)-new Date(c.logged_at));x.innerHTML=v.map(c=>`
          <li class="lt-history-row" data-entry-id="${c.id}">
            <button type="button" class="lt-history-main" data-edit-trigger="${c.id}">
              <span class="lt-history-weight">${mt(Number(c.waist_circumference))} in</span>
              <span class="lt-history-e1rm">${Je(A(c.logged_at))}</span>
            </button>
          </li>
        `).join(""),x.querySelectorAll("[data-edit-trigger]").forEach(c=>{c.addEventListener("click",()=>R(c.dataset.editTrigger))})}function R(v){let c=x.querySelector(`[data-entry-id="${v}"]`),D=S.find(l=>l.id===v);!c||!D||(c.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Waist <input type="number" step="0.1" min="0" value="${D.waist_circumference}" data-edit-waist /></label>
        <label>Date <input type="date" value="${A(D.logged_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,c.querySelector("[data-edit-cancel]").addEventListener("click",T),c.querySelector("[data-edit-delete]").addEventListener("click",async()=>{window.confirm("Delete this waist measurement? You'll have a few seconds to undo it after.")&&(await We(v),await $(),nt("Waist measurement deleted",{onUndo:async()=>{await Ne(v),await $()}}))}),c.querySelector("[data-edit-form]").addEventListener("submit",async l=>{l.preventDefault();let E=Number(c.querySelector("[data-edit-waist]").value),q=c.querySelector("[data-edit-date]").value;if(!(E>=0)||!q)return;let W=new Date(D.logged_at),[F,B,U]=q.split("-").map(Number);W.setFullYear(F,B-1,U),await Re(v,{waist_circumference:E,logged_at:W.toISOString()}),await $()}))}_.addEventListener("submit",async v=>{v.preventDefault();let c=Number(H.value),D=O.value;if(!(c>=0)||!Number.isFinite(c)||!D)return;let[l,E,q]=D.split("-").map(Number),W=new Date;W.setFullYear(l,E-1,q),await Me(c,W.toISOString()),H.value="",H.focus(),O.value=A(new Date().toISOString()),await $()}),await Promise.all([L(),$()])}var ta="lt-composite-expanded",Ut="lt-header-menu-open";async function ea(t){let{data:{session:e}}=await w.auth.getSession(),a=!!e?.user?.is_anonymous;t.innerHTML=`
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
      </button>

      <button type="button" class="lt-history-btn" data-history-btn>History</button>
    </div>

    <div class="lt-stats-row" data-stats-row>
      <section class="lt-weight-card" data-weight-card></section>

      <section class="lt-composite" data-composite-section>
        <button type="button" class="lt-composite-toggle" data-composite-toggle aria-expanded="true">
          <span class="lt-composite-toggle-label">
            <span>Composite</span>
            <span class="lt-composite-summary" data-composite-summary></span>
          </span>
          <span class="lt-chevron" data-chevron>&#9650;</span>
        </button>
        <div class="lt-composite-body" data-composite-body>
          <p class="lt-composite-blurb">Your average strength gain across all lifts, relative to where each one started.</p>
          <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
          <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
        </div>
      </section>
    </div>

    <div class="lt-action-row" data-action-row>
      <button type="button" class="lt-add-lift-toggle-btn" data-add-lift-toggle aria-pressed="false">+ Add Lift</button>
      <button type="button" class="lt-create-workout-btn" data-create-workout-btn>+ Create Workout</button>
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
  `;let o=t.querySelector("[data-hamburger-btn]"),r=t.querySelector("[data-header-actions]"),n=240,i=null;function d(s=!0){i&&(clearTimeout(i),i=null),r.classList.remove("lt-header-actions-open"),o.setAttribute("aria-expanded","false"),s&&ft(Ut,!1),i=setTimeout(()=>{r.hidden=!0,i=null},n)}function b({persist:s=!0,instant:u=!1}={}){i&&(clearTimeout(i),i=null),r.hidden=!1,u?r.classList.add("lt-header-actions-open"):requestAnimationFrame(()=>r.classList.add("lt-header-actions-open")),o.setAttribute("aria-expanded","true"),s&&ft(Ut,!0)}o.addEventListener("click",()=>{r.hidden?b():d()}),r.addEventListener("click",s=>{s.target.closest("button")&&d()}),kt(Ut,!1)&&b({persist:!1,instant:!0}),t.querySelector("[data-help-btn]").addEventListener("click",de);let h=t.querySelector("[data-feedback-btn]");h&&h.addEventListener("click",()=>Ve()),t.querySelector("[data-logout-btn]").addEventListener("click",()=>w.auth.signOut());let L=t.querySelector("[data-composite-section]"),y=t.querySelector("[data-composite-toggle]"),C=t.querySelector("[data-composite-body]"),M=t.querySelector("[data-chevron]"),_=t.querySelector("[data-composite-summary]");function O(s){y.setAttribute("aria-expanded",String(s)),C.hidden=!s,M.innerHTML=s?"&#9650;":"&#9660;",L.classList.toggle("lt-stats-row-expanded",s)}O(kt(ta,!0)),y.addEventListener("click",()=>{if(window.matchMedia("(max-width: 359px)").matches){ue();return}let s=y.getAttribute("aria-expanded")==="true";O(!s),ft(ta,!s)});let H=t.querySelector("[data-killstreak-icon]"),N=t.querySelector("[data-killstreak-label]"),p=t.querySelector("[data-killstreak-sub]");t.querySelector("[data-killstreak-btn]").addEventListener("click",fe);function k(s){let{days:u,tier:f}=Nt(s);H.textContent=f?f.icon:"🎯",N.textContent=f?`${f.label} Killstreak`:"No Killstreak",p.textContent=`${u} Day streak`}let x=t.querySelector("[data-weight-card]");Qe(x,{onExpand:ce}),t.querySelector("[data-history-btn]").addEventListener("click",pe);let S=t.querySelector("[data-add-lift-form]"),$=t.querySelector("[data-add-lift-toggle]");$.addEventListener("click",()=>{let s=S.hidden;S.hidden=!s,$.setAttribute("aria-pressed",String(s)),$.classList.toggle("lt-add-lift-toggle-active",s),s&&S.querySelector('input[name="name"]').focus()});let I=t.querySelector("[data-lift-list]"),T=t.querySelector("[data-list-empty]");t.querySelector("[data-create-workout-btn]").addEventListener("click",se);let R=t.querySelector("[data-workout-pills]"),v=t.querySelector("[data-workout-empty-hint]"),c="lt-active-workout",D=[],l=W();function E(){if(!l)return K;let s=D.find(f=>f.id===l);if(!s)return K;let u=new Set(s.liftIds);return K.filter(f=>u.has(f.id))}function q(){v.hidden=D.length>0,R.innerHTML=D.map(s=>{let u=s.id===l;return`
          <div class="lt-workout-pill-wrap${u?" lt-workout-pill-wrap-active":""}" data-reorder-item="${s.id}">
            <button type="button" class="lt-workout-pill" data-workout-pill="${s.id}" aria-pressed="${u}">
              <span data-workout-pill-name></span>
            </button>
            <button type="button" class="lt-drag-handle lt-drag-handle-pill" aria-label="Reorder workout">&#8942;</button>
            <button type="button" class="lt-workout-pill-edit" data-workout-edit="${s.id}" aria-label="Edit workout">&#9998;</button>
          </div>
        `}).join("");for(let s of D){let u=R.querySelector(`[data-workout-pill="${s.id}"] [data-workout-pill-name]`);u&&(u.textContent=s.name)}R.querySelectorAll("[data-workout-pill]").forEach(s=>{s.addEventListener("click",()=>{let u=s.dataset.workoutPill;l=l===u?null:u,F(l),q(),Ht(St)})}),R.querySelectorAll("[data-workout-edit]").forEach(s=>{s.addEventListener("click",u=>{u.stopPropagation(),le(s.dataset.workoutEdit)})})}function W(){try{return window.localStorage.getItem(c)||null}catch{return null}}function F(s){try{s?window.localStorage.setItem(c,s):window.localStorage.removeItem(c)}catch{}}let B="lt-fast-mode",U="lt-burst-mode";function It(){try{let s=window.localStorage.getItem(B);if(s!==null)return s==="true";let u=window.localStorage.getItem(U);return u!==null?(window.localStorage.setItem(B,u),window.localStorage.removeItem(U),u==="true"):!1}catch{return!1}}function vt(s){try{window.localStorage.setItem(B,String(s))}catch{}}let K=[],Q=It(),Z=new Map,St=[],xt=t.querySelector("[data-mode-toggle]");function Gt(){xt.textContent=Q?"Normal":"Fast",xt.setAttribute("aria-pressed",String(Q)),xt.classList.toggle("lt-mode-toggle-active",Q)}Gt(),xt.addEventListener("click",()=>{Q=!Q,vt(Q),Gt(),Ht(St)}),S.addEventListener("submit",async s=>{s.preventDefault();let u=S.querySelector('input[name="name"]'),f=u.value.trim();if(f){u.value="",u.disabled=!0;try{await dt(f,K.length),await jt()}finally{u.disabled=!1,u.focus()}}}),bt(I,{onReorder:async s=>{let u=[...s],f=new Set(s),G=K.map(j=>f.has(j.id)?u.shift():j.id);await ge(G),K=G.map(j=>K.find(ht=>ht.id===j)).filter(Boolean)}}),bt(R,{axis:"x",onReorder:async s=>{await Ee(s),D=s.map(u=>D.find(f=>f.id===u)).filter(Boolean)}});async function jt(){if(D=await Dt(),l&&!D.some(f=>f.id===l)&&(l=null,F(null)),q(),K=await Y(),K.length===0){I.innerHTML="",T.hidden=!1,T.textContent="No lifts yet — add your first one above.",L.hidden=!0,k([]),Z=new Map,St=[];return}let s=await z(K.map(f=>f.id));k(s),Z=new Map(K.map(f=>[f.id,[]]));for(let f of s){let G=Z.get(f.lift_id);G&&G.push(f)}let u=K.map(f=>({liftId:f.id,dailySeries:st(Z.get(f.id)||[])}));Ht(u),ha(u)}function ha(s){let u=qt(s);L.hidden=!1;let f=t.querySelector("[data-composite-canvas]"),G=t.querySelector("[data-composite-empty]");if(u.length===0){f.hidden=!0,G.hidden=!1,_.textContent="";return}f.hidden=!1,G.hidden=!0,_.textContent=Ie(u[u.length-1].pct),Rt(f,u)}function Ot(s){let u=st(Z.get(s)||[]),f=u[u.length-1];return f?`${Math.round(f.e1rm)} lb e1RM`:"No sets yet"}function ga(s){let u=Z.get(s)||[];return u.length===0?"":u[u.length-1].weight}function Ht(s){St=s;let u=E();T.hidden=u.length>0,T.textContent=l?"No lifts in this workout yet — tap the pencil above to add some.":"No lifts yet — add your first one above.",I.innerHTML=u.map(f=>Q?`
            <li class="lt-lift-row lt-lift-row-fast" data-reorder-item="${f.id}" data-lift-id="${f.id}">
              <div class="lt-lift-row-fast-top">
                <button type="button" class="lt-lift-row-main lt-lift-row-fast-main" data-open-lift="${f.id}">
                  <span class="lt-lift-row-text">
                    <span class="lt-lift-name" data-name-slot></span>
                    <span class="lt-lift-last" data-last-slot>${Ot(f.id)}</span>
                  </span>
                  <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
                </button>
                <button type="button" class="lt-drag-handle" aria-label="Reorder ${zt(f.name)}">&#8942;&#8942;</button>
              </div>
              <form class="lt-fast-log" data-fast-log-form="${f.id}">
                <input type="number" inputmode="decimal" step="0.5" min="0" name="weight" placeholder="lb" required value="${ga(f.id)}" data-fast-weight />
                <input type="number" inputmode="numeric" step="1" min="1" name="reps" placeholder="reps" required data-fast-reps />
                <button type="submit" class="lt-fast-log-btn">Log</button>
                <span class="lt-fast-feedback" data-fast-feedback hidden></span>
              </form>
            </li>
          `:`
          <li class="lt-lift-row" data-reorder-item="${f.id}" data-lift-id="${f.id}">
            <button type="button" class="lt-lift-row-main" data-open-lift="${f.id}">
              <span class="lt-lift-row-text">
                <span class="lt-lift-name" data-name-slot></span>
                <span class="lt-lift-last">${Ot(f.id)}</span>
              </span>
              <span class="lt-lift-row-chevron" aria-hidden="true">&#8250;</span>
            </button>
            <button type="button" class="lt-drag-handle" aria-label="Reorder ${zt(f.name)}">&#8942;&#8942;</button>
          </li>
        `).join("");for(let f of K){let j=I.querySelector(`[data-lift-id="${f.id}"]`)?.querySelector("[data-name-slot]");j&&(j.textContent=f.name)}I.querySelectorAll("[data-open-lift]").forEach(f=>{f.addEventListener("click",()=>ie(f.dataset.openLift))}),Q&&wa()}function wa(){I.querySelectorAll("[data-fast-log-form]").forEach(s=>{let u=s.dataset.fastLogForm;s.addEventListener("submit",async f=>{f.preventDefault();let G=s.querySelector("[data-fast-weight]"),j=s.querySelector("[data-fast-reps]"),ht=s.querySelector("[data-fast-feedback]"),Et=Number(G.value),Lt=Number(j.value);if(!(Et>=0)||!Number.isFinite(Et)||!(Lt>0)||!Number.isInteger(Lt))return;let Jt=Z.get(u)||[],ya=V(Et,Lt),Qt=Tt(ya,Jt),Zt=new Date().toISOString(),ba=await J(u,Et,Lt,Zt),te=[...Jt,ba];Z.set(u,te),j.value="",j.focus();let ee=I.querySelector(`[data-lift-id="${u}"]`)?.querySelector("[data-last-slot]");ee&&(ee.textContent=Ot(u));let ka=A(Zt),ae=lt(te.filter(va=>A(va.performed_at)===ka));ht.hidden=!1,ht.classList.toggle("lt-pr",Qt),ht.textContent=Qt?`PR! ${Math.round(ae)} lb today`:`Logged · ${Math.round(ae)} lb today`})})}function zt(s){return String(s).replace(/[&<>"']/g,u=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[u])}await jt()}async function aa(t,e){let a=await me(e);if(!a||a.deleted_at){t.innerHTML='<p class="lt-empty">Lift not found. <a href="#/">Back to list</a></p>';return}t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",P);let o=t.querySelector("[data-name-input]");o.value=a.name;let r=a.name;o.addEventListener("keydown",p=>{p.key==="Enter"&&o.blur()}),o.addEventListener("blur",async()=>{let p=o.value.trim();if(!p||p===r){o.value=r;return}r=p,await he(e,p)}),t.querySelector("[data-delete-lift]").addEventListener("click",async()=>{window.confirm(`Delete "${r}"? You'll have a few seconds to undo it after.`)&&(await we(e),P(),nt(`Deleted "${r}"`,{onUndo:async()=>{await ye(e),_t()}}))});let n=Array.from(t.querySelectorAll("[data-tab]")),i={history:t.querySelector('[data-tab-panel="history"]'),details:t.querySelector('[data-tab-panel="details"]')};n.forEach(p=>{p.addEventListener("click",()=>{n.forEach(k=>k.setAttribute("aria-selected",String(k===p))),Object.entries(i).forEach(([k,x])=>{x.hidden=k!==p.dataset.tab}),p.dataset.tab==="details"&&N()})});let d=t.querySelector("[data-log-form]"),b=t.querySelector("[data-weight-input]"),m=t.querySelector("[data-reps-input]"),h=t.querySelector("[data-log-feedback]"),g=[];async function L(){g=await be(e)}function y(){if(g.length===0)return;let p=g[g.length-1];b.value=p.weight}d.addEventListener("submit",async p=>{p.preventDefault();let k=Number(b.value),x=Number(m.value);if(!(k>=0)||!Number.isFinite(k)||!(x>0)||!Number.isInteger(x))return;let S=V(k,x),I=Tt(S,g),T=new Date;await J(e,k,x,T.toISOString()),m.value="",m.focus(),await L(),_(),i.details.hidden||N();let R=A(T.toISOString()),v=lt(g.filter(c=>A(c.performed_at)===R));h.hidden=!1,h.classList.toggle("lt-pr",I),h.textContent=I?`New PR! Today's volume: ${Math.round(v)} lb`:`Logged. Today's volume: ${Math.round(v)} lb`});function C(p){let k=new Map;for(let x of p){let S=A(x.performed_at);k.has(S)||k.set(S,[]),k.get(S).push(x)}return Array.from(k.entries()).sort((x,S)=>S[0].localeCompare(x[0]))}function M(p){let[k,x,S]=p.split("-").map(Number);return new Date(k,x-1,S).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}function _(){let p=i.history;if(g.length===0){p.innerHTML='<p class="lt-empty">No sets logged yet.</p>';return}let k=C(g);p.innerHTML=k.map(([x,S])=>{let $=lt(S),T=S.slice().sort((R,v)=>new Date(v.performed_at)-new Date(R.performed_at)).map(R=>{let v=Math.round(V(Number(R.weight),Number(R.reps)));return`
              <li class="lt-history-row" data-set-id="${R.id}">
                <button type="button" class="lt-history-main" data-edit-trigger="${R.id}">
                  <span class="lt-history-weight">${R.weight} lb &times; ${R.reps}</span>
                  <span class="lt-history-e1rm">${v} e1RM</span>
                </button>
              </li>
            `}).join("");return`
          <div class="lt-history-group">
            <div class="lt-history-date">
              <span>${M(x)}</span>
              <span class="lt-history-volume">${Math.round($)} lb volume</span>
            </div>
            <ul class="lt-history-list">${T}</ul>
          </div>
        `}).join(""),p.querySelectorAll("[data-edit-trigger]").forEach(x=>{x.addEventListener("click",()=>H(x.dataset.editTrigger))})}function O(p){return i.history.querySelector(`[data-set-id="${p}"]`)}function H(p){let k=O(p),x=g.find(S=>S.id===p);!k||!x||(k.innerHTML=`
      <form class="lt-edit-set-form" data-edit-form>
        <label>Weight <input type="number" step="0.5" min="0" value="${x.weight}" data-edit-weight /></label>
        <label>Reps <input type="number" step="1" min="1" value="${x.reps}" data-edit-reps /></label>
        <label>Date <input type="date" value="${A(x.performed_at)}" data-edit-date /></label>
        <div class="lt-edit-actions">
          <button type="submit">Save</button>
          <button type="button" data-edit-cancel>Cancel</button>
          <button type="button" class="lt-delete-set" data-edit-delete>Delete</button>
        </div>
      </form>
    `,k.querySelector("[data-edit-cancel]").addEventListener("click",_),k.querySelector("[data-edit-delete]").addEventListener("click",async()=>{await Se(p),await L(),_(),i.details.hidden||N(),nt("Set deleted",{onUndo:async()=>{await xe(p),await L(),_(),i.details.hidden||N()}})}),k.querySelector("[data-edit-form]").addEventListener("submit",async S=>{S.preventDefault();let $=Number(k.querySelector("[data-edit-weight]").value),I=Number(k.querySelector("[data-edit-reps]").value),T=k.querySelector("[data-edit-date]").value;if(!($>=0)||!(I>0)||!T)return;let R=new Date(x.performed_at),[v,c,D]=T.split("-").map(Number);R.setFullYear(v,c-1,D),await ve(p,{weight:$,reps:I,performed_at:R.toISOString()}),await L(),_(),i.details.hidden||N()}))}function N(){let p=i.details,k=st(g);if(k.length===0){p.innerHTML='<p class="lt-empty">No sets logged yet.</p>',Ue();return}p.innerHTML=`
      <div class="lt-chart-wrap"><canvas data-lift-canvas></canvas></div>
      <p class="lt-point-detail" data-point-detail hidden></p>
    `;let x=p.querySelector("[data-lift-canvas]"),S=p.querySelector("[data-point-detail]");Fe(x,k,{onPointClick:$=>{S.hidden=!1,S.textContent=`${M($.date)}: ${$.weight} lb × ${$.reps} (${Math.round($.e1rm)} e1RM)`}})}await L(),y(),_()}var oa=60;function ra(t=new Date){let e=new Date(t);return e.setDate(e.getDate()-oa),e}function it(t){let e=Math.round(t*10)/10;return e%1===0?String(e):e.toFixed(1)}function Kt(t,e,a=new Date,o=`last ${oa} days`,r=[],n=[]){let i=A(a.toISOString()),d=[`Lift Tracker — ${o} (as of ${i})`,""],b=t.filter(m=>(e.get(m.id)||[]).length>0);if(b.length===0)d.push("No sets logged in this period."),d.push("");else{for(let h of b){let g=(e.get(h.id)||[]).slice().sort((C,M)=>new Date(C.performed_at)-new Date(M.performed_at)),L=lt(g),y=Math.max(...g.map(C=>V(Number(C.weight),Number(C.reps))));d.push(h.name);for(let C of g){let M=Math.round(V(Number(C.weight),Number(C.reps)));d.push(`  ${A(C.performed_at)}: ${C.weight} lb x ${C.reps} (e1RM ${M})`)}d.push(`  Sets: ${g.length} | Volume: ${Math.round(L)} lb | Best e1RM: ${Math.round(y)}`),d.push("")}let m=t.length-b.length;m>0&&(d.push(`(${m} lift${m===1?"":"s"} with no sets in this period omitted)`),d.push(""))}if(r.length>0){d.push("Body weight");for(let y of r)d.push(`  ${y.date}: ${it(y.weight)} lb`);let m=r[0].weight,h=r[r.length-1].weight,g=h-m,L=g>0?"+":"";d.push(`  Start: ${it(m)} lb | Current: ${it(h)} lb | Change: ${L}${it(g)} lb`),d.push("")}if(n.length>0){d.push("Waist");for(let y of n)d.push(`  ${y.date}: ${it(y.waist)} in`);let m=n[0].waist,h=n[n.length-1].waist,g=h-m,L=g>0?"+":"";d.push(`  Start: ${it(m)} in | Current: ${it(h)} in | Change: ${L}${it(g)} in`),d.push("")}return d.join(`
`).trimEnd()}var Da=[{title:"Weekly killstreak",body:`The banner at the top of the list shows a Call of Duty–style
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
      It saves automatically when you tap away or press Enter.`}],Ca=`
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
`;async function na(t){t.innerHTML=`
    <header class="lt-help-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1>Help</h1>
    </header>

    <div class="lt-help-body">
      ${Da.map(y=>`
          <section class="lt-help-section">
            <h2>${y.title}</h2>
            <p>${y.body}</p>
          </section>
          ${y.title==="Export progress"?Ca:""}
        `).join("")}
    </div>
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=t.querySelector("[data-export-toggle]"),a=t.querySelector("[data-export-body]"),o=t.querySelector("[data-export-chevron]"),r=t.querySelector("[data-export-textarea]"),n=t.querySelector("[data-export-copy]"),i=t.querySelector("[data-export-status]");e.addEventListener("click",async()=>{let C=!(e.getAttribute("aria-expanded")==="true");if(e.setAttribute("aria-expanded",String(C)),a.hidden=!C,o.innerHTML=C?"&#9650;":"&#9660;",!!C){e.disabled=!0;try{let M=await Y(),_=M.map(T=>T.id),O=ra().toISOString(),H=await ke(_,O),N=new Map(M.map(T=>[T.id,[]]));for(let T of H){let R=N.get(T.lift_id);R&&R.push(T)}let k=(await ct()).filter(T=>new Date(T.logged_at)>=new Date(O)),x=ut(k),$=(await gt()).filter(T=>new Date(T.logged_at)>=new Date(O)),I=wt($);r.value=Kt(M,N,new Date,void 0,x,I),i.hidden=!0}finally{e.disabled=!1}}}),n.addEventListener("click",async()=>{r.select();let y=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(r.value),y=!0}catch{y=!1}if(!y)try{y=document.execCommand("copy")}catch{y=!1}i.hidden=!1,i.textContent=y?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."});let d=t.querySelector("[data-full-export-toggle]"),b=t.querySelector("[data-full-export-body]"),m=t.querySelector("[data-full-export-chevron]"),h=t.querySelector("[data-full-export-textarea]"),g=t.querySelector("[data-full-export-copy]"),L=t.querySelector("[data-full-export-status]");d.addEventListener("click",async()=>{let C=!(d.getAttribute("aria-expanded")==="true");if(d.setAttribute("aria-expanded",String(C)),b.hidden=!C,m.innerHTML=C?"&#9650;":"&#9660;",!!C){d.disabled=!0;try{let M=await Y(),_=M.map(S=>S.id),O=await z(_),H=new Map(M.map(S=>[S.id,[]]));for(let S of O){let $=H.get(S.lift_id);$&&$.push(S)}let N=await ct(),p=ut(N),k=await gt(),x=wt(k);h.value=Kt(M,H,new Date,"all-time",p,x),L.hidden=!0}finally{d.disabled=!1}}}),g.addEventListener("click",async()=>{h.select();let y=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(h.value),y=!0}catch{y=!1}if(!y)try{y=document.execCommand("copy")}catch{y=!1}L.hidden=!1,L.textContent=y?"Copied!":"Select all (Cmd/Ctrl+A) and copy manually."})}async function ia(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">Composite</h1>
    </header>

    <p class="lt-composite-blurb">Your average strength gain across all lifts, relative to where each one started.</p>
    <div class="lt-chart-wrap"><canvas data-composite-canvas></canvas></div>
    <p class="lt-empty" data-composite-empty hidden>Log a few workouts to see your composite progress.</p>
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=await Y(),a=e.length?await z(e.map(b=>b.id)):[],o=new Map(e.map(b=>[b.id,[]]));for(let b of a){let m=o.get(b.lift_id);m&&m.push(b)}let r=e.map(b=>({liftId:b.id,dailySeries:st(o.get(b.id)||[])})),n=qt(r),i=t.querySelector("[data-composite-canvas]"),d=t.querySelector("[data-composite-empty]");if(n.length===0){i.hidden=!0,d.hidden=!1;return}i.hidden=!1,d.hidden=!0,Rt(i,n)}function qa(t){let[e,a,o]=t.split("-").map(Number);return new Date(e,a-1,o).toLocaleDateString(void 0,{weekday:"short",month:"short",day:"numeric"})}async function Ta(){let t=await Y(),e=new Map(t.map(o=>[o.id,o.name]));return(await z(t.map(o=>o.id))).map(o=>({...o,liftName:e.get(o.lift_id)||"Unknown lift"}))}function $a(t,e){let a=new Map;for(let n of e)a.has(n.liftName)||a.set(n.liftName,[]),a.get(n.liftName).push(n);let o=Array.from(a.entries()).map(([n,i])=>{let b=i.slice().sort((m,h)=>new Date(m.performed_at)-new Date(h.performed_at)).map(m=>{let h=Math.round(V(Number(m.weight),Number(m.reps)));return`
            <li class="lt-history-row">
              <div class="lt-history-main">
                <span class="lt-history-weight">${m.weight} lb &times; ${m.reps}</span>
                <span class="lt-history-e1rm">${h} e1RM</span>
              </div>
            </li>
          `}).join("");return`
        <div class="lt-history-day-lift">
          <div class="lt-history-day-lift-name">${n}</div>
          <ul class="lt-history-list">${b}</ul>
        </div>
      `}).join(""),r=a.size;return`
    <div class="lt-history-group">
      <div class="lt-history-date">
        <span>${qa(t)}</span>
        <span class="lt-history-volume">${r} lift${r===1?"":"s"} &middot; ${e.length} set${e.length===1?"":"s"}</span>
      </div>
      ${o}
    </div>
  `}async function sa(t){t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <h1 class="lt-weight-view-title">History</h1>
    </header>
    <div class="lt-history-page" data-history-content></div>
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=t.querySelector("[data-history-content]"),a=await Ta();if(a.length===0){e.innerHTML=`<p class="lt-empty">No sets logged yet — once you log a set on any lift, it'll show up here.</p>`;return}let o=Oe(a);e.innerHTML=o.map(([r,n])=>$a(r,n)).join("")}async function la(t){t.innerHTML=`
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
  `,t.querySelector("[data-back]").addEventListener("click",P);let e=await Y(),a=e.length?await z(e.map(d=>d.id)):[],{days:o,tier:r}=Nt(a);t.querySelector("[data-killstreak-current-icon]").textContent=r?r.icon:"🎯",t.querySelector("[data-killstreak-current-label]").textContent=r?`${r.label} Killstreak`:"No Killstreak",t.querySelector("[data-killstreak-current-sub]").textContent=`${o} Day streak`;let n=je(a),i=t.querySelector("[data-killstreak-tier-list]");i.innerHTML=Wt.map(d=>{let b=n[d.key];return`
      <li class="lt-killstreak-tier-row${r?.key===d.key?" lt-killstreak-tier-row-current":""}">
        <span class="lt-killstreak-tier-icon">${d.icon}</span>
        <span class="lt-killstreak-tier-info">
          <span class="lt-killstreak-tier-name">${d.label}</span>
          <span class="lt-killstreak-tier-req">${d.days}+ day${d.days===1?"":"s"} this week</span>
        </span>
        <span class="lt-killstreak-tier-count">${b} earned</span>
      </li>
    `}).join("")}var da="__divider__";async function Yt(t,{mode:e,workoutId:a}={}){let o=e==="edit",[r,n]=await Promise.all([Y(),o?Le(a):Promise.resolve(null)]);if(o&&!n){t.innerHTML='<p class="lt-empty">Workout not found. <a href="#/">Back to list</a></p>';return}let i=new Set(o?n.liftIds:[]);t.innerHTML=`
    <header class="lt-detail-header">
      <button type="button" class="lt-back" data-back aria-label="Back to all lifts">&larr;</button>
      <input
        type="text"
        class="lt-lift-name-input"
        data-workout-name-input
        placeholder="Workout name"
        maxlength="60"
        autocomplete="off"
        value="${o?ca(n.name):""}"
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
  `,t.querySelector("[data-back]").addEventListener("click",P);let d=t.querySelector("[data-workout-name-input]"),b=t.querySelector("[data-workout-lift-list]"),m=t.querySelector("[data-workout-lifts-empty]"),h=t.querySelector("[data-save-workout]"),g=t.querySelector("[data-workout-save-feedback]");m.hidden=r.length>0;let L=r.filter(_=>i.has(_.id)),y=r.filter(_=>!i.has(_.id));b.innerHTML=[...L.map(C),M(),...y.map(C)].join("");for(let _ of r){let H=b.querySelector(`[data-lift-id="${_.id}"]`)?.querySelector("[data-name-slot]");H&&(H.textContent=_.name)}bt(b,{onReorder:()=>{}}),o&&t.querySelector("[data-delete-workout]").addEventListener("click",async()=>{window.confirm(`Delete "${n.name}"? You'll have a few seconds to undo it after.`)&&(await De(a),P(),nt(`Deleted "${n.name}"`,{onUndo:async()=>{await Ce(a),_t()}}))}),h.addEventListener("click",async()=>{let _=d.value.trim();if(!_){d.focus();return}let O=Array.from(b.querySelectorAll("[data-reorder-item]")),H=O.findIndex(p=>p.dataset.reorderItem===da),N=O.slice(0,H).map(p=>p.dataset.reorderItem);h.disabled=!0,g.hidden=!0;try{if(o)await _e(a,_,N);else{let p=await Dt();await Ct(_,N,p.length)}P()}catch(p){console.error("[lift-tracker]",p),g.hidden=!1,g.textContent="Something went wrong saving the workout.",h.disabled=!1}});function C(_){return`
      <li class="lt-lift-row" data-reorder-item="${_.id}" data-lift-id="${_.id}">
        <div class="lt-lift-row-main lt-lift-row-static">
          <span class="lt-lift-name" data-name-slot></span>
        </div>
        <button type="button" class="lt-drag-handle" aria-label="Drag ${ca(_.name)}">&#8942;&#8942;</button>
      </li>
    `}function M(){return`
      <li class="lt-workout-divider" data-reorder-item="${da}" aria-hidden="true">
        <span class="lt-workout-divider-label">Lifts above this line are in the workout</span>
      </li>
    `}}function ca(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}var Aa=`${window.location.origin}${window.location.pathname}`;function Ma(t){return String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}async function Vt(t){let e="signin";function a(r,n,i){return`
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${Ma(i||"")}">

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
    `}function o(r,n,i){t.innerHTML=a(r,n,i),t.querySelector("[data-auth-toggle]").addEventListener("click",()=>{e=e==="signup"?"signin":"signup",o()});let d=t.querySelector("[data-auth-form]");d.addEventListener("submit",async b=>{b.preventDefault();let m=d.email.value.trim(),h=d.password.value,g=d.querySelector('button[type="submit"]');g.disabled=!0,g.textContent=e==="signup"?"Creating account…":"Signing in…";try{let{data:L,error:y}=e==="signup"?await w.auth.signUp({email:m,password:h,options:{emailRedirectTo:Aa}}):await w.auth.signInWithPassword({email:m,password:h});if(y)throw y;if(e==="signup"&&!L.session){e="signin",o(null,`Account created. Check ${m} for a confirmation link, then sign in here.`,m);return}}catch(L){o(L.message||"Something went wrong. Try again.",null,m)}})}o()}function ua(){return new URLSearchParams(window.location.search).get("demo")==="1"}async function pa(){let{data:t,error:e}=await w.auth.signInAnonymously();if(e)throw e;return await Ra(),t}async function Ra(){let t=r=>new Date(Date.now()-r*24*60*60*1e3).toISOString(),[e,a,o]=await Promise.all([dt("Bench Press",0),dt("Squat",1),dt("Deadlift",2)]);await Promise.all([J(e.id,135,8,t(6)),J(e.id,145,6,t(2)),J(a.id,185,5,t(5)),J(a.id,195,5,t(1)),J(o.id,225,5,t(3))]),await Ct("Full Body",[e.id,a.id,o.id],0)}var X=document.getElementById("lift-tracker-app");async function Xt(){try{let{data:{session:t}}=await w.auth.getSession();if(!t)if(ua())try{await pa()}catch(a){console.error("[lift-tracker] guest demo sign-in failed",a),await Vt(X);return}else{await Vt(X);return}let e=ne();e.name==="detail"?await aa(X,e.liftId):e.name==="help"?await na(X):e.name==="weight"?await Ze(X):e.name==="composite"?await ia(X):e.name==="history"?await sa(X):e.name==="killstreak"?await la(X):e.name==="workout-new"?await Yt(X,{mode:"create"}):e.name==="workout-edit"?await Yt(X,{mode:"edit",workoutId:e.workoutId}):await ea(X),window.scrollTo(0,0)}catch(t){console.error("[lift-tracker]",t),X.innerHTML='<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>'}}window.addEventListener("hashchange",Xt);var fa=null,ma=!1;w.auth.onAuthStateChange((t,e)=>{let a=e?.user?.id??null,o=!ma;ma=!0;let r=a!==fa;fa=a,!(o||!r)&&(P(),Xt())});Xt();

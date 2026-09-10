let stages = [];
let concepts = {};
let prompts = [];

const $ = selector => document.querySelector(selector);
const state = {
  mastered: new Set(JSON.parse(localStorage.getItem('ls170-mastered') || '[]')),
  ratings: JSON.parse(localStorage.getItem('ls170-ratings') || '{}'),
  promptIndex: 0,
  reviewQueue: [],
  reviewIndex: 0,
  seconds: 120,
  timerId: null,
  supabase: null
};

function saveProgress() {
  localStorage.setItem('ls170-mastered', JSON.stringify([...state.mastered]));
  localStorage.setItem('ls170-ratings', JSON.stringify(state.ratings));
  updateProgress();
}

function updateProgress() {
  const percent = Math.round((state.mastered.size / Object.keys(concepts).length) * 100);
  $('#masteryText').textContent = `${percent}%`;
  $('#masteryBar').style.width = `${percent}%`;
  const next = Object.entries(concepts).find(([id]) => !state.mastered.has(id));
  $('#nextTitle').textContent = next ? `Next: ${next[1].name}` : 'Course map complete';
  $('#nextSummary').textContent = next ? next[1].definition : 'Use the interview lab to keep your explanations sharp.';
  $('#continueButton').dataset.id = next?.[0] || 'protocol';
}

function renderPath(filter = '') {
  const query = filter.trim().toLowerCase();
  $('#stageList').innerHTML = stages.map(stage => {
    const terms = stage.terms.filter(id => {
      const item = concepts[id];
      return !query || `${item.name} ${item.definition} ${item.connections.join(' ')}`.toLowerCase().includes(query);
    });
    if (!terms.length) return '';
    return `<article class="stage"><div class="stage-index">${stage.number}</div><div class="stage-body"><div class="stage-heading"><h2>${stage.title}</h2><span>${terms.filter(id => state.mastered.has(id)).length} / ${terms.length} mastered</span></div><p class="muted">${stage.summary}</p><div class="stage-actions"><div class="term-row">${terms.map(id => `<button class="term-chip ${state.mastered.has(id) ? 'mastered' : ''}" data-concept="${id}">${concepts[id].name}</button>`).join('')}</div><button class="lesson-button" data-lesson="${stage.id}">Open lesson →</button></div></div></article>`;
  }).join('') || '<p class="muted">No concepts match that search.</p>';
}

function renderLessonText(text) {
  return text.replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, (_, label, id) => `<button class="lesson-keyword" data-concept="${id}">${label}</button>`);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}

function openLesson(stageId) {
  const index = stages.findIndex(stage => stage.id === stageId);
  const stage = stages[index];
  if (!stage?.lesson) return;
  document.querySelectorAll('.view').forEach(view => { view.hidden = true; view.classList.remove('active-view'); });
  $('#lessonView').hidden = false;
  $('#lessonView').classList.add('active-view');
  $('#sectionKicker').textContent = `LESSON ${stage.number} OF ${String(stages.length).padStart(2,'0')}`;
  $('#sectionTitle').textContent = stage.title;
  const examples = stage.lesson.examples || [];
  const sections = stage.lesson.sections || [];
  const sectionLinks = sections.map((section, sectionIndex) => `<a href="#lesson-${stage.id}-${sectionIndex + 1}"><span>${String(sectionIndex + 1).padStart(2,'0')}</span>${escapeHtml(section.title)}</a>`).join('');
  const sectionContent = sections.map((section, sectionIndex) => {
    const paragraphs = section.paragraphs || [section.body];
    return `<section class="lesson-chapter" id="lesson-${stage.id}-${sectionIndex + 1}"><div class="chapter-index">${stage.number}.${sectionIndex + 1}</div><div class="chapter-copy"><h3>${escapeHtml(section.title)}</h3>${paragraphs.filter(Boolean).map(paragraph => `<p>${renderLessonText(paragraph)}</p>`).join('')}${section.callout ? `<aside class="chapter-callout"><b>Keep this distinction clear</b><p>${renderLessonText(section.callout)}</p></aside>` : ''}</div></section>`;
  }).join('');
  const objectives = stage.lesson.objectives || [];
  const checkpoint = stage.lesson.checkpoint;
  $('#lessonArticle').innerHTML = `<header class="lesson-header"><span class="lesson-number">${stage.number}</span><div><p class="eyebrow">FOUNDATION LESSON</p><h2>${stage.title}</h2><p>${stage.lesson.lede}</p></div></header>${objectives.length ? `<section class="lesson-objectives"><p class="eyebrow">BY THE END OF THIS LESSON</p><ul>${objectives.map(objective => `<li>${escapeHtml(objective)}</li>`).join('')}</ul></section>` : ''}<div class="lesson-reading-layout"><div class="lesson-sections">${sectionContent}</div></div>${examples.length ? `<section class="lesson-examples" id="lesson-${stage.id}-examples"><header><p class="eyebrow">CONCEPTS IN PRACTICE</p><h3>Worked examples</h3><p>Read each example line by line, then explain what is happening aloud.</p></header><div class="practice-grid">${examples.map((example, exampleIndex) => `<article class="practice-example"><div class="practice-label"><span>${stage.number}.E${exampleIndex + 1}</span><b>${escapeHtml(example.label)}</b></div><h4>${escapeHtml(example.title)}</h4><pre><code>${escapeHtml(example.code)}</code></pre><p>${renderLessonText(example.caption)}</p></article>`).join('')}</div></section>` : ''}${checkpoint ? `<section class="lesson-checkpoint" id="lesson-${stage.id}-checkpoint"><p class="eyebrow">CHECK YOUR UNDERSTANDING</p><h3>Explain it without notes</h3><p class="checkpoint-question">${escapeHtml(checkpoint.question)}</p><details><summary>Show the points your answer should cover</summary><ul>${checkpoint.points.map(point => `<li>${escapeHtml(point)}</li>`).join('')}</ul></details></section>` : ''}<aside class="lesson-recap"><p class="eyebrow">TERMS IN THIS LESSON</p><div class="term-row">${stage.terms.map(id => `<button class="term-chip" data-concept="${id}">${concepts[id].name}</button>`).join('')}</div></aside>`;
  const previous = stages[index - 1];
  const next = stages[index + 1];
  $('#lessonPager').innerHTML = `${previous ? `<button data-lesson="${previous.id}">← ${previous.title}</button>` : '<span></span>'}${next ? `<button data-lesson="${next.id}">${next.title} →</button>` : '<button data-view-return="path">Return to learning path</button>'}`;
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function showPath() {
  document.querySelectorAll('.view').forEach(view => { view.hidden = true; view.classList.remove('active-view'); });
  $('#pathView').hidden = false;
  $('#pathView').classList.add('active-view');
  $('#sectionKicker').textContent = 'SEQUENCED FOUNDATIONS';
  $('#sectionTitle').textContent = 'Learning path';
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === 'path'));
}

function renderMap(filter = '') {
  const query = filter.trim().toLowerCase();
  const columns = [
    {title:'FOUNDATION', ids:['protocol','layers','encapsulation','bandwidth','latency','ethernet']},
    {title:'DELIVERY', ids:['mac-address','ip','ip-address','router','packet','dns']},
    {title:'TRANSPORT', ids:['port','socket','tcp','handshake','flow-control','congestion-control','udp']},
    {title:'WEB + TRUST', ids:['client-server','url','http','request','response','statelessness','cookie','session','ajax','tls','certificate']}
  ];
  $('#conceptMap').innerHTML = columns.map(column => `<div class="map-column"><h2>${column.title}</h2>${column.ids.map(id => {
    const item = concepts[id];
    const hidden = query && !`${item.name} ${item.definition}`.toLowerCase().includes(query);
    return hidden ? '' : `<button class="map-node" data-concept="${id}" data-color="${item.color}"><b>${item.name}</b><small>${item.definition}</small></button>`;
  }).join('')}</div>`).join('');
}

function openConcept(id) {
  const item = concepts[id];
  if (!item) return;
  const connected = item.connections.filter(key => concepts[key]);
  $('#conceptDetail').innerHTML = `<article class="detail"><p class="eyebrow">${stages.find(s => s.id === item.stage)?.title.toUpperCase()}</p><h2>${item.name}</h2><p class="detail-definition">${item.definition}</p><div class="detail-grid"><section class="detail-block"><h3>Why it matters</h3><p>${item.why}</p></section><section class="detail-block"><h3>Say it in the interview</h3><p>${item.interview}</p></section><section class="detail-block"><h3>Concrete example</h3><p class="detail-example">${item.example.replaceAll('\n','<br>')}</p></section><section class="detail-block"><h3>Connected terms</h3><div class="term-row">${connected.map(key => `<button class="term-chip" data-concept="${key}">${concepts[key].name}</button>`).join('')}</div></section></div><div class="detail-actions"><span class="muted">Explain it aloud before marking complete.</span><button class="master-button" data-master="${id}">${state.mastered.has(id) ? '✓ Mastered' : 'Mark mastered'}</button></div></article>`;
  if (!$('#conceptDialog').open) $('#conceptDialog').showModal();
}

function renderPrompt() {
  const prompt = prompts[state.promptIndex];
  $('#promptTopic').textContent = prompt.topic;
  $('#promptNumber').textContent = `${state.promptIndex + 1} / ${prompts.length}`;
  $('#promptQuestion').textContent = prompt.question;
  $('#promptFollowup').textContent = prompt.followup;
  $('#answerNotes').value = '';
  $('#answerFramework').hidden = true;
  $('#answerFramework').innerHTML = `<h3>Strong answer framework</h3><ul>${prompt.points.map(point => `<li>${point}</li>`).join('')}</ul><p class="muted">Aim for a direct definition, the mechanism, and one concrete example. Stop when the question is answered.</p>`;
  resetTimer();
}

function resetTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.seconds = 120;
  $('#timer').textContent = '02:00';
  $('#timerButton').textContent = 'Start timer';
}

function toggleTimer() {
  if (state.timerId) { resetTimer(); return; }
  $('#timerButton').textContent = 'Reset';
  state.timerId = setInterval(() => {
    state.seconds = Math.max(0, state.seconds - 1);
    const minutes = String(Math.floor(state.seconds / 60)).padStart(2,'0');
    const seconds = String(state.seconds % 60).padStart(2,'0');
    $('#timer').textContent = `${minutes}:${seconds}`;
    if (!state.seconds) clearInterval(state.timerId);
  }, 1000);
}

function buildReviewQueue(shuffle = false) {
  state.reviewQueue = Object.keys(concepts).sort((a,b) => (state.ratings[a]?.score || 0) - (state.ratings[b]?.score || 0));
  if (shuffle) state.reviewQueue.sort(() => Math.random() - .5);
  state.reviewIndex = 0;
  renderReview();
}

function renderReview(revealed = false) {
  const id = state.reviewQueue[state.reviewIndex % state.reviewQueue.length];
  const item = concepts[id];
  $('#reviewCard').innerHTML = `<p class="eyebrow">ACTIVE RECALL · ${state.reviewIndex + 1} / ${state.reviewQueue.length}</p><h2>${item.name}</h2><div class="review-prompt">Define <b>${item.name}</b>, explain why it matters, and connect it to at least one related term.</div>${revealed ? `<div class="review-answer"><b>Reference answer</b><p>${item.definition} ${item.why}</p><p><b>Connection:</b> ${item.connections.filter(key=>concepts[key]).slice(0,3).map(key=>concepts[key].name).join(', ')}.</p></div><div class="rating-row"><button data-rate="1">Again</button><button data-rate="2">Uncertain</button><button data-rate="3">Clear</button></div>` : `<button id="showReviewAnswer">Show reference answer</button>`}`;
}

function showApp() {
  $('#loginView').hidden = true;
  $('#app').hidden = false;
  renderPath(); renderMap(); renderPrompt(); buildReviewQueue(); updateProgress();
}

async function loadProtectedContent() {
  const { data, error } = await state.supabase
    .from('ls170_study_content')
    .select('content')
    .eq('id', 'course')
    .single();
  if (error || !data?.content) throw new Error('The protected study content could not be loaded.');
  ({ stages, concepts, prompts } = data.content);
}

async function initAuth() {
  const config = window.LS170_CONFIG || {};
  const localPreview = ['localhost','127.0.0.1'].includes(location.hostname) && new URLSearchParams(location.search).has('preview');
  if (localPreview) {
    ({ stages, concepts, prompts } = await import('./data.js'));
    showApp();
    return;
  }
  if (!config.supabasePublishableKey) {
    $('#loginMessage').textContent = 'The secure connection is not configured yet.';
    return;
  }
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.2/+esm');
  state.supabase = createClient(config.supabaseUrl, config.supabasePublishableKey);
  const { data } = await state.supabase.auth.getSession();
  if (data.session?.user?.email === config.ownerEmail) {
    try { await loadProtectedContent(); showApp(); }
    catch (error) { $('#loginMessage').textContent = error.message; }
  }
}

document.addEventListener('click', async event => {
  const conceptButton = event.target.closest('[data-concept]');
  if (conceptButton) openConcept(conceptButton.dataset.concept);
  const lessonButton = event.target.closest('[data-lesson]');
  if (lessonButton) openLesson(lessonButton.dataset.lesson);
  if (event.target.closest('[data-view-return="path"]')) showPath();
  const masterButton = event.target.closest('[data-master]');
  if (masterButton) {
    const id = masterButton.dataset.master;
    state.mastered.has(id) ? state.mastered.delete(id) : state.mastered.add(id);
    saveProgress(); renderPath($('#search').value); openConcept(id);
  }
  const rate = event.target.closest('[data-rate]');
  if (rate) {
    const id = state.reviewQueue[state.reviewIndex % state.reviewQueue.length];
    state.ratings[id] = {score:Number(rate.dataset.rate), reviewedAt:Date.now()};
    if (Number(rate.dataset.rate) === 3) state.mastered.add(id);
    saveProgress(); state.reviewIndex++; renderReview();
  }
  if (event.target.id === 'showReviewAnswer') renderReview(true);
});

document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('.view').forEach(view => { view.hidden = true; view.classList.remove('active-view'); });
  const target = $(`#${button.dataset.view}View`); target.hidden = false; target.classList.add('active-view');
  const titles = {path:['SEQUENCED FOUNDATIONS','Learning path'],map:['CONCEPT DEPENDENCIES','Term map'],interview:['PRECISION UNDER PRESSURE','Interview lab'],review:['SPACED ACTIVE RECALL','Recall queue']};
  [$('#sectionKicker').textContent,$('#sectionTitle').textContent] = titles[button.dataset.view];
}));

$('#search').addEventListener('input', event => { renderPath(event.target.value); renderMap(event.target.value); });
$('#continueButton').addEventListener('click', event => openConcept(event.target.dataset.id));
$('#backToPath').addEventListener('click', showPath);
$('#closeDialog').addEventListener('click', () => $('#conceptDialog').close());
$('#conceptDialog').addEventListener('click', event => { if (event.target === $('#conceptDialog')) $('#conceptDialog').close(); });
$('#timerButton').addEventListener('click', toggleTimer);
$('#revealButton').addEventListener('click', () => { $('#answerFramework').hidden = false; });
$('#nextPrompt').addEventListener('click', () => { state.promptIndex = (state.promptIndex + 1) % prompts.length; renderPrompt(); });
$('#shuffleReview').addEventListener('click', () => buildReviewQueue(true));
$('#signOut').addEventListener('click', async () => { await state.supabase?.auth.signOut(); location.reload(); });
$('#loginForm').addEventListener('submit', async event => {
  event.preventDefault();
  if (!state.supabase) return;
  $('#loginMessage').textContent = 'Checking credentials…';
  const email = $('#email').value.trim();
  const { data, error } = await state.supabase.auth.signInWithPassword({email,password:$('#password').value});
  if (error || data.user?.email !== window.LS170_CONFIG.ownerEmail) {
    if (data.session) await state.supabase.auth.signOut();
    $('#loginMessage').textContent = 'That account cannot access this study tool.';
    return;
  }
  try { await loadProtectedContent(); showApp(); }
  catch (loadError) { $('#loginMessage').textContent = loadError.message; }
});

initAuth();

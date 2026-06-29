const DEFAULT_REST_SECONDS = 120;
const DEFAULT_REST_KEY = 'lt-default-rest-seconds';
const LIFT_REST_PREFIX = 'lt-lift-rest-seconds-';

let timerEl = null;
let intervalId = null;
let timeoutId = null;
let endsAt = 0;
let audioContext = null;

function readStorageNumber(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === '') return null;
    const value = Number(raw);
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

function writeStorageNumber(key, value) {
  try {
    if (value === null || value === '') {
      window.localStorage.removeItem(key);
      return;
    }
    window.localStorage.setItem(key, String(value));
  } catch {
    // Ignore preference persistence failures; the timer can still run.
  }
}

export function getDefaultRestSeconds() {
  return readStorageNumber(DEFAULT_REST_KEY) || DEFAULT_REST_SECONDS;
}

export function setDefaultRestSeconds(seconds) {
  writeStorageNumber(DEFAULT_REST_KEY, seconds);
}

export function getLiftRestSeconds(liftId) {
  return readStorageNumber(`${LIFT_REST_PREFIX}${liftId}`);
}

export function setLiftRestSeconds(liftId, seconds) {
  writeStorageNumber(`${LIFT_REST_PREFIX}${liftId}`, seconds);
}

export function restSecondsForLift(liftId) {
  return getLiftRestSeconds(liftId) || getDefaultRestSeconds();
}

function ensureTimerEl() {
  if (timerEl) return timerEl;
  timerEl = document.createElement('div');
  timerEl.className = 'lt-rest-timer';
  timerEl.innerHTML = `
    <div class="lt-rest-timer-main">
      <span class="lt-rest-timer-label">Rest</span>
      <span class="lt-rest-timer-time" data-rest-time>0:00</span>
      <span class="lt-rest-timer-lift" data-rest-lift></span>
    </div>
    <div class="lt-rest-timer-actions">
      <button type="button" data-rest-add>+30</button>
      <button type="button" data-rest-skip>Skip</button>
    </div>
  `;
  timerEl.querySelector('[data-rest-add]').addEventListener('click', () => {
    if (!endsAt) return;
    endsAt += 30 * 1000;
    renderTick();
  });
  timerEl.querySelector('[data-rest-skip]').addEventListener('click', stopRestTimer);
  document.body.appendChild(timerEl);
  return timerEl;
}

function formatRemaining(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function renderTick() {
  const el = ensureTimerEl();
  const remainingMs = endsAt - Date.now();
  el.querySelector('[data-rest-time]').textContent = formatRemaining(remainingMs);
  if (remainingMs <= 0) finishRestTimer();
}

function clearTimers() {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  intervalId = null;
  timeoutId = null;
}

function playSoftChime() {
  try {
    primeRestTimerSound();
    if (audioContext.state === 'suspended') audioContext.resume();
    const now = audioContext.currentTime;
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
    gain.connect(audioContext.destination);

    [523.25, 659.25].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, now + index * 0.12);
      oscillator.connect(gain);
      oscillator.start(now + index * 0.12);
      oscillator.stop(now + 0.75);
    });
  } catch {
    // Sound is an enhancement; the visual finished state still matters.
  }
}

export function primeRestTimerSound() {
  try {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;
    audioContext ||= new AudioContextCtor();
    if (audioContext.state === 'suspended') audioContext.resume();
  } catch {
    // Browser sound permissions vary. The visual timer still works.
  }
}

function finishRestTimer() {
  clearTimers();
  endsAt = 0;
  const el = ensureTimerEl();
  el.classList.add('lt-rest-timer-done');
  el.querySelector('.lt-rest-timer-label').textContent = 'Rest done';
  el.querySelector('[data-rest-time]').textContent = '0:00';
  playSoftChime();
  if (navigator.vibrate) navigator.vibrate([120, 70, 120]);
  timeoutId = setTimeout(stopRestTimer, 12000);
}

export function stopRestTimer() {
  clearTimers();
  endsAt = 0;
  if (timerEl) timerEl.classList.remove('lt-rest-timer-visible', 'lt-rest-timer-done');
}

export function startRestTimer({ seconds, liftName = '' } = {}) {
  const duration = Number(seconds);
  if (!Number.isFinite(duration) || duration <= 0) return;

  const el = ensureTimerEl();
  clearTimers();
  endsAt = Date.now() + duration * 1000;
  el.classList.remove('lt-rest-timer-done');
  el.classList.add('lt-rest-timer-visible');
  el.querySelector('.lt-rest-timer-label').textContent = 'Rest';
  el.querySelector('[data-rest-lift]').textContent = liftName;
  renderTick();
  intervalId = setInterval(renderTick, 250);
}

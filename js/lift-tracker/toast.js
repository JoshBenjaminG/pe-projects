// A single reusable "Undo" toast (delete lift / delete set both use this).
let toastEl = null;
let timer = null;

function ensureToastEl() {
  if (toastEl) return toastEl;
  toastEl = document.createElement('div');
  toastEl.className = 'lt-toast';
  document.body.appendChild(toastEl);
  return toastEl;
}

/**
 * @param {string} message
 * @param {{onUndo?:Function, onExpire?:Function, durationMs?:number}} opts
 */
export function showUndoToast(message, { onUndo, onExpire, durationMs = 5000 } = {}) {
  const el = ensureToastEl();
  clearTimeout(timer);

  el.innerHTML = `
    <span class="lt-toast-message"></span>
    <button type="button" class="lt-toast-undo">Undo</button>
  `;
  el.querySelector('.lt-toast-message').textContent = message;
  el.classList.add('lt-toast-visible');

  const undoBtn = el.querySelector('.lt-toast-undo');
  const close = () => el.classList.remove('lt-toast-visible');

  undoBtn.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      close();
      if (onUndo) onUndo();
    },
    { once: true }
  );

  timer = setTimeout(() => {
    close();
    if (onExpire) onExpire();
  }, durationMs);
}

export function showNoticeToast(message, { durationMs = 4500 } = {}) {
  const el = ensureToastEl();
  clearTimeout(timer);

  el.innerHTML = `<span class="lt-toast-message"></span>`;
  el.querySelector('.lt-toast-message').textContent = message;
  el.classList.add('lt-toast-visible');

  timer = setTimeout(() => {
    el.classList.remove('lt-toast-visible');
  }, durationMs);
}

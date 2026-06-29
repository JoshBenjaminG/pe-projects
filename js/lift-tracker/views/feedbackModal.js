// Quick feedback prompt — collects a short bug report or idea and hands it
// off to the user's email client via a mailto: link. No backend storage of
// the message itself -- the only thing persisted is a no-content
// "feedback was submitted" marker (see api.js: recordFeedbackSubmission),
// used solely to gate the secret-one-wish-willow achievement.
import { recordFeedbackSubmission } from '../api.js';

const FEEDBACK_EMAIL = 'joshuaegage@gmail.com';

export function openFeedbackModal() {
  const returnFocusEl = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
  const overlay = document.createElement('div');
  overlay.className = 'lt-feedback-overlay';
  overlay.innerHTML = `
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
  `;
  document.body.appendChild(overlay);
  document.body.classList.add('lt-feedback-modal-open');

  const textarea = overlay.querySelector('[data-feedback-text]');
  textarea.focus({ preventScroll: true });

  let isClosed = false;
  function close() {
    if (isClosed) return;
    isClosed = true;
    document.removeEventListener('keydown', handleKeyDown);
    overlay.remove();
    document.body.classList.remove('lt-feedback-modal-open');

    const scroller = document.scrollingElement;
    if (scroller) scroller.scrollLeft = 0;
    if (returnFocusEl && document.contains(returnFocusEl)) {
      requestAnimationFrame(() => returnFocusEl.focus({ preventScroll: true }));
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') close();
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', handleKeyDown);

  overlay.querySelector('[data-feedback-cancel]').addEventListener('click', close);

  overlay.querySelector('[data-feedback-send]').addEventListener('click', () => {
    const message = textarea.value.trim();
    const subject = encodeURIComponent('Lift Tracker feedback');
    const body = encodeURIComponent(message || '(no message entered)');
    // Best-effort: never let a logging failure (offline, signed out, etc.)
    // block the actual feedback email from going out.
    recordFeedbackSubmission().catch(() => {});
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    close();
  });
}

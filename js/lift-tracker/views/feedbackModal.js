// Quick feedback prompt — collects a short bug report or idea and hands it
// off to the user's email client via a mailto: link. Deliberately no
// backend or schema changes: this is meant to be the simplest thing that
// gets a message to joshuaegage@gmail.com, not a full feedback system.
const FEEDBACK_EMAIL = 'joshuaegage@gmail.com';

export function openFeedbackModal() {
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

  const textarea = overlay.querySelector('[data-feedback-text]');
  textarea.focus();

  function close() {
    overlay.remove();
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  overlay.querySelector('[data-feedback-cancel]').addEventListener('click', close);

  overlay.querySelector('[data-feedback-send]').addEventListener('click', () => {
    const message = textarea.value.trim();
    const subject = encodeURIComponent('Lift Tracker feedback');
    const body = encodeURIComponent(message || '(no message entered)');
    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
    close();
  });
}

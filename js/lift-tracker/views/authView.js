// Sign-in / sign-up form. Shown by main.js whenever there's no active
// Supabase session — this is the real per-account gate now (the old shared
// site password has been retired). No DB access of its own beyond the auth
// calls; everything else still goes through api.js once a session exists.
import { supabase } from '../supabaseClient.js';

// The app is served from more than one domain (peprojects.dev and
// josheg.com), so the email-confirmation link has to point back at whichever
// one the person actually signed up from, not a hardcoded domain. Deriving
// it from the page's own location does that automatically — it also means
// adding a third domain later needs no code change, just allow-listing it
// in Supabase's Redirect URLs.
const EMAIL_CONFIRM_REDIRECT_TO = `${window.location.origin}${window.location.pathname}`;

function escapeAttr(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

export async function renderAuthView(root) {
  let mode = 'signin'; // 'signin' | 'signup'

  function template(error, info, prefillEmail) {
    return `
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required value="${escapeAttr(prefillEmail || '')}">

          <label for="lt-password">Password</label>
          <input
            type="password"
            id="lt-password"
            name="password"
            autocomplete="${mode === 'signup' ? 'new-password' : 'current-password'}"
            minlength="6"
            required
          >

          <button type="submit">${mode === 'signup' ? 'Create account' : 'Sign in'}</button>

          ${error ? `<p class="lt-gate-error">${error}</p>` : ''}
          ${info ? `<p class="lt-gate-info">${info}</p>` : ''}

          <button type="button" class="lt-gate-toggle" data-auth-toggle>
            ${mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </form>
      </main>
    `;
  }

  function renderForm(error, info, prefillEmail) {
    root.innerHTML = template(error, info, prefillEmail);

    root.querySelector('[data-auth-toggle]').addEventListener('click', () => {
      mode = mode === 'signup' ? 'signin' : 'signup';
      renderForm();
    });

    const form = root.querySelector('[data-auth-form]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const password = form.password.value;
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = mode === 'signup' ? 'Creating account…' : 'Signing in…';

      try {
        const { data, error } =
          mode === 'signup'
            ? await supabase.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: EMAIL_CONFIRM_REDIRECT_TO },
              })
            : await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (mode === 'signup' && !data.session) {
          // Email confirmation is required — there's no session yet, so
          // onAuthStateChange won't fire. Tell the person to check their
          // inbox instead of leaving the form looking like nothing happened.
          mode = 'signin';
          renderForm(null, `Account created. Check ${email} for a confirmation link, then sign in here.`, email);
          return;
        }
        // On success with a session, main.js's onAuthStateChange listener
        // takes over and re-renders into the real app — nothing else to do.
      } catch (err) {
        renderForm(err.message || 'Something went wrong. Try again.', null, email);
      }
    });
  }

  renderForm();
}

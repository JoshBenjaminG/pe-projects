// Sign-in / sign-up form. Shown by main.js whenever there's no active
// Supabase session — this is the real per-account gate now (the old shared
// site password has been retired). No DB access of its own beyond the auth
// calls; everything else still goes through api.js once a session exists.
import { supabase } from '../supabaseClient.js';

export async function renderAuthView(root) {
  let mode = 'signin'; // 'signin' | 'signup'

  function template(error) {
    return `
      <main class="lt-gate">
        <form class="lt-gate-form" data-auth-form>
          <h1 class="lt-gate-title">Lift Tracker</h1>

          <label for="lt-email">Email</label>
          <input type="email" id="lt-email" name="email" autocomplete="email" required>

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

          <button type="button" class="lt-gate-toggle" data-auth-toggle>
            ${mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </form>
      </main>
    `;
  }

  function renderForm(error) {
    root.innerHTML = template(error);

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

      try {
        const { error } =
          mode === 'signup'
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // On success, main.js's onAuthStateChange listener takes over and
        // re-renders into the real app — nothing else to do here.
      } catch (err) {
        submitBtn.disabled = false;
        renderForm(err.message || 'Something went wrong. Try again.');
      }
    });
  }

  renderForm();
}

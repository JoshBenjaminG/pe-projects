import { supabase } from './supabaseClient.js';
import { parseRoute, goToList } from './state.js';
import { renderListView } from './views/listView.js';
import { renderDetailView } from './views/detailView.js';
import { renderHelpView } from './views/helpView.js';
import { renderAuthView } from './views/authView.js';

const root = document.getElementById('lift-tracker-app');

async function render() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      await renderAuthView(root);
      return;
    }

    const route = parseRoute();
    if (route.name === 'detail') {
      await renderDetailView(root, route.liftId);
    } else if (route.name === 'help') {
      await renderHelpView(root);
    } else {
      await renderListView(root);
    }

    // Each branch above swaps in a whole new "page" of content, but since
    // this is all one physical document (hash routing, no real navigation),
    // the browser doesn't reset scroll on its own. Without this, opening a
    // lift while scrolled down on the list view leaves you scrolled down on
    // the detail view too, hiding the lift name and quick-log form.
    window.scrollTo(0, 0);
  } catch (err) {
    console.error('[lift-tracker]', err);
    root.innerHTML = `<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>`;
  }
}

window.addEventListener('hashchange', render);

// Re-render on sign-in/sign-out so the auth gate and the app swap
// automatically without a full page reload. Supabase also fires this same
// listener on a plain token refresh -- which it triggers automatically
// whenever the tab regains focus (e.g. the phone screen turning back on) --
// so we only react to actual sign-in/sign-out events. Otherwise, waking the
// phone while viewing a lift would bounce you back to the list page.
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
    goToList();
    render();
  }
});

render();

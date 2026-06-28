import { supabase } from './supabaseClient.js';
import { parseRoute, goToList } from './state.js';
import { renderListView } from './views/listView.js';
import { renderDetailView } from './views/detailView.js';
import { renderHelpView } from './views/helpView.js';
import { renderWeightView } from './views/weightView.js';
import { renderCompositeView } from './views/compositeView.js';
import { renderHistoryView } from './views/historyView.js';
import { renderKillstreakView } from './views/killstreakView.js';
import { renderWorkoutFormView } from './views/workoutFormView.js';
import { renderAuthView } from './views/authView.js';
import { isDemoLink, startGuestSession } from './demo.js';

const root = document.getElementById('lift-tracker-app');

async function render() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      if (isDemoLink()) {
        try {
          await startGuestSession();
        } catch (err) {
          // Most likely cause: anonymous sign-ins aren't enabled on the
          // Supabase project. Fall back to the normal gate rather than
          // showing the generic error screen for what's just a demo link.
          console.error('[lift-tracker] guest demo sign-in failed', err);
          await renderAuthView(root);
          return;
        }
      } else {
        await renderAuthView(root);
        return;
      }
    }

    const route = parseRoute();
    if (route.name === 'detail') {
      await renderDetailView(root, route.liftId);
    } else if (route.name === 'help') {
      await renderHelpView(root);
    } else if (route.name === 'weight') {
      await renderWeightView(root);
    } else if (route.name === 'composite') {
      await renderCompositeView(root);
    } else if (route.name === 'history') {
      await renderHistoryView(root);
    } else if (route.name === 'killstreak') {
      await renderKillstreakView(root);
    } else if (route.name === 'workout-new') {
      await renderWorkoutFormView(root, { mode: 'create' });
    } else if (route.name === 'workout-edit') {
      await renderWorkoutFormView(root, { mode: 'edit', workoutId: route.workoutId });
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

// Re-render when the signed-in account actually changes, so the auth gate
// and the app swap automatically without a full page reload.
//
// This listener fires far more often than just real sign-ins/sign-outs --
// Supabase also calls it on routine token refreshes, on the page's initial
// load (reporting whatever session it restored from storage), and to sync
// state across browser tabs (e.g. switching to another tab and back). In
// several of those cases it reports an event that looks identical to a
// fresh sign-in (SIGNED_IN), so filtering by event name isn't reliable --
// we'd either miss real sign-ins or react to ones that aren't real.
//
// Instead, track which user (if any) was last signed in, and only treat it
// as a real sign-in/sign-out -- and navigate to the list page -- when that
// actually changes. Anything else (refresh, reload restoring the same
// session, tab-focus sync) leaves you exactly where you were.
let lastUserId = null;
let authListenerFired = false;
supabase.auth.onAuthStateChange((event, session) => {
  const currentUserId = session?.user?.id ?? null;
  const isFirstCallback = !authListenerFired;
  authListenerFired = true;

  const userChanged = currentUserId !== lastUserId;
  lastUserId = currentUserId;

  if (isFirstCallback || !userChanged) return;

  goToList();
  render();
});

render();

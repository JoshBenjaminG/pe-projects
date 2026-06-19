import { parseRoute, goToList } from './state.js';
import { renderListView } from './views/listView.js';
import { renderDetailView } from './views/detailView.js';

const root = document.getElementById('lift-tracker-app');

async function render() {
  const route = parseRoute();
  try {
    if (route.name === 'detail') {
      await renderDetailView(root, route.liftId);
    } else {
      await renderListView(root);
    }
  } catch (err) {
    console.error('[lift-tracker]', err);
    root.innerHTML = `<p class="lt-error">Something went wrong loading the lift tracker. Open the console for details.</p>`;
  }
}

window.addEventListener('hashchange', render);
render();

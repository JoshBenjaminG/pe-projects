// Touch-friendly drag-to-reorder using Pointer Events (works for mouse,
// touch, and pen with one code path). Bind once per list container; it uses
// event delegation so it keeps working as rows are re-rendered.
//
// Markup contract: each draggable row is a direct child of `container` with
// `data-reorder-item="<id>"`, and contains a `.lt-drag-handle` element that
// acts as the grab handle.
export function enableDragReorder(container, { onReorder } = {}) {
  let dragging = null;
  let placeholder = null;
  let startY = 0;
  let startTop = 0;

  function getItems() {
    return Array.from(container.querySelectorAll('[data-reorder-item]'));
  }

  function onPointerDown(e) {
    const handle = e.target.closest('.lt-drag-handle');
    if (!handle) return;
    const item = handle.closest('[data-reorder-item]');
    if (!item) return;

    e.preventDefault();
    dragging = item;
    startY = e.clientY;
    const rect = item.getBoundingClientRect();
    startTop = rect.top;

    placeholder = document.createElement('li');
    placeholder.className = 'lt-reorder-placeholder';
    placeholder.style.height = `${item.offsetHeight}px`;
    item.after(placeholder);

    item.classList.add('lt-dragging');
    item.style.position = 'fixed';
    item.style.left = `${rect.left}px`;
    item.style.width = `${rect.width}px`;
    item.style.top = `${startTop}px`;
    item.style.zIndex = '1000';

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    const delta = e.clientY - startY;
    dragging.style.top = `${startTop + delta}px`;

    const items = getItems().filter((i) => i !== dragging);
    const dragRect = dragging.getBoundingClientRect();
    const dragMid = dragRect.top + dragRect.height / 2;

    let target = null;
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (dragMid < mid) {
        target = item;
        break;
      }
    }

    if (target) {
      container.insertBefore(placeholder, target);
    } else {
      container.appendChild(placeholder);
    }
  }

  function onPointerUp() {
    if (!dragging) return;
    placeholder.replaceWith(dragging);
    dragging.classList.remove('lt-dragging');
    dragging.style.position = '';
    dragging.style.left = '';
    dragging.style.width = '';
    dragging.style.top = '';
    dragging.style.zIndex = '';

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    const newOrder = getItems().map((item) => item.dataset.reorderItem);
    dragging = null;
    placeholder = null;
    if (onReorder) onReorder(newOrder);
  }

  container.addEventListener('pointerdown', onPointerDown);
}

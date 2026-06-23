// Touch-friendly drag-to-reorder using Pointer Events (works for mouse,
// touch, and pen with one code path). Bind once per list container; it uses
// event delegation so it keeps working as rows are re-rendered.
//
// Markup contract: each draggable row is a direct child of `container` with
// `data-reorder-item="<id>"`, and contains a `.lt-drag-handle` element that
// acts as the grab handle.
//
// Touch needs a "press and hold to arm" step before a drag actually starts.
// The handle has no good way to tell a deliberate hold-then-drag apart from
// a finger that happens to land on the handle while swiping to scroll the
// page -- both are a vertical pointer movement starting in the same place.
// Without the hold, that accidental touch instantly grabbed the row instead
// of letting the scroll continue. A short delay (with a small movement
// cancel-threshold) lets a quick scroll-through gesture cancel out and fall
// through to the browser's normal scrolling, while a real hold arms the
// drag. Mouse/pen don't have this ambiguity, so they skip the delay.
const TOUCH_ARM_DELAY_MS = 180;
const ARM_CANCEL_THRESHOLD_PX = 10;

export function enableDragReorder(container, { onReorder } = {}) {
  let dragging = null;
  let placeholder = null;
  let startY = 0;
  let startTop = 0;

  let armTimer = null;
  let pendingItem = null;
  let pendingStartX = 0;
  let pendingStartY = 0;

  function getItems() {
    return Array.from(container.querySelectorAll('[data-reorder-item]'));
  }

  function onPointerDown(e) {
    const handle = e.target.closest('.lt-drag-handle');
    if (!handle) return;
    const item = handle.closest('[data-reorder-item]');
    if (!item) return;

    if (e.pointerType !== 'touch') {
      // Mouse/pen: arm immediately, same as before.
      e.preventDefault();
      armDrag(item, e.clientY);
      return;
    }

    pendingItem = item;
    pendingStartX = e.clientX;
    pendingStartY = e.clientY;
    document.addEventListener('pointermove', onPendingMove);
    document.addEventListener('pointerup', onPendingUp);
    armTimer = setTimeout(() => {
      clearPending();
      armDrag(item, pendingStartY);
    }, TOUCH_ARM_DELAY_MS);
  }

  function clearPending() {
    clearTimeout(armTimer);
    armTimer = null;
    pendingItem = null;
    document.removeEventListener('pointermove', onPendingMove);
    document.removeEventListener('pointerup', onPendingUp);
  }

  function onPendingMove(e) {
    if (!pendingItem) return;
    const dx = e.clientX - pendingStartX;
    const dy = e.clientY - pendingStartY;
    if (Math.hypot(dx, dy) > ARM_CANCEL_THRESHOLD_PX) {
      // Moved before the hold completed -- treat as a scroll attempt, not
      // a drag. Never called preventDefault, so the page scrolls normally.
      clearPending();
    }
  }

  function onPendingUp() {
    // Released before the hold completed -- just a tap, not a drag.
    clearPending();
  }

  function armDrag(item, clientY) {
    dragging = item;
    startY = clientY;
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
    e.preventDefault();
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

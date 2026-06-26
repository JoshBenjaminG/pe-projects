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
// A short delay (with a small movement cancel-threshold) gives a real hold
// time to arm the drag; a finger that moves before that abandons the
// gesture instead.
//
// The handle has touch-action: none (see lift-tracker.css), which blocks
// the browser's native scrolling for the whole touch gesture that starts
// there -- not just the moment a drag is actually armed. Earlier versions
// tried to paper over that by replicating scrolling manually in JS once a
// touch on the handle turned out to be a swipe rather than a hold. That
// fought with the browser's own gesture handling every frame (flicker,
// smear, scrolling at the wrong speed) even after adding pointer capture
// and batching the scroll writes per animation frame. Scrolling from the
// dots simply isn't supported now: a touch that starts there either holds
// still long enough to arm a drag, or gets abandoned -- to scroll the page,
// use any other part of the row.
const TOUCH_ARM_DELAY_MS = 180;
const ARM_CANCEL_THRESHOLD_PX = 10;

// While dragging, holding the pointer within this many pixels of the top or
// bottom edge of the viewport auto-scrolls the page, same as most drag-to-
// reorder UIs (the touch-action: none on the handle blocks the browser's
// own edge-scroll for the whole gesture, so without this a row dragged
// toward either edge just gets stuck there). Speed ramps from 0 up to
// AUTO_SCROLL_MAX_SPEED_PX the closer the pointer gets to the edge.
const AUTO_SCROLL_EDGE_PX = 80;
const AUTO_SCROLL_MAX_SPEED_PX = 16;

export function enableDragReorder(container, { onReorder, axis = 'y' } = {}) {
  // axis: 'y' (default) is the original vertical list behavior (lift rows).
  // 'x' is for a horizontally flex-wrapping row (workout pills) -- items
  // move left/right instead of up/down, and the insertion point is found
  // in reading order (same row: left-to-right, different row: top-to-
  // bottom) so it still behaves sensibly if the row wraps onto a second
  // line on narrow screens. Auto-scroll only makes sense for axis 'y' --
  // a wrapped pill row doesn't scroll the page on its own.
  let dragging = null;
  let placeholder = null;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  let currentClientY = 0;
  let autoScrollRAF = null;

  let armTimer = null;
  let pendingItem = null;
  let pendingStartX = 0;
  let pendingStartY = 0;

  // The handle + pointer id we've captured for the current touch gesture
  // (see onPointerDown). Held for the gesture's full lifetime -- pending,
  // armed, or abandoned -- and released only once the touch actually ends.
  let capturedHandle = null;
  let capturedPointerId = null;

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
      armDrag(item, e.clientX, e.clientY);
      return;
    }

    // Claim this pointer for the rest of the gesture, so the browser
    // doesn't also try to interpret it natively in parallel with our own
    // handling below.
    if (handle.setPointerCapture) {
      try {
        handle.setPointerCapture(e.pointerId);
        capturedHandle = handle;
        capturedPointerId = e.pointerId;
      } catch {
        // Ignore -- capture is a reliability improvement, not required.
      }
    }

    pendingItem = item;
    pendingStartX = e.clientX;
    pendingStartY = e.clientY;
    document.addEventListener('pointermove', onPendingMove);
    document.addEventListener('pointerup', onPendingUp);
    armTimer = setTimeout(() => {
      clearTimeout(armTimer);
      armTimer = null;
      const item2 = pendingItem;
      const x = pendingStartX;
      const y = pendingStartY;
      clearPending();
      armDrag(item2, x, y);
    }, TOUCH_ARM_DELAY_MS);
  }

  function releaseCapture() {
    if (capturedHandle && capturedPointerId !== null && capturedHandle.releasePointerCapture) {
      try {
        capturedHandle.releasePointerCapture(capturedPointerId);
      } catch {
        // Already released (e.g. by the browser on pointerup) -- fine.
      }
    }
    capturedHandle = null;
    capturedPointerId = null;
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
    if (Math.hypot(dx, dy) <= ARM_CANCEL_THRESHOLD_PX) return;

    // Moved before the hold completed. The handle already blocks native
    // scrolling for this whole touch either way, so there's no scroll to
    // fall through to -- just abandon the gesture instead of trying to
    // drive scrolling ourselves (see the file header comment for why).
    clearPending();
    releaseCapture();
  }

  function onPendingUp() {
    // Released before the hold completed -- just a tap, not a drag.
    clearPending();
    releaseCapture();
  }

  function armDrag(item, clientX, clientY) {
    dragging = item;
    startX = clientX;
    startY = clientY;
    currentClientY = clientY;
    const rect = item.getBoundingClientRect();
    startTop = rect.top;
    startLeft = rect.left;

    // Matches the dragged item's own tag (<li> for the vertical lift list,
    // <div> for the horizontally-wrapping workout pills row) so it sizes
    // and lays out the same way the real item would.
    placeholder = document.createElement(item.tagName);
    placeholder.className = 'lt-reorder-placeholder';
    placeholder.style.height = `${item.offsetHeight}px`;
    placeholder.style.width = `${item.offsetWidth}px`;
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

  // Moves the placeholder to wherever the dragged item's current position
  // (in viewport coordinates) puts it among the other rows. Called both on
  // every pointermove and on every auto-scroll tick, since auto-scrolling
  // changes the other rows' viewport positions without any pointermove
  // event firing.
  function updatePlaceholder() {
    const items = getItems().filter((i) => i !== dragging);
    const dragRect = dragging.getBoundingClientRect();
    let target = null;

    if (axis === 'x') {
      const dragMidX = dragRect.left + dragRect.width / 2;
      const dragMidY = dragRect.top + dragRect.height / 2;
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const midY = rect.top + rect.height / 2;
        // An item on the same wrapped row as the dragged one is compared
        // by horizontal position; an item on a different row is simply
        // "before" or "after" by row -- same reading order a person would
        // use to scan a wrapped row of pills.
        const sameRow = Math.abs(midY - dragMidY) < rect.height / 2;
        const isBefore = sameRow ? dragMidX < midX : dragMidY < midY;
        if (isBefore) {
          target = item;
          break;
        }
      }
    } else {
      const dragMid = dragRect.top + dragRect.height / 2;
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        if (dragMid < mid) {
          target = item;
          break;
        }
      }
    }

    if (target) {
      container.insertBefore(placeholder, target);
    } else {
      container.appendChild(placeholder);
    }
  }

  // How fast (px/frame) and which direction to auto-scroll given how close
  // the pointer is to the top/bottom edge of the viewport. 0 means "not in
  // either edge zone" -- no auto-scroll needed.
  function autoScrollSpeed() {
    const distanceFromTop = currentClientY;
    const distanceFromBottom = window.innerHeight - currentClientY;

    if (distanceFromTop < AUTO_SCROLL_EDGE_PX) {
      const factor = 1 - distanceFromTop / AUTO_SCROLL_EDGE_PX;
      return -AUTO_SCROLL_MAX_SPEED_PX * factor;
    }
    if (distanceFromBottom < AUTO_SCROLL_EDGE_PX) {
      const factor = 1 - distanceFromBottom / AUTO_SCROLL_EDGE_PX;
      return AUTO_SCROLL_MAX_SPEED_PX * factor;
    }
    return 0;
  }

  function autoScrollTick() {
    if (!dragging) {
      autoScrollRAF = null;
      return;
    }
    const speed = autoScrollSpeed();
    if (speed === 0) {
      autoScrollRAF = null;
      return;
    }
    window.scrollBy(0, speed);
    updatePlaceholder();
    autoScrollRAF = requestAnimationFrame(autoScrollTick);
  }

  // Starts the auto-scroll loop if the pointer is currently in an edge zone
  // and the loop isn't already running. Safe to call on every pointermove --
  // it's a no-op once a loop is already in flight, and autoScrollTick stops
  // itself (and lets a later call restart it) once the pointer leaves the
  // edge zone.
  function maybeStartAutoScroll() {
    if (autoScrollRAF !== null) return;
    if (autoScrollSpeed() === 0) return;
    autoScrollRAF = requestAnimationFrame(autoScrollTick);
  }

  function stopAutoScroll() {
    if (autoScrollRAF !== null) {
      cancelAnimationFrame(autoScrollRAF);
      autoScrollRAF = null;
    }
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();
    currentClientY = e.clientY;

    if (axis === 'x') {
      // Pills can wrap onto a second line, so this needs to be a real 2D
      // drag -- updating only `left` left the dragged pill pinned to its
      // starting row forever, which meant it could never visually cross
      // into a different wrapped row no matter how far up/down the
      // pointer moved (and updatePlaceholder's same-row/different-row
      // check never saw anything but "same row" as a result, since it
      // reads the dragged item's own current rect).
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      dragging.style.left = `${startLeft + deltaX}px`;
      dragging.style.top = `${startTop + deltaY}px`;
    } else {
      const delta = e.clientY - startY;
      dragging.style.top = `${startTop + delta}px`;
    }

    updatePlaceholder();
    if (axis === 'y') maybeStartAutoScroll();
  }

  function onPointerUp() {
    if (!dragging) return;
    stopAutoScroll();
    placeholder.replaceWith(dragging);
    dragging.classList.remove('lt-dragging');
    dragging.style.position = '';
    dragging.style.left = '';
    dragging.style.width = '';
    dragging.style.top = '';
    dragging.style.zIndex = '';

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    releaseCapture();

    const newOrder = getItems().map((item) => item.dataset.reorderItem);
    dragging = null;
    placeholder = null;
    if (onReorder) onReorder(newOrder);
  }

  container.addEventListener('pointerdown', onPointerDown);
}

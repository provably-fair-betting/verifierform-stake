import { scrollToCenterHorizontally } from '$lib/util/scroll';

/** Find the first ancestor element that has the `overflow-x-auto` class. */
function findScrollableAncestor(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && !node.classList.contains('overflow-x-auto')) {
    node = node.parentElement;
  }
  return node;
}

/**
 * Manages the "Reset Scroll" button for any horizontally scrollable container.
 *
 * Handles the full lifecycle:
 * - Programmatically scrolls to centre `getCell()` inside `getContainer()` each time
 *   either getter changes, waiting for reveal animations via the `onScrolled` callback.
 * - Tracks whether the user has manually scrolled away from that settled position.
 * - Exposes `showResetButton` so the component can render the button conditionally.
 * - Exposes `scrollToTarget()` for the reset button's onclick handler.
 *
 * @param getContainer     Reactive getter returning the scrollable container element.
 * @param getCell          Reactive getter returning the element to centre on.
 * @param stickyLeftWidth  Width in px of any sticky left column (default: 0).
 */
export function useScrollReset(
  getContainer: () => HTMLElement | null,
  getCell: () => HTMLElement | null,
  stickyLeftWidth: number = 0
) {
  let scrollReady = $state(false);
  let scrolledAway = $state(false);
  let targetScrollPosition = $state(0);

  const showResetButton = $derived.by(() => {
    const container = getContainer();
    return (
      scrollReady &&
      scrolledAway &&
      container !== null &&
      container.scrollWidth > container.clientWidth
    );
  });

  function isScrolledAway(current: number, target: number): boolean {
    return Math.abs(current - target) > 10;
  }

  function doScroll(container: HTMLElement, cell: HTMLElement): () => void {
    scrollReady = false;
    scrolledAway = false;

    return scrollToCenterHorizontally(container, cell, stickyLeftWidth, (settledLeft) => {
      targetScrollPosition = settledLeft;
      scrolledAway = false;
      scrollReady = true;
    });
  }

  $effect(() => {
    const container = getContainer();
    const cell = getCell();

    if (!container || !cell) return;

    const cleanup = doScroll(container, cell);

    const handleScroll = () => {
      if (!scrollReady) return;
      scrolledAway = isScrolledAway(container.scrollLeft, targetScrollPosition);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cleanup();
      container.removeEventListener('scroll', handleScroll);
    };
  });

  function scrollToTarget() {
    const container = getContainer();
    const cell = getCell();
    if (!container || !cell) return;
    doScroll(container, cell);
  }

  return {
    get showResetButton() {
      return showResetButton;
    },
    scrollToTarget,
  };
}

/**
 * Convenience wrapper around `useScrollReset` for tables inside `ScrollableContainer`.
 *
 * Handles the `overflow-x-auto` ancestor lookup and the `[data-col="${index}"]` cell
 * query, so the component only needs to provide its wrapper element and the active
 * column index.
 *
 * @param getWrapper       Reactive getter returning the div wrapping the table (bind:this).
 * @param getIndex         Reactive getter returning the column index to centre on (-1 = inactive).
 * @param stickyLeftWidth  Width in px of the sticky left column (default: 0).
 *
 * @example
 * const scrollReset = useTableScrollReset(() => tableWrapper, () => matchedIndex, 110);
 */
export function useTableScrollReset(
  getWrapper: () => HTMLElement | null,
  getIndex: () => number,
  stickyLeftWidth: number = 0
) {
  return useScrollReset(
    () => {
      const wrapper = getWrapper();
      return wrapper ? findScrollableAncestor(wrapper) : null;
    },
    () => {
      const wrapper = getWrapper();
      const idx = getIndex();
      if (!wrapper || idx === -1) return null;
      return wrapper.querySelector<HTMLElement>(`[data-col="${idx}"]`);
    },
    stickyLeftWidth
  );
}

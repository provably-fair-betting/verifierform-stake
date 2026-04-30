interface ScrollToCenterOptions {
  behavior?: 'auto' | 'smooth';
  offset?: number;
  timeout?: number;
  checkInterval?: number;
}

interface VisibilityCheckOptions {
  signal?: AbortSignal;
  checkInterval?: number;
}

/**
 * Horizontally centers a cell element inside a scrollable container.
 * Retries via ResizeObserver when the container has no width yet (e.g. during
 * reveal animations). Returns a cleanup function that disconnects the observer.
 *
 * @param container Scrollable container element
 * @param cell The child element to scroll into horizontal center
 * @param stickyLeftWidth Optional width of sticky left column to offset centering (default: 0)
 * @param onScrolled Optional callback invoked each time scrollLeft is actually set,
 *   receiving the final scrollLeft value. Use this to record the settled target position.
 * @returns Cleanup function – call it to stop watching for resize
 */
export function scrollToCenterHorizontally(
  container: HTMLElement,
  cell: HTMLElement,
  stickyLeftWidth: number = 0,
  onScrolled?: (scrollLeft: number) => void
): () => void {
  function doScroll() {
    const containerWidth = container.offsetWidth;
    if (containerWidth === 0) return;
    // Adjust the centering calculation to account for sticky left column
    // The visible scrollable area is reduced by the sticky column width
    const visibleWidth = containerWidth - stickyLeftWidth;
    const targetScroll =
      cell.offsetLeft - stickyLeftWidth - visibleWidth / 2 + cell.offsetWidth / 2;
    // Ensure scroll position is never negative
    container.scrollLeft = Math.max(0, targetScroll);
    onScrolled?.(container.scrollLeft);
  }

  requestAnimationFrame(doScroll);

  let lastWidth = container.offsetWidth;
  const ro = new ResizeObserver(() => {
    const w = container.offsetWidth;
    if (w > 0 && w !== lastWidth) {
      lastWidth = w;
      doScroll();
    }
  });
  ro.observe(container);

  return () => ro.disconnect();
}

/**
 * Scrolls to center an element vertically, waiting for it to become visible if needed
 * @param container Scrollable container element
 * @param element Element or selector to scroll to
 * @param options Configuration options
 * @returns Promise that resolves when scrolled or rejects if timeout
 */
export async function scrollToCenterVertically(
  container: HTMLElement,
  element: HTMLElement | string,
  options: ScrollToCenterOptions = {}
): Promise<void> {
  const { behavior = 'smooth', offset = 0, timeout = 0, checkInterval = 100 } = options;

  // Resolve element if selector was passed
  const targetElement =
    typeof element === 'string' ? document.querySelector<HTMLElement>(element) : element;

  if (!targetElement) {
    throw new Error('Target element not found');
  }

  // Enhanced visibility detection
  const isElementVisible = (): boolean => {
    // Check if element is in DOM
    if (!targetElement.isConnected) return false;

    // Check computed styles that might hide the element
    const style = window.getComputedStyle(targetElement);
    const isHidden =
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      parseFloat(style.opacity) <= 0 ||
      targetElement.offsetParent === null;

    // Check if element is within our container
    const isInContainer = container.contains(targetElement);

    return !isHidden && isInContainer;
  };

  // Set up abort mechanism for timeout
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  if (timeout > 0) {
    timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
  }

  try {
    // If already visible, scroll immediately
    if (isElementVisible()) {
      performScroll();
      return;
    }

    // Set up observers to detect when element becomes visible
    await waitForVisibility(targetElement, container, {
      signal: controller.signal,
      checkInterval,
    });

    // Element is now visible - perform scroll
    performScroll();
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }

  function performScroll(): void {
    const containerRect = container.getBoundingClientRect();
    const elementRect = targetElement!.getBoundingClientRect();

    const elementCenter = elementRect.top + elementRect.height / 2;
    const containerCenter = containerRect.top + containerRect.height / 2;
    const scrollAmount = elementCenter - containerCenter + container.scrollTop + offset;

    container.scrollTo({
      top: scrollAmount,
      behavior,
    });
  }
}

/**
 * Waits for an element to become visible
 * @private
 */
function waitForVisibility(
  element: HTMLElement,
  container: HTMLElement,
  options: VisibilityCheckOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const { signal, checkInterval = 100 } = options;

    // Handle abort signal
    if (signal?.aborted) {
      return reject(new Error('Wait aborted'));
    }

    // Set up mutation observer for DOM changes
    const mutationObserver = new MutationObserver(checkVisibility);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // Set up intersection observer for visibility changes
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cleanup();
          resolve();
        }
      },
      {
        root: container,
        threshold: 0.01,
      }
    );
    intersectionObserver.observe(element);

    // Set up periodic check as fallback
    const intervalId = setInterval(checkVisibility, checkInterval);

    // Initial check
    checkVisibility();

    // Cleanup function
    function cleanup(): void {
      clearInterval(intervalId);
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
      signal?.removeEventListener('abort', handleAbort);
    }

    // Abort handler
    function handleAbort(): void {
      cleanup();
      reject(new Error('Wait aborted'));
    }

    // Check visibility function
    function checkVisibility(): void {
      const style = window.getComputedStyle(element);
      const isVisible =
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        parseFloat(style.opacity) > 0 &&
        element.offsetParent !== null &&
        container.contains(element);

      if (isVisible) {
        cleanup();
        resolve();
      }
    }

    // Set up abort listener
    signal?.addEventListener('abort', handleAbort);
  });
}

/**
 * Finds the first scrollable ancestor element with horizontal overflow.
 * Useful for locating the scroll container when you have a reference to a child element.
 *
 * @param el The element to start searching from
 * @returns The scrollable ancestor element, or null if none found
 */
export function findHorizontalScrollAncestor(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && !node.classList.contains('overflow-x-auto')) {
    node = node.parentElement;
  }
  return node;
}

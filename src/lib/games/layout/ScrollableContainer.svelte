<script lang="ts">
  import { onMount } from 'svelte';

  let {
    children,
    className = '',
    innerClassName = '',
    showScrollIndicators = true,
    scrollButtonLeftOffset = '0px',
    gradientFromColor = 'from-white/95',
    gradientViaColor = 'via-white/80',
    gradientFromColorDark = 'dark:from-gray-900/95',
    gradientViaColorDark = 'dark:via-gray-900/80',
  }: {
    children?: import('svelte').Snippet;
    className?: string;
    innerClassName?: string;
    showScrollIndicators?: boolean;
    scrollButtonLeftOffset?: string;
    gradientFromColor?: string;
    gradientViaColor?: string;
    gradientFromColorDark?: string;
    gradientViaColorDark?: string;
  } = $props();

  let container: HTMLDivElement;
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  // Key-repeat state for hold-to-scroll
  let holdTimeout: number | null = null;
  let holdInterval: number | null = null;

  function updateScrollIndicators() {
    if (!container || !showScrollIndicators) return;
    canScrollLeft = container.scrollLeft > 0;
    canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
  }

  function scrollPage(direction: 'left' | 'right') {
    if (!container) return;
    const delta = container.clientWidth * 0.8;
    container.scrollBy({ left: direction === 'left' ? -delta : delta, behavior: 'smooth' });
  }

  function startHold(direction: 'left' | 'right') {
    // Immediate first page scroll on press
    scrollPage(direction);

    // After 500ms, repeat every 400ms (key-repeat style)
    holdTimeout = window.setTimeout(() => {
      holdInterval = window.setInterval(() => scrollPage(direction), 400);
    }, 500);
  }

  function stopHold() {
    if (holdTimeout !== null) {
      clearTimeout(holdTimeout);
      holdTimeout = null;
    }
    if (holdInterval !== null) {
      clearInterval(holdInterval);
      holdInterval = null;
    }
  }

  onMount(() => {
    if (container && showScrollIndicators) {
      updateScrollIndicators();

      const handleScroll = () => updateScrollIndicators();
      container.addEventListener('scroll', handleScroll, { passive: true });

      const resizeObserver = new ResizeObserver(() => updateScrollIndicators());
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
        stopHold();
      };
    }
  });
</script>

<div class={['relative', className]}>
  <!-- Left scroll button -->
  {#if showScrollIndicators && canScrollLeft}
    <div
      class={[
        'pointer-events-none absolute top-0 z-20 flex h-full w-16 items-center justify-start bg-gradient-to-r to-transparent pl-1',
        gradientFromColor,
        gradientViaColor,
        gradientFromColorDark,
        gradientViaColorDark,
      ]}
      style="left: {scrollButtonLeftOffset}"
    >
      <button
        type="button"
        class={[
          'pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full shadow-lg ring-1 transition-all',
          'bg-white ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 active:bg-gray-100 dark:bg-gray-800 dark:ring-gray-600 dark:hover:bg-gray-700 dark:hover:ring-gray-500 dark:active:bg-gray-600',
          'cursor-pointer',
        ]}
        onmousedown={() => startHold('left')}
        onmouseup={stopHold}
        onmouseleave={stopHold}
        ontouchstart={() => startHold('left')}
        ontouchend={stopHold}
        ontouchcancel={stopHold}
        aria-label="Scroll left"
      >
        <svg
          class="h-5 w-5 text-gray-700 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  {/if}

  <!-- Scrollable content -->
  <div bind:this={container} class={['overflow-x-auto overflow-y-visible', innerClassName]}>
    {@render children?.()}
  </div>

  <!-- Right scroll button -->
  {#if showScrollIndicators && canScrollRight}
    <div
      class={[
        'pointer-events-none absolute top-0 right-0 z-20 flex h-full w-16 items-center justify-end bg-gradient-to-l to-transparent pr-1',
        gradientFromColor,
        gradientViaColor,
        gradientFromColorDark,
        gradientViaColorDark,
      ]}
    >
      <button
        type="button"
        class={[
          'pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full shadow-lg ring-1 transition-all',
          'bg-white ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 active:bg-gray-100 dark:bg-gray-800 dark:ring-gray-600 dark:hover:bg-gray-700 dark:hover:ring-gray-500 dark:active:bg-gray-600',
          'cursor-pointer',
        ]}
        onmousedown={() => startHold('right')}
        onmouseup={stopHold}
        onmouseleave={stopHold}
        ontouchstart={() => startHold('right')}
        ontouchend={stopHold}
        ontouchcancel={stopHold}
        aria-label="Scroll right"
      >
        <svg
          class="h-5 w-5 text-gray-700 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  {/if}
</div>

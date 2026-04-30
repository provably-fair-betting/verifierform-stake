<script lang="ts">
  import reels from '$lib/games/slots/slot-reels.json';
  import Indicator from '$lib/games/layout/Indicator.svelte';
  import { ScarabSpinsTomeOfLifeIcon } from '$lib/types';
  import { scrollToCenterVertically } from '$lib/util/scroll';
  import { type Component } from 'svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { onMount } from 'svelte';

  const {
    floats,
    resultIndex,
    IconComponent,
  }: {
    floats: number[];
    resultIndex: number;
    IconComponent: Component<{ icon: ScarabSpinsTomeOfLifeIcon }>;
  } = $props();

  let reelRefs: (HTMLDivElement | null)[] = $state([null, null, null, null, null]);
  let canScrollUp: boolean[] = $state([false, false, false, false, false]);
  let canScrollDown: boolean[] = $state([false, false, false, false, false]);

  // Hold-to-scroll state per reel
  let holdTimeouts: (number | null)[] = [null, null, null, null, null];
  let holdIntervals: (number | null)[] = [null, null, null, null, null];

  const focusedReelIndex = $derived(resultIndex % 5);

  const reelCenterPositions = $derived.by(() => {
    const lowerBound = Math.floor(resultIndex / 5) * 5;
    return floats
      .slice(lowerBound, lowerBound + 5)
      .map((float, i) => Math.floor(float * (i === 4 ? 41 : 30)));
  });

  function updateScrollIndicators(n: number) {
    const container = reelRefs[n];
    if (!container) return;
    canScrollUp[n] = container.scrollTop > 0;
    canScrollDown[n] = container.scrollTop < container.scrollHeight - container.clientHeight - 1;
  }

  function scrollStep(n: number, direction: 'up' | 'down') {
    const container = reelRefs[n];
    if (!container) return;
    const delta = container.clientHeight * 0.4;
    container.scrollBy({ top: direction === 'up' ? -delta : delta, behavior: 'smooth' });
  }

  function startHold(n: number, direction: 'up' | 'down') {
    scrollStep(n, direction);
    holdTimeouts[n] = window.setTimeout(() => {
      holdIntervals[n] = window.setInterval(() => scrollStep(n, direction), 400);
    }, 500);
  }

  function stopHold(n: number) {
    if (holdTimeouts[n] !== null) {
      clearTimeout(holdTimeouts[n]!);
      holdTimeouts[n] = null;
    }
    if (holdIntervals[n] !== null) {
      clearInterval(holdIntervals[n]!);
      holdIntervals[n] = null;
    }
  }

  function resetAllScrollPositions() {
    reelCenterPositions.forEach((position, n) => {
      const container = reelRefs[n];
      const element = container?.querySelector(`div[data-icon="${position}"]`);
      if (container && element) {
        scrollToCenterVertically(container, element as HTMLElement);
      }
    });
  }

  onMount(() => {
    const cleanups: (() => void)[] = [];
    reelRefs.forEach((container, n) => {
      if (!container) return;
      updateScrollIndicators(n);
      const handleScroll = () => updateScrollIndicators(n);
      container.addEventListener('scroll', handleScroll, { passive: true });
      const ro = new ResizeObserver(() => updateScrollIndicators(n));
      ro.observe(container);
      cleanups.push(() => {
        container.removeEventListener('scroll', handleScroll);
        ro.disconnect();
        stopHold(n);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  });

  $effect(() => {
    reelCenterPositions.forEach((position, n) => {
      const container = reelRefs[n];
      const element = container?.querySelector(`div[data-icon="${position}"]`);
      if (container && element) {
        scrollToCenterVertically(container, element as HTMLElement);
      }
    });
  });
</script>

<ContentBlock className="mt-5 mb-7 p-5">
  <p class="mb-3 text-center font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
    Symbol Ordering
  </p>
  <p class="mb-6 text-center text-sm text-gray-700 dark:text-gray-300">
    View the complete symbol ordering for each reel. The highlighted position shows the center
    position for the selected spin. Use the <span class="font-semibold">↑ ↓</span>
    arrows on each reel to scroll through its symbols.
  </p>
  <div class="mb-5 flex justify-center">
    <button
      onclick={resetAllScrollPositions}
      class="rounded border-2 border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-100 dark:border-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
    >
      Reset Scroll
    </button>
  </div>
  <div class="grid grid-cols-5 gap-2">
    {#each reels as reel, nn (nn)}
      <div>
        <p class="mb-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-400">
          Reel {nn + 1}
        </p>
        <!-- Vertical scrollable wrapper with up/down arrows -->
        <div class="relative">
          <!-- Up arrow -->
          {#if canScrollUp[nn]}
            <div
              class={[
                'pointer-events-none absolute top-0 z-20 flex w-full items-start justify-center bg-gradient-to-b to-transparent',
                nn === focusedReelIndex
                  ? 'from-indigo-50/95 via-indigo-50/80 dark:from-indigo-900/30 dark:via-indigo-900/20'
                  : 'from-gray-50/95 via-gray-50/80 dark:from-gray-800/95 dark:via-gray-800/80',
              ]}
              style="height: 2.5rem;"
            >
              <button
                type="button"
                class="pointer-events-auto mt-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-600 dark:hover:bg-gray-700"
                onmousedown={() => startHold(nn, 'up')}
                onmouseup={() => stopHold(nn)}
                onmouseleave={() => stopHold(nn)}
                ontouchstart={() => startHold(nn, 'up')}
                ontouchend={() => stopHold(nn)}
                ontouchcancel={() => stopHold(nn)}
                aria-label="Scroll up"
              >
                <svg
                  class="h-4 w-4 text-gray-700 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>
          {/if}

          <!-- Reel content -->
          <div
            class={[
              'h-65 flex-none overflow-x-hidden overflow-y-auto rounded border-2 pr-2',
              nn === focusedReelIndex
                ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20'
                : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800',
            ]}
            bind:this={reelRefs[nn]}
          >
            <div class="relative">
              <IconComponent icon={reel.slice(-1) as unknown as ScarabSpinsTomeOfLifeIcon} />
              <Indicator
                text={`${nn === 4 ? 41 : 30}/${reel.length}`}
                bgColorClass="bg-gray-300 dark:bg-gray-500 dark:text-gray-200"
              />
            </div>
            {#each reel as icon, n (n)}
              <div class="relative" data-icon={n}>
                <IconComponent icon={icon as unknown as ScarabSpinsTomeOfLifeIcon} />
                <Indicator
                  text={`${n + 1}/${reel.length}`}
                  bgColorClass={n === reelCenterPositions[nn]
                    ? 'bg-indigo-500 text-white dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-500 dark:text-gray-200'}
                />
              </div>
            {/each}
            <div class="relative mb-2">
              <IconComponent icon={reel[0] as unknown as ScarabSpinsTomeOfLifeIcon} />
              <Indicator
                text={`1/${reel.length}`}
                bgColorClass="bg-gray-300 dark:bg-gray-500 dark:text-gray-200"
              />
            </div>
          </div>

          <!-- Down arrow -->
          {#if canScrollDown[nn]}
            <div
              class={[
                'pointer-events-none absolute bottom-0 z-20 flex w-full items-end justify-center bg-gradient-to-t to-transparent',
                nn === focusedReelIndex
                  ? 'from-indigo-50/95 via-indigo-50/80 dark:from-indigo-900/30 dark:via-indigo-900/20'
                  : 'from-gray-50/95 via-gray-50/80 dark:from-gray-800/95 dark:via-gray-800/80',
              ]}
              style="height: 2.5rem;"
            >
              <button
                type="button"
                class="pointer-events-auto mb-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:ring-gray-300 dark:bg-gray-800 dark:ring-gray-600 dark:hover:bg-gray-700"
                onmousedown={() => startHold(nn, 'down')}
                onmouseup={() => stopHold(nn)}
                onmouseleave={() => stopHold(nn)}
                ontouchstart={() => startHold(nn, 'down')}
                ontouchend={() => stopHold(nn)}
                ontouchcancel={() => stopHold(nn)}
                aria-label="Scroll down"
              >
                <svg
                  class="h-4 w-4 text-gray-700 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</ContentBlock>

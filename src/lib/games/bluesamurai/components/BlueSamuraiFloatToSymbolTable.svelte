<script lang="ts">
  import { BlueSamuraiIcon as BlueSamuraiIconT, BlueSamuraiReelType } from '$lib/types';
  import BlueSamuraiIcon from '$lib/games/bluesamurai/components/BlueSamuraiIcon.svelte';
  import BlueSamuraiProbabilityRow from '$lib/games/bluesamurai/components/BlueSamuraiProbabilityRow.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import probabilities from '$lib/games/bluesamurai/bluesamurai-probabilities.json';
  import {
    innerTileProbabilitySummed,
    outerTileProbabilitySummed,
    innerSummedByIndex,
    outerSummedByIndex,
    getProbabilityColClass,
  } from '$lib/games/bluesamurai/bluesamurai';
  import bigDecimal from 'js-big-decimal';
  import { useTableScrollReset } from '$lib/composables/core';

  const {
    float,
    reelType,
  }: {
    float?: number;
    reelType?: BlueSamuraiReelType;
  } = $props();

  const activeSummed = $derived(
    reelType === BlueSamuraiReelType.OUTER ? outerTileProbabilitySummed : innerTileProbabilitySummed
  );

  // Index in `probabilities[]` of the matched symbol (first where float < summed)
  const matchedIndex = $derived.by(() => {
    if (float === undefined || reelType === undefined) return -1;
    const bd = new bigDecimal(float);
    for (let i = 0; i < activeSummed.length; i++) {
      if (bd.compareTo(activeSummed[i].max) < 0) {
        return probabilities.findIndex((p) => p.symbol === activeSummed[i].symbol);
      }
    }
    return -1;
  });

  const isActive = $derived(float !== undefined && reelType !== undefined);

  let tableWrapper = $state<HTMLElement | null>(null);

  // Width of the sticky left column (min-w-[110px], sm:min-w-[130px])
  // Using 110px as base, though it expands on larger screens
  const STICKY_LEFT_WIDTH = 110;

  const scrollReset = useTableScrollReset(
    () => tableWrapper,
    () => matchedIndex,
    STICKY_LEFT_WIDTH
  );
</script>

<div class="relative text-xs sm:text-sm">
  {#if isActive}
    <div class="mb-3 flex items-center justify-between">
      <p class="font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Float-to-Symbol Correlation
      </p>
      <button
        type="button"
        class={[
          'rounded border border-purple-300 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 transition-all hover:border-purple-400 hover:bg-purple-100 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:border-purple-600 dark:hover:bg-purple-900/40',
          scrollReset.showResetButton
            ? 'visible opacity-100'
            : 'pointer-events-none invisible opacity-0',
        ]}
        onclick={scrollReset.scrollToTarget}
      >
        <span class="mr-1">↻</span>
        Reset Scroll
      </button>
    </div>
  {/if}
  <ScrollableContainer innerClassName="pb-3" scrollButtonLeftOffset="110px">
    <div bind:this={tableWrapper}>
      <table class="w-full border-collapse">
        <thead>
          <!-- Symbol icons row -->
          <tr>
            <th
              class="sticky left-0 z-10 min-w-[110px] bg-gray-300 p-2 text-left text-xs font-semibold sm:min-w-[130px] dark:bg-gray-700"
            >
              symbol
            </th>
            {#each probabilities as { symbol }, n (n)}
              <td
                data-col={n}
                class={[
                  'p-1 pt-2 pb-2 transition-opacity',
                  getProbabilityColClass(n, matchedIndex, isActive),
                ]}
              >
                <div class="mx-auto w-12 bg-gray-300 dark:bg-gray-600">
                  <BlueSamuraiIcon icon={symbol as BlueSamuraiIconT} />
                </div>
              </td>
            {/each}
          </tr>
        </thead>

        <tbody class="text-center">
          <BlueSamuraiProbabilityRow
            reelType={BlueSamuraiReelType.INNER}
            activeReelType={reelType}
            summedByIndex={innerSummedByIndex}
            probabilityKey="inner"
            {matchedIndex}
            {isActive}
            {float}
          />
          <BlueSamuraiProbabilityRow
            reelType={BlueSamuraiReelType.OUTER}
            activeReelType={reelType}
            summedByIndex={outerSummedByIndex}
            probabilityKey="outer"
            {matchedIndex}
            {isActive}
            {float}
          />
        </tbody>
      </table>
    </div>
  </ScrollableContainer>

  <!-- Legend -->
  {#if isActive && matchedIndex !== -1}
    <div class="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-3 w-3 rounded-sm bg-purple-200 dark:bg-purple-800"></span>
        matched symbol column
      </span>
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-3 w-3 rounded-sm bg-green-200 dark:bg-green-700"></span>
        prev. summed /
        <span class="font-bold text-purple-700 dark:text-purple-300">float</span>
        / summed ✓ — float falls in this range
      </span>
    </div>
  {/if}
</div>

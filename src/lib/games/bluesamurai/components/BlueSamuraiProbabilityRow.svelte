<script lang="ts">
  import { BlueSamuraiReelType } from '$lib/types';
  import probabilities from '$lib/games/bluesamurai/bluesamurai-probabilities.json';
  import {
    getProbabilityColClass,
    getProbabilitySummedCellClass,
  } from '$lib/games/bluesamurai/bluesamurai';

  const {
    reelType,
    activeReelType,
    summedByIndex,
    probabilityKey,
    matchedIndex,
    isActive,
    float,
  }: {
    reelType: BlueSamuraiReelType;
    activeReelType: BlueSamuraiReelType | undefined;
    summedByIndex: Map<number, { max: string; min: string }>;
    probabilityKey: 'inner' | 'outer';
    matchedIndex: number;
    isActive: boolean;
    float: number | undefined;
  } = $props();

  const isActiveRow = $derived(activeReelType === reelType);
  const rowLabel = $derived(reelType === BlueSamuraiReelType.INNER ? 'inner' : 'outer');
</script>

<!-- Probability row -->
<tr class="border-t border-gray-200 dark:border-gray-600">
  <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left text-xs font-semibold dark:bg-gray-700">
    {rowLabel} prob.
  </th>
  {#each probabilities as prob, n (n)}
    <td
      class={[
        'p-2 transition-opacity',
        isActiveRow ? getProbabilityColClass(n, matchedIndex, isActive) : 'opacity-30',
      ]}
    >
      {#if probabilityKey === 'inner'}
        {prob.inner}
      {:else}
        {prob.outer > 0 ? prob.outer : '—'}
      {/if}
    </td>
  {/each}
</tr>

<!-- Summed row -->
<tr
  class={reelType === BlueSamuraiReelType.INNER
    ? 'border-b border-gray-200 dark:border-gray-600'
    : ''}
>
  <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left text-xs font-semibold dark:bg-gray-700">
    {rowLabel} summed
  </th>
  {#each probabilities as _p, n (n)}
    {@const entry = summedByIndex.get(n)}
    <td
      class={[
        'p-2 font-mono transition-all',
        isActiveRow ? getProbabilityColClass(n, matchedIndex, isActive) : 'opacity-30',
        getProbabilitySummedCellClass(n, matchedIndex, isActive, isActiveRow),
      ]}
    >
      {#if entry}
        {#if isActiveRow && n === matchedIndex}
          <span class="block text-gray-500 dark:text-gray-400">{entry.min}</span>
          <span
            class="my-0.5 block border-t border-b border-green-400 py-0.5 font-bold text-purple-700 dark:text-purple-300"
          >
            {float!.toFixed(8)}
          </span>
          <span class="block text-green-700 dark:text-green-400">{entry.max} ✓</span>
        {:else}
          {entry.max}
        {/if}
      {:else}
        <span class="text-gray-400">—</span>
      {/if}
    </td>
  {/each}
</tr>

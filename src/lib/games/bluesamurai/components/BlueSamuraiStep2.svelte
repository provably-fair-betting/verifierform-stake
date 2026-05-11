<script lang="ts">
  import { BlueSamuraiReelType } from '../types';
  import BlueSamuraiFloatToSymbolTable from '$lib/games/bluesamurai/components/BlueSamuraiFloatToSymbolTable.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';

  const {
    float,
    reelType,
    isLockedSamurai,
  }: {
    float: number;
    reelType: BlueSamuraiReelType;
    isLockedSamurai: boolean;
  } = $props();
</script>

<ContentBlock className="mb-6 p-5">
  <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
    Step 2 — Float to Symbol
  </p>
  {#if isLockedSamurai}
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">How It Works</p>
      <p class="mb-4 text-sm text-amber-700 dark:text-amber-400">
        ⚠️ This position is locked — the float-to-symbol lookup is shown for transparency only. The
        symbol is fixed as 🔒 Samurai regardless of the result below.
      </p>
    </div>
  {:else}
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">How It Works</p>
      <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
        Each symbol has a probability of appearing. These are accumulated left-to-right into a
        <span class="font-semibold">summed</span>
        value per reel type (
        <span class="text-purple-500 dark:text-purple-400">{reelType}</span>
        reel here). The float is matched to the
        <span class="font-semibold">first symbol</span>
        whose summed value exceeds it — shown in the highlighted column below, where the float sits between
        the previous summed (lower bound) and this symbol's summed (upper bound).
      </p>
    </div>
  {/if}

  <div>
    <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
      Probability Table
    </p>
    <BlueSamuraiFloatToSymbolTable {float} {reelType} />
  </div>
</ContentBlock>

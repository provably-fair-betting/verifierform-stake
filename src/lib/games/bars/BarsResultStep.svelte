<script lang="ts">
  import paylines from '$lib/games/bars/bars-paylines.json';
  import type { BarsSeed } from '$lib/types';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import PayoutTable from '../layout/PayoutTable.svelte';
  import { getBarsTileColors } from '$lib/games/bars/bars';

  const {
    stepNumber,
    seed,
    float,
    multi,
    multiNotDivided,
  }: {
    stepNumber: number;
    seed: BarsSeed;
    float: number;
    multi: number;
    multiNotDivided: number;
  } = $props();

  const payline = $derived(paylines[seed.difficulty]);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Use float to discover multiplier from payout table</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Bars</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <PayoutTable
      {payline}
      {float}
      isWinner={(row) => multiNotDivided === row.multiplier}
      getRowClass={(row) => `${getBarsTileColors(row.multiplier).bg} font-bold`}
      getTextClass={(row) => getBarsTileColors(row.multiplier).text}
    />
  </ContentBlock>
</div>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber + 1}</p>
  <p class="mb-4 text-lg">Divide multiplier by bar count</p>

  <ContentBlock
    className="mt-3 p-6 font-mono text-base text-center from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
  >
    <div class="flex items-center justify-center gap-3">
      <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
        {multiNotDivided.toFixed(2)}x
      </span>
      <span class="text-xl text-gray-500">÷</span>
      <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{seed.barCount}</span>
      <span class="text-xl text-gray-500">=</span>
      <span class="text-2xl font-bold text-green-600 dark:text-green-400">{multi.toFixed(2)}x</span>
    </div>
  </ContentBlock>
</div>

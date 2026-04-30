<script lang="ts">
  import paylines from '$lib/games/cases/cases-paylines.json';
  import type { CasesSeed } from '$lib/types';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import PayoutTable from '../layout/PayoutTable.svelte';

  const {
    stepNumber,
    seed,
    float,
    payout,
  }: { stepNumber: number; seed: CasesSeed; float: number; payout: number } = $props();

  const payline = $derived(paylines[seed.difficulty]);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Use float to discover winning case from payout table</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    see <span class="font-bold">Cases</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <PayoutTable
      {payline}
      {float}
      isWinner={(row) => payout === row.multiplier}
      getRowClass={() =>
        'bg-green-50 font-bold text-green-700 dark:bg-green-900/20 dark:text-green-400'}
    />
  </ContentBlock>
</div>

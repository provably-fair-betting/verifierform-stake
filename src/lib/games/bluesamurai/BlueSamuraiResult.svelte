<script lang="ts">
  import {
    getRoundTabClass,
    getRoundTabSelectedClass,
    getBlueSamuraiSummary,
  } from '$lib/games/bluesamurai/bluesamurai';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import BlueSamuraiBoard from '$lib/games/bluesamurai/components/BlueSamuraiBoard.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useBlueSamuraiRounds } from './use-bluesamurai-rounds.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const blueSamurai = useBlueSamuraiRounds(() => formValues);

  let slotRound = $state(0);
</script>

{#if blueSamurai.isCalculating}
  <Loader />
{:else}
  {@const round = blueSamurai.rounds![slotRound]}
  {@const spinCount = blueSamurai.rounds!.length}
  {@const bonusRound = spinCount > 1}
  {@const summary = getBlueSamuraiSummary(blueSamurai.rounds!)}

  <p data-testid="bluesamurai-result" class="hidden text-center text-base">
    {JSON.stringify(blueSamurai.rounds)}
  </p>

  {#if bonusRound}
    <p class="mb-4 text-center text-base font-medium">{summary}</p>

    <ResultTabs
      seed={blueSamurai.seed}
      items={blueSamurai.rounds!.map((_, i) => ({ chosen: i + 1 }))}
      tabNameModifier={(v) => `spin<br>${v}`}
      tabSelectedClassModifier={(n) => getRoundTabSelectedClass(blueSamurai.rounds![n])}
      tabClassModifier={(n) => getRoundTabClass(blueSamurai.rounds![n])}
      bind:resultIndex={slotRound}
    />
  {:else}
    <p class="mb-3 text-center text-base">{summary}</p>
  {/if}

  <BlueSamuraiBoard {round} />
{/if}

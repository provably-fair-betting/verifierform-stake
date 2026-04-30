<script lang="ts">
  import type { ScarabSpinsTomeOfLifeIcon } from '$lib/types';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import SlotBoard from '$lib/games/slots/SlotBoard.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { type Component } from 'svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { getSlotResultTabClass, getSlotResultTabSelectedClass } from '$lib/games/slots/slots';
  import { useSlotResult } from './use-slot-result.svelte';

  const {
    formValues,
    IconComponent,
  }: {
    formValues: Record<string, unknown>;
    IconComponent: Component<{ icon: ScarabSpinsTomeOfLifeIcon }>;
  } = $props();

  const slotResult = useSlotResult(() => formValues);

  let slotRound = $state(0);
</script>

{#if slotResult.isCalculating}
  <Loader />
{:else}
  {@const round = slotResult.rounds![slotRound]}
  {@const spinCount = slotResult.rounds!.length}
  {@const bonusRound = spinCount > 1}

  <p data-testid="slots-result" class="hidden text-center text-base">
    {JSON.stringify(slotResult.rounds)}
  </p>

  {#if bonusRound}
    <ContentBlock className="mb-4 p-4">
      <p class="mb-3 text-center font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Bonus Round ({spinCount - 1} additional spins)
      </p>

      <div class="mb-4 flex justify-center gap-4 text-xs">
        <span class="inline-flex items-center gap-1.5">
          <span class="inline-block h-3 w-3 rounded-full bg-purple-500"></span>
          <span class="text-gray-700 dark:text-gray-300">Bonus Spin</span>
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="inline-block h-3 w-3 rounded-full bg-green-500"></span>
          <span class="text-gray-700 dark:text-gray-300">Bonus Trigger (+15 spins)</span>
        </span>
      </div>

      <ResultTabs
        seed={slotResult.seed!}
        items={slotResult.rounds!.map((_, i) => ({ chosen: i + 1 }))}
        tabNameModifier={(v) => `<span class="block text-xs whitespace-nowrap">Spin ${v}</span>`}
        tabSelectedClassModifier={(n) =>
          getSlotResultTabSelectedClass(!!slotResult.rounds![n].retrigger)}
        tabClassModifier={(n) => getSlotResultTabClass(!!slotResult.rounds![n].retrigger)}
        tabWidthClass="w-16"
        bind:resultIndex={slotRound}
      />
    </ContentBlock>
  {/if}

  <SlotBoard {round} roundIndex={slotRound} {IconComponent} />
{/if}

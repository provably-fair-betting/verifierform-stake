<script lang="ts">
  import type { BarsSeed } from '$lib/types';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ResultTabs from '../layout/ResultTabs.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import BarsResultStep from './BarsResultStep.svelte';
  import { useBarsPayout } from './use-bars-payout.svelte';
  import { getBarsTabClass, getBarsTabSelectedClass, getBarsTabName } from '$lib/games/bars/bars';

  let resultIndex = $state(0);

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const bars = useBarsPayout(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if bars.isCalculating || !bars.result}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Multis generated in the order shown below.
          </span>
          Click a multi to find out how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <ResultTabs
        seed={bars.seed!}
        items={bars.result.results.map((item) => ({
          chosen: `${item.multi.toFixed(2)}x`,
        }))}
        bind:resultIndex
        tabClassModifier={(n) =>
          getBarsTabClass(
            bars.result!.results[n].multiNotDivided,
            bars.result!.results[n].isSelected
          )}
        tabSelectedClassModifier={(n) =>
          getBarsTabSelectedClass(
            bars.result!.results[n].multiNotDivided,
            bars.result!.results[n].isSelected
          )}
        tabNameModifier={(chosen, n) =>
          getBarsTabName(chosen as string, bars.result!.results[n].isSelected)}
      />

      {@const selectedItem = bars.result.results[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={bars.seed!}
        float={selectedItem.float}
      />
      <BarsResultStep stepNumber={2} seed={bars.seed! as BarsSeed} {...selectedItem} />
    {/if}
  </div>
</div>

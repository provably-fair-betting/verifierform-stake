<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import RockPaperScissorsResultStep from '$lib/games/rockpaperscissors/RockPaperScissorsResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useRpsOutcome } from './use-rps-outcome.svelte';
  import { getRpsTabClass, getRpsTabSelectedClass } from '$lib/games/rockpaperscissors/rps';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const rpsOutcome = useRpsOutcome(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if rpsOutcome.isCalculating || !rpsOutcome.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Rounds generated in the order shown below.
          </span>
          Click a round to see how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <ResultTabs
        seed={rpsOutcome.seed}
        items={rpsOutcome.items!}
        tabWidthClass="w-20"
        tabClassModifier={(i) => getRpsTabClass(rpsOutcome.items![i].chosen)}
        tabSelectedClassModifier={(i) => getRpsTabSelectedClass(rpsOutcome.items![i].chosen)}
        bind:resultIndex
      />

      {@const result = rpsOutcome.items[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={rpsOutcome.seed!}
        float={result.float}
      />
      <RockPaperScissorsResultStep stepNumber={2} {...result} />
    {/if}
  </div>
</div>

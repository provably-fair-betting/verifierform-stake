<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import FlipResultStep from '$lib/games/flip/FlipResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useFlipOutcome } from './use-flip-outcome.svelte';
  import { getFlipTabClass, getFlipTabSelectedClass } from '$lib/games/flip/flip';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const flipOutcome = useFlipOutcome(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if flipOutcome.isCalculating || !flipOutcome.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">Flips made in the order shown below.</span>
          Click a flip to see how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <ResultTabs
        seed={flipOutcome.seed}
        items={flipOutcome.items!}
        tabWidthClass="w-20"
        tabClassModifier={(i) => getFlipTabClass(flipOutcome.items![i].chosen)}
        tabSelectedClassModifier={(i) => getFlipTabSelectedClass(flipOutcome.items![i].chosen)}
        bind:resultIndex
      />

      {@const flip = flipOutcome.items[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={flipOutcome.seed!}
        float={flip.float}
      />
      <FlipResultStep stepNumber={2} {...flip} />
    {/if}
  </div>
</div>

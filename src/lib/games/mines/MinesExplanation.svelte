<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import MinesResultStep from '$lib/games/mines/MinesResultStep.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useMinesPositions } from './use-mines-positions.svelte';
  import { useMinesExplanation } from './use-mines-explanation.svelte';
  import { getMinesTabClass, getMinesTabSelectedClass } from '$lib/games/mines/mines';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  const mines = useMinesPositions(() => formValues);
  const explanation = useMinesExplanation();
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if mines.isCalculating || !mines.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Mines drawn in the order shown below.
          </span>
          Click a mine to find out how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <ResultTabs
        seed={mines.seed!}
        items={mines.items}
        bind:resultIndex={explanation.resultIndex}
        tabClassModifier={() => getMinesTabClass()}
        tabSelectedClassModifier={() => getMinesTabSelectedClass()}
        tabNameModifier={(chosen) => `<span class="block font-bold">${chosen}</span>`}
      />

      {@const selectedItem = mines.items[explanation.resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        resultIndex={explanation.resultIndex}
        seed={mines.seed!}
        float={selectedItem.float}
      />
      <MinesResultStep stepNumber={2} resultIndex={explanation.resultIndex} {...selectedItem} />
    {/if}
  </div>
</div>

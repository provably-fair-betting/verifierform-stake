<script lang="ts">
  import { Gem } from './types';
  import { getGemTabClass, getGemTabSelectedClass } from '$lib/games/diamonds/diamonds';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import DiamondsResultStep from '$lib/games/diamonds/DiamondsResultStep.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useDiamondsGems } from './use-diamonds-gems.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const diamonds = useDiamondsGems(() => formValues);
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if diamonds.isCalculating || !diamonds.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">Gems drawn in the order shown below.</span>
          Click a gem to find out how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <ResultTabs
        seed={diamonds.seed!}
        items={diamonds.items}
        bind:resultIndex
        tabWidthClass="w-20"
        tabClassModifier={(n) => getGemTabClass(diamonds.items![n].chosen as Gem)}
        tabSelectedClassModifier={(n) => getGemTabSelectedClass(diamonds.items![n].chosen as Gem)}
      />

      {@const selectedItem = diamonds.items[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={diamonds.seed!}
        float={selectedItem.float}
      />
      <DiamondsResultStep stepNumber={2} {...selectedItem} />
    {/if}
  </div>
</div>

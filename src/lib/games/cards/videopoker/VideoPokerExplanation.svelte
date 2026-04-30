<script lang="ts">
  import { useVideoPokerCards } from './use-videopoker-cards.svelte';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import VideoPokerResultStep from '$lib/games/cards/videopoker/VideoPokerResultStep.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import {
    getVideoPokerTabClass,
    getVideoPokerTabSelectedClass,
    getVideoPokerColor,
  } from '$lib/games/cards/cards';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);

  const videoPoker = useVideoPokerCards(() => formValues);
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if videoPoker.isCalculating || !videoPoker.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Cards drawn in the order shown below.
          </span>
          Click a card to find out how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <ResultTabs
        seed={videoPoker.seed}
        items={videoPoker.items}
        bind:resultIndex
        tabWidthClass="w-16"
        grayCardIcon={true}
        tabClassModifier={(n) => getVideoPokerTabClass(n)}
        tabSelectedClassModifier={(n) => getVideoPokerTabSelectedClass(n)}
      />

      {@const selectedItem = videoPoker.items[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={videoPoker.seed}
        float={selectedItem.float}
      />
      <VideoPokerResultStep
        stepNumber={2}
        {resultIndex}
        {...selectedItem}
        color={getVideoPokerColor(resultIndex)}
      />
    {/if}
  </div>
</div>

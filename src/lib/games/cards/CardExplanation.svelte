<script lang="ts">
  import { useCardDeck } from './use-card-deck.svelte';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import CardResultStep from '$lib/games/cards/CardResultStep.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import {
    getCardColor,
    getCardTabClass,
    getCardTabSelectedClass,
    getCardTabName,
  } from '$lib/games/cards/cards';

  const {
    formValues,
    count = 52,
    colorScheme = 'hilo',
  }: {
    formValues: Record<string, unknown>;
    count?: number;
    colorScheme?: 'baccarat' | 'blackjack' | 'hilo';
  } = $props();

  let resultIndex = $state(0);

  const cardDeck = useCardDeck(() => formValues, count);
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if cardDeck.isCalculating || !cardDeck.items}
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
        seed={cardDeck.seed}
        items={cardDeck.items}
        bind:resultIndex
        tabWidthClass="w-16"
        grayCardIcon={true}
        tabClassModifier={(n) => getCardTabClass(getCardColor(n, colorScheme))}
        tabSelectedClassModifier={(n) => getCardTabSelectedClass(getCardColor(n, colorScheme))}
        tabNameModifier={(chosen, n) => getCardTabName(n)}
      />

      {@const selectedItem = cardDeck.items[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={cardDeck.seed}
        float={selectedItem.float}
      />
      <CardResultStep
        stepNumber={2}
        {...selectedItem}
        color={getCardColor(resultIndex, colorScheme)}
      />
    {/if}
  </div>
</div>

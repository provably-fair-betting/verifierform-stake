<script lang="ts">
  import Loader from '$lib/games/Loader.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import FloatGenerationStep from '../FloatGenerationStep.svelte';
  import PacksResultStep from './PacksResultStep.svelte';
  import { usePacksCards } from './use-packs-cards.svelte';
  import {
    getPacksTabClass,
    getPacksTabSelectedClass,
    getPacksRarityLabel,
  } from '$lib/games/packs/packs';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const packs = usePacksCards(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if packs.isCalculating || !packs.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Cards selected in the order shown below.
          </span>
          Click a card to see how it was selected using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <ScrollableContainer className="mb-7" innerClassName="pb-3">
        <div class="flex min-w-max gap-2 p-1">
          {#each packs.items as item, index (index)}
            {@const cardId = item.card.cardId}
            {@const rarityLabel = getPacksRarityLabel(cardId)}
            <button
              type="button"
              class={resultIndex === index
                ? getPacksTabSelectedClass(cardId)
                : getPacksTabClass(cardId)}
              onclick={() => (resultIndex = index)}
            >
              <span class="text-xs font-medium">{rarityLabel}</span>
              <span class="text-lg font-bold">#{cardId}</span>
            </button>
          {/each}
        </div>
      </ScrollableContainer>

      {@const selectedItem = packs.items[resultIndex]}

      <FloatGenerationStep
        stepNumber={1}
        {resultIndex}
        seed={packs.seed!}
        float={selectedItem.float}
      />
      <PacksResultStep float={selectedItem.float} card={selectedItem.card} />
    {/if}
  </div>
</div>

<script lang="ts">
  import { TarotArcanaType as ArcanaType } from '$lib/types';
  import Loader from '$lib/games/Loader.svelte';
  import TarotsCard from './TarotsCard.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useTarotsCards } from './use-tarots-cards.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const tarots = useTarotsCards(() => formValues);
</script>

{#if tarots.isCalculating}
  <Loader />
{:else}
  {@const totalMulti = tarots.items!.reduce((a, b) => a * b.card.multiplier, 1)}

  <ContentBlock className="p-4">
    <div class="flex items-center justify-center">
      <div
        class="flex items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 dark:border-green-400 dark:bg-green-900/30"
      >
        <div class="flex flex-col items-center gap-1">
          <span class="text-xs font-medium text-green-600 dark:text-green-400">
            Total Multiplier
          </span>
          <span
            data-testid="tarot-result"
            class="text-2xl font-bold text-green-800 dark:text-green-300"
          >
            {totalMulti.toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  </ContentBlock>

  <ContentBlock className="mt-4 p-4">
    <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Cards Drawn</p>
    <div class="grid grid-cols-3 gap-3">
      {#each tarots.items! as { card, arcanaType }, i (i)}
        <TarotsCard {arcanaType} multiplier={card.multiplier} />
      {/each}
    </div>
  </ContentBlock>
{/if}

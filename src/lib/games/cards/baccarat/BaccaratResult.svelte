<script lang="ts">
  import Card from '$lib/games/cards/Card.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useBaccaratCards } from './use-baccarat-cards.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const baccarat = useBaccaratCards(() => formValues);
</script>

{#if baccarat.isCalculating}
  <Loader />
{:else}
  <p data-testid="baccarat-player-result" class="hidden text-center text-base">
    {baccarat
      .result!.initialPlayer.map(({ chosen: { value, suit } }) => `${value}-${suit}`)
      .join(',')}
  </p>
  <p data-testid="baccarat-dealer-result" class="hidden text-center text-base">
    {baccarat
      .result!.initialBanker.map(({ chosen: { value, suit } }) => `${value}-${suit}`)
      .join(',')}
  </p>
  <p data-testid="baccarat-decider-result" class="hidden text-center text-base">
    {baccarat.result!.decider.map(({ chosen: { value, suit } }) => `${value}-${suit}`).join(',')}
  </p>

  <div class="mt-5 mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-blue-600 dark:text-blue-400">
      Initial Player Cards
    </p>
    <div class="grid grid-cols-2 gap-2 md:gap-3">
      {#each baccarat.result!.initialPlayer as card, n (n)}
        <Card {...card.chosen} />
      {/each}
    </div>
  </div>

  <div class="mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-green-600 dark:text-green-400">
      Initial Banker Cards
    </p>
    <div class="grid grid-cols-2 gap-2 md:gap-3">
      {#each baccarat.result!.initialBanker as card, n (n)}
        <Card {...card.chosen} />
      {/each}
    </div>
  </div>

  <div class="mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-purple-600 dark:text-purple-400">
      Decider Cards
    </p>
    <div class="grid grid-cols-2 gap-2 md:gap-3">
      {#each baccarat.result!.decider as card, n (n)}
        <Card {...card.chosen} />
      {/each}
    </div>
  </div>
{/if}

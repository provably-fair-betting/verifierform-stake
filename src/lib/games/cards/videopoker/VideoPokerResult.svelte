<script lang="ts">
  import Card from '$lib/games/cards/Card.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useVideoPokerCards } from './use-videopoker-cards.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const videoPoker = useVideoPokerCards(() => formValues);
</script>

{#if videoPoker.isCalculating}
  <Loader />
{:else}
  {@const initial = videoPoker.items!.slice(0, 5)}
  {@const coming = videoPoker.items!.slice(5)}
  <p data-testid="videopoker-initial-result" class="hidden text-center text-base">
    {initial.map(({ chosen: { value, suit } }) => `${value}-${suit}`).join(', ')}
  </p>
  <p data-testid="videopoker-coming-result" class="hidden text-center text-base">
    {coming.map(({ chosen: { value, suit } }) => `${value}-${suit}`).join(', ')}
  </p>

  <div class="mt-5 mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-blue-600 dark:text-blue-400">
      Initial hand
    </p>
    <div class="grid grid-cols-5 gap-1 md:gap-1.5">
      {#each initial as initialCard, n (n)}
        <Card {...initialCard.chosen} />
      {/each}
    </div>
  </div>

  <div class="mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-green-600 dark:text-green-400">
      Coming cards
    </p>
    <div class="grid grid-cols-5 gap-1 md:gap-1.5">
      {#each coming as comingCard, n (n)}
        <Card {...comingCard.chosen} />
      {/each}
    </div>
  </div>
{/if}

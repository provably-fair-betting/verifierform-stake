<script lang="ts">
  import Card from '$lib/games/cards/Card.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import { useBlackjackCards } from './use-blackjack-cards.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const blackjack = useBlackjackCards(() => formValues);
</script>

{#if blackjack.isCalculating}
  <Loader />
{:else}
  <p data-testid="blackjack-dealer-result" class="hidden text-center text-base">
    {blackjack
      .result!.initialDealer.map(({ chosen: { value, suit } }) => `${value}-${suit}`)
      .join(',')}
  </p>
  <p data-testid="blackjack-player-result" class="hidden text-center text-base">
    {blackjack
      .result!.initialPlayer.map(({ chosen: { value, suit } }) => `${value}-${suit}`)
      .join(',')}
  </p>
  <p data-testid="blackjack-remaining-result" class="hidden text-center text-base">
    {blackjack
      .result!.remaining.map(({ chosen: { value, suit } }) => `${value}-${suit}`)
      .join(',')}
  </p>

  <div class="mt-5 mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-blue-600 dark:text-blue-400">
      Initial player cards
    </p>
    <div class="grid grid-cols-2 gap-1 sm:gap-1.5">
      {#each blackjack.result!.initialPlayer as card, n (n)}
        <Card {...card.chosen} />
      {/each}
    </div>
  </div>

  <div class="mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-green-600 dark:text-green-400">
      Initial dealer cards
    </p>
    <div class="grid grid-cols-2 gap-1 sm:gap-1">
      {#each blackjack.result!.initialDealer as card, n (n)}
        <Card {...card.chosen} />
      {/each}
    </div>
  </div>

  <div class="mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-purple-600 dark:text-purple-400">
      Remaining cards in deck
    </p>
    <ScrollableContainer innerClassName="pb-5">
      <div class="flex gap-1.5">
        {#each blackjack.result!.remaining as card, n (n)}
          <div class="w-20 flex-none">
            <Card {...card.chosen} />
          </div>
        {/each}
      </div>
    </ScrollableContainer>
  </div>
{/if}

<script lang="ts">
  import Card from '$lib/games/cards/Card.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import { useHiloCards } from './use-hilo-cards.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const hilo = useHiloCards(() => formValues);
</script>

{#if hilo.isCalculating}
  <Loader />
{:else}
  <p data-testid="hilo-result" class="hidden text-center text-base">
    {hilo.items!.map(({ chosen: { value, suit } }) => `${value}-${suit}`).join(', ')}
  </p>

  <div class="mt-5 mb-6">
    <p class="mb-3 text-center text-lg font-semibold text-blue-600 dark:text-blue-400">
      Order of cards
    </p>
    <ScrollableContainer innerClassName="pb-5">
      <div class="flex gap-1.5">
        {#each hilo.items! as card, n (n)}
          <div class="w-20 flex-none">
            <Card {...card.chosen} />
          </div>
        {/each}
      </div>
    </ScrollableContainer>
  </div>
{/if}

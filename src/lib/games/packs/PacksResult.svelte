<script lang="ts">
  import Loader from '$lib/games/Loader.svelte';
  import PacksCard from './PacksCard.svelte';
  import { usePacksCards } from './use-packs-cards.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const packs = usePacksCards(() => formValues);
  const cards = $derived(packs.items?.map((item) => item.card) ?? null);
</script>

{#if packs.isCalculating}
  <Loader />
{:else}
  {@const cardIds = cards?.map((card) => card.cardId).sort((a, b) => a - b)}
  {@const totalMulti = cards!.reduce((a, b) => a + b!.multiplier, 0)}

  <p data-testid="packs-result" class="hidden text-center text-base">
    {cardIds}
  </p>

  <div class="text-center">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Five cards drawn from pack</p>
    <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">
      Total multiplier: <span class="font-semibold text-blue-600 dark:text-blue-400">
        {totalMulti.toFixed(2)}x
      </span>
    </p>

    <div class="grid grid-cols-3 gap-3">
      {#each cards! as card, i (i)}
        <div>
          <PacksCard cardId={card!.cardId} />
        </div>
      {/each}
    </div>
  </div>
{/if}

<script lang="ts">
  import { useDiamondsGems } from './use-diamonds-gems.svelte';
  import { Gem } from './types';
  import { GEM_COLORS } from '$lib/games/diamonds/diamonds';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const diamonds = useDiamondsGems(() => formValues);
  const chosenGems = $derived(diamonds.items?.map((item) => item.chosen as Gem) ?? null);
</script>

{#if diamonds.isCalculating}
  <Loader />
{:else}
  <p data-testid="diamonds-result" class="hidden text-center text-base">
    {chosenGems!}
  </p>
  <div class="mb-6 grid grid-cols-5 gap-1 md:gap-1.5">
    {#each chosenGems! as gem, n (n)}
      <div
        class={[
          'flex h-10 w-full items-center justify-center rounded border-2 font-semibold capitalize',
          GEM_COLORS[gem].bg,
          GEM_COLORS[gem].border,
          GEM_COLORS[gem].text,
        ]}
      >
        {gem}
      </div>
    {/each}
  </div>
{/if}

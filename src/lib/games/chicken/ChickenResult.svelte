<script lang="ts">
  import { useChickenMultiplier } from './use-chicken-multiplier.svelte';
  import { usePaylineResult } from '$lib/composables/core';
  import Loader from '$lib/games/Loader.svelte';
  import PaylineResultDisplay from '$lib/games/layout/PaylineResultDisplay.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const chicken = useChickenMultiplier(() => formValues);
  const result = usePaylineResult(
    () => chicken.items,
    () => chicken.payline
  );

  const maxMulti = $derived(result.maxMulti);
  const deathMulti = $derived(
    maxMulti
      ? (() => {
          const maxIndex = chicken.payline.indexOf(maxMulti);
          return maxIndex !== -1 && maxIndex + 1 < chicken.payline.length
            ? chicken.payline[maxIndex + 1]
            : null;
        })()
      : null
  );
</script>

{#if chicken.isCalculating}
  <Loader />
{:else}
  <PaylineResultDisplay {maxMulti} {deathMulti} />
{/if}

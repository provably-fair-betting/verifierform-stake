<script lang="ts">
  import { usePumpMultiplier } from './use-pump-multiplier.svelte';
  import { usePaylineResult } from '$lib/composables/core';
  import Loader from '$lib/games/Loader.svelte';
  import PaylineResultDisplay from '$lib/games/layout/PaylineResultDisplay.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const pump = usePumpMultiplier(() => formValues);
  const result = usePaylineResult(
    () => pump.items,
    () => pump.payline
  );

  const maxMulti = $derived(result.maxMulti);
  const deathMulti = $derived(
    maxMulti
      ? (() => {
          const maxIndex = pump.payline.indexOf(maxMulti);
          return maxIndex !== -1 && maxIndex + 1 < pump.payline.length
            ? pump.payline[maxIndex + 1]
            : null;
        })()
      : null
  );
</script>

{#if pump.isCalculating}
  <Loader />
{:else}
  <PaylineResultDisplay {maxMulti} {deathMulti} deathLabel="Pop point" />
{/if}

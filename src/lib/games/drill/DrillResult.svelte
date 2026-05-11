<script lang="ts">
  import Loader from '$lib/games/Loader.svelte';
  import DrillCard from './DrillCard.svelte';
  import { useDrillResults } from './use-drill-results.svelte';

  const { formValues = $bindable() }: { formValues: Record<string, unknown> } = $props();
  const drill = useDrillResults(() => formValues);
</script>

{#if drill.isCalculating}
  <Loader />
{:else}
  <p data-testid="drill-result" class="hidden text-center text-base">
    {JSON.stringify(drill.drills!.map((d) => d.multiplier))}
  </p>

  <div class="text-center">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Three drills with multipliers</p>
    <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">
      Each drill shows a color and multiplier value
    </p>

    <div class="grid grid-cols-3 gap-3">
      {#each drill.drills! as drillItem, i (i)}
        <DrillCard drillIndex={drillItem.drillIndex} multiplier={drillItem.multiplier} />
      {/each}
    </div>
  </div>
{/if}

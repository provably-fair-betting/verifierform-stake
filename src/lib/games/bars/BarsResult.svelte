<script lang="ts">
  import { useBarsPayout } from './use-bars-payout.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { getBarsTileColors } from '$lib/games/bars/bars';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const bars = useBarsPayout(() => formValues);
</script>

{#if bars.isCalculating}
  <Loader />
{:else}
  <p data-testid="bars-result" class="hidden">
    {JSON.stringify(bars.result!.results.map((r) => r.multi))}
  </p>

  <div class="mt-5 mb-5 rounded-lg dark:bg-gray-900 dark:text-white">
    <!-- Total Payout Display -->
    {#if bars.result!.hasSelection}
      <div class="mb-4 rounded-lg bg-blue-500 p-4 text-white dark:bg-blue-800">
        <div class="text-sm font-medium">Total Payout Multiplier</div>
        <div class="text-3xl font-bold">{bars.result!.totalPayout.toFixed(2)}x</div>
        <div class="mt-1 text-xs opacity-90">
          Sum of {bars.result!.selectedCount} selected bar{bars.result!.selectedCount === 1
            ? ''
            : 's'}
        </div>
      </div>
    {/if}

    <!-- Number Grid -->
    <div class="grid grid-cols-5 gap-1 md:gap-1.5">
      {#each bars.result!.results as { multi, multiNotDivided, isSelected }, n (n)}
        {@const colors = getBarsTileColors(multiNotDivided)}
        <div
          class={[
            'relative flex aspect-square h-10 w-full items-center justify-center rounded border-2 transition-all',
            colors.bg,
            colors.border,
            colors.text,
            isSelected ? 'font-bold ring-2 ' + colors.border : 'opacity-75',
          ]}
        >
          {multi.toFixed(2)}x
          {#if isSelected}
            <span
              class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white shadow-md ring-2 ring-white dark:ring-gray-900"
            >
              ✓
            </span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

<script lang="ts">
  import { useFlipOutcome } from './use-flip-outcome.svelte';
  import { CoinFlip } from '$lib/types';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const flipOutcome = useFlipOutcome(() => formValues);
</script>

{#if flipOutcome.isCalculating}
  <Loader />
{:else}
  <p data-testid="flip-result" class="hidden text-center text-base">
    {flipOutcome.items!.map((f) => f.chosen).join(', ')}
  </p>

  <div class="text-center">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Coin flip history</p>
    <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">
      Each flip shows its position and result
    </p>

    <div class="flex flex-wrap justify-center gap-1.5">
      {#each flipOutcome.items! as flip, i (i)}
        <div
          class={[
            'rounded border-2 px-2 py-1.5 text-center text-sm transition-all',
            flip.chosen === CoinFlip.TAIL
              ? 'border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/20 dark:text-blue-400'
              : 'border-gray-400 bg-gray-100 text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300',
          ]}
        >
          <span class="block text-[10px] opacity-70">({i + 1})</span>
          <span class="block font-bold">{flip.chosen}</span>
        </div>
      {/each}
    </div>
  </div>
{/if}

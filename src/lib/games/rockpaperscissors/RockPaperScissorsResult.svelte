<script lang="ts">
  import { useRpsOutcome } from './use-rps-outcome.svelte';
  import { RockPaperScissorsOutcome } from '$lib/types';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const rpsOutcome = useRpsOutcome(() => formValues);
  const results = $derived(rpsOutcome.items?.map((item) => item.chosen) ?? null);
</script>

{#if rpsOutcome.isCalculating}
  <Loader />
{:else}
  <p data-testid="rockpaperscissors-result" class="hidden text-center text-base">
    {results!}
  </p>

  <div class="text-center">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">First 20 rounds</p>
    <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">
      Each round shows position and outcome
    </p>

    <div class="mb-5 flex flex-wrap justify-center gap-1.5">
      {#each results! as result, i (i)}
        <div
          class={[
            'rounded border-2 px-2 py-1.5 text-center text-sm transition-all',
            result === RockPaperScissorsOutcome.ROCK
              ? 'border-gray-500 bg-gray-100 text-gray-700 dark:border-gray-400 dark:bg-gray-800 dark:text-gray-300'
              : result === RockPaperScissorsOutcome.PAPER
                ? 'border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-900/20 dark:text-blue-400'
                : 'border-red-400 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-900/20 dark:text-red-400',
          ]}
        >
          <span class="block text-[10px] opacity-70">({i + 1})</span>
          <span class="block font-bold">{result}</span>
        </div>
      {/each}
    </div>
  </div>
{/if}

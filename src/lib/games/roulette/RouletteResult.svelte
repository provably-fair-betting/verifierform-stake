<script lang="ts">
  import { useRouletteNumber } from './use-roulette-number.svelte';
  import RouletteBoard from '$lib/games/roulette/RouletteBoard.svelte';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const roulette = useRouletteNumber(() => formValues);
</script>

{#if roulette.isCalculating}
  <Loader />
{:else}
  <div class="mb-4 flex justify-center">
    <div
      class="inline-flex min-w-[100px] flex-col items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 shadow-lg dark:border-green-400 dark:bg-green-900/20"
    >
      <span class="mb-1 text-xs text-gray-500 dark:text-gray-400">Roulette number</span>
      <span
        data-testid="roulette-result"
        class="text-2xl font-bold text-green-600 dark:text-green-400"
      >
        {roulette.chosenNumber!}
      </span>
    </div>
  </div>
  <RouletteBoard chosenNumber={roulette.chosenNumber!} />
{/if}

<script lang="ts">
  import { useDiceRoll } from './use-dice-roll.svelte';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const diceRoll = useDiceRoll(() => formValues);
</script>

{#if diceRoll.isCalculating}
  <Loader />
{:else}
  <div data-testid="dice-result" class="text-center text-base">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Roll result</p>
    <div
      class="inline-flex min-w-[100px] flex-col items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 shadow-lg dark:border-green-400 dark:bg-green-900/20"
    >
      <span class="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {diceRoll.rollNumber!.toFixed(2)}
      </span>
    </div>
  </div>
{/if}

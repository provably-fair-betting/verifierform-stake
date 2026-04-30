<script lang="ts">
  import { useLimboMultiplier } from './use-limbo-multiplier.svelte';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const limbo = useLimboMultiplier(() => formValues);
</script>

{#if limbo.isCalculating}
  <Loader />
{:else}
  <div data-testid="limbo-result" class="text-center text-base">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Multiplier</p>
    <div
      class="inline-flex min-w-[100px] flex-col items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 shadow-lg dark:border-green-400 dark:bg-green-900/20"
    >
      <span class="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {limbo.crashPoint!.toFixed(2)}x
      </span>
    </div>
  </div>
{/if}

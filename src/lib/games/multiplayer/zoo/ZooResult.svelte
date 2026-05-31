<script lang="ts">
  import Loader from '$lib/games/Loader.svelte';
  import { useZooAnimals } from './use-zoo-animals.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const zoo = useZooAnimals(() => formValues);
</script>

{#if zoo.isCalculating}
  <Loader />
{:else}
  <div data-testid="zoo-result" class="text-center text-base">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Animals</p>
    <div class="inline-flex items-center justify-center gap-3 rounded border-2 border-green-500 bg-green-50 px-6 py-4 shadow-lg dark:border-green-400 dark:bg-green-900/20">
      {#each zoo.animals! as result}
        <span class="text-2xl font-bold capitalize text-gray-800 dark:text-gray-100">
          {result.animal}
        </span>
      {/each}
    </div>
  </div>
{/if}

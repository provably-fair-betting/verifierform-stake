<script lang="ts">
  import Loader from '$lib/games/Loader.svelte';
  import ZooAnimalIcon from './ZooAnimalIcon.svelte';
  import { useZooAnimals } from './use-zoo-animals.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const zoo = useZooAnimals(() => formValues);
</script>

{#if zoo.isCalculating}
  <Loader />
{:else}
  <div data-testid="zoo-result" class="text-center text-base">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Animals</p>
    <div class="inline-flex items-center justify-center gap-4">
      {#each zoo.animals! as result (result.window)}
        <div class="flex flex-col items-center gap-2">
          <ZooAnimalIcon animal={result.animal} class="h-16 w-16" />
          <span class="text-sm font-semibold text-gray-800 capitalize dark:text-gray-100">
            {result.animal}
          </span>
        </div>
      {/each}
    </div>
  </div>
{/if}

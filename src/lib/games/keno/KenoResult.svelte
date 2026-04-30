<script lang="ts">
  import { useKenoNumbers } from './use-keno-numbers.svelte';
  import KenoBoard from '$lib/games/keno/KenoBoard.svelte';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const keno = useKenoNumbers(() => formValues);
  const chosenNumbers = $derived(
    keno.items?.map((item) => item.chosen).sort((a, b) => a - b) ?? null
  );
</script>

{#if keno.isCalculating}
  <Loader />
{:else}
  <p data-testid="keno-result" class="hidden text-center text-base">
    {chosenNumbers!.join(', ')}
  </p>

  <div class="text-center">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Keno board with drawn numbers</p>
    <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">Highlighted numbers were drawn</p>

    <KenoBoard chosenNumbers={chosenNumbers!} />
  </div>
{/if}

<script lang="ts">
  const { chosenNumbers }: { chosenNumbers: number[] } = $props();
  const chosenNumbersLookup = $derived(new Set(chosenNumbers));

  const columns = Array.from({ length: 40 }).map((_v, i) => i + 1);
</script>

<div class="mt-5 mb-5 rounded-lg dark:bg-gray-900 dark:text-white">
  <div class="grid grid-cols-8 gap-1 md:gap-1.5">
    {#each columns as col, n (n)}
      {@const isChosen = chosenNumbersLookup.has(col)}
      <div
        class={[
          'relative flex aspect-square h-10 w-full items-center justify-center rounded border-2 transition-all',
          isChosen
            ? 'border-purple-400 bg-purple-50 font-bold text-purple-700 ring-2 ring-purple-400 dark:border-purple-500 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-500'
            : 'border-gray-400 bg-gray-100 text-gray-700 opacity-75 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300',
        ]}
      >
        {col}
      </div>
    {/each}
  </div>
</div>

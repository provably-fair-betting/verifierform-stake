<script lang="ts">
  const { chosenNumber }: { chosenNumber: number } = $props();

  const getColorClass = (n: number) => {
    if (n === chosenNumber)
      return 'border-2 border-purple-500 bg-purple-100 font-bold text-purple-700 ring-2 ring-purple-400 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-500 z-10 scale-110 shadow-md';
    return 'border border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300';
  };

  const columns: number[] = [];
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j < 12; j++) {
      columns.push(3 * (j + 1) - i);
    }
  }
</script>

<div class="mt-3 flex gap-1 text-xs sm:text-sm md:gap-1.5 dark:text-white">
  <!-- Zero Tile -->
  <div class="flex flex-col">
    <div
      class={[
        'flex h-[calc(3*2.5rem+2*0.25rem)] w-[1.5rem] items-center justify-center rounded transition-all md:w-[2.5rem]',
        chosenNumber === 0
          ? 'border-2 border-purple-500 bg-purple-100 font-bold text-purple-700 shadow-md ring-2 ring-purple-400 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-500'
          : 'border border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300',
      ]}
    >
      0
    </div>
  </div>

  <!-- Number Grid -->
  <div class="grid flex-1 grid-cols-12 gap-1 md:gap-1.5">
    {#each columns as col, n (n)}
      <div
        class={[
          'flex aspect-square h-full w-full items-center justify-center rounded transition-all',
          getColorClass(col),
        ]}
      >
        {col}
      </div>
    {/each}
  </div>
</div>

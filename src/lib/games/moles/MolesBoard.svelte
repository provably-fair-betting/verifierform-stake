<script lang="ts">
  import holeIcon from '$lib/games/moles/icons/hole-50x50.png';
  import moleIcon from '$lib/games/moles/icons/mole-50x50.png';
  import holeIconGray from '$lib/games/moles/icons/hole-50x50-gray.png';
  import moleIconGray from '$lib/games/moles/icons/mole-50x50-gray.png';

  const { molePositions }: { molePositions: number[] } = $props();
  const molePositionsLookup = $derived(new Set(molePositions));

  const getColorClass = (n: number) =>
    molePositionsLookup.has(n)
      ? 'border-2 border-purple-500 bg-purple-100 text-purple-700 ring-2 ring-purple-400 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-500'
      : 'border-2 border-gray-200 bg-gray-50 text-gray-500 ring-2 ring-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400';

  const rows = [
    [0, 1],
    [2, 3, 4],
    [5, 6],
  ];
</script>

<div class="flex flex-col items-center gap-2 md:gap-2.5">
  {#each rows as row, i (i)}
    <div class="flex gap-2 md:gap-2.5">
      {#each row as hole (hole)}
        <div
          class={[
            'flex flex-col items-center justify-center rounded p-2 transition-all',
            getColorClass(hole),
          ]}
        >
          <span class="text-xs leading-none font-bold">{hole}</span>
          <div class="hidden dark:block">
            <img
              class="mt-1 h-11 w-11 object-contain"
              src={molePositionsLookup.has(hole) ? moleIcon : holeIcon}
              alt={molePositionsLookup.has(hole) ? 'mole' : 'hole'}
            />
          </div>
          <div class="block dark:hidden">
            <img
              class="mt-1 h-11 w-11 object-contain"
              src={molePositionsLookup.has(hole) ? moleIconGray : holeIconGray}
              alt={molePositionsLookup.has(hole) ? 'mole' : 'hole'}
            />
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

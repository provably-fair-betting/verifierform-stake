<script lang="ts">
  import { getMinesCellClass } from '$lib/games/mines/mines';
  import diamondIcon from '$lib/games/mines/icons/diamond-50x50.png';
  import mineIcon from '$lib/games/mines/icons/bomb-50x50.png';
  import diamondIconGray from '$lib/games/mines/icons/diamond-50x50-gray.png';
  import mineIconGray from '$lib/games/mines/icons/bomb-50x50-gray.png';

  const { chosenMines, highlightedMine = -1 }: { chosenMines: number[]; highlightedMine?: number } =
    $props();
  const chosenMinesLookup = $derived(new Set(chosenMines));

  const columns = Array.from({ length: 25 }).map((_v, i) => i + 1);
</script>

<div class="grid grid-cols-5 gap-1.5 md:gap-2">
  {#each columns as col, n (n)}
    <div
      class={[
        'flex flex-col items-center justify-center rounded p-1.5 transition-all',
        getMinesCellClass(col, chosenMinesLookup, highlightedMine),
      ]}
    >
      <span class="text-xs leading-none font-bold">{col}</span>
      <div class="hidden dark:block">
        <img
          class="mt-1 h-8 w-8 object-contain"
          src={chosenMinesLookup.has(col) ? mineIcon : diamondIcon}
          alt={chosenMinesLookup.has(col) ? 'mine' : 'diamond'}
        />
      </div>
      <div class="block dark:hidden">
        <img
          class="mt-1 h-8 w-8 object-contain"
          src={chosenMinesLookup.has(col) ? mineIconGray : diamondIconGray}
          alt={chosenMinesLookup.has(col) ? 'mine' : 'diamond'}
        />
      </div>
    </div>
  {/each}
</div>

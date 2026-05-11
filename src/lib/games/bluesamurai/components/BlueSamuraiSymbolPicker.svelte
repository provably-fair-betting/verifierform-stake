<script lang="ts">
  import { type BlueSamuraiRound } from '../types';
  import { type BoardCell, getRoundSelectedRing } from '$lib/games/bluesamurai/bluesamurai';
  import BlueSamuraiIcon from '$lib/games/bluesamurai/components/BlueSamuraiIcon.svelte';

  const {
    boardColumns,
    selectedSymbolIndex,
    selectedRound,
    onselect,
  }: {
    boardColumns: BoardCell[][];
    selectedSymbolIndex: number;
    selectedRound: BlueSamuraiRound;
    onselect: (symbolIndex: number) => void;
  } = $props();

  const REEL_LABELS = ['Outer', 'Inner 1', 'Inner 2', 'Inner 3', 'Outer'];
</script>

<div class="grid grid-cols-5 gap-1">
  {#each boardColumns as col, colIdx}
    <div class={['flex flex-col gap-1', colIdx === 0 || colIdx === 4 ? 'justify-center' : '']}>
      {#each col as cell}
        {#if cell.hasFloat}
          {@const isSelected = cell.symbolIndex === selectedSymbolIndex}
          <button
            type="button"
            class={[
              'relative flex flex-col items-center justify-center rounded border p-0.5 transition-all !outline-none',
              isSelected
                ? [
                    'border-transparent',
                    getRoundSelectedRing(selectedRound),
                    'z-10 scale-105 bg-white shadow-md dark:bg-gray-700',
                  ]
                : 'border-gray-200 bg-gray-50 opacity-70 hover:border-gray-400 hover:opacity-90 dark:border-gray-700 dark:bg-gray-800',
            ]}
            onclick={() => onselect(cell.symbolIndex)}
            title={cell.locked
              ? '🔒 Locked — float consumed but symbol is predetermined'
              : undefined}
          >
            <BlueSamuraiIcon icon={cell.icon} />
            <span
              class="mt-0.5 mb-2 block text-[11px] leading-none text-gray-400 dark:text-gray-300"
            >
              {cell.floatIndex}
            </span>
            {#if cell.locked}
              <span class="pointer-events-none absolute top-0 right-0 text-[8px] leading-none">
                🔒
              </span>
            {/if}
          </button>
        {:else}
          <div
            class="flex flex-col items-center justify-center rounded border border-dashed border-gray-200 p-0.5 opacity-30 dark:border-gray-700"
          >
            <BlueSamuraiIcon icon={cell.icon} />
            <span class="mt-0.5 block text-[11px] leading-none text-gray-400">—</span>
          </div>
        {/if}
      {/each}
    </div>
  {/each}
</div>

<div class="mt-1 grid grid-cols-5 gap-1 text-center">
  {#each REEL_LABELS as label}
    <span class="text-[11px] text-gray-400">{label}</span>
  {/each}
</div>

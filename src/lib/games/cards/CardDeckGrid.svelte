<script lang="ts">
  import type { Card } from './types';
  import type { CardColor } from '$lib/games/cards/cards';
  import CardSuitIcon from '$lib/games/cards/CardSuitIcon.svelte';

  const {
    cards,
    chosenIndex,
    color,
    label,
  }: {
    cards: Card[];
    chosenIndex: number;
    color: CardColor;
    label: string;
  } = $props();
</script>

<div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
  <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
    {label}
  </p>
  <div class="grid grid-cols-13 gap-1 text-xs">
    {#each cards as { value, suit }, n (n)}
      <button
        class={[
          'flex min-w-0 flex-col items-center justify-center rounded border p-1.5 transition-all',
          n === chosenIndex
            ? `z-10 scale-110 font-bold shadow-lg ring-2 ${color.border} ${color.bg} ${color.ring}`
            : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800',
        ]}
        disabled
      >
        <span class="text-[11px] text-gray-500 dark:text-gray-400">{n}</span>
        <span class="font-semibold">{value}</span>
        <span class="hidden dark:inline"><CardSuitIcon {suit} small={true} /></span>
        <span class="inline dark:hidden"><CardSuitIcon {suit} small={true} dark={true} /></span>
      </button>
    {/each}
  </div>
  <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
    Selected card is highlighted in {color.label}
  </p>
</div>

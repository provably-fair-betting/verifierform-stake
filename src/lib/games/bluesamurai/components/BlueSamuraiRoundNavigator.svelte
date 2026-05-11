<script lang="ts">
  import { type BlueSamuraiRound } from '../types';
  import {
    getRoundBadgeClass,
    getRoundLabel,
    getRoundTriggerBadge,
    getRoundRetriggerBadgeClass,
  } from '$lib/games/bluesamurai/bluesamurai';

  const {
    rounds,
    selectedRoundIndex,
    onchange,
  }: {
    rounds: BlueSamuraiRound[];
    selectedRoundIndex: number;
    onchange: (index: number) => void;
  } = $props();

  const selectedRound = $derived(rounds[selectedRoundIndex]);
</script>

<div class="mb-3 flex items-center justify-between gap-2">
  <button
    type="button"
    class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-500 transition-all hover:border-gray-400 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-700"
    onclick={() => onchange(Math.max(0, selectedRoundIndex - 1))}
    disabled={selectedRoundIndex === 0}
    aria-label="Previous spin"
  >
    ‹
  </button>

  <div class="flex min-w-0 flex-1 flex-col items-center gap-1.5">
    <!-- Main round label badge -->
    <span
      class={[
        'rounded border-2 px-3 py-1 text-xs font-semibold',
        getRoundBadgeClass(selectedRound),
      ]}
    >
      {getRoundLabel(selectedRound)}
      <span class="ml-1 opacity-60">({selectedRoundIndex + 1}/{rounds.length})</span>
    </span>

    <!-- Trigger badge -->
    {#if selectedRound.retrigger}
      {@const triggerBadge = getRoundTriggerBadge(selectedRound)}
      {@const triggerBadgeClass = getRoundRetriggerBadgeClass(selectedRound)}
      {#if triggerBadge && triggerBadgeClass}
        <span
          class={['rounded border-2 px-2.5 py-0.5 text-[10px] font-semibold', triggerBadgeClass]}
        >
          {triggerBadge}
        </span>
      {/if}
    {/if}

    <!-- Bonus paused badge -->
    {#if selectedRound.specialRound && selectedRound.bonusSpin > 1}
      <span
        class="rounded border-2 border-amber-400 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:border-amber-500 dark:bg-amber-900/20 dark:text-amber-400"
      >
        ⏸ Bonus paused at {selectedRound.bonusSpin - 1}/{selectedRound.totalBonusRounds}
      </span>
    {/if}
  </div>

  <button
    type="button"
    class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-500 transition-all hover:border-gray-400 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-700"
    onclick={() => onchange(Math.min(rounds.length - 1, selectedRoundIndex + 1))}
    disabled={selectedRoundIndex === rounds.length - 1}
    aria-label="Next spin"
  >
    ›
  </button>
</div>

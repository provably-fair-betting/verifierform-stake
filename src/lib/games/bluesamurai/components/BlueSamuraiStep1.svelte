<script lang="ts">
  import type { BlueSamuraiRound, Seed } from '$lib/types';
  import type { BoardCell } from '$lib/games/bluesamurai/bluesamurai';
  import BlueSamuraiRoundNavigator from '$lib/games/bluesamurai/components/BlueSamuraiRoundNavigator.svelte';
  import BlueSamuraiSymbolPicker from '$lib/games/bluesamurai/components/BlueSamuraiSymbolPicker.svelte';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';

  const {
    rounds,
    selectedRoundIndex,
    selectedSymbolIndex,
    boardColumns,
    isLockedSamurai,
    float,
    resultIndex,
    seed,
    onRoundChange,
    onSymbolSelect,
  }: {
    rounds: BlueSamuraiRound[];
    selectedRoundIndex: number;
    selectedSymbolIndex: number;
    boardColumns: BoardCell[][];
    isLockedSamurai: boolean;
    float: number;
    resultIndex: number;
    seed: Seed;
    onRoundChange: (i: number) => void;
    onSymbolSelect: (i: number) => void;
  } = $props();

  const selectedRound = $derived(rounds[selectedRoundIndex]);
</script>

<ContentBlock className="mb-6 p-5 overflow-visible">
  <p class="mb-4 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
    Step 1 — Generate Float
  </p>

  <div class="mb-5">
    <BlueSamuraiRoundNavigator {rounds} {selectedRoundIndex} onchange={onRoundChange} />

    <BlueSamuraiSymbolPicker
      {boardColumns}
      {selectedSymbolIndex}
      {selectedRound}
      onselect={onSymbolSelect}
    />
  </div>

  {#if isLockedSamurai}
    <div
      class="mt-5 rounded-lg border-2 border-amber-400 bg-amber-50 p-4 dark:border-amber-500 dark:bg-amber-900/20"
    >
      <p class="font-semibold text-amber-700 dark:text-amber-400">
        🔒 Locked Position — Symbol Predetermined
      </p>
      <p class="mt-2 text-gray-600 dark:text-gray-300">
        This inner reel position was locked as <strong>Samurai</strong>
        in an earlier special round. A float (
        <span class="font-mono font-semibold text-amber-700 dark:text-amber-400">
          {float.toFixed(8)}
        </span>
        ) is still consumed from the sequence to keep the provably fair chain intact, but the symbol
        is fixed regardless of what the float would normally map to.
      </p>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        The float-to-symbol lookup (Step 2) is shown below for transparency, but its result does not
        affect the game outcome for this position.
      </p>
    </div>
  {:else}
    <div class="mt-5 border-t border-gray-200 pt-5 dark:border-gray-700">
      <FloatGenerationStep
        stepNumber={1.1}
        {resultIndex}
        {seed}
        {float}
        hideStepNumber={true}
        contentBlockClassName="py-6"
      />
    </div>
  {/if}
</ContentBlock>

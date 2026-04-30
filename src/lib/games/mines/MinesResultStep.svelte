<script lang="ts">
  import type { FisherYatesItem } from '$lib/types';
  import { useFisherYatesDisplay } from '$lib/composables/core';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';
  import MinesBoard from '$lib/games/mines/MinesBoard.svelte';

  const {
    stepNumber,
    resultIndex,
    float,
    chosen,
    chosenIndex,
    chosenIndexes,
  }: {
    stepNumber: number;
    resultIndex: number;
  } & FisherYatesItem<number> = $props();

  const display = useFisherYatesDisplay(
    () => 25,
    () => chosenIndexes
  );
  const previousNumbers = $derived(display.previousItems);
  const minesBoardMinusPreviousMines = $derived(display.remainingItems);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into mine position</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Mines</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        resultIndex = <span class="font-bold text-blue-600 dark:text-blue-400">{resultIndex}</span>
      </p>
      <p class="leading-relaxed">
        mineSquares = <span class="font-bold text-blue-600 dark:text-blue-400">25</span>
      </p>
    </div>

    <!-- Mines Already Placed -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Mines Already Placed
      </p>
      {#if previousNumbers.length === 0}
        <p class="font-sans text-xs text-gray-500 dark:text-gray-400">
          None — this is the first mine
        </p>
      {:else}
        <div class="flex flex-wrap gap-1">
          {#each previousNumbers as num (num)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-red-400 bg-red-50 px-3 py-1.5 font-bold text-red-600 dark:border-red-500 dark:bg-red-900/20 dark:text-red-400"
            >
              {num}
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Available Squares -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Available Squares
      </p>
      <div class="grid grid-cols-5 gap-1 text-xs sm:grid-cols-8 md:grid-cols-10">
        {#each minesBoardMinusPreviousMines as num, n (n)}
          <span
            class={[
              'inline-flex flex-col items-center justify-center rounded border-2 py-1 transition-all',
              n === chosenIndex
                ? 'border-red-500 bg-red-100 text-red-700 ring-2 ring-red-400 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500'
                : 'border-gray-200 bg-gray-50 text-gray-500 ring-2 ring-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
            ]}
          >
            <span class="text-[10px] leading-none font-normal opacity-70">{n}</span>
            <span class="leading-snug font-semibold">{num}</span>
          </span>
        {/each}
      </div>
    </div>

    <!-- Float Value -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Mine Position -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Mine Position
      </p>
      <p class="leading-relaxed">mineIndex</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> * (<HighlightText>
          &lbrace;mineSquares&rbrace;
        </HighlightText> - <HighlightText>&lbrace;resultIndex&rbrace;</HighlightText>))
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> * (<HighlightText>
          25
        </HighlightText> - <HighlightText>{resultIndex}</HighlightText>))
      </p>
      <p class="mb-4 leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
      <p class="leading-relaxed">minePosition</p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;availableSquares[mineIndex]&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;availableSquares[{chosenIndex}]&rbrace;</HighlightText>
      </p>
      <div class="mt-4 flex items-center gap-2">
        <span class="leading-relaxed font-bold">=</span>
        <div
          class="inline-flex min-w-[80px] flex-col items-center justify-center rounded border-2 border-red-500 bg-red-50 px-6 py-4 shadow-lg dark:border-red-400 dark:bg-red-900/20"
        >
          <span class="mb-1 font-sans text-xs text-gray-500 dark:text-gray-400">Mine position</span>
          <span class="text-2xl font-bold text-red-600 dark:text-red-400">{chosen}</span>
        </div>
      </div>
    </div>
  </ContentBlock>
</div>

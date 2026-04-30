<script lang="ts">
  import type { FisherYatesItem } from '$lib/types';
  import { useFisherYatesDisplay } from '$lib/composables/core';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

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
    () => 7,
    () => chosenIndexes
  );
  const previousHoles = $derived(display.previousItems);
  const holesMinusPreviousMoles = $derived(display.remainingItems);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into mole position</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Moles</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        holes = <span class="font-bold text-blue-600 dark:text-blue-400">7</span>
      </p>
    </div>

    <!-- Holes Already Used -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Holes Already Used
      </p>
      {#if previousHoles.length === 0}
        <p class="font-sans text-xs text-gray-500 dark:text-gray-400">
          None — this is the first mole this round
        </p>
      {:else}
        <div class="flex flex-wrap gap-1">
          {#each previousHoles as hole (hole)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-purple-500 bg-purple-100 px-3 py-1.5 font-bold text-purple-700 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400"
            >
              {hole}
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Available Holes -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Available Holes
      </p>
      <div class="flex flex-wrap gap-1">
        {#each holesMinusPreviousMoles as hole, n (n)}
          <span
            class={[
              'inline-flex flex-col items-center justify-center rounded border px-2.5 py-1 font-semibold transition-all',
              n === chosenIndex
                ? 'border-green-500 bg-green-100 text-green-700 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500'
                : 'border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400',
            ]}
          >
            <span class="text-[11px] leading-none font-normal opacity-60">{n}</span>
            <span class="leading-snug">{hole}</span>
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

    <!-- Calculate Mole Position -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Mole Position
      </p>
      <p class="leading-relaxed">moleIndex</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> * (<HighlightText>
          &lbrace;holes&rbrace;
        </HighlightText> - <HighlightText>&lbrace;resultIndex&rbrace;</HighlightText>))
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> * (<HighlightText>
          7
        </HighlightText> - <HighlightText>{resultIndex}</HighlightText>))
      </p>
      <p class="mb-4 leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
      <p class="leading-relaxed">molePosition</p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;holesWithoutPreviousMoles[moleIndex]&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;holesWithoutPreviousMoles[{chosenIndex}]&rbrace;</HighlightText>
      </p>
      <div class="mt-4 flex items-center gap-2">
        <span class="leading-relaxed font-bold">=</span>
        <div
          class="inline-flex min-w-[80px] flex-col items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 shadow-lg dark:border-green-400 dark:bg-green-900/20"
        >
          <span class="mb-1 font-sans text-xs text-gray-500 dark:text-gray-400">Mole position</span>
          <span class="text-2xl font-bold text-green-600 dark:text-green-400">{chosen}</span>
        </div>
      </div>
    </div>
  </ContentBlock>
</div>

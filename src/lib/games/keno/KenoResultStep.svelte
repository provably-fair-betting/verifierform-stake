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
    () => 40,
    () => chosenIndexes
  );
  const previousNumbers = $derived(display.previousItems);
  const kenoBoardMinusPreviousNumbers = $derived(display.remainingItems);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into keno number using Fisher-Yates</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Keno</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        kenoSquares = <span class="font-bold text-blue-600 dark:text-blue-400">40</span>
      </p>
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Numbers Already Drawn
      </p>
      {#if previousNumbers.length === 0}
        <p class="font-sans text-xs text-gray-500 dark:text-gray-400">
          None — this is the first number
        </p>
      {:else}
        <div class="flex flex-wrap gap-1">
          {#each previousNumbers as num (num)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-purple-400 bg-purple-50 px-3 py-1.5 font-bold text-purple-600 dark:border-purple-500 dark:bg-purple-900/20 dark:text-purple-400"
            >
              {num}
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Available Numbers
      </p>
      <div class="grid grid-cols-5 gap-1 text-xs sm:grid-cols-8 md:grid-cols-10">
        {#each kenoBoardMinusPreviousNumbers as num, n (n)}
          <span
            class={[
              'inline-flex flex-col items-center justify-center rounded border-2 py-1 transition-all',
              n === chosenIndex
                ? 'border-purple-500 bg-purple-100 text-purple-700 ring-2 ring-purple-400 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-500'
                : 'border-gray-200 bg-gray-50 text-gray-500 ring-2 ring-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
            ]}
          >
            <span class="text-[10px] leading-none font-normal opacity-70">{n}</span>
            <span class="leading-snug font-semibold">{num}</span>
          </span>
        {/each}
      </div>
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Index
      </p>
      <p class="leading-relaxed">
        kenoNumberIndex = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> * (<HighlightText
        >
          &lbrace;kenoSquares&rbrace;
        </HighlightText> - <HighlightText>&lbrace;resultIndex&rbrace;</HighlightText>))
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> * (<HighlightText>
          40
        </HighlightText> - <HighlightText>{resultIndex}</HighlightText>))
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
    </div>

    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Get Keno Number
      </p>
      <p class="leading-relaxed">
        kenoNumber = <HighlightText>availableNumbers[kenoNumberIndex]</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>availableNumbers[{chosenIndex}]</HighlightText>
      </p>
      <p class="mb-4 leading-relaxed font-bold">
        = <span class="text-purple-600 dark:text-purple-400">{chosen}</span>
      </p>

      <div class="mt-6 flex items-center justify-center">
        <span
          class="inline-flex items-center justify-center rounded-lg border-2 border-purple-400 bg-purple-50 px-6 py-3 text-2xl font-bold text-purple-600 ring-2 ring-purple-400 dark:border-purple-500 dark:bg-purple-900/20 dark:text-purple-400 dark:ring-purple-500"
        >
          {chosen}
        </span>
      </div>
    </div>
  </ContentBlock>
</div>

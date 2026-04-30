<script lang="ts">
  import type { FisherYatesItem } from '$lib/types';
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
    contentBlockClassName = 'p-4',
  }: {
    stepNumber: number;
    resultIndex: number;
    contentBlockClassName?: string;
  } & FisherYatesItem<number> = $props();

  const { previousIndexes, multiplierIndexesMinusPreviousIndexes } = $derived.by(() => {
    const multiplierIndexes = Array.from({ length: 25 }).map((_v, i) => i);
    const previousIndexes = chosenIndexes
      .slice(0, -1)
      .map((i) => multiplierIndexes.splice(i, 1)[0]);
    return { previousIndexes, multiplierIndexesMinusPreviousIndexes: multiplierIndexes };
  });
</script>

<div class="mt-5 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Use float to get random index</p>
  <p class="mb-7 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Pump</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="{contentBlockClassName} text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        indexesRemaining = <span class="font-bold text-blue-600 dark:text-blue-400">25</span>
      </p>
      <p class="leading-relaxed">
        previousIndexCount = <span class="font-bold text-blue-600 dark:text-blue-400">
          {resultIndex}
        </span>
      </p>
    </div>

    <!-- Previous Indexes -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Indexes Already Used
      </p>
      {#if previousIndexes.length === 0}
        <p class="font-sans text-xs text-gray-500 dark:text-gray-400">
          None — this is the first index
        </p>
      {:else}
        <div class="flex flex-wrap gap-1">
          {#each previousIndexes as idx (idx)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-purple-400 bg-purple-50 px-3 py-1.5 font-bold text-purple-600 dark:border-purple-500 dark:bg-purple-900/20 dark:text-purple-400"
            >
              {idx}
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Available Indexes -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Available Indexes ({multiplierIndexesMinusPreviousIndexes.length} remaining)
      </p>
      <div class="grid grid-cols-5 gap-1 text-xs sm:grid-cols-8 md:grid-cols-10">
        {#each multiplierIndexesMinusPreviousIndexes as idx, n (n)}
          <span
            class={[
              'inline-flex flex-col items-center justify-center rounded border-2 py-1 transition-all',
              n === chosenIndex
                ? 'border-green-500 bg-green-100 text-green-700 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500'
                : 'border-gray-200 bg-gray-50 text-gray-500 ring-2 ring-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
            ]}
          >
            <span class="text-[10px] leading-none font-normal opacity-70">{n}</span>
            <span class="leading-snug font-semibold">{idx}</span>
          </span>
        {/each}
      </div>
    </div>

    <!-- Calculate Chosen Index -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Chosen Index
      </p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
      <p class="mt-2 leading-relaxed">chosen</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> * (<HighlightText>
          &lbrace;indexesRemaining&rbrace;
        </HighlightText> - <HighlightText>&lbrace;previousIndexCount&rbrace;</HighlightText>))
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> * (<HighlightText>
          25
        </HighlightText> - <HighlightText>{resultIndex}</HighlightText>))
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
    </div>

    <!-- Calculate Random Index -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Random Index
      </p>
      <p class="leading-relaxed">randomIndex</p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;availableIndexes[chosen]&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;availableIndexes[{chosenIndex}]&rbrace;</HighlightText>
      </p>
      <p class="mt-2 leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{chosen}</span>
      </p>
    </div>
  </ContentBlock>
</div>

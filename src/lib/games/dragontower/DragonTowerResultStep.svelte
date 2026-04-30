<script lang="ts">
  import type { DragonTowerDifficultyConfig, FisherYatesItem } from '$lib/types';
  import { useFisherYatesDisplay } from '$lib/composables/core';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

  const {
    stepNumber,
    resultIndex,
    config,
    float,
    chosen,
    chosenIndex,
    chosenIndexes,
  }: {
    stepNumber: number;
    resultIndex: number;
    config: DragonTowerDifficultyConfig;
  } & FisherYatesItem<number> = $props();

  const display = useFisherYatesDisplay(
    () => config.size,
    () => chosenIndexes
  );
  const previousEggIndexes = $derived(display.previousItems);
  const eggsMinusPreviousIndexes = $derived(display.remainingItems);

  const currentLevel = $derived(Math.floor(resultIndex / config.count) + 1);
  const eggNumber = $derived((resultIndex % config.count) + 1);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into egg position</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Dragon Tower</span>
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
        rowSize = <span class="font-bold text-blue-600 dark:text-blue-400">{config.size}</span>
      </p>
      <p class="leading-relaxed">
        eggsToChoose = <span class="font-bold text-blue-600 dark:text-blue-400">
          {config.count}
        </span>
      </p>
    </div>

    <!-- Eggs Already Placed -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Eggs Already Placed (This Level)
      </p>
      {#if previousEggIndexes.length === 0}
        <p class="font-sans text-xs text-gray-500 dark:text-gray-400">
          None — this is the first egg on level {currentLevel}
        </p>
      {:else}
        <div class="flex flex-wrap gap-1">
          {#each previousEggIndexes as index (index)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-green-400 bg-green-50 px-3 py-1.5 font-bold text-green-600 dark:border-green-500 dark:bg-green-900/20 dark:text-green-400"
            >
              {index}
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Available Positions -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Available Positions
      </p>
      <div class="grid grid-cols-4 gap-1 text-xs sm:grid-cols-6 md:grid-cols-8">
        {#each eggsMinusPreviousIndexes as position, n (n)}
          <span
            class={[
              'inline-flex flex-col items-center justify-center rounded border-2 py-1 transition-all',
              n === chosenIndex
                ? 'border-green-500 bg-green-100 text-green-700 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500'
                : 'border-gray-200 bg-gray-50 text-gray-500 ring-2 ring-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
            ]}
          >
            <span class="text-[10px] leading-none font-normal opacity-70">{n}</span>
            <span class="leading-snug font-semibold">{position}</span>
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

    <!-- Calculate Egg Position -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Egg Position
      </p>
      <p class="leading-relaxed">eggIndex</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> * (<HighlightText>
          &lbrace;rowSize&rbrace;
        </HighlightText> - (<HighlightText>&lbrace;resultIndex&rbrace;</HighlightText> %
        <HighlightText>&lbrace;eggsToChoose&rbrace;</HighlightText>)))
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> * (<HighlightText>
          {config.size}
        </HighlightText> - (<HighlightText>{resultIndex}</HighlightText> %
        <HighlightText>{config.count}</HighlightText>)))
      </p>
      <p class="mb-4 leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
      <p class="leading-relaxed">eggPosition</p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;availablePositions[eggIndex]&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;availablePositions[{chosenIndex}]&rbrace;</HighlightText>
      </p>
      <div class="mt-4 flex items-center gap-2">
        <span class="leading-relaxed font-bold">=</span>
        <div
          class="inline-flex min-w-[80px] flex-col items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 shadow-lg dark:border-green-400 dark:bg-green-900/20"
        >
          <span class="mb-1 font-sans text-xs text-gray-500 dark:text-gray-400">Egg position</span>
          <span class="text-2xl font-bold text-green-600 dark:text-green-400">{chosen}</span>
        </div>
      </div>
    </div>
  </ContentBlock>
</div>

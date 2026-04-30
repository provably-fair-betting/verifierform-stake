<script lang="ts">
  import { PUMP_DIFFICULTY_TO_SLICE } from './pump.config';
  import type { PumpSeed } from '$lib/types';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import PumpMultiplierStep from '$lib/games/pump/PumpMultiplierStep.svelte';
  import HighlightText from '../layout/HighlightText.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import { usePumpMultiplier } from './use-pump-multiplier.svelte';
  import { getPumpTabClass, getPumpTabSelectedClass } from '$lib/games/pump/pump';
  import { useScrollReset } from '$lib/composables/core';
  import { findHorizontalScrollAncestor } from '$lib/util/scroll';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const pump = usePumpMultiplier(() => formValues);
  const pumpSeed = $derived(pump.seed as PumpSeed);

  let selectedEl = $state<HTMLDivElement | null>(null);

  const scrollReset = useScrollReset(
    () => (selectedEl ? findHorizontalScrollAncestor(selectedEl) : null),
    () => selectedEl
  );
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if pump.isCalculating || !pump.items}
      <Loader />
    {:else}
      {@const item = pump.items[resultIndex]}
      {@const slice = PUMP_DIFFICULTY_TO_SLICE[pumpSeed.difficulty]}
      {@const payoutIndex = Math.min(...pump.items.map((item) => item.chosen + 1))}
      {@const maxIndex = 25 - slice}

      <!-- Header banner -->
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-purple-500 dark:border-purple-400"
      >
        <p class="font-medium">
          <span class="text-purple-600 dark:text-purple-400">
            Pop point is determined by Fisher-Yates shuffle.
          </span>
          The minimum random index chosen is the max safe payline index.
        </p>
      </ContentBlock>

      <!-- Step 1 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 1 — Indexes Array
        </p>
        <p class="mb-3 text-gray-700 dark:text-gray-300">Create an array with 25 indexes</p>
        <div class="flex flex-wrap gap-1 font-mono text-xs">
          {#each Array.from({ length: 25 }) as _, i (i)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-gray-200 bg-gray-50 px-2 py-1 font-semibold text-gray-600 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {i}
            </span>
          {/each}
        </div>
      </ContentBlock>

      <!-- Step 2 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 2 — Fisher-Yates Shuffle
        </p>
        <p class="mb-3 text-gray-700 dark:text-gray-300">
          Extract {slice} random index{slice > 1 ? 'es' : ''} from array using fisher-yates
        </p>
        <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
          Indexes needed per difficulty:
          <span class="mt-1 flex flex-wrap gap-1.5">
            {#each Object.entries(PUMP_DIFFICULTY_TO_SLICE) as [difficulty, sliceVal], n (n)}
              <span
                class={[
                  'inline-block rounded px-2 py-0.5 text-xs font-medium',
                  difficulty === pumpSeed.difficulty
                    ? 'bg-purple-500 text-white dark:text-white'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
                ]}
              >
                {difficulty} — {sliceVal}
              </span>
            {/each}
          </span>
        </p>
        <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
          Pump payline has <HighlightText>25 - ({slice} - 1) = {25 - (slice - 1)}</HighlightText>
          multipliers. Max multiplier requires the minimum {slice > 1
            ? `of the ${slice} random indexes`
            : 'index'} to be
          <HighlightText>{maxIndex}</HighlightText>.
        </p>
      </ContentBlock>

      <!-- Step 2 sub-steps -->
      <ContentBlock className="mb-6 p-5 overflow-visible">
        {#if pumpSeed.difficulty !== 'easy'}
          <ResultTabs
            seed={pump.seed!}
            items={pump.items}
            bind:resultIndex
            tabWidthClass="w-12"
            tabClassModifier={() => getPumpTabClass()}
            tabSelectedClassModifier={() => getPumpTabSelectedClass()}
            gradientFromColor="from-gray-200/95"
            gradientViaColor="via-gray-200/80"
            gradientFromColorDark="dark:from-gray-800/95"
            gradientViaColorDark="dark:via-gray-800/80"
          />
        {/if}
        <FloatGenerationStep
          stepNumber={2.1}
          {resultIndex}
          seed={pump.seed!}
          float={item.float}
          contentBlockClassName="py-6"
        />
        <PumpMultiplierStep stepNumber={2.2} {resultIndex} {...item} contentBlockClassName="py-6" />
      </ContentBlock>

      <!-- Step 3 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 3 — Max Payout Index
        </p>
        <p class="mb-1 text-gray-700 dark:text-gray-300">
          Max payout index = minimum of random indexes
        </p>
        <p class="mb-4 text-xs text-gray-500 dark:text-gray-400">
          The payline below shows all multipliers with their 1-based indexes
        </p>
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Random Indexes (1-based)
        </p>
        <div class="mb-4 flex flex-wrap gap-1 font-mono text-xs">
          {#each pump.items.map((i) => i.chosen + 1) as v (v)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-gray-200 bg-gray-50 px-2 py-1 font-semibold text-gray-600 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {v}
            </span>
          {/each}
        </div>
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Result</p>
        <div class="mb-4 flex items-center gap-2 font-mono text-xs">
          <span class="text-gray-500 dark:text-gray-400">maxPayoutIndex =</span>
          <span
            class="rounded border-2 border-green-500 bg-green-50 px-3 py-1.5 font-bold text-green-800 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500"
          >
            {payoutIndex}
          </span>
        </div>

        <!-- Payline visualization -->
        <div class="mt-6">
          <div class="mb-2 flex items-center justify-between">
            <p class="font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
              Payline Visualization
            </p>
            <button
              type="button"
              class={[
                'rounded border border-purple-300 bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 transition-all hover:border-purple-400 hover:bg-purple-100 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:border-purple-600 dark:hover:bg-purple-900/40',
                scrollReset.showResetButton
                  ? 'visible opacity-100'
                  : 'pointer-events-none invisible opacity-0',
              ]}
              onclick={scrollReset.scrollToTarget}
            >
              <span class="mr-1">↻</span>
              Reset Scroll
            </button>
          </div>
          <ScrollableContainer innerClassName="pt-2 pb-4">
            <div class="flex gap-1 font-mono text-xs">
              {#each pump.payline as multi, i (i)}
                {@const isSelected = i + 1 === payoutIndex}
                {#if isSelected}
                  <div
                    class="flex w-auto flex-col items-center justify-center rounded border-2 border-green-500 bg-green-50 px-2 py-2 text-center ring-2 ring-green-400 transition-all dark:border-green-400 dark:bg-green-900/30 dark:ring-green-500"
                    bind:this={selectedEl}
                  >
                    <span class="text-[10px] font-semibold text-green-600 dark:text-green-400">
                      {i + 1}
                    </span>
                    <span
                      class="text-xs font-bold whitespace-nowrap text-green-800 dark:text-green-300"
                    >
                      {multi.toFixed(2)}x
                    </span>
                  </div>
                {:else}
                  <div
                    class="flex w-auto flex-col items-center justify-center rounded border-2 border-gray-200 bg-gray-50 px-2 py-2 text-center ring-2 ring-transparent transition-all dark:border-gray-600 dark:bg-gray-800"
                  >
                    <span class="text-[10px] text-gray-400 dark:text-gray-500">{i + 1}</span>
                    <span
                      class="text-xs font-bold whitespace-nowrap text-gray-600 dark:text-gray-400"
                    >
                      {multi.toFixed(2)}x
                    </span>
                  </div>
                {/if}
              {/each}
            </div>
          </ScrollableContainer>
        </div>
      </ContentBlock>
    {/if}
  </div>
</div>

<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import PlinkoDirectionStep from '$lib/games/plinko/PlinkoDirectionStep.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightText from '../layout/HighlightText.svelte';
  import { usePlinkoPayout } from './use-plinko-payout.svelte';

  import { getPlinkoTabClass, getPlinkoTabSelectedClass } from '$lib/games/plinko/plinko';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const plinko = usePlinkoPayout(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if plinko.isCalculating || !plinko.directions || !plinko.computedPayline}
      <Loader />
    {:else}
      {@const firstDirection = plinko.directions[0]}
      {@const selectedDirection = plinko.directions[resultIndex]}
      {@const oppositeDirectionEntries = plinko.directions.filter(
        (d) => d.chosen !== firstDirection.chosen
      )}
      {@const turnsInOppositeDirection = oppositeDirectionEntries.length}

      <!-- Header banner -->
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Plinko payout is determined by counting direction changes.
          </span>
          The ball's final position determines the multiplier from the payline.
        </p>
      </ContentBlock>

      <!-- Step 1 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 1 — Generate Directions
        </p>
        <p class="mb-3 text-gray-700 dark:text-gray-300">
          Extract {plinko.seed?.rows} directions from seed (Left or Right for each row)
        </p>
      </ContentBlock>

      <!-- Step 1 sub-steps -->
      <ContentBlock className="mb-6 p-5 overflow-visible">
        <ResultTabs
          seed={plinko.seed!}
          items={plinko.directions}
          bind:resultIndex
          tabWidthClass="w-12"
          tabClassModifier={() => getPlinkoTabClass()}
          tabSelectedClassModifier={() => getPlinkoTabSelectedClass()}
        />

        <FloatGenerationStep
          stepNumber={1.1}
          {resultIndex}
          seed={plinko.seed!}
          float={selectedDirection.float}
          contentBlockClassName="py-6"
        />
        <PlinkoDirectionStep stepNumber={1.2} {...selectedDirection} contentBlockClassName="py-6" />
      </ContentBlock>

      <!-- Step 2 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 2 — Calculate Payout
        </p>
        <p class="mb-1 text-gray-700 dark:text-gray-300">
          Count turns in opposite direction from first direction
        </p>
        <p class="mb-4 text-xs text-gray-500 dark:text-gray-400">
          This determines the final position and corresponding multiplier
        </p>

        <!-- Directions list -->
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          All Directions
        </p>
        <div class="mb-4 flex flex-wrap gap-1 font-mono text-xs">
          {#each plinko.directions as { chosen }, n (n)}
            <span
              class="inline-flex items-center justify-center rounded border-2 border-gray-200 bg-gray-50 px-2 py-1 font-semibold text-gray-600 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {chosen}
            </span>
          {/each}
        </div>

        <!-- Calculation breakdown -->
        <div
          class="mb-4 rounded border border-gray-200 bg-gray-50 p-4 font-mono text-xs dark:border-gray-700 dark:bg-gray-800"
        >
          <p class="mb-2 leading-relaxed">
            firstDirection = <span class="font-bold text-blue-600 dark:text-blue-400">
              {firstDirection.chosen}
            </span>
          </p>
          <p class="mb-2 leading-relaxed">
            turnsInOppositeDirection = count of
            <span class="font-bold text-blue-600 dark:text-blue-400">
              {firstDirection.chosen === 'L' ? 'R' : 'L'}
            </span>
          </p>
          <p class="leading-relaxed">
            = <span class="font-bold text-blue-600 dark:text-blue-400">
              {turnsInOppositeDirection}
            </span>
          </p>
        </div>

        <!-- Opposite directions highlight -->
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Opposite Direction Turns ({turnsInOppositeDirection})
        </p>
        <div class="mb-4 flex flex-wrap gap-1 font-mono text-xs">
          {#each plinko.directions as { chosen }, n (n)}
            {#if chosen !== firstDirection.chosen}
              <span
                class="inline-flex items-center justify-center rounded border-2 border-purple-400 bg-purple-50 px-2 py-1 font-semibold text-purple-600 ring-2 ring-transparent dark:border-purple-500 dark:bg-purple-900/20 dark:text-purple-400"
              >
                {chosen}
              </span>
            {/if}
          {/each}
        </div>

        <!-- Final calculation -->
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Result</p>
        <div
          class="mb-4 rounded border border-gray-200 bg-gray-50 p-4 font-mono text-xs dark:border-gray-700 dark:bg-gray-800"
        >
          <p class="leading-relaxed">payout</p>
          <p class="leading-relaxed">
            = <HighlightText>&lbrace;payline[turnsInOppositeDirection]&rbrace;</HighlightText>
          </p>
          <p class="leading-relaxed">
            = <HighlightText>&lbrace;payline[{turnsInOppositeDirection}]&rbrace;</HighlightText>
          </p>
          <p class="mt-2 leading-relaxed font-bold">
            = <span class="text-green-600 dark:text-green-400">{plinko.payout}x</span>
          </p>
        </div>

        <!-- Payline reference -->
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Payline (indexed by turns)
        </p>
        <div class="flex flex-wrap gap-1 font-mono text-xs">
          {#each plinko.computedPayline as multi, n (n)}
            {@const isSelected = n === turnsInOppositeDirection}
            {#if isSelected}
              <div
                class="flex flex-col items-center rounded border-2 border-green-500 bg-green-50 px-2 py-1 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:ring-green-500"
              >
                <span class="text-[10px] font-semibold text-green-600 dark:text-green-400">
                  {n}
                </span>
                <span class="font-bold text-green-800 dark:text-green-300">{multi}x</span>
              </div>
            {:else}
              <div
                class="flex flex-col items-center rounded border-2 border-gray-200 bg-gray-50 px-2 py-1 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800"
              >
                <span class="text-[10px] text-gray-400 dark:text-gray-500">{n}</span>
                <span class="font-semibold text-gray-600 dark:text-gray-400">{multi}x</span>
              </div>
            {/if}
          {/each}
        </div>
      </ContentBlock>
    {/if}
  </div>
</div>

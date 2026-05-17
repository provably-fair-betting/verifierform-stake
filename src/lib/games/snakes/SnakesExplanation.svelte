<script lang="ts">
  import { SNAKES_MULTIPLIER_SHIFT_MAP } from './snakes.config';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import SnakesDiceRollStep from '$lib/games/snakes/SnakesDiceRollStep.svelte';
  import { chunk } from '$lib/util/array';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import { useSnakesSteps } from './use-snakes-steps.svelte';
  import { getSnakesTabClass, getSnakesTabSelectedClass } from '$lib/games/snakes/snakes';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const snakes = useSnakesSteps(() => formValues);

  // Group rolls by turn (2 dice per turn)
  const turnGroups = $derived.by(() => {
    if (!snakes.rolls) return [];
    return chunk(snakes.rolls, 2);
  });
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if snakes.isCalculating || !snakes.rolls}
      <Loader />
    {:else}
      {@const selectedRoll = snakes.rolls[resultIndex]}

      <!-- Header banner -->
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-orange-500 dark:border-orange-400"
      >
        <p class="font-medium">
          <span class="text-orange-600 dark:text-orange-400">
            Snakes outcome is determined by dice rolls and payline positions.
          </span>
          The pawn moves through the payline based on dice sums, landing on multipliers or snakes.
        </p>
      </ContentBlock>

      <!-- Step 1 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 1 — Generate Dice Rolls
        </p>
        <p class="mb-3 text-gray-700 dark:text-gray-300">
          Compute the dice rolls for all 5 turns (10 total rolls)
        </p>
      </ContentBlock>

      <!-- Step 1 sub-steps -->
      <ScrollableContainer className="mb-7" innerClassName="p-1.5 pb-0">
        <div class="flex gap-4 pb-5" style="min-width: max-content;">
          {#each turnGroups as turnRolls, turnIndex (turnIndex)}
            <div class="flex flex-col gap-1">
              <span
                class="mb-1 text-center font-sans text-xs font-semibold text-gray-500 dark:text-gray-400"
              >
                Turn {turnIndex + 1}
              </span>
              <div class="flex gap-1.5">
                {#each turnRolls as roll, dieIndex (dieIndex)}
                  {@const rollIndex = turnIndex * 2 + dieIndex}
                  <button
                    type="button"
                    class={[
                      'flex w-12 flex-col items-center justify-center overflow-visible rounded border p-1.5 text-sm font-medium transition-all',
                      rollIndex === resultIndex
                        ? getSnakesTabSelectedClass(rollIndex)
                        : getSnakesTabClass(rollIndex),
                    ]}
                    onclick={() => (resultIndex = rollIndex)}
                  >
                    <span class="block text-[10px]">({rollIndex + 1})</span>
                    <span class="block font-bold">{roll.chosen}</span>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </ScrollableContainer>

      <ContentBlock className="mb-6 p-5">
        <FloatGenerationStep
          stepNumber={1.1}
          {resultIndex}
          seed={snakes.seed!}
          float={selectedRoll.float}
          contentBlockClassName="py-6"
        />
        <SnakesDiceRollStep stepNumber={1.2} {...selectedRoll} contentBlockClassName="py-6" />
      </ContentBlock>

      <!-- Step 2 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 2 — Calculate Turn Outcomes
        </p>
        <p class="mb-3 text-gray-700 dark:text-gray-300">
          Calculate the outcome of each turn using the sum of that turn's dice rolls
        </p>
        <p class="mb-4 text-xs text-gray-500 dark:text-gray-400">
          NOTE: Given the pawn lands on a multiplier after the first turn, the lowest multiplier in
          the payline will increase slightly for the remaining turns
        </p>

        <!-- Multiplier shift map -->
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Multiplier Shifts by Difficulty
        </p>
        <div class="mb-6 grid grid-cols-5 gap-2 text-xs">
          {#each Object.entries(SNAKES_MULTIPLIER_SHIFT_MAP) as [difficulty, config], n (n)}
            {#each Object.entries(config) as [fromMulti, toMulti], n (n)}
              <div
                class="rounded border-2 px-2 py-1 {difficulty === snakes.seed?.difficulty
                  ? 'border-orange-500 bg-orange-50 font-semibold text-orange-700 dark:border-orange-400 dark:bg-orange-900/30 dark:text-orange-400'
                  : 'border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'}"
              >
                <div class="font-medium">{difficulty}</div>
                <div class="font-mono">
                  {parseFloat(fromMulti).toFixed(2)}x → {toMulti.toFixed(2)}x
                </div>
              </div>
            {/each}
          {/each}
        </div>

        <!-- Calculation -->
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Calculation</p>
        <ContentBlock className="p-4 text-left font-mono text-sm">
          <!-- Initial payline -->
          <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
            <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
              Initial Payline
            </p>
            <p class="leading-relaxed">
              payline = [
              {#each snakes.payline as multi, n (n)}
                <span
                  class="mr-1 mb-1 inline-block rounded border-2 border-gray-200 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  ({n + 1}) {multi.toFixed(2)}x
                </span>
              {/each}
              ]
            </p>
          </div>

          {#each chunk(snakes.rolls, 2) as [roll1, roll2], n (n)}
            {#if n === 1}
              <!-- Updated payline after first turn -->
              <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
                <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
                  Updated Payline (after turn 1)
                </p>
                <p class="leading-relaxed">
                  payline = [
                  {#each snakes.payline as multi, nn (nn)}
                    <span
                      class={[
                        'mr-1 mb-1 inline-block rounded border-2 px-2 py-1 text-xs font-semibold',
                        multi in snakes.multiShiftMap
                          ? 'border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-400 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400',
                      ]}
                    >
                      ({nn + 1}) {(snakes.multiShiftMap[multi] || multi).toFixed(2)}x
                    </span>
                  {/each}
                  ]
                </p>
              </div>
            {/if}

            <!-- Turn calculation -->
            <div
              class="mb-4 {n < chunk(snakes.rolls, 2).length - 1
                ? 'border-b border-gray-300 pb-4 dark:border-gray-600'
                : ''}"
            >
              <p class="mb-1 leading-relaxed">
                turn{n + 1} = payline[{roll1.chosen} + {roll2.chosen} - 1]
              </p>
              <p class="mb-1 leading-relaxed">
                turn{n + 1} = payline[{roll1.chosen + roll2.chosen - 1}]
              </p>
              <p class="leading-relaxed">
                turn{n + 1} =
                <span class="font-bold text-blue-600 dark:text-blue-400">
                  {(
                    snakes.multiShiftMap[snakes.payline[roll1.chosen + roll2.chosen - 2]] ||
                    snakes.payline[roll1.chosen + roll2.chosen - 2]
                  ).toFixed(2)}x
                </span>
              </p>
            </div>
          {/each}
        </ContentBlock>
      </ContentBlock>
    {/if}
  </div>
</div>

<script lang="ts">
  import { useSnakesSteps } from './use-snakes-steps.svelte';
  import snakeIcon from '$lib/games/snakes/icons/snake-50x50-white.png';
  import DiceIcon from '$lib/games/snakes/DiceIcon.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const snakes = useSnakesSteps(() => formValues);
</script>

{#if snakes.isCalculating}
  <Loader />
{:else}
  {@const steps = snakes.result!.steps}
  {@const best = snakes.result!.best}
  {@const isBusted = best === 0}

  <p data-testid="snakes-data" class="hidden">
    {JSON.stringify(steps.map((s) => s.die[0] + s.die[1]))}
  </p>

  <ContentBlock className="p-4">
    <div class="flex items-center justify-center">
      <div
        class="flex items-center justify-center rounded border-2 px-6 py-4 {isBusted
          ? 'border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/30'
          : 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/30'}"
      >
        <div class="flex flex-col items-center gap-1">
          <span
            class="text-xs font-medium {isBusted
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'}"
          >
            Best Multiplier
          </span>
          <span
            data-testid="snake-result"
            class="text-2xl font-bold {isBusted
              ? 'text-red-800 dark:text-red-300'
              : 'text-green-800 dark:text-green-300'}"
          >
            {best.toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  </ContentBlock>

  <ContentBlock className="mt-4 p-4">
    <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Turn Results</p>
    <div class="grid grid-cols-5 gap-1 sm:gap-1.5">
      {#each steps as { die, result: stepResult }, n (n)}
        <div>
          <div
            class={[
              'flex h-15 w-full items-center justify-center rounded-t border-2',
              stepResult === 0
                ? 'border-red-500 bg-red-100 dark:border-red-400 dark:bg-red-900/30'
                : 'border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800',
            ]}
          >
            {#if stepResult === 0}
              <img class="relative scale-80 object-scale-down" src={snakeIcon} alt="snake" />
            {:else}
              <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {n > 0 && stepResult in snakes.multiShiftMap
                  ? snakes.multiShiftMap[stepResult].toFixed(2)
                  : stepResult.toFixed(2)}x
              </p>
            {/if}
          </div>
          <div
            class="grid grid-cols-2 rounded-b border-2 border-t-0 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
          >
            {#each die as roll, n (n)}
              <div>
                <DiceIcon {roll} />
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </ContentBlock>
{/if}

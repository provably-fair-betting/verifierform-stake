<script lang="ts">
  import { useDrillResults } from './use-drill-results.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import FloatGenerationStep from '../FloatGenerationStep.svelte';
  import DrillResultStep from './DrillResultStep.svelte';
  import { getDrillTabClass, getDrillTabSelectedClass } from '$lib/games/drill/drill';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);

  const drill = useDrillResults(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if drill.isCalculating || !drill.drills}
      <Loader />
    {:else}
      {@const results = drill.drills}

      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Three drills generated in order shown below.
          </span>
          Click a drill to see how its multiplier was calculated using Stake's provably fair algorithm.
        </p>
        <div class="mt-4 text-left text-sm text-gray-600 dark:text-gray-400">
          <p class="mb-2 font-semibold text-gray-700 dark:text-gray-300">Formula:</p>
          <code class="block rounded bg-gray-100 px-3 py-2 dark:bg-gray-800">
            multiplier = u &lt; 0.02 ? 1 : min(0.98 / (1 - u), 2,000,000)
          </code>
          <p class="mt-3">
            If the random float (u) is below 0.02, the drill stops instantly at 1.00x. Otherwise,
            the multiplier is calculated using an inverse formula with house edge of 0.98 (2%).
            Maximum multiplier is capped at 2,000,000x.
          </p>
        </div>
      </ContentBlock>

      <!-- Custom tab strip with drill colors -->
      <div class="mb-7 overflow-x-auto overflow-y-visible" style="padding: 4px 6px 0 4px;">
        <div class="flex justify-center gap-2 pb-5" style="min-width: max-content;">
          {#each results as result, i (i)}
            <button
              type="button"
              class={i === resultIndex
                ? getDrillTabSelectedClass(result.drillIndex)
                : getDrillTabClass(result.drillIndex)}
              onclick={() => (resultIndex = i)}
            >
              <span class="block text-[10px] opacity-75">Drill {i + 1}</span>
              <span class="block text-base font-bold">{result.multiplier.toFixed(2)}x</span>
            </button>
          {/each}
        </div>
      </div>

      {@const selectedItem = results[resultIndex]}
      {@const float = selectedItem.float}
      {@const multiplier = selectedItem.multiplier}
      {@const drillIndex = selectedItem.drillIndex}

      <FloatGenerationStep stepNumber={1} {resultIndex} seed={drill.seed} {float} />
      <DrillResultStep {float} {multiplier} {drillIndex} />
    {/if}
  </div>
</div>

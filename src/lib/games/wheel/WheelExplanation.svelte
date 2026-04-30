<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import WheelResultStep from '$lib/games/wheel/WheelResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useWheelSpin } from './use-wheel-spin.svelte';
  import type { WheelSeed } from '$lib/types';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const wheel = useWheelSpin(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if wheel.isCalculating}
      <Loader />
    {:else}
      <!-- Header banner -->
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-amber-500 dark:border-amber-400"
      >
        <p class="font-medium">
          <span class="text-amber-600 dark:text-amber-400">
            Wheel outcome is determined by a float mapped to wheel segments.
          </span>
          Each segment contains a multiplier value based on the selected risk level.
        </p>
      </ContentBlock>

      <!-- Step 1 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 1 — Generate Float
        </p>
        <p class="mb-3 text-gray-700 dark:text-gray-300">
          Generate a float value to determine which wheel segment is selected
        </p>
      </ContentBlock>

      <FloatGenerationStep stepNumber={1} resultIndex={0} seed={wheel.seed!} float={wheel.float!} />
      <WheelResultStep stepNumber={2} seed={wheel.seed! as WheelSeed} float={wheel.float!} />
    {/if}
  </div>
</div>

<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import RouletteResultStep from '$lib/games/roulette/RouletteResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import { useRouletteNumber } from './use-roulette-number.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const roulette = useRouletteNumber(() => formValues);
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if roulette.isCalculating}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">One float is generated per spin.</span>
          Click the steps below to see how the roulette number was determined using Stake's provably fair
          algorithm.
        </p>
      </ContentBlock>

      <FloatGenerationStep
        stepNumber={1}
        resultIndex={0}
        seed={roulette.seed!}
        float={roulette.float!}
      />
      <RouletteResultStep stepNumber={2} float={roulette.float!} />
    {/if}
  </div>
</div>

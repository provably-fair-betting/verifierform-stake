<script lang="ts">
  import type { CasesSeed } from '$lib/types';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import CasesResultStep from '$lib/games/cases/CasesResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useCasesPayout } from './use-cases-payout.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const cases = useCasesPayout(() => formValues);
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if cases.isCalculating || !cases.result}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">Follow the steps below</span>
          to see how your case result was determined using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <FloatGenerationStep
        stepNumber={1}
        resultIndex={0}
        seed={cases.seed!}
        float={cases.result.float}
      />
      <CasesResultStep
        stepNumber={2}
        seed={cases.seed! as CasesSeed}
        float={cases.result.float}
        payout={cases.result.payout}
      />
    {/if}
  </div>
</div>

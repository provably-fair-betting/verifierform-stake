<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import DiceResultStep from '$lib/games/dice/DiceResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useDiceRoll } from './use-dice-roll.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const diceRoll = useDiceRoll(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if diceRoll.isCalculating}
      <Loader />
    {:else}
      <FloatGenerationStep
        stepNumber={1}
        resultIndex={0}
        seed={diceRoll.seed!}
        float={diceRoll.float!}
      />
      <DiceResultStep stepNumber={2} float={diceRoll.float!} />
    {/if}
  </div>
</div>

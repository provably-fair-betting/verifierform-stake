<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import LimboResultStep from '$lib/games/limbo/LimboResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useLimboMultiplier } from './use-limbo-multiplier.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const limbo = useLimboMultiplier(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if limbo.isCalculating}
      <Loader />
    {:else}
      <FloatGenerationStep stepNumber={1} resultIndex={0} seed={limbo.seed!} float={limbo.float!} />
      <LimboResultStep stepNumber={2} float={limbo.float!} />
    {/if}
  </div>
</div>

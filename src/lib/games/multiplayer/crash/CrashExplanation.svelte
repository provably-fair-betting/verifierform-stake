<script lang="ts">
  import type { CrashSeed } from '$lib/types';
  import CrashIntGenerationStep from '$lib/games/multiplayer/crash/CrashIntGenerationStep.svelte';
  import CrashResultStep from '$lib/games/multiplayer/crash/CrashResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useCrashPoint } from './use-crash-point.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const crash = useCrashPoint(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if crash.isCalculating || !crash.hmac}
      <Loader />
    {:else}
      <CrashIntGenerationStep stepNumber={1} seed={crash.seed! as CrashSeed} hmac={crash.hmac} />
      <CrashResultStep stepNumber={2} hmac={crash.hmac} />
    {/if}
  </div>
</div>

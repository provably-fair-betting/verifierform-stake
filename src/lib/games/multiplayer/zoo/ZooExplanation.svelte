<script lang="ts">
  import type { ZooSeed } from './types';
  import ZooHmacStep from '$lib/games/multiplayer/zoo/ZooHmacStep.svelte';
  import ZooResultStep from '$lib/games/multiplayer/zoo/ZooResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useZooAnimals } from './use-zoo-animals.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const zoo = useZooAnimals(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if zoo.isCalculating || !zoo.hmac}
      <Loader />
    {:else}
      <ZooHmacStep stepNumber={1} seed={zoo.seed! as ZooSeed} hmac={zoo.hmac} />
      <ZooResultStep stepNumber={2} hmac={zoo.hmac} />
    {/if}
  </div>
</div>

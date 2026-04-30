<script lang="ts">
  import type { SlideSeed } from '$lib/types';
  import SlideIntGenerationStep from '$lib/games/multiplayer/slide/SlideIntGenerationStep.svelte';
  import SlideResultStep from '$lib/games/multiplayer/slide/SlideResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { useSlidePoint } from './use-slide-point.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const slide = useSlidePoint(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if slide.isCalculating || !slide.hmac}
      <Loader />
    {:else}
      <SlideIntGenerationStep stepNumber={1} seed={slide.seed! as SlideSeed} hmac={slide.hmac} />
      <SlideResultStep stepNumber={2} hmac={slide.hmac} />
    {/if}
  </div>
</div>

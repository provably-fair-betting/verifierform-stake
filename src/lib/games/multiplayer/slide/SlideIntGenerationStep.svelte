<script lang="ts">
  import type { SlideIntGenerationStepProps } from '$lib/types';
  import IntGenerationStep from '$lib/games/multiplayer/IntGenerationStep.svelte';

  const { stepNumber, seed, hmac }: SlideIntGenerationStepProps = $props();
</script>

<IntGenerationStep
  {stepNumber}
  {hmac}
  gameHash={seed.slideHash}
  blockHash={seed.blockHash}
  gameHashLabel="slidehash"
/>

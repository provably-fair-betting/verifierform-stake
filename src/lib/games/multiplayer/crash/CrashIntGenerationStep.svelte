<script lang="ts">
  import type { CrashIntGenerationStepProps } from './types';
  import IntGenerationStep from '$lib/games/multiplayer/IntGenerationStep.svelte';

  const { stepNumber, seed, hmac }: CrashIntGenerationStepProps = $props();
</script>

<IntGenerationStep {stepNumber} {hmac} gameHash={seed.gameHash} blockHash={seed.blockHash} />

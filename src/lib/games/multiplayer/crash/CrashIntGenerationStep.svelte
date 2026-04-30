<script lang="ts">
  import type { CrashIntGenerationStepProps } from '$lib/types';
  import { CRASH_SEED } from '../multiplayer.config';
  import IntGenerationStep from '$lib/games/multiplayer/IntGenerationStep.svelte';

  const { stepNumber, seed, hmac }: CrashIntGenerationStepProps = $props();
</script>

<IntGenerationStep {stepNumber} {hmac} gameHash={seed.gameHash} blockHash={CRASH_SEED} />

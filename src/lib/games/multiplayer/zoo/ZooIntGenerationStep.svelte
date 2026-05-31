<script lang="ts">
  import type { ZooSeed } from './types';
  import IntGenerationStep from '$lib/games/multiplayer/IntGenerationStep.svelte';

  const { stepNumber, seed, hmac }: { stepNumber: number; seed: ZooSeed; hmac: string } = $props();
</script>

<IntGenerationStep {stepNumber} {hmac} gameHash={seed.hash} blockHash={seed.seed} gameHashLabel="hash" />

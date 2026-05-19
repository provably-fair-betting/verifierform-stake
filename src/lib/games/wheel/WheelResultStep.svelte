<script lang="ts">
  import paylines from '$lib/paylines/wheel-paylines.json';
  import type { WheelSeed } from './types';
  import { useWheelResult } from './use-wheel-result.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';

  const { stepNumber, seed, float }: { stepNumber: number; seed: WheelSeed; float: number } =
    $props();

  const result = useWheelResult(
    () => seed,
    () => float,
    paylines
  );
  const payline = $derived(result.payline);
  const chosenIndex = $derived(result.chosenIndex);
  const chosen = $derived(result.chosen);
</script>

<div class="mt-5 text-center">
  <p class="mb-3">
    <span class="text-2xl font-semibold">Step {stepNumber}</span>
  </p>
  <p class="mb-7 text-lg">Transform float into payout</p>

  <ContentBlock className="p-4 text-left font-mono text-sm">
    <!-- Payline -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Wheel Payline</p>
      <p class="leading-relaxed">
        payline = [
        {#each payline as multi, n (n)}
          <span
            class={[
              'mr-1 mb-1 inline-block rounded border-2 px-2 py-1 text-xs font-semibold',
              n === chosenIndex
                ? 'border-amber-500 bg-amber-50 text-amber-700 ring-2 ring-amber-400 dark:border-amber-400 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-400'
                : 'border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400',
            ]}
          >
            ({n}) {multi}x
          </span>
        {/each}
        ]
      </p>
    </div>

    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
      <p class="leading-relaxed">
        segments = <span class="font-bold text-blue-600 dark:text-blue-400">{seed.segments}</span>
      </p>
    </div>

    <!-- Calculate Index -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Segment Index
      </p>
      <p class="leading-relaxed">chosenIndex</p>
      <p class="leading-relaxed">
        = floor(
        <span class="font-bold text-blue-600 dark:text-blue-400">&lbrace;float&rbrace;</span>
        *
        <span class="font-bold text-blue-600 dark:text-blue-400">&lbrace;segments&rbrace;</span>
        )
      </p>
      <p class="leading-relaxed">
        = floor(
        <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
        *
        <span class="font-bold text-blue-600 dark:text-blue-400">{seed.segments}</span>
        )
      </p>
      <p class="leading-relaxed">
        = <span class="font-bold text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
    </div>

    <!-- Calculate Payout -->
    <div>
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Payout
      </p>
      <p class="leading-relaxed">payout</p>
      <p class="leading-relaxed">
        = <span class="font-bold text-blue-600 dark:text-blue-400">
          &lbrace;payline[chosenIndex]&rbrace;
        </span>
      </p>
      <p class="leading-relaxed">
        = <span class="font-bold text-blue-600 dark:text-blue-400">
          &lbrace;payline[{chosenIndex}]&rbrace;
        </span>
      </p>
      <p class="mt-2 leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{chosen}x</span>
      </p>
    </div>
  </ContentBlock>

  <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
    Formula taken from <span class="font-bold">Wheel</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>
</div>

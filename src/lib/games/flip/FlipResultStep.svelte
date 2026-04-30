<script lang="ts">
  import type { CoinFlip, Item } from '$lib/types';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

  const {
    stepNumber,
    float,
    chosen,
  }: {
    stepNumber: number;
  } & Item<CoinFlip> = $props();
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into flip</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Flip</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">flipSides = [ TAILS, HEADS ]</p>
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Flip
      </p>
      <p class="leading-relaxed">
        flip = <HighlightText>flipSides[float &lt;= 0.5 ? 0 : 1]</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>flipSides[{float <= 0.5 ? 0 : 1}]</HighlightText>
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosen.toUpperCase()}</span>
      </p>
    </div>
  </ContentBlock>
</div>

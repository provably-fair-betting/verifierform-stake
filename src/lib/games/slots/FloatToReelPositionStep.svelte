<script lang="ts">
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';

  const {
    stepNumber,
    resultIndex,
    float,
    contentBlockClassName = 'p-4',
  }: {
    stepNumber: number;
    resultIndex: number;
    float: number;
    contentBlockClassName?: string;
  } = $props();

  const reelSize = $derived(resultIndex % 5 === 4 ? 41 : 30);
  const reelPosition = $derived(Math.floor(float * reelSize));
</script>

<div class="mt-5 text-center">
  <p class="mb-3">
    <span class="text-2xl font-semibold">Step {stepNumber}</span>
  </p>
  <p class="mb-7 text-lg">Transform float into reel position</p>

  <ContentBlock className="{contentBlockClassName} text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        reelSize = <span class="font-bold text-blue-600 dark:text-blue-400">{reelSize}</span>
      </p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Position -->
    <div>
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Reel Position
      </p>
      <p class="leading-relaxed">reelPosition</p>
      <p class="leading-relaxed">
        = floor(
        <span class="font-bold text-blue-600 dark:text-blue-400">&lbrace;float&rbrace;</span>
        *
        <span class="font-bold text-blue-600 dark:text-blue-400">&lbrace;reelSize&rbrace;</span>
        ) + 1
      </p>
      <p class="leading-relaxed">
        = floor(
        <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
        *
        <span class="font-bold text-blue-600 dark:text-blue-400">{reelSize}</span>
        ) + 1
      </p>
      <p class="mt-2 leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{reelPosition + 1}</span>
      </p>
    </div>
  </ContentBlock>

  <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Scarab Spin / Tome of Life</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>
</div>

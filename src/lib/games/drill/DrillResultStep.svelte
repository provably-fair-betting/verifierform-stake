<script lang="ts">
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';
  import DrillCard from './DrillCard.svelte';

  const {
    float,
    multiplier,
    drillIndex,
  }: { float: number; multiplier: number; drillIndex: number } = $props();

  const formattedMultiplier = $derived((Math.floor(multiplier * 100) / 100).toFixed(2));
  const isLowFloat = $derived(float < 0.02);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step 2</p>
  <p class="mb-2 text-lg">Transform float into drill multiplier</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Drill</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Formula -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Formula</p>
      <code class="block rounded bg-gray-100 px-3 py-2 dark:bg-gray-800">
        multiplier = u &lt; 0.02 ? 1 : min(0.98 / (1 - u), 2,000,000)
      </code>
    </div>

    <!-- Float Value -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        u = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Multiplier -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Multiplier
      </p>
      {#if isLowFloat}
        <p class="leading-relaxed">
          Since <HighlightText>{float.toFixed(12)}</HighlightText> &lt; 0.02:
        </p>
        <p class="mb-4 leading-relaxed font-bold">
          multiplier = <span class="text-blue-600 dark:text-blue-400">1.00x</span>
        </p>
      {:else}
        <p class="leading-relaxed">
          multiplier = min(0.98 / (1 - <HighlightText>{float.toFixed(12)}</HighlightText>),
          2,000,000)
        </p>
        <p class="leading-relaxed">
          = min(0.98 / {(1 - float).toFixed(12)}, 2,000,000)
        </p>
        <p class="mb-4 leading-relaxed font-bold">
          = <span class="text-blue-600 dark:text-blue-400">{formattedMultiplier}x</span>
        </p>
      {/if}

      <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <div class="w-32 sm:w-40">
          <DrillCard {drillIndex} {multiplier} />
        </div>
        <div class="flex-1 text-center sm:text-left">
          <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Result</p>
          <p class="leading-relaxed">
            Drill index: <span class="font-bold text-blue-600 dark:text-blue-400">
              {drillIndex}
            </span>
          </p>
          <p class="leading-relaxed">
            Multiplier: <span class="font-bold text-blue-600 dark:text-blue-400">
              {formattedMultiplier}x
            </span>
          </p>
        </div>
      </div>
    </div>
  </ContentBlock>
</div>

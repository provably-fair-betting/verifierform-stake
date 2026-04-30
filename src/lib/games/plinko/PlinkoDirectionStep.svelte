<script lang="ts">
  import type { Direction, Item } from '$lib/types';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

  const {
    stepNumber,
    float,
    chosen,
    chosenIndex,
    contentBlockClassName = 'p-4',
  }: {
    stepNumber: number;
    contentBlockClassName?: string;
  } & Item<Direction> = $props();
</script>

<div class="mt-5 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into direction</p>
  <p class="mb-7 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Plinko</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="{contentBlockClassName} text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        directions = <span class="font-bold text-blue-600 dark:text-blue-400">[ L, R ]</span>
      </p>
      <p class="leading-relaxed">
        numberOfDirections = <span class="font-bold text-blue-600 dark:text-blue-400">2</span>
      </p>
    </div>

    <!-- Calculate Direction Index -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Direction Index
      </p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
      <p class="mt-2 leading-relaxed">directionIndex</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> *
        <HighlightText>&lbrace;numberOfDirections&rbrace;</HighlightText>)
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> *
        <HighlightText>2</HighlightText>)
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
    </div>

    <!-- Calculate Direction -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Direction
      </p>
      <p class="leading-relaxed">direction</p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;directions[directionIndex]&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;directions[{chosenIndex}]&rbrace;</HighlightText>
      </p>
      <p class="mt-2 leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{chosen}</span>
      </p>
    </div>
  </ContentBlock>
</div>

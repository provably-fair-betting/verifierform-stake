<script lang="ts">
  import type { Item } from '$lib/types';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import { DICE_ROLL_OPTIONS } from '$lib/games/snakes/snakes';

  const {
    stepNumber,
    float,
    chosen,
    chosenIndex,
    contentBlockClassName = 'p-4',
  }: {
    stepNumber: number;
    contentBlockClassName?: string;
  } & Item<number> = $props();
</script>

<div class="mt-5 text-center">
  <p class="mb-3">
    <span class="text-2xl font-semibold">Step {stepNumber}</span>
  </p>
  <p class="mb-7 text-lg">Transform float into dice roll</p>

  <ContentBlock className="{contentBlockClassName} text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        rollOptions = <span class="font-bold text-blue-600 dark:text-blue-400">
          [ {DICE_ROLL_OPTIONS.join(', ')} ]
        </span>
      </p>
      <p class="leading-relaxed">
        numberOfRollOptions = <span class="font-bold text-blue-600 dark:text-blue-400">
          {DICE_ROLL_OPTIONS.length}
        </span>
      </p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Index -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Roll Index
      </p>
      <p class="leading-relaxed">chosenIndex</p>
      <p class="leading-relaxed">
        = floor(
        <span class="font-bold text-blue-600 dark:text-blue-400">&lbrace;float&rbrace;</span>
        *
        <span class="font-bold text-blue-600 dark:text-blue-400">
          &lbrace;numberOfRollOptions&rbrace;
        </span>
        )
      </p>
      <p class="leading-relaxed">
        = floor(
        <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
        *
        <span class="font-bold text-blue-600 dark:text-blue-400">{DICE_ROLL_OPTIONS.length}</span>
        )
      </p>
      <p class="leading-relaxed">
        = <span class="font-bold text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
    </div>

    <!-- Calculate Roll -->
    <div>
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Roll Number
      </p>
      <p class="leading-relaxed">rollNumber</p>
      <p class="leading-relaxed">
        = <span class="font-bold text-blue-600 dark:text-blue-400">
          &lbrace;rollOptions[chosenIndex]&rbrace;
        </span>
      </p>
      <p class="leading-relaxed">
        = <span class="font-bold text-blue-600 dark:text-blue-400">
          &lbrace;rollOptions[{chosenIndex}]&rbrace;
        </span>
      </p>
      <p class="mt-2 leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{chosen}</span>
      </p>
    </div>
  </ContentBlock>

  <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Snakes</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>
</div>

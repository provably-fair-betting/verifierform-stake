<script lang="ts">
  import { Gem } from './types';
  import type { Item } from '$lib/types';
  import { GEM_COLORS } from '$lib/games/diamonds/diamonds';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

  const gems = Object.values(Gem);

  const {
    stepNumber,
    float,
    chosen,
    chosenIndex,
  }: {
    stepNumber: number;
  } & Item<Gem> = $props();
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into gem</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    formula taken from <span class="font-bold">Diamonds</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        numberOfGems = <span class="font-bold text-blue-600 dark:text-blue-400">{gems.length}</span>
      </p>
    </div>

    <!-- Gem List -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Gem List</p>
      <div class="flex flex-wrap gap-1">
        {#each gems as gem, n (n)}
          <span
            class={[
              'inline-block rounded border px-2 py-1 text-xs transition-all',
              n === chosenIndex
                ? 'border-purple-500 bg-purple-100 font-bold ring-2 ring-purple-500 dark:border-purple-400 dark:bg-purple-900/30 dark:ring-purple-400'
                : 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800',
            ]}
          >
            <span class="text-[10px] text-gray-500 dark:text-gray-400">({n})</span>
            {gem}
          </span>
        {/each}
      </div>
      <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Selected gem is highlighted in purple
      </p>
    </div>

    <!-- Float Value -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Gem Index -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Gem Index
      </p>
      <p class="leading-relaxed">gemIndex</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> *
        <HighlightText>&lbrace;numberOfGems&rbrace;</HighlightText>)
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> *
        <HighlightText>{gems.length}</HighlightText>)
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{chosenIndex}</span>
      </p>
    </div>

    <!-- Get Gem -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Get Gem</p>
      <p class="leading-relaxed">gem</p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;gems[gemIndex]&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;gems[{chosenIndex}]&rbrace;</HighlightText>
      </p>
      <div class="mt-4 flex items-center gap-2">
        <span class="leading-relaxed">=</span>
        <div
          class={[
            'inline-flex min-w-[80px] flex-col items-center justify-center rounded border-2 p-3 shadow-lg',
            GEM_COLORS[chosen].bg,
            GEM_COLORS[chosen].border,
          ]}
        >
          <span class={['text-xl font-bold capitalize', GEM_COLORS[chosen].text]}>{chosen}</span>
        </div>
      </div>
    </div>
  </ContentBlock>
</div>

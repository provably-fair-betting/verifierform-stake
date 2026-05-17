<script lang="ts">
  import ContentBlock from '../layout/ContentBlock.svelte';
  import ScrollableContainer from '../layout/ScrollableContainer.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import PacksCard from './PacksCard.svelte';
  import type { PacksCard as PacksCardT } from './types';
  import cards from '$lib/paylines/packs-paylines.json';
  import { useTableScrollReset } from '$lib/composables/core';

  const { float, card }: { float: number; card: PacksCardT } = $props();

  const matchedIndex = $derived(cards.findIndex((c) => c.cardId === card.cardId));

  let tableWrapper = $state<HTMLElement | null>(null);

  // Width of the sticky left column (min-w-[100px])
  const STICKY_LEFT_WIDTH = 100;

  const scrollReset = useTableScrollReset(
    () => tableWrapper,
    () => matchedIndex,
    STICKY_LEFT_WIDTH
  );
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step 2</p>
  <p class="mb-2 text-lg">Transform float into card using correlation table</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Packs</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">How It Works</p>
      <p class="font-sans text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Each card has a minimum bound value. The float is matched to the <span
          class="font-semibold"
        >
          first card
        </span>
        whose min bound is less than or equal to the float — shown in the highlighted column below.
      </p>
    </div>

    <div class="mb-6">
      <div class="mb-3 flex items-center justify-between">
        <p class="font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Correlation Table
        </p>
        <button
          type="button"
          class="rounded border border-purple-300 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 transition-all hover:border-purple-400 hover:bg-purple-100 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:border-purple-600 dark:hover:bg-purple-900/40"
          style={scrollReset.showResetButton
            ? 'opacity: 1; visibility: visible;'
            : 'opacity: 0; visibility: hidden; pointer-events: none;'}
          onclick={scrollReset.scrollToTarget}
        >
          <span class="mr-1">↻</span>
          Reset Scroll
        </button>
      </div>
      <ScrollableContainer innerClassName="pb-3" scrollButtonLeftOffset="100px">
        <div bind:this={tableWrapper}>
          <table class="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th
                  class="sticky left-0 z-10 min-w-[100px] bg-gray-300 p-2 text-left dark:bg-gray-700"
                >
                  Card
                </th>
                {#each cards as cardItem, n (n)}
                  <td
                    data-col={n}
                    class={[
                      'p-2 transition-all',
                      n === matchedIndex ? 'bg-purple-200 dark:bg-purple-800' : '',
                    ]}
                  >
                    <div class="w-24 bg-gray-300 dark:bg-gray-700">
                      <PacksCard cardId={cardItem.cardId} />
                    </div>
                  </td>
                {/each}
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left dark:bg-gray-700">
                  Card No
                </th>
                {#each cards as _, n (n)}
                  <td
                    class={[
                      'p-2 transition-all',
                      n === matchedIndex ? 'bg-purple-200 dark:bg-purple-800' : '',
                    ]}
                  >
                    {n + 1}
                  </td>
                {/each}
              </tr>
              <tr>
                <th class="sticky left-0 z-10 bg-gray-300 p-2 text-left dark:bg-gray-700">
                  Min Bound
                </th>
                {#each cards as cardItem, n (n)}
                  <td
                    class={[
                      'p-2 transition-all',
                      n === matchedIndex
                        ? 'bg-green-200 font-bold text-green-700 dark:bg-green-700 dark:text-green-200'
                        : '',
                    ]}
                  >
                    {cardItem.min}
                  </td>
                {/each}
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollableContainer>

      <div class="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="inline-block h-3 w-3 rounded-sm bg-purple-200 dark:bg-purple-800"></span>
          matched card column
        </span>
        <span class="flex items-center gap-1.5">
          <span class="inline-block h-3 w-3 rounded-sm bg-green-200 dark:bg-green-700"></span>
          min bound /
          <span class="font-bold text-purple-700 dark:text-purple-300">float</span>
          ✓ — float ≥ this min bound
        </span>
      </div>
    </div>

    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Selected Card</p>
      <div class="flex items-center justify-center">
        <span
          class="inline-flex items-center justify-center rounded-lg border-2 border-purple-400 bg-purple-50 px-6 py-3 text-lg font-bold text-purple-600 ring-2 ring-purple-400 dark:border-purple-500 dark:bg-purple-900/20 dark:text-purple-400 dark:ring-purple-500"
        >
          Card {card.cardId} — {card.multiplier.toFixed(2)}x
        </span>
      </div>
    </div>
  </ContentBlock>
</div>

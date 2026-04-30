<script lang="ts">
  import type { Card, FisherYatesItem } from '$lib/types';
  import { useFisherYatesCardsDisplay } from './use-fisheryates-cards-display.svelte';
  import CardDeckGrid from '$lib/games/cards/CardDeckGrid.svelte';
  import CardSuitIcon from '$lib/games/cards/CardSuitIcon.svelte';
  import { CARD_COLOR_BLUE, type CardColor } from '$lib/games/cards/cards';
  import HighlightLink from '$lib/games/layout/HighlightLink.svelte';
  import HighlightText from '$lib/games/layout/HighlightText.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';

  const {
    stepNumber,
    resultIndex,
    float,
    chosen,
    chosenIndex,
    chosenIndexes,
    color = CARD_COLOR_BLUE,
  }: {
    stepNumber: number;
    resultIndex: number;
    color?: CardColor;
  } & FisherYatesItem<Card> = $props();

  const display = useFisherYatesCardsDisplay(() => chosenIndexes);
  const previousCards = $derived(display.previousCards);
  const deckMinusPreviousCards = $derived(display.remainingCards);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into card</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Video Poker</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        resultIndex = <span class="font-bold text-blue-600 dark:text-blue-400">{resultIndex}</span>
      </p>
      <p class="leading-relaxed">
        deckSize = <span class="font-bold text-blue-600 dark:text-blue-400">52</span>
      </p>
    </div>

    <!-- Previous Cards -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Previously Drawn Cards
      </p>
      {#if previousCards.length === 0}
        <p class="font-sans text-xs text-gray-500 dark:text-gray-400">
          None — this is the first card
        </p>
      {:else}
        <div class="flex flex-wrap gap-1">
          {#each previousCards as { value, suit }, n (n)}
            <span
              class="inline-flex flex-col items-center rounded border border-gray-300 bg-gray-50 px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
            >
              <span class="text-[11px] text-gray-500 dark:text-gray-400">({n})</span>
              <span class="font-semibold">{value}</span>
              <span class="hidden dark:inline"><CardSuitIcon {suit} small={true} /></span>
              <span class="inline dark:hidden">
                <CardSuitIcon {suit} small={true} dark={true} />
              </span>
            </span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Remaining Deck -->
    <CardDeckGrid
      cards={deckMinusPreviousCards}
      {chosenIndex}
      {color}
      label="Remaining Deck ({deckMinusPreviousCards.length} cards)"
    />

    <!-- Float Value -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Card Index -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Card Index
      </p>
      <p class="leading-relaxed">cardIndex</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> * (<HighlightText>
          &lbrace;deckSize&rbrace;
        </HighlightText>
        - <HighlightText>&lbrace;resultIndex&rbrace;</HighlightText>))
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> * (<HighlightText>
          52
        </HighlightText>
        - <HighlightText>{resultIndex}</HighlightText>))
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{chosenIndex}</span>
      </p>
    </div>

    <!-- Get Card from Deck -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Get Card from Remaining Deck
      </p>
      <p class="leading-relaxed">card</p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;remainingDeck[cardIndex]&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = <HighlightText>&lbrace;remainingDeck[{chosenIndex}]&rbrace;</HighlightText>
      </p>
      <div class="mt-4 flex items-center gap-2">
        <span class="leading-relaxed">=</span>
        <div
          class="inline-flex min-w-[80px] flex-col items-center justify-center rounded border-2 {color.resultBorder} {color.resultBg} p-3 shadow-lg"
        >
          <span class="mb-1 text-[10px] text-gray-600 dark:text-gray-400">Index {chosenIndex}</span>
          <span class="text-2xl font-bold">{chosen.value}</span>
          <span class="mt-1 hidden dark:inline">
            <CardSuitIcon suit={chosen.suit} small={false} />
          </span>
          <span class="mt-1 inline dark:hidden">
            <CardSuitIcon suit={chosen.suit} small={false} dark={true} />
          </span>
        </div>
      </div>
    </div>
  </ContentBlock>
</div>

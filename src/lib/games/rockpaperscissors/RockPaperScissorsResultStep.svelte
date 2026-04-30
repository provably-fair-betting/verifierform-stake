<script lang="ts">
  import { RockPaperScissorsOutcome, type Item } from '$lib/types';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

  const {
    stepNumber,
    float,
    chosenIndex,
    chosen,
  }: { stepNumber: number } & Item<RockPaperScissorsOutcome> = $props();
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into result</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Rock Paper Scissors</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">numberOfOutcomes = 3</p>
      <p class="leading-relaxed">outcomes = [ ROCK, PAPER, SCISSORS ]</p>
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Outcome Index
      </p>
      <p class="leading-relaxed">
        outcomeIndex = floor(<HighlightText>float</HighlightText> * <HighlightText>
          numberOfOutcomes
        </HighlightText>)
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> * <HighlightText>
          3
        </HighlightText>)
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosenIndex}</span>
      </p>
    </div>

    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Get Result</p>
      <p class="leading-relaxed">result = <HighlightText>outcomes[outcomeIndex]</HighlightText></p>
      <p class="leading-relaxed">= <HighlightText>outcomes[{chosenIndex}]</HighlightText></p>
      <p class="leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{chosen}</span>
      </p>
    </div>
  </ContentBlock>
</div>

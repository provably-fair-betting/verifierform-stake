<script lang="ts">
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';
  import { LIMBO_MAX_INT, LIMBO_HOUSE_EDGE } from '$lib/games/limbo/limbo';

  const { stepNumber, float }: { stepNumber: number; float: number } = $props();
  const floatInt = $derived(Math.floor(float * LIMBO_MAX_INT));
  const crashPoint = $derived(
    Math.floor((LIMBO_MAX_INT / (floatInt + 1)) * (1 - LIMBO_HOUSE_EDGE) * 100) / 100
  );
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into crash point multiplier</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    formula taken from <span class="font-bold">Limbo</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        maxInt = <span class="font-bold text-blue-600 dark:text-blue-400">{LIMBO_MAX_INT}</span>
      </p>
      <p class="leading-relaxed">
        houseEdge = <span class="font-bold text-blue-600 dark:text-blue-400">
          {LIMBO_HOUSE_EDGE}
        </span>
      </p>
    </div>

    <!-- Float Value -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Crash Point -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Crash Point
      </p>
      <p class="leading-relaxed">crashPoint</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;maxInt&rbrace;</HighlightText> / (floor(<HighlightText>
          &lbrace;float&rbrace;
        </HighlightText>
        * <HighlightText>&lbrace;maxInt&rbrace;</HighlightText>) + 1) * (1 - <HighlightText>
          &lbrace;houseEdge&rbrace;
        </HighlightText>) * 100) / 100
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{LIMBO_MAX_INT}</HighlightText> / (floor(<HighlightText>
          {float.toFixed(12)}
        </HighlightText>
        * <HighlightText>{LIMBO_MAX_INT}</HighlightText>) + 1) * (1 - <HighlightText>
          {LIMBO_HOUSE_EDGE}
        </HighlightText>) * 100) / 100
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{LIMBO_MAX_INT}</HighlightText> / (<HighlightText>
          {floatInt}
        </HighlightText>
        + 1) * <HighlightText>{1 - LIMBO_HOUSE_EDGE}</HighlightText> * 100) / 100
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{crashPoint.toFixed(2)}x</span>
      </p>
    </div>
  </ContentBlock>
</div>

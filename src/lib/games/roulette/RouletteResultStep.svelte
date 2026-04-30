<script lang="ts">
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

  const { stepNumber, float }: { stepNumber: number; float: number } = $props();
  const chosenNumber = $derived(Math.floor(float * 37));
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into roulette number</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    Formula taken from <span class="font-bold">Roulette Roll</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        rouletteNumbers = <span class="font-bold text-blue-600 dark:text-blue-400">37</span>
      </p>
    </div>

    <!-- Float Value -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Roulette Number -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Roulette Number
      </p>
      <p class="leading-relaxed">rouletteNumber</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> *
        <HighlightText>&lbrace;rouletteNumbers&rbrace;</HighlightText>)
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> *
        <HighlightText>37</HighlightText>)
      </p>
      <div class="mt-4 flex items-center gap-2">
        <span class="leading-relaxed font-bold">=</span>
        <div
          class="inline-flex min-w-[80px] flex-col items-center justify-center rounded border-2 border-green-500 bg-green-50 px-6 py-4 shadow-lg dark:border-green-400 dark:bg-green-900/20"
        >
          <span class="mb-1 font-sans text-xs text-gray-500 dark:text-gray-400">
            Roulette number
          </span>
          <span class="text-2xl font-bold text-green-600 dark:text-green-400">{chosenNumber}</span>
        </div>
      </div>
    </div>
  </ContentBlock>
</div>

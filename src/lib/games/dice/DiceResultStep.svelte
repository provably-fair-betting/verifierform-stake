<script lang="ts">
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import HighlightLink from '$lib/games/layout/HighlightLink.svelte';
  import HighlightText from '$lib/games/layout/HighlightText.svelte';

  const { stepNumber, float }: { stepNumber: number; float: number } = $props();
  const rollNumber = $derived(Math.floor(float * 10001) / 100);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform float into roll number</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    formula taken from <span class="font-bold">Dice Roll</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        multiplier = <span class="font-bold text-blue-600 dark:text-blue-400">10001</span>
      </p>
      <p class="leading-relaxed">
        divisor = <span class="font-bold text-blue-600 dark:text-blue-400">100</span>
      </p>
    </div>

    <!-- Float Value -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Float Value</p>
      <p class="leading-relaxed">
        float = <span class="font-bold text-blue-600 dark:text-blue-400">{float.toFixed(12)}</span>
      </p>
    </div>

    <!-- Calculate Roll Number -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Roll Number
      </p>
      <p class="leading-relaxed">rollNumber</p>
      <p class="leading-relaxed">
        = floor(<HighlightText>&lbrace;float&rbrace;</HighlightText> *
        <HighlightText>&lbrace;multiplier&rbrace;</HighlightText>) /
        <HighlightText>&lbrace;divisor&rbrace;</HighlightText>
      </p>
      <p class="leading-relaxed">
        = floor(<HighlightText>{float.toFixed(12)}</HighlightText> *
        <HighlightText>10001</HighlightText>) /
        <HighlightText>100</HighlightText>
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{rollNumber.toFixed(2)}</span>
      </p>
    </div>
  </ContentBlock>
</div>

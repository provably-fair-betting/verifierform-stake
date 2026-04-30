<script lang="ts">
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import HighlightLink from '$lib/games/layout/HighlightLink.svelte';
  import HighlightText from '$lib/games/layout/HighlightText.svelte';

  const { stepNumber, hmac }: { stepNumber: number; hmac: string } = $props();
  const hex = $derived(hmac.substring(0, 8));
  const int = $derived(parseInt(hex, 16));
  const crashPoint = $derived(
    Math.floor(Math.max(1, (2 ** 32 / (int + 1)) * (1 - 0.01)) * 100) / 100
  );
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Transform number into crash point multiplier</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <HighlightLink href="https://bitcointalk.org/index.php?topic=5162888.0">
      bitcointalk post
    </HighlightLink> for game result formula
  </p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <!-- Constants -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
      <p class="leading-relaxed">
        maxInt = <span class="font-bold text-blue-600 dark:text-blue-400">2 ** 32</span>
      </p>
      <p class="leading-relaxed">
        houseEdge = <span class="font-bold text-blue-600 dark:text-blue-400">0.01</span>
      </p>
    </div>

    <!-- HMAC Input -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        HMAC (first 8 hex chars)
      </p>
      <p class="leading-relaxed">
        hex = <span class="font-bold break-all text-blue-600 dark:text-blue-400">{hex}</span>
      </p>
      <p class="leading-relaxed">
        int = parseInt(<HighlightText>{hex}</HighlightText>, 16) =
        <span class="font-bold text-blue-600 dark:text-blue-400">{int}</span>
      </p>
    </div>

    <!-- Calculate Crash Point -->
    <div class="mb-4">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Calculate Crash Point
      </p>
      <p class="leading-relaxed">crashPoint</p>
      <p class="leading-relaxed">
        = floor(max(1, <HighlightText>&lbrace;maxInt&rbrace;</HighlightText> / (<HighlightText>
          &lbrace;int&rbrace;
        </HighlightText>
        + 1) * (1 - <HighlightText>&lbrace;houseEdge&rbrace;</HighlightText>)) * 100) / 100
      </p>
      <p class="leading-relaxed">
        = floor(max(1, <HighlightText>2 ** 32</HighlightText> / (<HighlightText>
          {int}
        </HighlightText>
        + 1) * (1 - <HighlightText>0.01</HighlightText>)) * 100) / 100
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{crashPoint.toFixed(2)}x</span>
      </p>
    </div>
  </ContentBlock>
</div>

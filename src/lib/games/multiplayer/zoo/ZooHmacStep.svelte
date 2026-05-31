<script lang="ts">
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import HighlightText from '$lib/games/layout/HighlightText.svelte';
  import type { ZooSeed } from './types';

  const { stepNumber, seed, hmac }: { stepNumber: number; seed: ZooSeed; hmac: string } = $props();
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-5 text-lg">Generate HMAC from hash and seed</p>

  <ContentBlock className="p-6 text-left font-mono text-sm">
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Calculation</p>
      <p class="leading-relaxed">hmac</p>
      <p class="leading-relaxed">= hmac_sha256(</p>
      <p class="indent-8 leading-relaxed">
        key &nbsp;= <HighlightText>&lbrace;hash&rbrace;</HighlightText>
      </p>
      <p class="indent-8 leading-relaxed">
        data = <HighlightText>&lbrace;seed&rbrace;</HighlightText>
      </p>
      <p class="indent-4 leading-relaxed">)</p>
      <p class="leading-relaxed">= hmac_sha256(</p>
      <p class="truncate indent-8 leading-relaxed">
        key &nbsp;= <HighlightText>{seed.hash}</HighlightText>
      </p>
      <p class="truncate indent-8 leading-relaxed">
        data = <HighlightText>{seed.seed}</HighlightText>
      </p>
      <p class="indent-4 leading-relaxed">)</p>
      <p class="mt-2 leading-relaxed break-all">
        = <HighlightText className="text-sm">{hmac.substring(0, 24)}</HighlightText>
        <span class="text-gray-400">{hmac.substring(24)}</span>
      </p>
    </div>

    <div>
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Next step</p>
      <p class="font-sans text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The first <span class="font-bold text-blue-600 dark:text-blue-400">24</span>
        highlighted characters are split into
        <span class="font-bold text-blue-600 dark:text-blue-400">3</span>
        windows of
        <span class="font-bold text-blue-600 dark:text-blue-400">8</span>
         chars each — one per animal.
      </p>
    </div>
  </ContentBlock>
</div>

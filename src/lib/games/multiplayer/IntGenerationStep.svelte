<script lang="ts">
  import ContentBlock from '../layout/ContentBlock.svelte';
  import HighlightLink from '../layout/HighlightLink.svelte';
  import HighlightText from '../layout/HighlightText.svelte';

  const {
    stepNumber,
    blockHash,
    gameHash,
    gameHashLabel = 'gamehash',
    hmac,
  }: {
    stepNumber: number;
    blockHash: string;
    gameHash: string;
    gameHashLabel?: string;
    hmac: string;
  } = $props();

  const hex = $derived(hmac.substring(0, 8));
  const int = $derived(parseInt(hex, 16));
</script>

<div>
  <div class="text-center">
    <p class="mb-2 text-xl">Step {stepNumber}</p>
    <p class="text-base">Extract hex and int from hmac</p>
    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
      See <HighlightLink href="https://bitcointalk.org/index.php?topic=5249741.0">
        bitcointalk post
      </HighlightLink> for game result formula
    </p>
  </div>

  <ContentBlock className="p-5 font-mono text-xs">
    <p>hmac</p>
    <p>= hmac_sha256(</p>
    <p class="indent-8">
      key &nbsp;= <HighlightText>&lbrace;{gameHashLabel}&rbrace;</HighlightText>
    </p>
    <p class="indent-8">
      data = <HighlightText>&lbrace;blockhash&rbrace;</HighlightText>
    </p>
    <p class="indent-4">)</p>
    <p>= hmac_sha256(</p>
    <p class="truncate indent-8">
      key &nbsp;= <HighlightText>{gameHash}</HighlightText>
    </p>
    <p class="truncate indent-8">
      data = <HighlightText>{blockHash}</HighlightText>
    </p>
    <p class="indent-4">)</p>
    <p class="break-all">
      = <span class="text-xs">{hmac}</span>
    </p>

    <p class="mt-4">hex</p>
    <p>= substring(</p>
    <p class="indent-8">
      value = <HighlightText>&lbrace;hmac&rbrace;</HighlightText>
    </p>
    <p class="indent-8">start = 0</p>
    <p class="indent-8">take &nbsp;= 8</p>
    <p class="indent-4">)</p>
    <p>= substring(</p>
    <p class="truncate indent-8">
      value = <HighlightText>{hmac}</HighlightText>
    </p>
    <p class="indent-8">start = 0</p>
    <p class="indent-8">take &nbsp;= 8</p>
    <p class="indent-4">)</p>
    <p class="break-all">
      = <HighlightText className="text-base">{hmac.substring(0, 8)}</HighlightText>
      <span class="text-xs text-gray-400">{hmac.substring(8)}</span>
    </p>
    <p class="mt-4">int</p>
    <p>= parseInt(<HighlightText>&lbrace;hex&rbrace;</HighlightText>, 16)</p>
    <p>= parseInt(<HighlightText>{hex}</HighlightText>, 16)</p>
    <p>= {int}</p>
  </ContentBlock>
</div>

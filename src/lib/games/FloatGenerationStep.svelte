<script lang="ts">
  import type { FloatExplanationStepProps } from '$lib/types';
  import { hmac as createHmac } from '@stablelib/hmac';
  import { SHA256 } from '@stablelib/sha256';
  import { encode as toUInt8Array } from '@stablelib/utf8';
  import { encode as toHex } from '@stablelib/hex';
  import { fade } from 'svelte/transition';
  import HighlightText from '$lib/games/layout/HighlightText.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import HighlightLink from '$lib/games/layout/HighlightLink.svelte';

  const HMAC_OUTPUT_LENGTH = 64;
  const HEX_CHARS_PER_FLOAT = 8;

  const {
    stepNumber,
    resultIndex,
    seed,
    float,
    hideStepNumber = false,
    contentBlockClassName = 'p-4',
  }: FloatExplanationStepProps = $props();

  const round = $derived(Math.floor(resultIndex / HEX_CHARS_PER_FLOAT));
  const cursor = $derived((resultIndex * HEX_CHARS_PER_FLOAT) % HMAC_OUTPUT_LENGTH);
  const hmac = $derived(
    toHex(
      createHmac(
        SHA256,
        toUInt8Array(seed.serverSeed),
        toUInt8Array(`${seed.clientSeed}:${seed.nonce}:${round}`)
      )
    )
  );
  const hexes = $derived(hmac.substring(cursor, cursor + HEX_CHARS_PER_FLOAT).match(/.{1,2}/g));
  const bytes = $derived(hexes?.map((hex) => parseInt(hex, 16)));
</script>

{#key cursor}
  <div transition:fade={{ duration: 200 }}>
    <div class="text-center">
      {#if !hideStepNumber}
        <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
      {/if}
      <p class="mb-2 text-lg">Extract float based on client seed, server seed, and nonce</p>
      <p class="mb-7 text-sm text-gray-500 dark:text-gray-400">
        Refer to scripts on the <HighlightLink
          href="https://stake.com/provably-fair/implementation"
        >
          implementation
        </HighlightLink>
        and
        <HighlightLink href="https://stake.com/provably-fair/conversions">conversion</HighlightLink>
        pages
      </p>
    </div>

    <ContentBlock className="{contentBlockClassName} font-mono text-sm">
      <!-- Constants Section -->
      <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Constants</p>
        <p class="leading-relaxed">
          resultIndex = <span class="font-bold text-blue-600 dark:text-blue-400">
            {resultIndex}
          </span>
        </p>
        <p class="leading-relaxed">HMAC_OUTPUT_LENGTH = {HMAC_OUTPUT_LENGTH}</p>
        <p class="leading-relaxed">HEX_CHARS_PER_FLOAT = {HEX_CHARS_PER_FLOAT}</p>
      </div>

      <!-- Round Calculation -->
      <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Calculate Round
        </p>
        <p class="leading-relaxed">round</p>
        <p class="leading-relaxed">
          = <HighlightText>&lbrace;resultIndex&rbrace;</HighlightText> /
          <HighlightText>&lbrace;HEX_CHARS_PER_FLOAT&rbrace;</HighlightText>
        </p>
        <p class="leading-relaxed">
          = <HighlightText>{resultIndex}</HighlightText> /
          <HighlightText>{HEX_CHARS_PER_FLOAT}</HighlightText>
        </p>
        <p class="leading-relaxed font-bold">
          = <span class="text-green-600 dark:text-green-400">{round}</span>
        </p>
      </div>

      <!-- Cursor Calculation -->
      <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Calculate Cursor Position
        </p>
        <p class="leading-relaxed">cursor</p>
        <p class="leading-relaxed">
          = (<HighlightText>&lbrace;resultIndex&rbrace;</HighlightText> *
          <HighlightText>&lbrace;HEX_CHARS_PER_FLOAT&rbrace;</HighlightText>) %
          <HighlightText>&lbrace;HMAC_OUTPUT_LENGTH&rbrace;</HighlightText>
        </p>
        <p class="leading-relaxed">
          = (<HighlightText>{resultIndex}</HighlightText> *
          <HighlightText>{HEX_CHARS_PER_FLOAT}</HighlightText>) %
          <HighlightText>{HMAC_OUTPUT_LENGTH}</HighlightText>
        </p>
        <p class="leading-relaxed font-bold">
          = <span class="text-green-600 dark:text-green-400">{cursor}</span>
        </p>
      </div>

      <!-- HMAC Generation -->
      <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Generate HMAC-SHA256
        </p>
        <p class="leading-relaxed">hmac = hmac_sha256(</p>
        <p class="indent-8 leading-relaxed">
          key &nbsp;= <HighlightText>&lbrace;serverseed&rbrace;</HighlightText>
        </p>
        <p class="indent-8 leading-relaxed">
          data = <HighlightText>
            &lbrace;clientseed&rbrace;:&lbrace;nonce&rbrace;:&lbrace;round&rbrace;
          </HighlightText>
        </p>
        <p class="indent-4 leading-relaxed">)</p>
        <p class="mt-2 leading-relaxed">= hmac_sha256(</p>
        <p class="truncate indent-8 leading-relaxed">
          key &nbsp;= <HighlightText>{seed.serverSeed}</HighlightText>
        </p>
        <p class="truncate indent-8 leading-relaxed">
          data = <HighlightText>{seed.clientSeed}:{seed.nonce}:{round}</HighlightText>
        </p>
        <p class="indent-4 leading-relaxed">)</p>
        <p class="mt-2 rounded bg-gray-100 p-2 text-xs leading-relaxed break-all dark:bg-gray-800">
          = {hmac}
        </p>
      </div>

      <!-- Extract Hexes -->
      <div class="mb-4">
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Extract Hex Characters
        </p>
        <p class="leading-relaxed">hexes = substring(</p>
        <p class="indent-8 leading-relaxed">
          value = <HighlightText>&lbrace;hmac&rbrace;</HighlightText>
        </p>
        <p class="indent-8 leading-relaxed">
          start = <HighlightText>&lbrace;cursor&rbrace;</HighlightText>
        </p>
        <p class="indent-8 leading-relaxed">
          take &nbsp;= <HighlightText>&lbrace;HEX_CHARS_PER_FLOAT&rbrace;</HighlightText>
        </p>
        <p class="indent-4 leading-relaxed">)</p>
        <p class="mt-2 leading-relaxed">= substring(</p>
        <p class="truncate indent-8 leading-relaxed">
          value = <HighlightText>{hmac}</HighlightText>
        </p>
        <p class="indent-8 leading-relaxed">
          start = <HighlightText>{cursor}</HighlightText>
        </p>
        <p class="indent-8 leading-relaxed">
          take &nbsp;= <HighlightText>{HEX_CHARS_PER_FLOAT}</HighlightText>
        </p>
        <p class="indent-4 leading-relaxed">)</p>
        <p class="mt-2 rounded bg-gray-100 p-2 text-xs leading-relaxed break-all dark:bg-gray-800">
          = <span class="text-gray-400">{hmac.substring(0, cursor)}</span>
          <HighlightText className="text-base font-bold">
            {hmac.substring(cursor, cursor + HEX_CHARS_PER_FLOAT)}
          </HighlightText>
          <span class="text-gray-400">{hmac.substring(cursor + HEX_CHARS_PER_FLOAT)}</span>
        </p>
      </div>
    </ContentBlock>
    <!-- Hex to Byte Conversion Table -->
    <div class="relative mt-5 overflow-x-auto">
      <p class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Hex to Byte Conversion
      </p>
      <ContentBlock>
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                class="px-4 py-3 font-semibold whitespace-nowrap text-gray-900 sm:px-6 dark:text-white"
              ></th>
              {#each hexes! as _, i}
                <th
                  scope="col"
                  class="px-4 py-3 text-center font-semibold text-gray-900 sm:px-6 dark:text-white"
                >
                  Byte {i + 1}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b border-gray-300 bg-blue-50 dark:border-gray-700 dark:bg-blue-900/10"
            >
              <th
                scope="row"
                class="px-4 py-4 font-semibold whitespace-nowrap text-gray-900 sm:px-6 dark:text-white"
              >
                Hex
              </th>
              {#each hexes! as hex}
                <td
                  class="px-4 py-4 text-center font-mono font-bold text-blue-600 sm:px-6 dark:text-blue-400"
                >
                  {hex}
                </td>
              {/each}
            </tr>
            <tr class="bg-green-50 dark:bg-green-900/10">
              <th
                scope="row"
                class="px-4 py-4 font-semibold whitespace-nowrap text-gray-900 sm:px-6 dark:text-white"
              >
                Byte
              </th>
              {#each bytes! as byte}
                <td
                  class="px-4 py-4 text-center font-mono font-bold text-green-600 sm:px-6 dark:text-green-400"
                >
                  {byte}
                </td>
              {/each}
            </tr>
          </tbody>
        </table>
      </ContentBlock>
    </div>

    <!-- Float Calculation Table -->
    <div class="relative mt-5 overflow-x-auto">
      <p class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Calculate Final Float
      </p>
      <ContentBlock>
        <table class="w-full text-left font-mono text-sm">
          <tbody>
            {#each bytes! as byte, i}
              <tr class="border-b border-gray-300 dark:border-gray-700">
                <td class="w-8 px-4 py-3 text-center">{i === 0 ? '' : '+'}</td>
                <td class="px-4 py-3 font-bold text-purple-600 dark:text-purple-400">
                  {(byte / 256 ** (i + 1)).toFixed(12)}
                </td>
                <td class="px-6 py-3 text-gray-600 dark:text-gray-400">
                  (
                  <span class="font-bold">{('' + byte).padStart(3, '0')}</span>
                  / 256
                  <sup>{i + 1}</sup>
                  )
                </td>
              </tr>
            {/each}
            <tr
              class="border-t-2 border-green-500 bg-green-50 font-bold dark:border-green-600 dark:bg-green-900/10"
            >
              <td class="px-4 py-3 text-center text-lg">=</td>
              <td class="px-4 py-3 text-lg text-green-600 dark:text-green-400">
                {float.toFixed(12)}
              </td>
              <td class="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">Final Float</td>
            </tr>
          </tbody>
        </table>
      </ContentBlock>
    </div>
  </div>
{/key}

<script lang="ts">
  import { useDartsMultiplierCalc } from './use-darts-multiplier-calc.svelte';
  import { DARTS_COLOR_LABELS } from '$lib/games/darts/darts';
  import type { DartsDifficulty } from './types';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import HighlightLink from '$lib/games/layout/HighlightLink.svelte';
  import HighlightText from '$lib/games/layout/HighlightText.svelte';

  const {
    stepNumber,
    rotation,
    distance,
    normalisedDistance,
    colorHex,
    multi,
    difficulty,
    contentBlockClassName = 'p-4',
  }: {
    stepNumber: number;
    rotation: number;
    distance: number;
    normalisedDistance: number;
    colorHex: string;
    multi: number;
    difficulty: DartsDifficulty;
    contentBlockClassName?: string;
  } = $props();

  const calc = useDartsMultiplierCalc(
    () => rotation,
    () => normalisedDistance,
    () => colorHex,
    () => difficulty
  );
  const colorLabel = $derived(DARTS_COLOR_LABELS[colorHex] ?? colorHex);
</script>

<div class="mt-7 text-center">
  <p class="mb-2 text-2xl font-semibold">Step {stepNumber}</p>
  <p class="mb-2 text-lg">Determine dart zone and multiplier</p>
  <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
    See <span class="font-bold">Darts</span>
    section on the
    <HighlightLink href="https://stake.com/provably-fair/game-events">game events</HighlightLink> page
  </p>

  <ContentBlock className="{contentBlockClassName} text-left font-mono text-sm">
    <!-- Normalise Distance -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Normalise Distance
      </p>
      <p class="leading-relaxed">normalisedDistance</p>
      <p class="leading-relaxed">
        = sqrt( <HighlightText>{distance.toFixed(12)}</HighlightText> ) / 2
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-green-600 dark:text-green-400">{normalisedDistance.toFixed(12)}</span>
      </p>
    </div>

    <!-- Radial Distance -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Radial Distance (r)
      </p>
      <p class="leading-relaxed">r</p>
      <p class="leading-relaxed">= normalisedDistance × 1000</p>
      <p class="leading-relaxed">
        = <HighlightText>{normalisedDistance.toFixed(12)}</HighlightText> × 1000
      </p>
      <p class="leading-relaxed font-bold">
        = <span class="text-blue-600 dark:text-blue-400">{calc.r.toFixed(6)}</span>
      </p>
    </div>

    <!-- Determine Zone -->
    <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
      <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
        Determine Zone
      </p>
      <p class="mb-3 font-sans text-xs text-gray-500 dark:text-gray-400">
        Checking r = <span class="font-bold text-blue-600 dark:text-blue-400">
          {calc.r.toFixed(4)}
        </span>
        against radial thresholds for
        <span class="font-semibold text-gray-700 dark:text-gray-300">{difficulty}</span>
        :
      </p>
      <div class="flex flex-col gap-0.5 font-mono text-xs">
        {#each calc.thresholdRows as row, i (i)}
          {@const isMatch = i === calc.matchedRowIndex}
          {@const keyword =
            i === 0 ? 'if' : i === calc.thresholdRows.length - 1 ? 'else' : 'else if'}
          <div
            class={[
              'flex items-center gap-2 rounded px-2 py-1',
              isMatch
                ? 'bg-green-50 ring-1 ring-green-400 dark:bg-green-900/20 dark:ring-green-500'
                : 'text-gray-500 dark:text-gray-400',
            ]}
          >
            <span class="w-10 flex-shrink-0 font-sans text-purple-600 dark:text-purple-400">
              {keyword}
            </span>
            {#if i < calc.thresholdRows.length - 1}
              <span class={isMatch ? 'text-gray-800 dark:text-gray-200' : ''}>
                ( {row.condition} )
              </span>
            {:else}
              <span class="font-sans text-gray-400 italic dark:text-gray-500">
                // outside board
              </span>
            {/if}
            <span class="ml-auto flex flex-shrink-0 items-center gap-1.5">
              {#if row.isWedge}
                <span class="font-sans text-gray-400 italic dark:text-gray-500">wedge band</span>
                {#if isMatch}
                  <span class="font-sans font-bold text-green-600 dark:text-green-400">
                    ✓ see below
                  </span>
                {/if}
              {:else}
                <span
                  class="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-sm border border-gray-300"
                  style="background: {row.color}"
                ></span>
                <span class={isMatch ? 'font-bold text-gray-900 dark:text-white' : ''}>
                  {DARTS_COLOR_LABELS[row.color] ?? row.color}
                </span>
                {#if isMatch}
                  <span class="font-sans font-bold text-green-600 dark:text-green-400">✓</span>
                {/if}
              {/if}
            </span>
          </div>
        {/each}
      </div>
    </div>

    {#if calc.isWedgeZone}
      <!-- Wedge Angle -->
      <div class="mb-6 border-b border-gray-300 pb-4 dark:border-gray-600">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Wedge Angle</p>

        <!-- deg calculation -->
        <p class="mb-1 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Calculate angle (deg)
        </p>
        <p class="mb-1 font-sans text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          Normalise rotation to a clockwise angle in degrees, where 0° = top of board:
        </p>
        <p class="leading-relaxed">deg = (((rotation % 1) + 1) % 1) × 360</p>
        <p class="leading-relaxed">
          = (((<HighlightText>{rotation.toFixed(12)}</HighlightText> % 1) + 1) % 1) × 360
        </p>
        <p class="mb-4 leading-relaxed font-bold">
          = <span class="text-blue-600 dark:text-blue-400">{calc.deg.toFixed(6)}°</span>
        </p>

        <!-- bin calculation -->
        <p class="mb-1 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Calculate bin
        </p>
        <p class="mb-1 font-sans text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          The circle is divided into 18 equal slices of 20° each (bins 0–17):
        </p>
        <p class="leading-relaxed">bin = floor( deg / 20 )</p>
        <p class="leading-relaxed">
          = floor( <HighlightText>{calc.deg.toFixed(6)}</HighlightText> / 20 )
        </p>
        <p class="mb-4 leading-relaxed font-bold">
          = <span class="text-blue-600 dark:text-blue-400">{calc.wedgeBin}</span>
        </p>

        <!-- Bin grid -->
        <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Bin colour map ({difficulty})
        </p>
        <p class="mb-2 font-sans text-xs text-gray-500 dark:text-gray-400">
          Each bin covers a 20° slice. Bin <span class="font-bold text-blue-600 dark:text-blue-400">
            {calc.wedgeBin}
          </span>
          spans
          <span class="font-bold">{calc.wedgeBin * 20}°–{calc.wedgeBin * 20 + 20}°</span>
          :
        </p>
        <div class="mb-3 grid grid-cols-9 gap-1">
          {#each calc.wedgeBinColors as binColor, i (i)}
            {@const isCurrentBin = i === calc.wedgeBin}
            <div
              class={[
                'flex flex-col items-center rounded border-2 px-0.5 py-1 transition-all',
                isCurrentBin
                  ? 'border-blue-500 ring-2 ring-blue-400 dark:border-blue-400 dark:ring-blue-500'
                  : 'border-gray-200 ring-2 ring-transparent dark:border-gray-700',
              ]}
            >
              <span class="mb-0.5 text-[10px] leading-none font-normal opacity-70">{i}</span>
              <span
                class="inline-block h-3 w-3 flex-shrink-0 rounded-sm border border-gray-300"
                style="background: {binColor}"
              ></span>
            </div>
          {/each}
        </div>

        <!-- Result -->
        <p class="leading-relaxed">
          bin <HighlightText>{calc.wedgeBin}</HighlightText>
          ({calc.wedgeBin * 20}°–{calc.wedgeBin * 20 + 20}°) →
          <span class="inline-flex items-center gap-1.5">
            <span
              class="inline-block h-3 w-3 flex-shrink-0 rounded-sm border border-gray-300"
              style="background: {colorHex}"
            ></span>
            <span class="font-bold" style="color: {colorHex}">{colorLabel}</span>
          </span>
        </p>
      </div>
    {/if}

    <!-- Result -->
    <div>
      <p class="mb-2 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">Result</p>
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-2">
          <span
            class="inline-block h-4 w-4 flex-shrink-0 rounded-sm border border-gray-300"
            style="background: {colorHex}"
          ></span>
          <span class="font-bold text-gray-700 dark:text-gray-300">{colorLabel}</span>
        </div>
        <span class="text-gray-400">→</span>
        <span
          class="inline-flex items-center justify-center rounded border-2 border-green-500 bg-green-50 px-3 py-1.5 font-bold text-green-700 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/20 dark:text-green-400"
        >
          {multi}x
        </span>
      </div>
    </div>
  </ContentBlock>
</div>

<script lang="ts">
  import { useDartsThrow } from './use-darts-throw.svelte';
  import type { DartsDifficulty } from '$lib/types';
  import { DARTS_COLOR_LABELS, getDartsCssRotation } from '$lib/games/darts/darts';
  import Loader from '$lib/games/Loader.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import dartboardEasy from '$lib/games/darts/icons/dartboardEasy.svelte';
  import dartboardMedium from '$lib/games/darts/icons/dartboardMedium.svelte';
  import dartboardHard from '$lib/games/darts/icons/dartboardHard.svelte';
  import dartboardExpert from '$lib/games/darts/icons/dartboardExpert.svelte';
  import type { Component } from 'svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const dartsThrow = useDartsThrow(() => formValues);

  const colorClasses = [
    'bg-[#0e202c]',
    'bg-[#213843]',
    'bg-[#fcc101]',
    'bg-[#fb6120]',
    'bg-[#fb053f]',
    'bg-[#24e700]',
  ];

  const DIFFICULTY_TO_DARTBOARD: Record<DartsDifficulty, Component> = {
    easy: dartboardEasy,
    medium: dartboardMedium,
    hard: dartboardHard,
    expert: dartboardExpert,
  };
</script>

{#if dartsThrow.isCalculating}
  <Loader />
{:else}
  {@const dartResult = dartsThrow.result!}
  {@const rotation = getDartsCssRotation(dartResult.rotation)}
  {@const distance = dartResult.normalisedDistance}
  {@const Dartboard = DIFFICULTY_TO_DARTBOARD[formValues.difficulty as DartsDifficulty]}
  {@const colorLabel = DARTS_COLOR_LABELS[dartResult.colorHex] ?? dartResult.colorHex}

  <div data-testid="rotation" class="hidden">{dartResult.rotation.toFixed(3)}</div>
  <div data-testid="distance" class="hidden">{dartResult.distance.toFixed(3)}</div>
  <div data-testid="pixelColor" class="hidden">{dartResult.colorHex}</div>
  <div data-testid="multi" class="hidden">{dartResult.multi}</div>

  <ContentBlock className="mb-5 p-5">
    <!-- Stats row -->
    <div class="mb-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
      <span class="text-gray-500 dark:text-gray-400">
        rotation = <span class="font-bold text-purple-600 dark:text-purple-400">
          {dartResult.rotation.toFixed(6)}
        </span>
      </span>
      <span class="text-gray-500 dark:text-gray-400">
        distance = <span class="font-bold text-purple-600 dark:text-purple-400">
          {dartResult.distance.toFixed(6)}
        </span>
      </span>
      <span class="text-gray-500 dark:text-gray-400">
        norm. dist = <span class="font-bold text-purple-600 dark:text-purple-400">
          {dartResult.normalisedDistance.toFixed(6)}
        </span>
      </span>
    </div>

    <!-- Result tile -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-2">
        <span
          class="inline-block h-4 w-4 flex-shrink-0 rounded-sm border border-gray-300"
          style="background: {dartResult.colorHex}"
        ></span>
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">{colorLabel}</span>
      </div>
      <span class="text-gray-400">→</span>
      <span
        class="inline-flex items-center justify-center rounded border-2 border-green-500 bg-green-50 px-3 py-1.5 font-bold text-green-700 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/20 dark:text-green-400"
      >
        {dartResult.multi}x
      </span>
    </div>
  </ContentBlock>

  <!-- Dartboard preview -->
  <ContentBlock className="p-3">
    <p class="mb-3 text-center text-sm text-gray-500 italic dark:text-gray-400">Preview</p>
    <div class="relative aspect-square" style="--rotation: {rotation}; --distance: {distance}">
      <Dartboard />
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 border-2 border-blue-400"
        style="width: 86.87%; height: 86.87%; transform: translate(-50%, -50%); box-sizing: border-box;"
      >
        <div class="relative h-full w-full">
          <div
            class="pointer-events-none absolute h-6 w-6 rounded-full border-5 border-white shadow-[4px_4px_6px_rgba(0,0,0,0.6)]"
            style="
              top: calc(50% - var(--distance) * 100% * sin(calc(var(--rotation) * 360deg)));
              left: calc(50% + var(--distance) * 100% * cos(calc(var(--rotation) * 360deg)));
              transform: translate(-50%, -50%);
              background: {dartResult.colorHex}
            "
          ></div>
        </div>
      </div>
    </div>

    <!-- Multiplier bar -->
    <div class="mt-4 flex w-full justify-center">
      <div class="flex w-full max-w-xl justify-between gap-2">
        {#each dartsThrow.multis as multi, i (i)}
          {@const bgClass = colorClasses[i]}
          {@const bgColor = bgClass.replace('bg-[', '').replace(']', '')}
          {@const isActive = bgColor === dartResult.colorHex}
          <div
            class={[
              'text-md relative flex-1 rounded-md px-3 py-2 text-center font-medium dark:text-white',
              isActive ? `${bgClass} text-white` : '',
            ]}
          >
            {multi}x
            <div class={['absolute bottom-0 left-0 h-[7px] w-full rounded-b-md', bgClass]}></div>
          </div>
        {/each}
      </div>
    </div>
  </ContentBlock>
{/if}

<script lang="ts">
  import type { DartsSeed } from './types';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import DartsMultiplierStep from '$lib/games/darts/DartsMultiplierStep.svelte';
  import ContentBlock from '$lib/games/layout/ContentBlock.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ResultTabs from '$lib/games/layout/ResultTabs.svelte';
  import { useDartsThrow } from './use-darts-throw.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const dartsThrow = useDartsThrow(() => formValues);
  const dartsSeed = $derived(dartsThrow.seed as DartsSeed);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if dartsThrow.isCalculating || !dartsThrow.result}
      <Loader />
    {:else}
      {@const floatItems = [
        { float: dartsThrow.result.rotation, label: 'rotation' },
        { float: dartsThrow.result.distance, label: 'distance' },
      ]}
      <!-- Header banner -->
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Dart position is determined by 2 floats.
          </span>
          The first sets the rotation, the second sets the distance from centre.
        </p>
      </ContentBlock>

      <!-- Float tabs + Step 1 -->
      <ContentBlock className="mb-6 p-5 overflow-visible">
        <ResultTabs
          seed={dartsThrow.seed!}
          items={floatItems.map((item) => ({ chosen: item.label }))}
          bind:resultIndex
          tabWidthClass="w-20"
          tabClassModifier={(n) =>
            'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 ' +
            'hover:border-blue-300 hover:opacity-80 ring-2 ring-transparent ' +
            'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none'}
          tabSelectedClassModifier={(n) =>
            'rounded border-2 border-blue-500 bg-blue-100 font-bold text-blue-700 opacity-100 ' +
            'shadow-lg ring-2 ring-blue-400 z-10 ' +
            'dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400 !outline-none'}
        />

        {@const selectedItem = floatItems[resultIndex]}

        <FloatGenerationStep
          stepNumber={1}
          {resultIndex}
          seed={dartsThrow.seed!}
          float={selectedItem.float}
          contentBlockClassName="py-6"
        />
      </ContentBlock>

      <!-- Step 2 — Zone & Multiplier -->
      <ContentBlock className="mb-6 p-5">
        <DartsMultiplierStep
          stepNumber={2}
          rotation={dartsThrow.result.rotation}
          distance={dartsThrow.result.distance}
          normalisedDistance={dartsThrow.result.normalisedDistance}
          colorHex={dartsThrow.result.colorHex}
          multi={dartsThrow.result.multi}
          difficulty={dartsSeed.difficulty}
          contentBlockClassName="py-6"
        />
      </ContentBlock>
    {/if}
  </div>
</div>

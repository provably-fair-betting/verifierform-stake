<script lang="ts">
  import type { TarotSeed } from './types';
  import Loader from '$lib/games/Loader.svelte';
  import ResultTabs from '../layout/ResultTabs.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import FloatGenerationStep from '../FloatGenerationStep.svelte';
  import TarotsResultStep from './TarotsResultStep.svelte';
  import { useTarotsCards } from './use-tarots-cards.svelte';
  import { getTarotTabClass, getTarotTabSelectedClass } from '$lib/games/tarot/tarot';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let resultIndex = $state(0);
  const tarots = useTarotsCards(() => formValues);
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if tarots.isCalculating || !tarots.items}
      <Loader />
    {:else}
      {@const tarotSeed = tarots.seed! as TarotSeed}

      <!-- Header banner -->
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-purple-500 dark:border-purple-400"
      >
        <p class="font-medium">
          <span class="text-purple-600 dark:text-purple-400">
            Tarot cards are selected using float values mapped to correlation tables.
          </span>
          Each card has a multiplier determined by the difficulty and arcana type.
        </p>
      </ContentBlock>

      <!-- Step 1 -->
      <ContentBlock className="mb-6 p-5">
        <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
          Step 1 — Generate Cards
        </p>
        <p class="mb-3 text-gray-700 dark:text-gray-300">
          Generate {tarots.items.length} card{tarots.items.length > 1 ? 's' : ''} from seed
        </p>
      </ContentBlock>

      <!-- Step 1 sub-steps -->
      <ContentBlock className="mb-6 p-5 overflow-visible">
        <ResultTabs
          seed={tarots.seed!}
          items={tarots.items.map((_item, n) => ({ chosen: n + 1 }))}
          bind:resultIndex
          tabNameModifier={(_chosen, n) => `${tarots.items![n].card.multiplier}x`}
          tabClassModifier={(n) => getTarotTabClass(n)}
          tabSelectedClassModifier={(n) => getTarotTabSelectedClass(n)}
        />

        {@const selectedItem = tarots.items[resultIndex]}

        <FloatGenerationStep
          stepNumber={1.1}
          {resultIndex}
          seed={tarots.seed!}
          float={selectedItem.float}
          contentBlockClassName="py-6"
        />
        <TarotsResultStep
          stepNumber={1.2}
          float={selectedItem.float}
          card={selectedItem.card}
          arcanaType={selectedItem.arcanaType}
          difficulty={tarotSeed.difficulty}
          contentBlockClassName="py-6"
        />
      </ContentBlock>
    {/if}
  </div>
</div>

<script lang="ts">
  import type { MolesSeed } from './types';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import MolesResultStep from '$lib/games/moles/MolesResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useMolesRounds } from './use-moles-rounds.svelte';
  import { useMolesExplanation } from './use-moles-explanation.svelte';
  import { MOLES_TAB_CLASS, MOLES_TAB_SELECTED_CLASS } from '$lib/games/moles/moles';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  const moles = useMolesRounds(() => formValues);
  const molesSeed = $derived(moles.seed as MolesSeed);
  const explanation = useMolesExplanation(() => moles.rounds);
</script>

<div class="mt-8 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:bg-gray-900 dark:text-white">
    {#if moles.isCalculating || !moles.rounds}
      <Loader />
    {:else}
      {@const items = moles.rounds[explanation.selectedRound]}

      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Each round generates {molesSeed.molesCount} mole{molesSeed.molesCount > 1 ? 's' : ''} using
            Fisher-Yates shuffle.
          </span>
          Click a mole tab to see how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <!-- Flat grouped tab strip -->
      <ScrollableContainer className="mb-7" innerClassName="p-1.5 pb-0">
        <div class="flex gap-4 pb-5" style="min-width: max-content;">
          {#each moles.rounds as roundItems, roundIndex (roundIndex)}
            <div class="flex flex-col gap-1">
              <span
                class="mb-1 text-center font-sans text-xs font-semibold text-gray-500 dark:text-gray-400"
              >
                R{roundIndex + 1}
              </span>
              <div class="flex gap-1.5">
                {#each roundItems as item, moleIndex (moleIndex)}
                  {@const fi = roundIndex * molesSeed.molesCount + moleIndex}
                  <button
                    type="button"
                    class={[
                      'flex w-10 flex-col items-center justify-center overflow-visible rounded border p-1.5 text-sm font-medium transition-all',
                      fi === explanation.flatIndex ? MOLES_TAB_SELECTED_CLASS : MOLES_TAB_CLASS,
                    ]}
                    onclick={() => (explanation.flatIndex = fi)}
                  >
                    <span class="block text-[10px]">({moleIndex + 1})</span>
                    <span class="block font-bold">{item.chosen}</span>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </ScrollableContainer>

      {@const selectedItem = explanation.flatItems[explanation.flatIndex]}

      <FloatGenerationStep
        stepNumber={1}
        resultIndex={explanation.globalResultIndex}
        seed={moles.seed!}
        float={selectedItem.float}
      />
      <MolesResultStep stepNumber={2} resultIndex={explanation.resultIndex} {...selectedItem} />
    {/if}
  </div>
</div>

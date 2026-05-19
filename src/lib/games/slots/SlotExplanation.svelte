<script lang="ts">
  import { useSlotResult } from './use-slot-result.svelte';
  import { ScarabSpinsTomeOfLifeIcon } from './types';
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import FloatToReelPositionStep from '$lib/games/slots/FloatToReelPositionStep.svelte';
  import { type Component } from 'svelte';
  import SymbolOrderSlotBoard from '$lib/games/slots/SymbolOrderSlotBoard.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import { getSlotTabClass, getSlotTabSelectedClass } from '$lib/games/slots/slots';
  import ContentBlock from '../layout/ContentBlock.svelte';

  const {
    formValues,
    IconComponent,
  }: {
    formValues: Record<string, unknown>;
    IconComponent: Component<{ icon: ScarabSpinsTomeOfLifeIcon }>;
  } = $props();

  let resultIndex = $state(0);

  const slotResult = useSlotResult(() => formValues);

  const floats = $derived(
    slotResult.rounds
      ? slotResult.rounds.flatMap((round) => round.centerPositions).map((round) => round.float)
      : null
  );
</script>

{#if slotResult.isCalculating || !floats}
  <Loader />
{:else}
  {@const float = floats[resultIndex]}

  <!-- Header banner -->
  <ContentBlock
    className="mt-5 mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-indigo-500 dark:border-indigo-400"
  >
    <p class="font-medium">
      <span class="text-indigo-600 dark:text-indigo-400">
        Slot outcome is determined by 5 floats that map to reel positions.
      </span>
      Each reel's center position is calculated using Stake's provably fair algorithm.
    </p>
  </ContentBlock>

  <!-- How it works -->
  <ContentBlock className="mb-6 p-5">
    <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">How It Works</p>
    <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
      <p>
        Slot features <span class="font-semibold">5 reels</span>
        of symbols. The first 4 reels each contain 30 symbols, while the final reel contains 41 symbols.
      </p>
      <p>
        For every round, <span class="font-semibold">5 floats</span>
        are generated—one for each reel—to determine the central position of that reel. The visible slot
        shows the symbol at the central position plus the symbols immediately above and below it. If the
        central position is at a boundary (top or bottom), it
        <span class="font-semibold">cycles to the opposite end</span>
        of the reel.
      </p>
      <p>
        When <span class="font-semibold">3 scatter symbols</span>
        appear in a round, a bonus round is triggered, awarding 15 additional spins. If any bonus rounds
        also result in 3 scatters, another 15 spins are granted—up to a maximum of 180 total rounds.
      </p>
    </div>
  </ContentBlock>

  <!-- Step 1 -->
  <ContentBlock className="mb-6 p-5">
    <p class="mb-3 font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
      Step 1 — Generate Reel Positions
    </p>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      Click a position to see how it was calculated using Stake's provably fair algorithm
    </p>
  </ContentBlock>

  <!-- Step 1 sub-steps -->
  <ContentBlock className="mb-6 p-5 overflow-visible">
    <!-- Grouped tab strip: one column per spin, 5 reel tabs inside each -->
    <ScrollableContainer className="mb-2" innerClassName="p-1.5 pb-0">
      <div class="flex gap-7 pb-5" style="min-width: max-content;">
        {#each { length: Math.ceil(floats.length / 5) } as _, spinIndex (spinIndex)}
          <div class="flex flex-col gap-1">
            <span
              class="mb-1 text-center font-sans text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
            >
              Spin {spinIndex + 1}
            </span>
            <div class="flex gap-1.5">
              {#each { length: 5 } as _, reelIndex (reelIndex)}
                {@const fi = spinIndex * 5 + reelIndex}
                {@const position = Math.floor(floats[fi] * (reelIndex === 4 ? 41 : 30))}
                <button
                  type="button"
                  class={[
                    'flex w-10 flex-col items-center justify-center overflow-visible rounded border p-1.5 text-sm font-medium transition-all',
                    fi === resultIndex ? getSlotTabSelectedClass(fi) : getSlotTabClass(fi),
                  ]}
                  onclick={() => (resultIndex = fi)}
                >
                  <span class="block text-[10px]">R{reelIndex + 1}</span>
                  <span class="block font-bold">{position + 1}</span>
                </button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </ScrollableContainer>

    <FloatGenerationStep
      stepNumber={1.1}
      {resultIndex}
      seed={slotResult.seed}
      {float}
      contentBlockClassName="py-6"
    />
    <FloatToReelPositionStep stepNumber={1.2} {resultIndex} {float} contentBlockClassName="py-6" />
  </ContentBlock>

  <SymbolOrderSlotBoard {floats} {resultIndex} {IconComponent} />
{/if}

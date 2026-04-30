<script lang="ts">
  import type { Component } from 'svelte';
  import { ScarabSpinsTomeOfLifeIcon, type ScarabSpinsTomeOfLifeRound } from '$lib/types';
  import reels from '$lib/games/slots/slot-reels.json';
  import Indicator from '$lib/games/layout/Indicator.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';

  const {
    round,
    roundIndex,
    IconComponent,
  }: {
    round: ScarabSpinsTomeOfLifeRound;
    roundIndex: number;
    IconComponent: Component<{ icon: ScarabSpinsTomeOfLifeIcon }>;
  } = $props();
</script>

<ContentBlock className="p-4">
  {#if round.retrigger}
    <div
      class="mb-3 rounded border-2 border-green-500 bg-green-50 px-3 py-2 text-center font-medium text-green-700 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400"
    >
      +15 Bonus Spins Triggered
    </div>
  {/if}

  {#if roundIndex > 0}
    <div
      class="mb-3 rounded border-2 border-indigo-500 bg-indigo-50 px-3 py-2 text-center font-medium text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-400"
    >
      Bonus Spin {roundIndex}/{round.totalRounds - 1}
    </div>
  {/if}

  <p class="mb-3 text-center font-sans text-xs text-gray-500 uppercase dark:text-gray-400">
    Slot Result
  </p>

  <div class="grid grid-cols-5 gap-2">
    {#each round.centerPositions as centerPosition, n (n)}
      {@const reelSize = n === 4 ? 41 : 30}
      {@const previousIndex = (centerPosition.index - 1 < 0 ? reelSize : centerPosition.index) - 1}
      {@const icon = reels[n][previousIndex] as ScarabSpinsTomeOfLifeIcon}

      <div
        class={[
          'relative',
          icon === ScarabSpinsTomeOfLifeIcon.SCATTER
            ? 'border-2 border-gray-300 dark:border-gray-500'
            : 'bg-gray-100 dark:bg-gray-700',
        ]}
      >
        <IconComponent {icon} />
        <Indicator
          text={`${previousIndex + 1}/${reelSize}`}
          bgColorClass="bg-gray-300 dark:bg-gray-600"
        />
      </div>
    {/each}

    {#each round.centerPositions as centerPosition, n (n)}
      {@const reelSize = n === 4 ? 41 : 30}
      {@const index = centerPosition.index}
      {@const icon = reels[n][index] as ScarabSpinsTomeOfLifeIcon}

      <div
        class={[
          'relative',
          icon === ScarabSpinsTomeOfLifeIcon.SCATTER
            ? 'border-2 border-gray-300 dark:border-gray-500'
            : 'bg-gray-100 dark:bg-gray-700',
        ]}
      >
        <IconComponent {icon} />
        <Indicator text={`${index + 1}/${reelSize}`} />
      </div>
    {/each}

    {#each round.centerPositions as centerPosition, n (n)}
      {@const reelSize = n === 4 ? 41 : 30}
      {@const nextIndex = centerPosition.index + 1 === reelSize ? 0 : centerPosition.index + 1}
      {@const icon = reels[n][nextIndex] as ScarabSpinsTomeOfLifeIcon}

      <div
        class={[
          'relative',
          icon === ScarabSpinsTomeOfLifeIcon.SCATTER
            ? 'border-2 border-gray-300 dark:border-gray-500'
            : 'bg-gray-100 dark:bg-gray-700',
        ]}
      >
        <IconComponent {icon} />
        <Indicator
          text={`${nextIndex + 1}/${reelSize}`}
          bgColorClass="bg-gray-300 dark:bg-gray-600"
        />
      </div>
    {/each}
  </div>
</ContentBlock>

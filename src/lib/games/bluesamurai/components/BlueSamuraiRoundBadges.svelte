<script lang="ts">
  import { BlueSamuraiRetriggerType, type BlueSamuraiRound } from '../types';
  import { getRoundRetriggerBadgeClass } from '$lib/games/bluesamurai/bluesamurai';

  const { round }: { round: BlueSamuraiRound } = $props();
</script>

{#if round.retrigger}
  {@const badgeClass = getRoundRetriggerBadgeClass(round)}
  {#if badgeClass}
    <p class={['mb-2 rounded border-2 px-3 py-1 text-center text-xs font-semibold', badgeClass]}>
      +{round.retriggerType === BlueSamuraiRetriggerType.BONUS ? '10 bonus' : '5 special round'} spins
    </p>
  {/if}
{/if}

{#if round.specialRound}
  <p
    class="mb-2 rounded border-2 border-blue-500 bg-blue-100 px-3 py-1 text-center text-xs font-semibold text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400"
  >
    special round ({round.specialSpin}/5)
  </p>
  {#if round.bonusSpin > 1}
    <p
      class="mb-2 rounded border-2 border-purple-500 bg-purple-100 px-3 py-1 text-center text-xs font-semibold text-purple-700 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400"
    >
      bonus paused ({round.bonusSpin - 1}/{round.totalBonusRounds})
    </p>
  {/if}
{:else if round.bonusSpin! > 0}
  <p
    class="mb-2 rounded border-2 border-purple-500 bg-purple-100 px-3 py-1 text-center text-xs font-semibold text-purple-700 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400"
  >
    bonus round ({round.bonusSpin}/{round.totalBonusRounds})
  </p>
{/if}

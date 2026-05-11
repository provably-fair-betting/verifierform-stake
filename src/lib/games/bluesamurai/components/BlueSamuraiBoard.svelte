<script lang="ts">
  import { type BlueSamuraiRound } from '../types';
  import {
    getCellBorderClass,
    getDisplayIcon,
    reelNoIndex,
    reelWithIndex,
  } from '$lib/games/bluesamurai/bluesamurai';
  import BlueSamuraiIcon from '$lib/games/bluesamurai/components/BlueSamuraiIcon.svelte';
  import BlueSamuraiRoundBadges from '$lib/games/bluesamurai/components/BlueSamuraiRoundBadges.svelte';

  const { round, focused }: { round: BlueSamuraiRound; focused?: number } = $props();

  const outerReel1 = $derived.by(() => {
    const outerReel1 = round.symbols.slice(0, 3);
    return round.specialRound ? reelNoIndex(outerReel1) : reelWithIndex(outerReel1, 1);
  });
  const innerReel1 = $derived(reelWithIndex(round.symbols.slice(3, 7), round.specialRound ? 1 : 4));
  const innerReel2 = $derived(
    reelWithIndex(round.symbols.slice(7, 11), round.specialRound ? 5 : 8)
  );
  const innerReel3 = $derived(
    reelWithIndex(round.symbols.slice(11, 15), round.specialRound ? 9 : 12)
  );
  const outerReel2 = $derived.by(() => {
    const outerReel2 = round.symbols.slice(15);
    return round.specialRound ? reelNoIndex(outerReel2) : reelWithIndex(outerReel2, 16);
  });

  const reels = $derived([outerReel1, innerReel1, innerReel2, innerReel3, outerReel2]);
</script>

<BlueSamuraiRoundBadges {round} />

<div class="mt-3 grid grid-cols-5 gap-1">
  {#each reels as reel, nn (nn)}
    <div class="m-auto">
      {#each reel as { index, icon }, n (n)}
        <div
          class={[
            'relative mb-1 rounded border-2',
            getCellBorderClass(icon, index, round, focused),
          ]}
        >
          <BlueSamuraiIcon icon={getDisplayIcon(icon, index, round)} />
        </div>
      {/each}
    </div>
  {/each}
</div>

<script lang="ts">
  import FloatGenerationStep from '$lib/games/FloatGenerationStep.svelte';
  import DragonTowerResultStep from '$lib/games/dragontower/DragonTowerResultStep.svelte';
  import Loader from '$lib/games/Loader.svelte';
  import ScrollableContainer from '$lib/games/layout/ScrollableContainer.svelte';
  import ContentBlock from '../layout/ContentBlock.svelte';
  import { useDragonTowerLevels } from './use-dragon-tower-levels.svelte';
  import {
    getDragonTowerTabClass,
    getDragonTowerTabSelectedClass,
  } from '$lib/games/dragontower/dragontower';

  const { formValues }: { formValues: Record<string, unknown> } = $props();

  let flatIndex = $state(0);
  const dragonTower = useDragonTowerLevels(() => formValues);

  // Group items by level (9 levels)
  const levelGroups = $derived.by(() => {
    if (!dragonTower.items) return [];
    const groups: (typeof dragonTower.items)[] = [];
    for (let level = 0; level < 9; level++) {
      groups.push(
        dragonTower.items.slice(
          level * dragonTower.config.count,
          (level + 1) * dragonTower.config.count
        )
      );
    }
    return groups;
  });

  // Reset flat index when items change
  $effect(() => {
    if (dragonTower.items) {
      flatIndex = 0;
    }
  });
</script>

<div class="mt-5 border-0 text-center dark:text-white">
  <div id="step-content" class="pb-4 text-left text-sm dark:text-white">
    {#if dragonTower.isCalculating || !dragonTower.items}
      <Loader />
    {:else}
      <ContentBlock
        className="mb-7 p-5 text-center text-base text-gray-900 dark:text-white border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p class="font-medium">
          <span class="text-blue-600 dark:text-blue-400">
            Each level generates {dragonTower.config.count} safe egg{dragonTower.config.count > 1
              ? 's'
              : ''} using Fisher-Yates shuffle.
          </span>
          Click an egg tab to see how it was generated using Stake's provably fair algorithm.
        </p>
      </ContentBlock>

      <!-- Grouped tab strip by level -->
      <ScrollableContainer className="mb-7" innerClassName="p-1.5 pb-0">
        <div class="flex gap-4 pb-5" style="min-width: max-content;">
          {#each levelGroups as levelItems, levelIndex}
            <div class="flex flex-col gap-1">
              <span
                class="mb-1 text-center font-sans text-xs font-semibold text-gray-500 dark:text-gray-400"
              >
                Level {levelIndex + 1}
              </span>
              <div class="flex gap-1.5">
                {#each levelItems as item, eggIndex}
                  {@const fi = levelIndex * dragonTower.config.count + eggIndex}
                  <button
                    type="button"
                    class={[
                      'flex w-10 flex-col items-center justify-center overflow-visible rounded border-2 p-1.5 text-sm font-medium transition-all',
                      fi === flatIndex
                        ? getDragonTowerTabSelectedClass(levelIndex + 1)
                        : getDragonTowerTabClass(levelIndex + 1),
                    ]}
                    onclick={() => (flatIndex = fi)}
                  >
                    <span class="block text-[10px] opacity-75">({eggIndex + 1})</span>
                    <span class="block font-bold">{item.chosen}</span>
                  </button>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </ScrollableContainer>

      {@const selectedItem = dragonTower.items[flatIndex]}

      <FloatGenerationStep
        stepNumber={1}
        resultIndex={flatIndex}
        seed={dragonTower.seed!}
        float={selectedItem.float}
      />
      <DragonTowerResultStep
        stepNumber={2}
        resultIndex={flatIndex}
        config={dragonTower.config}
        {...selectedItem}
      />
    {/if}
  </div>
</div>

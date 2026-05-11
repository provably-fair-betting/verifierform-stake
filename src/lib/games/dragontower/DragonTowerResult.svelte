<script lang="ts">
  import { useDragonTowerLevels } from './use-dragon-tower-levels.svelte';
  import { useDragonTowerGrid } from './use-dragontower-grid.svelte';
  import type { DragonTowerDifficulty } from './types';
  import { DRAGON_TOWER_COL_CLASS } from '$lib/games/dragontower/dragontower';
  import eggIconWhite from '$lib/games/dragontower/icons/egg-100x100-white.png';
  import eggIconGray from '$lib/games/dragontower/icons/egg-100x100-gray.png';
  import skullIconWhite from '$lib/games/dragontower/icons/skull-100x100-white.png';
  import skullIconGray from '$lib/games/dragontower/icons/skull-100x100-gray.png';
  import Indicator from '$lib/games/layout/Indicator.svelte';
  import Loader from '$lib/games/Loader.svelte';

  const { formValues }: { formValues: Record<string, unknown> } = $props();
  const dragonTower = useDragonTowerLevels(() => formValues);
  const grid = useDragonTowerGrid(
    () => dragonTower.items,
    () => dragonTower.config.count
  );

  const difficulty = $derived(formValues.difficulty as DragonTowerDifficulty);
  const results = $derived(grid.results);
</script>

{#if dragonTower.isCalculating}
  <Loader />
{:else}
  <p data-testid="dragontower-result" class="hidden text-center text-base">
    {JSON.stringify(results!)}
  </p>

  <div class="text-center">
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">Egg positions by level</p>
    <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">
      Difficulty: <span class="font-semibold text-gray-600 capitalize dark:text-gray-300">
        {difficulty}
      </span>
    </p>

    <div class="space-y-2">
      {#each results! as eggs, n (n)}
        <div class="flex gap-2">
          <div
            class="flex h-12 w-16 flex-col items-center justify-center rounded border border-gray-300 bg-gray-100 text-xs font-semibold text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <span class="text-[10px] text-gray-500 dark:text-gray-400">Level</span>
            <span class="text-sm">{9 - n}</span>
          </div>
          <div class="flex-1">
            <div class={['grid gap-2', DRAGON_TOWER_COL_CLASS[difficulty]]}>
              {#each [...Array(dragonTower.config.size).keys()] as i (i)}
                {@const isEgg = eggs.includes(i)}
                <div
                  class={[
                    'relative flex h-12 items-center justify-center rounded border-2 transition-all',
                    isEgg
                      ? 'border-green-400 bg-green-50 dark:border-green-500 dark:bg-green-900/20'
                      : 'border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-900/20',
                  ]}
                >
                  {#if isEgg}
                    <Indicator
                      text={i}
                      bgColorClass="bg-green-600 dark:bg-green-700 text-white text-xs"
                    />
                  {/if}

                  <img
                    class="relative h-8 w-8 object-contain opacity-90 dark:hidden"
                    src={isEgg ? eggIconGray : skullIconGray}
                    alt={isEgg ? 'egg' : 'skull'}
                  />
                  <img
                    class="relative hidden h-8 w-8 object-contain opacity-90 dark:block"
                    src={isEgg ? eggIconWhite : skullIconWhite}
                    alt={isEgg ? 'egg' : 'skull'}
                  />
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

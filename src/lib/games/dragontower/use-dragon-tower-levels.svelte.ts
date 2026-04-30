import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { DragonTowerSeed, DragonTowerDifficulty, FisherYatesItem } from '$lib/types';
import { fisherYates } from '$lib/domain/games/shared/fisher-yates';
import { DRAGON_TOWER_LEVEL_MAP } from './dragon-tower.config';

/**
 * Dragon Tower levels composable
 *
 * Handles the business logic for calculating egg positions across all 9 levels.
 * Uses Fisher-Yates shuffle to determine safe egg positions per level,
 * preserving the intermediate float for each draw.
 *
 * @param getFormValues - Getter function for reactive form values containing seed and difficulty
 * @returns Object with seed, flat Fisher-Yates items (with floats), config, and computing state
 *
 * @example
 * ```svelte
 * const { seed, items, config, isCalculating } = useDragonTowerLevels(() => formValues);
 * ```
 */
export function useDragonTowerLevels(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<DragonTowerSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    difficulty: getFormValues().difficulty as DragonTowerDifficulty,
  });

  const config = $derived(DRAGON_TOWER_LEVEL_MAP[seed.difficulty]);

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const levelConfig = DRAGON_TOWER_LEVEL_MAP[seed.difficulty];
        const results: FisherYatesItem<number>[] = [];

        for (let i = 0; i < 9; i++) {
          const allIndexes = Array.from({ length: levelConfig.size }).map((_v, i) => i);
          results.push(...fisherYates(floatGenerator, allIndexes, levelConfig.count));
        }

        return results;
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get items() {
      return result.value;
    },
    get config() {
      return config;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

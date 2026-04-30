import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { MinesSeed, FisherYatesItem } from '$lib/types';
import { fisherYates } from '$lib/domain/games/shared/fisher-yates';

/**
 * Mines positions composable
 *
 * Handles the business logic for calculating mine positions.
 * Uses Fisher-Yates shuffle to randomly place mines on a 25-tile board,
 * preserving the intermediate float for each mine draw.
 *
 * @param getFormValues - Getter function for reactive form values containing seed and mine count
 * @returns Object with seed, array of Fisher-Yates items (with floats), and computing state
 *
 * @example
 * ```svelte
 * const { seed, items, isCalculating } = useMinesPositions(() => formValues);
 * ```
 */
export function useMinesPositions(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<MinesSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    mines: getFormValues().mines as number,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const minesBoard = Array.from({ length: 25 }).map((_v, i) => i + 1);
        return fisherYates(floatGenerator, minesBoard, seed.mines) as FisherYatesItem<number>[];
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
    get isCalculating() {
      return result.debouncing;
    },
  };
}

import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { fisherYates } from '$lib/domain/games/shared/fisher-yates';
import type { FisherYatesItem } from '$lib/types';

/**
 * Keno numbers composable
 *
 * Handles the business logic for calculating Keno chosen numbers.
 * Uses Fisher-Yates shuffle to select 10 random numbers from 1-40,
 * preserving the intermediate float for each draw.
 *
 * @param getFormValues - Getter function for reactive form values containing seed information
 * @returns Object with seed, array of Fisher-Yates items (with floats), and computing state
 *
 * @example
 * ```svelte
 * const { seed, items, isCalculating } = useKenoNumbers(() => formValues);
 * ```
 */
export function useKenoNumbers(getFormValues: () => Record<string, unknown>) {
  const seed = $derived({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const kenoBoard = Array.from({ length: 40 }).map((_v, i) => i + 1);
        return fisherYates(floatGenerator, kenoBoard, 10) as FisherYatesItem<number>[];
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

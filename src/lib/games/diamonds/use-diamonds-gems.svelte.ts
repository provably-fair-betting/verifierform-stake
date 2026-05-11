import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { Gem } from './types';
import type { Item } from '$lib/types';
import { shuffle } from '$lib/domain/games/shared/shuffle';

const gems = Object.values(Gem);

/**
 * Diamonds gems composable
 *
 * Handles the business logic for calculating chosen gems.
 * Generates 5 random gems preserving the float for each draw.
 *
 * @param getFormValues - Getter function for reactive form values containing seed information
 * @returns Object with seed, array of gem items (with floats), and computing state
 *
 * @example
 * ```svelte
 * const { seed, items, isCalculating } = useDiamondsGems(() => formValues);
 * ```
 */
export function useDiamondsGems(getFormValues: () => Record<string, unknown>) {
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
        return shuffle(floatGenerator, gems, 5) as Item<Gem>[];
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

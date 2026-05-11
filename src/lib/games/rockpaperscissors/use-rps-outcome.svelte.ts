import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { RockPaperScissorsOutcome } from './types';
import type { Item } from '$lib/types';
import { shuffle } from '$lib/domain/games/shared/shuffle';

const outcomes = Object.values(RockPaperScissorsOutcome);

/**
 * Rock Paper Scissors outcome composable
 *
 * Handles the business logic for calculating multiple RPS outcomes.
 * Generates 20 RPS items (with floats) based on the seed.
 *
 * @param getFormValues - Getter function for reactive form values containing seed information
 * @returns Object with seed, array of RPS items (with floats), and computing state
 *
 * @example
 * ```svelte
 * const { seed, items, isCalculating } = useRpsOutcome(() => formValues);
 * ```
 */
export function useRpsOutcome(getFormValues: () => Record<string, unknown>) {
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
        return shuffle(floatGenerator, outcomes, 20) as Item<RockPaperScissorsOutcome>[];
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

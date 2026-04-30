import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { CoinFlip, type Item } from '$lib/types';

/**
 * Coin flip outcome composable
 *
 * Handles the business logic for calculating multiple coin flip results.
 * Generates 20 coin flips based on the seed, preserving the float for each.
 *
 * @param getFormValues - Getter function for reactive form values containing seed information
 * @returns Object with seed, array of flip items (with floats), and computing state
 *
 * @example
 * ```svelte
 * const { seed, items, isCalculating } = useFlipOutcome(() => formValues);
 * ```
 */
export function useFlipOutcome(getFormValues: () => Record<string, unknown>) {
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
        const coinFlipOptions = [CoinFlip.TAIL, CoinFlip.HEAD];
        const flips: Item<CoinFlip>[] = [];

        for (let i = 0; i < 20; i++) {
          const float = floatGenerator.next().value;
          const chosenIndex = float <= 0.5 ? 0 : 1;
          flips.push({ float, chosenIndex, chosen: coinFlipOptions[chosenIndex] });
        }

        return flips;
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

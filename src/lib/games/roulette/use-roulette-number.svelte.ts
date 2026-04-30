import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';

/**
 * Roulette number composable
 *
 * Handles the business logic for calculating the roulette number.
 * Uses float generation to select a number between 0-36.
 * Exposes both the raw float and the resulting number.
 *
 * @param getFormValues - Getter function for reactive form values containing seed information
 * @returns Object with seed, float, chosen number, and computing state
 *
 * @example
 * ```svelte
 * const { seed, float, chosenNumber, isCalculating } = useRouletteNumber(() => formValues);
 * ```
 */
export function useRouletteNumber(getFormValues: () => Record<string, unknown>) {
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
        const float = floatGenerator.next().value;
        return { float, chosenNumber: Math.floor(float * 37) };
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get float() {
      return result.value?.float;
    },
    get chosenNumber() {
      return result.value?.chosenNumber;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

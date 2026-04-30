import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';

/**
 * Limbo multiplier composable
 *
 * Handles the business logic for calculating the limbo crash point.
 * Uses a specific formula to convert float to crash multiplier.
 * Exposes both the raw float and the resulting crash point.
 *
 * @param getFormValues - Getter function for reactive form values containing seed information
 * @returns Object with seed, float, crash point multiplier, and computing state
 *
 * @example
 * ```svelte
 * const { seed, float, crashPoint, isCalculating } = useLimboMultiplier(() => formValues);
 * ```
 */
export function useLimboMultiplier(getFormValues: () => Record<string, unknown>) {
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
        // Limbo crash point calculation formula
        const crashPoint =
          Math.floor((16777216 / (Math.floor(float * 16777216) + 1)) * (1 - 0.01) * 100) / 100;
        return { float, crashPoint };
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
    get crashPoint() {
      return result.value?.crashPoint;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

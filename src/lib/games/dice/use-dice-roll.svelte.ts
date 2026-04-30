import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';

/**
 * Dice roll composable
 *
 * Handles the business logic for calculating a dice roll result.
 * Generates a float and converts it to a dice roll number (0-100).
 *
 * @param getFormValues - Getter function for reactive form values containing seed information
 * @returns Object with roll number and computing state
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   const { rollNumber, isCalculating } = useDiceRoll(() => formValues);
 * </script>
 *
 * {#if isCalculating}
 *   <Loader />
 * {:else}
 *   <div>{rollNumber.toFixed(2)}</div>
 * {/if}
 * ```
 */
export function useDiceRoll(getFormValues: () => Record<string, unknown>) {
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
        const rollNumber = Math.floor(float * 10001) / 100;
        return { float, rollNumber };
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
    get rollNumber() {
      return result.value?.rollNumber;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

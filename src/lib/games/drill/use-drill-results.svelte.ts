import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { DrillResult } from '$lib/types';
import { calculateDrillMultiplier } from '$lib/games/drill/drill';

/**
 * Drill results composable
 *
 * Generates 3 drill results with multipliers based on float values.
 *
 * @param getFormValues - Getter function for form values with seed
 * @returns Array of 3 drill results and calculating state
 */
export function useDrillResults(getFormValues: () => Record<string, unknown>) {
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
        const results: DrillResult[] = [];

        for (let i = 0; i < 3; i++) {
          const float = floatGenerator.next().value;
          const multiplier = calculateDrillMultiplier(float);
          results.push({ float, multiplier, drillIndex: i });
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
    get drills() {
      return result.value;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

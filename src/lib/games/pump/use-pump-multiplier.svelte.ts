import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { PumpSeed, PumpDifficulty, FisherYatesItem } from '$lib/types';
import { fisherYates } from '$lib/domain/games/shared/fisher-yates';
import { PUMP_DIFFICULTY_TO_SLICE } from './pump.config';
import paylines from '$lib/games/pump/pump-paylines.json';

/**
 * Pump multiplier composable
 *
 * Calculates the multiplier at which the pump pops.
 * Uses Fisher-Yates to determine pop index from difficulty slice,
 * preserving each intermediate float for explanation steps.
 *
 * @param getFormValues - Getter function for form values with seed and difficulty
 * @returns Seed, raw Fisher-Yates items (with floats), payline, and calculating state
 */
export function usePumpMultiplier(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<PumpSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    difficulty: getFormValues().difficulty as PumpDifficulty,
  });

  const payline = $derived(paylines[seed.difficulty]);

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const slice = PUMP_DIFFICULTY_TO_SLICE[seed.difficulty];
        const indexes = Array.from({ length: 25 }).map((_v, i) => i);
        return fisherYates(floatGenerator, indexes, slice) as FisherYatesItem<number>[];
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
    get payline() {
      return payline;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

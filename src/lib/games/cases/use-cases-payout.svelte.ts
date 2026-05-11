import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { CasesSeed, CasesDifficulty } from './types';
import paylines from '$lib/games/cases/cases-paylines.json';
import { getPayout } from '$lib/domain/games/shared/payout';

/**
 * Cases payout composable
 *
 * Calculates payout multiplier from a single float value,
 * also exposing the seed and raw float for explanation steps.
 *
 * @param getFormValues - Getter function for form values with seed and difficulty
 * @returns Seed, float, payout, and calculating state
 */
export function useCasesPayout(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<CasesSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    difficulty: getFormValues().difficulty as CasesDifficulty,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const float = floatGenerator.next().value;
        const payline = paylines[seed.difficulty];
        return { float, payout: getPayout(payline, float) };
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get result() {
      return result.value;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

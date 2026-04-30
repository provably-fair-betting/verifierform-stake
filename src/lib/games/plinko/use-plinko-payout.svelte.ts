import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { PlinkoSeed, Risk, Item, Direction } from '$lib/types';
import { getDirections, getPayline, getPayout } from '$lib/games/plinko/plinko';
import paylines from '$lib/games/plinko/plinko-paylines.json';

/**
 * Plinko payout composable
 *
 * Handles the business logic for calculating Plinko payout and payline.
 * Exposes the raw direction items (with floats) for step-by-step explanation,
 * plus the computed payline array and final payout.
 *
 * @param getFormValues - Getter function for reactive form values containing seed and plinko config
 * @returns Object with seed, directions (with floats), payline, payout, and computing state
 *
 * @example
 * ```svelte
 * const { seed, directions, payline, payout, isCalculating } = usePlinkoPayout(() => formValues);
 * ```
 */
export function usePlinkoPayout(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<PlinkoSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    risk: getFormValues().risk as Risk,
    rows: getFormValues().rows as number,
  });

  const payline = $derived([
    ...new Set(paylines[seed.rows as unknown as keyof typeof paylines][seed.risk]),
  ]);

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const directions = getDirections(floatGenerator, seed.rows) as Item<Direction>[];
        const payline = getPayline(seed.risk, seed.rows);
        const payout = getPayout(seed.risk, seed.rows, directions);
        return { directions, payline, payout };
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get directions() {
      return result.value?.directions;
    },
    get computedPayline() {
      return result.value?.payline;
    },
    get payline() {
      return payline;
    },
    get payout() {
      return result.value?.payout;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

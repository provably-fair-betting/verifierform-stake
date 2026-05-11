import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { WheelSeed } from './types';
import type { Risk } from '$lib/types';
import paylines from '$lib/games/wheel/wheel-paylines.json';

/**
 * Wheel spin composable
 *
 * Handles the business logic for calculating a wheel spin result.
 * Selects a segment based on float and returns the payout multiplier.
 * Exposes the raw float and seed for explanation steps.
 *
 * @param getFormValues - Getter function for reactive form values containing seed and wheel config
 * @returns Object with seed, float, payout, payline, and computing state
 *
 * @example
 * ```svelte
 * const { seed, float, payout, payline, isCalculating } = useWheelSpin(() => formValues);
 * ```
 */
export function useWheelSpin(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<WheelSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    risk: getFormValues().risk as Risk,
    segments: getFormValues().segments as number,
  });

  const payline = $derived(paylines[seed.segments as unknown as keyof typeof paylines][seed.risk]);

  const distinctPayline = $derived(
    [...new Set(payline.slice(0))].sort((a, b) => (a as number) - (b as number))
  );

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const float = floatGenerator.next().value;
        const segmentIndex = Math.floor(float * seed.segments);
        return { float, payout: payline[segmentIndex] };
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
    get payout() {
      return result.value?.payout;
    },
    get payline() {
      return distinctPayline;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

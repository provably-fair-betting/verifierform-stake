import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { DartsSeed, DartsDifficulty, DartsColor } from './types';
import { colorForDart, multiForDart } from '$lib/games/darts/darts';
import paylines from '$lib/paylines/darts-paylines.json';

export interface DartsResult {
  rotation: number;
  distance: number;
  normalisedDistance: number;
  colorHex: DartsColor;
  multi: number;
}

/**
 * Darts throw composable
 *
 * Handles the business logic for calculating a dart throw result.
 * Generates rotation and distance floats, determines color and multiplier.
 *
 * @param getFormValues - Getter function for reactive form values containing seed and difficulty
 * @returns Object with dart result, multis, and computing state
 *
 * @example
 * ```svelte
 * const { result, multis, isCalculating } = useDartsThrow(() => formValues);
 * ```
 */
export function useDartsThrow(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<DartsSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    difficulty: getFormValues().difficulty as DartsDifficulty,
  });

  const multis = $derived(paylines[seed.difficulty]);

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const rotation = floatGenerator.next().value;
        const distance = floatGenerator.next().value;
        const normalisedDistance = Math.sqrt(distance) / 2;
        const colorHex = colorForDart(seed.difficulty, rotation, normalisedDistance);
        const multi = multiForDart(seed.difficulty, colorHex);

        return {
          rotation,
          distance,
          normalisedDistance,
          colorHex,
          multi,
        } satisfies DartsResult;
      },
      (getFormValues().delay as number) || 350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get result() {
      return result.value;
    },
    get multis() {
      return multis;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

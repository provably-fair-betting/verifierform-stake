import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { MolesSeed } from './types';
import type { FisherYatesItem } from '$lib/types';
import { fisherYates } from '$lib/domain/games/shared/fisher-yates';

/**
 * Moles rounds composable
 *
 * Handles the business logic for calculating mole positions across multiple rounds.
 * Each round uses a different cursor offset to generate independent mole positions,
 * preserving the intermediate float for each draw.
 *
 * @param getFormValues - Getter function for reactive form values containing seed and moles configuration
 * @returns Object with seed, rounds array of Fisher-Yates items (with floats), and computing state
 *
 * @example
 * ```svelte
 * const { seed, rounds, isCalculating } = useMolesRounds(() => formValues);
 * ```
 */
export function useMolesRounds(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<MolesSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    molesCount: getFormValues().molescount as number,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const maxRounds = seed.molesCount === 1 ? 8 : 9;
        const allRounds: FisherYatesItem<number>[][] = [];

        for (let round = 0; round < maxRounds; round++) {
          // Each round uses molesCount floats, each float uses 4 bytes
          const cursor = round * seed.molesCount * 4;
          const floatGenerator = FloatGenerator({ ...seed, cursor });
          const holes = Array.from({ length: 7 }).map((_v, i) => i);
          allRounds.push(fisherYates(floatGenerator, holes, seed.molesCount));
        }

        return allRounds;
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get rounds() {
      return result.value;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

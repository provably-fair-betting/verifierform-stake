import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { findCard } from '$lib/games/packs/packs';
import type { PacksCard } from './types';

/** Packs cards composable - generates 5 random pack cards, preserving float for each */
export function usePacksCards(getFormValues: () => Record<string, unknown>) {
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
        const results: { float: number; card: PacksCard }[] = [];
        for (let i = 0; i < 5; i++) {
          const float = floatGenerator.next().value;
          const card = findCard(float)!;
          results.push({ float, card });
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
    get items() {
      return result.value;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

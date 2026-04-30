import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { simulateRounds } from '$lib/games/bluesamurai/bluesamurai';

/** Blue Samurai rounds composable - simulates slot rounds */
export function useBlueSamuraiRounds(getFormValues: () => Record<string, unknown>) {
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
        return simulateRounds(floatGenerator);
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

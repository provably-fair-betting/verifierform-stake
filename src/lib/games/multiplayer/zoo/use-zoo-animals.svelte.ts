import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { ZooSeed } from './types';
import { getZooAnimals } from './zoo';
import { hmac as createHmac } from '@stablelib/hmac';
import { encode as toUInt8Array } from '@stablelib/utf8';
import { encode as toHex } from '@stablelib/hex';
import { SHA256 } from '@stablelib/sha256';

export function useZooAnimals(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<ZooSeed>({
    hash: getFormValues().hash as string,
    seed: getFormValues().seed as string,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const hmac = toHex(
          createHmac(SHA256, toUInt8Array(seed.hash), toUInt8Array(seed.seed))
        );
        const animals = getZooAnimals(hmac);
        return { hmac, animals };
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get hmac() {
      return result.value?.hmac;
    },
    get animals() {
      return result.value?.animals;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

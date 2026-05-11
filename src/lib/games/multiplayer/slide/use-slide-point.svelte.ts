import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { SlideSeed } from './types';
import { hmac as createHmac } from '@stablelib/hmac';
import { encode as toUInt8Array } from '@stablelib/utf8';
import { encode as toHex } from '@stablelib/hex';
import { SHA256 } from '@stablelib/sha256';

/** Slide point composable - calculates slide multiplier from game hash, exposing seed and hmac */
export function useSlidePoint(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<SlideSeed>({
    slideHash: getFormValues().slidehash as string,
    blockHash: getFormValues().blockhash as string,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const hmac = toHex(
          createHmac(SHA256, toUInt8Array(seed.slideHash), toUInt8Array(seed.blockHash))
        );
        const int = parseInt(hmac.substring(0, 8), 16);
        const slidePoint = Math.floor(Math.max(1, (2 ** 32 / (int + 1)) * (1 - 0.02)) * 100) / 100;
        return { hmac, slidePoint };
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
    get slidePoint() {
      return result.value?.slidePoint;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

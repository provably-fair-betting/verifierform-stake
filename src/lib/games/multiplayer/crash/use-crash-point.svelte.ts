import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { CrashSeed } from '$lib/types';
import { hmac as createHmac } from '@stablelib/hmac';
import { encode as toUInt8Array } from '@stablelib/utf8';
import { encode as toHex } from '@stablelib/hex';
import { SHA256 } from '@stablelib/sha256';
import { CRASH_SEED } from '../multiplayer.config';

/** Crash point composable - calculates crash multiplier from game hash, exposing seed and hmac */
export function useCrashPoint(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<CrashSeed>({
    gameHash: getFormValues().gamehash as string,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const hmac = toHex(
          createHmac(SHA256, toUInt8Array(seed.gameHash), toUInt8Array(CRASH_SEED))
        );
        const int = parseInt(hmac.substring(0, 8), 16);
        const crashPoint = Math.floor(Math.max(1, (2 ** 32 / (int + 1)) * (1 - 0.01)) * 100) / 100;
        return { hmac, crashPoint };
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
    get crashPoint() {
      return result.value?.crashPoint;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

import { SHA256 } from '@stablelib/sha256';
import { hmac as createHmac } from '@stablelib/hmac';
import { encode as toUInt8Array } from '@stablelib/utf8';
import type { Seed } from '$lib/types';

/**
 * Generates bytes for the provided seed
 * @see {@link https://stake.com/provably-fair/implementation}
 * @param seed - The seed object containing serverSeed, clientSeed, nonce and cursor
 * @returns A generator that yields random bytes based on the provided seed
 */
export default function* ByteGenerator(seed: Seed): Generator<number, number, number> {
  const { serverSeed, clientSeed, nonce, cursor = 0 } = seed;

  if (cursor % 4 !== 0) {
    throw new Error('Cursor must be a multiple of 4');
  }

  // Setup cursor variables
  let currentRound = Math.floor(cursor / 32);
  let currentRoundCursor = cursor;
  currentRoundCursor -= currentRound * 32;

  // Generate outputs until cursor requirement fullfilled
  while (true) {
    // HMAC function used to output provided inputs into bytes
    const hmac = createHmac(
      SHA256,
      toUInt8Array(serverSeed),
      toUInt8Array(`${clientSeed}:${nonce}:${currentRound}`)
    );

    // Update cursor for next iteration of loop
    while (currentRoundCursor < 32) {
      yield Number(hmac[currentRoundCursor]);
      currentRoundCursor += 1;
    }
    currentRoundCursor = 0;
    currentRound += 1;
  }
}

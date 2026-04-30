import type { Seed } from '$lib/types';
import ByteGenerator from './byte-generator';

/**
 * Generates floats for the provided seed
 * @see {@link https://stake.com/provably-fair/conversions}
 * @param seed - The seed object containing serverSeed, clientSeed, nonce and cursor
 * @returns A generator that yields random floats based on the provided seed
 */
export function* FloatGenerator(seed: Seed): Generator<number, number, number> {
  const { serverSeed, clientSeed, nonce, cursor = 0 } = seed;

  // Random number generator function
  const rng = ByteGenerator({ serverSeed, clientSeed, nonce, cursor });

  while (true) {
    // Get first 4 bytes from rng function and convert to float
    let result = 0;
    for (let i = 0; i < 4; i++) {
      result += rng.next().value / 256 ** (i + 1);
    }
    yield result;
  }
}

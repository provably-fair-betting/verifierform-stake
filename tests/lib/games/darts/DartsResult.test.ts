import { describe, it, expect } from 'vitest';
import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { colorForDart, multiForDart } from '$lib/games/darts/darts';
import type { DartsDifficulty } from '$lib/games/darts/types';
import testCases from '../testcases/darts.json';

describe('darts calculation', () => {
  it.each(testCases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.dartsDifficulty',
    ({ clientSeed, serverSeed, nonce, selects, rotation, distance, pixelColor, multi }) => {
      const floatGenerator = FloatGenerator({ clientSeed, serverSeed, nonce });

      const rotationResult = floatGenerator.next().value;
      const distanceResult = floatGenerator.next().value;
      const normalisedDistance = Math.sqrt(distanceResult) / 2;
      const colorHex = colorForDart(
        selects.dartsDifficulty as DartsDifficulty,
        rotationResult,
        normalisedDistance
      );
      const multiplier = multiForDart(selects.dartsDifficulty as DartsDifficulty, colorHex);

      expect(rotationResult.toFixed(3)).toBe(rotation.toFixed(3));
      expect(distanceResult.toFixed(3)).toBe(distance.toFixed(3));
      expect(colorHex).toBe(pixelColor);
      expect(multiplier).toBe(multi);
    }
  );
});

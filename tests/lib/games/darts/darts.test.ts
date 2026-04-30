import { describe, it, expect } from 'vitest';
import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { colorForDart, multiForDart } from '$lib/games/darts/darts';
import type { DartsDifficulty } from '$lib/types';
import testCases from '../../../../e2e/testfiles/darts-all-testcases.json';

describe('darts calculation', () => {
  it.each(testCases)(
    'nonce=$nonce difficulty=$difficulty',
    ({ clientSeed, serverSeed, nonce, difficulty, rotation, distance, pixelColor, multiplier }) => {
      const floatGenerator = FloatGenerator({ clientSeed, serverSeed, nonce });

      const rotationResult = floatGenerator.next().value;
      const distanceResult = floatGenerator.next().value;
      const normalisedDistance = Math.sqrt(distanceResult) / 2;
      const colorHex = colorForDart(difficulty as DartsDifficulty, rotationResult, normalisedDistance);
      const multi = multiForDart(difficulty as DartsDifficulty, colorHex);

      expect(rotationResult.toFixed(3)).toBe(rotation.toFixed(3));
      expect(distanceResult.toFixed(3)).toBe(distance.toFixed(3));
      expect(colorHex).toBe(pixelColor);
      expect(multi).toBe(multiplier);
    }
  );
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import DartsResult from '$lib/games/darts/DartsResult.svelte';
import testcases from '../testcases/darts.json';

describe('DartsResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.dartsDifficulty',
    async ({ clientSeed, serverSeed, nonce, selects, rotation, distance, pixelColor, multi }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.dartsDifficulty,
      } as Record<string, unknown>;

      const screen = render(DartsResult, { formValues });
      vi.advanceTimersByTime(350);

      const rotationEl = await screen.findByTestId('rotation');
      const distanceEl = screen.getByTestId('distance');
      const pixelColorEl = screen.getByTestId('pixelColor');
      const multiEl = screen.getByTestId('multi');

      expect(rotationEl).toHaveTextContent(rotation.toFixed(3));
      expect(distanceEl).toHaveTextContent(distance.toFixed(3));
      expect(pixelColorEl).toHaveTextContent(pixelColor);
      expect(multiEl).toHaveTextContent(String(multi));
    }
  );
});

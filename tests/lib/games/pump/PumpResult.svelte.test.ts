import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import PumpResult from '$lib/games/pump/PumpResult.svelte';
import testcases from '../testcases/pump.json';

describe('PumpResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.pumpDifficulty expectedResult=$result',
    async ({ clientSeed, serverSeed, nonce, selects, result }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.pumpDifficulty,
        game: 'pump',
      } as Record<string, unknown>;

      const screen = render(PumpResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('pump-result');
      const actual = parseFloat(el.textContent ?? '');
      expect(parseFloat(Math.abs(actual - result).toFixed(2))).toBeLessThanOrEqual(0.01);
    }
  );
});

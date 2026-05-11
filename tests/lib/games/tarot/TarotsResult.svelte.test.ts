import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import TarotsResult from '$lib/games/tarot/TarotsResult.svelte';
import testcases from '../testcases/tarot.json';

describe('TarotsResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.tarotDifficulty',
    async ({ clientSeed, serverSeed, nonce, selects, selectedMultipliers }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.tarotDifficulty,
      } as Record<string, unknown>;

      const expectedTotal = selectedMultipliers.reduce((a, b) => a * b, 1).toFixed(2);

      const screen = render(TarotsResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('tarot-result');
      expect(el).toHaveTextContent(expectedTotal + 'x');
    }
  );
});

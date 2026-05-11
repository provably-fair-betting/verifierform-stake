import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import ChickenResult from '$lib/games/chicken/ChickenResult.svelte';
import testcases from '../testcases/chicken.json';

describe('ChickenResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.chickenDifficulty expectedResult=$result',
    async ({ clientSeed, serverSeed, nonce, selects, result }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.chickenDifficulty,
        game: 'chicken',
      } as Record<string, unknown>;

      const screen = render(ChickenResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('chicken-result');
      expect(el).toHaveTextContent(result.toFixed(2) + 'x');
    }
  );
});

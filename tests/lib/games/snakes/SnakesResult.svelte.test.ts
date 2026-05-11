import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import SnakesResult from '$lib/games/snakes/SnakesResult.svelte';
import testcases from '../testcases/snakes.json';

describe('SnakesResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.snakesDifficulty',
    async ({ clientSeed, serverSeed, nonce, selects, rollTotals }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.snakesDifficulty,
      } as Record<string, unknown>;

      const screen = render(SnakesResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('snakes-data');
      expect(el).toHaveTextContent(JSON.stringify(rollTotals));
    }
  );
});

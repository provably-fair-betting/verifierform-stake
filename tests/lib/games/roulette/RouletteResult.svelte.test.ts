import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import RouletteResult from '$lib/games/roulette/RouletteResult.svelte';
import testcases from '../testcases/roulette.json';

describe('RouletteResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed expectedResult=$result',
    async ({ clientSeed, serverSeed, nonce, result }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'roulette',
      } as Record<string, unknown>;

      const screen = render(RouletteResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('roulette-result');
      expect(el).toHaveTextContent(String(result));
    }
  );
});

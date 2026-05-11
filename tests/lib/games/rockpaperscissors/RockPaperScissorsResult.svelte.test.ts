import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import RockPaperScissorsResult from '$lib/games/rockpaperscissors/RockPaperScissorsResult.svelte';
import testcases from '../testcases/rockpaperscissors.json';

describe('RockPaperScissorsResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, values }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'rockpaperscissors',
      } as Record<string, unknown>;

      const screen = render(RockPaperScissorsResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('rockpaperscissors-result');
      expect(el).toHaveTextContent(values.join(','));
    }
  );
});

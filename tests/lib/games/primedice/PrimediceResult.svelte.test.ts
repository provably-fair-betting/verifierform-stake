import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import DiceResult from '$lib/games/dice/DiceResult.svelte';
import testcases from '../testcases/primedice.json';

describe('PrimediceResult', () => {
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
        game: 'primedice',
      } as Record<string, unknown>;

      const screen = render(DiceResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(result.toFixed(2))).toBeInTheDocument();
    }
  );
});

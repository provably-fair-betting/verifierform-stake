import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import LimboResult from '$lib/games/limbo/LimboResult.svelte';
import testcases from '../testcases/limbo.json';

describe('LimboResult', () => {
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
        game: 'limbo',
      } as Record<string, unknown>;

      const screen = render(LimboResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(result.toFixed(2) + 'x')).toBeInTheDocument();
    }
  );
});

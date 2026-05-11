import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import DiamondsResult from '$lib/games/diamonds/DiamondsResult.svelte';
import testcases from '../testcases/diamonds.json';

describe('DiamondsResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, gems }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
      } as Record<string, unknown>;

      const screen = render(DiamondsResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('diamonds-result');
      expect(el).toHaveTextContent(gems.join(','));
    }
  );
});

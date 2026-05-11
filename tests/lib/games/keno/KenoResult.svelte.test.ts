import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import KenoResult from '$lib/games/keno/KenoResult.svelte';
import testcases from '../testcases/keno.json';

describe('KenoResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, numbers }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'keno',
      } as Record<string, unknown>;

      const screen = render(KenoResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('keno-result');
      expect(el).toHaveTextContent(numbers.join(', '));
    }
  );
});

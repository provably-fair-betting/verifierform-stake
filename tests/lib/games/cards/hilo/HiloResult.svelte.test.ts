import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import HiloResult from '$lib/games/cards/hilo/HiloResult.svelte';
import testcases from '../../testcases/hilo.json';

describe('HiloResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, cards }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'hilo',
      } as Record<string, unknown>;

      const screen = render(HiloResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('hilo-result');
      expect(el).toHaveTextContent(cards.join(','));
    }
  );
});

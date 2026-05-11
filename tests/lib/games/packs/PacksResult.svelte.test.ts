import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import PacksResult from '$lib/games/packs/PacksResult.svelte';
import testcases from '../testcases/packs.json';

describe('PacksResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, cardIds }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'packs',
      } as Record<string, unknown>;

      const screen = render(PacksResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('packs-result');
      expect(el).toHaveTextContent([...cardIds].sort((a, b) => a - b).join(','));
    }
  );
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import BaccaratResult from '$lib/games/cards/baccarat/BaccaratResult.svelte';
import testcases from '../../testcases/baccarat.json';

describe('BaccaratResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, playerCards, dealerCards, deciderCards }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'baccarat',
      } as Record<string, unknown>;

      const screen = render(BaccaratResult, { formValues });
      vi.advanceTimersByTime(350);

      const player = await screen.findByTestId('baccarat-player-result');
      expect(player).toHaveTextContent(playerCards.join(','));
      const dealer = screen.getByTestId('baccarat-dealer-result');
      expect(dealer).toHaveTextContent(dealerCards.join(','));
      const decider = screen.getByTestId('baccarat-decider-result');
      expect(decider).toHaveTextContent(deciderCards.join(','));
    }
  );
});

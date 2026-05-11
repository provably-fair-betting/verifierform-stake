import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import BlackjackResult from '$lib/games/cards/blackjack/BlackjackResult.svelte';
import testcases from '../../testcases/blackjack.json';

describe('BlackjackResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, playerCards, dealerCards, remainingCards }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'blackjack',
      } as Record<string, unknown>;

      const screen = render(BlackjackResult, { formValues });
      vi.advanceTimersByTime(350);

      const player = await screen.findByTestId('blackjack-player-result');
      expect(player).toHaveTextContent(playerCards.join(','));
      const dealer = screen.getByTestId('blackjack-dealer-result');
      expect(dealer).toHaveTextContent(dealerCards.join(','));
      const remaining = screen.getByTestId('blackjack-remaining-result');
      expect(remaining).toHaveTextContent(remainingCards.join(','));
    }
  );
});

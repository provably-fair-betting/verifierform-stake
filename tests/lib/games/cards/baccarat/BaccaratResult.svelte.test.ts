import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import BaccaratResult from '$lib/games/cards/baccarat/BaccaratResult.svelte';

describe('BaccaratResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      20,
      'A-diamond, Q-club',
      '4-heart, 9-spade',
      '8-club, J-club',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      21,
      '2-diamond, J-heart',
      'Q-heart, A-club',
      'Q-diamond, 8-club',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      22,
      'J-heart, Q-heart',
      '8-spade, 4-heart',
      'Q-spade, 7-club',
    ],
  ])(
    'renders the correct results (clientseed=%s, serverseed=%s, nonce=%s, initialPlayer=%s, initialBanker=%s, decider=%s)',
    async (
      clientseed,
      serverseed,
      nonce,
      initialPlayerResult,
      initialBankerResult,
      deciderResult
    ) => {
      const formValues = {
        nonce,
        clientseed,
        serverseed,
        game: 'baccarat',
      } as Record<string, unknown>;

      const screen = render(BaccaratResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(initialPlayerResult)).toBeInTheDocument();
      expect(screen.getByText(initialBankerResult)).toBeInTheDocument();
      expect(screen.getByText(deciderResult)).toBeInTheDocument();
    }
  );
});

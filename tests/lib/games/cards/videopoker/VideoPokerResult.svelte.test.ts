import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import VideoPokerResult from '$lib/games/cards/videopoker/VideoPokerResult.svelte';

describe('VideoPokerResult', () => {
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
      'A-diamond, Q-spade, 4-heart, 9-heart, 8-spade',
      'J-club, 3-heart, 2-spade, 4-diamond, 2-diamond',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      21,
      '2-diamond, J-heart, Q-spade, A-club, J-club',
      '8-heart, 6-club, Q-diamond, 6-spade, 10-club',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      22,
      'J-heart, Q-heart, 8-heart, 4-heart, Q-club',
      '7-heart, 3-club, K-club, 5-spade, 2-diamond',
    ],
  ])(
    'renders the correct results (clientseed=%s, serverseed=%s, nonce=%s, initial=%s, coming=%s)',
    async (clientseed, serverseed, nonce, initialResult, comingResult) => {
      const formValues = {
        nonce,
        clientseed,
        serverseed,
        game: 'videopoker',
      } as Record<string, unknown>;

      const screen = render(VideoPokerResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(initialResult)).toBeInTheDocument();
      expect(screen.getByText(comingResult)).toBeInTheDocument();
    }
  );
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import VideoPokerResult from '$lib/games/cards/videopoker/VideoPokerResult.svelte';
import testcases from '../../testcases/videopoker.json';

describe('VideoPokerResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, initialHand, comingHand }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'videopoker',
      } as Record<string, unknown>;

      const screen = render(VideoPokerResult, { formValues });
      vi.advanceTimersByTime(350);

      const initial = await screen.findByTestId('videopoker-initial-result');
      expect(initial).toHaveTextContent(initialHand.join(','));
      const coming = screen.getByTestId('videopoker-coming-result');
      expect(coming).toHaveTextContent(comingHand.join(','));
    }
  );
});

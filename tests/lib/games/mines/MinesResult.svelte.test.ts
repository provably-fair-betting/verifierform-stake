import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import MinesResult from '$lib/games/mines/MinesResult.svelte';

describe('MinesResult', () => {
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
      '1, 2, 3, 5, 6, 13, 14, 19, 20, 21, 24',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      21,
      '1, 2, 8, 9, 12, 16, 18, 19, 20, 21, 25',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      22,
      '1, 4, 5, 6, 7, 10, 12, 18, 20, 22, 24',
    ],
  ])(
    'renders the correct results (clientseed=%s, serverseed=%s, nonce=%s, result=%s)',
    async (clientseed, serverseed, nonce, result) => {
      const formValues = {
        nonce,
        clientseed,
        serverseed,
        mines: 11,
        game: 'mines',
      } as Record<string, unknown>;

      const screen = render(MinesResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(result)).toBeInTheDocument();
    }
  );
});

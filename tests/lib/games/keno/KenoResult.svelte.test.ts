import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import KenoResult from '$lib/games/keno/KenoResult.svelte';

describe('KenoResult', () => {
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
      '1, 2, 5, 7, 8, 21, 23, 30, 33, 38',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      21,
      '1, 14, 15, 20, 27, 29, 30, 31, 33, 40',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      22,
      '1, 6, 7, 11, 17, 20, 29, 32, 34, 37',
    ],
  ])(
    'renders the correct results (clientseed=%s, serverseed=%s, nonce=%s, result=%s)',
    async (clientseed, serverseed, nonce, result) => {
      const formValues = {
        nonce,
        clientseed,
        serverseed,
        game: 'keno',
      } as Record<string, unknown>;

      const screen = render(KenoResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(result)).toBeInTheDocument();
    }
  );
});

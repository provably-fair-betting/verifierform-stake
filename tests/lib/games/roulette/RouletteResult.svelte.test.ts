import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import RouletteResult from '$lib/games/roulette/RouletteResult.svelte';

describe('RouletteResult', () => {
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
      '34',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      21,
      '0',
    ],
    [
      'ec75fca98de6f2d9',
      '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      22,
      '26',
    ],
  ])(
    'renders the correct results (clientseed=%s, serverseed=%s, nonce=%s, result=%s)',
    async (clientseed, serverseed, nonce, result) => {
      const formValues = {
        nonce,
        clientseed,
        serverseed,
        game: 'roulette',
      } as Record<string, unknown>;

      const screen = render(RouletteResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(result, { selector: 'span' })).toBeInTheDocument();
    }
  );
});

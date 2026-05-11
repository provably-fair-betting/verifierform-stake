import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import BarsResult from '$lib/games/bars/BarsResult.svelte';
import testcases from '../testcases/bars.json';

describe('BarsResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.barsDifficulty tiles=$selects.barsTilesCount',
    async ({ clientSeed, serverSeed, nonce, selects, multipliers }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.barsDifficulty,
        barcount: Number(selects.barsTilesCount),
      } as Record<string, unknown>;

      const screen = render(BarsResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('bars-result');
      const actual = JSON.parse(el.textContent!) as number[];
      expect(actual).toHaveLength(multipliers.length);
      const trunc2dp = (v: number) => Math.floor(v * 100) / 100;
      actual.forEach((value, i) => expect(trunc2dp(value)).toBe(multipliers[i]));
    }
  );
});

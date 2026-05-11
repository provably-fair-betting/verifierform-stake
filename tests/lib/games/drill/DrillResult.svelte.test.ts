import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import DrillResult from '$lib/games/drill/DrillResult.svelte';
import testcases from '../testcases/drill.json';

describe('DrillResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, multipliers }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'drill',
      } as Record<string, unknown>;

      const screen = render(DrillResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('drill-result');
      const actual = (JSON.parse(el.textContent!) as number[]).map(
        (m) => Math.floor(m * 100) / 100
      );
      expect(actual).toEqual(multipliers);
    }
  );
});

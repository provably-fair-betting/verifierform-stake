import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import DragonTowerResult from '$lib/games/dragontower/DragonTowerResult.svelte';
import testcases from '../testcases/dragontower.json';

describe('DragonTowerResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.dragonTowerDifficulty',
    async ({ clientSeed, serverSeed, nonce, selects, eggPositionsByRound }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.dragonTowerDifficulty,
        game: 'dragontower',
      } as Record<string, unknown>;

      const screen = render(DragonTowerResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('dragontower-result');
      expect(JSON.parse(el.textContent!)).toEqual(eggPositionsByRound);
    }
  );
});

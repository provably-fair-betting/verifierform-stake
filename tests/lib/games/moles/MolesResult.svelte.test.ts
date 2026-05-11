import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import MolesResult from '$lib/games/moles/MolesResult.svelte';
import testcases from '../testcases/moles.json';

describe('MolesResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed molesCount=$selects.molesCount',
    async ({ clientSeed, serverSeed, nonce, selects, molePositionsByRound }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        molescount: Number(selects.molesCount),
        game: 'moles',
      } as Record<string, unknown>;

      const screen = render(MolesResult, { formValues });
      vi.advanceTimersByTime(350);

      const el = await screen.findByTestId('moles-result');
      const actual = JSON.parse(el.textContent!) as number[][];

      const sort = (rounds: number[][]) => rounds.map((r) => [...r].sort((a, b) => a - b));
      expect(sort(actual)).toEqual(sort(molePositionsByRound));
    }
  );
});

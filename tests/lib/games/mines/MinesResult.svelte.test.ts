import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import MinesResult from '$lib/games/mines/MinesResult.svelte';
import testcases from '../testcases/mines.json';

describe('MinesResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed minesCount=$selects.minesCount',
    async ({ clientSeed, serverSeed, nonce, selects, minePositions }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        mines: Number(selects.minesCount),
        game: 'mines',
      } as Record<string, unknown>;

      const screen = render(MinesResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('mines-result');
      expect(el).toHaveTextContent(minePositions.map((p) => p + 1).join(','));
    }
  );
});

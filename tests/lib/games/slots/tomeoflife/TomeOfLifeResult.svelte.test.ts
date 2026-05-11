import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import TomeOfLifeResult from '$lib/games/slots/tomeoflife/TomeOfLifeResult.svelte';
import testcases from '../../testcases/tome-of-life.json';

type SlotRound = { centerPositions: { index: number }[]; totalRounds: number; retrigger: boolean };

describe('TomeOfLifeResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed category=$category',
    async ({ clientSeed, serverSeed, nonce, rounds }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
      } as Record<string, unknown>;

      const screen = render(TomeOfLifeResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('slots-result');
      const actual = JSON.parse(el.textContent!) as SlotRound[];

      expect(actual).toHaveLength(rounds.length);
      actual.forEach((round, i) => {
        expect(round.centerPositions.map((cp) => cp.index)).toEqual(rounds[i].centerIndices);
        expect(round.retrigger).toBe(rounds[i].triggersBonus);
        expect(round.totalRounds).toBe(rounds[i].totalRounds);
      });
    }
  );
});

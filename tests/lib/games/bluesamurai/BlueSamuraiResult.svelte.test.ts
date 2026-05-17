import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import BlueSamuraiResult from '$lib/games/bluesamurai/BlueSamuraiResult.svelte';
import testcases from '../testcases/blue-samurai.json';

type BlueSamuraiRound = {
  retrigger: boolean;
  specialRound: boolean;
  bonusSpin: number;
  totalBonusRounds: number;
  stuckSamurais?: number[];
  newlyLockedSamurais?: number[];
  symbols: { float: number }[];
};

describe('BlueSamuraiResult', () => {
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

      const screen = render(BlueSamuraiResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('bluesamurai-result');
      const actual = JSON.parse(el.textContent!) as BlueSamuraiRound[];

      expect(actual).toHaveLength(rounds.length);
      actual.forEach((round, i) => {
        expect(round.retrigger).toBe(rounds[i].retrigger);
        expect(round.specialRound).toBe(rounds[i].specialRound);
        expect(round.bonusSpin).toBe(rounds[i].bonusSpin);
        expect(round.totalBonusRounds).toBe(rounds[i].totalBonusRounds);
        expect(round.symbols.map((s) => s.float).filter((f) => f !== undefined)).toEqual(
          rounds[i].floatColumns.flat()
        );
        const sort = (a: number[]) => [...a].sort((x, y) => x - y);
        expect(sort(round.stuckSamurais ?? [])).toEqual(sort(rounds[i].lockedSamuraiIndices));
        expect(sort(round.newlyLockedSamurais ?? [])).toEqual(
          sort(rounds[i].newlyLockedSamuraiIndices)
        );
      });
    }
  );
});

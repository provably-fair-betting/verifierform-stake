import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import CasesResult from '$lib/games/cases/CasesResult.svelte';
import testcases from '../testcases/cases.json';

describe('CasesResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed difficulty=$selects.casesDifficulty expectedResult=$result',
    async ({ clientSeed, serverSeed, nonce, selects, result }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        difficulty: selects.casesDifficulty,
        game: 'cases',
      } as Record<string, unknown>;

      const screen = render(CasesResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('cases-result');
      expect(el).toHaveTextContent(Number(result).toFixed(2) + 'x');
    }
  );
});

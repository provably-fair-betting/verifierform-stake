import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import PlinkoResult from '$lib/games/plinko/PlinkoResult.svelte';
import testcases from '../testcases/plinko.json';

describe('PlinkoResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed risk=$selects.plinkoRisk rows=$selects.plinkoRow expectedResult=$result',
    async ({ clientSeed, serverSeed, nonce, selects, result }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        risk: selects.plinkoRisk,
        rows: Number(selects.plinkoRow),
        game: 'plinko',
      } as Record<string, unknown>;

      const screen = render(PlinkoResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('plinko-result');
      expect(el).toHaveTextContent(result + 'x');
    }
  );
});

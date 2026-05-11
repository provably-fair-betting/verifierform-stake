import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import CrashResult from '$lib/games/multiplayer/crash/CrashResult.svelte';
import testcases from '../../testcases/crash.json';

describe('CrashResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'hash=$inputs.hash seed=$inputs.seed expectedResult=$result',
    async ({ inputs, result }) => {
      const formValues = {
        gamehash: inputs.hash,
        blockhash: inputs.seed,
        game: 'crash',
      } as Record<string, unknown>;

      const screen = render(CrashResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('crash-result');
      expect(el).toHaveTextContent(result.toFixed(2) + 'x');
    }
  );
});

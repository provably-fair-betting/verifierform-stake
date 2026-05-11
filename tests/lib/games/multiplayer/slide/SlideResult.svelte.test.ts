import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import SlideResult from '$lib/games/multiplayer/slide/SlideResult.svelte';
import testcases from '../../testcases/slide.json';

describe('SlideResult', () => {
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
        slidehash: inputs.hash,
        blockhash: inputs.seed,
        game: 'slide',
      } as Record<string, unknown>;

      const screen = render(SlideResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('slide-result');
      expect(el).toHaveTextContent(result.toFixed(2) + 'x');
    }
  );
});

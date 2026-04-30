import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import SlideResult from '$lib/games/multiplayer/slide/SlideResult.svelte';
import { SLIDE_SEEDS } from '$lib/games/multiplayer/multiplayer.config';

describe('SlideResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    ['9e6551f40e1f3c6ccda442b5af676c68c8ab019031cb60b46239a174874e6033', '8.65x'],
    ['03efcc43c56d7a1bf0f77bc13d55f93c50889eca19f29d1acb985fe78fc329eb', '21.93x'],
    ['3639a5f3f1d3a843b1e5a89014730548ef7ef086b6a234b0f141a8e4ad082990', '126.10x'],
  ])(
    'renders the correct results (slidehash=%s, slideStopPoint=%s)',
    async (slidehash, slideStopPoint) => {
      const formValues = {
        slidehash,
        blockhash: SLIDE_SEEDS[1],
        game: 'slide',
      } as Record<string, unknown>;

      const screen = render(SlideResult, { formValues });
      vi.advanceTimersByTime(350);
      expect(await screen.findByText(slideStopPoint)).toBeInTheDocument();
    }
  );
});

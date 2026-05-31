import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import ZooResult from '$lib/games/multiplayer/zoo/ZooResult.svelte';
import testcases from '../../testcases/zoo.json';

describe('ZooResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'hash=$inputs.hash seed=$inputs.seed expectedAnimals=$animals',
    async ({ inputs, animals }) => {
      const formValues = {
        hash: inputs.hash,
        seed: inputs.seed,
      } as Record<string, unknown>;

      const screen = render(ZooResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('zoo-result');

      for (const animal of animals) {
        expect(el).toHaveTextContent(animal);
      }
    }
  );
});

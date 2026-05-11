import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import FlipResult from '$lib/games/flip/FlipResult.svelte';
import testcases from '../testcases/flip.json';

describe('FlipResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed',
    async ({ clientSeed, serverSeed, nonce, values }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        game: 'flip',
      } as Record<string, unknown>;

      const screen = render(FlipResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('flip-result');
      expect(el).toHaveTextContent(values.join(', '));
    }
  );
});

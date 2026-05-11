import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import WheelResult from '$lib/games/wheel/WheelResult.svelte';
import testcases from '../testcases/wheel.json';

describe('WheelResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(testcases)(
    'nonce=$nonce clientSeed=$clientSeed serverSeed=$serverSeed risk=$selects.wheelRisk segments=$selects.wheelSegments expectedResult=$result',
    async ({ clientSeed, serverSeed, nonce, selects, result }) => {
      const formValues = {
        nonce,
        clientseed: clientSeed,
        serverseed: serverSeed,
        risk: selects.wheelRisk,
        segments: Number(selects.wheelSegments),
      } as Record<string, unknown>;

      const screen = render(WheelResult, { formValues });
      vi.advanceTimersByTime(350);
      const el = await screen.findByTestId('wheel-result');
      expect(el).toHaveTextContent(result + 'x');
    }
  );
});

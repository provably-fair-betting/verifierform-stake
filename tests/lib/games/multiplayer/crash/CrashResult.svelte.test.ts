import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import CrashResult from '$lib/games/multiplayer/crash/CrashResult.svelte';

describe('CrashResult', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    ['d8276461230081da5d9e251397b511bbf792725786c3d9c79b386c665cbba63f', '1.18x'],
    ['f5f701298a1d235ab65ce7337d744c43a4b5afd32386a83e9268af8590bdea6c', '32.85x'],
    ['663691dfddeffa7527b14a607e17d176830944cc35aa30030415a81fc9551423', '227.28x'],
  ])('renders the correct results (gamehash=%s, crashPoint=%s)', async (gamehash, crashPoint) => {
    const formValues = {
      gamehash,
      game: 'crash',
    } as Record<string, unknown>;

    const screen = render(CrashResult, { formValues });
    vi.advanceTimersByTime(350);
    expect(await screen.findByText(crashPoint)).toBeInTheDocument();
  });
});

import type { PumpDifficulty } from '$lib/types';

/**
 * Pump Game Configuration
 *
 * Maps difficulty levels to slice counts.
 * Higher difficulty = more slices = higher precision required.
 */
export const PUMP_DIFFICULTY_TO_SLICE: Record<PumpDifficulty, number> = {
  easy: 1,
  medium: 3,
  hard: 5,
  expert: 10,
};

import type { ChickenDifficulty } from '$lib/types';

/**
 * Chicken Game Configuration
 *
 * Maps difficulty levels to slice counts.
 * Higher difficulty = more slices = higher precision required.
 */
export const CHICKEN_DIFFICULTY_TO_SLICE: Record<ChickenDifficulty, number> = {
  easy: 1,
  medium: 3,
  hard: 5,
  expert: 10,
};

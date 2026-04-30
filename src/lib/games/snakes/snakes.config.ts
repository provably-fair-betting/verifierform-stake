import type { SnakesDifficulty } from '$lib/types';

/**
 * Snakes Game Configuration
 *
 * Maps multiplier shifts for different difficulty levels.
 * The key is the base multiplier, the value is the adjusted multiplier.
 */
export const SNAKES_MULTIPLIER_SHIFT_MAP: Record<SnakesDifficulty, { [multi: number]: number }> = {
  easy: { 1.01: 1.08 },
  medium: { 1.11: 1.2 },
  hard: { 1.38: 1.5 },
  expert: { 3.82: 4 },
  master: { 17.64: 18 },
};

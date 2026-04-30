import type { DragonTowerDifficulty, DragonTowerDifficultyConfig } from '$lib/types';

/**
 * Dragon Tower Game Configuration
 *
 * Defines the number of safe spots (count) and grid size for each difficulty level.
 * Higher difficulty = fewer safe spots = higher risk.
 */
export const DRAGON_TOWER_LEVEL_MAP: Record<DragonTowerDifficulty, DragonTowerDifficultyConfig> = {
  easy: { count: 3, size: 4 },
  medium: { count: 2, size: 3 },
  hard: { count: 1, size: 2 },
  expert: { count: 1, size: 3 },
  master: { count: 1, size: 4 },
};

import type { Seed } from '$lib/types';

export interface DragonTowerDifficultyConfig {
  count: number;
  size: number;
}

export enum DragonTowerDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
  MASTER = 'master',
}

export interface DragonTowerSeed extends Seed {
  difficulty: DragonTowerDifficulty;
}

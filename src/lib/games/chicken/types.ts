import type { Seed } from '$lib/types';

export enum ChickenDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface ChickenSeed extends Seed {
  difficulty: ChickenDifficulty;
}

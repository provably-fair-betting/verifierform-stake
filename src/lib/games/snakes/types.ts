import type { Seed } from '$lib/types';

export enum SnakesDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
  MASTER = 'master',
}

export interface SnakesSeed extends Seed {
  difficulty: SnakesDifficulty;
}

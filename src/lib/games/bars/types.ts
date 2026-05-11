import type { Seed } from '$lib/types';

export enum BarsDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface BarsSeed extends Seed {
  difficulty: BarsDifficulty;
  barCount: number;
  selectedBars?: string;
}

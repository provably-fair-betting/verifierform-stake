import type { Seed } from '$lib/types';

export enum CasesDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface CasesSeed extends Seed {
  difficulty: CasesDifficulty;
}

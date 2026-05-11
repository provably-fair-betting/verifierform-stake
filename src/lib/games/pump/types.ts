import type { Seed } from '$lib/types';

export enum PumpDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface PumpSeed extends Seed {
  difficulty: PumpDifficulty;
}

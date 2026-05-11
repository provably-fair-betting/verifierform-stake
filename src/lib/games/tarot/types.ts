import type { Seed } from '$lib/types';

export enum TarotDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface TarotSeed extends Seed {
  difficulty: TarotDifficulty;
}

export type TarotCard = {
  min: number;
  multiplier: number;
};

export enum TarotArcanaType {
  MINOR = 'minor',
  MAJOR = 'major',
}

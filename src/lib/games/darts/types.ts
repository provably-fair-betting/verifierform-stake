import type { Seed } from '$lib/types';

export enum DartsDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export enum DartsColor {
  GREEN = '#24e700',
  RED = '#fb053f',
  YELLOW = '#fcc101',
  ORANGE = '#fb6120',
  LIGHT_GRAY = '#213843',
  DARK_GRAY = '#0e202c',
}

export interface DartsSeed extends Seed {
  difficulty: DartsDifficulty;
}

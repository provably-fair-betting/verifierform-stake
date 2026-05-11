import type { Seed, Risk } from '$lib/types';

export enum Direction {
  LEFT = 'L',
  RIGHT = 'R',
}

export interface PlinkoSeed extends Seed {
  risk: Risk;
  rows: number;
}

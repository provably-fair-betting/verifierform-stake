import type { Seed, Risk } from '$lib/types';

export interface WheelSeed extends Seed {
  risk: Risk;
  segments: number;
}

import type { OrderedSet } from 'immutable';
import type bigDecimal from 'js-big-decimal';

export enum BlueSamuraiRetriggerType {
  SPECIAL = 'special',
  BONUS = 'bonus',
}

export enum BlueSamuraiReelType {
  INNER = 'inner',
  OUTER = 'outer',
}

export enum BlueSamuraiIcon {
  S1 = 's1',
  S2 = 's2',
  S3 = 's3',
  S4 = 's4',
  S5 = 's5',
  S6 = 's6',
  S7 = 's7',
  S8 = 's8',
  S9 = 's9',
  SCATTER = 'scatter',
  SAMURAI = 'samurai',
  WILD = 'wild',
}

export interface BlueSamuraiSymbol {
  index: number;
  float?: number;
  min?: bigDecimal;
  max?: bigDecimal;
  icon: BlueSamuraiIcon;
  reelType: BlueSamuraiReelType;
}

export interface BlueSamuraiRound {
  retrigger: boolean;
  retriggerType?: BlueSamuraiRetriggerType;
  round: number;
  specialRound: boolean;
  specialSpin?: number;
  stuckSamurais?: OrderedSet<number>;
  newlyLockedSamurais?: OrderedSet<number>;
  symbols: BlueSamuraiSymbol[];
  bonusSpin: number;
  totalBonusRounds: number;
}

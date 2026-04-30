import type { OrderedSet } from 'immutable';
import type bigDecimal from 'js-big-decimal';

export interface MinesSeed extends Seed {
  mines: number;
}

export enum Direction {
  LEFT = 'L',
  RIGHT = 'R',
}

export type Risk = 'low' | 'medium' | 'high';

export enum BlueSamuraiRetriggerType {
  SPECIAL = 'special',
  BONUS = 'bonus',
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

export interface BlueSamuraiSymbol {
  index: number;
  float?: number;
  min?: bigDecimal;
  max?: bigDecimal;
  icon: BlueSamuraiIcon;
  reelType: BlueSamuraiReelType;
}

export enum IndicatorPosition {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
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

export enum ScarabSpinsTomeOfLifeIcon {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  NINE = 'nine',
  TEN = 'ten',
  JACK = 'jack',
  QUEEN = 'queen',
  KING = 'king',
  ACE = 'ace',
  WILD = 'wild',
  SCATTER = 'scatter',
}

export interface ScarabSpinsTomeOfLifeRound {
  retrigger: boolean;
  totalRounds: number;
  centerPositions: {
    float: number;
    index: number;
  }[];
}

export enum CoinFlip {
  HEAD = 'heads',
  TAIL = 'tails',
}

export enum DartsColor {
  GREEN = '#24e700',
  RED = '#fb053f',
  YELLOW = '#fcc101',
  ORANGE = '#fb6120',
  LIGHT_GRAY = '#213843',
  DARK_GRAY = '#0e202c',
}

export enum DartsDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface DartsSeed extends Seed {
  difficulty: DartsDifficulty;
}

export enum CasesDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface CasesSeed extends Seed {
  difficulty: CasesDifficulty;
}

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

export enum PumpDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface PumpSeed extends Seed {
  difficulty: PumpDifficulty;
}

export enum ChickenDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export interface ChickenSeed extends Seed {
  difficulty: ChickenDifficulty;
}

export interface DragonTowerDifficultyConfig {
  count: number;
  size: number;
}

export enum DragonTowerDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
  MASTER = 'master',
}

export interface DragonTowerSeed extends Seed {
  difficulty: DragonTowerDifficulty;
}

export interface PlinkoSeed extends Seed {
  risk: Risk;
  rows: number;
}

export interface WheelSeed extends Seed {
  risk: Risk;
  segments: number;
}

export interface Seed {
  clientSeed: string;
  serverSeed: string;
  nonce: number;
  cursor?: number;
}

export interface CrashSeed {
  gameHash: string;
}

export interface SlideSeed {
  slideHash: string;
  blockHash: string;
}

export interface FloatExplanationStepProps {
  stepNumber: number;
  resultIndex: number;
  float: number;
  seed: Seed;
  hideStepNumber?: boolean;
  contentBlockClassName?: string;
}

export type Item<T> = Omit<FisherYatesItem<T>, 'chosenIndexes'>;

export interface FisherYatesItem<T> {
  chosen: T;
  chosenIndex: number;
  chosenIndexes: number[];
  float: number;
}

export type CrashIntGenerationStepProps = IntGenerationStepProps<CrashSeed>;
export type SlideIntGenerationStepProps = IntGenerationStepProps<SlideSeed>;

interface IntGenerationStepProps<T> {
  stepNumber: number;
  seed: T;
  hmac: string;
}

export enum CardSuit {
  DIAMOND = 'diamond',
  HEART = 'heart',
  SPADE = 'spade',
  CLUB = 'club',
}

export enum Gem {
  GREEN = 'green',
  PURPLE = 'purple',
  YELLOW = 'yellow',
  RED = 'red',
  CYAN = 'cyan',
  PINK = 'pink',
  BLUE = 'blue',
}

export type Card = {
  suit: CardSuit;
  value: string;
};

export enum RockPaperScissorsOutcome {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors',
}

export type RGB = [number, number, number];

export type PacksCard = {
  cardId: number;
  min: number;
  multiplier: number;
};

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

// Drill
export interface DrillResult {
  float: number;
  multiplier: number;
  drillIndex: number;
}

// Moles
export interface MolesSeed extends Seed {
  molesCount: number;
}

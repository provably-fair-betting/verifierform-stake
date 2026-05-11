export interface Seed {
  clientSeed: string;
  serverSeed: string;
  nonce: number;
  cursor?: number;
}

export type Risk = 'low' | 'medium' | 'high';

export enum IndicatorPosition {
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
}

export type Item<T> = Omit<FisherYatesItem<T>, 'chosenIndexes'>;

export interface FisherYatesItem<T> {
  chosen: T;
  chosenIndex: number;
  chosenIndexes: number[];
  float: number;
}

export interface FloatExplanationStepProps {
  stepNumber: number;
  resultIndex: number;
  float: number;
  seed: Seed;
  hideStepNumber?: boolean;
  contentBlockClassName?: string;
}

export type RGB = [number, number, number];

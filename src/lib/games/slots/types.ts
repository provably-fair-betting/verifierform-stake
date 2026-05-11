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

export enum CardSuit {
  DIAMOND = 'diamond',
  HEART = 'heart',
  SPADE = 'spade',
  CLUB = 'club',
}

export type Card = {
  suit: CardSuit;
  value: string;
};

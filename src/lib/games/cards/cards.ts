import { CardSuit, type Card } from '$lib/types';

export type CardColor = {
  bg: string;
  border: string;
  ring: string;
  text: string;
  resultBorder: string;
  resultBg: string;
  label: string;
  unselected?: string;
};

export const CARD_COLOR_BLUE: CardColor = {
  bg: 'bg-blue-100 dark:bg-blue-900/30',
  border: 'border-blue-500 dark:border-blue-400',
  ring: 'ring-blue-500 dark:ring-blue-400',
  text: 'text-blue-600 dark:text-blue-400',
  resultBorder: 'border-blue-500 dark:border-blue-400',
  resultBg: 'bg-blue-50 dark:bg-blue-900/20',
  label: 'blue',
  unselected:
    'border-blue-400 dark:border-blue-700 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40',
};

export const CARD_COLOR_GREEN: CardColor = {
  bg: 'bg-green-100 dark:bg-green-900/30',
  border: 'border-green-500 dark:border-green-400',
  ring: 'ring-green-500 dark:ring-green-400',
  text: 'text-green-600 dark:text-green-400',
  resultBorder: 'border-green-500 dark:border-green-400',
  resultBg: 'bg-green-50 dark:bg-green-900/20',
  label: 'green',
  unselected:
    'border-green-400 dark:border-green-700 bg-green-100 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40',
};

export const CARD_COLOR_PURPLE: CardColor = {
  bg: 'bg-purple-100 dark:bg-purple-900/30',
  border: 'border-purple-500 dark:border-purple-400',
  ring: 'ring-purple-500 dark:ring-purple-400',
  text: 'text-purple-600 dark:text-purple-400',
  resultBorder: 'border-purple-500 dark:border-purple-400',
  resultBg: 'bg-purple-50 dark:bg-purple-900/20',
  label: 'purple',
  unselected:
    'border-purple-400 dark:border-purple-700 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40',
};

const TAB_BASE =
  'p-1.5 rounded border transition-all flex flex-col items-center justify-center min-w-0 ';

/** Returns the color scheme for a given card index and game type. */
export function getCardColor(
  index: number,
  colorScheme: 'baccarat' | 'blackjack' | 'hilo'
): CardColor {
  if (colorScheme === 'hilo') return CARD_COLOR_BLUE;
  // baccarat: 0-1 blue (player), 2-3 green (banker), 4-5 purple (decider)
  // blackjack: 0-1 blue (first two), 2-3 green (second two), rest purple
  if (index < 2) return CARD_COLOR_BLUE;
  if (index < 4) return CARD_COLOR_GREEN;
  return CARD_COLOR_PURPLE;
}

/** Tab class for an unselected card tab. */
export function getCardTabClass(color: CardColor): string {
  return (
    TAB_BASE +
    `${color.unselected} !outline-none !ring-0 text-gray-500 dark:text-gray-400 opacity-70`
  );
}

/** Tab class for a selected card tab. */
export function getCardTabSelectedClass(color: CardColor): string {
  return (
    TAB_BASE +
    `${color.border} ${color.bg} font-bold !ring-2 ${color.ring} shadow-lg z-10 opacity-100 ` +
    `!outline-none focus:!ring-2 focus:${color.ring} text-gray-600 dark:text-gray-400`
  );
}

/** Tab name markup — shows the card's position index. */
export function getCardTabName(n: number): string {
  return `<span class="text-[11px] text-gray-500 dark:text-gray-400 block">${n}</span>`;
}

/** VideoPoker color for a given card index (0-4 = initial/blue, 5+ = coming/green). */
export function getVideoPokerColor(index: number): CardColor {
  return index < 5 ? CARD_COLOR_BLUE : CARD_COLOR_GREEN;
}

const VP_UNSELECTED_BLUE =
  'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40';
const VP_UNSELECTED_GREEN =
  'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40';
const VP_SELECTED_BLUE =
  'border-blue-500 dark:border-blue-400 bg-blue-100 dark:bg-blue-900/30 ring-blue-500 dark:ring-blue-400 focus:ring-blue-500';
const VP_SELECTED_GREEN =
  'border-green-500 dark:border-green-400 bg-green-100 dark:bg-green-900/30 ring-green-500 dark:ring-green-400 focus:ring-green-500';

/** Tab class for an unselected VideoPoker card tab. */
export function getVideoPokerTabClass(index: number): string {
  const unselected = index < 5 ? VP_UNSELECTED_BLUE : VP_UNSELECTED_GREEN;
  return (
    TAB_BASE + `${unselected} !outline-none !ring-0 text-gray-500 dark:text-gray-400 opacity-70`
  );
}

/** Tab class for a selected VideoPoker card tab. */
export function getVideoPokerTabSelectedClass(index: number): string {
  const selected = index < 5 ? VP_SELECTED_BLUE : VP_SELECTED_GREEN;
  return (
    TAB_BASE +
    `${selected} font-bold !ring-2 shadow-lg z-10 opacity-100 ` +
    `!outline-none focus:!ring-2 text-gray-600 dark:text-gray-400`
  );
}

export function generateCardDeck(): Card[] {
  const cards: Card[] = [];
  const suits = [CardSuit.DIAMOND, CardSuit.HEART, CardSuit.SPADE, CardSuit.CLUB];
  for (let value = 2; value <= 10; value++) {
    for (const suit of suits) {
      cards.push({ suit, value: '' + value });
    }
  }
  const high = ['J', 'Q', 'K', 'A'];
  for (const value of high) {
    for (const suit of suits) {
      cards.push({ suit, value });
    }
  }
  return cards;
}

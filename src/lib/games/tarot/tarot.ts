import paylines from '$lib/games/tarot/tarot-paylines.json';
import type { TarotCard, TarotDifficulty, TarotArcanaType } from './types';

export function findCard(
  value: number,
  difficulty: TarotDifficulty,
  arcanaType: TarotArcanaType
): TarotCard | null {
  const cards = paylines[arcanaType][difficulty];

  for (const entry of cards) {
    if (value >= entry.min) {
      return entry;
    }
  }
  return null;
}

export function getCards(difficulty: TarotDifficulty, arcanaType: TarotArcanaType): TarotCard[] {
  return paylines[arcanaType][difficulty];
}

/** Tab class for an unselected tarot card tab in ResultTabs (index-based coloring). */
export function getTarotTabClass(index: number): string {
  const isMiddleCard = index === 1; // Card 2 (index 1) is the gold one
  return isMiddleCard
    ? 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-yellow-300 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none'
    : 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-gray-400 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none';
}

/** Tab class for the selected tarot card tab in ResultTabs (index-based coloring). */
export function getTarotTabSelectedClass(index: number): string {
  const isMiddleCard = index === 1; // Card 2 (index 1) is the gold/yellow one
  return isMiddleCard
    ? 'rounded border-2 border-yellow-500 bg-yellow-100 font-bold text-yellow-700 opacity-100 shadow-lg ring-2 ring-yellow-400 z-10 dark:border-yellow-400 dark:bg-yellow-900/30 dark:text-yellow-400 dark:ring-yellow-400 !outline-none'
    : 'rounded border-2 border-gray-400 bg-gray-200 font-bold text-gray-700 opacity-100 shadow-lg ring-2 ring-gray-400 z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-500 !outline-none';
}

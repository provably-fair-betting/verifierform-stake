import type { DragonTowerDifficulty } from '$lib/types';

export const DRAGON_TOWER_COL_CLASS: Record<DragonTowerDifficulty, string> = {
  easy: 'grid-cols-4',
  medium: 'grid-cols-3',
  hard: 'grid-cols-2',
  expert: 'grid-cols-3',
  master: 'grid-cols-4',
};

// Tab styling
type DragonTowerTabColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

// Eggs are green (safe), alternate levels with different shades for visual grouping
const DRAGON_TOWER_COLORS: DragonTowerTabColors[] = [
  {
    // Even levels (lighter green)
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-400 dark:border-green-500',
    ring: 'ring-green-500 dark:ring-green-400',
    text: 'text-green-700 dark:text-green-400',
  },
  {
    // Odd levels (darker green)
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-500 dark:border-green-400',
    ring: 'ring-green-600 dark:ring-green-300',
    text: 'text-green-800 dark:text-green-300',
  },
];

const TAB_BASE =
  'p-1.5 rounded border-2 transition-all flex flex-col items-center justify-center min-w-0 !outline-none';

function getDragonTowerColors(level: number): DragonTowerTabColors {
  const isEvenLevel = level % 2 === 0;
  return DRAGON_TOWER_COLORS[isEvenLevel ? 0 : 1];
}

export function getDragonTowerTabClass(level: number): string {
  const { border, bg, text } = getDragonTowerColors(level);
  return `${TAB_BASE} ${border} ${bg} ${text} !ring-0 opacity-70`;
}

export function getDragonTowerTabSelectedClass(level: number): string {
  const { border, bg, ring, text } = getDragonTowerColors(level);
  return `${TAB_BASE} ${border} ${bg} ${text} font-bold !ring-2 ${ring} shadow-lg z-10 opacity-100 focus:!ring-2 focus:${ring}`;
}

import cards from '$lib/games/packs/packs-payline.json';
import type { PacksCard } from './types';

export function findCard(value: number): PacksCard | null {
  for (const entry of cards) {
    if (value >= entry.min) {
      return entry;
    }
  }
  return null;
}

// Tab styling
type PacksTabColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

type RarityTier = {
  colors: PacksTabColors;
  label: string;
};

const RARITY_TIERS: Record<string, RarityTier> = {
  theOne: {
    label: 'The One',
    colors: {
      bg: 'bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 dark:from-red-500/40 dark:via-orange-500/40 dark:via-yellow-500/40 dark:via-green-500/40 dark:via-blue-500/40 dark:via-indigo-500/40 dark:to-purple-500/40',
      border: 'border-yellow-300 dark:border-yellow-400',
      ring: 'ring-pink-500 dark:ring-pink-400',
      text: 'text-white dark:text-white font-bold drop-shadow-lg',
    },
  },
  legendary: {
    label: 'Legendary',
    colors: {
      bg: 'bg-orange-100 dark:bg-orange-900/40',
      border: 'border-orange-500 dark:border-orange-400',
      ring: 'ring-orange-500 dark:ring-orange-400',
      text: 'text-orange-700 dark:text-orange-300',
    },
  },
  epic: {
    label: 'Epic',
    colors: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/40',
      border: 'border-emerald-400 dark:border-emerald-400',
      ring: 'ring-emerald-500 dark:ring-emerald-400',
      text: 'text-emerald-700 dark:text-emerald-300',
    },
  },
  rare1: {
    label: 'Rare',
    colors: {
      bg: 'bg-green-100 dark:bg-green-900/40',
      border: 'border-green-500 dark:border-green-400',
      ring: 'ring-green-500 dark:ring-green-400',
      text: 'text-green-700 dark:text-green-300',
    },
  },
  rare2: {
    label: 'Rare',
    colors: {
      bg: 'bg-red-100 dark:bg-red-900/40',
      border: 'border-red-500 dark:border-red-400',
      ring: 'ring-red-500 dark:ring-red-400',
      text: 'text-red-700 dark:text-red-300',
    },
  },
  uncommon: {
    label: 'Uncommon',
    colors: {
      bg: 'bg-blue-900/20 dark:bg-blue-900/40',
      border: 'border-blue-700 dark:border-blue-600',
      ring: 'ring-blue-700 dark:ring-blue-600',
      text: 'text-blue-900 dark:text-blue-300',
    },
  },
  common: {
    label: 'Common',
    colors: {
      bg: 'bg-sky-100 dark:bg-sky-900/40',
      border: 'border-sky-400 dark:border-sky-500',
      ring: 'ring-sky-500 dark:ring-sky-400',
      text: 'text-sky-700 dark:text-sky-300',
    },
  },
};

const TAB_BASE =
  'p-2 rounded border-2 transition-all flex flex-col items-center justify-center min-w-0 !outline-none';

function getRarity(cardId: number): RarityTier {
  if (cardId === 1) {
    return RARITY_TIERS.theOne;
  } else if (cardId >= 2 && cardId <= 10) {
    return RARITY_TIERS.legendary;
  } else if (cardId >= 11 && cardId <= 25) {
    return RARITY_TIERS.epic;
  } else if (cardId >= 26 && cardId <= 45) {
    return RARITY_TIERS.rare1;
  } else if (cardId >= 46 && cardId <= 80) {
    return RARITY_TIERS.rare2;
  } else if (cardId >= 81 && cardId <= 140) {
    return RARITY_TIERS.uncommon;
  } else {
    return RARITY_TIERS.common;
  }
}

export function getPacksTabClass(cardId: number): string {
  const { colors } = getRarity(cardId);
  const { border, bg, text } = colors;
  return `${TAB_BASE} ${border} ${bg} ${text} !ring-0 opacity-70`;
}

export function getPacksTabSelectedClass(cardId: number): string {
  const { colors } = getRarity(cardId);
  const { border, bg, ring, text } = colors;
  return `${TAB_BASE} ${border} ${bg} ${text} font-bold !ring-2 ${ring} shadow-lg z-10 opacity-100 focus:!ring-2 focus:${ring}`;
}

export function getPacksRarityLabel(cardId: number): string {
  return getRarity(cardId).label;
}

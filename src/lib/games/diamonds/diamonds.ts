import { Gem } from '$lib/types';

export type GemColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

export const GEM_COLORS: Record<Gem, GemColors> = {
  [Gem.GREEN]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-500 dark:border-green-400',
    ring: 'ring-green-500 dark:ring-green-400',
    text: 'text-green-700 dark:text-green-400',
  },
  [Gem.BLUE]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-500 dark:border-blue-400',
    ring: 'ring-blue-500 dark:ring-blue-400',
    text: 'text-blue-700 dark:text-blue-400',
  },
  [Gem.PURPLE]: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    border: 'border-purple-500 dark:border-purple-400',
    ring: 'ring-purple-500 dark:ring-purple-400',
    text: 'text-purple-700 dark:text-purple-400',
  },
  [Gem.CYAN]: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    border: 'border-cyan-500 dark:border-cyan-400',
    ring: 'ring-cyan-500 dark:ring-cyan-400',
    text: 'text-cyan-700 dark:text-cyan-400',
  },
  [Gem.PINK]: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    border: 'border-pink-500 dark:border-pink-400',
    ring: 'ring-pink-500 dark:ring-pink-400',
    text: 'text-pink-700 dark:text-pink-400',
  },
  [Gem.YELLOW]: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-yellow-500 dark:border-yellow-400',
    ring: 'ring-yellow-500 dark:ring-yellow-400',
    text: 'text-yellow-700 dark:text-yellow-400',
  },
  [Gem.RED]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-500 dark:border-red-400',
    ring: 'ring-red-500 dark:ring-red-400',
    text: 'text-red-700 dark:text-red-400',
  },
};

export function getGemTabClass(gem: Gem): string {
  const c = GEM_COLORS[gem];
  return (
    `p-1.5 rounded border transition-all flex flex-col items-center justify-center min-w-0 ` +
    `${c.border} ${c.bg} ${c.text} !outline-none !ring-0 opacity-70`
  );
}

export function getGemTabSelectedClass(gem: Gem): string {
  const c = GEM_COLORS[gem];
  return (
    `p-1.5 rounded border transition-all flex flex-col items-center justify-center min-w-0 ` +
    `${c.border} ${c.bg} ${c.text} font-bold !ring-2 ${c.ring} shadow-lg z-10 opacity-100 ` +
    `!outline-none focus:!ring-2 focus:${c.ring}`
  );
}

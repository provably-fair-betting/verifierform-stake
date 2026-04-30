import { CoinFlip } from '$lib/types';

type FlipTabColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

const FLIP_COLORS: Record<CoinFlip, FlipTabColors> = {
  [CoinFlip.TAIL]: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-400 dark:border-blue-500',
    ring: 'ring-blue-500 dark:ring-blue-400',
    text: 'text-blue-700 dark:text-blue-400',
  },
  [CoinFlip.HEAD]: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    border: 'border-gray-400 dark:border-gray-500',
    ring: 'ring-gray-500 dark:ring-gray-400',
    text: 'text-gray-700 dark:text-gray-300',
  },
};

const TAB_BASE =
  'px-3 py-2 rounded border-2 transition-all flex flex-col items-center justify-center min-w-0 !outline-none';

function getFlipColors(chosen: CoinFlip): FlipTabColors {
  return FLIP_COLORS[chosen];
}

export function getFlipTabClass(chosen: CoinFlip): string {
  const { border, bg, text } = getFlipColors(chosen);
  return `${TAB_BASE} ${border} ${bg} ${text} !ring-0 opacity-70`;
}

export function getFlipTabSelectedClass(chosen: CoinFlip): string {
  const { border, bg, ring, text } = getFlipColors(chosen);
  return `${TAB_BASE} ${border} ${bg} ${text} font-bold !ring-2 ${ring} shadow-lg z-10 opacity-100 focus:!ring-2 focus:${ring}`;
}

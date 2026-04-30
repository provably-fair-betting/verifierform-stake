import { RockPaperScissorsOutcome } from '$lib/types';

type RpsTabColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

const RPS_COLORS: Record<RockPaperScissorsOutcome, RpsTabColors> = {
  [RockPaperScissorsOutcome.ROCK]: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    border: 'border-gray-500 dark:border-gray-400',
    ring: 'ring-gray-500 dark:ring-gray-400',
    text: 'text-gray-700 dark:text-gray-300',
  },
  [RockPaperScissorsOutcome.PAPER]: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-400 dark:border-blue-500',
    ring: 'ring-blue-500 dark:ring-blue-400',
    text: 'text-blue-700 dark:text-blue-400',
  },
  [RockPaperScissorsOutcome.SCISSORS]: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-400 dark:border-red-500',
    ring: 'ring-red-500 dark:ring-red-400',
    text: 'text-red-700 dark:text-red-400',
  },
};

const TAB_BASE =
  'px-3 py-2 rounded border-2 transition-all flex flex-col items-center justify-center min-w-0 !outline-none';

function getRpsColors(chosen: RockPaperScissorsOutcome): RpsTabColors {
  return RPS_COLORS[chosen];
}

export function getRpsTabClass(chosen: RockPaperScissorsOutcome): string {
  const { border, bg, text } = getRpsColors(chosen);
  return `${TAB_BASE} ${border} ${bg} ${text} !ring-0 opacity-70`;
}

export function getRpsTabSelectedClass(chosen: RockPaperScissorsOutcome): string {
  const { border, bg, ring, text } = getRpsColors(chosen);
  return `${TAB_BASE} ${border} ${bg} ${text} font-bold !ring-2 ${ring} shadow-lg z-10 opacity-100 focus:!ring-2 focus:${ring}`;
}

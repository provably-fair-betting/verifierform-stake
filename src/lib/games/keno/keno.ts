type KenoTabColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

const KENO_COLORS: KenoTabColors = {
  bg: 'bg-purple-50 dark:bg-purple-900/30',
  border: 'border-purple-400 dark:border-purple-500',
  ring: 'ring-purple-500 dark:ring-purple-400',
  text: 'text-purple-700 dark:text-purple-400',
};

const TAB_BASE =
  'px-3 py-2 rounded border-2 transition-all flex items-center justify-center min-w-0 !outline-none';

export function getKenoTabClass(): string {
  const { border, bg, text } = KENO_COLORS;
  return `${TAB_BASE} ${border} ${bg} ${text} !ring-0 opacity-70`;
}

export function getKenoTabSelectedClass(): string {
  const { border, bg, ring, text } = KENO_COLORS;
  return `${TAB_BASE} ${border} ${bg} ${text} font-bold !ring-2 ${ring} shadow-lg z-10 opacity-100 focus:!ring-2 focus:${ring}`;
}

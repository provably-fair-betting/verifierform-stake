type BarsTileColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

const TILE_COLOR_TIERS: { minExclusive: number; colors: BarsTileColors }[] = [
  {
    minExclusive: 5,
    colors: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      border: 'border-yellow-500 dark:border-yellow-400',
      ring: 'ring-yellow-500 dark:ring-yellow-400',
      text: 'text-yellow-700 dark:text-yellow-400',
    },
  },
  {
    minExclusive: 1,
    colors: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-500 dark:border-green-400',
      ring: 'ring-green-500 dark:ring-green-400',
      text: 'text-green-700 dark:text-green-400',
    },
  },
];

const TILE_COLOR_DEFAULT: BarsTileColors = {
  bg: 'bg-gray-100 dark:bg-gray-800',
  border: 'border-gray-400 dark:border-gray-500',
  ring: 'ring-gray-400 dark:ring-gray-500',
  text: 'text-gray-600 dark:text-gray-400',
};

export function getBarsTileColors(value: number): BarsTileColors {
  return TILE_COLOR_TIERS.find((tier) => value > tier.minExclusive)?.colors ?? TILE_COLOR_DEFAULT;
}

const TAB_BASE =
  'p-1.5 rounded border transition-all flex flex-col items-center justify-center min-w-0 !outline-none';

function selectedModifier(isSelected: boolean): string {
  return isSelected ? 'font-bold relative' : 'relative';
}

export function getBarsTabClass(multiNotDivided: number, isSelected: boolean): string {
  const { border, bg, text } = getBarsTileColors(multiNotDivided);
  return `${TAB_BASE} ${border} ${bg} ${text} ${selectedModifier(isSelected)} !ring-0 opacity-70`;
}

export function getBarsTabSelectedClass(multiNotDivided: number, isSelected: boolean): string {
  const { border, bg, ring, text } = getBarsTileColors(multiNotDivided);
  return `${TAB_BASE} ${border} ${bg} ${text} font-bold !ring-2 ${ring} shadow-lg z-10 opacity-100 ${selectedModifier(isSelected)} focus:!ring-2 focus:${ring}`;
}

export function getBarsTabName(label: string, isSelected: boolean): string {
  if (!isSelected) return label;
  const checkmark = `<span class="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-900">✓</span>`;
  return `${label}${checkmark}`;
}

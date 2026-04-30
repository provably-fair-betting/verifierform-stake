// Drill multiplier calculation
// Formula: multiplier = u < 0.02 ? 1 : min(0.98 / (1 - u), 2000000)
// House edge: 0.98 (2%)

const HOUSE_EDGE = 0.98;
const MAX_MULTIPLIER = 2000000;
const MIN_THRESHOLD = 0.02;

export function calculateDrillMultiplier(float: number): number {
  if (float < MIN_THRESHOLD) {
    return 1;
  }

  const rawMultiplier = HOUSE_EDGE / (1 - float);
  return Math.min(rawMultiplier, MAX_MULTIPLIER);
}

// Tab styling
type DrillTabColors = {
  bg: string;
  border: string;
  ring: string;
  text: string;
};

const DRILL_COLORS: DrillTabColors[] = [
  {
    // Blue drill (index 0)
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-400 dark:border-blue-500',
    ring: 'ring-blue-500 dark:ring-blue-400',
    text: 'text-blue-700 dark:text-blue-400',
  },
  {
    // Yellow drill (index 1)
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-400 dark:border-yellow-500',
    ring: 'ring-yellow-500 dark:ring-yellow-400',
    text: 'text-yellow-700 dark:text-yellow-400',
  },
  {
    // Green drill (index 2)
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-400 dark:border-green-500',
    ring: 'ring-green-500 dark:ring-green-400',
    text: 'text-green-700 dark:text-green-400',
  },
];

const TAB_BASE =
  'p-2 rounded border-2 transition-all flex flex-col items-center justify-center min-w-0 !outline-none w-20';

function getDrillColors(drillIndex: number): DrillTabColors {
  return DRILL_COLORS[drillIndex % 3];
}

export function getDrillTabClass(drillIndex: number): string {
  const { border, bg, text } = getDrillColors(drillIndex);
  return `${TAB_BASE} ${border} ${bg} ${text} !ring-0 opacity-70`;
}

export function getDrillTabSelectedClass(drillIndex: number): string {
  const { border, bg, ring, text } = getDrillColors(drillIndex);
  return `${TAB_BASE} ${border} ${bg} ${text} font-bold !ring-2 ${ring} shadow-lg z-10 opacity-100 focus:!ring-2 focus:${ring}`;
}

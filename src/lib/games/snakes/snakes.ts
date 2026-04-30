import rollOneIcon from '$lib/games/snakes/icons/dice-one-50x50-white.png';
import rollTwoIcon from '$lib/games/snakes/icons/dice-two-50x50-white.png';
import rollThreeIcon from '$lib/games/snakes/icons/dice-three-50x50-white.png';
import rollFourIcon from '$lib/games/snakes/icons/dice-four-50x50-white.png';
import rollFiveIcon from '$lib/games/snakes/icons/dice-five-50x50-white.png';
import rollSixIcon from '$lib/games/snakes/icons/dice-six-50x50-white.png';

export const DICE_ROLL_OPTIONS = [1, 2, 3, 4, 5, 6];

export const DICE_ROLL_ICON: Record<number, string> = {
  1: rollOneIcon,
  2: rollTwoIcon,
  3: rollThreeIcon,
  4: rollFourIcon,
  5: rollFiveIcon,
  6: rollSixIcon,
};

/** Returns the tab class for a snakes roll tab by index (alternates per turn pair). */
export function getSnakesTabClass(index: number): string {
  const isFirstDie = Math.floor(index / 2) % 2 === 0;
  return isFirstDie
    ? 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-orange-300 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none'
    : 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-gray-400 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none';
}

/** Returns the selected tab class for a snakes roll tab by index. */
export function getSnakesTabSelectedClass(index: number): string {
  const isFirstDie = Math.floor(index / 2) % 2 === 0;
  return isFirstDie
    ? 'rounded border-2 border-orange-500 bg-orange-100 font-bold text-orange-700 opacity-100 shadow-lg ring-2 ring-orange-400 z-10 dark:border-orange-400 dark:bg-orange-900/30 dark:text-orange-400 dark:ring-orange-400 !outline-none'
    : 'rounded border-2 border-gray-400 bg-gray-200 font-bold text-gray-700 opacity-100 shadow-lg ring-2 ring-gray-400 z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-500 !outline-none';
}

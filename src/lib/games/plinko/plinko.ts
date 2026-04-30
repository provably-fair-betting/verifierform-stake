import { Direction, type Item, type Risk } from '$lib/types';
import paylines from '$lib/games/plinko/plinko-paylines.json';
import { shuffle } from '$lib/domain/games/shared/shuffle';

const DIRECTIONS = Object.values(Direction);

export function getDirections(
  floatGenerator: Generator<number, number, number>,
  n: number
): Item<Direction>[] {
  return shuffle(floatGenerator, DIRECTIONS, n);
}

export function getPayline(risk: Risk, rows: number) {
  const halfPayline = paylines[rows as unknown as keyof typeof paylines][risk];
  const fullPayline = (rows % 2 === 0 ? halfPayline.slice(1) : halfPayline.slice(0))
    .reverse()
    .concat(halfPayline);
  return fullPayline;
}

export function getPayout(risk: Risk, rows: number, directions: Item<Direction>[]): number {
  return getPayline(risk, rows)[getDropIndex(directions, rows)];
}

function getDropIndex(directions: Item<Direction>[], rows: number) {
  const target = directions[0].chosenIndex === 0 ? 1 : 0;
  let dropIndex = rows;
  for (let i = 0; i < rows - 1; i++) {
    dropIndex -= directions[i + 1].chosenIndex === target ? 1 : 0;
  }
  return Math.abs(dropIndex);
}

/** Tab class for an unselected plinko step tab in ResultTabs. */
export function getPlinkoTabClass(): string {
  return (
    'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 ' +
    'hover:border-blue-300 hover:opacity-80 ring-2 ring-transparent ' +
    'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none'
  );
}

/** Tab class for the selected plinko step tab in ResultTabs. */
export function getPlinkoTabSelectedClass(): string {
  return (
    'rounded border-2 border-blue-500 bg-blue-100 font-bold text-blue-700 opacity-100 ' +
    'shadow-lg ring-2 ring-blue-400 z-10 ' +
    'dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400 !outline-none'
  );
}

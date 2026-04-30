import { ScarabSpinsTomeOfLifeIcon, type ScarabSpinsTomeOfLifeRound } from '$lib/types';
import reels from '$lib/games/slots/slot-reels.json';

export function simulateRounds(floatGenerator: Generator<number, number, number>) {
  const allRounds: ScarabSpinsTomeOfLifeRound[] = [];
  let rounds = 1;
  let totalRounds = 1;
  while (rounds > 0 && allRounds.length < 180) {
    const centerPositions = getCenterPositions(floatGenerator);
    const isRetrigger = retrigger(centerPositions.map((pos) => pos.index));
    rounds--;
    if (isRetrigger) {
      rounds += 15;
      totalRounds += 15;
    }
    allRounds.push({ centerPositions, totalRounds, retrigger: isRetrigger });
  }
  return allRounds;
}

function getCenterPositions(floatGenerator: Generator<number, number, number>) {
  const centerPositions = [];
  for (let i = 0; i < 5; i++) {
    const float = floatGenerator.next().value;
    const index = Math.floor(float * (i === 4 ? 41 : 30));
    centerPositions.push({ float, index });
  }
  return centerPositions;
}

function retrigger(centerPositions: number[]) {
  let scatters = 0;
  for (let i = 0; i < 5; i++) {
    const reelSize = i === 4 ? 41 : 30;

    const previousIndex = (centerPositions[i] - 1 < 0 ? reelSize : centerPositions[i]) - 1;
    scatters += reels[i][previousIndex] === ScarabSpinsTomeOfLifeIcon.SCATTER ? 1 : 0;

    const centerIndex = centerPositions[i];
    scatters += reels[i][centerIndex] === ScarabSpinsTomeOfLifeIcon.SCATTER ? 1 : 0;

    const nextIndex = centerPositions[i] + 1 === reelSize ? 0 : centerPositions[i] + 1;
    scatters += reels[i][nextIndex] === ScarabSpinsTomeOfLifeIcon.SCATTER ? 1 : 0;
  }
  return scatters >= 3;
}

// ---------------------------------------------------------------------------
// Tab class helpers (SlotExplanation + SlotResult)
// ---------------------------------------------------------------------------

/**
 * Tab class for an unselected slot round/position tab (alternates indigo/gray by round pair).
 * @param index - zero-based tab index
 */
export function getSlotTabClass(index: number): string {
  const isFirstRound = Math.floor(index / 5) % 2 === 0;
  return isFirstRound
    ? 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-indigo-300 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none'
    : 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-gray-400 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none';
}

/**
 * Tab class for a selected slot round/position tab.
 * @param index - zero-based tab index
 */
export function getSlotTabSelectedClass(index: number): string {
  const isFirstRound = Math.floor(index / 5) % 2 === 0;
  return isFirstRound
    ? 'rounded border-2 border-indigo-500 bg-indigo-100 font-bold text-indigo-700 opacity-100 shadow-lg ring-2 ring-indigo-400 z-10 dark:border-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-400 dark:ring-indigo-400 !outline-none'
    : 'rounded border-2 border-gray-400 bg-gray-200 font-bold text-gray-700 opacity-100 shadow-lg ring-2 ring-gray-400 z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-500 !outline-none';
}

/**
 * Tab class for an unselected slot result round tab (indigo for normal, green for retrigger).
 * @param isRetrigger - whether the round triggered a bonus
 */
export function getSlotResultTabClass(isRetrigger: boolean): string {
  return isRetrigger
    ? 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-green-300 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none'
    : 'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 hover:border-indigo-300 hover:opacity-80 ring-2 ring-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none';
}

/**
 * Tab class for a selected slot result round tab.
 * @param isRetrigger - whether the round triggered a bonus
 */
export function getSlotResultTabSelectedClass(isRetrigger: boolean): string {
  return isRetrigger
    ? 'rounded border-2 border-green-500 bg-green-100 font-bold text-green-700 opacity-100 shadow-lg ring-2 ring-green-400 z-10 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-400 !outline-none'
    : 'rounded border-2 border-indigo-500 bg-indigo-100 font-bold text-indigo-700 opacity-100 shadow-lg ring-2 ring-indigo-400 z-10 dark:border-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-400 dark:ring-indigo-400 !outline-none';
}

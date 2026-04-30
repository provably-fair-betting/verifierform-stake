export function getMinesCellClass(
  cellNumber: number,
  chosenMines: Set<number>,
  highlightedMine = -1
): string {
  const isMine = chosenMines.has(cellNumber);
  const isHighlighted = cellNumber === highlightedMine;

  if (isMine && isHighlighted)
    return 'border-2 border-red-500 bg-red-100 text-red-700 ring-2 ring-red-400 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500';
  if (isMine)
    return 'border-2 border-red-400 bg-red-50 text-red-600 ring-2 ring-transparent dark:border-red-500 dark:bg-red-900/20 dark:text-red-400';
  if (isHighlighted)
    return 'border-2 border-green-500 bg-green-100 text-green-700 ring-2 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500';
  return 'border-2 border-gray-200 bg-gray-50 text-gray-500 ring-2 ring-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400';
}

/** Tab class for an unselected mine tab in ResultTabs. */
export function getMinesTabClass(): string {
  return (
    'p-1.5 rounded border-2 transition-all flex flex-col items-center justify-center min-w-0 ' +
    'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 ' +
    '!outline-none ring-2 ring-transparent text-gray-500 dark:text-gray-500 opacity-70'
  );
}

/** Tab class for the selected mine tab in ResultTabs. */
export function getMinesTabSelectedClass(): string {
  return (
    'p-1.5 rounded border-2 transition-all flex flex-col items-center justify-center min-w-0 ' +
    'border-red-500 dark:border-red-400 bg-red-100 dark:bg-red-900/30 font-bold !ring-2 ring-red-400 dark:ring-red-500 shadow-lg z-10 opacity-100 ' +
    '!outline-none focus:!ring-2 focus:ring-red-500 text-gray-500 dark:text-gray-400'
  );
}

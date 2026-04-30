/** Tab class for an unselected pump step tab in ResultTabs. */
export function getPumpTabClass(): string {
  return (
    'rounded border-2 border-gray-300 bg-gray-100 p-1.5 text-gray-500 opacity-70 ' +
    'hover:border-purple-300 hover:opacity-80 ring-2 ring-transparent ' +
    'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 !outline-none'
  );
}

/** Tab class for the selected pump step tab in ResultTabs. */
export function getPumpTabSelectedClass(): string {
  return (
    'rounded border-2 border-purple-500 bg-purple-100 font-bold text-purple-700 opacity-100 ' +
    'shadow-lg ring-2 ring-purple-400 z-10 ' +
    'dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-400 !outline-none'
  );
}

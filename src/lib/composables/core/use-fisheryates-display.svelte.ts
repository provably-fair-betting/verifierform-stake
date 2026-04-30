/** Fisher-Yates display helper - calculates "previous items" and "remaining items" for algorithm visualization */
export function useFisherYatesDisplay(
  getBoardSize: () => number,
  getChosenIndexes: () => number[]
) {
  const result = $derived.by(() => {
    const boardSize = getBoardSize();
    const chosenIndexes = getChosenIndexes();
    const board = Array.from({ length: boardSize }).map((_v, i) => i + 1);
    const previousItems = chosenIndexes.slice(0, -1).map((i) => board.splice(i, 1)[0]);
    return { previousItems, remainingItems: board };
  });

  return {
    get previousItems() {
      return result.previousItems;
    },
    get remainingItems() {
      return result.remainingItems;
    },
  };
}

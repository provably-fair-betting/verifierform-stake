import type { FisherYatesItem } from '$lib/types';

/** Dragon Tower grid reconstruction from flat Fisher-Yates items */
export function useDragonTowerGrid(
  getItems: () => FisherYatesItem<number>[] | null,
  getEggCount: () => number
) {
  const results = $derived.by(() => {
    const items = getItems();
    const eggCount = getEggCount();
    if (!items) return null;
    const rows: number[][] = [];
    for (let row = 0; row < 9; row++) {
      rows.push(items.slice(row * eggCount, (row + 1) * eggCount).map((item) => item.chosen));
    }
    return rows;
  });

  return {
    get results() {
      return results;
    },
  };
}

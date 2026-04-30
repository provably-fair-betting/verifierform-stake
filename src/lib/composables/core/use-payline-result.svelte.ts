import type { FisherYatesItem } from '$lib/types';

/** Shared payline result calculations - death index and max multiplier (used by Chicken & Pump) */
export function usePaylineResult(
  getItems: () => FisherYatesItem<number>[] | null,
  getPayline: () => number[]
) {
  const items = $derived(getItems());
  const payline = $derived(getPayline());

  const deathIndex = $derived(items ? Math.min(...items.map((item) => item.chosen + 1)) : -1);

  const maxMulti = $derived(
    deathIndex > payline.length ? null : deathIndex > 0 ? payline[deathIndex - 1] : payline[0]
  );

  return {
    get deathIndex() {
      return deathIndex;
    },
    get maxMulti() {
      return maxMulti;
    },
  };
}

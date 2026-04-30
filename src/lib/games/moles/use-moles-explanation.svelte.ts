import type { FisherYatesItem } from '$lib/types';

/** Moles explanation state - manages flat navigation across rounds */
export function useMolesExplanation(getRounds: () => FisherYatesItem<number>[][] | null) {
  let flatIndex = $state(0);

  const rounds = $derived(getRounds());

  // Flat list of all moles across all rounds
  const flatItems = $derived.by(() => {
    if (!rounds) return [];
    return rounds.flatMap((items, roundIndex) =>
      items.map((item, moleIndex) => ({ ...item, roundIndex, moleIndex }))
    );
  });

  // Derive selected round + mole index from flat index
  const selectedRound = $derived(flatItems[flatIndex]?.roundIndex ?? 0);
  const resultIndex = $derived(flatItems[flatIndex]?.moleIndex ?? 0);
  const globalResultIndex = $derived(flatIndex);

  // Reset flat index when rounds change
  $effect(() => {
    if (rounds) {
      flatIndex = 0;
    }
  });

  return {
    get flatIndex() {
      return flatIndex;
    },
    set flatIndex(value: number) {
      flatIndex = value;
    },
    get flatItems() {
      return flatItems;
    },
    get selectedRound() {
      return selectedRound;
    },
    get resultIndex() {
      return resultIndex;
    },
    get globalResultIndex() {
      return globalResultIndex;
    },
  };
}

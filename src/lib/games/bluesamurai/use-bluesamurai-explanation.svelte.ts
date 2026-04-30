import { buildFlatItems, buildBoardColumns } from '$lib/games/bluesamurai/bluesamurai';
import type { BlueSamuraiRound } from '$lib/types';

/** Blue Samurai explanation state management */
export function useBlueSamuraiExplanation(getRounds: () => BlueSamuraiRound[] | null) {
  let selectedRoundIndex = $state(0);
  let selectedSymbolIndex = $state(0);

  const rounds = $derived(getRounds());
  const flatItems = $derived(rounds ? buildFlatItems(rounds) : []);
  const selectedRound = $derived(rounds?.[selectedRoundIndex]);
  const selectedSymbol = $derived(selectedRound?.symbols[selectedSymbolIndex]);
  const boardColumns = $derived(selectedRound ? buildBoardColumns(selectedRound, flatItems) : []);

  const resultIndex = $derived.by(() => {
    if (!selectedRound || !selectedSymbol) return 0;
    return flatItems.findIndex(
      (it) => it.round === selectedRound.round && it.symbol.index === selectedSymbolIndex
    );
  });

  const isLockedSamurai = $derived(
    !!(
      selectedRound?.specialRound &&
      selectedRound.stuckSamurais?.has(selectedSymbolIndex) &&
      !selectedRound.newlyLockedSamurais?.has(selectedSymbolIndex)
    )
  );

  // Reset to first round and first valid symbol when seed results change
  $effect(() => {
    if (rounds && rounds.length > 0) {
      selectedRoundIndex = 0;
      // Find the first symbol with a float in the first round
      const firstRound = rounds[0];
      const firstValidSymbol = firstRound.symbols.find((s) => s.float !== undefined);
      selectedSymbolIndex = firstValidSymbol ? firstValidSymbol.index : 0;
    }
  });

  // Clamp selectedSymbolIndex to a valid float-having symbol when the round changes
  $effect(() => {
    if (!selectedRound) return;
    const sym = selectedRound.symbols[selectedSymbolIndex];
    if (!sym?.float) {
      const first = selectedRound.symbols.find((s) => s.float !== undefined);
      if (first) selectedSymbolIndex = first.index;
    }
  });

  return {
    get selectedRoundIndex() {
      return selectedRoundIndex;
    },
    set selectedRoundIndex(value: number) {
      selectedRoundIndex = value;
    },
    get selectedSymbolIndex() {
      return selectedSymbolIndex;
    },
    set selectedSymbolIndex(value: number) {
      selectedSymbolIndex = value;
    },
    get flatItems() {
      return flatItems;
    },
    get selectedRound() {
      return selectedRound;
    },
    get selectedSymbol() {
      return selectedSymbol;
    },
    get boardColumns() {
      return boardColumns;
    },
    get resultIndex() {
      return resultIndex;
    },
    get isLockedSamurai() {
      return isLockedSamurai;
    },
  };
}

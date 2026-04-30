import { useCardDeck } from '../use-card-deck.svelte';

/** Baccarat cards composable - deals 6 cards and splits for player, banker, decider */
export function useBaccaratCards(getFormValues: () => Record<string, unknown>) {
  const cardDeck = useCardDeck(getFormValues, () => 6);

  const result = $derived.by(() => {
    if (!cardDeck.items) return null;
    const itemsCopy = [...cardDeck.items];
    return {
      initialPlayer: itemsCopy.splice(0, 2),
      initialBanker: itemsCopy.splice(0, 2),
      decider: itemsCopy.splice(0, 2),
    };
  });

  return {
    get seed() {
      return cardDeck.seed;
    },
    get items() {
      return cardDeck.items;
    },
    get result() {
      return result;
    },
    get isCalculating() {
      return cardDeck.isCalculating;
    },
  };
}

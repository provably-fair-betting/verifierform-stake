import { useCardDeck } from '../use-card-deck.svelte';

/** Blackjack cards composable - deals 52 cards and splits into dealer, player, remaining */
export function useBlackjackCards(getFormValues: () => Record<string, unknown>) {
  const cardDeck = useCardDeck(getFormValues, () => 52);

  const result = $derived.by(() => {
    if (!cardDeck.items) return null;
    const itemsCopy = [...cardDeck.items];
    return {
      initialPlayer: itemsCopy.splice(0, 2),
      initialDealer: itemsCopy.splice(0, 2),
      remaining: itemsCopy,
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

import { generateCardDeck } from '$lib/games/cards/cards';

/** Fisher-Yates display helper for card decks */
export function useFisherYatesCardsDisplay(getChosenIndexes: () => number[]) {
  const result = $derived.by(() => {
    const chosenIndexes = getChosenIndexes();
    const deck = generateCardDeck();
    const previousCards = chosenIndexes.slice(0, -1).map((i) => deck.splice(i, 1)[0]);
    return { previousCards, remainingCards: deck };
  });

  return {
    get previousCards() {
      return result.previousCards;
    },
    get remainingCards() {
      return result.remainingCards;
    },
  };
}

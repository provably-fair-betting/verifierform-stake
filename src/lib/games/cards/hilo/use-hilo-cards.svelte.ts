import { useCardDeck } from '../use-card-deck.svelte';

/** Hilo cards composable - generates full 52-card sequence */
export function useHiloCards(getFormValues: () => Record<string, unknown>) {
  return useCardDeck(getFormValues, 52);
}

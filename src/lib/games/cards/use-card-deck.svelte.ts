import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { generateCardDeck } from '$lib/games/cards/cards';
import { shuffle } from '$lib/domain/games/shared/shuffle';
import type { Item } from '$lib/types';

/**
 * Shared card deck composable
 *
 * Generates a shuffled deck of cards using Fisher-Yates shuffle via `shuffle()`,
 * preserving the intermediate float for each card draw.
 * Used by Blackjack, Hilo, and Baccarat.
 *
 * @param getFormValues - Getter function for form values with seed
 * @param count - Number of cards to draw (default 52)
 * @returns Seed, shuffled card items (with floats), and calculating state
 */
export function useCardDeck(
  getFormValues: () => Record<string, unknown>,
  getCount: () => number = () => 52
) {
  const seed = $derived({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
  });
  const deck = generateCardDeck();

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        return shuffle(floatGenerator, deck, getCount()) as Item<
          ReturnType<typeof generateCardDeck>[number]
        >[];
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get items() {
      return result.value;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import { TarotArcanaType as ArcanaType, type TarotSeed, type TarotDifficulty, type TarotCard, type TarotArcanaType } from './types';
import { findCard } from '$lib/games/tarot/tarot';

/** Tarot cards composable - generates 3 cards (minor, major, minor), preserving float for each */
export function useTarotsCards(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<TarotSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    difficulty: getFormValues().difficulty as TarotDifficulty,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const results: Array<{ card: TarotCard; arcanaType: TarotArcanaType; float: number }> = [];

        const float1 = floatGenerator.next().value;
        const card1 = findCard(float1, seed.difficulty, ArcanaType.MINOR);
        if (card1) results.push({ card: card1, arcanaType: ArcanaType.MINOR, float: float1 });

        const float2 = floatGenerator.next().value;
        const card2 = findCard(float2, seed.difficulty, ArcanaType.MAJOR);
        if (card2) results.push({ card: card2, arcanaType: ArcanaType.MAJOR, float: float2 });

        const float3 = floatGenerator.next().value;
        const card3 = findCard(float3, seed.difficulty, ArcanaType.MINOR);
        if (card3) results.push({ card: card3, arcanaType: ArcanaType.MINOR, float: float3 });

        return results;
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

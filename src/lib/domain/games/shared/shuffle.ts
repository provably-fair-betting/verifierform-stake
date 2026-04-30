import type { Item } from '$lib/types';

export function shuffle<T>(
  floatGenerator: Generator<number, number, number>,
  input: T[],
  take: number
): Item<T>[] {
  input = input.slice(0);
  const chosenItems: Item<T>[] = [];
  for (let i = 0; i < take; i++) {
    const float = floatGenerator.next().value;
    const chosenIndex = Math.floor(float * input.length);
    const chosen = input[chosenIndex];

    chosenItems.push({ chosen, float, chosenIndex });
  }
  return chosenItems;
}

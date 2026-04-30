import type { FisherYatesItem } from '$lib/types';

export function fisherYates<T>(
  floatGenerator: Generator<number, number, number>,
  input: T[],
  take: number
): FisherYatesItem<T>[] {
  input = input.slice(0);
  const chosenItems: FisherYatesItem<T>[] = [];
  const chosenIndexes = [];
  for (let i = 0; i < take; i++) {
    const float = floatGenerator.next().value;
    const chosenIndex = Math.floor(float * input.length);
    const chosen = input[chosenIndex];

    chosenIndexes.push(chosenIndex);
    chosenItems.push({ chosen, float, chosenIndex, chosenIndexes: chosenIndexes.slice(0) });
    input.splice(chosenIndex, 1);
  }
  return chosenItems;
}

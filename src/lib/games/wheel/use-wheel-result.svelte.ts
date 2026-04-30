import type { WheelSeed } from '$lib/types';

/** Wheel result calculations - payline lookup and chosen value */
export function useWheelResult(
  seed: WheelSeed,
  float: number,
  paylines: Record<number, Record<string, number[]>>
) {
  const payline = $derived(paylines[seed.segments as unknown as keyof typeof paylines][seed.risk]);
  const chosenIndex = $derived(Math.floor(float * seed.segments));
  const chosen = $derived(payline[chosenIndex]);

  return {
    get payline() {
      return payline;
    },
    get chosenIndex() {
      return chosenIndex;
    },
    get chosen() {
      return chosen;
    },
  };
}

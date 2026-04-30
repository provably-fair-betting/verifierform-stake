import type { WheelSeed } from '$lib/types';

/** Wheel result calculations - payline lookup and chosen value */
export function useWheelResult(
  getSeed: () => WheelSeed,
  getFloat: () => number,
  paylines: Record<number, Record<string, number[]>>
) {
  const payline = $derived(
    paylines[getSeed().segments as unknown as keyof typeof paylines][getSeed().risk]
  );
  const chosenIndex = $derived(Math.floor(getFloat() * getSeed().segments));
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

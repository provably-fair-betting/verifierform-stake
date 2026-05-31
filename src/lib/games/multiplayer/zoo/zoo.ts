import type { ZooAnimal, ZooAnimalResult } from './types';

export function slotToAnimal(slot: number): ZooAnimal {
  if (slot === 0) return 'lion';
  if (slot === 1) return 'cheetah';
  if (slot <= 3) return 'elephant';
  if (slot <= 5) return 'crocodile';
  if (slot <= 9) return 'rhino';
  return 'penguin';
}

export function getZooAnimals(hmac: string): ZooAnimalResult[] {
  return [0, 1, 2].map((i) => {
    const window = hmac.substring(i * 8, i * 8 + 8);
    const int = parseInt(window, 16);
    const slot = int % 20;
    return { window, int, slot, animal: slotToAnimal(slot) };
  });
}

export const ANIMAL_SLOTS: { slots: string; animal: ZooAnimal; chance: string }[] = [
  { slots: '0', animal: 'lion', chance: '1/20 (5%)' },
  { slots: '1', animal: 'cheetah', chance: '1/20 (5%)' },
  { slots: '2–3', animal: 'elephant', chance: '2/20 (10%)' },
  { slots: '4–5', animal: 'crocodile', chance: '2/20 (10%)' },
  { slots: '6–9', animal: 'rhino', chance: '4/20 (20%)' },
  { slots: '10–19', animal: 'penguin', chance: '10/20 (50%)' },
];

export type ZooAnimal = 'lion' | 'cheetah' | 'elephant' | 'crocodile' | 'rhino' | 'penguin';

export interface ZooSeed {
  hash: string;
  seed: string;
}

export interface ZooAnimalResult {
  window: string;
  int: number;
  slot: number;
  animal: ZooAnimal;
}

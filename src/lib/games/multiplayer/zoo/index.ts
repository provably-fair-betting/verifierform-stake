import { z } from 'zod';
import ZooExplanation from '$lib/games/multiplayer/zoo/ZooExplanation.svelte';
import ZooResult from '$lib/games/multiplayer/zoo/ZooResult.svelte';
import type { GameDefinition } from 'verifierform-core';

export const gameDefinition: GameDefinition = {
  name: 'Zoo',
  schema: z.object({
    hash: z.string(),
    seed: z.string(),
  }),
  controls: [
    {
      id: 'hash',
      label: 'Hash',
      type: 'text',
      required: true,
    },
    {
      id: 'seed',
      label: 'Seed',
      type: 'text',
      required: true,
    },
  ],
  result: ZooResult,
  explanation: ZooExplanation,
};

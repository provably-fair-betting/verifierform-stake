import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import { z } from 'zod';
import SnakesResult from '$lib/games/snakes/SnakesResult.svelte';
import SnakesExplanation from '$lib/games/snakes/SnakesExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Snakes',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA.extend({
    difficulty: z.enum(['easy', 'medium', 'hard', 'expert', 'master']),
  }),
  controls: [
    ...CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
    {
      id: 'difficulty',
      label: 'Difficulty',
      type: 'select',
      options: ['easy', 'medium', 'hard', 'expert', 'master'],
    },
  ],
  result: SnakesResult,
  explanation: SnakesExplanation,
};

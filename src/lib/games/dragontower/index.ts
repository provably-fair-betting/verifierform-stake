import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import DragonTowerResult from '$lib/games/dragontower/DragonTowerResult.svelte';
import { z } from 'zod';
import type { GameDefinition } from 'verifierform-lib';
import DragonTowerExplanation from '$lib/games/dragontower/DragonTowerExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Dragon Tower',
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
  result: DragonTowerResult,
  explanation: DragonTowerExplanation,
};

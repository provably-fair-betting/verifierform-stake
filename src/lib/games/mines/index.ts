import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import MinesExplanation from '$lib/games/mines/MinesExplanation.svelte';
import MinesResult from '$lib/games/mines/MinesResult.svelte';
import { z } from 'zod';
import type { GameDefinition } from 'verifierform-lib';

export const gameDefinition: GameDefinition = {
  name: 'Mines',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA.extend({
    mines: z.number().min(1).max(24),
  }),
  controls: [
    ...CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
    {
      id: 'mines',
      label: 'Mines',
      type: 'number',
      required: true,
      default: 13,
      min: 1,
      max: 24,
    },
  ],
  result: MinesResult,
  explanation: MinesExplanation,
};

import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-lib';
import { z } from 'zod';
import TarotsResult from './TarotsResult.svelte';
import TarotsExplanation from './TarotsExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Tarot',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA.extend({
    difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
  }),
  controls: [
    ...CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
    {
      id: 'difficulty',
      label: 'Difficulty',
      type: 'select',
      options: ['easy', 'medium', 'hard', 'expert'],
    },
  ],
  result: TarotsResult,
  explanation: TarotsExplanation,
};

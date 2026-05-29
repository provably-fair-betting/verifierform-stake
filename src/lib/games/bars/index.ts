import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import { z } from 'zod';
import BarsResult from './BarsResult.svelte';
import BarsExplanation from './BarsExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Bars',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA.extend({
    difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
    barcount: z.number().min(1).max(5),
    selectedbars: z.string().optional(),
  }),
  controls: [
    ...CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
    {
      id: 'difficulty',
      label: 'Difficulty',
      type: 'select',
      options: ['easy', 'medium', 'hard', 'expert'],
    },
    {
      id: 'barcount',
      label: 'Bars Count',
      type: 'number',
      required: true,
      default: 1,
      min: 1,
      max: 5,
    },
    {
      id: 'selectedbars',
      type: 'hidden',
    },
  ],
  result: BarsResult,
  explanation: BarsExplanation,
};

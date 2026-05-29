import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import { z } from 'zod';
import PlinkoResult from '$lib/games/plinko/PlinkoResult.svelte';
import PlinkoExplanation from '$lib/games/plinko/PlinkoExplanation.svelte';
import type { GameDefinition } from 'verifierform-core';

export const gameDefinition: GameDefinition = {
  name: 'Plinko',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA.extend({
    risk: z.enum(['low', 'medium', 'high', 'expert']),
    rows: z.number().min(8).max(16),
  }),
  controls: [
    ...CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
    {
      id: 'risk',
      label: 'Risk',
      type: 'select',
      options: ['low', 'medium', 'high', 'expert'],
    },
    {
      id: 'rows',
      label: 'Rows',
      type: 'number',
      default: 8,
      required: true,
      min: 8,
      max: 16,
    },
  ],
  result: PlinkoResult,
  explanation: PlinkoExplanation,
};

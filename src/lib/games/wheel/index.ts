import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import { z } from 'zod';
import WheelResult from '$lib/games/wheel/WheelResult.svelte';
import WheelExplanation from '$lib/games/wheel/WheelExplanation.svelte';
import type { GameDefinition } from 'verifierform-lib';

export const gameDefinition: GameDefinition = {
  name: 'Wheel',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA.extend({
    risk: z.enum(['low', 'medium', 'high']),
    segments: z.number().min(10).max(50).step(10),
  }),
  controls: [
    ...CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
    {
      id: 'risk',
      label: 'Risk',
      type: 'select',
      options: ['low', 'medium', 'high'],
    },
    {
      id: 'segments',
      label: 'Segments',
      type: 'number',
      default: 10,
      required: true,
      min: 10,
      max: 50,
      step: 10,
    },
  ],
  result: WheelResult,
  explanation: WheelExplanation,
};

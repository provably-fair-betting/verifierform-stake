import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-lib';
import MolesResult from './MolesResult.svelte';
import MolesExplanation from './MolesExplanation.svelte';
import { z } from 'zod';

export const gameDefinition: GameDefinition = {
  name: 'Moles',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA.extend({
    molescount: z.number().min(1).max(6),
  }),
  controls: [
    ...CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
    {
      id: 'molescount',
      label: 'Moles Count',
      type: 'number',
      required: true,
      default: 3,
      min: 1,
      max: 6,
    },
  ],
  result: MolesResult,
  explanation: MolesExplanation,
};

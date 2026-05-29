import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import DrillResult from './DrillResult.svelte';
import DrillExplanation from './DrillExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Drill',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: DrillResult,
  explanation: DrillExplanation,
};

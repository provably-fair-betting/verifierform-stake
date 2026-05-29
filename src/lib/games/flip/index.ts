import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import FlipResult from '$lib/games/flip/FlipResult.svelte';
import FlipExplanation from '$lib/games/flip/FlipExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Flip',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: FlipResult,
  explanation: FlipExplanation,
};

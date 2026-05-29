import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import DiamondsExplanation from '$lib/games/diamonds/DiamondsExplanation.svelte';
import DiamondsResult from '$lib/games/diamonds/DiamondsResult.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Diamonds',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: DiamondsResult,
  explanation: DiamondsExplanation,
};

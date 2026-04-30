import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import LimboExplanation from '$lib/games/limbo/LimboExplanation.svelte';
import LimboResult from '$lib/games/limbo/LimboResult.svelte';
import type { GameDefinition } from 'verifierform-lib';

export const gameDefinition: GameDefinition = {
  name: 'Limbo',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: LimboResult,
  explanation: LimboExplanation,
};

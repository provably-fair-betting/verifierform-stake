import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-lib';
import PacksResult from './PacksResult.svelte';
import PacksExplanation from './PacksExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Packs',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: PacksResult,
  explanation: PacksExplanation,
};

import DiceResult from '$lib/games/dice/DiceResult.svelte';
import DiceExplanation from '$lib/games/dice/DiceExplanation.svelte';
import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-lib';

export const gameDefinition: GameDefinition = {
  name: 'PrimeDice',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: DiceResult,
  explanation: DiceExplanation,
};

import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import RouletteExplanation from '$lib/games/roulette/RouletteExplanation.svelte';
import RouletteResult from '$lib/games/roulette/RouletteResult.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Roulette',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: RouletteResult,
  explanation: RouletteExplanation,
};

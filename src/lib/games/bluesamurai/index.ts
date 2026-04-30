import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-lib';
import BlueSamuraiResult from '$lib/games/bluesamurai/BlueSamuraiResult.svelte';
import BlueSamuraiExplanation from '$lib/games/bluesamurai/BlueSamuraiExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Blue Samurai',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: BlueSamuraiResult,
  explanation: BlueSamuraiExplanation,
};

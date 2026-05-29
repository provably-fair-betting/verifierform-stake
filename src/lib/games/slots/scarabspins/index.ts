import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import ScarabSpinsResult from '$lib/games/slots/scarabspins/ScarabSpinsResult.svelte';
import ScarabSpinsExplanation from '$lib/games/slots/scarabspins/ScarabSpinsExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Scarab Spins',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: ScarabSpinsResult,
  explanation: ScarabSpinsExplanation,
};

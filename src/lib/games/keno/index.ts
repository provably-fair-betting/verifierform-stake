import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import KenoExplanation from '$lib/games/keno/KenoExplanation.svelte';
import KenoResult from '$lib/games/keno/KenoResult.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Keno',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: KenoResult,
  explanation: KenoExplanation,
};

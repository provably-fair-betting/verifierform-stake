import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import BaccaratExplanation from '$lib/games/cards/baccarat/BaccaratExplanation.svelte';
import BaccaratResult from '$lib/games/cards/baccarat/BaccaratResult.svelte';

export const gameDefinition = {
  name: 'Baccarat',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: BaccaratResult,
  explanation: BaccaratExplanation,
};

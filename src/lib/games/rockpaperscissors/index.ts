import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import RockPaperScissorsResult from '$lib/games/rockpaperscissors/RockPaperScissorsResult.svelte';
import RockPaperScissorsExplanation from '$lib/games/rockpaperscissors/RockPaperScissorsExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Rock Paper Scissors',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: RockPaperScissorsResult,
  explanation: RockPaperScissorsExplanation,
};

import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-core';
import BlackjackResult from '$lib/games/cards/blackjack/BlackjackResult.svelte';
import BlackjackExplanation from '$lib/games/cards/blackjack/BlackjackExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Blackjack',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: BlackjackResult,
  explanation: BlackjackExplanation,
};

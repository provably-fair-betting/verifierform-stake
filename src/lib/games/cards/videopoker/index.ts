import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import VideoPokerExplanation from '$lib/games/cards/videopoker/VideoPokerExplanation.svelte';
import VideoPokerResult from '$lib/games/cards/videopoker/VideoPokerResult.svelte';
import type { GameDefinition } from 'verifierform-lib';

export const gameDefinition: GameDefinition = {
  name: 'Video Poker',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: VideoPokerResult,
  explanation: VideoPokerExplanation,
};

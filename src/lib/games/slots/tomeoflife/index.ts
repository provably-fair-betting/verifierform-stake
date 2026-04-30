import {
  CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
} from '$lib/control-setup';
import type { GameDefinition } from 'verifierform-lib';
import TomeOfLifeResult from '$lib/games/slots/tomeoflife/TomeOfLifeResult.svelte';
import TomeOfLifeExplanation from '$lib/games/slots/tomeoflife/TomeOfLifeExplanation.svelte';

export const gameDefinition: GameDefinition = {
  name: 'Tome Of Life',
  schema: CLIENT_SEED_SERVER_SEED_NONCE_SCHEMA,
  controls: CLIENT_SEED_SERVER_SEED_NONCE_CONTROLS,
  result: TomeOfLifeResult,
  explanation: TomeOfLifeExplanation,
};

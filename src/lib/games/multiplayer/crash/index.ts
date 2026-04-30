import { z } from 'zod';
import CrashExplanation from '$lib/games/multiplayer/crash/CrashExplanation.svelte';
import CrashResult from '$lib/games/multiplayer/crash/CrashResult.svelte';
import { CRASH_SEED } from '../multiplayer.config';
import type { GameDefinition } from 'verifierform-lib';

export const gameDefinition: GameDefinition = {
  name: 'Crash',
  schema: z.object({
    gamehash: z.string(),
  }),
  controls: [
    {
      id: 'gamehash',
      label: 'Game Hash',
      type: 'text',
      required: true,
    },
    {
      id: 'blockhash',
      label: 'Block Hash',
      type: 'static',
      value: CRASH_SEED,
    },
  ],
  result: CrashResult,
  explanation: CrashExplanation,
};

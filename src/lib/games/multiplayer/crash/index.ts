import { z } from 'zod';
import CrashExplanation from '$lib/games/multiplayer/crash/CrashExplanation.svelte';
import CrashResult from '$lib/games/multiplayer/crash/CrashResult.svelte';
import type { GameDefinition } from 'verifierform-core';

export const gameDefinition: GameDefinition = {
  name: 'Crash',
  schema: z.object({
    gamehash: z.string(),
    blockhash: z.string(),
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
      type: 'text',
      required: true,
    },
  ],
  result: CrashResult,
  explanation: CrashExplanation,
};

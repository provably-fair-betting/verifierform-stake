import { PUBLIC_BET_LOOKUP_ENABLED, PUBLIC_BET_LOOKUP_URL } from '$env/static/public';

export const betLookupEnabled = PUBLIC_BET_LOOKUP_ENABLED === 'true';

type GameEntry = { formId: string; name: string };

// Stake slug → verifier form ID + display name.
// Stake slugs are the CasinoBet.game values returned by the API.
const CASINO_GAMES: Record<string, GameEntry> = {
  dice: { formId: 'dice', name: 'Dice' },
  flip: { formId: 'flip', name: 'Flip' },
  diamonds: { formId: 'diamonds', name: 'Diamonds' },
  primediceX: { formId: 'primedice', name: 'PrimeDice' },
  slotsSamurai: { formId: 'bluesamurai', name: 'Blue Samurai' },
  keno: { formId: 'keno', name: 'Keno' },
  packs: { formId: 'packs', name: 'Packs' },
  rockPaperScissors: { formId: 'rockpaperscissors', name: 'Rock Paper Scissors' },
  limbo: { formId: 'limbo', name: 'Limbo' },
  drill: { formId: 'drill', name: 'Drill' },
  roulette: { formId: 'roulette', name: 'Roulette' },
  baccarat: { formId: 'baccarat', name: 'Baccarat' },
  blackjack: { formId: 'blackjack', name: 'Blackjack' },
  hilo: { formId: 'hilo', name: 'Hilo' },
  videoPoker: { formId: 'videopoker', name: 'Video Poker' },
  slots: { formId: 'scarabspins', name: 'Scarab Spins' },
  slotsTomeOfLife: { formId: 'tomeoflife', name: 'Tome Of Life' },
};

// Multiplayer games are resolved by betType, not by slug.
const MULTIPLAYER_GAMES: Record<string, GameEntry> = {
  MultiplayerCrashBet: { formId: 'crash', name: 'Crash' },
  MultiplayerSlideBet: { formId: 'slide', name: 'Slide' },
};

export type BetLookupError =
  | { type: 'unsupported_game'; game: string }
  | { type: 'api_error'; message: string }
  | { type: 'network_error' };

export type BetLookupSuccess = {
  params: URLSearchParams;
  gameName: string;
};

export type BetLookupResult =
  | { ok: true; data: BetLookupSuccess }
  | { ok: false; error: BetLookupError };

type NormalizedBet = {
  betType: 'CasinoBet' | 'MultiplayerCrashBet' | 'MultiplayerSlideBet';
  game: string;
  inputs: Record<string, unknown>;
};

export async function lookupBet(betId: string): Promise<BetLookupResult> {
  let response: Response;
  let body: { success: boolean; data?: NormalizedBet; error?: string };

  try {
    response = await fetch(`${PUBLIC_BET_LOOKUP_URL}/api/bet-lookup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ betId }),
    });
    body = await response.json();
  } catch {
    return { ok: false, error: { type: 'network_error' } };
  }

  if (!response.ok) {
    return {
      ok: false,
      error: { type: 'api_error', message: body.error ?? 'An unexpected error occurred. Please try again later.' },
    };
  }

  if (!body.data) return { ok: false, error: { type: 'api_error', message: 'An unexpected error occurred. Please try again later.' } };
  return buildResult(body.data);
}

function resolveGame(bet: NormalizedBet): GameEntry | null {
  if (bet.betType !== 'CasinoBet') return MULTIPLAYER_GAMES[bet.betType] ?? null;
  return CASINO_GAMES[bet.game] ?? null;
}

function buildResult(bet: NormalizedBet): BetLookupResult {
  const game = resolveGame(bet);
  if (!game) return { ok: false, error: { type: 'unsupported_game', game: bet.game } };
  return { ok: true, data: { params: buildParams(bet, game.formId), gameName: game.name } };
}

function buildParams(bet: NormalizedBet, gameId: string): URLSearchParams {
  const entries: Record<string, string> = { game: gameId };

  if (bet.betType === 'CasinoBet') {
    const { clientSeed, serverSeed, nonce } = bet.inputs as {
      clientSeed: string;
      serverSeed: string;
      nonce: number;
    };
    entries.clientseed = clientSeed ?? '';
    entries.serverseed = serverSeed ?? '';
    entries.nonce = String(nonce ?? 0);
  } else if (bet.betType === 'MultiplayerCrashBet') {
    const { gameHash, serverSeed } = bet.inputs as { gameHash: string; serverSeed: string };
    entries.gamehash = gameHash ?? '';
    entries.blockhash = serverSeed ?? '';
  } else if (bet.betType === 'MultiplayerSlideBet') {
    const { gameHash, serverSeed } = bet.inputs as { gameHash: string; serverSeed: string };
    entries.slidehash = gameHash ?? '';
    entries.blockhash = serverSeed ?? '';
  }

  return new URLSearchParams(entries);
}

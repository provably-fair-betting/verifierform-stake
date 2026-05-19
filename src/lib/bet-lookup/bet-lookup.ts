import { PUBLIC_BET_LOOKUP_ENABLED, PUBLIC_BET_LOOKUP_URL } from '$env/static/public';

export const betLookupEnabled = PUBLIC_BET_LOOKUP_ENABLED === 'true' && !!PUBLIC_BET_LOOKUP_URL;

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
  bars: { formId: 'bars', name: 'Bars' },
  cases: { formId: 'cases', name: 'Cases' },
  chicken: { formId: 'chicken', name: 'Chicken' },
  darts: { formId: 'darts', name: 'Darts' },
  dragonTower: { formId: 'dragontower', name: 'Dragon Tower' },
  mines: { formId: 'mines', name: 'Mines' },
  moles: { formId: 'moles', name: 'Moles' },
  plinko: { formId: 'plinko', name: 'Plinko' },
  pump: { formId: 'pump', name: 'Pump' },
  snakes: { formId: 'snakes', name: 'Snakes' },
  tarot: { formId: 'tarot', name: 'Tarot' },
  wheel: { formId: 'wheel', name: 'Wheel' },
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

export async function lookupBet(betId: string): Promise<BetLookupResult>;
export async function lookupBet(betId: string, signal: AbortSignal): Promise<BetLookupResult | null>;
export async function lookupBet(
  betId: string,
  signal?: AbortSignal
): Promise<BetLookupResult | null> {
  if (!PUBLIC_BET_LOOKUP_URL) {
    return { ok: false, error: { type: 'network_error' } };
  }

  let response: Response;
  let body: { success: boolean; data?: NormalizedBet; error?: string };

  try {
    response = await fetch(new URL('/api/bet-lookup', PUBLIC_BET_LOOKUP_URL).href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ betId }),
      signal,
    });
    body = await response.json();
  } catch {
    if (signal?.aborted) return null;
    return { ok: false, error: { type: 'network_error' } };
  }

  if (!response.ok) {
    return {
      ok: false,
      error: {
        type: 'api_error',
        message: body.error ?? 'An unexpected error occurred. Please try again later.',
      },
    };
  }

  if (!body.data)
    return {
      ok: false,
      error: {
        type: 'api_error',
        message: 'An unexpected error occurred. Please try again later.',
      },
    };
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
    const inputs = bet.inputs as Record<string, unknown>;
    entries.clientseed = String(inputs.clientSeed ?? '');
    entries.serverseed = String(inputs.serverSeed ?? '');
    entries.nonce = String(inputs.nonce ?? 0);

    // Game-specific state fields
    if (inputs.difficulty != null) entries.difficulty = String(inputs.difficulty);
    if (inputs.tiles != null) entries.barcount = String(inputs.tiles);
    if (inputs.minesCount != null) entries.mines = String(inputs.minesCount);
    if (inputs.molesCount != null) entries.molescount = String(inputs.molesCount);
    if (inputs.risk != null) entries.risk = String(inputs.risk);
    if (inputs.rows != null) entries.rows = String(inputs.rows);
    if (inputs.segments != null) entries.segments = String(inputs.segments);
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

import { PUBLIC_BET_LOOKUP_ENABLED, PUBLIC_BET_LOOKUP_URL } from '$env/static/public';

export const betLookupEnabled = PUBLIC_BET_LOOKUP_ENABLED === 'true';

const GAME_ID_TO_NAME: Record<string, string> = {
  dice: 'Dice',
  flip: 'Flip',
  diamonds: 'Diamonds',
  primedice: 'PrimeDice',
  bluesamurai: 'Blue Samurai',
  keno: 'Keno',
  packs: 'Packs',
  rockpaperscissors: 'Rock Paper Scissors',
  limbo: 'Limbo',
  drill: 'Drill',
  roulette: 'Roulette',
  baccarat: 'Baccarat',
  blackjack: 'Blackjack',
  hilo: 'Hilo',
  videopoker: 'Video Poker',
  scarabspins: 'Scarab Spins',
  tomeoflife: 'Tome Of Life',
  crash: 'Crash',
  slide: 'Slide',
};

// Maps Stake API game slugs (CasinoBet.game field) to verifier form game IDs
const GAME_SLUG_TO_FORM_ID: Record<string, string> = {
  dice: 'dice',
  flip: 'flip',
  diamonds: 'diamonds',
  primediceX: 'primedice',
  slotsSamurai: 'bluesamurai',
  keno: 'keno',
  packs: 'packs',
  rockPaperScissors: 'rockpaperscissors',
  limbo: 'limbo',
  drill: 'drill',
  roulette: 'roulette',
  baccarat: 'baccarat',
  blackjack: 'blackjack',
  hilo: 'hilo',
  videoPoker: 'videopoker',
  slots: 'scarabspins',
  slotsTomeOfLife: 'tomeoflife',
};

export type BetLookupError =
  | { type: 'not_found' }
  | { type: 'seed_not_revealed' }
  | { type: 'unsupported_game'; game: string }
  | { type: 'service_unavailable' }
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
    if (response.status === 404) return { ok: false, error: { type: 'not_found' } };
    if (response.status === 422) return { ok: false, error: { type: 'seed_not_revealed' } };
    return { ok: false, error: { type: 'service_unavailable' } };
  }

  return buildResult(body.data!);
}

function buildResult(bet: NormalizedBet): BetLookupResult {
  const gameId = resolveGameId(bet);
  if (!gameId) {
    return { ok: false, error: { type: 'unsupported_game', game: bet.game } };
  }
  const gameName = GAME_ID_TO_NAME[gameId] ?? gameId;
  return { ok: true, data: { params: buildParams(bet, gameId), gameName } };
}

function resolveGameId(bet: NormalizedBet): string | null {
  if (bet.betType === 'MultiplayerCrashBet') return 'crash';
  if (bet.betType === 'MultiplayerSlideBet') return 'slide';
  return GAME_SLUG_TO_FORM_ID[bet.game] ?? null;
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
  } else {
    const { gameHash, serverSeed } = bet.inputs as { gameHash: string; serverSeed: string };
    entries.slidehash = gameHash ?? '';
    entries.blockhash = serverSeed ?? '';
  }

  return new URLSearchParams(entries);
}

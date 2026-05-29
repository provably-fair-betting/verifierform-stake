import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const { lookupBet } = await import('$lib/bet-lookup/bet-lookup');

const TEST_URL = 'http://test';

function mockResponse(status: number, body: object) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

const CASINO_INPUTS = {
  clientSeed: 'abc123',
  serverSeed: 'def456',
  serverSeedHash: 'hash',
  nonce: 42,
};

describe('lookupBet', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  describe('when betLookupUrl is empty', () => {
    it('returns network_error without fetching', async () => {
      const result = await lookupBet('', 'house:123');

      expect(result).toEqual({ ok: false, error: { type: 'network_error' } });
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  // ── CasinoBet slug → formId mapping ────────────────────────────────────────

  describe('CasinoBet slug mapping', () => {
    it.each([
      ['dice', 'dice', 'Dice'],
      ['flip', 'flip', 'Flip'],
      ['diamonds', 'diamonds', 'Diamonds'],
      ['primediceX', 'primedice', 'PrimeDice'],
      ['slotsSamurai', 'bluesamurai', 'Blue Samurai'],
      ['keno', 'keno', 'Keno'],
      ['packs', 'packs', 'Packs'],
      ['rockPaperScissors', 'rockpaperscissors', 'Rock Paper Scissors'],
      ['limbo', 'limbo', 'Limbo'],
      ['drill', 'drill', 'Drill'],
      ['roulette', 'roulette', 'Roulette'],
      ['baccarat', 'baccarat', 'Baccarat'],
      ['blackjack', 'blackjack', 'Blackjack'],
      ['hilo', 'hilo', 'Hilo'],
      ['videoPoker', 'videopoker', 'Video Poker'],
      ['slots', 'scarabspins', 'Scarab Spins'],
      ['slotsTomeOfLife', 'tomeoflife', 'Tome Of Life'],
      ['bars', 'bars', 'Bars'],
      ['cases', 'cases', 'Cases'],
      ['chicken', 'chicken', 'Chicken'],
      ['darts', 'darts', 'Darts'],
      ['dragonTower', 'dragontower', 'Dragon Tower'],
      ['mines', 'mines', 'Mines'],
      ['moles', 'moles', 'Moles'],
      ['plinko', 'plinko', 'Plinko'],
      ['pump', 'pump', 'Pump'],
      ['snakes', 'snakes', 'Snakes'],
      ['tarot', 'tarot', 'Tarot'],
      ['wheel', 'wheel', 'Wheel'],
    ])('slug=%s → game=%s gameName=%s', async (stakeSlug, formId, gameName) => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: { betType: 'CasinoBet', game: stakeSlug, inputs: CASINO_INPUTS },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.data.gameName).toBe(gameName);
      const params = Object.fromEntries(result.data.params);
      expect(params.game).toBe(formId);
      expect(params.clientseed).toBe(CASINO_INPUTS.clientSeed);
      expect(params.serverseed).toBe(CASINO_INPUTS.serverSeed);
      expect(params.nonce).toBe(String(CASINO_INPUTS.nonce));
    });
  });

  // ── CasinoBet state field → URL param mapping ───────────────────────────────

  describe('CasinoBet state field mapping', () => {
    it('mines: minesCount → mines param', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: {
            betType: 'CasinoBet',
            game: 'mines',
            inputs: { ...CASINO_INPUTS, minesCount: 5 },
          },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      const params = Object.fromEntries(result.data.params);
      expect(params.mines).toBe('5');
      expect(params.minescount).toBeUndefined();
    });

    it('moles: molesCount → molescount param', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: {
            betType: 'CasinoBet',
            game: 'moles',
            inputs: { ...CASINO_INPUTS, molesCount: 3 },
          },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      const params = Object.fromEntries(result.data.params);
      expect(params.molescount).toBe('3');
    });

    it('plinko: risk + rows → risk + rows params', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: {
            betType: 'CasinoBet',
            game: 'plinko',
            inputs: { ...CASINO_INPUTS, risk: 'low', rows: 16 },
          },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      const params = Object.fromEntries(result.data.params);
      expect(params.risk).toBe('low');
      expect(params.rows).toBe('16');
    });

    it('wheel: risk + segments → risk + segments params', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: {
            betType: 'CasinoBet',
            game: 'wheel',
            inputs: { ...CASINO_INPUTS, risk: 'medium', segments: 30 },
          },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      const params = Object.fromEntries(result.data.params);
      expect(params.risk).toBe('medium');
      expect(params.segments).toBe('30');
    });

    it('bars: difficulty + tiles → difficulty + barcount params', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: {
            betType: 'CasinoBet',
            game: 'bars',
            inputs: { ...CASINO_INPUTS, difficulty: 'hard', tiles: 3 },
          },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      const params = Object.fromEntries(result.data.params);
      expect(params.difficulty).toBe('hard');
      expect(params.barcount).toBe('3');
    });

    it.each(['cases', 'chicken', 'darts', 'dragonTower', 'pump', 'snakes', 'tarot'])(
      '%s: difficulty → difficulty param',
      async (game) => {
        mockFetch.mockReturnValue(
          mockResponse(200, {
            success: true,
            data: {
              betType: 'CasinoBet',
              game,
              inputs: { ...CASINO_INPUTS, difficulty: 'expert' },
            },
          })
        );

        const result = await lookupBet(TEST_URL, 'house:123');

        expect(result.ok).toBe(true);
        if (!result.ok) return;
        const params = Object.fromEntries(result.data.params);
        expect(params.difficulty).toBe('expert');
      }
    );

    it('games without state include no extra params', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: { betType: 'CasinoBet', game: 'dice', inputs: CASINO_INPUTS },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      const params = Object.fromEntries(result.data.params);
      expect(params.difficulty).toBeUndefined();
      expect(params.mines).toBeUndefined();
      expect(params.risk).toBeUndefined();
    });
  });

  // ── Multiplayer parameter construction ──────────────────────────────────────

  describe('multiplayer parameter construction', () => {
    it('Crash: gamehash + blockhash, no slidehash', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: {
            betType: 'MultiplayerCrashBet',
            game: 'crash',
            inputs: { serverSeed: 'seed1', gameHash: 'hash1' },
          },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.data.gameName).toBe('Crash');
      const params = Object.fromEntries(result.data.params);
      expect(params.game).toBe('crash');
      expect(params.gamehash).toBe('hash1');
      expect(params.blockhash).toBe('seed1');
      expect(params.slidehash).toBeUndefined();
    });

    it('Slide: slidehash + blockhash, no gamehash', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: {
            betType: 'MultiplayerSlideBet',
            game: 'slide',
            inputs: { serverSeed: 'seed2', gameHash: 'hash2' },
          },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.data.gameName).toBe('Slide');
      const params = Object.fromEntries(result.data.params);
      expect(params.game).toBe('slide');
      expect(params.slidehash).toBe('hash2');
      expect(params.blockhash).toBe('seed2');
      expect(params.gamehash).toBeUndefined();
    });
  });

  // ── Error cases ─────────────────────────────────────────────────────────────

  describe('errors', () => {
    it.each([
      [400, 'Invalid bet ID format. Must be in format: house:123456789'],
      [404, 'Bet not found. Please check the ID and try again.'],
      [422, 'Server seed has not been revealed yet. Please try again later.'],
      [503, 'Unable to fetch bet data. Please try again later.'],
      [500, 'An unexpected error occurred. Please try again later.'],
    ])('HTTP %s → api_error with backend message', async (status, message) => {
      mockFetch.mockReturnValue(mockResponse(status, { success: false, error: message }));

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.error).toEqual({ type: 'api_error', message });
    });

    it('network failure → network_error', async () => {
      mockFetch.mockRejectedValue(new Error('Network failure'));

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.error).toEqual({ type: 'network_error' });
    });

    it('200 response with no body.data → api_error', async () => {
      mockFetch.mockReturnValue(mockResponse(200, { success: true }));

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result).toEqual({
        ok: false,
        error: {
          type: 'api_error',
          message: 'An unexpected error occurred. Please try again later.',
        },
      });
    });

    it('unsupported game slug → unsupported_game with slug', async () => {
      mockFetch.mockReturnValue(
        mockResponse(200, {
          success: true,
          data: { betType: 'CasinoBet', game: 'unknownGame', inputs: CASINO_INPUTS },
        })
      );

      const result = await lookupBet(TEST_URL, 'house:123');

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.error).toEqual({ type: 'unsupported_game', game: 'unknownGame' });
    });
  });
});

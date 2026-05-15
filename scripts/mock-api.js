/**
 * Mock stake-bet-lookup API server for local development.
 * Mimics POST /api/bet-lookup with realistic fixtures from the test suite.
 *
 * Usage:
 *   pnpm mock:api
 *
 * Then run the dev server with bet lookup enabled:
 *   PUBLIC_BET_LOOKUP_ENABLED=true PUBLIC_BET_LOOKUP_URL=http://localhost:8080 pnpm dev
 */

import { createServer } from 'node:http';

const PORT = Number(process.env.PORT ?? 8080);

// Bet ID format enforced by ValidateBetId middleware: house:\d+
const BET_ID_RE = /^house:\d+$/;

// Fixtures keyed by bet ID. Seed values taken from tests/lib/games/testcases/*.json.
const FIXTURES = {
  // ── Supported: standard casino games ──────────────────────────────────────
  'house:1000000001': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'dice',
        inputs: {
          clientSeed: '86ff027f15c48241af7f54a726690ee7',
          serverSeed: 'f2ac89b608eeb01312d115bce6741b32',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:1000000002': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'limbo',
        inputs: {
          clientSeed: '86ff027f15c48241af7f54a726690ee7',
          serverSeed: 'f2ac89b608eeb01312d115bce6741b32',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 1,
        },
      },
    },
  },

  'house:1000000003': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'roulette',
        inputs: {
          clientSeed: '86ff027f15c48241af7f54a726690ee7',
          serverSeed: 'f2ac89b608eeb01312d115bce6741b32',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 2,
        },
      },
    },
  },

  // ── Supported: card games ─────────────────────────────────────────────────
  'house:2000000001': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'blackjack',
        inputs: {
          clientSeed: 'b42fa130a68dfe8133fa268d5fb34cbe',
          serverSeed: '28ca8b5734401f5236ccb305e4526d07',
          serverSeedHash: 'c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
          nonce: 0,
        },
      },
    },
  },

  'house:2000000002': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'baccarat',
        inputs: {
          clientSeed: 'b42fa130a68dfe8133fa268d5fb34cbe',
          serverSeed: '28ca8b5734401f5236ccb305e4526d07',
          serverSeedHash: 'c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
          nonce: 1,
        },
      },
    },
  },

  // ── Supported: slots ──────────────────────────────────────────────────────
  'house:3000000001': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'slots',                           // Stake slug for Scarab Spins
        inputs: {
          clientSeed: 'd99174a86f29ac19c0b512e04b99461b',
          serverSeed: 'a1c0b94f9a5e5ab9c0f08f2982537bd8',
          serverSeedHash: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
          nonce: 0,
        },
      },
    },
  },

  'house:3000000002': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'slotsTomeOfLife',                 // Stake slug for Tome Of Life
        inputs: {
          clientSeed: 'd99174a86f29ac19c0b512e04b99461b',
          serverSeed: 'a1c0b94f9a5e5ab9c0f08f2982537bd8',
          serverSeedHash: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
          nonce: 0,
        },
      },
    },
  },

  // ── Supported: multiplayer ────────────────────────────────────────────────
  'house:4000000001': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'MultiplayerCrashBet',
        game: 'crash',
        inputs: {
          serverSeed: '23eb7069c6fc5b1369b92f5321af9f63',
          gameHash: '9dd9a4ce539a7d11a36a96c71f3d939c46d972b2e56254bc85ea2c0681541dca',
        },
      },
    },
  },

  'house:4000000002': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'MultiplayerSlideBet',
        game: 'slide',
        inputs: {
          serverSeed: '015dcda675eb8ec18254ab6f18fd8f47',
          gameHash: 'a60e04bcba668c720ce7d3b70183653181d438a99aa64bb042bdeb23aa9e63bd',
        },
      },
    },
  },

  // ── Unsupported game (has additional inputs) ──────────────────────────────
  'house:9000000001': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'mines',                           // not supported by lookup
        inputs: {
          clientSeed: '86ff027f15c48241af7f54a726690ee7',
          serverSeed: 'f2ac89b608eeb01312d115bce6741b32',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  // ── Error cases ───────────────────────────────────────────────────────────
  'house:9000000002': {
    status: 422,
    body: {
      success: false,
      error: 'Server seed has not been revealed yet. Please try again later.',
    },
  },

  'house:9000000003': {
    status: 503,
    body: {
      success: false,
      error: 'Unable to fetch bet data. Please try again later.',
    },
  },
};

// ── Request handling ──────────────────────────────────────────────────────────

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json', ...corsHeaders() });
  res.end(payload);
}

const server = createServer((req, res) => {
  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/bet-lookup') {
    send(res, 404, { success: false, error: 'Not found.' });
    return;
  }

  let body = '';
  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    let betId;
    try {
      ({ betId } = JSON.parse(body));
    } catch {
      send(res, 400, { success: false, error: 'Invalid JSON.' });
      return;
    }

    if (!betId) {
      send(res, 400, { success: false, error: 'Bet ID is required.' });
      return;
    }

    if (!BET_ID_RE.test(betId)) {
      send(res, 400, {
        success: false,
        error: 'Invalid bet ID format. Must be in format: house:123456789',
      });
      return;
    }

    const fixture = FIXTURES[betId];
    if (!fixture) {
      send(res, 404, { success: false, error: 'Bet not found. Please check the ID and try again.' });
      return;
    }

    console.log(`  ${req.method} /api/bet-lookup  betId=${betId}  →  ${fixture.status}`);
    send(res, fixture.status, fixture.body);
  });
});

server.listen(PORT, () => {
  console.log(`\nMock bet-lookup API listening on http://localhost:${PORT}\n`);
  console.log('Supported bet IDs:');
  console.log('  house:1000000001  →  dice (CasinoBet)');
  console.log('  house:1000000002  →  limbo (CasinoBet)');
  console.log('  house:1000000003  →  roulette (CasinoBet)');
  console.log('  house:2000000001  →  blackjack (CasinoBet)');
  console.log('  house:2000000002  →  baccarat (CasinoBet)');
  console.log('  house:3000000001  →  scarabspins / slots (CasinoBet)');
  console.log('  house:3000000002  →  tomeoflife / slotsTomeOfLife (CasinoBet)');
  console.log('  house:4000000001  →  crash (MultiplayerCrashBet)');
  console.log('  house:4000000002  →  slide (MultiplayerSlideBet)');
  console.log('  house:9000000001  →  mines — unsupported game');
  console.log('  house:9000000002  →  422 seed not yet revealed');
  console.log('  house:9000000003  →  503 service unavailable');
  console.log('  any other valid house:\\d+  →  404 not found');
  console.log('');
});

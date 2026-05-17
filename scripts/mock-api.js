/**
 * Mock stake-bet-lookup API server for local development.
 * Mimics POST /api/bet-lookup with realistic fixtures from the test suite.
 *
 * Usage (convenience — starts this server and vite dev together):
 *   pnpm dev:lookup
 *
 * Or run standalone and start vite dev manually in a second terminal:
 *   pnpm mock:api
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
        game: 'slots', // Stake slug for Scarab Spins
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
        game: 'slotsTomeOfLife', // Stake slug for Tome Of Life
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

  // ── Supported: remaining casino games ────────────────────────────────────
  'house:6000000001': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'flip',
        inputs: {
          clientSeed: '247e90a65d07b3c4d629ada402918f03',
          serverSeed: '8b9c7cf18c001dfb7ea6f6fe52f3df95',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000002': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'diamonds',
        inputs: {
          clientSeed: '7dbf887dbe97259c5e48b76afa459c06',
          serverSeed: '5f6de4c2f18ecbbfc1919851cd0770b7',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000003': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'primediceX',
        inputs: {
          clientSeed: '6bf42afdf7e5f6ca64c16736c750b24b',
          serverSeed: 'f9aa75c7fb39ea34fb6bd43b99357479',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000004': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'slotsSamurai',
        inputs: {
          clientSeed: '65193b8bb617054979cf9b17454374c4',
          serverSeed: '4bbede70d653a4854d567da6bdd5cbb8',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000005': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'keno',
        inputs: {
          clientSeed: '971f4d5c49eb1111385e9309d105227f',
          serverSeed: 'ae1581dc89398cb8fdb84f0a2c64e816',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000006': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'packs',
        inputs: {
          clientSeed: '5de0bfa2035f29d4d12042e5118cdb42',
          serverSeed: '323d470df849d31038224972f224893c',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000007': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'rockPaperScissors',
        inputs: {
          clientSeed: 'ae8378fe6eadaa711af43746ea6766e0',
          serverSeed: 'b3f276eca635f24d58e8f3822ba1d15c',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000008': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'drill',
        inputs: {
          clientSeed: 'af34766105e5036cdc101741e5172420',
          serverSeed: 'e9d7e56f67bf5ba273a85efea28ade0a',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000009': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'hilo',
        inputs: {
          clientSeed: '54560a34f054ad0c19edac66cf6b8e45',
          serverSeed: '412780c6e08859f955318b5c7c75e288',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  'house:6000000010': {
    status: 200,
    body: {
      success: true,
      data: {
        betType: 'CasinoBet',
        game: 'videoPoker',
        inputs: {
          clientSeed: '6ec29c0c4180fd3f802534e6c98810ff',
          serverSeed: '51b5258b38fef00c9887b7ad6c728035',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
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
        game: 'mines', // not supported by lookup
        inputs: {
          clientSeed: '86ff027f15c48241af7f54a726690ee7',
          serverSeed: 'f2ac89b608eeb01312d115bce6741b32',
          serverSeedHash: 'a2c4e6f8b0d2e4f6a8c0e2f4b6d8e0f2a4c6e8b0d2e4f6a8c0e2f4b6d8e0f2',
          nonce: 0,
        },
      },
    },
  },

  // ── Slow response — use to test dismiss-while-in-flight behaviour ─────────
  'house:5000000001': {
    status: 200,
    delayMs: 3000,
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
      send(res, 404, {
        success: false,
        error: 'Bet not found. Please check the ID and try again.',
      });
      return;
    }

    const delay = fixture.delayMs ?? 0;
    console.log(
      `  ${req.method} /api/bet-lookup  betId=${betId}  →  ${fixture.status}${delay ? `  (delayed ${delay}ms)` : ''}`
    );
    setTimeout(() => send(res, fixture.status, fixture.body), delay);
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
  console.log('  house:6000000001  →  flip (CasinoBet)');
  console.log('  house:6000000002  →  diamonds (CasinoBet)');
  console.log('  house:6000000003  →  primedice (CasinoBet)');
  console.log('  house:6000000004  →  bluesamurai / slotsSamurai (CasinoBet)');
  console.log('  house:6000000005  →  keno (CasinoBet)');
  console.log('  house:6000000006  →  packs (CasinoBet)');
  console.log('  house:6000000007  →  rockpaperscissors (CasinoBet)');
  console.log('  house:6000000008  →  drill (CasinoBet)');
  console.log('  house:6000000009  →  hilo (CasinoBet)');
  console.log('  house:6000000010  →  videopoker (CasinoBet)');
  console.log('  house:5000000001  →  dice (3s delay — test in-flight lock)');
  console.log('  house:9000000001  →  mines — unsupported game');
  console.log('  house:9000000002  →  422 seed not yet revealed');
  console.log('  house:9000000003  →  503 service unavailable');
  console.log('  any other valid house:\\d+  →  404 not found');
  console.log('');
});

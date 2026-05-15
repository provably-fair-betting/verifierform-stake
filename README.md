# 🧪 Provably Fair VerifierForm Stake

[![CI](https://github.com/provably-fair-betting/verifierform-stake/actions/workflows/ci.yml/badge.svg)](https://github.com/provably-fair-betting/verifierform-stake/actions/workflows/ci.yml) [![Version](https://img.shields.io/github/v/release/provably-fair-betting/verifierform-stake)](https://github.com/provably-fair-betting/verifierform-stake/releases/latest) [![Coverage](https://codecov.io/gh/provably-fair-betting/verifierform-stake/graph/badge.svg)](https://codecov.io/gh/provably-fair-betting/verifierform-stake)

A provably fair game verifier for Stake.games. Paste your seeds and nonce to independently verify any supported game outcome.

---

## Bet Lookup

The verifier includes an optional **Bet Lookup** feature: enter a bet ID and the form navigates to the correct game with all seeding fields pre-filled.

Bet Lookup requires the [stake-bet-lookup](https://github.com/provably-fair-betting/stake-bet-lookup) backend service.

### Supported games

Lookup works for games whose outcome depends only on the seed pair — games requiring additional inputs (Mines count, Plinko rows, etc.) are not supported.

| Category | Games |
|---|---|
| Standard | Dice, Flip, Diamonds, PrimeDice, Blue Samurai, Keno, Packs, Rock Paper Scissors, Limbo, Drill, Roulette |
| Cards | Baccarat, Blackjack, Hilo, Video Poker |
| Slots | Scarab Spins, Tome Of Life |
| Multiplayer | Crash, Slide |

---

## Local development

### Dev server (no bet lookup)

```sh
pnpm dev
```

### Dev server with bet lookup (mock API)

```sh
pnpm dev:lookup   # starts mock API on :8080 and vite dev together
```

Or manually in two terminals:

```sh
pnpm mock:api   # starts mock bet-lookup API on http://localhost:8080
```

```sh
PUBLIC_BET_LOOKUP_ENABLED=true PUBLIC_BET_LOOKUP_URL=http://localhost:8080 pnpm dev
```

#### Mock bet IDs

| Bet ID | Game | Type | Notes |
|---|---|---|---|
| `house:1000000001` | Dice | CasinoBet | |
| `house:1000000002` | Limbo | CasinoBet | |
| `house:1000000003` | Roulette | CasinoBet | |
| `house:2000000001` | Blackjack | CasinoBet | |
| `house:2000000002` | Baccarat | CasinoBet | |
| `house:3000000001` | Scarab Spins (slots) | CasinoBet | |
| `house:3000000002` | Tome Of Life (slotsTomeOfLife) | CasinoBet | |
| `house:4000000001` | Crash | MultiplayerCrashBet | |
| `house:4000000002` | Slide | MultiplayerSlideBet | |
| `house:9000000001` | Mines | CasinoBet | Unsupported game |
| `house:9000000002` | — | — | 422 seed not yet revealed |
| `house:9000000003` | — | — | 503 service unavailable |
| any other `house:\d+` | — | — | 404 not found |

---

## Build-time configuration

| Variable | Purpose |
|---|---|
| `PUBLIC_BET_LOOKUP_ENABLED` | Set to `true` to show the Bet Lookup bar |
| `PUBLIC_BET_LOOKUP_URL` | Base URL of the bet-lookup API as seen from the browser |

See `.env.example` for reference. For local dev, set via `.env.local`.

---

## Using as a package

Install from the private registry and build with your own env vars:

```sh
pnpm add @provably-fair-betting/verifierform-stake
PUBLIC_BET_LOOKUP_ENABLED=true PUBLIC_BET_LOOKUP_URL=https://api.example.com pnpm build
```

If the API is on a separate origin, that host must emit appropriate CORS headers.

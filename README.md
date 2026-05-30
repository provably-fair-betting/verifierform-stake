# verifierform-stake

[![CI](https://github.com/provably-fair-betting/verifierform-stake/actions/workflows/ci.yml/badge.svg)](https://github.com/provably-fair-betting/verifierform-stake/actions/workflows/ci.yml) [![Version](https://img.shields.io/github/v/release/provably-fair-betting/verifierform-stake)](https://github.com/provably-fair-betting/verifierform-stake/releases/latest) [![Coverage](https://codecov.io/gh/provably-fair-betting/verifierform-stake/graph/badge.svg)](https://codecov.io/gh/provably-fair-betting/verifierform-stake)

A provably fair game verifier for Stake.games. Paste your seeds and nonce to independently verify any supported game outcome.

---

## Bet Lookup

The verifier includes an optional **Bet Lookup** feature: enter a bet ID and the form navigates to the correct game with all seeding fields pre-filled.

Bet Lookup requires the [verifierform-stake-bet-lookup](https://github.com/provably-fair-betting/verifierform-stake-bet-lookup) backend service.

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

#### Mock bet IDs

| Bet ID                | Game                | Type                | Notes                          |
| --------------------- | ------------------- | ------------------- | ------------------------------ |
| `house:1000000001`    | Dice                | CasinoBet           |                                |
| `house:1000000002`    | Limbo               | CasinoBet           |                                |
| `house:1000000003`    | Roulette            | CasinoBet           |                                |
| `house:2000000001`    | Blackjack           | CasinoBet           |                                |
| `house:2000000002`    | Baccarat            | CasinoBet           |                                |
| `house:3000000001`    | Scarab Spins        | CasinoBet           |                                |
| `house:3000000002`    | Tome Of Life        | CasinoBet           |                                |
| `house:4000000001`    | Crash               | MultiplayerCrashBet |                                |
| `house:4000000002`    | Slide               | MultiplayerSlideBet |                                |
| `house:5000000001`    | Dice                | CasinoBet           | 3s delay — test in-flight lock |
| `house:6000000001`    | Flip                | CasinoBet           |                                |
| `house:6000000002`    | Diamonds            | CasinoBet           |                                |
| `house:6000000003`    | PrimeDice           | CasinoBet           |                                |
| `house:6000000004`    | Blue Samurai        | CasinoBet           |                                |
| `house:6000000005`    | Keno                | CasinoBet           |                                |
| `house:6000000006`    | Packs               | CasinoBet           |                                |
| `house:6000000007`    | Rock Paper Scissors | CasinoBet           |                                |
| `house:6000000008`    | Drill               | CasinoBet           |                                |
| `house:6000000009`    | Hilo                | CasinoBet           |                                |
| `house:6000000010`    | Video Poker         | CasinoBet           |                                |
| `house:7000000001`    | Mines               | CasinoBet           | minesCount: 5                  |
| `house:7000000002`    | Moles               | CasinoBet           | molesCount: 3                  |
| `house:7000000003`    | Plinko              | CasinoBet           | risk: low, rows: 16            |
| `house:7000000004`    | Wheel               | CasinoBet           | risk: medium, segments: 30     |
| `house:7000000005`    | Bars                | CasinoBet           | difficulty: hard, tiles: 3     |
| `house:7000000006`    | Cases               | CasinoBet           | difficulty: medium             |
| `house:7000000007`    | Chicken             | CasinoBet           | difficulty: easy               |
| `house:7000000008`    | Darts               | CasinoBet           | difficulty: hard               |
| `house:7000000009`    | Dragon Tower        | CasinoBet           | difficulty: expert             |
| `house:7000000010`    | Pump                | CasinoBet           | difficulty: easy               |
| `house:7000000011`    | Snakes              | CasinoBet           | difficulty: master             |
| `house:7000000012`    | Tarot               | CasinoBet           | difficulty: medium             |
| `house:9000000002`    | —                   | —                   | 422 seed not yet revealed      |
| `house:9000000003`    | —                   | —                   | 503 service unavailable        |
| any other `house:\d+` | —                   | —                   | 404 not found                  |

---

## Runtime configuration

The Docker image reads `BET_LOOKUP_URL` at container startup and writes it into `/config.json`, which the app fetches on first load. Bet Lookup is enabled only when the URL is present.

| Variable         | Purpose                                                 |
| ---------------- | ------------------------------------------------------- |
| `BET_LOOKUP_URL` | Base URL of the bet-lookup API as seen from the browser |

---

## Docker image

A pre-built image is published to GitHub Container Registry on every release:

```
ghcr.io/provably-fair-betting/verifierform-stake:<version>
```

| Tag pattern | Resolves to                   | Updates on                        |
| ----------- | ----------------------------- | --------------------------------- |
| `1.2.3`     | `1.2.3`                       | that release only                 |
| `1.2`       | latest `1.2.x` (e.g. `1.2.4`) | patch releases within `1.2`       |
| `1`         | latest `1.x.y` (e.g. `1.3.0`) | minor + patch releases within `1` |

See the [integration environment](https://github.com/provably-fair-betting/verifierform-stake-env) for a ready-made Docker Compose setup that wires this image together with the bet-lookup backend.

### Testing the image locally

```sh
docker build -t verifierform-stake:local .

# Without bet lookup
docker run --rm -p 3000:80 verifierform-stake:local

# With bet lookup
docker run --rm -p 3000:80 -e BET_LOOKUP_URL=http://your-bet-lookup-host verifierform-stake:local

# open http://localhost:3000
```

---

## Using as a package

Install from GitHub and build with your own tooling:

```sh
pnpm add github:provably-fair-betting/verifierform-stake
pnpm build
```

To serve at a subpath, set `BASE_PATH` at build time (e.g. `BASE_PATH=/verifier pnpm build`).

### Enabling Bet Lookup

Serve a `config.json` at `<basepath>/config.json` with the following shape:

```json
{ "betLookupUrl": "https://your-bet-lookup-host" }
```

The app fetches this file on load and enables Bet Lookup only when `betLookupUrl` is present. If the API is on a separate origin, that host must emit appropriate CORS headers. Omit the file (or serve `{}`) to run the verifier without Bet Lookup.

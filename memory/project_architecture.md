---
name: Lazy Loading & GameEntry Architecture
description: Current architecture for lazy-loading game definitions; GameEntry pattern; lib submodule relationship
type: project
---

## Lazy Loading (implemented 2026-04-28)

Each game is registered in `src/routes/+page.svelte` as a `GameEntry`:

```ts
{ name: 'Dice', loader: () => import('$lib/games/dice').then(m => m.gameDefinition) }
```

Vite creates a separate chunk per game. The chunk includes that game's components, composables, and any statically imported assets (JSON paylines, etc.). Images are URL strings → separate HTTP requests on render.

`VerifierForm` (in the lib) accepts `Record<string, GameEntry>` and loads definitions lazily via `activateGame()`. Results are cached in `Map<string, GameDefinition>` so repeated game switches are instant. An `onMount` pre-loads the initial URL game so controls render without consuming `firstNavigation`.

## Control Type API (as of 2026-04-28)

`Control` is a discriminated union on `type`:

- `text` — user text input
- `number` — user numeric input; `min`/`max`/`step` are first-class fields (no `attrs`)
- `select` — dropdown; `options: string[]`
- `hidden` — URL-synced state bucket, never rendered (replaces `hide: () => true`)
- `static` — read-only display field with fixed `value` (replaces `disabled + syncToUrl:false + attrs.value`)

`name` was removed from all control types (always equalled `id`).
`ResultComponent`/`ExplanationComponent` renamed to `result`/`explanation` on `GameDefinition`.

## Lib Submodule

`provably-fair-verifierform-lib/` is a git submodule. The main app links it via `link:./provably-fair-verifierform-lib` in package.json. After changing lib source, run `pnpm build` inside the lib to regenerate `dist/` before the main app picks up type changes.

**Why:** lib exports from `./dist/index.d.ts` (not source directly).

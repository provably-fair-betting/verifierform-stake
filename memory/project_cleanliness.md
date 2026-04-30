---
name: Component Cleanliness Audit — Outstanding Items
description: Remaining actionable items from the April 2026 component cleanliness audit (planning/component-cleanliness-audit.md)
type: project
---

The full audit is in `planning/component-cleanliness-audit.md`. Outstanding items as of 2026-04-28:

## P1 — Bugs

- `BlackjackResult.svelte`: "Initial player cards" renders `initialDealer` and vice versa — labels swapped
- `LimboResult.svelte`: label reads "Crash point" — should be "Multiplier" or "Limbo point"

## P2 — Folder Structure

- `src/lib/games/bluesamurai/` — 11 files flat; extract helpers to `components/` subfolder
- `src/lib/games/scarabspins-tomeoflife/` — rename to `slots/`; shared Slot\*.svelte have no neutral home
- `src/lib/util/scarabspins-tomeoflife.ts` — rename to `slots.ts`
- `src/lib/util/array/chunk.ts` — promote to `util/array.ts`
- `src/lib/util/shuffle-impl/` — flatten to `util/fisherYates.ts` + `util/shuffle.ts`
- `src/lib/util/scroll-impl/` — flatten to `util/scroll.ts`

## P3 — Inline Logic → Util

- `MinesExplanation.svelte`: tab class strings → `getMinesTabClass()`/`getMinesTabSelectedClass()` in `mines.ts`
- `ChickenExplanation.svelte`: same → create `util/chicken.ts`
- `SlotExplanation.svelte`: BTN\_\* imports used inline → `getSlotTabClass()` in `slots.ts`
- `SlotResult.svelte`: BTN_BG_COLOR_GREEN\* inline → `getSlotResultTabClass()` in `slots.ts`
- `LimboResultStep.svelte`: magic numbers `16777216`, `0.01` → create `util/limbo.ts` with named constants

## P4 — @html String Templating

- `PumpExplanation.svelte` Step 1 & Step 3: replace `{@html Array.from(...).join('')}` with `{#each}` markup

## P5 — Inline Button Classes (Moles)

- `MolesExplanation.svelte` + `MolesResult.svelte`: extract button class strings to `util/moles.ts`

## P6 — Minor Cleanup

- `src/lib/util/color.ts`: delete commented `// console.log('hex=', hex)`

**Why:** Tracked here because `planning/component-cleanliness-audit.md` is the source of truth but gets stale as work is completed.

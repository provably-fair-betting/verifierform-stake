import probabilities from '$lib/games/bluesamurai/bluesamurai-probabilities.json';
import {
  BlueSamuraiIcon,
  BlueSamuraiReelType,
  BlueSamuraiRetriggerType,
  type BlueSamuraiRound,
  type BlueSamuraiSymbol,
} from '$lib/types';
import { OrderedSet } from 'immutable';
import bigDecimal from 'js-big-decimal';

// ---------------------------------------------------------------------------
// Round type predicates
// ---------------------------------------------------------------------------

function isSpecialTriggerRound(round: BlueSamuraiRound): boolean {
  return !!(round.retrigger && round.retriggerType === BlueSamuraiRetriggerType.SPECIAL);
}

function isBonusTriggerRound(round: BlueSamuraiRound): boolean {
  return !!(round.retrigger && round.retriggerType === BlueSamuraiRetriggerType.BONUS);
}

/**
 * Generates a smart summary for Blue Samurai rounds
 * @param rounds - All rounds in the game
 * @returns A descriptive summary string
 */
export function getBlueSamuraiSummary(rounds: BlueSamuraiRound[]): string {
  if (rounds.length === 1) return '';

  // Count different types of spins
  const bonusSpins = rounds.filter((r) => !r.specialRound && r.bonusSpin > 0).length;
  const specialSpins = rounds.filter((r) => r.specialRound).length;
  const bonusTriggers = rounds.filter((r) => isBonusTriggerRound(r)).length;
  const specialTriggers = rounds.filter((r) => isSpecialTriggerRound(r)).length;

  // Retriggers are triggers beyond the first one
  const bonusRetriggers = Math.max(0, bonusTriggers - 1);

  // Build the summary parts
  const parts: string[] = [];

  if (bonusSpins > 0) {
    parts.push(`${bonusSpins} Bonus spin${bonusSpins > 1 ? 's' : ''}`);
  }

  if (specialSpins > 0) {
    parts.push(`${specialSpins} Special spin${specialSpins > 1 ? 's' : ''}`);
  }

  let summary = parts.join(' + ');

  // Only show trigger/retrigger information if there are bonus spins
  // (special rounds alone don't need trigger count)
  if (bonusSpins > 0) {
    const triggers: string[] = [];
    if (bonusRetriggers > 0) {
      triggers.push(`${bonusRetriggers}× Bonus retrigger${bonusRetriggers > 1 ? 's' : ''}`);
    }
    if (specialTriggers > 0) {
      triggers.push(`${specialTriggers}× Special trigger${specialTriggers > 1 ? 's' : ''}`);
    }

    if (triggers.length > 0) {
      summary += ` (${triggers.join(', ')})`;
    }
  }

  return summary;
}

/** A special round that was not itself the trigger (one of the 5 awarded spins) */
function isUnpairedSpecialRound(round: BlueSamuraiRound): boolean {
  return !round.retrigger && !round.retriggerType && !!round.specialRound;
}

// ---------------------------------------------------------------------------
// Round classification — UI helpers
// ---------------------------------------------------------------------------

export function getRoundBadgeClass(round: BlueSamuraiRound): string {
  if (isSpecialTriggerRound(round))
    return 'border-red-500 bg-red-100 text-red-700 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400';
  if (round.specialRound)
    return 'border-blue-500 bg-blue-100 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400';
  if (isBonusTriggerRound(round))
    return 'border-green-500 bg-green-100 text-green-700 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400';
  return 'border-purple-500 bg-purple-100 text-purple-700 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400';
}

export function getRoundLabel(round: BlueSamuraiRound): string {
  if (round.specialRound) return `Special Round ${round.specialSpin}/5`;
  if (round.bonusSpin! > 0) return `Bonus Round ${round.bonusSpin}/${round.totalBonusRounds}`;
  return `Spin ${round.round}`;
}

export function getRoundTriggerBadge(round: BlueSamuraiRound): string | null {
  if (!round.retrigger) return null;
  if (isSpecialTriggerRound(round)) return '⚔️ Triggered +5 Special Rounds';
  if (isBonusTriggerRound(round)) return '⭐ Triggered +10 Bonus Rounds';
  return null;
}

export function getRoundSelectedRing(round: BlueSamuraiRound): string {
  if (isSpecialTriggerRound(round)) return 'ring-2 ring-red-500 dark:ring-red-400';
  if (round.specialRound) return 'ring-2 ring-blue-500 dark:ring-blue-400';
  if (isBonusTriggerRound(round)) return 'ring-2 ring-green-500 dark:ring-green-400';
  return 'ring-2 ring-purple-500 dark:ring-purple-400';
}

// ---------------------------------------------------------------------------
// Tab classes (ResultTabs)
// ---------------------------------------------------------------------------

const TAB_BASE_UNSELECTED =
  'rounded border-2 p-1.5 opacity-70 ring-2 ring-transparent hover:opacity-80 !outline-none ';
const TAB_BASE_SELECTED =
  'rounded border-2 p-1.5 font-bold opacity-100 shadow-lg ring-2 z-10 !outline-none ';

/** Tab class used in ResultTabs — unselected state */
export function getRoundTabClass(round: BlueSamuraiRound): string {
  if (isSpecialTriggerRound(round))
    return (
      TAB_BASE_UNSELECTED +
      'border-red-300 bg-gray-100 text-gray-500 hover:border-red-400 dark:border-red-700 dark:bg-gray-800 dark:text-gray-400'
    );
  if (isUnpairedSpecialRound(round))
    return (
      TAB_BASE_UNSELECTED +
      'border-blue-300 bg-gray-100 text-gray-500 hover:border-blue-400 dark:border-blue-700 dark:bg-gray-800 dark:text-gray-400'
    );
  if (isBonusTriggerRound(round))
    return (
      TAB_BASE_UNSELECTED +
      'border-green-300 bg-gray-100 text-gray-500 hover:border-green-400 dark:border-green-700 dark:bg-gray-800 dark:text-gray-400'
    );
  return (
    TAB_BASE_UNSELECTED +
    'border-gray-300 bg-gray-100 text-gray-500 hover:border-purple-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
  );
}

/** Tab class used in ResultTabs — selected state */
export function getRoundTabSelectedClass(round: BlueSamuraiRound): string {
  if (isSpecialTriggerRound(round))
    return (
      TAB_BASE_SELECTED +
      'border-red-500 bg-red-100 text-red-700 ring-red-400 dark:border-red-400 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-400'
    );
  if (isUnpairedSpecialRound(round))
    return (
      TAB_BASE_SELECTED +
      'border-blue-500 bg-blue-100 text-blue-700 ring-blue-400 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400'
    );
  if (isBonusTriggerRound(round))
    return (
      TAB_BASE_SELECTED +
      'border-green-500 bg-green-100 text-green-700 ring-green-400 dark:border-green-400 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-400'
    );
  return (
    TAB_BASE_SELECTED +
    'border-purple-500 bg-purple-100 text-purple-700 ring-purple-400 dark:border-purple-400 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-400'
  );
}

// ---------------------------------------------------------------------------
// Board layout helpers
// ---------------------------------------------------------------------------

export type BoardCell = {
  symbolIndex: number;
  floatIndex: number;
  icon: BlueSamuraiIcon;
  hasFloat: boolean;
  locked: boolean;
  isOuter: boolean;
};

export type ItemWithSymbol = BlueSamuraiRound & { symbol: BlueSamuraiSymbol };

/** Flattens all rounds into a list of (round, symbol) pairs for float-index lookup */
export function buildFlatItems(rounds: BlueSamuraiRound[]): ItemWithSymbol[] {
  return rounds.flatMap((round) =>
    round.symbols.filter((symbol) => symbol.float).map((symbol) => ({ ...round, symbol }))
  );
}

function buildFloatIndexMap(
  symbols: BlueSamuraiSymbol[],
  round: BlueSamuraiRound,
  flatItems: ItemWithSymbol[]
): Map<number, number> {
  const map = new Map<number, number>();
  for (const symbol of symbols) {
    if (!symbol.float) continue;
    const globalIndex = flatItems.findIndex(
      (it) => it.round === round.round && it.symbol.index === symbol.index
    );
    if (globalIndex !== -1) map.set(symbol.index, globalIndex);
  }
  return map;
}

function buildColumn(
  symbols: BlueSamuraiSymbol[],
  isOuter: boolean,
  round: BlueSamuraiRound,
  floatIndexMap: Map<number, number>
): BoardCell[] {
  return symbols.map((s) => ({
    symbolIndex: s.index,
    floatIndex: floatIndexMap.get(s.index) ?? -1,
    icon:
      round.specialRound && round.stuckSamurais?.has(s.index) ? BlueSamuraiIcon.SAMURAI : s.icon,
    hasFloat: !!s.float,
    locked: !!(
      round.specialRound &&
      round.stuckSamurais?.has(s.index) &&
      !round.newlyLockedSamurais?.has(s.index)
    ),
    isOuter,
  }));
}

/**
 * Builds the 5-column board cell layout for a given round,
 * annotating each cell with its global float index.
 */
export function buildBoardColumns(
  round: BlueSamuraiRound,
  flatItems: ItemWithSymbol[]
): BoardCell[][] {
  const { symbols } = round;
  const floatIndexMap = buildFloatIndexMap(symbols, round, flatItems);
  const col = (slice: BlueSamuraiSymbol[], isOuter: boolean) =>
    buildColumn(slice, isOuter, round, floatIndexMap);

  return [
    col(symbols.slice(0, 3), true),
    col(symbols.slice(3, 7), false),
    col(symbols.slice(7, 11), false),
    col(symbols.slice(11, 15), false),
    col(symbols.slice(15), true),
  ];
}

// ---------------------------------------------------------------------------
// Cell border class
// ---------------------------------------------------------------------------

function isSpecialRoundTriggerIcon(index: number, round: BlueSamuraiRound): boolean {
  return (
    (index < 4 && isLeftOuterReelSamurais(round)) || (index > 15 && isRightOuterReelSamurais(round))
  );
}

function isFocusedCell(index: number | undefined, focused: number | undefined): boolean {
  return focused !== undefined && index !== undefined && focused === index - 1;
}

function isSamuraiCell(
  icon: BlueSamuraiIcon,
  index: number | undefined,
  round: BlueSamuraiRound
): boolean {
  return (
    (!!round.specialRound && index !== undefined && !!round.stuckSamurais?.has(index + 2)) ||
    icon === BlueSamuraiIcon.SAMURAI
  );
}

/** Cell border/background class for BlueSamuraiBoard */
export function getCellBorderClass(
  icon: BlueSamuraiIcon,
  index: number | undefined,
  round: BlueSamuraiRound,
  focused: number | undefined
): string {
  if (isFocusedCell(index, focused))
    return 'border-purple-400 bg-purple-100 dark:border-purple-500 dark:bg-purple-900/30';

  if (isSamuraiCell(icon, index, round)) {
    const isHighlightedTrigger =
      index !== undefined &&
      isSpecialTriggerRound(round) &&
      isSpecialRoundTriggerIcon(index, round);
    return isHighlightedTrigger || round.specialRound
      ? 'border-blue-500 bg-blue-100 dark:border-blue-400 dark:bg-blue-900/30'
      : 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20';
  }

  if (icon === BlueSamuraiIcon.SCATTER)
    return isBonusTriggerRound(round)
      ? 'border-green-500 bg-green-100 dark:border-green-400 dark:bg-green-900/30'
      : 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20';

  return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800';
}

/**
 * Returns the icon to display for a board cell, substituting SAMURAI
 * for stuck positions during a special round.
 */
export function getDisplayIcon(
  icon: BlueSamuraiIcon,
  index: number | undefined,
  round: BlueSamuraiRound
): BlueSamuraiIcon {
  if (round.specialRound && index !== undefined && round.stuckSamurais?.has(index + 2)) {
    return BlueSamuraiIcon.SAMURAI;
  }
  return icon;
}

/**
 * Column opacity/highlight class for the float-to-symbol probability table.
 * @param n - column index (position in probabilities array)
 * @param matchedIndex - index of the matched symbol, or -1 if not yet active
 * @param isActive - whether a float + reelType have been provided
 */
export function getProbabilityColClass(n: number, matchedIndex: number, isActive: boolean): string {
  if (!isActive) return '';
  if (n === matchedIndex) return 'bg-purple-100 dark:bg-purple-900/40';
  return 'opacity-40';
}

/**
 * Cell class for a summed-probability cell in the float-to-symbol table.
 * @param n - column index
 * @param matchedIndex - index of the matched symbol, or -1
 * @param isActive - whether a float + reelType have been provided
 * @param isActiveRow - whether this row is for the currently selected reel type
 */
export function getProbabilitySummedCellClass(
  n: number,
  matchedIndex: number,
  isActive: boolean,
  isActiveRow: boolean
): string {
  if (!isActiveRow || !isActive) return '';
  if (n === matchedIndex)
    return 'bg-green-200 text-green-800 font-bold dark:bg-green-800/50 dark:text-green-300';
  return '';
}

/**
 * Badge class for a retrigger badge inside BlueSamuraiRoundNavigator.
 * Returns null when the round has no retrigger.
 */
export function getRoundRetriggerBadgeClass(round: BlueSamuraiRound): string | null {
  if (!round.retrigger) return null;
  if (isSpecialTriggerRound(round))
    return 'border-red-400 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-900/20 dark:text-red-400';
  if (isBonusTriggerRound(round))
    return 'border-green-400 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-900/20 dark:text-green-400';
  return null;
}

// ---------------------------------------------------------------------------
// Reel index helpers (BlueSamuraiBoard)
// ---------------------------------------------------------------------------

/** Reel-index helpers used by BlueSamuraiBoard */
export function reelNoIndex(
  values: BlueSamuraiSymbol[]
): { index: undefined; icon: BlueSamuraiIcon }[] {
  return values.map(({ icon }) => ({ index: undefined, icon }));
}

export function reelWithIndex(
  values: BlueSamuraiSymbol[],
  start: number
): { index: number; icon: BlueSamuraiIcon }[] {
  return values.map(({ icon }, i) => ({ index: start + i, icon }));
}

// ---------------------------------------------------------------------------
// Probability tables
// ---------------------------------------------------------------------------

type SymbolData = {
  min?: bigDecimal;
  max?: bigDecimal;
  symbol: BlueSamuraiIcon;
};

function buildSummedProbabilities(
  selector: (p: (typeof probabilities)[number]) => number
): { max: bigDecimal; symbol: BlueSamuraiIcon }[] {
  const result: { max: bigDecimal; symbol: BlueSamuraiIcon }[] = [];
  let running = new bigDecimal(0);
  for (const probability of probabilities) {
    const value = selector(probability);
    if (value === 0) continue;
    running = running.add(new bigDecimal(value));
    result.push({ max: running, symbol: probability.symbol as BlueSamuraiIcon });
  }
  return result;
}

export const innerTileProbabilitySummed = buildSummedProbabilities((p) => p.inner);
export const outerTileProbabilitySummed = buildSummedProbabilities((p) => p.outer);

export function isLeftOuterReelSamurais(round: BlueSamuraiRound) {
  return round.symbols.slice(0, 3).every(({ icon }) => icon === BlueSamuraiIcon.SAMURAI);
}

export function isRightOuterReelSamurais(round: BlueSamuraiRound) {
  return round.symbols.slice(-3).every(({ icon }) => icon === BlueSamuraiIcon.SAMURAI);
}

// ---------------------------------------------------------------------------
// Pre-computed summed-probability index maps (static, computed once)
// ---------------------------------------------------------------------------

function buildSummedByIndex(
  summed: { max: bigDecimal; symbol: BlueSamuraiIcon }[]
): Map<number, { max: string; min: string }> {
  const map = new Map<number, { max: string; min: string }>();
  for (let i = 0; i < summed.length; i++) {
    const entry = summed[i];
    const idx = probabilities.findIndex((p) => p.symbol === entry.symbol);
    if (idx !== -1) {
      const min = summed[i - 1]?.max.getValue() ?? '0';
      map.set(idx, { max: entry.max.getValue(), min });
    }
  }
  return map;
}

export const innerSummedByIndex = buildSummedByIndex(innerTileProbabilitySummed);
export const outerSummedByIndex = buildSummedByIndex(outerTileProbabilitySummed);

// ---------------------------------------------------------------------------
// Round simulation
// ---------------------------------------------------------------------------

function findSymbol(float: number, reelType: BlueSamuraiReelType): SymbolData {
  const summed =
    reelType === BlueSamuraiReelType.INNER
      ? innerTileProbabilitySummed
      : outerTileProbabilitySummed;
  const bd = new bigDecimal(float);
  for (let i = 0; i < summed.length; i++) {
    if (bd.compareTo(summed[i].max) < 0) {
      return {
        symbol: summed[i].symbol,
        min: summed[i - 1]?.max ?? new bigDecimal(0),
        max: summed[i].max,
      };
    }
  }
  return { symbol: summed[summed.length - 1].symbol };
}

function isSpecialRoundTrigger(symbols: BlueSamuraiSymbol[]): boolean {
  return (
    symbols.slice(0, 3).every(({ icon }) => icon === BlueSamuraiIcon.SAMURAI) ||
    symbols.slice(-3).every(({ icon }) => icon === BlueSamuraiIcon.SAMURAI)
  );
}

function buildSymbols(
  specialRound: boolean,
  floatGenerator: Generator<number, number, number>
): BlueSamuraiSymbol[] {
  const symbols: BlueSamuraiSymbol[] = [];
  for (let i = 0; i < 18; i++) {
    const isOuter = i < 3 || i > 14;
    const float = specialRound && isOuter ? undefined : floatGenerator.next().value;
    const reelType = isOuter ? BlueSamuraiReelType.OUTER : BlueSamuraiReelType.INNER;
    const data: SymbolData =
      specialRound && isOuter ? { symbol: BlueSamuraiIcon.SAMURAI } : findSymbol(float!, reelType);
    symbols.push({ float, icon: data.symbol, reelType, min: data.min, max: data.max, index: i });
  }
  return symbols;
}

function countScatters(symbols: BlueSamuraiSymbol[]): number {
  return symbols.filter(({ icon }) => icon === BlueSamuraiIcon.SCATTER).length;
}

function updateStuckSamurais(
  symbols: BlueSamuraiSymbol[],
  specialRound: boolean,
  stuckSamurais: OrderedSet<number>
): OrderedSet<number> {
  if (!specialRound) return stuckSamurais;
  let updated = stuckSamurais;
  for (const { index, icon } of symbols) {
    const isOuter = index < 3 || index > 14;
    if (!isOuter && !updated.has(index) && icon === BlueSamuraiIcon.SAMURAI) {
      updated = updated.add(index);
    }
  }
  return updated;
}

export function simulateRounds(
  floatGenerator: Generator<number, number, number>
): BlueSamuraiRound[] {
  const allRounds: BlueSamuraiRound[] = [];
  let stuckSamurais: OrderedSet<number> = OrderedSet([]);
  let totalBonusRounds = 0;
  let bonusSpin = 0;
  let roundNumber = 1;
  let remainingRounds = 1;
  let remainingSpecialRounds = 0;

  while (remainingRounds > 0) {
    const specialRound = remainingSpecialRounds > 0;
    const stuckSamuraisBefore = stuckSamurais;

    const symbols = buildSymbols(specialRound, floatGenerator);
    stuckSamurais = updateStuckSamurais(symbols, specialRound, stuckSamurais);

    const scatters = countScatters(symbols);
    const specialTrigger = remainingSpecialRounds === 0 && isSpecialRoundTrigger(symbols);

    let retrigger = false;
    let retriggerType: BlueSamuraiRetriggerType | undefined;

    if (scatters >= 3) {
      retrigger = true;
      retriggerType = BlueSamuraiRetriggerType.BONUS;
      totalBonusRounds += 10;
    } else if (specialTrigger) {
      retrigger = true;
      retriggerType = BlueSamuraiRetriggerType.SPECIAL;
    }

    allRounds.push({
      retrigger,
      retriggerType,
      round: roundNumber++,
      specialRound,
      bonusSpin,
      specialSpin: specialRound ? 5 - remainingSpecialRounds + 1 : undefined,
      stuckSamurais: specialRound ? stuckSamurais : undefined,
      newlyLockedSamurais: specialRound ? stuckSamurais.subtract(stuckSamuraisBefore) : undefined,
      totalBonusRounds,
      symbols,
    });

    if (!specialRound) bonusSpin++;
    remainingSpecialRounds = Math.max(remainingSpecialRounds - 1, 0);
    if (remainingSpecialRounds === 0) stuckSamurais = stuckSamurais.clear();

    remainingRounds--;
    if (scatters >= 3) remainingRounds += 10;
    else if (specialTrigger) {
      remainingSpecialRounds += 5;
      remainingRounds += 5;
    }
  }

  return allRounds;
}

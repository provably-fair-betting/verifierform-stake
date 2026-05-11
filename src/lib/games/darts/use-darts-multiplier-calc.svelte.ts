import { WEDGE_BIN_COLORS, getThresholdRows, getMatchedRowIndex } from '$lib/games/darts/darts';
import type { DartsDifficulty } from './types';

/** Darts multiplier step calculations */
export function useDartsMultiplierCalc(
  getRotation: () => number,
  getNormalisedDistance: () => number,
  getColorHex: () => string,
  getDifficulty: () => DartsDifficulty
) {
  const r = $derived(getNormalisedDistance() * 1000);
  const deg = $derived((((getRotation() % 1) + 1) % 1) * 360);
  const wedgeBin = $derived(Math.floor(deg / 20));

  const isWedgeZone = $derived(
    getColorHex() === '#fb6120' || getColorHex() === '#fb053f' || getColorHex() === '#fcc101'
  );

  const wedgeBinColors = $derived(WEDGE_BIN_COLORS[getDifficulty()]);
  const thresholdRows = $derived(getThresholdRows(getDifficulty(), getColorHex()));
  const matchedRowIndex = $derived(getMatchedRowIndex(getDifficulty(), r));

  return {
    get r() {
      return r;
    },
    get deg() {
      return deg;
    },
    get wedgeBin() {
      return wedgeBin;
    },
    get isWedgeZone() {
      return isWedgeZone;
    },
    get wedgeBinColors() {
      return wedgeBinColors;
    },
    get thresholdRows() {
      return thresholdRows;
    },
    get matchedRowIndex() {
      return matchedRowIndex;
    },
  };
}

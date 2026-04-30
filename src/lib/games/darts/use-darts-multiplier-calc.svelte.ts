import { WEDGE_BIN_COLORS, getThresholdRows, getMatchedRowIndex } from '$lib/games/darts/darts';
import type { DartsDifficulty } from '$lib/types';

/** Darts multiplier step calculations */
export function useDartsMultiplierCalc(
  rotation: number,
  normalisedDistance: number,
  colorHex: string,
  difficulty: DartsDifficulty
) {
  const r = $derived(normalisedDistance * 1000);
  const deg = $derived((((rotation % 1) + 1) % 1) * 360);
  const wedgeBin = $derived(Math.floor(deg / 20));

  const isWedgeZone = $derived(
    colorHex === '#fb6120' || colorHex === '#fb053f' || colorHex === '#fcc101'
  );

  const wedgeBinColors = $derived(WEDGE_BIN_COLORS[difficulty]);
  const thresholdRows = $derived(getThresholdRows(difficulty, colorHex));
  const matchedRowIndex = $derived(getMatchedRowIndex(difficulty, r));

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

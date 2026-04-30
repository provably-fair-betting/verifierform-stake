import { DARTS_COLOR_TO_MULTI } from './darts.config';
import { DartsColor, DartsDifficulty } from '$lib/types';

export const DARTS_COLOR_LABELS: Record<string, string> = {
  '#24e700': 'Green',
  '#fb053f': 'Red',
  '#fcc101': 'Yellow',
  '#fb6120': 'Orange',
  '#213843': 'Light Gray',
  '#0e202c': 'Dark Gray',
};

/** Per-difficulty wedge bin → hex color (18 bins × 4 difficulties) */
export const WEDGE_BIN_COLORS: Record<DartsDifficulty, string[]> = {
  [DartsDifficulty.EASY]: [
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
  ],
  [DartsDifficulty.MEDIUM]: [
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
  ],
  [DartsDifficulty.HARD]: [
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fb053f',
  ],
  [DartsDifficulty.EXPERT]: [
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fcc101',
    '#fb6120',
    '#fcc101',
    '#fcc101',
    '#fb053f',
    '#fcc101',
    '#fcc101',
    '#fb6120',
    '#fcc101',
  ],
};

export type ThresholdRow = { label: string; condition: string; color: string; isWedge?: boolean };

export function getThresholdRows(diff: DartsDifficulty, wedgeColor: string): ThresholdRow[] {
  if (diff === DartsDifficulty.EASY)
    return [
      { label: 'Green', condition: 'r ≤ 62.5', color: '#24e700' },
      { label: 'Dark Gray', condition: '62.5 < r ≤ 275', color: '#0e202c' },
      { label: 'Light Gray', condition: '275 < r ≤ 375', color: '#213843' },
      { label: 'Wedge', condition: '375 < r < 450', color: wedgeColor, isWedge: true },
      { label: 'Dark Gray', condition: 'r ≥ 450', color: '#0e202c' },
    ];
  if (diff === DartsDifficulty.MEDIUM)
    return [
      { label: 'Green', condition: 'r ≤ 50', color: '#24e700' },
      { label: 'Dark Gray', condition: '50 < r ≤ 225', color: '#0e202c' },
      { label: 'Light Gray', condition: '225 < r ≤ 350', color: '#213843' },
      { label: 'Wedge', condition: '350 < r < 400', color: wedgeColor, isWedge: true },
      { label: 'Dark Gray', condition: 'r ≥ 400', color: '#0e202c' },
    ];
  if (diff === DartsDifficulty.HARD)
    return [
      { label: 'Green', condition: 'r ≤ 30', color: '#24e700' },
      { label: 'Dark Gray', condition: '30 < r ≤ 200', color: '#0e202c' },
      { label: 'Light Gray', condition: '200 < r ≤ 330', color: '#213843' },
      { label: 'Wedge', condition: '330 < r < 375', color: wedgeColor, isWedge: true },
      { label: 'Dark Gray', condition: 'r ≥ 375', color: '#0e202c' },
    ];
  // expert
  return [
    { label: 'Green', condition: 'r ≤ 10', color: '#24e700' },
    { label: 'Dark Gray', condition: '10 < r ≤ 250', color: '#0e202c' },
    { label: 'Light Gray', condition: '250 < r ≤ 355', color: '#213843' },
    { label: 'Wedge', condition: '355 < r < 375', color: wedgeColor, isWedge: true },
    { label: 'Dark Gray', condition: 'r ≥ 375', color: '#0e202c' },
  ];
}

export function getMatchedRowIndex(diff: DartsDifficulty, r: number): number {
  if (diff === DartsDifficulty.EASY) {
    if (r <= 62.5) return 0;
    if (r <= 275) return 1;
    if (r <= 375) return 2;
    if (r < 450) return 3;
    return 4;
  }
  if (diff === DartsDifficulty.MEDIUM) {
    if (r <= 50) return 0;
    if (r <= 225) return 1;
    if (r <= 350) return 2;
    if (r < 400) return 3;
    return 4;
  }
  if (diff === DartsDifficulty.HARD) {
    if (r <= 30) return 0;
    if (r <= 200) return 1;
    if (r <= 330) return 2;
    if (r < 375) return 3;
    return 4;
  }
  // expert
  if (r <= 10) return 0;
  if (r <= 250) return 1;
  if (r <= 355) return 2;
  if (r < 375) return 3;
  return 4;
}

export function getDartsCssRotation(rotation: number): number {
  const angle = rotation * 2 * Math.PI;
  const x = Math.sin(angle);
  const y = -Math.cos(angle);
  return -(Math.atan2(y, x) / (2 * Math.PI));
}

export function multiForDart(difficulty: DartsDifficulty, color: DartsColor) {
  return DARTS_COLOR_TO_MULTI[difficulty][color];
}

export function colorForDart(difficulty: DartsDifficulty, rotation: number, normDist: number) {
  if (difficulty === DartsDifficulty.EASY) {
    return easyColorForDart(rotation, normDist);
  } else if (difficulty === DartsDifficulty.MEDIUM) {
    return mediumColorForDart(rotation, normDist);
  } else if (difficulty === DartsDifficulty.HARD) {
    return hardColorForDart(rotation, normDist);
  } else if (difficulty === DartsDifficulty.EXPERT) {
    return expertColorForDart(rotation, normDist);
  }
  return DartsColor.DARK_GRAY;
}

function easyColorForDart(rotation: number, normDist: number): DartsColor {
  const r = normDist * 1000;

  if (r <= 62.5) return DartsColor.GREEN;
  if (r <= 275) return DartsColor.DARK_GRAY;
  if (r <= 375) return DartsColor.LIGHT_GRAY;
  if (r < 450) return wedgeColor(rotation); // strictly inside (375, 450)
  return DartsColor.DARK_GRAY;
}

function mediumColorForDart(rotation: number, normDist: number): DartsColor {
  const r = normDist * 1000;

  if (r <= 50) return DartsColor.GREEN;
  if (r <= 225) return DartsColor.DARK_GRAY;
  if (r <= 350) return DartsColor.LIGHT_GRAY;
  if (r < 400) return wedgeColor(rotation); // strictly inside (350, 400)
  return DartsColor.DARK_GRAY;
}

function hardColorForDart(rotation: number, normDist: number): DartsColor {
  const r = normDist * 1000;

  if (r <= 30) return DartsColor.GREEN;
  if (r <= 200) return DartsColor.DARK_GRAY;
  if (r <= 330) return DartsColor.LIGHT_GRAY;
  if (r < 375) return hardWedgeColor(rotation); // strictly inside (330, 375)
  return DartsColor.DARK_GRAY;
}

function expertColorForDart(rotation: number, normDist: number): DartsColor {
  const r = normDist * 1000;

  if (r <= 10) return DartsColor.GREEN;
  if (r <= 250) return DartsColor.DARK_GRAY;
  if (r <= 355) return DartsColor.LIGHT_GRAY;
  if (r < 375) return expertWedgeColor(rotation); // strictly inside (355, 375)
  return DartsColor.DARK_GRAY;
}

function wedgeColor(rotation: number): DartsColor {
  const deg = (((rotation % 1) + 1) % 1) * 360; // 0 ≤ deg < 360
  const bin = Math.floor(deg / 20); // bins: [0,20),[20,40),...,[340,360)
  if ([1, 5, 9, 13, 15].includes(bin)) return DartsColor.ORANGE; // orange
  if ([3, 7, 11, 17].includes(bin)) return DartsColor.RED; // red
  return DartsColor.YELLOW; // yellow
}

function hardWedgeColor(rotation: number): DartsColor {
  const deg = (((rotation % 1) + 1) % 1) * 360; // 0 ≤ deg < 360
  const bin = Math.floor(deg / 20); // bins: [0,20),[20,40),...,[340,360)
  if ([1, 3, 7, 9, 13, 15].includes(bin)) return DartsColor.ORANGE; // orange
  if ([5, 11, 17].includes(bin)) return DartsColor.RED; // red
  return DartsColor.YELLOW; // yellow
}

function expertWedgeColor(rotation: number): DartsColor {
  const deg = (((rotation % 1) + 1) % 1) * 360; // 0 ≤ deg < 360
  const bin = Math.floor(deg / 20); // bins: [0,20),[20,40),...,[340,360)
  if ([1, 7, 10, 16].includes(bin)) return DartsColor.ORANGE; // orange
  if ([4, 13].includes(bin)) return DartsColor.RED; // red
  return DartsColor.YELLOW; // yellow
}

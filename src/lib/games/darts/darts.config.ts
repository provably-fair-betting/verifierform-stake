import type { DartsDifficulty, DartsColor } from '$lib/types';

/**
 * Darts Game Configuration
 *
 * Maps difficulty levels and dart colors to multiplier values.
 * Higher difficulty levels have higher risk/reward ratios.
 */
export const DARTS_COLOR_TO_MULTI: Record<DartsDifficulty, Record<DartsColor, number>> = {
  easy: {
    '#24e700': 8.5,
    '#fb053f': 2.7,
    '#fb6120': 1.5,
    '#fcc101': 1.2,
    '#213843': 0.8,
    '#0e202c': 0.5,
  },
  medium: {
    '#24e700': 16,
    '#fb053f': 6,
    '#fb6120': 3.1,
    '#fcc101': 1.3,
    '#213843': 0.6,
    '#0e202c': 0.4,
  },
  hard: {
    '#24e700': 63,
    '#fb053f': 8.8,
    '#fb6120': 3.6,
    '#fcc101': 2.5,
    '#213843': 0.5,
    '#0e202c': 0.2,
  },
  expert: {
    '#24e700': 500,
    '#fb053f': 42,
    '#fb6120': 9.6,
    '#fcc101': 4.8,
    '#213843': 0.5,
    '#0e202c': 0.1,
  },
};

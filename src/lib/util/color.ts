import type { RGB } from '$lib/types';

export function getClosestColor(targetHex: string, colorHexList: string[]): string {
  const targetRgb = hexToRgb(targetHex);

  const distance = (c1: RGB, c2: RGB): number =>
    Math.sqrt((c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2);

  let closestHex = colorHexList[0];
  let minDistance = distance(targetRgb, hexToRgb(closestHex));

  for (let i = 1; i < colorHexList.length; i++) {
    const currentHex = colorHexList[i];
    const currentDistance = distance(targetRgb, hexToRgb(currentHex));

    if (currentDistance < minDistance) {
      minDistance = currentDistance;
      closestHex = currentHex;
    }
  }

  return closestHex;
}

export function hexToRgb(hex: string): RGB {
  const sanitized = hex.replace(/^#/, '');
  if (sanitized.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(sanitized.slice(0, 2), 16);
  const g = parseInt(sanitized.slice(2, 4), 16);
  const b = parseInt(sanitized.slice(4, 6), 16);
  return [r, g, b];
}

export function rgbToHex([r, g, b]: RGB): string {
  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

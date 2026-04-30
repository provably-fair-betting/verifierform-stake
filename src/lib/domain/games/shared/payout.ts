export function getPayout(payline: { min: number; multiplier: number }[], float: number) {
  let payout = 0;
  for (const { min, multiplier } of payline) {
    if (float >= min) {
      payout = multiplier;
      break;
    }
  }
  return payout;
}

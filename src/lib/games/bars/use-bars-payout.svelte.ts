import { SvelteSet } from 'svelte/reactivity';
import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { BarsSeed, BarsDifficulty } from './types';
import paylines from '$lib/paylines/bars-paylines.json';
import { getPayout } from '$lib/domain/games/shared/payout';

/**
 * Bars payout composable
 *
 * Calculates 30 bar multipliers and total payout for selected bars.
 * Handles user selection from comma-separated string.
 * Each bar result includes the raw float and index for explanation steps.
 *
 * @param getFormValues - Getter function for form values with seed, difficulty, bar count, and selections
 * @returns Seed, bar results (with float and index), total payout, and calculating state
 */
export function useBarsPayout(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<BarsSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    difficulty: getFormValues().difficulty as BarsDifficulty,
    barCount: getFormValues().barcount as number,
    selectedBars: getFormValues().selectedbars as string | undefined,
  });

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const results = [];
        let totalPayout = 0;

        const parsedBars = seed.selectedBars
          ? seed.selectedBars
              .split(',')
              .map((s: string) => parseInt(s.trim(), 10))
              .filter((n: number) => !isNaN(n) && n >= 0 && n < 30)
          : [];
        const selectedBarsSet = new SvelteSet(parsedBars);

        for (let i = 0; i < 30; i++) {
          const float = floatGenerator.next().value;
          const payline = paylines[seed.difficulty];
          const multiNotDivided = getPayout(payline, float);
          const multi = multiNotDivided / seed.barCount;
          const isSelected = selectedBarsSet.has(i);

          if (isSelected) {
            totalPayout += multi;
          }

          results.push({ float, index: i, multi, multiNotDivided, isSelected });
        }

        return {
          results,
          totalPayout,
          hasSelection: selectedBarsSet.size > 0,
          selectedCount: parsedBars.length,
        };
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get result() {
      return result.value;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

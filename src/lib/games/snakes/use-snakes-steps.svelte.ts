import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { debouncer } from '$lib/composables/core/debounce.svelte';
import type { SnakesSeed, SnakesDifficulty, Item } from '$lib/types';
import paylines from '$lib/games/snakes/snakes-paylines.json';
import { SNAKES_MULTIPLIER_SHIFT_MAP } from './snakes.config';
import { shuffle } from '$lib/domain/games/shared/shuffle';

type Step = {
  die: number[];
  result: number;
};

type SnakesResult = {
  best: number;
  steps: Step[];
};

/**
 * Snakes steps composable
 *
 * Handles the business logic for calculating snakes dice rolls and multipliers.
 * Generates 10 raw dice roll items (with floats) for the tabs, plus 5 computed
 * steps and best multiplier for the outcome display.
 *
 * @param getFormValues - Getter function for reactive form values containing seed and difficulty
 * @returns Object with seed, rolls (with floats), result, payline, multiShiftMap, and computing state
 *
 * @example
 * ```svelte
 * const { seed, rolls, result, payline, multiShiftMap, isCalculating } = useSnakesSteps(() => formValues);
 * ```
 */
export function useSnakesSteps(getFormValues: () => Record<string, unknown>) {
  const seed = $derived<SnakesSeed>({
    clientSeed: getFormValues().clientseed as string,
    serverSeed: getFormValues().serverseed as string,
    nonce: getFormValues().nonce as number,
    difficulty: getFormValues().difficulty as SnakesDifficulty,
  });

  const payline = $derived(paylines[seed.difficulty]);
  const multiShiftMap = $derived(SNAKES_MULTIPLIER_SHIFT_MAP[seed.difficulty]);

  const result = $derived.by(
    debouncer(
      () => seed,
      (seed) => {
        const floatGenerator = FloatGenerator(seed);
        const rollOptions = Array.from({ length: 6 }).map((_v, i) => i + 1);
        const rolls = shuffle(floatGenerator, rollOptions, 10) as Item<number>[];

        const steps: Step[] = [];
        let best = 1;
        const shifts = SNAKES_MULTIPLIER_SHIFT_MAP[seed.difficulty];
        const stepPayline = paylines[seed.difficulty];

        for (let i = 0; i < 5; i++) {
          const die = [rolls[i * 2].chosen, rolls[i * 2 + 1].chosen];
          const diceSum = die[0] + die[1];
          steps.push({ die, result: stepPayline[diceSum - 2] });
        }

        let n = 0;
        for (const step of steps) {
          if (step.result === 0) break;
          best *= n > 0 && shifts[step.result] ? shifts[step.result] : step.result;
          n++;
        }

        return {
          rolls,
          result: { best: Math.floor(best * 100) / 100, steps } satisfies SnakesResult,
        };
      },
      350
    )
  );

  return {
    get seed() {
      return seed;
    },
    get rolls() {
      return result.value?.rolls;
    },
    get result() {
      return result.value?.result;
    },
    get payline() {
      return payline;
    },
    get multiShiftMap() {
      return multiShiftMap;
    },
    get isCalculating() {
      return result.debouncing;
    },
  };
}

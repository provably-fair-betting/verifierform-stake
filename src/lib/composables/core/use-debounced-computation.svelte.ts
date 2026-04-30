import { debouncer } from '$lib/composables/core/debounce.svelte';

export function useDebouncedComputation<T, U>(
  getter: () => T,
  compute: (value: T) => U,
  delay: number = 350
) {
  const result = $derived.by(debouncer(getter, compute, delay));

  return {
    get value() {
      return result.value;
    },
    get isComputing() {
      return result.debouncing;
    },
  };
}

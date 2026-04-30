import { untrack } from 'svelte';

function debounce<T>(fn: (value: T) => void, delay: number): (value: T) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (value: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(value), delay);
  };
}

export function debouncer<T, U>(
  getter: () => T,
  action: (value: T) => U,
  delay: number
): () => { debouncing: boolean; value: U | null } {
  let current = $state<{ debouncing: boolean; value: U | null }>({ debouncing: true, value: null });
  const update = debounce((v: T) => (current = { debouncing: false, value: action(v) }), delay);

  $effect(() => {
    const v = getter();
    // Force Svelte to track all enumerable properties of the value so that
    // reactive getter objects (e.g. seed returned from useSeedParser) properly
    // trigger re-computation when any field changes.
    if (v !== null && typeof v === 'object') {
      for (const key of Object.keys(v as object)) {
        void (v as Record<string, unknown>)[key];
      }
    }
    untrack(() => (current.debouncing = true));
    update(v);
  });

  return () => current;
}

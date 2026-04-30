/** Mines explanation - Simple tab state wrapper (minimal logic, already clean) */
export function useMinesExplanation() {
  let resultIndex = $state(0);

  return {
    get resultIndex() {
      return resultIndex;
    },
    set resultIndex(value: number) {
      resultIndex = value;
    },
  };
}

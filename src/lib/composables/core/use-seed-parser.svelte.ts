import type { Seed } from '$lib/types';

/**
 * Parses form values into a Seed object
 *
 * Extracts the standard seed properties (clientSeed, serverSeed, nonce)
 * from form values and creates a reactive Seed object.
 *
 * Accepts a getter function so that if the entire formValues object is replaced
 * (e.g. by VerifierForm reassigning `formValues = newObj`), the $derived will
 * re-evaluate by calling the getter each time.
 *
 * @param getFormValues - Getter that returns the reactive form values
 * @returns Object with reactive `.current` Seed
 */
export function useSeedParser(getFormValues: () => Record<string, unknown>) {
  // Handle cases where formValues is passed directly instead of as a getter
  const formValuesGetter =
    typeof getFormValues === 'function'
      ? getFormValues
      : () => getFormValues as unknown as Record<string, unknown>;

  const seed = $derived<Seed>({
    clientSeed: formValuesGetter().clientseed as string,
    serverSeed: formValuesGetter().serverseed as string,
    nonce: formValuesGetter().nonce as number,
  });
  return {
    get current() {
      return seed;
    },
  };
}

/**
 * Parses form values into an extended Seed object with additional properties
 *
 * Use this when your game needs extra seed properties beyond the standard ones
 * (e.g., risk level, number of rows, difficulty).
 *
 * @param getFormValues - Getter that returns the reactive form values
 * @param additionalFields - Function to extract additional fields
 * @returns Object with reactive `.current` extended Seed
 */
export function useExtendedSeedParser<T extends Seed>(
  getFormValues: () => Record<string, unknown>,
  additionalFields: (fv: Record<string, unknown>) => Omit<T, keyof Seed>
) {
  // Handle cases where formValues is passed directly instead of as a getter
  const formValuesGetter =
    typeof getFormValues === 'function'
      ? getFormValues
      : () => getFormValues as unknown as Record<string, unknown>;

  const seed = $derived<T>({
    clientSeed: formValuesGetter().clientseed as string,
    serverSeed: formValuesGetter().serverseed as string,
    nonce: formValuesGetter().nonce as number,
    ...additionalFields(formValuesGetter()),
  } as T);
  return {
    get current() {
      return seed;
    },
  };
}

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
// Declared here because .env is gitignored; these are set via build args or the consumer's env.
declare module '$env/static/public' {
  export const PUBLIC_BET_LOOKUP_ENABLED: string;
  export const PUBLIC_BET_LOOKUP_URL: string;
}

export {};

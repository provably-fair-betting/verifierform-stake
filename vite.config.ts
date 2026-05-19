import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

// SvelteKit's handleHotUpdate sends full-reload events for certain file changes.
// In Vitest UI mode this causes the browser tab to refresh, dropping the Vitest
// WebSocket and showing "disconnected". Suppress full-reload in VITEST context;
// config-file changes that legitimately need server.restart() are unaffected.
const suppressFullReloadInVitest: Plugin = {
  name: 'suppress-full-reload-in-vitest',
  apply: 'serve',
  configureServer(server) {
    if (!process.env.VITEST) return;
    const originalSend = server.hot.send.bind(server.hot);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server.hot.send = (payload: any, ...args: any[]) => {
      if ((payload as { type?: string })?.type === 'full-reload') return;
      return originalSend(payload, ...args);
    };
  },
};

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), devtoolsJson(), suppressFullReloadInVitest],
  build: {
    sourcemap: true,
  },
  server: {
    fs: {
      allow: ['./provably-fair-verifierform-lib'],
    },
  },
  test: {
    projects: [
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()],
        test: {
          name: 'client',
          environment: 'jsdom',
          clearMocks: true,
          include: ['tests/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['tests/lib/server/**'],
          setupFiles: ['./tests/setup/setup-client.ts'],
        },
      },
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          //testTimeout: 100_000, (to run gen tests)
          environment: 'node',
          include: ['tests/**/*.{test,spec}.{js,ts}'],
          exclude: ['tests/**/*.svelte.{test,spec}.{js,ts}', 'tests/**/gen/**'],
        },
      },
    ],
    coverage: {
      enabled: true,
      all: true,
      reporter: ['html', 'json-summary', 'lcov'],
      include: ['src/lib/domain/**', 'src/lib/games/**/*Result.svelte', 'src/lib/bet-lookup/bet-lookup.ts'],
      exclude: ['src/lib/domain/index.ts'],
    },
  },
});

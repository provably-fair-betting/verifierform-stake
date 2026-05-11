import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
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
      reporter: ['html', 'json-summary'],
      include: [
        'src/lib/domain/**',
        'src/lib/games/**/*Result.svelte',
      ],
      exclude: [
        'src/lib/domain/index.ts',
      ],
    },
  },
});

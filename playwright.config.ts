import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 120000,
  webServer: {
    command: 'pnpm run build && pnpm run preview',
    port: 4173,
  },
  testDir: 'e2e',
});

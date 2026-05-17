/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 120_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'node scripts/mock-api.js',
      port: 8080,
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        'PUBLIC_BET_LOOKUP_ENABLED=true PUBLIC_BET_LOOKUP_URL=http://localhost:8080 pnpm run build && pnpm run preview',
      port: 4173,
      reuseExistingServer: !process.env.CI,
    },
  ],
  testDir: 'e2e',
});

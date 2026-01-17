import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './packages',
  snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}',
  testMatch: [
    '**/packages/components/**/__tests__/*.spec.ts',
    '**/packages/hooks/**/__tests__/*.spec.ts',
  ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.03, // Allow 3% pixel difference for cross-browser/platform tolerance
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'pnpm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
  },
});

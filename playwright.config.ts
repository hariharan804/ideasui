/* eslint-disable no-magic-numbers */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './packages',
  snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}',
  testMatch: [
    '**/packages/components/**/__tests__/*.spec.ts',
    '**/packages/hooks/**/__tests__/*.spec.ts',
  ],

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60 * 1000,

  use: {
    baseURL: 'http://localhost:6006',

    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    colorScheme: 'light',

    // Stabilize rendering

    trace: 'on-first-retry',
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-gpu',
            '--disable-font-subpixel-positioning',
            '--disable-lcd-text',
            '--force-color-profile=srgb',
          ],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          firefoxUserPrefs: {
            'ui.prefersReducedMotion': 1,
            'gfx.webrender.all': true,
          },
        },
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'pnpm run storybook:serve',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
  },
});

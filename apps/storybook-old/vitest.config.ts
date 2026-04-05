import path from 'path';

import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

import viteConfig from './vite.config.js';

/**
 * Storybook 10.3 Vitest Configuration
 * This file is placed in the app root to ensure it's picked up by the background runner.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // The name MUST match the Storybook filter exactly.
      name: `storybook:${path.resolve(__dirname, '.storybook')}`,
      // storybookRoot points to the config directory where preview.ts lives.
      storybookRoot: path.resolve(__dirname, '.storybook'),
      globals: true,
      environment: 'jsdom',
      setupFiles: [path.resolve(__dirname, '.storybook/vitest.setup.ts')],
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: playwright,
      },
    },
  }),
);

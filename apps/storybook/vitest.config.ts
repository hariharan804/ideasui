import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

import viteConfig from './vite.config.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Storybook v2 Vitest Configuration
 *
 * Uses the official `storybookTest` plugin from `@storybook/addon-vitest`
 * so that Storybook's internal test runner can discover this project.
 *
 * Note: We define the storybookTest plugin at the top level (not inside
 * `test.projects`) so that the `resolve.alias` entries from vite.config.ts
 * are available to the module runner. Using `projects` creates isolated
 * Vite instances that don't inherit the base config's aliases.
 */
export default mergeConfig(viteConfig, {
  plugins: [
    react(),
    storybookTest({
      configDir: path.resolve(__dirname, '.storybook'),
    }),
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      provider: 'istanbul',
      enabled: true,
      allowExternal: true,
      reportsDirectory: path.resolve(__dirname, 'coverage'),
      reporter: ['text', 'html', 'json-summary'],
      include: ['**/packages/components/**/*.{ts,tsx}', '**/packages/core/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/__tests__/**',
        '**/stories/**',
        '**/*.stories.{ts,tsx}',
        '**/tsup.config.ts',
        '**/*.d.ts',
        '**/index.{ts,tsx}',
      ],
      thresholds: {
        './packages/components/': {
          branches: 70,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        './packages/core/': {
          branches: 65,
          functions: 70,
          lines: 75,
          statements: 75,
        },
      },
    },
  },
});

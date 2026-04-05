import { mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

import viteConfig from './vite.config';

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
    storybookTest({
      configDir: '.storybook',
    }),
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});

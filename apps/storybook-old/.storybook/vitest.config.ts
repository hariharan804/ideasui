import { defineConfig, mergeConfig } from 'vitest/config';
import path from 'path';
import viteConfig from '../vite.config.js';

/**
 * Storybook-specific Vitest configuration
 * This file is picked up by @storybook/addon-vitest to run your stories as tests.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // Explicit naming and storybookRoot satisfy Storybook 10.3's project matching.
      name: `storybook:${path.resolve(__dirname, './')}`,
      storybookRoot: path.resolve(__dirname, './'),
      environment: 'jsdom',
      globals: true,
      setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    },
  }),
);

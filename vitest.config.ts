import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      '@ideasui/theme/recipes': path.resolve(
        __dirname,
        './packages/core/theme/src/recipes/index.ts',
      ),
      '@ideasui/theme/tokens': path.resolve(__dirname, './packages/core/theme/src/tokens/index.ts'),
      '@ideasui/theme/system': path.resolve(__dirname, './packages/core/theme/src/system/index.ts'),
      '@ideasui/theme/plugin': path.resolve(
        __dirname,
        './packages/core/theme/src/system/plugin/index.ts',
      ),
      '@ideasui/theme': path.resolve(__dirname, './packages/core/theme/src/index.ts'),
      '@ideasui/utils/core': path.resolve(__dirname, './packages/utils/src/core/index.ts'),
      '@ideasui/utils/react': path.resolve(__dirname, './packages/utils/src/react/index.ts'),
      '@ideasui/utils/client': path.resolve(__dirname, './packages/utils/src/client/index.ts'),
      '@ideasui/utils/aria': path.resolve(__dirname, './packages/utils/src/aria/index.ts'),
      '@ideasui/utils/test': path.resolve(__dirname, './packages/utils/src/test/index.ts'),
      '@ideasui/utils/style': path.resolve(__dirname, './packages/utils/src/style/index.ts'),
      '@ideasui/utils': path.resolve(__dirname, './packages/utils/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', 'packages/**/*.spec.{ts,tsx}'],
    testTimeout: 35_000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json-summary'],
      include: [
        'packages/components/**/*.{ts,tsx}',
        'packages/core/**/*.{ts,tsx}',
        'packages/utils/**/*.{ts,tsx}',
      ],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/__tests__/**',
        '**/*.stories.{ts,tsx}',
        '**/tsup.config.ts',
        '**/*.d.ts',
        'packages/cli/**',
        'packages/icons/**',
        '**/index.{ts,tsx}',
        'packages/utils/src/test/**',
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
        './packages/utils/': {
          branches: 70,
          functions: 75,
          lines: 75,
          statements: 75,
        },
      },
    },
  },
});

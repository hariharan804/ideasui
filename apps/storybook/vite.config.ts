import type { Plugin } from 'vite';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Virtual Extension Repair Plugin:
// Automatically appends .ts or /index.ts to relative imports in shared packages
// during the Storybook build. This fixes the HMR watcher hangs without
// modifying any shared source code.
const extensionRepair = (): Plugin => ({
  name: 'extension-repair',
  resolveId(source: string, importer: string | undefined): string | null {
    if (!importer || !source.startsWith('.')) {
      return null;
    }

    // Only target shared package directories to prevent side-effects.
    if (!importer.includes('packages/core/theme') && !importer.includes('packages/components')) {
      return null;
    }

    const absolutePath = path.resolve(path.dirname(importer), source);

    // 1. Check if the file already exists as a .ts file.
    if (fs.existsSync(`${absolutePath}.ts`)) {
      return `${absolutePath}.ts`;
    }

    // 2. Check if it's a directory containing an index.ts.
    if (fs.existsSync(path.join(absolutePath, 'index.ts'))) {
      return path.join(absolutePath, 'index.ts');
    }

    return null;
  },
});

// Storybook v2 Vite Configuration
export default defineConfig({
  plugins: [extensionRepair(), tailwindcss()],

  resolve: {
    // This allows Storybook's Vite instance to resolve extensionless imports
    // in your shared packages (like @ideasui/theme) WITHOUT modifying the shared code.
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      // Fix pnpm strict resolution: the storybookTest plugin injects imports
      // from @storybook/addon-vitest/internal/* into story files at transform time.
      // Since stories live in packages/ (which don't have the addon as a dependency),
      // pnpm can't resolve these subpath exports. Aliasing them to absolute paths
      // ensures the Vite module runner finds them regardless of importer location.
      '@storybook/addon-vitest/internal/test-utils': path.resolve(
        __dirname,
        'node_modules/@storybook/addon-vitest/dist/vitest-plugin/test-utils.js',
      ),
      '@storybook/addon-vitest/internal/setup-file': path.resolve(
        __dirname,
        'node_modules/@storybook/addon-vitest/dist/vitest-plugin/setup-file.js',
      ),
      '@storybook/addon-vitest/internal/setup-file-with-project-annotations': path.resolve(
        __dirname,
        'node_modules/@storybook/addon-vitest/dist/vitest-plugin/setup-file-with-project-annotations.js',
      ),
    },
  },

  server: {
    watch: {
      // Strictly ignore large directories to prevent the HMR watcher from hanging.
      ignored: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
    },
  },
});

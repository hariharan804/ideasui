import path from 'path';
import fs from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Virtual Extension Repair Plugin:
// Automatically appends .ts or /index.ts to relative imports in shared packages
// during the Storybook build. This fixes the HMR watcher hangs without
// modifying any shared source code.
const extensionRepair: VoidFunction = () => ({
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

// Storybook Vite Configuration
export default defineConfig({
  plugins: [react(), extensionRepair(), tailwindcss()],

  resolve: {
    // This allows Storybook's Vite instance to resolve extensionless imports
    // in your shared packages (like @ideasui/theme) WITHOUT modifying the shared code.
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },

  server: {
    watch: {
      // Strictly ignore large directories to prevent the HMR watcher from hanging.
      ignored: ['**/node_modules/**', '**/dist/**', '**/.turbo/**'],
    },
  },

  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
});

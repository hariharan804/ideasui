import { createSharedConfig } from '../../../tsup-config.mjs';

export default createSharedConfig({
  entry: [
    'src/index.ts',
    'src/plugin/index.ts',
    'src/providers/index.ts',
    'src/providers/theme-provider.tsx',
    'src/providers/theme-script.tsx',
    'src/recipes/index.ts',
  ],
});

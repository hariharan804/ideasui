import { createSharedConfig } from '../../../tsup-config.mjs';

export default createSharedConfig({
  entry: ['src/index.ts', 'src/plugin/index.ts', 'src/providers/index.ts', 'src/recipes/index.ts'],
});

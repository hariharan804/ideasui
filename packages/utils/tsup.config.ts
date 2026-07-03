import { createSharedConfig } from '../../tsup-config.mjs';

export default createSharedConfig({
  entry: [
    'src/index.ts',
    'src/core/index.ts',
    'src/react/index.ts',
    'src/client/index.ts',
    'src/aria/index.ts',
    'src/test/index.ts',
    'src/style/index.ts',
  ],
  outDir: 'dist',
});

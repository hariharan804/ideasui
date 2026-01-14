import { createSharedConfig } from '../../../tsup-config.mjs';

export default createSharedConfig({
  external: ['*.css'],
  bundle: false,
  entry: ['src/**/!(.d|.stories|*.test|*.css).{ts,tsx}'],
});

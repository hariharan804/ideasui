import { createSharedConfig } from '../../../tsup-config.mjs';

export default createSharedConfig({
  entry: ['src/**/!(.d|.stories|*.test|*.css).{ts,tsx}'],
});

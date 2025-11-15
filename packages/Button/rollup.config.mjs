import { rollupConfig } from '@i2l/rollup-config';

export default rollupConfig({
  external: ['@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',],
});

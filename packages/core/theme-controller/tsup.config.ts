import { createSharedConfig } from '../../../configs/tsup-config/index.mjs'

export default createSharedConfig({
  entry: 'src/index.ts',
  outDir: 'dist',
})
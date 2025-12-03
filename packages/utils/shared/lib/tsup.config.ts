// packages/button/tsup.config.ts
import { createSharedConfig } from '@i2l/tsup-config'

const isWatch = process.argv.includes('--watch')

export default createSharedConfig({
  isWatch,
})

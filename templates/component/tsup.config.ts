// packages/button/tsup.config.ts
import { createSharedConfig } from '@your-org/tsup-config'

const isWatch = process.argv.includes('--watch')

export default createSharedConfig({
  isWatch,
})

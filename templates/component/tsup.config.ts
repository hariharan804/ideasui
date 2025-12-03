// packages/button/tsup.config.ts
import { createSharedConfig } from '@iui/tsup-config'

const isWatch = process.argv.includes('--watch')

export default createSharedConfig({
  isWatch,
})

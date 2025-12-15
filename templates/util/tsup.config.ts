import { createSharedConfig } from '@ideasui/tsup-config'

const isWatch = process.argv.includes('--watch')

export default createSharedConfig({
  isWatch,
})

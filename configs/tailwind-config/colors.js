import { generateAll } from './color-generator.mjs'

const out = generateAll({
  base: '#861afd',
  contrastCheck: true,
  outputDir: './theme-output'
})

console.log(out.aliases.light['--primary']) // primary 500 hex

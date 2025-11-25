#!/usr/bin/env node
/**
 * color-generator.mjs
 * Industry-grade color scale generator using chroma-js (LCH interpolation)
 *
 * Outputs:
 *  - CSS variables (colors.css)
 *  - JSON tokens (colors.json)
 *  - Tailwind config snippet (tailwind-colors.js)
 *
 * Options:
 *  - base (hex string)
 *  - secondary (hex string, optional)
 *  - contrastCheck (boolean)
 *  - output (folder)
 *
 * Usage:
 *  node color-generator.mjs --base '#861afd' --contrastCheck --output ./build
 */

import fs from 'fs'
import path from 'path'
import chroma from 'chroma-js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/* -----------------------
   Utilities / Validation
   ----------------------- */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

function normalizeHex(hex) {
  if (!hex) throw new Error('Hex required')
  hex = String(hex).trim()
  if (!hex.startsWith('#')) hex = '#' + hex
  // Expand shorthand #abc
  if (/^#([0-9a-fA-F]{3})$/.test(hex)) {
    hex = hex.replace(
      /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,
      (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    )
  }
  if (!/^#([0-9a-fA-F]{6})$/.test(hex)) {
    throw new Error('Invalid hex: ' + hex)
  }
  return hex.toLowerCase()
}

/* WCAG contrast using relative luminance (sRGB) */
function relativeLuminance(hex) {
  const c = chroma(hex).rgb().map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
function contrastRatio(a, b) {
  const L1 = relativeLuminance(a)
  const L2 = relativeLuminance(b)
  const bright = Math.max(L1, L2)
  const dark = Math.min(L1, L2)
  return (bright + 0.05) / (dark + 0.05)
}

/* Adjust a color's L (lightness) in LCH space to reach a target contrast vs textColor */
function adjustLForContrast(hexColor, textHex, targetRatio = 4.5, maxSteps = 60) {
  const col = chroma(hexColor).lch() // [L, C, H]
  let [L, C, H] = col
  // Determine direction: if text is white, likely need to darken (reduce L)
  // but we check both directions in practice — start with the most probable
  const textLum = relativeLuminance(textHex)
  const startContrast = contrastRatio(hexColor, textHex)
  if (startContrast >= targetRatio) return chroma(hexColor).hex().toLowerCase()

  // Two-phase approach: try nudging L in both directions with increasing magnitude
  // Favor minimal perceptual change.
  for (let i = 1; i <= maxSteps; i++) {
    // alternate sign: -i, +i, -2i, +2i ... but we prefer directional prioritization
    const sign = textLum > 0.5 ? -1 : -1 // usually darken for white text; keep this heuristic
    const candidateL = clamp(L + sign * i * 0.8, 0.1, 99.9) // step ~0.8
    const candidate = chroma.lch(candidateL, C, H).hex()
    if (contrastRatio(candidate, textHex) >= targetRatio) return candidate.toLowerCase()
  }

  // If not found, fallback to stronger adjustments (convert to black/white extremes)
  const fallback = textLum > 0.5 ? '#000000' : '#ffffff'
  return fallback
}

/* -----------------------
   Core generator
   ----------------------- */

function createScale({
  baseHex,
  steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  lightPoints = ['white', baseHex, chroma(baseHex).darken(3).hex()],
  mode = 'lch',
  contrastCheck = false,
  contrastTarget = 4.5,
}) {
  // lightPoints: three anchors - light (usually near white), base (500), dark
  // we'll sample 11 colors using chroma.scale
  const scale = chroma.scale(lightPoints).mode(mode).padding(0.05).colors(steps.length)
  const result = {}
  steps.forEach((k, i) => {
    let hex = chroma(scale[i]).hex().toLowerCase()
    if (contrastCheck) {
      // Decide text color expectation: light shades -> dark text, dark shades -> white text
      const useWhite = k >= 600
      const textHex = useWhite ? '#ffffff' : '#000000'
      const ratio = contrastRatio(hex, textHex)
      if (ratio < contrastTarget) {
        // adjust using LCH nudging
        hex = adjustLForContrast(hex, textHex, contrastTarget)
      }
    }
    result[k] = chroma(hex).hex().toLowerCase()
  })
  return result
}

/* Generate semantic scales: primary, secondary, success, warning, error, info */
export function generateAll({
  base = '#6b21a8', // default purple
  secondary = null,
  steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  contrastCheck = false,
  contrastTarget = 4.5,
  outputDir = './',
  names = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info',
  },
}) {
  base = normalizeHex(base)
  secondary = secondary ? normalizeHex(secondary) : null

  // Primary scale (light -> base -> dark anchor)
  const primaryAnchors = ['#ffffff', base, chroma(base).darken(2.2).hex()]
  const primary = createScale({
    baseHex: base,
    steps,
    lightPoints: primaryAnchors,
    contrastCheck,
    contrastTarget,
  })

  // Secondary: complementary-ish if not provided
  if (!secondary) {
    const hcl = chroma(base).lch()
    const hue = (hcl[2] + 180) % 360
    secondary = chroma.lch(hcl[0], clamp(hcl[1] * 0.9, 15, 90), hue).hex()
  }
  const secondaryAnchors = ['#ffffff', secondary, chroma(secondary).darken(2.2).hex()]
  const secondaryScale = createScale({
    baseHex: secondary,
    steps,
    lightPoints: secondaryAnchors,
    contrastCheck,
    contrastTarget,
  })

  // Semantic colors (success/warning/error/info) with typical hues
  const successBase = chroma.lch(60, 45, 140).hex() // green-ish
  const warningBase = chroma.lch(64, 55, 80).hex()  // orange-ish
  const errorBase   = chroma.lch(53, 65, 20).hex()  // red-ish
  const infoBase    = chroma.lch(60, 55, 260).hex() // blue-ish

  const success = createScale({ baseHex: successBase, steps, contrastCheck, contrastTarget })
  const warning = createScale({ baseHex: warningBase, steps, contrastCheck, contrastTarget })
  const error   = createScale({ baseHex: errorBase,   steps, contrastCheck, contrastTarget })
  const info    = createScale({ baseHex: infoBase,    steps, contrastCheck, contrastTarget })

  // Neutrals: generate near-zero chroma greys using base L reference
  const neutralLight = {}
  const neutralDark = {}
  const neutralSteps = [98, 96, 90, 83, 64, 45, 32, 25, 15, 9, 4] // L values for 50..950
  steps.forEach((k, i) => {
    const L = clamp(neutralSteps[i], 2, 98)
    neutralLight[k] = chroma.lch(L, 2, 260).hex().toLowerCase()
    neutralDark[k]  = chroma.lch(100 - L, 2, 260).hex().toLowerCase()
  })

  const tokens = {
    primary,
    secondary: secondaryScale,
    neutral: {
      light: neutralLight,
      dark: neutralDark,
    },
    success,
    warning,
    error,
    info,
  }

  // Semantic aliases and interactive states
  const aliases = createAliases(tokens)

  // emit files
  const css = buildCSS(tokens, aliases)
  const json = JSON.stringify({ tokens, aliases }, null, 2)
  const tailwind = buildTailwindSnippet(aliases)

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(path.join(outputDir, 'colors.css'), css, 'utf8')
  fs.writeFileSync(path.join(outputDir, 'colors.json'), json, 'utf8')
  fs.writeFileSync(path.join(outputDir, 'tailwind-colors.js'), tailwind, 'utf8')

  return { tokens, aliases, css, json, tailwind }
}

/* -----------------------
   Aliases & helpers
   ----------------------- */
function createAliases(tokens) {
  // For each semantic family map 500 -> var(--color-*-500), on-colors and states
  const families = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
  const aliases = { light: {}, dark: {} }

  families.forEach((fam) => {
    const shadesLight = tokens[fam]
    const shadesDark = tokens[fam] // dark currently same shape (could be inverted separately)
    // default on-color heuristics
    const onLight = contrastRatio(shadesLight[500], '#ffffff') >= 4.5 ? '#ffffff' : '#000000'
    const onDark = contrastRatio(shadesDark[500], '#ffffff') >= 4.5 ? '#ffffff' : '#000000'

    aliases.light[`--${fam}`] = shadesLight[500]
    aliases.light[`--${fam}-on`] = onLight
    aliases.light[`--${fam}-hover`] = shadesLight[600] || shadesLight[700]
    aliases.light[`--${fam}-active`] = shadesLight[700] || shadesLight[800]
    aliases.light[`--${fam}-disabled`] = shadesLight[200] || shadesLight[100]

    aliases.dark[`--${fam}`] = shadesDark[500]
    aliases.dark[`--${fam}-on`] = onDark
    aliases.dark[`--${fam}-hover`] = shadesDark[400] || shadesDark[300]
    aliases.dark[`--${fam}-active`] = shadesDark[300] || shadesDark[200]
    aliases.dark[`--${fam}-disabled`] = shadesDark[700] || shadesDark[800]
  })

  // core tokens
  aliases.light['--surface'] = tokens.neutral.light[50]
  aliases.light['--surface-muted'] = tokens.neutral.light[100]
  aliases.light['--text'] = tokens.neutral.light[900]
  aliases.light['--border'] = tokens.neutral.light[200]

  aliases.dark['--surface'] = tokens.neutral.dark[950]
  aliases.dark['--surface-muted'] = tokens.neutral.dark[900]
  aliases.dark['--text'] = tokens.neutral.dark[50]
  aliases.dark['--border'] = tokens.neutral.dark[800]

  return aliases
}

/* CSS output (variables block) */
function buildCSS(tokens, aliases) {
  const lines = ['/* Generated Design System Colors (LCH) */', ':root {']
  // primary / semantic families
  Object.entries(tokens).forEach(([family, value]) => {
    if (family === 'neutral') return
    lines.push(`  /* ${family} (light) */`)
    Object.entries(value).forEach(([k, v]) => lines.push(`  --color-${family}-${k}: ${v};`))
    lines.push('')
  })

  // neutral
  lines.push('  /* neutral (light) */')
  Object.entries(tokens.neutral.light).forEach(([k, v]) => lines.push(`  --color-neutral-${k}: ${v};`))
  lines.push('  /* semantic aliases (light) */')
  Object.entries(aliases.light).forEach(([k, v]) => lines.push(`  ${k}: ${v};`))

  lines.push('}')
  lines.push('.dark {')
  Object.entries(tokens).forEach(([family, value]) => {
    if (family === 'neutral') return
    lines.push(`  /* ${family} (dark) */`)
    Object.entries(value).forEach(([k, v]) => lines.push(`  --color-${family}-${k}: ${v};`))
    lines.push('')
  })
  lines.push('  /* neutral (dark) */')
  Object.entries(tokens.neutral.dark).forEach(([k, v]) => lines.push(`  --color-neutral-${k}: ${v};`))
  lines.push('  /* semantic aliases (dark) */')
  Object.entries(aliases.dark).forEach(([k, v]) => lines.push(`  ${k}: ${v};`))
  lines.push('}')
  return lines.join('\n')
}

/* Tailwind snippet */
function buildTailwindSnippet(aliases) {
  return `// Generated Tailwind color tokens (import or paste into theme.extend.colors)
module.exports = {
  light: ${JSON.stringify(Object.fromEntries(Object.entries(aliases.light).map(([k,v]) => [k.replace(/^--/, ''), v])), null, 2)},
  dark: ${JSON.stringify(Object.fromEntries(Object.entries(aliases.dark).map(([k,v]) => [k.replace(/^--/, ''), v])), null, 2)}
};`
}

/* -----------------------
   CLI
   ----------------------- */
if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = yargs(hideBin(process.argv))
    .option('base', { type: 'string', alias: 'b', demandOption: true })
    .option('secondary', { type: 'string' })
    .option('contrastCheck', { type: 'boolean', default: false })
    .option('output', { type: 'string', default: './build' })
    .argv

  const out = generateAll({
    base: argv.base,
    secondary: argv.secondary,
    contrastCheck: argv.contrastCheck,
    outputDir: argv.output,
  })

  console.log('✅ generated colors in', argv.output)
  console.log('Primary 500:', normalizeHex(argv.base))
  if (argv.secondary) console.log('Secondary 500:', normalizeHex(argv.secondary))
  console.log('Contrast checking:', argv.contrastCheck)
}

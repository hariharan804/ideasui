// color-generator-fixed.mjs
/**
 * Single-file, non-CLI LCH color scale generator (fixed)
 * - Explicit L targets for perceptual uniformity
 * - Forces light[500] === base
 * - Computes dark[500] from base (same hue/chroma idea, L adjusted)
 * - Per-family chroma multipliers, chroma damping near extremes
 * - Monotonicity retries and final enforcement
 *
 * Usage:
 * import { generateDesignTokens } from './color-generator-fixed.mjs'
 * const out = generateDesignTokens({
 *   base: '#861afd',
 *   contrastCheck: false,
 *   writeFiles: true,
 *   outputDir: './theme-output'
 * })
 *
 * out.tokens.primary.light[500] // '#861afd'
 * out.tokens.primary.dark[500]  // computed dark base
 */

import fs from 'fs'
import path from 'path'
import chroma from 'chroma-js'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export function normalizeHex(hex) {
  if (!hex) throw new Error('Hex required')
  hex = String(hex).trim()
  if (!hex.startsWith('#')) hex = '#' + hex
  if (/^#([0-9a-fA-F]{3})$/.test(hex)) {
    hex = hex.replace(
      /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,
      (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    )
  }
  if (!/^#([0-9a-fA-F]{6})$/.test(hex)) throw new Error('Invalid hex: ' + hex)
  return hex.toLowerCase()
}

function relativeLuminance(hex) {
  const c = chroma(hex)
    .rgb()
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

function contrastRatio(a, b) {
  const L1 = relativeLuminance(a)
  const L2 = relativeLuminance(b)
  const bright = Math.max(L1, L2)
  const dark = Math.min(L1, L2)
  return (bright + 0.05) / (dark + 0.05)
}

function adjustLForContrast(hexColor, textHex, target = 4.5, maxSteps = 40) {
  // minimize modifications: nudge L only
  let [L, C, H] = chroma(hexColor).lch()
  const textLum = relativeLuminance(textHex)
  const preferDarken = textLum > 0.5
  for (let step = 1; step <= maxSteps; step++) {
    const delta = 0.9 * step
    const candL = clamp(L + (preferDarken ? -delta : delta), 0.1, 99.9)
    const cand = chroma.lch(candL, C, H).hex()
    if (contrastRatio(cand, textHex) >= target) return cand.toLowerCase()
  }
  return textLum > 0.5 ? '#000000' : '#ffffff'
}

/**
 * createFamilyScaleFixed - robust, predictable scale per family
 *
 * Options:
 *  - baseHex (required) - brand base (light 500)
 *  - steps (default 11 shade keys)
 *  - lightLtargets, darkLtargets - arrays with same length as steps (tuned defaults below)
 *  - chromaMultiplier - how strongly to respect base chroma (0.6 - 1.1), default recommended per family
 *  - contrastCheck, contrastTarget - optional WCAG enforcement
 */
function createFamilyScaleFixed({
  baseHex,
  steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  lightLtargets = [98, 94, 86, 76, 66, 54, 44, 34, 24, 14, 6],
  darkLtargets = [6, 12, 22, 32, 44, 56, 68, 76, 84, 90, 96],
  chromaMultiplier = 1.0,
  contrastCheck = false,
  contrastTarget = 4.5,
  maxRetries = 3,
} = {}) {
  if (!baseHex) throw new Error('baseHex required')
  baseHex = chroma(baseHex).hex().toLowerCase()
  if (lightLtargets.length !== steps.length)
    throw new Error('lightLtargets length mismatch')
  if (darkLtargets.length !== steps.length)
    throw new Error('darkLtargets length mismatch')

  const [baseL, baseC, baseH] = chroma(baseHex).lch()
  let midC = clamp(baseC * chromaMultiplier, 4, 110)

  const synth = (Ltarget, usedMidC) => {
    const midPoint = 50
    const d = Math.abs(Ltarget - midPoint) / midPoint // 0..1
    // reduce chroma towards extremes (avoids neon)
    const chromaScale = clamp(1 - d * 0.6, 0.35, 1)
    const C = clamp(usedMidC * chromaScale, 3, 120)
    return chroma.lch(Ltarget, C, baseH).hex().toLowerCase()
  }

  const build = (currentMidC) => {
    const light = {}
    for (let i = 0; i < steps.length; i++) {
      const key = steps[i]
      let hex = synth(lightLtargets[i], currentMidC)
      if (key === 500) hex = chroma(baseHex).hex().toLowerCase() // enforce
      if (contrastCheck) {
        const text = Number(key) >= 600 ? '#ffffff' : '#000000'
        if (contrastRatio(hex, text) < contrastTarget)
          hex = adjustLForContrast(hex, text, contrastTarget)
      }
      light[key] = chroma(hex).hex().toLowerCase()
    }

    // compute dark500: same hue, gently increased L for legibility on dark surfaces
    const computeDark500 = (() => {
      let newL
      if (baseL <= 40) newL = baseL + 28
      else if (baseL <= 60) newL = baseL + 18
      else newL = baseL + 8
      newL = clamp(newL, 6, 94)
      const newC = clamp(baseC * 0.95, 4, 110)
      return chroma.lch(newL, newC, baseH).hex().toLowerCase()
    })()

    const dark = {}
    for (let i = 0; i < steps.length; i++) {
      const key = steps[i]
      let hex = synth(darkLtargets[i], currentMidC)
      if (key === 500) hex = computeDark500
      if (contrastCheck) {
        const text = Number(key) <= 400 ? '#ffffff' : '#000000'
        if (contrastRatio(hex, text) < contrastTarget)
          hex = adjustLForContrast(hex, text, contrastTarget)
      }
      dark[key] = chroma(hex).hex().toLowerCase()
    }

    return { light, dark }
  }

  function isMonotonic(scales) {
    const order = (obj) =>
      Object.keys(obj)
        .map(Number)
        .sort((a, b) => a - b)
        .map((k) => chroma(obj[k]).lch()[0])
    const Llight = order(scales.light)
    for (let i = 1; i < Llight.length; i++)
      if (!(Llight[i] <= Llight[i - 1] + 0.8)) return false
    const Ldark = order(scales.dark)
    for (let i = 1; i < Ldark.length; i++)
      if (!(Ldark[i] >= Ldark[i - 1] - 0.8)) return false
    return true
  }

  let attempt = 0
  let scales = build(midC)
  while (attempt < maxRetries && !isMonotonic(scales)) {
    attempt++
    midC = clamp(midC * 0.72, 3, 110)
    scales = build(midC)
  }

  // final enforcement: sort by L to ensure monotonic while preserving hexes
  if (!isMonotonic(scales)) {
    const enforce = (obj, ascending) => {
      const arr = Object.entries(obj).map(([k, v]) => ({
        k: Number(k),
        L: chroma(v).lch()[0],
        hex: v,
      }))
      arr.sort((a, b) => (ascending ? a.L - b.L : b.L - a.L))
      const out = {}
      arr.forEach((entry, idx) => (out[steps[idx]] = entry.hex))
      return out
    }
    scales.light = enforce(scales.light, false) // descending L
    scales.dark = enforce(scales.dark, true) // ascending L
  }

  // ensure center keys
  if (!scales.light[500])
    scales.light[500] = chroma(baseHex).hex().toLowerCase()
  if (!scales.dark[500]) {
    const fallback = chroma
      .lch(clamp(baseL + 18, 6, 94), clamp(baseC * 0.95, 4, 110), baseH)
      .hex()
      .toLowerCase()
    scales.dark[500] = fallback
  }

  return scales
}

/* -----------------------
   Assemble tokens
   ----------------------- */

function buildCSS(tokens) {
  const lines = ['/* Generated Colors (LCH - fixed) */', ':root {']
  for (const [fam, scales] of Object.entries(tokens)) {
    if (fam === 'neutral') continue
    lines.push(`  /* ${fam} (light) */`)
    for (const [k, v] of Object.entries(scales.light))
      lines.push(`  --color-${fam}-${k}: ${v};`)
    lines.push('')
  }
  lines.push('  /* neutral (light) */')
  for (const [k, v] of Object.entries(tokens.neutral.light))
    lines.push(`  --color-neutral-${k}: ${v};`)
  lines.push('}')
  lines.push('')
  lines.push('.dark {')
  for (const [fam, scales] of Object.entries(tokens)) {
    if (fam === 'neutral') continue
    lines.push(`  /* ${fam} (dark) */`)
    for (const [k, v] of Object.entries(scales.dark))
      lines.push(`  --color-${fam}-${k}: ${v};`)
    lines.push('')
  }
  lines.push('  /* neutral (dark) */')
  for (const [k, v] of Object.entries(tokens.neutral.dark))
    lines.push(`  --color-neutral-${k}: ${v};`)
  lines.push('}')
  return lines.join('\n')
}

function buildTailwind(tokens) {
  return `// Tailwind tokens (literal scales for light + dark)\nmodule.exports = ${JSON.stringify(tokens, null, 2)};`
}

/* -----------------------
   Public API
   ----------------------- */

/**
 * generateDesignTokens(options)
 * options:
 *  - base (hex) required
 *  - secondary (hex) optional
 *  - contrastCheck (bool) default false
 *  - contrastTarget (number) default 4.5
 *  - writeFiles (bool) default false
 *  - outputDir (string) default './build'
 *  - overrides (object) optional per-family overrides:
 *      { primary: { chromaMultiplier, lightLtargets, darkLtargets }, ... }
 */
export function generateDesignTokens({
  base,
  secondary = null,
  contrastCheck = false,
  contrastTarget = 4.5,
  writeFiles = false,
  outputDir = './build',
  overrides = {},
} = {}) {
  if (!base) throw new Error('base color required')
  base = normalizeHex(base)
  if (secondary) secondary = normalizeHex(secondary)

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

  // per-family recommended chroma multipliers
  const familyDefaults = {
    primary: {
      chromaMultiplier: 0.85,
      lightLtargets: undefined,
      darkLtargets: undefined,
    },
    secondary: { chromaMultiplier: 0.95 },
    success: { chromaMultiplier: 0.95 },
    warning: { chromaMultiplier: 0.95 },
    error: { chromaMultiplier: 0.95 },
    info: { chromaMultiplier: 0.95 },
  }

  const primaryCfg = { ...familyDefaults.primary, ...(overrides.primary || {}) }
  const secondaryCfg = {
    ...familyDefaults.secondary,
    ...(overrides.secondary || {}),
  }

  // primary
  const primary = createFamilyScaleFixed({
    baseHex: base,
    steps,
    lightLtargets: primaryCfg.lightLtargets || [
      98, 94, 86, 76, 66, 54, 44, 34, 24, 14, 6,
    ],
    darkLtargets: primaryCfg.darkLtargets || [
      6, 12, 22, 32, 44, 56, 68, 76, 84, 90, 96,
    ],
    chromaMultiplier: primaryCfg.chromaMultiplier,
    contrastCheck,
    contrastTarget,
  })

  // secondary (auto complementary if not provided)
  if (!secondary) {
    const [L, C, H] = chroma(base).lch()
    const secC = clamp(C * 0.9, 4, 90)
    const secH = (H + 180) % 360
    secondary = chroma.lch(L, secC, secH).hex()
  }
  const secondaryScales = createFamilyScaleFixed({
    baseHex: secondary,
    steps,
    lightLtargets: secondaryCfg.lightLtargets,
    darkLtargets: secondaryCfg.darkLtargets,
    chromaMultiplier: secondaryCfg.chromaMultiplier,
    contrastCheck,
    contrastTarget,
  })

  // semantic families bases (good LCH seeds)
  const successBase = chroma.lch(60, 45, 140).hex()
  const warningBase = chroma.lch(64, 55, 80).hex()
  const errorBase = chroma.lch(53, 65, 20).hex()
  const infoBase = chroma.lch(60, 55, 260).hex()

  const success = createFamilyScaleFixed({
    baseHex: successBase,
    steps,
    chromaMultiplier: 0.95,
    contrastCheck,
    contrastTarget,
  })
  const warning = createFamilyScaleFixed({
    baseHex: warningBase,
    steps,
    chromaMultiplier: 0.95,
    contrastCheck,
    contrastTarget,
  })
  const error = createFamilyScaleFixed({
    baseHex: errorBase,
    steps,
    chromaMultiplier: 0.95,
    contrastCheck,
    contrastTarget,
  })
  const info = createFamilyScaleFixed({
    baseHex: infoBase,
    steps,
    chromaMultiplier: 0.95,
    contrastCheck,
    contrastTarget,
  })

  // neutrals
  const neutralLight = {}
  const neutralDark = {}
  const neutralL = [98, 96, 90, 83, 64, 45, 32, 25, 15, 9, 4]
  steps.forEach((k, i) => {
    neutralLight[k] = chroma.lch(neutralL[i], 2, 260).hex().toLowerCase()
    neutralDark[k] = chroma
      .lch(100 - neutralL[i], 2, 260)
      .hex()
      .toLowerCase()
  })

  const tokens = {
    primary,
    secondary: secondaryScales,
    success,
    warning,
    error,
    info,
    neutral: { light: neutralLight, dark: neutralDark },
  }

  const css = buildCSS(tokens)
  const tailwind = buildTailwind(tokens)

  if (writeFiles) {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(path.join(outputDir, 'colors.css'), css, 'utf8')
    fs.writeFileSync(
      path.join(outputDir, 'colors.json'),
      JSON.stringify(tokens, null, 2),
      'utf8'
    )
    fs.writeFileSync(
      path.join(outputDir, 'tailwind-colors.js'),
      tailwind,
      'utf8'
    )
  }

  return { tokens, css, tailwind }
}

/* -----------------------
   Quick example (comment out in production)
   ----------------------- */
// const out = generateDesignTokens({ base: '#861afd', contrastCheck: true, writeFiles: false })
// console.log('primary.light.500', out.tokens.primary.light[500])
// console.log('primary.dark.500', out.tokens.primary.dark[500])

/* -----------------------
   Example quick-test (comment out or remove in production)
   ----------------------- */
const result = generateDesignTokens({
  base: '#861afd',
  contrastCheck: false,
  writeFiles: true,
})
console.log('primary light 500:', result.tokens.primary.light[500])
console.log('primary dark 500 :', result.tokens.primary.dark[500])

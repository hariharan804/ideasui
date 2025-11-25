// palette-oklch-stable.js (ESM)
// npm i culori
import fs from 'fs'
import path from 'path'
import { converter, formatHex, parse } from 'culori'

/**
 * Generate Tailwind-like scales (50→950) for light & dark using OKLCH.
 * - 500 in light mode equals baseHex exactly when contrastCheck === false
 * - Monotonic lightness ramps anchored to base lightness (no weird kinks)
 * - Hue locked; chroma scaled to the *max in-gamut* chroma at each L & hue
 * - Optional WCAG contrast enforcement tweaks lightness only
 */
export function generatePalette(baseHex, opts = {}) {
  const {
    contrastCheck = false,
    targetContrast = 4.5,
    toneCurve = 'balanced', // "soft" | "balanced" | "strong"
    forceOnText,
    enforceAgainstChosenOnTextOnly = true,
  } = opts

  const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const stopIndex = (key) => stops.indexOf(key) // 0..10

  // Curves expressed as *relative* target L (0..1) before anchoring
  const L_CURVES = {
    soft: [0.98, 0.95, 0.88, 0.78, 0.66, 0.54, 0.44, 0.36, 0.28, 0.2, 0.14],
    balanced: [
      0.99, 0.96, 0.89, 0.78, 0.66, 0.54, 0.44, 0.35, 0.26, 0.18, 0.12,
    ],
    strong: [1.0, 0.97, 0.9, 0.78, 0.64, 0.5, 0.4, 0.31, 0.22, 0.15, 0.1],
  }
  const L_CURVES_DARK = {
    soft: [0.12, 0.16, 0.2, 0.25, 0.32, 0.42, 0.54, 0.64, 0.74, 0.84, 0.9],
    balanced: [
      0.12, 0.16, 0.21, 0.27, 0.35, 0.46, 0.58, 0.68, 0.78, 0.88, 0.94,
    ],
    strong: [0.1, 0.14, 0.19, 0.26, 0.35, 0.48, 0.6, 0.7, 0.8, 0.9, 0.95],
  }

  const toOKLCH = converter('oklch')
  const toRGB = converter('rgb')

  const base = parse(baseHex)
  const baseOK = toOKLCH(base) // { l:0..1, c:0..?, h:deg }
  const H0 = baseOK.h ?? 0
  const L0 = clamp(baseOK.l, 0, 1)

  // Compute *maximum in-gamut chroma* for base hue at a given L
  const maxChromaAt = (L, H) => {
    let lo = 0,
      hi = 0.45 // safe upper bound for sRGB in OKLCH
    let best = 0
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2
      const rgb = toRGB({ mode: 'oklch', l: L, c: mid, h: H })
      if (inGamut(rgb)) {
        best = mid
        lo = mid
      } else {
        hi = mid
      }
    }
    return best
  }

  // Base chroma ratio (how saturated base is relative to its max)
  const maxC_at_L0 = maxChromaAt(L0, H0) || 1e-6
  const baseC_ratio = clamp(baseOK.c / maxC_at_L0, 0, 1)

  // Chroma rolloff across scale (punchy mids, softer ends)
  const chromaRolloffAtIndex = (i, n = stops.length) => {
    const t = i / (n - 1) // 0..1
    return 0.85 - 0.25 * Math.cos(Math.PI * t) // 0.60..1.10 approx
  }

  // Build a lightness ramp anchored at base L for the 500 stop.
  // We take the chosen curve (0..1), then shift/scale it so that:
  //   L(500) = L0 (exactly), while preserving overall shape & monotonicity.
  function anchoredLightnessCurve(baseL, curveArr) {
    const i500 = stopIndex(500)
    const raw = curveArr.slice() // 0..1
    // Simple affine transform: L' = a * raw + b, such that:
    // 1) L'[i500] = baseL
    // 2) Keep the span roughly similar. We'll set a so that average L stays close.
    const avgRaw = raw.reduce((s, x) => s + x, 0) / raw.length
    const targetAvg = 0.52 // pleasant average luminance
    const a = 0.9 // gentle scaling to not overshoot
    let b = baseL - a * raw[i500]
    // Build and clamp
    const out = raw.map((x) => clamp(a * x + b, 0.02, 0.98))
    // Guarantee monotonic decrease from 50→950 for light mode (brighter→darker)
    for (let i = 1; i < out.length; i++) {
      if (out[i] > out[i - 1] - 0.002) out[i] = out[i - 1] - 0.002
    }
    // also ensure within [0.02,0.98]
    for (let i = 0; i < out.length; i++) {
      out[i] = clamp(out[i], 0.02, 0.98)
    }
    // Fix exact anchor again (float drift)
    out[i500] = baseL
    // enforce monotonic again on each side
    for (let i = i500 - 1; i >= 0; i--) {
      if (out[i] <= out[i + 1]) out[i] = clamp(out[i + 1] + 0.01, 0.02, 0.98)
    }
    for (let i = i500 + 1; i < out.length; i++) {
      if (out[i] >= out[i - 1]) out[i] = clamp(out[i - 1] - 0.01, 0.02, 0.98)
    }
    return out
  }

  // Dark curve: monotonic *increase* (50→950), independent of baseL
  function stabilizedDarkCurve(curveArr) {
    const out = curveArr.map((v) => clamp(v, 0.02, 0.98))
    for (let i = 1; i < out.length; i++) {
      if (out[i] < out[i - 1] + 0.002) out[i] = out[i - 1] + 0.002
    }
    return out
  }

  const LsLight = anchoredLightnessCurve(L0, L_CURVES[toneCurve])
  const LsDark = stabilizedDarkCurve(L_CURVES_DARK[toneCurve])

  const light = {}
  const dark = {}

  // Build light scale
  stops.forEach((key, idx) => {
    const L = LsLight[idx]
    const maxC = maxChromaAt(L, H0)
    const roll = chromaRolloffAtIndex(idx)
    const C = clamp(baseC_ratio * maxC * roll, 0, maxC)
    const ok = clampChroma({ mode: 'oklch', l: L, c: C, h: H0 }, toRGB)
    light[key] = finalizeShade(ok, {
      toRGB,
      forceOnText,
      contrastCheck,
      targetContrast,
      enforceAgainstChosenOnTextOnly,
    })
  })

  // Build dark scale (slightly more C in mids)
  stops.forEach((key, idx) => {
    const L = LsDark[idx]
    const maxC = maxChromaAt(L, H0)
    const midBoost = idx >= 3 && idx <= 8 ? 1.08 : 1.0
    const roll = chromaRolloffAtIndex(idx) * midBoost
    const C = clamp(baseC_ratio * maxC * roll, 0, maxC)
    const ok = clampChroma({ mode: 'oklch', l: L, c: C, h: H0 }, toRGB)
    dark[key] = finalizeShade(ok, {
      toRGB,
      forceOnText,
      contrastCheck,
      targetContrast,
      enforceAgainstChosenOnTextOnly,
    })
  })

  // Guarantee exact baseHex at light[500] when contrast is OFF
  if (!contrastCheck) {
    light[500] = packShade(parse(baseHex), toRGB, forceOnText)
  }

  return { light, dark }
}

/* ---------------- helpers ---------------- */

function clampChroma(ok, toRGB) {
  // ensure in-gamut by only reducing chroma (L & h fixed)
  let { l, c, h } = ok
  if (inGamut(toRGB(ok))) return ok
  let lo = 0,
    hi = c,
    best = 0
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    const rgb = toRGB({ mode: 'oklch', l, c: mid, h })
    if (inGamut(rgb)) {
      best = mid
      lo = mid
    } else {
      hi = mid
    }
  }
  return { mode: 'oklch', l, c: best, h }
}

function inGamut(rgb) {
  if (!rgb) return false
  const { r, g, b } = rgb
  return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1
}

function packShade(colorAny, toRGB, forceOnText) {
  const rgb = toRGB(colorAny)
  const hex = formatHex(rgb).toLowerCase()
  const cWhite = contrastRgb(rgb, { r: 1, g: 1, b: 1 })
  const cBlack = contrastRgb(rgb, { r: 0, g: 0, b: 0 })
  const onText = forceOnText ?? (cBlack >= cWhite ? '#000000' : '#FFFFFF')
  return {
    hex,
    rgb: {
      r: Math.round(rgb.r * 255),
      g: Math.round(rgb.g * 255),
      b: Math.round(rgb.b * 255),
    },
    contrastOnWhite: round2(cWhite),
    contrastOnBlack: round2(cBlack),
    onText,
    adjusted: false,
  }
}

function finalizeShade(
  oklch,
  {
    toRGB,
    forceOnText,
    contrastCheck,
    targetContrast,
    enforceAgainstChosenOnTextOnly,
  }
) {
  if (!contrastCheck) return packShade(oklch, toRGB, forceOnText)

  const rgb = toRGB(oklch)
  const cWhite = contrastRgb(rgb, { r: 1, g: 1, b: 1 })
  const cBlack = contrastRgb(rgb, { r: 0, g: 0, b: 0 })
  const chosen = forceOnText ?? (cBlack >= cWhite ? '#000000' : '#FFFFFF')

  const passesChosen =
    (chosen === '#000000' ? cBlack : cWhite) >= targetContrast
  const passesBoth = cBlack >= targetContrast && cWhite >= targetContrast
  const needEnforce = enforceAgainstChosenOnTextOnly
    ? !passesChosen
    : !passesBoth

  if (!needEnforce) {
    return { ...packShade(oklch, toRGB, chosen), adjusted: false }
  }

  const adjusted = adjustLightnessForContrast(
    oklch,
    chosen,
    targetContrast,
    toRGB
  )
  const out = packShade(adjusted, toRGB, chosen)
  out.adjusted = true
  return out
}

function adjustLightnessForContrast(oklch, onHex, target, toRGB) {
  const onIsWhite = onHex === '#FFFFFF'
  let { l, c, h } = oklch
  let lo = 0,
    hi = 1
  if (onIsWhite) hi = l
  else lo = l

  let best = oklch
  let bestDelta = Infinity

  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2
    let trial = { mode: 'oklch', l: mid, c, h }
    trial = clampChroma(trial, toRGB)

    const cr = contrastRgb(
      toRGB(trial),
      onIsWhite ? { r: 1, g: 1, b: 1 } : { r: 0, g: 0, b: 0 }
    )
    const delta = Math.abs(mid - l)

    if (cr >= target && delta < bestDelta) {
      best = trial
      bestDelta = delta
    }

    if (onIsWhite) {
      if (cr >= target) hi = mid
      else lo = mid
    } else {
      if (cr >= target) lo = mid
      else hi = mid
    }
  }

  // fallback to extreme if nothing passes
  if (bestDelta === Infinity) {
    let edge = { mode: 'oklch', l: onIsWhite ? 0 : 1, c, h }
    edge = clampChroma(edge, toRGB)
    best = edge
  }

  // gentle desat near extremes, re-clamp
  const desat = 1 - 0.25 * (1 - Math.abs(0.5 - best.l) * 2)
  let final = {
    mode: 'oklch',
    l: best.l,
    c: clamp(best.c * desat, 0, 0.45),
    h: best.h,
  }
  final = clampChroma(final, toRGB)
  return final
}

/* ---------- contrast (linearized sRGB) ---------- */
function contrastRgb(a, b) {
  const La = relLum(a),
    Lb = relLum(b)
  const light = Math.max(La, Lb),
    dark = Math.min(La, Lb)
  return (light + 0.05) / (dark + 0.05)
}
function relLum({ r, g, b }) {
  const lin = (v) =>
    v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

/* ---------- utils ---------- */
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
const round2 = (n) => Math.round(n * 100) / 100

/* ---------- hex-only map ---------- */
export function scaleToHexMap(scale) {
  return Object.fromEntries(
    Object.keys(scale).map((k) => [String(k), scale[k].hex])
  )
}

/* -------------------- CLI demo -------------------- */
// Run: node palette-oklch-stable.js "#140029" false
const baseHex = '#d0a4ff'
const contrastArg = 'true'
const contrastCheck = contrastArg === 'true'

const { light, dark } = generatePalette(baseHex, {
  contrastCheck,
  targetContrast: 4.5,
  toneCurve: 'balanced',
})

const out = { light: scaleToHexMap(light), dark: scaleToHexMap(dark) }
const file = path.join('.', 'pl-colors.json')
fs.writeFileSync(file, JSON.stringify(out, null, 2), 'utf8')

console.log('baseHex:', baseHex, '| contrastCheck:', contrastCheck)
console.log('light[500] (exact when contrast=false):', out.light['500'])
console.log('Saved →', file)

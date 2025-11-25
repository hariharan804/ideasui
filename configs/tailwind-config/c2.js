// color-generator.ts
// Minimal, production-friendly palette generator (HSL-based), no deps.

const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

// Lightness targets for 50..950 (0..100). Tuned to feel Tailwind-like.
const L_MAP = {
  50: 98,
  100: 96,
  200: 92,
  300: 86,
  400: 78,
  500: 68,
  600: 58,
  700: 48,
  800: 38,
  900: 30,
  950: 22,
}

// Saturation adjustment per shade (adds to base saturation, clamped)
const S_DELTA = {
  50: -18,
  100: -14,
  200: -10,
  300: -6,
  400: -2,
  500: 0,
  600: +2,
  700: +4,
  800: +6,
  900: +8,
  950: +10,
}

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
const round = (n, p = 1) => Math.round(n * 10 ** p) / 10 ** p

/* ----------------------- Color utils (hex <-> hsl) ----------------------- */

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) throw new Error(`Invalid hex: ${hex}`)
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}

function rgbToHex(r, g, b) {
  const toHex = (x) => x.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h *= 60
  }
  return { h, s: s * 100, l: l * 100 }
}

function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const hp = (h % 360) / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  const m = l - c / 2

  let r1 = 0,
    g1 = 0,
    b1 = 0
  if (hp >= 0 && hp < 1) {
    r1 = c
    g1 = x
    b1 = 0
  } else if (hp >= 1 && hp < 2) {
    r1 = x
    g1 = c
    b1 = 0
  } else if (hp >= 2 && hp < 3) {
    r1 = 0
    g1 = c
    b1 = x
  } else if (hp >= 3 && hp < 4) {
    r1 = 0
    g1 = x
    b1 = c
  } else if (hp >= 4 && hp < 5) {
    r1 = x
    g1 = 0
    b1 = c
  } else {
    r1 = c
    g1 = 0
    b1 = x
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  }
}

function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)
  return { h: round(h), s: round(s), l: round(l) }
}

function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l)
  return rgbToHex(r, g, b)
}

/* --------------------------- Scale generation ---------------------------- */

function buildScale(baseHue, baseSat, opts = {}) {
  const scale = {}
  for (const key of SHADE_KEYS) {
    // Ease saturation toward center; darks tolerate higher sat a bit.
    const s = clamp(baseSat + S_DELTA[key] + (opts?.saturationBias ?? 0), 5, 98)
    const l = clamp(L_MAP[key], 5, 98)
    const hex = hslToHex(baseHue, s, l)
    scale[key] = hex
  }
  return scale
}

function rotateHue(h, delta) {
  const v = (h + delta) % 360
  return v < 0 ? v + 360 : v
}

/* --------------------------- Public API ---------------------------------- */

export function generatePalettes(seed, options = {}) {
  const {
    secondaryHueShift = 200,
    successHue = 145,
    warningHue = 38,
    errorHue = 6,
    infoHue = 210,
    neutralSaturation = 8,
    saturationBias = 0,
  } = options

  const { h: baseH, s: baseS } = hexToHsl(seed)

  const primary = buildScale(baseH, baseS, { saturationBias })
  const secondary = buildScale(
    rotateHue(baseH, secondaryHueShift),
    clamp(baseS, 30, 85),
    { saturationBias: saturationBias - 4 }
  )
  const success = buildScale(successHue, 64, {
    saturationBias: saturationBias - 2,
  })
  const warning = buildScale(warningHue, 88, {
    saturationBias: saturationBias - 6,
  })
  const error = buildScale(errorHue, 78, { saturationBias: saturationBias - 2 })
  const info = buildScale(infoHue, 70, { saturationBias: saturationBias - 2 })
  const neutral = buildScale(baseH, neutralSaturation, { saturationBias: -10 })

  const palettes = {
    primary,
    secondary,
    success,
    warning,
    error,
    info,
    neutral,
  }

  const tokens = {
    light: {
      '--background': neutral[50],
      '--foreground': neutral[900],
      '--muted': neutral[100],
      '--muted-foreground': neutral[700],
      '--card': '#ffffff',
      '--card-foreground': neutral[900],
      '--popover': '#ffffff',
      '--popover-foreground': neutral[900],
      '--border': neutral[200],
      '--ring': primary[400],

      '--primary': primary[600],
      '--primary-foreground': '#ffffff',

      '--secondary': secondary[600],
      '--secondary-foreground': '#ffffff',

      '--success': success[600],
      '--success-foreground': '#ffffff',

      '--warning': warning[600],
      '--warning-foreground': '#1f1300',

      '--error': error[600],
      '--error-foreground': '#ffffff',

      '--info': info[600],
      '--info-foreground': '#ffffff',

      '--neutral': neutral[600],
      '--neutral-foreground': '#ffffff',

      '--focus': primary[500],
      '--outline': primary[300],
    },
    dark: {
      '--background': neutral[950],
      '--foreground': neutral[50],
      '--muted': neutral[900],
      '--muted-foreground': neutral[300],
      '--card': neutral[900],
      '--card-foreground': neutral[50],
      '--popover': neutral[900],
      '--popover-foreground': neutral[50],
      '--border': neutral[800],
      '--ring': primary[400],

      '--primary': primary[400],
      '--primary-foreground': '#0b0313',

      '--secondary': secondary[400],
      '--secondary-foreground': '#031017',

      '--success': success[400],
      '--success-foreground': '#031007',

      '--warning': warning[400],
      '--warning-foreground': '#1a1002',

      '--error': error[400],
      '--error-foreground': '#240403',

      '--info': info[400],
      '--info-foreground': '#030910',

      '--neutral': neutral[400],
      '--neutral-foreground': '#0a0c0e',

      '--focus': primary[300],
      '--outline': primary[200],
    },
  }

  return { palettes, tokens }
}

/* --------------------------- CSS emit helpers ---------------------------- */

export function toCssVariables(palettes) {
  const lines = [':root {']
  const pushScale = (name, scale) => {
    for (const k of SHADE_KEYS)
      lines.push(`  --color-${name}-${k}: ${scale[k]};`)
  }
  Object.keys(palettes).forEach((name) => pushScale(name, palettes[name]))
  lines.push('}')
  return lines.join('\n')
}

export function toSemanticCss(tokens) {
  const block = (sel, t) => {
    const rows = Object.entries(t)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n')
    return `${sel} {\n${rows}\n}`
  }
  return [
    block(':root, html, html[data-theme="light"]', tokens.light),
    block('html[data-theme="dark"]', tokens.dark),
    // Optional: a few useful class mappings
    `.btn-primary{color:var(--primary-foreground);background:var(--primary);}
.btn-secondary{color:var(--secondary-foreground);background:var(--secondary);}
.btn-success{color:var(--success-foreground);background:var(--success);}
.btn-warning{color:var(--warning-foreground);background:var(--warning);}
.btn-error{color:var(--error-foreground);background:var(--error);}
.btn-info{color:var(--info-foreground);background:var(--info);}
.btn-neutral{color:var(--neutral-foreground);background:var(--neutral);}
.border-default{border-color:var(--border);}
.ring-default{outline:2px solid var(--ring);outline-offset:2px;}
.card{background:var(--card);color:var(--card-foreground);border:1px solid var(--border);}`,
  ].join('\n\n')
}

/* --------------------------- One-liner API ------------------------------- */

export function generateCss(seed, options) {
  const { palettes, tokens } = generatePalettes(seed, options)
  return `${toCssVariables(palettes)}\n\n${toSemanticCss(tokens)}`
}
const c = generateCss('#861afd')
console.log(c)

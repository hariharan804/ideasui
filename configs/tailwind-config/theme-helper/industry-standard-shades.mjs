import chroma from 'chroma-js'
import { getSemanticColors } from './semantic-colors.mjs'
import { colorContrastChecker } from './color-contrast-checker.mjs'
import { generateCSS } from './css-generator.js'
import fs from 'fs'
import path from 'path'
/**
 * Convert color to specified format
 */
function formatColor(color, format = 'hex') {
  const c = chroma(color)
  
  switch (format) {
    case 'hex':
      return c.hex()
    case 'rgb':
      return c.css('rgb')
    case 'rgba':
      return c.css('rgba')
    case 'hsl':
      return c.css('hsl')
    case 'oklch':
      const [l, c_val, h] = c.oklch()
      return `oklch(${l.toFixed(3)} ${c_val.toFixed(3)} ${h.toFixed(1)})`
    case 'p3':
      const [r, g, b] = c.rgb()
      return `color(display-p3 ${(r/255).toFixed(3)} ${(g/255).toFixed(3)} ${(b/255).toFixed(3)})`
    default:
      return c.hex()
  }
}

/**
 * Generate WCAG-compliant color shades for component libraries
 * Includes semantic colors and neutral palette
 */
export function generateShades(baseColor, format = 'hex') {
  const base = chroma(baseColor)
  const [h, s, l] = base.hsl()

  const lightShades = {
    50: formatColor(chroma.hsl(h, s * 0.15, 0.97), format),
    100: formatColor(chroma.hsl(h, s * 0.25, 0.94), format),
    200: formatColor(chroma.hsl(h, s * 0.4, 0.87), format),
    300: formatColor(chroma.hsl(h, s * 0.6, 0.76), format),
    400: formatColor(chroma.hsl(h, s * 0.8, 0.63), format),
    500: formatColor(baseColor, format),
    600: formatColor(chroma.hsl(h, s, l * 0.85), format),
    700: formatColor(chroma.hsl(h, s, l * 0.7), format),
    800: formatColor(chroma.hsl(h, s, l * 0.55), format),
    900: formatColor(chroma.hsl(h, s, l * 0.4), format),
    950: formatColor(chroma.hsl(h, s, l * 0.25), format),
  }

  const darkShades = {
    50: formatColor(chroma.hsl(h, s * 0.3, 0.15), format),
    100: formatColor(chroma.hsl(h, s * 0.4, 0.22), format),
    200: formatColor(chroma.hsl(h, s * 0.5, 0.32), format),
    300: formatColor(chroma.hsl(h, s * 0.6, 0.42), format),
    400: formatColor(chroma.hsl(h, s * 0.7, 0.52), format),
    500: formatColor(chroma.hsl(h, s * 0.85, 0.72), format), // Brighter for dark mode
    600: formatColor(chroma.hsl(h, s * 0.7, 0.82), format),
    700: formatColor(chroma.hsl(h, s * 0.6, 0.87), format),
    800: formatColor(chroma.hsl(h, s * 0.4, 0.92), format),
    900: formatColor(chroma.hsl(h, s * 0.25, 0.95), format),
    950: formatColor(chroma.hsl(h, s * 0.15, 0.97), format),
  }

  return { light: lightShades, dark: darkShades }
}

export function generateCompleteTheme(format = 'hex') {
  // const colors = {
  //   primary: '#861afd', // Blue - main brand
  //   secondary: '#3b82f6', // Gray - secondary actions
  //   success: '#10b981', // Green
  //   warning: '#f59e0b', // Amber
  //   error: '#ef4444', // Red
  //   info: '#06b6d4', // Cyan
  // }
  const colors = getSemanticColors('#3264fb') // #861afd, #0177fe
  const theme = { light: {}, dark: {} }

  Object.entries(colors).forEach(([name, color]) => {
    const contrast = colorContrastChecker({
      backgroundColor: color,
      textColor: '#ffffff',
      isContrastCheck: true,
      contrastValue: 4.7,
    })

    const shades = generateShades(contrast?.backgroundColor, format)
    theme.light[name] = shades.light
    theme.dark[name] = shades.dark
  })

  return theme
}

const completeTheme = generateCompleteTheme('oklch')
// const oklchTheme = generateCompleteTheme('oklch')
// const rgbTheme = generateCompleteTheme('rgb')

// Write to TypeScript constants file
const tsContent = `export const completeTheme = ${JSON.stringify(completeTheme, null, 2)} as const

export type ThemeColors = typeof completeTheme`

const cssContent = generateCSS(completeTheme, {
  hoverOpacity: 0.85,
  disabledOpacity: 0.4,
  transitionNormal: '200ms ease-in-out',
})

fs.writeFileSync('./theme-helper/generated-theme-constants.ts', tsContent)
fs.writeFileSync('./theme.css', cssContent)
console.log('✅ Theme constants generated!')
console.log('✅ Brand theme CSS generated!')

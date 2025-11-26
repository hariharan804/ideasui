import chroma from 'chroma-js'
import { getSemanticColors } from './semantic-colors.mjs'
import { colorContrastChecker } from './color-contrast-checker.mjs'
import { generateCSS } from './css-generator.js'
import fs from 'fs'
import path from 'path'
/**
 * Generate WCAG-compliant color shades for component libraries
 * Includes semantic colors and neutral palette
 */
export function generateShades(baseColor) {
  const base = chroma(baseColor)
  const [h, s, l] = base.hsl()

  const lightShades = {
    50: chroma.hsl(h, s * 0.15, 0.97).hex(),
    100: chroma.hsl(h, s * 0.25, 0.94).hex(),
    200: chroma.hsl(h, s * 0.4, 0.87).hex(),
    300: chroma.hsl(h, s * 0.6, 0.76).hex(),
    400: chroma.hsl(h, s * 0.8, 0.63).hex(),
    500: baseColor,
    600: chroma.hsl(h, s, l * 0.85).hex(),
    700: chroma.hsl(h, s, l * 0.7).hex(),
    800: chroma.hsl(h, s, l * 0.55).hex(),
    900: chroma.hsl(h, s, l * 0.4).hex(),
    950: chroma.hsl(h, s, l * 0.25).hex(),
  }

  const darkShades = {
    50: chroma.hsl(h, s * 0.3, 0.15).hex(),
    100: chroma.hsl(h, s * 0.4, 0.22).hex(),
    200: chroma.hsl(h, s * 0.5, 0.32).hex(),
    300: chroma.hsl(h, s * 0.6, 0.42).hex(),
    400: chroma.hsl(h, s * 0.7, 0.52).hex(),
    500: chroma.hsl(h, s * 0.85, 0.72).hex(), // Brighter for dark mode
    600: chroma.hsl(h, s * 0.7, 0.82).hex(),
    700: chroma.hsl(h, s * 0.6, 0.87).hex(),
    800: chroma.hsl(h, s * 0.4, 0.92).hex(),
    900: chroma.hsl(h, s * 0.25, 0.95).hex(),
    950: chroma.hsl(h, s * 0.15, 0.97).hex(),
  }

  return { light: lightShades, dark: darkShades }
}

// Generate neutral grays
// export function generateNeutrals() {
//   return {
//     light: {
//       50: '#fafafa',
//       100: '#f5f5f5',
//       200: '#e5e5e5',
//       300: '#d4d4d4',
//       400: '#a3a3a3',
//       500: '#737373',
//       600: '#525252',
//       700: '#404040',
//       800: '#262626',
//       900: '#171717',
//       950: '#0a0a0a',
//     },
//     dark: {
//       50: '#0a0a0a',
//       100: '#171717',
//       200: '#262626',
//       300: '#404040',
//       400: '#525252',
//       500: '#737373',
//       600: '#a3a3a3',
//       700: '#d4d4d4',
//       800: '#e5e5e5',
//       900: '#f5f5f5',
//       950: '#fafafa',
//     },
//   }
// }

// Complete theme with semantic colors
export function generateCompleteTheme() {
  // const colors = {
  //   primary: '#861afd', // Blue - main brand
  //   secondary: '#3b82f6', // Gray - secondary actions
  //   success: '#10b981', // Green
  //   warning: '#f59e0b', // Amber
  //   error: '#ef4444', // Red
  //   info: '#06b6d4', // Cyan
  // }
  const colors = getSemanticColors('#0177fe') // #861afd, #0177fe
  const theme = { light: {}, dark: {} }

  Object.entries(colors).forEach(([name, color]) => {
    const contrast = colorContrastChecker({
      backgroundColor: color,
      textColor: '#ffffff',
      isContrastCheck: true,
      contrastValue: 4.7,
    })

    const shades = generateShades(contrast?.backgroundColor)
    theme.light[name] = shades.light
    theme.dark[name] = shades.dark
  })

  // Add neutrals
  // const neutrals = generateNeutrals()
  // theme.light.neutral = neutrals.light
  // theme.dark.neutral = neutrals.dark

  return theme
}

const completeTheme = generateCompleteTheme()

// Write to TypeScript constants file
const tsContent = `export const completeTheme = ${JSON.stringify(completeTheme, null, 2)} as const

export type ThemeColors = typeof completeTheme`



const cssContent = generateCSS(completeTheme, {
  hoverOpacity: 0.85,
  disabledOpacity: 0.4,
  transitionNormal: '200ms ease-in-out'
})

fs.writeFileSync('./generated-theme-constants.ts', tsContent)
fs.writeFileSync('./brand-theme.css', cssContent)
console.log('✅ Theme constants generated!')
console.log('✅ Brand theme CSS generated!')


import chroma from 'chroma-js'

/**
 * Generate Tailwind CSS shades (50-950) for brand colors
 *
 * Usage:
 * generateShades('#3b82f6') // Returns light and dark mode shades
 *
 * Returns: { light: {...}, dark: {...} }
 */
export function generateShades(baseColor) {
  const base = chroma(baseColor)
  const [h, s, l] = base.hsl()
  
  const lightShades = {
    50: chroma.hsl(h, s * 0.1, 0.98).hex(),
    100: chroma.hsl(h, s * 0.2, 0.95).hex(),
    200: chroma.hsl(h, s * 0.4, 0.9).hex(),
    300: chroma.hsl(h, s * 0.6, 0.8).hex(),
    400: chroma.hsl(h, s * 0.8, 0.7).hex(),
    500: baseColor,
    600: chroma.hsl(h, s, l * 0.8).hex(),
    700: chroma.hsl(h, s, l * 0.65).hex(),
    800: chroma.hsl(h, s, l * 0.5).hex(),
    900: chroma.hsl(h, s, l * 0.35).hex(),
    950: chroma.hsl(h, s, l * 0.2).hex(),
  }
  
  const darkShades = {
    50: chroma.hsl(h, s, l * 0.2).hex(),
    100: chroma.hsl(h, s, l * 0.35).hex(),
    200: chroma.hsl(h, s, l * 0.5).hex(),
    300: chroma.hsl(h, s, l * 0.65).hex(),
    400: chroma.hsl(h, s, l * 0.8).hex(),
    500: chroma.hsl(h, s * 0.9, Math.min(0.75, l + 0.2)).hex(),
    600: chroma.hsl(h, s * 0.8, 0.7).hex(),
    700: chroma.hsl(h, s * 0.6, 0.8).hex(),
    800: chroma.hsl(h, s * 0.4, 0.9).hex(),
    900: chroma.hsl(h, s * 0.2, 0.95).hex(),
    950: chroma.hsl(h, s * 0.1, 0.98).hex(),
  }
  
  return { light: lightShades, dark: darkShades }
}

// Generate multiple brand color shades
export function generateBrandTheme(colors) {
  const theme = { light: {}, dark: {} }

  Object.entries(colors).forEach(([name, color]) => {
    const shades = generateShades(color)
    theme.light[name] = shades.light
    theme.dark[name] = shades.dark
  })

  return theme
}

const shades = generateBrandTheme({
  primary: '#3b82f6',
  secondary: '#f43f5e',
  accent: '#4ade80',
})
console.log('👨‍💻 ~ shades:', shades)

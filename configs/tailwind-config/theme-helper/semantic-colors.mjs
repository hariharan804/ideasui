import chroma from 'chroma-js'

/**
 * Generate semantic colors from primary brand color
 *
 * Usage:
 * getSemanticColors('#3b82f6')
 *
 * Returns: { secondary, warning, success, danger, neutral }
 */
// Generate secondary color variants
export function generateSecondary(primaryColor, variant = 'complementary') {
  const primary = chroma(primaryColor)
  const [h, s, l] = primary.hsl()

  switch (variant) {
    case 'complementary':
      return chroma.hsl((h + 180) % 360, s * 0.7, l * 0.9).hex()
    case 'monochromatic':
      return chroma.hsl(h, s * 0.4, l * 1.2).hex()
    case 'triadic':
      return chroma.hsl((h + 120) % 360, s * 0.8, l).hex()
    case 'analogous':
      return chroma.hsl((h + 30) % 360, s * 0.9, l * 0.8).hex()
    case 'split-complementary':
      return chroma.hsl((h + 150) % 360, s * 0.8, l * 0.9).hex()
    default:
      return chroma.hsl((h + 180) % 360, s * 0.7, l * 0.9).hex()
  }
}

export function getSemanticColors(
  primaryColor,
  customSecondary = null,
  secondaryVariant = 'complementary'
) {
  const primary = chroma(primaryColor)
  const [h, s, l] = primary.hsl()

  return {
    primary: primaryColor,
    secondary:
      customSecondary || generateSecondary(primaryColor, secondaryVariant),
    warning: chroma.hsl(40, 0.9, 0.55).hex(),
    success: chroma.hsl(142, 0.76, 0.36).hex(),
    danger: chroma.hsl(0, 0.84, 0.6).hex(),
    neutral: chroma.hsl(h, 0.05, 0.45).hex(),
  }
}

const colors = getSemanticColors('#861afd')
console.log('👨‍💻 ~ colors:', colors)

// Test different secondary variants
// const variants = [
//   'complementary',
//   'monochromatic',
//   'triadic',
//   'analogous',
//   'split-complementary',
// ]

// variants.forEach((variant) => {
//   const colors = getAllSemanticColors('#861afd', null, variant)
//   console.log(`🎨 ${variant}:`, colors.secondary)
// })

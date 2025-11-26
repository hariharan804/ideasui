/**
 * Color Contrast Checker - Ensures WCAG compliance for text/background color combinations
 *
 * Usage:
 * colorContrastChecker({
 *   backgroundColor: '#000000',
 *   textColor: '#ffffff',
 *   isContrastCheck: true,
 *   contrastValue: 4.7,
 *   adjustColor: 'background' // 'text', 'background', or 'auto'
 * })
 *
 * Returns: { textColor, backgroundColor, ratio, passed }
 */
export function colorContrastChecker({
  backgroundColor,
  textColor = '#ffffff',
  isContrastCheck = true,
  contrastValue = 4.7,
  adjustColor = 'background',
}) {
  const ratio = getContrastRatio(textColor, backgroundColor)

  if (!isContrastCheck) {
    return { textColor, backgroundColor, ratio, passed: true }
  }

  if (ratio >= contrastValue) {
    console.log('✅ Passed Ratio =======>  ', ratio)
    return { textColor, backgroundColor, ratio, passed: true }
  }
  console.log('❌ Failed Ratio =======>  ', ratio)

  const adjusted = adjustColors(
    textColor,
    backgroundColor,
    contrastValue,
    adjustColor
  )
  console.log('👽 adjusted colors:', adjusted?.backgroundColor)
  return {
    textColor: adjusted.textColor,
    backgroundColor: adjusted.backgroundColor,
    ratio: adjusted.ratio,
    passed: true,
  }
}

// Convert hex color to RGB values
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0]
}

// Convert RGB values to hex color
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

// Calculate relative luminance using WCAG formula
function getLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

// Adjust colors to meet target contrast ratio
function adjustColors(
  textColor,
  backgroundColor,
  targetRatio,
  adjustColor = 'background'
) {
  let adjustedText = textColor
  let adjustedBg = backgroundColor
  let ratio = getContrastRatio(adjustedText, adjustedBg)

  while (ratio < targetRatio) {
    if (adjustColor === 'text') {
      adjustedText = adjustLuminance(adjustedText, false)
    } else if (adjustColor === 'background') {
      adjustedBg = adjustLuminance(adjustedBg, false)
    } else {
      const textLum = getLuminance(adjustedText)
      const bgLum = getLuminance(adjustedBg)
      if (textLum > bgLum) {
        adjustedBg = adjustLuminance(adjustedBg, false)
      } else {
        adjustedText = adjustLuminance(adjustedText, false)
      }
    }

    const newRatio = getContrastRatio(adjustedText, adjustedBg)
    if (newRatio === ratio) break
    ratio = newRatio
  }

  return { textColor: adjustedText, backgroundColor: adjustedBg, ratio }
}

// Adjust color luminance by making it lighter or darker
// #ffffff (white) = luminance 1.0
// #000000 (black) = luminance 0.0
// #ff0000 (red) = luminance ~0.21
// #00ff00 (green) = luminance ~0.72
function adjustLuminance(hex, lighter) {
  const [r, g, b] = hexToRgb(hex)
  const factor = lighter ? 1.2 : 0.8

  const newR = Math.min(255, Math.max(0, Math.round(r * factor)))
  const newG = Math.min(255, Math.max(0, Math.round(g * factor)))
  const newB = Math.min(255, Math.max(0, Math.round(b * factor)))

  return rgbToHex(newR, newG, newB)
}

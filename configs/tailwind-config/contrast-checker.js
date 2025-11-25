import { generateColorScale, generateSemanticScales, generateNeutralScale, generateSecondaryColor } from './color-scale-generator.js';

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  const getLuminance = (hex) => {
    const rgb = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)]
      .map(x => parseInt(x, 16) / 255)
      .map(x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4))
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  }
  
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}

// Check contrast and return status
function checkContrast(bgColor, textColor, label) {
  const ratio = getContrastRatio(bgColor, textColor)
  const status = ratio >= 4.5 ? '✅' : ratio >= 3.0 ? '⚠️' : '❌'
  const level = ratio >= 7.0 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3.0 ? 'AA Large' : 'FAIL'
  
  return {
    label,
    bgColor,
    textColor,
    ratio: ratio.toFixed(2),
    status,
    level
  }
}

// Test all color combinations
function testAllContrasts() {
  const primaryColor = '#861afd'
  const primary = generateColorScale(primaryColor, true)
  const secondaryColor = generateSecondaryColor(primaryColor)
  const secondary = generateColorScale(secondaryColor, true)
  const neutral = generateNeutralScale(primaryColor)
  const semantic = generateSemanticScales(primaryColor, true)
  
  const results = []
  
  console.log('🔍 CONTRAST ANALYSIS REPORT')
  console.log('=' .repeat(50))
  
  // Test Primary colors with white text
  console.log('\n🎨 PRIMARY COLORS (with white text):')
  Object.entries(primary.light).forEach(([shade, color]) => {
    const result = checkContrast(color, '#ffffff', `Primary-${shade}`)
    results.push(result)
    console.log(`${result.status} ${result.label}: ${result.ratio}:1 (${result.level})`)
  })
  
  // Test Secondary colors with white text
  console.log('\n🎨 SECONDARY COLORS (with white text):')
  Object.entries(secondary.light).forEach(([shade, color]) => {
    const result = checkContrast(color, '#ffffff', `Secondary-${shade}`)
    results.push(result)
    console.log(`${result.status} ${result.label}: ${result.ratio}:1 (${result.level})`)
  })
  
  // Test Semantic colors with white text
  const semanticColors = ['success', 'warning', 'error', 'info']
  semanticColors.forEach(colorName => {
    console.log(`\n🎨 ${colorName.toUpperCase()} COLORS (with white text):`)
    Object.entries(semantic[colorName].light).forEach(([shade, color]) => {
      const result = checkContrast(color, '#ffffff', `${colorName}-${shade}`)
      results.push(result)
      console.log(`${result.status} ${result.label}: ${result.ratio}:1 (${result.level})`)
    })
  })
  
  // Test Neutral colors with white text
  console.log('\n⚫ NEUTRAL COLORS (with white text):')
  Object.entries(neutral.light).forEach(([key, color]) => {
    const shade = key.replace('--color-neutral-', '')
    const result = checkContrast(color, '#ffffff', `Neutral-${shade}`)
    results.push(result)
    console.log(`${result.status} ${result.label}: ${result.ratio}:1 (${result.level})`)
  })
  
  // Summary
  const passed = results.filter(r => r.status === '✅').length
  const warning = results.filter(r => r.status === '⚠️').length
  const failed = results.filter(r => r.status === '❌').length
  
  console.log('\n📊 SUMMARY:')
  console.log('=' .repeat(30))
  console.log(`✅ PASS (AA): ${passed}`)
  console.log(`⚠️ WARNING (AA Large): ${warning}`)
  console.log(`❌ FAIL: ${failed}`)
  console.log(`📈 Total tested: ${results.length}`)
  
  // Show failed combinations
  const failures = results.filter(r => r.status === '❌')
  if (failures.length > 0) {
    console.log('\n❌ FAILED COMBINATIONS:')
    failures.forEach(f => {
      console.log(`   ${f.label}: ${f.ratio}:1 (needs ${(4.5 / parseFloat(f.ratio) * 100 - 100).toFixed(0)}% improvement)`)
    })
  }
  
  return results
}

// Run the test
testAllContrasts()
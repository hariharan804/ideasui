import chroma from "chroma-js";

/**
 * Generate secondary color using color theory
 * @param {string} primaryColor - Hex color
 * @param {string} variant - Color relationship type
 * @returns {string} - Secondary hex color
 */
export function generateSecondary(primaryColor, variant = "complementary") {
  const primary = chroma(primaryColor);
  const [h, s, l] = primary.hsl();

  const variants = {
    complementary: {
      hue: (h + 180) % 360,
      saturation: s * 0.7,
      lightness: l * 0.9,
    },
    monochromatic: {
      hue: h,
      saturation: s * 0.4,
      lightness: l * 1.2,
    },
    triadic: {
      hue: (h + 120) % 360,
      saturation: s * 0.8,
      lightness: l,
    },
    analogous: {
      hue: (h + 30) % 360,
      saturation: s * 0.9,
      lightness: l * 0.8,
    },
    "split-complementary": {
      hue: (h + 150) % 360,
      saturation: s * 0.8,
      lightness: l * 0.9,
    },
  };

  const config = variants[variant] || variants.complementary;

  return chroma
    .hsl(
      config.hue,
      Math.max(0, Math.min(1, config.saturation)),
      Math.max(0, Math.min(1, config.lightness)),
    )
    .hex();
}

/**
 * Generate semantic colors maintaining base hues but adapting to primary
 */
function generateWarning(primaryColor) {
  const [, s, l] = chroma(primaryColor).hsl();
  return chroma.hsl(40, s * 0.9, Math.max(0.5, l * 0.9)).hex(); // Amber base
}

function generateSuccess(primaryColor) {
  const [, s, l] = chroma(primaryColor).hsl();
  return chroma.hsl(142, s * 0.8, Math.max(0.35, l * 0.7)).hex(); // Green base
}

function generateDanger(primaryColor) {
  const [, s, l] = chroma(primaryColor).hsl();
  return chroma.hsl(0, s * 0.85, Math.max(0.55, l * 0.8)).hex(); // Red base
}

function generateInfo(primaryColor) {
  const [, s, l] = chroma(primaryColor).hsl();
  return chroma.hsl(200, s * 0.8, Math.max(0.5, l * 0.8)).hex(); // Blue base
}

/**
 * Generate tertiary color using triadic harmony
 */
function generateTertiary(primaryColor) {
  const [h, s, l] = chroma(primaryColor).hsl();
  return chroma.hsl((h + 240) % 360, s * 0.75, l * 0.85).hex();
}

/**
 * Generate neutral color (desaturated version of primary)
 */
function generateNeutral(primaryColor) {
  const primary = chroma(primaryColor);
  const [h, s, l] = primary.hsl();

  return chroma.hsl(h, 0.05, 0.45).hex();
}

/**
 * Generate semantic colors from primary brand color
 *
 * @param {string} primaryColor - Primary brand color (hex)
 * @param {object} options - Configuration options
 * @returns {object} - Semantic colors { primary, secondary, tertiary, warning, success, danger, info, neutral }
 *
 * Usage:
 * getSemanticColors('#861afd')
 * getSemanticColors('#861afd', { secondaryVariant: 'triadic' })
 */
export function getSemanticColors(options = {}) {
  const {
    primaryColor,
    secondaryVariant = "complementary",
    customSecondary = null,
    customTertiary = null,
    customWarning = null,
    customSuccess = null,
    customDanger = null,
    customInfo = null,
    customNeutral = null,
  } = options;

  // Validate primary color
  if (!chroma.valid(primaryColor)) {
    throw new Error(`Invalid primary color: ${primaryColor}`);
  }

  // Generate all colors dynamically
  const secondary = customSecondary || generateSecondary(primaryColor, secondaryVariant);
  const tertiary = customTertiary || generateTertiary(primaryColor);
  const warning = customWarning || generateWarning(primaryColor);
  const success = customSuccess || generateSuccess(primaryColor);
  const danger = customDanger || generateDanger(primaryColor);
  const info = customInfo || generateInfo(primaryColor);
  const neutral = customNeutral || generateNeutral(primaryColor);

  // Validate all colors
  [secondary, tertiary, warning, success, danger, info, neutral].forEach((color) => {
    if (!chroma.valid(color)) {
      throw new Error(`Generated invalid color: ${color}`);
    }
  });

  return {
    primary: primaryColor,
    secondary: secondary,
    tertiary: tertiary,
    warning: warning,
    success: success,
    danger: danger,
    info: info,
    neutral: neutral,
  };
}

// ============ EXAMPLES ============

// // Basic usage - all colors generated from primary
// const colors1 = getSemanticColors('#861afd')
// console.log(colors1)
// // { outputs
// //   primary: '#861afd',
// //   secondary: '#1afd86',
// //   warning: '#fd9c1a',
// //   success: '#1afd6d',
// //   danger: '#fd1a3d',
// //   info: '#1a9cfd',
// //   neutral: '#8b6d97'
// // }
// {
//   primary: '#861afd',
//   secondary: '#a685ca',
//   tertiary: '#1fce72',
//   warning: '#f0a50f',
//   success: '#15ae4d',
//   danger: '#ec2c2c',
//   info: '#1ba1e4',
//   neutral: '#726d78'
// }
// // Different secondary variant
// const colors2 = getSemanticColors('#861afd', {
//   secondaryVariant: 'triadic',
// })
// console.log('👨💻 ~ colors2:', colors2)

// // Override specific colors if needed
// const colors3 = getSemanticColors('#861afd', {
//   customDanger: '#dc2626',
//   customNeutral: '#767676',
// })
// console.log('👨💻 ~ colors3:', colors3)

// // Try different primary colors
// const colors4 = getSemanticColors('#015fcb')
// console.log('👨💻 ~ colors4:', colors4)
// const colors5 = getSemanticColors('#f59e0b')
// console.log('👨💻 ~ colors5:', colors5)

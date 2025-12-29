/**
 * Color Contrast Checker - Ensures WCAG compliance for text/background color combinations
 */

export function colorContrastChecker({
  backgroundColor,
  textColor = "#ffffff",
  isContrastCheck = true,
  contrastValue = 4.7,
  adjustColor = "background",
}) {
  if (!backgroundColor || typeof backgroundColor !== 'string') {
    throw new Error('backgroundColor is required and must be a valid hex color');
  }
  
  if (!isValidHexColor(backgroundColor) || !isValidHexColor(textColor)) {
    throw new Error('Colors must be valid hex format (#RRGGBB)');
  }

  const ratio = getContrastRatio(textColor, backgroundColor);

  if (!isContrastCheck) {
    return { textColor, backgroundColor, ratio, passed: true };
  }

  if (ratio >= contrastValue) {
    console.log("✅ Passed Ratio =======>  ", ratio);
    return { textColor, backgroundColor, ratio, passed: true };
  }
  
  console.log("❌ Failed Ratio =======>  ", ratio);

  try {
    const adjusted = adjustColors(textColor, backgroundColor, contrastValue, adjustColor);
    console.log("👽 adjusted colors:", adjusted?.backgroundColor);
    return {
      textColor: adjusted.textColor,
      backgroundColor: adjusted.backgroundColor,
      ratio: adjusted.ratio,
      passed: true,
    };
  } catch (error) {
    console.error('Error adjusting colors:', error);
    return { textColor, backgroundColor, ratio, passed: false };
  }
}

// Validate hex color format
function isValidHexColor(hex) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

// Convert hex color to RGB values
function hexToRgb(hex) {
  if (!isValidHexColor(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Failed to parse hex color: ${hex}`);
  }
  
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

// Convert RGB values to hex color
function rgbToHex(r, g, b) {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error(`Invalid RGB values: r=${r}, g=${g}, b=${b}`);
  }
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Calculate relative luminance using WCAG formula
function getLuminance(hex) {
  try {
    const [r, g, b] = hexToRgb(hex).map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  } catch (error) {
    console.error(`Error calculating luminance for ${hex}:`, error);
    return 0;
  }
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  try {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch (error) {
    console.error(`Error calculating contrast ratio between ${color1} and ${color2}:`, error);
    return 1;
  }
}

// Adjust colors to meet target contrast ratio
function adjustColors(
  textColor,
  backgroundColor,
  targetRatio,
  adjustColor = "background"
) {
  let adjustedText = textColor;
  let adjustedBg = backgroundColor;
  let ratio = getContrastRatio(adjustedText, adjustedBg);
  let iterations = 0;
  const maxIterations = 50; // Prevent infinite loops

  while (ratio < targetRatio && iterations < maxIterations) {
    try {
      if (adjustColor === "text") {
        adjustedText = adjustLuminance(adjustedText, false);
      } else if (adjustColor === "background") {
        adjustedBg = adjustLuminance(adjustedBg, false);
      } else {
        const textLum = getLuminance(adjustedText);
        const bgLum = getLuminance(adjustedBg);
        if (textLum > bgLum) {
          adjustedBg = adjustLuminance(adjustedBg, false);
        } else {
          adjustedText = adjustLuminance(adjustedText, false);
        }
      }

      const newRatio = getContrastRatio(adjustedText, adjustedBg);
      if (newRatio === ratio) break; // No improvement, exit
      ratio = newRatio;
      iterations++;
    } catch (error) {
      console.error('Error during color adjustment:', error);
      break;
    }
  }

  if (iterations >= maxIterations) {
    console.warn('Maximum iterations reached during color adjustment');
  }

  return { textColor: adjustedText, backgroundColor: adjustedBg, ratio };
}

// Adjust color luminance by making it lighter or darker
function adjustLuminance(hex, lighter) {
  try {
    const [r, g, b] = hexToRgb(hex);
    const step = lighter ? 10 : -10;

    const newR = Math.min(255, Math.max(0, r + step));
    const newG = Math.min(255, Math.max(0, g + step));
    const newB = Math.min(255, Math.max(0, b + step));

    return rgbToHex(newR, newG, newB);
  } catch (error) {
    console.error(`Error adjusting luminance for ${hex}:`, error);
    return hex; // Return original color if adjustment fails
  }
}

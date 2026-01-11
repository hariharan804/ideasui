import chroma from 'chroma-js';

/**
 * Convert color to specified format
 */
function formatColor(color, format = 'hex') {
  // Handle direct OKLCH values to preserve exact hue
  if (Array.isArray(color) && color.length === 3) {
    const [l, c_val, h] = color;
    if (format === 'oklch') {
      // Handle NaN hue for grayscale colors
      const hueValue = isNaN(h) || c_val === 0 ? 0 : h;
      return `oklch(${l.toFixed(3)} ${c_val.toFixed(3)} ${hueValue.toFixed(1)})`;
    }
  }

  const c = chroma(color);

  switch (format) {
    case 'hex':
      return c.hex();
    case 'rgb':
      return c.css('rgb');
    case 'rgba':
      return c.css('rgba');
    case 'hsl':
      return c.css('hsl');
    case 'oklch':
      const [l, c_val, h] = c.oklch();
      const hueValue = isNaN(h) || c_val === 0 ? 0 : h;
      return `oklch(${l.toFixed(3)} ${c_val.toFixed(3)} ${hueValue.toFixed(1)})`;
    case 'p3':
      const [r, g, b] = c.rgb();
      return `color(display-p3 ${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)})`;
    default:
      return c.hex();
  }
}

/**
 * Generate WCAG-compliant color shades with smooth progression
 * Dynamically extracts hue and chroma from the input color
 * Industry-standard approach: preserves the actual color's hue throughout the palette
 */
export function generateShades(baseColor, colorName, format = 'oklch') {
  // Use chroma-js to extract OKLCH values from the input color
  const color = chroma(baseColor);
  const [baseL, baseC, baseH] = color.oklch();

  // Handle grayscale colors (neutral/gray) - they have undefined/NaN hue
  const isGrayscale = colorName === 'gray' || isNaN(baseH) || baseC < 0.01;

  // Neutral gets a slight warm tint, gray is pure grayscale
  const isNeutral = colorName === 'neutral';

  // Use the actual hue from the input color, or 0 for grayscale
  const finalHue = isGrayscale ? 0 : isNeutral ? baseH : baseH;

  // Use the actual chroma from input, with reasonable min/max bounds
  // Industry standard: maintain vibrancy while ensuring consistency
  const chromaBase = isGrayscale ? 0 : Math.max(0.08, Math.min(baseC, 0.25));

  // Light mode: Consistent decreasing lightness progression (50→950)
  // Industry-standard Tailwind-like scale
  const lightShades = {
    50: formatColor([0.97, chromaBase * 0.1, finalHue], format), // Very light
    100: formatColor([0.93, chromaBase * 0.18, finalHue], format),
    200: formatColor([0.87, chromaBase * 0.35, finalHue], format),
    300: formatColor([0.79, chromaBase * 0.55, finalHue], format),
    400: formatColor([0.7, chromaBase * 0.78, finalHue], format),
    500: formatColor([0.59, chromaBase, finalHue], format), // Base - peak chroma
    600: formatColor([0.5, chromaBase * 0.95, finalHue], format),
    700: formatColor([0.42, chromaBase * 0.85, finalHue], format),
    800: formatColor([0.32, chromaBase * 0.72, finalHue], format),
    900: formatColor([0.22, chromaBase * 0.55, finalHue], format),
    950: formatColor([0.14, chromaBase * 0.4, finalHue], format), // Very dark
  };

  // Dark mode: Inverted progression (50 is dark, 950 is light)
  // For dark backgrounds, we flip the scale
  const darkShades = {
    50: formatColor([0.14, chromaBase * 0.4, finalHue], format), // Very dark
    100: formatColor([0.2, chromaBase * 0.5, finalHue], format),
    200: formatColor([0.28, chromaBase * 0.62, finalHue], format),
    300: formatColor([0.38, chromaBase * 0.75, finalHue], format),
    400: formatColor([0.48, chromaBase * 0.88, finalHue], format),
    500: formatColor([0.59, chromaBase, finalHue], format), // Base - peak chroma
    600: formatColor([0.7, chromaBase * 0.85, finalHue], format),
    700: formatColor([0.79, chromaBase * 0.68, finalHue], format),
    800: formatColor([0.87, chromaBase * 0.48, finalHue], format),
    900: formatColor([0.93, chromaBase * 0.28, finalHue], format),
    950: formatColor([0.97, chromaBase * 0.15, finalHue], format), // Very light
  };

  return { light: lightShades, dark: darkShades };
}

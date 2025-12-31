import chroma from "chroma-js";
import {getSemanticColors} from "./semantic-colors.mjs";
import {colorContrastChecker} from "./color-contrast-checker.mjs";
import fs from "fs";

/**
 * Convert color to specified format
 */
function formatColor(color, format = "hex") {
  const c = chroma(color);

  switch (format) {
    case "hex":
      return c.hex();
    case "rgb":
      return c.css("rgb");
    case "rgba":
      return c.css("rgba");
    case "hsl":
      return c.css("hsl");
    case "oklch":
      const [l, c_val, h] = c.oklch();
      return `oklch(${l.toFixed(3)} ${c_val.toFixed(3)} ${h.toFixed(1)})`;
    case "p3":
      const [r, g, b] = c.rgb();
      return `color(display-p3 ${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)})`;
    default:
      return c.hex();
  }
}

/**
 * Detect semantic color name from hue value
 */
function detectColorName(hue) {
  // Define hue ranges for each semantic color
  const colorRanges = {
    primary: {min: 290, max: 320, target: 300.0},
    secondary: {min: 295, max: 315, target: 305.1},
    tertiary: {min: 140, max: 150, target: 145.4},
    success: {min: 140, max: 150, target: 145.4},
    warning: {min: 55, max: 65, target: 60.0},
    danger: {min: 25, max: 40, target: 28.2},
    info: {min: 230, max: 265, target: 243.0},
    neutral: {min: 300, max: 320, target: 306.3},
  };

  for (const [name, range] of Object.entries(colorRanges)) {
    if (hue >= range.min && hue <= range.max) {
      return {name, lockedHue: range.target};
    }
  }

  // Default fallback
  return {name: "default", lockedHue: hue};
}

/**
 * Generate WCAG-compliant color shades with locked hue and smooth progression
 */
export function generateShades(baseColor, colorNameOverride = null, format = "oklch") {
  const base = chroma(baseColor);
  const [baseL, baseC, baseH] = base.oklch();

  // Detect color name and get locked hue
  const {name: detectedName, lockedHue} = detectColorName(baseH);
  const colorName = colorNameOverride || detectedName;

  // Define locked hues explicitly for each semantic color
  const hueMap = {
    primary: 300.0,
    secondary: 305.1,
    tertiary: 145.4,
    success: 145.4,
    warning: 60.0,
    danger: 28.2,
    info: 243.0,
    neutral: 306.3,
  };

  const finalHue = hueMap[colorName] || lockedHue;

  // Light mode: smooth lightness and chroma progression with locked hue
  const lightShades = {
    50: formatColor(chroma.oklch(0.98, baseC * 0.08, finalHue), format),
    100: formatColor(chroma.oklch(0.95, baseC * 0.15, finalHue), format),
    200: formatColor(chroma.oklch(0.88, baseC * 0.32, finalHue), format),
    300: formatColor(chroma.oklch(0.78, baseC * 0.5, finalHue), format),
    400: formatColor(chroma.oklch(0.65, baseC * 0.7, finalHue), format),
    500: formatColor(chroma.oklch(baseL, baseC, finalHue), format),
    600: formatColor(chroma.oklch(baseL * 0.88, baseC * 0.95, finalHue), format),
    700: formatColor(chroma.oklch(baseL * 0.75, baseC * 0.85, finalHue), format),
    800: formatColor(chroma.oklch(baseL * 0.58, baseC * 0.7, finalHue), format),
    900: formatColor(chroma.oklch(baseL * 0.42, baseC * 0.55, finalHue), format),
    950: formatColor(chroma.oklch(baseL * 0.28, baseC * 0.4, finalHue), format),
  };

  // Dark mode: inverted lightness with same locked hue and balanced chroma
  const darkShades = {
    50: formatColor(chroma.oklch(0.15, baseC * 0.35, finalHue), format),
    100: formatColor(chroma.oklch(0.22, baseC * 0.45, finalHue), format),
    200: formatColor(chroma.oklch(0.32, baseC * 0.52, finalHue), format),
    300: formatColor(chroma.oklch(0.42, baseC * 0.6, finalHue), format),
    400: formatColor(chroma.oklch(0.52, baseC * 0.72, finalHue), format),
    500: formatColor(chroma.oklch(0.72, baseC * 0.85, finalHue), format),
    600: formatColor(chroma.oklch(0.82, baseC * 0.7, finalHue), format),
    700: formatColor(chroma.oklch(0.87, baseC * 0.58, finalHue), format),
    800: formatColor(chroma.oklch(0.92, baseC * 0.4, finalHue), format),
    900: formatColor(chroma.oklch(0.95, baseC * 0.25, finalHue), format),
    950: formatColor(chroma.oklch(0.97, baseC * 0.14, finalHue), format),
  };

  return {light: lightShades, dark: darkShades};
}

/**
 * Generate complete theme with all semantic colors
 */
export function generateCompleteTheme(format = "oklch") {
  const semanticColors = getSemanticColors("#861afd");
  const theme = {light: {}, dark: {}};

  // Map of color names to their target hues
  const colorNameMap = {
    primary: 300.0,
    secondary: 305.1,
    tertiary: 145.4,
    success: 145.4,
    warning: 60.0,
    danger: 28.2,
    info: 243.0,
    neutral: 306.3,
  };

  Object.entries(semanticColors).forEach(([name, color]) => {
    // Get the appropriate locked hue for this color
    const lockedHue = colorNameMap[name] || null;

    // Generate shades with explicit color name
    const shades = generateShades(color, name, format);
    theme.light[name] = shades.light;
    theme.dark[name] = shades.dark;
  });

  return theme;
}

/**
 * Format theme object into TypeScript export
 */
const formatColorTokens = (theme) => {
  const formatTheme = (themeData, themeName = "") => {
    const colorEntries = Object.entries(themeData)
      .map(([colorName, shades]) => {
        const shadeEntries = Object.entries(shades)
          .map(([shade, value]) => `    ${shade}: '${value}',`)
          .join("\n");
        return `  ${colorName}: {\n${shadeEntries}\n  },`;
      })
      .join("\n");

    const exportName = themeName ? `${themeName}ColorTokens` : "colorTokens";
    return `export const ${exportName} = {\n${colorEntries}\n} as const;`;
  };

  return [formatTheme(theme.light), "", formatTheme(theme.dark, "dark")].join("\n");
};

/**
 * Main execution
 */
try {
  const completeTheme = generateCompleteTheme("oklch");
  const tsContent = formatColorTokens(completeTheme);

  // Ensure directory exists
  const dir = "src/tokens";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  fs.writeFileSync("src/tokens/colors.ts", tsContent);
  console.log("✅ Color tokens generated successfully!");
  console.log("📁 Output: src/tokens/colors.ts");
} catch (error) {
  console.error("❌ Error generating color tokens:", error.message);
  process.exit(1);
}

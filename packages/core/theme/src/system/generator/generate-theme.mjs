import {getSemanticColors} from "./semantic-colors.mjs";
import {colorContrastChecker} from "./color-contrast-checker.mjs";
import {generateShades} from "./shades-generator.mjs";
import fs from "fs";

/**
 * Generate complete theme with all semantic colors
 */
export function generateCompleteTheme(format = "oklch", checkContrast = false) {
  let primaryColor = "#861afd"; // #0ea5e9  #861afd
  if (checkContrast) {
    const result = colorContrastChecker({
      backgroundColor: primaryColor,
      textColor: "#ffffff",
      isContrastCheck: true,
      adjustColor: "background", // Adjust the background color if contrast fails
    });
    primaryColor = result.backgroundColor;
  }

  const semanticColors = getSemanticColors({
    // Industry-standard semantic colors for component library showcase
    primaryColor: primaryColor || "#861afd",
    secondaryVariant: "complementary",
    customSecondary: "#06b6d4", // Cyan 500 - Fresh, modern accent
    customTertiary: "#14b8a6", // Teal 500 - Complementary accent
    customWarning: "#f59e0b", // Amber 500 - Standard warning (orange-yellow)
    customSuccess: "#22c55e", // Green 500 - Standard success (emerald)
    customDanger: "#ef4444", // Red 500 - Standard danger/error
    customInfo: "#3b82f6", // Blue 500 - Standard info
    customNeutral: "#64748b", // Slate 500 - Neutral gray with slight blue

    // chatgpt
    //  primaryColor:   "#6366F1", // Indigo 500 — modern default primary

    // customSecondary: "#0EA5E9", // Sky Blue — supporting actions & links
    // customTertiary:  "#8B5CF6", // Violet — accents, charts, emphasis

    // customSuccess:   "#22C55E", // Green — success states
    // customWarning:   "#F59E0B", // Amber — warnings
    // customDanger:    "#EF4444", // Red — errors & destructive
    // customInfo:      "#0284C7", // Blue — informational
    // customNeutral:   "#64748B", // Slate — borders, muted UI

    // clade
    // secondaryVariant: "complementary",
    // customPrimary: "#8b5cf6",      // Purple/Violet - Modern, premium brand color
    // customSecondary: "#10b981",    // Emerald/Green - Common for secondary actions
    // customTertiary: "#06b6d4",     // Cyan - Fresh, modern accent
    // customWarning: "#f59e0b",      // Amber - Standard warning color
    // customSuccess: "#10b981",      // Green - Universal success indicator
    // customDanger: "#ef4444",       // Red - Clear danger/error signal
    // customInfo: "#3b82f6",         // Blue - Information and links
    // customNeutral: "#64748b",      // Slate Gray - Professional neutral

    // final
    //     primaryColor: "#861afd",       // Your bold purple ⚡
    // customSecondary: "#0EA5E9",    // ChatGPT's Sky Blue (more vibrant than cyan)
    // customTertiary: "#8B5CF6",     // Violet accent
    // customWarning: "#f59e0b",      // Amber
    // customSuccess: "#22c55e",      // Green
    // customDanger: "#ef4444",       // Red
    // customInfo: "#0284C7",         // ChatGPT's deeper blue (more serious)
    // customNeutral: "#64748b",      // Slate

    // final 2
    primaryColor: "#6366F1", // Indigo 500
    secondaryVariant: "complementary",

    customSecondary: "#0EA5E9", // Sky Blue – secondary actions
    customTertiary: "#8B5CF6", // Violet – accents, charts

    customSuccess: "#22C55E", // Green – success
    customWarning: "#F59E0B", // Amber – warning
    customDanger: "#EF4444", // Red – error/destructive
    customInfo: "#0284C7", // Blue – info/links
    customNeutral: "#64748B", // Slate – borders, muted UI
  });
  const theme = {light: {}, dark: {}};

  Object.entries(semanticColors).forEach(([name, color]) => {
    let finalColor = color;

    // Optional: Ensure the base color meets WCAG contrast requirements
    // We check if White text (#FFFFFF) is readable on this background color
    if (checkContrast) {
      const result = colorContrastChecker({
        backgroundColor: finalColor,
        textColor: "#ffffff",
        isContrastCheck: true,
        adjustColor: "background", // Adjust the background color if contrast fails
      });

      finalColor = result.backgroundColor;
      console.debug("🚀 ~ generateCompleteTheme ~ finalColor:", finalColor);
    }

    // Generate shades with explicit color name to force hue locking
    const shades = generateShades(finalColor, name, format);
    theme.light[name] = shades.light;
    theme.dark[name] = shades.dark;
  });

  // Add gray color using generateShades (it handles grayscale automatically)
  const grayShades = generateShades("#808080", "gray", format);
  theme.light.gray = grayShades.light;
  theme.dark.gray = grayShades.dark;

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

    const exportName = themeName ? `${themeName}ColorTokens` : "lightColorTokens";
    return `export const ${exportName} = {\n${colorEntries}\n} as const;`;
  };

  return [formatTheme(theme.light), "", formatTheme(theme.dark, "dark")].join("\n");
};

/**
 * Main execution
 */
try {
  // Generate theme with OKLCH format and enable contrast checking
  const completeTheme = generateCompleteTheme("oklch", false);
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

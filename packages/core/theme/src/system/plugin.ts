import plugin from "tailwindcss/plugin";
import deepMerge from "deepmerge";
import {
  animation,
  borderRadius,
  boxShadow,
  fontSize,
  keyframes,
  spacing,
  transitionDuration,
  transitionTimingFunction,
} from "../tokens";
import {lightColorTokens, darkColorTokens} from "../tokens/colors";
import {darkLayout, lightLayout, lightCommonColors, darkCommonColors} from "../tokens/layout";
import {ThemeConfig, ConfigThemes, ResolvedConfig, ConfigTheme} from "./types";
import {
  flattenThemeObject,
  kebabCase,
  mapKeys,
  omit,
  escapeSelector,
  parseColorValue,
  formatColorComponents,
  isNumericShade,
  extractColorBaseNames,
  SEMANTIC_TOKEN_MAP,
  DEFAULT_PREFIX,
} from "./utils";

type ThemeMode = "light" | "dark";

// ─────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────

/** Generates semantic CSS vars that reference shade vars */
function generateSemanticVars(
  colorName: string,
  prefix: string,
  mode: ThemeMode,
): Record<string, string> {
  const mapping = SEMANTIC_TOKEN_MAP[mode];
  const result: Record<string, string> = {};

  for (const [semantic, shade] of Object.entries(mapping)) {
    result[`--${prefix}-${colorName}-${semantic}`] = `var(--${prefix}-${colorName}-${shade})`;
  }

  return result;
}

/** Creates CSS selectors for a theme */
function createThemeSelectors(themeName: string, defaultTheme: string) {
  const cssSelector = `.${escapeSelector(themeName)}`;
  const baseSelector =
    themeName === defaultTheme
      ? `:root, .${themeName}, [data-theme='${themeName}']`
      : `.${themeName}, [data-theme='${themeName}']`;

  return {cssSelector, baseSelector};
}

/** Determines the color scheme for a theme */
function getColorScheme(themeName: string, extend?: "light" | "dark"): string | null {
  if (themeName === "light" || themeName === "dark") return themeName;
  return extend || null;
}

/** Determines the mode (light/dark) for a theme */
function getThemeMode(themeName: string, extend?: "light" | "dark"): ThemeMode {
  return themeName === "dark" || extend === "dark" ? "dark" : "light";
}

// ─────────────────────────────────────────────────────────────
// Color Processing
// ─────────────────────────────────────────────────────────────

/** Processes and registers all colors for a theme */
function processColors(
  flatColors: Record<string, string>,
  prefix: string,
  mode: ThemeMode,
  resolved: ResolvedConfig,
  cssSelector: string,
  baseSelector: string,
): void {
  // Process shade colors
  for (const [colorName, colorValue] of Object.entries(flatColors)) {
    if (!colorValue) continue;

    // Skip non-numeric shades for shade-based colors
    if (colorName.includes("-")) {
      const shade = colorName.split("-").pop() || "";
      if (!isNumericShade(shade)) continue;
    }

    const parsed = parseColorValue(colorValue);
    if (!parsed) continue;

    const {components} = parsed;
    const colorVar = `--${prefix}-${colorName}`;
    const formattedValue = formatColorComponents(components);
    const alphaValue = components[3] ?? "<alpha-value>";

    // Register CSS variable (per-theme)
    resolved.utilities[cssSelector][colorVar] = formattedValue;
    resolved.baseStyles[baseSelector][colorVar] = formattedValue;

    // Register Tailwind color only if not already set (first theme wins)
    if (!resolved.colors[colorName]) {
      resolved.colors[colorName] = `oklch(var(${colorVar}) / ${alphaValue})`;
    }
  }

  // Generate semantic tokens
  const colorBaseNames = extractColorBaseNames(flatColors);

  for (const baseName of colorBaseNames) {
    const semanticVars = generateSemanticVars(baseName, prefix, mode);

    for (const [varName, varValue] of Object.entries(semanticVars)) {
      resolved.utilities[cssSelector][varName] = varValue;
      resolved.baseStyles[baseSelector][varName] = varValue;

      // Register Tailwind color only if not already set (first theme wins)
      const tokenName = varName.replace(`--${prefix}-`, "").replace(/-DEFAULT$/, "");
      if (!resolved.colors[tokenName]) {
        resolved.colors[tokenName] = `oklch(var(${varName}) / <alpha-value>)`;
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Layout Processing
// ─────────────────────────────────────────────────────────────

/** Processes and registers layout tokens for a theme */
function processLayout(
  flatLayout: Record<string, unknown>,
  prefix: string,
  resolved: ResolvedConfig,
  cssSelector: string,
  baseSelector: string,
): void {
  for (const [key, value] of Object.entries(flatLayout)) {
    if (!value) continue;

    const varName = `--${prefix}-${key}`;

    if (typeof value === "object" && value !== null) {
      // Handle nested objects
      for (const [nestedKey, nestedValue] of Object.entries(value as Record<string, string>)) {
        const nestedVar = `${varName}-${nestedKey}`;
        resolved.utilities[cssSelector][nestedVar] = nestedValue;
        resolved.baseStyles[baseSelector][nestedVar] = nestedValue;
      }
    } else {
      // Format opacity values (0.5 → .5)
      const formattedValue =
        key.includes("opacity") && typeof value === "number"
          ? value.toString().replace(/^0\./, ".")
          : String(value);

      resolved.utilities[cssSelector][varName] = formattedValue;
      resolved.baseStyles[baseSelector][varName] = formattedValue;
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Config Resolution
// ─────────────────────────────────────────────────────────────

/** Resolves theme configuration into CSS utilities, base styles, and variants */
function resolveConfig(themes: ConfigThemes, defaultTheme: string, prefix: string): ResolvedConfig {
  const resolved: ResolvedConfig = {
    variants: [],
    utilities: {},
    colors: {},
    baseStyles: {},
  };

  for (const [themeName, {extend, layout, colors}] of Object.entries(themes)) {
    const {cssSelector, baseSelector} = createThemeSelectors(themeName, defaultTheme);
    const colorScheme = getColorScheme(themeName, extend);
    const mode = getThemeMode(themeName, extend);

    // Initialize style objects
    resolved.baseStyles[baseSelector] = colorScheme ? {"color-scheme": colorScheme} : {};
    resolved.utilities[cssSelector] = colorScheme ? {"color-scheme": colorScheme} : {};

    // Register variant
    resolved.variants.push({
      name: themeName,
      definition: [`&.${escapeSelector(themeName)}`, `&[data-theme='${themeName}']`],
    });

    // Process colors
    const flatColors = flattenThemeObject(colors || {}) as Record<string, string>;
    processColors(flatColors, prefix, mode, resolved, cssSelector, baseSelector);

    // Process layout
    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {};
    processLayout(flatLayout, prefix, resolved, cssSelector, baseSelector);
  }

  return resolved;
}

// ─────────────────────────────────────────────────────────────
// Theme Building
// ─────────────────────────────────────────────────────────────

/** Builds the final theme configuration by merging defaults with user config */
function buildThemes(config: ThemeConfig): ConfigThemes {
  const themeData = config?.themes || {};
  const userLayout = config?.layout || {};

  // Extract user overrides
  const userLightColors = themeData.light?.colors || {};
  const userDarkColors = themeData.dark?.colors || {};
  const userLightLayout = themeData.light?.layout || {};
  const userDarkLayout = themeData.dark?.layout || {};

  // Build base layout (global layout merged with mode defaults)
  const baseLayout =
    userLayout && typeof userLayout === "object" ? deepMerge(lightLayout, userLayout) : lightLayout;

  // Build theme configs
  const lightTheme: ConfigTheme = {
    layout: deepMerge({...baseLayout, ...lightLayout}, userLightLayout),
    colors: deepMerge({...lightColorTokens, ...lightCommonColors}, userLightColors),
  };

  const darkTheme: ConfigTheme = {
    layout: deepMerge({...baseLayout, ...darkLayout}, userDarkLayout),
    colors: deepMerge({...darkColorTokens, ...darkCommonColors}, userDarkColors),
  };

  // Merge with any custom themes
  return {
    light: lightTheme,
    dark: darkTheme,
    ...(omit(themeData, ["light", "dark"]) as ConfigThemes),
  };
}

// ─────────────────────────────────────────────────────────────
// Tailwind Theme Extension
// ─────────────────────────────────────────────────────────────

/** Creates the Tailwind theme extension configuration */
function createThemeExtension(
  colors: Record<string, string>,
  prefix: string,
  disableAnimations: boolean,
) {
  return {
    colors,
    spacing,
    borderRadius: {
      ...borderRadius,
      small: `var(--${prefix}-radius-small)`,
      medium: `var(--${prefix}-radius-medium)`,
      large: `var(--${prefix}-radius-large)`,
    },
    fontSize,
    boxShadow: {
      ...boxShadow,
      small: `var(--${prefix}-box-shadow-small)`,
      medium: `var(--${prefix}-box-shadow-medium)`,
      large: `var(--${prefix}-box-shadow-large)`,
    },
    animation: disableAnimations ? {none: "none"} : animation,
    keyframes: disableAnimations ? {} : keyframes,
    transitionDuration,
    transitionTimingFunction,
  };
}

// ─────────────────────────────────────────────────────────────
// Plugin Export
// ─────────────────────────────────────────────────────────────

/** IdeasUI Tailwind CSS plugin - generates CSS variables and utilities */
export const ideasUIPlugin = (config: ThemeConfig = {}): ReturnType<typeof plugin> => {
  const {defaultTheme = "light", prefix = DEFAULT_PREFIX, disableAnimations = false} = config;

  const themes = buildThemes(config);
  const resolved = resolveConfig(themes, defaultTheme, prefix);

  return plugin(
    ({addBase, addUtilities, addVariant}) => {
      addBase(resolved.baseStyles);
      addUtilities({...resolved.utilities});

      for (const variant of resolved.variants) {
        addVariant(variant.name, variant.definition);
      }

      if (disableAnimations) {
        addBase({
          "*,*::before,*::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
        });
      }
    },
    {
      theme: {
        extend: createThemeExtension(resolved.colors, prefix, disableAnimations),
      },
    },
  );
};

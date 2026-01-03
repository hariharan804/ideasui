import {colorTokens, darkColorTokens} from "./tokens/colors";
import {systemTokens} from "./tokens";
import {defaultLayout, lightLayout, darkLayout} from "./tokens/layout";
import type {ThemeConfig, ColorTokens} from "./system/types";
interface PluginAPI {
  addBase: (styles: Record<string, Record<string, string>>) => void;
  addUtilities: (utilities: Record<string, Record<string, string>>) => void;
  addVariant: (name: string, definition: string[]) => void;
}

const DEFAULT_PREFIX = "ideasui" as const;
const MAX_THEME_NAME_LENGTH = 50;
const VALID_THEME_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]*$/;

interface ResolvedConfig {
  variants: Array<{name: string; definition: string[]}>;
  utilities: Record<string, Record<string, string>>;
  colors: Record<string, string>;
  baseStyles: Record<string, Record<string, string>>;
}

interface ThemeData {
  colors?: Partial<ColorTokens>;
  layout?: Record<string, string | number>;
}

/**
 * Validates theme name for security and compatibility
 * @param themeName - Theme name to validate
 * @returns True if valid, false otherwise
 */
const isValidThemeName = (themeName: string): boolean => {
  return (
    typeof themeName === "string" &&
    themeName.length > 0 &&
    themeName.length <= MAX_THEME_NAME_LENGTH &&
    VALID_THEME_NAME_REGEX.test(themeName)
  );
};

/**
 * Generates CSS selector for theme
 * @param themeName - Theme name
 * @returns CSS selector string
 */
const generateCssSelector = (themeName: string): string => {
  return `.${CSS.escape(themeName)}`;
};

/**
 * Generates semantic color variables for a theme
 * @param prefix - CSS variable prefix
 * @param isDark - Whether theme is dark mode
 * @returns Object with semantic color variables
 */
const generateSemanticColors = (prefix: string, isDark: boolean) => ({
  [`--${prefix}-color-background`]: `var(--${prefix}-color-neutral-${isDark ? "950" : "50"})`,
  [`--${prefix}-color-foreground`]: `var(--${prefix}-color-neutral-${isDark ? "50" : "900"})`,
  [`--${prefix}-color-primary`]: `var(--${prefix}-color-primary-${isDark ? "400" : "500"})`,
  [`--${prefix}-color-primary-foreground`]: `var(--${prefix}-color-primary-${isDark ? "950" : "50"})`,
});

/**
 * Processes color tokens and generates CSS variables
 * @param mergedColors - Color tokens to process
 * @param prefix - CSS variable prefix
 * @param cssSelector - CSS selector for theme
 * @param baseSelector - Base selector for root styles
 * @param resolved - Resolved config object to update
 */
const processColorTokens = (
  mergedColors: ColorTokens,
  prefix: string,
  cssSelector: string,
  baseSelector: string,
  resolved: ResolvedConfig,
): void => {
  Object.entries(mergedColors).forEach(([colorName, shades]) => {
    if (shades && typeof shades === "object") {
      Object.entries(shades).forEach(([shade, value]) => {
        if (typeof value === "string") {
          const varName = `--${prefix}-color-${colorName}-${shade}`;
          resolved.utilities[cssSelector][varName] = value;
          if (baseSelector) {
            resolved.baseStyles[baseSelector][varName] = value;
          }
        }
      });
    }
  });
};

/**
 * Processes layout tokens and generates CSS variables
 * @param mergedLayout - Layout tokens to process
 * @param prefix - CSS variable prefix
 * @param cssSelector - CSS selector for theme
 * @param baseSelector - Base selector for root styles
 * @param resolved - Resolved config object to update
 */
const processLayoutTokens = (
  mergedLayout: Record<string, string | number>,
  prefix: string,
  cssSelector: string,
  baseSelector: string,
  resolved: ResolvedConfig,
): void => {
  Object.entries(mergedLayout).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      const varName = `--${prefix}-${kebabKey}`;
      const stringValue = String(value);
      resolved.utilities[cssSelector][varName] = stringValue;
      if (baseSelector) {
        resolved.baseStyles[baseSelector][varName] = stringValue;
      }
    }
  });
};

/**
 * Generates Tailwind color references
 * @param prefix - CSS variable prefix
 * @param resolved - Resolved config object to update
 */
const generateTailwindColors = (prefix: string, resolved: ResolvedConfig): void => {
  Object.keys(colorTokens).forEach((colorName) => {
    const colorKey = colorName as keyof ColorTokens;
    Object.keys(colorTokens[colorKey]).forEach((shade) => {
      resolved.colors[`${colorName}-${shade}`] = `var(--${prefix}-color-${colorName}-${shade})`;
    });
    resolved.colors[colorName] = `var(--${prefix}-color-${colorName})`;
    resolved.colors[`${colorName}-foreground`] = `var(--${prefix}-color-${colorName}-foreground)`;
  });

  resolved.colors.background = `var(--${prefix}-color-background)`;
  resolved.colors.foreground = `var(--${prefix}-color-foreground)`;
};

/**
 * Resolves theme configuration into CSS variables and utilities
 * @param themes - Theme configurations
 * @param defaultTheme - Default theme name
 * @param prefix - CSS variable prefix
 * @param globalLayout - Global layout configuration
 * @returns Resolved configuration object
 */
const resolveConfig = (
  themes: Record<string, ThemeData> = {},
  defaultTheme: string,
  prefix: string,
  globalLayout: Record<string, string | number> = {},
): ResolvedConfig => {
  // Input validation
  if (!themes || typeof themes !== "object") {
    throw new Error("Themes must be a valid object");
  }

  if (!defaultTheme || typeof defaultTheme !== "string") {
    throw new Error("Default theme must be a valid string");
  }

  if (!isValidThemeName(defaultTheme)) {
    throw new Error(`Invalid default theme name: ${defaultTheme}`);
  }

  const resolved: ResolvedConfig = {
    variants: [],
    utilities: {},
    colors: {},
    baseStyles: {},
  };

  try {
    for (const [themeName, themeConfig] of Object.entries(themes)) {
      // Validate theme name
      if (!isValidThemeName(themeName)) {
        console.warn(`Invalid theme name '${themeName}', skipping`);
        continue;
      }

      if (!themeConfig || typeof themeConfig !== "object") {
        console.warn(`Invalid theme config for '${themeName}', skipping`);
        continue;
      }

      const cssSelector = generateCssSelector(themeName);
      const scheme = themeName === "light" || themeName === "dark" ? themeName : "light";
      const baseSelector = themeName === defaultTheme ? `:root, [data-theme=${themeName}]` : "";

      // Initialize base styles
      if (baseSelector) {
        resolved.baseStyles[baseSelector] = {"color-scheme": scheme};
      }
      resolved.utilities[cssSelector] = {"color-scheme": scheme};

      // Add theme variant
      resolved.variants.push({
        name: themeName,
        definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
      });

      // Process colors
      const baseColors = themeName === "dark" ? darkColorTokens : colorTokens;
      const mergedColors = themeConfig.colors
        ? Object.keys(baseColors).reduce((acc, colorName) => {
            const colorKey = colorName as keyof ColorTokens;
            acc[colorKey] = {
              ...baseColors[colorKey],
              ...(themeConfig.colors?.[colorKey] || {}),
            };
            return acc;
          }, {} as ColorTokens)
        : baseColors;

      processColorTokens(mergedColors, prefix, cssSelector, baseSelector, resolved);

      // Process layout
      const baseLayout = themeName === "dark" ? darkLayout : lightLayout;
      const mergedLayout = {...globalLayout, ...baseLayout, ...themeConfig.layout};
      processLayoutTokens(mergedLayout, prefix, cssSelector, baseSelector, resolved);

      // Add semantic colors
      const semanticVars = generateSemanticColors(prefix, themeName === "dark");
      Object.assign(resolved.utilities[cssSelector], semanticVars);
      if (baseSelector) {
        Object.assign(resolved.baseStyles[baseSelector], semanticVars);
      }
    }

    generateTailwindColors(prefix, resolved);
    return resolved;
  } catch (error) {
    console.error("Error resolving theme config:", error);
    throw new Error(
      `Failed to resolve theme configuration: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

/**
 * Creates the core Tailwind CSS plugin for IdeasUI themes
 * @param themes - Theme configurations
 * @param defaultTheme - Default theme name
 * @param prefix - CSS variable prefix
 * @param disableAnimations - Whether to disable animations
 * @param globalLayout - Global layout configuration
 * @returns Tailwind CSS plugin configuration
 */
const corePlugin = (
  themes: Record<string, ThemeData> = {},
  defaultTheme: string,
  prefix: string,
  disableAnimations: boolean,
  globalLayout: Record<string, string | number> = {},
) => {
  try {
    const resolved = resolveConfig(themes, defaultTheme, prefix, globalLayout);

    return {
      handler: ({addBase, addUtilities, addVariant}: PluginAPI) => {
        try {
          addBase(resolved.baseStyles);
          addUtilities(resolved.utilities);

          resolved.variants.forEach((variant) => {
            addVariant(variant.name, variant.definition);
          });

          if (disableAnimations) {
            addBase({
              "*, *::before, *::after": {
                "animation-duration": "0.01ms !important",
                "animation-iteration-count": "1 !important",
                "transition-duration": "0.01ms !important",
              },
            });
          }
        } catch (error) {
          console.error("Error applying theme plugin:", error);
        }
      },
      config: {
        theme: {
          extend: {
            colors: resolved.colors,
            spacing: systemTokens.spacing,
            borderRadius: {
              ...systemTokens.borderRadius,
              small: `var(--${prefix}-radius-small)`,
              medium: `var(--${prefix}-radius-medium)`,
              large: `var(--${prefix}-radius-large)`,
            },
            fontSize: systemTokens.fontSize,
            boxShadow: {
              ...systemTokens.boxShadow,
              small: `var(--${prefix}-box-shadow-small)`,
              medium: `var(--${prefix}-box-shadow-medium)`,
              large: `var(--${prefix}-box-shadow-large)`,
            },
            borderWidth: {
              small: `var(--${prefix}-border-width-small)`,
              medium: `var(--${prefix}-border-width-medium)`,
              large: `var(--${prefix}-border-width-large)`,
            },
            opacity: {
              hover: `var(--${prefix}-hover-opacity)`,
              disabled: `var(--${prefix}-disabled-opacity)`,
            },
            animation: disableAnimations
              ? Object.fromEntries(Object.keys(systemTokens.animation).map((key) => [key, "none"]))
              : systemTokens.animation,
            keyframes: disableAnimations ? {} : systemTokens.keyframes,
            transitionDuration: systemTokens.transitionDuration,
            transitionTimingFunction: systemTokens.transitionTimingFunction,
          },
        },
      },
    };
  } catch (error) {
    console.error("Error creating core plugin:", error);
    throw error;
  }
};

/**
 * IdeasUI Tailwind CSS plugin for theme management
 *
 * @example
 * ```js
 * // tailwind.config.js
 * import { ideasUIPlugin } from '@ideasui/theme';
 *
 * export default {
 *   plugins: [
 *     ideasUIPlugin({
 *       themes: {
 *         custom: {
 *           colors: {
 *             primary: { 500: '#custom-color' }
 *           }
 *         }
 *       },
 *       defaultTheme: 'light',
 *       prefix: 'ui'
 *     })
 *   ]
 * }
 * ```
 *
 * @param config - Theme configuration options
 * @returns Tailwind CSS plugin
 */
export function ideasUIPlugin(config: ThemeConfig = {}): any {
  try {
    const {
      themes = {},
      defaultTheme = "light",
      prefix = DEFAULT_PREFIX,
      disableAnimations = false,
      layout: globalLayout = {},
    } = config;

    // Validate configuration
    if (!themes || typeof themes !== "object") {
      throw new Error("Invalid themes configuration");
    }

    if (!isValidThemeName(defaultTheme)) {
      throw new Error(`Invalid default theme name: ${defaultTheme}`);
    }

    const defaultThemes = {
      light: {colors: colorTokens, layout: lightLayout},
      dark: {colors: darkColorTokens, layout: darkLayout},
      ...themes,
    };

    return corePlugin(defaultThemes, defaultTheme, prefix, disableAnimations, globalLayout);
  } catch (error) {
    console.error("Error initializing IdeasUI plugin:", error);
    throw error;
  }
}

export * from "./tokens/colors";
export * from "./tokens";
export * from "./system/types";
export * from "./recipes";
export * from "./tokens/design-tokens";
export {ideasUIPlugin as default};

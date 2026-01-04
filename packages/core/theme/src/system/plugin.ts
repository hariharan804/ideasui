import Color from "color";
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
import {darkLayout, lightLayout} from "../tokens/layout";
import {ThemeConfig, ColorTokens} from "./types";
import { flattenThemeObject, kebabCase, mapKeys, omit, escapeSelector } from "./utils";

const DEFAULT_PREFIX = "ideasui";

/* ------------------------------------------------------------
 * Types
 * ------------------------------------------------------------ */

type ConfigTheme = {
  extend?: "light" | "dark";
  layout?: Record<string, string | number>;
  colors?: Partial<ColorTokens>;
};

type ConfigThemes = Record<string, ConfigTheme>;



/* ------------------------------------------------------------
 * Resolution Logic
 * ------------------------------------------------------------ */

const parsedColorsCache: Record<string, number[]> = {};

/**
 * Resolves the final configuration by processing themes, colors, and layout.
 * It generates CSS variables for colors and layout options and prepares
 * the necessary Tailwind utilities and variants.
 *
 * @param themes - The object containing all theme configurations (light, dark, custom).
 * @param defaultTheme - The name of the default theme (usually "light").
 * @param prefix - The prefix to use for CSS variables (e.g., "ideasui").
 */
const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: string,
  prefix: string,
) => {
  const resolved: {
    variants: {name: string; definition: string[]}[];
    utilities: Record<string, Record<string, any>>;
    colors: Record<string, string>;
    baseStyles: Record<string, Record<string, any>>;
  } = {
    variants: [],
    utilities: {}, // CSS classes that apply changes (e.g., .dark { ... })
    colors: {},    // Color definitions for Tailwind config
    baseStyles: {}, // Root level styles (CSS variables)
  };

  for (const [themeName, {extend, layout, colors}] of Object.entries(themes)) {
    // Generate the CSS selector for the theme (e.g., .dark, .my-theme)
    let cssSelector = `.${escapeSelector(themeName)}`;
    
    // Determine the color scheme (light or dark) for system preference matching
    const scheme = themeName === "light" || themeName === "dark" ? themeName : extend;
    let baseSelector = "";

    // If this is the default theme, apply strict targeting (root & data attribute)
    if (themeName === defaultTheme) {
      baseSelector = `:root, [data-theme='${themeName}']`;
    }

    // Apply color-scheme property to base styles if applicable
    if (baseSelector) {
      resolved.baseStyles[baseSelector] = scheme ? {"color-scheme": scheme} : {};
    }

    // Apply color-scheme property to the theme utility class
    resolved.utilities[cssSelector] = scheme ? {"color-scheme": scheme} : {};

    // Flatten nested color objects and layout configurations
    const flatColors = flattenThemeObject(colors || {}) as Record<string, string>;
    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {};

    // 1. Setup Variants (e.g., enable usage like `dark:bg-red-500`)
    resolved.variants.push({
      name: themeName,
      definition: [`&.${escapeSelector(themeName)}`, `&[data-theme='${themeName}']`],
    });

    // 2. Process Colors
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) continue;

      try {
        let parsedComponents: number[] | string[];
        let cssFn: "hsl" | "oklch";

        // Check if the value is already an OKLCH string
        // format: "oklch(L C H)" or "oklch(L C H / A)"
        if (typeof colorValue === "string" && colorValue.startsWith("oklch(")) {
          const match = colorValue.match(/oklch\(([^)]+)\)/);
          if (match) {
            cssFn = "oklch";
            // Extract space-separated values
            parsedComponents = match[1].split("/")[0].trim().split(/\s+/);
          } else {
             // Fallback to HSL if regex fails
             cssFn = "hsl";
             parsedComponents = Color(colorValue).hsl().round(2).array();
          }
        } else {
          // Fallback: Convert Hex, RGB, RGBA, etc. to HSL
          // The 'color' library handles parsing of all standard formats
          cssFn = "hsl";
          parsedComponents = Color(colorValue).hsl().round(2).array();
        }

        // Cache isn't easily usable with mixed types, so skipping cache or would need complex key
        // keeping it simple for now

        const [c1, c2, c3, defaultAlphaValue] = parsedComponents;
        const colorVar = `--${prefix}-${colorName}`;

        // Add the CSS variable definition
        // For HSL: h s% l%
        // For OKLCH: l c h
        const val1 = cssFn === "hsl" ? c1 : c1;
        const val2 = cssFn === "hsl" ? `${c2}%` : c2;
        const val3 = cssFn === "hsl" ? `${c3}%` : c3;

        resolved.utilities[cssSelector]![colorVar] = `${val1} ${val2} ${val3}`;
        
        if (baseSelector) {
          resolved.baseStyles[baseSelector]![colorVar] = `${val1} ${val2} ${val3}`;
        }
        
        // Define the color reference for Tailwind
        resolved.colors[colorName] = `${cssFn}(var(${colorVar}) / ${
          defaultAlphaValue ?? "<alpha-value>"
        })`;
      } catch (error: any) {
         // Silently ignore invalid color values
         // console.warn("ideasUI: Invalid color value", colorName, colorValue);
      }
    }

    // 3. Process Layout Options (spacing, radius, etc.)
    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value) continue;

      const layoutVarPrefix = `--${prefix}-${key}`;
      
      if (typeof value === "object") { 
         for (const [nestedKey, nestedValue] of Object.entries(value)) {
           const nestedVar = `${layoutVarPrefix}-${nestedKey}`;
           resolved.utilities[cssSelector]![nestedVar] = nestedValue as string;
           if (baseSelector) resolved.baseStyles[baseSelector]![nestedVar] = nestedValue;
         }
      } else {
        const formattedValue =
          key.includes("opacity") && typeof value === "number"
            ? value.toString().replace(/^0\./, ".")
            : String(value);

        resolved.utilities[cssSelector]![layoutVarPrefix] = formattedValue;
        if (baseSelector) resolved.baseStyles[baseSelector]![layoutVarPrefix] = formattedValue;
      }
    }
  }

  return resolved;
};

/* ------------------------------------------------------------
 * Plugin
 * ------------------------------------------------------------ */

/**
 * The main IdeasUI Tailwind CSS plugin.
 * 
 * This plugin generates the necessary CSS variables, utilities, and
 * configuration extensions to enable the IdeasUI design system.
 */
export const ideasUIPlugin = (config: ThemeConfig = {}): ReturnType<typeof plugin> => {
  const {
    themes: themeObject = {},
    defaultTheme = "light",
    layout: userLayout = {},
    prefix = DEFAULT_PREFIX,
    disableAnimations = false,
  } = config;

  const userLightColors = themeObject?.light?.colors || {};
  const userDarkColors = themeObject?.dark?.colors || {};

  const defaultLayoutObj = userLayout && typeof userLayout === "object"
      ? deepMerge(lightLayout, userLayout)
      : lightLayout;

  const baseLayouts = {
    light: { ...defaultLayoutObj, ...lightLayout },
    dark: { ...defaultLayoutObj, ...darkLayout },
  };
  
  const lightTheme: ConfigTheme = {
      layout: deepMerge(baseLayouts.light, themeObject?.light?.layout || {}),
      colors: deepMerge(lightColorTokens, userLightColors as any),
  };
  
  const darkTheme: ConfigTheme = {
      layout: deepMerge(baseLayouts.dark, themeObject?.dark?.layout || {}),
      colors: deepMerge(darkColorTokens, userDarkColors as any),
  };

  const finalThemes: ConfigThemes = {
      light: lightTheme,
      dark: darkTheme,
      ...omit(themeObject, ["light", "dark"]) as ConfigThemes,
  };

  // Resolve all configuration options to CSS variables and utilities
  const resolved = resolveConfig(finalThemes, defaultTheme, prefix);

  return plugin(
    ({addBase, addUtilities, addVariant}) => {
      // Add root styles (CSS variables for the default theme)
      addBase(resolved.baseStyles);
      
      // Add theme-specific utilities (CSS variables for other themes)
      addUtilities({...resolved.utilities});
      
      // Register custom variants (e.g., `light:`, `dark:`, `my-theme:`)
      resolved.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
      
      // Optionally disable animations for testing or accessibility preferences
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
      // Extend Tailwind's default theme configuration
      theme: {
        extend: {
          colors: resolved.colors,
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
        }
      }
    }
  );
};

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
import {darkLayout, lightLayout, lightCommonColors, darkCommonColors} from "../tokens/layout";
import {ThemeConfig, ColorTokens} from "./types";
import {flattenThemeObject, kebabCase, mapKeys, omit, escapeSelector} from "./utils";

const DEFAULT_PREFIX = "ideasui";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type ConfigTheme = {
  extend?: "light" | "dark";
  layout?: Record<string, string | number>;
  colors?: Partial<ColorTokens>;
};

type ConfigThemes = Record<string, ConfigTheme>;

// ─────────────────────────────────────────────────────────────
// MD3 Semantic Token Configuration
// ─────────────────────────────────────────────────────────────

/**
 * Maps semantic token names to shade numbers.
 * Same mappings for both modes since dark shades are already inverted in colors.ts
 */
const SEMANTIC_TOKEN_MAP = {
  light: {
    DEFAULT: "500",
    on: "50",
    container: "100",
    onContainer: "900",
    subtle: "200",
    muted: "400",
    active: "700",
  },
  dark: {
    DEFAULT: "500",
    on: "50",
    container: "100",
    onContainer: "900",
    subtle: "200",
    muted: "400",
    active: "300",
  },
} as const;

/** Check if key is a numeric shade (50-950) */
const isNumericShade = (key: string): boolean =>
  /^(50|[1-9]50|100|200|300|400|500|600|700|800|900)$/.test(key);

/** Generates semantic CSS vars that reference shade vars */
function generateSemanticVars(
  colorName: string,
  prefix: string,
  mode: "light" | "dark",
): Record<string, string> {
  const mapping = SEMANTIC_TOKEN_MAP[mode];
  const result: Record<string, string> = {};

  for (const [semantic, shade] of Object.entries(mapping)) {
    const semanticVar = `--${prefix}-${colorName}-${semantic}`;
    const shadeVar = `--${prefix}-${colorName}-${shade}`;
    result[semanticVar] = `var(${shadeVar})`;
  }

  return result;
}

/** Extracts unique color names from flattened color object */
function getColorNames(flatColors: Record<string, string>): Set<string> {
  const colorNames = new Set<string>();
  for (const key of Object.keys(flatColors)) {
    const match = key.match(
      /^([a-z]+)-(\d+|DEFAULT|on|container|onContainer|subtle|muted|active)$/i,
    );
    if (match) {
      colorNames.add(match[1]);
    }
  }
  return colorNames;
}

/** Parses a color value and returns CSS function type and components */
function parseColorValue(
  colorValue: string,
): {cssFn: "hsl" | "oklch"; components: (string | number)[]} | null {
  try {
    if (colorValue.startsWith("oklch(")) {
      const match = colorValue.match(/oklch\(([^)]+)\)/);
      if (match) {
        return {
          cssFn: "oklch",
          components: match[1].split("/")[0].trim().split(/\s+/),
        };
      }
    }
    return {
      cssFn: "hsl",
      components: Color(colorValue).hsl().round(2).array(),
    };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Config Resolution
// ─────────────────────────────────────────────────────────────

const resolveConfig = (themes: ConfigThemes = {}, defaultTheme: string, prefix: string) => {
  const resolved: {
    variants: {name: string; definition: string[]}[];
    utilities: Record<string, Record<string, any>>;
    colors: Record<string, string>;
    baseStyles: Record<string, Record<string, any>>;
  } = {
    variants: [],
    utilities: {},
    colors: {},
    baseStyles: {},
  };

  for (const [themeName, {extend, layout, colors}] of Object.entries(themes)) {
    const cssSelector = `.${escapeSelector(themeName)}`;
    const scheme = themeName === "light" || themeName === "dark" ? themeName : extend;

    // Base selector: :root for default, class/data-attr for others
    const baseSelector =
      themeName === defaultTheme
        ? `:root, .${themeName}, [data-theme='${themeName}']`
        : `.${themeName}, [data-theme='${themeName}']`;

    resolved.baseStyles[baseSelector] = scheme ? {"color-scheme": scheme} : {};
    resolved.utilities[cssSelector] = scheme ? {"color-scheme": scheme} : {};

    const flatColors = flattenThemeObject(colors || {}) as Record<string, string>;
    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {};

    // Setup variants (dark:bg-red-500, etc.)
    resolved.variants.push({
      name: themeName,
      definition: [`&.${escapeSelector(themeName)}`, `&[data-theme='${themeName}']`],
    });

    const mode = themeName === "dark" || extend === "dark" ? "dark" : "light";
    const colorNamesSet = getColorNames(flatColors);

    // Helper to register a color variable
    const registerColor = (colorName: string, colorValue: string) => {
      const parsed = parseColorValue(colorValue);
      if (!parsed) return;

      const {cssFn, components} = parsed;
      const [c1, c2, c3, defaultAlphaValue] = components;
      const colorVar = `--${prefix}-${colorName}`;
      const val1 = cssFn === "hsl" ? c1 : c1;
      const val2 = cssFn === "hsl" ? `${c2}%` : c2;
      const val3 = cssFn === "hsl" ? `${c3}%` : c3;

      resolved.utilities[cssSelector]![colorVar] = `${val1} ${val2} ${val3}`;
      resolved.baseStyles[baseSelector]![colorVar] = `${val1} ${val2} ${val3}`;
      resolved.colors[colorName] =
        `${cssFn}(var(${colorVar}) / ${defaultAlphaValue ?? "<alpha-value>"})`;
    };

    // Process all colors
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) continue;

      // For shade-based colors (primary-500), only process numeric shades
      if (colorName.includes("-")) {
        const shade = colorName.split("-").pop() || "";
        if (!isNumericShade(shade)) continue;
      }

      registerColor(colorName, colorValue);
    }

    // Generate semantic tokens as CSS var references
    for (const colorBaseName of colorNamesSet) {
      const semanticVars = generateSemanticVars(colorBaseName, prefix, mode);

      for (const [varName, varValue] of Object.entries(semanticVars)) {
        resolved.utilities[cssSelector]![varName] = varValue;
        resolved.baseStyles[baseSelector]![varName] = varValue;

        // For DEFAULT: register as "primary" so bg-primary works
        const fullTokenName = varName.replace(`--${prefix}-`, "");
        const tokenName = fullTokenName.endsWith("-DEFAULT")
          ? fullTokenName.replace("-DEFAULT", "")
          : fullTokenName;

        resolved.colors[tokenName] = `oklch(var(${varName}) / <alpha-value>)`;
      }
    }

    // Process layout options
    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value) continue;

      const layoutVarPrefix = `--${prefix}-${key}`;

      if (typeof value === "object") {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedVar = `${layoutVarPrefix}-${nestedKey}`;
          resolved.utilities[cssSelector]![nestedVar] = nestedValue as string;
          resolved.baseStyles[baseSelector]![nestedVar] = nestedValue;
        }
      } else {
        const formattedValue =
          key.includes("opacity") && typeof value === "number"
            ? value.toString().replace(/^0\./, ".")
            : String(value);

        resolved.utilities[cssSelector]![layoutVarPrefix] = formattedValue;
        resolved.baseStyles[baseSelector]![layoutVarPrefix] = formattedValue;
      }
    }
  }

  return resolved;
};

// ─────────────────────────────────────────────────────────────
// Plugin Export
// ─────────────────────────────────────────────────────────────

/** IdeasUI Tailwind CSS plugin - generates CSS variables and utilities */
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

  const defaultLayoutObj =
    userLayout && typeof userLayout === "object" ? deepMerge(lightLayout, userLayout) : lightLayout;

  const baseLayouts = {
    light: {...defaultLayoutObj, ...lightLayout},
    dark: {...defaultLayoutObj, ...darkLayout},
  };

  const lightTheme: ConfigTheme = {
    layout: deepMerge(baseLayouts.light, themeObject?.light?.layout || {}),
    colors: deepMerge({...lightColorTokens, ...lightCommonColors}, userLightColors as any),
  };

  const darkTheme: ConfigTheme = {
    layout: deepMerge(baseLayouts.dark, themeObject?.dark?.layout || {}),
    colors: deepMerge({...darkColorTokens, ...darkCommonColors}, userDarkColors as any),
  };

  const finalThemes: ConfigThemes = {
    light: lightTheme,
    dark: darkTheme,
    ...(omit(themeObject, ["light", "dark"]) as ConfigThemes),
  };

  const resolved = resolveConfig(finalThemes, defaultTheme, prefix);

  return plugin(
    ({addBase, addUtilities, addVariant}) => {
      addBase(resolved.baseStyles);
      addUtilities({...resolved.utilities});
      resolved.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });

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
        },
      },
    },
  );
};

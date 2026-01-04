import plugin from "tailwindcss/plugin";
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
import {colorTokens, darkColorTokens} from "../tokens/colors";
import {darkLayout, lightLayout} from "../tokens/layout";
import {ColorTokens, ThemeConfig} from "./types";

const DEFAULT_PREFIX = "ideasui";

/* ------------------------------------------------------------
 * Utils
 * ------------------------------------------------------------ */

const toKebab = (v: string) => v.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const escapeSelector = (str: string) => {
  if (typeof CSS !== "undefined" && CSS.escape) {
    return CSS.escape(str);
  }
  return str.replace(/([^\w-])/g, "\\$1");
};

const themeSelector = (name: string) => `.theme-${escapeSelector(name)}, [data-theme="${name}"]`;

/* ------------------------------------------------------------
 * CSS Variable Generators
 * ------------------------------------------------------------ */

function generateColorVars(colors: ColorTokens, prefix: string): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [color, shades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(shades)) {
      vars[`--${prefix}-color-${color}-${shade}`] = value;
    }
  }

  return vars;
}

function generateLayoutVars(layout: Record<string, string | number>, prefix: string) {
  return Object.fromEntries(
    Object.entries(layout).map(([k, v]) => [`--${prefix}-${toKebab(k)}`, String(v)]),
  );
}

/* ------------------------------------------------------------
 * Plugin
 * ------------------------------------------------------------ */

export const ideasUIPlugin = plugin.withOptions<ThemeConfig>(
  (options = {}) => {
    const {
      themes = {},
      defaultTheme = "light",
      prefix = DEFAULT_PREFIX,
      disableAnimations = false,
      layout: globalLayout = {},
    } = options;

    const resolvedThemes = {
      light: {colors: colorTokens, layout: lightLayout},
      dark: {colors: darkColorTokens, layout: darkLayout},
      ...themes,
    };

    return ({addBase}) => {
      /* ---------- Base (default theme) ---------- */
      const baseTheme = resolvedThemes[defaultTheme];

      addBase({
        ":root": {
          "color-scheme": defaultTheme,
          ...generateColorVars(baseTheme.colors, prefix),
          ...generateLayoutVars({...globalLayout, ...baseTheme.layout}, prefix),
        },
      });

      /* ---------- Theme scopes ---------- */
      for (const [name, cfg] of Object.entries(resolvedThemes)) {
        addBase({
          [themeSelector(name)]: {
            "color-scheme": name === "dark" ? "dark" : "light",
            ...generateColorVars(cfg.colors, prefix),
            ...generateLayoutVars({...globalLayout, ...cfg.layout}, prefix),
          },
        });
      }

      /* ---------- Reduced motion ---------- */
      if (disableAnimations) {
        addBase({
          "*,*::before,*::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
        });
      }
    };
  },

  /* ------------------------------------------------------------
   * Tailwind theme extension
   * ------------------------------------------------------------ */
  (options = {}) => {
    const prefix = options.prefix ?? DEFAULT_PREFIX;

    return {
      theme: {
        extend: {
          colors: Object.fromEntries(
            Object.keys(colorTokens).flatMap((color) => [
              [color, `var(--${prefix}-color-${color}-500)`],
              ...Object.keys(colorTokens[color as keyof ColorTokens]).map((shade) => [
                `${color}-${shade}`,
                `var(--${prefix}-color-${color}-${shade})`,
              ]),
            ]),
          ),
          spacing,
          borderRadius: {
            ...borderRadius,
            sm: `var(--${prefix}-radius-small)`,
            md: `var(--${prefix}-radius-medium)`,
            lg: `var(--${prefix}-radius-large)`,
          },
          fontSize,
          boxShadow: {
            ...boxShadow,
            sm: `var(--${prefix}-box-shadow-small)`,
            md: `var(--${prefix}-box-shadow-medium)`,
            lg: `var(--${prefix}-box-shadow-large)`,
          },
          animation: options.disableAnimations
            ? Object.fromEntries(Object.keys(animation).map((k) => [k, "none"]))
            : animation,
          keyframes: options.disableAnimations ? {} : keyframes,
          transitionDuration,
          transitionTimingFunction,
        },
      },
    };
  },
);

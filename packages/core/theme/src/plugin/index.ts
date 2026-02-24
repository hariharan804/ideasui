import type { ThemeConfig } from '../types';

import plugin from 'tailwindcss/plugin';

import { DEFAULT_PREFIX } from '../constants';
import { disabled, scrollbar } from '../tokens';

import { buildThemes, resolveConfig, createThemeExtension, createThemeSelectors } from './core';
import { generateDesignTokenCSSVars, generateDarkDesignTokenCSSVars } from './css-vars';

// ─────────────────────────────────────────────────────────────
// Utility Class Generators
// ─────────────────────────────────────────────────────────────

function createClassUtilities(): Record<string, Record<string, string | {}>> {
  return {
    '.disabled-state': {
      [`@apply ${disabled.default}`]: {},
    },
    '.scrollbar-none': {
      [`@apply ${scrollbar.none.replace('scrollbar-none ', '')}`]: {},
    },
    '.scrollbar-default': {
      [`@apply ${scrollbar.default}`]: {},
    },
    '.scrollbar-thin': {
      [`@apply ${scrollbar.thin}`]: {},
    },
  };
}

/**
 * IdeasUI Tailwind CSS plugin - generates CSS variables and utilities
 * @param {ThemeConfig} [config] - The plugin configuration object
 * @returns {ReturnType<typeof plugin>} The properly configured Tailwind plugin
 */
export const ideasUIPlugin: ReturnType<typeof plugin.withOptions<ThemeConfig>> =
  plugin.withOptions<ThemeConfig>(
    (config: ThemeConfig = {}) =>
      ({ addBase, addVariant, addUtilities }) => {
        const {
          defaultTheme = 'light',
          prefix = DEFAULT_PREFIX,
          disableAnimations = false,
        } = config;

        const themes = buildThemes(config);
        const resolved = resolveConfig(themes, defaultTheme, prefix);

        // Note: Layers are handled natively in Tailwind v4 via CSS @layer directive

        // Generate CSS custom properties from design tokens
        const designTokenVars = generateDesignTokenCSSVars(prefix);

        addBase({
          ':root': designTokenVars,
        });

        // Generate dark mode overrides
        const darkTokenVars = generateDarkDesignTokenCSSVars(prefix);
        const { baseSelector: darkSelector } = createThemeSelectors('dark', defaultTheme);

        addBase({
          [darkSelector]: darkTokenVars,
        });

        addBase(resolved.baseStyles);
        addBase({ ...resolved.utilities });

        for (const variant of resolved.variants) {
          addVariant(variant.name, variant.definition);
        }

        // Add custom aggregate utility classes
        addUtilities(createClassUtilities());

        if (disableAnimations) {
          addBase({
            '*,*::before,*::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
            },
          });
        }
      },
    (config: ThemeConfig = {}) => {
      const {
        defaultTheme = 'light',
        prefix = DEFAULT_PREFIX,
        disableAnimations = false,
        designTokens,
      } = config;
      const themes = buildThemes(config);
      const resolved = resolveConfig(themes, defaultTheme, prefix);

      return {
        theme: {
          extend: createThemeExtension(resolved.colors, prefix, disableAnimations, designTokens),
        },
      };
    },
  );

export default ideasUIPlugin;

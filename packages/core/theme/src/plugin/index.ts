import type { ThemeConfig } from '../types';

import plugin from 'tailwindcss/plugin';

/**
 * Prefix for all CSS variables
 * @default 'ideasui'
 */
export const DEFAULT_PREFIX = 'ideasui';
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
export const createIdeasUIPlugin: ReturnType<typeof plugin.withOptions<ThemeConfig>> =
  plugin.withOptions<ThemeConfig>(
    (config: ThemeConfig = {}) =>
      ({ addBase, addVariant, addUtilities }) => {
        const {
          defaultTheme = 'light',
          // prefix = DEFAULT_PREFIX,
          disableAnimations = false,
        } = config;
        const prefix = DEFAULT_PREFIX;
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
        // prefix = DEFAULT_PREFIX,
        disableAnimations = false,
      } = config;
      const prefix = DEFAULT_PREFIX;

      const themes = buildThemes(config);
      const resolved = resolveConfig(themes, defaultTheme, prefix);

      const { designTokens: configDesignTokens = {}, semanticTokens: configSemanticTokens = {} } =
        config;

      // Aggregate all design tokens and semantic tokens from all themes
      // to ensure they are available to Tailwind globally
      let aggregatedDesignTokens = configDesignTokens;
      let aggregatedSemanticTokens = configSemanticTokens;

      Object.values(config.themes || {}).forEach((theme) => {
        if (theme?.designTokens) {
          aggregatedDesignTokens = {
            ...aggregatedDesignTokens,
            ...Object.fromEntries(
              Object.entries(theme.designTokens).map(([key, value]) => [
                key,
                {
                  ...(aggregatedDesignTokens[key as keyof typeof aggregatedDesignTokens] || {}),
                  ...value,
                },
              ]),
            ),
          };
        }
        if (theme?.semanticTokens) {
          aggregatedSemanticTokens = {
            ...aggregatedSemanticTokens,
            ...Object.fromEntries(
              Object.entries(theme.semanticTokens).map(([key, value]) => [
                key,
                {
                  ...(aggregatedSemanticTokens[key as keyof typeof aggregatedSemanticTokens] || {}),
                  ...value,
                },
              ]),
            ),
          };
        }
      });

      return {
        theme: {
          extend: createThemeExtension(
            resolved.colors,
            prefix,
            disableAnimations,
            aggregatedDesignTokens,
            aggregatedSemanticTokens,
          ),
        },
      };
    },
  );

/**
 * Typed wrapper around `ideasUIPlugin` — use this in JavaScript projects
 * to get full TypeScript/IntelliSense suggestions on the config object.
 *
 * @example
 * // tailwind.config.js
 * const { createIdeasUIPlugin } = require('@ideasui/theme/plugin');
 * module.exports = { plugins: [createIdeasUIPlugin({ defaultTheme: 'dark' })] };
 *
 * @param {ThemeConfig} [config] - Plugin configuration
 */
export function ideasUIPlugin(config?: ThemeConfig): ReturnType<typeof createIdeasUIPlugin> {
  return createIdeasUIPlugin(config);
}

export default ideasUIPlugin;

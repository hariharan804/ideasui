import type { ThemeConfig } from '../types';

import plugin from 'tailwindcss/plugin';

import { DEFAULT_PREFIX } from '../constants';

import { buildThemes, resolveConfig, createThemeExtension } from './core';
import { generateDesignTokenCSSVars } from './css-vars';

// ─────────────────────────────────────────────────────────────
// Plugin Export
// ─────────────────────────────────────────────────────────────

/**
 * IdeasUI Tailwind CSS plugin - generates CSS variables and utilities
 * @param {ThemeConfig} [config] - The plugin configuration object
 * @returns {ReturnType<typeof plugin>} The properly configured Tailwind plugin
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ideasUIPlugin: any = plugin.withOptions(
  (config: ThemeConfig = {}) =>
    ({ addBase, addUtilities, addVariant }) => {
      const { defaultTheme = 'light', prefix = DEFAULT_PREFIX, disableAnimations = false } = config;

      const themes = buildThemes(config);
      const resolved = resolveConfig(themes, defaultTheme, prefix);

      // Add CSS Layers for better cascade control
      addBase({
        '@layer base, components, utilities': {},
      });

      // Generate CSS custom properties from design tokens
      const designTokenVars = generateDesignTokenCSSVars(prefix);

      addBase({
        ':root': designTokenVars,
      });

      addBase(resolved.baseStyles);
      addUtilities({ ...resolved.utilities });

      for (const variant of resolved.variants) {
        const definitions = Array.isArray(variant.definition)
          ? variant.definition
          : [variant.definition];

        for (const definition of definitions) {
          addVariant(variant.name, definition);
        }
      }

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
    const { defaultTheme = 'light', prefix = DEFAULT_PREFIX, disableAnimations = false } = config;
    const themes = buildThemes(config);
    const resolved = resolveConfig(themes, defaultTheme, prefix);

    return {
      theme: {
        extend: createThemeExtension(resolved.colors, prefix, disableAnimations),
      },
    };
  },
);

export default ideasUIPlugin;

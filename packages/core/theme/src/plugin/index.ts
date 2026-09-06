import type { ThemeConfig } from '../types';

import plugin from 'tailwindcss/plugin';

import { buildThemes, resolveConfig, createThemeExtension } from './core';

/**
 * Prefix for all CSS variables emitted by ideasUI.
 * @default 'ideasui'
 */
export const DEFAULT_PREFIX = 'ideasui';

/**
 * IdeasUI Tailwind CSS plugin.
 *
 * Responsibilities:
 *  - Register theme selectors (`:root`, `.dark`, `[data-theme="*"]`) as Tailwind variants.
 *  - Inject user-provided color / token overrides as CSS custom properties.
 *  - Extend the Tailwind theme so utilities like `bg-primary` / `text-content-primary` resolve
 *    to the correct `var(--ideasui-*)` values.
 *
 * Static base variables (`:root`, `.dark`) are defined in `variables.css` and are NOT
 * re-emitted here unless the consumer provides explicit runtime overrides.
 *
 * @param {ThemeConfig} [config] - Optional plugin configuration
 */
export const createIdeasUIPlugin: ReturnType<typeof plugin.withOptions<ThemeConfig>> =
  plugin.withOptions<ThemeConfig>(
    // ── Side-effect factory: addBase / addVariant ─────────────────────────────
    (config: ThemeConfig = {}) =>
      ({ addBase, addVariant }) => {
        const { defaultTheme = 'light', disableAnimations = false } = config;
        const prefix = DEFAULT_PREFIX;
        const themes = buildThemes(config);
        const resolved = resolveConfig(themes, defaultTheme, prefix);

        // Only emit color/token CSS variables when the consumer provides overrides.
        // Static defaults are already provided by `variables.css` via @import.
        if (Object.keys(resolved.utilities).length > 0) {
          addBase(resolved.baseStyles);
          addBase({ ...resolved.utilities });
        }

        // Register theme variants (.dark, [data-theme="*"], etc.)
        for (const variant of resolved.variants) {
          addVariant(variant.name, variant.definition);
        }

        // Suppress motion for users who prefer reduced motion or for testing.
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

    // ── Theme extension factory: exposes Tailwind color/spacing/etc. keys ────
    (config: ThemeConfig = {}) => {
      const { defaultTheme = 'light', disableAnimations = false } = config;
      const prefix = DEFAULT_PREFIX;

      const themes = buildThemes(config);
      const resolved = resolveConfig(themes, defaultTheme, prefix);

      const { designTokens: configDesignTokens = {}, semanticTokens: configSemanticTokens = {} } =
        config;

      // Merge per-theme token overrides so all keys are visible to Tailwind's JIT.
      let aggregatedDesignTokens = configDesignTokens;
      let aggregatedSemanticTokens = configSemanticTokens;

      for (const theme of Object.values(config.themes || {})) {
        if (theme?.designTokens) {
          aggregatedDesignTokens = {
            ...aggregatedDesignTokens,
            ...Object.fromEntries(
              Object.entries(theme.designTokens).map(([key, value]) => [
                key,
                {
                  ...aggregatedDesignTokens[key as keyof typeof aggregatedDesignTokens],
                  ...value,
                },
              ]),
            ),
          };
        }

        if (theme?.semanticTokens) {
          const merged: typeof aggregatedSemanticTokens = { ...aggregatedSemanticTokens };

          for (const [key, value] of Object.entries(theme.semanticTokens)) {
            if (typeof value === 'string') {
              merged[key as keyof typeof merged] = value;
            }
          }

          aggregatedSemanticTokens = merged;
        }
      }

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
 * Convenience wrapper around `createIdeasUIPlugin`.
 * Use this in your `tailwind.config.ts` plugins array.
 *
 * @example
 * ```ts
 * import { ideasUIPlugin } from '@ideasui/theme/plugin';
 * export default { plugins: [ideasUIPlugin()] };
 * ```
 */
export function ideasUIPlugin(config?: ThemeConfig): ReturnType<typeof createIdeasUIPlugin> {
  return createIdeasUIPlugin(config);
}

export default ideasUIPlugin;

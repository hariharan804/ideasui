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
          const merged: typeof aggregatedSemanticTokens = { ...aggregatedSemanticTokens };

          Object.entries(theme.semanticTokens).forEach(([key, value]) => {
            if (typeof value === 'string') {
              merged[key as keyof typeof merged] = value;
            }
          });

          aggregatedSemanticTokens = merged;
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
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              ideasUI Plugin — Consumer Config                ║
 * ║                                                              ║
 * ║  Customize using either:                                     ║
 * ║    • var(--ideasui-color-primary-500)  ← token reference     ║
 * ║    • oklch(0.55 0.22 268.4)           ← raw OKLCH value      ║
 * ║    • #3b82f6  or  rgb(59 130 246)     ← also accepted        ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * @example
 * ```ts
 * ideasUIPlugin({
 *   // ─────────────────────────────────────────────────────────────
 *   // DEFAULT THEME
 *   // Which theme is active on first load.
 *   // Options: 'light' | 'dark' | any key you add under `themes`
 *   // ─────────────────────────────────────────────────────────────
 *   defaultTheme: 'light',
 *
 *   // ─────────────────────────────────────────────────────────────
 *   // GLOBAL DESIGN TOKENS
 *   // Applied to ALL themes. Override per-theme inside `themes.X.designTokens`.
 *   // ─────────────────────────────────────────────────────────────
 *   designTokens: {
 *     spacing:      { section: '2.5rem' },
 *     borderRadius: { sm: '4px', md: '6px', lg: '12px', full: '9999px' },
 *     duration:     { fast: '100ms', normal: '200ms', slow: '300ms' },
 *     easing: {
 *       standard:   'cubic-bezier(0.4, 0, 0.2, 1)',
 *       decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
 *       accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
 *       spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)',
 *     },
 *     shadow: {
 *       xs: '0 1px 2px rgb(0 0 0 / 0.05)',
 *       sm: '0 2px 4px rgb(0 0 0 / 0.06), 0 1px 2px rgb(0 0 0 / 0.04)',
 *       md: '0 4px 8px rgb(0 0 0 / 0.08), 0 2px 4px rgb(0 0 0 / 0.05)',
 *       lg: '0 8px 16px rgb(0 0 0 / 0.10), 0 4px 6px rgb(0 0 0 / 0.05)',
 *     },
 *     zIndex: {
 *       hide: -1, base: 0, raised: 1, sticky: 100, fixed: 200,
 *       dropdown: 1000, overlay: 1100, modal: 1200,
 *       popover: 1300, toast: 1400, tooltip: 1500,
 *     },
 *   },
 *
 *   // ─────────────────────────────────────────────────────────────
 *   // THEMES
 *   // Each key is a theme name. Toggle with data-ideasui-theme="dark"
 *   // or programmatically via the theme switcher utility.
 *   // ─────────────────────────────────────────────────────────────
 *   themes: {
 *
 *     // ───────────────────────────────────────
 *     // LIGHT THEME
 *     // ───────────────────────────────────────
 *     light: {
 *       // ── PRIMITIVE COLOR SCALES ──────────
 *       // Raw OKLCH stops. These are the source of truth.
 *       // Semantic tokens reference these via var(--ideasui-color-*-500) etc.
 *       colors: {
 *         primary: {
 *           50:  'oklch(0.970 0.022 268.4)',
 *           100: 'oklch(0.887 0.040 268.4)',
 *           200: 'oklch(0.804 0.077 268.4)',
 *           300: 'oklch(0.691 0.121 268.4)',
 *           400: 'oklch(0.576 0.174 268.4)',  // WCAG AA ✓ vs white
 *           500: 'oklch(0.555 0.220 268.4)',  // Main brand color
 *           600: 'oklch(0.472 0.209 268.4)',
 *           700: 'oklch(0.389 0.187 268.4)',
 *           800: 'oklch(0.306 0.158 268.4)',
 *           900: 'oklch(0.223 0.121 268.4)',
 *           950: 'oklch(0.140 0.088 268.4)',
 *         },
 *         secondary: { ... },  // Same scale shape
 *         success:   { ... },
 *         warning:   { ... },
 *         error:     { ... },
 *         info:      { ... },
 *         neutral:   { ... },
 *       },
 *
 *       // ── SEMANTIC TOKENS ─────────────────
 *       // Map intent names to primitive stops.
 *       //
 *       // Pattern:
 *       //   [intent]            → filled bg    (stop-500)
 *       //   on-[intent]         → fg on filled (stop-50)
 *       //   [intent]-subtle     → lightest tint (stop-50)
 *       //   on-[intent]-subtle  → fg on subtle  (stop-800)
 *       //   [intent]-muted      → medium tint   (stop-100)
 *       //   on-[intent]-muted   → fg on muted   (stop-700)
 *       semanticTokens: {
 *         primary:             'var(--ideasui-color-primary-500)',
 *         'on-primary':        'var(--ideasui-color-primary-50)',
 *         'primary-subtle':    'var(--ideasui-color-primary-50)',
 *         'on-primary-subtle': 'var(--ideasui-color-primary-800)',
 *         'primary-muted':     'var(--ideasui-color-primary-100)',
 *         'on-primary-muted':  'var(--ideasui-color-primary-700)',
 *
 *         // Surface — elevation layers
 *         surface:             'var(--ideasui-color-neutral-50)',
 *         'on-surface':        'var(--ideasui-color-neutral-900)',
 *         'surface-sunken':    'var(--ideasui-color-neutral-100)',
 *         'surface-muted':     'var(--ideasui-color-neutral-100)',
 *         'surface-strong':    'var(--ideasui-color-neutral-200)',
 *         'surface-floating':  'oklch(1 0 0)',
 *         'surface-modal':     'oklch(1 0 0)',
 *
 *         // Content — text emphasis hierarchy
 *         'content-primary':   'var(--ideasui-color-neutral-900)',
 *         'content-secondary': 'var(--ideasui-color-neutral-700)',
 *         'content-tertiary':  'var(--ideasui-color-neutral-600)',
 *         'content-disabled':  'var(--ideasui-color-neutral-400)',
 *
 *         // Border
 *         border:              'var(--ideasui-color-neutral-200)',
 *         'border-subtle':     'var(--ideasui-color-neutral-100)',
 *         'border-strong':     'var(--ideasui-color-neutral-300)',
 *         'border-focus':      'var(--ideasui-color-primary-500)',
 *         'border-error':      'var(--ideasui-color-error-500)',
 *
 *         // Scrim
 *         scrim:               'oklch(0 0 0 / 0.45)',
 *       },
 *
 *       // ── COMPONENT OVERRIDES ─────────────
 *       components: {
 *         button: {
 *           base: {
 *             borderRadius: 'var(--ideasui-radius-md)',
 *             fontWeight:   '500',
 *           },
 *           variants: {
 *             solid:   { backgroundColor: 'var(--ideasui-color-primary)' },
 *             muted:   { backgroundColor: 'var(--ideasui-color-primary-muted)' },
 *             outline: { borderColor: 'var(--ideasui-color-primary)' },
 *             ghost:   { color: 'var(--ideasui-color-primary)' },
 *           },
 *         },
 *       },
 *
 *       // ── THEME-LEVEL DESIGN TOKEN OVERRIDES
 *       designTokens: {
 *         spacing: { section: '2rem' },
 *       },
 *     },
 *
 *     // ───────────────────────────────────────
 *     // DARK THEME
 *     // Only overrides what changes. Everything else inherits from light.
 *     // ───────────────────────────────────────
 *     dark: {
 *       colors: {
 *         primary: {
 *           50:  'oklch(0.140 0.022 268.4)',
 *           500: 'oklch(0.669 0.220 268.4)',
 *           950: 'oklch(0.970 0.088 268.4)',
 *         },
 *       },
 *       semanticTokens: {
 *         'surface-sunken':  'oklch(0 0 0)',
 *         'surface-floating': 'oklch(0 0 0)',
 *         scrim:              'oklch(0 0 0 / 0.60)',
 *       },
 *       designTokens: {
 *         shadow: {
 *           sm: '0 2px 4px rgb(0 0 0 / 0.15), 0 1px 2px rgb(0 0 0 / 0.10)',
 *         },
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * @param {ThemeConfig} [config] - Plugin configuration
 */
export function ideasUIPlugin(config?: ThemeConfig): ReturnType<typeof createIdeasUIPlugin> {
  return createIdeasUIPlugin(config);
}

export default ideasUIPlugin;

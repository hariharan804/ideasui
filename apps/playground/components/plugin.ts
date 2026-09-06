import type { Config } from 'tailwindcss';

import { ideasUIPlugin } from '@ideasui/theme/plugin';

export default ideasUIPlugin({
  defaultTheme: 'light',

  // 1. Global Design Tokens
  designTokens: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'Fira Code, monospace',
    },
    borderRadius: {
      brand: '0.75rem',
    },
  },

  // 2. Global Semantic Tokens
  semanticTokens: {
    content: {
      brand: 'var(--ideasui-color-primary)',
    },
  },
  // 3. Themes
  themes: {
    light: {
      colors: {
        primary: 'oklch(0.55 0.22 250)',
        'on-primary': 'oklch(0.99 0 0)',
        'primary-subtle': 'oklch(0.94 0.05 250)',
        'on-primary-subtle': 'oklch(0.35 0.18 250)',

        secondary: 'oklch(0.65 0.20 160)',
        'on-secondary': 'oklch(0.99 0 0)',

        surface: 'oklch(0.99 0.005 250)',
        'surface-subtle': 'oklch(0.96 0.01 250)',
        'surface-muted': 'oklch(0.92 0.02 250)',
      },
      components: {
        button: {
          base: {
            borderRadius: 'var(--ideasui-radius-brand)',
          },
        },
      },
    },

    dark: {
      colors: {
        primary: 'oklch(0.68 0.20 250)',
        'on-primary': 'oklch(0.12 0.05 250)',
        'primary-subtle': 'oklch(0.22 0.08 250)',
        'on-primary-subtle': 'oklch(0.85 0.12 250)',

        secondary: 'oklch(0.72 0.18 160)',
        'on-secondary': 'oklch(0.12 0.05 160)',

        surface: 'oklch(0.16 0.02 250)',
        'surface-subtle': 'oklch(0.20 0.02 250)',
        'surface-muted': 'oklch(0.25 0.03 250)',
      },
      components: {
        button: {
          base: {
            borderRadius: 'var(--ideasui-radius-brand)',
          },
        },
      },
    },
  },
}) as unknown as Config;

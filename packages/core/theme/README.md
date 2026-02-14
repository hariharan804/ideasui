# @ideasui/theme

OKLCH-based theme system for IdeasUI with tailwind-variants recipes, color generation, and design tokens.

## 📦 Installation

```bash
npm install @ideasui/theme tailwindcss tailwind-variants
# or
pnpm add @ideasui/theme tailwindcss tailwind-variants
# or
yarn add @ideasui/theme tailwindcss tailwind-variants
```

## 🚀 Quick Start

### 1. Configure Tailwind CSS

```js
// tailwind.config.js
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [ideasUIPlugin()],
};
```

### 2. Add ThemeScript (for SSR/SSG)

```tsx
// app/layout.tsx (Next.js) or index.html
import { ThemeScript } from '@ideasui/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="system" storageKey="app-theme" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Wrap Your App with ThemeProvider

```tsx
// app/providers.tsx (or your root component)
'use client'; // For Next.js App Router

import { ThemeProvider } from '@ideasui/theme';

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      {children}
    </ThemeProvider>
  );
}
```

### 4. Use the Theme

```tsx
import { useTheme } from '@ideasui/theme';

function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

## 🎨 Theme Provider API

### ThemeProvider Props

```tsx
interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: 'class' | 'data-theme'; // Default: 'class'
  defaultTheme?: string; // Default: 'system'
  storageKey?: string; // Default: 'theme'
  themes?: string[]; // Default: ['light', 'dark']
  systemThemes?: { light: string; dark: string }; // Default: { light: 'light', dark: 'dark' }
  storage?: 'local' | 'session'; // Default: 'local'
  mode?: 'class' | 'attribute'; // Default: 'class'
}
```

### useTheme Hook

```tsx
const { theme, setTheme, resolved, themes, isDark } = useTheme();

// theme: Current theme ('light', 'dark', 'system', or custom)
// setTheme: Function to change the theme
// resolved: Resolved theme (actual theme applied, never 'system')
// themes: Available themes
// isDark: Boolean indicating if current theme is dark
```

## 🔌 Tailwind Plugin

User's tailwind.config.ts
│
▼
index.ts (plugin entry)
│
├──► core.ts
│ ├── buildThemes() → merges default + user tokens
│ ├── resolveConfig() → generates CSS per theme
│ │ ├── colors.ts → processes color tokens
│ │ └── layout.ts → processes layout tokens
│ └── createThemeExtension() → extends Tailwind config
│
└──► css-vars.ts
└── generateDesignTokenCSSVars() → static tokens → CSS vars on :root

### Basic Usage

```js
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  plugins: [ideasUIPlugin()],
};
```

### Custom Configuration

```js
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  plugins: [
    ideasUIPlugin({
      prefix: 'ideasui',
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: {
              50: 'oklch(0.950 0.020 300.0)',
              // ... custom colors
            },
          },
        },
      },
    }),
  ],
};
```

## 📦 Component Recipes

### Using Recipes

```tsx
import { button } from '@ideasui/theme/recipes';
import type { VariantProps } from 'tailwind-variants';

// Use recipe in component
const { base, icon, label } = button({
  variant: 'solid',
  color: 'primary',
  size: 'md',
});

// With TypeScript
type ButtonProps = VariantProps<typeof button>;
```

### Color Tokens

```tsx
import { colorTokens, darkColorTokens } from '@ideasui/theme/tokens';

// Access color values
const primaryColor = colorTokens.primary[500]; // 'oklch(0.543 0.284 300.0)'
const darkPrimary = darkColorTokens.primary[500]; // 'oklch(0.720 0.242 300.0)'
```

### Design Constants

```tsx
import { RADIUS_VARIANTS, COLOR_VARIANTS } from '@ideasui/theme/constants';

// Use in custom recipes
const myComponent = tv({
  variants: {
    radius: {
      none: { base: RADIUS_VARIANTS.none },
      md: { base: RADIUS_VARIANTS.md },
    },
  },
});
```

## 🎨 OKLCH Color System

### Color Generation

Generate color tokens with locked hues:

```bash
cd packages/core/theme
node src/system/generator/generate-theme.mjs
```

### Color Features

- **OKLCH Color Space**: Perceptually uniform colors
- **Hue Locking**: Consistent hues across all shades (300.0°, 145.4°, 60.0°, etc.)
- **11 Shades**: 50-950 scale for each semantic color
- **Dark Mode**: Optimized dark theme variants
- **Semantic Colors**: Primary, secondary, tertiary, success, warning, danger, info, neutral, gray

### Available Colors

```tsx
// Light mode colors
colorTokens.primary[500]; // 'oklch(0.543 0.284 300.0)'
colorTokens.success[500]; // 'oklch(0.657 0.181 145.4)'
colorTokens.warning[500]; // 'oklch(0.775 0.161 60.0)'
colorTokens.danger[500]; // 'oklch(0.610 0.225 28.2)'
colorTokens.info[500]; // 'oklch(0.674 0.144 243.0)'
colorTokens.gray[500]; // 'oklch(0.500 0.000 0.0)'

// Dark mode colors
darkColorTokens.primary[500]; // 'oklch(0.720 0.242 300.0)'
```

## 🎅 Component Recipes

Tailwind-variants recipes for consistent component styling:

### Available Recipes

```tsx
import {
  button,
  // Add other recipes as they're created
} from '@ideasui/theme/recipes';

// Button recipe with slots
const { base, icon, label } = button({
  variant: 'solid', // solid | outline | ghost
  color: 'primary', // primary | secondary | success | warning | danger | info | neutral | gray
  size: 'md', // xs | sm | md | lg | xl
  radius: 'md', // none | sm | md | lg | xl | full
  isDisabled: false, // boolean
});
```

### Creating Custom Recipes

```tsx
import { tv } from 'tailwind-variants';
import { RADIUS_VARIANTS, COLOR_VARIANTS } from '@ideasui/theme/constants';

const myComponent = tv({
  base: 'inline-flex items-center',
  variants: {
    color: Object.fromEntries(Object.keys(COLOR_VARIANTS).map((color) => [color, {}])),
    radius: {
      none: { base: RADIUS_VARIANTS.none },
      md: { base: RADIUS_VARIANTS.md },
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-primary-500 text-white hover:bg-primary-600',
    },
  ],
});
```

## 📊 Design Tokens

### System Tokens

```tsx
import { systemTokens } from '@ideasui/theme/tokens';

// Spacing scale
systemTokens.spacing.xs; // '0.25rem'
systemTokens.spacing.sm; // '0.5rem'
systemTokens.spacing.md; // '1rem'

// Border radius
systemTokens.borderRadius.sm; // '0.25rem'
systemTokens.borderRadius.md; // '0.375rem'
systemTokens.borderRadius.lg; // '0.5rem'

// Typography
systemTokens.fontSize.sm; // '0.875rem'
systemTokens.fontSize.base; // '1rem'
systemTokens.fontSize.lg; // '1.125rem'
```

### Layout Tokens

```tsx
import { defaultLayout } from '@ideasui/theme/tokens';

// Layout-specific tokens
defaultLayout.radiusSmall; // '0.25rem'
defaultLayout.radiusMedium; // '0.375rem'
defaultLayout.radiusLarge; // '0.5rem'
defaultLayout.hoverOpacity; // '0.8'
defaultLayout.disabledOpacity; // '0.5'
```

## 🔧 Development

### Color Generation

The theme system includes a color generator that creates OKLCH-based color scales:

```bash
# Generate new color tokens
cd packages/core/theme
node src/system/generator/generate-theme.mjs
```

### File Structure

```
packages/core/theme/
├── src/
│   ├── constants/          # Shared variant constants
│   ├── recipes/            # Tailwind-variants recipes
│   ├── system/             # Color generation system
│   ├── tokens/             # Design tokens
│   └── index.ts            # Main exports
├── stories/                # Storybook stories
└── package.json
```

### Adding New Recipes

1. Create recipe file in `src/recipes/`
2. Use shared constants from `src/constants/variants.ts`
3. Export from `src/recipes/index.ts`
4. Add Storybook story in `stories/`

## 📝 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { VariantProps } from 'tailwind-variants';
import { button } from '@ideasui/theme/recipes';

// Component props with recipe variants
type ButtonProps = VariantProps<typeof button> & {
  children?: React.ReactNode;
};

// Color token types
import type { ColorTokens, DarkColorTokens } from '@ideasui/theme/tokens';

const lightColors: ColorTokens = colorTokens;
const darkColors: DarkColorTokens = darkColorTokens;
```

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**: All color combinations meet contrast requirements
- **OKLCH Color Space**: Perceptually uniform color progression
- **Hue Consistency**: Locked hues prevent color drift across shades
- **Dark Mode Optimized**: Proper contrast ratios in both light and dark themes
- **Semantic Naming**: Intent-based color names for better understanding

## 📚 API Reference

### Core Exports

```tsx
// Tailwind Plugin
import { ideasUIPlugin } from '@ideasui/theme';

// Theme System
import { ThemeProvider, ThemeScript, useTheme } from '@ideasui/theme';
import type { ThemeProviderProps, ThemeScriptProps, ThemeScriptConfig } from '@ideasui/theme';

// Component Recipes
import { button } from '@ideasui/theme/recipes';

// Design Tokens
import { colorTokens, darkColorTokens, systemTokens, defaultLayout } from '@ideasui/theme/tokens';

// Constants
import { RADIUS_VARIANTS, COLOR_VARIANTS } from '@ideasui/theme/constants';

// Type Definitions
import type { ThemeConfig, ColorTokens, LayoutTokens } from '@ideasui/theme';
```

### Architecture

The theme system is built on **React Context** for optimal SSR support and testing:

- **ThemeProvider**: Manages theme state using React Context
- **ThemeScript**: Prevents FOUC (Flash of Unstyled Content) during SSR/SSG
- **useTheme**: Hook to consume theme state
- **Storage**: Persists theme preference to localStorage/sessionStorage
- **System Detection**: Automatically detects system color scheme preference

## 📄 License

MIT License - see [LICENSE](../../../LICENSE) file for details.

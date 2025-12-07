# IdeasUI Design Tokens

Design system tokens for consistent styling across IdeasUI components.

## Installation

```bash
npm install @ideasui/tokens
```

## Usage

```tsx
import { colors, spacing, fontSize } from '@ideasui/tokens'

// Use in components
const Button = styled.button`
  background: ${colors.primary[500]};
  padding: ${spacing[4]};
  font-size: ${fontSize.base[0]};
`
```

## Token Categories

### Colors
- Primary, secondary, success, warning, danger, neutral
- Each with 50-950 scale

### Spacing
- 0-96 scale following Tailwind conventions
- Semantic spacing (xs, sm, md, lg, xl)

### Typography
- Font families (sans, serif, mono)
- Font sizes with line heights
- Font weights and letter spacing

### Shadows
- Box shadows and drop shadows
- Multiple elevation levels

### Other
- Border radius, breakpoints, z-index values

## 🎨 Token Structure

### Color Tokens
```ts
// colors.ts
export const colors = {
  // Semantic colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Base color
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a'
  },
  
  // System colors
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(222.2 84% 4.9%)',
  border: 'hsl(214.3 31.8% 91.4%)',
  ring: 'hsl(222.2 84% 4.9%)'
} as const

export type Colors = typeof colors
```

### Spacing Tokens
```ts
// spacing.ts
export const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem'     // 256px
} as const

// Semantic spacing
export const semanticSpacing = {
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
  xl: spacing[8],
  '2xl': spacing[12],
  '3xl': spacing[16]
} as const

export type Spacing = typeof spacing
export type SemanticSpacing = typeof semanticSpacing
```

### Typography Tokens
```ts
// typography.ts
export const fontFamily = {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    'sans-serif'
  ],
  serif: [
    'ui-serif',
    'Georgia',
    'Cambria',
    'serif'
  ],
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Consolas',
    'monospace'
  ]
} as const

export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }]
} as const

export const fontWeight = {
  thin: '100',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900'
} as const

export type FontFamily = typeof fontFamily
export type FontSize = typeof fontSize
export type FontWeight = typeof fontWeight
```

### Shadow Tokens
```ts
// shadows.ts
export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none'
} as const

export type BoxShadow = typeof boxShadow
```

## 🔧 Token Generation

### Automated Color Generation
```ts
// generators/colors.ts
import chroma from 'chroma-js'

export function generateColorScale(baseColor: string) {
  const base = chroma(baseColor)
  const [h, s, l] = base.hsl()
  
  return {
    50: chroma.hsl(h, s * 0.1, 0.98).hex(),
    100: chroma.hsl(h, s * 0.2, 0.95).hex(),
    200: chroma.hsl(h, s * 0.4, 0.9).hex(),
    300: chroma.hsl(h, s * 0.6, 0.8).hex(),
    400: chroma.hsl(h, s * 0.8, 0.7).hex(),
    500: baseColor, // Base color
    600: chroma.hsl(h, s, l * 0.8).hex(),
    700: chroma.hsl(h, s, l * 0.65).hex(),
    800: chroma.hsl(h, s, l * 0.5).hex(),
    900: chroma.hsl(h, s, l * 0.35).hex(),
    950: chroma.hsl(h, s, l * 0.2).hex()
  }
}

// Usage
const primaryColors = generateColorScale('#3b82f6')
```

### Theme Configuration
```ts
// theme.ts
import { colors } from './colors'
import { spacing } from './spacing'
import { typography } from './typography'

export const lightTheme = {
  colors: {
    ...colors,
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    muted: 'hsl(210 40% 98%)',
    'muted-foreground': 'hsl(215.4 16.3% 46.9%)'
  },
  spacing,
  ...typography
} as const

export const darkTheme = {
  colors: {
    ...colors,
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
    muted: 'hsl(217.2 32.6% 17.5%)',
    'muted-foreground': 'hsl(215 20.2% 65.1%)'
  },
  spacing,
  ...typography
} as const

export type Theme = typeof lightTheme
```

## 📦 Tailwind Integration

### Tailwind Config
```js
// tailwind.config.js
const { colors, spacing, fontFamily, fontSize } = require('@ideasui/tokens')

module.exports = {
  theme: {
    extend: {
      colors,
      spacing,
      fontFamily,
      fontSize
    }
  }
}
```

### CSS Variables
```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary-50: theme('colors.primary.50');
  --color-primary-500: theme('colors.primary.500');
  --color-primary-900: theme('colors.primary.900');
  
  /* Spacing */
  --spacing-xs: theme('spacing.1');
  --spacing-sm: theme('spacing.2');
  --spacing-md: theme('spacing.4');
  
  /* Typography */
  --font-size-sm: theme('fontSize.sm');
  --font-size-base: theme('fontSize.base');
  --font-size-lg: theme('fontSize.lg');
}

[data-theme="dark"] {
  --color-background: theme('colors.neutral.900');
  --color-foreground: theme('colors.neutral.50');
}
```

## 🎯 Usage Examples

### In Components
```tsx
import { colors, spacing } from '@ideasui/tokens'

const Button = styled.button`
  background-color: ${colors.primary[500]};
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${spacing[1]};
`
```

### In Tailwind Classes
```tsx
// Using token-based classes
<div className="bg-primary-500 p-4 rounded-md text-white">
  Content
</div>
```

### In CSS-in-JS
```tsx
const styles = {
  container: {
    backgroundColor: colors.primary[500],
    padding: spacing[4],
    borderRadius: spacing[2]
  }
}
```

## 📋 Token Checklist

- [ ] Consistent naming convention
- [ ] TypeScript types exported
- [ ] Semantic and numeric scales
- [ ] Dark/light theme variants
- [ ] Tailwind config integration
- [ ] CSS variable generation
- [ ] Documentation with examples
- [ ] Accessibility compliance (contrast ratios)
- [ ] Mobile-responsive values
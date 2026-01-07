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

## 🚀 Usage

### Component Recipes

```tsx
import { button } from '@ideasui/theme/recipes'
import type { VariantProps } from 'tailwind-variants'

// Use recipe in component
const { base, icon, label } = button({ 
  variant: 'solid', 
  color: 'primary', 
  size: 'md' 
})

// With TypeScript
type ButtonProps = VariantProps<typeof button>
```

### Color Tokens

```tsx
import { colorTokens, darkColorTokens } from '@ideasui/theme/tokens'

// Access color values
const primaryColor = colorTokens.primary[500] // 'oklch(0.543 0.284 300.0)'
const darkPrimary = darkColorTokens.primary[500] // 'oklch(0.720 0.242 300.0)'
```

### Design Constants

```tsx
import { RADIUS_VARIANTS, COLOR_VARIANTS } from '@ideasui/theme/constants'

// Use in custom recipes
const myComponent = tv({
  variants: {
    radius: {
      none: { base: RADIUS_VARIANTS.none },
      md: { base: RADIUS_VARIANTS.md },
    }
  }
})
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
colorTokens.primary[500]   // 'oklch(0.543 0.284 300.0)'
colorTokens.success[500]   // 'oklch(0.657 0.181 145.4)'
colorTokens.warning[500]   // 'oklch(0.775 0.161 60.0)'
colorTokens.danger[500]    // 'oklch(0.610 0.225 28.2)'
colorTokens.info[500]      // 'oklch(0.674 0.144 243.0)'
colorTokens.gray[500]      // 'oklch(0.500 0.000 0.0)'

// Dark mode colors
darkColorTokens.primary[500] // 'oklch(0.720 0.242 300.0)'
```

## 🎅 Component Recipes

Tailwind-variants recipes for consistent component styling:

### Available Recipes

```tsx
import { 
  button,
  // Add other recipes as they're created
} from '@ideasui/theme/recipes'

// Button recipe with slots
const { base, icon, label } = button({
  variant: 'solid',    // solid | outline | ghost
  color: 'primary',    // primary | secondary | success | warning | danger | info | neutral | gray
  size: 'md',          // xs | sm | md | lg | xl
  radius: 'md',        // none | sm | md | lg | xl | full
  isDisabled: false,   // boolean
})
```

### Creating Custom Recipes

```tsx
import { tv } from 'tailwind-variants'
import { RADIUS_VARIANTS, COLOR_VARIANTS } from '@ideasui/theme/constants'

const myComponent = tv({
  base: 'inline-flex items-center',
  variants: {
    color: Object.fromEntries(
      Object.keys(COLOR_VARIANTS).map(color => [color, {}])
    ),
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
})
```

## 📊 Design Tokens

### System Tokens

```tsx
import { systemTokens } from '@ideasui/theme/tokens'

// Spacing scale
systemTokens.spacing.xs    // '0.25rem'
systemTokens.spacing.sm    // '0.5rem'
systemTokens.spacing.md    // '1rem'

// Border radius
systemTokens.borderRadius.sm  // '0.25rem'
systemTokens.borderRadius.md  // '0.375rem'
systemTokens.borderRadius.lg  // '0.5rem'

// Typography
systemTokens.fontSize.sm   // '0.875rem'
systemTokens.fontSize.base // '1rem'
systemTokens.fontSize.lg   // '1.125rem'
```

### Layout Tokens

```tsx
import { defaultLayout } from '@ideasui/theme/tokens'

// Layout-specific tokens
defaultLayout.radiusSmall     // '0.25rem'
defaultLayout.radiusMedium    // '0.375rem'
defaultLayout.radiusLarge     // '0.5rem'
defaultLayout.hoverOpacity    // '0.8'
defaultLayout.disabledOpacity // '0.5'
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
import type { VariantProps } from 'tailwind-variants'
import { button } from '@ideasui/theme/recipes'

// Component props with recipe variants
type ButtonProps = VariantProps<typeof button> & {
  children?: React.ReactNode
}

// Color token types
import type { ColorTokens, DarkColorTokens } from '@ideasui/theme/tokens'

const lightColors: ColorTokens = colorTokens
const darkColors: DarkColorTokens = darkColorTokens
```

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**: All color combinations meet contrast requirements
- **OKLCH Color Space**: Perceptually uniform color progression
- **Hue Consistency**: Locked hues prevent color drift across shades
- **Dark Mode Optimized**: Proper contrast ratios in both light and dark themes
- **Semantic Naming**: Intent-based color names for better understanding

## 📚 API Reference

### Exports

```tsx
// Recipes
export { button } from './recipes'

// Tokens
export { colorTokens, darkColorTokens, systemTokens, defaultLayout } from './tokens'

// Constants
export { RADIUS_VARIANTS, COLOR_VARIANTS } from './constants'
```

## 📄 License

MIT License - see [LICENSE](../../../LICENSE) file for details.
# @ideasui/theme

Tailwind CSS v4 theme system for IdeasUI with comprehensive color tokens, semantic colors, and global theme settings.

## Installation

```bash
npm install @ideasui/theme tailwindcss@next
```

## Usage

### Basic Setup

Create your CSS file:

```css
@import "tailwindcss";
@plugin "@ideasui/theme";
```

Or use with configuration:

```css
@import "tailwindcss";
@plugin "./ideas-ui.ts";
```

Create `ideas-ui.ts`:

```typescript
import { ideasUIPlugin } from '@ideasui/theme';

export default ideasUIPlugin({
  disableAnimations: false,
  mode: 'light',
});
```

### Advanced Configuration

```typescript
import { ideasUIPlugin } from '@ideasui/theme';

export default ideasUIPlugin({
  // Disable all animations globally
  disableAnimations: true,
  
  // Theme mode
  mode: 'dark',
  
  // Custom color overrides
  colors: {
    primary: {
      500: 'oklch(0.6 0.3 280)', // Custom primary color
    },
  },
  
  // Custom spacing
  spacing: {
    '18': '4.5rem',
  },
  
  // Custom border radius
  borderRadius: {
    'xl': '1rem',
  },
  
  // Custom animations
  animation: {
    'custom-bounce': 'bounce 1s ease-in-out infinite',
  },
});
```

### Predefined Themes

```typescript
import { themes } from '@ideasui/theme';

// Available themes
const theme = themes.light;      // Default light theme
const theme = themes.dark;       // Default dark theme
const theme = themes.accessible; // High contrast, no animations
const theme = themes.minimal;    // Minimal design with reduced colors
const theme = themes.vibrant;    // High saturation colors
const theme = themes.corporate;  // Professional blue theme
```

### Using with tailwind.config.js

```javascript
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    ideasUIPlugin({
      disableAnimations: process.env.NODE_ENV === 'test',
      mode: 'system',
    }),
  ],
};
```

## Color System

### Color Scales

All colors follow a consistent 11-step scale (50-950):

- `primary` - Main brand color
- `secondary` - Secondary brand color  
- `success` - Success states
- `warning` - Warning states
- `danger` - Error/destructive states
- `info` - Informational states
- `neutral` - Grayscale colors

### Semantic Colors

Semantic colors automatically adapt to light/dark mode:

- `background` / `foreground`
- `muted` / `muted-foreground`
- `card` / `card-foreground`
- `border` / `input` / `ring`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `success` / `success-foreground`
- `warning` / `warning-foreground`
- `danger` / `danger-foreground`
- `info` / `info-foreground`

### Usage Examples

```tsx
// Using color scales
<div className="bg-primary-500 text-primary-50">Primary Button</div>
<div className="bg-success-100 text-success-900 border border-success-200">Success Alert</div>

// Using semantic colors
<div className="bg-background text-foreground border border-border">Card</div>
<button className="bg-primary text-primary-foreground">Button</button>
```

## Global Settings

### Disable Animations

```typescript
// Disable all animations globally
ideasUIPlugin({ disableAnimations: true })

// Or add class to HTML
<html className="no-animations">
```

### Theme Mode

```typescript
// Set theme mode
ideasUIPlugin({ mode: 'dark' })    // Always dark
ideasUIPlugin({ mode: 'light' })   // Always light  
ideasUIPlugin({ mode: 'system' })  // Follow system preference
```

## Component Recipes

Pre-built component styles are available:

```typescript
import { recipes } from '@ideasui/theme';

// Button recipe
const buttonClasses = recipes.button.base; // Base styles
const primaryButton = recipes.button.variants.variant.solid; // Variant styles

// Input recipe  
const inputClasses = recipes.input.base;

// Card recipe
const cardClasses = recipes.card.base;
```

## CSS Variables

All colors are available as CSS variables:

```css
/* Color scales */
var(--color-primary-500)
var(--color-success-100)

/* Semantic colors */
var(--color-background)
var(--color-foreground)
var(--color-primary)
var(--color-primary-foreground)
```

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import type { ThemeConfig, ColorTokens, IdeasUITheme } from '@ideasui/theme';

const config: ThemeConfig = {
  disableAnimations: true,
  colors: {
    primary: {
      500: 'oklch(0.6 0.3 280)',
    },
  },
};
```

## Accessibility

- WCAG 2.1 AA compliant color contrasts
- Respects `prefers-reduced-motion`
- High contrast theme available
- Screen reader utilities included

## Migration from v3

The plugin is designed to work alongside existing Tailwind CSS v3 configurations. Colors and utilities maintain the same class names for easy migration.

## License

MIT
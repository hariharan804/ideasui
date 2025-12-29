# @ideasui/variants

Dynamic variant system for IdeasUI components using tailwind-variants.
"exports": {
".": "./src/index.ts",
"./button": "./src/button.ts",
"./input": "./src/input.ts",
"./card": "./src/card.ts",
"./badge": "./src/badge.ts",
"./ripple": "./src/ripple.ts",
"./system": "./src/system.ts"
},

## 📦 Package Structure

```
packages/core/variants/
├── src/
│   ├── system.ts           # Design system tokens
│   ├── button.ts           # Button variants (dynamic)
│   ├── input.ts            # Input variants
│   ├── card.ts             # Card variants
│   ├── badge.ts            # Badge variants
│   └── index.ts            # Exports
├── package.json
├── README.md
└── tsconfig.json
```

## 🎯 Key Features

- **Dynamic Generation**: Variants auto-generated from system tokens
- **Type Safety**: Full TypeScript support with exported types
- **Maintainable**: Add/remove colors in one place, all components update
- **Semantic Colors**: Intent-based color system (default, primary, success, etc.)
- **Tailwind Compatible**: All classes are standard Tailwind CSS

## 🔧 System Tokens

### Colors (Semantic Intent System)

```typescript
colors = {
  default: {solid, outline, ghost},
  primary: {solid, outline, ghost},
  secondary: {solid, outline, ghost},
  success: {solid, outline, ghost},
  warning: {solid, outline, ghost},
  danger: {solid, outline, ghost},
  info: {solid, outline, ghost},
};
```

### Sizes

```typescript
sizes = {xs, sm, md, lg, xl}; // Square dimensions
buttonSizes = {xs, sm, md, lg, xl}; // Button-specific sizing
```

### Other Tokens

```typescript
spacing = { xs, sm, md, lg, xl }         // Padding variants
radius = { none, sm, md, lg, xl, full }  // Border radius
shadows = { none, sm, md, lg, xl }       // Drop shadows
transitions = { none, all, colors, transform }
focus = { default, primary, secondary }
disabled = { default }
```

## 🚀 Usage

### Basic Import

```typescript
import { buttonVariants } from '@ideasui/variants'

const Button = ({ variant, color, size, radius, className, ...props }) => (
  <button
    className={buttonVariants({ variant, color, size, radius, className })}
    {...props}
  />
)
```

### Component Examples

```tsx
// Default button
<Button>Click me</Button>

// Primary solid button
<Button color="primary" variant="solid">Primary</Button>

// Success outline button with large size
<Button color="success" variant="outline" size="lg">Success</Button>

// Danger ghost button with full radius
<Button color="danger" variant="ghost" radius="full">Danger</Button>
```

## 🔄 Dynamic Generation

### How It Works

```typescript
// Auto-generates color variants from system
const colorVariants = Object.keys(colors).reduce(
  (acc, color) => {
    acc[color] = "";
    return acc;
  },
  {} as Record<string, string>,
);

// Auto-generates compound variants
const compoundVariants = Object.entries(colors).flatMap(([colorKey, colorValue]) => [
  {variant: "solid", color: colorKey, class: colorValue.solid},
  {variant: "outline", color: colorKey, class: colorValue.outline},
  {variant: "ghost", color: colorKey, class: colorValue.ghost},
]);
```

### Benefits

- Add new color → Automatically available in all components
- Remove color → Automatically removed from all components
- Type-safe → TypeScript ensures consistency
- DRY → No duplicate color definitions

## 📝 Adding New Colors

1. **Add to system.ts**:

```typescript
export const colors = {
  // ... existing colors
  purple: {
    solid: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
    ghost: "text-purple-600 hover:bg-purple-50",
  },
} as const;
```

2. **Automatically available everywhere**:

```tsx
<Button color="purple">Purple Button</Button>
<Badge color="purple">Purple Badge</Badge>
```

## 🎨 Creating New Component Variants

```typescript
import {tv} from "tailwind-variants";
import {colors, buttonSizes, radius} from "./system";

// Generate dynamic variants
const colorVariants = Object.keys(colors).reduce(
  (acc, color) => {
    acc[color] = "";
    return acc;
  },
  {} as Record<string, string>,
);

const compoundVariants = Object.entries(colors).flatMap(([colorKey, colorValue]) => [
  {variant: "solid", color: colorKey, class: colorValue.solid},
  // ... other variants
]);

export const newComponentVariants = tv({
  base: ["base-classes"],
  variants: {
    variant: {solid: "", outline: "", ghost: ""},
    color: colorVariants,
    size: buttonSizes,
    radius,
  },
  compoundVariants,
  defaultVariants: {
    variant: "solid",
    color: "default",
    size: "md",
    radius: "md",
  },
});
```

## 📋 TypeScript Types

```typescript
// Available types
type ColorVariant = keyof typeof colors; // 'default' | 'primary' | ...
type ButtonSize = keyof typeof buttonSizes; // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Radius = keyof typeof radius; // 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

// Component props interface
interface ButtonProps {
  variant?: "solid" | "outline" | "ghost";
  color?: ColorVariant;
  size?: ButtonSize;
  radius?: Radius;
  className?: string;
}
```

## 🛠️ Configuration

### Package.json

```json
{
  "name": "@ideasui/variants",
  "dependencies": {
    "tailwind-variants": "^0.1.0"
  },
  "peerDependencies": {
    "tailwindcss": ">=3.0.0"
  }
}
```

### Tailwind Config

Ensure all variant classes are included in your Tailwind build by referencing the variants package in your `content` array:

```javascript
module.exports = {
  content: [
    "./packages/core/variants/src/**/*.{ts,tsx}",
    // ... other paths
  ],
};
```

## 🔍 Best Practices

1. **Semantic Naming**: Use intent-based colors (primary, success) over generic colors (blue, green)
2. **Consistent Structure**: All color objects should have solid, outline, ghost variants
3. **Type Safety**: Always export and use TypeScript types
4. **Dynamic Generation**: Prefer dynamic generation over hardcoded variants
5. **Single Source**: Keep all design tokens in system.ts

## 🚀 Future Enhancements

- **Dark Mode**: Add dark mode variants to color system
- **Responsive**: Add responsive size variants
- **Animation**: Add animation presets to transitions
- **Accessibility**: Enhanced focus and disabled states
- **Theming**: Runtime theme switching support

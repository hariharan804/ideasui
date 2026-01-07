# Tailwind CSS v4 & Theme Rules

## 🎨 Theme Integration

### Using IdeasUI Theme Plugin

```ts
// tailwind.config.ts
import ideasUIPlugin from "@ideasui/theme/plugin";

export default {
  plugins: [ideasUIPlugin()],
};
```

### CSS Variables

Theme colors are exposed as CSS custom properties:

```css
/* Primary color shades */
--primary-50, --primary-100, ..., --primary-950

/* Semantic colors */
--on-primary, --on-surface, --surface, --background
```

## 🎯 Color Usage

### Tailwind Classes

```tsx
// Use theme colors
<div className="bg-primary-500 text-on-primary">
  Primary button
</div>

// Semantic colors
<div className="bg-surface text-on-surface">
  Surface content
</div>
```

### OKLCH Color System

IdeasUI uses OKLCH for perceptually uniform colors:

```ts
// Colors defined in OKLCH
oklch(0.65 0.18 250)  // Primary blue
oklch(0.55 0.12 150)  // Secondary green
```

## 📐 Spacing & Sizing

### Consistent Spacing

Use Tailwind's spacing scale:

- `p-2, p-4, p-6` for padding
- `gap-2, gap-4` for flex/grid gaps
- `space-y-4` for vertical spacing

### Component Sizing

```tsx
// Size variants
<Button size="sm" />  // min-h-8
<Button size="md" />  // min-h-10
<Button size="lg" />  // min-h-12
```

## 🌗 Dark Mode

### Theme Switching

```tsx
import {useTheme} from "@ideasui/theme";

const {theme, setTheme} = useTheme();

// Toggle
setTheme(theme === "dark" ? "light" : "dark");
```

### CSS Classes

```css
/* Automatic with theme system */
.dark .bg-surface {
  /* dark mode styles */
}

/* Or use data attribute */
[data-theme="dark"] .component {
}
```

## ⚡ Performance

### PurgeCSS

Ensure all Tailwind classes are in content paths:

```ts
export default {
  content: ["./app/**/*.{ts,tsx}", "./node_modules/@ideasui/**/*.{js,ts,jsx,tsx}"],
};
```

### Avoid Dynamic Classes

```tsx
// ❌ Bad - can't be purged
<div className={`bg-${color}-500`} />

// ✅ Good - use static classes
<div className={color === "primary" ? "bg-primary-500" : "bg-secondary-500"} />
```

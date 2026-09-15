# IdeasUI Packages — Developer Guide

This document explains the organization, structure, and best practices for the IdeasUI monorepo packages.

📚 **[Official Documentation & Live Demos →](https://ideasui.com)**

---

## 📁 Structure Overview

```
packages/
├── components/          # Styled UI components
│   └── button/          # @ideasui/button
├── core/
│   ├── react/           # @ideasui/react - Main component bundle
│   ├── styles/          # @ideasui/styles - Pre-compiled CSS stylesheets
│   └── theme/           # @ideasui/theme - OKLCH colors, recipes, tokens
└── utils/               # @ideasui/utils - Shared utilities
```

---

## 📦 Package Types

### 1. Components (`/components`)

Complete UI components with styling and behavior.

```tsx
import { button } from '@ideasui/theme/recipes';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, children, ...props }, ref) => {
    const { base } = button({ variant, color });
    return (
      <button ref={ref} className={cn(base(), className)} {...props}>
        {children}
      </button>
    );
  },
);
```

### 2. Core Theme (`/core/theme`)

OKLCH color system, tailwind-variants recipes, design tokens.

```tsx
import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'inline-flex items-center justify-center',
  variants: {
    variant: {
      solid: 'bg-primary text-on-primary',
      outline: 'border-2 border-primary',
    },
  },
});
```

**Theme Provider Usage:**

```tsx
import { ThemeProvider, ThemeScript } from '@ideasui/theme';

<html>
  <head>
    <ThemeScript defaultTheme="light" />
  </head>
  <body>
    <ThemeProvider defaultTheme="light" />
    {children}
  </body>
</html>;
```

### 3. Hooks (`/hooks`)

Custom React hooks with JSDoc documentation.

```tsx
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  // Implementation...
};
```

### 4. Utils (`/utils`)

Pure utility functions, no React dependencies.

```ts
export const cn = (...classes: string[]) => clsx(classes);
```

### 5. Icons (`/icons`)

SVG icons as React components.

### 6. CLI (`/cli`)

Command-line tools for development workflow.

---

## 🔄 Dependency Rules

```
components → core/theme + hooks + utils
core/theme → utils
hooks      → utils
utils      → (no dependencies)
```

**Rules:**

- No circular dependencies
- Components cannot depend on other components directly
- Core packages cannot depend on components

---

## 📋 Package.json Template

```json
{
  "name": "@ideasui/button",
  "version": "0.1.0",
  "main": "./src/index.ts",
  "exports": {
    ".": {
      "import": "./src/index.ts",
      "types": "./src/index.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

---

## 🏗️ Component Package Structure

```
packages/components/button/
├── src/
│   ├── button.tsx           # Main component
│   ├── use-button.ts        # Hook (optional)
│   ├── index.ts             # Exports
│   └── __tests__/
│       └── button.test.tsx
├── stories/
│   └── button.stories.tsx
├── package.json
├── README.md
└── tsconfig.json
```

### Export Pattern

```ts
// src/index.ts
export { Button } from './button';
export type { ButtonProps } from './button';
```

---

## 🎯 Best Practices

| Package    | Guidelines                                                       |
| ---------- | ---------------------------------------------------------------- |
| Components | Use `forwardRef`, include tests, add Storybook stories           |
| Hooks      | Start with `use` prefix, handle cleanup, return consistent types |
| Utils      | Keep pure (no side effects), add comprehensive types             |
| Theme      | Use OKLCH colors, consistent token naming                        |

---

## 🚀 Development Commands

```bash
pnpm dev          # Watch mode
pnpm build        # Build all packages
pnpm test         # Run tests
pnpm lint         # Lint code
pnpm create       # Generate new component (plop)
```

---

## 📖 Usage Examples

```tsx
import { Button } from '@ideasui/button';
import { useLocalStorage } from '@ideasui/hooks';
import { cn } from '@ideasui/utils';
import { button } from '@ideasui/theme/recipes';

function App() {
  const [theme] = useLocalStorage('theme', 'light');

  return (
    <div className={cn('app', theme)}>
      <Button variant="solid" color="primary">
        Click me
      </Button>
    </div>
  );
}
```

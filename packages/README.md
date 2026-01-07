# IdeasUI Packages Structure Guide

This document explains the organization and usage of packages in the IdeasUI component library.

## 📁 Structure Overview

```
packages/
├── components/          # UI Components
├── core/
│   └── theme/          # Theme system with OKLCH colors & recipes
├── utils/              # Shared utilities
├── hooks/              # React hooks
├── icons/              # Icon library
└── cli/                # CLI tools
```

## 📦 Package Types

### 1. Components (`/components`)

**Purpose**: Complete UI components with styling and behavior
**Code Type**: React components with Tailwind CSS

```tsx
// Example: Button component
export const Button = ({children, variant = "primary"}) => {
  return <button className={buttonVariants({variant})}>{children}</button>;
};
```

**When to use**: Building complete UI elements that users interact with

### 2. Core Theme (`/core/theme`)

**Purpose**: OKLCH color system, tailwind-variants recipes, design tokens
**Code Type**: Color generation, theme recipes, design system constants

```tsx
// Example: Theme recipe
import { tv } from 'tailwind-variants'

export const button = tv({
  base: 'inline-flex items-center justify-center',
  variants: {
    variant: {
      solid: 'bg-primary-500 text-white',
      outline: 'border-2 border-primary-500 text-primary-500'
    }
  }
})
```

**When to use**: Defining component variants, color tokens, design system values

### 3. Utils (`/utils`)

**Purpose**: Pure utility functions, helpers, shared logic
**Code Type**: TypeScript utilities, no React dependencies

```ts
// Example: Utility functions
export const cn = (...classes: string[]) => {
  return clsx(classes);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};
```

**When to use**: Shared logic that doesn't require React, pure functions

### 4. Hooks (`/hooks`)

**Purpose**: Custom React hooks with comprehensive JSDoc documentation
**Code Type**: React hooks using useState, useEffect, etc.

```tsx
/**
 * Custom hook for managing localStorage state with automatic serialization
 * 
 * @param key - The localStorage key to store the value under
 * @param defaultValue - Initial value to use if the key doesn't exist
 * @returns Tuple containing [current value, setValue function, removeValue function]
 * 
 * @example
 * ```tsx
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')
 * ```
 */
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  // Implementation...
};
```

**When to use**: Reusable stateful logic, API calls, browser APIs

### 5. Icons (`/icons`)

**Purpose**: SVG icons as React components
**Code Type**: React components returning SVG elements

```tsx
// Example: Icon component
export const ChevronDown = ({size = 24, ...props}) => {
  return (
    <svg width={size} height={size} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
};
```

**When to use**: Consistent iconography across the library

### 6. CLI (`/cli`)

**Purpose**: Command-line tools for development workflow
**Code Type**: Node.js scripts, CLI commands

```js
// Example: Component generator
#!/usr/bin/env node
const { generateComponent } = require('./generators')

program
  .command('create <name>')
  .description('Create a new component')
  .action((name) => {
    generateComponent(name)
  })
```

**When to use**: Automating component creation, build processes

## 🔄 Package Dependencies

```
components → core/theme + hooks + utils + icons
core/theme → utils
hooks → utils
icons → utils
utils → (no dependencies)
cli → core/theme + utils
```

## 📋 Package.json Structure

Each package should follow this structure:

```json
{
  "name": "@ideasui/package-name",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup",
    "test": "jest"
  }
}
```

## 🎯 Best Practices

### Components

- Include TypeScript interfaces
- Add Storybook stories
- Write unit tests
- Document props with JSDoc

### Hooks

- Start with `use` prefix
- Return arrays or objects consistently
- Handle cleanup in useEffect

### Utils

- Keep functions pure (no side effects)
- Add comprehensive TypeScript types
- Include JSDoc documentation

### Tokens

- Use consistent naming conventions
- Export both individual tokens and grouped objects
- Include TypeScript types for IntelliSense

## 📖 Usage Examples

### Installing Packages

```bash
# Install specific component
npm install @ideasui/button

# Install multiple packages
npm install @ideasui/button @ideasui/input @ideasui/themes
```

### Using in Applications

```tsx
// Import components
import {Button} from "@ideasui/button";
import {useLocalStorage} from "@ideasui/hooks";
import {cn} from "@ideasui/utils";
import {button} from "@ideasui/theme/recipes";

// Use in component
function App() {
  const [theme] = useLocalStorage("theme", "light");
  const {base} = button({variant: "solid", color: "primary"});

  return (
    <div className={cn("app", theme)}>
      <Button variant="solid" color="primary">Click me</Button>
    </div>
  );
}
```

This structure ensures scalability, maintainability, and follows industry standards for component libraries.

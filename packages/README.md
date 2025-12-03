# IdeasUI Packages Structure Guide

This document explains the organization and usage of packages in the IdeasUI component library.

## 📁 Structure Overview

```
packages/
├── components/          # UI Components
├── themes/             # Theme system & providers
├── utils/              # Shared utilities
├── hooks/              # React hooks
├── primitives/         # Headless components
├── icons/              # Icon library
├── tokens/             # Design tokens
└── cli/                # CLI tools
```

## 📦 Package Types

### 1. Components (`/components`)
**Purpose**: Complete UI components with styling and behavior
**Code Type**: React components with Tailwind CSS

```tsx
// Example: Button component
export const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={buttonVariants({ variant })}>
      {children}
    </button>
  )
}
```

**When to use**: Building complete UI elements that users interact with

### 2. Themes (`/themes`)
**Purpose**: Theme providers, dark/light mode, CSS variables
**Code Type**: React context, CSS, theme configurations

```tsx
// Example: Theme provider
export const ThemeProvider = ({ children, theme = 'light' }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**When to use**: Managing global styling, theme switching, CSS custom properties

### 3. Utils (`/utils`)
**Purpose**: Pure utility functions, helpers, shared logic
**Code Type**: TypeScript utilities, no React dependencies

```ts
// Example: Utility functions
export const cn = (...classes: string[]) => {
  return clsx(classes)
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString()
}
```

**When to use**: Shared logic that doesn't require React, pure functions

### 4. Hooks (`/hooks`)
**Purpose**: Custom React hooks for state management and side effects
**Code Type**: React hooks using useState, useEffect, etc.

```tsx
// Example: Custom hook
export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || defaultValue
  })
  
  return [value, setValue]
}
```

**When to use**: Reusable stateful logic, API calls, browser APIs

### 5. Primitives (`/primitives`)
**Purpose**: Headless, unstyled components with behavior only
**Code Type**: React components with logic, no styling

```tsx
// Example: Headless toggle
export const Toggle = ({ onToggle, children }) => {
  const [isOn, setIsOn] = useState(false)
  
  const handleToggle = () => {
    setIsOn(!isOn)
    onToggle?.(!isOn)
  }
  
  return children({ isOn, toggle: handleToggle })
}
```

**When to use**: Building complex components, providing behavior without styling

### 6. Icons (`/icons`)
**Purpose**: SVG icons as React components
**Code Type**: React components returning SVG elements

```tsx
// Example: Icon component
export const ChevronDown = ({ size = 24, ...props }) => {
  return (
    <svg width={size} height={size} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
```

**When to use**: Consistent iconography across the library

### 7. Tokens (`/tokens`)
**Purpose**: Design system values (colors, spacing, typography)
**Code Type**: TypeScript constants, JSON configurations

```ts
// Example: Design tokens
export const tokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem'
  }
}
```

**When to use**: Defining consistent design values, Tailwind config

### 8. CLI (`/cli`)
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
components → primitives + hooks + utils + tokens
themes → tokens + utils
hooks → utils
primitives → hooks + utils
icons → utils
tokens → (no dependencies)
utils → (no dependencies)
cli → tokens + utils
```

## 📋 Package.json Structure

Each package should follow this structure:

```json
{
  "name": "@iui/package-name",
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
    "dev": "tsup --watch",
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
npm install @iui/button

# Install multiple packages
npm install @iui/button @iui/input @iui/themes
```

### Using in Applications
```tsx
// Import components
import { Button } from '@iui/button'
import { useLocalStorage } from '@iui/hooks'
import { cn } from '@iui/utils'

// Use in component
function App() {
  const [theme] = useLocalStorage('theme', 'light')
  
  return (
    <div className={cn('app', theme)}>
      <Button variant="primary">Click me</Button>
    </div>
  )
}
```

This structure ensures scalability, maintainability, and follows industry standards for component libraries.
# IdeasUI Package List

Generated on: 2026-07-04T02:58:41.041Z

## Components

### button

**Accessible, high-performance Button and ButtonGroup components for React. Built with Tailwind CSS v4, React Aria, and OKLCH color palettes.**

#### Installation

```bash
# npm
npm install @ideasui/button

# pnpm
pnpm add @ideasui/button

# yarn
yarn add @ideasui/button

# bun
bun add @ideasui/button
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Import

**Import from the main package (recommended)**

```tsx
import { ButtonGroupContext } from '@ideasui/react';
```

**Import from individual package**

```tsx
import { ButtonGroupContext } from '@ideasui/button';
```

#### API Reference

##### ButtonGroupContextType

| Prop             | Type                          | Description | Optional |
| ---------------- | ----------------------------- | ----------- | -------- |
| size             | `ButtonProperties['size']`    |             | ✓        |
| color            | `ButtonProperties['color']`   |             | ✓        |
| variant          | `ButtonProperties['variant']` |             | ✓        |
| isDisabled       | `boolean`                     |             | ✓        |
| isAttached       | `boolean`                     |             | ✓        |
| isVertical       | `boolean`                     |             | ✓        |
| radius           | `ButtonProperties['radius']`  |             | ✓        |
| fullWidth        | `boolean`                     |             | ✓        |
| disableAnimation | `boolean`                     |             | ✓        |
| showDivider      | `boolean`                     |             | ✓        |
| isIconOnly       | `boolean`                     |             | ✓        |

#### Package Details

- **Version:** 0.0.2-beta.1
- **Path:** `packages/components/button`
- **Keywords:** react, button, button-group, react-aria, tailwindcss, tailwind-v4, accessible-ui, wcag, ideasui, components, design-system, headless-ui
- **Files:** button-group-context.tsx, button-group.tsx, button.tsx, button.types.ts

---

## Core

### react

**IdeasUI is a premium, accessible React component library built with Tailwind CSS v4, React Aria, and OKLCH design tokens. Fully customizable, high-performance, and dark-mode ready.**

#### Installation

```bash
# npm
npm install @ideasui/react

# pnpm
pnpm add @ideasui/react

# yarn
yarn add @ideasui/react

# bun
bun add @ideasui/react
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Package Details

- **Version:** 0.0.2-beta.1
- **Path:** `packages/core/react`
- **Keywords:** react, components, design-system, ui-kit, tailwindcss, tailwind-v4, react-aria, oklch, accessible-ui, wcag, dark-mode, ideasui, premium-ui, headless-ui

---

### styles

**The global CSS styles, custom utilities, and Tailwind CSS v4 design engine configurations for the IdeasUI design system.**

#### Installation

```bash
# npm
npm install @ideasui/styles

# pnpm
pnpm add @ideasui/styles

# yarn
yarn add @ideasui/styles

# bun
bun add @ideasui/styles
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Package Details

- **Version:** 0.0.2-beta.1
- **Path:** `packages/core/styles`
- **Keywords:** tailwindcss, tailwind-v4, css, styles, design-system, ideasui, theme, oklch, utility-classes, dark-mode, design-tokens, component-styles

---

### theme

**A modern, OKLCH-based theme engine and design system plugin for Tailwind CSS v4. Features dynamic theme providers, style recipes, and custom theme storage managers.**

#### Installation

```bash
# npm
npm install @ideasui/theme

# pnpm
pnpm add @ideasui/theme

# yarn
yarn add @ideasui/theme

# bun
bun add @ideasui/theme
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Import

**Import from package**

```tsx
import { Types } from '@ideasui/theme';
```

#### API Reference

##### TokenOverrides

##### ThemeOptions

##### ThemeConfig

| Prop  | Type           | Description | Optional |
| ----- | -------------- | ----------- | -------- |
| light | `ThemeOptions` |             | ✓        |
| dark  | `ThemeOptions` |             | ✓        |

##### ColorScale

##### ColorTokens

#### Types

```tsx
type SurfaceTokenOverrides = ThemeToken<SurfaceProperties, string>;
```

```tsx
type ContentTokenOverrides = ThemeToken<ContentProperties, string>;
```

```tsx
type BorderTokenOverrides = Partial<Record<string, string>>;
```

```tsx
type ThemeMode = 'light' | 'dark' | 'system';
```

```tsx
type ColorFn = 'oklch' | 'var';
```

```tsx
type ConfigThemes = Record<string, ConfigTheme>;
```

#### Package Details

- **Version:** 0.0.5-beta.1
- **Path:** `packages/core/theme`
- **Keywords:** tailwindcss-plugin, tailwind-v4, theme-engine, oklch, design-tokens, theme-provider, dark-mode, ideasui, recipes, tailwind-variants, react-theme
- **Files:** types.ts

---

## Utils

### utils

**Shared TypeScript/React utilities and core helper functions for the IdeasUI component library, covering DOM, styles, and ARIA testing frameworks.**

#### Installation

```bash
# npm
npm install @ideasui/utils

# pnpm
pnpm add @ideasui/utils

# yarn
yarn add @ideasui/utils

# bun
bun add @ideasui/utils
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Package Details

- **Version:** 0.0.2-beta.1
- **Path:** `packages/utils`
- **Keywords:** typescript-utils, react-utilities, dom-utils, aria-testing, vitest-axe, tailwindcss-helpers, ideasui, monorepo-helpers

---

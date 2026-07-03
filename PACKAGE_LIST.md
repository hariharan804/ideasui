# IdeasUI Package List

Generated on: 2026-07-02T17:21:21.128Z

## Components

### button

**A high-performance, accessible Button and ButtonGroup component library for React, built with Tailwind CSS v4 and React Aria.**

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

| Prop             | Type                     | Description | Optional |
| ---------------- | ------------------------ | ----------- | -------- |
| size             | `ButtonProps['size']`    |             | ✓        |
| color            | `ButtonProps['color']`   |             | ✓        |
| variant          | `ButtonProps['variant']` |             | ✓        |
| isDisabled       | `boolean`                |             | ✓        |
| isAttached       | `boolean`                |             | ✓        |
| isVertical       | `boolean`                |             | ✓        |
| radius           | `ButtonProps['radius']`  |             | ✓        |
| fullWidth        | `boolean`                |             | ✓        |
| disableAnimation | `boolean`                |             | ✓        |
| showDivider      | `boolean`                |             | ✓        |
| isIconOnly       | `boolean`                |             | ✓        |

#### Package Details

- **Version:** 0.0.2-beta.1
- **Path:** `packages/components/button`
- **Keywords:** ideasui, react, button, button-group, button-component, accessible-components, ui-components, design-system, tailwindcss
- **Files:** button-group-context.tsx, button-group.tsx, button.tsx, button.types.ts

---

## Core

### react

**The main entry point for the IdeasUI React component library.**

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
- **Keywords:** ideasui, react, components, ui-kit, design-system, ui-component-library, tailwindcss, tailwind-v4, react-aria, react-aria-components, oklch, dark-mode, accessible-components

---

### styles

**The standalone CSS styles and Tailwind CSS v4 engine for the IdeasUI design system.**

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
- **Keywords:** ideasui, react, components, ui-kit, theme-system, design-tokens, tailwindcss-theme, dark-mode, color-system, utility-classes, component-styles, css-in-js, style-system

---

### theme

**A modern, OKLCH-based theme engine and design system plugin for Tailwind CSS v4, featuring dynamic tokens and high-performance recipes.**

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
type SurfaceTokenOverrides = ThemeToken<SurfaceProps, string>;
```

```tsx
type ContentTokenOverrides = ThemeToken<ContentProps, string>;
```

```tsx
type BorderTokenOverrides = Partial<Record<string, string>>;
```

```tsx
type SemanticTokenOverrides = { // ── Intent: Primary ────────────────────────────────────────── primary?: string
```

```tsx
type ThemeMode = 'light' | 'dark' | 'system';
```

```tsx
type ColorFn = 'oklch' | 'var';
```

```tsx
type ConfigTheme = { readonly extend?: 'light' | 'dark'
```

```tsx
type ConfigThemes = Record<string, ConfigTheme>;
```

```tsx
type ResolvedConfig = { variants: { name: string
```

```tsx
type ParsedColor = { cssFn: ColorFn
```

#### Package Details

- **Version:** 0.0.5-beta.1
- **Path:** `packages/core/theme`
- **Keywords:** ideasui, tailwindcss, tailwind-v4, theme, design-system, design-tokens, oklch, theming-system, react, ui-kit, dark-mode, accessible-colors
- **Files:** types.ts

---

## Utils

### utils

**Shared utilities for IdeasUI**

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
- **Keywords:** ideasui, react, utils, helpers, aria-utils, accessibility, clsx, tailwind-merge, typescript

---

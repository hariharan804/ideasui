# IdeasUI Package List

Generated on: 2026-01-11T17:21:35.037Z

## Components

### button

**Button component**

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
import { Button } from "@ideasui/react";
```

**Import from individual package**
```tsx
import { Button } from "@ideasui/button";
```

#### API Reference

##### ButtonProps

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| as | `ElementType` | The element or component to render as | ✓ |
| variant | `"solid" | "outline" | "ghost"` | Visual variant of the button | ✓ |
| color | `ColorVariantProps` | Color variant based on semantic intent | ✓ |
| size | `"xs" | "sm" | "md" | "lg" | "xl"` | Size of the button | ✓ |
| radius | `"none" | "sm" | "md" | "lg" | "xl" | "full"` | Border radius variant | ✓ |
| fullWidth | `boolean` | Whether the button should take full width | ✓ |
| loading | `boolean` | Whether the button is in loading state | ✓ |
| loadingText | `string` | Text to show when loading | ✓ |
| startContent | `ReactNode` | Content to show at the start of the button | ✓ |
| endContent | `ReactNode` | Content to show at the end of the button | ✓ |
| disableRipple | `boolean` | Whether the button should display a ripple effect | ✓ |

#### Package Details

- **Version:** 0.0.0
- **Path:** `packages/components/button`
- **Files:** button.tsx, spinner.tsx, use-button.ts

---

### ripple

**Ripple component for IdeasUI**

#### Installation

```bash
# npm
npm install @ideasui/ripple

# pnpm
pnpm add @ideasui/ripple

# yarn
yarn add @ideasui/ripple

# bun
bun add @ideasui/ripple
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Import

**Import from the main package (recommended)**
```tsx
import { Ripple } from "@ideasui/react";
```

**Import from individual package**
```tsx
import { Ripple } from "@ideasui/ripple";
```

#### API Reference

##### RippleItem

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| key | `React.Key` |  | ✗ |
| x | `number` |  | ✗ |
| y | `number` |  | ✗ |
| size | `number` |  | ✗ |

##### RippleProps

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| ripples | `RippleItem[]` |  | ✗ |
| color | `string` |  | ✓ |
| style | `React.CSSProperties` |  | ✓ |
| motionProps | `Omit<HTMLMotionProps<"span">, "ref">` |  | ✓ |
| onClear | `(id: React.Key) => void` |  | ✗ |

#### Events

| Event | Type |
|-------|------|
| onClear | `(id: React.Key) => void` |

#### Package Details

- **Version:** 0.0.0
- **Path:** `packages/components/ripple`
- **Files:** ripple.tsx, touchable.tsx, use-ripple.ts

---

### slot

**Universal polymorphic container component with 'as' prop support**

#### Installation

```bash
# npm
npm install @ideasui/slot

# pnpm
pnpm add @ideasui/slot

# yarn
yarn add @ideasui/slot

# bun
bun add @ideasui/slot
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Import

**Import from the main package (recommended)**
```tsx
import { Slot } from "@ideasui/react";
```

**Import from individual package**
```tsx
import { Slot } from "@ideasui/slot";
```

#### API Reference

##### SlotProps

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| as | `ElementType` | Element or component to render as | ✓ |
| asChild | `boolean` | Merge props with the first child instead of rendering wrapper | ✓ |
| children | `React.ReactNode` | Content to render inside the slot | ✓ |

#### Package Details

- **Version:** 0.1.0
- **Path:** `packages/components/slot`
- **Keywords:** react, component, polymorphic, slot, as-prop, typescript
- **Files:** slot.tsx

---

## Core

### theme

**Tailwind CSS v4 theme system for IdeasUI**

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

#### Package Details

- **Version:** 0.1.0
- **Path:** `packages/core/theme`
- **Keywords:** tailwindcss, theme, design-system, css, ui

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

- **Version:** 0.0.0
- **Path:** `packages/utils`

---

## Icons

### icons

**Shared icon library**

#### Installation

```bash
# npm
npm install @ideasui/icons

# pnpm
pnpm add @ideasui/icons

# yarn
yarn add @ideasui/icons

# bun
bun add @ideasui/icons
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Import

**Import from package**
```tsx
import { Check } from "@ideasui/src";
```

#### Package Details

- **Version:** 0.0.0
- **Path:** `packages/icons`
- **Files:** Check.tsx, ChevronDown.tsx, ChevronUp.tsx, DynamicIcon.tsx, Eye.tsx, EyeOff.tsx, IconSet.tsx, Loader.tsx, Search.tsx, X.tsx, createIcon.tsx, types.ts

---

## Cli

### cli

**CLI for IdeasUI component library**

#### Installation

```bash
# npm
npm install @ideasui/cli

# pnpm
pnpm add @ideasui/cli

# yarn
yarn add @ideasui/cli

# bun
bun add @ideasui/cli
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Package Details

- **Version:** 0.1.0
- **Path:** `packages/cli`
- **Keywords:** ideasui, cli, components, react, typescript

---


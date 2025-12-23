# IdeasUI Package List

Generated on: 2025-12-23T11:03:41.481Z

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
| color | `"default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info"` | Color variant based on semantic intent | ✓ |
| size | `"xs" | "sm" | "md" | "lg" | "xl"` | Size of the button | ✓ |
| radius | `"none" | "sm" | "md" | "lg" | "xl" | "full"` | Border radius variant | ✓ |
| fullWidth | `boolean` | Whether the button should take full width | ✓ |
| loading | `boolean` | Whether the button is in loading state | ✓ |
| loadingText | `string` | Text to show when loading | ✓ |
| startContent | `ReactNode` | Content to show at the start of the button | ✓ |
| endContent | `ReactNode` | Content to show at the end of the button | ✓ |
| disableRipple | `boolean` | Whether the button should display a ripple effect | ✓ |

#### Events

| Event | Type |
|-------|------|
| onComplete | `function` |

#### Package Details

- **Version:** 0.0.0
- **Path:** `packages/components/button`
- **Files:** button.tsx, use-button.ts

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

##### RippleType

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| key | `React.Key` |  | ✗ |
| x | `number` |  | ✗ |
| y | `number` |  | ✗ |
| size | `number` |  | ✗ |

##### RippleProps

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| ripples | `RippleType[]` |  | ✗ |
| color | `string` |  | ✓ |
| style | `React.CSSProperties` |  | ✓ |
| motionProps | `Omit<HTMLMotionProps<"span">, "ref">` |  | ✓ |
| onClear | `(key: React.Key) => void` |  | ✗ |

#### Events

| Event | Type |
|-------|------|
| onClear | `function` |

#### Package Details

- **Version:** 0.0.0
- **Path:** `packages/components/ripple`
- **Files:** ripple.tsx, touchable-ripple.tsx, Touchable.tsx, use-ripple.ts, use-touchable-ripple.ts

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
| as | `React.ElementType` | Element or component to render as | ✓ |
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

**SSR-friendly theme switcher with no dependencies**

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
import { ThemeConstants } from "@ideasui/theme";
```

#### Package Details

- **Version:** 1.0.0
- **Path:** `packages/core/theme`
- **Keywords:** theme, dark-mode, ssr, react
- **Files:** theme-constants.ts, theme-controller.tsx, theme-script.tsx, types.ts, use-theme-controller.ts, use-theme.ts

---

### variants

**Tailwind CSS variants system for IdeasUI components**

#### Installation

```bash
# npm
npm install @ideasui/variants

# pnpm
pnpm add @ideasui/variants

# yarn
yarn add @ideasui/variants

# bun
bun add @ideasui/variants
```

> The above command is for individual installation only. You may skip this step if @ideasui/react is already installed globally.

#### Import

**Import from package**
```tsx
import { Badge } from "@ideasui/variants";
```

#### Package Details

- **Version:** 0.1.0
- **Path:** `packages/core/variants`
- **Keywords:** tailwind, variants, css, design-system, react, typescript
- **Files:** badge.ts, box.ts, button.ts, card.ts, input.ts, ripple.ts, system.ts

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
- **Files:** Check.tsx, ChevronDown.tsx, ChevronUp.tsx, Eye.tsx, EyeOff.tsx, Loader.tsx, Search.tsx, types.ts, X.tsx

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

- **Version:** 0.0.0
- **Path:** `packages/cli`

---


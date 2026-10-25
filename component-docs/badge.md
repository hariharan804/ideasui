# Badge Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Badge` (Compound)
- **Package:** `@ideasui/badge`
- **Directory:** `packages/components/badge/`
- **Primary Exports:** `Badge`, `BadgeAnchor`
- **Category:** Display / Feedback
- **Recipe Location:** `packages/core/theme/src/recipes/badge.ts`

### Purpose

`Badge` is a fully accessible, theme-aware compact indicator for IdeasUI applications. It represents counts, statuses, notification dots, and labels. It supports two usage patterns — **standalone** (inline text label) and **anchored** (overlaid on a parent element via `BadgeAnchor`). It covers all visual variants, color schemes, sizes, placements, and a dot-only mode with zero-violation accessibility.

Key Features:

- Two usage patterns: standalone inline and anchored overlay via `BadgeAnchor`
- Visual variants (`solid`, `soft`, `outline`, `ghost`)
- Color schemes (`primary`, `neutral`, `success`, `warning`, `danger`)
- Size scale (`sm`, `md`, `lg`)
- Anchor placement (`top-right`, `top-left`, `bottom-right`, `bottom-left`)
- Dot mode (`isDot`) — renders a small indicator with no text content
- Max count display (`max` prop) — renders `{max}+` when count exceeds threshold
- Invisible mode (`isInvisible`) — hides the badge without removing it from the DOM
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- `data-slot` attributes on every sub-component for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/badge/
├── src/
│   ├── badge.tsx           ← Badge display component
│   ├── badge-anchor.tsx    ← Anchor wrapper (positions badge over child)
│   ├── badge.types.ts      ← Full TypeScript interfaces with JSDoc
│   └── index.ts            ← Barrel export (public API only)
├── __tests__/
│   └── badge.test.tsx      ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── badge.stories.tsx   ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── badge.ts                ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── badge.css               ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/badge → @ideasui/theme, @ideasui/utils
@ideasui/react → @ideasui/badge (re-export in master barrel)
```

> **Rule:** `@ideasui/badge` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Component Architecture

`Badge` is a **display-only** component — it has no interactive state, no context, and no selection logic. `BadgeAnchor` is a thin layout wrapper that positions `Badge` absolutely over its child element.

### Slot Map

| Sub-Component | `data-slot`    | Default Element | Notes                        |
| ------------- | -------------- | --------------- | ---------------------------- |
| `BadgeAnchor` | `badge-anchor` | `<span>`        | `position: relative` wrapper |
| `Badge`       | `badge`        | `<span>`        | The visible indicator        |

### Anatomy

```
BadgeAnchor (position: relative wrapper)
├── {children}   (the element being badged — avatar, icon, button, etc.)
└── Badge        (position: absolute, placed per placement prop)

Badge (standalone — no anchor required)
└── {content}    (count text, dot, or label)
```

### Usage Patterns

```
Pattern 1 — Standalone (inline)
  <Badge color="danger">3</Badge>

Pattern 2 — Anchored overlay
  <BadgeAnchor badge={<Badge color="danger">5</Badge>}>
    <Avatar />
  </BadgeAnchor>

Pattern 3 — Dot indicator
  <BadgeAnchor badge={<Badge isDot color="success" />}>
    <Avatar />
  </BadgeAnchor>

Pattern 4 — Max count
  <Badge color="danger" max={99}>120</Badge>
  {/* renders "99+" */}
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import { Badge, BadgeAnchor } from '@ideasui/react';

// Standalone count badge
<Badge color="danger">3</Badge>

// Standalone status label
<Badge variant="soft" color="success">Active</Badge>

// Max count — renders "99+"
<Badge color="danger" max={99}>120</Badge>

// Dot mode — no text
<Badge isDot color="success" />

// Invisible — hidden but in DOM
<Badge color="danger" isInvisible>5</Badge>

// Anchored over an avatar — top-right (default)
<BadgeAnchor badge={<Badge color="danger">3</Badge>}>
  <Avatar src="/user.jpg" name="Jane" />
</BadgeAnchor>

// Anchored — bottom-right placement
<BadgeAnchor
  badge={<Badge isDot color="success" />}
  placement="bottom-right"
>
  <Avatar name="Online User" />
</BadgeAnchor>

// Anchored — top-left placement
<BadgeAnchor
  badge={<Badge color="warning">!</Badge>}
  placement="top-left"
>
  <IconButton aria-label="Notifications"><BellIcon /></IconButton>
</BadgeAnchor>

// All variants
<Badge variant="solid"   color="primary">Solid</Badge>
<Badge variant="soft"    color="success">Soft</Badge>
<Badge variant="outline" color="warning">Outline</Badge>
<Badge variant="ghost"   color="danger">Ghost</Badge>

// All sizes
<Badge size="sm" color="primary">1</Badge>
<Badge size="md" color="primary">12</Badge>
<Badge size="lg" color="primary">99+</Badge>
```

### TypeScript Definition (`badge.types.ts`)

```tsx
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { BadgeReturnType } from '@ideasui/theme/recipes';

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type Badgecolor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style variant of the badge.
   * @default 'solid'
   */
  readonly variant?: BadgeVariant;

  /**
   * Color scheme of the badge.
   * @default 'primary'
   */
  readonly color?: Badgecolor;

  /**
   * Size scale of the badge.
   * @default 'md'
   */
  readonly size?: BadgeSize;

  /**
   * Renders the badge as a small dot with no text content.
   * When `true`, `children` and `max` are ignored.
   * @default false
   */
  readonly isDot?: boolean;

  /**
   * Maximum numeric value to display. When `children` exceeds this value,
   * renders `{max}+` instead. Only applies when `children` is a number or
   * numeric string.
   */
  readonly max?: number;

  /**
   * Hides the badge visually and from layout without removing it from the DOM.
   * Useful for animated show/hide transitions.
   * @default false
   */
  readonly isInvisible?: boolean;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;

  /**
   * Badge content — count, label, or icon.
   * Ignored when `isDot=true`.
   */
  readonly children?: ReactNode;
}

export interface BadgeAnchorProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The `Badge` element to overlay on the child.
   */
  readonly badge: ReactNode;

  /**
   * Placement of the badge relative to the child element.
   * @default 'top-right'
   */
  readonly placement?: BadgePlacement;

  /**
   * Offset applied to the badge position. Useful for fine-tuning overlap.
   * @default { x: 0, y: 0 }
   */
  readonly offset?: { readonly x?: number; readonly y?: number };

  /**
   * Custom CSS class names merged via `cn()` on the anchor wrapper.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the anchor wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * The element being badged (avatar, icon button, etc.).
   */
  readonly children: ReactNode;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/badge.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const badge = tv({
  slots: {
    root: [
      'inline-flex items-center justify-center',
      'font-semibold leading-none whitespace-nowrap',
      'border transition-opacity duration-150',
    ],
    anchor: 'relative inline-flex shrink-0',
    badgeWrapper: 'absolute z-10',
  },

  variants: {
    variant: {
      solid: {
        root: 'border-transparent',
      },
      soft: {
        root: 'border-transparent',
      },
      outline: {
        root: 'bg-transparent',
      },
      ghost: {
        root: 'bg-transparent border-transparent',
      },
    },

    color: {
      primary: {},
      neutral: {},
      success: {},
      warning: {},
      danger: {},
    },

    size: {
      sm: {
        root: 'h-4 min-w-4 px-1 text-[10px] rounded-full',
        badgeWrapper: 'min-w-4',
      },
      md: {
        root: 'h-5 min-w-5 px-1.5 text-xs rounded-full',
        badgeWrapper: 'min-w-5',
      },
      lg: {
        root: 'h-6 min-w-6 px-2 text-xs rounded-full',
        badgeWrapper: 'min-w-6',
      },
    },

    placement: {
      'top-right': { badgeWrapper: 'top-0 right-0 translate-x-1/2 -translate-y-1/2' },
      'top-left': { badgeWrapper: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2' },
      'bottom-right': { badgeWrapper: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2' },
      'bottom-left': { badgeWrapper: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2' },
    },

    isDot: {
      true: {
        root: 'p-0 rounded-full',
      },
    },

    isInvisible: {
      true: {
        root: 'opacity-0 pointer-events-none',
      },
    },
  },

  compoundVariants: [
    // solid + color
    { variant: 'solid', color: 'primary', class: { root: 'bg-primary text-white' } },
    { variant: 'solid', color: 'neutral', class: { root: 'bg-neutral text-white' } },
    { variant: 'solid', color: 'success', class: { root: 'bg-success text-white' } },
    { variant: 'solid', color: 'warning', class: { root: 'bg-warning text-white' } },
    { variant: 'solid', color: 'danger', class: { root: 'bg-danger  text-white' } },

    // soft + color
    { variant: 'soft', color: 'primary', class: { root: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'neutral', class: { root: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'success', class: { root: 'bg-success-subtle text-success' } },
    { variant: 'soft', color: 'warning', class: { root: 'bg-warning-subtle text-warning' } },
    { variant: 'soft', color: 'danger', class: { root: 'bg-danger-subtle  text-danger' } },

    // outline + color
    { variant: 'outline', color: 'primary', class: { root: 'border-primary text-primary' } },
    { variant: 'outline', color: 'neutral', class: { root: 'border-neutral text-neutral' } },
    { variant: 'outline', color: 'success', class: { root: 'border-success text-success' } },
    { variant: 'outline', color: 'warning', class: { root: 'border-warning text-warning' } },
    { variant: 'outline', color: 'danger', class: { root: 'border-danger  text-danger' } },

    // ghost + color
    { variant: 'ghost', color: 'primary', class: { root: 'text-primary' } },
    { variant: 'ghost', color: 'neutral', class: { root: 'text-neutral' } },
    { variant: 'ghost', color: 'success', class: { root: 'text-success' } },
    { variant: 'ghost', color: 'warning', class: { root: 'text-warning' } },
    { variant: 'ghost', color: 'danger', class: { root: 'text-danger' } },

    // dot sizes
    { isDot: true, size: 'sm', class: { root: 'size-2' } },
    { isDot: true, size: 'md', class: { root: 'size-2.5' } },
    { isDot: true, size: 'lg', class: { root: 'size-3' } },
  ],

  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    placement: 'top-right',
    isDot: false,
    isInvisible: false,
  },
});

export type BadgeVariants = VariantProps<typeof badge>;
export type BadgeReturnType = ReturnType<typeof badge>;
```

---

## 6. Component Implementation

### Badge (`badge.tsx`)

```tsx
'use client';

import type { BadgeProps } from './badge.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { badge as badgeRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

function resolveContent(
  children: React.ReactNode,
  max: number | undefined,
  isDot: boolean,
): React.ReactNode {
  if (isDot) return null;
  if (max !== undefined) {
    const numeric =
      typeof children === 'number'
        ? children
        : typeof children === 'string'
          ? Number(children)
          : NaN;
    if (!isNaN(numeric) && numeric > max) return `${max}+`;
  }
  return children;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      isDot = false,
      max,
      isInvisible = false,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const styles = badgeRecipe({ variant, color, size, isDot, isInvisible });
    const content = resolveContent(children, max, isDot);

    return (
      <span
        ref={reference}
        className={cn(styles.root(), className)}
        data-slot="badge"
        data-dot={isDot || undefined}
        data-invisible={isInvisible || undefined}
        aria-hidden={isDot || isInvisible ? 'true' : undefined}
        style={style}
        {...properties}
      >
        {content}
      </span>
    );
  },
);

Badge.displayName = 'IdeasUI.Badge';
```

### BadgeAnchor (`badge-anchor.tsx`)

```tsx
'use client';

import type { BadgeAnchorProps } from './badge.types';
import type { CSSProperties, JSX } from 'react';

import { forwardRef } from 'react';
import { badge as badgeRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export const BadgeAnchor = forwardRef<HTMLSpanElement, BadgeAnchorProps>(
  (
    { badge, placement = 'top-right', offset, className, style, children, ...properties },
    reference,
  ): JSX.Element => {
    const styles = badgeRecipe({ placement });

    const offsetStyle: CSSProperties = offset
      ? ({
          '--badge-offset-x': `${offset.x ?? 0}px`,
          '--badge-offset-y': `${offset.y ?? 0}px`,
        } as CSSProperties)
      : {};

    return (
      <span
        ref={reference}
        className={cn(styles.anchor(), className)}
        data-slot="badge-anchor"
        style={style}
        {...properties}
      >
        {children}
        <span className={cn(styles.badgeWrapper())} data-slot="badge-wrapper" style={offsetStyle}>
          {badge}
        </span>
      </span>
    );
  },
);

BadgeAnchor.displayName = 'IdeasUI.BadgeAnchor';
```

### Barrel Export (`index.ts`)

```tsx
export { Badge } from './badge';
export { BadgeAnchor } from './badge-anchor';

export type {
  BadgeProps,
  BadgeAnchorProps,
  BadgeVariant,
  Badgecolor,
  BadgeSize,
  BadgePlacement,
} from './badge.types';
```

---

## 7. Standalone BEM CSS Specification (`packages/core/styles/src/components/badge.css`)

```css
/* ─── Badge root ──────────────────────────────────────────────── */
.ideasui-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 9999px;
  transition: opacity 150ms ease;
}

/* ─── Sizes ───────────────────────────────────────────────────── */
.ideasui-badge--sm {
  height: 1rem;
  min-width: 1rem;
  padding: 0 0.25rem;
  font-size: 10px;
}
.ideasui-badge--md {
  height: 1.25rem;
  min-width: 1.25rem;
  padding: 0 0.375rem;
  font-size: var(--ideasui-font-size-xs);
}
.ideasui-badge--lg {
  height: 1.5rem;
  min-width: 1.5rem;
  padding: 0 0.5rem;
  font-size: var(--ideasui-font-size-xs);
}

/* ─── Dot mode ────────────────────────────────────────────────── */
.ideasui-badge--dot {
  padding: 0;
}
.ideasui-badge--dot.ideasui-badge--sm {
  width: 0.5rem;
  height: 0.5rem;
  min-width: unset;
}
.ideasui-badge--dot.ideasui-badge--md {
  width: 0.625rem;
  height: 0.625rem;
  min-width: unset;
}
.ideasui-badge--dot.ideasui-badge--lg {
  width: 0.75rem;
  height: 0.75rem;
  min-width: unset;
}

/* ─── Invisible ───────────────────────────────────────────────── */
.ideasui-badge--invisible {
  opacity: 0;
  pointer-events: none;
}

/* ─── Variant: solid ──────────────────────────────────────────── */
.ideasui-badge--solid.ideasui-badge--primary {
  background-color: oklch(var(--ideasui-color-primary));
  color: white;
}
.ideasui-badge--solid.ideasui-badge--neutral {
  background-color: oklch(var(--ideasui-color-neutral));
  color: white;
}
.ideasui-badge--solid.ideasui-badge--success {
  background-color: oklch(var(--ideasui-color-success));
  color: white;
}
.ideasui-badge--solid.ideasui-badge--warning {
  background-color: oklch(var(--ideasui-color-warning));
  color: white;
}
.ideasui-badge--solid.ideasui-badge--danger {
  background-color: oklch(var(--ideasui-color-danger));
  color: white;
}

/* ─── Variant: soft ───────────────────────────────────────────── */
.ideasui-badge--soft.ideasui-badge--primary {
  background-color: oklch(var(--ideasui-color-primary-subtle));
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-badge--soft.ideasui-badge--neutral {
  background-color: oklch(var(--ideasui-color-neutral-subtle));
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-badge--soft.ideasui-badge--success {
  background-color: oklch(var(--ideasui-color-success-subtle));
  color: oklch(var(--ideasui-color-success));
}
.ideasui-badge--soft.ideasui-badge--warning {
  background-color: oklch(var(--ideasui-color-warning-subtle));
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-badge--soft.ideasui-badge--danger {
  background-color: oklch(var(--ideasui-color-danger-subtle));
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Variant: outline ────────────────────────────────────────── */
.ideasui-badge--outline {
  background-color: transparent;
}
.ideasui-badge--outline.ideasui-badge--primary {
  border-color: oklch(var(--ideasui-color-primary));
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-badge--outline.ideasui-badge--neutral {
  border-color: oklch(var(--ideasui-color-neutral));
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-badge--outline.ideasui-badge--success {
  border-color: oklch(var(--ideasui-color-success));
  color: oklch(var(--ideasui-color-success));
}
.ideasui-badge--outline.ideasui-badge--warning {
  border-color: oklch(var(--ideasui-color-warning));
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-badge--outline.ideasui-badge--danger {
  border-color: oklch(var(--ideasui-color-danger));
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Variant: ghost ──────────────────────────────────────────── */
.ideasui-badge--ghost {
  background-color: transparent;
  border-color: transparent;
}
.ideasui-badge--ghost.ideasui-badge--primary {
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-badge--ghost.ideasui-badge--neutral {
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-badge--ghost.ideasui-badge--success {
  color: oklch(var(--ideasui-color-success));
}
.ideasui-badge--ghost.ideasui-badge--warning {
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-badge--ghost.ideasui-badge--danger {
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Anchor wrapper ──────────────────────────────────────────── */
.ideasui-badge-anchor {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}

/* ─── Badge wrapper (positioned) ─────────────────────────────── */
.ideasui-badge-anchor__wrapper {
  position: absolute;
  z-index: 10;
}

/* Placements */
.ideasui-badge-anchor__wrapper--top-right {
  top: 0;
  right: 0;
  transform: translate(50%, -50%) translateX(var(--badge-offset-x, 0px))
    translateY(var(--badge-offset-y, 0px));
}
.ideasui-badge-anchor__wrapper--top-left {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%) translateX(var(--badge-offset-x, 0px))
    translateY(var(--badge-offset-y, 0px));
}
.ideasui-badge-anchor__wrapper--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%) translateX(var(--badge-offset-x, 0px))
    translateY(var(--badge-offset-y, 0px));
}
.ideasui-badge-anchor__wrapper--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%) translateX(var(--badge-offset-x, 0px))
    translateY(var(--badge-offset-y, 0px));
}

/* prefers-reduced-motion — suppressed via @ideasui/styles global rule */
```

---

## 8. All Variants Reference

### Visual Variants

| Variant   | Background             | Text            | Border          |
| --------- | ---------------------- | --------------- | --------------- |
| `solid`   | `{color}` token        | `white`         | transparent     |
| `soft`    | `{color}-subtle` token | `{color}` token | transparent     |
| `outline` | transparent            | `{color}` token | `{color}` token |
| `ghost`   | transparent            | `{color}` token | transparent     |

### Color Schemes

| `color`   | Tokens used                                                 |
| --------- | ----------------------------------------------------------- |
| `primary` | `--ideasui-color-primary`, `--ideasui-color-primary-subtle` |
| `neutral` | `--ideasui-color-neutral`, `--ideasui-color-neutral-subtle` |
| `success` | `--ideasui-color-success`, `--ideasui-color-success-subtle` |
| `warning` | `--ideasui-color-warning`, `--ideasui-color-warning-subtle` |
| `danger`  | `--ideasui-color-danger`, `--ideasui-color-danger-subtle`   |

### Sizes

| `size` | Height | Min-width | Padding | Font      | Dot size |
| ------ | ------ | --------- | ------- | --------- | -------- |
| `sm`   | 16px   | 16px      | 0 4px   | 10px      | 8×8px    |
| `md`   | 20px   | 20px      | 0 6px   | `text-xs` | 10×10px  |
| `lg`   | 24px   | 24px      | 0 8px   | `text-xs` | 12×12px  |

### Anchor Placements

| `placement`           | Position              | Transform               |
| --------------------- | --------------------- | ----------------------- |
| `top-right` (default) | `top: 0; right: 0`    | `translate(50%, -50%)`  |
| `top-left`            | `top: 0; left: 0`     | `translate(-50%, -50%)` |
| `bottom-right`        | `bottom: 0; right: 0` | `translate(50%, 50%)`   |
| `bottom-left`         | `bottom: 0; left: 0`  | `translate(-50%, 50%)`  |

### Special Props

| Prop          | Type      | Behavior                                                                                |
| ------------- | --------- | --------------------------------------------------------------------------------------- |
| `isDot`       | `boolean` | Renders a small circle with no text; `children` and `max` ignored; `aria-hidden="true"` |
| `max`         | `number`  | When numeric `children` exceeds `max`, renders `{max}+`                                 |
| `isInvisible` | `boolean` | `opacity: 0; pointer-events: none` — badge stays in DOM for layout stability            |

---

## 9. Behavior Rules

| Behavior                  | Rule                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `isDot=true`              | `children` ignored; `max` ignored; `aria-hidden="true"` always set                                        |
| `isInvisible=true`        | `opacity: 0; pointer-events: none`; `aria-hidden="true"` set — badge stays in DOM                         |
| `max` prop                | Only applies when `children` is a number or numeric string; renders `{max}+` when exceeded                |
| `BadgeAnchor` `offset`    | Applied as CSS custom properties `--badge-offset-x` / `--badge-offset-y` for fine-tuning                  |
| `aria-hidden`             | Set to `"true"` on dot badges and invisible badges — count badges with text content are NOT `aria-hidden` |
| Count badge accessibility | Wrap in a visually-hidden `<span aria-live="polite">` at the page level for live count announcements      |
| `displayName`             | Set on both sub-components (`IdeasUI.Badge`, `IdeasUI.BadgeAnchor`)                                       |
| `data-slot`               | `badge` on `Badge`, `badge-anchor` on `BadgeAnchor`, `badge-wrapper` on the inner position wrapper        |

---

## 10. Badge vs Chip — Decision Guide

| Concern                | `Badge`                                     | `Chip`                                                           |
| ---------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| **Interactive**        | No — display only                           | Yes — `selectable` and `dismissible` modes                       |
| **Anchored overlay**   | Yes — `BadgeAnchor` positions over child    | No                                                               |
| **Dot mode**           | Yes — `isDot` prop                          | No                                                               |
| **Max count**          | Yes — `max` prop renders `{max}+`           | No                                                               |
| **Invisible mode**     | Yes — `isInvisible` for layout-stable hide  | No                                                               |
| **Avatar / Icon slot** | No                                          | Yes — `ChipAvatar`, `ChipIcon`                                   |
| **Group / selection**  | No                                          | Yes — `ChipGroup`                                                |
| **Use case**           | Counts, statuses, notification dots, labels | Tags, filters, people, categories                                |
| **Keyboard**           | None                                        | `Space`/`Enter` (selectable), `Delete`/`Backspace` (dismissible) |

> **Rule:** Use `Badge` for purely decorative status indicators, counts, and notification overlays. Use `Chip` when the element is interactive (filterable, removable, selectable).

---

## 11. Accessibility Requirements (WCAG 2.1 AA)

- **Non-interactive**: `Badge` is always a `<span>` — never a `<button>` or focusable element. It carries no interactive ARIA roles.
- **Dot badges**: `aria-hidden="true"` is always set on dot badges — they are purely decorative. The parent element must provide the accessible context (e.g. `aria-label="Online"` on the avatar).
- **Invisible badges**: `aria-hidden="true"` is set when `isInvisible=true` — hidden badges must not be announced.
- **Count badges**: Count badges with visible text are NOT `aria-hidden`. For live count updates (e.g. notification count), wrap in an `aria-live="polite"` region at the page level:

```tsx
// Recommended pattern for live count announcements
<span className="sr-only" aria-live="polite" aria-atomic="true">
  {count > 0 ? `${count} unread notifications` : 'No unread notifications'}
</span>
<BadgeAnchor badge={<Badge color="danger">{count}</Badge>}>
  <IconButton aria-label="Notifications"><BellIcon /></IconButton>
</BadgeAnchor>
```

- **`max` prop**: When `{max}+` is rendered, the visual text differs from the actual count. Provide the true count via `aria-label` on the badge or a surrounding live region.
- **Contrast Ratios**: All color tokens map to OKLCH variables meeting or exceeding 4.5:1 contrast in light and dark modes. White text on `solid` color backgrounds is verified at all 5 color schemes.
- **`prefers-reduced-motion`**: `transition-opacity` suppressed via the global `@media (prefers-reduced-motion: reduce)` rule in `@ideasui/styles`.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge, BadgeAnchor } from '../src';

it('standalone count badge has zero a11y violations', async () => {
  const { container } = render(<Badge color="danger">5</Badge>);
  expect(await axe(container)).toHaveNoViolations();
});

it('standalone label badge has zero a11y violations', async () => {
  const { container } = render(
    <Badge variant="soft" color="success">
      Active
    </Badge>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('anchored badge has zero a11y violations', async () => {
  const { container } = render(
    <BadgeAnchor badge={<Badge color="danger">3</Badge>}>
      <span aria-label="User avatar">JD</span>
    </BadgeAnchor>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('dot badge has zero a11y violations', async () => {
  const { container } = render(
    <BadgeAnchor badge={<Badge isDot color="success" />}>
      <span aria-label="Online user">JD</span>
    </BadgeAnchor>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('invisible badge has zero a11y violations', async () => {
  const { container } = render(
    <Badge color="danger" isInvisible>
      0
    </Badge>,
  );
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 12. Storybook Stories (`badge.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Badge, BadgeAnchor } from '../src';

const AvatarPlaceholder = ({ name }: { name: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'oklch(var(--ideasui-color-surface-muted))',
      color: 'oklch(var(--ideasui-color-content-primary))',
      fontWeight: 600,
      fontSize: 14,
    }}
    aria-label={name}
  >
    {name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()}
  </span>
);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Badge>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => <Badge color="danger">3</Badge>,
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <Badge key={variant} variant={variant} color="primary">
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

// ── All Color Schemes ───────────────────────────────────────────
export const colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Badge key={size} size={size} color="danger">
          {size === 'sm' ? '9' : size === 'md' ? '99' : '999'}
        </Badge>
      ))}
    </div>
  ),
};

// ── Max Count ───────────────────────────────────────────────────
export const MaxCount: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge color="danger" max={9}>
        5
      </Badge>
      <Badge color="danger" max={9}>
        12
      </Badge>
      <Badge color="danger" max={99}>
        120
      </Badge>
      <Badge color="danger" max={999}>
        1500
      </Badge>
    </div>
  ),
};

// ── Dot Mode ────────────────────────────────────────────────────
export const DotMode: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(['primary', 'success', 'warning', 'danger', 'neutral'] as const).map((color) => (
        <Badge key={color} isDot color={color} size="md" />
      ))}
    </div>
  ),
};

// ── Invisible ───────────────────────────────────────────────────
export const Invisible: Story = {
  render: () => {
    const [invisible, setInvisible] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Badge color="danger" isInvisible={invisible}>
            5
          </Badge>
          <Badge color="success" isInvisible={!invisible}>
            Active
          </Badge>
        </div>
        <button
          type="button"
          onClick={() => setInvisible((v) => !v)}
          className="text-primary w-fit text-sm underline"
        >
          Toggle visibility
        </button>
      </div>
    );
  },
};

// ── Anchored — All Placements ───────────────────────────────────
export const AnchoredPlacements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10 p-8">
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map((placement) => (
        <BadgeAnchor
          key={placement}
          placement={placement}
          badge={
            <Badge color="danger" size="sm">
              3
            </Badge>
          }
        >
          <AvatarPlaceholder name="Jane Doe" />
        </BadgeAnchor>
      ))}
    </div>
  ),
};

// ── Anchored — Dot Indicator ────────────────────────────────────
export const AnchoredDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-6">
      <BadgeAnchor placement="bottom-right" badge={<Badge isDot color="success" size="md" />}>
        <AvatarPlaceholder name="Online User" />
      </BadgeAnchor>
      <BadgeAnchor placement="bottom-right" badge={<Badge isDot color="warning" size="md" />}>
        <AvatarPlaceholder name="Away User" />
      </BadgeAnchor>
      <BadgeAnchor placement="bottom-right" badge={<Badge isDot color="neutral" size="md" />}>
        <AvatarPlaceholder name="Offline User" />
      </BadgeAnchor>
    </div>
  ),
};

// ── Notification Counter Pattern ────────────────────────────────
export const NotificationCounter: Story = {
  render: () => {
    const [count, setCount] = useState(5);
    return (
      <div className="flex flex-col gap-4">
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {count > 0 ? `${count} unread notifications` : 'No unread notifications'}
        </span>
        <div className="flex items-center gap-6">
          <BadgeAnchor
            badge={
              <Badge color="danger" max={99} isInvisible={count === 0}>
                {count}
              </Badge>
            }
          >
            <AvatarPlaceholder name="Bell" />
          </BadgeAnchor>
          <span className="text-content-secondary text-sm">{count} unread</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="text-primary text-sm underline"
          >
            Add notification
          </button>
          <button
            type="button"
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="text-danger text-sm underline"
          >
            Clear one
          </button>
        </div>
      </div>
    );
  },
};

// ── Status Labels ───────────────────────────────────────────────
export const StatusLabels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="soft" color="success">
        Active
      </Badge>
      <Badge variant="soft" color="warning">
        Pending
      </Badge>
      <Badge variant="soft" color="danger">
        Rejected
      </Badge>
      <Badge variant="soft" color="neutral">
        Draft
      </Badge>
      <Badge variant="soft" color="primary">
        In Review
      </Badge>
      <Badge variant="outline" color="success">
        Verified
      </Badge>
      <Badge variant="solid" color="danger">
        Critical
      </Badge>
    </div>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    isDot: false,
    isInvisible: false,
    max: undefined,
    children: '5',
  },
  render: (args) => <Badge {...args} />,
};
```

---

## 13. Definition of Done Checklist

- [ ] Package created at `packages/components/badge/`
- [ ] Recipe created at `packages/core/theme/src/recipes/badge.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/badge.css`
- [ ] `index.ts` barrel exports `Badge`, `BadgeAnchor`, and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] All 4 variants (`solid`, `soft`, `outline`, `ghost`) implemented and verified
- [ ] All 5 color schemes (`primary`, `neutral`, `success`, `warning`, `danger`) implemented and verified
- [ ] All 3 sizes (`sm`, `md`, `lg`) implemented and verified
- [ ] All 4 anchor placements (`top-right`, `top-left`, `bottom-right`, `bottom-left`) implemented and verified
- [ ] `isDot=true` renders correct size circle, ignores `children` and `max`, sets `aria-hidden="true"`
- [ ] `max` prop renders `{max}+` when numeric `children` exceeds threshold
- [ ] `isInvisible=true` sets `opacity: 0; pointer-events: none` and `aria-hidden="true"`
- [ ] `BadgeAnchor` `offset` prop applies `badge-offset-x` / `badge-offset-y` CSS custom properties
- [ ] `compoundVariants` correctly apply color scheme per variant combination (20 rules)
- [ ] `resolveContent` utility handles number, numeric string, and non-numeric children correctly
- [ ] Count badges with text content are NOT `aria-hidden`
- [ ] Dot and invisible badges always have `aria-hidden="true"`
- [ ] `displayName` set on both sub-components (`IdeasUI.Badge`, `IdeasUI.BadgeAnchor`)
- [ ] `data-slot` attribute rendered on `badge`, `badge-anchor`, and `badge-wrapper`
- [ ] All semantic OKLCH colors used — no hardcoded colors or `dark:` prefixes
- [ ] `vitest-axe` accessibility tests pass with 0 violations (standalone count, standalone label, anchored, dot, invisible)
- [ ] `prefers-reduced-motion` suppression verified via `@ideasui/styles` global rule
- [ ] Storybook stories created (`Default`, `Variants`, `colors`, `Sizes`, `MaxCount`, `DotMode`, `Invisible`, `AnchoredPlacements`, `AnchoredDot`, `NotificationCounter`, `StatusLabels`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/badge.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly

# Divider Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Divider` (Single)
- **Package:** `@ideasui/divider`
- **Directory:** `packages/components/divider/`
- **Primary Exports:** `Divider`
- **Category:** Layout / Display
- **Recipe Location:** `packages/core/theme/src/recipes/divider.ts`

### Purpose

`Divider` is a fully accessible, theme-aware visual separator for IdeasUI applications. It renders a horizontal or vertical line that separates content sections, list items, or layout regions. It supports an optional **label** (text, icon, or any ReactNode) positioned at the start, center, or end of the line — enabling common patterns like "OR" separators, section headings, and decorative dividers.

Key Features:

- Two orientations: `horizontal` (default) and `vertical`
- Optional `label` — text, icon, or any `ReactNode` — with `labelPlacement` (`start`, `center`, `end`)
- Line style variants: `solid`, `dashed`, `dotted`
- Color schemes: `default`, `primary`, `neutral`, `success`, `warning`, `danger`
- Thickness scale: `sm`, `md`, `lg`
- `decorative` prop — marks the divider as purely visual (`role="none"`) vs semantic (`role="separator"`)
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- `data-slot` attributes for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/divider/
├── src/
│   ├── divider.tsx         ← Divider component
│   ├── divider.types.ts    ← Full TypeScript interfaces with JSDoc
│   └── index.ts            ← Barrel export (public API only)
├── __tests__/
│   └── divider.test.tsx    ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── divider.stories.tsx ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── divider.ts              ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── divider.css             ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/divider → @ideasui/theme, @ideasui/utils
@ideasui/react   → @ideasui/divider (re-export in master barrel)
```

> **Rule:** `@ideasui/divider` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Component Architecture

`Divider` is a **single, display-only component** — no context, no sub-components, no interactive state. When a `label` is provided, the component renders a three-part flex layout: `line — label — line`. Without a label it renders a single `<hr>` (horizontal) or a `<div>` with `role="separator"` (vertical).

### Slot Map

| Element      | `data-slot`     | Default Element  | Notes                                                             |
| ------------ | --------------- | ---------------- | ----------------------------------------------------------------- |
| Root         | `divider`       | `<hr>` / `<div>` | `<hr>` when horizontal + no label; `<div>` otherwise              |
| Line (start) | `divider-line`  | `<span>`         | Left/top line segment — only rendered when `label` is present     |
| Label        | `divider-label` | `<span>`         | The label content — text, icon, or ReactNode                      |
| Line (end)   | `divider-line`  | `<span>`         | Right/bottom line segment — only rendered when `label` is present |

### Anatomy

```
Without label (horizontal):
  <hr role="separator" aria-orientation="horizontal" />

Without label (vertical):
  <div role="separator" aria-orientation="vertical" />

With label (horizontal, center):
  <div role="separator" aria-orientation="horizontal">
    <span data-slot="divider-line" />   ← flex-1 line
    <span data-slot="divider-label" />  ← label content
    <span data-slot="divider-line" />   ← flex-1 line
  </div>

With label (horizontal, start):
  <div role="separator" aria-orientation="horizontal">
    <span data-slot="divider-label" />  ← label first
    <span data-slot="divider-line" />   ← flex-1 line
  </div>

With label (horizontal, end):
  <div role="separator" aria-orientation="horizontal">
    <span data-slot="divider-line" />   ← flex-1 line
    <span data-slot="divider-label" />  ← label last
  </div>
```

### Usage Patterns

```
Pattern 1 — Plain horizontal line
  <Divider />

Pattern 2 — Centered label ("OR" separator)
  <Divider label="OR" />

Pattern 3 — Section heading divider
  <Divider label="Personal Info" labelPlacement="start" />

Pattern 4 — Icon label
  <Divider label={<StarIcon />} />

Pattern 5 — Vertical separator (between inline elements)
  <Divider orientation="vertical" />

Pattern 6 — Decorative (no semantic meaning)
  <Divider decorative />
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import { Divider } from '@ideasui/react';

// Plain horizontal line (default)
<Divider />

// Centered text label — "OR" separator
<Divider label="OR" />

// Label placement: start
<Divider label="Personal Information" labelPlacement="start" />

// Label placement: end
<Divider label="See more" labelPlacement="end" />

// Icon label
<Divider label={<StarIcon aria-hidden="true" />} />

// ReactNode label — badge, chip, etc.
<Divider label={<Badge color="primary" variant="soft">New</Badge>} />

// Vertical orientation
<div className="flex items-center gap-4 h-8">
  <span>Home</span>
  <Divider orientation="vertical" />
  <span>About</span>
  <Divider orientation="vertical" />
  <span>Contact</span>
</div>

// Line style variants
<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />

// Color schemes
<Divider color="default" />
<Divider color="primary" />
<Divider color="neutral" />
<Divider color="success" />
<Divider color="warning" />
<Divider color="danger" />

// Thickness
<Divider thickness="sm" />
<Divider thickness="md" />
<Divider thickness="lg" />

// Decorative — no semantic role
<Divider decorative />

// Full example — section separator with label
<Divider
  label="OR continue with"
  labelPlacement="center"
  variant="dashed"
  color="neutral"
/>
```

### TypeScript Definition (`divider.types.ts`)

```tsx
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerColor = 'default' | 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type DividerThickness = 'sm' | 'md' | 'lg';
export type DividerLabelPlacement = 'start' | 'center' | 'end';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Orientation of the divider line.
   * @default 'horizontal'
   */
  readonly orientation?: DividerOrientation;

  /**
   * Visual style of the divider line.
   * @default 'solid'
   */
  readonly variant?: DividerVariant;

  /**
   * Color of the divider line.
   * @default 'default'
   */
  readonly color?: DividerColor;

  /**
   * Thickness of the divider line.
   * - `sm` → 1px
   * - `md` → 2px
   * - `lg` → 4px
   * @default 'sm'
   */
  readonly thickness?: DividerThickness;

  /**
   * Optional label rendered inside the divider.
   * Accepts a string, icon, or any ReactNode.
   * When provided, the divider renders as a flex container with
   * line segments on either side of the label.
   */
  readonly label?: ReactNode;

  /**
   * Placement of the label along the divider line.
   * Only applies when `label` is provided.
   * @default 'center'
   */
  readonly labelPlacement?: DividerLabelPlacement;

  /**
   * When `true`, the divider is purely decorative — `role="none"` is applied
   * and the element is hidden from assistive technologies.
   * When `false` (default), `role="separator"` is applied.
   * @default false
   */
  readonly decorative?: boolean;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/divider.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const divider = tv({
  slots: {
    root: 'flex items-center shrink-0',
    line: 'flex-1 border-0',
    label: 'shrink-0 px-3 text-sm text-content-secondary whitespace-nowrap',
  },

  variants: {
    orientation: {
      horizontal: {
        root: 'w-full flex-row',
        line: 'border-t',
      },
      vertical: {
        root: 'h-full flex-col self-stretch',
        line: 'border-l',
      },
    },

    variant: {
      solid: { line: '' },
      dashed: { line: 'border-dashed' },
      dotted: { line: 'border-dotted' },
    },

    color: {
      default: { line: 'border-border-default' },
      primary: { line: 'border-primary' },
      neutral: { line: 'border-neutral' },
      success: { line: 'border-success' },
      warning: { line: 'border-warning' },
      danger: { line: 'border-danger' },
    },

    thickness: {
      sm: { line: 'border-[1px]' },
      md: { line: 'border-[2px]' },
      lg: { line: 'border-[4px]' },
    },

    labelPlacement: {
      start: { root: 'justify-start' },
      center: { root: 'justify-center' },
      end: { root: 'justify-end' },
    },

    hasLabel: {
      true: {},
      false: { root: 'block' },
    },
  },

  compoundVariants: [
    // No label — root is a simple line, not a flex container
    {
      hasLabel: false,
      orientation: 'horizontal',
      class: { root: 'w-full border-t border-0 p-0 m-0' },
    },
    {
      hasLabel: false,
      orientation: 'vertical',
      class: { root: 'h-full border-l border-0 self-stretch' },
    },
  ],

  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    color: 'default',
    thickness: 'sm',
    labelPlacement: 'center',
    hasLabel: false,
  },
});

export type DividerVariants = VariantProps<typeof divider>;
export type DividerReturnType = ReturnType<typeof divider>;
```

---

## 6. Component Implementation

### Divider (`divider.tsx`)

```tsx
'use client';

import type { DividerProps } from './divider.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { divider as dividerRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export const Divider = forwardRef<HTMLElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      color = 'default',
      thickness = 'sm',
      label,
      labelPlacement = 'center',
      decorative = false,
      className,
      style,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const hasLabel = label !== undefined && label !== null && label !== '';
    const styles = dividerRecipe({
      orientation,
      variant,
      color,
      thickness,
      labelPlacement,
      hasLabel,
    });

    const ariaProps = decorative
      ? { role: 'none' as const, 'aria-hidden': 'true' as const }
      : { role: 'separator' as const, 'aria-orientation': orientation };

    // Without label — render semantic <hr> for horizontal, <div> for vertical
    if (!hasLabel) {
      const Tag = orientation === 'horizontal' ? 'hr' : 'div';
      return (
        <Tag
          ref={reference as any}
          className={cn(styles.root(), className)}
          data-slot="divider"
          data-orientation={orientation}
          style={style}
          {...ariaProps}
          {...(properties as any)}
        />
      );
    }

    // With label — render flex container with line segments
    const showStartLine = labelPlacement === 'center' || labelPlacement === 'end';
    const showEndLine = labelPlacement === 'center' || labelPlacement === 'start';

    return (
      <div
        ref={reference as React.Ref<HTMLDivElement>}
        className={cn(styles.root(), className)}
        data-slot="divider"
        data-orientation={orientation}
        style={style}
        {...ariaProps}
        {...(properties as React.HTMLAttributes<HTMLDivElement>)}
      >
        {showStartLine && (
          <span className={cn(styles.line())} data-slot="divider-line" aria-hidden="true" />
        )}
        <span className={cn(styles.label())} data-slot="divider-label">
          {label}
        </span>
        {showEndLine && (
          <span className={cn(styles.line())} data-slot="divider-line" aria-hidden="true" />
        )}
      </div>
    );
  },
);

Divider.displayName = 'IdeasUI.Divider';
```

### Barrel Export (`index.ts`)

```tsx
export { Divider } from './divider';

export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
  DividerColor,
  DividerThickness,
  DividerLabelPlacement,
} from './divider.types';
```

---

## 7. Standalone BEM CSS Specification (`packages/core/styles/src/components/divider.css`)

```css
/* ─── Root — no label ─────────────────────────────────────────── */
.ideasui-divider {
  display: block;
  flex-shrink: 0;
  border: 0;
  margin: 0;
  padding: 0;
}

/* Horizontal — no label */
.ideasui-divider[data-orientation='horizontal'] {
  width: 100%;
  border-top-style: solid;
}

/* Vertical — no label */
.ideasui-divider[data-orientation='vertical'] {
  height: 100%;
  align-self: stretch;
  border-left-style: solid;
}

/* ─── Root — with label ───────────────────────────────────────── */
.ideasui-divider--has-label {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.ideasui-divider--has-label[data-orientation='horizontal'] {
  width: 100%;
  flex-direction: row;
}
.ideasui-divider--has-label[data-orientation='vertical'] {
  height: 100%;
  flex-direction: column;
  align-self: stretch;
}

/* ─── Line segments ───────────────────────────────────────────── */
.ideasui-divider__line {
  flex: 1;
  border: 0;
}
.ideasui-divider--has-label[data-orientation='horizontal'] .ideasui-divider__line {
  border-top-style: solid;
}
.ideasui-divider--has-label[data-orientation='vertical'] .ideasui-divider__line {
  border-left-style: solid;
}

/* ─── Thickness ───────────────────────────────────────────────── */
.ideasui-divider--sm {
  border-width: 1px;
}
.ideasui-divider--md {
  border-width: 2px;
}
.ideasui-divider--lg {
  border-width: 4px;
}

.ideasui-divider__line--sm {
  border-width: 1px;
}
.ideasui-divider__line--md {
  border-width: 2px;
}
.ideasui-divider__line--lg {
  border-width: 4px;
}

/* ─── Line style variants ─────────────────────────────────────── */
.ideasui-divider--solid,
.ideasui-divider__line--solid {
  border-style: solid;
}
.ideasui-divider--dashed,
.ideasui-divider__line--dashed {
  border-style: dashed;
}
.ideasui-divider--dotted,
.ideasui-divider__line--dotted {
  border-style: dotted;
}

/* ─── Color: default ──────────────────────────────────────────── */
.ideasui-divider--default,
.ideasui-divider__line--default {
  border-color: oklch(var(--ideasui-color-border-default));
}

/* ─── Color: primary ──────────────────────────────────────────── */
.ideasui-divider--primary,
.ideasui-divider__line--primary {
  border-color: oklch(var(--ideasui-color-primary));
}

/* ─── Color: neutral ──────────────────────────────────────────── */
.ideasui-divider--neutral,
.ideasui-divider__line--neutral {
  border-color: oklch(var(--ideasui-color-neutral));
}

/* ─── Color: success ──────────────────────────────────────────── */
.ideasui-divider--success,
.ideasui-divider__line--success {
  border-color: oklch(var(--ideasui-color-success));
}

/* ─── Color: warning ──────────────────────────────────────────── */
.ideasui-divider--warning,
.ideasui-divider__line--warning {
  border-color: oklch(var(--ideasui-color-warning));
}

/* ─── Color: danger ───────────────────────────────────────────── */
.ideasui-divider--danger,
.ideasui-divider__line--danger {
  border-color: oklch(var(--ideasui-color-danger));
}

/* ─── Label ───────────────────────────────────────────────────── */
.ideasui-divider__label {
  flex-shrink: 0;
  padding: 0 0.75rem;
  font-size: var(--ideasui-font-size-sm);
  color: oklch(var(--ideasui-color-content-secondary));
  white-space: nowrap;
}

/* ─── Label placement ─────────────────────────────────────────── */
.ideasui-divider--label-start {
  justify-content: flex-start;
}
.ideasui-divider--label-center {
  justify-content: center;
}
.ideasui-divider--label-end {
  justify-content: flex-end;
}

/* prefers-reduced-motion — no transitions on Divider */
```

---

## 8. All Variants Reference

### Line Style Variants

| `variant`         | CSS `border-style` | Use case                                |
| ----------------- | ------------------ | --------------------------------------- |
| `solid` (default) | `solid`            | Standard section separator              |
| `dashed`          | `dashed`           | Softer visual separation, form sections |
| `dotted`          | `dotted`           | Decorative, subtle separation           |

### Color Schemes

| `color`             | Token                            | Use case                  |
| ------------------- | -------------------------------- | ------------------------- |
| `default` (default) | `--ideasui-color-border-default` | Standard neutral divider  |
| `primary`           | `--ideasui-color-primary`        | Branded section separator |
| `neutral`           | `--ideasui-color-neutral`        | Muted separator           |
| `success`           | `--ideasui-color-success`        | Positive section boundary |
| `warning`           | `--ideasui-color-warning`        | Caution zone separator    |
| `danger`            | `--ideasui-color-danger`         | Critical section boundary |

### Thickness

| `thickness`    | Border width | Use case                 |
| -------------- | ------------ | ------------------------ |
| `sm` (default) | 1px          | Standard — most common   |
| `md`           | 2px          | Emphasized section break |
| `lg`           | 4px          | Bold visual separator    |

### Orientation

| `orientation`          | Layout         | Element          | Use case                                           |
| ---------------------- | -------------- | ---------------- | -------------------------------------------------- |
| `horizontal` (default) | `width: 100%`  | `<hr>` / `<div>` | Between stacked content blocks                     |
| `vertical`             | `height: 100%` | `<div>`          | Between inline elements (nav links, toolbar items) |

### Label Placement

| `labelPlacement`   | Lines rendered                | Use case                             |
| ------------------ | ----------------------------- | ------------------------------------ |
| `center` (default) | start line + label + end line | "OR", "AND", decorative center label |
| `start`            | label + end line              | Section heading at start             |
| `end`              | start line + label            | "See more", trailing label           |

---

## 9. Behavior Rules

| Behavior                     | Rule                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| No `label` + horizontal      | Renders `<hr>` with `role="separator"` and `aria-orientation="horizontal"`                   |
| No `label` + vertical        | Renders `<div>` with `role="separator"` and `aria-orientation="vertical"`                    |
| `label` provided             | Renders `<div>` with flex layout; `<hr>` is NOT used (cannot contain children)               |
| `labelPlacement="center"`    | Both start and end line segments rendered                                                    |
| `labelPlacement="start"`     | Only end line segment rendered (label is first)                                              |
| `labelPlacement="end"`       | Only start line segment rendered (label is last)                                             |
| `decorative=true`            | `role="none"` + `aria-hidden="true"` — hidden from assistive technologies                    |
| `decorative=false` (default) | `role="separator"` + `aria-orientation` — announced by screen readers                        |
| Line segments `aria-hidden`  | Always `aria-hidden="true"` — purely visual, label carries the semantic meaning              |
| `label` string content       | Announced by screen readers as part of the separator context                                 |
| `label` icon/ReactNode       | Consumer must ensure icon has `aria-hidden="true"` and a surrounding text label if needed    |
| `orientation="vertical"`     | Parent must have explicit height or `align-self: stretch` context for the line to be visible |
| `displayName`                | `'IdeasUI.Divider'`                                                                          |
| `data-slot`                  | `divider` on root, `divider-line` on line segments, `divider-label` on label                 |

---

## 10. Divider vs HR — Decision Guide

| Concern                       | `Divider`                         | Native `<hr>`                  |
| ----------------------------- | --------------------------------- | ------------------------------ |
| **Label support**             | Yes — `label` prop with placement | No                             |
| **Vertical orientation**      | Yes — `orientation="vertical"`    | No                             |
| **Color / thickness / style** | Yes — via props                   | CSS only                       |
| **Decorative mode**           | Yes — `decorative` prop           | `role="presentation"` manually |
| **Design system tokens**      | Yes — OKLCH semantic tokens       | No                             |
| **Use case**                  | All divider needs in IdeasUI apps | Raw HTML only                  |

> **Rule:** Always use `Divider` inside IdeasUI applications. Use native `<hr>` only in non-IdeasUI contexts or markdown-rendered content.

---

## 11. Accessibility Requirements (WCAG 2.1 AA)

- **`role="separator"`**: Applied by default on all non-decorative dividers. Combined with `aria-orientation` (`"horizontal"` or `"vertical"`) so screen readers announce the separator correctly.
- **`decorative=true`**: Sets `role="none"` and `aria-hidden="true"`. Use for purely visual dividers that carry no semantic meaning (e.g. decorative lines between hero sections).
- **`<hr>` element**: Used for horizontal dividers without a label — `<hr>` has an implicit `role="separator"` in HTML, which is the most semantically correct element for this purpose.
- **Label accessibility**: When `label` is a string, it is announced as part of the separator. When `label` is an icon, the icon must carry `aria-hidden="true"` and the surrounding context must provide meaning. When `label` is a complex ReactNode, ensure it has appropriate accessible text.
- **Line segments `aria-hidden`**: The `<span>` line segments are always `aria-hidden="true"` — they are purely visual. Only the label and the separator role carry semantic meaning.
- **Vertical dividers**: Must be inside a flex or grid container with explicit height for the line to be visible. The `aria-orientation="vertical"` attribute is always set.
- **Contrast**: The `default` color token (`ideasui-color-border-default`) meets the 3:1 non-text contrast ratio requirement for UI components. Colored variants (`primary`, `danger`, etc.) use full-saturation OKLCH tokens that exceed 3:1.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Divider } from '../src';

it('plain horizontal divider has zero a11y violations', async () => {
  const { container } = render(<Divider />);
  expect(await axe(container)).toHaveNoViolations();
});

it('horizontal divider with label has zero a11y violations', async () => {
  const { container } = render(<Divider label="OR" />);
  expect(await axe(container)).toHaveNoViolations();
});

it('vertical divider has zero a11y violations', async () => {
  const { container } = render(
    <div style={{ display: 'flex', height: 32 }}>
      <Divider orientation="vertical" />
    </div>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('decorative divider has zero a11y violations', async () => {
  const { container } = render(<Divider decorative />);
  expect(await axe(container)).toHaveNoViolations();
});

it('divider with start label placement has zero a11y violations', async () => {
  const { container } = render(<Divider label="Section" labelPlacement="start" />);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 12. Storybook Stories (`divider.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../src';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Divider>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <p className="text-content-primary text-sm">Above the divider</p>
      <Divider />
      <p className="text-content-primary text-sm">Below the divider</p>
    </div>
  ),
};

// ── With Label (center) — OR separator ──────────────────────────
export const WithLabelCenter: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Divider label="OR" />
      <Divider label="AND" />
      <Divider label="continue with" />
    </div>
  ),
};

// ── Label Placements ────────────────────────────────────────────
export const LabelPlacements: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div>
        <p className="text-content-secondary mb-2 text-xs">start</p>
        <Divider label="Personal Information" labelPlacement="start" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs">center</p>
        <Divider label="OR" labelPlacement="center" />
      </div>
      <div>
        <p className="text-content-secondary mb-2 text-xs">end</p>
        <Divider label="See all" labelPlacement="end" />
      </div>
    </div>
  ),
};

// ── Line Style Variants ─────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      {(['solid', 'dashed', 'dotted'] as const).map((variant) => (
        <div key={variant}>
          <p className="text-content-secondary mb-2 text-xs">{variant}</p>
          <Divider variant={variant} label={variant} />
        </div>
      ))}
    </div>
  ),
};

// ── Color Schemes ───────────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      {(['default', 'primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
        <div key={color}>
          <p className="text-content-secondary mb-1 text-xs">{color}</p>
          <Divider color={color} label={color} />
        </div>
      ))}
    </div>
  ),
};

// ── Thickness ───────────────────────────────────────────────────
export const Thickness: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      {(['sm', 'md', 'lg'] as const).map((thickness) => (
        <div key={thickness}>
          <p className="text-content-secondary mb-2 text-xs">{thickness}</p>
          <Divider thickness={thickness} color="primary" />
        </div>
      ))}
    </div>
  ),
};

// ── Vertical ────────────────────────────────────────────────────
export const Vertical: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Between nav links */}
      <div className="flex h-6 items-center gap-3">
        <span className="text-content-primary text-sm">Home</span>
        <Divider orientation="vertical" />
        <span className="text-content-primary text-sm">About</span>
        <Divider orientation="vertical" />
        <span className="text-content-primary text-sm">Blog</span>
        <Divider orientation="vertical" />
        <span className="text-content-primary text-sm">Contact</span>
      </div>

      {/* Colored vertical */}
      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Divider orientation="vertical" color="primary" thickness="md" />
        <span className="text-sm">Right</span>
      </div>

      {/* Dashed vertical */}
      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Divider orientation="vertical" variant="dashed" />
        <span className="text-sm">Right</span>
      </div>
    </div>
  ),
};

// ── Decorative ──────────────────────────────────────────────────
export const Decorative: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <p className="text-content-primary text-sm">
        The divider below is decorative — hidden from screen readers.
      </p>
      <Divider decorative color="primary" variant="dashed" />
      <p className="text-content-primary text-sm">Content continues here.</p>
    </div>
  ),
};

// ── Icon Label ──────────────────────────────────────────────────
export const IconLabel: Story = {
  render: () => {
    const StarIcon = () => (
      <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6z" />
      </svg>
    );
    return (
      <div className="flex w-full max-w-md flex-col gap-6">
        <Divider label={<StarIcon />} />
        <Divider label={<StarIcon />} color="warning" />
        <Divider label={<StarIcon />} variant="dashed" color="primary" />
      </div>
    );
  },
};

// ── Form Section Pattern ─────────────────────────────────────────
export const FormSection: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="text-content-primary text-sm font-medium">Email</p>
        <div className="border-border-default bg-surface-default h-9 rounded-md border" />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-content-primary text-sm font-medium">Password</p>
        <div className="border-border-default bg-surface-default h-9 rounded-md border" />
      </div>
      <Divider label="OR continue with" />
      <div className="flex gap-3">
        <div className="border-border-default bg-surface-default h-9 flex-1 rounded-md border" />
        <div className="border-border-default bg-surface-default h-9 flex-1 rounded-md border" />
      </div>
    </div>
  ),
};

// ── All Variants Combined ───────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      {(['solid', 'dashed', 'dotted'] as const).map((variant) =>
        (['default', 'primary', 'danger'] as const).map((color) => (
          <Divider
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
            label={`${variant} / ${color}`}
          />
        )),
      )}
    </div>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    color: 'default',
    thickness: 'sm',
    label: 'OR',
    labelPlacement: 'center',
    decorative: false,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Divider {...args} />
    </div>
  ),
};
```

---

## 13. Definition of Done Checklist

- [ ] Package created at `packages/components/divider/`
- [ ] Recipe created at `packages/core/theme/src/recipes/divider.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/divider.css`
- [ ] `index.ts` barrel exports `Divider` and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] `orientation="horizontal"` without label renders `<hr>` with `role="separator"`
- [ ] `orientation="vertical"` without label renders `<div>` with `role="separator"` and `aria-orientation="vertical"`
- [ ] `label` provided renders `<div>` flex container — `<hr>` NOT used
- [ ] `labelPlacement="center"` renders start line + label + end line
- [ ] `labelPlacement="start"` renders label + end line only
- [ ] `labelPlacement="end"` renders start line + label only
- [ ] All 3 `variant` values (`solid`, `dashed`, `dotted`) implemented and verified
- [ ] All 6 `color` values (`default`, `primary`, `neutral`, `success`, `warning`, `danger`) implemented and verified
- [ ] All 3 `thickness` values (`sm`, `md`, `lg`) implemented and verified
- [ ] Both `orientation` values (`horizontal`, `vertical`) implemented and verified
- [ ] `decorative=true` sets `role="none"` and `aria-hidden="true"`
- [ ] `decorative=false` (default) sets `role="separator"` and `aria-orientation`
- [ ] Line segment `<span>` elements always have `aria-hidden="true"`
- [ ] `label` as string announced correctly by screen readers
- [ ] `label` as icon — consumer responsibility to add `aria-hidden="true"` on icon (documented)
- [ ] `displayName` set to `'IdeasUI.Divider'`
- [ ] `data-slot` rendered on `divider`, `divider-line`, `divider-label`
- [ ] All semantic OKLCH colors used — no hardcoded colors or `dark:` prefixes
- [ ] `vitest-axe` accessibility tests pass with 0 violations (plain, with label, vertical, decorative, start placement)
- [ ] Storybook stories created (`Default`, `WithLabelCenter`, `LabelPlacements`, `Variants`, `Colors`, `Thickness`, `Vertical`, `Decorative`, `IconLabel`, `FormSection`, `AllVariants`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/divider.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly

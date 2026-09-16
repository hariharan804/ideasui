# Text Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Text`
- **Package:** `@ideasui/text`
- **Directory:** `packages/components/text/`
- **Primary Export:** `Text`
- **Category:** Typography / Foundation
- **Recipe Location:** `packages/core/theme/src/recipes/text.ts`
- **Standalone CSS:** `packages/core/styles/src/components/text.css`

### Purpose

The `Text` component provides a consistent, high-performance, theme-aware primitive for rendering typography across IdeasUI applications. It bridges React Aria accessibility primitives, Tailwind CSS v4 recipes, and IdeasUI OKLCH design tokens.

Key Features:

- Polymorphic element rendering (`as` prop with semantic default `'p'`)
- Semantic typography variants (`body`, `label`, `caption`, `overline`, `code`, `lead`)
- Design token font size scale (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`)
- Font weight control (`regular`, `medium`, `semibold`, `bold`)
- Semantic content colors (`primary`, `secondary`, `tertiary`, `muted`, `inverse`, `success`, `warning`, `danger`, `info`)
- Logical alignment (`start`, `center`, `end`, `justify`) for native RTL support
- Truncation (`truncate`) and line clamping (`lineClamp`)
- React Aria `react-aria-components` slot primitive integration (`slot?: string | null`)
- Context inheritance via `TextContext` for compound slot composition
- Zero-violation WCAG 2.1 AA accessibility

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```text
packages/components/text/
├── src/
│   ├── text.tsx            ← Main component (forwardRef, displayName, slots, context)
│   ├── text-context.ts     ← TextContext for parent-child slot inheritance
│   ├── text.types.ts       ← Full TypeScript interfaces with detailed JSDoc
│   └── index.ts            ← Barrel export (public API only)
├── __tests__/
│   └── text.test.tsx       ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── text.stories.tsx    ← Storybook 10 stories
├── package.json            ← Monorepo package configuration
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── text.ts                 ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── text.css                ← Standalone BEM CSS rules
```

### Dependency Flow

```text
@ideasui/text → @ideasui/theme, @ideasui/utils, react-aria-components
@ideasui/react → @ideasui/text (re-export in master barrel)
```

> **Rule:** `@ideasui/text` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Component API & Props Specification

### Public API Usage

```tsx
import { Text } from '@ideasui/react';

// Basic paragraph usage
<Text
  as="p"
  variant="body"
  size="md"
  weight="regular"
  color="primary"
  align="start"
  truncate
>
  Empowering developers with IdeasUI typography.
</Text>

// React Aria Slot integration inside a Card or Field
<Text slot="description" color="secondary" size="sm">
  Helper description text automatically targeted by parent slot.
</Text>
```

### TypeScript Definition (`text.types.ts`)

```ts
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import type { TextReturnType } from '@ideasui/theme/recipes';

export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'strong'
  | 'em'
  | 'small'
  | 'code'
  | 'blockquote'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export type TextVariant = 'body' | 'label' | 'caption' | 'overline' | 'code' | 'lead';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'muted'
  | 'inverse'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type TextAlign = 'start' | 'center' | 'end' | 'justify';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /**
   * The underlying HTML element or React component to render.
   * @default 'p'
   */
  readonly as?: ElementType;

  /**
   * Typographic intent variant.
   * @default 'body'
   */
  readonly variant?: TextVariant;

  /**
   * Font size scale corresponding to design tokens.
   * @default 'md'
   */
  readonly size?: TextSize;

  /**
   * Font weight setting.
   * @default 'regular'
   */
  readonly weight?: TextWeight;

  /**
   * Semantic OKLCH content color token.
   * @default 'primary'
   */
  readonly color?: TextColor;

  /**
   * Text alignment using logical properties (start/end for RTL compatibility).
   * @default 'start'
   */
  readonly align?: TextAlign;

  /**
   * Truncate overflowing text on a single line with ellipsis.
   * @default false
   */
  readonly truncate?: boolean;

  /**
   * Maximum number of lines to display before truncating.
   */
  readonly lineClamp?: number;

  /**
   * React Aria component slot identifier (e.g., 'description', 'label', 'title').
   */
  readonly slot?: string | null;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Children content to render inside the text element.
   */
  readonly children?: ReactNode;
}

export interface TextContextValue extends TextProps {
  readonly styles?: TextReturnType;
}
```

---

## 4. Design Tokens & Recipe (`packages/core/theme/src/recipes/text.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```ts
import { tv, type VariantProps } from 'tailwind-variants';

export const text = tv({
  base: ['text-content-primary', 'transition-colors', 'duration-150'],

  variants: {
    variant: {
      body: 'leading-relaxed',
      label: 'font-medium tracking-tight',
      caption: 'text-content-tertiary text-xs leading-normal',
      overline: 'text-content-tertiary text-[10px] font-bold tracking-widest uppercase',
      code: 'font-mono text-xs bg-surface-muted px-1.5 py-0.5 rounded-md',
      lead: 'text-lg font-normal leading-relaxed sm:text-xl',
    },

    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },

    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },

    color: {
      primary: 'text-content-primary',
      secondary: 'text-content-secondary',
      tertiary: 'text-content-tertiary',
      muted: 'text-content-muted',
      inverse: 'text-content-inverse',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      info: 'text-info',
    },

    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      justify: 'text-justify',
    },

    truncate: {
      true: 'truncate',
    },
  },

  defaultVariants: {
    variant: 'body',
    size: 'md',
    weight: 'regular',
    color: 'primary',
    align: 'start',
    truncate: false,
  },
});

export type TextVariants = VariantProps<typeof text>;
export type TextReturnType = ReturnType<typeof text>;
```

---

## 5. React Aria Slot Primitive & Context Integration

To support React Aria component slot composition (`react-aria-components` `Text` primitive & `useContextProps`), `Text` supports `TextContext`:

### Context Definition (`packages/components/text/src/text-context.ts`)

```ts
import type { TextContextValue } from './text.types';
import { createContext, useContext } from 'react';

export const TextContext = createContext<TextContextValue | null>(null);

export function useTextContext(): TextContextValue | null {
  return useContext(TextContext);
}
```

---

## 6. Component Implementation (`packages/components/text/src/text.tsx`)

Following canonical IdeasUI component rules (`React.forwardRef`, `displayName = 'IdeasUI.Text'`, `cn()` integration, React Aria slot support, and `data-slot="text"`):

````tsx
'use client';

import type { TextProps } from './text.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { text } from '@ideasui/theme/recipes';
import { cn, mergePropsWithContext } from '@ideasui/utils';
import { useTextContext } from './text-context';

/**
 * Text renders a theme-aware, semantic typography primitive with slot inheritance and responsive variant control.
 *
 * @example
 * ```tsx
 * <Text variant="body" size="md" color="primary">
 *   Hello IdeasUI
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>((rawProps, reference): JSX.Element => {
  const contextProps = useTextContext();
  const {
    as: Component = 'p',
    variant,
    size,
    weight,
    color,
    align,
    truncate = false,
    lineClamp,
    slot,
    className,
    style,
    children,
    ...properties
  } = mergePropsWithContext(rawProps, contextProps);

  const computedStyle = lineClamp
    ? {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical' as const,
        WebkitLineClamp: lineClamp,
        overflow: 'hidden',
        ...style,
      }
    : style;

  return (
    <Component
      ref={reference}
      className={cn(
        text({
          variant,
          size,
          weight,
          color,
          align,
          truncate,
        }),
        className,
      )}
      data-slot={slot ?? 'text'}
      slot={slot ?? undefined}
      style={computedStyle}
      {...properties}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'IdeasUI.Text';
````

---

## 7. Standalone BEM CSS Specification (`packages/core/styles/src/components/text.css`)

For standalone CSS usage (without Tailwind), `@ideasui/styles` exports BEM modifiers mapping to OKLCH custom properties:

```css
.ideasui-text {
  color: oklch(var(--ideasui-color-content-primary));
  transition: color 150ms ease;
}

/* Sizes */
.ideasui-text--xs {
  font-size: var(--ideasui-font-size-xs);
}
.ideasui-text--sm {
  font-size: var(--ideasui-font-size-sm);
}
.ideasui-text--md {
  font-size: var(--ideasui-font-size-base);
}
.ideasui-text--lg {
  font-size: var(--ideasui-font-size-lg);
}
.ideasui-text--xl {
  font-size: var(--ideasui-font-size-xl);
}

/* Colors */
.ideasui-text--primary {
  color: oklch(var(--ideasui-color-content-primary));
}
.ideasui-text--secondary {
  color: oklch(var(--ideasui-color-content-secondary));
}
.ideasui-text--tertiary {
  color: oklch(var(--ideasui-color-content-tertiary));
}
.ideasui-text--muted {
  color: oklch(var(--ideasui-color-content-muted));
}
.ideasui-text--inverse {
  color: oklch(var(--ideasui-color-content-inverse));
}
.ideasui-text--success {
  color: oklch(var(--ideasui-color-success));
}
.ideasui-text--warning {
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-text--danger {
  color: oklch(var(--ideasui-color-danger));
}
.ideasui-text--info {
  color: oklch(var(--ideasui-color-info));
}

/* Truncation */
.ideasui-text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

---

## 8. Typography System Boundaries (`Text` vs `Heading`)

| Feature                | `Text`                                         | `Heading`                                  |
| ---------------------- | ---------------------------------------------- | ------------------------------------------ |
| **Primary Focus**      | Paragraphs, labels, captions, overlines, code  | Page & section headings (`<h1>`–`<h6>`)    |
| **Default Element**    | `<p>` (customizable via `as`)                  | `<h2>` (customizable via `level` / `as`)   |
| **Role in Layout**     | Body copy, secondary text, helper descriptions | Document outline & screen reader landmarks |
| **Slot Compatibility** | `slot="description"`, `slot="label"`           | `slot="title"`, `slot="header"`            |

---

## 9. Accessibility Requirements (WCAG 2.1 AA)

- **Semantic HTML**: Renders true semantic elements (`<p>`, `<span>`, `<label>`, `<code>`, `<h1>`–`<h6>`).
- **Logical Alignment**: Uses `text-start` and `text-end` for seamless RTL (Right-to-Left) rendering.
- **Contrast Ratios**: Color tokens (`text-content-primary`, `text-content-secondary`, etc.) map to OKLCH variables designed to meet or exceed 4.5:1 contrast in light and dark modes.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Text } from '../src';

it('should have zero accessibility violations', async () => {
  const { container } = render(<Text>Accessible Typography</Text>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 10. Definition of Done Checklist

- [ ] Package created at `packages/components/text/`
- [ ] Recipe created at `packages/core/theme/src/recipes/text.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/text.css`
- [ ] Exported through `@ideasui/react` master barrel
- [ ] Polymorphic `as` prop works with semantic defaults
- [ ] React Aria `slot?: string | null` integration verified
- [ ] `TextContext` and `useTextContext` hook exported for slot composition
- [ ] All typography variants, sizes, weights, and alignment properties implemented
- [ ] All semantic OKLCH colors supported (no hardcoded colors or `dark:` prefixes)
- [ ] Truncation (`truncate`) and multi-line clamping (`lineClamp`) verified
- [ ] `displayName` set to `'IdeasUI.Text'`
- [ ] `data-slot="text"` / `data-slot={slot}` attribute rendered
- [ ] `vitest-axe` accessibility tests pass with 0 violations
- [ ] Storybook stories created (`Basic`, `Variants`, `Colors`, `Sizes`, `Slots`, `Truncate`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/text.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly

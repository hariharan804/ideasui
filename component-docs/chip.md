# Chip Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Chip` (Compound)
- **Package:** `@ideasui/chip`
- **Directory:** `packages/components/chip/`
- **Primary Exports:** `Chip`, `ChipGroup`, `ChipAvatar`, `ChipIcon`, `ChipDismiss`
- **Category:** Display / Selection
- **Recipe Location:** `packages/core/theme/src/recipes/chip.ts`

### Purpose

`Chip` is a fully accessible, theme-aware compact element for IdeasUI applications. It represents tags, filters, selections, statuses, or dismissible items. It supports three interaction modes — `static` (display only), `selectable` (toggle on/off), and `dismissible` (removable) — along with avatar/icon slots, all visual variants, color schemes, and sizes. `ChipGroup` manages multi-chip selection state with controlled and uncontrolled patterns.

Key Features:

- Compound component architecture (`Chip`, `ChipGroup`, `ChipAvatar`, `ChipIcon`, `ChipDismiss`)
- Three interaction modes: `static`, `selectable`, `dismissible`
- Context inheritance via `ChipGroupContext` for shared `size`, `variant`, `color`, `isDisabled` state
- Visual variants (`solid`, `soft`, `outline`, `ghost`)
- Color schemes (`primary`, `neutral`, `success`, `warning`, `danger`)
- Size scale (`sm`, `md`, `lg`)
- `startContent` / `endContent` adornment slots (icon, avatar)
- Built-in `ChipAvatar` sub-component with image + fallback initials
- Built-in `ChipDismiss` sub-component with accessible dismiss button
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- Controlled and uncontrolled selection via `isSelected` / `defaultSelected` / `onChange`
- Full keyboard navigation and screen reader support (WCAG 2.1 AA)
- `isDisabled` state prop propagated via context
- `data-slot` attributes on every sub-component for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/chip/
├── src/
│   ├── chip.tsx              ← Single chip (context consumer)
│   ├── chip-group.tsx        ← Group root (context provider)
│   ├── chip-avatar.tsx       ← Avatar sub-component (image + initials fallback)
│   ├── chip-icon.tsx         ← Icon wrapper sub-component
│   ├── chip-dismiss.tsx      ← Dismiss button sub-component
│   ├── chip-context.ts       ← ChipGroupContext + hooks
│   ├── chip.types.ts         ← Full TypeScript interfaces with JSDoc
│   └── index.ts              ← Barrel export (public API only)
├── __tests__/
│   └── chip.test.tsx         ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── chip.stories.tsx      ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── chip.ts                   ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── chip.css                  ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/chip  → @ideasui/theme, @ideasui/utils, react-aria-components
@ideasui/react → @ideasui/chip (re-export in master barrel)
```

> **Rule:** `@ideasui/chip` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Compound Component Architecture

`ChipGroup` is the **compound root** for multi-chip selection. `Chip` can also be used fully standalone in any mode.

### Slot Map

| Sub-Component | `data-slot`    | Default Element       | Notes                                         |
| ------------- | -------------- | --------------------- | --------------------------------------------- |
| `ChipGroup`   | `chip-group`   | `<div>`               | Context provider                              |
| `Chip`        | `chip`         | `<span>` / `<button>` | `<button>` when `selectable` or `dismissible` |
| `ChipAvatar`  | `chip-avatar`  | `<span>`              | Image + initials fallback                     |
| `ChipIcon`    | `chip-icon`    | `<span>`              | Icon wrapper, `aria-hidden`                   |
| `ChipDismiss` | `chip-dismiss` | `<button>`            | Always a focusable `<button>`                 |

### Anatomy

```
ChipGroup (root — context provider, manages selection state)
└── Chip[] (one or more chips)
    ├── startContent          (optional — ChipAvatar, ChipIcon, or any ReactNode)
    ├── chip-label            (visible text content)
    └── endContent            (optional — ChipDismiss or any ReactNode)

Chip (standalone — no group required)
├── startContent              (optional)
├── chip-label                (visible text)
└── endContent                (optional — ChipDismiss)
```

### Interaction Modes

| Mode          | Root element                              | Keyboard                                                  | Selection         |
| ------------- | ----------------------------------------- | --------------------------------------------------------- | ----------------- |
| `static`      | `<span>`                                  | Not focusable                                             | None              |
| `selectable`  | `<button>`                                | `Space` / `Enter` toggles                                 | `aria-pressed`    |
| `dismissible` | `<span>` + inner `<button>` (ChipDismiss) | `Delete` / `Backspace` on chip, `Enter` on dismiss button | Fires `onDismiss` |

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import {
  Chip,
  ChipGroup,
  ChipAvatar,
  ChipIcon,
  ChipDismiss,
} from '@ideasui/react';

// Static chip (display only)
<Chip>React</Chip>

// Selectable chip (standalone)
<Chip mode="selectable" defaultSelected>TypeScript</Chip>

// Controlled selectable
<Chip mode="selectable" isSelected={active} onChange={setActive}>
  Dark mode
</Chip>

// Dismissible chip
<Chip mode="dismissible" onDismiss={() => removeTag('react')}>
  React
</Chip>

// With avatar
<Chip startContent={<ChipAvatar src="/avatar.jpg" name="Jane Doe" />}>
  Jane Doe
</Chip>

// With icon
<Chip startContent={<ChipIcon><StarIcon /></ChipIcon>} color="warning">
  Featured
</Chip>

// With built-in dismiss button
<Chip
  mode="dismissible"
  startContent={<ChipAvatar name="John" />}
  onDismiss={() => remove('john')}
>
  John
</Chip>

// All variants
<Chip variant="solid"   color="primary">Solid</Chip>
<Chip variant="soft"    color="success">Soft</Chip>
<Chip variant="outline" color="warning">Outline</Chip>
<Chip variant="ghost"   color="danger">Ghost</Chip>

// Selectable group (filter chips)
<ChipGroup
  selectionMode="multiple"
  value={filters}
  onChange={setFilters}
>
  <Chip value="react">React</Chip>
  <Chip value="vue">Vue</Chip>
  <Chip value="angular">Angular</Chip>
  <Chip value="svelte">Svelte</Chip>
</ChipGroup>

// Single-select group
<ChipGroup selectionMode="single" defaultValue={['md']}>
  <Chip value="sm">Small</Chip>
  <Chip value="md">Medium</Chip>
  <Chip value="lg">Large</Chip>
</ChipGroup>
```

### TypeScript Definition (`chip.types.ts`)

```tsx
import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { ChipReturnType } from '@ideasui/theme/recipes';

export type ChipVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type Chipcolor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipMode = 'static' | 'selectable' | 'dismissible';
export type ChipSelectionMode = 'single' | 'multiple';

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Interaction mode of the chip.
   * - `static`      — display only, not interactive
   * - `selectable`  — toggleable, renders as `<button>` with `aria-pressed`
   * - `dismissible` — removable, renders label as `<span>` with a `ChipDismiss` button
   * @default 'static'
   */
  readonly mode?: ChipMode;

  /**
   * Visual style variant.
   * @default 'soft'
   */
  readonly variant?: ChipVariant;

  /**
   * Color scheme of the chip.
   * @default 'neutral'
   */
  readonly color?: Chipcolor;

  /**
   * Size scale of the chip.
   * @default 'md'
   */
  readonly size?: ChipSize;

  /**
   * Controlled selected state. Only applies when `mode="selectable"`.
   */
  readonly isSelected?: boolean;

  /**
   * Uncontrolled default selected state. Only applies when `mode="selectable"`.
   * @default false
   */
  readonly defaultSelected?: boolean;

  /**
   * Marks the chip as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Value used when inside a ChipGroup.
   */
  readonly value?: string;

  /**
   * Change handler for selectable mode — receives the new boolean selected state.
   */
  readonly onChange?: (isSelected: boolean) => void;

  /**
   * Dismiss handler for dismissible mode — called when the dismiss button is activated.
   */
  readonly onDismiss?: () => void;

  /**
   * Accessible label for the dismiss button. Defaults to `"Remove {children}"`.
   */
  readonly dismissLabel?: string;

  /**
   * Element rendered before the label (e.g. ChipAvatar, ChipIcon).
   */
  readonly startContent?: ReactNode;

  /**
   * Element rendered after the label (e.g. ChipDismiss, custom icon).
   */
  readonly endContent?: ReactNode;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;

  /**
   * Visible label text.
   */
  readonly children?: ReactNode;
}

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Selection mode of the group.
   * - `single`   — only one chip can be selected at a time
   * - `multiple` — multiple chips can be selected simultaneously
   * @default 'multiple'
   */
  readonly selectionMode?: ChipSelectionMode;

  /**
   * Controlled array of selected values.
   */
  readonly value?: string[];

  /**
   * Uncontrolled default selected values.
   */
  readonly defaultValue?: string[];

  /**
   * Change handler — receives the new array of selected values.
   */
  readonly onChange?: (value: string[]) => void;

  /**
   * Visual style variant propagated to all child Chips.
   * @default 'soft'
   */
  readonly variant?: ChipVariant;

  /**
   * Color scheme propagated to all child Chips.
   * @default 'neutral'
   */
  readonly color?: Chipcolor;

  /**
   * Size scale propagated to all child Chips.
   * @default 'md'
   */
  readonly size?: ChipSize;

  /**
   * Marks all chips in the group as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Accessible label for the chip group (used as `aria-label`).
   */
  readonly label?: string;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * Child Chip components.
   */
  readonly children: ReactNode;
}

export interface ChipAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Image source URL.
   */
  readonly src?: string;

  /**
   * Full name used to generate initials fallback.
   */
  readonly name?: string;

  /**
   * Alt text for the image. Defaults to `name` if provided.
   */
  readonly alt?: string;

  readonly className?: string;
}

export interface ChipIconProps extends HTMLAttributes<HTMLSpanElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface ChipDismissProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible label for the dismiss button.
   */
  readonly label?: string;

  readonly className?: string;
}

export interface ChipGroupContextValue {
  readonly selectionMode?: ChipSelectionMode;
  readonly variant?: ChipVariant;
  readonly color?: Chipcolor;
  readonly size?: ChipSize;
  readonly isDisabled?: boolean;
  readonly selectedValues?: string[];
  readonly onGroupChange?: (value: string, selected: boolean) => void;
  readonly styles?: ChipReturnType;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/chip.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const chip = tv({
  slots: {
    root: [
      'inline-flex items-center gap-1 max-w-full',
      'font-medium leading-none whitespace-nowrap',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1',
    ],
    label: 'truncate',
    startContent: 'flex items-center shrink-0',
    endContent: 'flex items-center shrink-0',
    avatar: [
      'inline-flex items-center justify-center shrink-0',
      'rounded-full overflow-hidden bg-surface-muted',
      'text-content-secondary font-semibold uppercase',
    ],
    avatarImage: 'w-full h-full object-cover',
    icon: 'flex items-center shrink-0 text-current',
    dismiss: [
      'inline-flex items-center justify-center shrink-0',
      'rounded-full cursor-pointer',
      'text-current opacity-60',
      'hover:opacity-100 hover:bg-black/10',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current',
      'transition-opacity duration-100',
    ],
  },

  variants: {
    variant: {
      solid: {
        root: 'bg-primary text-white border border-transparent',
      },
      soft: {
        root: 'bg-primary-subtle text-primary border border-transparent',
      },
      outline: {
        root: 'bg-transparent text-primary border border-primary',
      },
      ghost: {
        root: 'bg-transparent text-primary border border-transparent hover:bg-primary-subtle',
      },
    },

    color: {
      primary: {
        root: '',
      },
      neutral: {
        root: '',
      },
      success: {
        root: '',
      },
      warning: {
        root: '',
      },
      danger: {
        root: '',
      },
    },

    size: {
      sm: {
        root: 'h-5 px-2 text-xs rounded-full gap-0.5',
        avatar: 'size-3.5 text-[8px]',
        icon: 'size-3',
        dismiss: 'size-3',
      },
      md: {
        root: 'h-6 px-2.5 text-xs rounded-full gap-1',
        avatar: 'size-4 text-[9px]',
        icon: 'size-3.5',
        dismiss: 'size-3.5',
      },
      lg: {
        root: 'h-8 px-3 text-sm rounded-full gap-1.5',
        avatar: 'size-5 text-[10px]',
        icon: 'size-4',
        dismiss: 'size-4',
      },
    },

    mode: {
      static: { root: 'cursor-default' },
      selectable: { root: 'cursor-pointer select-none' },
      dismissible: { root: 'cursor-default' },
    },

    isSelected: {
      true: {},
    },

    isDisabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed pointer-events-none',
        dismiss: 'pointer-events-none',
      },
    },
  },

  compoundVariants: [
    // solid + color
    { variant: 'solid', color: 'primary', class: { root: 'bg-primary text-white' } },
    { variant: 'solid', color: 'neutral', class: { root: 'bg-neutral text-white' } },
    { variant: 'solid', color: 'success', class: { root: 'bg-success text-white' } },
    { variant: 'solid', color: 'warning', class: { root: 'bg-warning text-white' } },
    { variant: 'solid', color: 'danger', class: { root: 'bg-danger text-white' } },

    // soft + color
    { variant: 'soft', color: 'primary', class: { root: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'neutral', class: { root: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'success', class: { root: 'bg-success-subtle text-success' } },
    { variant: 'soft', color: 'warning', class: { root: 'bg-warning-subtle text-warning' } },
    { variant: 'soft', color: 'danger', class: { root: 'bg-danger-subtle text-danger' } },

    // outline + color
    { variant: 'outline', color: 'primary', class: { root: 'border-primary text-primary' } },
    { variant: 'outline', color: 'neutral', class: { root: 'border-neutral text-neutral' } },
    { variant: 'outline', color: 'success', class: { root: 'border-success text-success' } },
    { variant: 'outline', color: 'warning', class: { root: 'border-warning text-warning' } },
    { variant: 'outline', color: 'danger', class: { root: 'border-danger text-danger' } },

    // ghost + color
    { variant: 'ghost', color: 'primary', class: { root: 'text-primary hover:bg-primary-subtle' } },
    { variant: 'ghost', color: 'neutral', class: { root: 'text-neutral hover:bg-neutral-subtle' } },
    { variant: 'ghost', color: 'success', class: { root: 'text-success hover:bg-success-subtle' } },
    { variant: 'ghost', color: 'warning', class: { root: 'text-warning hover:bg-warning-subtle' } },
    { variant: 'ghost', color: 'danger', class: { root: 'text-danger hover:bg-danger-subtle' } },

    // selectable — selected state ring
    {
      mode: 'selectable',
      isSelected: true,
      class: { root: 'ring-2 ring-current ring-offset-1' },
    },
  ],

  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
    size: 'md',
    mode: 'static',
    isSelected: false,
    isDisabled: false,
  },
});

export const chipGroup = tv({
  slots: {
    root: 'flex flex-wrap gap-2',
  },
  variants: {
    isDisabled: {
      true: { root: 'opacity-50 pointer-events-none' },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export type ChipVariants = VariantProps<typeof chip>;
export type ChipGroupVariants = VariantProps<typeof chipGroup>;
export type ChipReturnType = ReturnType<typeof chip>;
export type ChipGroupReturnType = ReturnType<typeof chipGroup>;
```

---

## 6. Context Definition (`packages/components/chip/src/chip-context.ts`)

`ChipGroup` uses **native React context** for shared state propagation across child `Chip` components.

> **Rule:** Do NOT replace `useContext` with `useContextProps` here. React Aria slot wiring is handled by passing `slot` props directly to sub-component DOM elements.

```tsx
import type { ChipGroupContextValue } from './chip.types';
import { createContext, useContext } from 'react';

export const ChipGroupContext = createContext<ChipGroupContextValue | null>(null);

export function useChipGroupContext(): ChipGroupContextValue | null {
  return useContext(ChipGroupContext);
}

export function useRequiredChipGroupContext(): ChipGroupContextValue {
  const context = useContext(ChipGroupContext);
  if (!context) {
    throw new Error('useRequiredChipGroupContext must be used within a <ChipGroup> component.');
  }
  return context;
}
```

> `Chip` calls `useChipGroupContext()` (nullable) so it works both standalone and inside a group.

---

## 7. Component Implementation

### Root Group (`chip-group.tsx`)

```tsx
'use client';

import type { ChipGroupProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef, useState, useCallback } from 'react';
import { chipGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { ChipGroupContext } from './chip-context';

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      selectionMode = 'multiple',
      value,
      defaultValue = [],
      onChange,
      variant = 'soft',
      color = 'neutral',
      size = 'md',
      isDisabled = false,
      label,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const selectedValues = value ?? internalValue;

    const groupStyles = chipGroup({ isDisabled });

    const onGroupChange = useCallback(
      (itemValue: string, selected: boolean) => {
        let next: string[];
        if (selectionMode === 'single') {
          next = selected ? [itemValue] : [];
        } else {
          next = selected
            ? [...selectedValues, itemValue]
            : selectedValues.filter((v) => v !== itemValue);
        }
        if (!value) setInternalValue(next);
        onChange?.(next);
      },
      [selectionMode, selectedValues, value, onChange],
    );

    return (
      <ChipGroupContext.Provider
        value={{ selectionMode, variant, color, size, isDisabled, selectedValues, onGroupChange }}
      >
        <div
          ref={reference}
          className={cn(groupStyles.root(), className)}
          data-slot="chip-group"
          data-disabled={isDisabled || undefined}
          role="group"
          aria-label={label}
          style={style}
          {...properties}
        >
          {children}
        </div>
      </ChipGroupContext.Provider>
    );
  },
);

ChipGroup.displayName = 'IdeasUI.ChipGroup';
```

### Chip (`chip.tsx`)

```tsx
'use client';

import type { ChipProps } from './chip.types';
import type { JSX, KeyboardEvent } from 'react';

import { forwardRef, useState } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useChipGroupContext } from './chip-context';
import { ChipDismiss } from './chip-dismiss';

export const Chip = forwardRef<HTMLElement, ChipProps>(
  (
    {
      mode,
      variant,
      color,
      size,
      isSelected,
      defaultSelected = false,
      isDisabled,
      value,
      onChange,
      onDismiss,
      dismissLabel,
      startContent,
      endContent,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const group = useChipGroupContext();

    // Merge group context — local props take precedence
    const resolvedVariant = variant ?? group?.variant ?? 'soft';
    const resolvedcolor = color ?? group?.color ?? 'neutral';
    const resolvedSize = size ?? group?.size ?? 'md';
    const resolvedDisabled = isDisabled ?? group?.isDisabled ?? false;

    // Resolve mode: if inside a group, default to selectable
    const resolvedMode = mode ?? (group !== null ? 'selectable' : 'static');

    // Determine selected state
    const isGroupControlled = group !== null && value !== undefined;
    const [internalSelected, setInternalSelected] = useState(defaultSelected);
    const resolvedSelected = isGroupControlled
      ? (group?.selectedValues?.includes(value!) ?? false)
      : (isSelected ?? internalSelected);

    const handleSelect = () => {
      if (resolvedDisabled || resolvedMode !== 'selectable') return;
      const next = !resolvedSelected;
      if (isGroupControlled) {
        group?.onGroupChange?.(value!, next);
      } else if (isSelected === undefined) {
        setInternalSelected(next);
        onChange?.(next);
      } else {
        onChange?.(next);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      if (resolvedMode === 'dismissible' && (event.key === 'Delete' || event.key === 'Backspace')) {
        event.preventDefault();
        onDismiss?.();
      }
    };

    const styles = chipRecipe({
      variant: resolvedVariant,
      color: resolvedcolor,
      size: resolvedSize,
      mode: resolvedMode,
      isSelected: resolvedSelected,
      isDisabled: resolvedDisabled,
    });

    const sharedProps = {
      className: cn(styles.root(), className),
      'data-slot': 'chip' as const,
      'data-selected': resolvedSelected || undefined,
      'data-disabled': resolvedDisabled || undefined,
      'data-mode': resolvedMode,
      style,
      onKeyDown: handleKeyDown,
    };

    const content = (
      <>
        {startContent && (
          <span className={cn(styles.startContent())} data-slot="chip-start-content">
            {startContent}
          </span>
        )}
        <span className={cn(styles.label())} data-slot="chip-label">
          {children}
        </span>
        {endContent && (
          <span className={cn(styles.endContent())} data-slot="chip-end-content">
            {endContent}
          </span>
        )}
        {resolvedMode === 'dismissible' && !endContent && onDismiss && (
          <ChipDismiss
            label={dismissLabel ?? (typeof children === 'string' ? `Remove ${children}` : 'Remove')}
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className={cn(styles.dismiss())}
          />
        )}
      </>
    );

    if (resolvedMode === 'selectable') {
      return (
        <button
          ref={reference as React.Ref<HTMLButtonElement>}
          type="button"
          aria-pressed={resolvedSelected}
          disabled={resolvedDisabled}
          onClick={handleSelect}
          {...sharedProps}
          {...(properties as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <span
        ref={reference as React.Ref<HTMLSpanElement>}
        tabIndex={resolvedMode === 'dismissible' ? 0 : undefined}
        {...sharedProps}
        {...(properties as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {content}
      </span>
    );
  },
);

Chip.displayName = 'IdeasUI.Chip';
```

### ChipAvatar (`chip-avatar.tsx`)

```tsx
'use client';

import type { ChipAvatarProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef, useState } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export const ChipAvatar = forwardRef<HTMLSpanElement, ChipAvatarProps>(
  ({ src, name, alt, className, ...properties }, reference): JSX.Element => {
    const [imgError, setImgError] = useState(false);
    const styles = chipRecipe();
    const initials = name ? getInitials(name) : '';
    const showImage = src && !imgError;

    return (
      <span
        ref={reference}
        className={cn(styles.avatar(), className)}
        data-slot="chip-avatar"
        aria-hidden="true"
        {...properties}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? ''}
            className={cn(styles.avatarImage())}
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </span>
    );
  },
);

ChipAvatar.displayName = 'IdeasUI.ChipAvatar';
```

### ChipIcon (`chip-icon.tsx`)

```tsx
'use client';

import type { ChipIconProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export const ChipIcon = forwardRef<HTMLSpanElement, ChipIconProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const styles = chipRecipe();

    return (
      <span
        ref={reference}
        className={cn(styles.icon(), className)}
        data-slot="chip-icon"
        aria-hidden="true"
        {...properties}
      >
        {children}
      </span>
    );
  },
);

ChipIcon.displayName = 'IdeasUI.ChipIcon';
```

### ChipDismiss (`chip-dismiss.tsx`)

```tsx
'use client';

import type { ChipDismissProps } from './chip.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { chip as chipRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

const XIcon = () => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    focusable="false"
    width="100%"
    height="100%"
  >
    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ChipDismiss = forwardRef<HTMLButtonElement, ChipDismissProps>(
  ({ label = 'Remove', className, ...properties }, reference): JSX.Element => {
    const styles = chipRecipe();

    return (
      <button
        ref={reference}
        type="button"
        className={cn(styles.dismiss(), className)}
        aria-label={label}
        data-slot="chip-dismiss"
        {...properties}
      >
        <XIcon />
      </button>
    );
  },
);

ChipDismiss.displayName = 'IdeasUI.ChipDismiss';
```

### Barrel Export (`index.ts`)

```tsx
export { Chip } from './chip';
export { ChipGroup } from './chip-group';
export { ChipAvatar } from './chip-avatar';
export { ChipIcon } from './chip-icon';
export { ChipDismiss } from './chip-dismiss';
export { ChipGroupContext, useChipGroupContext, useRequiredChipGroupContext } from './chip-context';

export type {
  ChipProps,
  ChipGroupProps,
  ChipAvatarProps,
  ChipIconProps,
  ChipDismissProps,
  ChipGroupContextValue,
  ChipVariant,
  Chipcolor,
  ChipSize,
  ChipMode,
  ChipSelectionMode,
} from './chip.types';
```

---

## 8. Standalone BEM CSS Specification (`packages/core/styles/src/components/chip.css`)

```css
/* ─── Root ────────────────────────────────────────────────────── */
.ideasui-chip {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 9999px;
  transition:
    background-color 150ms ease,
    color 150ms ease,
    box-shadow 150ms ease;
  cursor: default;
}
.ideasui-chip:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px oklch(var(--ideasui-color-focus)),
    0 0 0 4px oklch(var(--ideasui-color-surface-default));
}

/* ─── Sizes ───────────────────────────────────────────────────── */
.ideasui-chip--sm {
  height: 1.25rem;
  padding: 0 0.5rem;
  font-size: var(--ideasui-font-size-xs);
  gap: 0.125rem;
}
.ideasui-chip--md {
  height: 1.5rem;
  padding: 0 0.625rem;
  font-size: var(--ideasui-font-size-xs);
  gap: 0.25rem;
}
.ideasui-chip--lg {
  height: 2rem;
  padding: 0 0.75rem;
  font-size: var(--ideasui-font-size-sm);
  gap: 0.375rem;
}

/* ─── Variant: solid ──────────────────────────────────────────── */
.ideasui-chip--solid.ideasui-chip--primary {
  background-color: oklch(var(--ideasui-color-primary));
  color: white;
}
.ideasui-chip--solid.ideasui-chip--neutral {
  background-color: oklch(var(--ideasui-color-neutral));
  color: white;
}
.ideasui-chip--solid.ideasui-chip--success {
  background-color: oklch(var(--ideasui-color-success));
  color: white;
}
.ideasui-chip--solid.ideasui-chip--warning {
  background-color: oklch(var(--ideasui-color-warning));
  color: white;
}
.ideasui-chip--solid.ideasui-chip--danger {
  background-color: oklch(var(--ideasui-color-danger));
  color: white;
}

/* ─── Variant: soft ───────────────────────────────────────────── */
.ideasui-chip--soft.ideasui-chip--primary {
  background-color: oklch(var(--ideasui-color-primary-subtle));
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-chip--soft.ideasui-chip--neutral {
  background-color: oklch(var(--ideasui-color-neutral-subtle));
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-chip--soft.ideasui-chip--success {
  background-color: oklch(var(--ideasui-color-success-subtle));
  color: oklch(var(--ideasui-color-success));
}
.ideasui-chip--soft.ideasui-chip--warning {
  background-color: oklch(var(--ideasui-color-warning-subtle));
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-chip--soft.ideasui-chip--danger {
  background-color: oklch(var(--ideasui-color-danger-subtle));
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Variant: outline ────────────────────────────────────────── */
.ideasui-chip--outline.ideasui-chip--primary {
  border-color: oklch(var(--ideasui-color-primary));
  color: oklch(var(--ideasui-color-primary));
  background-color: transparent;
}
.ideasui-chip--outline.ideasui-chip--neutral {
  border-color: oklch(var(--ideasui-color-neutral));
  color: oklch(var(--ideasui-color-neutral));
  background-color: transparent;
}
.ideasui-chip--outline.ideasui-chip--success {
  border-color: oklch(var(--ideasui-color-success));
  color: oklch(var(--ideasui-color-success));
  background-color: transparent;
}
.ideasui-chip--outline.ideasui-chip--warning {
  border-color: oklch(var(--ideasui-color-warning));
  color: oklch(var(--ideasui-color-warning));
  background-color: transparent;
}
.ideasui-chip--outline.ideasui-chip--danger {
  border-color: oklch(var(--ideasui-color-danger));
  color: oklch(var(--ideasui-color-danger));
  background-color: transparent;
}

/* ─── Variant: ghost ──────────────────────────────────────────── */
.ideasui-chip--ghost {
  background-color: transparent;
  border-color: transparent;
}
.ideasui-chip--ghost.ideasui-chip--primary {
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-chip--ghost.ideasui-chip--primary:hover {
  background-color: oklch(var(--ideasui-color-primary-subtle));
}
.ideasui-chip--ghost.ideasui-chip--neutral {
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-chip--ghost.ideasui-chip--neutral:hover {
  background-color: oklch(var(--ideasui-color-neutral-subtle));
}
.ideasui-chip--ghost.ideasui-chip--success {
  color: oklch(var(--ideasui-color-success));
}
.ideasui-chip--ghost.ideasui-chip--success:hover {
  background-color: oklch(var(--ideasui-color-success-subtle));
}
.ideasui-chip--ghost.ideasui-chip--warning {
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-chip--ghost.ideasui-chip--warning:hover {
  background-color: oklch(var(--ideasui-color-warning-subtle));
}
.ideasui-chip--ghost.ideasui-chip--danger {
  color: oklch(var(--ideasui-color-danger));
}
.ideasui-chip--ghost.ideasui-chip--danger:hover {
  background-color: oklch(var(--ideasui-color-danger-subtle));
}

/* ─── Selectable mode ─────────────────────────────────────────── */
.ideasui-chip--selectable {
  cursor: pointer;
  user-select: none;
}
.ideasui-chip--selectable[data-selected] {
  box-shadow:
    0 0 0 2px currentColor,
    0 0 0 4px oklch(var(--ideasui-color-surface-default));
}

/* ─── Disabled ────────────────────────────────────────────────── */
.ideasui-chip--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Label ───────────────────────────────────────────────────── */
.ideasui-chip__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ─── Avatar ──────────────────────────────────────────────────── */
.ideasui-chip__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 9999px;
  overflow: hidden;
  background-color: oklch(var(--ideasui-color-surface-muted));
  color: oklch(var(--ideasui-color-content-secondary));
  font-weight: 600;
  text-transform: uppercase;
}
.ideasui-chip__avatar--sm {
  width: 0.875rem;
  height: 0.875rem;
  font-size: 8px;
}
.ideasui-chip__avatar--md {
  width: 1rem;
  height: 1rem;
  font-size: 9px;
}
.ideasui-chip__avatar--lg {
  width: 1.25rem;
  height: 1.25rem;
  font-size: 10px;
}
.ideasui-chip__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ─── Icon ────────────────────────────────────────────────────── */
.ideasui-chip__icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: currentColor;
}
.ideasui-chip__icon--sm {
  width: 0.75rem;
  height: 0.75rem;
}
.ideasui-chip__icon--md {
  width: 0.875rem;
  height: 0.875rem;
}
.ideasui-chip__icon--lg {
  width: 1rem;
  height: 1rem;
}

/* ─── Dismiss button ──────────────────────────────────────────── */
.ideasui-chip__dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 9999px;
  cursor: pointer;
  color: currentColor;
  opacity: 0.6;
  border: none;
  background: transparent;
  padding: 0;
  transition:
    opacity 100ms ease,
    background-color 100ms ease;
}
.ideasui-chip__dismiss:hover {
  opacity: 1;
  background-color: oklch(0 0 0 / 0.1);
}
.ideasui-chip__dismiss:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px currentColor;
}
.ideasui-chip__dismiss--sm {
  width: 0.75rem;
  height: 0.75rem;
}
.ideasui-chip__dismiss--md {
  width: 0.875rem;
  height: 0.875rem;
}
.ideasui-chip__dismiss--lg {
  width: 1rem;
  height: 1rem;
}

/* ─── Group ───────────────────────────────────────────────────── */
.ideasui-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ideasui-spacing-2, 0.5rem);
}
.ideasui-chip-group--disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* prefers-reduced-motion — suppressed via @ideasui/styles global rule */
```

---

## 9. All Variants Reference

### Visual Variants

| Variant   | Background                            | Text            | Border          |
| --------- | ------------------------------------- | --------------- | --------------- |
| `solid`   | `{color}` token                       | `white`         | transparent     |
| `soft`    | `{color}-subtle` token                | `{color}` token | transparent     |
| `outline` | transparent                           | `{color}` token | `{color}` token |
| `ghost`   | transparent (hover: `{color}-subtle`) | `{color}` token | transparent     |

### Color Schemes

| `color`   | Tokens used                                                 |
| --------- | ----------------------------------------------------------- |
| `primary` | `--ideasui-color-primary`, `--ideasui-color-primary-subtle` |
| `neutral` | `--ideasui-color-neutral`, `--ideasui-color-neutral-subtle` |
| `success` | `--ideasui-color-success`, `--ideasui-color-success-subtle` |
| `warning` | `--ideasui-color-warning`, `--ideasui-color-warning-subtle` |
| `danger`  | `--ideasui-color-danger`, `--ideasui-color-danger-subtle`   |

### Sizes

| `size` | Height | Padding | Font      | Avatar  | Icon    | Dismiss |
| ------ | ------ | ------- | --------- | ------- | ------- | ------- |
| `sm`   | 20px   | 0 8px   | `text-xs` | 14×14px | 12×12px | 12×12px |
| `md`   | 24px   | 0 10px  | `text-xs` | 16×16px | 14×14px | 14×14px |
| `lg`   | 32px   | 0 12px  | `text-sm` | 20×20px | 16×16px | 16×16px |

### Interaction Modes

| `mode`        | Root element                     | Keyboard interaction                                                        | ARIA                           |
| ------------- | -------------------------------- | --------------------------------------------------------------------------- | ------------------------------ |
| `static`      | `<span>`                         | Not focusable                                                               | None                           |
| `selectable`  | `<button>`                       | `Space` / `Enter` toggles                                                   | `aria-pressed`                 |
| `dismissible` | `<span tabIndex=0>` + `<button>` | `Delete` / `Backspace` on chip fires `onDismiss`; `Enter` on dismiss button | `aria-label` on dismiss button |

### States

| State                    | Prop                             | Behavior                              |
| ------------------------ | -------------------------------- | ------------------------------------- |
| Default                  | —                                | Unselected, interactive per mode      |
| Selected                 | `isSelected` / `defaultSelected` | Ring outline via `box-shadow`         |
| Disabled                 | `isDisabled`                     | 50% opacity, `pointer-events: none`   |
| Hover (selectable/ghost) | —                                | Subtle background tint                |
| Focus                    | —                                | 2px `focus` ring via `:focus-visible` |

---

## 10. Chip vs Badge — Decision Guide

| Concern                | `Chip`                                                           | `Badge`                         |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------- |
| **Interactive**        | Yes — `selectable` and `dismissible` modes                       | No — display only               |
| **Selection state**    | `aria-pressed` on selectable chips                               | Not applicable                  |
| **Dismissible**        | Yes — `ChipDismiss` button                                       | No                              |
| **Avatar / Icon slot** | Yes — `ChipAvatar`, `ChipIcon`                                   | Icon only (no avatar)           |
| **Group management**   | `ChipGroup` with `single` / `multiple` selection                 | No group                        |
| **Use case**           | Tags, filters, people, categories                                | Counts, statuses, notifications |
| **Keyboard**           | `Space`/`Enter` (selectable), `Delete`/`Backspace` (dismissible) | None                            |

> **Rule:** Use `Chip` when the element is interactive (filterable, removable, selectable). Use `Badge` for purely decorative status indicators or counts.

---

## 11. Compound Component Behavior Rules

| Behavior                               | Rule                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `mode` inside group                    | Defaults to `selectable` when inside `ChipGroup`; can be overridden per chip                  |
| `selectionMode="single"`               | Only one chip selected at a time; selecting a new chip deselects the previous                 |
| `selectionMode="multiple"`             | Multiple chips can be selected simultaneously                                                 |
| `isDisabled=true` on group             | Propagated via context to all child `Chip` components; `pointer-events: none` on group root   |
| `value` prop on `Chip` inside group    | Selection state driven by `ChipGroupContext.selectedValues`; `onGroupChange` called on toggle |
| `Chip` without group                   | Fully standalone — uses local `isSelected` / `defaultSelected` / `onChange`                   |
| `mode="dismissible"` + no `endContent` | `ChipDismiss` is auto-rendered if `onDismiss` is provided                                     |
| `mode="dismissible"` + `endContent`    | Consumer is responsible for rendering `ChipDismiss` inside `endContent`                       |
| `ChipAvatar` `aria-hidden`             | Avatar is always `aria-hidden="true"` — decorative; label text provides the accessible name   |
| `ChipIcon` `aria-hidden`               | Icon is always `aria-hidden="true"` — decorative                                              |
| `ChipDismiss` `aria-label`             | Defaults to `"Remove {children}"` — always explicitly labelled                                |
| `useChipGroupContext` outside group    | Returns `null` — safe for standalone `Chip` usage                                             |
| `displayName`                          | Set on all 5 sub-components (`IdeasUI.Chip*`)                                                 |

---

## 12. Accessibility Requirements (WCAG 2.1 AA)

- **`static` mode**: Rendered as `<span>` — not focusable, not interactive. Used for display-only tags.
- **`selectable` mode**: Rendered as `<button type="button">` with `aria-pressed` — full keyboard support (`Space`/`Enter` to toggle), announced as "pressed" / "not pressed" by screen readers.
- **`dismissible` mode**: Chip root is `<span tabIndex=0>` supporting `Delete`/`Backspace` keyboard shortcut. `ChipDismiss` is a `<button>` with an explicit `aria-label` (e.g. `"Remove React"`) — always announced correctly.
- **`ChipGroup` `role="group"`**: Applied with `aria-label` so screen readers announce the group purpose (e.g. "Filter by framework").
- **`ChipAvatar` `aria-hidden`**: Avatar images and initials are `aria-hidden="true"` — the chip's text label provides the accessible name.
- **`ChipIcon` `aria-hidden`**: Icons are `aria-hidden="true"` — decorative only.
- **Focus ring**: Applied via `:focus-visible` on `<button>` chips and `ChipDismiss` — never shown on mouse interaction.
- **Keyboard navigation**: `Tab` / `Shift+Tab` navigates between chips; `Space`/`Enter` activates selectable chips; `Delete`/`Backspace` dismisses dismissible chips.
- **Contrast Ratios**: All color tokens map to OKLCH variables meeting or exceeding 4.5:1 contrast in light and dark modes.
- **`prefers-reduced-motion`**: Transitions suppressed via the global `@media (prefers-reduced-motion: reduce)` rule in `@ideasui/styles`.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Chip, ChipGroup, ChipAvatar, ChipDismiss } from '../src';

it('static chip has zero a11y violations', async () => {
  const { container } = render(<Chip>React</Chip>);
  expect(await axe(container)).toHaveNoViolations();
});

it('selectable chip has zero a11y violations', async () => {
  const { container } = render(
    <Chip mode="selectable" defaultSelected>
      TypeScript
    </Chip>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('dismissible chip has zero a11y violations', async () => {
  const { container } = render(
    <Chip mode="dismissible" onDismiss={() => {}}>
      React
    </Chip>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('chip group has zero a11y violations', async () => {
  const { container } = render(
    <ChipGroup label="Filter by framework" selectionMode="multiple">
      <Chip value="react">React</Chip>
      <Chip value="vue">Vue</Chip>
    </ChipGroup>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('chip with avatar has zero a11y violations', async () => {
  const { container } = render(<Chip startContent={<ChipAvatar name="Jane Doe" />}>Jane Doe</Chip>);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 13. Storybook Stories (`chip.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Chip, ChipGroup, ChipAvatar, ChipIcon, ChipDismiss } from '../src';

const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%" aria-hidden="true">
    <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6z" />
  </svg>
);

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Chip>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => <Chip>React</Chip>,
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <Chip key={variant} variant={variant} color="primary">
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Chip>
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
            <Chip key={color} variant={variant} color={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Chip>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Chip key={size} size={size} color="primary" variant="soft">
          Size {size}
        </Chip>
      ))}
    </div>
  ),
};

// ── Interaction Modes ───────────────────────────────────────────
export const Modes: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState(false);
    return (
      <div className="flex flex-wrap gap-3">
        <Chip mode="static" color="neutral" variant="soft">
          Static
        </Chip>
        <Chip mode="selectable" color="primary" variant="soft" defaultSelected>
          Selectable
        </Chip>
        {!dismissed && (
          <Chip
            mode="dismissible"
            color="danger"
            variant="soft"
            onDismiss={() => setDismissed(true)}
          >
            Dismissible
          </Chip>
        )}
      </div>
    );
  },
};

// ── With Avatar ─────────────────────────────────────────────────
export const WithAvatar: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip startContent={<ChipAvatar src="/avatar.jpg" name="Jane Doe" />} size="md">
        Jane Doe
      </Chip>
      <Chip startContent={<ChipAvatar name="John Smith" />} size="md">
        John Smith
      </Chip>
      <Chip
        mode="dismissible"
        startContent={<ChipAvatar name="Alice" />}
        onDismiss={() => {}}
        size="lg"
      >
        Alice
      </Chip>
    </div>
  ),
};

// ── With Icon ───────────────────────────────────────────────────
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        color="warning"
        variant="soft"
      >
        Featured
      </Chip>
      <Chip
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        color="success"
        variant="solid"
      >
        Verified
      </Chip>
      <Chip
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        color="primary"
        variant="outline"
      >
        Premium
      </Chip>
    </div>
  ),
};

// ── Dismissible List ────────────────────────────────────────────
export const DismissibleList: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js', 'Tailwind', 'Vitest']);
    const remove = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            mode="dismissible"
            color="primary"
            variant="soft"
            onDismiss={() => remove(tag)}
          >
            {tag}
          </Chip>
        ))}
        {tags.length === 0 && (
          <span className="text-content-secondary text-sm">All tags removed.</span>
        )}
      </div>
    );
  },
};

// ── Selectable Group (Filter Chips) ────────────────────────────
export const FilterGroup: Story = {
  render: () => {
    const [filters, setFilters] = useState<string[]>(['react']);
    return (
      <div className="flex flex-col gap-3">
        <ChipGroup
          label="Filter by framework"
          selectionMode="multiple"
          value={filters}
          onChange={setFilters}
          color="primary"
          variant="outline"
        >
          <Chip value="react">React</Chip>
          <Chip value="vue">Vue</Chip>
          <Chip value="angular">Angular</Chip>
          <Chip value="svelte">Svelte</Chip>
          <Chip value="solid">Solid</Chip>
        </ChipGroup>
        <p className="text-content-secondary text-sm">
          Selected: {filters.length > 0 ? filters.join(', ') : 'none'}
        </p>
      </div>
    );
  },
};

// ── Single-Select Group ─────────────────────────────────────────
export const SingleSelectGroup: Story = {
  render: () => {
    const [size, setSize] = useState<string[]>(['md']);
    return (
      <ChipGroup
        label="Select size"
        selectionMode="single"
        value={size}
        onChange={setSize}
        color="primary"
        variant="soft"
      >
        <Chip value="xs">XS</Chip>
        <Chip value="sm">SM</Chip>
        <Chip value="md">MD</Chip>
        <Chip value="lg">LG</Chip>
        <Chip value="xl">XL</Chip>
      </ChipGroup>
    );
  },
};

// ── Disabled ────────────────────────────────────────────────────
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip isDisabled color="primary" variant="soft">
        Disabled static
      </Chip>
      <Chip isDisabled mode="selectable" color="primary" variant="soft">
        Disabled selectable
      </Chip>
      <Chip isDisabled mode="dismissible" onDismiss={() => {}} color="danger" variant="soft">
        Disabled dismissible
      </Chip>
    </div>
  ),
};

// ── Status Chips ────────────────────────────────────────────────
export const StatusChips: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip color="success" variant="soft">
        Active
      </Chip>
      <Chip color="warning" variant="soft">
        Pending
      </Chip>
      <Chip color="danger" variant="soft">
        Rejected
      </Chip>
      <Chip color="neutral" variant="soft">
        Draft
      </Chip>
      <Chip color="primary" variant="soft">
        In Review
      </Chip>
    </div>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'soft',
    color: 'primary',
    size: 'md',
    mode: 'static',
    isDisabled: false,
    children: 'Chip label',
  },
  render: (args) => <Chip {...args} />,
};
```

---

## 14. Definition of Done Checklist

- [ ] Package created at `packages/components/chip/`
- [ ] Recipe created at `packages/core/theme/src/recipes/chip.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/chip.css`
- [ ] `index.ts` barrel exports all 5 sub-components, context hooks, and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] All 4 variants (`solid`, `soft`, `outline`, `ghost`) implemented and verified
- [ ] All 5 color schemes (`primary`, `neutral`, `success`, `warning`, `danger`) implemented and verified
- [ ] All 3 sizes (`sm`, `md`, `lg`) implemented and verified
- [ ] All 3 interaction modes (`static`, `selectable`, `dismissible`) implemented and verified
- [ ] `static` mode renders as `<span>` — not focusable
- [ ] `selectable` mode renders as `<button>` with `aria-pressed`
- [ ] `dismissible` mode renders `<span tabIndex=0>` + `ChipDismiss` `<button>` with `aria-label`
- [ ] `Delete` / `Backspace` on dismissible chip fires `onDismiss`
- [ ] `ChipGroup` manages `single` and `multiple` selection modes
- [ ] `ChipGroup` manages controlled and uncontrolled `value[]` state
- [ ] `isDisabled` propagated via context to all child `Chip` components
- [ ] `ChipAvatar` renders image with `onError` fallback to initials
- [ ] `ChipAvatar` is always `aria-hidden="true"`
- [ ] `ChipIcon` is always `aria-hidden="true"`
- [ ] `ChipDismiss` always has an explicit `aria-label`
- [ ] `dismissLabel` defaults to `"Remove {children}"` when `children` is a string
- [ ] `compoundVariants` correctly apply color scheme per variant combination
- [ ] `useChipGroupContext` returns `null` safely when used outside group (standalone `Chip`)
- [ ] `displayName` set on all 5 sub-components (`IdeasUI.Chip*`)
- [ ] `data-slot` attribute rendered on all sub-components
- [ ] All semantic OKLCH colors used — no hardcoded colors or `dark:` prefixes
- [ ] `vitest-axe` accessibility tests pass with 0 violations (static, selectable, dismissible, group, with avatar)
- [ ] `prefers-reduced-motion` suppression verified via `@ideasui/styles` global rule
- [ ] Storybook stories created (`Default`, `Variants`, `colors`, `Sizes`, `Modes`, `WithAvatar`, `WithIcon`, `DismissibleList`, `FilterGroup`, `SingleSelectGroup`, `Disabled`, `StatusChips`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/chip.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly

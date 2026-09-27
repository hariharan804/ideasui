# Switch Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Switch` (Compound)
- **Package:** `@ideasui/switch`
- **Directory:** `packages/components/switch/`
- **Primary Exports:** `Switch`, `SwitchGroup`, `SwitchGroupLabel`, `SwitchGroupDescription`, `SwitchGroupError`
- **Category:** Form / Selection
- **Recipe Location:** `packages/core/theme/src/recipes/switch.ts`
- **Standalone CSS:** auto generate file - `packages/core/styles/src/components/switch.css`

### Purpose

`Switch` is a fully accessible, theme-aware toggle primitive for IdeasUI applications. It represents a binary on/off state and is semantically distinct from `Checkbox` — it uses `role="switch"` and `aria-checked` rather than `type="checkbox"`. It supports standalone and grouped usage, all visual variants, color schemes, sizes, label placement, and full keyboard/screen reader support via `SwitchGroupContext` for shared state propagation.

Key Features:

- Compound component architecture (`Switch`, `SwitchGroup`, `SwitchGroupLabel`, `SwitchGroupDescription`, `SwitchGroupError`)
- React Aria `react-aria-components` slot integration (`slot="label"`, `slot="description"`, `slot="errorMessage"`)
- Context inheritance via `SwitchGroupContext` for shared `size`, `variant`, `color`, `isDisabled`, `isInvalid`, `isRequired` state
- Visual variants (`solid`, `outline`, `soft`)
- Color schemes (`primary`, `neutral`, `success`, `warning`, `danger`)
- Size scale (`sm`, `md`, `lg`)
- Label placement (`start`, `end`) — label before or after the track
- Animated thumb with smooth translate transition
- On/off label slots (`onLabel`, `offLabel`) rendered inside the track
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- Controlled and uncontrolled usage via `isSelected` / `defaultSelected` / `onChange`
- Full keyboard navigation and screen reader support (WCAG 2.1 AA)
- `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid` state props
- `data-slot` attributes on every sub-component for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/switch/
├── src/
│   ├── switch.tsx                    ← Single switch (context consumer)
│   ├── switch-group.tsx              ← Group root (context provider)
│   ├── switch-group-label.tsx        ← Group label sub-component
│   ├── switch-group-description.tsx  ← Group description sub-component
│   ├── switch-group-error.tsx        ← Group error message sub-component
│   ├── switch-context.ts             ← SwitchGroupContext + hooks
│   ├── switch.types.ts               ← Full TypeScript interfaces with JSDoc
│   └── index.ts                      ← Barrel export (public API only)
├── __tests__/
│   └── switch.test.tsx               ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── switch.stories.tsx            ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── switch.ts                         ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── switch.css                        ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/switch → @ideasui/theme, @ideasui/utils, react-aria-components
@ideasui/react  → @ideasui/switch (re-export in master barrel)
```

> **Rule:** `@ideasui/switch` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Compound Component Architecture

`SwitchGroup` is the **compound root** — it provides shared state via `SwitchGroupContext`. `Switch` can also be used fully standalone without a group.

### Slot Map

| Sub-Component            | `data-slot`         | React Aria slot       | Default Element |
| ------------------------ | ------------------- | --------------------- | --------------- |
| `SwitchGroup`            | `switch-group`      | —                     | `<div>`         |
| `SwitchGroupLabel`       | `group-label`       | `slot="label"`        | `<span>`        |
| `SwitchGroupDescription` | `group-description` | `slot="description"`  | `<p>`           |
| `SwitchGroupError`       | `group-error`       | `slot="errorMessage"` | `<p>`           |
| `Switch`                 | `switch`            | —                     | `<label>`       |
| `Switch` track           | `switch-track`      | —                     | `<span>`        |
| `Switch` thumb           | `switch-thumb`      | —                     | `<span>`        |
| `Switch` label text      | `switch-label-text` | —                     | `<span>`        |

### Anatomy

```
SwitchGroup (root — context provider)
├── SwitchGroupLabel          (slot="label")
├── Switch[]                  (one or more switches)
│   ├── switch-label-text     (labelPlacement="start" — rendered before track)
│   ├── switch-track          (visual pill track)
│   │   ├── on-label          (optional text inside track when on)
│   │   ├── switch-thumb      (animated circular thumb)
│   │   └── off-label         (optional text inside track when off)
│   └── switch-label-text     (labelPlacement="end" — rendered after track, default)
├── SwitchGroupDescription    (slot="description", hidden when isInvalid)
└── SwitchGroupError          (slot="errorMessage", shown when isInvalid)

Switch (standalone — no group required)
├── switch-label-text         (labelPlacement="start")
├── switch-track
│   ├── on-label
│   ├── switch-thumb
│   └── off-label
└── switch-label-text         (labelPlacement="end", default)
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import {
  Switch,
  SwitchGroup,
  SwitchGroupLabel,
  SwitchGroupDescription,
  SwitchGroupError,
} from '@ideasui/react';

// Standalone — uncontrolled
<Switch defaultSelected>Enable notifications</Switch>

// Standalone — controlled
<Switch isSelected={enabled} onChange={setEnabled}>
  Dark mode
</Switch>

// Label placement start
<Switch labelPlacement="start" defaultSelected>
  Auto-save
</Switch>

// With on/off track labels
<Switch onLabel="ON" offLabel="OFF" defaultSelected>
  Feature flag
</Switch>

// Variant + color + size
<Switch variant="outline" color="success" size="lg" defaultSelected>
  Verified
</Switch>

// Fully composed group
<SwitchGroup isRequired>
  <SwitchGroupLabel>Notification channels</SwitchGroupLabel>
  <Switch value="email">Email</Switch>
  <Switch value="sms">SMS</Switch>
  <Switch value="push">Push notifications</Switch>
  <SwitchGroupDescription>Enable at least one channel.</SwitchGroupDescription>
  <SwitchGroupError>Please enable at least one channel.</SwitchGroupError>
</SwitchGroup>

// Invalid group
<SwitchGroup isInvalid>
  <SwitchGroupLabel>Required toggles</SwitchGroupLabel>
  <Switch value="terms">Accept terms</Switch>
  <SwitchGroupError>You must accept the terms.</SwitchGroupError>
</SwitchGroup>

// Disabled group
<SwitchGroup isDisabled>
  <SwitchGroupLabel>Locked settings</SwitchGroupLabel>
  <Switch value="a">Option A</Switch>
  <Switch value="b">Option B</Switch>
</SwitchGroup>
```

### TypeScript Definition (`switch.types.ts`)

```tsx
import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { SwitchReturnType } from '@ideasui/theme/recipes';

export type SwitchVariant = 'solid' | 'outline' | 'soft';
export type Switchcolor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchLabelPlacement = 'start' | 'end';

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange'
> {
  /**
   * Visual style variant of the switch track.
   * @default 'solid'
   */
  readonly variant?: SwitchVariant;

  /**
   * Color scheme applied to the on/active state.
   * @default 'primary'
   */
  readonly color?: Switchcolor;

  /**
   * Size scale of the switch.
   * @default 'md'
   */
  readonly size?: SwitchSize;

  /**
   * Position of the label relative to the track.
   * @default 'end'
   */
  readonly labelPlacement?: SwitchLabelPlacement;

  /**
   * Text rendered inside the track when the switch is on.
   */
  readonly onLabel?: string;

  /**
   * Text rendered inside the track when the switch is off.
   */
  readonly offLabel?: string;

  /**
   * Controlled selected (on) state.
   */
  readonly isSelected?: boolean;

  /**
   * Uncontrolled default selected state.
   * @default false
   */
  readonly defaultSelected?: boolean;

  /**
   * Marks the switch as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks the switch as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the switch as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the switch as invalid.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Value used when inside a SwitchGroup.
   */
  readonly value?: string;

  /**
   * Change handler — receives the new boolean selected state.
   */
  readonly onChange?: (isSelected: boolean) => void;

  /**
   * Custom CSS class names merged via `cn()` on the root label element.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root label element.
   */
  readonly style?: CSSProperties;

  /**
   * Visible label text rendered beside the track.
   */
  readonly children?: ReactNode;
}

export interface SwitchGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Controlled array of active (on) values.
   */
  readonly value?: string[];

  /**
   * Uncontrolled default active values.
   */
  readonly defaultValue?: string[];

  /**
   * Change handler — receives the new array of active values.
   */
  readonly onChange?: (value: string[]) => void;

  /**
   * Visual style variant propagated to all child Switches.
   * @default 'solid'
   */
  readonly variant?: SwitchVariant;

  /**
   * Color scheme propagated to all child Switches.
   * @default 'primary'
   */
  readonly color?: Switchcolor;

  /**
   * Size scale propagated to all child Switches.
   * @default 'md'
   */
  readonly size?: SwitchSize;

  /**
   * Label placement propagated to all child Switches.
   * @default 'end'
   */
  readonly labelPlacement?: SwitchLabelPlacement;

  /**
   * Layout direction of the switch group.
   * @default 'vertical'
   */
  readonly orientation?: 'vertical' | 'horizontal';

  /**
   * Marks all switches in the group as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks all switches in the group as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the group as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the group as invalid. Shows SwitchGroupError, hides SwitchGroupDescription.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * Sub-components: SwitchGroupLabel, Switch[], SwitchGroupDescription, SwitchGroupError.
   */
  readonly children: ReactNode;
}

export interface SwitchGroupLabelProps extends HTMLAttributes<HTMLSpanElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface SwitchGroupDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface SwitchGroupErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface SwitchGroupContextValue {
  readonly variant?: SwitchVariant;
  readonly color?: Switchcolor;
  readonly size?: SwitchSize;
  readonly labelPlacement?: SwitchLabelPlacement;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly groupDescriptionId?: string;
  readonly groupErrorId?: string;
  readonly selectedValues?: string[];
  readonly onGroupChange?: (value: string, checked: boolean) => void;
  readonly styles?: SwitchReturnType;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/switch.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const switchRecipe = tv({
  slots: {
    root: 'group inline-flex items-center gap-2 cursor-pointer select-none',
    track: [
      'relative inline-flex items-center shrink-0',
      'rounded-full border transition-all duration-200 ease-in-out',
      'focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-2',
    ],
    thumb: [
      'absolute rounded-full bg-white shadow-sm',
      'transition-transform duration-200 ease-in-out',
      'pointer-events-none',
    ],
    onLabel:
      'absolute left-1.5 text-white font-medium leading-none pointer-events-none select-none',
    offLabel:
      'absolute right-1.5 text-content-tertiary font-medium leading-none pointer-events-none select-none',
    labelText: 'text-content-primary leading-none transition-colors duration-150',
  },

  variants: {
    variant: {
      solid: {
        track: [
          'border-transparent bg-surface-muted',
          'group-data-[selected=true]:bg-primary group-data-[selected=true]:border-transparent',
        ],
        thumb: 'bg-white',
      },
      outline: {
        track: [
          'border-2 border-border-default bg-transparent',
          'group-data-[selected=true]:border-primary',
        ],
        thumb: ['bg-border-default', 'group-data-[selected=true]:bg-primary'],
      },
      soft: {
        track: [
          'border-transparent bg-surface-muted',
          'group-data-[selected=true]:bg-primary-subtle',
        ],
        thumb: ['bg-content-tertiary', 'group-data-[selected=true]:bg-primary'],
      },
    },

    color: {
      primary: {
        track: 'group-data-[selected=true]:bg-primary',
      },
      neutral: {
        track: 'group-data-[selected=true]:bg-neutral',
      },
      success: {
        track: 'group-data-[selected=true]:bg-success',
      },
      warning: {
        track: 'group-data-[selected=true]:bg-warning',
      },
      danger: {
        track: 'group-data-[selected=true]:bg-danger',
      },
    },

    size: {
      sm: {
        track: 'w-7 h-4',
        thumb: 'size-3 top-0.5 left-0.5 group-data-[selected=true]:translate-x-3',
        onLabel: 'text-[8px]',
        offLabel: 'text-[8px]',
        labelText: 'text-xs',
      },
      md: {
        track: 'w-9 h-5',
        thumb: 'size-3.5 top-[3px] left-[3px] group-data-[selected=true]:translate-x-4',
        onLabel: 'text-[9px]',
        offLabel: 'text-[9px]',
        labelText: 'text-sm',
      },
      lg: {
        track: 'w-12 h-6',
        thumb: 'size-4.5 top-[3px] left-[3px] group-data-[selected=true]:translate-x-6',
        onLabel: 'text-[10px]',
        offLabel: 'text-[10px]',
        labelText: 'text-base',
      },
    },

    isInvalid: {
      true: {
        track: 'border-danger group-data-[selected=true]:bg-danger',
        labelText: 'text-danger',
      },
    },

    isDisabled: {
      true: {
        root: 'cursor-not-allowed opacity-50 pointer-events-none',
      },
    },

    labelPlacement: {
      start: { root: 'flex-row-reverse' },
      end: { root: 'flex-row' },
    },
  },

  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    labelPlacement: 'end',
    isInvalid: false,
    isDisabled: false,
  },
});

export const switchGroup = tv({
  slots: {
    root: 'flex flex-col gap-2 w-full',
    groupLabel: 'text-content-primary text-sm font-medium',
    items: 'flex gap-2',
    description: 'text-content-secondary text-xs leading-normal',
    errorMessage: 'text-danger text-xs leading-normal',
  },
  variants: {
    orientation: {
      vertical: { items: 'flex-col' },
      horizontal: { items: 'flex-row flex-wrap' },
    },
    isInvalid: {
      true: { groupLabel: 'text-danger' },
    },
    isDisabled: {
      true: { root: 'opacity-50 pointer-events-none' },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    isInvalid: false,
    isDisabled: false,
  },
});

export type SwitchVariants = VariantProps<typeof switchRecipe>;
export type SwitchGroupVariants = VariantProps<typeof switchGroup>;
export type SwitchReturnType = ReturnType<typeof switchRecipe>;
export type SwitchGroupReturnType = ReturnType<typeof switchGroup>;
```

---

## 6. Context Definition (`packages/components/switch/src/switch-context.ts`)

`SwitchGroup` uses **native React context** for shared state propagation across child `Switch` components.

> **Rule:** Do NOT replace `useContext` with `useContextProps` here. React Aria slot wiring is handled by passing `slot` props directly to sub-component DOM elements.

```tsx
import type { SwitchGroupContextValue } from './switch.types';
import { createContext, useContext } from 'react';

export const SwitchGroupContext = createContext<SwitchGroupContextValue | null>(null);

export function useSwitchGroupContext(): SwitchGroupContextValue | null {
  return useContext(SwitchGroupContext);
}

export function useRequiredSwitchGroupContext(): SwitchGroupContextValue {
  const context = useContext(SwitchGroupContext);
  if (!context) {
    throw new Error('useRequiredSwitchGroupContext must be used within a <SwitchGroup> component.');
  }
  return context;
}
```

> `Switch` calls `useSwitchGroupContext()` (nullable) so it works both standalone and inside a group. Group-specific sub-components call `useRequiredSwitchGroupContext()` and throw if used outside a group.

---

## 7. Component Implementation

### Root Group (`switch-group.tsx`)

```tsx
'use client';

import type { SwitchGroupProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef, useId, useState, useCallback } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { SwitchGroupContext } from './switch-context';

export const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      labelPlacement = 'end',
      orientation = 'vertical',
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const selectedValues = value ?? internalValue;

    const groupDescriptionId = useId();
    const groupErrorId = useId();

    const groupStyles = switchGroup({ orientation, isInvalid, isDisabled });

    const onGroupChange = useCallback(
      (itemValue: string, checked: boolean) => {
        if (isReadOnly) return;
        const next = checked
          ? [...selectedValues, itemValue]
          : selectedValues.filter((v) => v !== itemValue);
        if (!value) setInternalValue(next);
        onChange?.(next);
      },
      [isReadOnly, selectedValues, value, onChange],
    );

    return (
      <SwitchGroupContext.Provider
        value={{
          variant,
          color,
          size,
          labelPlacement,
          isDisabled,
          isReadOnly,
          isRequired,
          isInvalid,
          groupDescriptionId,
          groupErrorId,
          selectedValues,
          onGroupChange,
        }}
      >
        <div
          ref={reference}
          className={cn(groupStyles.root(), className)}
          data-slot="switch-group"
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          data-required={isRequired || undefined}
          data-readonly={isReadOnly || undefined}
          role="group"
          aria-required={isRequired || undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={isInvalid ? groupErrorId : groupDescriptionId}
          style={style}
          {...properties}
        >
          {children}
        </div>
      </SwitchGroupContext.Provider>
    );
  },
);

SwitchGroup.displayName = 'IdeasUI.SwitchGroup';
```

### Switch (`switch.tsx`)

```tsx
'use client';

import type { SwitchProps } from './switch.types';
import type { ChangeEvent, JSX } from 'react';

import { forwardRef, useId, useState } from 'react';
import { switchRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useSwitchGroupContext } from './switch-context';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      variant,
      color,
      size,
      labelPlacement,
      onLabel,
      offLabel,
      isSelected,
      defaultSelected = false,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      value,
      onChange,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const group = useSwitchGroupContext();
    const inputId = useId();

    // Merge group context — local props take precedence
    const resolvedVariant = variant ?? group?.variant ?? 'solid';
    const resolvedcolor = color ?? group?.color ?? 'primary';
    const resolvedSize = size ?? group?.size ?? 'md';
    const resolvedLabelPlacement = labelPlacement ?? group?.labelPlacement ?? 'end';
    const resolvedDisabled = isDisabled ?? group?.isDisabled ?? false;
    const resolvedReadOnly = isReadOnly ?? group?.isReadOnly ?? false;
    const resolvedRequired = isRequired ?? group?.isRequired ?? false;
    const resolvedInvalid = isInvalid ?? group?.isInvalid ?? false;

    // Determine selected state
    const isGroupControlled = group !== null && value !== undefined;
    const resolvedSelected = isGroupControlled
      ? (group?.selectedValues?.includes(value!) ?? false)
      : (isSelected ?? defaultSelected);

    const styles = switchRecipe({
      variant: resolvedVariant,
      color: resolvedcolor,
      size: resolvedSize,
      labelPlacement: resolvedLabelPlacement,
      isDisabled: resolvedDisabled,
      isInvalid: resolvedInvalid,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (resolvedReadOnly) return;
      const checked = event.target.checked;
      if (isGroupControlled) {
        group?.onGroupChange?.(value!, checked);
      } else {
        onChange?.(checked);
      }
    };

    return (
      <label
        className={cn(styles.root(), className)}
        data-slot="switch"
        data-selected={resolvedSelected || undefined}
        data-disabled={resolvedDisabled || undefined}
        data-invalid={resolvedInvalid || undefined}
        data-readonly={resolvedReadOnly || undefined}
        style={style}
      >
        <input
          ref={reference}
          id={inputId}
          type="checkbox"
          role="switch"
          className="sr-only"
          checked={resolvedSelected}
          disabled={resolvedDisabled}
          readOnly={resolvedReadOnly}
          required={resolvedRequired}
          aria-checked={resolvedSelected}
          aria-required={resolvedRequired || undefined}
          aria-invalid={resolvedInvalid || undefined}
          value={value}
          onChange={handleChange}
          data-slot="switch-input"
          {...properties}
        />

        <span className={cn(styles.track())} data-slot="switch-track" aria-hidden="true">
          {onLabel && resolvedSelected && (
            <span className={cn(styles.onLabel())} data-slot="switch-on-label">
              {onLabel}
            </span>
          )}
          <span className={cn(styles.thumb())} data-slot="switch-thumb" />
          {offLabel && !resolvedSelected && (
            <span className={cn(styles.offLabel())} data-slot="switch-off-label">
              {offLabel}
            </span>
          )}
        </span>

        {children && (
          <span className={cn(styles.labelText())} data-slot="switch-label-text">
            {children}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = 'IdeasUI.Switch';
```

### Group Label (`switch-group-label.tsx`)

```tsx
'use client';

import type { SwitchGroupLabelProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useRequiredSwitchGroupContext } from './switch-context';

export const SwitchGroupLabel = forwardRef<HTMLSpanElement, SwitchGroupLabelProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { isDisabled, isRequired } = useRequiredSwitchGroupContext();
    const styles = switchGroup();

    return (
      <span
        ref={reference}
        className={cn(styles.groupLabel(), className)}
        data-slot="group-label"
        data-disabled={isDisabled || undefined}
        slot="label"
        {...properties}
      >
        {children}
        {isRequired && (
          <span aria-hidden="true" className="text-danger ml-0.5">
            *
          </span>
        )}
      </span>
    );
  },
);

SwitchGroupLabel.displayName = 'IdeasUI.SwitchGroupLabel';
```

### Group Description (`switch-group-description.tsx`)

```tsx
'use client';

import type { SwitchGroupDescriptionProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useRequiredSwitchGroupContext } from './switch-context';

export const SwitchGroupDescription = forwardRef<HTMLParagraphElement, SwitchGroupDescriptionProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { isInvalid, groupDescriptionId } = useRequiredSwitchGroupContext();
    const styles = switchGroup();

    if (isInvalid) return <></>;

    return (
      <p
        ref={reference}
        id={groupDescriptionId}
        className={cn(styles.description(), className)}
        data-slot="group-description"
        slot="description"
        {...properties}
      >
        {children}
      </p>
    );
  },
);

SwitchGroupDescription.displayName = 'IdeasUI.SwitchGroupDescription';
```

### Group Error (`switch-group-error.tsx`)

```tsx
'use client';

import type { SwitchGroupErrorProps } from './switch.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { switchGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useRequiredSwitchGroupContext } from './switch-context';

export const SwitchGroupError = forwardRef<HTMLParagraphElement, SwitchGroupErrorProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { isInvalid, groupErrorId } = useRequiredSwitchGroupContext();
    const styles = switchGroup();

    if (!isInvalid) return <></>;

    return (
      <p
        ref={reference}
        id={groupErrorId}
        className={cn(styles.errorMessage(), className)}
        data-slot="group-error"
        slot="errorMessage"
        role="alert"
        aria-live="polite"
        {...properties}
      >
        {children}
      </p>
    );
  },
);

SwitchGroupError.displayName = 'IdeasUI.SwitchGroupError';
```

### Barrel Export (`index.ts`)

```tsx
export { Switch } from './switch';
export { SwitchGroup } from './switch-group';
export { SwitchGroupLabel } from './switch-group-label';
export { SwitchGroupDescription } from './switch-group-description';
export { SwitchGroupError } from './switch-group-error';
export {
  SwitchGroupContext,
  useSwitchGroupContext,
  useRequiredSwitchGroupContext,
} from './switch-context';

export type {
  SwitchProps,
  SwitchGroupProps,
  SwitchGroupLabelProps,
  SwitchGroupDescriptionProps,
  SwitchGroupErrorProps,
  SwitchGroupContextValue,
  SwitchVariant,
  Switchcolor,
  SwitchSize,
  SwitchLabelPlacement,
} from './switch.types';
```

---

## 8. Standalone BEM CSS Specification (`packages/core/styles/src/components/switch.css`)

For standalone CSS usage (without Tailwind), `@ideasui/styles` exports BEM modifiers mapping to OKLCH custom properties:

```css
/* ─── Root label ─────────────────────────────────────────────── */
.ideasui-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--ideasui-spacing-2, 0.5rem);
  cursor: pointer;
  user-select: none;
}
.ideasui-switch--label-start {
  flex-direction: row-reverse;
}
.ideasui-switch--label-end {
  flex-direction: row;
}
.ideasui-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Hidden native input ─────────────────────────────────────── */
.ideasui-switch__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.ideasui-switch__input:focus-visible ~ .ideasui-switch__track {
  box-shadow: 0 0 0 2px oklch(var(--ideasui-color-focus));
  outline: none;
}

/* ─── Track ───────────────────────────────────────────────────── */
.ideasui-switch__track {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 9999px;
  border: 1px solid transparent;
  background-color: oklch(var(--ideasui-color-surface-muted));
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    box-shadow 200ms ease;
}

/* Sizes */
.ideasui-switch__track--sm {
  width: 1.75rem;
  height: 1rem;
}
.ideasui-switch__track--md {
  width: 2.25rem;
  height: 1.25rem;
}
.ideasui-switch__track--lg {
  width: 3rem;
  height: 1.5rem;
}

/* ─── Thumb ───────────────────────────────────────────────────── */
.ideasui-switch__thumb {
  position: absolute;
  border-radius: 9999px;
  background-color: white;
  box-shadow: 0 1px 2px oklch(0 0 0 / 0.15);
  pointer-events: none;
  transition: transform 200ms ease;
}
.ideasui-switch__thumb--sm {
  width: 0.75rem;
  height: 0.75rem;
  top: 0.125rem;
  left: 0.125rem;
}
.ideasui-switch__thumb--md {
  width: 0.875rem;
  height: 0.875rem;
  top: 0.1875rem;
  left: 0.1875rem;
}
.ideasui-switch__thumb--lg {
  width: 1.125rem;
  height: 1.125rem;
  top: 0.1875rem;
  left: 0.1875rem;
}

/* Thumb translate when selected */
.ideasui-switch[data-selected] .ideasui-switch__thumb--sm {
  transform: translateX(0.75rem);
}
.ideasui-switch[data-selected] .ideasui-switch__thumb--md {
  transform: translateX(1rem);
}
.ideasui-switch[data-selected] .ideasui-switch__thumb--lg {
  transform: translateX(1.5rem);
}

/* ─── Variant: solid (default) ────────────────────────────────── */
.ideasui-switch--solid[data-selected] .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-primary));
  border-color: transparent;
}

/* ─── Variant: outline ────────────────────────────────────────── */
.ideasui-switch--outline .ideasui-switch__track {
  border-width: 2px;
  border-color: oklch(var(--ideasui-color-border-default));
  background-color: transparent;
}
.ideasui-switch--outline .ideasui-switch__thumb {
  background-color: oklch(var(--ideasui-color-border-default));
}
.ideasui-switch--outline[data-selected] .ideasui-switch__track {
  border-color: oklch(var(--ideasui-color-primary));
}
.ideasui-switch--outline[data-selected] .ideasui-switch__thumb {
  background-color: oklch(var(--ideasui-color-primary));
}

/* ─── Variant: soft ───────────────────────────────────────────── */
.ideasui-switch--soft .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-surface-muted));
}
.ideasui-switch--soft .ideasui-switch__thumb {
  background-color: oklch(var(--ideasui-color-content-tertiary));
}
.ideasui-switch--soft[data-selected] .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-primary-subtle));
}
.ideasui-switch--soft[data-selected] .ideasui-switch__thumb {
  background-color: oklch(var(--ideasui-color-primary));
}

/* ─── Color schemes ───────────────────────────────────────────── */
.ideasui-switch--neutral[data-selected] .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-neutral));
}
.ideasui-switch--success[data-selected] .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-success));
}
.ideasui-switch--warning[data-selected] .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-warning));
}
.ideasui-switch--danger[data-selected] .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-danger));
}

/* ─── Invalid state ───────────────────────────────────────────── */
.ideasui-switch--invalid .ideasui-switch__track {
  border-color: oklch(var(--ideasui-color-danger));
}
.ideasui-switch--invalid[data-selected] .ideasui-switch__track {
  background-color: oklch(var(--ideasui-color-danger));
  border-color: oklch(var(--ideasui-color-danger));
}
.ideasui-switch--invalid .ideasui-switch__label-text {
  color: oklch(var(--ideasui-color-danger));
}

/* ─── On / Off track labels ───────────────────────────────────── */
.ideasui-switch__on-label,
.ideasui-switch__off-label {
  position: absolute;
  font-weight: 500;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.ideasui-switch__on-label {
  left: 0.375rem;
  color: white;
}
.ideasui-switch__off-label {
  right: 0.375rem;
  color: oklch(var(--ideasui-color-content-tertiary));
}
.ideasui-switch__on-label--sm,
.ideasui-switch__off-label--sm {
  font-size: 8px;
}
.ideasui-switch__on-label--md,
.ideasui-switch__off-label--md {
  font-size: 9px;
}
.ideasui-switch__on-label--lg,
.ideasui-switch__off-label--lg {
  font-size: 10px;
}

/* ─── Label text ──────────────────────────────────────────────── */
.ideasui-switch__label-text {
  color: oklch(var(--ideasui-color-content-primary));
  line-height: 1;
  transition: color 150ms ease;
}
.ideasui-switch__label-text--sm {
  font-size: var(--ideasui-font-size-xs);
}
.ideasui-switch__label-text--md {
  font-size: var(--ideasui-font-size-sm);
}
.ideasui-switch__label-text--lg {
  font-size: var(--ideasui-font-size-base);
}

/* ─── Group ───────────────────────────────────────────────────── */
.ideasui-switch-group {
  display: flex;
  flex-direction: column;
  gap: var(--ideasui-spacing-2, 0.5rem);
  width: 100%;
}
.ideasui-switch-group--horizontal .ideasui-switch-group__items {
  flex-direction: row;
  flex-wrap: wrap;
}
.ideasui-switch-group__label {
  color: oklch(var(--ideasui-color-content-primary));
  font-size: var(--ideasui-font-size-sm);
  font-weight: var(--ideasui-font-weight-medium, 500);
}
.ideasui-switch-group__label--required::after {
  content: ' *';
  color: oklch(var(--ideasui-color-danger));
}
.ideasui-switch-group__items {
  display: flex;
  flex-direction: column;
  gap: var(--ideasui-spacing-2, 0.5rem);
}
.ideasui-switch-group__description {
  color: oklch(var(--ideasui-color-content-secondary));
  font-size: var(--ideasui-font-size-xs);
  line-height: normal;
}
.ideasui-switch-group__error {
  color: oklch(var(--ideasui-color-danger));
  font-size: var(--ideasui-font-size-xs);
  line-height: normal;
}
.ideasui-switch-group--invalid .ideasui-switch-group__label {
  color: oklch(var(--ideasui-color-danger));
}
.ideasui-switch-group--disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* prefers-reduced-motion — suppressed via @ideasui/styles global rule */
```

---

## 9. All Variants Reference

### Visual Variants

| Variant   | Off state                                            | On state                                |
| --------- | ---------------------------------------------------- | --------------------------------------- |
| `solid`   | `surface-muted` track, white thumb                   | `primary` track, white thumb            |
| `outline` | Transparent track, 2px `border-default`, muted thumb | `primary` border, `primary` thumb       |
| `soft`    | `surface-muted` track, `content-tertiary` thumb      | `primary-subtle` track, `primary` thumb |

### Color Schemes

| `color`   | Token used for on-state track |
| --------- | ----------------------------- |
| `primary` | `--ideasui-color-primary`     |
| `neutral` | `--ideasui-color-neutral`     |
| `success` | `--ideasui-color-success`     |
| `warning` | `--ideasui-color-warning`     |
| `danger`  | `--ideasui-color-danger`      |

### Sizes

| `size` | Track   | Thumb                   | Label text  |
| ------ | ------- | ----------------------- | ----------- |
| `sm`   | 28×16px | 12×12px, translate 12px | `text-xs`   |
| `md`   | 36×20px | 14×14px, translate 16px | `text-sm`   |
| `lg`   | 48×24px | 18×18px, translate 24px | `text-base` |

### Label Placement

| `labelPlacement` | Layout                             |
| ---------------- | ---------------------------------- |
| `end` (default)  | Track → Label (left to right)      |
| `start`          | Label → Track (label before track) |

### States

| State     | Prop                             | Behavior                                                   |
| --------- | -------------------------------- | ---------------------------------------------------------- |
| Off       | —                                | Muted track, thumb at left                                 |
| On        | `isSelected` / `defaultSelected` | Color track, thumb translated right                        |
| Disabled  | `isDisabled`                     | 50% opacity, `pointer-events: none`, `cursor: not-allowed` |
| Read-only | `isReadOnly`                     | `readOnly` on input, no visual change                      |
| Invalid   | `isInvalid`                      | Danger border/fill, danger label color                     |
| Required  | `isRequired`                     | `aria-required`, visual `*` on group label                 |
| Focus     | —                                | 2px `focus` ring via `:focus-visible` on track             |

---

## 10. Switch vs Checkbox — Decision Guide

| Concern              | `Switch`                                                       | `Checkbox`                                   |
| -------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| **Semantic role**    | `role="switch"` — binary on/off, immediate effect              | `type="checkbox"` — selection within a form  |
| **`aria-checked`**   | `true` / `false`                                               | `true` / `false` / `"mixed"` (indeterminate) |
| **Indeterminate**    | Not supported — switches are always binary                     | Supported via `isIndeterminate`              |
| **Immediate effect** | Yes — toggling applies the change immediately (e.g. dark mode) | No — typically submitted with a form         |
| **Group semantics**  | `role="group"` on `SwitchGroup`                                | `role="group"` on `CheckboxGroup`            |
| **Track + thumb**    | Yes — animated pill track with thumb                           | No — square indicator with check icon        |
| **On/Off labels**    | `onLabel` / `offLabel` inside track                            | Not applicable                               |
| **Label placement**  | `start` or `end`                                               | Always `end` (label after indicator)         |

> **Rule:** Use `Switch` for settings that take immediate effect (dark mode, notifications, feature flags). Use `Checkbox` for form selections that are submitted together.

---

## 11. Compound Component Behavior Rules

| Behavior                                      | Rule                                                                                                      |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `isInvalid=true` on group                     | `SwitchGroupDescription` hidden; `SwitchGroupError` rendered with `role="alert"` and `aria-live="polite"` |
| `isInvalid=false` on group                    | `SwitchGroupError` renders nothing (`<></>`); `SwitchGroupDescription` visible                            |
| `isDisabled=true` on group                    | Propagated via context to all child `Switch` components; `pointer-events: none` on group root             |
| `isRequired=true` on group                    | `aria-required` on group root; visual `*` on `SwitchGroupLabel`                                           |
| `value` prop on `Switch` inside group         | Selection state driven by `SwitchGroupContext.selectedValues`; `onGroupChange` called on toggle           |
| `Switch` without group                        | Fully standalone — uses local `isSelected` / `defaultSelected` / `onChange`                               |
| `labelPlacement`                              | Resolved from local prop → group context → default `'end'`                                                |
| `onLabel` / `offLabel`                        | Rendered inside track, `aria-hidden="true"` — decorative only                                             |
| `useRequiredSwitchGroupContext` outside group | Throws a descriptive error — never silently returns `null`                                                |
| `useSwitchGroupContext` outside group         | Returns `null` — safe for standalone `Switch` usage                                                       |
| `groupDescriptionId` / `groupErrorId`         | Auto-generated via `useId()` on group root; wired to `aria-describedby` on group `div`                    |
| `displayName`                                 | Set on all 5 sub-components (`IdeasUI.Switch*`)                                                           |

---

## 12. Accessibility Requirements (WCAG 2.1 AA)

- **`role="switch"`**: Applied via `role="switch"` on the native `<input type="checkbox">` — correctly communicates toggle semantics to screen readers (announced as "switch" not "checkbox").
- **`aria-checked`**: Set to `true` / `false` on the native input — screen readers announce "on" / "off" state.
- **Native input**: Uses `<input type="checkbox" role="switch">` visually hidden via `.sr-only` — full keyboard (`Space` to toggle) and AT support out of the box.
- **`aria-required`**: Set on the group `div` and individual `<input>` when `isRequired=true`. Visual uses `aria-hidden="true"`.
- **`aria-invalid`**: Set on the group `div` and individual `<input>` when `isInvalid=true`.
- **`aria-describedby`**: On the group root — points to `groupErrorId` when `isInvalid=true`, otherwise `groupDescriptionId`.
- **`role="group"`**: Applied to `SwitchGroup` root so screen readers announce it as a logical group.
- **`role="alert"` + `aria-live="polite"`**: On `SwitchGroupError` so error messages are announced when they appear.
- **Track + thumb `aria-hidden`**: The visual track and thumb are wrapped in `aria-hidden="true"` — purely decorative; screen readers skip them entirely.
- **On/Off labels `aria-hidden`**: `onLabel` / `offLabel` spans are inside the `aria-hidden` track — never read by screen readers.
- **Focus ring**: Applied via `:focus-visible` on the hidden native input, visually projected onto the track via adjacent sibling / `focus-within` selector.
- **Keyboard**: `Space` toggles the switch; `Tab` / `Shift+Tab` navigates between switches.
- **Contrast Ratios**: All color tokens map to OKLCH variables meeting or exceeding 4.5:1 contrast in light and dark modes.
- **`prefers-reduced-motion`**: `transition-transform` and `transition-colors` suppressed via the global `@media (prefers-reduced-motion: reduce)` rule in `@ideasui/styles`.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Switch,
  SwitchGroup,
  SwitchGroupLabel,
  SwitchGroupDescription,
  SwitchGroupError,
} from '../src';

it('standalone switch has zero a11y violations', async () => {
  const { container } = render(<Switch defaultSelected>Dark mode</Switch>);
  expect(await axe(container)).toHaveNoViolations();
});

it('switch group has zero a11y violations', async () => {
  const { container } = render(
    <SwitchGroup>
      <SwitchGroupLabel>Notifications</SwitchGroupLabel>
      <Switch value="email">Email</Switch>
      <Switch value="sms">SMS</Switch>
      <SwitchGroupDescription>Enable at least one channel.</SwitchGroupDescription>
    </SwitchGroup>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('invalid group has zero a11y violations', async () => {
  const { container } = render(
    <SwitchGroup isInvalid>
      <SwitchGroupLabel>Required toggles</SwitchGroupLabel>
      <Switch value="terms">Accept terms</Switch>
      <SwitchGroupError>You must accept the terms.</SwitchGroupError>
    </SwitchGroup>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('disabled switch has zero a11y violations', async () => {
  const { container } = render(<Switch isDisabled>Locked setting</Switch>);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 13. Storybook Stories (`switch.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Switch,
  SwitchGroup,
  SwitchGroupLabel,
  SwitchGroupDescription,
  SwitchGroupError,
} from '../src';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Switch>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => <Switch defaultSelected>Enable notifications</Switch>,
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'outline', 'soft'] as const).map((variant) => (
        <Switch key={variant} variant={variant} defaultSelected>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Switch>
      ))}
    </div>
  ),
};

// ── All Color Schemes ───────────────────────────────────────────
export const colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
        <Switch key={color} color={color} defaultSelected>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Switch>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Switch key={size} size={size} defaultSelected>
          Size {size}
        </Switch>
      ))}
    </div>
  ),
};

// ── Label Placement ─────────────────────────────────────────────
export const LabelPlacement: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch labelPlacement="end" defaultSelected>
        Label end (default)
      </Switch>
      <Switch labelPlacement="start" defaultSelected>
        Label start
      </Switch>
    </div>
  ),
};

// ── With On/Off Track Labels ────────────────────────────────────
export const WithTrackLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="lg" onLabel="ON" offLabel="OFF" defaultSelected>
        Feature flag
      </Switch>
      <Switch size="lg" onLabel="YES" offLabel="NO">
        Auto-renew
      </Switch>
    </div>
  ),
};

// ── All States ──────────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch>Off (default)</Switch>
      <Switch defaultSelected>On</Switch>
      <Switch isDisabled>Disabled off</Switch>
      <Switch isDisabled defaultSelected>
        Disabled on
      </Switch>
      <Switch isReadOnly defaultSelected>
        Read-only on
      </Switch>
      <Switch isInvalid>Invalid</Switch>
      <Switch isInvalid defaultSelected>
        Invalid on
      </Switch>
    </div>
  ),
};

// ── Controlled ──────────────────────────────────────────────────
export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div className="flex flex-col gap-3">
        <Switch isSelected={on} onChange={setOn}>
          Dark mode
        </Switch>
        <p className="text-content-secondary text-sm">
          Dark mode is currently: <strong>{on ? 'enabled' : 'disabled'}</strong>
        </p>
      </div>
    );
  },
};

// ── Group Vertical ──────────────────────────────────────────────
export const Group: Story = {
  render: () => (
    <SwitchGroup defaultValue={['email']}>
      <SwitchGroupLabel>Notification channels</SwitchGroupLabel>
      <Switch value="email">Email</Switch>
      <Switch value="sms">SMS</Switch>
      <Switch value="push">Push notifications</Switch>
      <SwitchGroupDescription>Enable at least one channel.</SwitchGroupDescription>
      <SwitchGroupError>Please enable at least one channel.</SwitchGroupError>
    </SwitchGroup>
  ),
};

// ── Group Horizontal ────────────────────────────────────────────
export const GroupHorizontal: Story = {
  render: () => (
    <SwitchGroup orientation="horizontal" defaultValue={['read']}>
      <SwitchGroupLabel>Permissions</SwitchGroupLabel>
      <Switch value="read">Read</Switch>
      <Switch value="write">Write</Switch>
      <Switch value="delete">Delete</Switch>
    </SwitchGroup>
  ),
};

// ── Group Invalid ───────────────────────────────────────────────
export const GroupInvalid: Story = {
  render: () => (
    <SwitchGroup isInvalid>
      <SwitchGroupLabel>Required toggles</SwitchGroupLabel>
      <Switch value="terms">Accept terms</Switch>
      <Switch value="privacy">Accept privacy policy</Switch>
      <SwitchGroupError>You must accept all required terms.</SwitchGroupError>
    </SwitchGroup>
  ),
};

// ── Group Disabled ──────────────────────────────────────────────
export const GroupDisabled: Story = {
  render: () => (
    <SwitchGroup isDisabled defaultValue={['email']}>
      <SwitchGroupLabel>Locked settings</SwitchGroupLabel>
      <Switch value="email">Email</Switch>
      <Switch value="sms">SMS</Switch>
    </SwitchGroup>
  ),
};

// ── Settings Panel Pattern ──────────────────────────────────────
export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      darkMode: false,
      notifications: true,
      autoSave: true,
      analytics: false,
    });

    const toggle = (key: keyof typeof settings) =>
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
      <div className="flex w-72 flex-col gap-3">
        {(Object.entries(settings) as [keyof typeof settings, boolean][]).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-content-primary text-sm capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </span>
            <Switch isSelected={value} onChange={() => toggle(key)} aria-label={key} />
          </div>
        ))}
      </div>
    );
  },
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    labelPlacement: 'end',
    isDisabled: false,
    isInvalid: false,
    defaultSelected: false,
    children: 'Switch label',
  },
  render: (args) => <Switch {...args} />,
};
```

---

## 14. Definition of Done Checklist

- [ ] Package created at `packages/components/switch/`
- [ ] Recipe created at `packages/core/theme/src/recipes/switch.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/switch.css`
- [ ] `index.ts` barrel exports all 5 sub-components, context hooks, and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] All 3 variants (`solid`, `outline`, `soft`) implemented and verified
- [ ] All 5 color schemes (`primary`, `neutral`, `success`, `warning`, `danger`) implemented and verified
- [ ] All 3 sizes (`sm`, `md`, `lg`) implemented and verified with correct thumb translate values
- [ ] Both label placements (`start`, `end`) implemented and verified
- [ ] `onLabel` / `offLabel` track labels implemented with `aria-hidden` on track wrapper
- [ ] `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid` state props propagated via context
- [ ] `Switch` works standalone (no group) and inside `SwitchGroup`
- [ ] `SwitchGroup` manages controlled and uncontrolled `value[]` state
- [ ] `role="switch"` applied to native input — NOT `role="checkbox"`
- [ ] `aria-checked` set to `true` / `false` on native input
- [ ] `groupDescriptionId` / `groupErrorId` auto-generated via `useId()` and wired to `aria-describedby`
- [ ] `SwitchGroupError` renders with `role="alert"` and `aria-live="polite"`
- [ ] `SwitchGroupDescription` hidden when `isInvalid=true`; `SwitchGroupError` hidden when `isInvalid=false`
- [ ] `useRequiredSwitchGroupContext` throws descriptive error when used outside `<SwitchGroup>`
- [ ] `useSwitchGroupContext` returns `null` safely when used outside group (standalone `Switch`)
- [ ] `displayName` set on all 5 sub-components (`IdeasUI.Switch*`)
- [ ] `data-slot` attribute rendered on all sub-components, track, and thumb
- [ ] Thumb translate animation verified at all 3 sizes
- [ ] All semantic OKLCH colors used — no hardcoded colors or `dark:` prefixes
- [ ] `vitest-axe` accessibility tests pass with 0 violations (standalone, group, invalid, disabled)
- [ ] `prefers-reduced-motion` suppression verified via `@ideasui/styles` global rule
- [ ] Storybook stories created (`Default`, `Variants`, `colors`, `Sizes`, `LabelPlacement`, `WithTrackLabels`, `States`, `Controlled`, `Group`, `GroupHorizontal`, `GroupInvalid`, `GroupDisabled`, `SettingsPanel`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/switch.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly

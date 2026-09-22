# Checkbox Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Checkbox` (Compound)
- **Package:** `@ideasui/checkbox`
- **Directory:** `packages/components/checkbox/`
- **Primary Exports:** `Checkbox`, `CheckboxGroup`, `CheckboxGroupLabel`, `CheckboxGroupDescription`, `CheckboxGroupError`
- **Category:** Form / Selection
- **Recipe Location:** `packages/core/theme/src/recipes/checkbox.ts`
- **Standalone CSS:** `packages/core/styles/src/components/checkbox.css`

### Purpose

`Checkbox` is a fully accessible, theme-aware compound form primitive for IdeasUI applications. It supports single and grouped usage, indeterminate state, all visual variants, and full keyboard/screen reader support via React Aria slot composition and `CheckboxGroupContext` for shared state propagation.

Key Features:

- Compound component architecture (`Checkbox`, `CheckboxGroup`, `CheckboxGroupLabel`, `CheckboxGroupDescription`, `CheckboxGroupError`)
- React Aria `react-aria-components` slot integration (`slot="label"`, `slot="description"`, `slot="errorMessage"`)
- Context inheritance via `CheckboxGroupContext` for shared `size`, `variant`, `isDisabled`, `isInvalid`, `isRequired` state
- Visual variants (`solid`, `outline`, `subtle`)
- Color schemes (`primary`, `neutral`, `success`, `warning`, `danger`)
- Size scale (`sm`, `md`, `lg`)
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- Controlled and uncontrolled usage via `isSelected` / `defaultSelected` / `onChange`
- Indeterminate state (`isIndeterminate`) for parent/child selection trees
- Full keyboard navigation and screen reader support (WCAG 2.1 AA)
- `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid` state props
- `data-slot` attributes on every sub-component for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/checkbox/
├── src/
│   ├── checkbox.tsx                  ← Single checkbox (context consumer)
│   ├── checkbox-group.tsx            ← Group root (context provider)
│   ├── checkbox-group-label.tsx      ← Group label sub-component
│   ├── checkbox-group-description.tsx← Group description sub-component
│   ├── checkbox-group-error.tsx      ← Group error message sub-component
│   ├── checkbox-context.ts           ← CheckboxGroupContext + useCheckboxGroupContext
│   ├── checkbox.types.ts             ← Full TypeScript interfaces with JSDoc
│   └── index.ts                      ← Barrel export (public API only)
├── __tests__/
│   └── checkbox.test.tsx             ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── checkbox.stories.tsx          ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── checkbox.ts                       ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── checkbox.css                      ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/checkbox → @ideasui/theme, @ideasui/utils, react-aria-components
@ideasui/react → @ideasui/checkbox (re-export in master barrel)
```

> **Rule:** `@ideasui/checkbox` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Compound Component Architecture

`CheckboxGroup` is the **compound root** — it provides shared state via `CheckboxGroupContext`. `Checkbox` can also be used standalone without a group.

### Slot Map

| Sub-Component              | `data-slot`          | React Aria slot       | Default Element |
| -------------------------- | -------------------- | --------------------- | --------------- |
| `CheckboxGroup`            | `checkbox-group`     | —                     | `<div>`         |
| `CheckboxGroupLabel`       | `group-label`        | `slot="label"`        | `<span>`        |
| `CheckboxGroupDescription` | `group-description`  | `slot="description"`  | `<p>`           |
| `CheckboxGroupError`       | `group-error`        | `slot="errorMessage"` | `<p>`           |
| `Checkbox`                 | `checkbox`           | —                     | `<label>`       |
| `Checkbox` indicator       | `checkbox-indicator` | —                     | `<span>`        |

### Anatomy

```
CheckboxGroup (root — context provider)
├── CheckboxGroupLabel        (slot="label")
├── Checkbox[]                (one or more checkboxes)
│   ├── checkbox-indicator    (visual box + icon)
│   └── checkbox-label-text   (visible label text)
├── CheckboxGroupDescription  (slot="description", hidden when isInvalid)
└── CheckboxGroupError        (slot="errorMessage", shown when isInvalid)

Checkbox (standalone — no group required)
├── checkbox-indicator        (visual box + icon)
└── checkbox-label-text       (visible label text)
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupError,
} from '@ideasui/react';

// Standalone checkbox
<Checkbox defaultSelected>Accept terms and conditions</Checkbox>

// Controlled checkbox
<Checkbox isSelected={agreed} onChange={setAgreed}>
  I agree to the privacy policy
</Checkbox>

// Indeterminate (parent of a selection tree)
<Checkbox isIndeterminate isSelected={someSelected} onChange={handleAll}>
  Select all
</Checkbox>

// Fully composed group
<CheckboxGroup isRequired>
  <CheckboxGroupLabel>Notification preferences</CheckboxGroupLabel>
  <Checkbox value="email">Email</Checkbox>
  <Checkbox value="sms">SMS</Checkbox>
  <Checkbox value="push">Push notifications</Checkbox>
  <CheckboxGroupDescription>Choose at least one channel.</CheckboxGroupDescription>
  <CheckboxGroupError>Please select at least one option.</CheckboxGroupError>
</CheckboxGroup>

// Invalid group
<CheckboxGroup isInvalid>
  <CheckboxGroupLabel>Permissions</CheckboxGroupLabel>
  <Checkbox value="read">Read</Checkbox>
  <Checkbox value="write">Write</Checkbox>
  <CheckboxGroupError>You must select at least one permission.</CheckboxGroupError>
</CheckboxGroup>

// Disabled group
<CheckboxGroup isDisabled>
  <CheckboxGroupLabel>Archived options</CheckboxGroupLabel>
  <Checkbox value="a">Option A</Checkbox>
  <Checkbox value="b">Option B</Checkbox>
</CheckboxGroup>

// Variant + color + size
<Checkbox variant="outline" colorScheme="success" size="lg" defaultSelected>
  Verified
</Checkbox>
```

### TypeScript Definition (`checkbox.types.ts`)

```tsx
import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { CheckboxReturnType } from '@ideasui/theme/recipes';

export type CheckboxVariant = 'solid' | 'outline' | 'subtle';
export type CheckboxColorScheme = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange'
> {
  /**
   * Visual style variant of the checkbox indicator.
   * @default 'solid'
   */
  readonly variant?: CheckboxVariant;

  /**
   * Color scheme applied to the checked/indeterminate state.
   * @default 'primary'
   */
  readonly colorScheme?: CheckboxColorScheme;

  /**
   * Size scale of the checkbox.
   * @default 'md'
   */
  readonly size?: CheckboxSize;

  /**
   * Controlled selected state.
   */
  readonly isSelected?: boolean;

  /**
   * Uncontrolled default selected state.
   * @default false
   */
  readonly defaultSelected?: boolean;

  /**
   * Indeterminate state — used for parent checkboxes in a selection tree.
   * @default false
   */
  readonly isIndeterminate?: boolean;

  /**
   * Marks the checkbox as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks the checkbox as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the checkbox as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the checkbox as invalid.
   * @default false
   */
  readonly isInvalid?: boolean;

  /**
   * Value used when inside a CheckboxGroup.
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
   * Visible label text rendered beside the indicator.
   */
  readonly children?: ReactNode;
}

export interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
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
   * Visual style variant propagated to all child Checkboxes.
   * @default 'solid'
   */
  readonly variant?: CheckboxVariant;

  /**
   * Color scheme propagated to all child Checkboxes.
   * @default 'primary'
   */
  readonly colorScheme?: CheckboxColorScheme;

  /**
   * Size scale propagated to all child Checkboxes.
   * @default 'md'
   */
  readonly size?: CheckboxSize;

  /**
   * Layout direction of the checkbox group.
   * @default 'vertical'
   */
  readonly orientation?: 'vertical' | 'horizontal';

  /**
   * Marks all checkboxes in the group as disabled.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks all checkboxes in the group as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the group as required.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the group as invalid. Shows CheckboxGroupError, hides CheckboxGroupDescription.
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
   * Sub-components: CheckboxGroupLabel, Checkbox[], CheckboxGroupDescription, CheckboxGroupError.
   */
  readonly children: ReactNode;
}

export interface CheckboxGroupLabelProps extends HTMLAttributes<HTMLSpanElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface CheckboxGroupDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface CheckboxGroupErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface CheckboxGroupContextValue {
  readonly variant?: CheckboxVariant;
  readonly colorScheme?: CheckboxColorScheme;
  readonly size?: CheckboxSize;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly groupDescriptionId?: string;
  readonly groupErrorId?: string;
  readonly selectedValues?: string[];
  readonly onGroupChange?: (value: string, checked: boolean) => void;
  readonly styles?: CheckboxReturnType;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/checkbox.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const checkbox = tv({
  slots: {
    root: 'group inline-flex items-center gap-2 cursor-pointer select-none',
    indicator: [
      'relative flex items-center justify-center shrink-0',
      'rounded border transition-all duration-150',
      'focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
    ],
    icon: 'pointer-events-none transition-transform duration-150',
    labelText: 'text-content-primary leading-none transition-colors duration-150',
  },

  variants: {
    variant: {
      solid: {
        indicator: [
          'border-border-default bg-surface-default',
          'group-data-[selected=true]:border-transparent group-data-[selected=true]:bg-primary',
          'group-data-[indeterminate=true]:border-transparent group-data-[indeterminate=true]:bg-primary',
        ],
        icon: 'text-white',
      },
      outline: {
        indicator: [
          'border-2 border-border-default bg-transparent',
          'group-data-[selected=true]:border-primary',
          'group-data-[indeterminate=true]:border-primary',
        ],
        icon: 'text-primary',
      },
      subtle: {
        indicator: [
          'border-transparent bg-surface-muted',
          'group-data-[selected=true]:bg-primary-subtle group-data-[selected=true]:border-primary-subtle',
          'group-data-[indeterminate=true]:bg-primary-subtle',
        ],
        icon: 'text-primary',
      },
    },

    colorScheme: {
      primary: {
        indicator:
          'group-data-[selected=true]:bg-primary group-data-[selected=true]:border-primary',
      },
      neutral: {
        indicator:
          'group-data-[selected=true]:bg-neutral group-data-[selected=true]:border-neutral',
      },
      success: {
        indicator:
          'group-data-[selected=true]:bg-success group-data-[selected=true]:border-success',
      },
      warning: {
        indicator:
          'group-data-[selected=true]:bg-warning group-data-[selected=true]:border-warning',
      },
      danger: {
        indicator: 'group-data-[selected=true]:bg-danger group-data-[selected=true]:border-danger',
      },
    },

    size: {
      sm: {
        root: 'gap-1.5',
        indicator: 'size-3.5 rounded-[3px]',
        icon: 'size-2.5',
        labelText: 'text-xs',
      },
      md: {
        root: 'gap-2',
        indicator: 'size-4 rounded',
        icon: 'size-3',
        labelText: 'text-sm',
      },
      lg: {
        root: 'gap-2.5',
        indicator: 'size-5 rounded-md',
        icon: 'size-3.5',
        labelText: 'text-base',
      },
    },

    isInvalid: {
      true: {
        indicator:
          'border-danger group-data-[selected=true]:bg-danger group-data-[selected=true]:border-danger',
        labelText: 'text-danger',
      },
    },

    isDisabled: {
      true: {
        root: 'cursor-not-allowed opacity-50 pointer-events-none',
        labelText: 'text-content-muted',
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    isInvalid: false,
    isDisabled: false,
  },
});

export const checkboxGroup = tv({
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
      true: {
        groupLabel: 'text-danger',
      },
    },
    isDisabled: {
      true: {
        root: 'opacity-50 pointer-events-none',
      },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    isInvalid: false,
    isDisabled: false,
  },
});

export type CheckboxVariants = VariantProps<typeof checkbox>;
export type CheckboxGroupVariants = VariantProps<typeof checkboxGroup>;
export type CheckboxReturnType = ReturnType<typeof checkbox>;
export type CheckboxGroupReturnType = ReturnType<typeof checkboxGroup>;
```

---

## 6. Context Definition (`packages/components/checkbox/src/checkbox-context.ts`)

`CheckboxGroup` uses **native React context** for shared state propagation across child `Checkbox` components.

> **Rule:** Do NOT replace `useContext` with `useContextProps` here. React Aria slot wiring is handled by passing `slot` props directly to sub-component DOM elements.

```tsx
import type { CheckboxGroupContextValue } from './checkbox.types';
import { createContext, useContext } from 'react';

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext(): CheckboxGroupContextValue | null {
  return useContext(CheckboxGroupContext);
}

export function useRequiredCheckboxGroupContext(): CheckboxGroupContextValue {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error(
      'useRequiredCheckboxGroupContext must be used within a <CheckboxGroup> component.',
    );
  }
  return context;
}
```

> `Checkbox` calls `useCheckboxGroupContext()` (nullable) so it works both standalone and inside a group. Group-specific sub-components (`CheckboxGroupLabel`, etc.) call `useRequiredCheckboxGroupContext()` and throw if used outside a group.

---

## 7. Component Implementation

### Root Group (`checkbox-group.tsx`)

```tsx
'use client';

import type { CheckboxGroupProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef, useId, useState, useCallback } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { CheckboxGroupContext } from './checkbox-context';

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      variant = 'solid',
      colorScheme = 'primary',
      size = 'md',
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

    const groupStyles = checkboxGroup({ orientation, isInvalid, isDisabled });

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
      <CheckboxGroupContext.Provider
        value={{
          variant,
          colorScheme,
          size,
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
          data-slot="checkbox-group"
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
      </CheckboxGroupContext.Provider>
    );
  },
);

CheckboxGroup.displayName = 'IdeasUI.CheckboxGroup';
```

### Checkbox (`checkbox.tsx`)

```tsx
'use client';

import type { CheckboxProps } from './checkbox.types';
import type { ChangeEvent, JSX } from 'react';

import { forwardRef, useId, useRef, useEffect } from 'react';
import { checkbox as checkboxRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useCheckboxGroupContext } from './checkbox-context';

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M2 6l3 3 5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
    <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant,
      colorScheme,
      size,
      isSelected,
      defaultSelected = false,
      isIndeterminate = false,
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
    const group = useCheckboxGroupContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();

    // Merge group context with local props (local props take precedence)
    const resolvedVariant = variant ?? group?.variant ?? 'solid';
    const resolvedColorScheme = colorScheme ?? group?.colorScheme ?? 'primary';
    const resolvedSize = size ?? group?.size ?? 'md';
    const resolvedDisabled = isDisabled ?? group?.isDisabled ?? false;
    const resolvedReadOnly = isReadOnly ?? group?.isReadOnly ?? false;
    const resolvedRequired = isRequired ?? group?.isRequired ?? false;
    const resolvedInvalid = isInvalid ?? group?.isInvalid ?? false;

    // Determine selected state
    const isGroupControlled = group !== null && value !== undefined;
    const resolvedSelected = isGroupControlled
      ? (group?.selectedValues?.includes(value!) ?? false)
      : (isSelected ?? defaultSelected);

    // Sync indeterminate DOM property (not an HTML attribute)
    useEffect(() => {
      const el = (reference as React.RefObject<HTMLInputElement>)?.current ?? inputRef.current;
      if (el) el.indeterminate = isIndeterminate;
    }, [isIndeterminate, reference]);

    const styles = checkboxRecipe({
      variant: resolvedVariant,
      colorScheme: resolvedColorScheme,
      size: resolvedSize,
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
        data-slot="checkbox"
        data-selected={resolvedSelected || undefined}
        data-indeterminate={isIndeterminate || undefined}
        data-disabled={resolvedDisabled || undefined}
        data-invalid={resolvedInvalid || undefined}
        data-readonly={resolvedReadOnly || undefined}
        style={style}
      >
        <input
          ref={reference ?? inputRef}
          id={inputId}
          type="checkbox"
          className="sr-only"
          checked={resolvedSelected}
          disabled={resolvedDisabled}
          readOnly={resolvedReadOnly}
          required={resolvedRequired}
          aria-required={resolvedRequired || undefined}
          aria-invalid={resolvedInvalid || undefined}
          aria-checked={isIndeterminate ? 'mixed' : resolvedSelected}
          value={value}
          onChange={handleChange}
          data-slot="checkbox-input"
          {...properties}
        />
        <span className={cn(styles.indicator())} data-slot="checkbox-indicator" aria-hidden="true">
          {isIndeterminate ? <IndeterminateIcon /> : resolvedSelected ? <CheckIcon /> : null}
        </span>
        {children && (
          <span className={cn(styles.labelText())} data-slot="checkbox-label-text">
            {children}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'IdeasUI.Checkbox';
```

### Group Label (`checkbox-group-label.tsx`)

```tsx
'use client';

import type { CheckboxGroupLabelProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useRequiredCheckboxGroupContext } from './checkbox-context';

export const CheckboxGroupLabel = forwardRef<HTMLSpanElement, CheckboxGroupLabelProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { isDisabled, isRequired } = useRequiredCheckboxGroupContext();
    const styles = checkboxGroup();

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

CheckboxGroupLabel.displayName = 'IdeasUI.CheckboxGroupLabel';
```

### Group Description (`checkbox-group-description.tsx`)

```tsx
'use client';

import type { CheckboxGroupDescriptionProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useRequiredCheckboxGroupContext } from './checkbox-context';

export const CheckboxGroupDescription = forwardRef<
  HTMLParagraphElement,
  CheckboxGroupDescriptionProps
>(({ className, children, ...properties }, reference): JSX.Element => {
  const { isInvalid, groupDescriptionId } = useRequiredCheckboxGroupContext();
  const styles = checkboxGroup();

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
});

CheckboxGroupDescription.displayName = 'IdeasUI.CheckboxGroupDescription';
```

### Group Error (`checkbox-group-error.tsx`)

```tsx
'use client';

import type { CheckboxGroupErrorProps } from './checkbox.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { checkboxGroup } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useRequiredCheckboxGroupContext } from './checkbox-context';

export const CheckboxGroupError = forwardRef<HTMLParagraphElement, CheckboxGroupErrorProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { isInvalid, groupErrorId } = useRequiredCheckboxGroupContext();
    const styles = checkboxGroup();

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

CheckboxGroupError.displayName = 'IdeasUI.CheckboxGroupError';
```

### Barrel Export (`index.ts`)

```tsx
export { Checkbox } from './checkbox';
export { CheckboxGroup } from './checkbox-group';
export { CheckboxGroupLabel } from './checkbox-group-label';
export { CheckboxGroupDescription } from './checkbox-group-description';
export { CheckboxGroupError } from './checkbox-group-error';
export {
  CheckboxGroupContext,
  useCheckboxGroupContext,
  useRequiredCheckboxGroupContext,
} from './checkbox-context';

export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxGroupLabelProps,
  CheckboxGroupDescriptionProps,
  CheckboxGroupErrorProps,
  CheckboxGroupContextValue,
  CheckboxVariant,
  CheckboxColorScheme,
  CheckboxSize,
} from './checkbox.types';
```

---

## 8. Standalone BEM CSS Specification (`packages/core/styles/src/components/checkbox.css`)

For standalone CSS usage (without Tailwind), `@ideasui/styles` exports BEM modifiers mapping to OKLCH custom properties:

```css
/* ─── Root label ─────────────────────────────────────────────── */
.ideasui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--ideasui-spacing-2, 0.5rem);
  cursor: pointer;
  user-select: none;
}
.ideasui-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Hidden native input ─────────────────────────────────────── */
.ideasui-checkbox__input {
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

/* ─── Visual indicator ────────────────────────────────────────── */
.ideasui-checkbox__indicator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid oklch(var(--ideasui-color-border-default));
  border-radius: var(--ideasui-radius-sm, 0.25rem);
  background-color: oklch(var(--ideasui-color-surface-default));
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}
.ideasui-checkbox__input:focus-visible + .ideasui-checkbox__indicator {
  box-shadow: 0 0 0 2px oklch(var(--ideasui-color-focus));
  outline: none;
}

/* Sizes */
.ideasui-checkbox__indicator--sm {
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 3px;
}
.ideasui-checkbox__indicator--md {
  width: 1rem;
  height: 1rem;
  border-radius: var(--ideasui-radius-sm);
}
.ideasui-checkbox__indicator--lg {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--ideasui-radius-md);
}

/* ─── Variant: solid (default) ────────────────────────────────── */
.ideasui-checkbox--solid[data-selected] .ideasui-checkbox__indicator,
.ideasui-checkbox--solid[data-indeterminate] .ideasui-checkbox__indicator {
  background-color: oklch(var(--ideasui-color-primary));
  border-color: oklch(var(--ideasui-color-primary));
}

/* ─── Variant: outline ────────────────────────────────────────── */
.ideasui-checkbox--outline .ideasui-checkbox__indicator {
  border-width: 2px;
  background-color: transparent;
}
.ideasui-checkbox--outline[data-selected] .ideasui-checkbox__indicator,
.ideasui-checkbox--outline[data-indeterminate] .ideasui-checkbox__indicator {
  border-color: oklch(var(--ideasui-color-primary));
  background-color: transparent;
}

/* ─── Variant: subtle ─────────────────────────────────────────── */
.ideasui-checkbox--subtle .ideasui-checkbox__indicator {
  border-color: transparent;
  background-color: oklch(var(--ideasui-color-surface-muted));
}
.ideasui-checkbox--subtle[data-selected] .ideasui-checkbox__indicator,
.ideasui-checkbox--subtle[data-indeterminate] .ideasui-checkbox__indicator {
  background-color: oklch(var(--ideasui-color-primary-subtle));
  border-color: oklch(var(--ideasui-color-primary-subtle));
}

/* ─── Color schemes ───────────────────────────────────────────── */
.ideasui-checkbox--neutral[data-selected] .ideasui-checkbox__indicator {
  background-color: oklch(var(--ideasui-color-neutral));
  border-color: oklch(var(--ideasui-color-neutral));
}
.ideasui-checkbox--success[data-selected] .ideasui-checkbox__indicator {
  background-color: oklch(var(--ideasui-color-success));
  border-color: oklch(var(--ideasui-color-success));
}
.ideasui-checkbox--warning[data-selected] .ideasui-checkbox__indicator {
  background-color: oklch(var(--ideasui-color-warning));
  border-color: oklch(var(--ideasui-color-warning));
}
.ideasui-checkbox--danger[data-selected] .ideasui-checkbox__indicator {
  background-color: oklch(var(--ideasui-color-danger));
  border-color: oklch(var(--ideasui-color-danger));
}

/* ─── Invalid state ───────────────────────────────────────────── */
.ideasui-checkbox--invalid .ideasui-checkbox__indicator {
  border-color: oklch(var(--ideasui-color-danger));
}
.ideasui-checkbox--invalid[data-selected] .ideasui-checkbox__indicator {
  background-color: oklch(var(--ideasui-color-danger));
  border-color: oklch(var(--ideasui-color-danger));
}
.ideasui-checkbox--invalid .ideasui-checkbox__label-text {
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Icon ────────────────────────────────────────────────────── */
.ideasui-checkbox__icon {
  pointer-events: none;
  color: white;
  transition: transform 150ms ease;
}
.ideasui-checkbox--outline .ideasui-checkbox__icon,
.ideasui-checkbox--subtle .ideasui-checkbox__icon {
  color: oklch(var(--ideasui-color-primary));
}

/* ─── Label text ──────────────────────────────────────────────── */
.ideasui-checkbox__label-text {
  color: oklch(var(--ideasui-color-content-primary));
  line-height: 1;
  transition: color 150ms ease;
}
.ideasui-checkbox__label-text--sm {
  font-size: var(--ideasui-font-size-xs);
}
.ideasui-checkbox__label-text--md {
  font-size: var(--ideasui-font-size-sm);
}
.ideasui-checkbox__label-text--lg {
  font-size: var(--ideasui-font-size-base);
}

/* ─── Group ───────────────────────────────────────────────────── */
.ideasui-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--ideasui-spacing-2, 0.5rem);
  width: 100%;
}
.ideasui-checkbox-group--horizontal .ideasui-checkbox-group__items {
  flex-direction: row;
  flex-wrap: wrap;
}
.ideasui-checkbox-group__label {
  color: oklch(var(--ideasui-color-content-primary));
  font-size: var(--ideasui-font-size-sm);
  font-weight: var(--ideasui-font-weight-medium, 500);
}
.ideasui-checkbox-group__label--required::after {
  content: ' *';
  color: oklch(var(--ideasui-color-danger));
}
.ideasui-checkbox-group__items {
  display: flex;
  flex-direction: column;
  gap: var(--ideasui-spacing-2, 0.5rem);
}
.ideasui-checkbox-group__description {
  color: oklch(var(--ideasui-color-content-secondary));
  font-size: var(--ideasui-font-size-xs);
  line-height: normal;
}
.ideasui-checkbox-group__error {
  color: oklch(var(--ideasui-color-danger));
  font-size: var(--ideasui-font-size-xs);
  line-height: normal;
}
.ideasui-checkbox-group--invalid .ideasui-checkbox-group__label {
  color: oklch(var(--ideasui-color-danger));
}
.ideasui-checkbox-group--disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* prefers-reduced-motion — suppressed via @ideasui/styles global rule */
```

---

## 9. All Variants Reference

### Visual Variants

| Variant   | Unchecked                     | Checked                                        | Indeterminate                               |
| --------- | ----------------------------- | ---------------------------------------------- | ------------------------------------------- |
| `solid`   | White bg, default border      | Filled `primary` bg, no border                 | Filled `primary` bg, dash icon              |
| `outline` | Transparent bg, 2px border    | Transparent bg, `primary` border, colored icon | Transparent bg, `primary` border, dash icon |
| `subtle`  | `surface-muted` bg, no border | `primary-subtle` bg, colored icon              | `primary-subtle` bg, dash icon              |

### Color Schemes

| `colorScheme` | Token used for checked bg/border |
| ------------- | -------------------------------- |
| `primary`     | `--ideasui-color-primary`        |
| `neutral`     | `--ideasui-color-neutral`        |
| `success`     | `--ideasui-color-success`        |
| `warning`     | `--ideasui-color-warning`        |
| `danger`      | `--ideasui-color-danger`         |

### Sizes

| `size` | Indicator           | Icon    | Label text  |
| ------ | ------------------- | ------- | ----------- |
| `sm`   | 14×14px, radius 3px | 10×10px | `text-xs`   |
| `md`   | 16×16px, radius sm  | 12×12px | `text-sm`   |
| `lg`   | 20×20px, radius md  | 14×14px | `text-base` |

### States

| State         | Prop                             | Behavior                                                   |
| ------------- | -------------------------------- | ---------------------------------------------------------- |
| Default       | —                                | Unchecked, interactive                                     |
| Checked       | `isSelected` / `defaultSelected` | Filled indicator + check icon                              |
| Indeterminate | `isIndeterminate`                | Dash icon, `aria-checked="mixed"`                          |
| Disabled      | `isDisabled`                     | 50% opacity, `pointer-events: none`, `cursor: not-allowed` |
| Read-only     | `isReadOnly`                     | `readOnly` on input, no visual change                      |
| Invalid       | `isInvalid`                      | Danger border/fill, danger label color                     |
| Required      | `isRequired`                     | `aria-required`, visual `*` on group label                 |
| Focus         | —                                | 2px `focus` ring via `:focus-visible`                      |

---

## 10. Compound Component Behavior Rules

| Behavior                                        | Rule                                                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `isInvalid=true` on group                       | `CheckboxGroupDescription` hidden; `CheckboxGroupError` rendered with `role="alert"` and `aria-live="polite"` |
| `isInvalid=false` on group                      | `CheckboxGroupError` renders nothing (`<></>`); `CheckboxGroupDescription` visible                            |
| `isDisabled=true` on group                      | Propagated via context to all child `Checkbox` components; `pointer-events: none` on group root               |
| `isRequired=true` on group                      | `aria-required` on group root; visual `*` on `CheckboxGroupLabel`                                             |
| `isIndeterminate=true`                          | `aria-checked="mixed"` on native input; `indeterminate` DOM property set via `useEffect`; dash icon rendered  |
| `value` prop on `Checkbox` inside group         | Selection state driven by `CheckboxGroupContext.selectedValues`; `onGroupChange` called on toggle             |
| `Checkbox` without group                        | Fully standalone — uses local `isSelected` / `defaultSelected` / `onChange`                                   |
| `useRequiredCheckboxGroupContext` outside group | Throws a descriptive error — never silently returns `null`                                                    |
| `useCheckboxGroupContext` outside group         | Returns `null` — safe for standalone `Checkbox` usage                                                         |
| `groupDescriptionId` / `groupErrorId`           | Auto-generated via `useId()` on group root; wired to `aria-describedby` on group `div`                        |
| `displayName`                                   | Set on all 5 sub-components (`IdeasUI.Checkbox*`)                                                             |

---

## 11. Accessibility Requirements (WCAG 2.1 AA)

- **Native input**: Uses `<input type="checkbox">` visually hidden via `.sr-only` — full keyboard and AT support out of the box.
- **`aria-checked="mixed"`**: Set on the native input when `isIndeterminate=true` to correctly announce indeterminate state to screen readers.
- **`aria-required`**: Set on the group `div` and individual `<input>` when `isRequired=true`. Visual uses `aria-hidden="true"`.
- **`aria-invalid`**: Set on the group `div` and individual `<input>` when `isInvalid=true`.
- **`aria-describedby`**: On the group root — points to `groupErrorId` when `isInvalid=true`, otherwise `groupDescriptionId`.
- **`role="group"`**: Applied to `CheckboxGroup` root so screen readers announce it as a fieldset-equivalent group.
- **`role="alert"` + `aria-live="polite"`**: On `CheckboxGroupError` so error messages are announced when they appear.
- **Focus ring**: Applied via `:focus-visible` on the hidden native input, visually projected onto the indicator via adjacent sibling selector.
- **Contrast Ratios**: All color tokens map to OKLCH variables meeting or exceeding 4.5:1 contrast in light and dark modes.
- **`prefers-reduced-motion`**: Transitions suppressed via the global `@media (prefers-reduced-motion: reduce)` rule in `@ideasui/styles`.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupError,
} from '../src';

it('standalone checkbox has zero a11y violations', async () => {
  const { container } = render(<Checkbox defaultSelected>Accept terms</Checkbox>);
  expect(await axe(container)).toHaveNoViolations();
});

it('checkbox group has zero a11y violations', async () => {
  const { container } = render(
    <CheckboxGroup>
      <CheckboxGroupLabel>Options</CheckboxGroupLabel>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <CheckboxGroupDescription>Select all that apply.</CheckboxGroupDescription>
    </CheckboxGroup>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('invalid group has zero a11y violations', async () => {
  const { container } = render(
    <CheckboxGroup isInvalid>
      <CheckboxGroupLabel>Options</CheckboxGroupLabel>
      <Checkbox value="a">Option A</Checkbox>
      <CheckboxGroupError>Select at least one option.</CheckboxGroupError>
    </CheckboxGroup>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('indeterminate checkbox has zero a11y violations', async () => {
  const { container } = render(
    <Checkbox isIndeterminate isSelected>
      Select all
    </Checkbox>,
  );
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 12. Storybook Stories (`checkbox.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupError,
} from '../src';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Standalone ──────────────────────────────────────────────────
export const Default: Story = {
  render: () => <Checkbox defaultSelected>Accept terms and conditions</Checkbox>,
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'outline', 'subtle'] as const).map((variant) => (
        <Checkbox key={variant} variant={variant} defaultSelected>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Checkbox>
      ))}
    </div>
  ),
};

// ── All Color Schemes ───────────────────────────────────────────
export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((colorScheme) => (
        <Checkbox key={colorScheme} colorScheme={colorScheme} defaultSelected>
          {colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}
        </Checkbox>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Checkbox key={size} size={size} defaultSelected>
          Size {size}
        </Checkbox>
      ))}
    </div>
  ),
};

// ── States ──────────────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultSelected>Checked</Checkbox>
      <Checkbox isIndeterminate isSelected>
        Indeterminate
      </Checkbox>
      <Checkbox isDisabled>Disabled unchecked</Checkbox>
      <Checkbox isDisabled defaultSelected>
        Disabled checked
      </Checkbox>
      <Checkbox isInvalid>Invalid</Checkbox>
      <Checkbox isReadOnly defaultSelected>
        Read-only
      </Checkbox>
    </div>
  ),
};

// ── Indeterminate (select-all pattern) ──────────────────────────
export const IndeterminateSelectAll: Story = {
  render: () => {
    const options = ['Email', 'SMS', 'Push'];
    const [selected, setSelected] = useState<string[]>([]);
    const allSelected = selected.length === options.length;
    const someSelected = selected.length > 0 && !allSelected;

    const toggleAll = (checked: boolean) => setSelected(checked ? [...options] : []);
    const toggleOne = (value: string, checked: boolean) =>
      setSelected((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));

    return (
      <div className="flex flex-col gap-2">
        <Checkbox isSelected={allSelected} isIndeterminate={someSelected} onChange={toggleAll}>
          Select all
        </Checkbox>
        {options.map((opt) => (
          <Checkbox
            key={opt}
            value={opt}
            isSelected={selected.includes(opt)}
            onChange={(checked) => toggleOne(opt, checked)}
            className="ml-6"
          >
            {opt}
          </Checkbox>
        ))}
      </div>
    );
  },
};

// ── Group ───────────────────────────────────────────────────────
export const Group: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['email']}>
      <CheckboxGroupLabel>Notification channels</CheckboxGroupLabel>
      <Checkbox value="email">Email</Checkbox>
      <Checkbox value="sms">SMS</Checkbox>
      <Checkbox value="push">Push notifications</Checkbox>
      <CheckboxGroupDescription>Choose at least one channel.</CheckboxGroupDescription>
      <CheckboxGroupError>Please select at least one option.</CheckboxGroupError>
    </CheckboxGroup>
  ),
};

// ── Group Horizontal ────────────────────────────────────────────
export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup orientation="horizontal" defaultValue={['read']}>
      <CheckboxGroupLabel>Permissions</CheckboxGroupLabel>
      <Checkbox value="read">Read</Checkbox>
      <Checkbox value="write">Write</Checkbox>
      <Checkbox value="delete">Delete</Checkbox>
    </CheckboxGroup>
  ),
};

// ── Group Invalid ───────────────────────────────────────────────
export const GroupInvalid: Story = {
  render: () => (
    <CheckboxGroup isInvalid>
      <CheckboxGroupLabel>Required options</CheckboxGroupLabel>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <CheckboxGroupError>You must select at least one option.</CheckboxGroupError>
    </CheckboxGroup>
  ),
};

// ── Group Disabled ──────────────────────────────────────────────
export const GroupDisabled: Story = {
  render: () => (
    <CheckboxGroup isDisabled defaultValue={['a']}>
      <CheckboxGroupLabel>Archived settings</CheckboxGroupLabel>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
    </CheckboxGroup>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
    isInvalid: false,
    isIndeterminate: false,
    defaultSelected: false,
    children: 'Checkbox label',
  },
  render: (args) => <Checkbox {...args} />,
};
```

---

## 13. Definition of Done Checklist

- [ ] Package created at `packages/components/checkbox/`
- [ ] Recipe created at `packages/core/theme/src/recipes/checkbox.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/checkbox.css`
- [ ] `index.ts` barrel exports all 5 sub-components, context hooks, and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] All 3 variants (`solid`, `outline`, `subtle`) implemented and verified
- [ ] All 5 color schemes (`primary`, `neutral`, `success`, `warning`, `danger`) implemented and verified
- [ ] All 3 sizes (`sm`, `md`, `lg`) implemented and verified
- [ ] `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid` state props propagated via context
- [ ] `isIndeterminate` sets `aria-checked="mixed"` and syncs `indeterminate` DOM property via `useEffect`
- [ ] `Checkbox` works standalone (no group) and inside `CheckboxGroup`
- [ ] `CheckboxGroup` manages controlled and uncontrolled `value[]` state
- [ ] `groupDescriptionId` / `groupErrorId` auto-generated via `useId()` and wired to `aria-describedby`
- [ ] `CheckboxGroupError` renders with `role="alert"` and `aria-live="polite"`
- [ ] `CheckboxGroupDescription` hidden when `isInvalid=true`; `CheckboxGroupError` hidden when `isInvalid=false`
- [ ] `useRequiredCheckboxGroupContext` throws descriptive error when used outside `<CheckboxGroup>`
- [ ] `useCheckboxGroupContext` returns `null` safely when used outside group (standalone `Checkbox`)
- [ ] `displayName` set on all 5 sub-components (`IdeasUI.Checkbox*`)
- [ ] `data-slot` attribute rendered on all sub-components and indicator
- [ ] All semantic OKLCH colors used — no hardcoded colors or `dark:` prefixes
- [ ] `vitest-axe` accessibility tests pass with 0 violations (standalone, group, invalid, indeterminate)
- [ ] `prefers-reduced-motion` suppression verified via `@ideasui/styles` global rule
- [ ] Storybook stories created (`Default`, `Variants`, `ColorSchemes`, `Sizes`, `States`, `IndeterminateSelectAll`, `Group`, `GroupHorizontal`, `GroupInvalid`, `GroupDisabled`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/checkbox.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly

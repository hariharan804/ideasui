# InputField Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `InputField` (Compound)
- **Package:** `@ideasui/input-field`
- **Directory:** `packages/components/input-field/`
- **Primary Exports:** `InputField`, `InputFieldLabel`, `InputFieldInput`, `InputFieldDescription`, `InputFieldError`
- **Category:** Form / Foundation
- **Recipe Location:** `packages/core/theme/src/recipes/input-field.ts`
- **Standalone CSS:** `packages/core/styles/src/components/input-field.css`

### Purpose

`InputField` is a fully accessible, theme-aware compound form primitive for IdeasUI applications. It composes a label, input, description, and error message into a single cohesive unit using React Aria slot composition and `InputFieldContext` for shared state propagation.

Key Features:

- Compound component architecture (`InputField`, `InputFieldLabel`, `InputFieldInput`, `InputFieldDescription`, `InputFieldError`)
- React Aria `react-aria-components` slot integration (`slot="label"`, `slot="description"`, `slot="errorMessage"`)
- Context inheritance via `InputFieldContext` for shared `size`, `variant`, `isDisabled`, `isInvalid`, `isRequired` state
- Input variants (`outline`, `filled`, `flushed`, `unstyled`)
- Size scale (`sm`, `md`, `lg`)
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- Start and end adornment slots (`startContent`, `endContent`)
- Controlled and uncontrolled usage via `value` / `defaultValue` / `onChange`
- Full keyboard navigation and screen reader support (WCAG 2.1 AA)
- `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid` state props
- `data-slot` attributes on every sub-component for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/input-field/
├── src/
│   ├── input-field.tsx             ← Root compound wrapper (context provider)
│   ├── input-field-label.tsx       ← Label sub-component
│   ├── input-field-input.tsx       ← Native input sub-component
│   ├── input-field-description.tsx ← Helper description sub-component
│   ├── input-field-error.tsx       ← Error message sub-component
│   ├── input-field-context.ts      ← InputFieldContext + useInputFieldContext
│   ├── input-field.types.ts        ← Full TypeScript interfaces with JSDoc
│   └── index.ts                    ← Barrel export (public API only)
├── __tests__/
│   └── input-field.test.tsx        ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── input-field.stories.tsx     ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── input-field.ts                  ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── input-field.css                 ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/input-field → @ideasui/theme, @ideasui/utils, react-aria-components
@ideasui/react → @ideasui/input-field (re-export in master barrel)
```

> **Rule:** `@ideasui/input-field` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Compound Component Architecture

`InputField` is a **compound component** — the root provides shared state via `InputFieldContext`, and each sub-component reads from that context to stay in sync.

### Slot Map

| Sub-Component           | `data-slot`     | React Aria slot       | Default Element |
| ----------------------- | --------------- | --------------------- | --------------- |
| `InputField`            | `input-field`   | —                     | `<div>`         |
| `InputFieldLabel`       | `label`         | `slot="label"`        | `<label>`       |
| `InputFieldInput`       | `input`         | —                     | `<input>`       |
| `InputFieldDescription` | `description`   | `slot="description"`  | `<p>`           |
| `InputFieldError`       | `error-message` | `slot="errorMessage"` | `<p>`           |

### Anatomy

```
InputField (root — context provider)
├── InputFieldLabel       (slot="label")
├── InputFieldInput       (native input + adornments)
│   ├── startContent      (optional icon/adornment)
│   └── endContent        (optional icon/adornment)
├── InputFieldDescription (slot="description", hidden when isInvalid)
└── InputFieldError       (slot="errorMessage", shown when isInvalid)
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import {
  InputField,
  InputFieldLabel,
  InputFieldInput,
  InputFieldDescription,
  InputFieldError,
} from '@ideasui/react';

// Fully composed usage
<InputField size="md" variant="outline" isRequired>
  <InputFieldLabel>Email address</InputFieldLabel>
  <InputFieldInput
    type="email"
    placeholder="you@example.com"
    startContent={<MailIcon />}
  />
  <InputFieldDescription>We will never share your email.</InputFieldDescription>
  <InputFieldError>Please enter a valid email address.</InputFieldError>
</InputField>

// Invalid state
<InputField isInvalid>
  <InputFieldLabel>Username</InputFieldLabel>
  <InputFieldInput placeholder="Enter username" />
  <InputFieldError>Username is already taken.</InputFieldError>
</InputField>

// Disabled state
<InputField isDisabled>
  <InputFieldLabel>API Key</InputFieldLabel>
  <InputFieldInput value="sk-••••••••••••" isReadOnly />
</InputField>
```

### TypeScript Definition (`input-field.types.ts`)

```tsx
import type {
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';
import type { InputFieldReturnType } from '@ideasui/theme/recipes';

export type InputFieldVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';
export type InputFieldSize = 'sm' | 'md' | 'lg';

export interface InputFieldProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant of the input.
   * @default 'outline'
   */
  readonly variant?: InputFieldVariant;

  /**
   * Size scale of the input field.
   * @default 'md'
   */
  readonly size?: InputFieldSize;

  /**
   * Marks the field as disabled. Propagated to all sub-components via context.
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Marks the field as read-only.
   * @default false
   */
  readonly isReadOnly?: boolean;

  /**
   * Marks the field as required. Adds `aria-required` to the input.
   * @default false
   */
  readonly isRequired?: boolean;

  /**
   * Marks the field as invalid. Shows `InputFieldError`, hides `InputFieldDescription`.
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
   * Sub-components: InputFieldLabel, InputFieldInput, InputFieldDescription, InputFieldError.
   */
  readonly children: ReactNode;
}

export interface InputFieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  readonly children: ReactNode;
}

export interface InputFieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Element rendered before the input (e.g. icon, currency symbol).
   */
  readonly startContent?: ReactNode;

  /**
   * Element rendered after the input (e.g. icon, clear button).
   */
  readonly endContent?: ReactNode;

  /**
   * Custom CSS class names merged via `cn()` on the input wrapper.
   */
  readonly className?: string;

  /**
   * Custom CSS class names merged via `cn()` on the native `<input>` element.
   */
  readonly inputClassName?: string;
}

export interface InputFieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  readonly children: ReactNode;
}

export interface InputFieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  readonly children: ReactNode;
}

export interface InputFieldContextValue {
  readonly variant?: InputFieldVariant;
  readonly size?: InputFieldSize;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly inputId?: string;
  readonly descriptionId?: string;
  readonly errorId?: string;
  readonly styles?: InputFieldReturnType;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/input-field.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const inputField = tv({
  slots: {
    root: 'flex flex-col gap-1.5 w-full',
    label: [
      'text-content-primary',
      'text-sm font-medium',
      'transition-colors duration-150',
      'data-[disabled=true]:text-content-muted',
    ],
    wrapper: [
      'flex items-center w-full',
      'transition-colors duration-150',
      'focus-within:ring-2 focus-within:ring-focus',
    ],
    input: [
      'flex-1 min-w-0 bg-transparent',
      'text-content-primary placeholder:text-content-muted',
      'outline-none',
      'disabled:cursor-not-allowed disabled:text-content-muted',
    ],
    startContent: 'flex items-center text-content-tertiary shrink-0',
    endContent: 'flex items-center text-content-tertiary shrink-0',
    description: 'text-content-secondary text-xs leading-normal',
    errorMessage: 'text-danger text-xs leading-normal',
  },

  variants: {
    variant: {
      outline: {
        wrapper:
          'border border-border-default rounded-md bg-surface-default hover:border-border-strong',
      },
      filled: {
        wrapper: 'border border-transparent rounded-md bg-surface-muted hover:bg-surface-subtle',
      },
      flushed: {
        wrapper:
          'border-b border-border-default rounded-none bg-transparent hover:border-border-strong',
      },
      unstyled: {
        wrapper: 'border-none bg-transparent',
      },
    },

    size: {
      sm: {
        wrapper: 'h-8 px-2.5 gap-1.5 text-sm',
        input: 'text-sm',
        label: 'text-xs',
      },
      md: {
        wrapper: 'h-10 px-3 gap-2 text-base',
        input: 'text-base',
        label: 'text-sm',
      },
      lg: {
        wrapper: 'h-12 px-4 gap-2.5 text-lg',
        input: 'text-lg',
        label: 'text-base',
      },
    },

    isInvalid: {
      true: {
        wrapper: 'border-danger focus-within:ring-danger',
        label: 'text-danger',
        errorMessage: 'text-danger',
      },
    },

    isDisabled: {
      true: {
        wrapper: 'opacity-50 cursor-not-allowed pointer-events-none',
        input: 'cursor-not-allowed',
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
    size: 'md',
    isInvalid: false,
    isDisabled: false,
  },
});

export type InputFieldVariants = VariantProps<typeof inputField>;
export type InputFieldReturnType = ReturnType<typeof inputField>;
```

---

## 6. Context Definition (`packages/components/input-field/src/input-field-context.ts`)

`InputField` uses **native React context** (`createContext` / `useContext`) for shared state propagation across sub-components — not `react-aria-components`' `useContextProps`. This keeps the context layer decoupled from React Aria internals and consumable by any parent.

> **Rule:** Do NOT replace `useContext` with `useContextProps` here. React Aria slot wiring is handled by passing `slot` props directly to sub-component DOM elements.

```tsx
import type { InputFieldContextValue } from './input-field.types';
import { createContext, useContext } from 'react';

export const InputFieldContext = createContext<InputFieldContextValue | null>(null);

export function useInputFieldContext(): InputFieldContextValue {
  const context = useContext(InputFieldContext);
  if (!context) {
    throw new Error('useInputFieldContext must be used within an <InputField> component.');
  }
  return context;
}
```

### Usage Example (Parent providing context)

```tsx
// Sub-components automatically receive shared state from the root
<InputField size="lg" variant="filled" isInvalid isRequired>
  <InputFieldLabel>Password</InputFieldLabel>
  <InputFieldInput type="password" />
  <InputFieldError>Password must be at least 8 characters.</InputFieldError>
</InputField>
```

---

## 7. Component Implementation

### Root (`input-field.tsx`)

```tsx
'use client';

import type { InputFieldProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef, useId } from 'react';
import { inputField } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { InputFieldContext } from './input-field-context';

export const InputField = forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      variant = 'outline',
      size = 'md',
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
    const inputId = useId();
    const descriptionId = useId();
    const errorId = useId();

    const styles = inputField({ variant, size, isDisabled, isInvalid });

    return (
      <InputFieldContext.Provider
        value={{
          variant,
          size,
          isDisabled,
          isReadOnly,
          isRequired,
          isInvalid,
          inputId,
          descriptionId,
          errorId,
          styles,
        }}
      >
        <div
          ref={reference}
          className={cn(styles.root(), className)}
          data-slot="input-field"
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          data-required={isRequired || undefined}
          data-readonly={isReadOnly || undefined}
          style={style}
          {...properties}
        >
          {children}
        </div>
      </InputFieldContext.Provider>
    );
  },
);

InputField.displayName = 'IdeasUI.InputField';
```

### Label (`input-field-label.tsx`)

```tsx
'use client';

import type { InputFieldLabelProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';
import { useInputFieldContext } from './input-field-context';

export const InputFieldLabel = forwardRef<HTMLLabelElement, InputFieldLabelProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { inputId, isDisabled, isRequired, styles } = useInputFieldContext();

    return (
      <label
        ref={reference}
        htmlFor={inputId}
        className={cn(styles?.label(), className)}
        data-slot="label"
        data-disabled={isDisabled || undefined}
      >
        {children}
        {isRequired && (
          <span aria-hidden="true" className="text-danger ml-0.5">
            *
          </span>
        )}
      </label>
    );
  },
);

InputFieldLabel.displayName = 'IdeasUI.InputFieldLabel';
```

### Input (`input-field-input.tsx`)

```tsx
'use client';

import type { InputFieldInputProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';
import { useInputFieldContext } from './input-field-context';

export const InputFieldInput = forwardRef<HTMLInputElement, InputFieldInputProps>(
  (
    { startContent, endContent, className, inputClassName, ...properties },
    reference,
  ): JSX.Element => {
    const {
      inputId,
      descriptionId,
      errorId,
      isDisabled,
      isReadOnly,
      isRequired,
      isInvalid,
      styles,
    } = useInputFieldContext();

    return (
      <div className={cn(styles?.wrapper(), className)} data-slot="input-wrapper">
        {startContent && (
          <span className={styles?.startContent()} data-slot="start-content" aria-hidden="true">
            {startContent}
          </span>
        )}
        <input
          ref={reference}
          id={inputId}
          className={cn(styles?.input(), inputClassName)}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          aria-required={isRequired || undefined}
          aria-invalid={isInvalid || undefined}
          aria-describedby={isInvalid ? errorId : descriptionId}
          data-slot="input"
          {...properties}
        />
        {endContent && (
          <span className={styles?.endContent()} data-slot="end-content" aria-hidden="true">
            {endContent}
          </span>
        )}
      </div>
    );
  },
);

InputFieldInput.displayName = 'IdeasUI.InputFieldInput';
```

### Description (`input-field-description.tsx`)

```tsx
'use client';

import type { InputFieldDescriptionProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';
import { useInputFieldContext } from './input-field-context';

export const InputFieldDescription = forwardRef<HTMLParagraphElement, InputFieldDescriptionProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { descriptionId, isInvalid, styles } = useInputFieldContext();

    // Hidden when field is invalid — error message takes over
    if (isInvalid) return <></>;

    return (
      <p
        ref={reference}
        id={descriptionId}
        className={cn(styles?.description(), className)}
        data-slot="description"
        slot="description"
        {...properties}
      >
        {children}
      </p>
    );
  },
);

InputFieldDescription.displayName = 'IdeasUI.InputFieldDescription';
```

### Error (`input-field-error.tsx`)

```tsx
'use client';

import type { InputFieldErrorProps } from './input-field.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';
import { useInputFieldContext } from './input-field-context';

export const InputFieldError = forwardRef<HTMLParagraphElement, InputFieldErrorProps>(
  ({ className, children, ...properties }, reference): JSX.Element => {
    const { errorId, isInvalid, styles } = useInputFieldContext();

    // Only rendered when field is invalid
    if (!isInvalid) return <></>;

    return (
      <p
        ref={reference}
        id={errorId}
        className={cn(styles?.errorMessage(), className)}
        data-slot="error-message"
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

InputFieldError.displayName = 'IdeasUI.InputFieldError';
```

---

## 8. Standalone BEM CSS Specification (`packages/core/styles/src/components/input-field.css`)

For standalone CSS usage (without Tailwind), `@ideasui/styles` exports BEM modifiers mapping to OKLCH custom properties:

```css
.ideasui-input-field {
  display: flex;
  flex-direction: column;
  gap: var(--ideasui-spacing-1-5, 0.375rem);
  width: 100%;
}

/* Label */
.ideasui-input-field__label {
  color: oklch(var(--ideasui-color-content-primary));
  font-size: var(--ideasui-font-size-sm);
  font-weight: var(--ideasui-font-weight-medium, 500);
  transition: color 150ms ease;
}
.ideasui-input-field__label--required::after {
  content: ' *';
  color: oklch(var(--ideasui-color-danger));
}

/* Input wrapper */
.ideasui-input-field__wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}
.ideasui-input-field__wrapper:focus-within {
  box-shadow: 0 0 0 2px oklch(var(--ideasui-color-focus));
}

/* Variants */
.ideasui-input-field__wrapper--outline {
  border: 1px solid oklch(var(--ideasui-color-border-default));
  border-radius: var(--ideasui-radius-md, 0.375rem);
  background-color: oklch(var(--ideasui-color-surface-default));
}
.ideasui-input-field__wrapper--outline:hover {
  border-color: oklch(var(--ideasui-color-border-strong));
}
.ideasui-input-field__wrapper--filled {
  border: 1px solid transparent;
  border-radius: var(--ideasui-radius-md, 0.375rem);
  background-color: oklch(var(--ideasui-color-surface-muted));
}
.ideasui-input-field__wrapper--filled:hover {
  background-color: oklch(var(--ideasui-color-surface-subtle));
}
.ideasui-input-field__wrapper--flushed {
  border-bottom: 1px solid oklch(var(--ideasui-color-border-default));
  border-radius: 0;
  background-color: transparent;
}
.ideasui-input-field__wrapper--flushed:hover {
  border-bottom-color: oklch(var(--ideasui-color-border-strong));
}
.ideasui-input-field__wrapper--unstyled {
  border: none;
  background-color: transparent;
}

/* Sizes */
.ideasui-input-field__wrapper--sm {
  height: var(--ideasui-size-8, 2rem);
  padding: 0 var(--ideasui-spacing-2-5, 0.625rem);
  gap: var(--ideasui-spacing-1-5, 0.375rem);
}
.ideasui-input-field__wrapper--md {
  height: var(--ideasui-size-10, 2.5rem);
  padding: 0 var(--ideasui-spacing-3, 0.75rem);
  gap: var(--ideasui-spacing-2, 0.5rem);
}
.ideasui-input-field__wrapper--lg {
  height: var(--ideasui-size-12, 3rem);
  padding: 0 var(--ideasui-spacing-4, 1rem);
  gap: var(--ideasui-spacing-2-5, 0.625rem);
}

/* Native input */
.ideasui-input-field__input {
  flex: 1;
  min-width: 0;
  background: transparent;
  color: oklch(var(--ideasui-color-content-primary));
  outline: none;
  font-size: inherit;
}
.ideasui-input-field__input::placeholder {
  color: oklch(var(--ideasui-color-content-muted));
}
.ideasui-input-field__input:disabled {
  cursor: not-allowed;
  color: oklch(var(--ideasui-color-content-muted));
}

/* Adornments */
.ideasui-input-field__start-content,
.ideasui-input-field__end-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: oklch(var(--ideasui-color-content-tertiary));
}

/* Description */
.ideasui-input-field__description {
  color: oklch(var(--ideasui-color-content-secondary));
  font-size: var(--ideasui-font-size-xs);
  line-height: normal;
}

/* Error message */
.ideasui-input-field__error {
  color: oklch(var(--ideasui-color-danger));
  font-size: var(--ideasui-font-size-xs);
  line-height: normal;
}

/* Invalid state */
.ideasui-input-field--invalid .ideasui-input-field__wrapper {
  border-color: oklch(var(--ideasui-color-danger));
}
.ideasui-input-field--invalid .ideasui-input-field__wrapper:focus-within {
  box-shadow: 0 0 0 2px oklch(var(--ideasui-color-danger));
}
.ideasui-input-field--invalid .ideasui-input-field__label {
  color: oklch(var(--ideasui-color-danger));
}

/* Disabled state */
.ideasui-input-field--disabled .ideasui-input-field__wrapper {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* prefers-reduced-motion — suppressed via @ideasui/styles global rule */
```

---

## 9. Compound Component Behavior Rules

| Behavior                            | Rule                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `isInvalid=true`                    | `InputFieldDescription` is hidden; `InputFieldError` is rendered with `role="alert"` and `aria-live="polite"` |
| `isInvalid=false`                   | `InputFieldError` renders nothing (`<></>`); `InputFieldDescription` is visible                               |
| `isDisabled=true`                   | Propagated via context to all sub-components; `pointer-events: none` on wrapper                               |
| `isRequired=true`                   | `aria-required="true"` on `<input>`; visual `*` indicator on label via `aria-hidden` span                     |
| `isReadOnly=true`                   | `readOnly` on `<input>`; no visual change by default                                                          |
| `startContent` / `endContent`       | Wrapped in `aria-hidden` spans — purely decorative; screen readers skip them                                  |
| `inputId`                           | Auto-generated via `useId()` on root; wired to `<label htmlFor>` and `<input id>` automatically               |
| `descriptionId` / `errorId`         | Auto-generated via `useId()`; wired to `aria-describedby` on `<input>`                                        |
| `useInputFieldContext` outside root | Throws a descriptive error — never silently returns `null`                                                    |

---

## 10. Accessibility Requirements (WCAG 2.1 AA)

- **Label association**: `<label htmlFor={inputId}>` is always wired to `<input id={inputId}>` via auto-generated `useId()` — no manual `id` prop required.
- **`aria-required`**: Set on `<input>` when `isRequired=true`. The visual indicator uses `aria-hidden="true"` to avoid double-announcing.
- **`aria-invalid`**: Set on `<input>` when `isInvalid=true` to signal invalid state to screen readers.
- **`aria-describedby`**: Points to `errorId` when `isInvalid=true`, otherwise to `descriptionId`. Only one is active at a time.
- **`role="alert"` + `aria-live="polite"`**: On `InputFieldError` so error messages are announced to screen readers when they appear.
- **`aria-hidden` on adornments**: `startContent` and `endContent` are wrapped in `aria-hidden="true"` spans — they are decorative and must not be read by screen readers.
- **Keyboard navigation**: Native `<input>` element ensures full keyboard support out of the box.
- **Contrast Ratios**: All color tokens map to OKLCH variables meeting or exceeding 4.5:1 contrast in light and dark modes.
- **`prefers-reduced-motion`**: `transition-colors` and `transition-border` are suppressed via the global `@media (prefers-reduced-motion: reduce)` rule in `@ideasui/styles`.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  InputField,
  InputFieldLabel,
  InputFieldInput,
  InputFieldDescription,
  InputFieldError,
} from '../src';

it('should have zero accessibility violations in default state', async () => {
  const { container } = render(
    <InputField>
      <InputFieldLabel>Email</InputFieldLabel>
      <InputFieldInput type="email" placeholder="you@example.com" />
      <InputFieldDescription>We will never share your email.</InputFieldDescription>
    </InputField>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('should have zero accessibility violations in invalid state', async () => {
  const { container } = render(
    <InputField isInvalid>
      <InputFieldLabel>Email</InputFieldLabel>
      <InputFieldInput type="email" />
      <InputFieldError>Invalid email address.</InputFieldError>
    </InputField>,
  );
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 11. Typography System Boundaries (`InputField` vs `Text`)

| Feature                | `InputField`                                                | `Text`                                      |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------- |
| **Primary Focus**      | Form input with label, description, error                   | Standalone typography rendering             |
| **Label Element**      | `<label>` wired via `htmlFor` / `useId()`                   | `<label>` via `as="label"` (no auto-wiring) |
| **Error Handling**     | Built-in `isInvalid` + `InputFieldError` slot               | No built-in error state                     |
| **Context**            | `InputFieldContext` (shared state across 5 sub-components)  | `TextContext` (shared style props only)     |
| **Slot Compatibility** | `slot="label"`, `slot="description"`, `slot="errorMessage"` | `slot="description"`, `slot="label"`        |

---

## 12. Definition of Done Checklist

- [ ] Package created at `packages/components/input-field/`
- [ ] Recipe created at `packages/core/theme/src/recipes/input-field.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/input-field.css`
- [ ] `index.ts` barrel exports all 5 sub-components, `InputFieldContext`, `useInputFieldContext`, and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] All 4 variants (`outline`, `filled`, `flushed`, `unstyled`) implemented and verified
- [ ] All 3 sizes (`sm`, `md`, `lg`) implemented and verified
- [ ] `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid` state props propagated via context
- [ ] `startContent` and `endContent` adornment slots implemented with `aria-hidden`
- [ ] `inputId`, `descriptionId`, `errorId` auto-generated via `useId()` and wired correctly
- [ ] `aria-required`, `aria-invalid`, `aria-describedby` set correctly on `<input>`
- [ ] `InputFieldError` renders with `role="alert"` and `aria-live="polite"`
- [ ] `InputFieldDescription` hidden when `isInvalid=true`; `InputFieldError` hidden when `isInvalid=false`
- [ ] `useInputFieldContext` throws descriptive error when used outside `<InputField>`
- [ ] `displayName` set on all 5 sub-components (`IdeasUI.InputField*`)
- [ ] `data-slot` attribute rendered on all 5 sub-components
- [ ] All semantic OKLCH colors used — no hardcoded colors or `dark:` prefixes
- [ ] `vitest-axe` accessibility tests pass with 0 violations (default + invalid state)
- [ ] `prefers-reduced-motion` suppression verified via `@ideasui/styles` global rule
- [ ] Storybook stories created (`Basic`, `Variants`, `Sizes`, `States`, `Adornments`, `Validation`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/input-field.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly

# Radio Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Radio` (Compound)
- **Package:** `@ideasui/radio`
- **Directory:** `packages/components/radio/`
- **Primary Exports:** `Radio`, `RadioGroup`, `RadioGroupLabel`, `RadioGroupDescription`, `RadioGroupError`
- **Category:** Form / Selection
- **Recipe Location:** `packages/core/theme/src/recipes/radio/radio.ts`

### Purpose

`Radio` is an enterprise-grade, accessible, theme-aware compound form primitive for IdeasUI applications. It supports standalone and grouped option selection, keyboard navigation, all visual variants, and screen reader accessibility via semantic HTML fieldset composition and `RadioGroupContext` for shared state propagation.

Key Features:

- Compound component architecture (`Radio`, `RadioGroup`, `RadioGroupLabel`, `RadioGroupDescription`, `RadioGroupError`)
- Native fieldset, legend, and accessibility linking (`aria-labelledby`, `aria-describedby`, `aria-required`, `aria-invalid`)
- Shared context inheritance via `RadioGroupContext` for `name`, `size`, `variant`, `color`, `radius`, `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid`
- Visual variants (`solid`, `outline`, `subtle`)
- Color scale (`primary`, `neutral`, `success`, `warning`, `danger`)
- Size scale (`sm`, `md`, `lg`)
- Radius scale (`none`, `sm`, `md`, `lg`, `full`)
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- Controlled and uncontrolled usage via `value` / `defaultValue` / `onChange`
- Full keyboard navigation and screen reader support (WCAG 2.1 AA)
- `isDisabled`, `isReadOnly`, `isRequired`, `isInvalid` state props
- `data-slot` attributes on every sub-component for targetable styling
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/radio/
├── src/
│   ├── radio.tsx                   ← Single radio option (context consumer)
│   ├── radio-group.tsx             ← Group root (context provider)
│   ├── radio-group-label.tsx       ← Group label / legend sub-component
│   ├── radio-group-description.tsx ← Group description sub-component
│   ├── radio-group-error.tsx       ← Group error message sub-component
│   ├── radio-context.ts            ← RadioGroupContext + useRadioGroupContext
│   ├── radio.types.ts              ← Full TypeScript interfaces with JSDoc
│   └── index.ts                       ← Barrel export (public API only)
├── __tests__/
│   └── radio.test.tsx              ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── radio.stories.tsx           ← Storybook stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/radio/
├── radio.ts                        ← Tailwind Variants tv() recipe
├── radio.css                       ← Standalone CSS rules
└── index.ts                        ← Theme recipe export
```

### Dependency Flow

```
@ideasui/radio → @ideasui/theme, @ideasui/utils
@ideasui/react → @ideasui/radio (re-export in master barrel)
```

---

## 3. Compound Component Architecture

`RadioGroup` is the **compound root** — providing shared state via `RadioGroupContext`. `Radio` can also be used standalone when needed.

### Slot Map

| Sub-Component           | `data-slot`               | Default Element |
| ----------------------- | ------------------------- | --------------- |
| `RadioGroup`            | `radio-group`             | `<fieldset>`    |
| `RadioGroupLabel`       | `radio-group-label`       | `<legend>`      |
| `RadioGroupDescription` | `radio-group-description` | `<p>`           |
| `RadioGroupError`       | `radio-group-error`       | `<p>`           |
| `Radio`                 | `radio`                   | `<label>`       |
| `Radio` indicator       | `radio-indicator`         | `<span>`        |
| `Radio` dot             | `radio-dot`               | `<span>`        |
| `Radio` label text      | `radio-label-text`        | `<span>`        |

### Anatomy

```
RadioGroup (root — context provider)
├── RadioGroupLabel        (legend)
├── Radio[]                (one or more radio options)
│   ├── radio-indicator    (outer circle)
│   │   └── radio-dot      (inner selected bullet)
│   └── radio-label-text   (visible text)
├── RadioGroupDescription  (hidden when isInvalid)
└── RadioGroupError        (shown when isInvalid)
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import {
  Radio,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupError,
} from '@ideasui/react';

// Standalone radio
<Radio defaultSelected>Option 1</Radio>

// Controlled group
<RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
  <RadioGroupLabel>Select Plan</RadioGroupLabel>
  <Radio value="free">Free ($0)</Radio>
  <Radio value="pro">Pro ($19/mo)</Radio>
  <RadioGroupDescription>Upgrade anytime from account settings.</RadioGroupDescription>
</RadioGroup>

// Invalid group
<RadioGroup isInvalid>
  <RadioGroupLabel>Payment Method</RadioGroupLabel>
  <Radio value="card">Credit Card</Radio>
  <Radio value="paypal">PayPal</Radio>
  <RadioGroupError>Please select a payment method.</RadioGroupError>
</RadioGroup>
```

### TypeScript Definition (`radio.types.ts`)

```tsx
import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { RadioReturnType } from '@ideasui/theme/recipes';

export type RadioVariant = 'solid' | 'outline' | 'subtle';
export type RadioColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'color'
> {
  readonly variant?: RadioVariant;
  readonly color?: RadioColor;
  readonly size?: RadioSize;
  readonly radius?: RadioRadius;
  readonly isSelected?: boolean;
  readonly defaultSelected?: boolean;
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly value?: string;
  readonly onChange?: (isSelected: boolean) => void;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children?: ReactNode;
  readonly icon?: ReactNode | ((props: { readonly className: string }) => ReactNode);
}

export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'color'
> {
  readonly name?: string;
  readonly value?: string;
  readonly defaultValue?: string;
  readonly onChange?: (value: string) => void;
  readonly variant?: RadioVariant;
  readonly color?: RadioColor;
  readonly size?: RadioSize;
  readonly radius?: RadioRadius;
  readonly orientation?: 'vertical' | 'horizontal';
  readonly isDisabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly isRequired?: boolean;
  readonly isInvalid?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly children: ReactNode;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/radio/radio.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens.

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const radio = tv({
  slots: {
    root: 'group inline-flex items-center gap-2 cursor-pointer select-none',
    indicator: [
      'relative flex items-center justify-center shrink-0',
      'border transition-all duration-150 ease-in-out',
      'group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-focus group-has-[:focus-visible]:ring-offset-2',
    ],
    dot: [
      'pointer-events-none rounded-full transition-all duration-150 ease-in-out',
      'opacity-0 scale-0',
      'group-data-[selected=true]:opacity-100 group-data-[selected=true]:scale-100',
    ],
    labelText: 'text-content-primary leading-none transition-colors duration-150 ease-in-out',
  },
  // variants: variant, color, size, radius, isInvalid, isDisabled...
});
```

---

## 6. Context Definition (`packages/components/radio/src/radio-context.ts`)

`RadioGroup` uses native React context for shared state propagation across child `Radio` components.

```tsx
import type { RadioGroupContextValue } from './radio.types';
import { createContext, useContext } from 'react';

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
```

---

## 7. Accessibility Audit & WCAG 2.1 AA Compliance

- **Role & Grouping:** `<fieldset>` + `<legend>` ensure group boundaries are announced by VoiceOver, NVDA, and JAWS.
- **Keyboard Navigation:** Native browser radio group keyboard behavior (Arrow keys navigate between options within the group).
- **Focus Styles:** Focus visible ring (`group-has-[:focus-visible]:ring-2`) triggers clearly when navigated via Tab / Arrow keys.
- **Form States:** `disabled`, `readOnly`, `required`, and `aria-invalid` correctly bind to native input elements and root fieldset container.

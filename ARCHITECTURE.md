# IdeasUI Architecture Guide

**Version:** 1.0  
**Last Updated:** January 24, 2026  
**Status:** Production Standard  
**Audience:** Developers, Designers, Contributors

---

## Table of Contents

- [Overview](#overview)
- [For Developers](#for-developers)
  - [Quick Start](#quick-start)
  - [Architecture Principles](#architecture-principles)
  - [Component Development](#component-development)
  - [Styling System](#styling-system)
  - [Testing Requirements](#testing-requirements)
- [For Designers](#for-designers)
  - [Design System Overview](#design-system-overview)
  - [Design Tokens](#design-tokens)
  - [Component Anatomy](#component-anatomy)
  - [Color System](#color-system)
  - [Responsive Guidelines](#responsive-guidelines)
  - [Animation Guidelines](#animation-guidelines)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)
- [References](#references)

---

## Overview

### What is IdeasUI?

IdeasUI is a modern **React component library** built with:

- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Tailwind Variants** for variant management
- **OKLCH color space** for perceptual uniformity
- **Comprehensive design tokens** for consistency

### Core Philosophy

```
┌─────────────────────────────────────────────────┐
│  TypeScript-First Architecture                  │
│                                                 │
│  Design Tokens (TypeScript)                    │
│         ↓                                       │
│  CSS Variables (Generated)                     │
│         ↓                                       │
│  Tailwind Variants + BEM Classes               │
│         ↓                                       │
│  React Components                              │
│                                                 │
│  = Type Safety + Performance + Flexibility     │
└─────────────────────────────────────────────────┘
```

### Key Decisions

| Decision             | Rationale                                         |
| -------------------- | ------------------------------------------------- |
| **TypeScript-First** | Type safety, autocomplete, single source of truth |
| **Tailwind CSS v4**  | Modern utility-first CSS, JIT compilation         |
| **OKLCH Colors**     | Perceptually uniform, future-proof color space    |
| **CSS Layers**       | Predictable cascade, better specificity control   |
| **BEM + Utilities**  | Clean debugging + Tailwind power                  |
| **React-Focused**    | Optimized for target audience                     |

---

## For Developers

### Quick Start

#### 1. Installation

```bash
# Install dependencies
pnpm install

# Build packages
pnpm build

# Start development
pnpm dev
```

#### 2. Create a Component

Use the Plop generator:

```bash
pnpm run create
```

Select "Component" and follow prompts.

#### 3. Project Structure

```
ideasui/
├── packages/
│   ├── components/          # React components
│   │   ├── button/
│   │   ├── card/
│   │   └── ...
│   ├── core/
│   │   └── theme/          # Design system (PRIMARY)
│   │       ├── src/
│   │       │   ├── tokens/     # Design tokens
│   │       │   ├── recipes/    # Component styles
│   │       │   └── system/     # Theme engine
│   │       └── DESIGN_TOKENS.md
│   ├── hooks/              # React hooks
│   ├── utils/              # Utilities
│   └── icons/              # Icon components
├── apps/
│   ├── playground/         # Development app
│   └── storybook/          # Component showcase
└── docs/                   # Documentation
```

---

### Architecture Principles

#### 1. TypeScript-First Architecture

**Why:** Single source of truth, type safety, better DX

```typescript
// ✅ GOOD: Define tokens in TypeScript
export const duration = {
  instant: '75ms',
  normal: '200ms',
  slow: '300ms',
} as const;

// ✅ GOOD: Generate CSS variables automatically
// (Handled by Tailwind plugin)

// ❌ BAD: Define tokens in CSS
// :root { --duration-normal: 200ms; }
```

#### 2. Hybrid Styling Approach

**Combination:** TypeScript tokens + CSS layers + BEM naming

```typescript
// Component recipe with hybrid approach
export const button = tv({
  slots: {
    base: [
      'btn', // ← BEM class for debugging
      'inline-flex', // ← Tailwind utilities
      'items-center',
      'justify-center',
      // ...
    ],
    icon: ['btn__icon', 'shrink-0'],
    label: ['btn__label', 'truncate'],
  },
  variants: {
    variant: {
      solid: {
        base: 'btn--solid bg-primary-500 hover:bg-primary-600',
        //     ↑ BEM for debugging  ↑ Utilities for styling
      },
    },
  },
});
```

**Generated Output:**

```html
<button class="btn btn--solid bg-primary-500 inline-flex items-center ...">
  ↑ Easy to find in DevTools ↑ JIT utilities
</button>
```

#### 3. Component Structure

**Standard Structure:**

```
packages/components/button/
├── src/
│   ├── button.tsx           # Main component
│   ├── use-button.ts        # Logic hook
│   └── index.ts             # Exports
├── __tests__/
│   └── button.test.tsx      # Tests
├── stories/
│   └── button.stories.tsx   # Storybook
├── package.json
├── tsconfig.json
└── README.md
```

**Component Template:**

```typescript
// src/button.tsx
import * as React from 'react';
import { button } from '@ideasui/theme/recipes';
import type { ButtonVariantProps } from '@ideasui/theme/recipes';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
          ButtonVariantProps {
  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Loading state
   */
  isLoading?: boolean;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const {
    children,
    variant = 'solid',
    size = 'md',
    color = 'primary',
    className,
    isLoading,
    disabled,
    ...rest
  } = props;

  const styles = button({ variant, size, color });

  return (
    <button
      ref={ref}
      className={styles.base({ className })}
      disabled={disabled || isLoading}
      data-loading={isLoading}
      {...rest}
    >
      {isLoading && <Spinner className={styles.icon()} />}
      <span className={styles.label()}>{children}</span>
    </button>
  );
});

Button.displayName = 'Button';
```

---

### Styling System

#### Design Token Usage

**Import from theme package:**

```typescript
import {
  duration,
  easing,
  motion,
  breakpoints,
  spacing,
  colors,
} from '@ideasui/theme/tokens';

// Use in components
const AnimatedDiv = () => (
  <div
    className="transition-all"
    style={{
      transitionDuration: duration.normal,
      transitionTimingFunction: easing.standard,
    }}
  >
    Content
  </div>
);
```

#### Creating Component Styles

**Use Tailwind Variants:**

```typescript
import { tv } from 'tailwind-variants';

export const card = tv({
  slots: {
    base: [
      'card', // BEM base class
      'rounded-lg',
      'border',
      'border-border',
      'bg-surface',
      'shadow-medium',
    ],
    header: ['card__header', 'px-6 py-4', 'border-b border-border'],
    body: ['card__body', 'px-6 py-4'],
    footer: ['card__footer', 'px-6 py-4', 'border-t border-border'],
  },
  variants: {
    variant: {
      default: {},
      elevated: {
        base: 'shadow-large',
      },
      bordered: {
        base: 'border-2',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
```

#### CSS Layers

**All styles use CSS layers:**

```css
/* Automatically handled by Tailwind plugin */
@layer base, components, utilities;

/* Your custom styles should specify layer */
@layer components {
  .custom-component {
    /* styles */
  }
}
```

#### Responsive Design

**Use breakpoint tokens:**

```tsx
import { breakpoints } from '@ideasui/theme/tokens';

// In Tailwind classes
<div className="w-full md:w-1/2 lg:w-1/3">Responsive width</div>;

// In JavaScript
const isMobile = window.matchMedia(`(max-width: ${breakpoints.md})`).matches;

// With useMediaQuery hook
const isMobile = useMediaQuery('(max-width: 768px)');
```

---

### Component Development

#### Step-by-Step Guide

**1. Generate Component Scaffold**

```bash
pnpm run create
# Select "Component"
# Name: TextField
# Description: Input field component
```

**2. Define Component Styles**

```typescript
// packages/core/theme/src/recipes/text-field.ts
import { tv } from 'tailwind-variants';

export const textField = tv({
  slots: {
    base: ['text-field', 'relative', 'w-full'],
    label: ['text-field__label', 'block', 'text-sm', 'font-medium', 'mb-2'],
    input: [
      'text-field__input',
      'w-full',
      'px-3 py-2',
      'border border-border',
      'rounded-md',
      'bg-background',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-primary',
    ],
    error: ['text-field__error', 'text-sm', 'text-danger', 'mt-1'],
  },
  variants: {
    size: {
      sm: {
        input: 'h-8 text-sm',
      },
      md: {
        input: 'h-10 text-base',
      },
      lg: {
        input: 'h-12 text-lg',
      },
    },
    isInvalid: {
      true: {
        input: 'border-danger focus:ring-danger',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
```

**3. Implement Component**

```typescript
// packages/components/text-field/src/text-field.tsx
import * as React from 'react';
import { textField } from '@ideasui/theme/recipes';

export interface TextFieldProps {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  // ... other props
}

export const TextField = React.forwardRef<
  HTMLInputElement,
  TextFieldProps
>((props, ref) => {
  const {
    label,
    error,
    size = 'md',
    className,
    ...rest
  } = props;

  const styles = textField({
    size,
    isInvalid: !!error
  });

  return (
    <div className={styles.base({ className })}>
      {label && (
        <label className={styles.label()}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={styles.input()}
        aria-invalid={!!error}
        {...rest}
      />
      {error && (
        <span className={styles.error()}>
          {error}
        </span>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';
```

**4. Write Tests**

```typescript
// __tests__/text-field.test.tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TextField } from '../src';

describe('TextField', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TextField label="Name" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows error message', () => {
    const { getByText } = render(
      <TextField
        label="Email"
        error="Invalid email"
      />
    );
    expect(getByText('Invalid email')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TextField label="Name" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**5. Create Storybook Stories**

```typescript
// stories/text-field.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../src';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Invalid email address',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextField size="sm" label="Small" />
      <TextField size="md" label="Medium" />
      <TextField size="lg" label="Large" />
    </div>
  ),
};
```

---

### Testing Requirements

#### Coverage Thresholds

| Package        | Branches | Functions | Lines | Statements |
| -------------- | -------- | --------- | ----- | ---------- |
| **Global**     | 60%      | 60%       | 60%   | 60%        |
| **Components** | 70%      | 80%       | 80%   | 80%        |
| **Hooks**      | 75%      | 85%       | 85%   | 85%        |
| **Utils**      | 70%      | 75%       | 75%   | 75%        |

#### Required Tests

**1. Unit Tests**

- Props rendering
- User interactions
- State management
- Edge cases

**2. Accessibility Tests**

```typescript
import { axe } from 'jest-axe';

it('has no a11y violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**3. Visual Tests** (via Storybook + Chromatic)

- All variants
- Interactive states
- Responsive breakpoints

---

## For Designers

### Design System Overview

IdeasUI follows a **systematic design approach** with clear token hierarchies and component patterns.

#### Design Principles

1. **Consistency** - Unified visual language
2. **Accessibility** - WCAG 2.1 AA minimum
3. **Flexibility** - Adaptable to brand needs
4. **Performance** - Fast, lightweight
5. **Modern** - Contemporary aesthetics

---

### Design Tokens

Design tokens are the **atomic units** of the design system. Think of them as design decisions translated into code.

#### Token Hierarchy

```
┌─────────────────────────────────────┐
│  Primitive Tokens                   │
│  (Raw values)                       │
│  • Colors: OKLCH values             │
│  • Spacing: rem units               │
│  • Typography: font families        │
└──────────────┬──────────────────────┘
               ↓
┌──────────────────────────────────────┐
│  Semantic Tokens                     │
│  (Purpose-based)                     │
│  • primary, secondary, danger        │
│  • background, foreground            │
│  • spacing-sm, spacing-md            │
└──────────────┬───────────────────────┘
               ↓
┌──────────────────────────────────────┐
│  Component Tokens                    │
│  (Component-specific)                │
│  • button-background                 │
│  • card-shadow                       │
│  • input-border                      │
└──────────────────────────────────────┘
```

#### Token Categories

**1. Color Tokens**

```
Semantic Colors (8):
├── primary     - Main brand color
├── secondary   - Supporting brand color
├── success     - Positive actions/states
├── warning     - Caution states
├── danger      - Error states
├── info        - Informational states
├── neutral     - Neutral/default
└── gray        - Subtle backgrounds

Shade Scale (11 per color):
├── 50  - Lightest
├── 100 - Very light
├── ...
├── 500 - Base
├── ...
└── 950 - Darkest
```

**2. Spacing Tokens**

```
Spacing Scale:
├── 0  - 0px
├── 1  - 0.25rem (4px)
├── 2  - 0.5rem (8px)
├── 3  - 0.75rem (12px)
├── 4  - 1rem (16px) ← Base unit
├── ...
└── 96 - 24rem (384px)
```

**3. Typography Tokens**

```
Font Sizes:
├── xs   - 0.75rem (12px)
├── sm   - 0.875rem (14px)
├── base - 1rem (16px)
├── lg   - 1.125rem (18px)
├── xl   - 1.25rem (20px)
├── 2xl  - 1.5rem (24px)
├── 3xl  - 1.875rem (30px)
└── ...
```

**4. Border Radius Tokens**

```
Radius Scale:
├── none   - 0
├── sm     - 0.125rem (2px)
├── md     - 0.375rem (6px)
├── lg     - 0.5rem (8px)
├── xl     - 0.75rem (12px)
├── 2xl    - 1rem (16px)
├── 3xl    - 1.5rem (24px)
└── full   - 9999px (pill shape)
```

**5. Shadow Tokens**

```
Shadows:
├── sm     - Subtle
├── md     - Default
├── lg     - Elevated
├── xl     - High elevation
└── 2xl    - Maximum elevation
```

---

### Component Anatomy

#### Button Anatomy

```
┌─────────────────────────────────────┐
│  ┌───────────────────────────────┐  │ ← Focus Ring (2px)
│  │ ╔═══════════════════════════╗ │  │
│  │ ║  [Icon] Button Text       ║ │  │ ← Content
│  │ ╚═══════════════════════════╝ │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

Spacing:
├── Padding-X: 1rem (16px)
├── Padding-Y: 0.5rem (8px)
├── Gap: 0.5rem (8px) between icon and text
├── Height: 2.5rem (40px) - md size
└── Border Radius: 0.375rem (6px)

States:
├── Default
├── Hover       - Darker background
├── Active      - Scale(0.95)
├── Focus       - Ring visible
├── Disabled    - 50% opacity
└── Loading     - Spinner + disabled
```

#### Card Anatomy

```
┌───────────────────────────────────┐
│ Header                            │ ← 1rem padding
│───────────────────────────────────│ ← 1px border
│                                   │
│ Body Content                      │ ← 1rem padding
│                                   │
│───────────────────────────────────│ ← 1px border
│ Footer                            │ ← 1rem padding
└───────────────────────────────────┘
 ↑ Border radius: 0.5rem (8px)
 ↑ Shadow: medium
```

---

### Color System

#### OKLCH Color Space

IdeasUI uses **OKLCH** (Lightness, Chroma, Hue) for:

- ✅ Perceptual uniformity
- ✅ Better color manipulation
- ✅ Future-proof (CSS standard)
- ✅ Wider color gamut

**Format:**

```css
/* OKLCH format: oklch(L C H / A) */
--primary: oklch(0.62 0.195 253.83);
/* ↑    ↑    ↑
             L    C    H
          Light Chroma Hue
          60%  Vibrant Blue
          */
```

#### Color Usage Guidelines

**1. Primary Color**

- Brand identity
- CTA buttons
- Links
- Active states

**2. Secondary Color**

- Supporting actions
- Alternative buttons
- Highlights

**3. Success Color**

- Positive feedback
- Success messages
- Completed states

**4. Warning Color**

- Caution states
- Warnings
- Pending actions

**5. Danger Color**

- Errors
- Destructive actions
- Critical alerts

**6. Neutral/Gray**

- Backgrounds
- Borders
- Disabled states
- Subtle UI elements

#### Dark Mode

**Automatic dark mode** with `.dark` class:

```
Light Mode:
├── Background: Light gray
├── Foreground: Dark text
├── Surface: White
└── ...

Dark Mode (.dark):
├── Background: Dark gray
├── Foreground: Light text
├── Surface: Elevated dark
└── ...
```

**Implementation:**

```html
<html class="dark">
  <!-- Dark mode automatically applied -->
</html>
```

---

### Responsive Guidelines

#### Breakpoint System

```
Mobile First Approach:

320px+ ─────── Base (Mobile)
               ↓
640px+ ─────── sm (Large Mobile)
               ↓
768px+ ─────── md (Tablet)
               ↓
1024px+ ────── lg (Laptop)
               ↓
1280px+ ────── xl (Desktop)
               ↓
1536px+ ────── 2xl (Large Desktop)
```

#### Responsive Patterns

**1. Grid Layouts**

```
Mobile:   1 column
Tablet:   2 columns (md:)
Desktop:  3-4 columns (lg:)
```

**2. Typography Scale**

```
Mobile:   Smaller (base: 16px)
Tablet:   Medium (md: 16-18px)
Desktop:  Larger (lg: 18-20px)
```

**3. Spacing**

```
Mobile:   Compact (padding: 1rem)
Tablet:   Comfortable (md:padding: 1.5rem)
Desktop:  Spacious (lg:padding: 2rem)
```

#### Design for Breakpoints

**Component Sizes:**
| Component | Mobile | Tablet (md) | Desktop (lg) |
|-----------|--------|-------------|--------------|
| Button | h-9 (36px) | h-10 (40px) | h-10 (40px) |
| Input | h-10 (40px) | h-10 (40px) | h-10 (40px) |
| Card Padding | 1rem | 1.5rem | 2rem |
| Container | Full width | 768px max | 1280px max |

---

### Animation Guidelines

#### Motion Tokens

**Duration Scale:**

```
instant  - 75ms   - Instant feedback
fastest  - 100ms  - Very fast
faster   - 150ms  - Fast
normal   - 200ms  - Default ✓
slow     - 300ms  - Deliberate
slower   - 400ms  - Slow
slowest  - 500ms  - Very slow
enter    - 700ms  - Enter animations
exit     - 300ms  - Exit animations
```

**Easing Functions:**

```
linear      - No easing
standard    - Smooth (recommended) ✓
decelerate  - Entering elements
accelerate  - Exiting elements
bounce      - Playful
elastic     - Spring-like
```

#### Animation Principles

**1. Purpose-Driven**

- Every animation should have a reason
- Don't animate just because you can
- Guide user attention

**2. Performance**

- Use `transform` and `opacity`
- Avoid animating `width`, `height`, `top`, `left`
- Enable `will-change` for complex animations

**3. Respect User Preferences**

```css
/* Automatically handled */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Common Animations

**1. Fade In**

```
Duration: 200ms
Easing: ease-out
Opacity: 0 → 1
```

**2. Scale In**

```
Duration: 200ms
Easing: ease-out
Transform: scale(0.95) → scale(1)
```

**3. Slide In**

```
Duration: 300ms
Easing: standard
Transform: translateY(10px) → translateY(0)
```

**4. Button Press**

```
Duration: 100ms
Easing: linear
Transform: scale(1) → scale(0.95)
```

---

## Best Practices

### Developer Best Practices

#### 1. Type Safety

```typescript
// ✅ GOOD: Use TypeScript types
interface Props {
  variant: 'solid' | 'outline';
  size: 'sm' | 'md' | 'lg';
}

// ❌ BAD: Use any
interface Props {
  variant: any;
  size: any;
}
```

#### 2. Component Composition

```typescript
// ✅ GOOD: Composable components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>
    Content
  </CardBody>
</Card>

// ❌ BAD: Monolithic component
<Card
  title="Title"
  content="Content"
/>
```

#### 3. Accessibility

```typescript
// ✅ GOOD: Semantic HTML + ARIA
<button
  type="button"
  aria-label="Close dialog"
  aria-pressed={isPressed}
>
  Close
</button>

// ❌ BAD: Poor accessibility
<div onClick={handleClick}>
  Close
</div>
```

#### 4. Performance

```typescript
// ✅ GOOD: Memoize expensive computations
const styles = useMemo(
  () => button({ variant, size }),
  [variant, size]
);

// ✅ GOOD: Use React.memo for pure components
export const Icon = React.memo(({ name }) => {
  return <svg>...</svg>;
});
```

### Designer Best Practices

#### 1. Consistency

- ✅ Use design tokens
- ✅ Follow spacing scale
- ✅ Stick to color palette
- ❌ Don't use arbitrary values

#### 2. Accessibility

- ✅ Minimum 4.5:1 contrast for text
- ✅ 44×44px minimum touch target
- ✅ Clear focus indicators
- ✅ Keyboard navigation support

#### 3. Responsive Design

- ✅ Design mobile-first
- ✅ Test at all breakpoints
- ✅ Use flexible layouts
- ❌ Don't design for single screen size

#### 4. Component States

**Always design for:**

- Default
- Hover
- Active/Pressed
- Focus
- Disabled
- Loading
- Error

---

## Migration Guide

### From v0.x to v1.0

#### 1. Update Imports

```typescript
// Before
import { Button } from '@ideasui/components';
import { colors } from '@ideasui/theme';

// After
import { Button } from '@ideasui/button';
import { colors } from '@ideasui/theme/tokens';
```

#### 2. Update Color References

```typescript
// Before
className = 'bg-primary-500';

// After (still works, but use semantic)
className = 'bg-primary';
```

#### 3. Update Spacing

```typescript
// Before (arbitrary values)
className = 'p-[15px]';

// After (use spacing scale)
className = 'p-4'; // 1rem = 16px
```

---

## References

### Documentation

- [Component Standards](./docs/COMPONENT_STANDARDS.md)
- [Design Tokens](./packages/core/theme/DESIGN_TOKENS.md)
- [Testing Guide](./docs/TESTING_GUIDE.md)
- [Architecture Comparison](./ARCHITECTURE_COMPARISON.md)

### Workflows

- [Create Component](./.agent/workflows/create-component.md)
- [Testing](./.agent/workflows/testing.md)
- [Release](./.agent/workflows/release.md)
- [Troubleshooting](./.agent/workflows/troubleshooting.md)

### External Resources

- [Tailwind CSS v4](https://tailwindcss.com)
- [Tailwind Variants](https://www.tailwind-variants.org)
- [OKLCH Color Space](https://oklch.com)
- [React Aria](https://react-spectrum.adobe.com/react-aria/)

---

## Appendix

### Glossary

- **Design Token** - A design decision stored as data (color, spacing, etc.)
- **BEM** - Block Element Modifier naming convention
- **OKLCH** - Perceptual color space (Lightness, Chroma, Hue)
- **JIT** - Just-In-Time compilation
- **Slots** - Named sections of a component for styling
- **Compound Variants** - Combined variant conditions

### Cheat Sheet

**Create Component:**

```bash
pnpm run create
```

**Run Tests:**

```bash
pnpm test
pnpm test:coverage
```

**Build:**

```bash
pnpm build
```

**Storybook:**

```bash
pnpm storybook
```

**Lint:**

```bash
pnpm lint
pnpm lint:fix
```

---

**Version:** 1.0  
**Maintained By:** IdeasUI Team  
**Last Updated:** January 24, 2026  
**License:** MIT

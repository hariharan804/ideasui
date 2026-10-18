# Theme Recipes & Styling Rules

All component styles in `@ideasui/theme/recipes` follow a **Tailwind Variants (`tv()`) first** architecture powered by IdeasUI OKLCH design tokens.

---

## 🎨 Core Rule: Prioritize Tailwind Utility Tokens

> **Recipes MUST primarily use Tailwind utility classes mapped to IdeasUI semantic tokens.**
> Standalone BEM CSS files (`*.css`) serve solely for non-Tailwind consumers or low-level resets. All interactive, visual, variant, color, and size permutations must live directly inside the TypeScript `tv()` recipe.

### 1. 🚫 Prohibited Practices in Recipes

- **NO Raw Tailwind Colors:** Never hardcode numeric palette shades (e.g. `blue-600`, `gray-100`, `slate-900`, `emerald-500`, `indigo-*`).
- **NO Dark Modifier:** Never use the `dark:` prefix (e.g. `dark:bg-slate-900`). All semantic tokens automatically adapt between light and dark modes via OKLCH CSS variables.
- **NO Arbitrary Raw Hex/RGB:** Never use inline hex or RGB strings (e.g. `bg-[#123456]`).
- **NO Raw CSS in Recipe Stylesheets:** Standalone CSS files (`*.css`) must use `@apply` with Tailwind utility tokens (e.g. `@apply bg-primary text-on-primary border-border-strong`), never raw CSS properties with manual `oklch(var(...))` or hardcoded unit values.

---

## 💎 Allowed Tailwind Semantic Tokens

Use **only** these semantic utility tokens inside your recipe definitions:

| Category        | Allowed Tailwind Classes                                                                                                                                                                                                                                                                                                                            | Usage Context                                             |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| **Brand**       | `bg-primary`, `text-primary`, `border-primary`, `bg-primary-subtle`, `text-on-primary`, `bg-primary-muted`, `ring-primary`                                                                                                                                                                                                                          | Primary interactive elements, focused accents, badges     |
| **Secondary**   | `bg-secondary`, `text-secondary`, `border-secondary`, `bg-secondary-subtle`, `text-on-secondary`, `bg-secondary-muted`                                                                                                                                                                                                                              | Secondary brand accents, highlights                       |
| **Tertiary**    | `bg-tertiary`, `text-tertiary`, `border-tertiary`, `bg-tertiary-subtle`, `text-on-tertiary`                                                                                                                                                                                                                                                         | Subtle accents, soft tertiary styling                     |
| **Status**      | `bg-success`, `text-success`, `border-success`, `bg-success-subtle`, `text-on-success`<br/>`bg-warning`, `text-warning`, `border-warning`, `bg-warning-subtle`, `text-on-warning`<br/>`bg-danger`, `text-danger`, `border-danger`, `bg-danger-subtle`, `text-on-danger`<br/>`bg-info`, `text-info`, `border-info`, `bg-info-subtle`, `text-on-info` | Alerts, validations, error states, affirmative indicators |
| **Neutral**     | `bg-neutral`, `text-neutral`, `border-neutral`, `bg-neutral-subtle`, `text-on-neutral`                                                                                                                                                                                                                                                              | Neutral pills, subtle chips, muted containers             |
| **Backgrounds** | `bg-background`, `bg-surface`, `bg-surface-subtle`, `bg-surface-muted`, `bg-surface-strong`, `bg-surface-overlay`                                                                                                                                                                                                                                   | Page backgrounds, cards, sheets, containers, table rows   |
| **Typography**  | `text-content-primary`, `text-content-secondary`, `text-content-tertiary`, `text-content-muted`, `text-content-disabled`, `text-content-inverse`                                                                                                                                                                                                    | Text hierarchy and icons                                  |
| **Borders**     | `border-border`, `border-border-base`, `border-border-subtle`, `border-border-strong`, `border-border-focus`, `border-border-danger`                                                                                                                                                                                                                | Separators, outlines, component borders, rings            |

---

## 🏗️ Recipe Anatomy Pattern

Every recipe module in `packages/core/theme/src/recipes/<component>/` must follow this structure:

```ts
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

export const componentName = tv({
  slots: {
    root: 'ideasui-component relative flex items-center shrink-0 font-medium',
    element: 'ideasui-component__element flex-1 border-0',
    label: 'ideasui-component__label text-sm text-content-secondary',
  },

  variants: {
    // ── Variant Styles ──────────────────────────────────────────────
    variant: {
      solid: { root: 'border-transparent' },
      soft: { root: 'border-transparent' },
      outline: { root: 'bg-transparent border' },
    },

    // ── Semantic Colors (Mapped via compoundVariants) ───────────────
    color: {
      default: {},
      primary: {},
      neutral: {},
      success: {},
      warning: {},
      danger: {},
    },

    // ── Scale / Size ────────────────────────────────────────────────
    size: {
      sm: { root: 'h-8 px-3 text-xs gap-1.5' },
      md: { root: 'h-10 px-4 text-sm gap-2' },
      lg: { root: 'h-12 px-5 text-base gap-2.5' },
    },
  },

  compoundVariants: [
    // Solid intent colors
    { variant: 'solid', color: 'primary', class: { root: 'bg-primary text-on-primary' } },
    { variant: 'solid', color: 'neutral', class: { root: 'bg-neutral text-on-neutral' } },
    { variant: 'solid', color: 'success', class: { root: 'bg-success text-on-success' } },
    { variant: 'solid', color: 'warning', class: { root: 'bg-warning text-on-warning' } },
    { variant: 'solid', color: 'danger', class: { root: 'bg-danger text-on-danger' } },

    // Soft intent colors
    { variant: 'soft', color: 'primary', class: { root: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'neutral', class: { root: 'bg-neutral-subtle text-neutral' } },

    // Outline intent colors
    { variant: 'outline', color: 'default', class: { root: 'border-border text-content-primary' } },
    { variant: 'outline', color: 'primary', class: { root: 'border-primary text-primary' } },
  ],

  defaultVariants: {
    variant: 'solid',
    color: 'default',
    size: 'md',
  },
});

export type ComponentNameVariants = VariantProps<typeof componentName>;
export type ComponentNameReturnType = ReturnType<typeof componentName>;
export type ComponentNameSlots = keyof ComponentNameReturnType;
```

---

## 🎯 Best Practices

1. **Slots Include Both BEM + Tailwind:**
   - Include the BEM hook class first for CSS debugging & standalone stylesheet targeting:  
     `root: 'ideasui-btn inline-flex items-center justify-center font-medium'`
2. **Directional Shorthands & Logical Properties:**
   - Use `inset-0` instead of `top-0 right-0 bottom-0 left-0`.
   - Prefer logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`) for RTL compliance where applicable.
3. **Compound Variants For Color Pairings:**
   - Leave `color: { primary: {}, ... }` as empty variant anchors, then pair them with `variant` (`solid`, `soft`, `outline`) in `compoundVariants`. This prevents specificity conflicts.
4. **Never Conflict Sizing:**
   - Do not declare fixed widths/heights in `base`/`root` slots if `size` variants adjust them.

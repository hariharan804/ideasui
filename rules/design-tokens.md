# Design System & Theme Token Rules

When building, modifying, or refactoring UI components, pages, or features in IdeasUI, you MUST use the semantic token system — never raw Tailwind palette colors.

---

## 🚫 The Core Rule

> **NEVER hardcode Tailwind palette colors.**  
> Use ONLY the IdeasUI semantic tokens listed below.

❌ **Forbidden classes:**

```
emerald-500  amber-500  slate-900  blue-600  red-500
gray-50  gray-100  gray-200  neutral-50  indigo-*
any raw HEX/RGB/OKLCH value inline in className
```

✅ **Use instead:** the semantic classes documented in this file.

---

## 🎨 Semantic Color Tokens

### Brand Colors

These three are the visual identity of IdeasUI. Use **only** the named semantic aliases below — **never** numeric shades like `primary-50`, `primary-500`, or `primary-950`.

❌ **Forbidden:**

```
primary-50   primary-100  primary-200  primary-300  primary-400
primary-500  primary-600  primary-700  primary-800  primary-900  primary-950
```

(Same applies to `secondary-*` and `tertiary-*` numeric shades.)

✅ **Required — use only these semantic aliases:**

| Purpose           | Class                    | Resolves to                           |
| ----------------- | ------------------------ | ------------------------------------- |
| Filled background | `bg-primary`             | `primary-500`, auto-adapted per theme |
| Text on filled    | `text-on-primary`        | High contrast on `bg-primary`         |
| Subtle fill       | `bg-primary-subtle`      | Light wash background                 |
| Text on subtle    | `text-on-primary-subtle` | Readable on subtle background         |
| Muted fill        | `bg-primary-muted`       | Softer than subtle                    |
| Text on muted     | `text-on-primary-muted`  | Readable on muted background          |
| Text / icon color | `text-primary`           | Brand-colored text or icon            |
| Border color      | `border-primary`         | Brand-colored border                  |

Apply the **exact same pattern** for `secondary-*` and `tertiary-*`.

---

### Status / Feedback Colors

Use **only** these tokens for status states. Do NOT reach for raw Tailwind green/red/yellow/blue.

| State          | Token prefix | Example classes                                                                |
| -------------- | ------------ | ------------------------------------------------------------------------------ |
| Success        | `success-*`  | `bg-success`, `text-on-success`, `bg-success-subtle`, `text-on-success-subtle` |
| Warning        | `warning-*`  | `bg-warning`, `text-on-warning`, `bg-warning-subtle`                           |
| Error / Danger | `error-*`    | `bg-error`, `text-on-error`, `bg-error-subtle`, `border-error`                 |
| Info           | `info-*`     | `bg-info`, `text-on-info`, `bg-info-subtle`                                    |
| Neutral        | `neutral-*`  | `bg-neutral`, `bg-neutral-muted`, `text-on-neutral`                            |

---

### Surface & Background Tokens

Never use `bg-white`, `bg-gray-50`, `bg-slate-900`, etc. Use these instead:

| Token              | Class                     | Description                            |
| ------------------ | ------------------------- | -------------------------------------- |
| App background     | `bg-background`           | Page root background                   |
| Text on background | `text-on-background`      | Main page text                         |
| Card / container   | `bg-surface`              | Default card / container               |
| Text on surface    | `text-on-surface`         | Text inside cards                      |
| Nested (subtle)    | `bg-surface-subtle`       | Nested container, lighter than surface |
| Nested (muted)     | `bg-surface-muted`        | Secondary nesting level                |
| Nested (strong)    | `bg-surface-strong`       | Sidebar / section headers              |
| Modal / drawer     | `bg-surface-modal`        | Overlay dialog backgrounds             |
| Inverse surface    | `bg-surface-inverse`      | Dark surface in light mode             |
| Text on inverse    | `text-on-surface-inverse` | Text on `bg-surface-inverse`           |

---

### Typography Tokens

Use these for **all text color** decisions:

| Role                | Class                    | Notes                         |
| ------------------- | ------------------------ | ----------------------------- |
| Primary text        | `text-content-primary`   | Main body, headings           |
| Secondary text      | `text-content-secondary` | Sub-labels, metadata          |
| Tertiary text       | `text-content-tertiary`  | Helper text, captions         |
| Muted / placeholder | `text-content-muted`     | Placeholders, hints           |
| Disabled            | `text-content-disabled`  | Non-interactive text          |
| Inverse             | `text-content-inverse`   | Text on dark/inverse surfaces |

---

### Border / Divider Tokens

Use `divider-*` tokens for **all border color** decisions:

| Token           | Class                   | Description                        |
| --------------- | ----------------------- | ---------------------------------- |
| Default divider | `border-divider`        | Standard separator                 |
| Subtle divider  | `border-divider-subtle` | Lighter separator                  |
| Strong divider  | `border-divider-strong` | Prominent separator                |
| Focus ring      | `border-divider-focus`  | Focus state border (`primary-500`) |
| Error border    | `border-divider-error`  | Validation error border            |

With opacity variants for transparent borders:

```tsx
border - primary / 20; // primary color at 20% opacity
border - secondary / 30; // secondary at 30% opacity
border - current / 20; // inherits text color at 20% (used in attached buttons)
```

---

## 🌗 Dark Mode Rule

**NEVER use the `dark:` Tailwind modifier.**

```tsx
// ❌ WRONG — bypasses the semantic token system
<div className="bg-white dark:bg-slate-900">

// ✅ CORRECT — semantic tokens resolve automatically
<div className="bg-surface">
```

Light/dark mode is resolved automatically by the IdeasUI `ThemeProvider` via CSS custom properties. The semantic tokens (`--ideasui-color-*`) swap values between themes without any `dark:` prefix needed.

---

## 🎭 Component Recipe Colors

When authoring a new recipe with `tv()`, use color `variant` classes that follow this pattern — not raw palette values:

```tsx
import { tv } from 'tailwind-variants';

export const myComponent = tv({
  base: 'bg-surface text-content-primary border-divider',
  variants: {
    color: {
      primary: { base: 'my-comp--primary' }, // compound variants handle actual classes
      secondary: { base: 'my-comp--secondary' },
      error: { base: 'my-comp--error' },
    },
    variant: {
      solid: { base: 'text-on-primary' }, // semantic on-* token
      outline: { base: 'border bg-transparent' },
      soft: { base: 'bg-primary-subtle text-on-primary-subtle' },
    },
  },
});
```

See `packages/core/theme/src/recipes/button.ts` for the canonical recipe reference.

---

## 📐 Token Quick-Reference Cheatsheet

```
BACKGROUNDS        TYPOGRAPHY                BORDERS
bg-background      text-content-primary      border-divider
bg-surface         text-content-secondary    border-divider-subtle
bg-surface-subtle  text-content-tertiary     border-divider-strong
bg-surface-muted   text-content-muted        border-divider-focus
bg-surface-strong  text-content-disabled     border-divider-error
bg-surface-modal   text-content-inverse

BRAND (replace * with primary / secondary / tertiary)
bg-*               text-*              bg-*-subtle       bg-*-muted
text-on-*          border-*            text-on-*-subtle  text-on-*-muted

STATUS (replace * with success / warning / error / info / neutral)
bg-*               text-on-*           bg-*-subtle
text-*             border-*            text-on-*-subtle
```

---

## 🔑 CSS Variable Reference

All tokens resolve to `--ideasui-color-*` CSS custom properties generated by `@ideasui/theme/plugin`. You should **never reference these variables directly in className**; always use the Tailwind utility form above.

```css
/* Generated by @ideasui/theme — do not write these by hand */
--ideasui-color-primary-500: oklch(0.575 0.214 277.1);
--ideasui-color-surface: var(--ideasui-color-neutral-50);
--ideasui-color-content-primary: var(--ideasui-color-neutral-900);
```

---

## ✅ Token Validation

After any styling change, confirm no raw palette colors leaked in:

```bash
# Search for forbidden raw colors in source
grep -rn --include="*.tsx" --include="*.ts" \
  -E "(gray|slate|zinc|stone|neutral|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+" \
  packages/ apps/ \
  | grep -v "ideasui-color" | grep -v "node_modules"
```

> **Rule:** If the grep above returns hits in your changed files, fix them before committing.

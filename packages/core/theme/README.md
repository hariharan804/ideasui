# @ideasui/theme

The official design system and theme engine for **IdeasUI** — built on **Tailwind CSS v4** and modern CSS.

[![NPM Version](https://img.shields.io/npm/v/@ideasui/theme.svg)](https://www.npmjs.com/package/@ideasui/theme)
[![License](https://img.shields.io/npm/l/@ideasui/theme.svg)](https://github.com/ideas2logic-lab/ideasui/blob/master/LICENSE)

## Features

- 🎨 **Unified Design System** — Centralized tokens for colors, typography, spacing, and more.
- 🌗 **Dark Mode First** — Native light/dark support using OKLCH color spaces.
- ⚡ **Tailwind CSS v4 Plugin** — Seamless integration with Tailwind's utility classes.
- 🔄 **Zero Runtime Overhead** — Tokens compiled to CSS variables at build time.
- 🛡️ **Type-Safe** — Full TypeScript support for theme configuration and overrides.

## Installation

```bash
npm install @ideasui/theme
# or
pnpm add @ideasui/theme
```

## Setup

Pick **one** of the following options.

---

### Option 1 — CSS Import · Recommended

The simplest setup. Just import Tailwind and the prebuilt theme stylesheet.

```css
/* globals.css */
@import 'tailwindcss';
@import '@ideasui/theme/theme.css';
```

> No `tailwind.config.ts` needed. The theme CSS already includes all plugin output.

---

### Option 2 — Tailwind Config (Classic)

Add the plugin via a `tailwind.config.ts` file and reference it from your CSS.

```ts
// tailwind.config.ts
import { ideasUIPlugin } from '@ideasui/theme/plugin';

export default {
  plugins: [ideasUIPlugin()],
};
```

```css
/* globals.css */
@import 'tailwindcss';
@config '../tailwind.config.ts';

@source '../../../node_modules/@ideasui/*/.{js,ts,jsx,tsx,mdx,css}';
```

---

### Option 3 — Inline Plugin (CSS-first)

Reference the plugin directly from your CSS without a separate config file.

```css
/* globals.css */
@import 'tailwindcss';
@config '../plugin.ts';
```

```ts
// plugin.ts
import { ideasUIPlugin } from '@ideasui/theme/plugin';

export default ideasUIPlugin();
```

---

## Add Theme Provider (React / Next.js) — Optional

> Only needed if you want **runtime theme switching** (e.g. a light/dark toggle). Skip this if you're using a static theme.

Wrap your app with `ThemeProvider` to enable theme switching and persistence.

```tsx
// app/providers.tsx
import { ThemeProvider } from '@ideasui/theme';

export function Providers({ children }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
```

### Prevent FOUC (SSR / Next.js)

```tsx
// app/layout.tsx
import { ThemeScript } from '@ideasui/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Token Architecture

| Tier                     | Examples                                                                     |
| ------------------------ | ---------------------------------------------------------------------------- |
| **Brand & Intent**       | Primary, Secondary, Tertiary (`primary`, `primary-subtle`, `primary-muted`)  |
| **Surfaces & Layout**    | Application & container surfaces (`background`, `surface`, `surface-subtle`) |
| **Content & Typography** | Text emphasis levels (`content-primary`, `content-secondary`)                |
| **Borders**              | Container borders (`border`, `border-base`, `border-subtle`, `border-focus`) |

### Using Tokens

```tsx
// Tailwind utilities
<div className="bg-surface text-content-primary rounded-lg p-4">
  <button className="bg-primary hover:bg-primary/90 text-on-primary">Click</button>
</div>
```

```css
/* CSS variables */
.my-element {
  background: var(--ideasui-color-surface-elevated);
  color: var(--ideasui-color-content-primary);
}
```

---

## Customization

All customization is done through `ideasUIPlugin()`. Every option is **optional** — use only what you need.

### Global Options

| Option              | Type                          | Default   | Description                              |
| ------------------- | ----------------------------- | --------- | ---------------------------------------- |
| `defaultTheme`      | `'light' \| 'dark' \| string` | `'light'` | Initial active theme                     |
| `disableAnimations` | `boolean`                     | `false`   | Globally disable all animations          |
| `designTokens`      | `TokenOverrides`              | —         | Override design tokens across all themes |
| `semanticTokens`    | `SemanticTokenOverrides`      | —         | Override semantic color tokens globally  |
| `themes`            | `{ light?, dark? }`           | —         | Per-theme color and token overrides      |

```ts
ideasUIPlugin({
  defaultTheme: 'dark',
  disableAnimations: false,
});
```

---

### Colors

Override brand colors per-theme. Values can be any valid CSS color — OKLCH is recommended for precision.

```ts
ideasUIPlugin({
  themes: {
    light: {
      colors: {
        primary: {
          500: 'oklch(0.65 0.25 145)', // custom green primary
          600: 'oklch(0.55 0.22 145)',
        },
        secondary: {
          500: 'oklch(0.60 0.20 30)', // warm coral
        },
      },
    },
    dark: {
      colors: {
        primary: {
          500: 'oklch(0.70 0.20 145)',
        },
      },
    },
  },
});
```

Available palettes: `primary`, `secondary`, `tertiary`, `neutral`, `success`, `danger`, `warning`, `info`  
Available shades: `50` `100` `200` `300` `400` `500` `600` `700` `800` `900` `950`

---

### Design Tokens

Override any design token globally (all themes) or per-theme. Custom keys create new Tailwind utilities automatically.

#### Spacing

```ts
ideasUIPlugin({
  designTokens: {
    spacing: {
      custom: '3px', // → p-custom, m-custom, gap-custom …
      18: '4.5rem', // → p-18, m-18 …
    },
  },
});
```

#### Border Radius

```ts
ideasUIPlugin({
  designTokens: {
    borderRadius: {
      custom: '5px', // → rounded-custom
      lg: '1rem', // override existing
    },
  },
});
```

#### Border Width & Color

```ts
ideasUIPlugin({
  designTokens: {
    borderWidth: { custom: '1px' }, // → border-custom
    borderColor: { custom: 'red' }, // → border-custom color
  },
});
```

#### Typography

```ts
ideasUIPlugin({
  designTokens: {
    fontSize: { custom: '12px' }, // → text-custom
    fontFamily: { custom: 'Arial' }, // → font-custom
    fontWeight: { custom: 'bold' }, // → font-custom
    letterSpacing: { custom: '1px' }, // → tracking-custom
  },
});
```

#### Shadows

```ts
ideasUIPlugin({
  designTokens: {
    boxShadow: { custom: '0 0 0 1px red' }, // → shadow-custom
  },
});
```

#### Motion

```ts
ideasUIPlugin({
  designTokens: {
    duration: { custom: '1s' }, // → duration-custom
    easing: { custom: 'ease-in-out' }, // → ease-custom
    animation: { custom: 'spin 1s linear infinite' }, // → animate-custom
    keyframes: {
      custom: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
  },
});
```

#### Opacity, Z-Index & Blur

```ts
ideasUIPlugin({
  designTokens: {
    opacity: { custom: '0.5' }, // → opacity-custom
    zIndex: { custom: '100' }, // → z-custom
    blur: { custom: '10px' }, // → blur-custom
  },
});
```

---

### Semantic Tokens

Override role-based colors (surfaces, content, borders) per-theme. Values are CSS color strings or `var()` references.

```ts
ideasUIPlugin({
  themes: {
    light: {
      semanticTokens: {
        surface: {
          base: 'oklch(1 0 0)', // bg-surface-base
          elevated: 'oklch(0.98 0.01 240)',
        },
        content: {
          primary: 'oklch(0.2 0.02 240)', // text-content-primary
          secondary: 'oklch(0.4 0.02 240)',
        },
        border: {
          default: 'oklch(0.85 0 0)', // border-default
        },
      },
    },
  },
});
```

---

### Per-Theme Design Tokens

Design tokens can also be scoped to a specific theme:

```ts
ideasUIPlugin({
  themes: {
    light: {
      designTokens: {
        boxShadow: { md: '0 4px 12px 0 rgba(0,0,0,0.08)' },
      },
    },
    dark: {
      designTokens: {
        boxShadow: { md: '0 4px 12px 0 rgba(0,0,0,0.4)' },
      },
    },
  },
});
```

---

## CSS-only Customization

If you're using **Option 1** (CSS Import) or prefer not to touch `tailwind.config.ts`, override any token directly in CSS.

> **Important:** Color values are stored as bare OKLCH components (without the `oklch()` wrapper) because the theme wraps them at consumption time via `oklch(var(...))`. Use the same format when overriding.

### Colors

```css
:root {
  /* OKLCH values stored as "L C H" components */
  --ideasui-color-primary: 0.54 0.22 272;
  --ideasui-color-primary-subtle: 0.965 0.02 272;
  --ideasui-color-secondary: 0.53 0.21 310;
}

.dark,
[data-theme='dark'] {
  --ideasui-color-primary: 0.62 0.22 272;
}
```

Available intent & status colors: `primary` `secondary` `tertiary` `neutral` `success` `danger` `warning` `info`

---

### Semantic Tokens

```css
:root {
  /* Surfaces */
  --ideasui-color-background: 1 0 0;
  --ideasui-color-surface: 0.985 0.002 260;
  --ideasui-color-surface-subtle: 0.967 0.003 260;
  --ideasui-color-surface-muted: 0.922 0.004 260;
  --ideasui-color-surface-strong: 0.87 0.005 260;

  /* Content (text) */
  --ideasui-color-content-primary: 0.205 0.008 260;
  --ideasui-color-content-secondary: 0.371 0.009 260;
  --ideasui-color-content-tertiary: 0.442 0.008 260;
  --ideasui-color-content-muted: 0.551 0.015 260;
  --ideasui-color-content-disabled: 0.708 0.006 260;

  /* Borders */
  --ideasui-color-border: 0.922 0.004 260;
  --ideasui-color-border-subtle: 0.967 0.003 260;
  --ideasui-color-border-strong: 0.87 0.005 260;
  --ideasui-color-border-focus: 0.575 0.214 277.1;
  --ideasui-color-border-danger: 0.53 0.185 25.3;
}
```

---

### Spacing

```css
:root {
  --ideasui-spacing-custom: 3px; /* new → p-custom, m-custom, gap-custom */
  --ideasui-spacing-4: 1.25rem; /* override existing */
}
```

---

### Border Radius

```css
:root {
  --ideasui-radius-custom: 5px; /* new → rounded-custom */
  --ideasui-radius-lg: 0.75rem; /* override existing */
}
```

---

### Typography

```css
:root {
  --ideasui-font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --ideasui-font-mono: 'Geist Mono', ui-monospace, monospace;
  --ideasui-font-size-custom: 12px; /* new → text-custom */
  --ideasui-tracking-custom: 1px; /* new → tracking-custom */
}
```

---

### Shadows

```css
:root {
  --ideasui-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --ideasui-shadow-custom: 0 0 0 1px red; /* new → shadow-custom */
}

.dark,
[data-theme='dark'] {
  --ideasui-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --ideasui-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.25);
}
```

Built-in shadows: `xs` `sm` `md` `lg` `xl` `2xl` `inner` `none`

---

### Motion

```css
:root {
  --ideasui-duration-custom: 1s; /* new → duration-custom */
  --ideasui-easing-custom: ease-in-out; /* new → ease-custom */

  /* Override existing */
  --ideasui-duration-md: 200ms;
  --ideasui-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Built-in durations: `xs`(75ms) `sm`(100ms) `md`(150ms) `lg`(200ms) `xl`(300ms) `2xl`(500ms) `3xl`(700ms) `4xl`(1000ms)  
Built-in easings: `standard` `accelerate` `decelerate` `emphasized` `linear` `spring`

---

### Opacity, Z-Index & Blur

```css
:root {
  --ideasui-opacity-custom: 0.5; /* new → opacity-custom */
  --ideasui-z-index-custom: 100; /* new → z-custom */
  --ideasui-blur-custom: 10px; /* new → blur-custom */
}
```

Built-in z-index: `hide`(-1) `base`(0) `raised`(1) `sticky`(100) `fixed`(200) `dropdown`(1000) `overlay`(1100) `modal`(1200) `popover`(1300) `toast`(1400) `tooltip`(1500)

> **Tip:** Custom CSS variable additions create new Tailwind utilities automatically — no rebuild required. Overrides to existing variables also take effect immediately.

---

## License

MIT

# @ideasui/styles

The CSS distribution package for **IdeasUI**. It provides pre-compiled CSS stylesheets for the design system and individual UI components, built with **Tailwind CSS v4** and `@ideasui/theme`.

[![NPM Version](https://img.shields.io/npm/v/@ideasui/styles.svg)](https://www.npmjs.com/package/@ideasui/styles)
[![License](https://img.shields.io/npm/l/@ideasui/styles.svg)](https://github.com/ideas2logic-lab/ideasui/blob/master/LICENSE)

## Why `@ideasui/styles`?

IdeasUI components are styled using Tailwind CSS v4. To support environments where consumers do not run Tailwind CSS compilation themselves (or want to use components without configuring Tailwind), `@ideasui/styles` exports pre-compiled stylesheets.

You can choose the integration method that fits your project's performance and design needs.

## Installation

```bash
npm install @ideasui/styles
# or
pnpm add @ideasui/styles
```

---

## Integration Choices

We support two main ways to import and consume the compiled styles:

### 1. All-in-One CSS (Recommended)

Imports all resets, design tokens, and utility classes for every component in the library. This is the simplest option.

```tsx
// Import base resets, Tailwind preflight, and theme tokens (once in your app root)
import '@ideasui/styles/base.css';

// Import compiled utility classes for all IdeasUI components
import '@ideasui/styles/styles.css';
```

### 2. Component-Wise CSS (Optimized)

Import base styles once, then import component-specific stylesheets individually to minimize CSS bundle size.

```tsx
// Import base resets and theme tokens
import '@ideasui/styles/base.css';

// Import only the component styles you use
import '@ideasui/styles/components/button.css';
```

---

## File Reference

The package distributes styles under the `dist` directory with the following structure:

| File / Path                       | Description                                                          | Resets Included? |
| :-------------------------------- | :------------------------------------------------------------------- | :--------------: |
| `dist/base.css`                   | Tailwind Preflight resets + `@ideasui/theme` CSS custom properties.  |       Yes        |
| `dist/styles.css`                 | All component utility classes compiled in a single file.             |        No        |
| `dist/components/[component].css` | Utility classes specific to a single component (e.g., `button.css`). |        No        |

---

## Development

If you make changes to theme configurations, component source files, or Tailwind utility usages, you can recompile the stylesheets:

```bash
pnpm run build
```

This builds the TypeScript/JavaScript distribution files and compiles the CSS variants into the `dist/` directory using `@tailwindcss/cli`.

---

## License

MIT © [IdeasUI](https://ideasui.com)

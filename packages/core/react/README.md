# @ideasui/react

The main entry point for the **IdeasUI** component library — a collection of high-performance, accessible UI components built with **Tailwind CSS v4** and **React Aria**.

[![NPM Version](https://img.shields.io/npm/v/@ideasui/react.svg)](https://www.npmjs.com/package/@ideasui/react)
[![License](https://img.shields.io/npm/l/@ideasui/react.svg)](https://github.com/ideas2logic-lab/ideasui/blob/master/LICENSE)

## Why IdeasUI?

IdeasUI is designed for developers who need premium, accessible components with zero runtime overhead. By leveraging Tailwind CSS v4 and React Aria, we provide a foundation that is both extremely fast and natively accessible.

- 🚀 **Performance** — Zero-runtime CSS-in-JS.
- ♿ **Accessible** — W3C/WAI-ARIA compliant out of the box.
- 🎨 **Modern Aesthetics** — Premium designs with OKLCH color support.
- 🌗 **Dark Mode** — Native support with adaptive design tokens.

## Installation

```bash
npm install @ideasui/react
# or
pnpm add @ideasui/react
```

## Quick Start

```tsx
import { Button, ThemeProvider, ThemeScript } from '@ideasui/react';

// 1. Add ThemeScript to your head (prevents FOUC)
// 2. Wrap your app with ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <Button variant="solid" color="primary">
        Welcome to IdeasUI
      </Button>
    </ThemeProvider>
  );
}
```

## What's Included?

This package is a monolithic bundle that includes:

- **@ideasui/theme** — Design tokens and theme engine.
- **@ideasui/button** — Button and ButtonGroup components.
- **@ideasui/utils** — Performance and styling utilities.

## Documentation

For full documentation and component API references, visit [ideasui.com](https://ideasui.com).

## License

MIT © [IdeasUI](https://ideasui.com)

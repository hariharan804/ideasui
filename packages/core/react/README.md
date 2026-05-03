# @ideasui/react

The main React entry point for the **IdeasUI** component library. This package provides a single installation point for all high-performance, accessible components built with Tailwind CSS v4 and React Aria.

## Installation

```bash
npm install @ideasui/react
```

## Usage

You can import any component directly from `@ideasui/react`:

```tsx
import { Button, ThemeProvider } from '@ideasui/react';

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

## Included Packages

This package re-exports everything from:

- **@ideasui/theme**: Core design system, tokens, and theme providers.
- **@ideasui/button**: High-performance button and button group components.
- **@ideasui/utils**: Shared utility functions and accessibility helpers.

## Features

- **🚀 Performance**: Built with zero-runtime CSS-in-JS using Tailwind CSS v4.
- **♿ Accessibility**: Foundation built on React Aria for WCAG compliance.
- **🎨 Customization**: Fully themeable via OKLCH color tokens and semantic variables.
- **🌗 Dark Mode**: Built-in support for multiple color schemes with adaptive tokens.
- **📦 Monolithic**: Install one package, get the entire library.

## Documentation

For full documentation and component API references, visit [ideasui.com](https://ideasui.com).

## License

MIT © [IdeasUI](https://ideasui.com)

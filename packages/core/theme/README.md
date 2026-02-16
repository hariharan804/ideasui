# @ideasui/theme

The official design system and theme engine for IdeasUI, built on top of Tailwind CSS v4 and modern CSS features.

## Features

- 🎨 **Unified Design System**: Centralized tokens for colors, typography, spacing, and more.
- 🌗 **Dark Mode First**: Native support for light and dark modes using OKLCH color spaces.
- 🧩 **Tailwind CSS v4 Plugin**: Seamless integration with Tailwind's utility classes.
- ⚡ **Zero Runtime Overhead**: Theme tokens are compiled to CSS variables at build time.
- 🔄 **Type-Safe**: Full TypeScript support for theme configuration and overrides.

## Installation

```bash
npm install @ideasui/theme
# or
pnpm add @ideasui/theme
```

## Setup

### 1. Configure Tailwind CSS

Add the `ideasUIPlugin` to your Tailwind CSS configuration (v4+).

```ts
// tailwind.config.ts
import { ideasUIPlugin } from '@ideasui/theme/plugin'; // Note the import path

export default {
  content: [
    // ... paths to your components
  ],
  plugins: [
    ideasUIPlugin({
      defaultTheme: 'light',
      prefix: 'ideasui', // optional, defaults to 'ideasui'
      themes: {
        light: {
          colors: {
            primary: {
              500: '#3b82f6', // Override specific tokens
            },
          },
        },
      },
    }),
  ],
};
```

### 2. Add Theme Provider

Wrap your application with the `ThemeProvider` to handle theme switching and persistence.

```tsx
// app/providers.tsx
import { ThemeProvider } from '@ideasui/theme';

export function Providers({ children }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
```

### 3. Prevent FOUC (Next.js / SSR)

To prevent Flash of Unstyled Content, include the `ThemeScript` in your document head.

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

## Token Structure

The theme system is built on a tiered architecture:

1.  **Primitives**: Raw color values (OKLCH).
2.  **Semantic**: Abstracted tokens (e.g., `primary.base`, `surface.elevated`) that map to primitives.
3.  **Component**: Component-specific tokens.

### Accessing Tokens

You can use standard Tailwind classes or CSS variables:

```tsx
// Tailwind classes
<div className="bg-surface-elevated text-content-primary p-4 rounded-lg">
  <h1 className="text-xl font-bold">Hello World</h1>
  <button className="bg-primary hover:bg-primary-600 text-white">
    Click Me
  </button>
</div>

// CSS Variables
.my-custom-element {
  background-color: var(--ideasui-surface-elevated);
  color: var(--ideasui-content-primary);
}
```

## Customization

You can override any part of the theme via the plugin configuration.

```ts
ideasUIPlugin({
  designTokens: {
    borderRadius: {
      lg: '1rem', // Override specific token
    },
  },
  themes: {
    dark: {
      colors: {
        // ... custom dark mode colors
      },
    },
  },
});
```

## License

MIT

# @your-org/theme-switcher

Enterprise-grade theme switcher with flexible configuration and SSR support.

## Features

- ✅ **Multiple themes** - Support any number of custom themes
- ✅ **Flexible DOM updates** - Class, attribute, or selector-based
- ✅ **Storage adapters** - localStorage, sessionStorage, or memory
- ✅ **SSR/SSG compatible** - No hydration mismatches
- ✅ **System theme detection** - Automatic dark/light detection
- ✅ **Zero dependencies** - Only React peer dependency
- ✅ **TypeScript** - Full type safety

## Installation

```bash
npm install @your-org/theme-switcher
```

## Quick Start

```tsx
import { ThemeScript, useTheme } from '@your-org/theme-switcher'

// 1. Add script to prevent FOUC
function RootLayout({ children }) {
  return (
    <html>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  )
}

// 2. Use theme hook
function App() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme('dark')}>
      Current: {theme}
    </button>
  )
}
```

## Advanced Configuration

### Multiple Custom Themes

```tsx
const themeConfig = {
  themes: ['light', 'dark', 'purple', 'green'],
  defaultTheme: 'light',
  storageKey: 'app-theme'
}

function App() {
  const { theme, setTheme } = useTheme(themeConfig)
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {themeConfig.themes.map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  )
}
```

### CSS Class Mode

```tsx
<ThemeScript
  mode="class"
  attribute="class"
  value={{
    light: 'theme-light',
    dark: 'theme-dark',
    purple: 'theme-purple'
  }}
/>
```

### Custom Selector

```tsx
<ThemeScript
  selector="[data-theme]"
  attribute="data-theme"
  mode="attribute"
/>
```

### Storage Adapters

```tsx
// Use sessionStorage
const { theme } = useTheme({ storage: 'session' })

// Use memory storage (no persistence)
const { theme } = useTheme({ storage: 'memory' })

// Custom storage adapter
const customStorage = {
  getItem: (key) => /* custom logic */,
  setItem: (key, value) => /* custom logic */,
  removeItem: (key) => /* custom logic */
}
const { theme } = useTheme({ storage: customStorage })
```

## API Reference

### ThemeScript
Prevents FOUC by applying theme before hydration.

### useTheme(options)
Main hook for theme management.

**Options:**
- `themes: string[]` - Available themes
- `defaultTheme: string` - Default theme
- `storageKey: string` - Storage key
- `mode: 'class' | 'attribute' | 'selector'` - DOM update mode
- `storage: StorageAdapter` - Storage strategy

Build your own UI components using the `useTheme` hook.
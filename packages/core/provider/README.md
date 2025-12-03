# IdeasUI Provider

Core provider component that configures the IdeasUI component library globally.

## Installation

```bash
npm install @iui/provider
```

## Usage

```tsx
import { IdeasUIProvider } from '@iui/provider'

function App() {
  return (
    <IdeasUIProvider defaultTheme="dark" disableAnimations={false}>
      <YourApp />
    </IdeasUIProvider>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultTheme | 'light' \| 'dark' \| 'system' | 'system' | Default theme mode |
| cssPrefix | string | '--iui' | CSS custom property prefix |
| disableAnimations | boolean | false | Disable all animations |
| strict | boolean | false | Enable strict mode warnings |
| children | ReactNode | - | App content |

## Hook

### useIdeasUI()

Access the current IdeasUI configuration:

```tsx
import { useIdeasUI } from '@iui/provider'

function MyComponent() {
  const { defaultTheme, disableAnimations } = useIdeasUI()
  
  return (
    <div className={`component ${defaultTheme === 'dark' ? 'dark' : ''}`}>
      Content
    </div>
  )
}
```

## Examples

### Basic Setup
```tsx
import { IdeasUIProvider } from '@iui/provider'

function App() {
  return (
    <IdeasUIProvider>
      <YourApp />
    </IdeasUIProvider>
  )
}
```

### Dark Theme Default
```tsx
<IdeasUIProvider defaultTheme="dark">
  <YourApp />
</IdeasUIProvider>
```

### Disable Animations
```tsx
<IdeasUIProvider disableAnimations={true}>
  <YourApp />
</IdeasUIProvider>
```

### Custom CSS Prefix
```tsx
<IdeasUIProvider cssPrefix="--my-ui">
  <YourApp />
</IdeasUIProvider>
```

### Full Configuration
```tsx
<IdeasUIProvider
  defaultTheme="dark"
  cssPrefix="--custom"
  disableAnimations={false}
  strict={true}
>
  <YourApp />
</IdeasUIProvider>
```

## Features

- **Global Configuration**: Set library-wide defaults
- **Theme Management**: Control default theme mode
- **Animation Control**: Globally disable animations
- **CSS Custom Properties**: Automatic CSS variable management
- **Data Attributes**: Sets data attributes on document root
- **TypeScript**: Full type safety
- **Context API**: React context for configuration access

## CSS Variables

The provider automatically sets these CSS custom properties:

```css
:root {
  --iui-animations: 1; /* 0 when disabled */
}
```

## Data Attributes

The provider sets these data attributes on `document.documentElement`:

```html
<html 
  data-iui-theme="system"
  data-iui-animations="enabled"
>
```

These can be used for CSS styling:

```css
[data-iui-animations="disabled"] * {
  animation-duration: 0s !important;
  transition-duration: 0s !important;
}

[data-iui-theme="dark"] {
  color-scheme: dark;
}
```
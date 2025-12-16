# @ideasui/ripple

Ripple component for user interactions.

## Installation

```bash
npm install @ideasui/ripple
```

## Usage

```tsx
import { Ripple } from '@ideasui/ripple'

function App() {
  return (
    <Ripple variant="outline" size="lg">
      Click me
    </Ripple>
  )
}
```

## API Reference

### RippleProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'solid' \| 'outline' \| 'ghost' | 'solid' | Visual style variant |
| color | ColorVariant | 'default' | Color variant based on semantic intent |
| size | ButtonSize | 'md' | Size of the component |
| radius | Radius | 'md' | Border radius variant |

## Examples

```tsx
// Default ripple
<Ripple>Default</Ripple>

// Primary solid ripple
<Ripple color="primary" variant="solid">Primary</Ripple>

// Success outline ripple
<Ripple color="success" variant="outline" size="lg">Success</Ripple>

// Danger ghost ripple with full radius
<Ripple color="danger" variant="ghost" radius="full">Danger</Ripple>
```
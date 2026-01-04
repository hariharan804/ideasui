# @ideasui/touchable

Touchable component with ripple effects for user interactions.

## Installation

```bash
npm install @ideasui/touchable
```

## Usage

```tsx
import {Touchable} from "@ideasui/touchable";

function App() {
  return (
    <Touchable as="div" rippleColor="blue">
      Click me for ripple effect
    </Touchable>
  );
}
```

## API Reference

### TouchableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | keyof React.JSX.IntrinsicElements | "button" | Element type to render |
| disabled | boolean | false | Disable interactions and ripple |
| rippleColor | string | "currentColor" | Color of the ripple effect |

## Features

- ✅ Ripple effects on interaction
- ✅ Keyboard support (Enter/Space)
- ✅ Touch and pointer events
- ✅ Customizable element type
- ✅ Accessible by default
- ✅ TypeScript support
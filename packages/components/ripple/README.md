# @ideasui/ripple

A Material Design inspired ripple effect component for user interactions. Provides visual feedback with customizable animations.

## Installation

```bash
npm install @ideasui/ripple
```

## Usage

```tsx
import {Ripple} from "@ideasui/ripple";

function App() {
  return (
    <Ripple variant="solid" color="primary" onClick={() => console.log("Clicked!")}>
      Click me for ripple effect
    </Ripple>
  );
}
```

## Features

- ✅ Material Design ripple effect
- ✅ Customizable colors and variants
- ✅ Keyboard navigation support
- ✅ Accessibility compliant (WCAG 2.1)
- ✅ TypeScript support
- ✅ Customizable animation duration
- ✅ Center or click-position ripples
- ✅ Custom ripple colors

## API Reference

### RippleProps

| Prop        | Type                            | Default   | Description                                   |
| ----------- | ------------------------------- | --------- | --------------------------------------------- |
| variant     | 'solid' \| 'outline' \| 'ghost' | 'solid'   | Visual style variant                          |
| color       | ColorVariant                    | 'primary' | Color variant based on semantic intent        |
| size        | ButtonSize                      | 'md'      | Size of the component                         |
| radius      | Radius                          | 'md'      | Border radius variant                         |
| disabled    | boolean                         | false     | Whether the ripple is disabled                |
| duration    | number                          | 600       | Duration of ripple animation in milliseconds  |
| rippleColor | string                          | -         | Custom ripple color (overrides color variant) |
| center      | boolean                         | false     | Whether to center the ripple effect           |
| children    | ReactNode                       | -         | Content to render inside the ripple container |
| onClick     | function                        | -         | Click event handler                           |
| onMouseDown | function                        | -         | Mouse down event handler                      |

### useRipple Hook

```tsx
import {useRipple} from "@ideasui/ripple";

const {ripples, addRipple, clearRipples, containerRef} = useRipple({
  disabled: false,
  duration: 600,
  center: false,
});
```

## Examples

### Basic Usage

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

### Custom Ripple Effects

```tsx
// Custom ripple color
<Ripple rippleColor="#ff6b6b">Custom Color</Ripple>

// Center ripple (good for icons)
<Ripple center size="sm">
  <HeartIcon />
</Ripple>

// Slow ripple animation
<Ripple duration={1200}>Slow Ripple</Ripple>

// Fast ripple animation
<Ripple duration={300}>Fast Ripple</Ripple>
```

### With Event Handlers

```tsx
<Ripple onClick={() => alert("Clicked!")} onMouseDown={() => console.log("Mouse down")}>
  Interactive Ripple
</Ripple>
```

### Using the Hook

```tsx
import {useRipple} from "@ideasui/ripple";

function CustomRippleButton() {
  const {ripples, addRipple, containerRef} = useRipple();

  return (
    <button ref={containerRef} onMouseDown={addRipple} className="relative overflow-hidden">
      Custom Button
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="animate-ripple absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
}
```

## Accessibility

- Supports keyboard navigation (Tab, Enter, Space)
- Proper ARIA attributes
- Screen reader compatible
- Focus indicators
- Minimum touch target size (44px)

## Styling

The component uses Tailwind CSS and can be customized through:

- Variant props (solid, outline, ghost)
- Color props (primary, secondary, success, warning, danger)
- Size props (xs, sm, md, lg, xl)
- Radius props (none, sm, md, lg, xl, full)
- Custom className
- Custom ripple colors

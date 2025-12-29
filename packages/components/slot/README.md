# @ideasui/slot

Universal polymorphic container component with 'as' prop support.

## Installation

```bash
npm install @ideasui/slot
```

## Usage

```tsx
import { Slot } from "@ideasui/slot";

// Basic usage
<Slot>Content</Slot>

// As different elements
<Slot as="button" onClick={handleClick}>Button</Slot>
<Slot as="a" href="/link">Link</Slot>

// As custom components
<Slot as={Link} to="/route">Router Link</Slot>
<Slot as={motion.div} animate={{ x: 100 }}>Animated</Slot>
```

## API Reference

### SlotProps

| Prop      | Type                | Default | Description                    |
| --------- | ------------------- | ------- | ------------------------------ |
| as        | `React.ElementType` | `"div"` | Element or component to render |
| children  | `React.ReactNode`   | -       | Content to render              |
| className | `string`            | -       | Additional CSS classes         |

## Features

- ✅ Universal polymorphic container
- ✅ Full TypeScript support with proper inference
- ✅ Industry standard 'as' prop pattern
- ✅ Zero runtime overhead
- ✅ Works with any React element or component
- ✅ Proper ref forwarding
- ✅ React 19 compatible
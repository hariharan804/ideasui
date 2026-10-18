# @ideasui/divider

Divider component for IdeasUI.

## Installation

```bash
pnpm add @ideasui/divider
```

## Usage

```tsx
import { Divider } from '@ideasui/divider';

function App() {
  return (
    <Divider variant="solid" color="primary">
      Click me
    </Divider>
  );
}
```

## API Reference

### DividerProps

| Prop       | Type           | Default   | Description                       |
| ---------- | -------------- | --------- | --------------------------------- |
| variant    | `solid         | outline   | ghost`                            | `solid` | Visual style variant |
| color      | `ColorVariant` | `default` | Color variant for semantic intent |
| size       | `xs            | sm        | md                                | lg      | xl`                  | `md` | Component size |
| radius     | `Radius`       | `md`      | Border radius variant             |
| classNames | `object`       | -         | Custom slot classes               |

## Documentation

For more information, please visit our [documentation](https://ideasui.com/docs/components/divider).

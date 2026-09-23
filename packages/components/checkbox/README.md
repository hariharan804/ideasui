# @ideasui/checkbox

Checkbox component for IdeasUI.

## Installation

```bash
pnpm add @ideasui/checkbox
```

## Usage

```tsx
import { Checkbox } from '@ideasui/checkbox';

function App() {
  return (
    <Checkbox variant="solid" color="primary">
      Click me
    </Checkbox>
  );
}
```

## API Reference

### CheckboxProps

| Prop       | Type           | Default   | Description                       |
| ---------- | -------------- | --------- | --------------------------------- |
| variant    | `solid         | outline   | ghost`                            | `solid` | Visual style variant |
| color      | `ColorVariant` | `default` | Color variant for semantic intent |
| size       | `xs            | sm        | md                                | lg      | xl`                  | `md` | Component size |
| radius     | `Radius`       | `md`      | Border radius variant             |
| classNames | `object`       | -         | Custom slot classes               |

## Documentation

For more information, please visit our [documentation](https://ideasui.com/docs/components/checkbox).

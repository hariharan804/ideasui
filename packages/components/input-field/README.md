# @ideasui/input-field

InputField component for IdeasUI.

## Installation

```bash
pnpm add @ideasui/input-field
```

## Usage

```tsx
import { InputField } from '@ideasui/input-field';

function App() {
  return (
    <InputField variant="solid" color="primary">
      Click me
    </InputField>
  );
}
```

## API Reference

### InputFieldProps

| Prop       | Type           | Default   | Description                       |
| ---------- | -------------- | --------- | --------------------------------- |
| variant    | `solid         | outline   | ghost`                            | `solid` | Visual style variant |
| color      | `ColorVariant` | `default` | Color variant for semantic intent |
| size       | `xs            | sm        | md                                | lg      | xl`                  | `md` | Component size |
| radius     | `Radius`       | `md`      | Border radius variant             |
| classNames | `object`       | -         | Custom slot classes               |

## Documentation

For more information, please visit our [documentation](https://ideasui.com/docs/components/input-field).

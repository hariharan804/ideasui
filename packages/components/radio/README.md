# @ideasui/radio

Radio component for IdeasUI.

## Installation

```bash
pnpm add @ideasui/radio
```

## Usage

```tsx
import { Radio } from '@ideasui/radio';

function App() {
  return (
    <Radio variant="solid" color="primary">
      Click me
    </Radio>
  );
}
```

## API Reference

### RadioProps

| Prop       | Type           | Default   | Description                       |
| ---------- | -------------- | --------- | --------------------------------- |
| variant    | `solid         | outline   | ghost`                            | `solid` | Visual style variant |
| color      | `ColorVariant` | `default` | Color variant for semantic intent |
| size       | `xs            | sm        | md                                | lg      | xl`                  | `md` | Component size |
| radius     | `Radius`       | `md`      | Border radius variant             |
| classNames | `object`       | -         | Custom slot classes               |

## Documentation

For more information, please visit our [documentation](https://ideasui.com/docs/components/radio).

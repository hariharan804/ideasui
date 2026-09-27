# @ideasui/image

Image component for IdeasUI.

## Installation

```bash
pnpm add @ideasui/image
```

## Usage

```tsx
import { Image } from '@ideasui/image';

function App() {
  return (
    <Image variant="solid" color="primary">
      Click me
    </Image>
  );
}
```

## API Reference

### ImageProps

| Prop       | Type           | Default   | Description                       |
| ---------- | -------------- | --------- | --------------------------------- |
| variant    | `solid         | outline   | ghost`                            | `solid` | Visual style variant |
| color      | `ColorVariant` | `default` | Color variant for semantic intent |
| size       | `xs            | sm        | md                                | lg      | xl`                  | `md` | Component size |
| radius     | `Radius`       | `md`      | Border radius variant             |
| classNames | `object`       | -         | Custom slot classes               |

## Documentation

For more information, please visit our [documentation](https://ideasui.com/docs/components/image).

# @ideasui/switch

Switch component for IdeasUI.

## Installation

```bash
pnpm add @ideasui/switch
```

## Usage

```tsx
import { Switch } from '@ideasui/switch';

function App() {
  return (
    <Switch variant="solid" color="primary">
      Click me
    </Switch>
  );
}
```

## API Reference

### SwitchProps

| Prop       | Type           | Default   | Description                       |
| ---------- | -------------- | --------- | --------------------------------- |
| variant    | `solid         | outline   | ghost`                            | `solid` | Visual style variant |
| color      | `ColorVariant` | `default` | Color variant for semantic intent |
| size       | `xs            | sm        | md                                | lg      | xl`                  | `md` | Component size |
| radius     | `Radius`       | `md`      | Border radius variant             |
| classNames | `object`       | -         | Custom slot classes               |

## Documentation

For more information, please visit our [documentation](https://ideasui.com/docs/components/switch).

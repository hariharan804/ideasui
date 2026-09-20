# @ideasui/text

Text component for IdeasUI.

## Documentation

For interactive component playgrounds and API reference:

- 🌐 **[Official Documentation](https://ideasui.com/react/docs/components/text)**
- 🎨 **[Storybook Explorer](https://storybook.ideasui.com/?path=/docs/components-text)**

## Installation

```bash
pnpm add @ideasui/text
```

## Usage

```tsx
import { Text } from '@ideasui/text';

function App() {
  return (
    <Text variant="solid" color="primary">
      Click me
    </Text>
  );
}
```

## API Reference

### TextProps

| Prop       | Type           | Default   | Description                       |
| ---------- | -------------- | --------- | --------------------------------- |
| variant    | `solid         | outline   | ghost`                            | `solid` | Visual style variant |
| color      | `ColorVariant` | `default` | Color variant for semantic intent |
| size       | `xs            | sm        | md                                | lg      | xl`                  | `md` | Component size |
| radius     | `Radius`       | `md`      | Border radius variant             |
| classNames | `object`       | -         | Custom slot classes               |

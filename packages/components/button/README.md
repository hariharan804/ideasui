# @ideasui/button

A versatile button component with multiple variants, sizes, and states.

## Installation

```bash
npm install @ideasui/button
```

## Usage

```tsx
import { Button } from '@ideasui/button';

function App() {
  return (
    <Button variant="solid" color="primary" size="md">
      Click me
    </Button>
  );
}
```

## API Reference

### ButtonProps

| Prop         | Type                                                                                  | Default   | Description                            |
| ------------ | ------------------------------------------------------------------------------------- | --------- | -------------------------------------- |
| variant      | 'solid' \| 'outline' \| 'ghost'                                                       | 'solid'   | Visual style variant                   |
| color        | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'default' | Color variant based on semantic intent |
| size         | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'                                                  | 'md'      | Size of the button                     |
| radius       | 'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'                                      | 'md'      | Border radius variant                  |
| fullWidth    | boolean                                                                               | false     | Whether button should take full width  |
| loading      | boolean                                                                               | false     | Whether button is in loading state     |
| loadingText  | string                                                                                | -         | Text to show when loading              |
| startContent | ReactNode                                                                             | -         | Content to show at start of button     |
| endContent   | ReactNode                                                                             | -         | Content to show at end of button       |
| disabled     | boolean                                                                               | false     | Whether button is disabled             |

## Examples

### Basic Usage

```tsx
<Button>Default Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

### Colors

```tsx
<Button color="primary">Primary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>
```

### Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### With Icons

```tsx
import { Heart, Download } from 'lucide-react'

<Button startContent={<Heart />}>Like</Button>
<Button endContent={<Download />}>Download</Button>
```

### Loading State

```tsx
<Button loading>Loading</Button>
<Button loading loadingText="Saving...">Save</Button>
```

### States

```tsx
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

## Accessibility

The Button component follows WAI-ARIA guidelines:

- Uses semantic `button` element
- Supports keyboard navigation (Enter/Space)
- Proper `disabled` and `aria-disabled` attributes
- Loading state is communicated to screen readers
- Focus management with visible focus indicators

## Styling

The component uses Tailwind CSS classes and can be customized via:

- CSS custom properties
- Tailwind configuration
- Custom className prop
- Component variants system

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { ButtonProps } from '@ideasui/button';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

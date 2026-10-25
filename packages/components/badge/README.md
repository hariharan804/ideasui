# @ideasui/badge

Accessible, theme-aware compact indicator for IdeasUI applications. Supports standalone counts/labels and anchored overlays.

## Installation

```bash
pnpm add @ideasui/badge
```

## Usage

### Standalone Badge

```tsx
import { Badge } from '@ideasui/badge';

export function App() {
  return (
    <div className="flex gap-2">
      <Badge color="danger">5</Badge>
      <Badge variant="soft" color="success">
        Active
      </Badge>
      <Badge color="primary" max={99}>
        120
      </Badge>
      <Badge isDot color="success" />
    </div>
  );
}
```

### Anchored Badge

```tsx
import { Badge, BadgeAnchor } from '@ideasui/badge';

export function NotificationAvatar() {
  return (
    <BadgeAnchor badge={<Badge color="danger">3</Badge>} placement="top-right">
      <div className="bg-surface-muted size-10 rounded-full" />
    </BadgeAnchor>
  );
}
```

## API Reference

### BadgeProps

| Prop          | Type                                                           | Default     | Description                                    |
| ------------- | -------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `variant`     | `'solid' \| 'soft' \| 'outline' \| 'ghost'`                    | `'solid'`   | Visual style variant                           |
| `color`       | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Semantic color scheme                          |
| `size`        | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Badge size scale                               |
| `isDot`       | `boolean`                                                      | `false`     | Renders as small dot without text              |
| `max`         | `number`                                                       | -           | Max numeric count threshold (renders `{max}+`) |
| `isInvisible` | `boolean`                                                      | `false`     | Visually hidden without unmounting             |

### BadgeAnchorProps

| Prop        | Type                                                           | Default       | Description                     |
| ----------- | -------------------------------------------------------------- | ------------- | ------------------------------- |
| `badge`     | `ReactNode`                                                    | -             | The `Badge` element to position |
| `placement` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Relative placement              |
| `offset`    | `{ x?: number; y?: number }`                                   | -             | Custom pixel offset             |
| `children`  | `ReactNode`                                                    | -             | The element being badged        |

## Documentation

For full documentation and live demos, please visit [IdeasUI Documentation](https://ideasui.com/docs/components/badge).

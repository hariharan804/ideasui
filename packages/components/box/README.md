# Box Component

Flexible container component with comprehensive styling props for building layouts.

## Installation

```bash
npm install @ideasui/box
```

## Usage

```tsx
import {Box} from "@ideasui/box";

function App() {
  return (
    <Box p={4} bg="gray" rounded="md">
      Box Content
    </Box>
  );
}
```

## Props

| Prop        | Type             | Default | Description                    |
| ----------- | ---------------- | ------- | ------------------------------ |
| as          | ElementType      | 'div'   | Element or component to render |
| display     | string           | 'block' | Display type                   |
| p           | number           | -       | Padding on all sides           |
| px          | number           | -       | Horizontal padding             |
| py          | number           | -       | Vertical padding               |
| m           | number \| 'auto' | -       | Margin on all sides            |
| mx          | number \| 'auto' | -       | Horizontal margin              |
| my          | number \| 'auto' | -       | Vertical margin                |
| bg          | string           | -       | Background color               |
| border      | number           | -       | Border width                   |
| borderColor | string           | -       | Border color                   |
| rounded     | string           | -       | Border radius                  |
| shadow      | string           | -       | Box shadow                     |
| position    | string           | -       | Position type                  |
| overflow    | string           | -       | Overflow behavior              |

## Examples

### Basic Usage

```tsx
<Box p={4} bg="white" rounded="md">
  Basic box with padding, background, and rounded corners
</Box>
```

### As Different Elements

```tsx
<Box as="section" p={6} bg="gray">
  Rendered as a section element
</Box>

<Box as="article" p={4} border={1} borderColor="primary">
  Rendered as an article element
</Box>
```

### Layout Container

```tsx
<Box display="flex" p={4} bg="gray" rounded="lg">
  <Box p={2} bg="primary" rounded="sm" mx={1}>
    Item 1
  </Box>
  <Box p={2} bg="secondary" rounded="sm" mx={1}>
    Item 2
  </Box>
  <Box p={2} bg="success" rounded="sm" mx={1}>
    Item 3
  </Box>
</Box>
```

### Card-like Component

```tsx
<Box p={6} bg="white" border={1} borderColor="gray" rounded="lg" shadow="md">
  <h3>Card Title</h3>
  <p>Card content with shadow and border</p>
</Box>
```

### Responsive Design

```tsx
<Box p={[2, 4, 6]} mx="auto" bg="white" rounded="md" className="max-w-md">
  Responsive padding and centered layout
</Box>
```

## Spacing Scale

The spacing scale follows Tailwind CSS conventions:

- 0 = 0px
- 1 = 0.25rem (4px)
- 2 = 0.5rem (8px)
- 3 = 0.75rem (12px)
- 4 = 1rem (16px)
- 5 = 1.25rem (20px)
- 6 = 1.5rem (24px)
- 8 = 2rem (32px)
- 10 = 2.5rem (40px)
- 12 = 3rem (48px)

## Color Variants

- `transparent` - Transparent background
- `white` - White background
- `black` - Black background
- `gray` - Light gray background
- `primary` - Primary theme color
- `secondary` - Secondary theme color
- `success` - Success color (green)
- `warning` - Warning color (yellow)
- `danger` - Danger color (red)

# @ideasui/icons

Dynamic SVG icon system with automatic React component generation.

## Features

- 🎨 **Dynamic Generation**: Automatically converts SVG files to React components
- ⚡ **Performance**: Lazy loading with caching and tree-shaking support
- 🎯 **Type Safe**: Full TypeScript support with auto-generated types
- ♿ **Accessible**: Built-in accessibility features and ARIA support
- 🎨 **Customizable**: Consistent styling with IconSet provider
- 📦 **Optimized**: SVGO optimization for smaller bundle sizes

## Installation

```bash
npm install @ideasui/icons
# or
pnpm add @ideasui/icons
```

## Usage

### Static Icons

```tsx
import { ArrowRight, Home, User } from '@ideasui/icons';

function App() {
  return (
    <div>
      <ArrowRight size={24} color="blue" />
      <Home size={20} className="text-gray-500" />
      <User size={16} aria-label="User profile" />
    </div>
  );
}
```

### Dynamic Icons

```tsx
import { DynamicIcon } from '@ideasui/icons';

function App() {
  return <DynamicIcon name="arrow-right" size={24} color="blue" fallback={MyFallbackIcon} />;
}
```

### Icon Set Provider

```tsx
import { IconSet, ArrowRight, Home, User } from '@ideasui/icons';

function App() {
  return (
    <IconSet size={20} color="gray" className="icon-base">
      <ArrowRight />
      <Home />
      <User />
    </IconSet>
  );
}
```

## Adding New Icons

1. Add SVG files to the `assets/` directory
2. Run the generator: `pnpm generate`
3. Import and use the generated components

### SVG Requirements

- Use `viewBox` instead of fixed dimensions
- Use `currentColor` for fills/strokes that should be customizable
- Optimize paths and remove unnecessary elements
- Follow consistent naming (kebab-case)

## API Reference

### IconProps

| Prop          | Type               | Default          | Description              |
| ------------- | ------------------ | ---------------- | ------------------------ |
| `size`        | `number \| string` | `24`             | Icon size in pixels      |
| `color`       | `string`           | `'currentColor'` | Icon color (CSS value)   |
| `className`   | `string`           | -                | Additional CSS classes   |
| `aria-label`  | `string`           | -                | Accessibility label      |
| `aria-hidden` | `boolean`          | -                | Hide from screen readers |

### DynamicIcon

Loads icons dynamically with lazy loading and caching.

```tsx
<DynamicIcon name="icon-name" size={24} fallback={FallbackComponent} />
```

### IconSet

Provides consistent styling for multiple icons.

```tsx
<IconSet size={20} color="blue">
  {/* All child icons inherit these props */}
</IconSet>
```

## Development

### Generate Components

```bash
# Generate React components from SVG files
pnpm generate

# Build the package
pnpm build

# Run tests
pnpm test
```

### File Structure

```
packages/icons/
├── assets/           # SVG source files
├── src/             # Generated React components
├── scripts/         # Build scripts
└── stories/         # Storybook stories
```

## Best Practices

1. **Consistent Sizing**: Use the `size` prop instead of CSS width/height
2. **Semantic Colors**: Use `currentColor` for icons that should inherit text color
3. **Accessibility**: Always provide `aria-label` for interactive icons
4. **Performance**: Use `DynamicIcon` for icons loaded conditionally
5. **Styling**: Use `IconSet` for consistent styling across multiple icons

## Contributing

1. Add SVG files to `assets/` directory
2. Run `pnpm generate` to create components
3. Test the generated components
4. Submit a pull request

## License

MIT

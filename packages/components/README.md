# @ideasui/components

UI components with complete styling and behavior using tailwind-variants and OKLCH color system.

## 📦 Available Components

- **Button** (`@ideasui/button`) - Interactive button with variants, loading states, and ripple effects
- **Box** (`@ideasui/box`) - Flexible container component with layout utilities
- **Ripple** (`@ideasui/ripple`) - Material Design ripple effect component

## 📁 Component Structure

Each component follows this structure:

```
component-name/
├── src/
│   ├── component-name.tsx    # Main component
│   ├── use-component-name.ts # Custom hook
│   ├── index.ts             # Exports
│   └── __tests__/           # Unit tests
├── stories/                 # Storybook stories
├── package.json
├── README.md
└── tsconfig.json
```

## 🚀 Creating New Components

### Using Templates (Recommended)

```bash
# Generate new component using plop
pnpm run create
# Select: component
# Enter name: my-component (kebab-case)
```

### Manual Creation

1. **Create component folder**:

   ```bash
   mkdir packages/components/my-component
   cd packages/components/my-component
   ```

2. **Use component template**:

   ```bash
   # Copy from templates/component/
   cp -r ../../../templates/component/* .
   ```

3. **Update template placeholders**:
   - Replace `{{name}}` with component name
   - Replace `{{pascalCase name}}` with PascalCase name
   - Replace `{{camelCase name}}` with camelCase name

## 🏗️ Development Workflow

### Development Mode

```bash
# Start all development processes
pnpm run dev

# Start Storybook for component development
pnpm run storybook

# Start playground for testing
pnpm --filter playground dev
```

### Testing Components

```bash
# Run tests for specific component
pnpm --filter @ideasui/button test

# Run all component tests
pnpm --filter "@ideasui/*" test

# Run tests in watch mode
pnpm --filter @ideasui/button test:watch

# Run with coverage
pnpm --filter @ideasui/button test:coverage
```

### Building Components

```bash
# Build specific component
pnpm --filter @ideasui/button build

# Build all components
pnpm --filter "@ideasui/*" build

# Build everything
pnpm run build
```

## 📦 Component Architecture

### Using Theme Recipes

```tsx
import { button } from '@ideasui/theme/recipes';
import type { VariantProps } from 'tailwind-variants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { base } = button(props);

    return (
      <button ref={ref} className={cn(base(), className)} {...props}>
        {children}
      </button>
    );
  },
);
```

### Custom Hooks Pattern

```tsx
// use-button.ts
export function useButton(props: UseButtonProps) {
  const { disabled, loading, onClick } = props;
  const domRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
    [disabled, loading, onClick],
  );

  return {
    domRef,
    getButtonProps: () => ({
      ref: domRef,
      disabled: disabled || loading,
      onClick: handleClick,
      'aria-disabled': disabled || loading,
    }),
  };
}
```

## 📚 Publishing Components

### Version Management

```bash
# Create changeset for new features/fixes
npx changeset

# Version packages
npx changeset version

# Publish to npm
npx changeset publish
```

### Pre-publish Checklist

- [ ] Tests pass: `pnpm test`
- [ ] No linting errors: `pnpm lint`
- [ ] TypeScript compiles: `pnpm typecheck`
- [ ] Build succeeds: `pnpm build`
- [ ] Storybook stories updated
- [ ] README documentation complete

## 🔧 Best Practices

### Component Guidelines

1. **Use forwardRef** for all components
2. **Include displayName** for debugging
3. **Support className prop** for customization
4. **Use theme recipes** for consistent styling
5. **Include comprehensive tests** with accessibility checks
6. **Add Storybook stories** for all variants
7. **Document props** with JSDoc comments

### File Structure

```tsx
// component.tsx
export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    const { base } = componentRecipe(props);

    return <element ref={ref} className={cn(base(), className)} {...props} />;
  },
);

Component.displayName = 'Component';
```

## 📄 License

MIT License - see [LICENSE](../../../LICENSE) file for details.

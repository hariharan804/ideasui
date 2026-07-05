---
description: How to create a new component. Refer to [naming conventions](../../rules/naming-conventions.md) and [component development](../../rules/component-development.md).
---

# Creating a New Component

## Step 1: Generate Component Scaffold

Use the Plop generator to create a new component:

```bash
pnpm run create
```

Select "Component" from the menu and provide:

- Component name (PascalCase, e.g., `TextField`, `Modal`)
- Component description
- Package category (usually `components`)

## Step 2: Implement the Component

Edit the generated files in `packages/components/[component-name]/src/`:

1. **[component-name].tsx** - Main component implementation
   - Use `React.forwardRef` for ref forwarding
   - Set `displayName` for debugging
   - Support polymorphic `as` prop if needed
   - Merge className props with `cn()` utility

2. **use-[component-name].ts** - Component logic hook (if needed)
   - Extract complex logic from component
   - Handle state management
   - Return props and handlers

3. **[component-name].types.ts** - TypeScript interfaces
   - Extend appropriate HTML element props
   - Add JSDoc comments for all props
   - Export all interfaces

## Step 3: Add Styling

Create or update the recipe in `packages/core/theme/src/recipes/`:

```typescript
import { tv } from 'tailwind-variants';

export const componentName = tv({
  slots: {
    base: 'base-classes',
    // Add more slots as needed
  },
  variants: {
    variant: {
      solid: { base: 'solid-classes' },
      outline: { base: 'outline-classes' },
    },
    size: {
      sm: { base: 'size-sm' },
      md: { base: 'size-md' },
      lg: { base: 'size-lg' },
    },
    color: {
      primary: { base: 'color-primary' },
      // Add all 8 semantic colors
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
  },
});
```

## Step 4: Write Tests

Create tests in `__tests__/[component-name].test.tsx`:

```typescript
import { render } from '@testing-library/react';
import { ComponentName } from '../src';

describe('ComponentName', () => {
  it('should render correctly', () => {
    const { container } = render(<ComponentName>Content</ComponentName>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ComponentName ref={ref}>Content</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ComponentName>Content</ComponentName>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

// turbo

## Step 5: Run Tests

```bash
pnpm test packages/components/[component-name]
```

## Step 6: Create Storybook Stories

Create `stories/[component-name].stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Component content',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ComponentName variant="solid">Solid</ComponentName>
      <ComponentName variant="outline">Outline</ComponentName>
    </div>
  ),
};
```

// turbo

## Step 7: Preview in Storybook

```bash
pnpm run storybook
```

// turbo

## Step 8: Build the Component

```bash
pnpm run build --filter=@ideasui/[component-name]
```

## Step 9: Document the Component

Update the component's README.md with:

- Installation instructions
- Usage examples
- API reference
- Accessibility notes

## Step 10: Create Pull Request

1. Commit your changes following conventional commits:

   ```bash
   pnpm run commit
   ```

2. Push to your branch and create a PR

3. Ensure CI passes:
   - Linting
   - Type checking
   - Unit tests
   - Visual regression tests

## Checklist

- [ ] Component follows naming conventions
- [ ] Implements forwardRef and displayName
- [ ] Has proper TypeScript types with JSDoc
- [ ] Uses theme recipes for styling
- [ ] Supports all required variants (variant, size, color, radius)
- [ ] Has comprehensive unit tests (>80% coverage)
- [ ] Passes accessibility tests (vitest-axe)
- [ ] Has Storybook stories
- [ ] Documentation is complete
- [ ] CI/CD passes

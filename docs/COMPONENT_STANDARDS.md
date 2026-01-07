# Component Development Standards

A comprehensive guide for creating high-quality, consistent components in IdeasUI.

## 🚀 Quick Start Checklist

### Before You Start
- [ ] Read the component requirements
- [ ] Check existing similar components
- [ ] Plan component API and variants
- [ ] Set up development environment

### Component Creation Steps
1. [ ] Generate component using `pnpm run create`
2. [ ] Implement core functionality
3. [ ] Add TypeScript interfaces
4. [ ] Create variants with tailwind-variants
5. [ ] Write unit tests
6. [ ] Create Storybook stories
7. [ ] Add visual regression tests
8. [ ] Document component API

## 📋 Component Standards Checklist

### ✅ Required Standards

#### **React Patterns**
- [ ] Use `React.forwardRef` for all components
- [ ] Set `displayName` for debugging
- [ ] Export TypeScript interfaces
- [ ] Support `className` prop merging
- [ ] Handle `children` prop appropriately

```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
```

#### **TypeScript Requirements**
- [ ] Define props interface with JSDoc
- [ ] Extend appropriate HTML element props
- [ ] Export all types and interfaces
- [ ] Use strict typing (no `any`)

```tsx
/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "solid" | "outline" | "ghost" | "link"
  /** Color variant based on semantic intent */
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral" | "gray"
  /** Size of the button */
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  /** Disable ripple effect */
  disableRipple?: boolean
}
```

#### **Styling Standards**
- [ ] Use `tailwind-variants` for variant management
- [ ] Import recipes from `@ideasui/theme/recipes`
- [ ] Support all color variants (primary, secondary, success, warning, danger, info, neutral, gray)
- [ ] Include size variants (xs, sm, md, lg, xl)
- [ ] Add radius variants (none, sm, md, lg, xl, full)

```tsx
import { button } from "@ideasui/theme/recipes"
import { cn } from "@ideasui/utils"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { base } = button({ variant, size })
    return (
      <button
        ref={ref}
        className={cn(base(), className)}
        {...props}
      />
    )
  }
)
```

#### **Accessibility Requirements**
- [ ] Use semantic HTML elements
- [ ] Add proper ARIA attributes
- [ ] Support keyboard navigation
- [ ] Include focus indicators
- [ ] Test with screen readers

```tsx
<button
  ref={ref}
  className={cn(buttonVariants({ variant, size }), className)}
  aria-disabled={disabled}
  tabIndex={disabled ? -1 : 0}
  {...props}
>
  {children}
</button>
```

### 🧪 Testing Requirements

#### **Unit Tests**
- [ ] Test component rendering
- [ ] Test all props and variants
- [ ] Test event handlers
- [ ] Test ref forwarding
- [ ] Test accessibility

```tsx
describe("Button", () => {
  it("should render correctly", () => {
    const wrapper = render(<Button>Click me</Button>)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it("should handle click events", async () => {
    const onClick = jest.fn()
    const { getByRole } = render(<Button onClick={onClick}>Click me</Button>)
    
    await user.click(getByRole("button"))
    expect(onClick).toHaveBeenCalled()
  })
})
```

#### **Visual Tests**
- [ ] Create visual regression tests
- [ ] Test all component variants
- [ ] Test responsive behavior
- [ ] Test dark mode support

```tsx
test('Button visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default')
  await expect(page.locator('[data-testid="button"]')).toHaveScreenshot('button-default.png')
})
```

### 📚 Documentation Requirements

#### **Storybook Stories**
- [ ] Create default story
- [ ] Create variant showcase
- [ ] Add interactive controls
- [ ] Include usage examples

```tsx
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}
```

#### **README Documentation**
- [ ] Add installation instructions
- [ ] Include usage examples
- [ ] Document all props
- [ ] Add accessibility notes

## 🏗️ File Structure Standards

### Required Files
```
packages/components/button/
├── src/
│   ├── button.tsx           # Main component
│   ├── button-types.ts      # TypeScript interfaces
│   ├── index.ts             # Exports
│   ├── __tests__/
│   │   ├── button.test.tsx  # Unit tests
│   │   └── button.spec.ts   # Visual tests
│   └── stories/
│       └── button.stories.tsx # Storybook stories
├── package.json
├── README.md
├── tsconfig.json
└── tsup.config.ts
```

### Package.json Requirements
```json
{
  "name": "@ideasui/button",
  "version": "0.0.0",
  "description": "Button component for IdeasUI",
  "main": "./src/index.ts",
  "sideEffects": false,
  "scripts": {
    "build": "tsup src --dts",
    "dev": "pnpm build:dev --watch",
    "clean": "rimraf dist .turbo",
    "typecheck": "tsc --noEmit",
    "build:dev": "tsup src",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx --cache",
    "lint:fix": "eslint src --ext .ts,.tsx --fix --cache"
  }
}
```

## 🎨 Design System Integration

### Color Variants
All components must support these color variants:
- `primary` - Brand primary color (default)
- `secondary` - Secondary accent color
- `success` - Success/positive actions
- `warning` - Warning/caution actions
- `danger` - Destructive/error actions
- `info` - Informational actions
- `neutral` - Neutral actions
- `gray` - Gray color variant

### Size System
Standard size variants across all components:
- `xs` - Extra small (32px height)
- `sm` - Small (36px height)
- `md` - Medium (40px height) - Default
- `lg` - Large (44px height)
- `xl` - Extra large (48px height)

### Radius System
Consistent border radius options:
- `none` - No border radius
- `sm` - Small radius (2px)
- `md` - Medium radius (6px) - Default
- `lg` - Large radius (8px)
- `xl` - Extra large radius (12px)
- `full` - Fully rounded

## 🔧 Advanced Patterns

### Polymorphic Components (Optional)
For components that can render as different elements:

```tsx
interface PolymorphicButtonProps<C extends React.ElementType> {
  as?: C
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<C>

export const Button = <C extends React.ElementType = "button">({
  as,
  children,
  ...props
}: PolymorphicButtonProps<C>) => {
  const Component = as || "button"
  return <Component {...props}>{children}</Component>
}
```

### Compound Components (Optional)
For complex components with sub-components:

```tsx
const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
})

// Usage
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>
```

## 🚨 Common Mistakes to Avoid

### ❌ Don't Do This
```tsx
// Missing forwardRef
export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

// Missing TypeScript
export const Button = (props: any) => {
  return <button {...props} />
}

// Hardcoded styles
export const Button = ({ children }) => {
  return <button className="bg-blue-500 text-white px-4 py-2">{children}</button>
}

// Missing displayName
export const Button = React.forwardRef(...)
// Button.displayName is missing
```

### ✅ Do This Instead
```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
```

## 📊 Quality Gates

### Before Submitting PR
- [ ] All tests pass (`pnpm run test`)
- [ ] Visual tests pass (`pnpm run test:visual`)
- [ ] No linting errors (`pnpm run lint`)
- [ ] TypeScript compiles (`pnpm run typecheck`)
- [ ] Storybook stories work (`pnpm run storybook`)
- [ ] Component builds successfully (`pnpm run build`)

### Code Review Checklist
- [ ] Follows naming conventions
- [ ] Has proper TypeScript types
- [ ] Includes comprehensive tests
- [ ] Has Storybook documentation
- [ ] Meets accessibility standards
- [ ] Follows design system tokens
- [ ] Has proper error handling
- [ ] Includes JSDoc comments

## 🎯 Component Maturity Levels

### Level 1: Basic Component
- ✅ Renders correctly
- ✅ Has basic props
- ✅ Basic styling

### Level 2: Production Ready
- ✅ Full TypeScript support
- ✅ Comprehensive testing
- ✅ Accessibility compliant
- ✅ Storybook documentation

### Level 3: Advanced Component
- ✅ Polymorphic support
- ✅ Compound patterns
- ✅ Advanced accessibility
- ✅ Performance optimized

## 📚 Resources

- [React forwardRef Documentation](https://react.dev/reference/react/forwardRef)
- [Tailwind Variants Documentation](https://www.tailwind-variants.org/)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Storybook Documentation](https://storybook.js.org/docs)

Use this guide as your reference when creating new components. Each standard helps ensure consistency, quality, and maintainability across the entire component library.
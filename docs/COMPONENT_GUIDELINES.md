# Component Guidelines

## 🎯 Component Development Standards

### ShadCN Base Components

#### Adding New Components

```bash
# Navigate to ui package
cd packages/ui

# Add ShadCN component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
```

#### Component Structure

```typescript
// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## 📋 Component Checklist

### ✅ Required Elements

- [ ] TypeScript interface with proper props
- [ ] forwardRef implementation
- [ ] Proper className merging with cn()
- [ ] Variant system using CVA
- [ ] Display name for debugging
- [ ] JSDoc comments for props
- [ ] Export component and variants

### 🎨 Styling Standards

- [ ] Use Tailwind CSS classes
- [ ] Implement design tokens
- [ ] Support dark mode
- [ ] Responsive design
- [ ] Consistent spacing scale
- [ ] Proper focus states
- [ ] Hover/active states

### ♿ Accessibility Requirements

- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Focus management
- [ ] Color contrast compliance
- [ ] Semantic HTML elements

## 🔧 Custom Component Template

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const myComponentVariants = cva(
  // Base styles
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        sm: "small-styles",
        md: "medium-styles",
        lg: "large-styles",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  /**
   * Custom prop description
   */
  customProp?: string
}

/**
 * MyComponent description
 * 
 * @example
 * <MyComponent variant="secondary" size="lg">
 *   Content here
 * </MyComponent>
 */
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, customProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants }
```

## 📦 Export Configuration

### Component Index

```typescript
// src/components/ui/index.ts
export { Button, buttonVariants } from "./button"
export { Input } from "./input"
export { Card, CardHeader, CardContent, CardFooter } from "./card"
```

### Main Export

```typescript
// src/index.ts
export * from "./components/ui"
export * from "./lib/utils"
export * from "./hooks"
```

## 🧪 Testing Guidelines

### Component Tests

```typescript
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../src/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

## 📝 Documentation Standards

### Component Documentation

```typescript
/**
 * Button component for user interactions
 * 
 * @param variant - Visual style variant
 * @param size - Size of the button
 * @param asChild - Render as child component
 * @param children - Button content
 * 
 * @example
 * ```tsx
 * <Button variant="outline" size="lg">
 *   Large Outline Button
 * </Button>
 * ```
 */
```

### Story Documentation

```typescript
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
  },
}
```
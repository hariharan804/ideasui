# Components Package

UI components with complete styling and behavior using Tailwind CSS and React Aria.

## 📋 Component Structure

Each component follows this structure:
```
component-name/
├── src/
│   ├── component-name.tsx    # Main component
│   ├── types.ts             # TypeScript interfaces
│   ├── variants.ts          # Tailwind variants
│   ├── index.ts             # Exports
│   ├── __tests__/           # Unit tests
│   └── stories/             # Storybook stories
├── package.json
├── README.md
└── tsconfig.json
```

## 🎯 Component Guidelines

### 1. Component Template
```tsx
'use client'
import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@your-org/utils'

const componentVariants = tv({
  base: 'base-classes',
  variants: {
    variant: {
      primary: 'primary-classes',
      secondary: 'secondary-classes'
    },
    size: {
      sm: 'small-classes',
      md: 'medium-classes',
      lg: 'large-classes'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})

interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  children: React.ReactNode
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </element>
    )
  }
)

Component.displayName = 'Component'
```

### 2. TypeScript Interfaces
```tsx
// types.ts
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  /**
   * Component content
   */
  children: React.ReactNode
  
  /**
   * Visual variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary'
  
  /**
   * Component size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Disabled state
   */
  disabled?: boolean
}
```

### 3. Variants Configuration
```tsx
// variants.ts
import { tv } from 'tailwind-variants'

export const componentVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ],
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})
```

## 🧪 Testing

### Unit Test Template
```tsx
// __tests__/component.test.tsx
import { render, screen } from '@testing-library/react'
import { Component } from '../component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test</Component>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Component variant="secondary">Test</Component>)
    const element = screen.getByText('Test')
    expect(element).toHaveClass('bg-secondary')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Component ref={ref}>Test</Component>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
```

## 📖 Storybook Stories

### Story Template
```tsx
// stories/component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Component } from '../component'

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Component'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Component'
  }
}
```

## 🎨 Styling Guidelines

### 1. Use Tailwind Variants
- Leverage `tailwind-variants` for consistent styling
- Define base classes and variants
- Use compound variants for complex combinations

### 2. Accessibility First
- Include proper ARIA attributes
- Support keyboard navigation
- Ensure color contrast compliance
- Use semantic HTML elements

### 3. React Aria Integration
```tsx
import { useButton, useFocusRing } from 'react-aria'

export const Button = (props) => {
  const ref = useRef()
  const { buttonProps } = useButton(props, ref)
  const { focusProps, isFocusVisible } = useFocusRing()
  
  return (
    <button
      {...buttonProps}
      {...focusProps}
      className={cn(
        buttonVariants(),
        isFocusVisible && 'ring-2 ring-ring'
      )}
    >
      {props.children}
    </button>
  )
}
```

## 📦 Package.json Template

```json
{
  "name": "@your-org/component-name",
  "version": "0.0.0",
  "description": "Component description",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@your-org/utils": "workspace:*",
    "tailwind-variants": "^0.1.20",
    "react-aria": "^3.32.1"
  }
}
```

## 🚀 Creating New Components

1. **Use CLI** (recommended):
   ```bash
   npm run create component MyComponent
   ```

2. **Manual creation**:
   - Copy existing component folder
   - Rename files and update imports
   - Update package.json name and description
   - Write component logic and styles
   - Add tests and stories

## 📋 Component Checklist

- [ ] TypeScript interfaces with JSDoc
- [ ] Tailwind variants configuration
- [ ] React.forwardRef implementation
- [ ] Accessibility attributes
- [ ] Unit tests (>80% coverage)
- [ ] Storybook stories
- [ ] README documentation
- [ ] Proper exports in index.ts
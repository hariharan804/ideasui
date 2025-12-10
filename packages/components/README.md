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

## 🚀 Creating New Components

### Method 1: Using Plop Generator (Recommended)

1. **Generate component with all files**:
   ```bash
   npm run generate
   # Select: component
   # Enter name: my-button (kebab-case)
   ```

2. **What gets created automatically**:
   - `packages/components/my-button/` - Component package
   - `packages/primitives/my-button-primitive/` - Primitive package
   - `packages/core/variants/src/my-button.ts` - Variant definitions
   - `apps/playground/components/my-button.tsx` - Playground page
   - Navigation entry in playground

### Method 2: Create Individual Parts

1. **Component only**:
   ```bash
   npm run generate
   # Select: component-only
   ```

2. **Primitive only**:
   ```bash
   npm run generate
   # Select: primitive-only
   ```

3. **Variant only**:
   ```bash
   npm run generate
   # Select: variant-only
   ```

### Method 3: Manual Creation

1. **Create component folder**:
   ```bash
   mkdir packages/components/my-button
   cd packages/components/my-button
   ```

2. **Create package structure**:
   ```bash
   mkdir src src/__tests__
   touch package.json README.md tsconfig.json
   touch src/my-button.tsx src/my-button-types.ts src/index.ts
   touch src/__tests__/my-button.test.tsx
   ```

3. **Copy and modify existing component files**

## 🏃♂️ Running and Testing Components

### Development Workflow

1. **Development Mode (Direct Source)**:
   ```bash
   # Components use src/index.ts directly in dev mode
   # No build step needed - changes reflect immediately
   
   # Start playground with hot reload
   npm run dev:playground
   
   # Or start all dev processes
   npm run dev
   ```

2. **Turbo Commands (Root Level)**:
   ```bash
   # Run specific component dev mode
   npm run dev -- --filter=@ideasui/button
   
   # Run all components dev mode
   npm run dev -- --filter=@ideasui/*
   
   # Run playground only
   npm run dev -- --filter=playground
   
   # Run multiple packages
   npm run dev -- --filter=@ideasui/button --filter=@ideasui/input
   ```

3. **View your component**:
   - Navigate to playground at `http://localhost:3000/playground`
   - Find your component in the list
   - Click to view interactive examples
   - Changes reflect immediately (no build needed)

### Testing Components

1. **Run unit tests**:
   ```bash
   # Single component (Turbo)
   npm run test -- --filter=@ideasui/button
   
   # All components
   npm run test -- --filter=@ideasui/*
   
   # Specific pattern
   npm run test -- --filter=*button*
   ```

2. **Run with coverage**:
   ```bash
   npm run test:coverage -- --filter=@ideasui/button
   ```

3. **Watch mode**:
   ```bash
   npm run test:watch -- --filter=@ideasui/button
   ```

### Building Components (For Publishing)

1. **Build single component**:
   ```bash
   # Using Turbo filter
   npm run build -- --filter=@ideasui/button
   ```

2. **Build all packages**:
   ```bash
   # Build all components
   npm run build -- --filter=@ideasui/*
   
   # Build everything
   npm run build
   ```

3. **Pre-publish build**:
   ```bash
   # Automatically changes package.json main field to dist/index.js
   npm run build:publish -- --filter=@ideasui/button
   
   # Check build output
   ls packages/components/my-button/dist/
   # Should see: index.js, index.mjs, index.d.ts
   ```

### Storybook Development

1. **Start Storybook**:
   ```bash
   npm run storybook
   ```

2. **Add component stories**:
   ```bash
   # Stories are auto-generated with plop
   # Or create manually in src/stories/
   ```

## 📦 Pre-Publish Component Workflow

### Step 1: Prepare Component for Publishing

1. **Run pre-publish checks**:
   ```bash
   # Test the component
   npm run test -- --filter=@ideasui/button
   
   # Lint the code
   npm run lint -- --filter=@ideasui/button
   
   # Type check
   npm run type-check -- --filter=@ideasui/button
   ```

2. **Build for production**:
   ```bash
   # Build with automatic package.json update
   npm run build:publish -- --filter=@ideasui/button
   
   # Or build all components
   npm run build:publish -- --filter=@ideasui/*
   ```

3. **Verify build output**:
   ```bash
   # Check dist folder
   ls packages/components/button/dist/
   # Should see: index.js, index.mjs, index.d.ts
   
   # Verify package.json was updated
   cat packages/components/button/package.json | grep '"main"'
   # Should show: "main": "./dist/index.js"
   ```

### Step 2: Test Built Package

1. **Pack and test locally**:
   ```bash
   cd packages/components/button
   npm pack
   # Creates: ideasui-button-0.1.0.tgz
   
   # Test in another project
   cd /path/to/test-project
   npm install /path/to/ideasui-button-0.1.0.tgz
   ```

2. **Test import/export**:
   ```tsx
   // In test project
   import { Button } from '@ideasui/button'
   
   function App() {
     return <Button>Test</Button>
   }
   ```

### Step 3: Version and Publish

1. **Create changeset**:
   ```bash
   npx changeset
   # Select: @ideasui/button
   # Choose: patch/minor/major
   # Write: "Add new button component"
   ```

2. **Version packages**:
   ```bash
   npx changeset version
   # Updates package.json versions
   # Generates CHANGELOG.md
   ```

3. **Final build and publish**:
   ```bash
   # Build all packages for publishing
   npm run build:publish
   
   # Publish to npm
   npx changeset publish
   ```

### Step 4: Post-Publish Cleanup

1. **Revert to development mode**:
   ```bash
   # Reset package.json to development mode
   npm run dev:reset -- --filter=@ideasui/button
   
   # Or reset all packages
   npm run dev:reset
   ```

2. **Verify development mode**:
   ```bash
   cat packages/components/button/package.json | grep '"main"'
   # Should show: "main": "./src/index.ts"
   ```

## 🔄 Automated Pre-Publish Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "prepublish": "npm run build && npm run test",
    "build:publish": "npm run build && npm run update-main-field",
    "update-main-field": "node scripts/update-package-json.js publish",
    "dev:reset": "node scripts/update-package-json.js dev",
    "pre-publish-check": "npm run lint && npm run test && npm run type-check"
  }
}
```

### Update Script (scripts/update-package-json.js)

```javascript
const fs = require('fs')
const path = require('path')

const mode = process.argv[2] // 'publish' or 'dev'
const packagePath = path.join(__dirname, '../package.json')
const pkg = require(packagePath)

if (mode === 'publish') {
  // Switch to built files
  pkg.main = './dist/index.js'
  pkg.module = './dist/index.mjs'
  pkg.types = './dist/index.d.ts'
} else {
  // Switch to source files
  pkg.main = './src/index.ts'
  pkg.module = './src/index.ts'
  pkg.types = './src/index.ts'
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2))
console.log(`Updated package.json for ${mode} mode`)
```

## ✅ Pre-Publish Checklist

### Before Publishing:
- [ ] Component tests pass
- [ ] No linting errors
- [ ] TypeScript compiles without errors
- [ ] Build generates all required files
- [ ] Package.json points to dist files
- [ ] Local testing with packed tarball works
- [ ] Documentation is up to date
- [ ] Changeset created with proper version bump

### After Publishing:
- [ ] Package appears on npm
- [ ] Installation works: `npm install @ideasui/button`
- [ ] Import/export works in test project
- [ ] Package.json reverted to development mode
- [ ] Git tags created by changeset
- [ ] CHANGELOG.md updated

## 🚨 Common Issues

### Build Issues:
```bash
# Missing dist files
npm run build -- --filter=@ideasui/button

# TypeScript errors
npm run type-check -- --filter=@ideasui/button

# Missing dependencies
npm install
```

### Publishing Issues:
```bash
# Not logged in to npm
npm login

# Wrong registry
npm config set registry https://registry.npmjs.org/

# Permission denied
npm owner add <username> @ideasui/button
```

## 🔧 Development Tips

### Quick Start Checklist

1. **Generate component**: `npm run generate` → `component`
2. **Start playground**: `npm run dev -- --filter=playground`
3. **Edit component**: Modify files in `packages/components/[name]/src/`
4. **View changes**: Visit playground at `http://localhost:3000/playground/[name]`
5. **Add tests**: Write tests in `src/__tests__/`
6. **Run tests**: `npm run test -- --filter=@ideasui/[name]`

### File Watching

- **Component changes**: Direct source mapping (no build needed)
- **Playground**: Hot reload with Next.js
- **Tests**: Auto-run with `npm run test:watch -- --filter=package-name`
- **Storybook**: Hot reload with `npm run storybook`

### Turbo Filter Examples

```bash
# Single package
npm run dev -- --filter=@ideasui/button

# Multiple packages
npm run build -- --filter=@ideasui/button --filter=@ideasui/input

# Pattern matching
npm run test -- --filter=*button*

# Scope filtering
npm run lint -- --filter=@ideasui/*

# App filtering
npm run dev -- --filter=playground

# Exclude packages
npm run build -- --filter=!@ideasui/button
```

### Debugging

1. **Check build errors**:
   ```bash
   npm run build -- --filter=@ideasui/button 2>&1 | grep ERROR
   ```

2. **Lint issues**:
   ```bash
   npm run lint -- --filter=@ideasui/button
   ```

3. **Type errors**:
   ```bash
   npx tsc --noEmit --filter=@ideasui/button
   ```

## 🔄 Development vs Production

### Development Mode
- **Source**: Direct `src/index.ts` mapping
- **Hot Reload**: Immediate changes
- **No Build**: Skip build process
- **Fast**: Instant feedback

### Production/Publishing
- **Built**: Uses `dist/index.js`
- **Optimized**: Bundled and minified
- **Types**: Generated `.d.ts` files
- **Compatible**: Works with all bundlers

## 🎯 Component Guidelines

### 1. Component Template
```tsx
'use client'
import * as React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@ideasui/utils'

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
  "name": "@ideasui/component-name",
  "version": "0.0.0",
  "description": "Component description",
  "main": "./src/index.ts",
  "module": "./src/index.ts",
  "types": "./src/index.ts",
  "publishConfig": {
    "main": "./dist/index.js",
    "module": "./dist/index.mjs",
    "types": "./dist/index.d.ts"
  },
  "exports": {
    ".": {
      "development": "./src/index.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "dev": "echo 'Using source files directly'",
    "build": "tsup",
    "build:publish": "tsup && npm run update-package-json",
    "update-package-json": "node scripts/update-main-field.js",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@ideasui/utils": "workspace:*",
    "tailwind-variants": "^0.1.20",
    "react-aria": "^3.32.1"
  }
}
```

## 📋 Component Checklist

- [ ] TypeScript interfaces with JSDoc
- [ ] Tailwind variants configuration
- [ ] React.forwardRef implementation
- [ ] Accessibility attributes
- [ ] Unit tests (>80% coverage)
- [ ] Storybook stories
- [ ] README documentation
- [ ] Proper exports in index.ts
# Package Structure Rules

## 📦 Package Organization

### Package Categories:

```
packages/
├── components/          # Styled UI components (@ideasui/button)
├── primitives/          # Headless components (@ideasui/toggle-primitive)
├── core/               # Core system packages
│   ├── provider/       # Global provider (@ideasui/provider)
│   └── variants/       # Styling system (@ideasui/variants)
├── hooks/              # React hooks (@ideasui/hooks)
├── utils/              # Utilities (@ideasui/utils)
├── icons/              # Icon library (@ideasui/icons)
├── themes/             # Theme system
└── cli/                # CLI tools (@ideasui/cli)
```

## 🏗️ Component Package Structure

### Standard Layout:

```
packages/components/button/
├── src/
│   ├── button.tsx           # Main component
│   ├── button-types.ts      # TypeScript interfaces
│   ├── index.ts             # Barrel export
│   └── __tests__/
│       └── button.test.tsx  # Tests
├── package.json             # Package configuration
├── README.md               # Documentation
├── tsconfig.json           # TypeScript config
└── tsup.config.ts          # Build config
```

## 📄 Package.json Requirements

### Minimal Configuration:

```json
{
  "name": "@ideasui/button",
  "version": "0.1.0",
  "description": "Button component for IdeasUI",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "lint": "eslint ."
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "dependencies": {
    "@ideasui/variants": "workspace:*",
    "@ideasui/utils": "workspace:*"
  }
}
```

## 🔧 Build Configuration

### TSUp Config (tsup.config.ts):

```typescript
import {defineConfig} from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
});
```

### TypeScript Config (tsconfig.json):

```json
{
  "extends": "../../../configs/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules", "__tests__"]
}
```

## 📋 Export Patterns

### Component Exports (src/index.ts):

```typescript
// Export main component
export {Button} from "./button";

// Export types
export type {ButtonProps} from "./button-types";

// Export variants (if applicable)
export {buttonVariants} from "./button";
```

### Component File (src/button.tsx):

```typescript
import * as React from 'react'
import { buttonVariants } from '@ideasui/variants'
import { cn } from '@ideasui/utils'
import type { ButtonProps } from './button-types'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

## 🎯 Dependency Rules

### Allowed Dependencies:

- **Components** can depend on: `@ideasui/variants`, `@ideasui/utils`, `@ideasui/hooks`, `@ideasui/icons`
- **Primitives** can depend on: `@ideasui/utils`, `@ideasui/hooks`
- **Core packages** can depend on: `@ideasui/utils`
- **Utils** should have minimal dependencies

### Forbidden Dependencies:

- No circular dependencies
- Components cannot depend on other components
- Primitives cannot depend on styled components
- Core packages cannot depend on components

## 📚 Documentation Requirements

### README.md Template:

````markdown
# @ideasui/button

Button component for user interactions.

## Installation

```bash
npm install @ideasui/button
```
````

## Usage

```tsx
import {Button} from "@ideasui/button";

function App() {
  return (
    <Button variant="outline" size="lg">
      Click me
    </Button>
  );
}
```

## API Reference

### ButtonProps

| Prop    | Type                                 | Default | Description          |
| ------- | ------------------------------------ | ------- | -------------------- |
| variant | 'solid' \| 'outline' \| 'ghost'      | 'solid' | Visual style variant |
| size    | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md'    | Size of the button   |

## Examples

[Include usage examples]

````

## 🧪 Testing Structure

### Test File (src/__tests__/button.test.tsx):
```typescript
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../button'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-2')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
````

## 🔄 Versioning & Publishing

### Changesets:

- Use changesets for version management
- Create changeset for any user-facing change
- Follow semantic versioning (semver)

### Publishing:

- Only `dist` folder is published
- Use `files` field to control published content
- Set `sideEffects: false` for tree-shaking
- Include proper `exports` field for modern bundlers

## 📁 File Naming Conventions

### Required Patterns:

- Main component: `button.tsx`
- Types: `button-types.ts`
- Tests: `button.test.tsx`
- Stories: `button.stories.tsx`
- All files use kebab-case

### Folder Structure:

- Use kebab-case for all folder names
- Group related files in subdirectories
- Keep flat structure when possible

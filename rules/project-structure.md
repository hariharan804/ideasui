# IdeasUI Project Rules

## 📦 Monorepo Structure

### Root Organization

```
packages/
├── components/          # Styled UI components (@ideasui/button)
├── core/               # Core system packages
│   └── theme/          # @ideasui/theme - Design system & tokens
├── hooks/              # @ideasui/hooks - Shared React hooks
├── utils/              # @ideasui/utils - Utility functions
├── icons/              # @ideasui/icons - SVG icon components
└── cli/                # @ideasui/cli - Development CLI tools
apps/
├── storybook/          # Storybook documentation & playground
└── playground/         # Next.js development playground
```

## 🏗️ Package Architecture

Each package in `packages/` should follow this standard structure:

### Standard Layout

```
packages/components/button/
├── src/
│   ├── button.tsx           # Main component & types (PascalCase)
│   └── index.ts             # Barrel export (Public API)
├── __tests__/
│   └── button.test.tsx      # Unit tests using Vitest & RTL
├── stories/
│   └── button.stories.tsx   # Storybook stories
├── package.json             # Package configuration
├── README.md               # Individual package documentation
├── tsconfig.json           # TypeScript configuration
└── tsup.config.ts          # Build configuration (TSUp)
```

### Package Config (package.json)

All packages must define `exports`, `main`, `module`, and `types`. Use `workspace:*` for internal dependencies.

```json
{
  "name": "@ideasui/button",
  "version": "0.1.0",
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
  "sideEffects": false
}
```

## 🧩 Component Implementation Pattern

### Standard Component

Always use `forwardRef`, `displayName`, and `recipes` from `@ideasui/theme`.

```tsx
import { forwardRef } from 'react';
import { button } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import type { ButtonProps } from './button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, color, ...otherProps } = props;
  const { base } = button({ variant, color });

  return <button ref={ref} className={cn(base(), className)} {...otherProps} />;
});

Button.displayName = 'IdeasUI.Button';
```

### Export Pattern (index.ts)

Every component package must have a barrel export in `index.ts`.

```tsx
export { Button } from './button';
export type { ButtonProps } from './button.types';
```

## 🎨 Theme System

### ThemeProvider Installation

```tsx
import { ThemeProvider, ThemeScript } from '@ideasui/theme';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

## 📋 Naming Conventions

### Case Types & Usage

- **kebab-case**: Used for **Package names**, **Folder names**, **File names**, and **CSS classes**.
  - ✅ `@ideasui/date-picker`, `button-group.tsx`, `packages/input-field/`
- **camelCase**: Used for **Variables**, **Functions**, **Object properties**, and **Component props**.
  - ✅ `buttonVariants`, `isDisabled`, `onClick`, `className`
- **PascalCase**: Used for **React components**, **TypeScript interfaces/types**, and **Classes**.
  - ✅ `Button`, `InputFieldProps`, `VariantType`
- **SCREAMING_SNAKE_CASE**: Used for **Constants** and **Environment variables**.
  - ✅ `MAX_FILE_SIZE`, `API_BASE_URL`

### Quick Reference Table

| Context        | Case                 | Example                 |
| -------------- | -------------------- | ----------------------- |
| Package name   | kebab-case           | `@ideasui/input-field`  |
| Folder name    | kebab-case           | `packages/input-field/` |
| File name      | kebab-case           | `input-field.tsx`       |
| Component name | PascalCase           | `InputField`            |
| Variable name  | camelCase            | `inputValue`            |
| Function name  | camelCase            | `handleInputChange`     |
| Interface name | PascalCase           | `InputFieldProps`       |
| Type name      | PascalCase           | `VariantType`           |
| Constant       | SCREAMING_SNAKE_CASE | `MAX_LENGTH`            |

## 🧪 Testing

- **Engine**: Vitest
- **Library**: `@testing-library/react`
- **Location**: `__tests__/` directory within each package.
- **Accessibility**: Use semantic HTML and verify correct ARIA roles/attributes.

## 🚀 Development Commands

```bash
pnpm dev          # Run all apps in development mode
pnpm build        # Build all packages and apps
pnpm test         # Run all tests
pnpm lint         # Lint all code
pnpm typecheck    # Run TypeScript compiler checks
```

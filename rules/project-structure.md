# IdeasUI Project Rules

## 📦 Package Structure

```
packages/
├── core/theme/        # @ideasui/theme - Design system & tokens (Enforced via recipes)
├── components/        # Styled UI components
│   ├── button/        # @ideasui/button
│   ├── ripple/        # @ideasui/ripple
│   ├── slot/          # @ideasui/slot
│   └── touchable/     # @ideasui/touchable
├── hooks/             # @ideasui/hooks - React hooks
├── utils/             # @ideasui/utils - Utilities
├── icons/             # @ideasui/icons - Icon components
└── cli/               # @ideasui/cli - CLI tools
```

## 🎨 Theme System

### ThemeProvider Usage

```tsx
import { ThemeProvider, ThemeScript } from '@ideasui/theme';

// In layout
<html>
  <head>
    <ThemeScript defaultTheme="light" />
  </head>
  <body>
    <ThemeProvider defaultTheme="light" />
    {children}
  </body>
</html>;
```

### Recipes (Component Variants)

```tsx
import { button } from '@ideasui/theme/recipes';

const { base } = button({ variant: 'solid', color: 'primary' });
```

## 🔧 Component Pattern

### Standard Component Structure

```tsx
// button/src/button.tsx
import { button } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'secondary';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, children, ...props }, ref) => {
    const { base } = button({ variant, color });
    return (
      <button ref={ref} className={cn(base(), className)} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
```

### Export Pattern

```tsx
// button/src/index.ts
export { Button } from './button';
export type { ButtonProps } from './button';
```

## 📋 Naming Conventions

| Type             | Convention           | Example                      |
| ---------------- | -------------------- | ---------------------------- |
| Package names    | kebab-case           | `@ideasui/button`            |
| Components       | PascalCase           | `Button`, `ThemeProvider`    |
| Hooks            | camelCase with "use" | `useTheme`, `useDisclosure`  |
| Files            | kebab-case           | `use-theme.ts`, `button.tsx` |
| Types/Interfaces | PascalCase           | `ButtonProps`, `ThemeConfig` |

## 🧪 Testing

### Test Files Location

```
packages/component/
└── __tests__/
    ├── Component.test.tsx
    └── Component.a11y.test.tsx
```

### Accessibility Testing (via roles and attributes)

```tsx
test('has no accessibility violations', () => {
  render(<Button>Click</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

## 🚀 Development Commands

```bash
pnpm dev          # Watch mode
pnpm build        # Build all packages
pnpm test         # Run tests
pnpm lint         # Lint code
pnpm type-check   # TypeScript check
```

# TypeScript & Code Quality Rules

## 📝 TypeScript Standards

### Strict Mode

All packages use strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Type Exports

Always export types explicitly:

```tsx
// ✅ Correct
export type {ButtonProps} from "./button";
export {Button} from "./button";

// ❌ Avoid re-exporting * with types mixed
```

### Generics

Use descriptive generic names:

```tsx
// ✅ Good
function useControllableState<TValue>(options: Options<TValue>): [TValue, SetState<TValue>];

// ❌ Bad
function useControllableState<T>(options: Options<T>): [T, SetState<T>];
```

## 🔧 React Patterns

### ForwardRef Components

All interactive components use forwardRef:

```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button ref={ref} {...props} />
));
Button.displayName = "Button";
```

### Hooks Return Types

Always type hook returns:

```tsx
interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export function useDisclosure(initial = false): UseDisclosureReturn {
  // ...
}
```

## 📦 Package Exports

### package.json Exports

```json
{
  "exports": {
    ".": {
      "import": "./src/index.ts",
      "types": "./src/index.ts"
    },
    "./recipes": {
      "import": "./src/recipes/index.ts"
    }
  }
}
```

## 🧹 Code Style

### ESLint Rules

Key rules enforced:

- `@typescript-eslint/no-explicit-any` - avoid any
- `unused-imports/no-unused-imports` - clean imports
- `react-hooks/exhaustive-deps` - hook dependencies

### Prettier Config

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "bracketSpacing": false,
  "jsxBracketSameLine": false
}
```

## 📚 Documentation

### JSDoc for Public APIs

```tsx
/**
 * Button component with multiple variants and sizes.
 *
 * @example
 * <Button variant="solid" color="primary">
 *   Click me
 * </Button>
 */
export const Button = React.forwardRef<...>(...);
```

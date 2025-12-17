# Naming Conventions Rules

## 📁 File & Folder Naming

### Use kebab-case for:
- Package names: `@ideasui/date-picker`
- Folder names: `packages/components/input-field/`
- File names: `button.tsx`, `input-field.stories.tsx`
- CSS classes: `.btn-primary`, `.input-field`

### Examples:
```
✅ Good:
- packages/date-picker/
- button-group.tsx
- multi-select.test.tsx

❌ Bad:
- packages/DatePicker/
- ButtonGroup.tsx
- MultiSelect.test.tsx
```

## 🐪 Variable & Function Naming

### Use camelCase for:
- Variables: `const buttonVariants = ...`
- Functions: `const handleClick = () => {}`
- Object properties: `{ variant, size, className }`
- Component props: `onClick`, `isDisabled`

### Examples:
```tsx
✅ Good:
const isLoading = true
const handleSubmit = () => {}
const { variant, size } = props

❌ Bad:
const IsLoading = true
const HandleSubmit = () => {}
const { Variant, Size } = props
```

## 🏛️ Component & Type Naming

### Use PascalCase for:
- React components: `Button`, `InputField`
- TypeScript interfaces: `ButtonProps`, `InputFieldProps`
- Types: `VariantType`, `SizeType`
- Classes: `ComponentManager`

### Examples:
```tsx
✅ Good:
export const Button = () => {}
interface ButtonProps {}
type VariantType = 'solid' | 'outline'

❌ Bad:
export const button = () => {}
interface buttonProps {}
type variantType = 'solid' | 'outline'
```

## 📢 Constants Naming

### Use SCREAMING_SNAKE_CASE for:
- Constants: `MAX_RETRY_COUNT`, `API_BASE_URL`
- Environment variables: `NODE_ENV`, `API_KEY`

### Examples:
```tsx
✅ Good:
const MAX_FILE_SIZE = 1024 * 1024
const API_BASE_URL = 'https://api.example.com'

❌ Bad:
const maxFileSize = 1024 * 1024
const apiBaseUrl = 'https://api.example.com'
```

## 🎯 Component Naming Patterns

### Component Files:
- Main component: `button.tsx`
- Types: `button-types.ts`
- Tests: `button.test.tsx`
- Stories: `button.stories.tsx`

### Component Exports:
```tsx
// button.tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...)
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const buttonVariants = tv({...})
```

## 📦 Package Naming Rules

### Scoped Packages:
- Components: `@ideasui/button`, `@ideasui/input-field`
- Utilities: `@ideasui/utils`, `@ideasui/hooks`
- Core: `@ideasui/provider`, `@ideasui/variants`

### Internal Packages:
- Configs: `@ideasui/eslint-config`
- Tools: `@ideasui/cli`

## 🚫 Naming Anti-patterns

### Avoid:
- Mixed cases: `ButtonComponent`, `inputField`
- Abbreviations: `btn`, `inp`, `sel`
- Generic names: `Component`, `Element`, `Item`
- Redundant suffixes: `ButtonButton`, `InputInput`

### Use Instead:
- Descriptive names: `SubmitButton`, `EmailInput`
- Full words: `button`, `input`, `select`
- Specific names: `PrimaryButton`, `SearchInput`
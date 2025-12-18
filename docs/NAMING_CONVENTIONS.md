# Naming Conventions Guide

## Case Types & Usage

### 📁 **kebab-case** (lowercase with hyphens)

**When to use:** Package names, folder names, file names, URLs, CSS classes

```
✅ Good:
- packages/input-field/
- @ideasui/date-picker
- button-group.tsx
- multi-select.stories.tsx

❌ Bad:
- packages/InputField/
- @ideasui/DatePicker
- ButtonGroup.tsx
```

### 🐪 **camelCase** (first letter lowercase)

**When to use:** Variables, functions, object properties, component props

```tsx
✅ Good:
const buttonVariants = cva(...)
const isDisabled = true
const onClick = () => {}
const { variant, size, className } = props

❌ Bad:
const ButtonVariants = cva(...)
const IsDisabled = true
const OnClick = () => {}
```

### 🏛️ **PascalCase** (first letter uppercase)

**When to use:** React components, TypeScript interfaces/types, classes

```tsx
✅ Good:
export const Button = () => {}
interface ButtonProps {}
type VariantType = 'default' | 'outline'
class ComponentManager {}

❌ Bad:
export const button = () => {}
interface buttonProps {}
type variantType = 'default' | 'outline'
```

### 🐍 **snake_case** (lowercase with underscores)

**When to use:** Database fields, environment variables, constants

```
✅ Good:
NEXT_PUBLIC_API_URL=...
const MAX_RETRY_COUNT = 3
database_field_name

❌ Bad:
nextPublicApiUrl=...
const maxRetryCount = 3
```

### 📢 **SCREAMING_SNAKE_CASE** (uppercase with underscores)

**When to use:** Constants, environment variables

```tsx
✅ Good:
const API_BASE_URL = 'https://api.example.com'
const MAX_FILE_SIZE = 1024 * 1024
process.env.NODE_ENV

❌ Bad:
const apiBaseUrl = 'https://api.example.com'
const maxFileSize = 1024 * 1024
```

## File Naming Rules

| File Type  | Case       | Example                              |
| ---------- | ---------- | ------------------------------------ |
| Components | kebab-case | `button.tsx`, `input-field.tsx`      |
| Tests      | kebab-case | `button.test.tsx`, `utils.spec.ts`   |
| Stories    | kebab-case | `button.stories.tsx`                 |
| Utilities  | kebab-case | `format-date.ts`, `api-client.ts`    |
| Types      | kebab-case | `button-types.ts`, `api-types.ts`    |
| Configs    | kebab-case | `rollup.config.js`, `jest.config.js` |

## Package Structure Example

```
packages/date-picker/              # kebab-case folder
├── package.json                   # "name": "@ideasui/date-picker"
├── src/
│   ├── date-picker.tsx           # kebab-case file
│   ├── date-picker-types.ts      # kebab-case types
│   ├── __tests__/
│   │   └── date-picker.test.tsx  # kebab-case test
│   └── index.ts
└── tsup.config.js              # kebab-case config
```

## Code Example

```tsx
// ✅ Correct naming in date-picker.tsx
import { type VariantProps } from 'class-variance-authority' // PascalCase type

const datePickerVariants = cva(...)  // camelCase variable

export interface DatePickerProps     // PascalCase interface
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof datePickerVariants> {
  selectedDate?: Date                // camelCase prop
  onDateChange?: (date: Date) => void // camelCase prop
}

export const DatePicker = React.forwardRef< // PascalCase component
  HTMLDivElement,
  DatePickerProps
>(({ selectedDate, onDateChange, className, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false) // camelCase state

  const handleDateSelect = (date: Date) => { // camelCase function
    onDateChange?.(date)
  }

  return (
    <div
      className={cn(datePickerVariants({ className }))}
      ref={ref}
      {...props}
    />
  )
})

DatePicker.displayName = 'DatePicker' // PascalCase
```

## Quick Reference

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

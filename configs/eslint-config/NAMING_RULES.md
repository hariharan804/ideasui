# ESLint Naming Convention Rules

## Enforced Rules

### ✅ **Variables & Functions**
```tsx
// ✅ Correct
const userName = 'john'
const isDisabled = true
const handleClick = () => {}

// ❌ Incorrect - will show ESLint error
const UserName = 'john'      // Should be camelCase
const is_disabled = true     // Should be camelCase
const HandleClick = () => {}  // Should be camelCase
```

### ✅ **React Components**
```tsx
// ✅ Correct
const Button = () => {}
const InputField = () => {}

// ❌ Incorrect - will show ESLint error
const button = () => {}      // Should be PascalCase
const inputField = () => {}  // Should be PascalCase
```

### ✅ **TypeScript Types & Interfaces**
```tsx
// ✅ Correct
interface ButtonProps {}
type VariantType = 'default' | 'outline'
enum ButtonSize {}

// ❌ Incorrect - will show ESLint error
interface buttonProps {}     // Should be PascalCase
type variantType = string    // Should be PascalCase
enum buttonSize {}          // Should be PascalCase
```

### ✅ **Constants**
```tsx
// ✅ Correct
const MAX_RETRY_COUNT = 3
const API_BASE_URL = 'https://api.example.com'

// ❌ Incorrect - will show ESLint error
const maxRetryCount = 3      // Should be UPPER_CASE
const apiBaseUrl = 'url'     // Should be UPPER_CASE
```

### ✅ **Classes**
```tsx
// ✅ Correct
class ComponentManager {}
class ApiClient {}

// ❌ Incorrect - will show ESLint error
class componentManager {}    // Should be PascalCase
class apiClient {}          // Should be PascalCase
```

## Configuration

The rules are configured in `configs/eslint-config/base.js`:

```js
'@typescript-eslint/naming-convention': [
  'error',
  // Variables: camelCase or UPPER_CASE
  { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
  // Functions: camelCase
  { selector: 'function', format: ['camelCase'] },
  // Components: PascalCase
  { selector: 'variable', filter: { regex: '^[A-Z]', match: true }, format: ['PascalCase'] },
  // Interfaces & Types: PascalCase
  { selector: 'interface', format: ['PascalCase'] },
  { selector: 'typeAlias', format: ['PascalCase'] },
  // Classes: PascalCase
  { selector: 'class', format: ['PascalCase'] }
]
```

## Usage

ESLint will automatically check naming conventions during:

```bash
npm run lint          # Check all files
npm run lint --fix    # Auto-fix some issues
```

## Integration

- **VS Code**: Shows red underlines for naming violations
- **CI/CD**: Fails build if naming conventions are violated
- **Pre-commit**: Runs automatically before commits
- **IDE**: Real-time feedback while coding
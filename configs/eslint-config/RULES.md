# ESLint Rules Explanation

## Code Quality Rules ✅

### Performance

- **`sonarjs/cognitive-complexity`** - Max complexity 15 (prevents hard-to-understand code)
- **`sonarjs/no-identical-functions`** - Detects duplicate code (DRY principle)
- **`sonarjs/no-duplicate-string`** - Prevents magic strings (use constants)
- **`max-depth`** - Max nesting 4 levels (improves readability)
- **`complexity`** - Max cyclomatic complexity 10 (easier testing)

### Readability

- **`max-lines`** - Max 300 lines per file (split large files)
- **`max-lines-per-function`** - Max 50 lines per function (single responsibility)
- **`max-params`** - Max 4 parameters (use objects for more)
- **`no-nested-ternary`** - Prevents `a ? b : c ? d : e` (hard to read)
- **`prefer-template`** - Use template literals over concatenation

### Modern JavaScript

- **`prefer-const`** - Use const when variable doesn't change
- **`no-var`** - Use let/const instead of var
- **`object-shorthand`** - Use `{ name }` instead of `{ name: name }`
- **`prefer-optional-chain`** - Use `obj?.prop` instead of `obj && obj.prop`
- **`prefer-nullish-coalescing`** - Use `??` instead of `||` for null checks

### Security

- **`security/detect-object-injection`** - Prevents prototype pollution
- **`security/detect-non-literal-regexp`** - Prevents ReDoS attacks
- **`security/detect-unsafe-regex`** - Detects dangerous regex patterns

### Import Management

- **`import/order`** - Sorts imports alphabetically by group
- **`import/no-cycle`** - Prevents circular dependencies
- **`import/no-duplicates`** - Combines duplicate imports

## Tailwind CSS Rules 🎨

### Class Management

- **`tailwindcss/classnames-order`** - Auto-sorts Tailwind classes

  ```jsx
  // ❌ Bad
  <div className="p-4 text-red-500 bg-white">

  // ✅ Good (auto-sorted)
  <div className="bg-white p-4 text-red-500">
  ```

- **`tailwindcss/no-contradicting-classname`** - Prevents conflicting classes

  ```jsx
  // ❌ Bad
  <div className="p-4 p-2"> // Conflicting padding

  // ✅ Good
  <div className="p-4">
  ```

### Prettier Integration

- **`prettier-plugin-tailwindcss`** - Auto-formats Tailwind classes on save

## React Rules ⚛️

### Performance

- **`react/no-array-index-key`** - Warns against using index as key (causes re-render issues)
- **`react-hooks/exhaustive-deps`** - Ensures all dependencies in useEffect

### Readability

- **`react/jsx-curly-brace-presence`** - Removes unnecessary braces

  ```jsx
  // ❌ Bad
  <Component name={"John"} />

  // ✅ Good
  <Component name="John" />
  ```

- **`react/self-closing-comp`** - Use self-closing tags

  ```jsx
  // ❌ Bad
  <Component></Component>

  // ✅ Good
  <Component />
  ```

## What Gets Checked

### ✅ Automatically Fixed

- Import sorting
- Tailwind class ordering
- Code formatting (Prettier)
- Self-closing tags
- Unnecessary braces

### ⚠️ Warnings (Should Fix)

- Complex functions (>50 lines)
- High cognitive complexity
- Missing dependencies in hooks
- Console.log statements

### ❌ Errors (Must Fix)

- Unused variables
- Security vulnerabilities
- Circular dependencies
- Missing React keys
- Contradicting Tailwind classes

## Example: Before & After

### Before (Bad)

```tsx
import { useState } from 'react';
import axios from 'axios';
import { Button } from './Button';

function UserList() {
  const [users, setUsers] = useState([]);

  // ❌ Complex function
  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    if (response.data) {
      if (response.data.users) {
        if (response.data.users.length > 0) {
          setUsers(response.data.users);
        }
      }
    }
  };

  return (
    <div className="bg-white p-2 p-4 text-red-500">
      {users.map((user, index) => (
        <div key={index} className={'font-bold'}>
          {user.name}
        </div>
      ))}
    </div>
  );
}
```

### After (Good)

```tsx
import axios from 'axios';
import { useState } from 'react';

import { Button } from './Button';

function UserList() {
  const [users, setUsers] = useState([]);

  // ✅ Simplified with optional chaining
  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    const userList = response.data?.users ?? [];
    if (userList.length > 0) {
      setUsers(userList);
    }
  };

  return (
    <div className="bg-white p-4 text-red-500">
      {users.map((user) => (
        <div key={user.id} className="font-bold">
          {user.name}
        </div>
      ))}
    </div>
  );
}
```

## CI/CD Integration

All rules run automatically:

1. **On Save** - Prettier formats code
2. **Pre-commit** - ESLint checks staged files
3. **PR** - Full lint check blocks merge if fails
4. **Production** - Zero warnings/errors allowed

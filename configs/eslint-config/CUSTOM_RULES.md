# Custom ESLint Rules

## React Namespace Rule

Enforces using React namespace instead of named imports.

### Rule: `@i2l/react-namespace`

**Purpose:** Maintain consistent React API usage across the codebase.

### ❌ Bad (Named Imports)

```tsx
import { useState, useEffect } from 'react';

function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);

  return <div>{count}</div>;
}
```

### ✅ Good (Namespace Import)

```tsx
import React from 'react';

function Component() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log(count);
  }, [count]);

  return <div>{count}</div>;
}
```

## Usage

### Enable React Namespace Rule

In your `.eslintrc.js`:

```js
module.exports = {
  extends: ['@i2l/eslint-config/react-namespace'],
};
```

### Or Add to Existing Config

```js
module.exports = {
  extends: ['@i2l/eslint-config/react'],
  rules: {
    '@i2l/react-namespace': 'error',
    'react/react-in-jsx-scope': 'error',
  },
};
```

## Benefits

1. **Explicit API Source** - Clear where each API comes from
2. **No Import Conflicts** - Avoid naming collisions
3. **Easier Refactoring** - Find all React API usage easily
4. **Consistent Style** - Team uses same pattern

## When to Use

- ✅ Large enterprise apps
- ✅ Teams with strict coding standards
- ✅ Projects with many React APIs
- ❌ Modern React 17+ projects (JSX transform doesn't need React import)

## Creating More Custom Rules

### 1. Create Rule File

`packages/eslint-config/rules/my-rule.js`:

```js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'My custom rule',
    },
    messages: {
      myMessage: 'Custom error message',
    },
  },
  create(context) {
    return {
      // AST node visitors
      Identifier(node) {
        if (node.name === 'badName') {
          context.report({
            node,
            messageId: 'myMessage',
          });
        }
      },
    };
  },
};
```

### 2. Register in `rules/index.js`

```js
module.exports = {
  'react-namespace': require('./react-namespace'),
  'my-rule': require('./my-rule'),
};
```

### 3. Use in Config

```js
module.exports = {
  plugins: ['@i2l'],
  rules: {
    '@i2l/my-rule': 'error',
  },
};
```

## Testing Custom Rules

```js
const { RuleTester } = require('eslint');
const rule = require('./rules/react-namespace');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('react-namespace', rule, {
  valid: ["import React from 'react'; React.useState()"],
  invalid: [
    {
      code: "import { useState } from 'react';",
      errors: [{ messageId: 'noNamedImport' }],
    },
  ],
});
```

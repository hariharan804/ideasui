# @ideasui/eslint-config

Enterprise-grade ESLint and Prettier configuration for large teams.

## Features

✅ **Code Quality**: ESLint with TypeScript support  
✅ **Security**: Security plugin for vulnerability detection  
✅ **Code Smells**: SonarJS for detecting code smells  
✅ **Import Management**: Automatic import sorting and validation  
✅ **Accessibility**: JSX-A11y for React accessibility  
✅ **Formatting**: Prettier integration  
✅ **React/Next.js**: Specialized configs for React and Next.js

## Installation

```bash
npm install @ideasui/eslint-config --save-dev
```

## Usage

### Base Config (TypeScript)

Create `.eslintrc.js`:

```js
module.exports = {
  extends: ['@ideasui/eslint-config'],
};
```

### React Config

```js
module.exports = {
  extends: ['@ideasui/eslint-config/react'],
};
```

### Next.js Config

```js
module.exports = {
  extends: ['@ideasui/eslint-config/next'],
};
```

### Prettier Config

Create `.prettierrc.js`:

```js
module.exports = require('@ideasui/eslint-config/.prettierrc.js');
```

## Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,md}\""
  }
}
```

## VS Code Setup

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

## Rules Overview

### TypeScript

- No unused variables (with underscore exception)
- Warn on explicit `any`
- Consistent type usage

### Import Management

- Automatic import sorting (alphabetical)
- Group imports by type
- No duplicate imports

### Code Quality

- No console.log (except warn/error)
- Prefer const over let
- No var keyword
- Strict equality (===)

### Security

- Detect security vulnerabilities
- Prevent unsafe patterns

### React

- No missing keys in lists
- Proper hook usage
- Accessibility checks

## CI/CD Integration

### GitHub Actions

```yaml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
```

## Team Guidelines

1. **Pre-commit**: Use husky + lint-staged for automatic linting
2. **PR Reviews**: All code must pass linting before merge
3. **No Warnings**: Treat warnings as errors in CI
4. **Consistent Style**: Use Prettier for all formatting

## Customization

Override rules in your project's `.eslintrc.js`:

```js
module.exports = {
  extends: ['@ideasui/eslint-config/next'],
  rules: {
    // Your custom rules
    'no-console': 'off',
  },
};
```

# Enterprise ESLint Config - Complete Checklist ✅

## What's Included

### ✅ Code Quality

- **Complexity Limits** - Max 15 cognitive complexity, 10 cyclomatic
- **Function Size** - Max 50 lines per function
- **File Size** - Max 300 lines per file
- **Nesting Depth** - Max 4 levels
- **Parameters** - Max 4 per function
- **Duplicate Detection** - No duplicate strings (3+ occurrences)
- **Dead Code** - No unused variables/imports

### ✅ Performance

- **No Identical Functions** - DRY principle enforced
- **Immediate Returns** - Prefer early returns
- **No Nested Components** - Prevents re-render issues
- **Import Cycles** - Detects circular dependencies

### ✅ Readability

- **Import Sorting** - Alphabetical, grouped by type
- **Blank Lines** - Enforced before returns and after declarations
- **Naming Conventions** - camelCase enforced
- **No Nested Ternary** - Prevents complex conditionals
- **Template Literals** - Prefer over concatenation

### ✅ React Best Practices

- **Hook Rules** - Proper hook usage
- **Key Props** - Required in lists
- **No Index Keys** - Warns against index as key
- **Self-Closing Tags** - Enforced
- **Fragment Syntax** - Use `<>` instead of `<React.Fragment>`
- **No Useless Fragments** - Removes unnecessary wrappers
- **Curly Braces** - Only when needed

### ✅ Tailwind CSS

- **Class Ordering** - Auto-sorted by Prettier
- **No Conflicts** - Detects contradicting classes
- **Custom Classes** - Allowed (configurable)

### ✅ Accessibility

- **Alt Text** - Required on images
- **Anchor Validity** - Proper link usage
- **Keyboard Events** - Warns on click-only handlers
- **ARIA** - Basic ARIA rules

### ✅ TypeScript

- **No Unused Vars** - With underscore exception
- **No Explicit Any** - Warns on any usage
- **No Shadow** - Prevents variable shadowing
- **Type Safety** - Basic type checking

### ✅ Error Handling

- **No Throw Literal** - Throw Error objects only
- **Require Await** - Warns on async without await
- **No Return Await** - Unnecessary await in return

### ✅ Modern JavaScript

- **Prefer Const** - Use const when possible
- **No Var** - Use let/const only
- **Object Shorthand** - Use `{ name }` syntax
- **Arrow Functions** - Consistent parens

### ✅ Code Organization

- **Import Order** - Grouped and sorted
- **No Duplicate Imports** - Combines imports
- **Padding Lines** - Consistent spacing

## What's NOT Included (Intentionally)

### ❌ Type-Checking Rules

- Requires `parserOptions.project` (slow)
- Use `tsc --noEmit` for type checking instead

### ❌ Security Plugin

- Causes circular dependency issues
- Use dedicated security scanners (Snyk, SonarQube)

### ❌ Jest/Testing Rules

- Add separately if needed
- Different rules for test files

## Missing for Enterprise? Add These:

### 1. Husky + Lint-Staged (Pre-commit)

```bash
npm install -D husky lint-staged
npx husky init
```

`.husky/pre-commit`:

```bash
npx lint-staged
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

### 2. Commitlint (Commit Message Standards)

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

`commitlint.config.js`:

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

### 3. CI/CD Integration

**GitHub Actions** (`.github/workflows/lint.yml`):

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

### 4. SonarQube/SonarCloud

- Code quality metrics
- Security vulnerabilities
- Code coverage
- Technical debt tracking

### 5. Bundle Size Monitoring

```bash
npm install -D @next/bundle-analyzer
```

### 6. Performance Monitoring

- Lighthouse CI
- Web Vitals tracking
- Bundle analysis

## Recommended Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "validate": "npm run lint && npm run format:check && npm run type-check"
  }
}
```

## VS Code Settings

`.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true
}
```

## Team Guidelines

1. **Zero Warnings Policy** - Treat warnings as errors in CI
2. **Pre-commit Hooks** - Auto-fix on commit
3. **PR Checks** - Block merge if lint fails
4. **Code Reviews** - Focus on logic, not style
5. **Documentation** - Keep rules documented
6. **Regular Updates** - Update dependencies monthly

## Current Status: ✅ Production Ready

Your config includes:

- ✅ 50+ rules configured
- ✅ Tailwind CSS support
- ✅ React best practices
- ✅ TypeScript support
- ✅ Accessibility checks
- ✅ Performance rules
- ✅ Code quality metrics
- ✅ Auto-formatting
- ✅ Import management
- ✅ Error handling

**Ready for enterprise use!**

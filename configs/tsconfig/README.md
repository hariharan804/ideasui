# @i2l/tsconfig

Shared TypeScript configurations for enterprise monorepo.

## Configurations

### Base Config

Strict TypeScript settings for all projects.

**Features:**

- ✅ Strict mode enabled
- ✅ No implicit any
- ✅ Strict null checks
- ✅ No unused locals/parameters
- ✅ No implicit returns
- ✅ No fallthrough cases
- ✅ No unchecked indexed access

### React Config

Extends base with React-specific settings.

**Features:**

- ✅ JSX support (react-jsx)
- ✅ DOM types included
- ✅ Modern module resolution

### Next.js Config

Extends React with Next.js optimizations.

**Features:**

- ✅ Next.js plugin support
- ✅ Incremental compilation
- ✅ No emit (Next.js handles build)
- ✅ Path aliases support

### Node.js Config

For backend/CLI applications.

**Features:**

- ✅ CommonJS modules
- ✅ Node types included
- ✅ Output to dist folder

## Usage

### Next.js App

`apps/web/tsconfig.json`:

```json
{
  "extends": "@i2l/tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### React Library

`packages/ui/tsconfig.json`:

```json
{
  "extends": "@i2l/tsconfig/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Node.js Package

`packages/api/tsconfig.json`:

```json
{
  "extends": "@i2l/tsconfig/node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Compiler Options Explained

### Type Checking (Strict Mode)

```json
{
  "strict": true, // Enable all strict checks
  "noImplicitAny": true, // Error on 'any' type
  "strictNullChecks": true, // null/undefined must be explicit
  "noUnusedLocals": true, // Error on unused variables
  "noUnusedParameters": true, // Error on unused parameters
  "noImplicitReturns": true, // All code paths must return
  "noFallthroughCasesInSwitch": true, // Switch cases must break
  "noUncheckedIndexedAccess": true // Array access returns T | undefined
}
```

### Module Resolution

```json
{
  "module": "ESNext", // Use latest module syntax
  "moduleResolution": "bundler", // Modern bundler resolution
  "esModuleInterop": true, // Better CommonJS interop
  "resolveJsonModule": true, // Import JSON files
  "isolatedModules": true // Each file is a module
}
```

### Emit Options

```json
{
  "declaration": true, // Generate .d.ts files
  "declarationMap": true, // Source maps for .d.ts
  "sourceMap": true, // Generate source maps
  "removeComments": false, // Keep comments in output
  "importHelpers": true // Use tslib for helpers
}
```

## Path Aliases

Add to your project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

## Type-Only Imports

Use type-only imports for better tree-shaking:

```typescript
// ❌ Bad
import { User } from './types';

// ✅ Good
import type { User } from './types';
```

## Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}
```

## CI/CD Integration

```yaml
# .github/workflows/type-check.yml
name: Type Check
on: [push, pull_request]
jobs:
  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run type-check
```

## Common Issues

### Issue: Cannot find module

**Solution:** Add to `compilerOptions.paths` or install `@types/*` package

### Issue: Type errors in node_modules

**Solution:** Set `"skipLibCheck": true`

### Issue: Slow compilation

**Solution:** Use `"incremental": true` and `.tsbuildinfo` cache

### Issue: Import errors with .ts extension

**Solution:** Don't use `.ts` in imports, TypeScript resolves automatically

## Best Practices

1. **Always use strict mode** - Catches bugs early
2. **Enable all strict flags** - Maximum type safety
3. **Use type-only imports** - Better tree-shaking
4. **Avoid `any`** - Use `unknown` instead
5. **Use path aliases** - Cleaner imports
6. **Run type-check in CI** - Prevent type errors in production
7. **Keep tsconfig.json minimal** - Extend from base configs

## Enterprise Features

✅ **Strict Type Checking** - Maximum safety  
✅ **No Implicit Any** - Explicit types required  
✅ **Null Safety** - Prevents null/undefined errors  
✅ **Unused Code Detection** - Cleaner codebase  
✅ **Exhaustive Switch** - All cases handled  
✅ **Index Access Safety** - Array bounds checking  
✅ **Module Isolation** - Better tree-shaking  
✅ **Source Maps** - Better debugging  
✅ **Declaration Files** - Library support

**Status: Production-ready for enterprise!**

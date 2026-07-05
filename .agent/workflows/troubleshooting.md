---
description: Common issues and how to fix them
---

# Troubleshooting Guide

## Installation Issues

### PNPM Install Fails

**Error**: Version check fails or dependencies don't install

```bash
# Check versions
node --version  # Should be >= 18.x
pnpm --version  # Should be >= 8.x

# Clear cache and reinstall
pnpm clean
rm -rf node_modules
pnpm install
```

### TypeScript Errors After Install

```bash
# Rebuild TypeScript declarations
pnpm run typecheck

# If still failing, clean and rebuild
pnpm clean:dist
pnpm build
```

## Build Issues

### "Cannot find module" Errors

```bash
# Ensure all packages are built
pnpm build

# For specific package
pnpm build --filter=@ideasui/theme
```

### Turbo Cache Issues

```bash
# Clear Turbo cache
rm -rf .turbo

# Force rebuild without cache
turbo build --force
```

### Circular Dependency Warnings

Check `eslint-plugin-boundaries` rules in `eslint.config.mjs`:

- Components can import: hooks, utils, theme
- Hooks can import: utils
- Utils can import: nothing
- Theme can import: utils

## Testing Issues

### Tests Failing Locally

```bash
# Clear Vitest cache
pnpm vitest --clearCache

# Run tests again
pnpm test

# If specific test fails, run in isolation
pnpm test packages/components/button/__tests__/button.test.tsx
```

### Coverage Thresholds Not Met

Check coverage report:

```bash
pnpm test:coverage
open coverage/lcov-report/index.html
```

Write tests for uncovered code or adjust thresholds in `vitest.config.ts`.

### Visual Tests Failing

```bash
# Update snapshots if changes are intentional
pnpm test:visual --update-snapshots

# Or use Chromatic for visual regression
pnpm chromatic
```

## Linting Issues

### ESLint Errors

```bash
# Auto-fix issues
pnpm lint:fix

# If errors persist, check specific file
npx eslint path/to/file.tsx
```

### Prettier Formatting

```bash
# Format all files
pnpm format

# Check formatting without fixing
pnpm format:check
```

### Pre-commit Hooks Failing

```bash
# Run lint-staged manually
npx lint-staged

# Skip hooks temporarily (not recommended)
git commit --no-verify
```

## Storybook Issues

### Storybook Won't Start

```bash
# Kill existing process
pnpm storybook:kill

# Clear Storybook cache
rm -rf node_modules/.cache/storybook

# Restart
pnpm storybook
```

### Stories Not Showing

1. Check file naming: `*.stories.tsx`
2. Verify story is exported
3. Check Storybook console for errors
4. Restart Storybook

## Development Issues

### Hot Module Replacement Not Working

```bash
# Restart dev server
pnpm dev

# Or for specific app
pnpm dev:playground
```

### Port Already in Use

```bash
# Kill process on port 6006 (Storybook)
lsof -ti:6006 | xargs kill -9

# Or use the script
pnpm storybook:kill
```

### Module Resolution Errors

Check `tsconfig.json` paths and `vitest.config.ts` alias resolution are in sync.

## Git Issues

### Commit Blocked by Hooks

```bash
# Ensure commit message follows convention
# Format: type(scope): message
# Example: feat(button): add loading state

# Valid types: feat, fix, docs, style, refactor, test, chore
```

### Changesets Not Found

```bash
# Create a changeset
pnpm changeset

# Check .changeset directory for markdown files
```

## Package Issues

### Package Won't Build

```bash
# Check tsup.config.ts exists
# Ensure package.json has correct scripts
# Verify dependencies are installed

pnpm install
pnpm build --filter=@ideasui/your-package
```

### Import Errors in Tests

Update `vitest.config.ts` alias:

```typescript
resolve: {
  alias: {
    '@ideasui/package': path.resolve(__dirname, './packages/path/to/package/src/index.ts'),
  }
}
```

## Performance Issues

### Slow Builds

```bash
# Use Turbo cache
turbo build

# Build specific packages
pnpm build --filter=@ideasui/button

# Parallel builds are automatic with Turbo
```

### Slow Tests

```bash
# Limit workers
pnpm test --maxWorkers=50%

# Run specific test suite
pnpm test packages/hooks
```

## CI/CD Issues

### GitHub Actions Failing

1. **Check logs**: GitHub Actions tab in repo
2. **Run locally**: Reproduce the failing step
3. **Common fixes**:
   - Update snapshots if visual tests fail
   - Fix lint errors
   - Ensure all tests pass locally

### Chromatic Build Failed

```bash
# Run Chromatic locally
pnpm chromatic

# Accept changes in Chromatic UI if intentional
```

## Environment Issues

### Node Version Mismatch

```bash
# Use nvm to switch versions
nvm use

# Or install recommended version
nvm install 22
nvm use 22
```

### PNPM Version Issues

```bash
# Update PNPM
npm install -g pnpm@latest

# Or use corepack
corepack enable
corepack prepare pnpm@10.26.0 --activate
```

## Getting Help

1. **Search Issues**: [GitHub Issues](https://github.com/ideas2logic-lab/ideasui/issues)
2. **Documentation**: Check `/docs` directory
3. **Create Issue**: Include:
   - Error message
   - Steps to reproduce
   - Environment (Node, PNPM versions)
   - Relevant code snippets

## Debug Mode

```bash
# Run with debug output
DEBUG=* pnpm build

# Vitest verbose mode
pnpm test -- --reporter=verbose

# Check Turbo execution
turbo build --verbose
```

## Clean Slate

When all else fails:

```bash
# Nuclear option - clean everything
pnpm clean
pnpm clean:node-modules
pnpm install
pnpm build
pnpm test
```

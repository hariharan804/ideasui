---
description: How to run tests and maintain test quality
---

# Testing Workflow

## Quick Commands

// turbo-all

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run visual regression tests
pnpm test:visual

# Run specific package tests
pnpm test packages/components/button

# Run tests for a specific file
pnpm test use-button.test.tsx
```

## Unit Testing

### Running Unit Tests

```bash
# All unit tests
pnpm test

# Watch mode for development
pnpm test:watch

# Specific package
pnpm test packages/hooks
```

### Writing Unit Tests

Follow these patterns:

1. **Component Tests** - Test rendering, props, and interactions
2. **Hook Tests** - Test state changes and side effects
3. **Utility Tests** - Test pure functions and edge cases
4. **Accessibility Tests** - Use jest-axe for a11y validation

### Test Coverage Thresholds

Current thresholds:

- **Global**: 60% (baseline)
- **Components**: 80% (user-facing)
- **Hooks**: 85% (business logic)
- **Core**: 70-75% (theme system)
- **Utils**: 75% (helper functions)

## Visual Regression Testing

### Setup

```bash
# Install Playwright browsers (first time only)
pnpm run playwright:install
```

### Running Visual Tests

```bash
# Build Storybook and run visual tests
pnpm test:visual

# Run with UI mode for debugging
pnpm test:visual:ui

# Run on multiple browsers
pnpm test:cross-browser
```

### Creating Visual Tests

Create `__tests__/[component].spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('ComponentName visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-name--default');

  // Wait for component to be fully rendered
  await page.waitForSelector('[data-testid="component-name"]');

  // Take screenshot
  await expect(page.locator('[data-testid="component-name"]')).toHaveScreenshot(
    'component-name-default.png',
  );
});
```

## Accessibility Testing

### Using jest-axe

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Using Storybook a11y addon

1. Check the "Accessibility" tab in Storybook
2. Review violations and warnings
3. Fix issues before committing

## Debugging Failed Tests

### Jest Tests

```bash
# Run specific test file
pnpm test use-button.test.tsx

# Run in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Update snapshots
pnpm test -u
```

### Visual Tests

```bash
# Open Playwright UI
pnpm test:visual:ui

# Generate new baseline screenshots
pnpm test:visual --update-snapshots
```

## Coverage Reports

After running `pnpm test:coverage`:

1. Check terminal output for summary
2. Open `coverage/lcov-report/index.html` in browser
3. Review uncovered lines
4. Write tests to improve coverage

## Pre-commit Testing

Husky runs these checks automatically:

1. Lint staged files
2. Type check
3. Run tests for changed files

To skip (not recommended):

```bash
git commit --no-verify
```

## CI/CD Testing

GitHub Actions runs:

- Linting
- Type checking
- Unit tests with coverage
- Visual regression tests (Chromatic)
- Cross-browser testing

Check `.github/workflows/ci.yml` for details.

## Best Practices

1. **Write tests first** (TDD) or alongside code
2. **Test behavior, not implementation** - Focus on what users see/do
3. **Use meaningful test descriptions** - Describe expected behavior
4. **Keep tests isolated** - No shared state between tests
5. **Mock external dependencies** - Keep tests fast and reliable
6. **Aim for coverage thresholds** - But don't sacrifice quality for quantity
7. **Run tests before committing** - Catch issues early
8. **Update tests when changing code** - Keep tests in sync
9. **Use accessibility tests** - Ensure inclusive components
10. **Review coverage reports** - Find gaps in testing

## Troubleshooting

### Tests are slow

- Use `--maxWorkers=50%` to limit parallel execution
- Mock heavy dependencies
- Run specific test files during development

### Tests are flaky

- Add proper `waitFor` assertions
- Mock timers with `jest.useFakeTimers()`
- Ensure tests are isolated

### Coverage not meeting thresholds

- Identify uncovered code in coverage report
- Write tests for edge cases
- Remove dead code if not needed

### Visual tests failing in CI

- Regenerate baselines on CI environment
- Use Chromatic for consistent rendering
- Check for dynamic content (dates, animations)

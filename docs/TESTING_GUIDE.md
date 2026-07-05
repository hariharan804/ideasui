# Testing Guide

## 🚀 Quick Start

### Running Tests

```bash
# Run all unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Run visual regression tests
pnpm run test:visual

# Run visual tests with UI
pnpm run test:visual:ui

# Install Playwright browsers (first time only)
pnpm run playwright:install
```

## 🧪 Unit Testing with Vitest

### Writing Component Tests

Create test files in `__tests__/` folder:

```typescript
// packages/components/button/__tests__/button.test.tsx
import "@testing-library/jest-dom";
import type {UserEvent} from "@testing-library/user-event";
import {vi} from "vitest";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button} from "../src";

describe("Button", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<Button />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should trigger onClick function", async () => {
    const onClick = vi.fn();
    const {getByRole} = render(<Button onClick={onClick} />);

    await user.click(getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Test Patterns

#### Testing Props

```typescript
it("applies variant classes correctly", () => {
  render(<Button variant="outline">Outline Button</Button>);
  const button = screen.getByRole("button");
  expect(button).toHaveClass("border-2");
});
```

#### Testing Events

```typescript
it("handles click events", async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testing Refs

```typescript
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<Button ref={ref}>Button with ref</Button>);
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});
```

## 🎨 Visual Testing with Playwright

### Writing Visual Tests

Create `.spec.ts` files in component `__tests__/` folders:

```typescript
// packages/components/button/src/__tests__/button.spec.ts
import { test, expect } from '@playwright/test';

test('Button visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default');
  await expect(page.locator('[data-testid="button"]')).toHaveScreenshot('button-default.png');
});

test('Button variants visual regression', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--variants');
  await expect(page.locator('.storybook-button-variants')).toHaveScreenshot('button-variants.png');
});
```

### Visual Test Best Practices

1. **Use data-testid attributes** for reliable element selection
2. **Test all component variants** in separate test cases
3. **Use descriptive screenshot names** that include component and variant
4. **Wait for animations** to complete before taking screenshots

## 🔧 Common Testing Issues & Fixes

### Vitest Issues

#### Issue: "Cannot find name 'describe'"

Ensure the types are correctly loaded in `tsconfig.json` (under `compilerOptions.types`), or import them explicitly:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
```

#### Issue: "matchMedia is not a function"

Already handled globally in `vitest.setup.ts`:

```typescript
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
});
```

#### Issue: Tests timeout

Increase the timeout configuration in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    testTimeout: 35000,
  },
});
```

### Playwright Issues

#### Issue: "Browsers not installed"

```bash
# Fix: Install Playwright browsers
pnpm run playwright:install
```

#### Issue: "No tests found"

```bash
# Fix: Check testMatch pattern in playwright.config.ts
testMatch: ["**/packages/components/**/*.spec.ts"]
```

#### Issue: Screenshots don't match

```bash
# Fix: Update screenshots
pnpm run test:visual -- --update-snapshots
```

#### Issue: Storybook not running

```bash
# Fix: Start Storybook manually first
pnpm run storybook
# Then run visual tests in another terminal
pnpm run test:visual
```

## 📝 Writing Tests Checklist

### For Every Component:

- [ ] **Rendering test**: Component renders without crashing
- [ ] **Props test**: All props work as expected
- [ ] **Event test**: Click, focus, blur events work
- [ ] **Ref test**: Ref forwarding works correctly
- [ ] **Variant test**: All variants apply correct classes
- [ ] **Accessibility test**: Screen reader and keyboard navigation
- [ ] **Visual test**: Default and variant screenshots

### Test File Structure:

```
packages/components/button/__tests__/
├── button.test.tsx          # Unit tests
└── button.spec.ts           # Visual tests
```

## 🚨 Debugging Tests

### Debug Vitest Tests

```bash
# Run specific test file
pnpm run test packages/components/button/__tests__/button.test.tsx

# Run tests in watch mode
pnpm run test:watch

# Run single test by name
pnpm run test -t "should render correctly"
```

### Debug Playwright Tests

```bash
# Run with UI mode
pnpm run test:visual:ui

# Run specific test
pnpm run test:visual button.spec.ts

# Debug mode
pnpm run test:visual --debug
```

### Common Debug Commands

```bash
# Check test coverage
pnpm run test:coverage

# Run tests and watch for changes
pnpm run test:watch

# Lint test files
pnpm run lint packages/components/button/__tests__/
```

## 📊 Test Coverage

### Coverage Reports

```bash
# Generate coverage report
pnpm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

### Coverage Thresholds

Current thresholds in `vitest.config.ts`:

- Statements: 75% - 80% (varies by package)
- Branches: 65% - 70%
- Functions: 70% - 80%
- Lines: 75% - 80%

## 🎯 Testing Best Practices

1. **Test behavior, not implementation**
2. **Use descriptive test names**
3. **Keep tests simple and focused**
4. **Mock external dependencies**
5. **Test edge cases and error states**
6. **Use data-testid for reliable element selection**
7. **Clean up after tests (unmount, clear mocks)**
8. **Test accessibility with screen readers in mind**

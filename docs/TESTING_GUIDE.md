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

## 🧪 Unit Testing with Jest

### Writing Component Tests

Create test files in `src/__tests__/` folder:

```typescript
// packages/components/button/src/__tests__/button.test.tsx
import "@testing-library/jest-dom";
import type {UserEvent} from "@testing-library/user-event";
import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button} from "../button";

describe("Button", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<Button disableRipple />);
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should trigger onClick function", async () => {
    const onClick = jest.fn();
    const {getByRole} = render(<Button disableRipple onClick={onClick} />);

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
  const handleClick = jest.fn();
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

### Jest Issues

#### Issue: "Cannot find name 'describe'"

```bash
# Fix: Add @types/jest or configure Jest globals
pnpm add -D @types/jest
```

#### Issue: "matchMedia is not a function"

```typescript
// Fix: Already handled in scripts/setup-test.ts
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});
```

#### Issue: Tests timeout

```javascript
// Fix: Increase timeout in jest.config.js
module.exports = {
  testTimeout: 35000, // 35 seconds
};
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
testMatch: ["**/packages/components/**/src/__tests__/*.spec.ts"]
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
packages/components/button/src/__tests__/
├── button.test.tsx          # Unit tests
└── button.spec.ts           # Visual tests
```

## 🚨 Debugging Tests

### Debug Jest Tests

```bash
# Run specific test file
pnpm run test button.test.tsx

# Run tests in debug mode
pnpm run test --verbose

# Run single test
pnpm run test --testNamePattern="should render correctly"
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
pnpm run lint src/__tests__/
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

Current thresholds in `jest.config.js`:

- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## 🎯 Testing Best Practices

1. **Test behavior, not implementation**
2. **Use descriptive test names**
3. **Keep tests simple and focused**
4. **Mock external dependencies**
5. **Test edge cases and error states**
6. **Use data-testid for reliable element selection**
7. **Clean up after tests (unmount, clear mocks)**
8. **Test accessibility with screen readers in mind**

# 🧪 Complete Testing Documentation

Comprehensive testing guide for the Next.js 15+ Monorepo.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Test Types](#test-types)
3. [Commands Reference](#commands-reference)
4. [Writing Tests](#writing-tests)
5. [Configuration](#configuration)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)
8. [CI/CD Integration](#cicd-integration)

---

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Install Chrome browser for E2E tests
npm run test:e2e:install
```

### Run Tests

```bash
# Unit tests (watch mode)
npm test

# Unit tests (CI mode with coverage)
npm run test:ci

# E2E tests
npm run test:e2e

# E2E tests (UI mode)
npm run test:e2e:ui

# BDD tests
cd apps/web && npm run test:cucumber
```

---

## Test Types

### 1. Unit Tests (Jest + React Testing Library)

**Purpose:** Test individual components, hooks, and functions

**Location:**

- `packages/*/components/**/*.test.tsx` - Component tests
- `packages/*/hooks/**/*.test.ts` - Hook tests
- `apps/web/src/**/__tests__/` - App tests

**Configuration:**

- Base: `configs/jest-config/jest.config.js`
- Coverage: 70% minimum threshold
- Environment: jsdom

**Example:**

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. E2E Tests (Playwright)

**Purpose:** Test complete user flows across the application

**Location:** `apps/web/e2e/*.spec.ts`

**Configuration:**

- Base: `configs/playwright-config/playwright.config.ts`
- Browser: Chrome (via channel)
- Features: Screenshots, videos, traces on failure

**Example:**

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Theme');
  await expect(page).toHaveURL('/theme');
});
```

### 3. BDD Tests (Cucumber)

**Purpose:** Test business scenarios in human-readable format

**Location:**

- Features: `apps/web/e2e/features/*.feature`
- Steps: `apps/web/e2e/steps/*.steps.ts`
- Shared: `configs/cucumber-config/steps/*.steps.ts`

**Example Feature:**

```gherkin
Feature: User Login
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should see the dashboard
```

**Example Steps:**

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the login page', async function () {
  await this.page.goto('/login');
});

When('I enter valid credentials', async function () {
  await this.page.fill('[name="email"]', 'user@example.com');
  await this.page.fill('[name="password"]', 'password123');
});
```

---

## Commands Reference

### Global Commands (from root)

```bash
# Unit Tests
npm test                          # Watch mode
npm run test:ci                   # CI mode with coverage
npm run test:a11y                 # Accessibility tests

# E2E Tests
npm run test:e2e                  # Run all E2E tests
npm run test:e2e:ui               # UI mode
npm run test:e2e:debug            # Debug mode
npm run test:e2e:install          # Install Chrome
npm run test:e2e:install:all      # Install all browsers

# Specific App
npm test --filter web             # Web app tests
npm run test:e2e --filter web     # Web app E2E
```

### App-Specific Commands

```bash
cd apps/web

# Unit Tests
npm test                          # Watch mode
npm run test:ci                   # CI mode

# E2E Tests
npm run test:e2e                  # Headless
npm run test:e2e:ui               # UI mode
npm run test:e2e:debug            # Debug mode
npm run test:e2e:install          # Install Chrome

# BDD Tests
npm run test:cucumber             # Run features
npm run test:cucumber:report      # With HTML report
```

---

## Writing Tests

### Unit Test Structure

```typescript
describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    // Common setup
  });

  // Test cases
  it('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = doSomething(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

### E2E Test Structure

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform action', async ({ page }) => {
    await page.click('button');
    await expect(page.locator('.result')).toBeVisible();
  });
});
```

### BDD Feature Structure

```gherkin
Feature: Feature Name
  Background:
    Given common setup step

  Scenario: Scenario name
    Given initial state
    When action is performed
    Then expected result

  Scenario Outline: Data-driven test
    Given I have <input>
    When I process it
    Then I get <output>

    Examples:
      | input | output |
      | 1     | 2      |
      | 2     | 4      |
```

---

## Configuration

### Jest Configuration

**Base Config:** `configs/jest-config/jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: { jsx: 'react', esModuleInterop: true },
      },
    ],
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

**Package Config:** `packages/*/jest.config.js`

```javascript
module.exports = {
  ...require('@i2l/jest-config'),
};
```

### Playwright Configuration

**Base Config:** `configs/playwright-config/playwright.config.ts`

```typescript
export default defineConfig({
  testDir: '../../apps/web/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
```

### Cucumber Configuration

**Config:** `apps/web/cucumber.config.js`

```javascript
module.exports = {
  default: {
    require: ['e2e/steps/**/*.ts', '../../configs/cucumber-config/steps/**/*.ts'],
    format: ['progress', 'html:e2e/reports/cucumber-report.html'],
    parallel: 2,
  },
};
```

---

## Best Practices

### Unit Tests

✅ **Do:**

- Test one thing per test
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Aim for 80%+ coverage

❌ **Don't:**

- Test implementation details
- Test third-party libraries
- Write tests that depend on each other
- Use timeouts/delays

### E2E Tests

✅ **Do:**

- Test critical user flows
- Use proper waits (`waitForSelector`)
- Test across browsers
- Keep tests independent
- Use Page Object Model

❌ **Don't:**

- Test every edge case
- Rely on timing/delays
- Use brittle selectors
- Make tests dependent on each other

### BDD Tests

✅ **Do:**

- Write features in business language
- Reuse step definitions
- Keep scenarios focused
- Use Background for common setup
- Use Scenario Outline for data-driven tests

❌ **Don't:**

- Write technical details in features
- Duplicate step definitions
- Make scenarios too complex
- Test implementation details

---

## Troubleshooting

### Chrome not installed

**Error:** `Executable doesn't exist`

**Fix:**

```bash
npm run test:e2e:install
```

### Port 3000 already in use

**Fix:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in playwright.config.ts
baseURL: 'http://localhost:3001'
```

### Tests timeout

**Fix:**

```typescript
// Increase timeout
test.setTimeout(60000);

// Use proper waits
await page.waitForLoadState('networkidle');
```

### Module not found

**Fix:**

```bash
npm install
npm run clean
npm install
```

### Jest cache issues

**Fix:**

```bash
npm test -- --clearCache
```

---

## CI/CD Integration

### GitHub Actions

Tests run automatically on:

- ✅ Pull requests
- ✅ Push to main branch
- ✅ Manual workflow dispatch

**Workflow:**

```yaml
- name: Install dependencies
  run: npm install

- name: Install browsers
  run: npm run test:e2e:install

- name: Run unit tests
  run: npm run test:ci

- name: Run E2E tests
  run: npm run test:e2e

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

### Pre-commit Hooks

Tests run via Husky before commits:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "npm test -- --bail --findRelatedTests"]
  }
}
```

---

## Test Coverage

### View Coverage

```bash
npm run test:ci
open coverage/index.html
```

### Coverage Goals

- **Statements:** 70%+
- **Branches:** 70%+
- **Functions:** 70%+
- **Lines:** 70%+

### Coverage Reports

- **Location:** `coverage/`
- **Format:** HTML, JSON, LCOV
- **CI:** Uploaded to Codecov

---

## Debugging

### Jest

```bash
# Debug in VS Code
# Add breakpoint, then run: "Jest: Debug"

# Debug in terminal
node --inspect-brk node_modules/.bin/jest --runInBand

# Run specific test
npm test -- Button.test.tsx
```

### Playwright

```bash
# Debug mode (opens browser)
npm run test:e2e:debug

# UI mode (interactive)
npm run test:e2e:ui

# Headed mode (see browser)
npx playwright test --headed

# View trace
npx playwright show-trace trace.zip
```

### Cucumber

```bash
# Run specific feature
npx cucumber-js e2e/features/login.feature

# Run specific scenario (line number)
npx cucumber-js e2e/features/login.feature:10

# Debug with breakpoints
node --inspect-brk node_modules/.bin/cucumber-js
```

---

## Test Artifacts

### Screenshots

- **When:** On test failure
- **Location:** `test-results/`
- **Format:** PNG

### Videos

- **When:** On test failure
- **Location:** `test-results/`
- **Format:** WebM

### Traces

- **When:** On first retry
- **Location:** `test-results/`
- **View:** `npx playwright show-trace trace.zip`

### Reports

- **Jest:** `coverage/index.html`
- **Playwright:** `playwright-report/index.html`
- **Cucumber:** `e2e/reports/cucumber-report.html`

---

## Performance

### Unit Tests

- **Parallel:** Yes (default)
- **Workers:** CPU cores - 1
- **Time:** ~1-2 minutes

### E2E Tests

- **Parallel:** Yes (configurable)
- **Workers:** 1 in CI, unlimited locally
- **Time:** ~5-10 minutes

---

## Quick Reference

| Test Type | Command                 | Location                 | Purpose                  |
| --------- | ----------------------- | ------------------------ | ------------------------ |
| Unit      | `npm test`              | `**/*.test.tsx`          | Component/function tests |
| E2E       | `npm run test:e2e`      | `e2e/*.spec.ts`          | User flow tests          |
| BDD       | `npm run test:cucumber` | `e2e/features/*.feature` | Business scenario tests  |

---

## Resources

- **Jest:** https://jestjs.io/
- **Playwright:** https://playwright.dev/
- **Cucumber:** https://cucumber.io/docs/cucumber/
- **Testing Library:** https://testing-library.com/
- **Shared Configs:** `configs/*/README.md`

---

## Summary

✅ **Unit Tests** - Jest + React Testing Library  
✅ **E2E Tests** - Playwright (Chrome)  
✅ **BDD Tests** - Cucumber + Playwright  
✅ **Coverage** - 70% minimum threshold  
✅ **CI/CD** - Automated on every PR  
✅ **Artifacts** - Screenshots, videos, reports

**Enterprise testing setup complete!** 🎉

---

**Last Updated:** January 2025

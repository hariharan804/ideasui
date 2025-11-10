# Testing Strategy

## 🧪 Testing Approach

### Testing Pyramid

1. **Unit Tests** - Component logic and utilities
2. **Integration Tests** - Component interactions
3. **Visual Tests** - UI consistency and regression
4. **Accessibility Tests** - A11y compliance
5. **E2E Tests** - Real-world usage scenarios

## ⚙️ Testing Setup

### Vitest Configuration

#### `packages/ui/vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

#### `src/test/setup.ts`
```typescript
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

### Dependencies

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## 🔬 Unit Testing

### Component Test Example

#### `__tests__/Button.test.tsx`
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../src/components/ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-destructive')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('supports asChild prop', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole('link')).toBeInTheDocument()
  })
})
```

### Utility Function Tests

#### `__tests__/utils.test.ts`
```typescript
import { cn } from '../src/lib/utils'

describe('cn utility', () => {
  it('merges classes correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional')
    expect(cn('base', false && 'conditional')).toBe('base')
  })

  it('handles Tailwind conflicts', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })
})
```

## 🎨 Visual Testing

### Storybook Test Runner

```bash
pnpm add -D @storybook/test-runner
```

#### `package.json`
```json
{
  "scripts": {
    "test-storybook": "test-runner",
    "test-storybook:ci": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"pnpm build-storybook --quiet && npx http-server storybook-static --port 6006 --silent\" \"wait-on tcp:6006 && pnpm test-storybook\""
  }
}
```

### Chromatic Integration

```bash
pnpm add -D chromatic
```

#### `package.json`
```json
{
  "scripts": {
    "chromatic": "chromatic --exit-zero-on-changes"
  }
}
```

### Visual Regression Tests

#### `.storybook/test-runner.ts`
```typescript
import type { TestRunnerConfig } from '@storybook/test-runner'
import { checkA11y, injectAxe } from 'axe-playwright'

const config: TestRunnerConfig = {
  async preRender(page) {
    await injectAxe(page)
  },
  async postRender(page) {
    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  },
}

export default config
```

## ♿ Accessibility Testing

### Automated A11y Tests

```bash
pnpm add -D @axe-core/playwright axe-playwright
```

#### `__tests__/accessibility.test.tsx`
```typescript
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../src/components/ui/button'

expect.extend(toHaveNoViolations)

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('supports keyboard navigation', async () => {
    render(<Button>Keyboard Button</Button>)
    const button = screen.getByRole('button')
    
    button.focus()
    expect(button).toHaveFocus()
    
    await user.keyboard('{Enter}')
    // Test button activation
  })
})
```

## 🔄 Integration Testing

### Component Composition Tests

#### `__tests__/integration/Form.test.tsx`
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, Input, Card } from '../../src'

describe('Form Integration', () => {
  it('handles form submission flow', async () => {
    const handleSubmit = vi.fn()
    const user = userEvent.setup()

    render(
      <Card>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Enter name" name="name" />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    )

    await user.type(screen.getByPlaceholderText('Enter name'), 'John Doe')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(handleSubmit).toHaveBeenCalled()
  })
})
```

## 📊 Test Coverage

### Coverage Configuration

#### `vitest.config.ts`
```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.stories.tsx',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
})
```

### Coverage Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch"
  }
}
```

## 🚀 CI/CD Testing

### GitHub Actions Test Workflow

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
      - run: pnpm test-storybook:ci
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

## 📋 Testing Checklist

### Component Testing
- [ ] Renders correctly
- [ ] Props work as expected
- [ ] Event handlers function
- [ ] Ref forwarding works
- [ ] Variants apply correctly
- [ ] Accessibility compliance
- [ ] Keyboard navigation
- [ ] Error boundaries

### Integration Testing
- [ ] Component composition
- [ ] State management
- [ ] Context providers
- [ ] Form interactions
- [ ] Navigation flows

### Visual Testing
- [ ] All stories render
- [ ] No visual regressions
- [ ] Responsive design
- [ ] Dark mode support
- [ ] Cross-browser compatibility
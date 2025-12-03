# @ideasui/jest-config

Shared Jest configuration and testing utilities for the monorepo.

## Installation

```bash
npm install --save-dev @ideasui/jest-config
```

## Usage

### Jest Configuration

Create `jest.config.js` in your package:

```js
module.exports = {
  ...require('@ideasui/jest-config/jest.config.js'),
};
```

### Test Utils

```js
// React testing utilities
import { renderWithProviders, userEvent } from '@ideasui/jest-config/test-utils/react';

// Hook testing utilities
import { renderHookWithProviders } from '@ideasui/jest-config/test-utils/hooks';

// Mock utilities
import { mockUser, mockApiResponse, mockLocalStorage } from '@ideasui/jest-config/test-utils/mocks';

// Common utilities
import { sleep, waitFor, testId, getByTestId } from '@ideasui/jest-config/test-utils';
```

## Features

### Jest Config

- ✅ TypeScript support (ts-jest)
- ✅ jsdom environment for React testing
- ✅ Path aliases (`@/...`)
- ✅ CSS module mocking
- ✅ 70% coverage threshold
- ✅ Auto setup with @testing-library/jest-dom

### Test Utils

- ✅ React component testing with providers
- ✅ Hook testing utilities
- ✅ Mock data generators
- ✅ API mocking helpers
- ✅ Browser API mocks (localStorage, fetch, etc.)
- ✅ Accessibility testing helpers
- ✅ Common test utilities (sleep, waitFor, testId)

## Examples

```js
// Component testing
import { renderWithProviders, screen } from '@ideasui/jest-config/test-utils/react';

test('renders component', () => {
  renderWithProviders(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

// Hook testing
import { renderHookWithProviders } from '@ideasui/jest-config/test-utils/hooks';

test('custom hook', () => {
  const { result } = renderHookWithProviders(() => useMyHook());
  expect(result.current.value).toBe('expected');
});

// Mock usage
import { mockUser, mockApiResponse } from '@ideasui/jest-config/test-utils/mocks';

const user = mockUser({ name: 'John Doe' });
const response = await mockApiResponse({ data: user });
```

## Customization

Override any config:

```js
module.exports = {
  ...require('@ideasui/jest-config/jest.config.js'),
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

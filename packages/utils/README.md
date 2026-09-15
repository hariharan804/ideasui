# @ideasui/utils

Shared utility functions, accessibility helpers, and performance-optimized tools for the **IdeasUI** ecosystem.

[![NPM Version](https://img.shields.io/npm/v/@ideasui/utils.svg)](https://www.npmjs.com/package/@ideasui/utils)
[![License](https://img.shields.io/npm/l/@ideasui/utils.svg)](https://github.com/ideas2logic-lab/ideasui/blob/master/LICENSE)

## 📦 Installation

```bash
npm install @ideasui/utils
# or
pnpm add @ideasui/utils
# or
yarn add @ideasui/utils
```

## 🚀 Usage

```tsx
import { cn, formatBytes, debounce } from '@ideasui/utils';

// Combine class names
const className = cn('base-class', condition && 'conditional-class', 'another-class');

// Format file sizes
const size = formatBytes(1024); // "1 KB"

// Debounce function calls
const debouncedSearch = debounce((query: string) => {
  // Search logic
}, 300);
```

## 📚 API Reference

### Class Name Utilities

#### `cn(...classes)`

Combines class names with conditional logic support.

```tsx
import { cn } from '@ideasui/utils';

// Basic usage
cn('btn', 'btn-primary'); // "btn btn-primary"

// With conditionals
cn('btn', isActive && 'btn-active', 'btn-large'); // "btn btn-active btn-large"

// With objects
cn('btn', { 'btn-active': isActive, 'btn-disabled': disabled });
```

### String Utilities

#### `capitalize(str: string)`

Capitalizes the first letter of a string.

```tsx
capitalize('hello world'); // "Hello world"
```

#### `kebabCase(str: string)`

Converts string to kebab-case.

```tsx
kebabCase('HelloWorld'); // "hello-world"
kebabCase('hello_world'); // "hello-world"
```

#### `camelCase(str: string)`

Converts string to camelCase.

```tsx
camelCase('hello-world'); // "helloWorld"
camelCase('hello_world'); // "helloWorld"
```

### Number Utilities

#### `formatBytes(bytes: number, decimals?: number)`

Formats bytes into human-readable file sizes.

```tsx
formatBytes(1024); // "1 KB"
formatBytes(1048576); // "1 MB"
formatBytes(1073741824, 2); // "1.00 GB"
```

#### `clamp(value: number, min: number, max: number)`

Clamps a number between min and max values.

```tsx
clamp(5, 0, 10); // 5
clamp(-5, 0, 10); // 0
clamp(15, 0, 10); // 10
```

#### `randomBetween(min: number, max: number)`

Generates a random number between min and max.

```tsx
randomBetween(1, 10); // Random number between 1 and 10
```

### Function Utilities

#### `debounce<T>(func: T, delay: number)`

Creates a debounced version of a function.

```tsx
const debouncedSave = debounce((data: any) => {
  saveToAPI(data);
}, 500);

// Will only call saveToAPI after 500ms of no calls
debouncedSave(formData);
```

#### `throttle<T>(func: T, limit: number)`

Creates a throttled version of a function.

```tsx
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);

// Will call handleScroll at most once every 100ms
window.addEventListener('scroll', throttledScroll);
```

#### `once<T>(func: T)`

Creates a function that can only be called once.

```tsx
const initialize = once(() => {
  console.log('Initialized!');
});

initialize(); // "Initialized!"
initialize(); // Nothing happens
```

### Object Utilities

#### `pick<T, K>(obj: T, keys: K[])`

Creates an object with only the specified keys.

```tsx
const user = { name: 'John', age: 30, email: 'john@example.com' };
const publicUser = pick(user, ['name', 'age']); // { name: 'John', age: 30 }
```

#### `omit<T, K>(obj: T, keys: K[])`

Creates an object without the specified keys.

```tsx
const user = { name: 'John', age: 30, password: 'secret' };
const safeUser = omit(user, ['password']); // { name: 'John', age: 30 }
```

#### `deepMerge<T>(target: T, source: Partial<T>)`

Deep merges two objects.

```tsx
const defaults = { theme: { colors: { primary: 'blue' } } };
const custom = { theme: { colors: { secondary: 'red' } } };
const merged = deepMerge(defaults, custom);
// { theme: { colors: { primary: 'blue', secondary: 'red' } } }
```

### Array Utilities

#### `unique<T>(array: T[])`

Returns array with unique values.

```tsx
unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
unique(['a', 'b', 'b', 'c']); // ['a', 'b', 'c']
```

#### `chunk<T>(array: T[], size: number)`

Splits array into chunks of specified size.

```tsx
chunk([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
chunk(['a', 'b', 'c', 'd', 'e'], 3); // [['a', 'b', 'c'], ['d', 'e']]
```

#### `shuffle<T>(array: T[])`

Returns a shuffled copy of the array.

```tsx
shuffle([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4] (random order)
```

### Validation Utilities

#### `isEmail(email: string)`

Validates email format.

```tsx
isEmail('user@example.com'); // true
isEmail('invalid-email'); // false
```

#### `isUrl(url: string)`

Validates URL format.

```tsx
isUrl('https://example.com'); // true
isUrl('not-a-url'); // false
```

#### `isEmpty(value: any)`

Checks if value is empty.

```tsx
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty('hello'); // false
```

### Date Utilities

#### `formatDate(date: Date, format?: string)`

Formats date to string.

```tsx
formatDate(new Date()); // "2024-01-15"
formatDate(new Date(), 'MM/dd/yyyy'); // "01/15/2024"
```

#### `timeAgo(date: Date)`

Returns human-readable time difference.

```tsx
timeAgo(new Date(Date.now() - 60000)); // "1 minute ago"
timeAgo(new Date(Date.now() - 3600000)); // "1 hour ago"
```

### Browser Utilities

#### `copyToClipboard(text: string)`

Copies text to clipboard.

```tsx
await copyToClipboard('Hello, World!');
```

#### `downloadFile(data: string, filename: string, type?: string)`

Downloads data as a file.

```tsx
downloadFile('Hello, World!', 'hello.txt', 'text/plain');
```

#### `getStorageItem<T>(key: string, defaultValue: T)`

Gets item from localStorage with type safety.

```tsx
const theme = getStorageItem('theme', 'light'); // string
const settings = getStorageItem('settings', { notifications: true }); // object
```

#### `setStorageItem<T>(key: string, value: T)`

Sets item in localStorage with serialization.

```tsx
setStorageItem('theme', 'dark');
setStorageItem('user', { name: 'John', age: 30 });
```

## 🎯 TypeScript Support

All utilities are fully typed with TypeScript for the best developer experience:

```tsx
import { cn, pick, debounce } from '@ideasui/utils';

// Type-safe class name combining
const className: string = cn('btn', true && 'active');

// Type-safe object picking
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = { name: 'John', age: 30, email: 'john@example.com' };
const picked: Pick<User, 'name' | 'age'> = pick(user, ['name', 'age']);

// Type-safe function debouncing
const debouncedFn = debounce((x: number, y: string) => {
  console.log(x, y);
}, 300);
```

## 🧪 Testing

All utilities include comprehensive tests:

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📄 License

MIT © [IdeasUI](https://ideasui.com)

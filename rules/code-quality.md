# Code Quality Rules

## 🎯 Performance Standards (Enforced)

These standards are actively enforced via ESLint to ensure code maintainability.

### Metrics:

- **Max 150 lines** per function (`max-lines-per-function`)
- **Max 500 lines** per file (`max-lines`)
- **Max 6 parameters** per function (`max-params`)
- **Max cyclomatic complexity: 25** (`complexity`)
- **Cognitive complexity: max 20** (`sonarjs/cognitive-complexity`)
- **Max nesting depth: 4 levels**

## 🔧 Modern JavaScript/TypeScript

### Required Patterns:

```tsx
// ✅ Use const for immutable values
const buttonVariants = tv({...})

// ✅ Use template literals
const message = `Hello ${name}`

// ✅ Use optional chaining
const value = user?.profile?.name

// ✅ Use nullish coalescing
const name = user.name ?? 'Anonymous'

// ✅ Use object shorthand
const config = { name, value }

// ✅ Use destructuring
const { variant, size, ...props } = buttonProps
```

### Avoid:

```tsx
// ❌ Don't use var
var buttonType = 'primary';

// ❌ Don't use string concatenation
const message = 'Hello ' + name;

// ❌ Don't use && for null checks
const name = user.name || 'Anonymous';

// ❌ Don't use nested ternaries
const result = a ? b : c ? d : e;
```

## 🛡️ Security Standards

### Required Checks:

- No `eval()` or `Function()` constructors
- Validate all user inputs
- Sanitize HTML content
- Use safe regex patterns
- Prevent prototype pollution

### Examples:

```tsx
// ✅ Safe object access
const value = obj[key]; // Only if key is validated

// ✅ Safe regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ❌ Dangerous patterns
const fn = new Function('return ' + userInput); // Never do this
const result = eval(userCode); // Never do this
```

## 📦 Import Management

### Import Order:

1. Type imports
2. Built-in modules
3. Object imports
4. External packages (including `~/**`)
5. Internal packages (`@ideasui/*`)
6. Parent imports
7. Sibling imports
8. Index imports

### Examples:

```tsx
// ✅ Correct order
import { useState } from 'react';

import { clsx } from 'clsx';
import { tv } from 'tailwind-variants';

import { cn } from '@ideasui/utils';
import { buttonVariants } from '@ideasui/variants';

import { Icon } from './icon';
```

## ⚛️ React Best Practices

### Component Patterns:

```tsx
// ✅ Use forwardRef for components
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';

// ✅ Use proper keys in lists
{
  items.map((item) => <div key={item.id}>{item.name}</div>);
}

// ✅ Include all dependencies in useEffect
useEffect(() => {
  fetchData(userId);
}, [userId, fetchData]);
```

### Avoid:

```tsx
// ❌ Don't use array index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ❌ Don't forget dependencies
useEffect(() => {
  fetchData(userId)
}, []) // Missing userId dependency

// ❌ Don't use unnecessary braces
<Component name={"John"} />
// Use: <Component name="John" />
```

## 🎨 Styling Standards

### Tailwind CSS Rules:

- Use `cn()` utility for class merging
- Order classes automatically with prettier-plugin-tailwindcss
- No contradicting classes (p-4 p-2)
- Use design tokens from @ideasui/variants

### Examples:

```tsx
// ✅ Good class usage
<div className={cn(
  'flex items-center justify-center',
  'bg-white border border-gray-200',
  'rounded-lg shadow-sm',
  className
)} />

// ❌ Contradicting classes
<div className="p-4 p-2 bg-white bg-gray-100" />
```

## 🧪 Testing Requirements

### Test Coverage:

- Minimum 80% code coverage
- Test all component variants
- Test user interactions
- Test error states

### Test Patterns:

```tsx
// ✅ Good test structure
describe('Button', () => {
  it('renders with correct variant classes', () => {
    render(<Button variant="outline">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📝 Documentation Standards

### Required Documentation:

- JSDoc comments for all public APIs
- README with usage examples
- Storybook stories for all variants
- Type definitions with descriptions

### Examples:

````tsx
/**
 * Button component for user interactions
 *
 * @param variant - Visual style variant
 * @param size - Size of the button
 * @param children - Button content
 *
 * @example
 * ```tsx
 * <Button variant="outline" size="lg">
 *   Large Outline Button
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** Visual style variant */
  variant?: 'solid' | 'outline' | 'ghost';
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
````

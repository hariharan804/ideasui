# Component Development Rules

## 🏗️ Component Structure

### File Organization

```
packages/components/button/
├── src/
│   ├── button.tsx         # Main component
│   ├── use-button.ts      # Component hook (optional)
│   ├── button.types.ts    # Types (optional, can be in main file)
│   └── index.ts           # Public exports
├── __tests__/
│   └── button.test.tsx
├── stories/
│   └── button.stories.tsx
├── package.json
└── tsconfig.json
```

## 📦 Dependencies

### Allowed Dependencies

Components can import from:

- `@ideasui/theme` - Recipes and tokens
- `@ideasui/utils` - Utility functions
- `@ideasui/hooks` - React hooks
- `@ideasui/ripple` - Ripple effect
- `react-aria` - Accessibility primitives

### Forbidden

- ❌ Direct CSS imports (use theme system)
- ❌ Cross-component imports (use published packages)
- ❌ Global state libraries

## 🎨 Styling with Recipes

### Recipe Usage

```tsx
import {button} from "@ideasui/theme/recipes";
import {cn} from "@ideasui/utils";

const Button = ({variant, color, size, className, ...props}) => {
  const {base, icon} = button({variant, color, size});

  return (
    <button className={cn(base(), className)} {...props}>
      {startIcon && <span className={icon()}>{startIcon}</span>}
      {children}
    </button>
  );
};
```

### Custom Variants

If needed, extend recipes in the theme package, not in components.

## ♿ Accessibility

### Required Patterns

```tsx
// ✅ Always use forwardRef
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...);

// ✅ Add displayName
Button.displayName = "Button";

// ✅ Spread remaining props
<button {...props} />

// ✅ Use semantic HTML
<button type="button" /> // not <div role="button">
```

### React Aria Integration

```tsx
import {useButton} from "react-aria";

const {buttonProps} = useButton(props, ref);
return <button {...buttonProps} />;
```

## 🧪 Testing

### Required Tests

- Render test
- Props test
- Accessibility test (jest-axe)
- Keyboard interaction test

```tsx
describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("has no a11y violations", async () => {
    const {container} = render(<Button>Click</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

## 📝 Documentation

### Storybook Stories

Every component needs stories showing:

- Default state
- All variants
- All sizes
- Interactive example
- Accessibility notes

# Component Development Rules

## 🎯 Core Principles

- Use `React.forwardRef` and set `displayName` for all components.
- Use `tv()` (tailwind-variants) for styling and `cn()` for merging classes.
- JSDoc required for all public props.
- Separate concerns: component, types, variants, and tests.
- Support standard variants: primary, secondary, success, warning, danger.
- Include size variants: xs, sm, md, lg, xl.
- Max 50 lines per function, 300 lines per file.

## 🏗️ Structure & File Organization

### Package structure:

```
packages/components/button/
├── src/
│   ├── button.tsx         # Main component
│   ├── use-button.ts      # Component hook (optional)
│   ├── button.types.ts    # Types (optional)
│   └── index.ts           # Public exports (barrel export)
├── __tests__/
│   └── button.test.tsx    # Unit tests
├── stories/
│   └── button.stories.tsx # Storybook stories
├── package.json
├── README.md
└── tsconfig.json
```

### Required Exports:

- Main component (using `forwardRef`).
- TypeScript interfaces/types.
- Variant definitions (if extracted).
- Default props.

## 📦 Dependencies

### Allowed

- `@ideasui/theme` - Recipes, tokens, and styling.
- `@ideasui/utils` - Utility functions (like `cn`).
- `@ideasui/hooks` - Shared React hooks.
- `react-aria` / `@react-aria/*` - Accessibility primitives.

### Forbidden

- ❌ Direct CSS imports (use the Tailwind theme system).
- ❌ Circular dependencies between packages.
- ❌ Direct imports from other components' `src/` (always use `@ideasui/<package>`).

## 🎨 Styling & Recipes

Use `tv()` from `tailwild-variants` to manage component styles. Prefer using recipes from `@ideasui/theme/recipes`.

```tsx
import { button } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, color, size, className, ...otherProps } = props;
  const { base, icon } = button({ variant, color, size });

  return (
    <button ref={ref} className={cn(base(), className)} {...otherProps}>
      {children}
    </button>
  );
});

Button.displayName = 'IdeasUI.Button';
```

## ♿ Accessibility (WCAG 2.1 AA)

- Use semantic HTML (e.g., `<button>` for actions, `<a>` for links).
- Use `react-aria` hooks for complex interaction patterns.
- Ensure proper ARIA labels for non-text triggers.
- Minimum color contrast of 4.5:1.
- Full keyboard navigation and focus management.

## 🧪 Testing Requirements

- Use `@testing-library/react` and `vitest`.
- **Interaction tests**: Simulate user events and keyboard navigation using `user-event`.
- **Accessibility tests**: Verify with Storybook `a11y` addon and manual checks.
- Coverage minimum: 80%.
- Maintain snapshot tests sparingly, only for stable UI structures.

## 📝 Documentation

- **JSDoc**: Add comments to all public props for IDE intellisense.
- **Storybook**: Every component needs stories showing:
  - Default state
  - All variants and sizes
  - Interactive examples
- **README**: Usage examples and installation instructions.

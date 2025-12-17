# Component Development Rules

## 🎯 Core Principles

### Component Structure

- Use `React.forwardRef` for all components
- Export component and variants from same file
- Include TypeScript interfaces with JSDoc
- Implement proper `displayName` for debugging

### Styling Standards

- Use `tailwind-variants` for variant systems
- Import from `@ideasui/variants` for consistency
- Support all color variants: primary, secondary, success, warning, danger
- Include size variants: xs, sm, md, lg, xl
- Implement radius variants: none, sm, md, lg, xl, full

### File Organization

- Components in `packages/components/<name>/`
- Primitives in `packages/primitives/<name>/`
- Use kebab-case for all file and folder names
- Separate concerns: component, types, variants, tests

### Code Quality

- Max 50 lines per function
- Max 300 lines per file
- Use TypeScript strict mode
- Include comprehensive tests
- Follow accessibility guidelines (WCAG 2.1)

## 📦 Package Structure

```
packages/components/button/
├── src/
│   ├── button.tsx          # Main component
│   ├── button-types.ts     # TypeScript interfaces
│   ├── index.ts            # Exports
│   └── __tests__/
│       └── button.test.tsx # Tests
├── package.json
├── README.md
└── tsconfig.json
```

## 🔧 Required Exports

Every component package must export:

- Main component with forwardRef
- TypeScript interfaces
- Variant definitions
- Default props

## ♿ Accessibility Requirements

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance (4.5:1 minimum)

## 🧪 Testing Requirements

- Unit tests with @testing-library/react
- Accessibility tests with jest-axe
- Visual regression tests in Storybook
- Coverage minimum 80%

## 📝 Documentation Standards

- README with usage examples
- Storybook stories for all variants
- JSDoc comments for all props
- API documentation in docs/

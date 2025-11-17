# Component Template

Standard structure for all components in `packages/{component}`:

```
packages/{component}/
├── src/
│   ├── {component}.tsx         # Main component
│   ├── __tests__/
│   │   └── {component}.test.tsx # Tests
│   ├── lib/
│   │   └── utils.ts            # Component utilities
│   └── index.ts                # Exports
├── package.json                # Component package
├── tsconfig.json              # TypeScript config
├── rollup.config.js           # Build config
└── jest.config.js             # Test config
```

## Naming Convention

- **Package**: `@your-org/{component}` (lowercase)
- **Folder**: `packages/{component}` (lowercase)
- **Component**: `{Component}` (PascalCase)
- **Files**: `{component}.tsx` (lowercase)

## Example

```
packages/button/
├── src/
│   ├── button.tsx          # Main component
│   ├── __tests__/
│   │   └── button.test.tsx
│   └── index.ts            # export { Button }
└── package.json (name: "@your-org/button")
```
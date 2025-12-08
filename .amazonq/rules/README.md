# IdeasUI Development Rules

This directory contains comprehensive rules and guidelines for developing IdeasUI components. These rules are designed to be used by both developers and AI agents to ensure consistency, quality, and maintainability across the entire component library.

## 📋 Rule Categories

### 🎯 [Component Development](./component-development.md)
Core principles for building React components including:
- Component structure and patterns
- Styling standards with Tailwind CSS
- File organization and naming
- Code quality requirements
- Accessibility guidelines

### 🏷️ [Naming Conventions](./naming-conventions.md)
Comprehensive naming rules for:
- File and folder naming (kebab-case)
- Variable and function naming (camelCase)
- Component and type naming (PascalCase)
- Constants and environment variables (SCREAMING_SNAKE_CASE)
- Package naming patterns

### 🔧 [Code Quality](./code-quality.md)
Standards for maintaining high code quality:
- Performance guidelines
- Modern JavaScript/TypeScript patterns
- Security best practices
- Import management
- React best practices
- Testing requirements

### ♿ [Accessibility](./accessibility.md)
WCAG 2.1 AA compliance requirements:
- Keyboard navigation support
- Screen reader compatibility
- Color contrast standards
- Semantic HTML usage
- ARIA attributes
- Focus management

### 📦 [Package Structure](./package-structure.md)
Guidelines for organizing packages:
- Package categories and organization
- Standard file structures
- Build and configuration requirements
- Dependency management
- Documentation standards
- Publishing guidelines

## 🤖 For AI Agents

These rules are specifically designed to help AI agents understand:

1. **What to build**: Component patterns, structures, and requirements
2. **How to build it**: Coding standards, naming conventions, and best practices
3. **Where to put it**: File organization and package structure
4. **How to test it**: Testing patterns and accessibility requirements
5. **How to document it**: Documentation standards and examples

## 👨‍💻 For Developers

Use these rules as:

1. **Reference guide**: Quick lookup for naming conventions and patterns
2. **Code review checklist**: Ensure all requirements are met
3. **Onboarding material**: Learn IdeasUI development standards
4. **Quality assurance**: Maintain consistency across the codebase

## 🔄 Rule Updates

These rules are living documents that should be updated as the project evolves:

- Add new patterns as they emerge
- Update standards based on community feedback
- Refine guidelines based on real-world usage
- Keep rules aligned with industry best practices

## 📚 Additional Resources

- [Main README](../README.md) - Project overview and quick start
- [Component Guidelines](../docs/COMPONENT_GUIDELINES.md) - Detailed component development guide
- [Naming Conventions](../docs/NAMING_CONVENTIONS.md) - Extended naming rules
- [Package Guide](../packages/GUIDE.md) - Monorepo package development guide

## 🎯 Quick Reference

### File Naming:
- Components: `button.tsx`
- Types: `button-types.ts`
- Tests: `button.test.tsx`
- Stories: `button.stories.tsx`

### Component Pattern:
```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
```

### Package Structure:
```
packages/components/button/
├── src/
│   ├── button.tsx
│   ├── button-types.ts
│   ├── index.ts
│   └── __tests__/button.test.tsx
├── package.json
├── README.md
└── tsconfig.json
```
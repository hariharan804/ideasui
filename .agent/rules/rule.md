---
trigger: always_on
---

# IdeasUI AGENT RULES

You MUST follow these rules during development. Refer to `/rules` for full details.

## 📁 Naming & Structure

- **Files/Folders:** kebab-case (e.g., `input-field.tsx`, `package-name/`)
- **Components:** PascalCase (e.g., `Button`)
- **Variables/Functions:** camelCase (e.g., `buttonVariants`)
- **Constants:** SCREAMING_SNAKE_CASE (e.g., `MAX_SIZE`)
- [naming-conventions.md](../../rules/naming-conventions.md)

## 🧩 Component Rules

- Use `React.forwardRef` and set `displayName`.
- Use `tv()` for styling and `cn()` for merging classes.
- JSDoc required for all public props.
- [component-development.md](../../rules/component-development.md)

## 🏗️ Structure & Exports

- Use barrel exports (`index.ts`) for all public APIs.
- Components in `packages/components/` must have a flat structure: `src/[component].tsx`, `src/[component].types.ts`, `src/index.ts`.
- [package-structure.md](../../rules/package-structure.md)

## 📦 Dependency Rules

- Components can depend on: `@ideasui/theme`, `@ideasui/utils`, `@ideasui/hooks`.
- **Forbidden:** Circular dependencies, or components depending on other components directly.
- Use `workspace:*` for internal dependencies.

## ⚖️ Quality & Complexity

- Max 50 lines per function, 300 lines per file.
- Max cyclomatic complexity: 10, Cognitive: 15.
- Max 4 parameters per function.
- [code-quality.md](../../rules/code-quality.md)

## ♿ Accessibility (WCAG 2.1 AA)

- Use semantic HTML (button for actions, a for links).
- Explicit ARIA labels for non-text triggers.
- No `axe` violations in tests.
- [accessibility.md](../../rules/accessibility.md)

## 🎨 Styling

- Tailwind CSS v4 using tokens from `@ideasui/theme`.
- Use recipes from `@ideasui/theme/recipes` via `tv()`.
- [tailwind-theme.md](../../rules/tailwind-theme.md)

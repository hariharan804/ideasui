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
- [project-structure.md](../../rules/project-structure.md)

## 🧩 Component Rules

- Use `React.forwardRef` and set `displayName`.
- Use `tv()` for styling and `cn()` for merging classes.
- JSDoc required for all public props.
- [component-development.md](../../rules/component-development.md)

## 🏗️ Structure & Exports

- Use barrel exports (`index.ts`) for all public APIs.
- Components in `packages/components/` must have a flat structure: `src/[component].tsx`, `src/[component].types.ts`, `src/index.ts`.
- [project-structure.md](../../rules/project-structure.md)

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

## 🎨 Design System & Theme Tokens

- **NEVER** hardcode raw Tailwind palette colors (e.g. `gray-50`, `blue-600`, `red-500`, `indigo-*`).
- **NEVER** use the `dark:` modifier prefix — semantic tokens resolve automatically.
- Use ONLY IdeasUI semantic tokens:

| Category    | Allowed Classes                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------- |
| Brand       | `bg-primary`, `text-primary`, `bg-primary-subtle`, `text-on-primary`, `bg-primary-muted`       |
| Secondary   | `bg-secondary`, `text-secondary`, `bg-secondary-subtle`, `text-on-secondary`                   |
| Tertiary    | `bg-tertiary`, `text-tertiary`, `bg-tertiary-subtle`, `text-on-tertiary`                       |
| Status      | `bg-success`, `bg-warning`, `bg-danger`, `bg-info`, `text-on-success`, etc.                    |
| Backgrounds | `bg-background`, `bg-surface`, `bg-surface-subtle`, `bg-surface-muted`, `bg-surface-overlay`   |
| Typography  | `text-content-primary`, `text-content-secondary`, `text-content-muted`, `text-content-inverse` |
| Borders     | `border-border`, `borderborder-border-base`, `border-border-focus`, `border-border-danger`     |

- [design-tokens.md](../../rules/design-tokens.md)

## 🎯 CSS Best Practice Rules

- **Use Shorthands:** Use modern CSS `inset: 0` instead of specifying `top`, `left`, `right`, and `bottom` individually.
- **No Overridden Properties:** Avoid redeclaring directional properties when a shorthand like `inset` or `margin` is applied.
- **Semantic Custom Properties:** Use OKLCH CSS variables (`var(--ideasui-color-*)`) instead of raw hex/RGB values.
- **Logical Properties:** Prefer logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) for RTL compatibility.
- **No Duplicate Selectors:** Keep global and component CSS modular and clean.

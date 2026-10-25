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

- Use `React.forwardRef` and set `displayName` (format: `IdeasUI.ComponentName`).
- Use `tv()` for styling and `cn()` for merging classes.
- Use semantic HTML (`<button>`, `<input>`, `<label>`, `<p>`) for default DOM structures.
- Support `className`, `classNames` (slot class overrides), and `slotProps` (slot prop customization).
- Form components must support `isRequired`, `isDisabled`, `isReadOnly`, and `isInvalid`.
- All DOM slots must expose `data-slot="*"` and namespaced BEM classes (`.ideasui-[component]__*`).
- JSDoc required for all public props.
- [component-development.md](../../rules/component-development.md)

## 🏗️ Structure & Exports

- Use barrel exports (`index.ts`) for all public APIs.
- Components in `packages/components/` must have a flat structure: `src/[component].tsx`, `src/[component].types.ts`, `src/index.ts`.
- [project-structure.md](../../rules/project-structure.md)

## 📦 Dependency & Reusability Rules

- Components can depend on: `@ideasui/theme`, `@ideasui/utils`, `@ideasui/hooks`.
- **Component-to-Component Reuse (DAG):** Higher-level/composite components can depend on lower-level primitive components via `@ideasui/<component>` (`"workspace:*"`). E.g., `@ideasui/avatar` reuses `@ideasui/image`.
- **Forbidden:** Circular dependencies (A → B → A).
- **Forbidden:** Cross-package direct imports from another component's private `src/` directory (always import from `@ideasui/<name>`).
- **Forbidden:** Components importing from the umbrella `@ideasui/react` barrel bundle.
- Use `workspace:*` for all internal monorepo package dependencies.

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

## 🎨 Styling & Recipes

- Tailwind CSS v4 using tokens from `@ideasui/theme`.
- Recipes in `packages/core/theme/src/recipes/` **must primarily use Tailwind utility tokens** via `tv()`.
- Component styles (visuals, colors, sizes, states) live directly in the `tv()` recipe using semantic Tailwind classes (`bg-primary`, `border-border`, etc.).
- Standalone CSS files in `recipes/` must also use `@apply` with Tailwind utility tokens instead of raw CSS properties.
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

## 📖 MDX & Documentation Rules

- **File Path:** `apps/docs/content/react/components/(category)/[component-name].mdx`
- **Navigation:** Include `<QuickNav items={...} />` matching all major `##` headings.
- **Live Demos:** Use `<Preview name="[component]-[demo]" />`. Never embed inline JSX components directly in MDX body text.
- **Showcase Components:** Define demo components in `apps/docs/showcase/[component-name]/[demo].tsx` and register them in `apps/docs/showcase/index.ts`.
- **Showcase Component Dogfooding:** Always use existing IdeasUI components (e.g. `Switch`, `Button`, `Avatar`, `InputField` from `@ideasui/react`) across all showcase demos instead of building custom raw HTML controls or mock toggles.
- **API Reference:** Always use `<APIReferenceViewer componentName="[camelCaseName]" />`. NEVER write manual Markdown/HTML prop tables.
- **Standalone CSS:** Every component MDX file MUST include a `## Standalone CSS` section and a `### BEM CSS Classes` subsection.
- **Props Dictionary:** Register component prop metadata in `apps/docs/lib/docs/components-props.ts`.
- [mdx-documentation.md](../../rules/mdx-documentation.md)

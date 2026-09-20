# IdeasUI Component Lifecycle Checklist

A comprehensive, step-by-step checklist for creating, developing, testing, documenting, and building components in the IdeasUI monorepo.

---

## 1. 🚀 Creation Phase

- [ ] **Execute Plop Generator**:
      Run the interactive generator:
  ```bash
  pnpm run create
  ```
  Select `component` and enter the kebab-case name (e.g., `input-field` or `modal`).
- [ ] **Verify Directory Structure**:
      Ensure the new package exists at `packages/components/<name>/` with:
  ```text
  packages/components/<name>/
  ├── src/
  │   ├── <name>.tsx          # Main component implementation
  │   ├── <name>.types.ts     # TypeScript interfaces with JSDoc
  │   └── index.ts            # Public barrel exports
  ├── __tests__/
  │   └── <name>.test.tsx     # Vitest + RTL + vitest-axe tests
  ├── stories/
  │   └── <name>.stories.tsx  # Storybook stories
  ├── package.json
  ├── tsconfig.json
  └── tsup.config.ts
  ```

---

## 2. 🎨 Development & Styling Phase

- [ ] **Define Theme Recipe**:
      Create the component styling recipe in `packages/core/theme/src/recipes/<name>/<name>.ts` using `tv()` from `tailwind-variants`.
      Export the recipe from `packages/core/theme/src/recipes/index.ts`.
- [ ] **Standalone CSS Recipe (`<name>.css`)**:
      If the component defines custom CSS modifiers, BEM rules, or keyframes, create `packages/core/theme/src/recipes/<name>/<name>.css` and import it in `packages/core/theme/src/recipes/<name>/index.ts`.
- [ ] **Standalone CSS Compatibility**:
      Verify the component styling can compile into a standalone CSS package (`@ideasui/styles/components/<name>.css`) for non-Tailwind projects.
- [ ] **Use Semantic OKLCH Tokens**:
      Use ONLY IdeasUI semantic color tokens (`bg-primary`, `bg-surface`, `text-content-primary`, `border-border`).
  > ⚠️ **Never** hardcode raw Tailwind palette colors (e.g., `blue-600`, `gray-100`, `red-500`).
- [ ] **Integrate React Aria Primitives**:
      Use `react-aria-components` primitives as the underlying accessible base where applicable.
- [ ] **Component Standards (`<name>.tsx`)**:
  - Wrap component in `React.forwardRef`.
  - Set explicit `displayName` in the format `IdeasUI.ComponentName` (e.g., `IdeasUI.Button`).
  - Merge class names using `cn()` from `@ideasui/utils`.
  - Attach `data-slot="<name>"` (or custom `slot`) and forward `{...properties}` to the DOM element for test selectors.
  - **Pure Component Architecture**: Keep primitive text/typography components context-free (`props` $\rightarrow$ `recipe calculation` $\rightarrow$ `DOM element`).
- [ ] **Monorepo Barrel Exports**:
  - Export public API from `packages/components/<name>/src/index.ts`.
  - Re-export the package from master bundle `packages/core/react/src/index.ts`.

---

## 3. 🧪 Testing & Quality Phase

- [ ] **Write Unit Tests (`__tests__/<name>.test.tsx`)**:
  - Verify default rendering and DOM element output.
  - Test all variants, sizes, colors, and interactive state classes.
  - Test `ref` forwarding.
  - Test event handlers (`onClick`, `onPress`, keyboard shortcuts).
  - Test `data-testid` and custom HTML attribute pass-through.
- [ ] **Automated Accessibility Audit**:
      Include `await expectAccessible(container)` using `vitest-axe` with **zero violations**.
- [ ] **Run Full Quality Pipeline**:
      Run the automated quality script to verify linting, typechecking, tokens, and code formatting:
  ```bash
  pnpm quality
  ```

---

## 4. 📚 Documentation & Showcase Phase

- [ ] **Configure Props Extractor**:
      Add the component interface mapping to `scripts/props-extractor/props-extractor.config.mjs`:
  ```js
  <name>: {
    componentName: 'ComponentName',
    interfaces: [
      {
        name: 'ComponentName',
        title: 'ComponentName Props',
        description: 'Component description',
        filePath: '../../packages/components/<name>/src/<name>.types.ts',
        interfaceName: 'ComponentNameProps',
      },
    ],
  }
  ```
- [ ] **Extract Component Props**:
      Run the extractor script to update `apps/docs/lib/docs/components-props.ts`:
  ```bash
  pnpm extract:props
  ```
- [ ] **Create Docs MDX Page**:
      Create MDX document at `apps/docs/content/react/components/(category)/<name>.mdx`:
  - Frontmatter metadata (`title`, `description`, `links`).
  - `QuickNav` navigation section links.
  - Installation tab: `<InstallTabs pkg="@ideasui/<name>" />`.
  - Interactive preview embeds: `<Preview name="<name>-basic" />`.
  - Guides for **Slot Integration** and **Testing & Data Attributes**.
  - Interactive API reference: `<APIReferenceViewer componentName="<name>" />`.
- [ ] **Build Showcase Previews**:
      Add preview component files under `apps/docs/showcase/<name>/`.

---

## 5. 🎨 Storybook & Build Phase

- [ ] **Create Storybook Stories (`stories/<name>.stories.tsx`)**:
      Add stories covering default state, variants, sizes, colors, disabled states, and interactive playgrounds.
- [ ] **Run Storybook Server**:
      Verify component stories locally:
  ```bash
  pnpm run storybook
  ```
- [ ] **Monorepo & Styles Build**:
      Compile all package bundles and standalone CSS files:
  ```bash
  pnpm --filter @ideasui/styles build
  pnpm run build
  ```
  Verify that `@ideasui/styles/dist/components/<name>.css` is generated cleanly.
- [ ] **Version & Changeset**:
      Create a changeset for package release notes:
  ```bash
  pnpm changeset
  ```

---
description: Architecture audit, code review, API assessment, and verification for IdeasUI components.
---

# IdeasUI — Component Architecture & Quality Audit

## Role

Act as a Principal Frontend Architect and Senior NPM Component Library Engineer specializing in React 19, TypeScript, Next.js App Router, Tailwind CSS v4, Tailwind Variants, accessibility, and independently published component packages.

Perform a comprehensive architecture audit, code review, API reusability assessment, and verification of:

`@[path/to/component]`

## Mandatory Operating Rules

1. Read `AGENTS.md`, `.agent/AGENTS.md`, and `.agent/rules/rule.md`. Follow established repo paths and rules.
2. Inspect target component implementation, types, exports, theme recipes, tests, stories, and docs.
3. Compare with canonical components (e.g., `@ideasui/button`) for conventions. Do not copy blindly.
4. Establish a baseline before modifying code.

**Constraints:**

- Preserve monorepo boundaries. Never import another component from its `src/`.
- No unnecessary dependencies or duplicated utilities.
- Preserve backward compatibility unless breaking changes are explicitly justified.
- Never claim a check passed without actual execution.
- Fix confirmed in-scope defects with minimal diffs and add regression tests.

---

## Pillar 1: Architecture & Monorepo Boundaries

### Dependency Isolation

- Only approved shared packages: `@ideasui/theme`, `@ideasui/utils`, `@ideasui/hooks`.
- Disallow direct component-to-component imports (`workspace:*` only via package entry points).
- Check for circular dependencies and undeclared runtime dependencies.

### React Server Components (RSC)

- Files with state, effects, event handlers, or context (`createContext`) must begin with `'use client';` (including internal `*-context.ts` files).
- Keep files without client hooks compatible with Server Components.
- Verify seamless consumption in Next.js 15 App Router.

### Packaging & Exports

- Verify entry point (`src/index.ts`) exports and `@ideasui/react` re-exports.
- Validate `package.json` (`main`, `module`, `types`, `exports`). Never expose internal files.

---

## Pillar 2: API Ergonomics, TypeScript & Reusability

### Component API

- Support compound dot-notation (`Component.SubComponent`) for composability.
- Provide clean shorthand props (`icon`, `fallback`, `initials`, `as`) where genuinely useful.
- Ensure defaults, sizes, variants, and controlled/uncontrolled state are consistent.

### Slots & Customization

- Ensure stable `data-slot="*"` attributes on all meaningful DOM nodes.
- Support `classNames` (slot class overrides) and `slotProps` (slot prop customization).
- Safely forward native HTML, `data-*`, and `aria-*` attributes without clobbering internals.

### Polymorphism, Refs & DisplayName

- Forward refs cleanly to the appropriate DOM node (`React.forwardRef` / React 19).
- Set explicit `displayName = 'IdeasUI.ComponentName'`.
- Ensure accurate prop inference and ref types.

### TypeScript Quality

- Export clean types with JSDoc descriptions.
- Use discriminated unions for mutually exclusive variants.
- Disallow `any`, unnecessary type assertions, or unsafe non-null assertions.

---

## Pillar 3: React Lifecycle, Runtime & Code Quality

### State & Lifecycle

- Synchronize dynamic prop updates properly (e.g., dynamic `src` or `value` changes).
- Maintain predictable controlled/uncontrolled behavior with correct callback semantics.
- Avoid stale closures in effects and unnecessary state for derivable values.

### Edge Cases

- Handle empty/whitespace strings, `null`/`undefined` children, rapid prop updates, asset load failures, SSR hydration, and unmounting during pending actions.

### Complexity & Maintainability

- Keep functions <= 50 lines, files <= 300 lines, cyclomatic complexity <= 25.
- Extract focused subcomponents or helpers to reduce cognitive complexity.

---

## Pillar 4: Design System & Theme Token Discipline

### Styling Architecture

- Style exclusively via Tailwind Variants (`tv()`) from `@ideasui/theme/recipes`.
- Use OKLCH semantic tokens (`bg-primary`, `bg-surface`, `text-content-primary`).
- **FORBIDDEN:** Raw Tailwind colors (`blue-600`, `gray-100`) and the `dark:` prefix (handled by semantic CSS variables).
- Merge classes using `cn()` from `@ideasui/utils`.

### DOM & CSS Conventions

- Apply namespaced BEM classes (`.ideasui-[component]__*`) alongside `data-slot`.
- Use RTL-safe CSS logical properties (`margin-inline`, `padding-block`, `inset-inline-start`).

---

## Pillar 5: Accessibility & Interaction Quality

Target WCAG 2.1 AA:

### Semantics & ARIA

- Use semantic HTML (`<button>`, `<img>`) and valid accessible names.
- Ensure non-text interactive elements have explicit `aria-label`.
- Mark purely decorative elements with `aria-hidden="true"`.
- Support standard keyboard navigation, focus visible indicators, and screen-reader announcements.

### Automated Testing

- Pass all automated accessibility tests (`vitest-axe`) with 0 violations.
- Add regression tests for any confirmed accessibility bug.

---

## Pillar 6: Tests, Build Verification & Tooling

Execute the following commands (substituting actual package names):

1. `pnpm --filter <pkg> test` — Unit, interaction, and `vitest-axe` tests.
2. `pnpm eslint <pkg-path>` — Lint rules with 0 errors/warnings.
3. `pnpm --filter <pkg> typecheck` — TypeScript type validation.
4. `pnpm extract:props` — Ensure component is in `props-extractor.config.mjs` and sync props.
5. `pnpm --filter @ideasui/docs typecheck` — Docs and showcase demo validation.
6. `pnpm --filter <pkg> build` — Production bundle build.
7. Verify if `pnpm changeset` is required for versioning.

_Never invent test counts or pass statuses. Report actual command outcomes._

---

## Execution Strategy

1. Inspect code, dependencies, and comparable components.
2. Establish baseline test and lint status.
3. Audit Pillars 1–6 and classify issues by severity:
   - **Critical:** Security, data loss, fundamental crash.
   - **High:** Major functional, a11y, or architectural defect.
   - **Medium:** Correctness, API ergonomics, or maintenance defect.
   - **Low:** Minor inconsistency or polish item.
   - **Informational:** Non-defect suggestion.
4. Apply minimal, high-precision fixes with regression tests.
5. Re-run verification suite and inspect git diff.

---

## Required Output Format

### 1. Executive Summary

Scorecard for all 6 pillars (`PASS` | `PARTIAL` | `FAIL` | `NOT VERIFIED`) with high-level summary.

### 2. Findings & Severity

Itemized findings with file, line numbers, impact, and fix.

### 3. Edge Cases Found & Fixed

Scenario, root cause, code fix, and regression test added.

### 4. API & Architecture Assessment

Summary of composability, shorthand props, slot customization, ref behavior, and token compliance.

### 5. Verification Results

Markdown table with columns: `Command`, `Status` (`PASS` | `FAIL` | `BLOCKED` | `NOT RUN`), `Details`.

### 6. Files Changed

List of modified files with concise explanations of diffs.

### 7. Remaining Risks & Final Verdict

Outstanding items, follow-ups, and one final verdict:
`APPROVED` | `APPROVED WITH CAVEATS` | `CHANGES REQUIRED` | `BLOCKED`.

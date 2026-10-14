# IdeasUI Packages — Code Review & Component Consistency Analysis Report

**Date:** October 14, 2026  
**Scope:** All packages under [`packages/`](file:///Users/hariharan/projects/ideasui/packages):

- **Components (7):** [`@ideasui/button`](file:///Users/hariharan/projects/ideasui/packages/components/button), [`@ideasui/checkbox`](file:///Users/hariharan/projects/ideasui/packages/components/checkbox), [`@ideasui/image`](file:///Users/hariharan/projects/ideasui/packages/components/image), [`@ideasui/input-field`](file:///Users/hariharan/projects/ideasui/packages/components/input-field), [`@ideasui/radio`](file:///Users/hariharan/projects/ideasui/packages/components/radio), [`@ideasui/switch`](file:///Users/hariharan/projects/ideasui/packages/components/switch), [`@ideasui/text`](file:///Users/hariharan/projects/ideasui/packages/components/text)
- **Core (3):** [`@ideasui/react`](file:///Users/hariharan/projects/ideasui/packages/core/react), [`@ideasui/theme`](file:///Users/hariharan/projects/ideasui/packages/core/theme), [`@ideasui/styles`](file:///Users/hariharan/projects/ideasui/packages/core/styles)
- **Utils (1):** [`@ideasui/utils`](file:///Users/hariharan/projects/ideasui/packages/utils)

---

## 1. Executive Summary

| Category                       |     Status      | Details                                                                                                    |
| :----------------------------- | :-------------: | :--------------------------------------------------------------------------------------------------------- |
| **Monorepo Build & Typecheck** |   🟢 **PASS**   | 15 packages pass `tsc --noEmit` cleanly without error.                                                     |
| **Linting (ESLint v9)**        |   🟢 **PASS**   | 0 warnings, 0 errors across all packages (`--max-warnings=0`).                                             |
| **Unit & Interaction Tests**   |   🟢 **PASS**   | 34 test suites, 434 tests passing cleanly in Vitest.                                                       |
| **Accessibility (vitest-axe)** |   🟢 **PASS**   | All interactive components test via `expectAccessible` with 0 violations.                                  |
| **Component Consistency**      |  🟡 **MIXED**   | Architectural split between BEM-driven and Tailwind-driven recipes; compound component naming disparity.   |
| **Standalone CSS Engine**      | 🔴 **CRITICAL** | `image.css`, `radio.css`, and `switch.css` in theme recipes contain placeholder/copy-pasted Button styles. |
| **Dependency Hygiene**         |  🟡 **ACTION**  | 6 of 7 component packages declare `react-aria-components` as a dependency but never import it.             |

---

## 2. Component Consistency Audit Matrix

| Component                     |           `displayName` Pattern           |                  Compound Attachment (`Comp.Sub`)                   |         Slot BEM Classes in DOM         |         Recipe Architecture         |                                                         Standalone CSS File Status                                                          | Uses `react-aria-components` | Form Props (`required`, `disabled`, `readonly`, `invalid`) | Axe A11y Tests |
| :---------------------------- | :---------------------------------------: | :-----------------------------------------------------------------: | :-------------------------------------: | :---------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------: | :--------------------------------------------------------: | :------------: |
| **`Button`**                  |             `IdeasUI.Button`              |       ✅ `Button.Icon`, `Button.Group`, `Button.Label`, etc.        |           ✅ `.ideasui-btn*`            |    BEM Recipe (`tv` maps to BEM)    |           ✅ Real CSS ([button.css](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/button/button.css))            |  ✅ Yes (`ButtonPrimitive`)  |                           ✅ Yes                           |     ✅ Yes     |
| **`InputField` / `Textarea`** | `IdeasUI.InputField` / `IdeasUI.Textarea` | ✅ `InputField.Label`, `InputField.Input`, `InputField.Error`, etc. |       ✅ `.ideasui-input-field*`        |    BEM Recipe (`tv` maps to BEM)    |    ✅ Real CSS ([input-field.css](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/input-field/input-field.css))    |   ❌ Unused (Phantom Dep)    |                           ✅ Yes                           |     ✅ Yes     |
| **`Text`**                    |              `IdeasUI.Text`               |                          ➖ Single element                          |           ✅ `.ideasui-text*`           |    BEM Recipe (`tv` maps to BEM)    |              ✅ Real CSS ([text.css](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/text/text.css))               |   ❌ Unused (Phantom Dep)    |                           ➖ N/A                           |     ✅ Yes     |
| **`Checkbox`**                |            `IdeasUI.Checkbox`             |          ❌ Only separate exports (`CheckboxGroup`, etc.)           | ❌ Not in DOM (Recipe emits TW classes) | Tailwind Recipe (Dynamic utilities) |                                            ⚠️ Real CSS written, but never applied by component!                                             |   ❌ Unused (Phantom Dep)    |                           ✅ Yes                           |     ✅ Yes     |
| **`Radio`**                   |              `IdeasUI.Radio`              |            ❌ Only separate exports (`RadioGroup`, etc.)            | ❌ Not in DOM (Recipe emits TW classes) | Tailwind Recipe (Dynamic utilities) |  🔴 Fake / Copy-pasted Button CSS ([radio.css](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/radio/radio.css))   |   ❌ Unused (Phantom Dep)    |                           ✅ Yes                           |     ✅ Yes     |
| **`Switch`**                  |             `IdeasUI.Switch`              |           ❌ Only separate exports (`SwitchGroup`, etc.)            | ❌ Not in DOM (Recipe emits TW classes) | Tailwind Recipe (Dynamic utilities) | 🔴 Fake / Copy-pasted Button CSS ([switch.css](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/switch/switch.css)) |   ❌ Unused (Phantom Dep)    |                           ✅ Yes                           |     ✅ Yes     |
| **`Image`**                   |              `IdeasUI.Image`              |                         ✅ `Image.Fallback`                         | ❌ Not in DOM (Recipe emits TW classes) | Tailwind Recipe (Dynamic utilities) |  🔴 Fake / Copy-pasted Button CSS ([image.css](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/image/image.css))   |   ❌ Unused (Phantom Dep)    |                           ➖ N/A                           |     ✅ Yes     |

---

## 3. Detailed Findings & Analysis

### Finding 1: Standalone CSS Contamination (High Severity)

In [`packages/core/theme/src/recipes/`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/), three CSS files are copy-pasted templates from `Button`:

- **[`image.css`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/image/image.css):** Defines `.image { @apply relative inline-flex cursor-pointer ... font-medium active:scale-98; }`, `.image.image--sm { h-8 px-3 text-xs }`, and `.image--solid.image--primary { bg-primary text-on-primary }`.
- **[`radio.css`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/radio/radio.css):** Defines button-like padding and sizing (`h-8 px-3 text-xs`) and button color states (`text-on-primary`).
- **[`switch.css`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/switch/switch.css):** Defines `.switch.switch--sm { h-8 px-3 text-xs }` instead of toggle track/thumb metrics.

**Impact:**
When [`@ideasui/styles`](file:///Users/hariharan/projects/ideasui/packages/core/styles) builds its bundle via [`build-css.js`](file:///Users/hariharan/projects/ideasui/packages/core/styles/scripts/build-css.js), these files are bundled into `dist/styles.css` and `dist/components/*.css`, producing dead and misleading CSS for anyone attempting to use standalone CSS for `Image`, `Radio`, and `Switch`.

---

### Finding 2: Recipe Architectural Inconsistency (Medium Severity)

IdeasUI has **two divergent styling architectures**:

1. **BEM Recipe Pattern (`Button`, `InputField`, `Text`):**
   - Recipe in `*.ts` only assigns BEM class names:
     ```ts
     // packages/core/theme/src/recipes/button/button.ts
     slots: { base: 'ideasui-btn', icon: 'ideasui-btn__icon', ... }
     variants: { solid: { base: 'ideasui-btn--solid' } }
     ```
   - Visual styling lives in the corresponding `.css` file via Tailwind `@apply`.
   - **Benefit:** Full standalone CSS compatibility without requiring Tailwind in the consuming app.
2. **Tailwind-Variants Utility Pattern (`Checkbox`, `Radio`, `Switch`, `Image`):**
   - Recipe in `*.ts` injects dozens of direct Tailwind utility classes into the slot output:
     ```ts
     // packages/core/theme/src/recipes/checkbox/checkbox.ts
     slots: { root: 'group/checkbox inline-flex items-center gap-2 cursor-pointer select-none w-fit', ... }
     ```
   - **Issue with `Checkbox`:** [`checkbox.css`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/checkbox/checkbox.css) has full BEM classes (`.ideasui-checkbox__indicator`), but because `checkbox.ts` does not output them, `checkbox.css` is completely disconnected from the React component.

---

### Finding 3: Compound Subcomponent API Inconsistency (Medium Severity)

Component subcomponents are exposed inconsistently across the packages:

| Pattern                          | Implemented By                              | Syntax                                                                                               |
| :------------------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------- |
| **Attached Compound Object**     | `Button`, `InputField`, `Textarea`, `Image` | `<Button.Group>`, `<Button.Icon>`, `<InputField.Label>`, `<Textarea.Error>`, `<Image.Fallback>`      |
| **Unattached Flat Exports Only** | `Checkbox`, `Radio`, `Switch`               | Requires importing `<CheckboxGroup>` and `<Checkbox>` separately; `<Checkbox.Group>` is `undefined`. |

**Recommendation:** Attach the group and label subcomponents to the main component export in `checkbox.tsx`, `radio.tsx`, and `switch.tsx`:

```tsx
Checkbox.Group = CheckboxGroup;
Checkbox.Label = CheckboxGroupLabel;
Checkbox.Description = CheckboxGroupDescription;
Checkbox.Error = CheckboxGroupError;
```

---

### Finding 4: Phantom Dependencies in 6 Packages (Low Severity)

In [`packages/components/*/package.json`](file:///Users/hariharan/projects/ideasui/packages/components):

- `"react-aria-components": "^1.16.0"` is declared in `dependencies` of:
  - `@ideasui/checkbox`
  - `@ideasui/radio`
  - `@ideasui/switch`
  - `@ideasui/input-field`
  - `@ideasui/text`
  - `@ideasui/image`
- **Fact:** None of these 6 packages import anything from `react-aria-components`. Only [`@ideasui/button`](file:///Users/hariharan/projects/ideasui/packages/components/button) actually imports `ButtonPrimitive` and `ButtonRenderProps`.

---

## 4. Code Quality & Rule Compliance

### Rule Verification Check

- **Max 50 lines per function / 300 lines per file:**
  - Component files decompose complex renders into helper functions (`renderCheckboxInput`, `renderRadioLayout`, `useCheckboxControl`).
- **No Hardcoded Tailwind Colors (`gray-50`, `blue-600`, etc.):**
  - ✅ **Compliant:** Recipes strictly use semantic design tokens: `bg-primary`, `bg-surface-muted`, `border-border-strong`, `text-content-primary`, `oklch(...)`.
- **No `dark:` modifiers:**
  - ✅ **Compliant:** Themes resolve automatically via CSS variables without `dark:` class overrides.
- **`data-slot` coverage:**
  - ✅ **Compliant:** Every rendered DOM slot across all 7 components exposes `data-slot="..."`.
- **Keyboard & Accessibility:**
  - ✅ Full keyboard interactions (Enter, Space, arrow keys in groups).
  - ✅ ARIA attributes properly synchronized (`aria-invalid`, `aria-required`, `aria-describedby`, `aria-checked="mixed"` for indeterminate).

---

## 5. Core Packages Review

### `@ideasui/react` (Master Bundle)

- Re-exports all components, theme, and utilities cleanly.
- Export map and types are fully synchronized with the monorepo build.

### `@ideasui/theme`

- System tokens, OKLCH scales, and ThemeProvider are solid.
- Exports all 7 recipes from [`recipes/index.ts`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/index.ts).

### `@ideasui/utils`

- High code coverage and unit test suite.
- Clean separation between core, client, style, aria, and test utilities.

---

## 6. Actionable Recommendations

### Priority 1: Fix Placeholder CSS Files in Theme Recipes

Replace the template button code in:

1. [`packages/core/theme/src/recipes/image/image.css`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/image/image.css) with genuine `.ideasui-image` BEM rules (aspect ratio, skeleton shimmer, blur transition).
2. [`packages/core/theme/src/recipes/radio/radio.css`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/radio/radio.css) with `.ideasui-radio` BEM rules (indicator, dot, group orientation).
3. [`packages/core/theme/src/recipes/switch/switch.css`](file:///Users/hariharan/projects/ideasui/packages/core/theme/src/recipes/switch/switch.css) with `.ideasui-switch` BEM rules (track, thumb, label placements).

### Priority 2: Unify Compound Component API

Attach subcomponents to `Checkbox`, `Radio`, and `Switch`:

- `Checkbox.Group`, `Checkbox.Label`, `Checkbox.Description`, `Checkbox.Error`
- `Radio.Group`, `Radio.Label`, `Radio.Description`, `Radio.Error`
- `Switch.Group`, `Switch.Label`, `Switch.Description`, `Switch.Error`

### Priority 3: Align Checkbox Recipe with BEM or Align CSS

Either:

- Add `.ideasui-checkbox*` BEM classes to the slots in `checkbox.ts` (matching `button.ts` and `input-field.ts`), or
- Refactor `checkbox.css` to align with the active Tailwind class strategy.

### Priority 4: Dependency Pruning

Remove `"react-aria-components"` from `package.json` for `checkbox`, `radio`, `switch`, `input-field`, `text`, and `image` if native HTML primitives are the intended architecture for those packages.

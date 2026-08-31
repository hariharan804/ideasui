# Naming Conventions

All naming follows a consistent, role-based system. The case style signals the **kind of thing** you're naming, not just the file system layer.

---

## 📋 Quick Reference

| Context                  | Convention              | Example                                         |
| ------------------------ | ----------------------- | ----------------------------------------------- |
| File name                | kebab-case              | `input-field.tsx`, `use-button.ts`              |
| Folder / package name    | kebab-case              | `packages/input-field/`, `@ideasui/date-picker` |
| React component          | PascalCase              | `InputField`, `Button`, `ButtonGroup`           |
| `displayName`            | `IdeasUI.ComponentName` | `IdeasUI.Button`, `IdeasUI.Button.Icon`         |
| Variable                 | camelCase               | `inputValue`, `isDisabled`                      |
| Function                 | camelCase               | `handleInputChange`, `getAccessibleName`        |
| React hook               | camelCase, `use` prefix | `useButtonGroupContext`, `useTheme`             |
| TypeScript interface     | PascalCase              | `ButtonProps`, `InputFieldProps`                |
| TypeScript type alias    | PascalCase              | `VariantType`, `ColorToken`                     |
| Constant (immutable)     | SCREAMING_SNAKE_CASE    | `MAX_FILE_SIZE`, `DEFAULT_RADIUS`               |
| Environment variable     | SCREAMING_SNAKE_CASE    | `API_BASE_URL`, `NODE_ENV`                      |
| CSS class (BEM block)    | kebab-case              | `btn`, `input-field`                            |
| CSS class (BEM element)  | kebab-case + `__`       | `btn__icon`, `btn__label`                       |
| CSS class (BEM modifier) | kebab-case + `--`       | `btn--solid`, `btn--disabled`                   |
| CSS custom property      | kebab-case              | `--primary-500`, `--on-surface`                 |
| `data-slot` attribute    | kebab-case              | `data-slot="button-icon"`                       |

---

## 📁 Files & Folders

Use **kebab-case** for all file and folder names, no exceptions.

```
✅  packages/components/input-field/
✅  src/input-field.tsx
✅  src/use-input-field.ts
✅  src/input-field.types.ts
✅  __tests__/input-field.test.tsx
✅  stories/input-field.stories.tsx

❌  InputField.tsx
❌  useInputField.ts
❌  InputFieldProps.ts
```

---

## ⚛️ React Components

Use **PascalCase** for the exported component name.

```tsx
// ✅ Good
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...);
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(...);

// ❌ Bad
export const button = ...;
export const button_group = ...;
```

### `displayName`

Always set `displayName` using the `IdeasUI.ComponentName` format. For sub-components (slots), use `IdeasUI.ParentName.SlotName`.

```tsx
Button.displayName = 'IdeasUI.Button';
ButtonIcon.displayName = 'IdeasUI.Button.Icon';
ButtonSpinner.displayName = 'IdeasUI.Button.Spinner';
ButtonLabel.displayName = 'IdeasUI.Button.Label';
```

---

## 🏷️ TypeScript

Use **PascalCase** for all interfaces and type aliases. Props interfaces must be named `ComponentNameProps`.

```tsx
// ✅ Props interface
export interface ButtonProps extends ButtonVariantProps { ... }

// ✅ Return type
export type ButtonReturnType = ReturnType<typeof button>;

// ✅ Generic type alias
export type ColorToken = 'primary' | 'secondary' | 'danger';

// ❌ Bad
export interface buttonProps { ... }
export type colorToken = ...;
```

---

## 📦 Packages

Package names follow npm scoped conventions using **kebab-case** after the `@ideasui/` scope prefix.

```
✅  @ideasui/button
✅  @ideasui/input-field
✅  @ideasui/date-picker
✅  @ideasui/theme
✅  @ideasui/utils

❌  @ideasui/Button
❌  @ideasui/inputField
❌  @ideasui/DatePicker
```

---

## 🎨 CSS & Styling

### BEM Classes

Component recipes use a **BEM + Tailwind hybrid**. The BEM class is for DevTools debugging; Tailwind utilities do the actual styling.

```tsx
export const button = tv({
  slots: {
    base: ['btn', 'inline-flex', 'items-center'], // BEM block + utilities
    icon: ['btn__icon', 'shrink-0'], // BEM element + utilities
  },
  variants: {
    variant: {
      solid: { base: 'btn--solid bg-primary-500' }, // BEM modifier + utilities
    },
  },
});
```

### CSS Custom Properties

All theme tokens are exposed as CSS custom properties in **kebab-case**:

```css
--primary-50 through --primary-950   /* color shades */
--on-primary                          /* contrast text color */
--surface, --on-surface               /* surface semantic colors */
--background                          /* page background */
```

### `data-slot` Attributes

Every rendered DOM slot must carry a `data-slot` attribute in **kebab-case** for targeting in tests and user CSS overrides:

```tsx
<span data-slot="button-icon" />
<span data-slot="button-spinner" />
<span data-slot="button-label" />
<kbd  data-slot="button-shortcut" />
```

---

## 🔁 Hooks

Hook file names use `use-` prefix in kebab-case. The function name uses `use` prefix in camelCase.

```
File:      use-button-group-context.ts   (or colocated in button-group-context.tsx)
Function:  useButtonGroupContext
```

---

## ✅ ESLint & Enforcement

Naming rules are enforced automatically:

- `@typescript-eslint/naming-convention` → TypeScript types & interfaces
- `unicorn/filename-case` → kebab-case file names
- `eslint-plugin-boundaries` → package import direction rules

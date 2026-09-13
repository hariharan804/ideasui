# @ideasui/button

A high-performance, accessible Button and ButtonGroup component library for React, built with **Tailwind CSS v4** and **React Aria**.

[![NPM Version](https://img.shields.io/npm/v/@ideasui/button.svg)](https://www.npmjs.com/package/@ideasui/button)
[![License](https://img.shields.io/npm/l/@ideasui/button.svg)](https://github.com/ideas2logic-lab/ideasui/blob/master/LICENSE)

## Features

- ⚡ **Tailwind CSS v4** — Built on the latest styling engine for zero-runtime overhead.
- ♿ **Accessible** — Full keyboard navigation and screen reader support via React Aria.
- 🌗 **Theme Aware** — Seamlessly integrates with `@ideasui/theme` for Light/Dark modes.
- 🎨 **Granular Styling** — Overridable internal slots via the `classNames` prop.
- 📦 **Polymorphic** — Use as a `button`, `a`, or any custom component using `as`.
- ✨ **Rich States** — Support for loading, disabled, pressed, and hover states with micro-interactions.

## Installation

```bash
npm install @ideasui/button @ideasui/theme
# or
pnpm add @ideasui/button @ideasui/theme
```

## Usage

```tsx
import { Button } from '@ideasui/button';

function App() {
  return (
    <Button variant="solid" color="primary" size="md">
      Get Started
    </Button>
  );
}
```

### Button Group

```tsx
import { Button, ButtonGroup } from '@ideasui/button';

function ActionMenu() {
  return (
    <ButtonGroup variant="outline" color="secondary">
      <Button>Edit</Button>
      <Button>Copy</Button>
      <Button color="danger">Delete</Button>
    </ButtonGroup>
  );
}
```

## API Reference

### Button Props

| Prop         | Type                                               | Default     | Description                                                                                                     |
| :----------- | :------------------------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------- |
| `variant`    | `'solid' \| 'outline' \| 'ghost'`                  | `'solid'`   | Visual style variant.                                                                                           |
| `color`      | `SemanticColor`                                    | `'default'` | Semantic color intent (primary, success, etc).                                                                  |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`             | `'md'`      | The size of the button.                                                                                         |
| `radius`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`      | The corner radius.                                                                                              |
| `loading`    | `boolean`                                          | `false`     | Shows a spinner and disables interaction.                                                                       |
| `disabled`   | `boolean`                                          | `false`     | Disables the button.                                                                                            |
| `fullWidth`  | `boolean`                                          | `false`     | Expands to fill the container width.                                                                            |
| `isIconOnly` | `boolean`                                          | `false`     | Formats the button for icon-only display (square, equal padding). Enforces accessibility props at compile-time. |
| `startIcon`  | `ReactNode`                                        | —           | Icon displayed before the label.                                                                                |
| `endIcon`    | `ReactNode`                                        | —           | Icon displayed after the label.                                                                                 |
| `shortcut`   | `string`                                           | —           | Keyboard shortcut hint.                                                                                         |
| `classNames` | `ButtonClassNames`                                 | —           | Custom classes for internal slots.                                                                              |

### Granular Styling (`classNames`)

The `classNames` prop allows you to override styles for specific internal elements:

```tsx
<Button
  classNames={{
    base: 'px-8 py-4', // The main button container
    label: 'font-bold', // The text label
    startIcon: 'text-xl', // The leading icon
    spinner: 'border-2', // The loading spinner
  }}
>
  Custom Styled
</Button>
```

## Accessibility

- Built on `useButton` from **React Aria**.
- Proper `aria-live` regions for loading states.
- High-contrast focus rings for keyboard navigation.
- Semantic HTML tags based on the `as` prop.
- **Icon-Only Trigger Safety**: When `isIconOnly` is `true`, TypeScript compile-time checks enforce that either `aria-label` or `aria-labelledby` is supplied to ensure the button has a screen-readable name (WCAG 2.1 AA).

## License

MIT © [IdeasUI](https://ideasui.com)

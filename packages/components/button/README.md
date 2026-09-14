# @ideasui/button

A high-performance, accessible Button and ButtonGroup component library for React, built with **React Aria Components**, **Tailwind CSS v4**, and an OKLCH perceptual color system targeting WCAG 2.1 AA accessibility by default.

[![NPM Version](https://img.shields.io/npm/v/@ideasui/button.svg)](https://www.npmjs.com/package/@ideasui/button)
[![License](https://img.shields.io/npm/l/@ideasui/button.svg)](https://github.com/ideas2logic-lab/ideasui/blob/master/LICENSE)

📚 **[Full Documentation & Live Interactive Demos →](https://ideasui.com/react/docs/components/button)**

---

## ⚡ Quick Start

### Installation

```bash
pnpm add @ideasui/button @ideasui/theme
# or
npm install @ideasui/button @ideasui/theme
```

### Usage

```tsx
import { Button, ButtonGroup } from '@ideasui/button';

export function Example() {
  return (
    <ButtonGroup variant="soft" color="primary">
      <Button>Cut</Button>
      <Button>Copy</Button>
      <Button>Paste</Button>
    </ButtonGroup>
  );
}
```

---

## ✨ Key Features

- ⚡ **Tailwind CSS v4 Engine**: Built with `@ideasui/theme/recipes` (`tv()`) for zero-runtime overhead.
- ♿ **WCAG 2.1 AA Compliant**: Powered by React Aria primitives (`ButtonPrimitive`), providing robust keyboard navigation, focus management, and screen-reader live regions.
- 🔒 **Type-Safe Accessibility**: Enforces `aria-label` or `aria-labelledby` at compile time when `isIconOnly={true}`.
- 🧩 **Compound Sub-Components**: `<Button.Label>`, `<Button.Icon>`, `<Button.Shortcut>`, `<Button.Spinner>`, and `<Button.Group>`.
- 🥞 **Context Cascading**: `<ButtonGroup>` automatically cascades size, variant, color, and state to all child buttons without prop-drilling.

---

## 📖 Documentation & Links

For interactive component playgrounds, code examples, standalone CSS usage, and the complete API reference table:

- 🌐 **[Official Documentation](https://ideasui.com/react/docs/components/button)**
- 🎨 **[Storybook Explorer](https://ideasui.com/storybook/?path=/docs/components-button)**
- 📦 **[NPM Package](https://www.npmjs.com/package/@ideasui/button)**

---

## 📄 License

MIT © [IdeasUI](https://ideasui.com)

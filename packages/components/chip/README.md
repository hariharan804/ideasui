# @ideasui/chip

A fully accessible, theme-aware compact element for IdeasUI applications. Represents tags, filters, selections, statuses, or dismissible items.

## Features

- 🧩 **Compound component architecture**: `Chip`, `ChipGroup`, `ChipAvatar`, `ChipIcon`, `ChipDismiss`
- 🎯 **Three interaction modes**: `static`, `selectable`, `dismissible`
- 🎨 **Visual variants**: `solid`, `soft`, `outline`, `ghost`
- 🌈 **Color schemes**: `primary`, `neutral`, `success`, `warning`, `danger`
- 📏 **Sizes**: `sm`, `md`, `lg`
- 🖼️ **Rich adornments**: Built-in avatar with initials fallback and icon wrappers
- 👥 **Group management**: `ChipGroup` with single and multiple selection modes
- ♿ **Accessible**: WCAG 2.1 AA compliant, full keyboard navigation, zero-axe violations

## Installation

```bash
pnpm add @ideasui/chip
# or via the full bundle
pnpm add @ideasui/react
```

## Basic Usage

```tsx
import { Chip } from '@ideasui/chip';

export function Example() {
  return <Chip>React</Chip>;
}
```

## Selectable Mode

```tsx
import { Chip } from '@ideasui/chip';

export function SelectableExample() {
  return (
    <Chip mode="selectable" defaultSelected color="primary">
      Interactive Tag
    </Chip>
  );
}
```

## Dismissible Mode

```tsx
import { Chip } from '@ideasui/chip';

export function DismissibleExample() {
  return (
    <Chip mode="dismissible" onDismiss={() => console.log('Dismissed!')}>
      Removable
    </Chip>
  );
}
```

## ChipGroup Selection

```tsx
import { Chip, ChipGroup } from '@ideasui/chip';
import { useState } from 'react';

export function FilterGroupExample() {
  const [selected, setSelected] = useState(['react']);

  return (
    <ChipGroup
      selectionMode="multiple"
      value={selected}
      onChange={setSelected}
      label="Technologies"
    >
      <Chip value="react">React</Chip>
      <Chip value="vue">Vue</Chip>
      <Chip value="svelte">Svelte</Chip>
    </ChipGroup>
  );
}
```

## Documentation

For full interactive examples and API reference, visit the [IdeasUI Documentation](https://ideasui.com/docs/react/components/chip).

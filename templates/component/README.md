# {{pascalCase name}} Component

{{sentenceCase name}} component built with React, TypeScript, and Tailwind CSS.

## Installation

```bash
npm install @ideasui/{{kebabCase name}}
```

## Usage

```tsx
import { {{pascalCase name}} } from '@ideasui/{{kebabCase name}}'

function App() {
  return (
    <{{pascalCase name}} variant="default" size="md">
      {{pascalCase name}} Content
    </{{pascalCase name}}>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'secondary' | 'default' | Visual variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Component size |
| children | ReactNode | - | Component content |
| className | string | - | Additional CSS classes |

## Examples

### Variants
```tsx
<{{pascalCase name}} variant="default">Default</{{pascalCase name}}>
<{{pascalCase name}} variant="secondary">Secondary</{{pascalCase name}}>
```

### Sizes
```tsx
<{{pascalCase name}} size="sm">Small</{{pascalCase name}}>
<{{pascalCase name}} size="md">Medium</{{pascalCase name}}>
<{{pascalCase name}} size="lg">Large</{{pascalCase name}}>
```
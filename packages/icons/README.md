# Icons Package

Shared icon library with commonly used SVG icons as React components.

## 📦 Installation

```bash
npm install @iui/icons
```

## 🎯 Available Icons

### Navigation
- `ChevronDown` - Dropdown arrows
- `ChevronUp` - Collapse arrows

### Actions
- `Check` - Success states, checkboxes
- `X` - Close buttons, remove actions
- `Search` - Search inputs
- `Eye` - Show password
- `EyeOff` - Hide password

### States
- `Loader` - Loading spinner (with animation)

## 🚀 Usage

```tsx
import { ChevronDown, Check, Loader } from '@iui/icons'

function MyComponent() {
  return (
    <div>
      <ChevronDown size={16} />
      <Check color="green" />
      <Loader size={20} className="text-blue-500" />
    </div>
  )
}
```

## 🎨 Props

All icons accept these props:

```tsx
interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string    // Default: 24
  color?: string           // Default: 'currentColor'
}
```

## 📋 Icon List

| Icon | Component | Use Case |
|------|-----------|----------|
| ⬇️ | `ChevronDown` | Dropdowns, accordions |
| ⬆️ | `ChevronUp` | Collapse, scroll to top |
| ✅ | `Check` | Success, checkboxes |
| ❌ | `X` | Close, delete, remove |
| 🔍 | `Search` | Search inputs |
| 👁️ | `Eye` | Show password |
| 🙈 | `EyeOff` | Hide password |
| ⏳ | `Loader` | Loading states |

## 🎯 Usage in Components

### Button with Icon
```tsx
import { Check } from '@your-org/icons'

<Button>
  <Check size={16} />
  Save Changes
</Button>
```

### Input with Search
```tsx
import { Search } from '@your-org/icons'

<div className="relative">
  <Search className="absolute left-3 top-3" size={16} />
  <Input className="pl-10" placeholder="Search..." />
</div>
```

### Loading Button
```tsx
import { Loader } from '@your-org/icons'

<Button disabled={loading}>
  {loading ? <Loader size={16} /> : 'Submit'}
</Button>
```

## 🔧 Customization

### Size
```tsx
<ChevronDown size={12} />  // Small
<ChevronDown size={24} />  // Default
<ChevronDown size={32} />  // Large
```

### Color
```tsx
<Check color="green" />
<Check color="#10b981" />
<Check className="text-green-500" />
```

### Animation
```tsx
<Loader className="animate-spin text-blue-500" />
```

This package provides essential icons needed for most UI components without external dependencies.
# API Documentation

## 📚 Component API Reference

### Button

A versatile button component with multiple variants and sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Size of the button |
| `asChild` | `boolean` | `false` | Render as child component |
| `disabled` | `boolean` | `false` | Disable the button |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |

#### Usage

```tsx
import { Button } from '@mylib/ui'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="lg">Large Outline</Button>

// As child component
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

### Input

A styled input component with proper focus states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the input |
| `value` | `string` | - | Controlled value |
| `onChange` | `(event: ChangeEvent) => void` | - | Change event handler |

#### Usage

```tsx
import { Input } from '@mylib/ui'

// Basic usage
<Input placeholder="Enter text..." />

// Controlled input
<Input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>
```

### Card

A flexible card container with header, content, and footer sections.

#### Components

- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title component
- `CardDescription` - Description component
- `CardContent` - Main content area
- `CardFooter` - Footer section

#### Usage

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@mylib/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## 🎨 Styling System

### Design Tokens

#### Colors

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

#### Typography Scale

```css
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
```

#### Spacing Scale

```css
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
```

### CSS Variables

#### Using CSS Variables

```tsx
// Custom component with design tokens
const CustomCard = styled.div`
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
`
```

## 🔧 Utility Functions

### cn (className utility)

Merges Tailwind CSS classes with proper conflict resolution.

```tsx
import { cn } from '@mylib/ui'

// Basic usage
cn('px-4', 'py-2') // 'px-4 py-2'

// Conditional classes
cn('base-class', condition && 'conditional-class')

// Tailwind conflict resolution
cn('p-4', 'p-2') // 'p-2' (p-2 overrides p-4)
```

### formatters

Common formatting utilities.

```tsx
import { formatters } from '@mylib/ui'

formatters.currency(1234.56) // '$1,234.56'
formatters.date(new Date()) // 'Jan 1, 2024'
formatters.truncate('Long text...', 10) // 'Long te...'
```

## 🪝 Custom Hooks

### useLocalStorage

Persist state in localStorage with SSR support.

```tsx
import { useLocalStorage } from '@mylib/ui'

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', 'default')
  
  return (
    <input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  )
}
```

### useDebounce

Debounce rapidly changing values.

```tsx
import { useDebounce } from '@mylib/ui'

function SearchComponent() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  
  useEffect(() => {
    // API call with debounced query
  }, [debouncedQuery])
  
  return <input onChange={(e) => setQuery(e.target.value)} />
}
```

## 📱 Responsive Design

### Breakpoints

```tsx
// Tailwind breakpoints
sm: '640px'   // Small devices
md: '768px'   // Medium devices  
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X large devices
```

### Responsive Usage

```tsx
<Button className="w-full md:w-auto">
  Responsive Button
</Button>

<Card className="p-4 md:p-6 lg:p-8">
  Responsive padding
</Card>
```

## 🌙 Dark Mode

### Theme Toggle

```tsx
import { useTheme } from '@mylib/ui'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <Button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </Button>
  )
}
```

### Dark Mode Classes

```tsx
// Automatic dark mode support
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content adapts to theme
</div>
```

## 🔍 TypeScript Support

### Component Props

```tsx
import type { ButtonProps } from '@mylib/ui'

// Extend component props
interface CustomButtonProps extends ButtonProps {
  loading?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  loading, 
  children, 
  ...props 
}) => (
  <Button disabled={loading} {...props}>
    {loading ? 'Loading...' : children}
  </Button>
)
```

### Variant Types

```tsx
import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '@mylib/ui'

type ButtonVariants = VariantProps<typeof buttonVariants>
```
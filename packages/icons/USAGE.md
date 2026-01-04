# @ideasui/icons - Lucide Style Usage

## ✅ **Lucide-Style Icon System Complete**

### 🎯 **How It Works**
1. Add SVG files to `assets/` directory
2. Run `pnpm generate` to create React components
3. Import and use like Lucide icons

### 📦 **Usage Examples**

```tsx
// Individual imports (tree-shakeable)
import { ArrowRight, Home, User, Heart, Search, Settings } from '@ideasui/icons';

function App() {
  return (
    <div>
      {/* Basic usage */}
      <ArrowRight />
      
      {/* With custom props */}
      <Home size={32} color="blue" />
      
      {/* With custom stroke width */}
      <User size={24} strokeWidth={1.5} />
      
      {/* With CSS classes */}
      <Heart className="text-red-500 hover:scale-110" />
      
      {/* All props */}
      <Search 
        size={20}
        color="currentColor"
        strokeWidth={2}
        className="search-icon"
        onClick={() => console.log('Search clicked')}
      />
    </div>
  );
}
```

### 🔄 **Adding New Icons**

1. **Add SVG file** to `assets/` directory:
```bash
# Example: assets/star.svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
</svg>
```

2. **Generate components**:
```bash
pnpm generate
```

3. **Use the new icon**:
```tsx
import { Star } from '@ideasui/icons';

<Star size={24} color="gold" />
```

### 🎨 **Icon Props (Lucide Compatible)**

```tsx
interface IconProps {
  size?: number | string;        // Default: 24
  color?: string;               // Default: 'currentColor'
  strokeWidth?: number | string; // Default: 2
  className?: string;           // CSS classes
  // + all SVG props (onClick, onHover, etc.)
}
```

### 🏗️ **Generated Structure**

```
src/
├── icons/
│   ├── ArrowRight.tsx    # Individual components
│   ├── Home.tsx
│   ├── User.tsx
│   └── index.ts          # Re-exports
├── types.ts              # TypeScript definitions
├── createIcon.tsx        # Custom icon utility
└── index.ts              # Main exports
```

### ⚡ **Features**

- ✅ **Tree Shakeable**: Only import what you use
- ✅ **TypeScript**: Full type safety
- ✅ **ForwardRef**: Proper ref forwarding
- ✅ **Customizable**: Size, color, strokeWidth
- ✅ **Accessible**: Proper ARIA support
- ✅ **Consistent**: Same API as Lucide icons

### 🎯 **Perfect for Large Icon Sets**

Add hundreds of SVG files and they all become importable components:

```tsx
// Just like Lucide!
import { 
  ArrowRight, 
  Home, 
  User, 
  Settings,
  Search,
  Heart,
  // ... hundreds more
} from '@ideasui/icons';
```

This system scales to any number of icons while maintaining the clean Lucide-style API!
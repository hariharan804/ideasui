# Design Tokens Reference

This document provides a comprehensive reference for all design tokens in IdeasUI.

## 🎨 Color Tokens

See [colors.ts](../src/tokens/colors.ts) for the full OKLCH color system.

- **Semantic Colors**: primary, secondary, success, warning, danger, info, neutral, gray
- **Shade Scale**: 50-950 for each color
- **Dark Mode**: Optimized variants for dark theme

## 📐 Responsive Tokens

### Breakpoints

Responsive breakpoints following Tailwind CSS conventions:

```typescript
import { breakpoints } from '@ideasui/theme/tokens';

// Available breakpoints
{
  sm: '640px',    // Phones and up
  md: '768px',    // Tablets and up
  lg: '1024px',   // Laptops and up
  xl: '1280px',   // Desktops and up
  '2xl': '1536px' // Large desktops and up
}
```

**Usage in Tailwind:**

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">Responsive width</div>
```

### Container

Responsive container with automatic centering and padding:

```tsx
<div className="container">Automatically centered with responsive padding</div>
```

Container configuration:

- Centers content automatically
- Responsive padding: 1rem (mobile) → 2rem (desktop)
- Max-widths match breakpoints

### Responsive Spacing Patterns

Pre-defined responsive spacing combinations:

```typescript
import { responsiveSpacing } from '@ideasui/theme/tokens';

responsiveSpacing['sm-md']; // 0.5rem → 1rem
responsiveSpacing['md-lg']; // 1rem → 1.5rem
responsiveSpacing['lg-xl']; // 1.5rem → 2rem
responsiveSpacing['xl-2xl']; // 2rem → 3rem
```

## ✨ Motion Tokens

### Durations

Consistent timing for all animations:

```typescript
import { duration } from '@ideasui/theme/tokens';

duration.instant; // 75ms - Instant feedback
duration.fastest; // 100ms - Very fast
duration.faster; // 150ms - Fast
duration.normal; // 200ms - Default
duration.slow; // 300ms - Slow
duration.slower; // 400ms - Slower
duration.slowest; // 500ms - Slowest
duration.enter; // 700ms - Enter animations
duration.exit; // 300ms - Exit animations
```

**Usage in Tailwind:**

```tsx
<div className="duration-normal transition-all">Smooth transition</div>
```

### Easing Functions

Natural-feeling animation curves:

```typescript
import { easing } from '@ideasui/theme/tokens';

// Standard easings
easing.linear; // No easing
easing.in; // Accelerating
easing.out; // Decelerating
easing.inOut; // Accelerate then decelerate

// Material Design
easing.standard; // Smooth, natural (recommended)
easing.decelerate; // Entering elements
easing.accelerate; // Exiting elements
easing.sharp; // Quick, precise

// Special effects
easing.bounce; // Playful bounce
easing.elastic; // Spring-like
easing.ios; // iOS-style animation
```

**Usage in Tailwind:**

```tsx
<div className="ease-standard transition-transform">Material Design animation</div>
```

### Motion Presets

Component-specific motion configurations:

```typescript
import { motion } from '@ideasui/theme/tokens';

motion.ripple; // Material ripple effect
motion.fade; // Fade in/out
motion.slide; // Slide animations
motion.scale; // Scale animations
motion.tooltip; // Tooltip appearance
motion.modalEnter; // Dialog open
motion.modalExit; // Dialog close
motion.dropdown; // Dropdown menu
motion.toast; // Notifications
motion.hover; // Hover effects
motion.focus; // Focus effects
motion.active; // Press/active state
```

**Usage Example:**

```tsx
import { motion } from '@ideasui/theme/tokens';

const Button = () => (
  <button
    className="transition-all"
    style={{
      transitionDuration: motion.hover.duration,
      transitionTimingFunction: motion.hover.easing,
    }}
  >
    Hover me
  </button>
);
```

### Animation Delays

For staggered animations:

```typescript
import { delay } from '@ideasui/theme/tokens';

delay.none; // 0ms
delay.xs; // 50ms
delay.sm; // 100ms
delay.md; // 150ms
delay.lg; // 200ms
delay.xl; // 300ms
```

**Usage in Tailwind:**

```tsx
<div className="animate-fade-in delay-sm">Delayed animation</div>
```

## 🎯 Usage Examples

### Responsive Card

```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
    <Card />
    <Card />
    <Card />
  </div>
</div>
```

### Animated Modal

```tsx
import { motion } from '@ideasui/theme/tokens';

<div
  className="fixed inset-0 transition-opacity"
  style={{
    transitionDuration: motion.modalEnter.duration,
    transitionTimingFunction: motion.modalEnter.easing,
  }}
>
  <div className="rounded-lg bg-white">Modal content</div>
</div>;
```

### Smooth Hover Effect

```tsx
<button className="duration-faster transition-all ease-out hover:scale-105">Hover me</button>
```

### Staggered List Animation

```tsx
{
  items.map((item, index) => (
    <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
      {item.content}
    </div>
  ));
}
```

## 📚 Best Practices

### Responsive Design

1. **Mobile First**: Design for mobile, then add breakpoints for larger screens
2. **Use Container**: Wrap content in `container` for consistent max-widths
3. **Consistent Spacing**: Use responsive spacing patterns for uniform scaling
4. **Test All Breakpoints**: Check responsiveness at sm, md, lg, xl, 2xl

### Animations

1. **Use Presets**: Start with `motion` presets for consistency
2. **Match Context**: Enter animations → `decelerate`, Exit → `accelerate`
3. **Keep it Fast**: Most animations should be 200-300ms
4. **Respect Motion Preferences**: Users can disable animations
5. **Stagger Thoughtfully**: Use delays for lists, but keep under 100ms per item

### Performance

1. **Prefer Transform**: Use `transform` and `opacity` for best performance
2. **Avoid Layout Shifts**: Animate transform/opacity instead of width/height
3. **Use will-change**: Hint browser for complex animations
4. **Reduce Motion**: Respect `prefers-reduced-motion`

## 🔗 Related Documentation

- [Component Standards](../../../../docs/COMPONENT_STANDARDS.md)
- [Theme System](../system/README.md)
- [Tailwind Configuration](../system/plugin/index.ts)

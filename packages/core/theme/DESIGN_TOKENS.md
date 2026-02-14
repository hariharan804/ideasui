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

### Animation Sequences

Complex multi-step animations:

```typescript
import { sequences } from '@ideasui/theme/tokens';

sequences.slideAndFade; // Slide + fade combination
sequences.scaleAndFade; // Scale + fade combination
sequences.bounceIn; // Entrance with bounce
```

---

## 🔧 CSS Custom Properties

**New in v1.0:** All design tokens are now also available as CSS custom properties for runtime theming!

### Why CSS Variables?

IdeasUI uses a **hybrid approach** combining TypeScript tokens with CSS variables:

- ✅ **TypeScript Tokens**: Type-safe, autocomplete, compile-time validation
- ✅ **CSS Variables**: Runtime switching, framework-agnostic, DevTools inspection

  /_ Easing tokens _/
  --ideasui-easing-linear: linear;
  --ideasui-easing-in: ease-in;
  --ideasui-easing-out: ease-out;
  --ideasui-easing-in-out: ease-in-out;
  --ideasui-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ideasui-easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --ideasui-easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --ideasui-easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);
  --ideasui-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ideasui-easing-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  --ideasui-easing-ios: cubic-bezier(0.36, 0, 0.66, -0.56);

  /_ Delay tokens _/
  --ideasui-delay-none: 0ms;
  --ideasui-delay-xs: 50ms;
  --ideasui-delay-sm: 100ms;
  --ideasui-delay-md: 150ms;
  --ideasui-delay-lg: 200ms;
  --ideasui-delay-xl: 300ms;

  /_ Breakpoint tokens (for JavaScript access) _/
  --ideasui-breakpoint-sm: 640px;
  --ideasui-breakpoint-md: 768px;
  --ideasui-breakpoint-lg: 1024px;
  --ideasui-breakpoint-xl: 1280px;
  --ideasui-breakpoint-2xl: 1536px;
  }

````

### Usage: Hybrid Approach

**Approach 1: TypeScript Tokens (Recommended for React)**

```tsx
import { duration, easing } from '@ideasui/theme/tokens';

const AnimatedComponent = () => (
  <div
    className="transition-all"
    style={{
      transitionDuration: duration.normal, // Type-safe! ✅
      transitionTimingFunction: easing.standard,
    }}
  >
    Content
  </div>
);
````

**Approach 2: CSS Variables (Framework-agnostic)**

```tsx
const AnimatedComponent = () => (
  <div
    className="transition-all"
    style={{
      transitionDuration: 'var(--ideasui-duration-normal)',
      transitionTimingFunction: 'var(--ideasui-easing-standard)',
    }}
  >
    Content
  </div>
);
```

**Approach 3: Pure CSS**

```css
.my-component {
  transition-property: all;
  transition-duration: var(--ideasui-duration-normal);
  transition-timing-function: var(--ideasui-easing-standard);
}

.my-component--fast {
  transition-duration: var(--ideasui-duration-faster);
}
```

### Runtime Theme Switching

CSS variables enable dynamic theme changes:

```typescript
// Change animation speed globally
document.documentElement.style.setProperty(
  '--ideasui-duration-normal',
  '500ms', // Make all animations slower
);

// Create a "slow motion" mode
const enableSlowMotion = () => {
  document.documentElement.style.setProperty('--ideasui-duration-normal', '1s');
  document.documentElement.style.setProperty('--ideasui-duration-faster', '800ms');
  document.documentElement.style.setProperty('--ideasui-duration-slow', '1.5s');
};

// Reset to defaults
const resetAnimationSpeed = () => {
  document.documentElement.style.removeProperty('--ideasui-duration-normal');
  document.documentElement.style.removeProperty('--ideasui-duration-faster');
  document.documentElement.style.removeProperty('--ideasui-duration-slow');
};
```

### When to Use Which Approach

| Scenario                | Use TypeScript Tokens | Use CSS Variables |
| ----------------------- | --------------------- | ----------------- |
| **React components**    | ✅ Recommended        | ⚠️ Optional       |
| **Type safety needed**  | ✅ Yes                | ❌ No             |
| **Runtime theming**     | ❌ Limited            | ✅ Yes            |
| **Vanilla CSS/HTML**    | ❌ No                 | ✅ Yes            |
| **Vue/Svelte/Angular**  | ⚠️ Manual import      | ✅ Automatic      |
| **DevTools inspection** | ⚠️ Computed only      | ✅ Direct access  |
| **Framework-agnostic**  | ❌ Requires build     | ✅ Works anywhere |

### Best Practices

1. **Start with TypeScript tokens** - Get type safety and autocomplete
2. **Use CSS variables for runtime changes** - Theme switchers, user preferences
3. **Both work together** - You can mix approaches in the same project
4. **Inspect in DevTools** - CSS variables are visible and editable in browser tools

---

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

---

## 🏗️ CSS Architecture

### CSS Layers

IdeasUI uses CSS `@layer` for better cascade control:

```css
@layer base, components, utilities;
```

**What this means:**

- **Base layer**: Reset styles, CSS variables, foundational styles
- **Components layer**: Component-specific styles
- **Utilities layer**: Tailwind utilities (highest priority)

**Benefits:**

- Predictable specificity
- No more `!important` battles
- Easier to override styles
- Layer order determines cascade, not selector specificity

**Learn more:** [CSS Cascade Layers (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

---

## 📚 Best Practices

### Design Tokens

1. **Import from package**: Always import from `@ideasui/theme/tokens`
2. **Use TypeScript first**: Get autocomplete and type safety
3. **CSS variables for runtime**: Use when you need dynamic theming
4. **Don't hardcode values**: Use tokens instead of magic numbers
5. **Consistent naming**: Follow the token naming conventions

### Responsive Design

1. **Mobile First**: Design for mobile, then add breakpoints for larger screens
2. **Use Container**: Wrap content in `container` for consistent max-widths
3. **Consistent Spacing**: Use responsive spacing patterns for uniform scaling
4. **Test All Breakpoints**: Check responsiveness at sm, md, lg, xl, 2xl

### Animations

1. **Use Presets**: Start with `motion` presets for consistency
2. **Match Context**: Enter animations → `decelerate`, Exit → `accelerate`
3. **Keep it Fast**: Most animations should be 200-300ms
4. **Respect Motion Preferences**: Users can disable animations via `prefers-reduced-motion`
5. **Stagger Thoughtfully**: Use delays for lists, but keep under 100ms per item

###

Performance

1. **Prefer Transform**: Use `transform` and `opacity` for best performance
2. **Avoid Layout Shifts**: Animate transform/opacity instead of width/height
3. **Use will-change**: Hint browser for complex animations
4. **Reduce Motion**: Respect `prefers-reduced-motion`
5. **CSS Variables overhead**: Minimal - use freely

### Hybrid Approach

1. **TypeScript for new code**: Type safety and DX benefits
2. **CSS vars for themes**: Enable runtime switching
3. **Mix and match**: Both approaches work together
4. **Document your choice**: Be consistent within components

---

## 🔗 Related Documentation

- [Component Standards](../../../../docs/COMPONENT_STANDARDS.md)
- [Theme System](../system/README.md)
- [Tailwind Configuration](../system/plugin/index.ts)

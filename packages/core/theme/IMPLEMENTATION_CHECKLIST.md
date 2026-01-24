# Theme Package Implementation Checklist

**Based on:** [ARCHITECTURE_COMPARISON.md](../ARCHITECTURE_COMPARISON.md)  
**Package:** `@ideasui/theme`  
**Goal:** Enhance TypeScript-first approach with best practices from HeroUI styles

---

## 🎯 Implementation Tasks

### ✅ Already Completed

- [x] TypeScript design tokens (colors, spacing, typography)
- [x] Responsive breakpoints system
- [x] Motion/animation tokens
- [x] OKLCH color system
- [x] Tailwind plugin integration
- [x] Type-safe variant system

  ### 📋 To Implement

#### **Phase 1: CSS Layers** ✅ **COMPLETED**

**Priority:** High  
**Complexity:** Low  
**Time Taken:** ~30 minutes  
**Status:** ✅ Done - See [CSS_LAYERS_IMPLEMENTATION.md](./docs/CSS_LAYERS_IMPLEMENTATION.md)

**What was done:**

- Added `@layer base, components, utilities': {}` to Tailwind plugin
- Build verified successful
- No breaking changes

---

#### **Phase 2: CSS Variable Generation** 🔴 High Priority

**Priority:** High
**Complexity:** Medium

**What to do:**

Generate CSS custom properties from TypeScript tokens:

```typescript
// packages/core/theme/src/system/plugin/index.ts
import { duration, easing, motion, breakpoints } from '../../tokens';
import { lightColorTokens, darkColorTokens } from '../../tokens/colors';

export const ideasUIPlugin = (config: ThemeConfig = {}) => {
  return plugin(
    ({ addBase }) => {
      // Generate CSS vars from TypeScript tokens
      const cssVars: Record<string, string> = {};

      // Motion tokens → CSS vars
      Object.entries(duration).forEach(([key, value]) => {
        cssVars[`--duration-${key}`] = value;
      });

      Object.entries(easing).forEach(([key, value]) => {
        cssVars[`--easing-${key}`] = value;
      });

      // Color tokens → CSS vars
      Object.entries(lightColorTokens).forEach(([key, shades]) => {
        if (typeof shades === 'object') {
          Object.entries(shades).forEach(([shade, value]) => {
            cssVars[`--color-${key}-${shade}`] = value;
          });
        } else {
          cssVars[`--color-${key}`] = shades;
        }
      });

      addBase({
        ':root': cssVars,
        '.dark': {
          // Generate dark mode CSS vars
          // ... map darkColorTokens
        },
      });
    },
    {
      theme: {
        extend: createThemeExtension(/* ... */),
      },
    },
  );
};
```

**Usage:**

```tsx
// Components can now use either approach
<button
  className="duration-normal transition-all" // TypeScript token via Tailwind
  style={{
    transitionDuration: 'var(--duration-normal)', // CSS variable directly
  }}
>
  Flexible theming
</button>
```

**Benefits:**

- Runtime theme switching
- Easier debugging in DevTools
- Works without JavaScript
- Compatible with vanilla CSS

---

#### **Phase 3: BEM Base Classes** (8-10 hours)

**Priority:** Medium  
**Complexity:** Medium-High

**What to do:**

Add base class names to component recipes for easier debugging:

```typescript
// packages/core/theme/src/recipes/button.ts

const button = tv({
  slots: {
    base: [
      'btn', // ← Add BEM base class
      'inline-flex',
      'items-center',
      'justify-center',
      // ... rest of utilities
    ],
    icon: ['btn__icon', 'shrink-0'],
    label: ['btn__label', 'truncate'],
  },
  variants: {
    variant: {
      solid: {
        base: [
          'btn--solid', // ← Add BEM variant class
          'bg-primary-500',
          'hover:bg-primary-600',
        ],
      },
      outline: {
        base: [
          'btn--outline', // ← Add BEM variant class
          'border',
          'border-primary',
        ],
      },
    },
    size: {
      sm: {
        base: ['btn--sm', 'h-9', 'px-3'],
        icon: 'h-4 w-4',
      },
      md: {
        base: ['btn--md', 'h-10', 'px-4'],
        icon: 'h-4 w-4',
      },
    },
  },
});
```

**Generated output:**

```html
<!-- Before -->
<button class="bg-primary-500 hover:bg-primary-600 inline-flex items-center justify-center ...">
  <!-- After -->
  <button
    class="btn btn--solid btn--md bg-primary-500 hover:bg-primary-600 inline-flex items-center ..."
  >
    ↑ Easy to find in DevTools
  </button>
</button>
```

**Update needed:**

- All component recipes in `src/recipes/`
- Component generation templates
- Update tests if they rely on specific class names

**Benefits:**

- Easier debugging in DevTools
- Clear component identification
- Better CSS organization

---

#### **Phase 4: Update Component Templates** (2-3 hours)

**Priority:** Low  
**Complexity:** Low

**What to do:**

Update component generation templates to include BEM classes by default:

```typescript
// .plop/templates/recipe.ts.hbs

export const {{camelCase name}} = tv({
  slots: {
    base: [
      '{{kebabCase name}}',  // BEM base class
      // ... utilities
    ],
  },
  variants: {
    variant: {
      default: {
        base: ['{{kebabCase name}}--default', /* ... */],
      },
    },
  },
});
```

**Benefits:**

- All new components follow convention
- Consistency across library

---

#### **Phase 5: Documentation Updates** (2-3 hours)

**Priority:** High  
**Complexity:** Low

**What to do:**

1. **Update DESIGN_TOKENS.md:**
   - Add section on CSS variables
   - Document runtime theming
   - Show both approaches (Tailwind utilities vs CSS vars)

2. **Update ARCHITECTURE.md:**
   - Document hybrid approach
   - Add CSS layers explanation
   - Update component examples

3. **Create migration guide** (if breaking changes)

---

#### **Phase 6: Optional CSS Bundle Export** (4-6 hours)

**Priority:** Low  
**Complexity:** Medium

**What to do:**

Create build script to export standalone CSS:

```bash
# Add to package.json
{
  "scripts": {
    "build:css": "tailwindcss -o dist/ideasui.css --minify"
  }
}
```

Create Tailwind config that compiles all utilities:

```javascript
// tailwind.standalone.config.js
import { ideasUIPlugin } from './src/system/plugin';

export default {
  content: [
    './src/**/*.{ts,tsx}',
    // Force generation of all variants
  ],
  plugins: [ideasUIPlugin()],
};
```

**Benefits:**

- Framework-agnostic usage
- CDN distribution option
- Vanilla CSS usage

---

## 📊 Implementation Summary

| Phase             | Priority  | Effort | Impact | Complexity  |
| ----------------- | --------- | ------ | ------ | ----------- |
| **CSS Layers**    | 🔴 High   | 2-3h   | High   | Low         |
| **CSS Variables** | 🔴 High   | 4-6h   | High   | Medium      |
| **BEM Classes**   | 🟡 Medium | 8-10h  | Medium | Medium-High |
| **Templates**     | 🟢 Low    | 2-3h   | Low    | Low         |
| **Documentation** | 🔴 High   | 2-3h   | High   | Low         |
| **CSS Export**    | 🟢 Low    | 4-6h   | Low    | Medium      |

**Total Estimated Time:** 22-31 hours

---

## 🎯 Recommended Order

### Week 1: Foundation

1. ✅ Add CSS layers (2-3h)
2. ✅ Generate CSS variables (4-6h)
3. ✅ Update documentation (2-3h)

### Week 2: Enhancement

4. ✅ Add BEM classes to button, card (4h)
5. ✅ Update component templates (2-3h)
6. ✅ Add BEM to remaining components (4-6h)

### Week 3: Optional

7. ⚠️ CSS bundle export (4-6h)
8. ⚠️ Framework examples (Vue, Svelte)

---

## 🧪 Testing Checklist

After each phase:

- [ ] Run `pnpm build` - Ensure no errors
- [ ] Run `pnpm test` - All tests pass
- [ ] Check Storybook - Visual verification
- [ ] Test theme switching - Light/dark modes
- [ ] Inspect DevTools - Verify class names
- [ ] Check bundle size - Ensure no bloat

---

## 📝 Code Examples

### Before (Current)

```tsx
// Component
const Button = ({ variant }) => {
  const styles = button({ variant: 'solid' });
  return <button className={styles.base()}>Click</button>;
};

// Output
<button class="inline-flex items-center ... bg-primary-500">
```

### After (Enhanced)

```tsx
// Component (same code)
const Button = ({ variant }) => {
  const styles = button({ variant: 'solid' });
  return <button className={styles.base()}>Click</button>;
};

// Output with BEM + CSS vars
<button
  class="btn btn--solid inline-flex items-center ... bg-primary-500"
  style="
    --button-bg: var(--color-primary-500);
    --duration: var(--duration-normal);
  "
>
```

**Key Difference:**

- Same TypeScript code
- Enhanced output with BEM classes
- CSS variables available for runtime theming
- Both approaches work simultaneously

---

## ⚠️ Breaking Changes

**None!** All enhancements are additive:

- CSS layers don't affect existing styles
- CSS variables are additional (Tailwind classes still work)
- BEM classes are added alongside utilities

**Migration:** Not required - backward compatible

---

## 🎓 References

- [ARCHITECTURE_COMPARISON.md](../ARCHITECTURE_COMPARISON.md) - Full analysis
- [STYLES_VS_THEME_COMPARISON.md](../STYLES_VS_THEME_COMPARISON.md) - Package comparison
- [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - Current token system
- [HeroUI Styles](../packages/core/styles-experimental/) - Reference implementation

---

**Last Updated:** January 24, 2026  
**Status:** Ready to implement  
**Estimated Completion:** 3 weeks (part-time)

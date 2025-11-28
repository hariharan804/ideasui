# Brand Theme Tokens Documentation

Complete guide to using CSS custom properties and color tokens in your component library.

## 🎨 Color System

### Shade Scale (50-950)
Each semantic color has 11 shades from lightest to darkest:

- **50-200**: Light backgrounds, subtle accents
- **300-400**: Borders, disabled states  
- **500**: Base color (primary brand color)
- **600-700**: Hover states, active elements
- **800-950**: Text, dark backgrounds

### Semantic Colors

#### Primary Colors
```css
/* Light backgrounds */
bg-primary-50    /* Very light brand tint */
bg-primary-100   /* Light brand background */
bg-primary-200   /* Subtle brand accent */

/* Interactive elements */
bg-primary-500   /* Main brand color */
bg-primary-600   /* Hover state */
bg-primary-700   /* Active/pressed state */

/* Text and dark elements */
text-primary-800 /* Dark brand text */
text-primary-900 /* Darker brand text */
```

#### Success Colors (Green)
```css
bg-success-100   /* Success background */
bg-success-500   /* Success button */
text-success-700 /* Success text */
border-success-300 /* Success border */
```

#### Warning Colors (Amber)
```css
bg-warning-100   /* Warning background */
bg-warning-500   /* Warning button */
text-warning-700 /* Warning text */
```

#### Danger Colors (Red)
```css
bg-danger-100    /* Error background */
bg-danger-500    /* Error button */
text-danger-700  /* Error text */
```

#### Info Colors (Blue)
```css
bg-info-100      /* Info background */
bg-info-500      /* Info button */
text-info-700    /* Info text */
border-info-300  /* Info border */
```

#### Neutral Colors
```css
bg-neutral-50    /* Page background */
bg-neutral-100   /* Card background */
bg-neutral-200   /* Border color */
text-neutral-600 /* Muted text */
text-neutral-900 /* Primary text */
```

## 🎯 Usage Patterns

### Buttons
```tsx
// Primary button
<button className="bg-primary-500 hover:bg-primary-600 text-primary-50">
  Primary Action
</button>

// Info button
<button className="bg-info-500 hover:bg-info-600 text-info-50">
  Learn More
</button>

// Danger button
<button className="bg-danger-500 hover:bg-danger-600 text-danger-50">
  Delete
</button>
```

### Cards & Containers
```tsx
// Light card
<div className="bg-neutral-50 border border-neutral-200">
  <h3 className="text-neutral-900">Card Title</h3>
  <p className="text-neutral-600">Card description</p>
</div>

// Info card
<div className="bg-info-50 border border-info-200">
  <h3 className="text-info-900">Information</h3>
</div>
```

### Status Indicators
```tsx
// Success state
<div className="bg-success-100 border border-success-300 text-success-800">
  ✓ Operation successful
</div>

// Info state
<div className="bg-info-100 border border-info-300 text-info-800">
  ℹ Additional information
</div>

// Warning state  
<div className="bg-warning-100 border border-warning-300 text-warning-800">
  ⚠ Please review
</div>

// Error state
<div className="bg-danger-100 border border-danger-300 text-danger-800">
  ✗ Something went wrong
</div>
```

### Form Elements
```tsx
// Input field
<input className="bg-neutral-50 border border-neutral-300 text-neutral-900 
                  focus:border-primary-500 focus:ring-primary-500" />

// Info input
<input className="bg-info-50 border border-info-300 text-info-900 
                  focus:border-info-500 focus:ring-info-500" />
```

## 🌙 Dark Mode

Colors automatically adapt in dark mode:

```tsx
// Same classes work in both modes
<div className="bg-neutral-50 text-neutral-900">
  {/* Light: white bg, dark text */}
  {/* Dark: dark bg, light text */}
</div>
```

## 📐 Semantic Tokens

### Color Tokens
```css
--color-primary            /* Base primary color */
--color-primary-foreground /* Primary text color */
--color-secondary          /* Base secondary color */
--color-secondary-foreground /* Secondary text color */
--color-success            /* Base success color */
--color-success-foreground /* Success text color */
--color-warning            /* Base warning color */
--color-warning-foreground /* Warning text color */
--color-danger             /* Base danger color */
--color-danger-foreground  /* Danger text color */
--color-info               /* Base info color */
--color-info-foreground    /* Info text color */
```

### Layout Colors
```css
--color-background         /* Page background */
--color-foreground         /* Primary text */
--color-muted              /* Subtle background */
--color-muted-foreground   /* Secondary text */
--color-border             /* Default borders */
--color-input              /* Form inputs */
--color-card               /* Card backgrounds */
--color-card-foreground    /* Card text */
```

### Material Design 3 Tokens
```css
--color-on-primary         /* Text on primary */
--color-primary-container  /* Light primary background */
--color-on-primary-container /* Text on primary container */
--color-surface            /* Surface background */
--color-on-surface         /* Text on surface */
--color-outline            /* Border/outline color */
```

## 🎨 Custom Properties

Access tokens directly in CSS:

```css
.custom-component {
  background: var(--color-primary-100);
  border: 1px solid var(--color-primary-300);
  color: var(--color-primary-800);
}

.info-banner {
  background: var(--color-info-50);
  border-left: 4px solid var(--color-info-500);
  color: var(--color-info-900);
}
```

## 📱 Responsive Usage

All tokens work with responsive prefixes:

```tsx
<div className="bg-neutral-100 md:bg-primary-50 lg:bg-info-50">
  Responsive backgrounds
</div>
```

## 🔧 Best Practices

### Do ✅
- Use semantic colors for their intended purpose
- Stick to the shade scale for consistency
- Test in both light and dark modes
- Use info colors for informational content
- Use neutral colors for layout elements

### Don't ❌
- Mix arbitrary colors with token system
- Use dark shades (800-950) for backgrounds in light mode
- Use light shades (50-200) for text in light mode
- Override token values without system consideration

## 🎯 Quick Reference

| Use Case | Light Mode | Dark Mode |
|----------|------------|-----------|
| Page background | `bg-neutral-50` | Auto-adapts |
| Card background | `bg-neutral-100` | Auto-adapts |
| Primary text | `text-neutral-900` | Auto-adapts |
| Secondary text | `text-neutral-600` | Auto-adapts |
| Borders | `border-neutral-200` | Auto-adapts |
| Primary button | `bg-primary-500` | Auto-adapts |
| Info button | `bg-info-500` | Auto-adapts |
| Success message | `bg-success-100 text-success-800` | Auto-adapts |
| Info message | `bg-info-100 text-info-800` | Auto-adapts |

## 🆕 Complete Color Set

Your theme now includes these semantic colors:
- **Primary** - Brand color
- **Secondary** - Complementary brand color  
- **Success** - Green for positive actions
- **Warning** - Amber for caution
- **Danger** - Red for errors/destructive actions
- **Info** - Blue for informational content
- **Neutral** - Brand-aware grays for layout
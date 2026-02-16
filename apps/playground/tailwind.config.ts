import type { Config } from 'tailwindcss';

import { ideasUIPlugin } from '@ideasui/theme/plugin';

export default {
  plugins: [ideasUIPlugin() as unknown as Config],
} as Config;

/* ═══════════════════════════════════════════════════════════════
   Consumer Examples — copy any of these into your own project
   ═══════════════════════════════════════════════════════════════ */

// ── Example 1: Default (zero-config) ──
// ideasUIPlugin()

// ── Example 2: Custom CSS variable prefix ──
// ideasUIPlugin({ prefix: 'myapp' })
// → generates --myapp-primary-500, --myapp-neutral-50, etc.

// ── Example 3: Override brand colors ──
// ideasUIPlugin({
//   themes: {
//     light: {
//       colors: {
//         primary: {
//           500: 'oklch(0.65 0.25 145)',   // custom green primary
//           600: 'oklch(0.55 0.22 145)',
//         },
//         secondary: {
//           500: 'oklch(0.60 0.20 30)',    // warm coral secondary
//         },
//       },
//     },
//     dark: {
//       colors: {
//         primary: {
//           500: 'oklch(0.70 0.20 145)',
//         },
//       },
//     },
//   },
// })

// ── Example 4: Disable animations (e.g. prefers-reduced-motion) ──
// ideasUIPlugin({
//   disableAnimations: true,
//   defaultTheme: 'dark',
// })

// ── Example 5: Full token chain — complete brand system override ──
// ideasUIPlugin({
//   prefix: 'brand',
//   defaultTheme: 'light',
//   themes: {
//     light: {
//       colors: {
//         primary:   { 50: 'oklch(0.97 0.02 260)', 100: 'oklch(0.93 0.04 260)', 200: 'oklch(0.87 0.07 260)', 300: 'oklch(0.79 0.11 260)', 400: 'oklch(0.70 0.16 260)', 500: 'oklch(0.59 0.20 260)', 600: 'oklch(0.50 0.19 260)', 700: 'oklch(0.42 0.17 260)', 800: 'oklch(0.32 0.15 260)', 900: 'oklch(0.22 0.11 260)', 950: 'oklch(0.14 0.08 260)' },
//         secondary: { 50: 'oklch(0.97 0.02 160)', 100: 'oklch(0.93 0.04 160)', 200: 'oklch(0.87 0.07 160)', 300: 'oklch(0.79 0.11 160)', 400: 'oklch(0.70 0.15 160)', 500: 'oklch(0.59 0.20 160)', 600: 'oklch(0.50 0.19 160)', 700: 'oklch(0.42 0.17 160)', 800: 'oklch(0.32 0.14 160)', 900: 'oklch(0.22 0.11 160)', 950: 'oklch(0.14 0.08 160)' },
//         tertiary:  { 50: 'oklch(0.97 0.02 320)', 100: 'oklch(0.93 0.04 320)', 200: 'oklch(0.87 0.07 320)', 300: 'oklch(0.79 0.11 320)', 400: 'oklch(0.70 0.16 320)', 500: 'oklch(0.59 0.20 320)', 600: 'oklch(0.50 0.19 320)', 700: 'oklch(0.42 0.17 320)', 800: 'oklch(0.32 0.15 320)', 900: 'oklch(0.22 0.11 320)', 950: 'oklch(0.14 0.08 320)' },
//         neutral:   { 50: 'oklch(0.97 0.00 0)',   100: 'oklch(0.93 0.00 0)',   200: 'oklch(0.87 0.00 0)',   300: 'oklch(0.79 0.00 0)',   400: 'oklch(0.70 0.00 0)',   500: 'oklch(0.59 0.00 0)',   600: 'oklch(0.50 0.00 0)',   700: 'oklch(0.42 0.00 0)',   800: 'oklch(0.32 0.00 0)',   900: 'oklch(0.22 0.00 0)',   950: 'oklch(0.14 0.00 0)' },
//         success:   { 50: 'oklch(0.97 0.02 145)', 100: 'oklch(0.93 0.04 145)', 200: 'oklch(0.87 0.07 145)', 300: 'oklch(0.79 0.11 145)', 400: 'oklch(0.70 0.15 145)', 500: 'oklch(0.59 0.19 145)', 600: 'oklch(0.50 0.18 145)', 700: 'oklch(0.42 0.16 145)', 800: 'oklch(0.32 0.14 145)', 900: 'oklch(0.22 0.11 145)', 950: 'oklch(0.14 0.08 145)' },
//         danger:    { 50: 'oklch(0.97 0.02 25)',  100: 'oklch(0.93 0.04 25)',  200: 'oklch(0.87 0.07 25)',  300: 'oklch(0.79 0.11 25)',  400: 'oklch(0.70 0.16 25)',  500: 'oklch(0.59 0.21 25)',  600: 'oklch(0.50 0.20 25)',  700: 'oklch(0.42 0.18 25)',  800: 'oklch(0.32 0.15 25)',  900: 'oklch(0.22 0.11 25)',  950: 'oklch(0.14 0.08 25)' },
//         info:      { 50: 'oklch(0.97 0.02 240)', 100: 'oklch(0.93 0.04 240)', 200: 'oklch(0.87 0.07 240)', 300: 'oklch(0.79 0.11 240)', 400: 'oklch(0.70 0.16 240)', 500: 'oklch(0.59 0.20 240)', 600: 'oklch(0.50 0.19 240)', 700: 'oklch(0.42 0.17 240)', 800: 'oklch(0.32 0.15 240)', 900: 'oklch(0.22 0.11 240)', 950: 'oklch(0.14 0.08 240)' },
//         warning:   { 50: 'oklch(0.97 0.02 70)',  100: 'oklch(0.93 0.04 70)',  200: 'oklch(0.87 0.07 70)',  300: 'oklch(0.79 0.11 70)',  400: 'oklch(0.70 0.16 70)',  500: 'oklch(0.59 0.20 70)',  600: 'oklch(0.50 0.19 70)',  700: 'oklch(0.42 0.17 70)',  800: 'oklch(0.32 0.15 70)',  900: 'oklch(0.22 0.11 70)',  950: 'oklch(0.14 0.08 70)' },
//       },
//     },
//     dark: {
//       colors: {
//         primary:   { 50: 'oklch(0.14 0.08 260)', 100: 'oklch(0.20 0.10 260)', 200: 'oklch(0.28 0.13 260)', 300: 'oklch(0.38 0.15 260)', 400: 'oklch(0.48 0.18 260)', 500: 'oklch(0.59 0.20 260)', 600: 'oklch(0.70 0.17 260)', 700: 'oklch(0.79 0.14 260)', 800: 'oklch(0.87 0.10 260)', 900: 'oklch(0.93 0.06 260)', 950: 'oklch(0.97 0.03 260)' },
//         secondary: { 50: 'oklch(0.14 0.08 160)', 100: 'oklch(0.20 0.10 160)', 200: 'oklch(0.28 0.12 160)', 300: 'oklch(0.38 0.15 160)', 400: 'oklch(0.48 0.17 160)', 500: 'oklch(0.59 0.20 160)', 600: 'oklch(0.70 0.17 160)', 700: 'oklch(0.79 0.13 160)', 800: 'oklch(0.87 0.09 160)', 900: 'oklch(0.93 0.06 160)', 950: 'oklch(0.97 0.03 160)' },
//         tertiary:  { 50: 'oklch(0.14 0.08 320)', 100: 'oklch(0.20 0.10 320)', 200: 'oklch(0.28 0.13 320)', 300: 'oklch(0.38 0.15 320)', 400: 'oklch(0.48 0.18 320)', 500: 'oklch(0.59 0.20 320)', 600: 'oklch(0.70 0.17 320)', 700: 'oklch(0.79 0.14 320)', 800: 'oklch(0.87 0.10 320)', 900: 'oklch(0.93 0.06 320)', 950: 'oklch(0.97 0.03 320)' },
//         neutral:   { 50: 'oklch(0.14 0.00 0)',   100: 'oklch(0.20 0.00 0)',   200: 'oklch(0.28 0.00 0)',   300: 'oklch(0.38 0.00 0)',   400: 'oklch(0.48 0.00 0)',   500: 'oklch(0.59 0.00 0)',   600: 'oklch(0.70 0.00 0)',   700: 'oklch(0.79 0.00 0)',   800: 'oklch(0.87 0.00 0)',   900: 'oklch(0.93 0.00 0)',   950: 'oklch(0.97 0.00 0)' },
//         success:   { 50: 'oklch(0.14 0.08 145)', 100: 'oklch(0.20 0.10 145)', 200: 'oklch(0.28 0.12 145)', 300: 'oklch(0.38 0.14 145)', 400: 'oklch(0.48 0.17 145)', 500: 'oklch(0.59 0.19 145)', 600: 'oklch(0.70 0.16 145)', 700: 'oklch(0.79 0.13 145)', 800: 'oklch(0.87 0.09 145)', 900: 'oklch(0.93 0.05 145)', 950: 'oklch(0.97 0.03 145)' },
//         danger:    { 50: 'oklch(0.14 0.08 25)',  100: 'oklch(0.20 0.10 25)',  200: 'oklch(0.28 0.13 25)',  300: 'oklch(0.38 0.16 25)',  400: 'oklch(0.48 0.18 25)',  500: 'oklch(0.59 0.21 25)',  600: 'oklch(0.70 0.18 25)',  700: 'oklch(0.79 0.14 25)',  800: 'oklch(0.87 0.10 25)',  900: 'oklch(0.93 0.06 25)',  950: 'oklch(0.97 0.03 25)' },
//         info:      { 50: 'oklch(0.14 0.08 240)', 100: 'oklch(0.20 0.10 240)', 200: 'oklch(0.28 0.12 240)', 300: 'oklch(0.38 0.15 240)', 400: 'oklch(0.48 0.18 240)', 500: 'oklch(0.59 0.20 240)', 600: 'oklch(0.70 0.17 240)', 700: 'oklch(0.79 0.14 240)', 800: 'oklch(0.87 0.10 240)', 900: 'oklch(0.93 0.06 240)', 950: 'oklch(0.97 0.03 240)' },
//         warning:   { 50: 'oklch(0.14 0.08 70)',  100: 'oklch(0.20 0.10 70)',  200: 'oklch(0.28 0.12 70)',  300: 'oklch(0.38 0.15 70)',  400: 'oklch(0.48 0.18 70)',  500: 'oklch(0.59 0.20 70)',  600: 'oklch(0.70 0.17 70)',  700: 'oklch(0.79 0.14 70)',  800: 'oklch(0.87 0.10 70)',  900: 'oklch(0.93 0.06 70)',  950: 'oklch(0.97 0.03 70)' },
//       },
//     },
//   },
//   tokens: {
//     spacing: { 0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem', 24: '6rem', px: '1px' },
//     borderRadius: { none: '0', xs: '0.125rem', sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem', full: '9999px' },
//     fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem' },
//     letterSpacing: { tighter: '-0.05em', tight: '-0.025em', normal: '0em', wide: '0.025em', wider: '0.05em', widest: '0.1em' },
//     fontFamily: { sans: 'Inter, system-ui, sans-serif', mono: 'JetBrains Mono, monospace', heading: 'Outfit, sans-serif' },
//     boxShadow: { xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)', sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)', md: '0 4px 6px -1px rgb(0 0 0 / 0.1)', lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)', xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)', '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)', inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', none: 'none' },
//     zIndex: { hide: -1, base: 0, raised: 1, sticky: 100, fixed: 200, dropdown: 1000, overlay: 1100, modal: 1200, popover: 1300, toast: 1400, tooltip: 1500 },
//     opacity: { none: 0, subtle: 0.04, light: 0.08, medium: 0.16, strong: 0.38, heavy: 0.6, full: 1 },
//     duration: { xs: '75ms', sm: '100ms', md: '150ms', lg: '200ms', xl: '300ms', '2xl': '500ms', '3xl': '700ms', '4xl': '1000ms' },
//     easing: { standard: 'cubic-bezier(0.4, 0, 0.2, 1)', accelerate: 'cubic-bezier(0.4, 0, 1, 1)', decelerate: 'cubic-bezier(0, 0, 0.2, 1)', emphasized: 'cubic-bezier(0.2, 0.0, 0, 1.0)', linear: 'linear', spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
//     blur: { none: '0', sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', '3xl': '40px' },
//     breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
//   },
// })

/* ═══════════════════════════════════════════════════════════════
   Available Design Tokens — full reference
   All tokens below are auto-generated as CSS variables (--ideasui-*)
   and mapped to Tailwind utility classes.
   ═══════════════════════════════════════════════════════════════ */

// ── Colors (theme-aware: light/dark) ──
// CSS: --ideasui-primary-{50..950}, --ideasui-neutral-{50..950}, etc.
// TW:  bg-primary-500, text-neutral-200, border-danger-300
// Semantic: --ideasui-primary-base, --ideasui-success-subtle, --ideasui-warning-content
// TW:       bg-primary-base, text-success-subtle, bg-warning-content
// Surface:  --ideasui-surface-{base,raised,sunken,overlay,inverse}
// Content:  --ideasui-content-{primary,secondary,tertiary,muted,disabled,inverse}
// Border:   --ideasui-border-{subtle,default,strong,focus}

// ── Spacing (4px grid) ──
// CSS: --ideasui-spacing-{0,1,2,3,4,5,6,8,10,12,16,20,24,px}
// TW:  p-4 (1rem/16px), m-8 (2rem/32px), gap-6 (1.5rem/24px)

// ── Typography ──
// CSS: --ideasui-font-size-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl}
// TW:  text-xs, text-base, text-4xl
// CSS: --ideasui-tracking-{tighter,tight,normal,wide,wider,widest}
// TW:  tracking-tight, tracking-wide
// CSS: --ideasui-font-{sans,mono,heading}
// TW:  font-sans, font-mono, font-heading

// ── Border Radius ──
// CSS: --ideasui-radius-{none,xs,sm,md,lg,xl,2xl,3xl,4xl,full}
// TW:  rounded-sm (0.25rem), rounded-lg (0.5rem), rounded-full (9999px)

// ── Shadows ──
// CSS: --ideasui-shadow-{xs,sm,md,lg,xl,2xl,inner,none}
// TW:  shadow-sm, shadow-lg, shadow-2xl, shadow-inner

// ── Z-Index ──
// CSS: --ideasui-z-index-{hide,base,raised,sticky,fixed,dropdown,overlay,modal,popover,toast,tooltip}
// TW:  z-base (0), z-sticky (100), z-modal (1200), z-tooltip (1500)

// ── Opacity ──
// CSS: --ideasui-opacity-{none,subtle,light,medium,strong,heavy,full}
// TW:  opacity-subtle (0.04), opacity-medium (0.16), opacity-strong (0.38)

// ── Motion ──
// CSS: --ideasui-duration-{xs,sm,md,lg,xl,2xl,3xl,4xl}
// TW:  duration-xs (75ms), duration-lg (200ms), duration-2xl (500ms)
// CSS: --ideasui-easing-{standard,accelerate,decelerate,emphasized,linear,spring}
// TW:  ease-standard, ease-emphasized, ease-spring
// Animations: animate-spin, animate-ping, animate-pulse, animate-bounce,
//             animate-fadeIn, animate-fadeOut, animate-slideIn, animate-slideOut,
//             animate-scaleIn, animate-scaleOut

// ── Blur ──
// CSS: --ideasui-blur-{none,sm,md,lg,xl,2xl,3xl}
// TW:  blur-sm (4px), blur-lg (12px), blur-3xl (40px)

// ── Backdrop ──
// CSS: --ideasui-backdrop-{blur-sm,blur-md,blur-lg,blur-xl,brightness-dark,brightness-light,saturate}

// ── Elevation (surface + shadow pairs) ──
// CSS: --ideasui-elevation-{base,raised,floating,overlay,modal,toast,sunken}-{surface,shadow}

// ── Interaction ──
// CSS: --ideasui-interaction-{hover-overlay,active-overlay,disabled-opacity}

// ── Accessibility ──
// CSS: --ideasui-accessibility-{focus-outline-offset,focus-outline-width,min-click-target,min-touch-target,reduced-motion-duration}

// ── Breakpoints ──
// CSS: --ideasui-breakpoint-{sm,md,lg,xl,2xl}
// TW:  sm:flex (640px), md:grid (768px), lg:hidden (1024px), xl:block (1280px)

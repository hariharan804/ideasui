import type { Config } from 'tailwindcss';

import { ideasUIPlugin } from '@ideasui/theme/plugin';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/core/theme/src/recipes/**/*.ts',
  ],
  plugins: [
    ideasUIPlugin({
      defaultTheme: 'light',

      // ─────────────────────────────────────────────────────────────
      // 1. Global Design Tokens (Applies globally across all themes)
      // ─────────────────────────────────────────────────────────────
      designTokens: {
        fontFamily: {
          sans: 'Inter, system-ui, -apple-system, sans-serif',
          mono: 'Fira Code, monospace',
        },
        borderRadius: {
          brand: '0.75rem', // 12px brand radius
        },
        spacing: {
          18: '4.5rem',
          112: '28rem',
        },
      },

      // ─────────────────────────────────────────────────────────────
      // 2. Global Semantic Tokens
      // ─────────────────────────────────────────────────────────────
      semanticTokens: {
        content: {
          brand: 'var(--ideasui-color-primary)',
        },
      },

      // ─────────────────────────────────────────────────────────────
      // 3. Theme-Specific Overrides (Light & Dark)
      // ─────────────────────────────────────────────────────────────
      themes: {
        light: {
          // A. Theme Colors (OKLCH Precision Palette)
          colors: {
            primary: 'oklch(0.55 0.22 250)', // Vibrant Ocean Blue
            'on-primary': 'oklch(0.99 0 0)',
            'primary-subtle': 'oklch(0.94 0.05 250)',
            'on-primary-subtle': 'oklch(0.35 0.18 250)',

            secondary: 'oklch(0.65 0.20 160)', // Fresh Emerald Green
            'on-secondary': 'oklch(0.99 0 0)',

            surface: 'oklch(0.99 0.005 250)',
            'surface-subtle': 'oklch(0.96 0.01 250)',
            'surface-muted': 'oklch(0.92 0.02 250)',
          },

          // B. Component-Level Theme Overrides
          components: {
            button: {
              base: {
                borderRadius: 'var(--ideasui-radius-brand)',
              },
            },
          },
        },

        dark: {
          // A. Dark Mode Colors
          colors: {
            primary: 'oklch(0.68 0.20 250)', // Brighter Blue for Dark Surfaces
            'on-primary': 'oklch(0.12 0.05 250)',
            'primary-subtle': 'oklch(0.22 0.08 250)',
            'on-primary-subtle': 'oklch(0.85 0.12 250)',

            secondary: 'oklch(0.72 0.18 160)',
            'on-secondary': 'oklch(0.12 0.05 160)',

            surface: 'oklch(0.16 0.02 250)',
            'surface-subtle': 'oklch(0.20 0.02 250)',
            'surface-muted': 'oklch(0.25 0.03 250)',
          },

          // B. Dark Mode Component Overrides
          components: {
            button: {
              base: {
                borderRadius: 'var(--ideasui-radius-brand)',
              },
            },
          },
        },
      },
    }),
  ],
};

export default config;

// designTokens: {
//   spacing: {
//     cus: '10px',
//   },
// },
// components: {
//   button: {
//     base: {
//       backgroundColor: 'blue',
//     },
//   },
// },
// // disableAnimations: true,
// semanticTokens: {
//   content: {
//     cus: 'green',
//     'on-cus': 'yellow',
//   },
// },
// themes: {
//   light: {
//     designTokens: {
//       spacing: {
//         // cus: '30px',
//       },
//       boxShadow: {
//         cus: '0 0 0 1px red',
//       },
//       animation: {
//         cus: 'spin 1s linear infinite',
//       },
//       blur: {
//         cus: 'blur(10px)',
//       },
//       borderRadius: {
//         cus: '5px',
//       },
//       borderColor: {
//         cus: 'red',
//       },
//       borderWidth: {
//         cus: '1px',
//       },
//       duration: {
//         cus: '1s',
//       },
//       fontFamily: {
//         cus: 'Arial',
//       },
//       fontSize: {
//         cus: '12px',
//       },
//       fontWeight: {
//         cus: 'bold',
//       },
//       easing: {
//         cus: 'ease-in-out',
//       },
//       keyframes: {
//         cus: {
//           '0%': {
//             transform: 'rotate(0deg)',
//           },
//           '100%': {
//             transform: 'rotate(360deg)',
//           },
//         },
//       },
//       opacity: {
//         cus: '0.5',
//       },
//       zIndex: {
//         cus: '100',
//       },
//       letterSpacing: {
//         cus: '1px',
//       },
//     },
//     semanticTokens: {
//       border: {
//         cus: 'red',
//       },
//       content: {
//         // cus: 'red',
//         // 'on-cus': 'blue',
//       },
//       surface: {
//         cus: 'red',
//         'on-cus': 'blue',
//       },
//     },
//     components: {
//       button: {
//         base: {
//           // backgroundColor: 'red',
//         },
//       },
//     },
//     colors: {
//       btn: '#228880',
//       primary: {
//         '500': '#093333',
//         '550': '#090444',
//       },
//     },
//   },
// },
/* ═══════════════════════════════════════════════════════════════
   Consumer Examples — copy any of these into your own project
   ═══════════════════════════════════════════════════════════════ */

// ── Example 1: Default (zero-config) ──
// ideasUIPlugin()

// ── Example 2: Custom CSS variable prefix ──
// ideasUIPlugin({ prefix: 'myapp' })
// → generates --myapp-primary-500, --myapp-neutral-50, etc.

// ── Example 3: Override brand colors (using OKLCH for precision) ──
// ideasUIPlugin({
//   themes: {
//     light: {
//       colors: {
//         primary: {
//           500: 'oklch(0.65 0.25 145)',   // Custom green primary
//           600: 'oklch(0.55 0.22 145)',
//         },
//         secondary: {
//           500: 'oklch(0.60 0.20 30)',    // Warm coral secondary
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

// ── Example 5: Design Token Overrides ──
// ideasUIPlugin({
//   designTokens: {
//     spacing: { 1: '0.25rem', 2: '0.5rem', 4: '1rem' },
//     borderRadius: { sm: '0.25rem', md: '0.5rem', full: '9999px' },
//     fontSize: { base: '1rem', lg: '1.25rem' },
//     fontFamily: { sans: 'Inter, sans-serif' },
//   },
// })

// ── Example 6: Semantic Token Overrides (per-theme) ──
// ideasUIPlugin({
//   themes: {
//     light: {
//       semanticTokens: {
//         surface: {
//           base: 'oklch(1 0 0)',
//           raised: 'oklch(0.98 0.01 240)',
//         },
//         content: {
//           primary: 'oklch(0.2 0.02 240)',
//         },
//       },
//     },
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

// designTokens: {
//   spacing: {
//     cus: '30px',
//   },
//   boxShadow: {
//     cus: '0 0 0 1px red',
//   },
//   animation: {
//     cus: 'spin 1s linear infinite',
//   },
//   blur: {
//     cus: 'blur(10px)',
//   },
//   borderRadius: {
//     cus: '5px',
//   },
//   borderColor: {
//     cus: 'red',
//   },
//   borderWidth: {
//     cus: '1px',
//   },
//   duration: {
//     cus: '1s',
//   },
//   fontFamily: {
//     cus: 'Arial',
//   },
//   fontSize: {
//     cus: '12px',
//   },
//   fontWeight: {
//     cus: 'bold',
//   },
//   easing: {
//     cus: 'ease-in-out',
//   },
//   keyframes: {
//     cus: {
//       '0%': {
//         transform: 'rotate(0deg)',
//       },
//       '100%': {
//         transform: 'rotate(360deg)',
//       },
//     },
//   },
//   opacity: {
//     cus: '0.5',
//   },
//   zIndex: {
//     cus: '100',
//   },
//   letterSpacing: {
//     cus: '1px',
//   },
// },

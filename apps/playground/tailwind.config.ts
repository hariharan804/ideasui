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
      // 1. Global Token Overrides (applies globally across all themes)
      // ─────────────────────────────────────────────────────────────
      designTokens: {
        spacing: {
          globalGap: '2.5rem',
        },
      },
      semanticTokens: {},
      // ─────────────────────────────────────────────────────────────
      // 2. Theme-Specific Overrides
      // ─────────────────────────────────────────────────────────────
      themes: {
        dark: {
          colors: {},
          // components:{

          // }
          designTokens: {},
          semanticTokens: {},
        },
        light: {
          // A. Theme-Specific Colors (Flat & Scales)
          colors: {
            // Core colors are represented as scales (objects matching ColorScale)
            primary: {
              '50': 'oklch(0.97 0.01 125)',
              '100': 'oklch(0.93 0.03 125)',
              '200': 'oklch(0.87 0.06 125)',
              '300': 'oklch(0.79 0.10 125)',
              '400': 'oklch(0.65 0.15 125)',
              '500': 'oklch(0.42 0.18 125)', // Primary base color
              '600': 'oklch(0.35 0.16 125)',
              '700': 'oklch(0.28 0.13 125)',
              '800': 'oklch(0.20 0.10 125)',
              '900': 'oklch(0.13 0.06 125)',
              '950': 'oklch(0.08 0.04 125)',
            },
          },
          // B. Theme-Specific Design Tokens
          designTokens: {
            spacing: {
              cus: '10px',
            },
            borderRadius: {
              cus: '5px',
            },
            borderWidth: {
              cus: '1px',
            },
            borderColor: {
              cus: 'red',
            },
            fontSize: {
              cus: '12px',
              cusWithLineHeight: ['14px', { lineHeight: '20px' }],
            },
            fontWeight: {
              cus: 'bold',
            },
            fontFamily: {
              cus: 'Arial',
            },
            letterSpacing: {
              cus: '1px',
            },
            boxShadow: {
              cus: '0 0 0 1px red',
            },
            zIndex: {
              cus: '100',
            },
            opacity: {
              cus: '0.5',
            },
            blur: {
              cus: 'blur(10px)',
            },
            duration: {
              cus: '1s',
            },
            easing: {
              cus: 'ease-in-out',
            },
            animation: {
              cus: 'spin 1s linear infinite',
            },
            keyframes: {
              cus: {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            },
          },
          // C. Theme-Specific Semantic Tokens
          semanticTokens: {},
          // D. Component Overrides
          components: {
            button: {
              base: {
                backgroundColor: 'var(--ideasui-color-primary-500)',
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

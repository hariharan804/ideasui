// Generate CSS file with industry-standard tokens following theme.css structure
export function generateCSS(theme, config = {}) {
  const defaultConfig = {
    hoverOpacity: 0.8,
    disabledOpacity: 0.5,
    loadingOpacity: 0.6,
    overlayOpacity: 0.75,
    transitionFast: '150ms ease',
    transitionNormal: '250ms ease',
    transitionSlow: '350ms ease',
  }

  const finalConfig = { ...defaultConfig, ...config }
  let css = `@import "tailwindcss";

@layer base {
:root, :host {
`

  // Light mode colors
  Object.entries(theme.light).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      css += `  --color-${colorName}-${shade}: ${hex};\n`
    })
  })

  css += `
  /* Semantic Colors - Light Mode */
  --color-background: var(--color-neutral-50);
  --color-foreground: var(--color-neutral-900);
  --color-muted: var(--color-neutral-100);
  --color-muted-foreground: var(--color-neutral-500);
  --color-card: var(--color-neutral-50);
  --color-card-foreground: var(--color-neutral-900);
  --color-border: var(--color-neutral-200);
  --color-input: var(--color-neutral-200);
  --color-ring: var(--color-primary-500);`

  css += `}

.dark {
  /* Semantic Colors - Dark Mode */
  --color-background: var(--color-neutral-950);
  --color-foreground: var(--color-neutral-50);
  --color-muted: var(--color-neutral-900);
  --color-muted-foreground: var(--color-neutral-400);
  --color-card: var(--color-neutral-900);
  --color-card-foreground: var(--color-neutral-50);
  --color-border: var(--color-neutral-800);
  --color-input: var(--color-neutral-800);
  --color-ring: var(--color-primary-400);
  --color-destructive: var(--color-danger-400);
  --color-destructive-foreground: var(--color-danger-950);
  --color-accent: var(--color-neutral-800);
  --color-accent-foreground: var(--color-neutral-50);
  --color-popover: var(--color-neutral-900);
  --color-popover-foreground: var(--color-neutral-50);
  --color-secondary: var(--color-neutral-800);
  --color-secondary-foreground: var(--color-neutral-50);
`

  // Dark mode colors
  Object.entries(theme.dark).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      css += `  --color-${colorName}-${shade}: ${hex};\n`
    })
  })

  css += `}
}

@theme {
  /* Typography */
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, 'Cascadia Code', monospace;
  
  /* Colors - Reference CSS variables */
`

  // Reference colors in @theme
  Object.entries(theme.light).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade]) => {
      css += `  --color-${colorName}-${shade}: var(--color-${colorName}-${shade});\n`
    })
  })

  css += `
  /* Typography Scale */
  --text-0: 0;
  --text-0--line-height: 0;
  --text-3xs: 0.25rem;
  --text-3xs--line-height: calc(1 / 0.25);
  --text-2xs: 0.5rem;
  --text-2xs--line-height: calc(1 / 0.5);
  /* Other Typography Scale overrides from tailwindcss */

  /* Spacing */
  --spacing-0: 0px;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-9: 2.25rem;
  --spacing-10: 2.5rem;
  --spacing-11: 2.75rem;
  --spacing-12: 3rem;
  --spacing-14: 3.5rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-28: 7rem;
  --spacing-32: 8rem;
  --spacing-36: 9rem;
  --spacing-40: 10rem;
  --spacing-44: 11rem;
  --spacing-48: 12rem;
  --spacing-52: 13rem;
  --spacing-56: 14rem;
  --spacing-60: 15rem;
  --spacing-64: 16rem;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;
  
  /* Border Radius Scale */
  /* Radius overrides from tailwindcss */
  
  /* Animations 
  --animate-spin: spin 1s linear infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  */

  /* Interactive States */
  --opacity-hover: ${finalConfig.hoverOpacity};
  --opacity-disabled: ${finalConfig.disabledOpacity};
  --opacity-loading: ${finalConfig.loadingOpacity};
  --opacity-overlay: ${finalConfig.overlayOpacity};
  
  /* Transitions */
  --transition-fast: ${finalConfig.transitionFast};
  --transition-normal: ${finalConfig.transitionNormal};
  --transition-slow: ${finalConfig.transitionSlow};
  
  /* Z-Index Scale */
  --z-hide: -1;
  --z-base: 0;
  --z-docked: 10;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-banner: 1200;
  --z-overlay: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-skip-nav: 1600;
  --z-toast: 1700;
  --z-tooltip: 1800;
  --z-max: 2147483647;
  
  /* Focus Ring */
  --ring-width: 2px;
  --ring-offset: 2px;
  --ring-color: var(--color-primary-500);
  
  /* Border Widths */
  --border-1.5: 1.5px;
  
  
  /* Semantic Colors */
  --color-background: var(--color-neutral-50);
  --color-foreground: var(--color-neutral-900);
  --color-muted: var(--color-neutral-100);
  --color-muted-foreground: var(--color-neutral-500);
  --color-card: var(--color-neutral-50);
  --color-card-foreground: var(--color-neutral-900);
  --color-border: var(--color-neutral-200);
  --color-input: var(--color-neutral-200);
  --color-ring: var(--color-primary-500);
  --color-destructive: var(--color-danger-500);
  --color-destructive-foreground: var(--color-danger-50);
  --color-accent: var(--color-neutral-100);
  --color-accent-foreground: var(--color-neutral-900);
  --color-popover: var(--color-neutral-50);
  --color-popover-foreground: var(--color-neutral-900);
  --color-secondary: var(--color-neutral-100);
  --color-secondary-foreground: var(--color-neutral-900);
 
  /* Backdrop Blur */
  --backdrop-blur-sm: blur(4px);
  --backdrop-blur: blur(8px);
  --backdrop-blur-md: blur(12px);
  --backdrop-blur-lg: blur(16px);
  --backdrop-blur-xl: blur(24px);
  
  /* Gradients 
  --gradient-to-r: linear-gradient(to right, var(--tw-gradient-stops));
  --gradient-to-l: linear-gradient(to left, var(--tw-gradient-stops));
  --gradient-to-t: linear-gradient(to top, var(--tw-gradient-stops));
  --gradient-to-b: linear-gradient(to bottom, var(--tw-gradient-stops));
  */
}
 `

  return css
}

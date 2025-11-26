// Generate CSS file with industry-standard tokens following theme.css structure
export function generateCSS(theme, config = {}) {
  const defaultConfig = {
    hoverOpacity: 0.8,
    disabledOpacity: 0.5,
    loadingOpacity: 0.6,
    overlayOpacity: 0.75,
    transitionFast: '150ms ease',
    transitionNormal: '250ms ease',
    transitionSlow: '350ms ease'
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
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
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
  
  /* Max Widths */
  --max-w-xs: 20rem;
  --max-w-sm: 24rem;
  --max-w-md: 28rem;
  --max-w-lg: 32rem;
  --max-w-xl: 36rem;
  --max-w-2xl: 42rem;
  --max-w-3xl: 48rem;
  --max-w-4xl: 56rem;
  --max-w-5xl: 64rem;
  --max-w-6xl: 72rem;
  --max-w-7xl: 80rem;
  --max-w-full: 100%;
  --max-w-screen-sm: 640px;
  --max-w-screen-md: 768px;
  --max-w-screen-lg: 1024px;
  --max-w-screen-xl: 1280px;
  --max-w-screen-2xl: 1536px;
  
  /* Breakpoints */
  --screen-sm: 640px;
  --screen-md: 768px;
  --screen-lg: 1024px;
  --screen-xl: 1280px;
  --screen-2xl: 1536px;ing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-24: 6rem;
  
  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 0.125rem;
  --radius-DEFAULT: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-DEFAULT: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  /* Animations */
  --animate-spin: spin 1s linear infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  /* Interactive States */
  --opacity-hover: ${finalConfig.hoverOpacity};
  --opacity-disabled: ${finalConfig.disabledOpacity};
  --opacity-loading: ${finalConfig.loadingOpacity};
  --opacity-overlay: ${finalConfig.overlayOpacity};
  
  /* Transitions */
  --transition-fast: ${finalConfig.transitionFast};
  --transition-normal: ${finalConfig.transitionNormal};
  --transition-slow: ${finalConfig.transitionSlow};
  
  /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-popover: 1050;
  --z-tooltip: 1060;
  
  /* Component Sizes */
  --size-xs: 1.5rem;
  --size-sm: 2rem;
  --size-md: 2.5rem;
  --size-lg: 3rem;
  --size-xl: 3.5rem;
  
  /* Focus Ring */
  --ring-width: 2px;
  --ring-offset: 2px;
  --ring-color: var(--color-primary-500);
  
  /* Border Widths */
  --border-0: 0px;
  --border-DEFAULT: 1px;
  --border-2: 2px;
  --border-4: 4px;
  --border-8: 8px;
  
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
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
  
  /* Font Weights */
  --font-thin: 100;
  --font-extralight: 200;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
  
  /* Backdrop Blur */
  --backdrop-blur-sm: blur(4px);
  --backdrop-blur: blur(8px);
  --backdrop-blur-md: blur(12px);
  --backdrop-blur-lg: blur(16px);
  --backdrop-blur-xl: blur(24px);
  
  /* Gradients */
  --gradient-to-r: linear-gradient(to right, var(--tw-gradient-stops));
  --gradient-to-l: linear-gradient(to left, var(--tw-gradient-stops));
  --gradient-to-t: linear-gradient(to top, var(--tw-gradient-stops));
  --gradient-to-b: linear-gradient(to bottom, var(--tw-gradient-stops));
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  50% { opacity: .5; }
}`
  
  return css
}
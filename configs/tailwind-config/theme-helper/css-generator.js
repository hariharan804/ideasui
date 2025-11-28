// Generate CSS file with industry-standard tokens following theme.css structure
export function generateCSS(theme, config = {}) {
  const PREFIX = 'iui'
  
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
      css += `  --${PREFIX}-color-${colorName}-${shade}: ${hex};\n`
    })
    if (colorName === 'neutral') {
      Object.entries(shades).forEach(([shade, hex]) => {
        css += `  --${PREFIX}-color-gray-${shade}: var(--${PREFIX}-color-neutral-${shade});\n`
      })
    }
  })

  css += `
  /* Color Tokens - Light Mode */
  --${PREFIX}-color-primary: var(--${PREFIX}-color-primary-500);
  --${PREFIX}-color-primary-foreground: var(--${PREFIX}-color-primary-50);
  --${PREFIX}-color-secondary: var(--${PREFIX}-color-secondary-500);
  --${PREFIX}-color-secondary-foreground: var(--${PREFIX}-color-secondary-50);
  --${PREFIX}-color-success: var(--${PREFIX}-color-success-500);
  --${PREFIX}-color-success-foreground: var(--${PREFIX}-color-success-50);
  --${PREFIX}-color-warning: var(--${PREFIX}-color-warning-500);
  --${PREFIX}-color-warning-foreground: var(--${PREFIX}-color-warning-50);
  --${PREFIX}-color-danger: var(--${PREFIX}-color-danger-500);
  --${PREFIX}-color-danger-foreground: var(--${PREFIX}-color-danger-50);
  --${PREFIX}-color-info: var(--${PREFIX}-color-info-500);
  --${PREFIX}-color-info-foreground: var(--${PREFIX}-color-info-50);

  /* Semantic Colors */
  --${PREFIX}-color-background: var(--${PREFIX}-color-neutral-50);
  --${PREFIX}-color-foreground: var(--${PREFIX}-color-neutral-900);
  --${PREFIX}-color-muted: var(--${PREFIX}-color-neutral-100);
  --${PREFIX}-color-muted-foreground: var(--${PREFIX}-color-neutral-500);
  --${PREFIX}-color-card: var(--${PREFIX}-color-neutral-50);
  --${PREFIX}-color-card-foreground: var(--${PREFIX}-color-neutral-900);
  --${PREFIX}-color-border: var(--${PREFIX}-color-neutral-200);
  --${PREFIX}-color-input: var(--${PREFIX}-color-neutral-200);
  --${PREFIX}-color-ring: var(--${PREFIX}-color-primary-500);
  --${PREFIX}-color-white: #ffffff;
  --${PREFIX}-color-black: #000000;`

  css += `}

.dark {
  /* Color Tokens - Dark Mode */
  --${PREFIX}-color-primary: var(--${PREFIX}-color-primary-400);
  --${PREFIX}-color-primary-foreground: var(--${PREFIX}-color-primary-950);
  --${PREFIX}-color-secondary: var(--${PREFIX}-color-secondary-400);
  --${PREFIX}-color-secondary-foreground: var(--${PREFIX}-color-secondary-950);
  --${PREFIX}-color-success: var(--${PREFIX}-color-success-400);
  --${PREFIX}-color-success-foreground: var(--${PREFIX}-color-success-950);
  --${PREFIX}-color-warning: var(--${PREFIX}-color-warning-400);
  --${PREFIX}-color-warning-foreground: var(--${PREFIX}-color-warning-950);
  --${PREFIX}-color-danger: var(--${PREFIX}-color-danger-400);
  --${PREFIX}-color-danger-foreground: var(--${PREFIX}-color-danger-950);
  --${PREFIX}-color-info: var(--${PREFIX}-color-info-400);
  --${PREFIX}-color-info-foreground: var(--${PREFIX}-color-info-950);

  /* Dark Mode Semantics */
  --${PREFIX}-color-background: var(--${PREFIX}-color-neutral-950);
  --${PREFIX}-color-foreground: var(--${PREFIX}-color-neutral-50);
  --${PREFIX}-color-muted: var(--${PREFIX}-color-neutral-900);
  --${PREFIX}-color-muted-foreground: var(--${PREFIX}-color-neutral-400);
  --${PREFIX}-color-card: var(--${PREFIX}-color-neutral-900);
  --${PREFIX}-color-card-foreground: var(--${PREFIX}-color-neutral-50);
  --${PREFIX}-color-border: var(--${PREFIX}-color-neutral-800);
  --${PREFIX}-color-input: var(--${PREFIX}-color-neutral-800);
  --${PREFIX}-color-ring: var(--${PREFIX}-color-primary-400);
  --${PREFIX}-color-white: #000000;
  --${PREFIX}-color-black: #ffffff;
`

  // Dark mode colors
  Object.entries(theme.dark).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      css += `  --${PREFIX}-color-${colorName}-${shade}: ${hex};\n`
    })
    if (colorName === 'neutral') {
      Object.entries(shades).forEach(([shade, hex]) => {
        css += `  --${PREFIX}-color-gray-${shade}: var(--${PREFIX}-color-neutral-${shade});\n`
      })
    }
  })

  css += `}
}

@theme {
  /* Colors - Reference CSS variables */
`

  // Reference colors in @theme
  Object.entries(theme.light).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade]) => {
      css += `  --color-${colorName}-${shade}: var(--${PREFIX}-color-${colorName}-${shade});\n`
    })
    if (colorName === 'neutral') {
      Object.entries(shades).forEach(([shade, hex]) => {
        css += `  --color-gray-${shade}: var(--${PREFIX}-color-neutral-${shade});\n`
      })
    }
  })

  css += `
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
  --ring-color: var(--${PREFIX}-color-primary-500);
  
  /* Border Widths */
  --border-1-5: 1.5px;
  
  /* Material Design 3 Color Pairs */
  --color-primary: var(--${PREFIX}-color-primary-500);
  --color-primary-foreground: var(--${PREFIX}-color-primary-50);
  --color-on-primary: var(--${PREFIX}-color-white);
  --color-primary-container: var(--${PREFIX}-color-primary-100);
  --color-on-primary-container: var(--${PREFIX}-color-primary-900);
  
  --color-secondary: var(--${PREFIX}-color-secondary-500);
  --color-secondary-foreground: var(--${PREFIX}-color-secondary-50);
  --color-on-secondary: var(--${PREFIX}-color-white);
  --color-secondary-container: var(--${PREFIX}-color-secondary-100);
  --color-on-secondary-container: var(--${PREFIX}-color-secondary-900);
  
  --color-success: var(--${PREFIX}-color-success-500);
  --color-success-foreground: var(--${PREFIX}-color-success-50);
  --color-on-success: var(--${PREFIX}-color-white);
  --color-success-container: var(--${PREFIX}-color-success-100);
  --color-on-success-container: var(--${PREFIX}-color-success-900);
  
  --color-warning: var(--${PREFIX}-color-warning-500);
  --color-warning-foreground: var(--${PREFIX}-color-warning-50);
  --color-on-warning: var(--${PREFIX}-color-white);
  --color-warning-container: var(--${PREFIX}-color-warning-100);
  --color-on-warning-container: var(--${PREFIX}-color-warning-900);

  --color-danger: var(--${PREFIX}-color-danger-500);
  --color-danger-foreground: var(--${PREFIX}-color-danger-50);
  --color-on-danger: var(--${PREFIX}-color-white);
  --color-danger-container: var(--${PREFIX}-color-danger-100);
  --color-on-danger-container: var(--${PREFIX}-color-danger-900);
  
  --color-info: var(--${PREFIX}-color-info-500);
  --color-info-foreground: var(--${PREFIX}-color-info-50);
  --color-on-info: var(--${PREFIX}-color-white);
  --color-info-container: var(--${PREFIX}-color-info-100);
  --color-on-info-container: var(--${PREFIX}-color-info-900);
  
  --color-surface: var(--${PREFIX}-color-neutral-50);
  --color-on-surface: var(--${PREFIX}-color-neutral-900);
  --color-surface-variant: var(--${PREFIX}-color-neutral-100);
  --color-on-surface-variant: var(--${PREFIX}-color-neutral-500);
  
  --color-outline: var(--${PREFIX}-color-neutral-300);
  --color-outline-variant: var(--${PREFIX}-color-neutral-200);
  
  --color-disabled: var(--${PREFIX}-color-neutral-200);
  --color-on-disabled: var(--${PREFIX}-color-neutral-400);

  /* Legacy Semantic Colors */
  --color-background: var(--${PREFIX}-color-neutral-50);
  --color-foreground: var(--${PREFIX}-color-neutral-900);
  --color-muted: var(--${PREFIX}-color-neutral-100);
  --color-muted-foreground: var(--${PREFIX}-color-neutral-500);
  --color-card: var(--${PREFIX}-color-neutral-50);
  --color-card-foreground: var(--${PREFIX}-color-neutral-900);
  --color-border: var(--${PREFIX}-color-neutral-200);
  --color-input: var(--${PREFIX}-color-neutral-200);
  --color-ring: var(--${PREFIX}-color-primary-500);
  --color-destructive: var(--${PREFIX}-color-danger-500);
  --color-destructive-foreground: var(--${PREFIX}-color-danger-50);
  --color-accent: var(--${PREFIX}-color-neutral-100);
  --color-accent-foreground: var(--${PREFIX}-color-neutral-900);
  --color-popover: var(--${PREFIX}-color-neutral-50);
  --color-popover-foreground: var(--${PREFIX}-color-neutral-900);
  --color-white: var(--${PREFIX}-color-white);
  --color-black: var(--${PREFIX}-color-black);

  /* Backdrop Blur */
  --backdrop-blur-sm: blur(4px);
  --backdrop-blur: blur(8px);
  --backdrop-blur-md: blur(12px);
  --backdrop-blur-lg: blur(16px);
  --backdrop-blur-xl: blur(24px);
}
 `

  return css
}
// Generate CSS file with industry-standard tokens following theme.css structure
export function generateCSS(theme, config = {}) {
  const BRAND_NAME = 'iui'
  const PREFIX = BRAND_NAME ? `--${BRAND_NAME}-color-` : '--color-'

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
      css += `  ${PREFIX}${colorName}-${shade}: ${hex};\n`
    })
    if (colorName === 'neutral') {
      Object.entries(shades).forEach(([shade, hex]) => {
        css += `  ${PREFIX}gray-${shade}: var(${PREFIX}neutral-${shade});\n`
      })
    }
  })

  css += `
  /* Color Tokens - Light Mode */
  ${PREFIX}primary: var(${PREFIX}primary-500);
  ${PREFIX}primary-foreground: var(${PREFIX}primary-50);
  ${PREFIX}secondary: var(${PREFIX}secondary-500);
  ${PREFIX}secondary-foreground: var(${PREFIX}secondary-50);
  ${PREFIX}success: var(${PREFIX}success-500);
  ${PREFIX}success-foreground: var(${PREFIX}success-50);
  ${PREFIX}warning: var(${PREFIX}warning-500);
  ${PREFIX}warning-foreground: var(${PREFIX}warning-50);
  ${PREFIX}danger: var(${PREFIX}danger-500);
  ${PREFIX}danger-foreground: var(${PREFIX}danger-50);
  ${PREFIX}info: var(${PREFIX}info-500);
  ${PREFIX}info-foreground: var(${PREFIX}info-50);

  /* Semantic Colors */
  ${PREFIX}background: var(${PREFIX}neutral-50);
  ${PREFIX}foreground: var(${PREFIX}neutral-900);
  ${PREFIX}muted: var(${PREFIX}neutral-100);
  ${PREFIX}muted-foreground: var(${PREFIX}neutral-500);
  ${PREFIX}card: var(${PREFIX}neutral-50);
  ${PREFIX}card-foreground: var(${PREFIX}neutral-900);
  ${PREFIX}border: var(${PREFIX}neutral-200);
  ${PREFIX}input: var(${PREFIX}neutral-200);
  ${PREFIX}ring: var(${PREFIX}primary-500);
  ${PREFIX}white: #ffffff;
  ${PREFIX}black: #000000;
}
  `

  css += `

.dark {`
  // Dark mode colors
  Object.entries(theme.dark).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      css += `  ${PREFIX}${colorName}-${shade}: ${hex};\n`
    })
    if (colorName === 'neutral') {
      Object.entries(shades).forEach(([shade, hex]) => {
        css += `  ${PREFIX}gray-${shade}: var(${PREFIX}neutral-${shade});\n`
      })
    }
  })

  css += `

  /* Color Tokens - Dark Mode */
  ${PREFIX}primary: var(${PREFIX}primary-400);
  ${PREFIX}primary-foreground: var(${PREFIX}primary-950);
  ${PREFIX}secondary: var(${PREFIX}secondary-400);
  ${PREFIX}secondary-foreground: var(${PREFIX}secondary-950);
  ${PREFIX}success: var(${PREFIX}success-400);
  ${PREFIX}success-foreground: var(${PREFIX}success-950);
  ${PREFIX}warning: var(${PREFIX}warning-400);
  ${PREFIX}warning-foreground: var(${PREFIX}warning-950);
  ${PREFIX}danger: var(${PREFIX}danger-400);
  ${PREFIX}danger-foreground: var(${PREFIX}danger-950);
  ${PREFIX}info: var(${PREFIX}info-400);
  ${PREFIX}info-foreground: var(${PREFIX}info-950);

  /* Dark Mode Semantics */
  ${PREFIX}background: var(${PREFIX}neutral-950);
  ${PREFIX}foreground: var(${PREFIX}neutral-50);
  ${PREFIX}muted: var(${PREFIX}neutral-900);
  ${PREFIX}muted-foreground: var(${PREFIX}neutral-400);
  ${PREFIX}card: var(${PREFIX}neutral-900);
  ${PREFIX}card-foreground: var(${PREFIX}neutral-50);
  ${PREFIX}border: var(${PREFIX}neutral-800);
  ${PREFIX}input: var(${PREFIX}neutral-800);
  ${PREFIX}ring: var(${PREFIX}primary-400);
  ${PREFIX}white: #000000;
  ${PREFIX}black: #ffffff;
`

  css += `}
}

@theme {
  /* Colors - Reference CSS variables */
`

  // Reference colors in @theme
  Object.entries(theme.light).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade]) => {
      css += `  --color-${colorName}-${shade}: var(${PREFIX}${colorName}-${shade});\n`
    })
    if (colorName === 'neutral') {
      Object.entries(shades).forEach(([shade, hex]) => {
        css += `  --color-gray-${shade}: var(${PREFIX}neutral-${shade});\n`
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
  --ring-color: var(${PREFIX}primary-500);
  
  /* Border Widths */
  --border-1-5: 1.5px;
  
  /* Material Design 3 Color Pairs */
  --color-primary: var(${PREFIX}primary-500);
  --color-primary-foreground: var(${PREFIX}primary-50);
  --color-on-primary: var(${PREFIX}white);
  --color-primary-container: var(${PREFIX}primary-100);
  --color-on-primary-container: var(${PREFIX}primary-900);
  
  --color-secondary: var(${PREFIX}secondary-500);
  --color-secondary-foreground: var(${PREFIX}secondary-50);
  --color-on-secondary: var(${PREFIX}white);
  --color-secondary-container: var(${PREFIX}secondary-100);
  --color-on-secondary-container: var(${PREFIX}secondary-900);
  
  --color-success: var(${PREFIX}success-500);
  --color-success-foreground: var(${PREFIX}success-50);
  --color-on-success: var(${PREFIX}white);
  --color-success-container: var(${PREFIX}success-100);
  --color-on-success-container: var(${PREFIX}success-900);
  
  --color-warning: var(${PREFIX}warning-500);
  --color-warning-foreground: var(${PREFIX}warning-50);
  --color-on-warning: var(${PREFIX}white);
  --color-warning-container: var(${PREFIX}warning-100);
  --color-on-warning-container: var(${PREFIX}warning-900);

  --color-danger: var(${PREFIX}danger-500);
  --color-danger-foreground: var(${PREFIX}danger-50);
  --color-on-danger: var(${PREFIX}white);
  --color-danger-container: var(${PREFIX}danger-100);
  --color-on-danger-container: var(${PREFIX}danger-900);
  
  --color-info: var(${PREFIX}info-500);
  --color-info-foreground: var(${PREFIX}info-50);
  --color-on-info: var(${PREFIX}white);
  --color-info-container: var(${PREFIX}info-100);
  --color-on-info-container: var(${PREFIX}info-900);
  
  --color-surface: var(${PREFIX}neutral-50);
  --color-on-surface: var(${PREFIX}neutral-900);
  --color-surface-variant: var(${PREFIX}neutral-100);
  --color-on-surface-variant: var(${PREFIX}neutral-500);
  
  --color-outline: var(${PREFIX}neutral-300);
  --color-outline-variant: var(${PREFIX}neutral-200);
  
  --color-disabled: var(${PREFIX}neutral-200);
  --color-on-disabled: var(${PREFIX}neutral-400);

  /* Legacy Semantic Colors */
  --color-background: var(${PREFIX}neutral-50);
  --color-foreground: var(${PREFIX}neutral-900);
  --color-muted: var(${PREFIX}neutral-100);
  --color-muted-foreground: var(${PREFIX}neutral-500);
  --color-card: var(${PREFIX}neutral-50);
  --color-card-foreground: var(${PREFIX}neutral-900);
  --color-border: var(${PREFIX}neutral-200);
  --color-input: var(${PREFIX}neutral-200);
  --color-ring: var(${PREFIX}primary-500);
  --color-destructive: var(${PREFIX}danger-500);
  --color-destructive-foreground: var(${PREFIX}danger-50);
  --color-accent: var(${PREFIX}neutral-100);
  --color-accent-foreground: var(${PREFIX}neutral-900);
  --color-popover: var(${PREFIX}neutral-50);
  --color-popover-foreground: var(${PREFIX}neutral-900);
  --color-white: var(${PREFIX}white);
  --color-black: var(${PREFIX}black);

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

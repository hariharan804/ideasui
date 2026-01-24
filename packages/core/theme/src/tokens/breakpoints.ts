/**
 * Responsive breakpoint tokens
 * Following Tailwind CSS conventions for consistency
 */

/**
 * Screen breakpoints for responsive design
 */
export const breakpoints = {
  /** Extra small devices (phones, 640px and up) */
  sm: '640px',
  /** Small devices (tablets, 768px and up) */
  md: '768px',
  /** Medium devices (laptops, 1024px and up) */
  lg: '1024px',
  /** Large devices (desktops, 1280px and up) */
  xl: '1280px',
  /** Extra large devices (large desktops, 1536px and up) */
  '2xl': '1536px',
} as const;

/**
 * Container max-widths at each breakpoint
 */
export const containerSizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Container padding at each breakpoint
 */
export const containerPadding = {
  DEFAULT: '1rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2rem',
  '2xl': '2rem',
} as const;

/**
 * Responsive spacing scale
 * Use with padding, margin, gap utilities
 */
export const responsiveSpacing = {
  /** 0.5rem on mobile, 1rem on tablet+ */
  'sm-md': {
    DEFAULT: '0.5rem',
    md: '1rem',
  },
  /** 1rem on mobile, 1.5rem on tablet+ */
  'md-lg': {
    DEFAULT: '1rem',
    md: '1.5rem',
  },
  /** 1.5rem on mobile, 2rem on desktop+ */
  'lg-xl': {
    DEFAULT: '1.5rem',
    lg: '2rem',
  },
  /** 2rem on mobile, 3rem on desktop+ */
  'xl-2xl': {
    DEFAULT: '2rem',
    lg: '3rem',
  },
} as const;

/**
 * Common responsive patterns
 */
export const responsivePatterns = {
  /** Default section padding */
  sectionPadding: {
    DEFAULT: '2rem 1rem',
    md: '3rem 1.5rem',
    lg: '4rem 2rem',
    xl: '5rem 2rem',
  },
  /** Default container width */
  containerWidth: {
    DEFAULT: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

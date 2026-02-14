/**
 * Responsive breakpoint tokens
 * Following Tailwind CSS conventions for consistency
 */

/**
 * Screen breakpoints for responsive design
 */
export const breakpoints = {
  '3xl': '1920px',
  '2xl': '1536px',
  lg: '1024px',
  md: '768px',
  sm: '480px',
  xl: '1280px',
  xs: '320px',
} as const;

// /**
//  * Container max-widths at each breakpoint
//  */
// export const containerSizes = {
//   sm: '640px',
//   md: '768px',
//   lg: '1024px',
//   xl: '1280px',
//   '2xl': '1536px',
// } as const;

// /**
//  * Container padding at each breakpoint
//  */
// export const containerPadding = {
//   DEFAULT: '1rem',
//   sm: '1rem',
//   md: '1.5rem',
//   lg: '2rem',
//   xl: '2rem',
//   '2xl': '2rem',
// } as const;

// /**
//  * Responsive spacing scale
//  * Use with padding, margin, gap utilities
//  */
// export const responsiveSpacing = {
//   /** 0.5rem on mobile, 1rem on tablet+ */
//   'sm-md': {
//     DEFAULT: '0.5rem',
//     md: '1rem',
//   },
//   /** 1rem on mobile, 1.5rem on tablet+ */
//   'md-lg': {
//     DEFAULT: '1rem',
//     md: '1.5rem',
//   },
//   /** 1.5rem on mobile, 2rem on desktop+ */
//   'lg-xl': {
//     DEFAULT: '1.5rem',
//     lg: '2rem',
//   },
//   /** 2rem on mobile, 3rem on desktop+ */
//   'xl-2xl': {
//     DEFAULT: '2rem',
//     lg: '3rem',
//   },
// } as const;

// /**
//  * Common responsive patterns
//  */
// export const responsivePatterns = {
//   /** Default section padding */
//   sectionPadding: {
//     DEFAULT: '2rem 1rem',
//     md: '3rem 1.5rem',
//     lg: '4rem 2rem',
//     xl: '5rem 2rem',
//   },
//   /** Default container width */
//   containerWidth: {
//     DEFAULT: '100%',
//     sm: '640px',
//     md: '768px',
//     lg: '1024px',
//     xl: '1280px',
//     '2xl': '1536px',
//   },
// } as const;

/**
 * Animation duration tokens
 * For consistent timing across all animations
 */

export const duration = {
  /** 75ms - Instant feedback */
  instant: '75ms',
  /** 100ms - Very fast transitions */
  fastest: '100ms',
  /** 150ms - Fast transitions */
  faster: '150ms',
  /** 200ms - Normal transitions (default) */
  normal: '200ms',
  /** 300ms - Slow transitions */
  slow: '300ms',
  /** 400ms - Slower transitions */
  slower: '400ms',
  /** 500ms - Slowest transitions */
  slowest: '500ms',
  /** 700ms - Enter/exit animations */
  enter: '700ms',
  /** 300ms - Enter/exit animations */
  exit: '300ms',
} as const;

/**
 * Easing function tokens
 * For natural-feeling animations
 */

export const easing = {
  /** Linear - No easing */
  linear: 'linear',

  // Standard CSS easings
  /** Ease - Default browser easing */
  ease: 'ease',
  /** Ease In - Accelerating */
  in: 'ease-in',
  /** Ease Out - Decelerating */
  out: 'ease-out',
  /** Ease In Out - Accelerate then decelerate */
  inOut: 'ease-in-out',

  // Custom cubic-bezier easings
  /** Sharp - Quick, precise movement */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  /** Standard - Smooth, natural movement (Material Design) */
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Decelerate - Entering elements (Material Design) */
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  /** Accelerate - Exiting elements (Material Design) */
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',

  // Spring-like easings
  /** Bounce - Playful bounce effect */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  /** Elastic - Elastic spring effect */
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // iOS-like easings
  /** iOS - iOS system animation */
  ios: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  /** iOS Accelerate */
  iosAccelerate: 'cubic-bezier(0.5, 0, 1, 1)',
  /** iOS Decelerate */
  iosDecelerate: 'cubic-bezier(0, 0, 0.5, 1)',
} as const;

/**
 * Component-specific motion presets
 * Ready-to-use animation configurations
 */

export const motion = {
  /** Ripple effect (Material Design) */
  ripple: {
    duration: duration.enter,
    easing: easing.decelerate,
  },

  /** Fade in/out */
  fade: {
    duration: duration.normal,
    easing: easing.out,
  },

  /** Slide animations */
  slide: {
    duration: duration.normal,
    easing: easing.standard,
  },

  /** Scale animations */
  scale: {
    duration: duration.normal,
    easing: easing.out,
  },

  /** Tooltip appearance */
  tooltip: {
    duration: duration.faster,
    easing: easing.out,
  },

  /** Modal/Dialog enter */
  modalEnter: {
    duration: duration.enter,
    easing: easing.decelerate,
  },

  /** Modal/Dialog exit */
  modalExit: {
    duration: duration.exit,
    easing: easing.accelerate,
  },

  /** Dropdown menu */
  dropdown: {
    duration: duration.normal,
    easing: easing.standard,
  },

  /** Toast notification */
  toast: {
    duration: duration.normal,
    easing: easing.standard,
  },

  /** Drawer/Sheet enter */
  drawerEnter: {
    duration: duration.enter,
    easing: easing.decelerate,
  },

  /** Drawer/Sheet exit */
  drawerExit: {
    duration: duration.exit,
    easing: easing.accelerate,
  },

  /** Collapse/Expand */
  collapse: {
    duration: duration.slow,
    easing: easing.standard,
  },

  /** Hover effects */
  hover: {
    duration: duration.faster,
    easing: easing.out,
  },

  /** Focus effects */
  focus: {
    duration: duration.fastest,
    easing: easing.out,
  },

  /** Active/Pressed state */
  active: {
    duration: duration.instant,
    easing: easing.linear,
  },
} as const;

/**
 * Animation delay tokens
 * For staggered animations
 */

export const delay = {
  none: '0ms',
  /** 50ms delay */
  xs: '50ms',
  /** 100ms delay */
  sm: '100ms',
  /** 150ms delay */
  md: '150ms',
  /** 200ms delay */
  lg: '200ms',
  /** 300ms delay */
  xl: '300ms',
} as const;

/**
 * Predefined animation sequences
 * For complex multi-step animations
 */

export const sequences = {
  /** Stagger children by 50ms */
  staggerChildren: {
    delayChildren: delay.xs,
    staggerDirection: 1,
  },

  /** Cascade effect */
  cascade: {
    delayChildren: delay.sm,
    staggerDirection: 1,
  },

  /** Reverse stagger */
  reverseStagger: {
    delayChildren: delay.xs,
    staggerDirection: -1,
  },
} as const;

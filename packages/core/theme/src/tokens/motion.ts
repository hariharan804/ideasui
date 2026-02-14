/**
 * IDEASUI — Motion System
 * Clean, consistent, non-duplicated structure
 */

/* ============================================================
   1️⃣ KEYFRAMES
   ============================================================ */

export const keyframes = {
  spin: {
    to: { transform: 'rotate(360deg)' },
  },

  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
  },

  pulse: {
    '50%': { opacity: '0.5' },
  },

  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'none',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },

  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },

  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },

  slideIn: {
    from: { transform: 'translateY(-8px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },

  slideOut: {
    from: { transform: 'translateY(0)', opacity: '1' },
    to: { transform: 'translateY(-8px)', opacity: '0' },
  },

  scaleIn: {
    from: { transform: 'scale(0.96)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },

  scaleOut: {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0.96)', opacity: '0' },
  },
} as const;

/* ============================================================
   2️⃣ DURATION SCALE
   ============================================================ */

export const duration = {
  xs: '75ms',
  sm: '100ms',
  md: '150ms',
  lg: '200ms',
  xl: '300ms',
  '2xl': '500ms',
  '3xl': '700ms',
  '4xl': '1000ms',
} as const;

/* ============================================================
   3️⃣ EASING (TIMING FUNCTIONS)
   ============================================================ */

export const easing = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  linear: 'linear',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

/* ============================================================
   4️⃣ TRANSITION PRESETS
   ============================================================ */

export const transition = {
  fast: `${duration.sm} ${easing.standard}`,
  normal: `${duration.lg} ${easing.standard}`,
  slow: `${duration.xl} ${easing.standard}`,

  enter: `${duration.lg} ${easing.decelerate}`,
  exit: `${duration.md} ${easing.accelerate}`,

  micro: `${duration.xs} ${easing.standard}`,
  spring: `${duration.lg} ${easing.spring}`,
} as const;

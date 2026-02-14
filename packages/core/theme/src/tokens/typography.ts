/**
 * IDEASUI — Typography Tokens
 * Clean, scalable, non-duplicated structure
 */

/* ============================================================
   1️⃣ FONT FAMILY
   ============================================================ */

export const fontFamily = {
  sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
} as const;

/* ============================================================
   2️⃣ FONT WEIGHT
   ============================================================ */

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/* ============================================================
   3️⃣ LINE HEIGHT
   ============================================================ */

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  3: '.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
} as const;

/* ============================================================
   3️⃣ FONT SIZE (paired with line-height)
   ============================================================ */

export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }], // 12px / 16px
  sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px / 20px
  base: ['1rem', { lineHeight: '1.5rem' }], // 16px / 24px
  lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px / 28px
  xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px / 28px
  '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px / 32px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px / 36px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px / 40px
  '5xl': ['3rem', { lineHeight: '1' }], // 48px / 48px
  '6xl': ['3.75rem', { lineHeight: '1' }], // 60px / 60px
  '7xl': ['4.5rem', { lineHeight: '1' }], // 72px / 72px
  '8xl': ['6rem', { lineHeight: '1' }], // 96px / 96px
  '9xl': ['8rem', { lineHeight: '1' }], // 128px / 128px
} as const;

/* ============================================================
   4️⃣ LETTER SPACING
   ============================================================ */

export const letterSpacing = {
  normal: '0',
  tight: '-0.025em',
  tighter: '-0.05em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

/* ============================================================
   5️⃣ ROLE-BASED TEXT STYLES
   ============================================================ */

export const textStyles = {
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },

  bodySm: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },

  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },

  label: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  },

  title: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.normal,
  },

  subtitle: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },

  headline: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },

  display: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize['6xl'],
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },

  overline: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },

  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
  },
} as const;

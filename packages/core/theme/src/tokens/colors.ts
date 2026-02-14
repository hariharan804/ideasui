/* eslint-disable sonarjs/no-duplicate-string */
/**
 * IDEASUI — Design Token System
 * Architecture:
 * 1. Primitive tokens (OKLCH only)
 * 2. Semantic tokens (mapped from primitives)
 * 3. Surface + Content tokens
 * 4. CSS variable generator
 */

/* ============================================================
   1️⃣ PRIMITIVE TOKENS (SOURCE OF TRUTH — OKLCH ONLY)
   ============================================================ */

export const primitives = {
  light: {
    primary: {
      50: 'oklch(0.970 0.020 277.1)',
      100: 'oklch(0.930 0.037 277.1)',
      200: 'oklch(0.870 0.071 277.1)',
      300: 'oklch(0.790 0.112 277.1)',
      400: 'oklch(0.700 0.159 277.1)',
      500: 'oklch(0.590 0.204 277.1)',
      600: 'oklch(0.500 0.194 277.1)',
      700: 'oklch(0.420 0.173 277.1)',
      800: 'oklch(0.320 0.147 277.1)',
      900: 'oklch(0.220 0.112 277.1)',
      950: 'oklch(0.140 0.082 277.1)',
    },

    neutral: {
      50: 'oklch(0.970 0.008 257.4)',
      100: 'oklch(0.930 0.014 257.4)',
      200: 'oklch(0.870 0.028 257.4)',
      300: 'oklch(0.790 0.044 257.4)',
      400: 'oklch(0.700 0.062 257.4)',
      500: 'oklch(0.590 0.080 257.4)',
      600: 'oklch(0.500 0.076 257.4)',
      700: 'oklch(0.420 0.068 257.4)',
      800: 'oklch(0.320 0.058 257.4)',
      900: 'oklch(0.220 0.044 257.4)',
      950: 'oklch(0.140 0.032 257.4)',
    },

    success: {
      50: 'oklch(0.970 0.019 149.6)',
      100: 'oklch(0.930 0.035 149.6)',
      200: 'oklch(0.870 0.067 149.6)',
      300: 'oklch(0.790 0.106 149.6)',
      400: 'oklch(0.700 0.150 149.6)',
      500: 'oklch(0.590 0.192 149.6)',
      600: 'oklch(0.500 0.182 149.6)',
      700: 'oklch(0.420 0.163 149.6)',
      800: 'oklch(0.320 0.138 149.6)',
      900: 'oklch(0.220 0.106 149.6)',
      950: 'oklch(0.140 0.077 149.6)',
    },

    danger: {
      50: 'oklch(0.970 0.021 25.3)',
      100: 'oklch(0.930 0.037 25.3)',
      200: 'oklch(0.870 0.073 25.3)',
      300: 'oklch(0.790 0.114 25.3)',
      400: 'oklch(0.700 0.162 25.3)',
      500: 'oklch(0.590 0.208 25.3)',
      600: 'oklch(0.500 0.197 25.3)',
      700: 'oklch(0.420 0.177 25.3)',
      800: 'oklch(0.320 0.150 25.3)',
      900: 'oklch(0.220 0.114 25.3)',
      950: 'oklch(0.140 0.083 25.3)',
    },

    info: {
      50: 'oklch(0.970 0.020 240.0)',
      100: 'oklch(0.930 0.037 240.0)',
      200: 'oklch(0.870 0.071 240.0)',
      300: 'oklch(0.790 0.112 240.0)',
      400: 'oklch(0.700 0.159 240.0)',
      500: 'oklch(0.590 0.204 240.0)',
      600: 'oklch(0.500 0.194 240.0)',
      700: 'oklch(0.420 0.173 240.0)',
      800: 'oklch(0.320 0.147 240.0)',
      900: 'oklch(0.220 0.112 240.0)',
      950: 'oklch(0.140 0.082 240.0)',
    },

    warning: {
      50: 'oklch(0.970 0.020 70.0)',
      100: 'oklch(0.930 0.037 70.0)',
      200: 'oklch(0.870 0.071 70.0)',
      300: 'oklch(0.790 0.112 70.0)',
      400: 'oklch(0.700 0.159 70.0)',
      500: 'oklch(0.590 0.204 70.0)',
      600: 'oklch(0.500 0.194 70.0)',
      700: 'oklch(0.420 0.173 70.0)',
      800: 'oklch(0.320 0.147 70.0)',
      900: 'oklch(0.220 0.112 70.0)',
      950: 'oklch(0.140 0.082 70.0)',
    },
  },

  dark: {
    primary: {
      50: 'oklch(0.140 0.082 277.1)',
      100: 'oklch(0.200 0.102 277.1)',
      200: 'oklch(0.280 0.126 277.1)',
      300: 'oklch(0.380 0.153 277.1)',
      400: 'oklch(0.480 0.180 277.1)',
      500: 'oklch(0.590 0.204 277.1)',
      600: 'oklch(0.700 0.173 277.1)',
      700: 'oklch(0.790 0.139 277.1)',
      800: 'oklch(0.870 0.098 277.1)',
      900: 'oklch(0.930 0.057 277.1)',
      950: 'oklch(0.970 0.031 277.1)',
    },

    neutral: {
      50: 'oklch(0.140 0.032 257.4)',
      100: 'oklch(0.200 0.040 257.4)',
      200: 'oklch(0.280 0.050 257.4)',
      300: 'oklch(0.380 0.060 257.4)',
      400: 'oklch(0.480 0.070 257.4)',
      500: 'oklch(0.590 0.080 257.4)',
      600: 'oklch(0.700 0.068 257.4)',
      700: 'oklch(0.790 0.054 257.4)',
      800: 'oklch(0.870 0.038 257.4)',
      850: 'oklch(0.900 0.030 257.4)',
      900: 'oklch(0.930 0.022 257.4)',
      950: 'oklch(0.970 0.012 257.4)',
    },

    success: {
      50: 'oklch(0.140 0.077 149.6)',
      100: 'oklch(0.200 0.096 149.6)',
      200: 'oklch(0.280 0.119 149.6)',
      300: 'oklch(0.380 0.144 149.6)',
      400: 'oklch(0.480 0.169 149.6)',
      500: 'oklch(0.590 0.192 149.6)',
      600: 'oklch(0.700 0.163 149.6)',
      700: 'oklch(0.790 0.131 149.6)',
      800: 'oklch(0.870 0.092 149.6)',
      900: 'oklch(0.930 0.054 149.6)',
      950: 'oklch(0.970 0.029 149.6)',
    },

    danger: {
      50: 'oklch(0.140 0.083 25.3)',
      100: 'oklch(0.200 0.104 25.3)',
      200: 'oklch(0.280 0.129 25.3)',
      300: 'oklch(0.380 0.156 25.3)',
      400: 'oklch(0.480 0.183 25.3)',
      500: 'oklch(0.590 0.208 25.3)',
      600: 'oklch(0.700 0.177 25.3)',
      700: 'oklch(0.790 0.141 25.3)',
      800: 'oklch(0.870 0.100 25.3)',
      900: 'oklch(0.930 0.058 25.3)',
      950: 'oklch(0.970 0.031 25.3)',
    },

    info: {
      50: 'oklch(0.140 0.080 240.0)',
      100: 'oklch(0.200 0.100 240.0)',
      200: 'oklch(0.280 0.120 240.0)',
      300: 'oklch(0.380 0.150 240.0)',
      400: 'oklch(0.480 0.180 240.0)',
      500: 'oklch(0.590 0.204 240.0)',
      600: 'oklch(0.700 0.170 240.0)',
      700: 'oklch(0.790 0.140 240.0)',
      800: 'oklch(0.870 0.100 240.0)',
      900: 'oklch(0.930 0.060 240.0)',
      950: 'oklch(0.970 0.030 240.0)',
    },

    warning: {
      50: 'oklch(0.140 0.080 70.0)',
      100: 'oklch(0.200 0.100 70.0)',
      200: 'oklch(0.280 0.120 70.0)',
      300: 'oklch(0.380 0.150 70.0)',
      400: 'oklch(0.480 0.180 70.0)',
      500: 'oklch(0.590 0.204 70.0)',
      600: 'oklch(0.700 0.170 70.0)',
      700: 'oklch(0.790 0.140 70.0)',
      800: 'oklch(0.870 0.100 70.0)',
      900: 'oklch(0.930 0.060 70.0)',
      950: 'oklch(0.970 0.030 70.0)',
    },
  },
} as const;

/* ============================================================
   2️⃣ SEMANTIC TOKENS
   ============================================================ */

export const semantic = {
  primary: {
    base: 'var(--ideasui-primary-500)',
    subtle: 'var(--ideasui-primary-100)',
    content: 'var(--ideasui-primary-50)',
  },
  success: {
    base: 'var(--ideasui-success-500)',
    subtle: 'var(--ideasui-success-100)',
    content: 'var(--ideasui-success-50)',
  },
  danger: {
    base: 'var(--ideasui-danger-500)',
    subtle: 'var(--ideasui-danger-100)',
    content: 'var(--ideasui-danger-50)',
  },
  info: {
    base: 'var(--ideasui-info-500)',
    subtle: 'var(--ideasui-info-100)',
    content: 'var(--ideasui-info-50)',
  },
  warning: {
    base: 'var(--ideasui-warning-500)',
    subtle: 'var(--ideasui-warning-100)',
    content: 'var(--ideasui-warning-50)',
  },
} as const;

/* ============================================================
   3️⃣ SURFACE + CONTENT
   ============================================================ */

/**
 * base      → App background
 * elevated  → Cards / Containers
 * muted     → Lower emphasis surface (Inputs / Tertiary)
 * strong    → Higher contrast surface (Sidebar / Section)
 * inverse   → Opposite theme surface
 */

export const lightSurface = {
  base: 'var(--ideasui-neutral-50)', // App background
  elevated: 'var(--ideasui-neutral-100)', // Cards
  muted: 'var(--ideasui-neutral-200)', // Inputs / tertiary containers
  strong: 'var(--ideasui-neutral-300)', // Strong section background
  inverse: 'var(--ideasui-neutral-900)', // Dark surface
} as const;

export const darkSurface = {
  base: 'var(--ideasui-neutral-900)', // App background
  elevated: 'var(--ideasui-neutral-850)', // Cards
  muted: 'var(--ideasui-neutral-800)', // Inputs / tertiary containers
  strong: 'var(--ideasui-neutral-700)', // Strong section background
  inverse: 'var(--ideasui-neutral-50)', // Light surface
} as const;

export const lightContent = {
  primary: 'var(--ideasui-neutral-900)', // main text
  secondary: 'var(--ideasui-neutral-700)', // less important text
  tertiary: 'var(--ideasui-neutral-600)', // helper text
  muted: 'var(--ideasui-neutral-500)', // placeholders
  disabled: 'var(--ideasui-neutral-400)', // disabled text
  inverse: 'var(--ideasui-neutral-50)', // text on dark surface
} as const;

export const darkContent = {
  primary: 'var(--ideasui-neutral-50)', // main text
  secondary: 'var(--ideasui-neutral-300)', // less important text
  tertiary: 'var(--ideasui-neutral-400)', // helper text
  muted: 'var(--ideasui-neutral-500)', // placeholders
  disabled: 'var(--ideasui-neutral-600)', // disabled text
  inverse: 'var(--ideasui-neutral-950)', // text on light surface
} as const;

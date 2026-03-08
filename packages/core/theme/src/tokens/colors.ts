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
      50: 'oklch(0.970 0.022 268.4)',
      100: 'oklch(0.930 0.040 268.4)',
      200: 'oklch(0.870 0.077 268.4)',
      300: 'oklch(0.790 0.121 268.4)',
      400: 'oklch(0.700 0.174 268.4)',
      500: 'oklch(0.590 0.220 268.4)',
      600: 'oklch(0.500 0.209 268.4)',
      700: 'oklch(0.420 0.187 268.4)',
      800: 'oklch(0.320 0.158 268.4)',
      900: 'oklch(0.220 0.121 268.4)',
      950: 'oklch(0.140 0.088 268.4)',
    },

    secondary: {
      50: 'oklch(0.970 0.022 292.7)',
      100: 'oklch(0.930 0.039 292.7)',
      200: 'oklch(0.870 0.077 292.7)',
      300: 'oklch(0.790 0.120 292.7)',
      400: 'oklch(0.700 0.173 292.7)',
      500: 'oklch(0.590 0.219 292.7)',
      600: 'oklch(0.500 0.208 292.7)',
      700: 'oklch(0.420 0.186 292.7)',
      800: 'oklch(0.320 0.158 292.7)',
      900: 'oklch(0.220 0.120 292.7)',
      950: 'oklch(0.140 0.088 292.7)',
    },

    tertiary: {
      50: 'oklch(0.970 0.012 182.5)',
      100: 'oklch(0.930 0.022 182.5)',
      200: 'oklch(0.870 0.043 182.5)',
      300: 'oklch(0.790 0.068 182.5)',
      400: 'oklch(0.700 0.097 182.5)',
      500: 'oklch(0.590 0.123 182.5)',
      600: 'oklch(0.500 0.117 182.5)',
      700: 'oklch(0.420 0.105 182.5)',
      800: 'oklch(0.320 0.089 182.5)',
      900: 'oklch(0.220 0.068 182.5)',
      950: 'oklch(0.140 0.049 182.5)',
    },

    neutral: {
      50: 'oklch(0.970 0.004 264.0)',
      100: 'oklch(0.930 0.006 264.0)',
      200: 'oklch(0.870 0.012 264.0)',
      300: 'oklch(0.790 0.019 264.0)',
      400: 'oklch(0.700 0.028 264.0)',
      500: 'oklch(0.590 0.035 264.0)',
      600: 'oklch(0.500 0.033 264.0)',
      700: 'oklch(0.420 0.030 264.0)',
      800: 'oklch(0.320 0.025 264.0)',
      900: 'oklch(0.220 0.019 264.0)',
      950: 'oklch(0.140 0.014 264.0)',
    },

    success: {
      50: 'oklch(0.970 0.019 149.6)',
      100: 'oklch(0.930 0.035 149.6)',
      200: 'oklch(0.870 0.067 149.6)',
      300: 'oklch(0.790 0.106 149.6)',
      400: 'oklch(0.700 0.152 149.6)',
      500: 'oklch(0.590 0.192 149.6)',
      600: 'oklch(0.500 0.182 149.6)',
      700: 'oklch(0.420 0.163 149.6)',
      800: 'oklch(0.320 0.138 149.6)',
      900: 'oklch(0.220 0.106 149.6)',
      950: 'oklch(0.140 0.077 149.6)',
    },

    danger: {
      50: 'oklch(0.970 0.020 25.3)',
      100: 'oklch(0.930 0.035 25.3)',
      200: 'oklch(0.870 0.068 25.3)',
      300: 'oklch(0.790 0.107 25.3)',
      400: 'oklch(0.700 0.154 25.3)',
      500: 'oklch(0.590 0.195 25.3)',
      600: 'oklch(0.500 0.185 25.3)',
      700: 'oklch(0.420 0.166 25.3)',
      800: 'oklch(0.320 0.140 25.3)',
      900: 'oklch(0.220 0.107 25.3)',
      950: 'oklch(0.140 0.078 25.3)',
    },

    info: {
      50: 'oklch(0.970 0.019 230.0)',
      100: 'oklch(0.930 0.034 230.0)',
      200: 'oklch(0.870 0.066 230.0)',
      300: 'oklch(0.790 0.103 230.0)',
      400: 'oklch(0.700 0.149 230.0)',
      500: 'oklch(0.590 0.188 230.0)',
      600: 'oklch(0.500 0.179 230.0)',
      700: 'oklch(0.420 0.160 230.0)',
      800: 'oklch(0.320 0.135 230.0)',
      900: 'oklch(0.220 0.103 230.0)',
      950: 'oklch(0.140 0.075 230.0)',
    },

    warning: {
      50: 'oklch(0.970 0.019 70.1)',
      100: 'oklch(0.930 0.034 70.1)',
      200: 'oklch(0.870 0.067 70.1)',
      300: 'oklch(0.790 0.105 70.1)',
      400: 'oklch(0.700 0.150 70.1)',
      500: 'oklch(0.590 0.190 70.1)',
      600: 'oklch(0.500 0.181 70.1)',
      700: 'oklch(0.420 0.162 70.1)',
      800: 'oklch(0.320 0.137 70.1)',
      900: 'oklch(0.220 0.105 70.1)',
      950: 'oklch(0.140 0.076 70.1)',
    },
  },

  dark: {
    primary: {
      50: 'oklch(0.140 0.088 268.4)',
      100: 'oklch(0.200 0.110 268.4)',
      200: 'oklch(0.280 0.136 268.4)',
      300: 'oklch(0.380 0.165 268.4)',
      400: 'oklch(0.480 0.194 268.4)',
      500: 'oklch(0.590 0.220 268.4)',
      600: 'oklch(0.700 0.187 268.4)',
      700: 'oklch(0.790 0.150 268.4)',
      800: 'oklch(0.870 0.106 268.4)',
      900: 'oklch(0.930 0.062 268.4)',
      950: 'oklch(0.970 0.033 268.4)',
    },

    secondary: {
      50: 'oklch(0.140 0.088 292.7)',
      100: 'oklch(0.200 0.110 292.7)',
      200: 'oklch(0.280 0.136 292.7)',
      300: 'oklch(0.380 0.164 292.7)',
      400: 'oklch(0.480 0.193 292.7)',
      500: 'oklch(0.590 0.219 292.7)',
      600: 'oklch(0.700 0.186 292.7)',
      700: 'oklch(0.790 0.149 292.7)',
      800: 'oklch(0.870 0.105 292.7)',
      900: 'oklch(0.930 0.061 292.7)',
      950: 'oklch(0.970 0.033 292.7)',
    },

    tertiary: {
      50: 'oklch(0.140 0.049 182.5)',
      100: 'oklch(0.200 0.062 182.5)',
      200: 'oklch(0.280 0.076 182.5)',
      300: 'oklch(0.380 0.092 182.5)',
      400: 'oklch(0.480 0.108 182.5)',
      500: 'oklch(0.590 0.123 182.5)',
      600: 'oklch(0.700 0.105 182.5)',
      700: 'oklch(0.790 0.084 182.5)',
      800: 'oklch(0.870 0.059 182.5)',
      900: 'oklch(0.930 0.034 182.5)',
      950: 'oklch(0.970 0.018 182.5)',
    },

    neutral: {
      50: 'oklch(0.140 0.014 264.0)',
      100: 'oklch(0.200 0.018 264.0)',
      200: 'oklch(0.280 0.022 264.0)',
      300: 'oklch(0.380 0.026 264.0)',
      400: 'oklch(0.480 0.031 264.0)',
      500: 'oklch(0.590 0.035 264.0)',
      600: 'oklch(0.700 0.030 264.0)',
      700: 'oklch(0.790 0.024 264.0)',
      800: 'oklch(0.870 0.017 264.0)',
      900: 'oklch(0.930 0.010 264.0)',
      950: 'oklch(0.970 0.005 264.0)',
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
      50: 'oklch(0.140 0.078 25.3)',
      100: 'oklch(0.200 0.098 25.3)',
      200: 'oklch(0.280 0.121 25.3)',
      300: 'oklch(0.380 0.146 25.3)',
      400: 'oklch(0.480 0.172 25.3)',
      500: 'oklch(0.590 0.195 25.3)',
      600: 'oklch(0.700 0.166 25.3)',
      700: 'oklch(0.790 0.133 25.3)',
      800: 'oklch(0.870 0.094 25.3)',
      900: 'oklch(0.930 0.055 25.3)',
      950: 'oklch(0.970 0.029 25.3)',
    },

    info: {
      50: 'oklch(0.140 0.075 230.0)',
      100: 'oklch(0.200 0.094 230.0)',
      200: 'oklch(0.280 0.117 230.0)',
      300: 'oklch(0.380 0.141 230.0)',
      400: 'oklch(0.480 0.165 230.0)',
      500: 'oklch(0.590 0.188 230.0)',
      600: 'oklch(0.700 0.160 230.0)',
      700: 'oklch(0.790 0.128 230.0)',
      800: 'oklch(0.870 0.090 230.0)',
      900: 'oklch(0.930 0.053 230.0)',
      950: 'oklch(0.970 0.028 230.0)',
    },

    warning: {
      50: 'oklch(0.140 0.076 70.1)',
      100: 'oklch(0.200 0.095 70.1)',
      200: 'oklch(0.280 0.118 70.1)',
      300: 'oklch(0.380 0.143 70.1)',
      400: 'oklch(0.480 0.167 70.1)',
      500: 'oklch(0.590 0.190 70.1)',
      600: 'oklch(0.700 0.162 70.1)',
      700: 'oklch(0.790 0.129 70.1)',
      800: 'oklch(0.870 0.091 70.1)',
      900: 'oklch(0.930 0.053 70.1)',
      950: 'oklch(0.970 0.029 70.1)',
    },
  },
} as const;

/* ============================================================
   2️⃣ SEMANTIC TOKENS
   ============================================================ */

export const semantic = {
  primary: {
    base: 'var(--ideasui-color-primary-500)',
    onBase: 'var(--ideasui-color-primary-50)',
    subtle: 'var(--ideasui-color-primary-100)',
    onSubtle: 'var(--ideasui-color-primary-700)',
  },
  success: {
    base: 'var(--ideasui-color-success-500)',
    onBase: 'var(--ideasui-color-success-50)',
    subtle: 'var(--ideasui-color-success-100)',
    onSubtle: 'var(--ideasui-color-success-700)',
  },
  danger: {
    base: 'var(--ideasui-color-danger-500)',
    onBase: 'var(--ideasui-color-danger-50)',
    subtle: 'var(--ideasui-color-danger-100)',
    onSubtle: 'var(--ideasui-color-danger-700)',
  },
  info: {
    base: 'var(--ideasui-color-info-500)',
    onBase: 'var(--ideasui-color-info-50)',
    subtle: 'var(--ideasui-color-info-100)',
    onSubtle: 'var(--ideasui-color-info-700)',
  },
  warning: {
    base: 'var(--ideasui-color-warning-500)',
    onBase: 'var(--ideasui-color-warning-50)',
    subtle: 'var(--ideasui-color-warning-100)',
    onSubtle: 'var(--ideasui-color-warning-700)',
  },
  secondary: {
    base: 'var(--ideasui-color-secondary-500)',
    onBase: 'var(--ideasui-color-secondary-50)',
    subtle: 'var(--ideasui-color-secondary-100)',
    onSubtle: 'var(--ideasui-color-secondary-700)',
  },
  tertiary: {
    base: 'var(--ideasui-color-tertiary-500)',
    onBase: 'var(--ideasui-color-tertiary-50)',
    subtle: 'var(--ideasui-color-tertiary-100)',
    onSubtle: 'var(--ideasui-color-tertiary-700)',
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
  // App background
  base: 'var(--ideasui-color-neutral-50)',
  'on-base': 'var(--ideasui-color-neutral-900)',

  // Recessed areas (tables, input wells)
  sunken: 'var(--ideasui-color-neutral-100)',

  // Primary containers (cards)
  elevated: 'var(--ideasui-color-neutral-100)',
  'on-elevated': 'var(--ideasui-color-neutral-900)',

  // Subtle UI surfaces
  muted: 'var(--ideasui-color-neutral-200)',
  'on-muted': 'var(--ideasui-color-neutral-900)',

  // Strong sections / sidebars
  strong: 'var(--ideasui-color-neutral-300)',
  'on-strong': 'var(--ideasui-color-neutral-900)',

  // Nested container scale
  'container-low': 'var(--ideasui-color-neutral-100)',
  container: 'var(--ideasui-color-neutral-200)',
  'container-high': 'var(--ideasui-color-neutral-300)',

  // Floating layers (dropdowns, popovers)
  floating: 'var(--ideasui-color-neutral-50)',

  // Transparent glass backgrounds
  overlay: 'var(--ideasui-color-neutral-50)',

  // Dialogs / drawers
  modal: 'var(--ideasui-color-neutral-50)',

  // Backdrop dim layer
  scrim: 'oklch(0 0 0 / 0.45)',

  // Opposite theme surface
  inverse: 'var(--ideasui-color-neutral-900)',
  'on-inverse': 'var(--ideasui-color-neutral-50)',
} as const;

export const darkSurface = {
  // App background
  base: 'var(--ideasui-color-neutral-50)',
  'on-base': 'var(--ideasui-color-neutral-900)',

  // Recessed areas (inputs, tables)
  sunken: 'var(--ideasui-color-neutral-100)',

  // Cards / main containers
  elevated: 'var(--ideasui-color-neutral-100)',
  'on-elevated': 'var(--ideasui-color-neutral-900)',

  // Subtle UI surfaces
  muted: 'var(--ideasui-color-neutral-200)',
  'on-muted': 'var(--ideasui-color-neutral-900)',

  // Strong sections / sidebars
  strong: 'var(--ideasui-color-neutral-300)',
  'on-strong': 'var(--ideasui-color-neutral-900)',

  // Nested container scale
  'container-low': 'var(--ideasui-color-neutral-100)',
  container: 'var(--ideasui-color-neutral-200)',
  'container-high': 'var(--ideasui-color-neutral-300)',

  // Floating layers (dropdowns, popovers)
  floating: 'var(--ideasui-color-neutral-50)',

  // Transparent glass backgrounds
  overlay: 'var(--ideasui-color-neutral-50)',

  // Dialogs / drawers
  modal: 'var(--ideasui-color-neutral-50)',

  // Backdrop dim layer
  scrim: 'oklch(0 0 0 / 0.65)',

  // Opposite theme surface
  inverse: 'var(--ideasui-color-neutral-900)',
  'on-inverse': 'var(--ideasui-color-neutral-50)',
} as const;

export const lightContent = {
  primary: 'var(--ideasui-color-neutral-900)', // main text
  secondary: 'var(--ideasui-color-neutral-700)', // less important text
  tertiary: 'var(--ideasui-color-neutral-600)', // helper text
  muted: 'var(--ideasui-color-neutral-500)', // placeholders
  disabled: 'var(--ideasui-color-neutral-400)', // disabled text
  inverse: 'var(--ideasui-color-neutral-50)', // text on dark surface
} as const;

export const darkContent = {
  primary: 'var(--ideasui-color-neutral-900)', // main text
  secondary: 'var(--ideasui-color-neutral-700)', // less important text
  tertiary: 'var(--ideasui-color-neutral-600)', // helper text
  muted: 'var(--ideasui-color-neutral-500)', // placeholders
  disabled: 'var(--ideasui-color-neutral-400)', // disabled text
  inverse: 'var(--ideasui-color-neutral-50)', // text on light surface
} as const;

/* ============================================================
   5️⃣ COMMON COLORS
   ============================================================ */

export const commonColors = {
  white: 'oklch(1 0 0)',
  black: 'oklch(0 0 0)',
} as const;

// #3B28CC
// #072AC8
// #232ED1

// 50   #EEF0FF
// 100  #DDE1FF
// 200  #BBC3FF
// 300  #8F9CFF
// 400  #5F6CFF
// 500  #232ED1  ← primary
// 600  #1D25B3
// 700  #171E8C
// 800  #111664
// 900  #0A0F3D

// 50  #EEF2FF
// 100 #E0E7FF
// 200 #C7D2FE
// 300 #A5B4FC
// 400 #818CF8
// 500 #6366F1
// 600 #4F46E5
// 700 #4338CA
// 800 #3730A3
// 900 #312E81

// Premium Indigo (Modern SaaS, AI-focused)
// #3B28CC

// Electric Royal Blue (Vibrant, high energy)
// #232ED1

// Neutral Blue (Very Safe Choice)
// #2563EB

// Vivid Blue (Popular in SaaS dashboards)
//  #3B82F6

// Violet / Purple Tech Brand
// #7C3AED

// Cyan / Teal (Modern alternative)
// #06B6D4

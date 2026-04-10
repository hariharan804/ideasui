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
      50: 'oklch(0.970 0.002 264.0)',
      100: 'oklch(0.930 0.003 264.0)',
      200: 'oklch(0.870 0.005 264.0)',
      300: 'oklch(0.790 0.008 264.0)',
      400: 'oklch(0.700 0.011 264.0)',
      500: 'oklch(0.590 0.014 264.0)',
      600: 'oklch(0.500 0.013 264.0)',
      700: 'oklch(0.420 0.012 264.0)',
      800: 'oklch(0.320 0.010 264.0)',
      900: 'oklch(0.220 0.008 264.0)',
      950: 'oklch(0.140 0.006 264.0)',
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
      50: 'oklch(0.140 0.084 268.4)',
      100: 'oklch(0.230 0.105 268.4)',
      200: 'oklch(0.325 0.130 268.4)',
      300: 'oklch(0.425 0.158 268.4)',
      400: 'oklch(0.535 0.185 268.4)',
      500: 'oklch(0.650 0.210 268.4)',
      600: 'oklch(0.725 0.179 268.4)',
      700: 'oklch(0.795 0.143 268.4)',
      800: 'oklch(0.860 0.101 268.4)',
      900: 'oklch(0.920 0.059 268.4)',
      950: 'oklch(0.970 0.032 268.4)',
    },

    secondary: {
      50: 'oklch(0.140 0.084 292.7)',
      100: 'oklch(0.230 0.105 292.7)',
      200: 'oklch(0.325 0.130 292.7)',
      300: 'oklch(0.425 0.157 292.7)',
      400: 'oklch(0.535 0.184 292.7)',
      500: 'oklch(0.650 0.209 292.7)',
      600: 'oklch(0.725 0.178 292.7)',
      700: 'oklch(0.795 0.142 292.7)',
      800: 'oklch(0.860 0.100 292.7)',
      900: 'oklch(0.920 0.059 292.7)',
      950: 'oklch(0.970 0.031 292.7)',
    },

    tertiary: {
      50: 'oklch(0.140 0.046 182.5)',
      100: 'oklch(0.230 0.058 182.5)',
      200: 'oklch(0.325 0.071 182.5)',
      300: 'oklch(0.425 0.086 182.5)',
      400: 'oklch(0.535 0.101 182.5)',
      500: 'oklch(0.650 0.115 182.5)',
      600: 'oklch(0.725 0.098 182.5)',
      700: 'oklch(0.795 0.078 182.5)',
      800: 'oklch(0.860 0.055 182.5)',
      900: 'oklch(0.920 0.032 182.5)',
      950: 'oklch(0.970 0.017 182.5)',
    },

    neutral: {
      50: 'oklch(0.140 0.006 264.0)',
      100: 'oklch(0.230 0.008 264.0)',
      200: 'oklch(0.325 0.009 264.0)',
      300: 'oklch(0.425 0.010 264.0)',
      400: 'oklch(0.535 0.012 264.0)',
      500: 'oklch(0.650 0.014 264.0)',
      600: 'oklch(0.725 0.011 264.0)',
      700: 'oklch(0.795 0.009 264.0)',
      800: 'oklch(0.860 0.006 264.0)',
      900: 'oklch(0.920 0.004 264.0)',
      950: 'oklch(0.970 0.002 264.0)',
    },

    success: {
      50: 'oklch(0.140 0.072 149.6)',
      100: 'oklch(0.230 0.090 149.6)',
      200: 'oklch(0.325 0.112 149.6)',
      300: 'oklch(0.425 0.135 149.6)',
      400: 'oklch(0.535 0.158 149.6)',
      500: 'oklch(0.650 0.180 149.6)',
      600: 'oklch(0.725 0.153 149.6)',
      700: 'oklch(0.795 0.122 149.6)',
      800: 'oklch(0.860 0.086 149.6)',
      900: 'oklch(0.920 0.050 149.6)',
      950: 'oklch(0.970 0.027 149.6)',
    },

    danger: {
      50: 'oklch(0.140 0.073 25.3)',
      100: 'oklch(0.230 0.092 25.3)',
      200: 'oklch(0.325 0.113 25.3)',
      300: 'oklch(0.425 0.137 25.3)',
      400: 'oklch(0.535 0.161 25.3)',
      500: 'oklch(0.650 0.183 25.3)',
      600: 'oklch(0.725 0.156 25.3)',
      700: 'oklch(0.795 0.124 25.3)',
      800: 'oklch(0.860 0.088 25.3)',
      900: 'oklch(0.920 0.051 25.3)',
      950: 'oklch(0.970 0.027 25.3)',
    },

    info: {
      50: 'oklch(0.140 0.070 230.0)',
      100: 'oklch(0.230 0.088 230.0)',
      200: 'oklch(0.325 0.109 230.0)',
      300: 'oklch(0.425 0.132 230.0)',
      400: 'oklch(0.535 0.155 230.0)',
      500: 'oklch(0.650 0.176 230.0)',
      600: 'oklch(0.725 0.150 230.0)',
      700: 'oklch(0.795 0.120 230.0)',
      800: 'oklch(0.860 0.085 230.0)',
      900: 'oklch(0.920 0.049 230.0)',
      950: 'oklch(0.970 0.026 230.0)',
    },

    warning: {
      50: 'oklch(0.140 0.071 70.1)',
      100: 'oklch(0.230 0.089 70.1)',
      200: 'oklch(0.325 0.110 70.1)',
      300: 'oklch(0.425 0.134 70.1)',
      400: 'oklch(0.535 0.157 70.1)',
      500: 'oklch(0.650 0.178 70.1)',
      600: 'oklch(0.725 0.151 70.1)',
      700: 'oklch(0.795 0.121 70.1)',
      800: 'oklch(0.860 0.085 70.1)',
      900: 'oklch(0.920 0.050 70.1)',
      950: 'oklch(0.970 0.027 70.1)',
    },
  },
} as const;

/* ============================================================
   2️⃣ SEMANTIC TOKENS
   ============================================================ */

export const semantic = {
  primary: {
    base: 'var(--ideasui-color-primary-500)',
    'on-base': 'var(--ideasui-color-primary-50)',
    subtle: 'var(--ideasui-color-primary-100)',
    'on-subtle': 'var(--ideasui-color-primary-700)',
  },
  success: {
    base: 'var(--ideasui-color-success-500)',
    'on-base': 'var(--ideasui-color-success-50)',
    subtle: 'var(--ideasui-color-success-100)',
    'on-subtle': 'var(--ideasui-color-success-700)',
  },
  danger: {
    base: 'var(--ideasui-color-danger-500)',
    'on-base': 'var(--ideasui-color-danger-50)',
    subtle: 'var(--ideasui-color-danger-100)',
    'on-subtle': 'var(--ideasui-color-danger-700)',
  },
  info: {
    base: 'var(--ideasui-color-info-500)',
    'on-base': 'var(--ideasui-color-info-50)',
    subtle: 'var(--ideasui-color-info-100)',
    'on-subtle': 'var(--ideasui-color-info-700)',
  },
  warning: {
    base: 'var(--ideasui-color-warning-500)',
    'on-base': 'var(--ideasui-color-warning-50)',
    subtle: 'var(--ideasui-color-warning-100)',
    'on-subtle': 'var(--ideasui-color-warning-700)',
  },
  secondary: {
    base: 'var(--ideasui-color-secondary-500)',
    'on-base': 'var(--ideasui-color-secondary-50)',
    subtle: 'var(--ideasui-color-secondary-100)',
    'on-subtle': 'var(--ideasui-color-secondary-700)',
  },
  tertiary: {
    base: 'var(--ideasui-color-tertiary-500)',
    'on-base': 'var(--ideasui-color-tertiary-50)',
    subtle: 'var(--ideasui-color-tertiary-100)',
    'on-subtle': 'var(--ideasui-color-tertiary-700)',
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

export const surface = {
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

export const content = {
  primary: 'var(--ideasui-color-neutral-900)', // main text
  secondary: 'var(--ideasui-color-neutral-700)', // less important text
  tertiary: 'var(--ideasui-color-neutral-600)', // helper text
  muted: 'var(--ideasui-color-neutral-500)', // placeholders
  disabled: 'var(--ideasui-color-neutral-400)', // disabled text
  inverse: 'var(--ideasui-color-neutral-50)', // text on dark surface
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

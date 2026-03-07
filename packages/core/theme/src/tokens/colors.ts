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
      50: 'oklch(0.970 0.023 275.7)',
      100: 'oklch(0.930 0.042 275.7)',
      200: 'oklch(0.870 0.082 275.7)',
      300: 'oklch(0.790 0.128 275.7)',
      400: 'oklch(0.700 0.182 275.7)',
      500: 'oklch(0.590 0.233 275.7)',
      600: 'oklch(0.500 0.221 275.7)',
      700: 'oklch(0.420 0.198 275.7)',
      800: 'oklch(0.320 0.168 275.7)',
      900: 'oklch(0.220 0.128 275.7)',
      950: 'oklch(0.140 0.093 275.7)',
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

    secondary: {
      50: 'oklch(0.970 0.019 175.0)',
      100: 'oklch(0.930 0.036 175.0)',
      200: 'oklch(0.870 0.068 175.0)',
      300: 'oklch(0.790 0.108 175.0)',
      400: 'oklch(0.700 0.152 175.0)',
      500: 'oklch(0.590 0.196 175.0)',
      600: 'oklch(0.500 0.186 175.0)',
      700: 'oklch(0.420 0.166 175.0)',
      800: 'oklch(0.320 0.141 175.0)',
      900: 'oklch(0.220 0.108 175.0)',
      950: 'oklch(0.140 0.079 175.0)',
    },

    tertiary: {
      50: 'oklch(0.970 0.020 330.0)',
      100: 'oklch(0.930 0.037 330.0)',
      200: 'oklch(0.870 0.071 330.0)',
      300: 'oklch(0.790 0.112 330.0)',
      400: 'oklch(0.700 0.159 330.0)',
      500: 'oklch(0.590 0.204 330.0)',
      600: 'oklch(0.500 0.194 330.0)',
      700: 'oklch(0.420 0.173 330.0)',
      800: 'oklch(0.320 0.147 330.0)',
      900: 'oklch(0.220 0.112 330.0)',
      950: 'oklch(0.140 0.082 330.0)',
    },
  },

  dark: {
    primary: {
      50: 'oklch(0.140 0.093 275.7)',
      100: 'oklch(0.200 0.116 275.7)',
      200: 'oklch(0.280 0.144 275.7)',
      300: 'oklch(0.380 0.175 275.7)',
      400: 'oklch(0.480 0.205 275.7)',
      500: 'oklch(0.590 0.233 275.7)',
      600: 'oklch(0.700 0.198 275.7)',
      700: 'oklch(0.790 0.158 275.7)',
      800: 'oklch(0.870 0.112 275.7)',
      900: 'oklch(0.930 0.065 275.7)',
      950: 'oklch(0.970 0.035 275.7)',
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

    secondary: {
      50: 'oklch(0.140 0.079 175.0)',
      100: 'oklch(0.200 0.098 175.0)',
      200: 'oklch(0.280 0.121 175.0)',
      300: 'oklch(0.380 0.147 175.0)',
      400: 'oklch(0.480 0.173 175.0)',
      500: 'oklch(0.590 0.196 175.0)',
      600: 'oklch(0.700 0.166 175.0)',
      700: 'oklch(0.790 0.133 175.0)',
      800: 'oklch(0.870 0.094 175.0)',
      900: 'oklch(0.930 0.055 175.0)',
      950: 'oklch(0.970 0.030 175.0)',
    },

    tertiary: {
      50: 'oklch(0.140 0.082 330.0)',
      100: 'oklch(0.200 0.102 330.0)',
      200: 'oklch(0.280 0.126 330.0)',
      300: 'oklch(0.380 0.153 330.0)',
      400: 'oklch(0.480 0.180 330.0)',
      500: 'oklch(0.590 0.204 330.0)',
      600: 'oklch(0.700 0.173 330.0)',
      700: 'oklch(0.790 0.139 330.0)',
      800: 'oklch(0.870 0.098 330.0)',
      900: 'oklch(0.930 0.057 330.0)',
      950: 'oklch(0.970 0.031 330.0)',
    },
  },
} as const;

/* ============================================================
   2️⃣ SEMANTIC TOKENS
   ============================================================ */

export const semantic = {
  primary: {
    base: 'oklch(var(--ideasui-color-primary-500))',
    onBase: 'oklch(var(--ideasui-color-primary-50))',
    subtle: 'oklch(var(--ideasui-color-primary-100))',
    onSubtle: 'oklch(var(--ideasui-color-primary-700))',
  },
  success: {
    base: 'oklch(var(--ideasui-color-success-500))',
    onBase: 'oklch(var(--ideasui-color-success-50))',
    subtle: 'oklch(var(--ideasui-color-success-100))',
    onSubtle: 'oklch(var(--ideasui-color-success-700))',
  },
  danger: {
    base: 'oklch(var(--ideasui-color-danger-500))',
    onBase: 'oklch(var(--ideasui-color-danger-50))',
    subtle: 'oklch(var(--ideasui-color-danger-100))',
    onSubtle: 'oklch(var(--ideasui-color-danger-700))',
  },
  info: {
    base: 'oklch(var(--ideasui-color-info-500))',
    onBase: 'oklch(var(--ideasui-color-info-50))',
    subtle: 'oklch(var(--ideasui-color-info-100))',
    onSubtle: 'oklch(var(--ideasui-color-info-700))',
  },
  warning: {
    base: 'oklch(var(--ideasui-color-warning-500))',
    onBase: 'oklch(var(--ideasui-color-warning-50))',
    subtle: 'oklch(var(--ideasui-color-warning-100))',
    onSubtle: 'oklch(var(--ideasui-color-warning-700))',
  },
  secondary: {
    base: 'oklch(var(--ideasui-color-secondary-500))',
    onBase: 'oklch(var(--ideasui-color-secondary-50))',
    subtle: 'oklch(var(--ideasui-color-secondary-100))',
    onSubtle: 'oklch(var(--ideasui-color-secondary-700))',
  },
  tertiary: {
    base: 'oklch(var(--ideasui-color-tertiary-500))',
    onBase: 'oklch(var(--ideasui-color-tertiary-50))',
    subtle: 'oklch(var(--ideasui-color-tertiary-100))',
    onSubtle: 'oklch(var(--ideasui-color-tertiary-700))',
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
  base: 'oklch(var(--ideasui-color-neutral-50))',
  'on-base': 'oklch(var(--ideasui-color-neutral-900))',

  // Recessed areas (tables, input wells)
  sunken: 'oklch(var(--ideasui-color-neutral-100))',

  // Primary containers (cards)
  elevated: 'oklch(var(--ideasui-color-neutral-100))',
  'on-elevated': 'oklch(var(--ideasui-color-neutral-900))',

  // Subtle UI surfaces
  muted: 'oklch(var(--ideasui-color-neutral-200))',
  'on-muted': 'oklch(var(--ideasui-color-neutral-900))',

  // Strong sections / sidebars
  strong: 'oklch(var(--ideasui-color-neutral-300))',
  'on-strong': 'oklch(var(--ideasui-color-neutral-900))',

  // Nested container scale
  'container-low': 'oklch(var(--ideasui-color-neutral-100))',
  container: 'oklch(var(--ideasui-color-neutral-200))',
  'container-high': 'oklch(var(--ideasui-color-neutral-300))',

  // Floating layers (dropdowns, popovers)
  floating: 'oklch(var(--ideasui-color-neutral-50))',

  // Transparent glass backgrounds
  overlay: 'oklch(var(--ideasui-color-neutral-50))',

  // Dialogs / drawers
  modal: 'oklch(var(--ideasui-color-neutral-50))',

  // Backdrop dim layer
  scrim: 'oklch(0 0 0 / 0.45)',

  // Opposite theme surface
  inverse: 'oklch(var(--ideasui-color-neutral-900))',
  'on-inverse': 'oklch(var(--ideasui-color-neutral-50))',
} as const;

export const darkSurface = {
  // App background
  base: 'oklch(var(--ideasui-color-neutral-50))',
  'on-base': 'oklch(var(--ideasui-color-neutral-900))',

  // Recessed areas (inputs, tables)
  sunken: 'oklch(var(--ideasui-color-neutral-100))',

  // Cards / main containers
  elevated: 'oklch(var(--ideasui-color-neutral-100))',
  'on-elevated': 'oklch(var(--ideasui-color-neutral-900))',

  // Subtle UI surfaces
  muted: 'oklch(var(--ideasui-color-neutral-200))',
  'on-muted': 'oklch(var(--ideasui-color-neutral-900))',

  // Strong sections / sidebars
  strong: 'oklch(var(--ideasui-color-neutral-300))',
  'on-strong': 'oklch(var(--ideasui-color-neutral-900))',

  // Nested container scale
  'container-low': 'oklch(var(--ideasui-color-neutral-100))',
  container: 'oklch(var(--ideasui-color-neutral-200))',
  'container-high': 'oklch(var(--ideasui-color-neutral-300))',

  // Floating layers (dropdowns, popovers)
  floating: 'oklch(var(--ideasui-color-neutral-50))',

  // Transparent glass backgrounds
  overlay: 'oklch(var(--ideasui-color-neutral-50))',

  // Dialogs / drawers
  modal: 'oklch(var(--ideasui-color-neutral-50))',

  // Backdrop dim layer
  scrim: 'oklch(0 0 0 / 0.65)',

  // Opposite theme surface
  inverse: 'oklch(var(--ideasui-color-neutral-900))',
  'on-inverse': 'oklch(var(--ideasui-color-neutral-50))',
} as const;

export const lightContent = {
  primary: 'oklch(var(--ideasui-color-neutral-900))', // main text
  secondary: 'oklch(var(--ideasui-color-neutral-700))', // less important text
  tertiary: 'oklch(var(--ideasui-color-neutral-600))', // helper text
  muted: 'oklch(var(--ideasui-color-neutral-500))', // placeholders
  disabled: 'oklch(var(--ideasui-color-neutral-400))', // disabled text
  inverse: 'oklch(var(--ideasui-color-neutral-50))', // text on dark surface
} as const;

export const darkContent = {
  primary: 'oklch(var(--ideasui-color-neutral-900))', // main text
  secondary: 'oklch(var(--ideasui-color-neutral-700))', // less important text
  tertiary: 'oklch(var(--ideasui-color-neutral-600))', // helper text
  muted: 'oklch(var(--ideasui-color-neutral-500))', // placeholders
  disabled: 'oklch(var(--ideasui-color-neutral-400))', // disabled text
  inverse: 'oklch(var(--ideasui-color-neutral-50))', // text on light surface
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

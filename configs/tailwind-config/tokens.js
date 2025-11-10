export const colors = {
  primary: {
    100: '#F7F0FF',
    90: '#f3e8ff',
    80: '#d9b8fe',
    70: '#c796fe',
    60: '#ae66fe',
    50: '#9e48fd',
    40: '#861afd', // primary color #8B3DFF
    30: '#7a18e6',
    20: '#5f12b4',
    10: '#4a0e8b',
  },
  secondary: {
    100: '#FEF7F0',
    90: '#fef2e7',
    80: '#fbd5b5',
    70: '#f9c191',
    60: '#f6a55e',
    50: '#f5943f',
    40: '#f2790f', // primary color
    30: '#dc6e0e',
    20: '#ac560b',
    10: '#854308',
  },
  tertiary: {
    100: '#F5F9FF',
    90: '#ecf4ff',
    80: '#c5dcff',
    70: '#a9cbff',
    60: '#81b4ff',
    50: '#69a5ff',
    40: '#438fff', // primary color
    30: '#3d82e8',
    20: '#3066b5',
    10: '#254f8c',
  },
  danger: {
    100: '#FFF2F0',
    90: '#ffebe8',
    80: '#fec1b8',
    70: '#fea396',
    60: '#fe7a66',
    50: '#fd6048',
    40: '#fd381a', // primary
    30: '#e63318',
    20: '#8b1f0e',
    10: '#6a180b',
  },
  success: {
    100: '#F4FBF4',
    90: '#edf9ee',
    80: '#c7eec9',
    70: '#ace5af',
    60: '#86d98a',
    50: '#6fd273',
    40: '#4bc750', // Primary
    30: '#44b549',
    20: '#358d39',
    10: '#296d2c',
  },
  warning: {
    100: '#FFFAF0',
    90: '#fff7e6',
    80: '#ffe7b0',
    70: '#ffdc8a',
    60: '#ffcc54',
    50: '#ffc233',
    40: '#ffc233', // primary
    30: '#ffb300',
    20: '#e8a300',
    10: '#b57f00',
  },
  info: {
    100: '#F0FAFE',
    90: '#eaf8fe',
    80: '#bde8fc',
    70: '#9dddfb',
    60: '#70cef9',
    50: '#54c5f8',
    40: '#29b6f6', // primary color
    30: '#25a6e0',
    20: '#1d81af',
    10: '#176487',
  },
  neutral: {
    0: '#000000', // Pure black
    4: '#0A0A0A', // Very dark gray, almost black
    5: '#0C0C0C',
    6: '#0F0F0F',
    10: '#1A1A1A', // Dark gray, good for backgrounds or overlays
    12: '#1C1C1C',
    15: '#222222',
    17: '#252525',
    20: '#2A2A2A', // Dark gray suitable for cards or elevated elements
    22: '#2E2E2E',
    24: '#333333',
    25: '#363636',
    30: '#404040', // Slightly lighter, useful for borders
    35: '#4A4A4A',
    40: '#555555', // Mid-gray for dividers or subdued text
    50: '#6F6F6F', // Good for text in light mode, background in dark
    60: '#888888',
    70: '#A3A3A3', // Suitable for muted icons or placeholders
    80: '#BFBFBF', // Light gray, often used for backgrounds
    87: '#D4D4D4', // Lighter gray, ideal for surface areas
    90: '#E0E0E0',
    92: '#E8E8E8', // Very light gray, approaching white
    94: '#F0F0F0',
    95: '#F5F5F5',
    96: '#F7F7F7', // Close to white, ideal for high elevation components
    98: '#FBFBFB', // Very subtle, off-white
    99: '#FCFCFC',
    100: '#FFFFFF', // Pure white
  },
  neutralVariant: {
    0: '#000000', // Pure black
    5: '#131017', // Darker shade, good for shadows or deep backgrounds
    10: '#1E1A22', // Deep neutral gray with a hint of purple, complements your primary color
    15: '#28242C', // Dark gray with a more pronounced muted purple hue
    20: '#332F37', // Slightly lighter dark gray, still quite muted and subtle
    25: '#3E3A42', // Darker neutral, perfect for deeper contrasts
    30: '#4A454E', // Soft gray with a hint of warmth, suitable for cards or buttons
    35: '#55515A', // Mid-tone neutral gray for surface elements
    40: '#625C66', // Softer gray that can be used for text or icons in dark mode
    50: '#7B757F', // Mid-light gray, a good balance for text in light mode
    60: '#958E99', // Lighter gray with a subtle purple undertone, ideal for background elements
    70: '#B0A9B3', // Light grayish tone, softer and muted, can be used for borders
    80: '#CBC4CF', // Light muted lavender-gray, perfect for surface or background elements
    85: '#D4D4D4', // Lighter muted lavender-gray, ideal for subtle dividers or subtle background elements
    90: '#E8E0EB', // Soft lavender-gray, near white with a purple tint
    95: '#F6EEF9', // Very light pastel lavender, almost white
    98: '#FEF7FF', // Extremely light lavender, ideal for high-elevation surfaces
    99: '#FFFBFF', // Very subtle pastel tone for backgrounds or surfaces
    100: '#FFFFFF', // Pure white
  },
};
export const lightColors = {
  // Primary
  primary: colors.primary['40'],
  onPrimary: colors.primary['100'],
  primaryContainer: colors.primary['90'],
  onPrimaryContainer: colors.primary['10'],
  inversePrimary: colors.primary['80'],
  // secondary
  secondary: colors.secondary['40'],
  onSecondary: colors.secondary['100'],
  secondaryContainer: colors.secondary['90'],
  onSecondaryContainer: colors.secondary['10'],
  // tertiary
  tertiary: colors.tertiary['40'],
  onTertiary: colors.tertiary['100'],
  tertiaryContainer: colors.tertiary['90'],
  onTertiaryContainer: colors.tertiary['10'],
  // error
  danger: colors.danger['40'],
  onDanger: colors.danger['100'],
  dangerContainer: colors.danger['90'],
  onDangerContainer: colors.danger['10'],
  // warning
  warning: colors.warning['40'],
  onWarning: colors.warning['100'],
  warningContainer: colors.warning['90'],
  onWarningContainer: colors.warning['10'],
  // info
  info: colors.info['40'],
  onInfo: colors.info['100'],
  infoContainer: colors.info['90'],
  onInfoContainer: colors.info['10'],
  // success
  success: colors.success['40'],
  onSuccess: colors.success['100'],
  successContainer: colors.success['90'],
  onSuccessContainer: colors.success['10'],
  // neutral
  background: colors.neutral['99'],
  onBackground: colors.neutral['10'],
  surfaceDim: colors.neutral['87'],
  surface: colors.neutral['98'],
  surfaceBright: colors.neutral['98'],
  surfaceContainerLowest: colors.neutral['100'],
  surfaceContainerLow: colors.neutral['96'],
  surfaceContainer: colors.neutral['94'],
  surfaceContainerHigh: colors.neutral['92'],
  surfaceContainerHighest: colors.neutral['90'],
  onSurface: colors.neutral['10'],
  inverseSurface: colors.neutral['20'],
  inverseOnSurface: colors.neutral['95'],
  shadows: colors.neutral['0'],
  surfaceDisabled: colors.neutral['80'], // rgba(0,0,0,0.38) reducing 0.38% opacity
  // neutral variant
  onSurfaceVariant: colors.neutralVariant['30'],
  surfaceVariant: colors.neutralVariant['90'],
  scrim: colors.neutral['10'],
  outline: colors.neutralVariant['50'],
  outlineVariant: colors.neutralVariant['80'],
  //custom colors
  pure: '#FFFFFF',
  pureInverse: '#000000',
  // Typography – descending in emphasis
  text1: colors.neutral['10'], // Primary text (titles, headings)
  text2: colors.neutral['20'], // Body text
  text3: colors.neutral['40'], // Subdued text
  text4: colors.neutral['60'], // Muted text / placeholders
  text5: colors.neutral['70'], // Disabled or less prominent
  text6: colors.neutralVariant['50'], // Subtle variant for labels
  text7: colors.neutralVariant['80'], // Very faint or background-level text
  // Outline levels – increasing in subtlety
  outline1: colors.neutralVariant['30'], // Strong outlines, focus borders
  outline2: colors.neutralVariant['50'], // Regular borders, dividers
  outline3: colors.neutralVariant['60'],
  outline4: colors.neutralVariant['70'],
  outline5: colors.neutralVariant['80'],
  outline6: colors.neutralVariant['85'],
  outline7: colors.neutralVariant['90'],
  outline8: colors.neutralVariant['95'], // Hairline/subtle background outlines
};
// Background Colors
export const lightBg = {
  100: '#FDFDFD',
  primary1: '#F5F5FF',
  primary2: '#FAFAFF',
  secondary1: '#F7F5FF',
  secondary2: '#FBFAFF',
  tertiary1: '#F7FDF7',
  tertiary2: '#FBFEFB',
  layoutBg: '#f9f6ff',
};
// light shadows
export const lightShadows = {
  1: '0px 2px 4px rgba(26, 31, 38, 0.15)',
  2: '0px 4px 12px rgba(26, 31, 38, 0.15)',
  3: '0px 6px 14px rgba(26, 31, 38, 0.15)',
  4: '0px 12px 22px rgba(26, 31, 38, 0.15)',
  5: '0px 15px 15px rgba(26, 31, 38, 0.15)',
  primary1: '0px 2px 4px rgba(93, 95, 252, 0.15)',
  primary2: '0px 4px 12px rgba(93, 95, 252, 0.15)',
  primary3: '0px 6px 14px rgba(93, 95, 252, 0.15)',
  primary4: '0px 15px 15px rgba(93, 95, 252, 0.15)',
  secondary1: '0px 2px 4px rgba(127, 101, 248, 0.15)',
  secondary2: '0px 4px 12px rgba(127, 101, 248, 0.15)',
  secondary3: '0px 6px 14px rgba(127, 101, 248, 0.15)',
  secondary4: '0px 15px 15px rgba(127, 101, 248, 0.15)',
  notification: '0px 1px 15px 4px rgba(26, 31, 38, 0.15)',
  card: '0px 0px 24px 8px rgba(93, 95, 252, 0.15)',
  contentCard: '0px 1px 4px 4px rgba(184, 180, 203, 0.15)',
  cardHover: '0px 0px 26px 12px rgba(93, 95, 252, 0.15)',
  cardWrapper: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
};
// Light Gradients
export const lightGradients = {
  primary: `linear-gradient(93deg, ${colors.primary[50]} 0.32%, ${colors.primary[40]} 129.34%)`,
  secondary: `linear-gradient(93deg, ${colors.secondary[50]} 0.32%, ${colors.secondary[40]} 129.34%)`,
  primSec: `linear-gradient(93deg,${colors.primary[40]} 0.33%, ${colors.secondary[40]} 99.43%)`,
  secPrim: `linear-gradient(93deg, ${colors.secondary[40]} 0.33%, ${colors.primary[40]} 100%)`,
  secondary1: `linear-gradient(147deg, ${lightColors.secondary} 0.33%, ${lightColors.secondaryContainer} 100%)`,
  primary1: `linear-gradient(147deg, ${lightColors.primary} 0.33%, ${lightColors.primaryContainer} 100%)`,
  tertiary: `linear-gradient(147deg, ${lightColors.tertiary} 0.33%, ${lightColors.tertiaryContainer} 100%)`,
};
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Dark Colors variants
export const darkColors = {
  // primary
  primary: colors.primary['80'],
  onPrimary: colors.primary['20'],
  primaryContainer: colors.primary['30'],
  onPrimaryContainer: colors.primary['90'],
  inversePrimary: colors.primary['40'],
  // secondary
  secondary: colors.secondary['80'],
  onSecondary: colors.secondary['20'],
  secondaryContainer: colors.secondary['30'],
  onSecondaryContainer: colors.secondary['90'],
  // tertiary
  tertiary: colors.tertiary['80'],
  onTertiary: colors.tertiary['20'],
  tertiaryContainer: colors.tertiary['30'],
  onTertiaryContainer: colors.tertiary['90'],
  // error
  danger: colors.danger['80'],
  onDanger: colors.danger['20'],
  dangerContainer: colors.danger['30'],
  onDangerContainer: colors.danger['90'],
  // success
  success: colors.success['80'],
  onSuccess: colors.success['20'],
  successContainer: colors.success['30'],
  onSuccessContainer: colors.success['90'],
  // warning
  warning: colors.warning['80'],
  onWarning: colors.warning['20'],
  warningContainer: colors.warning['30'],
  onWarningContainer: colors.warning['90'],
  // info
  info: colors.info['80'],
  onInfo: colors.info['20'],
  infoContainer: colors.info['30'],
  onInfoContainer: colors.info['90'],
  // neutral
  background: colors.neutral['10'],
  onBackground: colors.neutral['90'],
  surfaceDim: colors.neutral['6'],
  surfaceDisabled: colors.neutral['80'], // rgba(255,255,255,0.3)
  surface: colors.neutral['6'],
  surfaceBright: colors.neutral['24'],
  surfaceContainerLowest: colors.neutral['4'],
  surfaceContainerLow: colors.neutral['10'],
  surfaceContainer: colors.neutral['12'],
  surfaceContainerHigh: colors.neutral['17'],
  surfaceContainerHighest: colors.neutral['22'],
  onSurface: colors.neutral['90'],
  inverseSurface: colors.neutral['90'],
  inverseOnSurface: colors.neutral['20'],
  scrim: colors.neutral['10'],
  shadows: colors.neutral['0'],
  // neutralVariant
  surfaceVariant: colors.neutralVariant['30'],
  onSurfaceVariant: colors.neutralVariant['80'],
  outline: colors.neutralVariant['60'],
  outlineVariant: colors.neutralVariant['30'],
  // Typography
  text1: colors.neutral['90'], // Highest contrast text
  text2: colors.neutral['80'], // Body text
  text3: colors.neutral['70'], // Secondary labels
  text4: colors.neutral['60'], // Tertiary text or UI hints
  text5: colors.neutral['50'], // Low-emphasis text
  text6: colors.neutralVariant['70'], // Muted variant text
  text7: colors.neutralVariant['50'], // Background overlay text or minimal
  // Outline levels
  outline1: colors.neutralVariant['90'], // Strongest border
  outline2: colors.neutralVariant['80'], // Normal border or divider
  outline3: colors.neutralVariant['70'], // Subtle border
  outline4: colors.neutralVariant['60'], // Hairline border
  outline5: colors.neutralVariant['50'], // Faintest border (e.g., cards, surfaces)
  outline6: colors.neutralVariant['40'],
  outline7: colors.neutralVariant['30'],
  outline8: colors.neutralVariant['20'], // Softest (e.g., card shadow, very subtle divider)
  //custom colors
  pure: '#000000',
  pureInverse: '#FFFFFF',
};
// Dark Gradients
export const darkGradients = {
  primary: `linear-gradient(93deg, ${colors.primary['50']} 0.32%, ${colors.primary['40']} 129.34%)`,
  secondary: `linear-gradient(93deg, ${colors.secondary['50']} 0.32%, ${colors.secondary['40']} 129.34%)`,
  primSec: `linear-gradient(93deg,${colors.primary['40']} 0.33%, ${colors.secondary['40']} 99.43%)`,
  secPrim: `linear-gradient(93deg, ${colors.secondary['40']} 0.33%, ${colors.primary['40']} 100%)`,
  secondary1: `linear-gradient(147deg, ${darkColors.secondary} 0.33%, ${darkColors.secondaryContainer} 100%)`,
  primary1: `linear-gradient(147deg, ${darkColors.primary} 0.33%, ${darkColors.primaryContainer} 100%)`,
  tertiary: `linear-gradient(147deg, ${darkColors.tertiary} 0.33%, ${darkColors.tertiaryContainer} 100%)`,
};
// Dark shadows
export const darkShadows = {
  1: '0px 2px 4px rgba(26, 31, 38, 0.15)',
  2: '0px 4px 12px rgba(26, 31, 38, 0.15)',
  3: '0px 6px 14px rgba(26, 31, 38, 0.15)',
  4: '0px 12px 22px rgba(26, 31, 38, 0.15)',
  5: '0px 15px 15px rgba(26, 31, 38, 0.15)',
  primary1: '0px 2px 4px rgba(0, 0, 0, 0.15)',
  primary2: '0px 4px 12px rgba(0, 0, 0, 0.15)',
  primary3: '0px 6px 14px rgba(0, 0, 0, 0.15)',
  primary4: '0px 15px 15px rgba(0, 0, 0, 0.15)',
  secondary1: '0px 2px 4px rgba(0, 0, 0, 0.15)',
  secondary2: '0px 4px 12px rgba(0, 0, 0, 0.15)',
  secondary3: '0px 6px 14px rgba(0, 0, 0, 0.15)',
  secondary4: '0px 15px 15px rgba(0, 0, 0, 0.15)',
  notification: '0px 1px 10px 2px rgba(255, 255, 255, 0.10)',
  card: '0px 0px 14px 2px rgba(255, 255, 255, 0.02)',
  cardHover: '0px 0px 16px 4px rgba(255, 255, 255, 0.03)',
  cardWrapper: '0 1px 2px 0 rgba(255, 155, 255, 0.02)',
};
export const darkBg = {
  100: '#2A2C38',
  primary1: '#06091F',
  primary2: '#050711',
  secondary1: '#08061C',
  secondary2: '#04040E',
  tertiary1: '#081908',
  tertiary2: '#040E04',
  layoutBg: '#403A48',
};

// Font Style
// Black - 900
// ExtraBold - 800
// Bold - 700
// SemiBold - 600
// Medium - 500
// Regular - 400
export const typeface = {
  sans: 'Roboto, system-ui, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  weightRegular: '400',
  serif: 'Roboto, system-ui, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  weightMedium: '500',
};

// 1.125 ratio
export const typeScale = {
  h1: [
    '2.027rem',
    {
      fontWeight: '700',
      lineHeight: '2.6rem',
      letterSpacing: '0%',
    },
  ],
  h2: [
    '1.802rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '0%',
      fontWeight: '600',
    },
  ],
  h3: [
    '1.602rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '0%',
      fontWeight: '600',
    },
  ],
  h4: [
    '1.424rem',
    {
      lineHeight: '1.25rem',
      letterSpacing: '0%',
      fontWeight: '600',
    },
  ],
  h5: [
    '1.266rem',
    {
      lineHeight: '1.125rem',
      letterSpacing: '0%',
      fontWeight: '600',
    },
  ],
  h6: [
    '1.125rem',
    {
      lineHeight: '1rem',
      letterSpacing: '0%',
      fontWeight: '600',
    },
  ],
  p: [
    '1rem',
    {
      lineHeight: '1.5rem',
      letterSpacing: '0%',
      fontWeight: '400',
    },
  ],
  button: [
    '0.9375rem',
    {
      lineHeight: '1.25rem',
      fontWeight: '600',
      letterSpacing: '0%',
    },
  ],
  caption: [
    '0.75rem',
    {
      lineHeight: '1rem',
      fontWeight: '400',
      letterSpacing: '0%',
    },
  ],
  body1: ['1.125rem', { lineHeight: '1.125rem', letterSpacing: '0%' }], // 18px
  body2: ['1rem', { lineHeight: '1rem', letterSpacing: '0%' }], // 16px
  body3: ['0.875rem', { lineHeight: '0.875rem', letterSpacing: '0%' }], // 14px
  body4: ['0.75rem', { lineHeight: '0.75rem', letterSpacing: '0%' }], // 12px
  body5: ['0.625rem', { lineHeight: '0.625rem', letterSpacing: '0%' }], // 10px
};
export const additionalTheme = {};
export const animations = {
  'animate-spin': 'spin 1s linear infinite',
  'animate-ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  'animate-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
};
export const keyframes = {
  spin: `  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`,
  ping: `  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }`,
  pulse: `  50% {
    opacity: 0.5;
  }`,
};

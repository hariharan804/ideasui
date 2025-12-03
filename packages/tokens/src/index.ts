export * from './colors'
export * from './spacing'
export * from './typography'
export * from './shadows'
export * from './radius'
export * from './breakpoints'
export * from './zIndex'

// Combined tokens object
export const tokens = {
  colors: require('./colors').colors,
  spacing: require('./spacing').spacing,
  fontFamily: require('./typography').fontFamily,
  fontSize: require('./typography').fontSize,
  fontWeight: require('./typography').fontWeight,
  lineHeight: require('./typography').lineHeight,
  letterSpacing: require('./typography').letterSpacing,
  boxShadow: require('./shadows').boxShadow,
  dropShadow: require('./shadows').dropShadow,
  borderRadius: require('./radius').borderRadius,
  breakpoints: require('./breakpoints').breakpoints,
  screens: require('./breakpoints').screens,
  zIndex: require('./zIndex').zIndex
} as const
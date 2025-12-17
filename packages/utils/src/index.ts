// PUBLIC API — safe for end-users
// Only stable utilities should be exported from here.
// DO NOT export React internals here
// DO NOT export ARIA internals here

// Core utilities
export { mergeProps, getUniqueID } from './shared/utils'

// style
export { cn } from './style/tailwind'

// aria
// export * from './aria'

// dom
export { toDataAttr } from './dom/attributes'

// react
// export * from './react'

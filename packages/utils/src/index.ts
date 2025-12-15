// PUBLIC API — safe for end-users
// Only stable utilities should be exported from here.
// DO NOT export React internals here
// DO NOT export ARIA internals here

// Core utilities
export { cn, toDataAttr, mergeProps } from './shared/utils'

// Subpath exports (these should match the exports in package.json)
export * from './shared'
export * from './aria'
export * from './dom'
export * from './react'
export * from './style'

// Main components and hooks
export { ThemeScript } from './theme-script'
export { ThemeSwitcher } from './theme-switcher'
export { useTheme } from './use-theme'

// Utilities and adapters
export { createScript } from './script'
export { storageAdapters } from './storage'
export { updateDOM, resolveTheme } from './dom-updater'

// Type definitions
export type { ThemeConfig, ThemeMode, StorageAdapter } from './types'
export type { ThemeScriptProps } from './theme-script'
export type { UseThemeOptions } from './use-theme'
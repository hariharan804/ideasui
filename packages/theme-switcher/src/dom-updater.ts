import type { ThemeConfig } from './types'

/**
 * Update DOM element with resolved theme
 * @param resolvedTheme - Resolved theme name to apply
 * @param config - Theme configuration object
 */
export function updateDOM(resolvedTheme: string, config: ThemeConfig) {
  if (typeof document === 'undefined') return

  const element = document.documentElement
  
  if (config.mode === 'class') {
    // Remove all theme classes, then add resolved theme
    element.classList.remove(...config.themes)
    element.classList.add(resolvedTheme)
  } else if (config.mode === 'attribute') {
    element.setAttribute('data-theme', resolvedTheme)
  }
}

/**
 * Resolve system theme to actual theme name
 * @param theme - Theme name to resolve
 * @param config - Theme configuration object
 * @returns Resolved theme name
 */
export function resolveTheme(theme: string, config: ThemeConfig): string {
  if (theme !== 'system') return theme
  if (typeof window === 'undefined') return config.systemThemes.light
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? config.systemThemes.dark 
    : config.systemThemes.light
}

/**
 * Listen for system theme changes
 * @param callback - Function to call when system theme changes
 * @returns Cleanup function
 */
export function listenToSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {}
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = (e: MediaQueryListEvent) => callback(e.matches)
  
  mediaQuery.addEventListener('change', handler)
  return () => mediaQuery.removeEventListener('change', handler)
}
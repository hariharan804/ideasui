export type ThemeMode = 'light' | 'dark' | 'system' | 'custom'

/** Custom themes that should behave like dark (also apply Tailwind `dark:`) */
let DARK_THEMES = new Set<string>(['forest'])

/** Override dark-like themes at runtime (optional) */
export function configureDarkThemes(list: string[]) {
  DARK_THEMES = new Set(list)
}

/** Apply current (from localStorage) */
export function applyCurrentTheme() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  const mode = (localStorage.getItem('theme.mode') as ThemeMode) || 'system'
  const custom = localStorage.getItem('theme.custom') || ''

  root.classList.remove('dark')
  root.removeAttribute('data-theme')

  const sysDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  if (mode === 'light') return
  if (mode === 'dark') {
    root.classList.add('dark')
    return
  }
  if (mode === 'system') {
    if (sysDark) root.classList.add('dark')
    return
  }
  if (mode === 'custom' && custom) {
    root.setAttribute('data-theme', custom)
    if (DARK_THEMES.has(custom)) root.classList.add('dark')
  }
}

/** Set explicit mode: 'light' | 'dark' | 'system' | 'custom' */
export function setTheme(mode: ThemeMode) {
  localStorage.setItem('theme.mode', mode)
  applyCurrentTheme()
}

/** Set a custom theme name and switch mode to 'custom' */
export function setCustomTheme(name: string) {
  localStorage.setItem('theme.custom', name)
  localStorage.setItem('theme.mode', 'custom')
  applyCurrentTheme()
}

// 🎯 Summary: All Theme Change Paths
// Method	Description
// Light/Dark toggle	Manually set theme
// System mode	Follows OS
// Custom theme	Apply custom tokens
// Custom dark theme	Custom + .dark
// No-flicker script	Applies on first paint
// System change listener	Auto-switch on OS change
// Programmatic change	JS code changes theme

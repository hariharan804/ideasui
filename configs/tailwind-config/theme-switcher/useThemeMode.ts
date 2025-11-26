// useThemeMode.ts
import { useCallback, useEffect, useRef, useState } from 'react'

export type ChangeMode = 'class' | 'data-theme' | 'both'
export type StorageMode = 'local' | 'session' | 'none'

export type UseThemeModeOptions = {
  /** How to apply theme effects on <html>. Default: "both" */
  changeMode?: ChangeMode
  /** Built-in + custom theme ids the consumer can use. Default: ["system","light","dark"] */
  themes?: string[]
  /** Default theme when nothing saved. Default: "system" */
  defaultTheme?: string
  /** Custom themes that should also behave as dark (apply .dark). Default: ["dark"] */
  darkThemes?: string[]
  /** Attribute used for custom themes. Default: "data-theme" */
  attributeName?: string
  /** Where to persist selection. Default: "local" */
  storageMode?: StorageMode
  /** Storage keys. */
  storageKeys?: { mode: string }
}

const DEFAULT_THEMES = ['system', 'light', 'dark']

function getStorage(storageMode: StorageMode) {
  if (typeof window === 'undefined') return null
  if (storageMode === 'none') return null
  try {
    return storageMode === 'session'
      ? window.sessionStorage
      : window.localStorage
  } catch {
    return null
  }
}

function isBuiltin(t: string) {
  return t === 'system' || t === 'light' || t === 'dark'
}

function applyThemeToDOM(
  t: string,
  opts: {
    changeMode: ChangeMode
    darkThemes: string[]
    attributeName: string
  }
) {
  if (typeof document === 'undefined') return

  const { changeMode, darkThemes, attributeName } = opts
  const root = document.documentElement

  // reset
  root.classList.remove('dark')
  root.removeAttribute(attributeName)

  // compute darkness
  let isDark = false
  if (t === 'system') {
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark = prefersDark
  } else {
    isDark = darkThemes.includes(t)
  }

  // apply `.dark` if needed
  if ((changeMode === 'class' || changeMode === 'both') && isDark) {
    root.classList.add('dark')
  }

  // set data-theme for custom themes
  if ((changeMode === 'data-theme' || changeMode === 'both') && !isBuiltin(t)) {
    root.setAttribute(attributeName, t)
  }
}

export function useThemeMode({
  changeMode = 'both',
  themes = DEFAULT_THEMES,
  defaultTheme = 'system',
  darkThemes = ['dark'],
  attributeName = 'data-theme',
  storageMode = 'local',
  storageKeys = { mode: 'theme.mode' },
}: UseThemeModeOptions = {}) {
  const storageRef = useRef<Storage | null>(getStorage(storageMode))
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultTheme
    const s = storageRef.current?.getItem(storageKeys.mode)
    return s || defaultTheme
  })

  // apply on mount & on theme change
  useEffect(() => {
    applyThemeToDOM(theme, { changeMode, darkThemes, attributeName })
  }, [theme, changeMode, darkThemes, attributeName])

  // watch system changes if theme === "system"
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') return
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mql) return

    const handler = () =>
      applyThemeToDOM('system', { changeMode, darkThemes, attributeName })

    try {
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    } catch {
      // Safari < 14
      // @ts-ignore
      mql.addListener?.(handler)
      return () => {
        // @ts-ignore
        mql.removeListener?.(handler)
      }
    }
  }, [theme, changeMode, darkThemes, attributeName])

  // persist whenever theme changes
  useEffect(() => {
    storageRef.current = getStorage(storageMode) // in case of runtime env changes
    storageRef.current?.setItem(storageKeys.mode, theme)
    if (storageMode === 'none') {
      // ensure we don't leave old values around if the mode was changed
      try {
        window.localStorage.removeItem(storageKeys.mode)
        window.sessionStorage.removeItem(storageKeys.mode)
      } catch {}
    }
  }, [theme, storageMode, storageKeys.mode])

  const setThemeMode = useCallback((next: string) => {
    // allow any string, not just in `themes`
    setTheme(next)
  }, [])

  return { theme, setThemeMode } as const
}

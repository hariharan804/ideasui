'use client'
import { useCallback, useEffect, useState } from 'react'
import type { ThemeConfig, StorageAdapter } from './types'
import { defaultConfig } from './types'
import { storageAdapters } from './storage'

export interface UseThemeOptions extends Partial<ThemeConfig> {
  storage?: StorageAdapter | 'local' | 'session' | 'memory'
  attribute?: 'class' | 'data-theme'
  systemThemes?: { light: string; dark: string }
}

export function useTheme(options: UseThemeOptions = {}) {
  const config = { ...defaultConfig, ...options }
  const attribute = options.attribute || 'class'
  const systemThemes = options.systemThemes || { light: 'light', dark: 'dark' }
  const storage =
    typeof options.storage === 'string'
      ? storageAdapters[options.storage]
      : options.storage || storageAdapters.local

  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return config.defaultTheme
    return storage.getItem(config.storageKey) || config.defaultTheme
  })

  const [mounted, setMounted] = useState(false)

  // Resolve system theme to actual theme
  const resolveTheme = useCallback(
    (t: string) => {
      if (t === 'system') {
        return typeof window !== 'undefined' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? systemThemes.dark
          : systemThemes.light
      }
      return t
    },
    [systemThemes]
  )

  const setTheme = useCallback(
    (newTheme: string) => {
      if (!config.themes.includes(newTheme)) {
        console.warn(`Theme "${newTheme}" not found in config`)
        return
      }

      setThemeState(newTheme)
      storage.setItem(config.storageKey, newTheme)

      if (typeof window !== 'undefined') {
        const el = document.documentElement
        const resolvedTheme = resolveTheme(newTheme)

        if (attribute === 'class') {
          config.themes.forEach((t) => el.classList.remove(t))
          el.classList.add(resolvedTheme)
        } else if (attribute === 'data-theme') {
          el.setAttribute('data-theme', resolvedTheme)
        }
      }
    },
    [config, storage, attribute, resolveTheme]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply theme on mount and when theme changes
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    const el = document.documentElement
    const resolvedTheme = resolveTheme(theme)

    if (attribute === 'class') {
      config.themes.forEach((t) => el.classList.remove(t))
      el.classList.add(resolvedTheme)
    } else if (attribute === 'data-theme') {
      el.setAttribute('data-theme', resolvedTheme)
    }
  }, [theme, mounted, attribute, config, resolveTheme])

  // Listen for storage changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === config.storageKey &&
        e.newValue &&
        config.themes.includes(e.newValue)
      ) {
        setThemeState(e.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [config.storageKey, config.themes])

  // Listen for system theme changes if theme is 'system'
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = () => {
      // Trigger re-render which will update resolved theme
      setThemeState('system')
    }

    // Support both old and new API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () =>
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange)
      return () => mediaQuery.removeListener(handleSystemThemeChange)
    }
  }, [theme])

  return {
    theme,
    resolvedTheme: resolveTheme(theme),
    themes: config.themes,
    setTheme,
    mounted,
    isDark: resolveTheme(theme) === systemThemes.dark,
  }
}

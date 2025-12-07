'use client'
import { useCallback, useEffect, useState } from 'react'
import type { ThemeConfig, StorageAdapter } from './types'
import { defaultConfig } from './themes.config'
import { storageAdapters } from './storage'

export interface UseThemeController extends Partial<ThemeConfig> {
  storage?: StorageAdapter | 'local' | 'session' | 'memory'
  attribute?: 'class' | 'data-theme'
  systemThemes?: { light: string; dark: string }
}

export function useThemeController(options: UseThemeController = {}) {
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

  const removeAllThemeClasses = useCallback(
    (el: HTMLElement) => {
      config.themes.forEach((t) => el.classList.remove(t))
      el.classList.remove(systemThemes.light, systemThemes.dark)
    },
    [config.themes, systemThemes.light, systemThemes.dark]
  )

  const applyTheme = useCallback(
    (t: string) => {
      if (typeof document === 'undefined') return
      const el = document.documentElement
      const resolved = resolveTheme(t)
      if (attribute === 'class') {
        removeAllThemeClasses(el)
        el.classList.add(resolved)
      } else {
        el.setAttribute('data-theme', resolved)
      }
    },
    [attribute, removeAllThemeClasses, resolveTheme]
  )

  const setTheme = useCallback(
    (newTheme: string) => {
      if (!config.themes.includes(newTheme)) {
        console.warn(`Theme "${newTheme}" not found in config`)
        return
      }
      setThemeState(newTheme)

      // Do not persist 'system' to make OS-follow lightweight (optional)
      if (newTheme === 'system') storage.removeItem(config.storageKey)
      else storage.setItem(config.storageKey, newTheme)

      applyTheme(newTheme)
    },
    [config, storage, applyTheme]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
  }, [mounted, theme, applyTheme])

  // cross-tab sync
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== config.storageKey) return
      if (e.newValue == null) {
        setThemeState('system')
        return
      }
      if (config.themes.includes(e.newValue)) setThemeState(e.newValue)
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [config.storageKey, config.themes])

  // system follow
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handle = () => setThemeState('system')
    mq.addEventListener?.('change', handle) ?? mq.addListener?.(handle)
    return () => {
      mq.removeEventListener?.('change', handle) ?? mq.removeListener?.(handle)
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

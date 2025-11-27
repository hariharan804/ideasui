'use client'
import { useCallback, useEffect, useState } from 'react'
import type { ThemeConfig, StorageAdapter } from './types'
import { defaultConfig } from './types'
import { storageAdapters } from './storage'

export interface UseThemeOptions extends Partial<ThemeConfig> {
  storage?: StorageAdapter | 'local' | 'session' | 'memory'
}

export function useTheme(options: UseThemeOptions = {}) {
  const config = { ...defaultConfig, ...options }
  const storage = typeof options.storage === 'string' 
    ? storageAdapters[options.storage] 
    : options.storage || storageAdapters.local

  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return config.defaultTheme
    return storage.getItem(config.storageKey) || config.defaultTheme
  })

  const [mounted, setMounted] = useState(false)

  const setTheme = useCallback((newTheme: string) => {
    if (!config.themes.includes(newTheme)) return
    
    setThemeState(newTheme)
    storage.setItem(config.storageKey, newTheme)
    
    if (typeof window !== 'undefined') {
      const el = document.documentElement
      config.themes.forEach(t => el.classList.remove(t))
      el.classList.add(newTheme)
    }
  }, [config, storage])

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const el = document.documentElement
      config.themes.forEach(t => el.classList.remove(t))
      el.classList.add(theme)
    }
  }, [theme, config])

  // Listen for storage changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === config.storageKey && e.newValue) {
        setThemeState(e.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [config.storageKey])

  return { theme, resolvedTheme: theme, themes: config.themes, setTheme, mounted }
}
'use client'
import { useEffect, useRef } from 'react'
import { themeStore } from './store'
import type { ThemeConfig, StorageAdapter } from './types'
import { defaultConfig } from './themes.config'
import { storageAdapters } from './storage'

export interface UseThemeController extends Partial<ThemeConfig> {
  attribute?: 'class' | 'data-theme'
  systemThemes?: { light: string; dark: string }
}

// singleton guards
let initialized = false
let refCount = 0
let teardowns: Array<() => void> = []

export function useThemeController(options: UseThemeController = {}) {
  const attrMode =
    options.attribute === 'data-theme' ? 'attribute' : options.attribute

  const merged: ThemeConfig = {
    ...defaultConfig,
    ...options,
    mode: attrMode ?? options.mode ?? defaultConfig.mode,
    systemThemes: options.systemThemes ?? defaultConfig.systemThemes,
    themes: Array.from(
      new Set([...(defaultConfig.themes || []), ...(options.themes || [])])
    ),
  }

  const storage: StorageAdapter =
    typeof options.storage === 'string'
      ? storageAdapters[options.storage]
      : storageAdapters.local

  const cfgRef = useRef({ merged, storage })
  cfgRef.current = { merged, storage }

  useEffect(() => {
    refCount++

    if (!initialized) {
      initialized = true

      const { merged, storage } = cfgRef.current
      const { storageKey, themes, systemThemes, defaultTheme, mode } = merged

      const allClasses = Array.from(
        new Set([...themes, systemThemes.light, systemThemes.dark])
      )

      const prefersDark = () =>
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-color-scheme: dark)').matches

      const resolve = (t: string) =>
        t === 'system'
          ? prefersDark()
            ? systemThemes.dark
            : systemThemes.light
          : t

      const applyToDOM = (resolved: string) => {
        const el = document.documentElement
        if (mode === 'class') {
          allClasses.forEach((c) => el.classList.remove(c))
          el.classList.add(resolved)
        } else {
          el.setAttribute('data-theme', resolved)
        }
      }

      const getStored = () => storage.getItem(storageKey)
      const setStored = (v: string | null) => {
        if (v == null || v === 'system') storage.removeItem(storageKey)
        else storage.setItem(storageKey, v)
      }

      // --- bootstrap ---
      const initial = getStored() || defaultTheme
      const initialResolved = resolve(initial)

      themeStore.set({
        theme: initial,
        resolved: initialResolved,
        themes,
        systemThemes,
      })
      applyToDOM(initialResolved)

      // subscriber with re-entrancy guard + equality memos
      let applying = false
      let lastTheme = initial
      let lastResolved = initialResolved

      const unsubStore = themeStore.subscribe(() => {
        if (applying) return
        applying = true

        const snap = themeStore.get()
        const nextResolved = resolve(snap.theme)

        // only update 'resolved' if changed (prevents self-trigger loops)
        if (snap.resolved !== nextResolved) {
          themeStore.set({ resolved: nextResolved }) // will re-enter but exit due to 'applying'
        }

        // write only when actually changed
        if (nextResolved !== lastResolved) {
          applyToDOM(nextResolved)
          lastResolved = nextResolved
        }

        if (snap.theme !== lastTheme) {
          setStored(snap.theme === 'system' ? null : snap.theme)
          lastTheme = snap.theme
        }

        applying = false
      })

      // follow system only when theme === 'system'
      const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
      const onSystem = () => {
        const snap = themeStore.get()
        if (snap.theme === 'system') {
          const r = resolve('system')
          if (r !== snap.resolved) {
            themeStore.set({ resolved: r }) // subscriber will handle DOM write
          }
        }
      }
      mq?.addEventListener?.('change', onSystem) ?? mq?.addListener?.(onSystem)

      // cross-tab sync
      const onStorage = (e: StorageEvent) => {
        if (e.key !== storageKey) return
        const next = e.newValue ?? 'system'
        if (next === 'system' || themes.includes(next)) {
          const r = resolve(next)
          const s = themeStore.get()
          // set both if changed (single notification)
          if (s.theme !== next || s.resolved !== r) {
            themeStore.set({ theme: next, resolved: r, themes, systemThemes })
            // subscriber will do DOM write; our shallow-compare avoids churn
          }
        }
      }
      window.addEventListener('storage', onStorage)

      teardowns = [
        unsubStore,
        () =>
          mq?.removeEventListener?.('change', onSystem) ??
          mq?.removeListener?.(onSystem),
        () => window.removeEventListener('storage', onStorage),
      ]
    }

    return () => {
      refCount--
      if (refCount === 0) {
        // optional: keep alive instead of teardown; most apps can keep it alive
        teardowns.forEach((fn) => {
          try {
            fn()
          } catch {}
        })
        teardowns = []
        initialized = false
      }
    }
  }, [])

  return null // controller does side-effects only
}

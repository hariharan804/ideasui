'use client'

import { useThemeController } from './use-theme-controller'
import type { ThemeConfig } from './types'

export function ThemeController(props: Partial<ThemeConfig>) {
  useThemeController(props)
  return null // no UI
}

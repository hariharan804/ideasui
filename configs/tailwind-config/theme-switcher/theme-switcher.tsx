// ThemeSwitcher.tsx
'use client'

import * as React from 'react'
import { useThemeMode, UseThemeModeOptions } from './useThemeMode'

export type ThemeSwitcherProps = UseThemeModeOptions & {
  /** List shown in the UI. Defaults to options.themes or ["system","light","dark"] */
  uiThemes?: string[]
  className?: string
  /** Optional label text */
  label?: string
}

export function ThemeSwitcher({
  uiThemes,
  className,
  label = 'Theme',
  ...opts
}: ThemeSwitcherProps) {
  const { theme, setThemeMode } = useThemeMode(opts)
  const list = uiThemes ?? opts.themes ?? ['system', 'light', 'dark']

  return (
    <div className={className}>
      <label className="sr-only">{label}</label>
      <select
        aria-label={label}
        className="px-2 py-1 rounded border"
        value={theme}
        onChange={(e) => setThemeMode(e.target.value)}
      >
        {list.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  )
}

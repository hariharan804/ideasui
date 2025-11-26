'use client'
import * as React from 'react'
import { setTheme, setCustomTheme } from './theme'

export type ThemeSelectProps = {
  customThemes?: { id: string; label: string }[]
  className?: string
}

export function ThemeSelect({
  customThemes = [],
  className,
}: ThemeSelectProps) {
  const [mode, setModeState] = React.useState<string>('')
  const [custom, setCustomState] = React.useState<string>('')

  React.useEffect(() => {
    const m = localStorage.getItem('theme.mode') || 'system'
    const c = localStorage.getItem('theme.custom') || ''
    setModeState(m)
    setCustomState(c)
  }, [])

  return (
    <div className={className}>
      <select
        aria-label="Theme mode"
        value={mode}
        onChange={(e) => {
          const val = e.target.value
          setModeState(val)
          setTheme(val as any)
        }}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        {customThemes.length > 0 && <option value="custom">Custom…</option>}
      </select>

      {mode === 'custom' && customThemes.length > 0 && (
        <select
          aria-label="Custom theme"
          value={custom}
          onChange={(e) => {
            const val = e.target.value
            setCustomState(val)
            setCustomTheme(val)
          }}
        >
          <option value="" disabled>
            Select theme
          </option>
          {customThemes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

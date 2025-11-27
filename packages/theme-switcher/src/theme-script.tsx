import * as React from 'react'
import type { ThemeConfig } from './types'
import { createScript } from './script'
import { defaultConfig } from './themes.config'

export interface ThemeScriptProps extends Partial<ThemeConfig> {
  nonce?: string
  scriptProps?: Omit<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    'id' | 'nonce' | 'dangerouslySetInnerHTML' | 'suppressHydrationWarning'
  >
  id?: string
}

export const ThemeScript = React.memo<ThemeScriptProps>((props) => {
  const { nonce, scriptProps, id = 'theme-script', ...themeProps } = props || {}

  const script = React.useMemo(() => {
    // Ensure 'system' is present in themes if you persist it anywhere else.
    const merged: ThemeConfig = {
      ...defaultConfig,
      ...themeProps,
      // defensive: dedupe themes
      themes: Array.from(
        new Set([...(defaultConfig.themes || []), ...(themeProps.themes || [])])
      ),
    }
    return createScript(merged)
  }, [themeProps])

  return (
    <script
      id={id}
      {...scriptProps}
      suppressHydrationWarning
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
})

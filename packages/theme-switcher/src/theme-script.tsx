import * as React from 'react'
import type { ThemeConfig } from './types'
import { defaultConfig } from './types'
import { createScript } from './script'

/** Props for ThemeScript component */
export interface ThemeScriptProps extends Partial<ThemeConfig> {
  /** CSP nonce for inline script */
  nonce?: string
  /** Additional script element props */
  scriptProps?: React.ScriptHTMLAttributes<HTMLScriptElement>
}

/**
 * SSR-friendly theme script that prevents FOUC
 * Must be placed in document <head>
 */
export const ThemeScript = React.memo<ThemeScriptProps>((props = {}) => {
  const { nonce, scriptProps, ...themeProps } = props
  
  const script = React.useMemo(() => {
    const config = { ...defaultConfig, ...themeProps }
    return createScript(config)
  }, [themeProps])

  return (
    <script
       id="itheme"
      {...scriptProps}
      suppressHydrationWarning
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
})

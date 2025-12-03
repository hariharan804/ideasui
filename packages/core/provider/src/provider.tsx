'use client'
import * as React from 'react'

export interface IdeasUIConfig {
  /**
   * Default theme mode
   */
  defaultTheme?: 'light' | 'dark' | 'system'
  
  /**
   * CSS prefix for custom properties
   */
  cssPrefix?: string
  
  /**
   * Disable animations globally
   */
  disableAnimations?: boolean
  
  /**
   * Enable strict mode warnings
   */
  strict?: boolean
}

const IdeasUIContext = React.createContext<IdeasUIConfig | null>(null)

export interface IdeasUIProviderProps extends IdeasUIConfig {
  children: React.ReactNode
}

export const IdeasUIProvider: React.FC<IdeasUIProviderProps> = ({
  children,
  defaultTheme = 'system',
  cssPrefix = '--iui',
  disableAnimations = false,
  strict = false,
}) => {
  const config = React.useMemo(
    () => ({
      defaultTheme,
      cssPrefix,
      disableAnimations,
      strict,
    }),
    [defaultTheme, cssPrefix, disableAnimations, strict]
  )

  React.useEffect(() => {
    // Set CSS custom properties
    const root = document.documentElement
    root.style.setProperty(`${cssPrefix}-animations`, disableAnimations ? '0' : '1')
    
    // Add data attributes for styling
    root.setAttribute('data-iui-theme', defaultTheme)
    root.setAttribute('data-iui-animations', disableAnimations ? 'disabled' : 'enabled')
    
    return () => {
      root.style.removeProperty(`${cssPrefix}-animations`)
      root.removeAttribute('data-iui-theme')
      root.removeAttribute('data-iui-animations')
    }
  }, [cssPrefix, disableAnimations, defaultTheme])

  return (
    <IdeasUIContext.Provider value={config}>
      {children}
    </IdeasUIContext.Provider>
  )
}

export const useIdeasUI = (): IdeasUIConfig => {
  const context = React.useContext(IdeasUIContext)
  
  if (!context) {
    throw new Error('useIdeasUI must be used within an IdeasUIProvider')
  }
  
  return context
}

IdeasUIProvider.displayName = 'IdeasUIProvider'
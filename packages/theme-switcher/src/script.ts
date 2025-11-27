import type { ThemeConfig } from './types'

export const createScript = (config: ThemeConfig) => {
  const { storageKey, defaultTheme, themes, mode, systemThemes } = config

  return `(function() {
    try {
      var d = document.documentElement
      var key = '${storageKey}'
      var themes = ${JSON.stringify(themes)}
      var systemThemes = ${JSON.stringify(systemThemes)}
      var defaultTheme = '${defaultTheme}'
      
      function apply(theme) {
        if ('${mode}' === 'class') {
          d.className = d.className.replace(new RegExp('\\\\b(' + themes.join('|') + ')\\\\b', 'g'), '')
          d.classList.add(theme)
        } else if ('${mode}' === 'data-theme') {
          d.setAttribute('data-theme', theme)
        }
      }
      
      function resolve(t) {
        if (t === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? systemThemes.dark 
            : systemThemes.light
        }
        return themes.includes(t) ? t : defaultTheme
      }
      
      function getTheme() {
        var stored = localStorage.getItem(key)
        return stored && themes.includes(stored) ? stored : defaultTheme
      }
      
      var theme = getTheme()
      apply(resolve(theme))
      
      // Listen for system preference changes
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      var handleChange = function() {
        var current = localStorage.getItem(key)
        if (current === 'system' || !current) {
          apply(resolve('system'))
        }
      }
      
      // Support both old and new API
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange)
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange)
      }
    } catch(e) {
      console.error('Theme script error:', e)
    }
  })()`
}

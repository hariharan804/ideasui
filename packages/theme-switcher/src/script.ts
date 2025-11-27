import type { ThemeConfig } from './types'

export const createScript = (config: ThemeConfig) => {
  const { storageKey, defaultTheme, themes, mode, systemThemes } = config
  
  return `(function() {
    try {
      var d = document.documentElement
      var key = '${storageKey}'
      var themes = ${JSON.stringify(themes)}
      var systemThemes = ${JSON.stringify(systemThemes)}
      
      function apply(theme) {
        if ('${mode}' === 'class') {
          d.className = d.className.replace(new RegExp('\\\\b(' + themes.join('|') + ')\\\\b', 'g'), '')
          d.classList.add(theme)
        } else {
          d.setAttribute('data-theme', theme)
        }
      }
      
      function resolve(t) {
        return t === 'system' 
          ? (matchMedia('(prefers-color-scheme: dark)').matches ? systemThemes.dark : systemThemes.light)
          : t
      }
      
      var stored = localStorage.getItem(key) || '${defaultTheme}'
      apply(resolve(stored))
      
      matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (localStorage.getItem(key) === 'system') {
          apply(resolve('system'))
        }
      })
    } catch(e) {}
  })()`
}
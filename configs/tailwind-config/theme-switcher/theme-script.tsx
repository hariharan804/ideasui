import * as React from 'react'

export type ThemeScriptProps = {
  /** default: "system" */
  defaultMode?: 'light' | 'dark' | 'system' | 'custom'
  /** default: [] — custom themes treated as dark (adds html.dark too) */
  darkThemes?: string[]
}

/**
 * Injects a tiny inline script that applies theme BEFORE paint (no FOUC).
 * Use inside <head> of Next.js root layout.
 */
export function ThemeScript({
  defaultMode = 'system',
  darkThemes = [],
}: ThemeScriptProps) {
  const code = `
  (function(){
    try {
      var mode = localStorage.getItem('theme.mode') || ${JSON.stringify(defaultMode)};
      var custom = localStorage.getItem('theme.custom') || '';
      var darkThemes = ${JSON.stringify(darkThemes)};
      var root = document.documentElement;

      function apply(m, c){
        root.classList.remove('dark');
        root.removeAttribute('data-theme');

        var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (m === 'light') return;
        if (m === 'dark') { root.classList.add('dark'); return; }
        if (m === 'system') { if (systemDark) root.classList.add('dark'); return; }
        if (m === 'custom' && c) {
          root.setAttribute('data-theme', c);
          if (darkThemes.indexOf(c) > -1) root.classList.add('dark');
        }
      }

      apply(mode, custom);

      if (mode === 'system' && window.matchMedia) {
        var mql = window.matchMedia('(prefers-color-scheme: dark)');
        var handler = function(){ apply('system', ''); };
        try { mql.addEventListener('change', handler); }
        catch (_) { mql.addListener && mql.addListener(handler); }
      }
    } catch(_) {}
  })();`

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  )
}

// script.ts
import type { ThemeConfig } from './types'

export const createScript = (cfg: ThemeConfig) => {
  const { storageKey, defaultTheme, themes, mode, systemThemes } = cfg

  // All possible theme class names we might add/remove
  const themeClassList = Array.from(
    new Set([...themes, systemThemes.light, systemThemes.dark])
  )

  // Prebuild literals for injection
  const KEY = JSON.stringify(storageKey)
  const THEMES = JSON.stringify(themes)
  const SYS = JSON.stringify(systemThemes)
  const DEF = JSON.stringify(defaultTheme)
  const MODE = JSON.stringify(mode)
  const CLS_PATTERN = JSON.stringify(themeClassList.join('|'))

  // Returned IIFE (no optional-call syntax, no nested ${} in JS strings)
  return `(function(){try{
    var d=document,el=d.documentElement;
    var key=${KEY},themes=${THEMES},sys=${SYS},def=${DEF},mode=${MODE};
    var lastTheme='';
    var classRegex=new RegExp('\\\\b(?:'+${CLS_PATTERN}+')\\\\b','g');

    function mm(){try{return typeof window!=='undefined' && typeof window.matchMedia==='function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;}catch(_){return null;}}
    function prefersDark(){var q=mm();try{return !!(q && q.matches);}catch(_){return false;}}
    function resolve(t){
      if(t==='system'){return prefersDark()?sys.dark:sys.light;}
      return themes.indexOf(t)>=0 ? t : def;
    }
    function stripThemeClasses(){
      try{el.className = el.className.replace(classRegex,'').replace(/\\s+/g,' ').trim();}catch(_){}
    }
    function apply(next){
      if(next===lastTheme) return;
      lastTheme=next||'';
      if(mode==='class'){
        stripThemeClasses();
        if(next){ el.classList.add(next); }
      }else{
        if(next){ el.setAttribute('data-theme',next); }
        else{ el.removeAttribute('data-theme'); }
      }
    }

    // Initial
    var initial;
    try{
      var stored = (typeof localStorage!=='undefined' && localStorage.getItem) ? localStorage.getItem(key) : null;
      initial = stored || def;
    }catch(_){
      initial = def;
    }
    apply(resolve(initial));

    // React to system changes when in "system"
    var q = mm();
    function onSys(){
      try{
        var s = (typeof localStorage!=='undefined' && localStorage.getItem) ? localStorage.getItem(key) : null;
        if(!s || s==='system'){ apply(resolve('system')); }
      }catch(_){}
    }
    if(q){
      if(q.addEventListener){ q.addEventListener('change', onSys); }
      else if(q.addListener){ q.addListener(onSys); }
    }

    // Cross-tab sync
    if(typeof window!=='undefined' && window.addEventListener){
      window.addEventListener('storage', function(e){
        try{
          if(e && e.key===key){
            var n = e.newValue || 'system';
            if(n==='system' || themes.indexOf(n)>=0){ apply(resolve(n)); }
          }
        }catch(_){}
      });
    }
  }catch(e){
    try{
      // Fallback: strip known theme classes and apply default
      var cleanup=new RegExp('\\\\b(?:'+${CLS_PATTERN}+')\\\\b','g');
      var cn=document.documentElement.className||'';
      cn=cn.replace(cleanup,'').replace(/\\s+/g,' ').trim();
      document.documentElement.className=(cn?cn+' ':'')+${DEF};
    }catch(_){
      document.documentElement.className=${DEF};
    }
    console.warn('Theme init error:',e);
  }})();`
}

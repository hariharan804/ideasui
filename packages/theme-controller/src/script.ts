// script.ts
import type { ThemeConfig } from './types'

export const createScript = (cfg: ThemeConfig) => {
  const { storageKey, defaultTheme, themes, mode, systemThemes } = cfg
  const themeClassList = Array.from(
    new Set([...themes, systemThemes.light, systemThemes.dark])
  )

  return `(function(){try{
    var d=document.documentElement, key=${JSON.stringify(storageKey)};
    var themes=${JSON.stringify(themes)}, sys=${JSON.stringify(systemThemes)};
    var def=${JSON.stringify(defaultTheme)}, mode=${JSON.stringify(mode)};
    var classes=${JSON.stringify(themeClassList)};
    function prefersDark(){try{return !!(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)}catch(_){return false}}
    function resolve(t){return t==='system'?(prefersDark()?sys.dark:sys.light):(themes.indexOf(t)>=0?t:def)}
    function apply(r){if(mode==='class'){for(var i=0;i<classes.length;i++)d.classList.remove(classes[i]);d.classList.add(r)}else{d.setAttribute('data-theme',r)}}
    var stored=null;try{stored=localStorage.getItem(key)}catch(_){}
    var initial=stored||def; apply(resolve(initial));
    var mq=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');
    function onSys(){var s=null;try{s=localStorage.getItem(key)}catch(_){}
      if(s===null||s==='system'){apply(resolve('system'))}}
    if(mq){mq.addEventListener?mq.addEventListener('change',onSys):mq.addListener(onSys)}
    window.addEventListener('storage',function(e){if(e&&e.key===key){var n=e.newValue==null?'system':e.newValue; if(n==='system'||themes.indexOf(n)>=0){apply(resolve(n))}}})
  }catch(_){}})()`
}

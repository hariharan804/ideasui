// script.ts
import type { ThemeConfig } from './types'

export const createScript = (cfg: ThemeConfig) => {
  const { storageKey, defaultTheme, themes, mode, systemThemes } = cfg
  const themeClassList = Array.from(
    new Set([...themes, systemThemes.light, systemThemes.dark])
  )

  return `(function(){try{
    var el=document.documentElement,key=${JSON.stringify(storageKey)},themes=${JSON.stringify(themes)},sys=${JSON.stringify(systemThemes)};
    var def=${JSON.stringify(defaultTheme)},mode=${JSON.stringify(mode)},classes=${JSON.stringify(themeClassList)},lastTheme='',classRegex=new RegExp('\\\\b('+classes.join('|')+')\\\\b','g');
    function prefersDark(){try{return !!(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches)}catch(e){console.warn('Theme media query error:',e);return false}}
    function resolve(t){return t==='system'?(prefersDark()?sys.dark:sys.light):(themes.includes(t)?t:def)}
    function apply(r){if(r===lastTheme)return;lastTheme=r;if(mode==='class'){el.className=el.className.replace(classRegex,'').trim();if(r)el.classList.add(r)}else{el.setAttribute('data-theme',r)}}
    try{var stored=localStorage?.getItem?.(key),initial=stored||def;apply(resolve(initial))}catch(e){console.warn('Theme init storage error:',e);apply(resolve(def))}
    var mq=window.matchMedia?.('(prefers-color-scheme: dark)');
    function onSys(){try{var s=localStorage?.getItem?.(key);if(!s||s==='system')apply(resolve('system'))}catch(e){console.warn('Theme sync error:',e)}}
    if(mq)mq.addEventListener?.('change',onSys)||mq.addListener?.(onSys);
    window.addEventListener('storage',function(e){if(e?.key===key){var n=e.newValue||'system';if(n==='system'||themes.includes(n))apply(resolve(n))}})
  }catch(e){console.warn('Theme critical error:',e);try{document.documentElement.className=document.documentElement.className.replace(new RegExp('\\\\b('+${JSON.stringify(themeClassList)}.join('|')+')\\\\b','g'),'').trim()+' '+${JSON.stringify(defaultTheme)}}catch(_){document.documentElement.className=${JSON.stringify(defaultTheme)}}})()`
}

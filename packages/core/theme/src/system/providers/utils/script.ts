import type { ThemeScriptConfig } from '../types';

import { defaultConfig } from './themes.config';

export const createScript = (cfg: ThemeScriptConfig): string => {
  const { defaultTheme, themes, systemThemes } = cfg;

  // Prebuild literals for injection
  const KEY = JSON.stringify(defaultConfig.storageKey);
  const THEMES = JSON.stringify(themes);
  const SYS = JSON.stringify(systemThemes);
  const DEF = JSON.stringify(defaultTheme);
  const ATTR = '"data-ideasui-theme"';

  // Returned IIFE (no optional-call syntax, no nested ${} in JS strings)
  return `(function(){try{
    var d=document,el=d.documentElement;
    var key=${KEY},themes=${THEMES},sys=${SYS},def=${DEF},attr=${ATTR};
    var lastTheme='';

    function mm(){try{return typeof window!=='undefined' && typeof window.matchMedia==='function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;}catch(_){return null;}}
    function prefersDark(){var q=mm();try{return !!(q && q.matches);}catch(_){return false;}}
    function resolve(t){
      if(t==='system'){return prefersDark()?sys.dark:sys.light;}
      return themes.indexOf(t)>=0 ? t : def;
    }
    function apply(next){
      if(next===lastTheme) return;
      lastTheme=next||'';
      if(next){ el.setAttribute(attr,next); }
      else{ el.removeAttribute(attr); }
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
      document.documentElement.setAttribute(${ATTR}, ${DEF});
    }catch(_){}
    console.warn('Theme init error:',e);
  }})();`;
};

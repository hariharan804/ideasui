import type { ThemeScriptConfig } from '../types';

import { defaultConfig } from './themes.config';

export const createScript = (cfg: ThemeScriptConfig): string => {
  const KEY = JSON.stringify(defaultConfig.storageKey);
  const THEMES = JSON.stringify(cfg.themes);
  const SYS = JSON.stringify(cfg.systemThemes);
  const DEF = JSON.stringify(cfg.defaultTheme);
  const ATTR = JSON.stringify(defaultConfig.attribute);

  return `(function(){try{
    var d=document,el=d.documentElement;
    var key=${KEY},themes=${THEMES},sys=${SYS},def=${DEF},attr=${ATTR};
    var last='';

    function mm(){
      try{
        return window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
      }catch(e){return null;}
    }

    function prefersDark(){
      var q=mm();
      return !!(q&&q.matches);
    }

    function resolve(t){
      if(t==='system'){
        return prefersDark()?sys.dark:sys.light;
      }
      return themes.indexOf(t)>=0?t:def;
    }

    function disableTransitions(){
      try{
        var s=d.createElement('style');
        s.appendChild(d.createTextNode('*{transition:none!important}'));
        d.head.appendChild(s);
        window.getComputedStyle(el);
        setTimeout(function(){d.head.removeChild(s)},1);
      }catch(e){}
    }

    function apply(next){
      if(next===last) return;
      last=next||'';

      disableTransitions();

      if(next) el.setAttribute(attr,next);
      else el.removeAttribute(attr);

      // Native browser UI theming
      el.style.colorScheme = (next===sys.dark)?'dark':'light';
    }

    // Initial theme
    var stored;
    try{
      stored=localStorage.getItem(key);
    }catch(e){stored=null;}

    var initial=stored||def;
    apply(resolve(initial));

    // System change listener
    var q=mm();
    if(q){
      var onSys=function(){
        try{
          var s=localStorage.getItem(key);
          if(!s||s==='system') apply(resolve('system'));
        }catch(e){}
      };

      if(q.addEventListener) q.addEventListener('change',onSys);
      else if(q.addListener) q.addListener(onSys);
    }

    // Cross-tab sync
    window.addEventListener('storage',function(e){
      try{
        if(e.key===key){
          var v=e.newValue||'system';
          if(v==='system'||themes.indexOf(v)>=0){
            apply(resolve(v));
          }
        }
      }catch(err){}
    });

  }catch(e){
    try{
      document.documentElement.setAttribute(${ATTR},${DEF});
    }catch(_){}
    console.warn('Theme init error:',e);
  }})();`;
};

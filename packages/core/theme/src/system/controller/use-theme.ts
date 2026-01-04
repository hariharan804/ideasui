import {useSyncExternalStore, useCallback} from "react";

import {themeStore} from "./utils/store";

export function useTheme() {
  const subscribe = useCallback((cb: () => void) => themeStore.subscribe(cb), []);
  const getSnap = themeStore.get;

  const snap = useSyncExternalStore(subscribe, getSnap, getSnap);

  const setTheme = useCallback((next: string) => {
    // fire only if changed
    if (next !== themeStore.get().theme) {
      themeStore.set({theme: next});
    }
  }, []);

  return {
    theme: snap.theme,
    resolvedTheme: snap.resolved,
    themes: snap.themes,
    isDark: snap.resolved === snap.systemThemes.dark,
    setTheme,
  };
}

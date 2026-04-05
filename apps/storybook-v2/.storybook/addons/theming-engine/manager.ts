import { addons } from 'storybook/manager-api';

import { DEFAULT_THEME, THEME_EVENT_NAME, THEME_GLOBAL_TYPE_ID, ensureThemeKey } from './registry';
import { themes } from '../../styles/theme';

/**
 * IdeasUI Theme Manager Addon
 *
 * Synchronizes the Storybook Manager (UI) theme with the Preview theme.
 */
addons.register('ideasui-theme-manager', (api) => {
  let lastTheme = DEFAULT_THEME;

  /** Updates the Storybook UI theme */
  const updateManagerTheme = (theme: string) => {
    const selectedTheme = themes[theme as keyof typeof themes] || themes.light;

    api.setOptions({
      theme: selectedTheme,
    });

    // Also apply data-theme attribute to the Manager UI for robust CSS targeting
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  const applyTheme = (theme: string) => {
    const next = ensureThemeKey(theme);
    if (next === lastTheme) return; // Skip if no change

    lastTheme = next;
    updateManagerTheme(next);
  };

  const channel = api.getChannel();

  if (channel) {
    // 1. Initial application
    const initialState = (api.state as any) || {};
    const initialTheme =
      initialState?.globals?.[THEME_GLOBAL_TYPE_ID] ||
      initialState?.globals?.['theme'] ||
      DEFAULT_THEME;
    applyTheme(initialTheme);

    // 2. Listen for custom theme events from preview
    channel.on(THEME_EVENT_NAME, (event: { theme: string }) => {
      applyTheme(event?.theme);
    });

    // 3. Listen for global updates from Storybook UI
    channel.on('GLOBALS_UPDATED', (payload: { globals?: Record<string, unknown> }) => {
      const theme =
        (payload?.globals?.[THEME_GLOBAL_TYPE_ID] as string | undefined) ||
        (payload?.globals?.['theme'] as string | undefined);
      if (theme) applyTheme(theme);
    });

    // 4. Persistence across navigation/renders
    const persistenceEvents = ['STORY_RENDERED', 'DOCS_RENDERED', 'STORY_CHANGED'] as const;

    persistenceEvents.forEach((eventName) => {
      channel.on(eventName, () => {
        // Re-apply to ensure the UI stays in sync after DOM updates
        updateManagerTheme(lastTheme);
      });
    });
  } else {
    // Fallback if channel isn't ready immediately (though rare in register)
    setTimeout(() => {
      const ch = api.getChannel();
      if (ch) applyTheme(DEFAULT_THEME);
    }, 100);
  }
});

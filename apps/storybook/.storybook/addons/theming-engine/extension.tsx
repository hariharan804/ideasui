import type { Decorator } from '@storybook/react-vite';

import React, { useEffect, useMemo } from 'react';
import { addons, useGlobals } from 'storybook/preview-api';

import { THEME_ADDON_ID, THEME_EVENT_NAME, THEME_GLOBAL_TYPE_ID, ensureThemeKey } from './registry';

/** Update preview iframe with theme (only preview uses CSS selectors) */
const updatePreviewTheme = (theme: string) => {
  const root = document.documentElement;

  root.setAttribute('data-ideasui-theme', theme);
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

/**
 * IdeasUI Theme Extension
 *
 * Applies the selected theme to the Storybook preview iframe and notifies
 * the manager about the change to keep the UI in sync.
 */
export const withTheme: Decorator = (Story, context) => {
  const [globals] = useGlobals();
  const theme = useMemo(
    () => ensureThemeKey(globals[THEME_GLOBAL_TYPE_ID] as string | undefined),
    [globals[THEME_GLOBAL_TYPE_ID]],
  );

  useEffect(() => {
    // 1. Apply theme to document element
    updatePreviewTheme(theme);

    // 2. Notify manager
    const channel = addons.getChannel();

    if (channel) {
      channel.emit(THEME_EVENT_NAME, { theme }, { source: THEME_ADDON_ID });
    }

    // 3. Lifecycle events
    const handleEvent = () => updatePreviewTheme(theme);

    channel.on('STORY_CHANGED', handleEvent);
    channel.on('SET_STORIES', handleEvent);

    return () => {
      channel.removeListener('STORY_CHANGED', handleEvent);
      channel.removeListener('SET_STORIES', handleEvent);
    };
  }, [theme]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Story {...context} />
    </div>
  );
};

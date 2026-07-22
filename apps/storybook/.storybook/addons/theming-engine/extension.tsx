import type { Decorator } from '@storybook/react-vite';

import React, { useEffect, useMemo, useRef } from 'react';
import { addons, useGlobals } from 'storybook/preview-api';

import { THEME_ADDON_ID, THEME_EVENT_NAME, THEME_GLOBAL_TYPE_ID, ensureThemeKey } from './registry';

/** Update preview iframe with theme (only preview uses CSS selectors) */
const updatePreviewTheme = (theme: string) => {
  const root = document.documentElement;

  root.setAttribute('data-theme', theme);
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

/**
 * IdeasUI Theme Extension
 *
 * Applies the selected theme to the Storybook preview iframe and notifies
 * the manager about the change to keep the UI in sync. Supports smooth transitions.
 */
export const withTheme: Decorator = (Story, context) => {
  const [globals] = useGlobals();
  const theme = useMemo(
    () => ensureThemeKey(globals[THEME_GLOBAL_TYPE_ID] as string | undefined),
    [globals[THEME_GLOBAL_TYPE_ID]],
  );

  const isFirstMount = useRef(true);

  // Sync listener for Story changes (instant layout shift, no transition)
  useEffect(() => {
    const channel = addons.getChannel();
    const handleEvent = () => {
      updatePreviewTheme(theme);
    };

    channel.on('STORY_CHANGED', handleEvent);
    channel.on('SET_STORIES', handleEvent);

    return () => {
      channel.removeListener('STORY_CHANGED', handleEvent);
      channel.removeListener('SET_STORIES', handleEvent);
    };
  }, [theme]);

  // Handle active theme toggling (apply smooth transition)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      updatePreviewTheme(theme);
      const channel = addons.getChannel();
      if (channel) {
        channel.emit(THEME_EVENT_NAME, { theme }, { source: THEME_ADDON_ID });
      }
      return;
    }

    // Add temporary smooth transition wrapper
    document.documentElement.classList.add('theme-transition');
    updatePreviewTheme(theme);

    const channel = addons.getChannel();
    if (channel) {
      channel.emit(THEME_EVENT_NAME, { theme }, { source: THEME_ADDON_ID });
    }

    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timer);
  }, [theme]);

  return <Story {...context} />;
};

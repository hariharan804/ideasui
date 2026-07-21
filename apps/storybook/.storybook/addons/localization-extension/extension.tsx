import type { Decorator } from '@storybook/react-vite';

import React, { useEffect, useMemo } from 'react';
import { useGlobals } from 'storybook/preview-api';

import { DEFAULT_LOCALE, I18N_GLOBAL_TYPE_ID, LOCALES } from './registry';

/**
 * IdeasUI Layout Direction Decorator
 *
 * Applies the selected text direction (LTR or RTL) to the Storybook preview iframe.
 */
export const withInternationalization: Decorator = (Story) => {
  const [globals] = useGlobals();
  const selectedLocale = globals[I18N_GLOBAL_TYPE_ID] || DEFAULT_LOCALE;

  const localeConfig = useMemo(() => {
    return LOCALES.find((l) => l.value === selectedLocale) || LOCALES[0];
  }, [selectedLocale]);

  useEffect(() => {
    if (localeConfig) {
      document.documentElement.dir = localeConfig.direction;
      document.documentElement.lang = localeConfig.direction === 'rtl' ? 'ar' : 'en';
    }
  }, [localeConfig]);

  return <Story />;
};

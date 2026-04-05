import type { Decorator } from '@storybook/react';

import React, { useEffect, useMemo } from 'react';
import { useGlobals } from 'storybook/preview-api';

import { DEFAULT_LOCALE, I18N_GLOBAL_TYPE_ID, LOCALES } from './registry';

/**
 * IdeasUI Internationalization Decorator
 *
 * Applies the selected locale and text direction to the Storybook preview iframe.
 */
export const withInternationalization: Decorator = (Story) => {
  const [globals] = useGlobals();
  const selectedLocale = globals[I18N_GLOBAL_TYPE_ID] || DEFAULT_LOCALE;

  const localeConfig = useMemo(() => {
    const localeValue =
      selectedLocale === 'Auto'
        ? typeof navigator !== 'undefined'
          ? navigator.language
          : 'en-US'
        : selectedLocale;

    return (
      LOCALES.find((l) => l.value === localeValue) ||
      LOCALES.find((l) => l.value.startsWith(localeValue.split('-')[0])) ||
      LOCALES.find((l) => l.value === 'en-US')
    );
  }, [selectedLocale]);

  useEffect(() => {
    if (localeConfig) {
      document.documentElement.lang = localeConfig.value;
      document.documentElement.dir = localeConfig.direction;
    }
  }, [localeConfig]);

  return <Story />;
};

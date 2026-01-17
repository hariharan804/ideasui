import React from 'react';
import type { Preview } from '@storybook/react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import './style.css';

const rtlLocales = ['ar-AE', 'he-IL'];

const decorators: Preview['decorators'] = [
  (Story, { globals: { locale, theme } }) => {
    const direction = locale && rtlLocales.includes(locale) ? 'rtl' : 'ltr';

    return (
      <div lang={locale} dir={direction} className={theme === 'dark' ? 'dark' : ''}>
        <Story />
      </div>
    );
  },
];

const parameters: Preview['parameters'] = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Foundations', 'Components'],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: {
      base: 'light',
      colorPrimary: '#0070f3',
      colorSecondary: '#6366f1',
      appBg: '#ffffff',
      appContentBg: '#ffffff',
      appBorderColor: '#e5e7eb',
      appBorderRadius: 8,
      textColor: '#111827',
      textInverseColor: '#ffffff',
      brandTitle: 'IdeasUI',
      brandUrl: 'https://ideasui.com',
      brandTarget: '_self',
    },
  },
};

const locales = ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN', 'ar-AE', 'he-IL'];

const globalTypes: Preview['globalTypes'] = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
  locale: {
    toolbar: {
      icon: 'globe',
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames('en', { type: 'language' }).of(locale) || locale,
        right: rtlLocales.includes(locale) ? 'RTL' : undefined,
      })),
    },
  },
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
  tags: ['autodocs'],
};

export default preview;

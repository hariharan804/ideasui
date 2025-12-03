import React from 'react'
import type { Preview } from '@storybook/react-vite'

import './style.css'
// import { withStrictModeSwitcher } from './addons/react-strict-mode'

const decorators: Preview['decorators'] = [
  (Story, { globals: { locale } }) => {
    const direction =
      // @ts-ignore
      locale && new Intl.Locale(locale)?.textInfo?.direction === 'rtl'
        ? 'rtl'
        : undefined

    return (
      <div className="" lang={locale} dir={direction}>
        <Story />
      </div>
    )
  },
  // ...(process.env.NODE_ENV !== 'production' ? [withStrictModeSwitcher] : []),
]

const commonTheme = {
  brandTitle: 'IdeasUI',
  brandUrl: 'https://ideasui.com',
  brandTarget: '_self',
}

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
}

const locales = [
  'ar-AE',
  'bg-BG',
  'cs-CZ',
  'da-DK',
  'de-DE',
  'el-GR',
  'en-US',
  'es-ES',
  'et-EE',
  'fi-FI',
  'fr-FR',
  'he-IL',
  'hr-HR',
  'hu-HU',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'lt-LT',
  'lv-LV',
  'nb-NO',
  'nl-NL',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru-RU',
  'sk-SK',
  'sl-SI',
  'sr-SP',
  'sv-SE',
  'tr-TR',
  'uk-UA',
  'zh-CN',
  'zh-TW',
]

const globalTypes: Preview['globalTypes'] = {
  locale: {
    toolbar: {
      icon: 'globe',
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames(undefined, { type: 'language' }).of(
          locale
        ),
        right:
          // @ts-ignore
          new Intl.Locale(locale)?.textInfo?.direction === 'rtl'
            ? 'Right to Left'
            : undefined,
      })),
    },
  },
  disableAnimation: {
    name: 'Disable Animation',
    description: 'Disable all animations in the stories',
    toolbar: {
      icon: 'photodrag',
      items: [
        { value: true, title: 'True' },
        { value: false, title: 'False' },
      ],
    },
  },
  labelPlacement: {
    name: 'Label Placement',
    description: 'Position of label.',
    toolbar: {
      icon: 'component',
      items: [
        { value: 'inside', title: 'Inside' },
        { value: 'outside', title: 'Outside' },
        { value: 'outside-left', title: 'Outside Left' },
      ],
    },
  },
}

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
  tags: ['autodocs'],
}

export default preview

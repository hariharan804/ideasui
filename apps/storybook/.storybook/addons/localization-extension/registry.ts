export const I18N_ADDON_ID = 'ideasui-i18n-addon';
export const I18N_GLOBAL_TYPE_ID = 'ideasui-i18n';
export const I18N_PARAM_KEY = 'ideasui-i18n';

export const LOCALES = [
  {
    country: 'LTR',
    direction: 'ltr',
    label: 'LTR (Left-to-Right)',
    value: 'ltr',
  },
  {
    country: 'RTL',
    direction: 'rtl',
    label: 'RTL (Right-to-Left)',
    value: 'rtl',
  },
] as const;

export const DEFAULT_LOCALE = 'ltr';

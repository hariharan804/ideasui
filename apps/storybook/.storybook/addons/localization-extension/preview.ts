import { DEFAULT_LOCALE, I18N_GLOBAL_TYPE_ID, LOCALES } from './registry';

export { I18N_GLOBAL_TYPE_ID };

export const i18nGlobalType = {
  [I18N_GLOBAL_TYPE_ID]: {
    name: 'Direction',
    description: 'Layout direction (LTR/RTL)',
    defaultValue: DEFAULT_LOCALE,
    toolbar: {
      icon: 'transfer',
      items: LOCALES.map((locale) => ({
        value: locale.value,
        title: locale.label,
        right: locale.direction.toUpperCase(),
      })),
      showName: true,
      dynamicTitle: true,
    },
  },
};

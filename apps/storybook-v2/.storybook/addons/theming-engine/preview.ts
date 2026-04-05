import { DEFAULT_THEME, THEME_GLOBAL_TYPE_ID, THEME_OPTIONS, THEME_VALUES } from './registry';

export { THEME_GLOBAL_TYPE_ID };

export const themeGlobalType = {
  [THEME_GLOBAL_TYPE_ID]: {
    name: 'Theme',
    description: 'IdeasUI theme for components',
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: 'paintbrush',
      items: THEME_OPTIONS.filter((option) => THEME_VALUES.includes(option.value as any)).map(
        (option) => ({
          value: option.value,
          title: option.title,
        }),
      ),
      showName: true,
      dynamicTitle: true,
    },
  },
};

import { defaultConfig } from './themes.config';

/**
 * Disables CSS transitions temporarily to prevent flashing when switching themes
 */
export const disableTransitions = (): void => {
  const style = document.createElement('style');

  style.append(document.createTextNode('*{transition:none!important}'));
  document.head.append(style);

  // Force reflow
  // eslint-disable-next-line sonarjs/void-use
  void globalThis.getComputedStyle(document.body);

  setTimeout(() => {
    style.remove();
  }, 1);
};

/**
 * Applies the resolved theme to the DOM
 */
export const applyThemeToDOM = (resolved: string, darkThemeName: string): void => {
  if (globalThis.window === undefined) {
    return;
  }

  const element = document.documentElement;

  disableTransitions();

  element.setAttribute(defaultConfig.attribute, resolved);

  element.classList.toggle('dark', resolved === darkThemeName);

  // Native browser UI theming
  const colorScheme = resolved === darkThemeName ? 'dark' : 'light';

  element.style.setProperty('color-scheme', colorScheme);
};

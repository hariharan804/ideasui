import { defaultConfig } from './themes.config';

/**
 * Disables CSS transitions temporarily to prevent flashing when switching themes
 */
export const disableTransitions = (): void => {
  const style = document.createElement('style');

  style.appendChild(document.createTextNode('*{transition:none!important}'));
  document.head.appendChild(style);

  // Force reflow
  // eslint-disable-next-line sonarjs/void-use
  void window.getComputedStyle(document.body);

  setTimeout(() => {
    document.head.removeChild(style);
  }, 1);
};

/**
 * Applies the resolved theme to the DOM
 */
export const applyThemeToDOM = (resolved: string, darkThemeName: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const el = document.documentElement;

  disableTransitions();

  el.setAttribute(defaultConfig.attribute, resolved);

  // Native browser UI theming
  const colorScheme = resolved === darkThemeName ? 'dark' : 'light';

  el.style.setProperty('color-scheme', colorScheme);
};

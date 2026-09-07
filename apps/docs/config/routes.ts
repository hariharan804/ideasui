import { siteConfig } from './site';

/**
 * Centralized application routes and navigation links.
 */
export const ROUTES = {
  home: '/',
  docs: {
    root: '/react/docs',
    start: '/react/docs/start',
    installation: '/react/docs/start/installation',
    tokens: '/react/docs/start/tokens',
    darkMode: '/react/docs/start/dark-mode',
    components: '/react/docs/components',
    button: '/react/docs/components/button',
    buttonGroup: '/react/docs/components/button-group',
    changelog: '/react/docs/changelog',
  },
  external: {
    github: siteConfig.links.github,
    githubRepo: 'hariharan804/ideasui',
    packageBase: siteConfig.links.packageBase,
    componentsBase: siteConfig.links.componentsBase,
    figma: siteConfig.links.figmaDefault,
    storybook: siteConfig.links.storybook,
    roadmap: '#',
  },
} as const;
